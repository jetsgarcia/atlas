"use client";

import { useEffect, useState } from "react";
import { GetStudentList } from "@/app/_features/instructor/manage-grades/actions/read-students-from-subject";
import StudentGrades from "@/app/_features/instructor/manage-grades/components/student-grades";
import Loader from "@/components/loader";

type Student = {
  serial_number: string;
  first_name: string;
  last_name: string;
  middle_initial: string;
  score: number;
};

type GradesPageProps = {
  params: { subjectCode: string };
};

export default function GradesPage({ params }: GradesPageProps) {
  const [students, setStudents] = useState<Student[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const studentList = await GetStudentList({
          subjectCode: params.subjectCode,
        });
        setStudents(studentList.data as Student[]);
      } catch (err) {
        setError("Failed to fetch student list: " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [params.subjectCode]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <StudentGrades students={students || []} subjectCode={params.subjectCode} />
  );
}
