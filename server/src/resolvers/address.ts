import { Address } from "../entity/Address";
import { FieldError } from "../types/FieldError";
import {
    Arg,
    Ctx,
    Field,
    Mutation,
    ObjectType,
    Resolver,
    UseMiddleware
} from "type-graphql";
import { isAuth } from "..//middleware/isAuth";
import { AddressInput } from "./inputs/AddressInput";
import { MyContext } from "src/types/MyContext";
import { User } from "src/entity/User";
import { validateAddressCreate } from "src/utils/validateAddress";
import { getConnection } from "typeorm";

@ObjectType()
class AddressResponse {
    @Field(() => Address, {nullable: true})
    address?: Address;

    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];
}

@Resolver()
export class AddressResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => AddressResponse)
    async createAddress(
        @Arg("input", () => Address) input: AddressInput,
        @Ctx() {payload}: MyContext
    ): Promise<AddressResponse> {
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
        if(!user.profile) {
            return {
                errors: [
                    {
                        field: "profile",
                        message: "Missing",
                    },
                ],
            };
        }

        const errors = validateAddressCreate(input);
        if (errors) {
            return {
                errors,
            };
        }

        const addressInstance = await Address.create({...input}).save();
        const userProfile = user.profile;
        userProfile.addresses.push(addressInstance);
        await getConnection().manager.save(userProfile);
        return {address: addressInstance}
    }
}