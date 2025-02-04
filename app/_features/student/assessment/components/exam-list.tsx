import { ReadModules } from "@/app/_features/admin/manage-modules/actions/read-module";
import { ReadSubjects } from "@/app/_features/admin/manage-subjects/actions/read-subjects";
import { ReadExams } from "../actions/read-exam";
import Link from "next/link";

async function getAllSubjects(afosDesignation: string): Promise<string[]> {
  const subjects: string[] = [];

  const response = await ReadModules({ afos_code: afosDesignation });

  if (response.success) {
    const modules = response.data;

    if (modules) {
      for (const mod of modules) {
        const data = await ReadSubjects({ module_id: mod.module_id });
        const subjectList = data.data;

        if (subjectList) {
          for (const subject of subjectList) {
            subjects.push(subject.subject_code.toString());
          }
        }
      }
    }
  } else {
    console.log(response.message);
  }

  return subjects;
}

interface Exam {
  exam_id: number;
  duration: number;
  availability: Date;
  subject: string;
}

export default async function ExamList({
  afosDesignation,
}: {
  afosDesignation: string;
}) {
  const subjects = await getAllSubjects(afosDesignation);

  const exams: Exam[] = [];

  for (const subject of subjects) {
    const response = await ReadExams({ subjectCode: subject });
    if (response.data && response.data.length > 0) {
      exams.push({
        exam_id: response.data[0].exam_id,
        duration: response.data[0].duration,
        availability: response.data[0].availability,
        subject: response.data[0].subject,
      });
    }
  }

  return (
    <div>
      {exams.map((exam) => {
        const isAvailable =
          exam.availability.getTime() < Date.now() &&
          exam.availability.getTime() + exam.duration * 60 * 60 * 1000 >
            Date.now();

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
