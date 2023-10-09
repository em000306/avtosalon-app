import { Component } from "../Abstract/Component";

export class Statistic extends Component {
   constructor(parrent: HTMLElement) {
      super(parrent, "div", ["statistic"]);
      const container = new Component(this.root, 'div', ["container"]);
      new Component(container.root, 'h1', null, "Statistic")
   }
}