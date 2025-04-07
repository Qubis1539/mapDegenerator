import { useState } from "react";
import ThreeScene from "./components/threeComponents/threeScene";
import Range from "./components/Range";
import "./App.css";

function App() {
	const [lightPos, setLigthPos] = useState(0);
	return (
		<div className="App">
			<ThreeScene lightPos={lightPos} />
			<Range value={lightPos} onChange={setLigthPos} />
		</div>
	);
}

export default App;
