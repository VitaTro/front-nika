import { useState } from "react";

const BankTransferInfo = ({ orderId, totalPrice }) => {
  const [copied, setCopied] = useState(false);
  const iban = "PL27 1940 1076 3280 6940 0000 0000 ";

  const handleCopy = () => {
    navigator.clipboard.writeText(iban);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div
      style={{ background: "#f5f5f5", padding: "20px", borderRadius: "8px" }}
    >
      <h3>📥 Dane do przelewu bankowego</h3>
      <ul>
        <li>
          <strong>Odbiorca:</strong> NIKA GOLD
        </li>
        <li>
          <strong>Numer konta:</strong> {iban}
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
        Po wykonaniu przelewu prosimy o kontakt w celu potwierdzenia płatności.
      </p>
    </div>
  );
};

export default BankTransferInfo;
