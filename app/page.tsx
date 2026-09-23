"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { DialogueBox, DialogueButton } from "@/components/dialogue-box/dialogue-box";
import { LinkCard } from "@/components/link-card/link-card";
import { ExperienceCard } from "@/components/experience-card/experience-card";
import { ProjectCard } from "@/components/project-card/project-card";
import { MagneticField } from "@/components/magnetic-field/magnetic-field";

import { ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { FaRegFilePdf } from "react-icons/fa"


const ANIMATED_ME = "/images/animated_me.png";
const ANIMATED_ME_HANDS_DOWN = "/images/animated_me_hands_down.png";

// Edit the dialogue and add more fields here. The button follows this order.
const fields = [
  { title: "Welcome", dialogue: "Hi, I’m Matthew. Welcome to my technical portfolio. To start off, you can find some important links below" },
  { title: "About", dialogue: `I'm currently in my final year at the University of Pittsburgh, studying Computer Science with a minor in Music. \n
    I've completed an IT internship and spent two summers as a Software Engineering Intern at Vertex, where I've worked with cloud infrastructure 
    and helped build enterprise-grade applications with .NET and Spring Boot. \n\n I'm interested in a pretty broad range of software- from 
    chrome extensions, automations, and mobile development to AI engineering, NLP, backend APIs, and cloud technologies. I like exploring different areas of computer science and finding new things to build.` },
  { title: "Experience", dialogue: "" },
  { title: "Projects", dialogue: "Next, here's a few things I’ve built." },
  { title: "Contact", dialogue: "That’s a bit about me and what I’ve been working on. If you want to talk about a project, an opportunity, or something interesting you’re building, feel free to reach out." },
];

const experiences = [
  {
    title: "Software Development Intern II",
    company: "Vertex Inc",
    dates: "May 2026 – Aug 2026",
    location: "King of Prussia, PA | Remote",
    description:
      "I used GitHub Copilot and Claude to build reusable workflows for modernizing a large Spring Boot Oracle Cloud connector, including a skill for migrating SOAP APIs to REST. I also worked on a shared file share client library, CI/CD, and a caching service for tax jurisdiction data.",
  },
  {
    title: "Software Development Intern",
    company: "Vertex Inc",
    dates: "May 2025 – Aug 2025",
    location: "King of Prussia, PA | Remote",
    description:
      "I worked on an Agile Scrum team building backend APIs for a VAT Compliance Metrics Dashboard, including role-based access control, submission rates, workflow status metrics, and filtering. I also worked on CI/CD and cloud infrastructure with AWS, Terraform, and Route 53, along with database migrations and UI fixes.",
  },
  {
    title: "IT Intern",
    company: "Bethlehem Area School District",
    dates: "Jun 2024 – Aug 2024",
    location: "Bethlehem, PA",
    description:
     "I helped deploy and reimage over 1,200 devices across 22 schools and diagnosed and repaired over 300 devices. I also worked with networking, databases, wireless infrastructure, and IT support.",
  },
];

const projects = [
  {
    title: "Wordscope Browser Extension",
    imageSrc: "project_images/ListingSS_1.jpg",
    description: "Wordscope is a lightweight, on-page lookup tool that helps the user grasp unfamiliar words without breaking flow. When selecting text on a webpage, you can open a clean bubble with definitions, synonyms/antonyms, pronunciations, examples, and optional AI context right where you’re reading.",
    href: "https://github.com/mattdavis207/wordscope",
    linkText: "Project Link",
    newTab: true,
    isExpanded: true
  },
  {
    title: "Personality Space Explorer",
    imageSrc: "project_images/personality_space_explorer.png",
    description: "This is a personality space explorer on the web that is meant for discovering patterns and similarities of various personalities based on 50k+ records of celebrity personality data.",
    href : "https://github.com/mattdavis207/personality-space-explorer",
    linkText : "Project Link",
    newTab : true,
    isExpanded: false
  },
  {
    title: "Cozynest RAG Pipeline",
    imageSrc: "project_images/admin_ui.png",
    description: "CozyNest RAG Pipeline is a backend-focused e-commerce customer support assistant. It lets an admin upload store documents, indexes those documents into a Supabase/Postgres vector database, and uses retrieved context to answer customer questions with cited sources.",
    href: "https://github.com/mattdavis207/cozynest_rag_pipeline",
    linkText: "Project Link",
    newTab: true,
    isExpanded: false
  },
  {
    title: "Mindmapper",
    imageSrc: "project_images/mindmapper_ss.png",
    description: "Mindmapper is an intuitive Python application designed to aid brainstorming, studying, and knowledge mapping. By creating dynamic tree diagrams, this tool enables users to connect and organize ideas visually, making it ideal for conceptualizing and exploring complex topics.",
    href: "https://github.com/mattdavis207/mindmapper",
    linkText: "Project Link",
    newTab: true,
    isExpanded: false
  },
  {
    title: "Trading Analysis Automation",
    imageSrc: "project_images/n8n_automation_ss.png",
    description: "Automated forex analysis pipeline that retrieves TradingView market data to identify Triple M and engulfing candle setups across historical price ranges. Built with Python, FastAPI, and n8n to analyze price action, generate annotated candlestick visualizations, and automatically log structured results to Notion.",
    href: "https://github.com/mattdavis207/knowledge_extractor_api",
    linkText: "Project Link",
    newTab: true,
    isExpanded: false
  }
]

function Dialogue({ text, reducedMotion, fieldIndex }: { text: string; reducedMotion: boolean; fieldIndex: number }) {
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    const delay = fieldIndex === 1 ? 10 : fieldIndex=== 4 ? 20: 30;

    const timer = window.setInterval(() => {
      setVisibleCharacters((count) => {
        if (count + 1 >= text.length) window.clearInterval(timer);
        return Math.min(count + 1, text.length);
      });
    }, delay);
    return () => window.clearInterval(timer);
  }, [text, reducedMotion, fieldIndex]);

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

  const field = fields[fieldIndex];
  const isLastField = fieldIndex === fields.length - 1;

  return (
    <>
      {/* Background Component */}
      <MagneticField />

      {/* Overlay Content */}
      <div className="relative z-10 flex min-h-screen items-start justify-center p-6 text-white lg:pt-[20vh]">
        <section className="flex w-full max-w-6xl flex-col items-center gap-8 lg:flex-row lg:items-start">
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

          <div className="w-full min-w-0 flex-1">
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
                  onClick={() => setFieldIndex((index) => (index + 1) % fields.length)}
                >
                  {isLastField ? "Start again" : `Next: ${fields[fieldIndex + 1].title}`} <ArrowRight size={10}/>
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
                  <Dialogue text={field.dialogue} reducedMotion={reducedMotion} fieldIndex={fieldIndex} />
                  {fieldIndex === 0 && (
                    <div className="mt-4 space-y-4">
                      <ArrowDown />
                      
                      <div className="flex flex-wrap gap-3 py-3">
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

                        <LinkCard
                          href="/resume/Matthew_Davis_Resume.pdf"
                          icon={<FaRegFilePdf size={24}/>}
                          title="Resume"
                          description=""
                          newTab={true}
                        />
                        <LinkCard
                          href="mailto:mattdavis2313@gmail.com"
                          icon={< LuMail size={24}/>}
                          newTab={true}
                          title="Email"
                        />
                      </div>
                    </div>
                  )}
                  {fieldIndex === 2 && (
                    <div className="mt-4 space-y-8">
                      {experiences.map((experience, index) => (
                          <ExperienceCard
                            key={index}
                            title={experience.title}
                            company={experience.company}
                            description={experience.description}
                            dates={experience.dates}
                            location={experience.location}
                          />
                      ))}
                    </div>
                  )}
                  {fieldIndex === 3 && (
                    <div className="mt-4 space-y-8">
                      {projects.map((project, index) => (
                        <ProjectCard
                          key={index}
                          title={project.title}
                          imageSrc={project.imageSrc}
                          description={project.description}
                          href={project.href}
                          linkText={project.linkText}
                          newTab={true}
                          isExpanded={project.isExpanded}
                        />
                      ))}
                    </div>
                  )}
                  {fieldIndex === 4 && (
                    <div className="flex flex-wrap gap-3 py-3">
                      <LinkCard
                        href="https://www.linkedin.com/in/matthew-davis237/"
                        icon={<FaLinkedin size={24}/>}
                        title="Linkedin"
                        description=""
                        newTab={true}
                      />

                      <LinkCard
                        href="mailto:mattdavis2313@gmail.com"
                        icon={< LuMail size={24}/>}
                        newTab={true}
                        title="Email"
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </DialogueBox>
          <nav aria-label="Portfolio sections" className="grid grid-cols-5 divide-x divide-sky-500/20 border border-t-0 border-sky-500/20 bg-slate-950 font-mono">
            {fields.map((section, index) => (
              <button
                key={section.title}
                type="button"
                aria-current={fieldIndex === index ? "page" : undefined}
                onClick={() => setFieldIndex(index)}
                className={`min-h-14 min-w-0 cursor-pointer px-1 py-4 text-sm [overflow-wrap:anywhere] transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-300 motion-reduce:transition-none sm:px-2 sm:text-base ${
                  fieldIndex === index
                    ? "bg-sky-950 font-bold text-sky-300 shadow-[inset_0_-2px_0_var(--color-sky-400)]"
                    : "text-slate-400 hover:bg-sky-950 hover:text-sky-300"
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
          </div>
        </section>
      </div>
    </>
  );
}
