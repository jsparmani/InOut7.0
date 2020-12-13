import React from "react";
// import { gql, useQuery } from "@apollo/client";
import { useHelloQuery } from "../../generated/graphql";

interface Props {}

const Home: React.FC<Props> = (props) => {
	// const { data, loading } = useQuery(gql`
	// 	{
	// 		hi
	// 	}
	// `);

	const { data, loading } = useHelloQuery();

	if (loading || !data) {
		return <div>Loading</div>;
	}
	return <div>{data?.hi}</div>;
};

export default Home;
