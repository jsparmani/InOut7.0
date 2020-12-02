import { AddressInput } from "../resolvers/inputs/AddressInput";

export const validateAddressCreate = (options: AddressInput) => {
    const {houseNumber, street, landmark, num, city, state} = options;
    if(!houseNumber || houseNumber === "") {
        return [{field: "houseNumber", message: "Specify house number"}];
    }
    if(!street || street === "") {
        return [{field: "street", message: "Specify street"}];
    }
    if(!landmark || landmark === "") {
        return [{field: "landmark", message: "Specify landmark"}];
    }
    if(!num) {
        return [{field: "num", message: "Specify num"}];
    }
    if(!city || city === "") {
        return [{field: "city", message: "Specify city"}];
    }
    if(!state) {
        return [{field: "state", message: "Specify state"}];
    }
    return null;
}