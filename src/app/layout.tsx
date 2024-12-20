import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu";
import { headers } from "next/headers";
import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import NextAuthProvider from "@/providers/NextAuthProvider";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const inter = Inter({ subsets: ['latin'] });
const ibmPlexSansThaiLooped = IBM_Plex_Sans_Thai({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["thai"],
  variable: "--ibm-plex-sans-thai-font",
});

export const metadata: Metadata = {
  title: "PJ Restaurant Reservation",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" type="x-icon" href="/img/PJ_Restaurant_Reservation_Logo.jpg" />
      </head>
      <body className={cn(
        inter.className,
        ibmPlexSansThaiLooped.className,
      )}>
        <NextAuthProvider session={session}>
          <TopMenu />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
