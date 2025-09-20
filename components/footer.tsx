"use client";

import { Asterisk } from "lucide-react";
import Link from "next/link";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="py-10 border-t border-border">
			<div className="flex flex-col items-center justify-between px-6 mx-auto max-w-7xl sm:flex-row gap-4">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 border rounded-md border-border grid place-items-center bg-card">
						<span className="text-xl font-semibold tracking-tight ">
							<Asterisk className="w-4 h-4" />
						</span>
					</div>
					<div className="flex flex-col">
						<span className="text-sm font-medium text-foreground">Flicker</span>
						<span className="text-xs text-muted-foreground ">
							© {currentYear} Flicker, Inc.
						</span>
					</div>
				</div>

				<div className="flex items-center text-sm gap-6 ">
					<Link
						href="#"
						className="text-muted-foreground hover:text-primary transition-colors"
					>
						Terms
					</Link>
					<Link
						href="#"
						className="text-muted-foreground hover:text-primary transition-colors"
					>
						Privacy
					</Link>
					<Link
						href="#"
						className="text-muted-foreground hover:text-primary transition-colors"
					>
						Status
					</Link>
				</div>
			</div>
		</footer>
	);
}
