import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { FooterCopyright } from "../components/FooterCopyright";
import { FormErrorPopup } from "../components/FormErrorPopup";

import mockUsers from "../data/mockUsers.json";

export function Login() {
	const [popupVisible, setPopupVisible] = useState(false);
	const [popupMessage, setPopupMessage] = useState("");

	const [user, setUser] = useState({
		nickname: "",
		password: "",
	});

	const [users, setUsers] = useState(() => {
		const savedUsers = localStorage.getItem("users");
		if (savedUsers) {
			return JSON.parse(savedUsers);
		} else {
			localStorage.setItem("users", JSON.stringify(mockUsers));
			return mockUsers;
		}
	});

	function handleChange(event: any) {
		const { name, value } = event.target;
		// Verifica dei 18 caratteri massimi per il nickname
		if (name === "nickname" && value.length > 18) {
			return;
		}
		setUser((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function handleLogin(event: any) {
		// Temporaneo
		event.preventDefault();
		const userExists = users.find((u: any) => u.nickname === user.nickname && u.password === user.password);
		if (userExists) {
			setPopupVisible(true);
			setPopupMessage("Login successful.");
		} else {
			setPopupVisible(true);
			setPopupMessage("The nickname or password you entered is incorrect.");
		}
	}

	return (
		<div className="overflow-x-hidden">
			<div className="bg-image-container relative w-full">
				<img
					src="/src/assets/bg-images/login-bg-image.png"
					alt="Background Image"
					className="absolute min-w-150 -z-1 opacity-40 object-cover mask-image-[linear-gradient(to_bottom,rgba(0,0,0,1)_40%,rgba(0,0,0,0)_100%)] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_40%,rgba(0,0,0,0)_100%)]"
				/>
			</div>
			<div className="login-container flex flex-col items-center justify-between h-screen gap-4">
				<div className="logo-container mt-8">
					<img src="/src/assets/logo/guildgate.png" alt="GuildGate Logo" className="w-90" />
				</div>
				<div className="flex flex-col items-center gap-6">
					<div className="flex flex-col items-center gap-1">
						<h1 className="text-lg font-bold">Join the Adventure</h1>
						<p className="text-sm">Find your Party. Fight Together</p>
					</div>
					<form
						onSubmit={handleLogin}
						className="login-form flex flex-col gap-6 border rounded-md mx-5 py-4 px-4 opacity-80"
					>
						<Input
							label="Nickname"
							name="nickname"
							placeholder="Insert your nickname"
							onChange={handleChange}
							value={user.nickname}
							maxLength={18}
							showCounter={true}
						></Input>
						<Input
							label="Password"
							type="password"
							name="password"
							placeholder="Insert your password"
							showPasswordToggle
							onChange={handleChange}
							value={user.password}
						></Input>
						<Button text="Sign In" type="submit" buttonStyle="primaryButton" className="mt-1"></Button>
					</form>
					<p className="text-sm mb-10">
						No account yet? <a className="register-redirect font-bold">Register</a>
					</p>
				</div>
				<div className="flex flex-col items-center gap-20 mb-2">
					<img src="/src/assets/logo/login-footer-icon.png" alt="Footer logo" />
					<FooterCopyright></FooterCopyright>
				</div>
				<FormErrorPopup
					isOpen={popupVisible}
					errorMessage={popupMessage}
					onClose={() => setPopupVisible(false)}
				></FormErrorPopup>
			</div>
		</div>
	);
}
