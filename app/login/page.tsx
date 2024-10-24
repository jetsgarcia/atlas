"use client";

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
import PasswordInput from "@/components/auth/password-input";
import Banner from "@/components/auth/banner";
import FormHeader from "@/components/auth/form-header";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  email: z.string().min(2, "Email required").email("Invalid email format"),
  password: z.string().min(1, "Password required"),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Handle form submission
    console.log(values);
  }

  return (
    <main className="flex h-screen">
      <div className="hidden sm:w-[40%] sm:bg-military-green sm:grid sm:place-items-center">
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
            <FormHeader />
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
                      <Input placeholder="example@domain.com" {...field} />
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
                      <PasswordInput field={field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      The email you use for your account.
                    </FormDescription>
                    <FormMessage />
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
    </main>
  );
}