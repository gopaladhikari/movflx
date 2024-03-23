"use client";

import { Input, Button } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TLoginSchema } from "@/schemas/loginSchema";

export function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isLoading },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<TLoginSchema> = (formData) => {
    console.log(formData);
  };

  return (
    <section>
      <form className="mx-auto mt-8  max-w-md space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
          {errors.email && <p className="px-2 text-red-600"> {errors.email.message} </p>}
        </div>
        <div>
          <Input
            id="email"
            type="email"
            label="Password"
            labelPlacement="outside"
            description="Your password"
            {...register("password")}
          />
          {errors.password && <p className="px-2 text-red-600"> {errors.password.message} </p>}
        </div>

        <Button type="submit" color="primary" fullWidth isLoading={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </section>
  );
}
