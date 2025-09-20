import SortableImageUpload from "@/components/file-upload/sortable"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ScheduleFormType } from "@/lib/zodSchemas"
import { Image, Text, Video } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

export default function ScheduleInfoTabs({ form }: { form: UseFormReturn<ScheduleFormType> }) {
    return (
        <Tabs defaultValue="text" value={form.watch("postType")} onValueChange={(value) => {
            form.setValue("postType", value as "text" | "video" | "image")
        }} className="">
            <TabsList className="h-auto rounded-none border-b bg-transparent p-0 w-full grid grid-cols-3">
                <TabsTrigger
                    value="text"
                    className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                    <Text />
                    Text
                </TabsTrigger>
                <TabsTrigger
                    value="video"
                    className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                    <Video />
                    Video
                </TabsTrigger>
                <TabsTrigger
                    value="image"
                    className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image />
                    Image
                </TabsTrigger>
            </TabsList>
            <TabsContent value="video">
                <p className="text-muted-foreground p-4 text-center text-xs">
                    Content for Video
                </p>
            </TabsContent>
            <TabsContent value="text">
                <FormField
                    control={form.control}
                    name="textPost.caption"
                    render={({ field }) => (
                        <FormItem className="mt-4">
                            <FormLabel>Caption</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Whats on your mind?"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                You can <span className="font-extrabold">@mention</span> and <span className="font-extrabold">#hashtag</span> just like you would on the platform you&apos;re posting to.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </TabsContent>
            <TabsContent value="image">
                <FormField
                    control={form.control}
                    name="imagePost.images"
                    render={({ field }) => (
                        <FormItem className="mt-4">
                            <FormControl>
                                <SortableImageUpload
                                    onImagesChange={field.onChange}
                                    onUploadComplete={field.onChange}
                                    // value={field.value || []}
                                    maxFiles={1}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="imagePost.caption"
                    render={({ field }) => (
                        <FormItem className="mt-4">
                            <FormLabel>Caption</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Whats on your mind?"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                You can <span className="font-extrabold">@mention</span> and <span className="font-extrabold">#hashtag</span> just like you would on the platform you&apos;re posting to.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </TabsContent>
        </Tabs>
    )
}

