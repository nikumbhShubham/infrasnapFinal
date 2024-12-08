import React from 'react';
import { ChevronsRight, RadioTower } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const { t } = useTranslation();
  return (
    <div className="min-h-screen py-24 px-4 md:px-8 ">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        {/* Background Shapes and Image */}
        <div className="relative w-full lg:w-3/4 max-w-4xl">
          {/* Image */}
          <div className="relative z-10 mt-10">
            <img
              src="assets/abt.png"
              alt="About Section"
              className="w-full h-auto object-cover rounded-3xl"
            />
          </div>

          {/* Background Shapes */}
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full blur-xl"></div>
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-gradient-to-br from-white to-gray-100 rounded-full blur-3xl"></div>
        </div>


        {/* Content */}
        <div className="lg:w-1/2 text-left">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-6 shadow-sm border border-gray-100">
            <span className="flex items-center gap-2 text-gray-600 font-medium">
              <RadioTower className="w-6 h-6 rounded-full p-1 bg-gradient-to-t from-[#cbcccd] to-[#ced8f0]  text-blue-950" />
              {t('about.leadDealManagement')}
            </span>
            
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-t from-[#1a4c9d] to-[#101a32] bg-clip-text text-transparent mb-6 leading-tight">
          {t('about.seamlessIntegrationHeading')}
          </h2>

          <p className="text-lg text-gray-600 mb-8 max-w-xl">
          {t('about.seamlessIntegrationDescription')}

          </p>

          <button className="flex items-center gap-2 bg-gradient-to-r from-[#101a32] to-[#0f52bd] hover:from-[#0e449b] hover:to-[#101a32] text-white px-5 py-2 rounded-full text-sm font-medium transition-all">
            <span>{t('about.getStarted')}
            </span>
            <ChevronsRight className="w-7 h-7  rounded-full p-1 bg-gradient-to-t from-[#cbcccd] via-black to-[#030e29] " /> {/* Adjust the size as needed */}

          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
