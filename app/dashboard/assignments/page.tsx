// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { IconChecklist } from "@tabler/icons-react";
// import { format } from "date-fns";
// import { ArrowLeft, CalendarIcon, Plus, Zap } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
// import { toast } from "sonner";
// import LabelSelect from "@/components/label-select";
// import { Badge } from "@/components/ui/badge";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardFooter,
// 	CardHeader,
// 	CardTitle,
// } from "@/components/ui/card";
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
// 	Popover,
// 	PopoverContent,
// 	PopoverTrigger,
// } from "@/components/ui/popover";
// import { Separator } from "@/components/ui/separator";
// import SlimSwitch from "@/components/ui/slim-switch";
// import {
// 	type ScheduleFormType,
// 	scheduleSchema,
// } from "@/lib/schemas/zodSchemas";
// import { cn } from "@/lib/utils";
// import ScheduleInfoTabs from "../_components/ScheduleInfoTabs";

// const platforms = [
// 	{
// 		label: "Youtube",
// 		description: "Shorts & Long form videos.",
// 		sublabel: "Videos",
// 		icon: <FaYoutube size={32} className="text-red-500" />,
// 	},
// 	{
// 		label: "Instagram",
// 		description: "Photos, stories, reels, and carousels.",
// 		sublabel: "Images, Stories, Reels",
// 		icon: <FaInstagram size={32} className="text-pink-500" />,
// 	},
// 	{
// 		label: "TikTok",
// 		description: "Upload Tiktoks & Slideshows.",
// 		sublabel: "Videos, Slideshows, Stories",
// 		icon: <FaTiktok size={32} className="text-black dark:text-white" />,
// 	},
// 	{
// 		label: "Twitter",
// 		description: "Upload tweets with images or videos.",
// 		sublabel: "Text, Images, Videos",
// 		icon: <FaTwitter size={32} className="text-sky-500" />,
// 	},
// ];
// const tempAccounts = {
// 	youtube: [
// 		{
// 			name: "PewDiePie",
// 			platform: "youtube",
// 			image:
// 				"https://pbs.twimg.com/profile_images/1815749056821346304/jS8I28PL_400x400.jpg",
// 			description: "111M subscribers",
// 			sublabel: "@PewDiePie",
// 		},
// 		{
// 			name: "MrBeast",
// 			platform: "youtube",
// 			image:
// 				"https://pbs.twimg.com/profile_images/1815749056821346304/jS8I28PL_400x400.jpg",
// 			description: "320M subscribers",
// 			sublabel: "@MrBeast",
// 		},
// 		{
// 			name: "Dude Perfect",
// 			platform: "youtube",
// 			image:
// 				"https://pbs.twimg.com/profile_images/1815749056821346304/jS8I28PL_400x400.jpg",
// 			description: "60M subscribers",
// 			sublabel: "@DudePerfect",
// 		},
// 	],
// 	instagram: [
// 		{
// 			name: "Cristiano Ronaldo",
// 			platform: "instagram",
// 			image:
// 				"https://pbs.twimg.com/profile_images/1815749056821346304/jS8I28PL_400x400.jpg",
// 			description: "635M followers",
// 			sublabel: "@cristiano",
// 		},
// 		{
// 			name: "Selena Gomez",
// 			platform: "instagram",
// 			image:
// 				"https://pbs.twimg.com/profile_images/1815749056821346304/jS8I28PL_400x400.jpg",
// 			description: "424M followers",
// 			sublabel: "@selenagomez",
// 		},
// 	],
// 	tiktok: [
// 		{
// 			name: "Charli D'Amelio",
// 			platform: "tiktok",
// 			image:
// 				"https://pbs.twimg.com/profile_images/1815749056821346304/jS8I28PL_400x400.jpg",
// 			description: "155M followers",
// 			sublabel: "@charlidamelio",
// 		},
// 		{
// 			name: "Addison Rae",
// 			platform: "tiktok",
// 			image:
// 				"https://pbs.twimg.com/profile_images/1815749056821346304/jS8I28PL_400x400.jpg",
// 			description: "88M followers",
// 			sublabel: "@addisonre",
// 		},
// 	],
// 	twitter: [
// 		{
// 			name: "Elon Musk",
// 			platform: "twitter",
// 			image:
// 				"https://pbs.twimg.com/profile_images/1815749056821346304/jS8I28PL_400x400.jpg",
// 			description: "164M followers",
// 			sublabel: "@elonmusk",
// 		},
// 		{
// 			name: "Barack Obama yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
// 			platform: "twitter",
// 			image:
// 				"https://pbs.twimg.com/profile_images/1815749056821346304/jS8I28PL_400x400.jpg",
// 			description: "131M followers",
// 			sublabel: "@BarackObama",
// 		},
// 		{
// 			name: "Rihanna",
// 			platform: "twitter",
// 			image:
// 				"https://pbs.twimg.com/profile_images/1815749056821346304/jS8I28PL_400x400.jpg",
// 			description: "108M followers",
// 			sublabel: "@rihanna",
// 		},
// 		{
// 			name: "Katy Perry",
// 			platform: "twitter",
// 			image:
// 				"https://pbs.twimg.com/profile_images/1815749056821346304/jS8I28PL_400x400.jpg",
// 			description: "106M followers",
// 			sublabel: "@katyperry",
// 		},
// 	],
// };

