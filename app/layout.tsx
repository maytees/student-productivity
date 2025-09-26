import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const lato = Lato({
	weight: ["100", "300", "400", "700", "900"],
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
					<Toaster position="top-center" />
				</ThemeProvider>
			</body>
		</html>
	);
}
