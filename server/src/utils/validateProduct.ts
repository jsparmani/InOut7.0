import { Store } from "src/entity/Store";
import { User } from "src/entity/User";
import { ProductInput } from "../resolvers/inputs/ProductInput";

export const validateProductCreateOrUpdate = (options: ProductInput) => {
    const {name, code, availableQty, storeId} = options;
    if(name === "" || !name) {
        return[
                {
                    field: "name",
                    message: "provide name",
                },
            ];
    }
    if(code === "" || !code) {
        return[
                {
                    field: "code",
                    message: "provide code",
                },
            ];
    }
    if(availableQty) {
        return[
                {
                    field: "availableQty",
                    message: "provide availableQty",
                },
            ];
    }
    if(storeId) {
        return[
                {
                    field: "storeId",
                    message: "provide storeId",
                },
            ];
    }
    return null;
}

export const checkIfAdmin = async (storeId: number, userId: number): Promise<boolean> => {
    const store = await Store.findOne(storeId, {
        relations: ["admins"]
    });
    const user = await User.findOne(userId);
    if(!store || !store.admins) {
        return false;
    }
    for(var i=0; i<store?.admins.length; i++) {
        if(user === store.admins[i]) {
            return true;
        }
    }
    return false;
}