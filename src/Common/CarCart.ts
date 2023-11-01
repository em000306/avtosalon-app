import { Component } from "../Abstract/Component";
import { TCar, TServices } from "../Abstract/Type";

export class CarCart extends Component {
   constructor(parrent: HTMLElement,private services:TServices, data: TCar) {
      super(parrent, "div", ["cart"]);
      const Cart = new Component(this.root,'div',["cart__cars"]);

      new Component(Cart.root,'img',["cart-img"],null,["src","alt"],[data.url,data.name])

      new Component(Cart.root,'p',["cart-name"],data.name)
      new Component(Cart.root,'p',["cart-price"],data.price.toString()+ "   $ / day")

      const perehod = new Component (Cart.root, "a", null, null, ["href"], ["#"])
      new Component(perehod.root, 'input', ["cart-btn"], null, ["type", "value"], ["button", "Learn more"]);


   }
}