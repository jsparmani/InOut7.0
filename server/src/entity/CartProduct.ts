import {Cart} from "./Cart";
import {Product} from "./Product";
import {Min} from "class-validator";
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

@ObjectType()
@Entity()
export class CartProduct extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Product)
    @JoinColumn()
    product: Product;

    @Field(() => Int)
    @Column("int")
    @Min(0)
    quantity: number;

    @Field(() => Cart)
    @ManyToOne(() => Cart, (cart) => cart.cartProducts)
    cart: Cart;
}
