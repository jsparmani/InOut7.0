import React from "react";
import { Redirect, Route } from "react-router-dom";

interface Props {
	component: React.FunctionComponent;
	isPrivate: Boolean;
	isLoginRoute: Boolean;
	isAuthenticated: Boolean;
}

const Wrapper = (
	{ isPrivate, isAuthenticated, isLoginRoute, component }: Props,
	...props: any
) => {
	if (isPrivate && !isAuthenticated) {
		return <Redirect to="/login" />;
	}

	if (isLoginRoute && isAuthenticated) {
		return <Redirect to="/" />;
	}

	return <Route {...props} component={component} />;
};

export default Wrapper;
