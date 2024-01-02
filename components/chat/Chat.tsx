"use client";
import { FaRobot } from "react-icons/fa";
import { useChat } from "ai/react";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoSend } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Chat = () => {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const chatContainerRef = useRef<HTMLUListElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild className="fixed bottom-8 right-8">
        <Button className="h-25 w-25">
          <FaRobot size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-[500px] mx-2 flex flex-col w-screen md:w-[300px] -mb-14 md:mb-0 ">
        <h2 className="pb-4 font-bold flex items-center gap-2">
          <FaRobot />
          Note Assistant
          <IoIosCloseCircleOutline
            className="ml-auto cursor-pointer"
            size={20}
            onClick={() => setIsOpen(false)}
          />
        </h2>

        <ul
          className="flex flex-col gap-2 overflow-y-auto mb-4 text-sm"
          ref={chatContainerRef}
        >
          {messages.map((message, index) => {
            return (
              <li
                key={index}
                className={`border p-2 w-full rounded-lg ${
                  message.role === "user" ? "bg-primary text-white" : ""
                }`}
              >
                <p className="flex items-center gap-2 py-1">
                  {message.role === "user" ? (
                    ""
                  ) : (
                    <>
                      <FaRobot />
                      Assistant
                    </>
                  )}
                </p>
                <p className="break-words whitespace-pre-wrap px-2 pb-2">
                  {message.content}
                </p>
              </li>
            );
          })}
          <div className="mt-auto">
            <p className="italic text-center">
              {isLoading && "Assistant is thinking..."}
              {messages.length === 0 && "Ask me about your notes!"}
              {error && error.message}
            </p>
          </div>
        </ul>

        <form onSubmit={handleSubmit} className="flex gap-2 w-full mt-auto">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
          />
          <Button type="submit">
            <IoSend />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default Chat;
