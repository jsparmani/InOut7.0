import {registerEnumType} from "type-graphql";
export enum State {
    AP = "andhrapradesh",
    AR = "arunachalpradesh",
    AS = "assam",
    BR = "bihar",
    CG = "chhattisgarh",
    GA = "goa",
}

registerEnumType(State, {
    name: "State",
});