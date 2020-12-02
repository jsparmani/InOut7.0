import { Field, InputType } from "type-graphql";

@InputType()
export class StoreCreateInput {
    @Field()
    name: string;

    @Field()
    description: string;

    @Field(() => [Number], {nullable: true})
    admins: number[];
    // input.admins is array of user ids
}

@InputType()
export class StoreGetInput {
    @Field()
    storeId: number
}