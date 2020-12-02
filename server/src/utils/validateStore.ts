import { User } from "../entity/User";
import { StoreCreateOrUpdateInput } from "../resolvers/inputs/StoreInput";

export const validateCreateOrUpdateStore = (options: StoreCreateOrUpdateInput) => {
    const {name, description, admins} = options;
    if(name === "" || !name) {
        return [{field: "name", message: "Name of store must be there"}];
    }
    if(description === "" || !description) {
        return [{field: "description", message: "Description of store must be there"}];
    }
    return null;
}

export const isAdmin = async (userId: number, storeId: number): Promise<boolean> => {
    const user = await User.findOne(userId, {
        relations: ["stores"]
    })

    if(!user?.stores) {
        return false;
    }
    for(var i=0; i<user?.stores.length; i++) {
        if(user.stores[i].id === storeId) {
            return true;
        }
    }
    return false;
}