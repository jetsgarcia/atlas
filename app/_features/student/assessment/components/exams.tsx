"use client";

import Link from "next/link";

interface Exam {
  exam_id: number;
  duration: number;
  availability: Date;
  subject: string;
}

export default function exams(exams: Exam[]) {
  return (
    <div>
      {exams.map((exam) => {
        const examStart = new Date(exam.availability).getTime();
        const now = Date.now();
        const examEnd = examStart + exam.duration * 60 * 60 * 1000;

        const isAvailable = examStart < now && examEnd > now;

        return (
          <>
            {isAvailable ? (
              <Link href={`assessments/${exam.exam_id}`} key={exam.exam_id}>
                <div
                  className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 border border-gray-200 dark:border-gray-700 
                transition-all duration-300 hover:shadow-xl hover:border-gray-400 dark:hover:border-gray-500 
                active:shadow-md cursor-pointer"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {exam.subject}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Date: {exam.availability.toLocaleDateString("en-US")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      Duration: {exam.duration} hours
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Time:{" "}
                      {exam.availability.toLocaleTimeString("en-US", {
                        hour12: false,
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <div
                key={exam.exam_id}
                className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 border border-gray-200 dark:border-gray-700 
                transition-all duration-300 opacity-50"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {exam.subject}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Date: {exam.availability.toLocaleDateString("en-US")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Duration: {exam.duration} hours
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Time:{" "}
                    {exam.availability.toLocaleTimeString("en-US", {
                      hour12: false,
                    })}
                  </p>
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}
