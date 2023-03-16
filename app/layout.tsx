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
    images: ["https://www.codewithsloba.com/og_image.png"],
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
      <head>
        <title></title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <meta
          property="og:image"
          content="https://www.codewithsloba.com/og_image.png"
        />
        <meta property="og:title" content="Code with Sloba" />
        <meta
          property="og:description"
          content="Learn JavaScript by doing through theory and practical projects"
        />
        <meta name="description" content="" key="desc" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_SlobodanGajic_" />
        <meta name="twitter:creator" content="@_SlobodanGajic_" />
        <meta name="twitter:image" content="" />
        <meta
          name="twitter:image:src"
          content="https://www.codewithsloba.com/og_image.png"
        />
        <meta charSet="utf-8" />
        <meta
          name="keywords"
          content="code with sloba, javascript tutorials, frontend tips, software development"
        ></meta>
        <meta name="robots" content="index, follow" />

        <meta content="Code with Sloba" />
        <meta
          name="twitter:description"
          content="Learn JavaScript by doing through theory and practical projects"
        />
        <link rel="canonical" href="https://www.codewithsloba.com/" />
        <meta name="next-head-count" content="18" />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="60x61.66"
          href="/favicon.ico"
        />
      </head>
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
