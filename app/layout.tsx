import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Lato } from "next/font/google";

const lato = Lato({
	weight: ["400", "700", "900"],
	subsets: ["latin"],
	variable: "--font-lato",
});

export const metadata: Metadata = {
	title: "Molnr — Your Personal Peer",
	description: "All in one platform for academic productivity.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${lato.className} antialiased selection:bg-indigo-200/60 selection:text-neutral-900`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster position="bottom-right" />
				</ThemeProvider>
			</body>
		</html>
	);
}
