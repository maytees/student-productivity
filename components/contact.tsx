"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-24 bg-muted/30">
      <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl tracking-tight text-foreground  font-semibold font-lora">
            Talk to us
          </h2>
          <p className="mt-3 text-muted-foreground ">
            Questions, partnerships, or enterprise needs—send a note and our
            team will reply within one business day.
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground ">
              <Mail className="w-4 h-4 text-primary" />
              hello@px.app
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground ">
              <MessageSquare className="w-4 h-4 text-primary" />
              Live chat (9–5)
            </div>
          </div>
        </div>

        <Card className="p-6">
          <form className="grid gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <label
                  htmlFor="name"
                  className="text-sm text-muted-foreground "
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className=""
                />
              </div>
              <div className="grid gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm text-muted-foreground "
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className=""
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <label
                htmlFor="message"
                className="text-sm text-muted-foreground "
              >
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell us what you're looking to achieve…"
                className="resize-y "
              />
            </div>

            <Button type="submit" className="inline-flex items-center gap-2 ">
              <Send className="w-4 h-4" />
              Send message
            </Button>

            <p className="text-xs text-muted-foreground ">
              By submitting, you agree to our terms and privacy policy.
            </p>
          </form>
        </Card>
      </div>
    </section>
  );
}
