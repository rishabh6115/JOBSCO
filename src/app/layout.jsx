import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import CommonLayout from "@/components/CommonLayout";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JOBSCO",
  description: "The best job board for developers",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Suspense fallback={<Loading />}>
            <CommonLayout>{children}</CommonLayout>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
