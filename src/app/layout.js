import { Inter, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

export const metadata = { title: "Smart Workshop", description: "The mainstay of every mechanic" };

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${jetbrains.variable} font-sans`}>
                <header className="w-full h-16 sticky top-0 z-50 bg-panel/75 backdrop-blur-xl border-b border-outline/50 shadow-[0_4px_30px_rgba(0,0,0,0.3)] flex justify-center items-center px-4">
                    <Link href="/" className="link text-2xl font-bold tracking-wider uppercase text-blue-100 drop-shadow-md hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
                        Smart Workshop
                    </Link>
                </header>
                <main className="mt-8 flex justify-center items-start w-full px-4 animate-fade-in relative z-10 h-full">
                    {children}
                </main>
                <div id="modal-root"></div>
            </body>
        </html>
    );
}
