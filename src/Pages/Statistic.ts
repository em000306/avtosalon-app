import { Component } from "../Abstract/Component";
import { TServices } from "../Abstract/Type";

export class Statistic extends Component {
   outButton: Component;
   constructor(parrent: HTMLElement,private services:TServices) {
      super(parrent, "div", ["statistic"]);
      const container = new Component(this.root, 'div', ["container"]);
      new Component(container.root, 'h1', null, "Statistic")
      this.outButton = new Component(container.root, 'input', ["auth__btn"], null, ["type", "value"], ["button", " Log out"]);
    this.outButton.root.onclick = () => {
      this.services.authService.outFromGoogle();
    }
   }
}