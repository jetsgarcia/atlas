"use client";

import { useEffect, useState } from "react";
import { ReadExams } from "../_actions/read-exam";
import Link from "next/link";
import Loader from "@/components/loader";
import { ReadAllSubjectsFromAFOS } from "../_actions/read-all-subjects-from-afos";

interface Exam {
  exam_id: number;
  duration: number;
  availability: string; // Store as an ISO string for consistency
  subject: string;
}

export default function ExamList({
  afosDesignation,
}: {
  afosDesignation: string;
}) {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await ReadAllSubjectsFromAFOS({
          afosCode: afosDesignation,
        });

        const subjects = response.data;

        const examResults: Exam[] = [];
        for (const subject of subjects ?? []) {
          const examResponse = await ReadExams({ subjectCode: subject });
          if (examResponse.data && examResponse.data.length > 0) {
            examResults.push({
              exam_id: examResponse.data[0].exam_id,
              duration: examResponse.data[0].duration,
              availability: new Date(
                examResponse.data[0].availability + "Z"
              ).toISOString(), // Force UTC
              subject: examResponse.data[0].subject,
            });
          }
        }

        setExams(examResults);
      } catch (error) {
        console.error("Error fetching exams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [afosDesignation]);

  if (loading) {
    return (
      <div className="h-[calc(100dvh-6rem)]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {exams.map((exam) => {
        const availabilityTime = new Date(exam.availability).getTime();
        const currentTime = new Date().getTime();
        const endTime = availabilityTime + exam.duration * 60 * 60 * 1000;

        const isAvailable =
          availabilityTime < currentTime && endTime > currentTime;

        // Convert UTC availability to user's local time
        const formattedTime = new Date(exam.availability).toLocaleTimeString(
          "en-PH",
          {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }
        );

        return (
          <div key={exam.exam_id}>
            {isAvailable ? (
              <Link href={`assessments/${exam.exam_id}`}>
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
                      Date: {new Date(exam.availability).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      Duration: {exam.duration} hours
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Time: {formattedTime}
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
                    Date:{" "}
                    {new Date(exam.availability).toLocaleDateString("en-US")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Duration: {exam.duration} hours
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Time: {formattedTime}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
