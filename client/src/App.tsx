import React from "react";
import Routes from "./routes";
import { HashRouter as Router } from "react-router-dom";

function App() {
	return (
		<div>
			<Router>
				<Routes />
			</Router>
		</div>
	);
}

export default App;
