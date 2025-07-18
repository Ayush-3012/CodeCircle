import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AppProvider from "@/lib/redux/Provider";

export const metadata: Metadata = {
  title: "DevConnect",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AppProvider>
          <Navbar />
          <div>{children}</div>
        </AppProvider>
      </body>
    </html>
  );
}
