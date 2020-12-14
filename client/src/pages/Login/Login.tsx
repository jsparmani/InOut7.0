import React, { useState } from "react";
import { useLoginMutation } from "src/generated/graphql";

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [login] = useLoginMutation();
	return (
		<div>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					const response = await login({ variables: { email, password } });
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

					<button type="submit">Login</button>
				</div>
			</form>
		</div>
	);
};
