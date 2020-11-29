import { Field, InputType } from "type-graphql";

@InputType()
export class ProfileInput {
    @Field()
    name: string;

    @Field()
    age: number;

    @Field()
    gender: string;

    @Field()
    phone: string;
}