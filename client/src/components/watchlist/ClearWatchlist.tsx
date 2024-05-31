"use client";

import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { clearWatchlist } from "@/lib/watchlist";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

export function ClearWatchlist() {
  const { data } = useSession();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const id = data?.user?._id;

  const onSubmit = async () => {
    const res = await clearWatchlist(id);
    if (res?.sucess)
      toast({
        title: "Success",
        description: res.message,
      });
    else
      toast({
        title: "Error",
        variant: "destructive",
        description: res?.message,
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isSubmitting ? (
        <Button
          type="button"
          disabled
          className="gap-2"
          variant="destructive"
        >
          <Loader2 size={16} className="animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit" variant="destructive">
          Clear
        </Button>
      )}
    </form>
  );
}
