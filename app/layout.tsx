import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-stone-50`}>
        <div className="flex h-screen overflow-hidden">
          {/* Persistent Sidebar */}
          <Sidebar />

          <div className="flex-1 flex flex-col min-w-0">
            {/* Persistent Header */}
            <Header />

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto bg-stone-50">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