// const PLATFORM_CONTENT_SUPPORT = {
// 	youtube: ["video"],
// 	instagram: ["image", "video"],
// 	tiktok: ["video", "image"],
// 	twitter: ["text", "image", "video"],
// };

// const SchedulePage = () => {
// 	const [pending, startTransition] = useTransition();
// 	const router = useRouter();

// 	const form = useForm<ScheduleFormType>({
// 		resolver: zodResolver(scheduleSchema),
// 		defaultValues: {
// 			// description: "",
// 			// title: "",
// 			// scheduledAt: new Date().toISOString(),
// 			// video: {
// 			//     url: "",
// 			//     filename: "",
// 			//     duration: 0,
// 			//     size: 0,
// 			// },
// 			platforms: [],
// 			tiktokAccounts: [],
// 			instagramAccounts: [],
// 			twitterAccounts: [],
// 			youtubeAccounts: [],
// 			postNow: false,
// 			textPost: {
// 				caption: "",
// 			},
// 			postType: "text",
// 			scheduleDate: undefined,
// 			scheduleTime: "10:30:00",
// 		},
// 	});

// 	const selectedPlatforms = form.watch("platforms");
// 	const postNow = form.watch("postNow");
// 	const postType = form.watch("postType") as "text" | "video" | "image";
// 	const tiktokAccounts = form.watch("tiktokAccounts");
// 	const instagramAccounts = form.watch("instagramAccounts");
// 	const twitterAccounts = form.watch("twitterAccounts");
// 	const youtubeAccounts = form.watch("youtubeAccounts");

// 	const isPlatformSupported = (
// 		platform: keyof typeof PLATFORM_CONTENT_SUPPORT,
// 	) => {
// 		return PLATFORM_CONTENT_SUPPORT[platform]?.includes(postType) || false;
// 	};

// 	// Calculate total accounts selected
// 	const totalAccounts =
// 		(tiktokAccounts?.length || 0) +
// 		(instagramAccounts?.length || 0) +
// 		(twitterAccounts?.length || 0) +
// 		(youtubeAccounts?.length || 0);

// 	function onSubmit(values: ScheduleFormType) {
// 		toast.success(postNow ? "Posted Successfully" : "Scheduled Successfully", {
// 			description: JSON.stringify(values),
// 		});
// 		// startTransition(async () => {
// 		//     const { data: result, error } = await tryCatch(CreateCourse(values));

// 		//     if (error) {
// 		//         toast.error("An unexpected error occurred. Please try again.");
// 		//         return;
// 		//     }

// 		//     if (result.status === "success") {
// 		//         toast.success(result.message);
// 		//         // triggerConfetti();
// 		//         form.reset();
// 		//         router.push("/admin/courses");
// 		//     } else if (result.status === "error") {
// 		//         toast.error(result.message);
// 		//     }
// 		// });
// 	}

