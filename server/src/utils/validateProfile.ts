import { ProfileInput } from "src/resolvers/inputs/ProfileInput";

export const validateProfileCreate = (options: ProfileInput) => {
    const {name, age, gender, phone} = options;
    if(phone.length !== 10) {
        return [{field: "phone", message: "Invalid phone number"}];
    }
    return null;
};