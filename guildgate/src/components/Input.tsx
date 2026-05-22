import type { InputHTMLAttributes, ChangeEvent } from "react";
import { useState } from "react";
import { Lock, User, Star, Calendar, Clock, Eye, EyeOff } from "lucide-react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	showCounter?: boolean;
	showPasswordToggle?: boolean;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
	label,
	type = "text",
	name,
	placeholder = "",
	value = "",
	className,
	showCounter,
	showPasswordToggle,
	onChange,
	...props
}: InputProps) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const handleToggle = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	// Cambia l'icona in base al name del campo input
	const getInputIcon = () => {
		const iconClass = "h-5 w-5";
		switch (name) {
			case "nickname":
				return <User className={iconClass} />;
			case "password":
			case "confirm-password":
				return <Lock className={iconClass} />;
			case "level":
				return <Star className={iconClass} />;
			case "date":
				return <Calendar className={iconClass} />;
			case "time":
				return <Clock className={iconClass} />;
		}
	};

	return (
		<div className={`input-container ${className}`}>
			<label className="input-label block mb-2 text-lg">{label}</label>
			<div className="relative flex items-center">
				<div className="input-icon-container absolute left-3 flex items-center">{getInputIcon()}</div>
				<input
					type={type === "password" ? (isPasswordVisible ? "text" : "password") : type}
					name={name}
					className="input-field w-full pl-10 pr-10 py-2 border rounded-md text-xs"
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
				{showCounter && props.maxLength && (
					<span className="absolute right-3 flex items-center text-xs opacity-75">
						{String(value || "").length}/{props.maxLength}
					</span>
				)}
				{showPasswordToggle && (
					<button
						type="button"
						onClick={handleToggle}
						className="input-password-icon absolute right-3 flex items-center"
					>
						{isPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
					</button>
				)}
			</div>
		</div>
	);
};
