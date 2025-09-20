"use client";
import {
	ArrowRight,
	Asterisk,
	BadgeCheck,
	Calendar,
	Clock,
	Send,
	ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Hero() {
	return (
		<div>
			<section className="relative overflow-hidden">
				{/* Background gradient */}
				<div className="absolute inset-0 pointer-events-none">
					<div
						className="absolute inset-x-0 top-[-15%] mx-auto h-[40vh] max-w-4xl blur-3xl opacity-60 dark:opacity-30"
						style={{
							background:
								"radial-gradient(600px 160px at 50% 20%, rgba(99,102,241,0.14), transparent 60%)",
						}}
					/>
				</div>

				<div className="items-center px-6 mx-auto mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl">
					{/* Left: Text */}
					<div className="pt-12 lg:pt-0">
						<h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-foreground">
							<p className="inline-block font-semibold animate-slide-up font-bricolage">
								Professional social media{" "}
								<span className="text-primary font-bricolage">without</span> 15
								minutes a week.
							</p>
							{/* {words.map((word, index) => (
                <span
                  key={word}
                  className={`inline-block  font-semibold animate-slide-up ${
                    word === "under" ? "text-primary" : ""
                  }`}
                  style={{
                    animationDelay: `${80 + index * 60}ms`,
                  }}
                >
                  {word}
                </span>
              ))} */}
						</h1>

						<p className="max-w-2xl mt-5 text-base sm:text-lg text-muted-foreground  animate-blur-in">
							Ultra simplified cross platform posting for creators and small
							marketing agencies, all without the complexity of enterprise
							tools. Focus on content creation, not uploading.
						</p>

						<div className="flex flex-col mt-8 sm:flex-row gap-3">
							<Button asChild size="lg" className="">
								<Link
									href="#pricing"
									className="inline-flex items-center gap-2"
								>
									Start free
									<Asterisk className="w-4 h-4" />
								</Link>
							</Button>
							<Button asChild variant="outline" size="lg" className="">
								<Link
									href="#enterprise"
									className="inline-flex items-center gap-2"
								>
									View Video
									<ArrowRight className="w-4 h-4" />
								</Link>
							</Button>
						</div>

						<div className="max-w-2xl mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
							{[
								{ icon: Clock, text: "No Hassle" },
								{ icon: BadgeCheck, text: "Very Simple" },
								{ icon: Send, text: "10+ Platforms" },
								{ icon: ShieldCheck, text: "Agency Ready" },
							].map((item, index) => (
								<div
									key={item.text}
									className="flex items-center px-3 py-2 text-sm border gap-2 text-muted-foreground border-border rounded-md bg-card/80"
									style={{ animationDelay: `${860 + index * 60}ms` }}
								>
									<item.icon className="w-4 h-4 text-primary" />
									<span className="">{item.text}</span>
								</div>
							))}
						</div>
					</div>

					{/* Right: Mock UI */}
					<div className="relative">
						<Card className="p-4 sm:p-6 lg:p-8 animate-blur-in">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-2">
									<Calendar className="w-5 h-5 text-primary" />
									<h3 className="text-sm font-medium tracking-tight text-foreground font-lora">
										Scheduling
									</h3>
								</div>
								<div className="flex items-center gap-2">
									<div className="h-6 px-2 text-xs rounded-md grid place-items-center bg-muted text-muted-foreground ">
										Week
									</div>
									<div className="h-6 px-2 text-xs border rounded-md grid place-items-center border-border ">
										Month
									</div>
								</div>
							</div>

							{/* Calendar grid */}
							<div className="grid grid-cols-7 gap-2">
								{/* Days */}
								<div className="col-span-7 grid grid-cols-7 gap-2 text-[11px] text-muted-foreground ">
									{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
										(day) => (
											<div key={day} className="text-center">
												{day}
											</div>
										),
									)}
								</div>
							</div>

							{/* Divider */}
							<div className="h-px my-6 bg-border" />
						</Card>

						{/* Floating trust badge */}
						<div className="absolute items-center hidden px-3 py-2 border rounded-lg sm:flex -bottom-6 -left-2 gap-3 border-border bg-card animate-fade-in">
							<Image
								src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=200&auto=format&fit=crop"
								alt="User"
								className="object-cover rounded-full h-7 w-7"
								width={28}
								height={28}
							/>
							<div className="text-xs ">
								<div className="text-foreground/70">
									Trusted by solo creators
								</div>
								<div className="text-muted-foreground">and global teams</div>
							</div>
						</div>
					</div>
				</div>
				{/* Reddit quote */}
				<div className="mt-20 text-center">
					<p className="max-w-2xl px-6 mx-auto text-base italic text-muted-foreground">
						&quot;I&apos;m finding that I&apos;m spending almost half my workday
						just reformatting and uploading the same content to different
						platforms&quot;
					</p>
					<p className="mt-2 text-sm text-muted-foreground/70">
						- Content Creator
					</p>
				</div>
			</section>
		</div>
	);
}
