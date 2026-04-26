import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Link } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '@/app/globals.css';
import { Providers } from '@/app/providers.jsx';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { signIn, signOut, auth } from "@/auth";
import { redirect } from "next/navigation"

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
    const session = await auth();
    const t = await getTranslations();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${jakartaSans.variable} ${jetbrainsMono.variable} font-sans`}>
                <Providers>
                    <NextIntlClientProvider messages={messages}>
                        <header className="w-full h-16 sticky top-0 z-50 bg-panel/75 backdrop-blur-xl border-b border-outline/50 shadow-panel flex justify-between items-center px-4 transition-colors duration-500">
                            <Link href="/" className="link text-xl text-primary drop-shadow-sm hover:drop-shadow-[0_0_10px_var(--color-glow)]">
                                Smart Workshop
                            </Link>
                            <div className="flex items-center">
                                {session ? (
                                    <div className="flex gap-4 items-center">
                                        <span>{session.user.name}</span>
                                        <form action={async () => { "use server"; await signOut() }}>
                                            <button type="submit" className="submit-btn px-3 py-2 py">{t("common.actions.logout")}</button>
                                        </form>
                                    </div>
                                ) : (
                                    <form action={async () => { "use server"; await signIn("google") }}>
                                        <button type="submit" className="submit-btn px-3 py-2">{t("common.actions.login")}</button>
                                    </form>
                                )}
                                <LanguageToggle />
                                <ThemeToggle />
                            </div>
                        </header>
                        <main className="mt-8 flex flex-col justify-center items-center w-full px-4 animate-fade-in relative z-10 h-full flex-1">
                            {session ? (
                                children
                            ) : (
                                <div className="flex flex-col items-center justify-center h-[50vh] gap-6 animate-in fade-in zoom-in duration-500">
                                    <h1 className="text-5xl md:text-7xl font-bold tracking-widest uppercase text-primary drop-shadow-[0_0_20px_var(--color-glow)]">
                                        Smart Workshop
                                    </h1>
                                    <p className="text-xl text-muted mt-4 font-mono">
                                        {t("common.titles.slogan")}
                                    </p>
                                </div>
                            )}
                        </main>
                        <div id="modal-root"></div>
                    </NextIntlClientProvider>
                </Providers>
            </body>
        </html>
    );
}
