import { useState } from "react";
import { useDispatch } from "react-redux";
import { BankContainer, BankInput } from "./Payment.styled";
const PaymentMethod = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    if (
      formData.cardNumber.length === 16 &&
      formData.expiryDate &&
      formData.cvv.length === 3
    ) {
      dispatch(confirmPayment({ ...formData }));
    } else {
      alert("Wprowadź poprawne dane karty!");
    }
  };
  return (
    <BankContainer>
      <h2>Płatność za pośrednictwem przelewu bankowego</h2>
      <BankInput
        type="text"
        name="cardHolder"
        placeholder="Imię właściciela karty"
        onChange={handleChange}
      />
      <BankInput
        type="text"
        name="cardNumber"
        placeholder="Numer karty (16 cyfr)"
        onChange={handleChange}
      />
      <BankInput
        type="text"
        name="expiryDate"
        placeholder="MM/YY"
        onChange={handleChange}
      />
      <BankInput
        type="password"
        name="cvv"
        placeholder="CVV (3 cyfry)"
        onChange={handleChange}
      />

      <button onClick={handleConfirm}>Potwierdź płatność</button>
    </BankContainer>
  );
};
