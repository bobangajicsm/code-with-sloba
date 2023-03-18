import Navigation from "./navigation";
import Footer from "./footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>
          Code with Sloba | Helping You Become a Better JavaScript Engineer
        </title>
        <meta
          name="description"
          content="Learn JavaScript by doing through theory and practical projects"
        />

        <meta property="og:url" content="https://codewithsloba.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Code with Sloba | Helping You Become a Better JavaScript Engineer"
        />
        <meta
          property="og:description"
          content="Learn JavaScript by doing through theory and practical projects"
        />
        <meta
          property="og:image"
          content="https://codewithsloba.com/og_image.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="codewithsloba.com" />
        <meta property="twitter:url" content="https://codewithsloba.com/" />
        <meta
          name="twitter:title"
          content="Code with Sloba | Helping You Become a Better JavaScript Engineer"
        />
        <meta
          name="twitter:description"
          content="Learn JavaScript by doing through theory and practical projects"
        />
        <meta
          name="twitter:image"
          content="https://codewithsloba.com/og_image.png"
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
