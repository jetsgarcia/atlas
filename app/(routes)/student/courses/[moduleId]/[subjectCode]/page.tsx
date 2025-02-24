"use client";

import { ReadVideos } from "@/actions/read-video";
import Loader from "@/components/loader";
import PageTitle from "@/components/page-title";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Video {
  video_id: string;
  title: string;
  description: string;
  url: string;
}

export default function VideosPage({
  params,
}: {
  params: { moduleId: number; subjectCode: string };
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [video, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    async function fetchVideosData() {
      try {
        const { success, data, message } = await ReadVideos({
          subjectCode: params.subjectCode,
        });
        if (success) {
          setVideos(data as Array<Video>);
        } else {
          console.log(message || "An error occurred");
        }
      } catch (error: unknown) {
        console.log(
          error instanceof Error ? error.message : "An error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchVideosData();
  }, [params.subjectCode]);

  return isLoading ? (
    <div className="h-[calc(100vh-5.8rem)]">
      <Loader />
    </div>
  ) : (
    <div className="grid gap-4">
      <div className="flex items-center gap-2">
        <Link href={`/student/courses/${params.moduleId}`}>
          <ChevronLeft />
        </Link>
        <PageTitle title="Videos" />
      </div>
      {video.map((video) => {
        return (
          <div
            key={video.video_id}
            className="border rounded-xl overflow-hidden"
          >
            <Link
              href={`/student/courses/${params.moduleId}/${params.subjectCode}/${video.video_id}`}
              className="flex rounded-xl overflow-hidden border border-gray-200 transition-all duration-200 hover:bg-white"
            >
              <div className="w-1/4 bg-darkGreen-400 h-48 transition-transform duration-300"></div>
              <div className="flex flex-col p-2 px-4 my-4 w-3/4">
                <div className="text-lg font-semibold">{video.title}</div>
                <div className="text-gray-800">{video.description}</div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
