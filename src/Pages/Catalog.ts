import { Component } from "../Abstract/Component";

export class Catalog extends Component {
   constructor(parrent: HTMLElement) {
      super(parrent, "div", ["catalog"]);
      const container = new Component(this.root, 'div', ["container"]);
      new Component(container.root, 'h1', null, "Catalog")
   }
}