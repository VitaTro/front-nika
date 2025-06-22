import { useState } from "react";

const BlikPhoneTransferInfo = ({ orderId, totalPrice }) => {
  const [copied, setCopied] = useState(false);
  const blikPhone = "+48516174555";

  const handleCopy = () => {
    navigator.clipboard.writeText(blikPhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div
      style={{ background: "#eef6f9", padding: "20px", borderRadius: "8px" }}
    >
      <h3>📲 Płatność BLIK na telefon</h3>
      <ul>
        <li>
          <strong>Numer telefonu:</strong> {blikPhone}
          <button onClick={handleCopy} style={{ marginLeft: "8px" }}>
            Kopiuj
          </button>
          {copied && (
            <span style={{ color: "green", marginLeft: "10px" }}>
              ✅ Skopiowano
            </span>
          )}
        </li>
        <li>
          <strong>Tytuł przelewu:</strong> Zamówienie {orderId}
        </li>
        <li>
          <strong>Kwota:</strong> {totalPrice} zł
        </li>
      </ul>
      <p style={{ marginTop: "16px" }}>
        Wykonaj przelew BLIK w aplikacji swojego banku, wybierając opcję „Na
        telefon”.
      </p>
      <p>
        Po dokonaniu płatności, prosimy o kontakt w celu szybszej realizacji
        zamówienia.
      </p>
    </div>
  );
};

export default BlikPhoneTransferInfo;
