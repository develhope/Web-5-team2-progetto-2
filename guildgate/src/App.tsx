import { Button } from "./button";

export default function App() {
  return (
    <>
      <Button text="Login" onClick={() => console.log("Login clicked")} />
      <Button text="Invia" type="submit" />
      <Button text="Reset" type="reset" />
    </>
  );
}