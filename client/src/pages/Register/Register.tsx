import React, { useState } from "react";
import { useRegisterMutation } from "../../generated/graphql";
interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [register] = useRegisterMutation();
	return (
		<div>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					const response = await register({ variables: { email, password } });
					console.log(response);
				}}
			>
				<div>
					<input
						// type="email"
						value={email}
						placeholder="email"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					></input>
					<input
						value={password}
						placeholder="password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					></input>

					<button type="submit">Register</button>
				</div>
			</form>
		</div>
	);
};
