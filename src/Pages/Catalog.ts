import { Component } from "../Abstract/Component";
import { TServices } from "../Abstract/Type";

export class Catalog extends Component {
   constructor(parrent: HTMLElement,private services:TServices) {
      super(parrent, "div", ["catalog"]);
      const container = new Component(this.root, 'div', ["container"]);
      new Component(container.root, 'h1', null, "Catalog")
   }
}