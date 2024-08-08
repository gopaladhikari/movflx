"use client";

import { Input } from "@/components/ui/input";
import { updateUser } from "@/lib/users";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  updateUserSchema,
  TUpdateUserSchema,
} from "@/schemas/updateUserSchema";
import { toast } from "../ui/use-toast";

export function UpdateUser() {
  const { data: session, update } = useSession();
  const user = session?.user;

  const form = useForm<TUpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      phoneNumber: user?.phoneNumber,
    },
  });

  const onSubmit: SubmitHandler<TUpdateUserSchema> = async ({
    firstName,
    lastName,
    phoneNumber,
  }) => {
    const res = await updateUser(
      user?._id as string,
      firstName,
      lastName,
      phoneNumber
    );

    if (res?.sucess) {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated",
      });

      update({
        user: {
          ...user,
          firstName,
          lastName,
          phoneNumber,
        },
      });
    } else
      toast({ title: "Something went wrong", variant: "destructive" });
  };

  return (
    <Card className="mt-8 bg-transparent">
      <CardHeader className="bg-transparent">
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>
          Update your personal information.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              defaultValue={user?.firstName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input defaultValue={user?.firstName} {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              defaultValue={user?.lastName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input defaultValue={user?.lastName} {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input defaultValue={user?.phoneNumber} {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-end">
            {form.formState.isSubmitting ? (
              <Button disabled variant="yellow" className="w-full">
                <Loader2 className="mr-2 size-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button variant="yellow" type="submit" className="w-full">
                Save Changes
              </Button>
            )}
          </CardFooter>
        </form>{" "}
      </Form>
    </Card>
  );
}
