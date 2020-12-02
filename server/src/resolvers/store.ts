import { Store } from "../entity/Store";
import { User } from "../entity/User";
import { isAuth } from "../middleware/isAuth";
import { FieldError } from "../types/FieldError";
import { MyContext } from "../types/MyContext";
import { validateCreateStore } from "../utils/validateStore";
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
import { StoreCreateInput, StoreGetInput } from "./inputs/StoreInput";

@ObjectType()
class StoreResponse {
    @Field(() => Store, {nullable: true})
    store?: Store;

    @Field(() => [FieldError], {nullable: true})
    errors?:  FieldError[];
}

@Resolver()
export class StoreResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => StoreResponse)
    async createStore(
        @Arg("input", () => StoreCreateInput) input: StoreCreateInput,
        @Ctx() {payload}: MyContext
    ): Promise<StoreResponse> {
        const errors = validateCreateStore(input);
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
                            message: `user (admin) with id ${adminId} does not exist`
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
}