import { Component } from "../Abstract/Component";

export class Card extends Component {
   constructor(parrent: HTMLElement) {
      super(parrent, "div", ["card"]);
      const container = new Component(this.root, 'div', ["container"]);
      new Component(container.root, 'h1', null, "Card")
   }
}