import React from "react";
import { Switch } from "react-router-dom";
import { Login, Register, Protected } from "../pages";
import { Home } from "../components";

import Wrapper from "./Route";

const Routes = () => {
	return (
		<div style={{ overflowX: "hidden" }}>
			<Switch>
				<Wrapper exact path="/" component={Home} />
				<Wrapper exact path="/protected" component={Protected} />

				<Wrapper exact path="/login" isLoginRoute component={Login} />
				<Wrapper exact path="/register" isLoginRoute component={Register} />
			</Switch>
		</div>
	);
};

export default Routes;
