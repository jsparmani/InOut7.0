import {Field, Int, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Gender} from "../types/genderTypes";
import { Address } from "./Address";

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({nullable: true})
    name: string;

    @Field(() => Int)
    @Column("int", {nullable: true})
    age: number;

    @Field(() => Gender)
    @Column({
        type: "enum",
        enum: Gender,
        nullable: true
    })
    gender: Gender;

    @Field()
    @Column({nullable: true})
    phone: string;

    @OneToMany(() => Address, address => address.profile)
    addresses: Address[];
}
