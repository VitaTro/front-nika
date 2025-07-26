import { useTranslation } from "react-i18next";
import styled from "styled-components";

const PaymentInfoBanner = styled.div`
  background-color: #fff8e1;
  border-left: 6px solid #ffb300;
  padding: 16px;
  margin-bottom: 24px;
  font-size: 15px;
  line-height: 1.5;
`;

const PaymentMethodNotice = ({ method }) => {
  const { t } = useTranslation();
  if (method === "bank_transfer") {
    return (
      <PaymentInfoBanner
        dangerouslySetInnerHTML={{
          __html: t("bank_transfer_link"),
        }}
      />
    );
  }

  if (method === "BLIK" || method === "card") {
    return (
      <PaymentInfoBanner
        dangerouslySetInnerHTML={{
          __html: t("card"),
        }}
      />
    );
  }

  return null;
};

export default PaymentMethodNotice;
