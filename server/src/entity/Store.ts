import {User} from "./User";
import {Product} from "./Product";
import {Field, Int, ObjectType} from "type-graphql";
import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Store extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    description: string;

    @Field(() => [Product])
    @OneToMany(() => Product, (product) => product.store)
    products: Product[];

    @Field(() => [User])
    @JoinTable()
    @ManyToMany(() => User, (user) => user.stores)
    admins: User[];

    @Field(() => [User])
    @JoinTable()
    @ManyToMany(() => User, (user) => user.subscriptions)
    subscribers: User[];
}
