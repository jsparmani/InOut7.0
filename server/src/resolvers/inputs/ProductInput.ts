import { Field, InputType } from "type-graphql";

@InputType()
export class ProductInput {
    @Field()
    name: string;

    @Field()
    code: string;

    @Field()
    availableQty: number;

    @Field()
    storeId: number;
}