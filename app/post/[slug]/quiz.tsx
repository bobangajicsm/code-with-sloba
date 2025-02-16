"use client";
import { useState } from "react";
import styles from "./quiz.module.scss";

interface QuizProps {
  questions: {
    quiz: {
      id: string;
      question: string;
      optionA: string;
      optionB: string;
      optionC: string | null;
      optionD: string | null;
      correctAnswer: string;
    };
  }[];
  postId: string;
  userId: string;
}

export default function Quiz({ questions, postId, userId }: QuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (isSubmitted || isDisabled) return;

    setIsSubmitted(true);

    const allCorrect = questions.every((questionWrapper) => {
      const question = questionWrapper.quiz;
      const selectedAnswer = selectedAnswers[question.id];
      const correctAnswer =
        question[question.correctAnswer as keyof typeof question];
      return selectedAnswer === correctAnswer;
    });

    setIsCorrect(allCorrect);

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, postId, isCorrect: allCorrect }),
      });

      if (!res.ok) throw new Error("Failed to submit answer");

      const data = await res.json();
      if (data.isDisabled) {
        setIsDisabled(true); // Disable quiz for 24h
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.quizContainer}>
      <h3>Quiz</h3>
      {questions.map((questionWrapper, index) => {
        const question = questionWrapper.quiz;
        return (
          <div key={question.id} className={styles.question}>
            <p>{`${index + 1}. ${question.question}`}</p>
            <div className={styles.options}>
              {["A", "B", "C", "D"].map((key) => {
                const option =
                  question[`option${key}` as keyof typeof question];
                return (
                  option && (
                    <label
                      key={key}
                      className={`${styles.option} ${
                        isSubmitted &&
                        option ===
                          question[
                            question.correctAnswer as keyof typeof question
                          ]
                          ? styles.correct
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name={`quiz-question-${question.id}`}
                        value={option}
                        checked={selectedAnswers[question.id] === option}
                        onChange={() => handleAnswerChange(question.id, option)}
                        disabled={isSubmitted || isDisabled}
                      />
                      {option}
                    </label>
                  )
                );
              })}
            </div>
          </div>
        );
      })}
      {!isSubmitted ? (
        <button
          className={styles.button}
          onClick={handleSubmit}
          disabled={
            Object.keys(selectedAnswers).length !== questions.length ||
            isDisabled
          }
        >
          Submit Answers
        </button>
      ) : (
        <p className={isCorrect ? styles.correct : styles.incorrect}>
          {isCorrect
            ? "✅ Correct! Well done!"
            : `❌ Incorrect. Try again in 24 hours.`}
        </p>
      )}
    </div>
  );
}
