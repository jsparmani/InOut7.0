import {registerEnumType} from "type-graphql";
export enum OrderStatus {
    RECEIVED = "received",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
}

registerEnumType(OrderStatus, {
    name: "OrderStatus",
});
