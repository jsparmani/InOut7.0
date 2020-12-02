import { Store } from "../entity/Store";
import { User } from "../entity/User";
import { isAuth } from "../middleware/isAuth";
import { FieldError } from "../types/FieldError";
import { MyContext } from "../types/MyContext";
import { isAdmin, validateCreateOrUpdateStore } from "../utils/validateStore";
import { 
    Arg,
    Ctx,
    Field, 
    Mutation, 
    ObjectType, 
    Query, 
    Resolver, 
    UseMiddleware
} from "type-graphql";
import { getConnection } from "typeorm";
import { StoreCreateOrUpdateInput, StoreGetInput } from "./inputs/StoreInput";

@ObjectType()
class StoreResponse {
    @Field(() => Store, {nullable: true})
    store?: Store;

    @Field(() => [Store], {nullable: true})
    stores?: Store[]

    @Field(() => [FieldError], {nullable: true})
    errors?:  FieldError[];
}

@Resolver()
export class StoreResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => StoreResponse)
    async createStore(
        @Arg("input", () => StoreCreateOrUpdateInput) input: StoreCreateOrUpdateInput,
        @Ctx() {payload}: MyContext
    ): Promise<StoreResponse> {
        const errors = validateCreateOrUpdateStore(input);
        if(errors) {
            return {
                errors,
            }
        }

        let store = await Store.create({
            name: input.name,
            description: input.description,
            admins: []
        })

        if (!payload?.userId) {
            return {
                errors: [
                    {
                        field: "userId",
                        message: "Missing",
                    },
                ],
            };
        }

        const user = await User.findOne(parseInt(payload.userId), {
            relations: ["profile"],
        });
        if(!user) {
            return {
                errors: [
                    {
                        field: "user",
                        message: "Missing",
                    },
                ],
            };
        }

        store.admins.push(user);

        for(var i in input.admins) {
            // input.admins is array of user ids
            var admin = await User.findOne(input.admins[i]);
            if(!admin) {
                return {
                    errors: [
                        {
                            field: "admin",
                            message: `user (admin) does not exist`
                        }
                    ]
                }
            }
            store.admins.push(admin);
        }

        await getConnection().manager.save(store);
        return {store};
    }

    @UseMiddleware(isAuth)
    @Query(() => StoreResponse)
    async getStore(
        @Arg("input", () => StoreGetInput) input: StoreGetInput,
        @Ctx() {payload}: MyContext
    ): Promise<StoreResponse> {
        if (!payload?.userId) {
            return {
                errors: [
                    {
                        field: "userId",
                        message: "Missing",
                    },
                ],
            };
        }

        const user = await User.findOne(parseInt(payload.userId), {
            relations: ["stores"],
        });
        if(!user) {
            return {
                errors: [
                    {
                        field: "user",
                        message: "Missing",
                    },
                ],
            };
        }

        for(var i=0; i<user.stores.length; i++) {
            var store = user.stores[i];
            if(store.id === input.storeId) {
                return {store};
            }
        }
        return {
            errors: [
                {
                    field: "storeId",
                    message: "Store id not present"
                }
            ]
        }
    }

    @UseMiddleware(isAuth)
    @Query(() => StoreResponse)
    async listStores(
        @Ctx() {payload}: MyContext
    ): Promise<StoreResponse> {
        if (!payload?.userId) {
            return {
                errors: [
                    {
                        field: "userId",
                        message: "Missing",
                    },
                ],
            };
        }

        const user = await User.findOne(parseInt(payload.userId), {
            relations: ["stores"],
        });
        if(!user) {
            return {
                errors: [
                    {
                        field: "user",
                        message: "Missing",
                    },
                ],
            };
        }

        var stores = user.stores;

        return {stores};
    }

    @UseMiddleware(isAuth)
    @Mutation(() => StoreResponse)
    async updateStore(
        @Arg("input", () => StoreCreateOrUpdateInput) input: StoreCreateOrUpdateInput,
        @Ctx() {payload}: MyContext
    ): Promise<StoreResponse> {
        if (!payload?.userId) {
            return {
                errors: [
                    {
                        field: "userId",
                        message: "Missing",
                    },
                ],
            };
        }

        const user = await User.findOne(parseInt(payload.userId), {
            relations: ["profile"],
        });
        if(!user) {
            return {
                errors: [
                    {
                        field: "user",
                        message: "Missing",
                    },
                ],
            };
        }
        const errors = validateCreateOrUpdateStore(input)
        if(errors) {
            return {
                errors
            };
        }

        if(!input.storeId) {
            return {
                errors: [
                    {
                        field: "id",
                        message: "Provide id for updation"
                    }
                ]
            }
        }
        const store = await Store.findOne(input.storeId);
        if(!store) {
            return {
                errors: [
                    {
                        field: "id",
                        message: "no store with such id"
                    }
                ]
            }
        }

        if(!payload || !payload.userId){
            return {
                errors: [
                    {
                        field: "payload",
                        message: "provide user id in payload"
                    }
                ]
            };
        }
        const hasAdminRights = await isAdmin(parseInt(payload?.userId), input.storeId)
        if(!hasAdminRights) {
            return {
                errors: [
                    {
                        field: "admin",
                        message: "no admin rights to that store"
                    }
                ]
            }
        }

        store.name = input.name;
        store.description = input.description;
        store.description = input.description;
        await getConnection().manager.save(store);
        return {store};
    }
}