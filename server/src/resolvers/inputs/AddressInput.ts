import { State } from "src/types/stateTypes";
import { Field, InputType } from "type-graphql";

@InputType()
export class AddressInput {
    @Field()
    houseNumber: String;

    @Field()
    street: String;

    @Field()
    landmark: string;

    @Field()
    num: number;

    @Field()
    city: string;

    @Field()
    state: State;
}