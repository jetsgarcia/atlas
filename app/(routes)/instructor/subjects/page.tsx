import { cookies } from "next/headers";
import SubjectsList from "@/app/(routes)/instructor/subjects/_components/subjects-list";

export default function SubjectsPage() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return null;
  }

  return <SubjectsList userId={userId} />;
}