// 	return (
// 		<>
// 			<div className="flex items-center gap-3">
// 				<Link
// 					href="/dashboard"
// 					className={buttonVariants({
// 						variant: "outline",
// 						size: "sm",
// 					})}
// 				>
// 					<ArrowLeft className="size-3" />
// 				</Link>
// 				<div>
// 					<h1 className="text-xl font-bold">Schedule Post</h1>
// 					<p className="text-sm text-muted-foreground">
// 						Create and schedule posts across multiple social media platforms
// 					</p>
// 				</div>
// 			</div>

// 			<Form {...form}>
// 				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
// 					<div className="flex flex-col justify-between lg:flex-row-reverse gap-4">
// 						<Card className="w-full lg:w-1/3 h-fit">
// 							<CardHeader>
// 								<CardTitle className="flex items-center gap-2">
// 									<IconChecklist className="text-primary size-5" />
// 									Summary
// 								</CardTitle>
// 							</CardHeader>

// 							<CardContent className="space-y-4">
// 								<div className="space-y-2">
// 									<h4 className="text-sm font-medium text-muted-foreground">
// 										Platforms
// 									</h4>
// 									{selectedPlatforms.length > 0 ? (
// 										<div className="flex flex-wrap gap-1">
// 											{selectedPlatforms.map((platform) => {
// 												const platformData = platforms.find(
// 													(p) => p.label.toLowerCase() === platform,
// 												);
// 												return (
// 													<Badge
// 														key={platform}
// 														variant="outline"
// 														className="text-xs"
// 													>
// 														{platform.charAt(0).toUpperCase() +
// 															platform.slice(1)}
// 													</Badge>
// 												);
// 											})}
// 										</div>
// 									) : (
// 										<p className="text-sm text-muted-foreground">
// 											No platforms selected
// 										</p>
// 									)}
// 								</div>

// 								<div className="space-y-2">
// 									<h4 className="text-sm font-medium text-muted-foreground">
// 										Accounts
// 									</h4>
// 									{totalAccounts > 0 ? (
// 										<div className="space-y-1">
// 											<p className="text-sm">
// 												<span className="font-medium">{totalAccounts}</span>{" "}
// 												account{totalAccounts !== 1 ? "s" : ""} selected
// 											</p>
// 											<div className="text-xs text-muted-foreground space-y-0.5">
// 												{youtubeAccounts && youtubeAccounts.length > 0 && (
// 													<div>
// 														YouTube: {youtubeAccounts.length} account
// 														{youtubeAccounts.length !== 1 ? "s" : ""}
// 													</div>
// 												)}
// 												{tiktokAccounts && tiktokAccounts.length > 0 && (
// 													<div>
// 														TikTok: {tiktokAccounts.length} account
// 														{tiktokAccounts.length !== 1 ? "s" : ""}
// 													</div>
// 												)}
// 												{instagramAccounts && instagramAccounts.length > 0 && (
// 													<div>
// 														Instagram: {instagramAccounts.length} account
// 														{instagramAccounts.length !== 1 ? "s" : ""}
// 													</div>
// 												)}
// 												{twitterAccounts && twitterAccounts.length > 0 && (
// 													<div>
// 														Twitter: {twitterAccounts.length} account
// 														{twitterAccounts.length !== 1 ? "s" : ""}
// 													</div>
// 												)}
// 											</div>
// 										</div>
// 									) : (
// 										<p className="text-sm text-muted-foreground">
// 											No accounts selected
// 										</p>
// 									)}
// 								</div>

// 								<div className="space-y-2">
// 									<h4 className="text-sm font-medium text-muted-foreground">
// 										Timing
// 									</h4>
// 									<Badge
// 										variant={postNow ? "default" : "secondary"}
// 										className="text-xs"
// 									>
// 										{postNow ? "Post Now" : "Schedule for Later"}
// 									</Badge>
// 								</div>

