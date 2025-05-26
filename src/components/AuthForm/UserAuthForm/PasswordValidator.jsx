const PasswordValidator = ({ password, isFocused }) => {
  if (!isFocused) return null;
  const criteria = [
    { label: "Musi mieć co najmniej 8 znaków", check: password.length >= 8 },
    { label: "Musi mieć co najmniej jedna cyfra", check: /\d/.test(password) },
    {
      label: "Musi być przynajmniej jeden znak specjalny",
      check: /[\W_]/.test(password),
    },
    {
      label: "Musi być przynajmniej jedna wielka litera",
      check: /[A-Z]/.test(password),
    },
  ];

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {criteria.map((item, index) => (
        <li
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "11px",
            marginBottom: "5px",
          }}
        >
          <span
            style={{
              width: "14px",
              height: "14px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              backgroundColor: item.check ? "green" : "red",
              color: "white",
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            {item.check ? "✔" : "✖"}
          </span>
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default PasswordValidator;
