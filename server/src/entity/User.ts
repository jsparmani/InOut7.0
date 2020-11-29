import {Cart} from "./Cart";
import {Order} from "./Order";
import {Store} from "./Store";
import {Profile} from "./Profile";
import {Field, Int, ObjectType} from "type-graphql";
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity({name: "myusers"})
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({unique: true})
    email: string;

    @Field(() => Profile, {nullable: true})
    @OneToOne(() => Profile, {nullable: true})
    @JoinColumn()
    profile: Profile;

    @Field(() => [Store])
    @ManyToMany(() => Store, (store) => store.admins)
    stores: Store[];

    @Field(() => [Store])
    @ManyToMany(() => Store, (store) => store.subscribers)
    subscriptions: Store[];

    @Field(() => [Order])
    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

    @Field(() => Cart)
    @OneToOne(() => Cart, (cart) => cart.user)
    @JoinColumn()
    cart: Cart;

    @Column()
    password: string;

    @Column("int", {default: 0})
    tokenVersion: number;
}
