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
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.codewithsloba.com" />
        <meta
          property="og:image"
          content="https://www.codewithsloba.com/og_image.png"
        />
        <meta property="og:title" content="Code with Sloba" />
        <meta
          property="og:description"
          content="Learn JavaScript by doing through theory and practical projects"
        />
        <meta
          name="description"
          content="Learn JavaScript by doing through theory and practical projects"
          key="desc"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_SlobodanGajic_" />
        <meta name="twitter:creator" content="@_SlobodanGajic_" />
        <meta
          name="twitter:image"
          content="https://www.codewithsloba.com/og_image.png"
        />
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
