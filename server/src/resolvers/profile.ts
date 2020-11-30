import { Profile } from "../entity/Profile";
import { FieldError } from "../types/FieldError";
import { MyContext } from "../types/MyContext";
import { validateProfileCreate, validateProfileCreateOrUpdate } from "../utils/validateProfile";
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver, UseMiddleware } from "type-graphql";
import { ProfileInput } from "./inputs/ProfileInput";
import { isAuth } from "../middleware/isAuth";
import { User } from "../entity/User";
import { getConnection } from "typeorm";

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
    async createorUpdateProfile(
        @Arg("input", () => ProfileInput) input: ProfileInput,
        @Ctx() {payload}: MyContext
    ): Promise<ProfileResponse> {
        if (!payload?.userId) {
            return {
                errors: [
                    {
                        field: 'userId',
                        message: 'Missing',
                    },
                ],
            };
        }

        const user = await User.findOne(parseInt(payload.userId), {
            relations: ['profile'],
        });

        const {name, age, gender, phone} = input;

        if (!user) {
            return {
                errors: [
                    {
                        field: 'userId',
                        message: 'Does not exist!',
                    },
                ],
            };
        }

        const errors = validateProfileCreateOrUpdate(input);
        if (errors) {
            return {
                errors,
            };
        }

        if(user.profile) {
            let profile = user.profile;
            profile.name = name;
            profile.age = age;
            profile.gender = gender;
            profile.phone = phone;
            return {
                profile: await profile.save(),
            };
        }

        const profile = await Profile.create({...input}).save();
        user.profile = profile;
        await getConnection().manager.save(user);
        return {profile};
    }
}