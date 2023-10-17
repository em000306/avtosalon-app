import { getAuth, signOut } from "firebase/auth";
import { Component } from "../Abstract/Component";
import { TServices } from "../Abstract/Type";

export class Account extends Component {
   
  outButton: Component;
   constructor(parrent: HTMLElement,private services:TServices) {
      super(parrent, "div", ["account"]);
      const container = new Component(this.root, 'div', ["container"]);
      new Component(container.root, 'h1', null, "Account")
      
      this.outButton = new Component(container.root, 'input', ["auth__btn"], null, ["type", "value"], ["button", " Log out"]);
    this.outButton.root.onclick = () => {
      this.services.authService.outFromGoogle();
    }
   }
    
   
}