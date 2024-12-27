import { CreateVideo } from "@/actions/instructor/create-video";
import SubmitButton from "./_components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ManageVideosPage({
  params,
}: {
  params: { subjectCode: string };
}) {
  async function upload(data: FormData) {
    "use server";

    const title = data.get("title") as string | null;
    const description = data.get("description") as string | null;

    if (!title || !description) {
      throw new Error("Title or description is missing");
    }

    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      throw new Error("No file selected");
    }

    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const response = await CreateVideo({
        subjectCode: params.subjectCode,
        title,
        description,
        file: buffer,
        filename: file.name,
      });

      if (!response.success) {
        throw new Error("Failed to upload video");
      }

      throw new Error("Video uploaded successfully!");
    } catch (error) {
      console.log(error);
      throw new Error("An unknown error occurred");
    }
  }

  return (
    <form
      onSubmit={async () => upload}
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
