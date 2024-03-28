"use client";

import { TRegisterSchema, registerSchemas } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { IoIosSend } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import "react-phone-input-2/lib/style.css";
import "@/styles/react-phone-input.css";
import { registerUser } from "@/lib/users";
import { useRouter } from "next/navigation";
import { EyeFilledIcon } from "../icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon";

export function RegisterForm() {
  const [success, setSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const router = useRouter();

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

  const onSubmit: SubmitHandler<TRegisterSchema> = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList) formData.append(key, value[0]);
      else formData.append(key, value);
    });

    const res = await registerUser(formData);

    if (!res.ok) {
      setError("root", { message: res.error });
      setSuccess(false);
    } else {
      reset();
      setSuccess(true);
      setTimeout(() => router.push("/"), 3000);
    }
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
        <Input
          type="file"
          variant="underlined"
          max={1}
          id="avatar"
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
        <Input
          id="coverImage"
          type="file"
          variant="underlined"
          max={1}
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
        <Input
          type="text"
          variant="underlined"
          id="firstName"
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
        <Input
          type="text"
          variant="underlined"
          id="lastName"
          placeholder="Doe"
          disabled={isSubmitting}
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
        <Input
          type="email"
          variant="underlined"
          id="email"
          placeholder="example@example.com"
          disabled={isSubmitting}
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
          inputClass="!w-full !bg-transparent !text-white "
          dropdownClass="!bg-gray-700"
          countryCodeEditable={false}
          autoFormat
          country="np"
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

        <Input
          variant="underlined"
          id="password"
          placeholder="********"
          disabled={isSubmitting}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
              ) : (
                <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          {...register("password")}
        />
        {errors.password && (
          <p className="p-1 text-red-600">{errors.password?.message}</p>
        )}
      </div>

      {success && (
        <div className="flex items-center gap-3 bg-emerald-100 p-2 text-emerald-800">
          <IoIosSend size={24} /> Email verification link sent to your gmail
        </div>
      )}

      {errors.root && (
        <div className="flex items-center gap-4 bg-red-100 p-2 text-red-800">
          <ImCross size={18} /> {errors.root.message}
        </div>
      )}

      <p className="font-normal">
        Already have an account?&nbsp;
        <Link href="/login" className="font-medium">
          <span className="text-blue-700 underline">Login here</span>
        </Link>
      </p>
      <Button
        color="primary"
        fullWidth
        type="submit"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading" : "Sign up"}
      </Button>
    </form>
  );
}
