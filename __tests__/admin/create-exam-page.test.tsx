vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  }),
}));

import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CreateExamPage from "@/app/(routes)/instructor/subjects/[subjectCode]/exam/create/page";

test("Page", () => {
  render(<CreateExamPage params={{ subjectCode: "PHYCDN" }} />);

  const button = screen.getByRole("button", { name: "Save Exam" });
  expect(button).toBeDefined();
});
