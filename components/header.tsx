"use client";

import { ArrowRight, Asterisk } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";

export function Header() {
	const { data: session, isPending } = authClient.useSession();

	return (
		<header className="w-full border-b border-border/70 bg-background/80 backdrop-blur">
			<div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 border rounded-md border-border grid place-items-center bg-card">
						<span className="text-xl font-semibold tracking-tight ">
							<Asterisk className="w-4 h-4" />
						</span>
					</div>
					<div className="flex flex-col">
						<span className="text-sm font-medium text-foreground">Molnr</span>
						<span className="text-xs text-muted-foreground ">
							Post. Everywhere. Right.
						</span>
					</div>
				</div>

				<nav className="items-center hidden md:flex gap-6 ">
					<Link
						href="#features"
						className="text-sm text-foreground/70 hover:text-primary transition-colors"
					>
						Features
					</Link>
					<Link
						href="#pricing"
						className="text-sm text-foreground/70 hover:text-primary transition-colors"
					>
						Pricing
					</Link>
					<Link
						href="#faq"
						className="text-sm text-foreground/70 hover:text-primary transition-colors"
					>
						FAQ
					</Link>
					<Link
						href="#contact"
						className="text-sm text-foreground/70 hover:text-primary transition-colors"
					>
						Contact
					</Link>
				</nav>

				<div className="flex items-center gap-3">
					<ModeToggle />
					{isPending ? (
						<Skeleton className="w-8 h-8 rounded-full" />
					) : session ? (
						<Button asChild variant={"primary"} size="sm">
							<Link href="/dashboard">Dashboard</Link>
						</Button>
					) : (
						<>
							<Button
								asChild
								variant="outline"
								size="sm"
								className="hidden sm:inline-flex"
							>
								<Link href="/login">Sign in</Link>
							</Button>
							<Button asChild size="sm" className="">
								<Link
									href="#pricing"
									className="inline-flex items-center gap-2"
								>
									Get started
									<ArrowRight className="w-4 h-4" />
								</Link>
							</Button>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
