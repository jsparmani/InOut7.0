import { Field, InputType } from "type-graphql";

@InputType()
export class StoreInput {
    @Field({nullable: true})
    id: number

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    // input.admins is array of user ids
    admins: number[];
}