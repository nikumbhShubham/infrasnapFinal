import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'mr', name: 'मराठी' },
        { code: 'hi', name: 'हिंदी' },
        { code: 'gu', name: 'ગુજરાતી' },
        { code: 'bn', name: 'বাংলা' },
    ];

    const changeLanguage = (langCode) => {
        i18n.changeLanguage(langCode);
        setCurrentLanguage(langCode);
        localStorage.setItem('userLanguage', langCode); // Save to localStorage for persistence
    };

    // Initialize language from localStorage on mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('userLanguage');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
            setCurrentLanguage(savedLanguage);
        }
    }, [i18n]);

    const contextValue = { currentLanguage, changeLanguage, languages };

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
