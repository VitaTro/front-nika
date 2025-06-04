import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAddress } from "../../redux/user/userOperations";
import { selectUserAddress } from "../../redux/user/userSelectors";
const ProfileAddressEdit = () => {
  const dispatch = useDispatch();
  const address = useSelector(selectUserAddress);

  const [addressData, setAddressData] = useState(address || "");

  const handleChange = (e) => {
    setAddressData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addressData.length < 5) {
      alert("❌ Адреса має бути коректною!");
      return;
    }
    dispatch(updateUserAddress({ address: addressData }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Адреса доставки</h2>
      <input
        type="text"
        name="address"
        value={addressData}
        onChange={handleChange}
      />
      <button type="submit">Зберегти адресу</button>
    </form>
  );
};

export default ProfileAddressEdit;
