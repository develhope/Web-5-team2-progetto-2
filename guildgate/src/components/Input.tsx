import type { InputHTMLAttributes } from "react";
import { Lock, User, Star, Calendar, Clock, Eye, EyeOff } from "lucide-react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	showPasswordToggle?: boolean;
	onTogglePassword?: () => void;
	onChange?: () => void;
};

export const Input = ({
	label,
	type = "text",
	name,
	placeholder = "",
	value = "",
	className,
	showPasswordToggle,
	onTogglePassword,
	onChange,
}: InputProps) => {
	// Cambia l'icona in base al name del campo input
	const getInputIcon = () => {
		const iconClass = "h-5 w-5";
		switch (name) {
			case "nickname":
				return <User className={iconClass} />;
			case "password":
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
					type={type}
					name={name}
					className="input-field w-full pl-10 pr-10 py-2 border rounded-md text-sm"
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
				{showPasswordToggle && (
					<button
						type="button"
						onClick={onTogglePassword}
						className="input-password-icon absolute right-3 flex items-center"
					>
						{type === "password" ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
					</button>
				)}
			</div>
		</div>
	);
};
