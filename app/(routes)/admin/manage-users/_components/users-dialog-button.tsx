"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Plus, X } from "lucide-react";
import { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import CreateUser from "@/actions/db/create-user";
import { useRouter } from "next/navigation";

type UserTypes = "Admin" | "Instructor" | "Student";

export default function UsersDialogButton() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [role, setRole] = useState<UserTypes>("Student");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [suffix, setSuffix] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [afos, setAFOS] = useState("");

  function handleSubmit() {
    setIsSubmitting(true);

    CreateUser({
      lastName: lastName,
      firstName: firstName,
      middleInitial: middleInitial,
      suffix: suffix,
      email: email,
      password: password,
      role: role,
    }).then((response) => {
      setIsSubmitting(false);
      if (response.success) {
        setIsDialogOpen(false);
        toast({
          description: response.message,
        });

        // Reset form
        setRole("Student");
        setLastName("");
        setFirstName("");
        setMiddleInitial("");
        setSuffix("");
        setEmail("");
        setPassword("");
        setAFOS("");
        setIsDialogOpen(false);

        router.refresh();
      } else {
        toast({
          variant: "destructive",
          description: response.message,
        });
      }
    });
  }

  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus />
          <span>Add</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => setIsDialogOpen(false)}
      >
        <DialogHeader>
          <Button
            onClick={() => setIsDialogOpen(false)}
            className="absolute top-0 right-0"
            variant="ghost"
          >
            <X />
          </Button>
          <DialogTitle>Create new user</DialogTitle>
          <DialogDescription>
            Input user details here. Click submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="level" className="text-right">
              Level
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center col-span-3"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {role}
                  <ChevronsUpDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[17.3rem]"
                onCloseAutoFocus={() => setIsDropdownOpen(false)}
                onInteractOutside={() => setIsDropdownOpen(false)}
              >
                <DropdownMenuItem
                  onClick={() => {
                    setRole("Student");
                    setIsDropdownOpen(false);
                  }}
                >
                  Student
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setRole("Admin");
                    setIsDropdownOpen(false);
                  }}
                >
                  Admin
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setRole("Instructor");
                    setIsDropdownOpen(false);
                  }}
                >
                  Instructor
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="last-name" className="text-right">
              Last name <span className="text-red-400">*</span>
            </Label>
            <Input
              id="last-name"
              className="col-span-3"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="first-name" className="text-right">
              First name <span className="text-red-400">*</span>
            </Label>
            <Input
              id="first-name"
              className="col-span-3"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="middle-initial" className="text-right">
              Middle initial
            </Label>
            <Input
              id="middle-initial"
              className="col-span-3"
              maxLength={5}
              onChange={(e) => setMiddleInitial(e.target.value.toUpperCase())}
              value={middleInitial}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="suffix" className="text-right">
              Suffix
            </Label>
            <Input
              id="suffix"
              className="col-span-3"
              onChange={(e) => setSuffix(e.target.value)}
              value={suffix}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email <span className="text-red-400">*</span>
            </Label>
            <Input
              id="email"
              className="col-span-3"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password <span className="text-red-400">*</span>
            </Label>
            <Input
              id="password"
              className="col-span-3"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {role == "Student" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="afos" className="text-right">
                AFOS
              </Label>
              <Input
                id="afos"
                className="col-span-3"
                onChange={(e) => setAFOS(e.target.value.toUpperCase())}
                value={afos}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
