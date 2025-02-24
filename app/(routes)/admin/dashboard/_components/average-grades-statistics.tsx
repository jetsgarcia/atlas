import { useEffect, useState } from "react";
import { ReadWrittenScoresStatistics } from "../_actions/read-written-scores-statistics";
import { ReadPracticalScoresStatistics } from "../_actions/read-practical-scores-statistics";

interface WrittenScore {
  score_id: number;
  score: number;
}

interface PracticalScore {
  score_id: number;
  score: number;
}

export default function AverageGradeStatistics() {
  const [averageWrittenScore, setAverageWrittenScore] = useState<number | null>(
    null
  );
  const [averagePracticalScore, setAveragePracticalScore] = useState<
    number | null
  >(null);
  useEffect(() => {
    ReadWrittenScoresStatistics()
      .then((response) => {
        const scores = response.data as WrittenScore[];

        if (
          Array.isArray(scores) &&
          scores.every((item) => "score_id" in item && "score" in item)
        ) {
          const total = scores.reduce((sum, item) => sum + item.score, 0);
          const average = total / scores.length;
          setAverageWrittenScore(average);
        } else {
          console.error("Invalid data format received", response.data);
          setAverageWrittenScore(0);
        }
      })
      .catch((error) => {
        console.error("Error fetching written scores:", error);
        setAverageWrittenScore(0);
      });

    ReadPracticalScoresStatistics()
      .then((response) => {
        const scores = response.data as PracticalScore[];

        if (
          Array.isArray(scores) &&
          scores.every((item) => "score_id" in item && "score" in item)
        ) {
          const total = scores.reduce((sum, item) => sum + item.score, 0);
          const average = total / scores.length;
          setAveragePracticalScore(average);
        } else {
          console.error("Invalid data format received", response.data);
          setAveragePracticalScore(0);
        }
      })
      .catch((error) => {
        console.error("Error fetching written scores:", error);
        setAverageWrittenScore(0);
      });
  }, []);

  return (
    <div className="space-y-4 flex-grow flex flex-col w-1/2">
      <div className="bg-white rounded-xl p-8 space-y-2 h-1/2">
        <div>
          <h2 className="text-lg font-semibold">Average Written Exam Score</h2>
          {averageWrittenScore !== null ? (
            <p className="text-7xl font-semibold">
              {averageWrittenScore.toFixed(2)}
            </p>
          ) : (
            <p className="text-4xl font-semibold">Loading...</p>
          )}
          <div
            className={`border-b-4 border-green-700 w-full my-4 overflow-hidden ${
              averageWrittenScore !== null
                ? "transition-all duration-1000 ease-out scale-x-100"
                : "scale-x-0"
            } origin-left`}
          ></div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-8 space-y-2 h-1/2">
        <h2 className="text-lg font-semibold">Average Practical Exam Score</h2>

        {averagePracticalScore !== null ? (
          <p className="text-7xl font-semibold">
            {averagePracticalScore.toFixed(2)}{" "}
          </p>
        ) : (
          <p className="text-4xl font-semibold">Loading...</p>
        )}
        <div
          className={`border-b-4 border-green-700 w-full my-4 overflow-hidden ${
            averagePracticalScore !== null
              ? "transition-all duration-1000 ease-out scale-x-100"
              : "scale-x-0"
          } origin-left`}
        ></div>
      </div>
    </div>
  );
}
