type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export const Button = ({ text, type = "button", onClick }: ButtonProps) => {
  return (
    <>
    <button type={type} onClick={onClick}>
      {text}
    </button>
    </>
  );
};