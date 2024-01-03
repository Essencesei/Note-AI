"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { UPDATE_NOTE } from "@/lib/server_actions/action";
import { MdModeEdit } from "react-icons/md";

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title must be at least 1 character long" }),
  content: z.string(),
});

type EditButtonProps = {
  props: {
    id: string;
    title: string;
    content: string | null;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

const EditButton = ({ props }: EditButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: props.title,
      content: props.content!,
    },
  });

  const onsubmit = async (values: z.infer<typeof formSchema>) => {
    const newValues = {
      id: props.id,
      title: values.title,
      content: values.content,
      authorId: props.authorId,
    };
    await UPDATE_NOTE(newValues);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <MdModeEdit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              name="title"
              control={form.control}
              render={(field) => (
                <FormItem>
                  <Input
                    placeholder="Title"
                    onChange={(e) => {
                      setTitle(e.target.value);
                      form.setValue("title", e.target.value);
                    }}
                    value={title}
                    {...field}
                  ></Input>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="content"
              control={form.control}
              render={(field) => (
                <FormItem>
                  <Textarea
                    placeholder="Content"
                    onChange={(e) => {
                      setContent(e.target.value);
                      form.setValue("content", e.target.value);
                    }}
                    value={content as string}
                    {...field}
                  ></Textarea>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex gap-2">
              <Button type="submit" className="w-full">
                Edit
              </Button>
              <Button
                type="button"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditButton;
