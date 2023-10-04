import { Component } from "../Abstract/Component";

export class MainPage extends Component {
   constructor(parrent: HTMLElement) {
      super(parrent, "div", ["mainpage"]);
      const mainpage = new Component(this.root, 'div', ["mainpage"]);
      const container = new Component(mainpage.root, 'div', ["container"]);
      const fon = new Component (container.root, 'img', ["fon"], null, ["src", "alt"], ["./assets/lambo.png", "fon"]);
      const info = new Component(container.root, 'div', ["information"]);
      new Component(info.root, 'h1', ["h1", 'info__fon'], 'PARKING');
      new Component(info.root, 'h3', ['info__fon'], 'car showroom');
      new Component(info.root, 'p', ["info__text"], "PARKING brings sincerity and originality to all customers by providing them with the most exotic and luxury cars available on the market.")
      new Component(info.root, 'input', ["main__page-btn"], null, ["type", "value"], ["button", "View all cars"])
   }
}