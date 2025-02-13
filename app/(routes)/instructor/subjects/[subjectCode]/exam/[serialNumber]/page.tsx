import { ReadEssayAnswers } from "@/app/_features/instructor/manage-exam/actions/read-essay-answers";
import { ReadExam } from "@/app/_features/instructor/manage-exam/actions/read-exam";
import Students from "@/app/_features/instructor/manage-exam/components/students";
import { ReadQuestion } from "@/app/_features/student/assessment/actions/read-question";

async function GetAllQuestions(subjectCode: string) {
  const response = await ReadExam({ subjectCode });
  const data = (await GetQuestions({ examId: response.data?.[0].exam_id })) as
    | Question[]
    | undefined;
  return data;
}

async function GetQuestions({ examId }: { examId: number }) {
  const response = await ReadQuestion({ examId }).then((response) => {
    if (response.success) {
      return response.data;
    } else {
      console.log(response.message);
    }
  });
  return response;
}

async function GetEssayAnswers({
  serialNumber,
  questionId,
}: {
  serialNumber: number;
  questionId: number[];
}) {
  const essayAnswerList: (Answer | null)[] = await Promise.all(
    questionId.map(async (id) => {
      const response = await ReadEssayAnswers({
        examQuestionId: id,
        studentSerial: serialNumber,
      });

      if (response.data && response.data[0]) {
        return response.data[0] as Answer;
      } else {
        console.error("No data found for exam question id:", id);
        return null;
      }
    })
  );

  // Filter out null values (if necessary)
  const filteredEssayAnswers: Answer[] = essayAnswerList.filter(
    (answer): answer is Answer => answer !== null
  );

  return filteredEssayAnswers;
}

interface Answer {
  essay_answer_id: number;
  answer_text: string;
  student_serial: number;
  exam_question_id: number;
}

interface Question {
  exam_question_id: number;
  item_number: number;
  question: string;
  correct_answer: string;
  exam_type: string;
  written_exam: number;
}

export default async function CheckEssayPage({
  params,
}: {
  params: { serialNumber: string; subjectCode: string };
}) {
  const questions = await GetAllQuestions(params.subjectCode);

  const essayQuestions: Question[] = [];
  const questionId: number[] = [];

  questions?.forEach((answer) => {
    if (answer.exam_type === "essay") {
      essayQuestions.push(answer);
      questionId.push(answer.exam_question_id);
    }
  });

  const data = await GetEssayAnswers({
    serialNumber: Number(params.serialNumber),
    questionId,
  });

  return (
    <Students
      essayQuestions={essayQuestions}
      essayAnswers={data}
      subjectCode={params.subjectCode}
    />
  );
}
