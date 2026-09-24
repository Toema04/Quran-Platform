"use client";

import React, { useState } from "react";
import { QUIZ_QUESTIONS, QuizQuestion } from "@/lib/quiz";
import { Award, CheckCircle2, XCircle, RotateCcw, ShieldCheck, ChevronRight } from "lucide-react";

export default function QuizPage() {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answersHistory, setAnswersHistory] = useState<
    { question: QuizQuestion; selected: number; isCorrect: boolean }[]
  >([]);
  const [isFinished, setIsFinished] = useState(false);

  const levels = [
    { id: 1, label: "Level 1 — Fundamentals" },
    { id: 2, label: "Level 2 — Quranic Knowledge" },
  ];

  const questions = QUIZ_QUESTIONS.filter((q) => q.level === selectedLevel);
  const currentQuestion = questions[currentIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(idx);
    const isCorrect = idx === currentQuestion.correctIndex;
    if (isCorrect) setScore((prev) => prev + 1);

    setAnswersHistory((prev) => [
      ...prev,
      { question: currentQuestion, selected: idx, isCorrect },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIndex(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setAnswersHistory([]);
    setIsFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/10 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
          <Award className="h-4 w-4 text-amber-500" />
          <span>Interactive Learning</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
          Islamic Knowledge Quiz
        </h1>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Test and expand your understanding of the Quran, Seerah, Prophets, and Islamic history with verified references.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {levels.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => {
                setSelectedLevel(lvl.id);
                handleRestart();
              }}
              className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold border transition ${
                selectedLevel === lvl.id
                  ? "bg-emerald-800 text-white border-emerald-800 shadow-xs"
                  : "bg-card border-emerald-900/10 text-muted-foreground hover:text-foreground"
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      {!isFinished && currentQuestion ? (
        <div className="p-8 rounded-3xl border border-emerald-900/10 bg-card space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b pb-4 text-xs font-semibold text-muted-foreground">
            <span>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span>Score: {score}</span>
          </div>

          <h2 className="text-xl font-serif font-bold text-foreground leading-snug">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => {
              let btnStyle = "border-emerald-900/10 bg-background hover:bg-emerald-900/5";
              if (selectedIndex !== null) {
                if (idx === currentQuestion.correctIndex) {
                  btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 font-bold";
                } else if (idx === selectedIndex) {
                  btnStyle = "border-red-500 bg-red-500/10 text-red-950 dark:text-red-200 font-bold";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {selectedIndex !== null && idx === currentQuestion.correctIndex && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  )}
                  {selectedIndex !== null && idx === selectedIndex && idx !== currentQuestion.correctIndex && (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedIndex !== null && (
            <div className="p-4 rounded-2xl bg-emerald-900/5 border border-emerald-900/10 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                <ShieldCheck className="h-4 w-4" />
                <span>Verified Source: {currentQuestion.source}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{currentQuestion.explanation}</p>

              <button
                onClick={handleNextQuestion}
                className="mt-2 w-full py-2.5 rounded-xl bg-emerald-800 text-white font-bold hover:bg-emerald-700 transition flex items-center justify-center gap-1 shadow-xs"
              >
                <span>Next Question</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 rounded-3xl border border-emerald-900/10 bg-card space-y-6 shadow-xs text-center">
          <Award className="h-12 w-12 text-amber-500 mx-auto" />
          <div className="space-y-1">
            <h2 className="text-2xl font-serif font-bold text-foreground">Quiz Completed!</h2>
            <p className="text-sm text-muted-foreground">
              You scored <strong className="text-emerald-800 dark:text-emerald-300">{score}</strong> out of{" "}
              {questions.length}
            </p>
          </div>

          <div className="space-y-4 text-left border-t pt-4">
            <h3 className="font-serif font-bold text-base text-foreground">Answer Review</h3>
            {answersHistory.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-emerald-900/5 space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span>{item.question.question}</span>
                  {item.isCorrect ? (
                    <span className="text-emerald-600">Correct</span>
                  ) : (
                    <span className="text-red-600">Incorrect</span>
                  )}
                </div>
                <p className="text-muted-foreground">
                  Source: <strong>{item.question.source}</strong>
                </p>
                <p className="text-muted-foreground">{item.question.explanation}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-2xl bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-700 transition shadow-md inline-flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
        </div>
      )}
    </div>
  );
}
