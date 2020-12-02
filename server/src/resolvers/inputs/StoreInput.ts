import { Field, InputType } from "type-graphql";

@InputType()
export class StoreCreateInput {
    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    // input.admins is array of user ids
    admins: number[];
}

@InputType()
export class StoreGetInput {
    @Field()
    storeId: number
}