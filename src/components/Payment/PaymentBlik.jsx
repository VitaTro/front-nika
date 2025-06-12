import { useDispatch, useSelector } from "react-redux";
import {
  selectIsPaymentSuccessful,
  selectPaymentStatus,
} from "../../redux/payment/selectorPayment";
import { BlikContainer, BlikInput } from "./Payment.styled";

const PaymentBlik = () => {
  const dispatch = useDispatch();
  const paymentStatus = useSelector(selectPaymentStatus);
  const isPaymentSuccessful = useSelector(selectIsPaymentSuccessful);
  const [blikCode, setBlikCode] = useState("");

  const handleConfirm = () => {
    if (blikCode.length === 6) {
      dispatch(confirmPayment({ paymentCode: blikCode }));
    } else {
      alert("Wprowadź 6-cyfrowy kod BLIK!");
    }
  };

  return (
    <BlikContainer>
      <h2>Płatność przez BLIK</h2>
      {isPaymentSuccessful ? (
        <p>✅ Płatność zakończona sukcesem!</p>
      ) : (
        <>
          <BlikInput
            type="text"
            maxLength="6"
            placeholder="XXXXXX"
            value={blikCode}
            onChange={(e) => setBlikCode(e.target.value)}
          />
          <button onClick={handleConfirm}> Podtwierdzić płatność</button>
          {paymentStatus === "failed" && <p> ❌ Płatność nie powiodła się!</p>}
        </>
      )}
    </BlikContainer>
  );
};
export default PaymentBlik;
