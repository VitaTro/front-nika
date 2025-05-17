import { useTranslation } from "react-i18next";
import { FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "../../../redux/auth/userAuth/operationAuth";
import {
  selectAuthError,
  selectIsEmailVerified,
} from "../../../redux/auth/userAuth/selectorsAuth";
import {
  ButtonForm,
  StatusIcon,
  VerificationContainer,
} from "./EmailVerification.styled";

const EmailVerification = ({ token }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isVerified = useSelector(selectIsEmailVerified);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    dispatch(verifyEmail(token));
    console.log("🔎 Token from props:", token);
  }, [dispatch, token]);

  return (
    <VerificationContainer isVerified={isVerified}>
      <StatusIcon>
        {isVerified ? <FaCheckCircle /> : <FaHourglassHalf />}
      </StatusIcon>
      <h2>{isVerified ? t("email_verified") : t("verification_pending")}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {isVerified && (
        <ButtonForm onClick={() => navigate("/user/auth/login")}>
          {t("ok")}
        </ButtonForm>
      )}
    </VerificationContainer>
  );
};
export default EmailVerification;
