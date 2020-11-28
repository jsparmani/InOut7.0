import {validateRegister} from "./../utils/validateRegister";
import {compare, hash} from "bcryptjs";
import {User} from "../entity/User";
import {FieldError} from "../types/FieldError";
import {createAccessToken, createRefreshToken} from "../utils/auth";
import {Arg, Field, Mutation, ObjectType, Query, Resolver} from "type-graphql";
import {RegisterInput} from "./inputs/RegisterInput";
import {LoginInput} from "./inputs/LoginInput";

@ObjectType()
class AuthResponse {
    @Field(() => User, {nullable: true})
    user?: User;

    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];

    @Field({nullable: true})
    accessToken?: string;

    @Field({nullable: true})
    refreshToken?: string;
}

@Resolver()
export class UserResolver {
    @Query(() => String)
    hi(): string {
        return "hi";
    }

    @Mutation(() => AuthResponse)
    async register(
        @Arg("input", () => RegisterInput) input: RegisterInput
    ): Promise<AuthResponse> {
        const {email, password} = input;

        const errors = validateRegister(input);

        if (errors) {
            return {errors};
        }

        const hashedPassword = await hash(password, 12);

        let user;
        try {
            user = await User.create({
                email,
                password: hashedPassword,
            }).save();
        } catch (err) {
            if (err.code === "23505") {
                // Duplicate username or email
                return {
                    errors: [
                        {
                            field: "email",
                            message: "Email has already been taken!",
                        },
                    ],
                };
            }
        }

        const accessToken = createAccessToken(user as User);
        const refreshToken = createRefreshToken(user as User);

        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    @Mutation(() => AuthResponse)
    async login(
        @Arg("input", () => LoginInput) input: LoginInput
    ): Promise<AuthResponse> {
        const {email, password} = input;

        const user = await User.findOne(
            {email: email},
            {
                relations: ["profile"],
            }
        );

        if (!user) {
            return {
                errors: [
                    {
                        field: "email",
                        message: "User with this email doesn't exist",
                    },
                ],
            };
        }

        const valid = await compare(password, user.password);

        if (!valid) {
            return {
                errors: [{field: "password", message: "Incorrect Password!"}],
            };
        }

        return {
            user,
            accessToken: createAccessToken(user),
            refreshToken: createRefreshToken(user),
        };
    }
}
