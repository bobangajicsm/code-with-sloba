import Navigation from './navigation';
import Footer from './footer';
import './globals.css';

export const metadata = {
  title: "Code with Sloba | Your web coding buddy",
  description:
    "Learn JavaScript by doing through theory and practical projects",
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