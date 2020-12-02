import {Cart} from "./Cart";
import {User} from "./User";
import {OrderStatus} from "./../types/orderStatusTypes";
import {Field, Int, ObjectType} from "type-graphql";
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import {Address} from "./Address";

@ObjectType()
@Entity()
export class Order extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @Field(() => OrderStatus)
    @Column({
        type: "enum",
        enum: OrderStatus,
    })
    status: OrderStatus;

    @Field(() => Address)
    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @Field(() => Cart)
    @OneToOne(() => Cart)
    @JoinColumn()
    cart: Cart;

    @Field()
    @Column()
    total: string;
}
