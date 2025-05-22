import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../redux/user/userOperations";
import { selectUser } from "../../redux/user/userSelectors";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Profile Information</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Address: {user.address}</p>
    </div>
  );
};
export default ProfilePage;
