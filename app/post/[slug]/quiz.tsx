"use client";
import { useState } from "react";
import styles from "./quiz.module.scss";
import { Check } from "lucide-react";

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
        setIsDisabled(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.quizContainer}>
      <h3 className={styles.caption}>Quiz</h3>
      <h2 className={styles.title}>Test Your Knowledge</h2>
      {questions.map((questionWrapper, index) => {
        const question = questionWrapper.quiz;
        return (
          <div key={question.id} className={styles.question}>
            <p>{`${index + 1}. ${question.question}`}</p>
            <div className={styles.options}>
              {["A", "B", "C", "D"].map((key) => {
                const option =
                  question[`option${key}` as keyof typeof question];
                if (!option) return null;

                const isSelected = selectedAnswers[question.id] === option;
                const isCorrectAnswer =
                  isSubmitted &&
                  option ===
                    question[question.correctAnswer as keyof typeof question];

                return (
                  <label key={key} className={styles.option}>
                    <button
                      type="button"
                      onClick={() =>
                        !isSubmitted &&
                        !isDisabled &&
                        handleAnswerChange(question.id, option)
                      }
                      disabled={isSubmitted || isDisabled}
                      className={styles.checkbox}
                      data-submited={isSubmitted}
                      data-selected={isSelected}
                      data-correct={isCorrectAnswer}
                      aria-label={isSelected ? "Selected" : "Not selected"}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        aria-hidden="true"
                        className="shrink-0"
                        style={{ width: "15px", height: "15px" }}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>
                      </svg>
                    </button>
                    {option}
                  </label>
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
          <Check size={16} /> Submit Answers
        </button>
      ) : (
        <p className={isCorrect ? styles.correct : styles.incorrect}>
          {isCorrect
            ? "Correct! Well done!"
            : "Incorrect. Try again in 24 hours."}
        </p>
      )}
    </div>
  );
}
