"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n-context"

export default function Footer() {
    const { t } = useI18n()

    return (
        <footer className="border-t border-border/50 py-16 px-4 sm:px-6 lg:px-8 bg-card/20">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Drag N' Drop
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {t("footer.about")}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">{t("footer.shop")}</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                                    {t("footer.allProducts")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                                    {t("footer.featured")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">{t("footer.company")}</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    {t("footer.aboutUs")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                                    {t("footer.contact")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">{t("footer.legal")}</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                                    {t("footer.privacy")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                                    {t("footer.terms")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
                    <p>{t("footer.copyright")}</p>
                </div>
            </div>
        </footer>
    )
}
