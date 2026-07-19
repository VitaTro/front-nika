import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  BoxContainer,
  BoxHeader,
  ImageBox,
  WelcomeContainer,
  WelcomeGeneral,
  WelcomeItem,
  WelcomeList,
} from "./ProductsPage.styled";
import Box from "./box.png";
import Gold from "./gold.png";
import GoldLight from "./goldLight.png";
import Handmade from "./handmade.png";
import Set from "./set.png";
import Silver from "./silver.png";

const ProductsPage = ({ isUserAuthenticated }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleProductClick = (route) => {
    const formattedRoute = route.split("/")[2];
    if (!formattedRoute) {
      console.warn("❌ Type is missing in navigation!");
      return;
    }
    const userRoute = isUserAuthenticated
      ? `/user/products/${formattedRoute}`
      : `/products/${formattedRoute}`;
    navigate(userRoute);
  };

  return (
    <>
      <Helmet>
        <title>{t("meta.products.title")}</title>
        <meta name="description" content={t("meta.products.description")} />
      </Helmet>

      <div>
        <WelcomeGeneral>{t("catalog")}</WelcomeGeneral>
        <WelcomeContainer>
          <WelcomeList>
            <WelcomeItem className="no-theme">
              <BoxContainer
                onClick={() => handleProductClick("/products/gold")}
              >
                <ImageBox
                  src={Gold}
                  alt="gold earrings"
                  style={{ width: "200px" }}
                />
                <BoxHeader>{t("gold")}</BoxHeader>
              </BoxContainer>
            </WelcomeItem>

            <WelcomeItem className="no-theme">
              <BoxContainer
                onClick={() => handleProductClick("/products/goldLight")}
              >
                <ImageBox
                  src={GoldLight}
                  alt="gold earrings"
                  style={{ width: "220px" }}
                />
                <BoxHeader>{t("goldLight")}</BoxHeader>
              </BoxContainer>
            </WelcomeItem>

            <WelcomeItem className="no-theme">
              <BoxContainer
                onClick={() => handleProductClick("/products/silver")}
              >
                <ImageBox
                  src={Silver}
                  alt="silver earrings"
                  style={{ width: "220px" }}
                />
                <BoxHeader>{t("silver")}</BoxHeader>
              </BoxContainer>
            </WelcomeItem>

            <WelcomeItem className="no-theme">
              <BoxContainer onClick={() => handleProductClick("/products/set")}>
                <ImageBox
                  src={Set}
                  alt="set gold and silver earrings"
                  style={{ width: "220px" }}
                />
                <BoxHeader>{t("set")}</BoxHeader>
              </BoxContainer>
            </WelcomeItem>

            <WelcomeItem className="no-theme">
              <BoxContainer
                onClick={() => handleProductClick("/products/handmade")}
              >
                <ImageBox
                  src={Handmade}
                  alt="bracelet with red thread"
                  style={{ width: "220px" }}
                />
                <BoxHeader>{t("handmade")}</BoxHeader>
              </BoxContainer>
            </WelcomeItem>

            <WelcomeItem className="no-theme">
              <BoxContainer onClick={() => handleProductClick("/products/box")}>
                <ImageBox
                  src={Box}
                  alt="box on the gold and silver earrings"
                  style={{ width: "220px" }}
                />
                <BoxHeader>{t("packaging")}</BoxHeader>
              </BoxContainer>
            </WelcomeItem>
          </WelcomeList>
        </WelcomeContainer>
      </div>
    </>
  );
};

export default ProductsPage;
