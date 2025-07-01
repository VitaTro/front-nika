import { useTranslation } from "react-i18next";
import AdminMessageForm from "../../components/UserDashboard/tab/ProfileMain/AdminMessageForm";

const UserSettings = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2>⚙️ {t("settings_profile")}</h2>
      <AdminMessageForm />
      <hr />
      <h3>❌ {t("delete_profile")}</h3>
      <p>
        Funkcja usuwania konta będzie wkrótce dostępna. Skontaktuj się z
        administratorem, jeśli chcesz usunąć konto wcześniej.
      </p>
    </div>
  );
};
export default UserSettings;
