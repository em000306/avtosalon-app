import { getAuth, signOut } from "firebase/auth";
import { Component } from "../Abstract/Component";
import { TDataHistory, TServices } from "../Abstract/Type";
import { CartHistory } from "../Common/CartHistory";

export class Account extends Component {
  outButton: Component;
  divHistory: Component;
  constructor(parrent: HTMLElement, private services: TServices) {
    super(parrent, "div", ["account"]);
    const container = new Component(this.root, 'div', ["container"]);
    new Component(container.root, 'h2', null, "My account")

    this.outButton = new Component(container.root, 'input', ["auth__btn"], null, ["type", "value"], ["button", " Log out"]);
    this.outButton.root.onclick = () => {
      this.services.authService.outFromGoogle();
    }

    const divName = new Component(container.root, 'div', ["account__names"]);
    new Component(divName.root, 'span', ["account__name"], "Name:");
    new Component(divName.root, 'span', ["account__email"], `${services.authService.user?.displayName}`);
    const divEmail = new Component(container.root, 'div', ["account__emails"]);
    new Component(divEmail.root, 'span', ["account__name"], "Email:");
    new Component(divEmail.root, 'span', ["account__email"], `${services.authService.user?.email}`);

    const divEntrys = new Component(container.root, 'div', ['account__entries']);
    new Component(divEntrys.root, 'h2', null, "Your entries");
    this.divHistory = new Component(divEntrys.root, 'div', ["order__history"]);

    const user = services.authService.user;
    services.dbService.calcCountDocsHistory(user);

    services.dbService.getAllHistory(user).then((historys) => {
      this.putHistoryOnPage(this.divHistory, historys);
    });

    services.dbService.addListener('addInHistory', (history) => {
      const user = services.authService.user;
      this.putHistoryOnPage(this.divHistory, [history as TDataHistory]);
    });
  }
  putHistoryOnPage(teg: Component, historys: TDataHistory[]) {
    historys.forEach((history) => {
      new CartHistory(teg.root, this.services, history);
    })
  }

}