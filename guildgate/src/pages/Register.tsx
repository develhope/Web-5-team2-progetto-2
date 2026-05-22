import { useState, useEffect } from "react";
import { AvatarSelector } from "../components/AvatarSelector";
import { Button } from "../components/Button";
import { ClassSelector } from "../components/ClassSelector";
import { FooterCopyright } from "../components/FooterCopyright";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { FormErrorPopup } from "../components/FormErrorPopup";

import mockUsers from "../data/mockUsers.json";

export function Register() {
	const DEFAULT_AVATAR = "avatar-1";
	const DEFAULT_CLASS = "warrior";

	const [popupVisible, setPopupVisible] = useState(false);
	const [popupMessage, setPopupMessage] = useState("");

	const [users, setUsers] = useState(() => {
		const savedUsers = localStorage.getItem("users");
		if (savedUsers) {
			return JSON.parse(savedUsers);
		} else {
			localStorage.setItem("users", JSON.stringify(mockUsers));
			return mockUsers;
		}
	});

	const [user, setUser] = useState({
		nickname: "",
		level: "",
		server: "",
		avatar: DEFAULT_AVATAR,
		class: DEFAULT_CLASS,
		password: "",
		"confirm-password": "",
	});

	function handleChange(event: any) {
		const { name, value } = event.target;

		// Verifica dei 18 caratteri massimi per il nickname
		if (name === "nickname" && value.length > 18) {
			return;
		}

		// Verifica del livello compreso tra 1 e 100
		if (name === "level") {
			// Campo vuoto per poter cancellare tutto il numero
			if (value === "") {
				setUser((prev) => ({ ...prev, [name]: "" }));
				return;
			}
			const num = parseInt(value, 10);

			if (isNaN(num) || num < 1 || num > 100) {
				return;
			}

			setUser((prev) => ({
				...prev,
				[name]: num.toString(),
			}));
			return;
		}

		setUser((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function handleAvatarSelect(avatarId: string) {
		setUser((prev) => ({
			...prev,
			avatar: avatarId,
		}));
	}

	function handleClassSelect(classId: string) {
		setUser((prev) => ({
			...prev,
			class: classId,
		}));
	}

	function handleRegistrati(event: any) {
		event.preventDefault();
		const userExists = users.find((u: any) => u.nickname === user.nickname);
		if (userExists) {
			setPopupVisible(true);
			setPopupMessage("This nickname already exists.");
			// Svuota nickname e password se l'utente esiste
			setUser((prev) => ({
				...prev,
				nickname: "",
				password: "",
				"confirm-password": "",
			}));
		} else if (user.nickname === "") {
			setPopupVisible(true);
			setPopupMessage("Please insert your nickname.");
		} else if (user.level === "") {
			setPopupVisible(true);
			setPopupMessage("Please insert your level.");
		} else if (user.server === "") {
			setPopupVisible(true);
			setPopupMessage("Please select a server.");
		} else if (user.password === "" || user["confirm-password"] === "") {
			setPopupVisible(true);
			setPopupMessage("Password can't be empty.");
		} else if (user.password != user["confirm-password"]) {
			setPopupVisible(true);
			setPopupMessage("Passwords do not match.");
		} else {
			// Toglie confirm-password dallo user nel localStorage
			const { "confirm-password": _, ...cleanUser } = user;
			const updatedUsers = [...users, cleanUser];
			setUsers(updatedUsers);
			// Qui ci sarà il reindirizzamento alla pagina di login in caso di registrazione avvenuta con successo
		}
	}

	useEffect(() => {
		localStorage.setItem("users", JSON.stringify(users));
	}, [users]);

	return (
		<div className="register-container flex flex-col items-center gap-4 overflow-x-hidden">
			<div className="bg-image-container relative w-full">
				<img
					src="/src/assets/bg-images/register-bg-image.png"
					alt="Background Image"
					className="absolute min-w-150 -z-1 opacity-40 object-cover mask-image-[linear-gradient(to_bottom,rgba(0,0,0,1)_40%,rgba(0,0,0,0)_100%)] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_40%,rgba(0,0,0,0)_100%)]"
				/>
			</div>
			<div className="logo-container mt-4">
				<img src="/src/assets/logo/guildgate.png" alt="GuildGate Logo" className="w-80" />
			</div>
			<h1 className="text-lg font-bold">Join the Adventure</h1>
			<form
				onSubmit={handleRegistrati}
				className="register-form flex flex-col gap-3 border rounded-md mx-5 py-4 px-4 opacity-80"
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
				<div className="form-wrapper flex gap-2">
					<Input
						label="Level"
						name="level"
						placeholder="1 - 100"
						className="flex-1"
						onChange={handleChange}
						value={user.level}
					></Input>
					<Select label="Server" name="server" className="flex-1" onChange={handleChange} value={user.server}></Select>
				</div>

				<AvatarSelector onSelect={handleAvatarSelect} value={user.avatar}></AvatarSelector>
				<ClassSelector onSelect={handleClassSelect} value={user.class}></ClassSelector>
				<Input
					label="Password"
					type="password"
					name="password"
					placeholder="Insert your password"
					showPasswordToggle
					onChange={handleChange}
					value={user.password}
				></Input>
				<Input
					label="Confirm Password"
					type="password"
					name="confirm-password"
					placeholder="Confirm your password"
					showPasswordToggle
					onChange={handleChange}
					value={user["confirm-password"]}
				></Input>
				<Button text="Register" type="submit" buttonStyle="primaryButton" className="mt-1"></Button>
			</form>
			<p className="text-sm">
				Already registered? <a className="sign-in-redirect font-bold">Sign In</a>
			</p>
			<FormErrorPopup
				isOpen={popupVisible}
				errorMessage={popupMessage}
				onClose={() => setPopupVisible(false)}
			></FormErrorPopup>
			<FooterCopyright></FooterCopyright>
		</div>
	);
}
