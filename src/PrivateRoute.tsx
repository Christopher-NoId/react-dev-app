import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }: any) => (
	<Route
		{...rest}
		render={props => {
			return <Redirect to={{ pathname: "/langages" }} />;
		}}
	/>
);

export default PrivateRoute;
