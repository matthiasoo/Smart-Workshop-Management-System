import Link from 'next/link';
import './globals.css';

export const metadata = { title: "Smart Workshop", description: "The mainstay of every mechanic" };

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <header className="bg-panel border-b border-outline w-[100vw] h-16 flex justify-center items-center shadow-xl shadow-black">
                    <Link href="/" className="link">
                        <h1>Smart Workshop</h1>
                    </Link>
                </header>
                <main className="flex justify-center mt-4">
                    {children}
                </main>
                <div id="modal-root"></div>
            </body>
        </html>
    );
}
