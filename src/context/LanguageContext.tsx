import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, TranslationDictionary, translations } from "../data/translations";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === "undefined") return "pt";
    const saved = localStorage.getItem("portfolio-lang") as Language | null;
    if (saved === "pt" || saved === "en") return saved;
    // Autodetect browser language if starts with en
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith("en") ? "en" : "pt";
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("portfolio-lang", newLang);
    document.documentElement.lang = newLang === "pt" ? "pt-BR" : "en";
  };

  const toggleLang = () => {
    setLang(lang === "pt" ? "en" : "pt");
  };

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        toggleLang,
        setLang,
        t: translations[lang],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
