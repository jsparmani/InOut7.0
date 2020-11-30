import { Profile } from "../entity/Profile";
import { FieldError } from "../types/FieldError";
import { MyContext } from "../types/MyContext";
import { validateProfileCreate } from "../utils/validateProfile";
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver, UseMiddleware } from "type-graphql";
import { ProfileInput } from "./inputs/ProfileInput";
import { isAuth } from "../middleware/isAuth";
import { User } from "../entity/User";

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
        @Ctx() {payload}: MyContext
    ): Promise<ProfileResponse> {
        const {name, age, gender, phone} = input;

        const errors = validateProfileCreate(input)

        if(errors) {
            return {errors};
        }

        let profile;
        try {
            profile = Profile.create({
                name: name,
                age: age,
                gender: gender,
                phone: phone
            });
            await profile.save();

            if(!payload?.userId) {
                throw new Error('Invalid User');
            }

            let user = await User.findOne(parseInt(payload.userId));

            if (!user) {
                throw new Error('User does not exist!');
            }

            user.profile = profile;
            await user.save();

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