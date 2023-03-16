import styles from "components/home.module.scss";
import Header from "./header";
import Technologies from "./technologies";
import LatestOnYoutube from "./latest-on-youtube";
import Socials from "./socials";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
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
        url: "og_image.png",
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

function Home() {
  return (
    <main>
      <div className={styles.jumbotronWrapper}>
        <Header />
      </div>
      <Technologies />
      <LatestOnYoutube />
      <Socials />
      <Analytics />
    </main>
  );
}

export default Home;
