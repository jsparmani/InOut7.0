import { Profile } from "src/entity/Profile";
import { FieldError } from "src/types/FieldError";
import { MyContext } from "src/types/MyContext";
import { validateProfileCreate } from "src/utils/validateProfile";
import { Arg, Ctx, Field, ObjectType, Resolver } from "type-graphql";
import { ProfileInput } from "./inputs/ProfileInput";

@ObjectType()
class ProfileResponse {
    @Field(() => Profile, {nullable: true})
    profile?: Profile;

    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];
}

@Resolver()
export class ProfileResolver {
    async createProfile(
        @Arg("input", () => ProfileInput) input: ProfileInput,
        @Ctx() {res}: MyContext
    ): Promise<ProfileResponse> {
        const {name, age, gender, phone} = input;

        const errors = validateProfileCreate(input)

        if(errors) {
            return {errors};
        }

        
    }
}