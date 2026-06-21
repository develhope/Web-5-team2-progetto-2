type ButtonProps = {
	text: string;
	type?: "button" | "submit" | "reset";
	buttonStyle: "primaryButton" | "secondaryButton";
	className?: string;
	onClick?: () => void;
};

export const Button = ({ text, type = "button", buttonStyle, className, onClick }: ButtonProps) => {
	return (
		<button
			type={type}
			className={`w-full border rounded-md font-bold px-3 py-2 ${buttonStyle} ${className}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};
