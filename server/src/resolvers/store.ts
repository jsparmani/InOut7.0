import { Store } from "src/entity/Store";
import { User } from "src/entity/User";
import { isAuth } from "src/middleware/isAuth";
import { FieldError } from "src/types/FieldError";
import { MyContext } from "src/types/MyContext";
import { validateCreateStore } from "src/utils/validateStore";
import { 
    Arg,
    Ctx,
    Field, 
    Mutation, 
    ObjectType, 
    Resolver, 
    UseMiddleware
} from "type-graphql";
import { getConnection } from "typeorm";
import { StoreInput } from "./inputs/StoreInput";

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
        @Arg("input", () => StoreInput) input: StoreInput,
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

        for(var adminId in input.admins) {
            // input.admins is array of user ids
            var admin = await User.findOne(adminId);
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
}