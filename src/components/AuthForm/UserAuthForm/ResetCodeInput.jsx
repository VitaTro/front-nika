import { useRef, useState } from "react";
import { AuthForm, ButtonForm, InputForm } from "../AuthFormRegister.styled";

const ResetCodeInput = ({ onComplete }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (index < 5 && value) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.includes("")) {
      alert("Wprowadź pełny kod!");
      return;
    }
    onComplete(code.join(""));
  };

  return (
    <AuthForm onSubmit={handleSubmit}>
      <div style={{ display: "flex", gap: "8px" }}>
        {code.map((num, index) => (
          <InputForm
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength="1"
            value={num}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            style={{
              width: "30px",
              height: "30px",
              textAlign: "center",
              fontSize: "20px",
            }}
          />
        ))}
      </div>
      <ButtonForm type="submit" style={{ marginTop: "10px" }}>
        Potwierdź kod
      </ButtonForm>
    </AuthForm>
  );
};

export default ResetCodeInput;
