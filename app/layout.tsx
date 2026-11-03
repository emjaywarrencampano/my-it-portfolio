import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const title = `${profile.name} — IT Specialist`;
const description =
  "IT Specialist in Ilagan, Isabela. Builds systems end-to-end — from ESP32 hardware to the web app that monitors it. Network and Security, certified by Certiport.";

export const metadata: Metadata = {
  metadataBase: new URL("https://warren2003819.github.io/my-it-portfolio"),
  title: {
    default: title,
    template: `%s — ${profile.shortName}`,
  },
  description,
  keywords: [
    "IT Specialist",
    "Network Security",
    "Ilagan Isabela",
    "ESP32",
    "Certiport",
    "portfolio",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: profile.name,
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#111110" },
  ],
  width: "device-width",
  initialScale: 1,
};

const themeScript = `(function(){try{var t=localStorage.getItem("ewc-theme");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${instrument.variable} ${jetbrains.variable}`}>
        {children}
      </body>
    </html>
  );
}
