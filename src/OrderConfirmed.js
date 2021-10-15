import React from "react";

export default function OrderConfirmed (props){
    
    const { orders } = props

    return (
        <div>
            <h1>OrderConfirmed</h1>
            <h4>Order #: {orders[0].id}</h4>
            <h4>Name: {orders[0].name}</h4>
            <h4>Size: {orders[0].size}</h4>
            {orders[0].topping1 === true && <h4>Veggies: Yes!</h4>}
            {orders[0].topping2 === true && <h4>Meat: Yes!</h4>}
            {orders[0].topping3 === true && <h4>Extra Cheese: Yes!</h4>}
            {orders[0].topping4 === true && <h4>Mystery: I like to gamble!</h4>}
            <h4>Notes: {orders[0].special}</h4>
            <h4></h4>
        </div>
    )
}
