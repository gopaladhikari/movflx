"use client";

import { deleteFromWatchlist } from "@/lib/watchlist";
import { Loader2, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "../ui/use-toast";

interface Props {
  movieId: string | undefined;
}

export function DeleteFromWatchlistButton({ movieId }: Props) {
  const { data } = useSession();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const id = data?.user?._id;

  const onSubmit = async () => {
    const res = await deleteFromWatchlist(id, movieId);

    if (res?.sucess)
      toast({
        title: "Success",
        description: res.message,
      });
    else {
      toast({
        title: "Error",
        variant: "destructive",
        description: res?.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isSubmitting ? (
        <button type="button" className="flex items-center gap-3">
          <Loader2 size={16} className="animate-spin" />
          Please wait
        </button>
      ) : (
        <button type="submit" className="flex items-center gap-3">
          <Trash size={16} /> Delete
        </button>
      )}
    </form>
  );
}
