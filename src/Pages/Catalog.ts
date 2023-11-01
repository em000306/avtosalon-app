import { Component } from "../Abstract/Component";
import { TCar, TServices } from "../Abstract/Type";
import { CarCart } from "../Common/CarCart";

export class Catalog extends Component {
   constructor(parrent: HTMLElement,private services:TServices) {
      super(parrent, "div", ["catalog"]);
      const container = new Component(this.root, 'div', ["container"]);
      new Component(container.root, 'h3', ["catalog__title"], "all cars");




      const CartCar=new Component(container.root,'div',["cart__cars"]);
      const CartInner=new Component(CartCar.root,'div',["cart__cars-inner"]);

      services.dbService.getAllCars().then((cars)=>{
         console.log(cars);
         this.putCarsOnPage(CartInner,cars);
      });

   }

   putCarsOnPage(teg: Component, cars: TCar[]){
      cars.forEach((product)=>{
         new CarCart(teg.root, this.services,product)
      })
   }

}