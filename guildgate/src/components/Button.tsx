type ButtonProps = {
	text: string;
	type?: "button" | "submit" | "reset";
	buttonStyle: "primaryButton" | "secondaryButton";
	onClick?: () => void;
};

export const Button = ({ text, type = "button", buttonStyle, onClick }: ButtonProps) => {
	return (
		<button type={type} className={`w-full border rounded-md font-bold px-4 py-2 ` + buttonStyle} onClick={onClick}>
			{text}
		</button>
	);
};
