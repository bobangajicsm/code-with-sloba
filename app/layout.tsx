import Navigation from "./navigation";
import Footer from "./footer";
import "./globals.css";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

function SearchBarFallback() {
  return <>Loading...</>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          <div>
            <Suspense fallback={<SearchBarFallback />}>
              <Navigation />
            </Suspense>
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
