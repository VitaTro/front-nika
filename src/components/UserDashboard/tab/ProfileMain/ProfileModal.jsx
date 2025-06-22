import { useEffect, useState } from "react";
import Modal from "react-modal";
const ProfileModal = ({ user, isOpen, onClose }) => {
  const [formData, setFormData] = useState(
    user || { name: "", email: "", address: "" }
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Edytuj profil</button>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>Edycja profilu</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <button onClick={() => setIsModalOpen(false)}>Zamknij</button>
      </Modal>
    </>
  );
};

export default ProfileModal;
