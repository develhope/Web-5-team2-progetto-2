import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/login";
import Registrazione from "./components/Registrazione";

function LoginPage() {
	const navigate = useNavigate();

	return <Login onRegister={() => navigate("/registrazione")} />;
}

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/login" />} />

			<Route path="/login" element={<LoginPage />} />

			<Route path="/registrazione" element={<Registrazione />} />
		</Routes>
	);
}
