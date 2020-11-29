import { Profile } from "../entity/Profile";
import { FieldError } from "../types/FieldError";
import { MyContext } from "../types/MyContext";
import { validateProfileCreate } from "../utils/validateProfile";
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

        let profile;
        try {
            profile = await Profile.create({
                name: name,
                age: age,
                gender: gender,
                phone: phone
            }).save();
        } catch (err) {
            // invalid phone number
            console.log(err.code);
        }
        return {profile}
    }
}