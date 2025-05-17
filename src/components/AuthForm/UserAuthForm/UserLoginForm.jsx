import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/auth/userAuth/operationAuth";
import {
  selectAuthError,
  selectAuthLoading,
  selectIsLoggedIn,
} from "../../../redux/auth/userAuth/selectorsAuth";
import Loader from "../../Loader";
import {
  AuthForm,
  ButtonForm,
  HeaderForm,
  InputForm,
  ItemForm,
  LabelForm,
  ResponsiveContainer,
} from "../AuthFormRegister.styled";

const UserLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const loading = useSelector(selectAuthLoading);
  const errorMessage = useSelector(selectAuthError);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const credentials = Object.fromEntries(formData.entries());
    dispatch(loginUser(credentials));
  };

  if (isLoggedIn) {
    navigate("/main");
  }

  return (
    <ResponsiveContainer>
      <HeaderForm> {t("user_login")}</HeaderForm>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <AuthForm onSubmit={handleLogin}>
        <LabelForm>{t("email_label")}</LabelForm>
        <InputForm name="email" type="email" required />

        <LabelForm>{t("password_label")}</LabelForm>
        <InputForm name="password" type="password" required />

        {loading ? (
          <Loader />
        ) : (
          <ButtonForm type="submit">{t("login_button")}</ButtonForm>
        )}
        <ItemForm>
          {t("no_account")}{" "}
          <Link to={"/user/auth/register"}>{t("register_here")}</Link>
        </ItemForm>
      </AuthForm>
    </ResponsiveContainer>
  );
};

export default UserLoginForm;
