"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

interface RedirectButtonProps {
  field: object;
}

export default function PasswordInput({ field }: RedirectButtonProps) {
  const [visibility, setVisibility] = useState(false);

  function toggleVisibility() {
    setVisibility((prev) => !prev);
  }

  return (
    <div className="relative">
      <Input
        type={visibility ? "text" : "password"}
        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
        {...field}
      />
      <Button onClick={toggleVisibility} type="button" variant="input">
        <Image
          src={visibility ? "icons/visibility.svg" : "icons/visibility_off.svg"}
          alt={visibility ? "Hide password" : "Show password"}
          width={20}
          height={20}
        />
      </Button>
    </div>
  );
}
