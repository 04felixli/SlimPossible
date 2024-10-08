import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import WorkoutContextProvider from "./contexts/workoutContext";
import TemplateContextProvider from "./contexts/templateContext";
import HistoryContextProvider from "./contexts/historyContext";

const roboto = Roboto({ subsets: ["latin"], weight: ['700', '500', '400', '100'] });

export const metadata: Metadata = {
  title: "SlimPossible",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <WorkoutContextProvider>
        <TemplateContextProvider>
          <HistoryContextProvider>
            <body className={`max-w-screen min-w-screen min-h-screen flex justify-center ${roboto.className}`}>{children}</body>
          </HistoryContextProvider>
        </TemplateContextProvider>
      </WorkoutContextProvider>
    </html>
  );
}
