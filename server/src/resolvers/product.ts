import { Product } from "../entity/Product";
import { Store } from "../entity/Store";
import { isAuth } from "../middleware/isAuth";
import { FieldError } from "../types/FieldError";
import { MyContext } from "../types/MyContext";
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { ProductInput } from "./inputs/ProductInput";
import { User } from "src/entity/User";
import { checkIfAdmin, validateProductCreate } from "src/utils/validateProduct";

@ObjectType()
class ProductResponse {
    @Field(() => Product, {nullable: true})
    product?: Product;

    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];
}

@Resolver()
export class ProductResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => ProductResponse)
    async createProduct (
        @Arg("input", () => ProductInput) input: ProductInput,
        @Ctx() {payload}: MyContext
    ): Promise<ProductResponse> {
        let store = await Store.findOne(input.storeId, {
            relations: ["admins"]
        })
        if(!store) {
            return {
                errors: [
                    {
                        field: "store",
                        message: "The store with this id doesn't exist",
                    },
                ],
            };
        }
        if(!payload) {
            return {
                errors: [
                    {
                        field: "payload",
                        message: "Missing",
                    },
                ],
            };
        }

        const errors = validateProductCreate(input);
        if(errors) {
            return {
                errors,
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

        let isAdmin = await checkIfAdmin(input.storeId, parseInt(payload.userId));
        if(!isAdmin) {
            return {
                errors:[
                    {
                        field: "admins",
                        message: "The user is not admin of the store"
                    }
                ]
            };
        }

        const product = await Product.create({
            name: input.name,
            code: input.code,
            availableQty: input.availableQty
        });
        product.store = store;
        await getConnection().manager.save(product);
        return {product};
    }
}