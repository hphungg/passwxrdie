import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "passwxrdie",
  description: "created by hphxngg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
            <link href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=optional" rel="stylesheet" />
        </head>
      
        <body>
            {children}
        </body>
    </html>
  );
}
