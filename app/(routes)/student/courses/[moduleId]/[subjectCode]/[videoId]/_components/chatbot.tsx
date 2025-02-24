"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";
import { Bot, MessageCircle, SendHorizontal } from "lucide-react";

export default function Chatbot({
  videoTitle,
  videoDescription,
}: {
  videoTitle: string;
  videoDescription: string;
}) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
  } = useChat({
    initialMessages: [
      {
        id: "system-1",
        role: "system",
        content: `You are a Philippine Army instructor. Only answer questions strictly related to the military, especially topics relevant to the Philippine Army. Ignore any other interpretations, even if the question is vague.\n\nUse the following video information for context:\nVideo Title: ${videoTitle}\nVideo Description: ${videoDescription}`,
      },
    ],
  });

  // Submit without modifying user input
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Directly submit the user's question without adding the context
    originalHandleSubmit(e);
  };

  return (
    <div className="relative w-[360px] bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
      <h2 className="bg-darkGreen-500 text-white p-4 flex gap-3 items-center">
        <Bot /> Chatbot
      </h2>
      <div className="flex flex-col space-y-4 overflow-auto max-h-[70vh] p-4 flex-grow">
        {messages.length === 0 ? (
          <div className="text-center mt-40 flex flex-col items-center">
            <MessageCircle className="text-gray-500 mb-4" size={48} />
            <p className="text-lg text-gray-500">No messages yet</p>
          </div>
        ) : (
          messages.map((m, index) =>
            index === 0 ? null : ( // Skip rendering the first message
              <div key={m.id} className="whitespace-pre-wrap pb-4">
                <div
                  className={`p-2 rounded-lg ${
                    m.role === "user"
                      ? "flex justify-end text-right"
                      : "bg-darkGreen-300 text-white dark:bg-zinc-600 self-start"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            )
          )
        )}
        <div ref={(el) => el && el.scrollIntoView({ behavior: "smooth" })} />
      </div>
      <div className="absolute bottom-0 w-full">
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex items-center px-4 pb-2"
        >
          <Input
            className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            placeholder="Type a message..."
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            className="ml-2 px-4 py-2 rounded-lg bg-darkGreen-400 hover:bg-darkGreen-600 text-white"
          >
            <SendHorizontal />
          </Button>
        </form>
      </div>
    </div>
  );
}
