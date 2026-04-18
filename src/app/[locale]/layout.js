import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Link } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '@/app/globals.css';
import { Providers } from '@/app/providers.jsx';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';

export const metadata = { 
    title: "Smart Workshop", 
    description: "The mainstay of every mechanic" 
};

const jakartaSans = Plus_Jakarta_Sans({
    variable: "--font-sans",
    subsets: ["latin", "latin-ext"],
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin", "latin-ext"],
});

export default async function RootLayout({ children, params }) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${jakartaSans.variable} ${jetbrainsMono.variable} font-sans`}>
                <Providers>
                    <NextIntlClientProvider messages={messages}>
                        <header className="w-full h-16 sticky top-0 z-50 bg-panel/75 backdrop-blur-xl border-b border-outline/50 shadow-panel flex justify-between items-center px-4 transition-colors duration-500">
                            <Link href="/" className="link text-2xl text-primary drop-shadow-sm hover:drop-shadow-[0_0_10px_var(--color-glow)]">
                                Smart Workshop
                            </Link>
                            <div className="flex items-center">
                                <LanguageToggle />
                                <ThemeToggle />
                            </div>
                        </header>
                        <main className="mt-8 flex justify-center items-start w-full px-4 animate-fade-in relative z-10 h-full">
                            {children}
                        </main>
                        <div id="modal-root"></div>
                    </NextIntlClientProvider>
                </Providers>
            </body>
        </html>
    );
}
