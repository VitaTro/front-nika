import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAdminLogin } from "../../../redux/auth/adminAuth/operationsAdminAuth";
import {
  selectAdminError,
  selectAdminLoading,
} from "../../../redux/auth/adminAuth/selectorsAdminAuth";
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

const AdminLoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errorMessage = useSelector(selectAdminError);
  const loading = useSelector(selectAdminLoading);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(fetchAdminLogin({ email, password }))
      .unwrap()
      .then(() => navigate("/admin/dashboard")) // 🔀 Перекидаємо адміна після успішного входу
      .catch((error) => console.error("Login failed:", error));
  };

  return (
    <ResponsiveContainer>
      <HeaderForm>{t("admin_login")}</HeaderForm>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {loading && <Loader />}
      <AuthForm onSubmit={handleLogin}>
        <LabelForm>{t("email_label")}</LabelForm>
        <InputForm
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <LabelForm>{t("password_label")}</LabelForm>
        <InputForm
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <ButtonForm type="submit">{t("login_button")}</ButtonForm>
        <ItemForm>
          <Link to="admin/auth/register">{t("register_here")}</Link>
        </ItemForm>
      </AuthForm>
    </ResponsiveContainer>
  );
};

export default AdminLoginForm;
