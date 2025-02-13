import { ReadModules } from "@/app/_features/admin/manage-modules/actions/read-module";
import { ReadSubjects } from "@/app/_features/admin/manage-subjects/actions/read-subjects";
import { ReadExams } from "../actions/read-exam";
import Exams from "./exams";

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

  return <Exams {...exams} />;
}
