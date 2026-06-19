import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ThemeProvider } from "@/components/site/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://ahmedhelal.dev";
const SITE_NAME = "Ahmed Hatem Helal";
const SITE_TITLE = "Ahmed Hatem Helal — Full-stack developer";
const SITE_DESCRIPTION =
  "Ahmed Hatem Helal is a full-stack developer building cross-platform AI products — desktop, mobile, and web. Python, Django, Next.js, Flutter, Qt.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · Ahmed Hatem Helal",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "Ahmed Hatem Helal",
    "full-stack developer",
    "cross-platform",
    "AI products",
    "Python",
    "FastAPI",
    "Django",
    "Next.js",
    "React",
    "Flutter",
    "Qt",
    "Electron",
    "Cairo",
  ],
  alternates: { canonical: "/" },
  // og:image / twitter:image are injected automatically from the
  // opengraph-image.tsx / twitter-image.tsx file conventions.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@ahmedhelal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0907" },
    { media: "(prefers-color-scheme: light)", color: "#faf6ec" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased no-js`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-canvas text-fg">
        {/* Drop the no-js flag ASAP so scroll-reveals only hide when JS can reveal them. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js')`,
          }}
        />
        <ThemeProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
