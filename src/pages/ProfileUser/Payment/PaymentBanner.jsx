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

  // 🟡 Bank transfer
  if (method === "bank_transfer") {
    return (
      <PaymentInfoBanner
        dangerouslySetInnerHTML={{
          __html: t("bank_transfer_link"),
        }}
      />
    );
  }

  // 🔵 Elavon online payment
  if (method === "elavon_link") {
    return (
      <PaymentInfoBanner
        dangerouslySetInnerHTML={{
          __html: t("elavon_online_payment_notice"),
        }}
      />
    );
  }

  return null;
};

export default PaymentMethodNotice;
