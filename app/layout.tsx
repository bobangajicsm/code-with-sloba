import Navigation from "./navigation";
import Footer from "./footer";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code with Sloba | Helping You Become a Better JavaScript Engineer",
  description:
    "Learn JavaScript by doing through theory and practical projects",
  openGraph: {
    title: "Code with Sloba",
    description:
      "Learn JavaScript by doing through theory and practical projects",
    url: "https://www.codewithsloba.com",
    siteName: "Next.js",
    images: [
      {
        url: "https://www.codewithsloba.com/og_image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <Navigation />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
