"use client";

import BaseLayout from "@/layouts/base-layout";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { HeroTitle } from "@/widgets/MainPage/HeroTitle/HeroTitle";
import { HeroFeatures } from "@/widgets/MainPage/HeroFeatures/HeroFeatures";
import { HeroImage } from "@/widgets/MainPage/HeroImage/HeroImage";

import styles from "@/app/styles.module.scss";
import { BenefitsSection } from "@/widgets/MainPage/BenefitsSection/BenefitsSection";
import { ReviewsSection } from "@/widgets/MainPage/ReviewsSection/ReviewsSection";
import { VideoGallery } from "@/widgets/MainPage/VideoGallery/VideoGallery";
import { Preloader } from "@/widgets/Preloader/Preloader";
import { ApartmentsSwiper } from "@/widgets/MainPage/ApartmentsSwiper/ApartmentsSwiper";
import { FAQ } from "@/widgets/MainPage/FAQ/FAQ";
import { NewsSection } from "@/widgets/MainPage/NewsSection/NewsSection";
import { ContactsSection } from "@/widgets/MainPage/ContactsSection/ContactsSection";
import { TariffsSection } from "@/widgets/MainPage/TariffsSection/TariffsSection";
import { WorkConditions } from "@/widgets/MainPage/WorkConditions/WorkConditions";
import AdSlider from "@/widgets/AdSlider/AdSlider";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <BaseLayout>
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <HeroTitle />
            <HeroFeatures />
          </motion.div>
          <motion.div
            className={styles.right}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            <HeroImage />
          </motion.div>
        </div>
        <div className={styles.gridBg} />
      </section>
      <AdSlider />
      <BenefitsSection />
      <ApartmentsSwiper />
      <TariffsSection />
      <NewsSection />
      <VideoGallery />
      <WorkConditions />
      <FAQ />
      <ReviewsSection />
      <ContactsSection />
    </BaseLayout>
  );
}