// 								<FormField
// 									control={form.control}
// 									name="postNow"
// 									render={({ field }) => (
// 										<FormItem className="flex items-center justify-between w-full gap-2">
// 											<FormLabel>Post Now</FormLabel>
// 											<SlimSwitch
// 												checked={field.value}
// 												onCheckedChange={field.onChange}
// 											/>
// 										</FormItem>
// 									)}
// 								/>

// 								{!postNow && (
// 									<div className="w-full space-y-3">
// 										<FormField
// 											control={form.control}
// 											name="scheduleDate"
// 											render={({ field }) => (
// 												<FormItem className="flex flex-col">
// 													<FormLabel>Schedule Date</FormLabel>
// 													<Popover>
// 														<PopoverTrigger asChild>
// 															<FormControl>
// 																<Button
// 																	variant={"outline"}
// 																	className={cn(
// 																		"w-full pl-3 text-left font-normal",
// 																		!field.value && "text-muted-foreground",
// 																	)}
// 																>
// 																	{field.value ? (
// 																		format(field.value, "PPP")
// 																	) : (
// 																		<span>Pick a date</span>
// 																	)}
// 																	<CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
// 																</Button>
// 															</FormControl>
// 														</PopoverTrigger>
// 														<PopoverContent
// 															className="w-auto p-0"
// 															align="start"
// 														>
// 															<Calendar
// 																mode="single"
// 																selected={
// 																	field.value
// 																		? new Date(field.value)
// 																		: undefined
// 																}
// 																onSelect={field.onChange}
// 																disabled={(date) => {
// 																	const today = new Date();
// 																	today.setHours(0, 0, 0, 0);
// 																	return date < today;
// 																}}
// 																captionLayout="dropdown"
// 															/>
// 														</PopoverContent>
// 													</Popover>
// 													<FormMessage />
// 												</FormItem>
// 											)}
// 										/>
// 										<FormField
// 											control={form.control}
// 											name="scheduleTime"
// 											render={({ field }) => (
// 												<FormItem className="flex flex-col">
// 													<FormLabel>Schedule Time</FormLabel>
// 													<FormControl>
// 														<Input
// 															type="time"
// 															step="1"
// 															value={field.value || "10:30:00"}
// 															onChange={field.onChange}
// 															className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
// 														/>
// 													</FormControl>
// 													<FormMessage />
// 												</FormItem>
// 											)}
// 										/>
// 									</div>
// 								)}
// 							</CardContent>
// 							<CardFooter className="flex flex-col items-start pt-3 gap-2">
// 								<Button type="submit" className="w-full" disabled={pending}>
// 									{postNow ? <Zap /> : <CalendarIcon />}
// 									{postNow ? "Post Now" : "Schedule"}
// 								</Button>
// 							</CardFooter>
// 						</Card>

// 						<div className="w-full space-y-4">
// 							{/* Post information */}
// 							<Card>
// 								<CardHeader className="py-5">
// 									<CardTitle>Post Information</CardTitle>
// 									<CardDescription>Whats on your mind?</CardDescription>
// 								</CardHeader>
// 								<CardContent>
// 									<ScheduleInfoTabs form={form} />
// 								</CardContent>
// 							</Card>

