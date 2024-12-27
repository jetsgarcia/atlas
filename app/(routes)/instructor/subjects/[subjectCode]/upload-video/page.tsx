"use client";

import { upload } from "@/actions/instructor/upload";
import SubmitButton from "./_components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ManageVideosPage({
  params,
}: {
  params: { subjectCode: string };
}) {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const result = await upload(formData, params.subjectCode);
        if (result.error) {
          alert(result.error);
        } else {
          alert(result.message);
        }
      }}
      className="max-w-[40rem] m-auto grid gap-4"
    >
      <h1 className="text-2xl font-bold">Upload Video</h1>
      <div className="">
        <Label htmlFor="file">File</Label>
        <Input id="file" name="file" type="file" accept="video/*" required />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" type="text" required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          className="h-52"
        />
      </div>
      <SubmitButton subjectCode={params.subjectCode} />
    </form>
  );
}
