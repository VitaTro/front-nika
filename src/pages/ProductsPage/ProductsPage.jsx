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
import Set from "./set.png";
import Silver from "./silver.png";

const ProductsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleProductClick = (route) => {
    navigate(route);
  };
  return (
    <div>
      <WelcomeGeneral>{t("catalog")}</WelcomeGeneral>
      <WelcomeContainer>
        <WelcomeList>
          <WelcomeItem className="no-theme">
            <BoxContainer onClick={() => handleProductClick("/products/gold")}>
              <ImageBox
                src={Gold}
                alt="gold earrings"
                style={{ width: "220px" }}
              />
              <BoxHeader>{t("gold")}</BoxHeader>
            </BoxContainer>
          </WelcomeItem>
          <WelcomeItem className="no-theme">
            <div onClick={() => handleProductClick("/products/silver")}>
              <BoxContainer>
                <ImageBox
                  src={Silver}
                  alt="silver earrings"
                  style={{ width: "220px" }}
                />
                <BoxHeader>{t("silver")}</BoxHeader>
              </BoxContainer>
            </div>
          </WelcomeItem>
          <WelcomeItem className="no-theme">
            <div onClick={() => handleProductClick("/products/set")}>
              <BoxContainer>
                <ImageBox
                  src={Set}
                  alt="set gold and silver earrings"
                  style={{ width: "220px" }}
                />
                <BoxHeader>{t("set")}</BoxHeader>
              </BoxContainer>
            </div>
          </WelcomeItem>
          <WelcomeItem className="no-theme">
            <div onClick={() => handleProductClick("/products/box")}>
              <BoxContainer>
                <ImageBox
                  src={Box}
                  alt="box on the gold and silver earrings"
                  style={{ width: "220px" }}
                />
                <BoxHeader>{t("packaging")}</BoxHeader>
              </BoxContainer>
            </div>
          </WelcomeItem>
        </WelcomeList>
      </WelcomeContainer>
    </div>
  );
};
export default ProductsPage;
