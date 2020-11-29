import {Store} from "./Store";
import {Min} from "class-validator";
import {Field, Int, ObjectType} from "type-graphql";
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    code: string;

    @Field(() => Int)
    @Column({default: 0})
    @Min(0)
    availableQty: number;

    @Field(() => Store)
    @ManyToOne(() => Store, (store) => store.products)
    store: Store;
}
