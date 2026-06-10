import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { UserContext } from "./context/UserContext";

export default function App() {
	const { isLoggedIn } = useContext(UserContext);
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={isLoggedIn ? <Navigate to="/dashboard"></Navigate> : <Login />} />
				<Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard"></Navigate> : <Login />} />
				<Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard"></Navigate> : <Register />} />
				<Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login"></Navigate>} />
			</Route>
		</Routes>
	);
}
