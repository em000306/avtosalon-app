import { Component } from "../Abstract/Component";

export class Header extends Component {
   constructor(parrent: HTMLElement) {
      super(parrent, "div", ["header"]);
      const header = new Component(this.root, 'header', ["header"]);
    const container = new Component(header.root, 'div', ["container"]);
    const header__inner = new Component(container.root, 'div', ["header__inner"]);
    const logo = new Component(header__inner.root, 'a', ["header__logo"], null, ["href"], ["#"]);
    new Component(logo.root, 'img', ["logo"], null, ["src", "alt"], ["./assets/icon.png", "person"]);
    new Component(header__inner.root, 'h1', ["h1", "h1_header"], 'PARKING');
    const login = new Component(header__inner.root, 'a', ["login"], null, ["href"], ["#account"]);
    new Component (login.root, 'h3', ["h3"], "Log in");
    new Component(login.root, 'img', ["login-img"], null, ["src", "alt"], ["./assets/account.png", "person"]);
   }
}
