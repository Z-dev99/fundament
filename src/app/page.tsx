"use client";

import BaseLayout from "@/layouts/base-layout";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { HeroTitle } from "@/widgets/HeroTitle/HeroTitle";
import { HeroFeatures } from "@/widgets/HeroFeatures/HeroFeatures";
import { HeroImage } from "@/widgets/HeroImage/HeroImage";

import styles from "@/app/styles.module.scss";
import { BenefitsSection } from "@/widgets/BenefitsSection/BenefitsSection";
import { ReviewsSection } from "@/widgets/ReviewsSection/ReviewsSection";
import { VideoGallery } from "@/widgets/VideoGallery/VideoGallery";
import { Preloader } from "@/widgets/Preloader/Preloader";
import { ApartmentsSwiper } from "@/widgets/ApartmentsSwiper/ApartmentsSwiper";
import { FAQ } from "@/widgets/FAQ/FAQ";
import { NewsSection } from "@/widgets/NewsSection/NewsSection";
import { ContactsSection } from "@/widgets/ContactsSection/ContactsSection";
import { TariffsSection } from "@/widgets/TariffsSection/TariffsSection";
import { WorkConditions } from "@/widgets/WorkConditions/WorkConditions";

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
      <BenefitsSection />
      <TariffsSection />
      <ApartmentsSwiper />

      <NewsSection />
      <VideoGallery />
      <WorkConditions />
      <FAQ />
      <ReviewsSection />
      <ContactsSection />
    </BaseLayout>
  );
}
