import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AvatarSelector } from "../components/AvatarSelector";
import { Button } from "../components/Button";
import { ClassSelector } from "../components/ClassSelector";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { UserContext } from "../context/UserContext";

export function Register() {
	const DEFAULT_AVATAR = "avatar-1";
	const DEFAULT_CLASS = "warrior";

	const { registerUser } = useContext(UserContext);

	const navigate = useNavigate();

	const [user, setUser] = useState({
		nickname: "",
		level: "",
		server: "",
		avatar: DEFAULT_AVATAR,
		class: DEFAULT_CLASS,
		password: "",
		confirmPassword: "",
	});

	function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
		const { name, value } = event.target;

		// Verifica dei 16 caratteri massimi per il nickname
		if (name === "nickname" && value.length > 16) {
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

	function handleRegister(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		registerUser(user);
	}

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
				onSubmit={handleRegister}
				className="register-form flex flex-col gap-3 border rounded-md mx-5 py-4 px-4 opacity-80"
			>
				<Input
					label="Nickname"
					name="nickname"
					placeholder="Insert your nickname"
					onChange={handleChange}
					value={user.nickname}
					maxLength={16}
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
					name="confirmPassword"
					placeholder="Confirm your password"
					showPasswordToggle
					onChange={handleChange}
					value={user.confirmPassword}
				></Input>
				<Button text="Register" type="submit" buttonStyle="primaryButton" className="mt-1"></Button>
			</form>
			<p className="text-sm">
				Already registered?{" "}
				<button className="sign-in-redirect font-bold" onClick={() => navigate("/login")}>
					Sign In
				</button>
			</p>
			<div className="flex flex-col items-center gap-20 mt-10 mb-2">
				<img src="/src/assets/logo/login-footer-icon.png" alt="Footer logo" />
			</div>
		</div>
	);
}
