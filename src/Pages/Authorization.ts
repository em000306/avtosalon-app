import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Component } from "../Abstract/Component";
import { TServices } from "../Abstract/Type";

export class Authorization extends Component {
  regButton: Component;
  outButton: Component;
  
   constructor(parrent: HTMLElement, private services:TServices) {
      super(parrent, "div", ["authorization"]);
      const container = new Component(this.root, 'div', ["container"]);    
      const fon = new Component (container.root, 'img', ["fon"], null, ["src", "alt"], ["./assets/lambo.png", "fon"]);
      
      const author=new Component(container.root,'div',["autho"]);
      new Component(author.root, 'h1', null, "Authorization");  
      
      
      
      const auth = getAuth();
      this.regButton = new Component(author.root, 'input', ["auth__btn"], null, ["type", "value"], ["button", "Log in using Google"]);
    this.regButton.root.onclick = () => {
      this.services.authService.authWidthGoogle();
    }

    this.outButton = new Component(container.root, 'input', ["auth__btn"], null, ["type", "value"], ["button", " Log out"]);
    this.outButton.root.onclick = () => {
      this.services.authService.outFromGoogle();
    }
    const user = auth.currentUser;
    if (user) {
      this.toggleButton(true);
      // window.location.reload();
    } else {
      this.toggleButton(false);
    }

  }



 

  toggleButton(isAuthUser: boolean): void {
    if (isAuthUser) {
      this.regButton.remove();
      this.outButton.render();
    } else {
      this.regButton.render();
      this.outButton.remove();
    }
   }
}