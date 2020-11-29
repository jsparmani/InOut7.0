import { Profile } from "../entity/Profile";
import { FieldError } from "../types/FieldError";
import { MyContext } from "../types/MyContext";
import { validateProfileCreate } from "../utils/validateProfile";
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver, UseMiddleware } from "type-graphql";
import { ProfileInput } from "./inputs/ProfileInput";
import { isAuth } from "../middleware/isAuth";

@ObjectType()
class ProfileResponse {
    @Field(() => Profile, {nullable: true})
    profile?: Profile;

    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];
}

@Resolver()
export class ProfileResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => ProfileResponse)
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
            if (err.code === '22P02') {
                return {
                    errors: [
                        {
                            field: "gender",
                            message: "Please use 'male', 'female' or 'others' for gender field",
                        },
                    ],
                };
            }
        }
        return {profile}
    }
}