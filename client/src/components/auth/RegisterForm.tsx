"use client";

import { TRegisterSchema, registerSchemas } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "@/styles/react-phone-input.css";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchemas),
  });

  const onSubmit: SubmitHandler<TRegisterSchema> = (data) => {
    console.log(data);
  };
  return (
    <form
      className="mx-auto max-w-md space-y-5 py-16"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label htmlFor="avatar" className="mb-2 block text-sm font-medium ">
          Avatar
        </label>
        <input
          type="file"
          id="avatar"
          className="block w-full border bg-transparent p-2.5 focus:border-b-primary focus:outline-none"
          placeholder="John"
          disabled={isSubmitting}
          {...register("avatar")}
        />
        {errors.avatar && (
          <p className="p-1 text-red-600">{errors.avatar?.message as string}</p>
        )}
      </div>
      <div>
        <label htmlFor="coverImage" className="mb-2 block text-sm font-medium ">
          Cover image
        </label>
        <input
          type="file"
          id="coverImage"
          className="block w-full border bg-transparent p-2.5 focus:border-b-primary focus:outline-none"
          placeholder="John"
          disabled={isSubmitting}
          {...register("coverImage")}
        />
        {errors.coverImage && (
          <p className="p-1 text-red-600">
            {errors.coverImage?.message as string}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="firstName" className="mb-2 block text-sm font-medium ">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          className="block w-full border bg-transparent p-2.5 focus:border-b-primary focus:outline-none"
          placeholder="John"
          disabled={isSubmitting}
          {...register("firstName")}
        />
        {errors.firstName && (
          <p className="p-1 text-red-600">{errors.firstName?.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="mb-2 block text-sm font-medium  focus:border-b-primary "
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          placeholder="Doe"
          disabled={isSubmitting}
          className="block w-full border bg-transparent p-2.5 focus:border-b-primary focus:outline-none"
          {...register("lastName")}
        />
        {errors.lastName && (
          <p className="p-1 text-red-600">{errors.lastName?.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium  focus:border-b-primary "
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="example@example.com"
          disabled={isSubmitting}
          className="block w-full border bg-transparent p-2.5 focus:border-b-primary focus:outline-none"
          {...register("email")}
        />

        {errors.email && (
          <p className="p-1 text-red-600">{errors.email?.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="phoneNumber"
          className="mb-2 block text-sm font-medium  focus:border-b-primary"
        >
          Phone Number
        </label>
        <PhoneInput
          inputClass="!w-full !bg-transparent !text-white"
          dropdownClass="!bg-gray-700"
          countryCodeEditable={false}
          autoFormat
          country="us"
          onChange={(value: string) => setValue("phoneNumber", value)}
        />

        {errors.phoneNumber && (
          <p className="p-1 text-red-600">{errors.phoneNumber?.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium  focus:border-b-primary "
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="********"
          disabled={isSubmitting}
          className="block w-full border bg-transparent p-2.5 focus:border-b-primary focus:outline-none"
          {...register("password")}
        />
        {errors.password && (
          <p className="p-1 text-red-600">{errors.password?.message}</p>
        )}
      </div>
      {errors.root && (
        <p className="ml-1 mt-2 text-[red]"> {errors.root.message} </p>
      )}

      <p className="font-normal">
        Already have an account?&nbsp;
        <Link href="/login" className="font-medium">
          <span className="text-blue-700 underline">Login here</span>
        </Link>
      </p>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg border-2 border-white bg-primary py-3 font-bold text-white transition-all duration-400 ease-in-out hover:border-[#e4e4e4] hover:bg-white hover:text-primary"
      >
        {isSubmitting ? "Loading..." : "Sign up"}
      </button>
    </form>
  );
}
