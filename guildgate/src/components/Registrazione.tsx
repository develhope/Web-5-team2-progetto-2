import { useNavigate } from "react-router-dom";

export default function Registrazione() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Registrazione</h1>

      <button onClick={() => navigate("/login")}>
        Torna al Login
      </button>
    </>
  );
}