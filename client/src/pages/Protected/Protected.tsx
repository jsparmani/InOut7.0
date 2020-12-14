import React from "react";
import { useGetUserDetailsQuery } from "src/generated/graphql";

interface ProtectedProps {}

export const Protected: React.FC<ProtectedProps> = ({}) => {
	const { data, error, loading } = useGetUserDetailsQuery();
	if (loading) {
		return <div>Loading</div>;
	}
	if (error) {
		console.log(error);
		return <div>error</div>;
	}

	if (!data) {
		return <div>No Data</div>;
	}
	return <div>{data}</div>;
};
