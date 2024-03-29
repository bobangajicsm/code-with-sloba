import styles from "components/home.module.scss";
import Header from "./header";
import Technologies from "./technologies";
import LatestOnYoutube from "./latest-on-youtube";
import Socials from "./socials";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Code with Sloba | Master JavaScript with 2 mins a day",
  description:
    "Learn JavaScript by doing through theory and practical projects",
  creator: "Slobodan Gajic",
  keywords: ["Slobodan Gajic", "code with sloba", "JavaScript"],
  openGraph: {
    title: "Code with Sloba",
    description:
      "Master coding with just 2 minutes a day!",
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
      "Master coding with just 2 minutes a day!",
    creator: "@_SlobodanGajic_",
    images: ["https://www.codewithsloba.com/og_image.png"],
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
