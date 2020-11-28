import {RegisterInput} from "../resolvers/inputs/RegisterInput";

export const validateRegister = (options: RegisterInput) => {
    const {email, password} = options;
    if (!email.includes("@")) {
        return [{field: "email", message: "Invalid Email"}];
    }

    if (password.length <= 6) {
        return [
            {
                field: "password",
                message: "Length must be greater than 6",
            },
        ];
    }

    return null;
};
