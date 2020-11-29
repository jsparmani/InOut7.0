import { Arg, Resolver } from "type-graphql";

@Resolver()
export class ProfileResolver {
    async createProfile(
        @Arg("input")
    )
}