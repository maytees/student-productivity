import {
    DatabaseBackup,
    FileSignature,
    Import,
    LockKeyhole,
    MailCheck,
    ShieldCheck,
} from "lucide-react";

const faq = [
    {
        icon: MailCheck,
        question: "How do I sign up?",
        answer:
            "Use your email or GitHub to create an account. We’ll send a one‑time code to verify you—no passwords to remember.",
    },
    {
        icon: Import,
        question: "Can I import assignments?",
        answer:
            "You can quickly add assignments and link to external pages like Canvas or Google Docs. CSV import is coming soon.",
    },
    {
        icon: DatabaseBackup,
        question: "Will I lose my data?",
        answer:
            "Your data is stored securely in the cloud. You can export your courses and assignments anytime.",
    },
    {
        icon: ShieldCheck,
        question: "Is my information private?",
        answer:
            "Yes. We only collect what’s necessary to run Molnr. No ads, no selling data. You control your information.",
    },
    {
        icon: LockKeyhole,
        question: "Do you support schools or teams?",
        answer:
            "We’re building shared courses and team spaces. Join the waitlist from Pricing to get early access.",
    },
    {
        icon: FileSignature,
        question: "Is there a student discount?",
        answer:
            "Yes—Molnr is made for students. The Free plan covers essentials, and Pro is priced affordably for the semester.",
    },
];

const FAQ = () => {
    return (
        <div
            id="faq"
            className="min-h-screen flex items-center justify-center px-6 py-12 xs:py-20"
        >
            <div className="max-w-screen-lg">
                <h2 className="text-3xl xs:text-4xl md:text-5xl !leading-[1.15] font-bold tracking-tight text-center">
                    Questions about Molnr
                </h2>
                <p className="mt-3 xs:text-lg text-center text-muted-foreground">
                    Everything you need to know to get started and stay productive.
                </p>

                <div className="mt-12 grid md:grid-cols-2 bg-background rounded-xl overflow-hidden outline outline-[1px] outline-border outline-offset-[-1px]">
                    {faq.map(({ question, answer, icon: Icon }) => (
                        <div key={question} className="border p-6 -mt-px -ml-px">
                            <div className="h-8 w-8 xs:h-10 xs:w-10 flex items-center justify-center rounded-full bg-accent">
                                <Icon className="h-4 w-4 xs:h-6 xs:w-6" />
                            </div>
                            <div className="mt-3 mb-2 flex items-start gap-2 text-lg xs:text-[1.35rem] font-semibold tracking-tight">
                                <span>{question}</span>
                            </div>
                            <p className="text-sm xs:text-base">{answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;