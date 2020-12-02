import { StoreCreateInput } from "../resolvers/inputs/StoreInput";

export const validateCreateStore = (options: StoreCreateInput) => {
    const {name, description, admins} = options;
    if(name === "" || !name) {
        return [{field: "name", message: "Name of store must be there"}];
    }
    if(description === "" || !description) {
        return [{field: "description", message: "Description of store must be there"}];
    }
    return null;
}