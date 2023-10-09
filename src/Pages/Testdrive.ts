import { Component } from "../Abstract/Component";

export class Testdrive extends Component {
   constructor(parrent: HTMLElement) {
      super(parrent, "div", ["testdrive"]);
      const container = new Component(this.root, 'div', ["container"]);
      new Component(container.root, 'h1', null, "Testdrive")
   }
}