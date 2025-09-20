"use client";

import { Asterisk } from "lucide-react";
import Link from "next/link";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="py-10 border-t border-border">
			<div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<div className="h-8 w-8 rounded-md border border-border grid place-items-center bg-card">
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

				<div className="flex items-center gap-6 text-sm ">
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
