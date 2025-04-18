import { useTranslation } from "react-i18next";
import { EmptyState, StyledImage } from "./NoResults.styled";
import emptyImage from "./empty.jpeg";

const NoResults = () => {
  const { t } = useTranslation();
  return (
    <EmptyState>
      <StyledImage src={emptyImage} alt="No results" />
      <p>{t("no_results")}</p>
    </EmptyState>
  );
};
export default NoResults;
