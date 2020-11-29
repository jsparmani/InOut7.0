import {Field, Int, ObjectType} from "type-graphql";
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import {Gender} from "../types/genderTypes";
import {Address} from "./Address";

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field(() => Int)
    @Column("int")
    age: number;

    @Field(() => Gender)
    @Column({
        type: "enum",
        enum: Gender,
    })
    gender: Gender;

    @Field()
    @Column()
    phone: string;

    @Field(() => [Address])
    @OneToMany(() => Address, (address) => address.profile)
    addresses: Address[];
}
