import { Gender } from "../../types/genderTypes";
import { Field, InputType } from "type-graphql";

@InputType()
export class ProfileInput {
    @Field()
    name: string;

    @Field()
    age: number;

    @Field()
    gender: Gender;

    @Field()
    phone: string;
}