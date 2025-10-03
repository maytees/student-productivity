import {
    BookOpenCheck,
    CalendarCheck2,
    ClipboardList,
    LineChart,
    Sparkles,
    Users2,
} from "lucide-react";

const features = [
    {
        icon: ClipboardList,
        title: "Assignments made simple",
        description:
            "Capture due dates, prioritize tasks, and break work into subtasks. Drag to update status when you’re done.",
    },
    {
        icon: BookOpenCheck,
        title: "Courses in one place",
        description:
            "Keep course info, links, and resources together. Jump to Canvas or your syllabus in a click.",
    },
    {
        icon: CalendarCheck2,
        title: "Plan your week",
        description:
            "A clear view of what’s due and when. See today, tomorrow, and upcoming at a glance.",
    },
    {
        icon: LineChart,
        title: "Progress you can feel",
        description:
            "Track streaks, milestones, and completion rates so you stay motivated throughout the semester.",
    },
    {
        icon: Sparkles,
        title: "Study smarter",
        description:
            "Built‑in flashcards, quizzes, and a focused Pomodoro timer help you learn faster.",
    },
    {
        icon: Users2,
        title: "Built for students",
        description:
            "Fast, clean, distraction‑free. Private by default and easy to start for free.",
    },
];

const Features = () => {
    return (
        <div id="features" className="w-full py-12 xs:py-20 px-6">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center">
                Everything you need to stay on top of school
            </h2>
            <div className="w-full max-w-screen-lg mx-auto mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                    <div
                        key={feature.title}
                        className="flex flex-col bg-background border rounded-xl py-6 px-5"
                    >
                        <div className="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
                            <feature.icon className="h-6 w-6" />
                        </div>
                        <span className="text-lg font-semibold">{feature.title}</span>
                        <p className="mt-1 text-foreground/80 text-[15px]">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;