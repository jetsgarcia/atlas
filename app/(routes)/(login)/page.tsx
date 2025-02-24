import Image from "next/image";
import LoginForm from "@/app/_features/login/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      <div className="w-[40%] bg-darkGreen-500 grid place-items-center">
        <div className="text-white text-center flex flex-col gap-4">
          <Image
            className="m-auto"
            src="/logo/army_logo_3000x3000.png"
            alt="Philippine Army Logo"
            width={175}
            height={175}
          />
          <h1 className="text-xl">Philippine Army</h1>
          <p className="text-3xl font-extrabold">Combined Arms Center</p>
        </div>
      </div>
      <div className="sm:w-[60%] sm:mt-0 w-full sm:grid sm:justify-normal sm:place-items-center flex justify-center mt-20">
        <div className="w-[80%] sm:w-[60%]">
          <div className="mb-4 grid gap-2">
            <p className="hidden sm:block sm:text-3xl sm:font-bold">Login</p>
            <p className="hidden sm:block sm:text-xl">
              Enter your credentials to continue
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
