"use client";

import { Input, Button } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TLoginSchema } from "@/schemas/loginSchema";
import { ImCross } from "react-icons/im";
import { loginUser } from "@/lib/users";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isLoading },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<TLoginSchema> = async (formData) => {
    const res = await loginUser(formData);

    if (!res.ok) setError("root", { message: res.error });
    else router.push("/");
  };

  return (
    <section>
      <form
        className="mx-auto mt-12 max-w-md space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-3xl font-bold">Sign in</h1>
        <div>
          <Input
            id="email"
            type="email"
            label="Email"
            labelPlacement="outside"
            description="Your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="px-2 text-red-600"> {errors.email.message} </p>
          )}
        </div>
        <div>
          <Input
            id="password"
            type="password"
            label="Password"
            labelPlacement="outside"
            description="Your password"
            {...register("password")}
          />
          {errors.password && (
            <p className="px-2 text-red-600"> {errors.password.message} </p>
          )}
        </div>

        {errors.root && (
          <div className="flex items-center gap-4 bg-red-100 p-2 text-red-800">
            <ImCross size={18} /> {errors.root.message}
          </div>
        )}

        <Button type="submit" color="primary" fullWidth isLoading={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </section>
  );
}
