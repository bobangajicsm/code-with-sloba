import Navigation from "./navigation";
import Footer from "./footer";
import "./globals.css";
import { Suspense } from "react";

function SearchBarFallback() {
  return <>Loading...</>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <Suspense fallback={<SearchBarFallback />}>
            <Navigation />
          </Suspense>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
