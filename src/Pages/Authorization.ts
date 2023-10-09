import { Component } from "../Abstract/Component";

export class Authorization extends Component {
   constructor(parrent: HTMLElement) {
      super(parrent, "div", ["authorization"]);
      const container = new Component(this.root, 'div', ["container"]);
      new Component(container.root, 'h1', null, "Authorization")
   }
}