import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Providers } from "@/libs/Providers";
import { NextUIProvider } from "@/components/NextUIProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="ko" className="light">
        <body>
          <NextUIProvider>
            <Header />
            <main className="max-w-screen-lg mx-auto pt-20">{children}</main>
          </NextUIProvider>
        </body>
      </html>
    </Providers>
  );
}
