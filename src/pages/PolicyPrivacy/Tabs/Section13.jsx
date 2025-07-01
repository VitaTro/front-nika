import { useTranslation } from "react-i18next";
import DataRequestModal from "../../../components/DataRequest/DataRequesrModal";

const Section13 = () => {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t("privacy_policy.section13.title")}</h2>
      <p>{t("privacy_policy.section13.content_1")}</p>
      <p>{t("privacy_policy.section13.content_2")}</p>
      <DataRequestModal buttonLabel={t("request_data_access_button")} />
    </section>
  );
};

export default Section13;
