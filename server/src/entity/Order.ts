import {Product} from "./Product";
import {User} from "./User";
import {OrderStatus} from "./../types/orderStatusTypes";
import {Field, Int, ObjectType} from "type-graphql";
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
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

    @Field(() => [Product])
    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[];

    @Field(() => Address)
    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @Field()
    @Column()
    total: string;
}
