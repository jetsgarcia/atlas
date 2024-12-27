"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { startTransition, useState } from "react";
import { login } from "@/actions/authentication/login";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Banner from "./_components/banner";
import { Eye, EyeOff } from "lucide-react";

// This is a form schema that is used to validate the form data.
const formSchema = z.object({
  email: z.string().min(2, "Email required").email("Invalid email format"),
  password: z.string().min(1, "Password required"),
});

export default function LoginPage() {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  // Initialize the form with validation schema and default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle the login form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      login(values).then((response) => {
        const { redirectURL, message } = response;
        // Error block
        if (message) setLoginError(message);
        // Success block
        if (redirectURL) router.push(redirectURL);
      });
    });
  }

  return (
    <div className="flex h-screen">
      <div className="hidden sm:w-[40%] sm:bg-darkGreen-500 sm:grid sm:place-items-center">
        <Banner
          wrapperClassName="text-white text-center flex flex-col gap-4"
          width={175}
          height={175}
          headerClassName="text-xl"
          paragraphClassName="text-3xl font-extrabold"
        />
      </div>
      <div className="sm:w-[60%] sm:mt-0 w-full sm:grid sm:justify-normal sm:place-items-center flex justify-center mt-20">
        <div className="w-[80%] sm:w-[60%]">
          <div className="mb-4 grid gap-2">
            <p className="hidden sm:block sm:text-3xl sm:font-bold">Login</p>
            <p className="hidden sm:block sm:text-xl">
              Enter your credentials to continue
            </p>
            <Banner
              wrapperClassName="sm:hidden text-center flex flex-col gap-2 mb-4"
              width={120}
              height={120}
              headerClassName="mt-4"
              paragraphClassName="text-lg font-bold"
            />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@domain.com"
                        {...field}
                        onChange={(e) => {
                          setLoginError("");
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      The email you use for your account.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-8">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={passwordVisibility ? "text" : "password"}
                          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                          {...field}
                          onChange={(e) => {
                            setLoginError("");
                            field.onChange(e);
                          }}
                        />
                        <button
                          onClick={() =>
                            setPasswordVisibility((current) => !current)
                          }
                          type="button"
                          className="opacity-50 absolute inset-y-0 right-2 hover:opacity-80"
                        >
                          {passwordVisibility ? (
                            <Eye className="h-5" />
                          ) : (
                            <EyeOff className="h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormDescription className="sr-only">
                      The email you use for your account.
                    </FormDescription>
                    <FormMessage>{loginError}</FormMessage>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full font-semibold">
                Log in
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
