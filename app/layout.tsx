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
        url: "/og_image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Code with Sloba",
    description:
      "Learn JavaScript by doing through theory and practical projects",
    creator: "@_SlobodanGajic_",
    images: ["/og_image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["my-email", "my-link"],
    },
  },
  category: "javascript",
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
