import React from "react";
import { Switch } from "react-router-dom";
import Wrapper from "./Route";

const Routes = () => {
	return (
		<div style={{ overflowX: "hidden" }}>
			<Switch>
				<Wrapper exact path="/" component={Home} />
			</Switch>
		</div>
	);
};

export default Routes;

const Home = () => {
	return <h1>Home</h1>;
};
