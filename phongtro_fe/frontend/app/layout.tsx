import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quy Nhon Rental | Tìm phòng trọ Quy Nhơn nhanh chóng",
  description: "Dịch vụ tìm kiếm phòng trọ, căn hộ, biệt thự cao cấp tại thành phố biển Quy Nhơn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={cn("light", "font-sans", geist.variable)}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body
        className={`${inter.variable} font-display antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

