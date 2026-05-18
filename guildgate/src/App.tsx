import "./App.css";
import { Select } from "./components/Select";

function App() {
	return (
		<>
			<Select label="Objective" name="objective"></Select>
			<Select label="Server" name="server"></Select>
		</>
	);
}

export default App;
