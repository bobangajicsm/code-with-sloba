"use client";
import { useState } from "react";
import styles from "./quiz.module.scss";

interface QuestionData {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
}

interface QuizProps {
  questionData: QuestionData;
  postId: string;
  userId: string;
}

export default function Quiz({ questionData, postId, userId }: QuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const isCorrect = selectedAnswer === questionData.correctAnswer;

  const handleSubmit = async () => {
    if (isSubmitted || isDisabled) return;

    setIsSubmitted(true);

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, postId, isCorrect }),
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
      <h3>Question</h3>
      <div className={styles.question}>
        <p>{questionData.question}</p>
        <div className={styles.options}>
          {["A", "B", "C", "D"].map((key, i) => {
            const option = questionData[`option${key}` as keyof QuestionData];
            return (
              <label
                key={i}
                className={`${styles.option} ${
                  isSubmitted && option === questionData.correctAnswer
                    ? styles.correct
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="quiz-question"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => setSelectedAnswer(option)}
                  disabled={isSubmitted || isDisabled}
                />
                {option}
              </label>
            );
          })}
        </div>
      </div>
      {!isSubmitted ? (
        <button
          className={styles.button}
          onClick={handleSubmit}
          disabled={!selectedAnswer || isDisabled}
        >
          Submit Answer
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
