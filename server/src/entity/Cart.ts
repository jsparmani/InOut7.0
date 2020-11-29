import {CartProduct} from "./CartProduct";
import {User} from "./User";
import {Field, Int, ObjectType} from "type-graphql";
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Cart extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => User)
    @OneToOne(() => User, (user) => user.cart)
    user: User;

    @Field()
    @Column()
    total: string;

    @Field(() => [CartProduct])
    @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart)
    cartProducts: CartProduct[];
}
