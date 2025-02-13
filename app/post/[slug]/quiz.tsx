"use client";
import { useState } from "react";
import styles from "./quiz.module.scss";

export default function Quiz({ questionData }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isCorrect = selectedAnswer === questionData.correctAnswer;

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className={styles.quizContainer}>
      <h3>Question</h3>
      <div className={styles.question}>
        <p>{questionData.question}</p>
        <div className={styles.options}>
          {[
            questionData.optionA,
            questionData.optionB,
            questionData.optionC,
            questionData.optionD,
          ].map((option, i) => (
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
                disabled={isSubmitted}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      {!isSubmitted ? (
        <button
          className={styles.button}
          onClick={handleSubmit}
          disabled={!selectedAnswer}
        >
          Submit Answer
        </button>
      ) : (
        <p className={isCorrect ? styles.correct : styles.incorrect}>
          {isCorrect
            ? "✅ Correct! Well done!"
            : `❌ Incorrect. The correct answer is "${questionData.correctAnswer}"`}
        </p>
      )}
    </div>
  );
}
