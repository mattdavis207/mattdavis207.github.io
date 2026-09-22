"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { DialogueBox, DialogueButton } from "@/components/dialogue-box/dialogue-box";
import { LinkCard } from "@/components/link-card/link-card";
import { MagneticField } from "@/components/magnetic-field/magnetic-field";

import { ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";

const ANIMATED_ME = "/images/animated_me.png";
const ANIMATED_ME_HANDS_DOWN = "/images/animated_me_hands_down.png";

// Edit the dialogue and add more fields here. The button follows this order.
const FIELDS = [
  { title: "Welcome", dialogue: "Hi, I’m Matthew. Welcome to my technical portfolio. To start off, you can find some important links below" },
  { title: "About", dialogue: "This is where I’ll tell you a little about myself." },
  { title: "Experience", dialogue: "Here, I’ll walk you through my experience." },
  { title: "Projects", dialogue: "Next, I’ll share a few things I’ve built." },
  { title: "Contact", dialogue: "Thanks for stopping by. This is where we can connect." },
];

function Dialogue({ text, reducedMotion }: { text: string; reducedMotion: boolean }) {
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      setVisibleCharacters((count) => {
        if (count + 1 >= text.length) window.clearInterval(timer);
        return Math.min(count + 1, text.length);
      });
    }, 30);
    return () => window.clearInterval(timer);
  }, [text, reducedMotion]);

  return (
    <p className="text-lg leading-relaxed text-gray-300">
      {reducedMotion ? text : text.slice(0, visibleCharacters)}
    </p>
  );
}

export default function Home() {
  const [fieldIndex, setFieldIndex] = useState(0);
  const motionPreference = useReducedMotion();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(Boolean(motionPreference));
  }, [motionPreference]);

  const field = FIELDS[fieldIndex];
  const isLastField = fieldIndex === FIELDS.length - 1;

  return (
    <>
      {/* Background Component */}
      <MagneticField />

      {/* Overlay Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6 text-white">
        <section className="flex w-full max-w-4xl flex-col items-center gap-8 md:flex-row">
          <div className="relative h-128 w-64 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={fieldIndex === 0 ? ANIMATED_ME : ANIMATED_ME_HANDS_DOWN}
              alt="Matthew Davis"
              fill
              priority
              unoptimized
              sizes="256px"
              className="object-cover"
            />
          </div>

          <DialogueBox
            title="Matthew Davis"
            subtitle={field.title}
            footer={
              <>
                <DialogueButton
                  disabled={fieldIndex === 0}
                  onClick={() => setFieldIndex((index) => Math.max(0, index - 1))}
                >
                  <ArrowLeft size={10}/> Back
                </DialogueButton>
                <DialogueButton
                  onClick={() => setFieldIndex((index) => (index + 1) % FIELDS.length)}
                >
                  {isLastField ? "Start again" : `Next: ${FIELDS[fieldIndex + 1].title}`} <ArrowRight size={10}/>
                </DialogueButton>
              </>
            }
          >
            <div className="min-h-32">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={fieldIndex}
                  initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : -12 }}
                  transition={{ duration: reducedMotion ? 0 : 0.22 }}
                >
                  <Dialogue text={field.dialogue} reducedMotion={reducedMotion} />
                  {/* Add section content here, e.g. fieldIndex === 3 for project links. */}
                  {fieldIndex === 0 && (
                    <div className="mt-4 space-y-4">
                      <ArrowDown />
                      
                      <LinkCard
                        href="https://github.com/mattdavis207"
                        icon={<FaGithub size={24}/>}
                        title="Github"
                        description=""
                        newTab={true}
                      />

                      <LinkCard
                        href="https://www.linkedin.com/in/matthew-davis237/"
                        icon={<FaLinkedin size={24}/>}
                        title="Linkedin"
                        description=""
                        newTab={true}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </DialogueBox>
        </section>
      </div>
    </>
  );
}
