import { Component } from "../Abstract/Component";
import { TCar, TCriteria, TServices } from "../Abstract/Type";
import { CarCart } from "../Common/CarCart";

export class Catalog extends Component {
   criteria: TCriteria = {
      price: "up",
      year: "all"
   }
   constructor(parrent: HTMLElement, private services: TServices) {
      super(parrent, "div", ["catalog"]);
      const container = new Component(this.root, 'div', ["container"]);
      new Component(container.root, 'h3', ["catalog__title"], "all cars");
      const divButtons = new Component(container.root, 'div', ["catalog__buttons"]);
      const btnSort = new Component(divButtons.root, 'input', ['catalog__sort'], null, ['type', 'value', 'data-price'], ['button', '', 'up']);
      new Component(divButtons.root, 'input', ["catalog__button"], null, ['type', 'value', 'data-year'], ['button', '2023', '2023'])
      new Component(divButtons.root, 'input', ["catalog__button"], null, ['type', 'value', 'data-year'], ['button', '2022', '2022'])
      new Component(divButtons.root, 'input', ["catalog__button"], null, ['type', 'value', 'data-year'], ['button', '2021', '2021'])
      new Component(divButtons.root, 'input', ["catalog__button"], null, ['type', 'value', 'data-year'], ['button', '2020', '2020'])
      new Component(divButtons.root, 'input', ["catalog__button"], null, ['type', 'value', 'data-year'], ['button', '2019', '2019'])
      new Component(divButtons.root, 'input', ["catalog__button"], null, ['type', 'value', 'data-year'], ['button', '2017', '2017'])
      Array.from(divButtons.root.children).forEach((el) => {
         if ((el as HTMLElement).dataset.year === this.criteria.year) {
            (el as HTMLElement).classList.add("active")
         } else {
            (el as HTMLElement).classList.remove("active")
         }
      })
      divButtons.root.onclick = (event) => {
         const param = (event.target as HTMLInputElement).dataset;
         if (!param.year) return;
         if (param.year) {
            this.criteria.year = param.year;
            Array.from(divButtons.root.children).forEach((el) => {
               if ((el as HTMLElement).dataset.year === this.criteria.year) {
                  (el as HTMLElement).classList.add("active")
               } else {
                  (el as HTMLElement).classList.remove("active")
               }
            })
         }

         services.dbService.getAllCars(this.criteria).then((cars) => {
            CartInner.root.innerHTML = '';
            this.putCarsOnPage(CartInner, cars);
         });
      }
      btnSort.root.onclick = (event) => {
         const param = (event.target as HTMLElement).dataset;
         if (!param.price) return;
         if (param.price) this.criteria.price = param.price;


         services.dbService.getAllCars(this.criteria).then((cars) => {
            CartInner.root.innerHTML = '';
            this.putCarsOnPage(CartInner, cars);
         });

         if (param.price === 'up') {
            param.price = 'down';
         } else {
            param.price = 'up';
         }
      }

      const CartCar = new Component(container.root, 'div', ["cart__cars"]);
      const CartInner = new Component(CartCar.root, 'div', ["cart__cars-inner"]);

      services.dbService.getAllCars(this.criteria).then((cars) => {
         this.putCarsOnPage(CartInner, cars);
      });

   }

   putCarsOnPage(teg: Component, cars: TCar[]) {
      cars.forEach((product) => {
         new CarCart(teg.root, this.services, product)
      })
   }

}