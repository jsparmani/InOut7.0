import {ProfileInput} from "src/resolvers/inputs/ProfileInput";

export const validateProfileCreateOrUpdate = (options: ProfileInput) => {
    const {name, age, phone} = options;
    if (name === "" || name === null || name === undefined) {
        return [{field: "name", message: "Specify name"}];
    }
    if (age === null || age === undefined) {
        return [{field: "age", message: "Specify age"}];
    }
    if (phone.length !== 10) {
        return [{field: "phone", message: "Invalid phone number"}];
    }
    return null;
};
