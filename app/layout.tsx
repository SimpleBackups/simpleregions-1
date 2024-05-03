import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SimpleRegions",
  description: "A Simple Cloud-Provider region list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "")}>
        <header className="py-16 bg-gray-900 border-b">
          <div className="prose xl:prose-xl mx-auto">
            <h1 className=" text-primary text-center">SimpleRegions</h1>
          </div>
        </header>
        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
