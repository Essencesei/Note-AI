"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

import { useSession } from "next-auth/react";
import { CREATE_NOTE } from "@/lib/server_actions/action";

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title must be at least 1 character long" }),
  content: z.string(),
});

const AddNote = () => {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const session = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onsubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    if (!session) throw Error("You must be logged in to create a note");
    const newValues = {
      ...values,
      authorId: session.data?.user.id as string,
    };

    await CREATE_NOTE(newValues);
    setIsOpen(false);
    setIsLoading(false);
    form.reset();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Add Note</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Note</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onsubmit)}
              className="flex gap-4 flex-col"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Input placeholder="Title" {...field}></Input>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <Textarea placeholder="Content" {...field}></Textarea>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button disabled={isloading} type="submit">
                  Create Note{" "}
                  {isloading && <Loader2 className="animate-spin" />}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNote;
