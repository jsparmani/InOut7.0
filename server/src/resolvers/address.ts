import { Address } from "../entity/Address";
import { FieldError } from "../types/FieldError";
import {
    Arg,
    Field,
    Mutation,
    ObjectType,
    Resolver,
    UseMiddleware
} from "type-graphql";
import { isAuth } from "..//middleware/isAuth";

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
        // @Arg("input", () => Address) input: 
    )
}