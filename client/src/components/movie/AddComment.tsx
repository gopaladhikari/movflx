"use client";

import { addCommentOnMovie } from "@/lib/comments";
import { TTextSchema, textSchema } from "@/schemas/updateCommentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  avatar: string | undefined;
  movieId: string;
  name: string;
  email: string | undefined;
};

export function AddComment({ avatar, movieId, name, email }: Props) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TTextSchema>({
    resolver: zodResolver(textSchema),
  });

  const onSubmit: SubmitHandler<TTextSchema> = async ({ text }) => {
    const res = await addCommentOnMovie(movieId, text, email, name);
    if (res?.data) reset();
  };

  return (
    <div className="flex items-start gap-4 py-6">
      <Avatar isBordered as="button" size="lg" src={avatar || ""} />

      <form
        className="flex w-full flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          variant="underlined"
          fullWidth
          disabled={isSubmitting}
          placeholder="Add a comment..."
          {...register("text")}
        />

        {errors.text && (
          <p className="text-sm text-red-500">{errors.text.message}</p>
        )}

        <Button
          type="submit"
          isLoading={isSubmitting}
          variant="faded"
          className="ml-auto w-fit"
        >
          {isSubmitting ? "loading..." : "comment"}
        </Button>
      </form>
    </div>
  );
}
