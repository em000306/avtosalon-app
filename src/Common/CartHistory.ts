import { Component } from "../Abstract/Component";
import { TDataHistory, TServices } from "../Abstract/Type";

export class CartHistory extends Component {
  constructor(parrent: HTMLElement, private services: TServices, private data: TDataHistory) {
    super(parrent, 'div', ["carthistory"]);
    new Component(this.root, 'span', [], `${services.dbService.dataUser?.name}`)
    data.basket.forEach(carBasket => {
      new Component(this.root, 'span', [], carBasket.car.name);
      new Component(this.root, 'span', [], carBasket.date);
    })
  }
}