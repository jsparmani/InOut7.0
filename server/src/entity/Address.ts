import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {State} from "../types/states";
import { Profile } from "./Profile";

@ObjectType()
@Entity()
export class Address extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    houseNumber: string;

    @Field()
    @Column()
    street: string;

    @Field()
    @Column()
    landmark: string;

    @Field(() => Int)
    @Column()
    num: number;

    @Field()
    @Column()
    city: string;

    @Field(() => State)
    @Column({
        type: "enum",
        enum: State,
    })
    state: State;

    @Field(() => Profile)
    @ManyToOne(() => Profile, profile => profile.addresses)
    profile: Profile;
}