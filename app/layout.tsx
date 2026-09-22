import type { Metadata } from "next";

import { LensTransition } from "@/components/lens-transition/lens-transition";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mattdavis207.github.io"),
  title: {
    default: "Matthew Davis",
    template: "%s — Matthew Davis",
  },
  description: "The personal website of Matthew Davis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-clip">
      <body className="bg-[var(--field-background)] font-sans">
        <LensTransition />
        <main className="relative min-h-svh">{children}</main>
      </body>
    </html>
  );
}
