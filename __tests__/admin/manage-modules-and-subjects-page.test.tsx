import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ManageModulesAndSubjectsPage from "@/app/(routes)/admin/manage-courses/[afosCode]/page";

test("Page", () => {
  render(
    <ManageModulesAndSubjectsPage
      params={{
        afosCode: "AAAAA",
      }}
    />
  );
  const button = screen.getByRole("button", { name: "Add" });
  expect(button).toBeDefined();
});
