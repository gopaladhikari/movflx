"use client";

import { useChat } from "ai/react";
import {
	chatBotMessageSchema,
	TChatBotMessageSchema,
} from "@/schemas/chatBotMesageSchema";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { BotMessageSquare, CircleX } from "lucide-react";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

export default function ChatBot() {
	const [show, setShow] = useState(false);
	const { messages, input, handleInputChange, handleSubmit, isLoading } =
		useChat();

	useForm<TChatBotMessageSchema>({
		resolver: zodResolver(chatBotMessageSchema),
	});

	const handleChatBotOpen = () => {
		setShow(!show);
	};

	if (!show)
		return (
			<div className="fixed bottom-8 right-8 cursor-pointer overflow-auto rounded-lg bg-background p-4">
				{/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
				<button type="button" onClick={handleChatBotOpen}>
					<BotMessageSquare />
				</button>
			</div>
		);

	return (
		<section className="fixed bottom-8 right-8 h-[60vh] w-96 overflow-auto bg-background">
			<div className="flex w-full justify-end px-3 pt-2">
				{/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
				<button
					type="submit"
					onClick={() => setShow(!show)}
					className="mb-auto"
				>
					<CircleX size={16} />
				</button>
			</div>
			<h1 className="border-b border-yellow p-4 pb-2 text-center text-xl font-bold">
				Chat Bot
			</h1>

			<ul>
				{messages.map((m) => (
					<div key={m.content}>
						{m.role === "user" ? (
							<li className="flex flex-row">
								<div className="flex rounded-xl bg-background p-4 shadow-md">
									<p className="text-primary">{m.content}</p>
								</div>
							</li>
						) : (
							<div>
								{isLoading ? (
									<div className="flex items-center space-x-4">
										<Skeleton className="size-12 rounded-full" />
										<div className="space-y-2">
											<Skeleton className="h-4 w-[250px]" />
											<Skeleton className="h-4 w-[200px]" />
										</div>
									</div>
								) : (
									<li className="flex flex-row-reverse">
										<div className="flex w-3/4 rounded-xl bg-background p-4 shadow-md">
											<p className="text-primary">
												<span className="font-bold">Answer: </span>
												{m.content}
											</p>
										</div>
									</li>
								)}
							</div>
						)}
					</div>
				))}
			</ul>

			<form
				onSubmit={handleSubmit}
				className="mt-auto flex w-full items-center p-4"
			>
				<Input
					className="min-h-[40px] flex-1"
					placeholder="Type your question here..."
					type="text"
					value={input}
					onChange={handleInputChange}
				/>
				<Button className="ml-2" type="submit">
					Submit
				</Button>
			</form>
		</section>
	);
}
