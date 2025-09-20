import { Asterisk } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Header } from "@/components/header";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div>
			<Header />
			<div className="flex h-[80svh] flex-col items-center justify-center">
				<div className="flex w-full max-w-sm flex-col gap-6">
					<Link
						className="flex items-center gap-2 self-center font-bold text-xl"
						href="/"
					>
						<Asterisk className="size-8" />
						Molnr
					</Link>
					{children}
					<div className="text-balance text-center text-xs text-muted-foreground">
						By clicking continue, you agree to our{" "}
						<Link
							href="/terms"
							className="hover:text-primary font-extrabold hover:underline hover:cursor-pointer"
						>
							Terms of service
						</Link>{" "}
						and{" "}
						<Link
							href="/privacy"
							className="hover:text-primary font-extrabold hover:underline hover:cursor-pointer"
						>
							Privacy Policy
						</Link>
						.
					</div>
				</div>
			</div>
		</div>
	);
}
