import { Asterisk } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Header } from "@/components/header";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div>
			<Header />
			<div className="flex h-[80svh] flex-col items-center justify-center">
				<div className="flex flex-col w-full max-w-sm gap-6">
					<Link
						className="flex items-center self-center text-xl font-bold gap-2"
						href="/"
					>
						<Asterisk className="size-8" />
						Molnr
					</Link>
					{children}
					<div className="text-xs text-center text-balance text-muted-foreground">
						By clicking continue, you agree to our{" "}
						<Link
							href="/terms"
							className="font-extrabold hover:text-primary hover:underline hover:cursor-pointer"
						>
							Terms of service
						</Link>{" "}
						and{" "}
						<Link
							href="/privacy"
							className="font-extrabold hover:text-primary hover:underline hover:cursor-pointer"
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