// 							{/* Platforms & Accounts */}
// 							<Card className="w-full ">
// 								<CardHeader className="py-5">
// 									<CardTitle>Platforms & Accounts</CardTitle>
// 									<CardDescription>
// 										Select the platforms and accounts you want to post to.
// 									</CardDescription>
// 								</CardHeader>
// 								<CardContent>
// 									{/* Platforms */}
// 									<FormItem>
// 										<FormLabel className="mb-2">Select Platform(s)</FormLabel>
// 										<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// 											{platforms.map((platform) => (
// 												<FormField
// 													key={platform.label}
// 													control={form.control}
// 													name="platforms"
// 													render={() => (
// 														<FormItem key={platform.label}>
// 															<FormControl>
// 																<FormField
// 																	control={form.control}
// 																	name="platforms"
// 																	render={({ field }) => (
// 																		<LabelSelect
// 																			disabled={
// 																				!isPlatformSupported(
// 																					platform.label.toLowerCase() as keyof typeof PLATFORM_CONTENT_SUPPORT,
// 																				)
// 																			}
// 																			label={platform.label}
// 																			description={platform.description}
// 																			sublabel={platform.sublabel}
// 																			icon={platform.icon}
// 																			checked={
// 																				field.value?.includes(
// 																					platform.label.toLowerCase() as keyof typeof PLATFORM_CONTENT_SUPPORT,
// 																				) &&
// 																				isPlatformSupported(
// 																					platform.label.toLowerCase() as keyof typeof PLATFORM_CONTENT_SUPPORT,
// 																				)
// 																			}
// 																			onChange={(checked) => {
// 																				const platformValue =
// 																					platform.label.toLowerCase();
// 																				if (
// 																					checked &&
// 																					!field.value?.includes(
// 																						platformValue as keyof typeof tempAccounts,
// 																					)
// 																				) {
// 																					field.onChange([
// 																						...field.value,
// 																						platformValue,
// 																					]);
// 																				} else if (
// 																					!checked ||
// 																					field.value?.includes(
// 																						platformValue as keyof typeof tempAccounts,
// 																					)
// 																				) {
// 																					field.onChange(
// 																						field.value?.filter(
// 																							(value) =>
// 																								value !== platformValue,
// 																						),
// 																					);
// 																				}
// 																			}}
// 																		/>
// 																	)}
// 																/>
// 															</FormControl>
// 															<FormMessage />
// 														</FormItem>
// 													)}
// 												/>
// 											))}
// 										</div>
// 									</FormItem>

// 									<Button variant="outline" asChild className="w-full mt-4">
// 										<Link href="/dashboard/connect">
// 											<Plus />
// 											Connect More Accounts
// 										</Link>
// 									</Button>

// 									{/* Separator */}
// 									{selectedPlatforms.length > 0 && (
// 										<Separator className="my-10" />
// 									)}

// 									{/* Accounts */}
// 									{selectedPlatforms.map((platform) => {
// 										const accountFieldName = `${platform}Accounts` as
// 											| "tiktokAccounts"
// 											| "instagramAccounts"
// 											| "twitterAccounts"
// 											| "youtubeAccounts";
// 										const platformData = platforms.find(
// 											(p) => p.label.toLowerCase() === platform,
// 										);
// 										return (
// 											<FormField
// 												key={platform}
// 												control={form.control}
// 												name={accountFieldName}
// 												render={() => (
// 													<FormItem className="mt-10">
// 														<FormLabel className="flex items-center mb-2 gap-2">
// 															{platformData?.icon}
// 															{platform.charAt(0).toUpperCase() +
// 																platform.slice(1)}{" "}
// 															Accounts
// 														</FormLabel>
// 														<div className="flex flex-wrap gap-4">
// 															{tempAccounts[
// 																platform as keyof typeof tempAccounts
// 															].map((account) => (
// 																<FormField
// 																	key={account.name}
// 																	control={form.control}
// 																	name={accountFieldName}
// 																	render={({ field }) => (
// 																		<FormItem>
// 																			<FormControl>
// 																				<LabelSelect
// 																					label={account.name}
// 																					icon={account.image}
// 																					description={account.description}
// 																					sublabel={account.sublabel}
// 																					checked={field.value?.includes(
// 																						account.name,
// 																					)}
// 																					onChange={(checked) => {
// 																						return checked
// 																							? field.onChange([
// 																									...(field.value || []),
// 																									account.name,
// 																								])
// 																							: field.onChange(
// 																									field.value?.filter(
// 																										(value) =>
// 																											value !== account.name,
// 																									),
// 																								);
// 																					}}
// 																					// {...field}
// 																				/>
// 																			</FormControl>
// 																		</FormItem>
// 																	)}
// 																/>
// 															))}
// 														</div>
// 														<FormMessage />
// 													</FormItem>
// 												)}
// 											/>
// 										);
// 									})}
// 								</CardContent>
// 							</Card>
// 						</div>
// 					</div>
// 				</form>
// 			</Form>
// 		</>
// 	);
// };

// export default SchedulePage;

// TODO: Remove
const Nilpage = () => {
	return <div>Nilpage</div>;
};

export default Nilpage;
