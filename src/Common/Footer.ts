import { Component } from "../Abstract/Component";

export class Footer extends Component {
   constructor(parrent: HTMLElement) {
      super(parrent, "div", ["header"]);
      const footer = new Component (this.root, 'footer', ["footer"]);
      const container = new Component (footer.root, 'div', ["container"]);
      const footer__inner = new Component(container.root, 'div', ["footer__inner"]);
   
      const contacts = new Component(footer__inner.root, 'div', ["contacts__footer"]);
      new Component(contacts.root, 'p', ['contacts__inner'], '21 Minsk Avenue');
      new Component(contacts.root, 'p', ['contacts__inner', "adres"], 'Brooklyn, NY');
      new Component(contacts.root, 'p', ['contacts__inner'], "+375 29 232 32 32");
      new Component(contacts.root, 'p', ['contacts__inner'], "parking@gmail.com");
   
      const info = new Component(footer__inner.root, 'div',["info"]);
      new Component(info.root, 'h1', ["h1"], 'PARKING');
      new Component(info.root, 'h3', ['contacts__inner', "info__h3"], 'car showroom');
      const icon = new Component (info.root, 'div', ["footer__inner"]);
      new Component(icon.root, 'img', ["info-icon"], null, ["src", "alt"], ["./assets/instagram.png", "person"]);
      new Component(icon.root, 'img', ["info-icon"], null, ["src", "alt"], ["./assets/twitter.png", "person"]);
      new Component(icon.root, 'img', ["info-icon"], null, ["src", "alt"], ["./assets/facebook.png", "person"]);
   
      const name = new Component(footer__inner.root, 'div', ["name"]);
      new Component(name.root, 'p', ['contacts__inner'], 'Гордейчук Марина');
      new Component(name.root, 'p', ['contacts__inner'], 'Вячеславовна');
      new Component(name.root, 'p', ['contacts__inner'], 'ЭМ - 3');
      const icons = new Component (name.root, 'div', ["icons__footer"]);
      const figma = new Component(icons.root, 'a', ["figma"], null, ["href"], ["#"]);
      new Component(figma.root, 'img', ["figma"], null, ["src", "alt"], ["./assets/figma.png", "figma"]);
      const github = new Component(icons.root, 'a', ["github"], null, ["href"], ["#"]);
      new Component(github.root, 'img', ["github"], null, ["src", "alt"], ["./assets/github.png", "github"]);
   }
}