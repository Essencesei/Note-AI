"use client";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
});

const LoginPage = () => {
  const [isloading, setIsLoading] = useState(false);
  // const session = useSession();
  // if (session.data) redirect("/notes");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onsubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className="flex flex-col gap-2  "
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sign in with Email</FormLabel>
                <Input placeholder="Email" {...field} disabled></Input>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />

          <Button type="submit" disabled>
            Login
          </Button>
        </form>
      </Form>

      <Separator className="my-4"></Separator>

      <Button
        disabled={isloading}
        onClick={() => {
          setIsLoading(true);
          signIn("google", { callbackUrl: "/notes" });
        }}
        className="w-full"
      >
        Sign in with Google
        {isloading && <Loader2 className="inline-block ml-2 animate-spin" />}
      </Button>
      <p className="text-sm my-4 ">
        Don&apos;t have an account? <Link href={"#"}> Register here</Link>
      </p>
    </section>
  );
};

export default LoginPage;
