import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  AboutHeader,
  AboutItem,
  AboutItemStrong,
  BlockContainer,
  BlockContainerSecond,
  ImageOne,
  ImageTwo,
  SectionWrapper,
  TextContainer,
} from "./AboutPage.styled";
import Girl1 from "./girl1.png";
import Girl2 from "./girl2.png";
const AboutSection = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const { t } = useTranslation();
  return (
    <SectionWrapper>
      {/* <AboutGeneral>{t("about_us")}</AboutGeneral> */}
      <BlockContainer>
        <ImageOne src={Girl1} alt="Jewelry" />
        <TextContainer>
          <AboutHeader>{t("Craftsmanship")}</AboutHeader>
          <AboutItem>{t("Craftsmanship_item")}</AboutItem>
          <AboutItem>
            <AboutItemStrong>{t("Luxury")}:</AboutItemStrong> {t("Luxury_item")}
          </AboutItem>
          <AboutItem>
            <AboutItemStrong>{t("Comfort")}:</AboutItemStrong>{" "}
            {t("Comfort_item")}
          </AboutItem>
        </TextContainer>
      </BlockContainer>

      {/* Другий блок: Фото справа, текст зліва */}
      <BlockContainerSecond>
        <ImageTwo src={Girl2} alt="Jewelry Collection" />
        <TextContainer>
          <AboutHeader>{t("Elegance")}</AboutHeader>
          <AboutItem>{t("Elegance_item")}</AboutItem>
          <AboutItem>
            <AboutItemStrong>{t("Jewelry")}</AboutItemStrong>
            {t("Jewelry_item")}
          </AboutItem>
          <AboutItem>
            <AboutItemStrong>{t("Earrings_c")}</AboutItemStrong>{" "}
            {t("Earrings_co")}
          </AboutItem>
          <AboutItem>
            <AboutItemStrong>{t("Rings_c")}</AboutItemStrong> {t("Rings_co")}
          </AboutItem>
          <AboutItem>
            <AboutItemStrong>{t("Bracelets_c")}</AboutItemStrong>{" "}
            {t("Bracelets_co")}
          </AboutItem>
        </TextContainer>
      </BlockContainerSecond>
    </SectionWrapper>
  );
};

export default AboutSection;
