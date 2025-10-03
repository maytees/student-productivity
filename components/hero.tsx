import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LogoCloud from "./logo-cloud";

const Hero = () => {
	return (
		<div className="min-h-[calc(100vh-6rem)] flex flex-col items-center py-20 px-6">
			<div className="md:mt-6 flex items-center justify-center">
				<div className="text-center max-w-2xl">
					<h1 className="mt-3 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
						All‑in‑one student productivity
					</h1>
					<p className="mt-6 max-w-[60ch] xs:text-lg">
						Molnr helps you stay on top of courses and deadlines. Plan
						assignments, track progress, study smarter, and keep everything in
						one place.
					</p>
					<div className="mt-12 flex flex-col sm:flex-row items-center sm:justify-center gap-4">
						<Button
							size="lg"
							className="w-full sm:w-auto rounded-full text-base"
							asChild
						>
							<Link href="/login">
								Start Free <ArrowUpRight className="!h-5 !w-5" />
							</Link>
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="w-full sm:w-auto rounded-full text-base shadow-none"
							asChild
						>
							<Link href="#features">
								<CirclePlay className="!h-5 !w-5" /> See Features
							</Link>
						</Button>
					</div>
				</div>
			</div>
			<LogoCloud className="mt-24 max-w-3xl mx-auto" />
		</div>
	);
};

export default Hero;
