import { getAuth } from "firebase/auth";
import { Component } from "../Abstract/Component";
import { TServices } from "../Abstract/Type";
import { Card } from "../Pages/Card";
import { Testdrive } from "../Pages/Testdrive";


export class Router {
  constructor(public links: Record<string, Component>, private services: TServices) {
    this.openPage();

    window.onhashchange = () => {
      this.openPage();
    }
  }

  openPage() {
    Object.values(this.links).forEach((el) => el.remove());

    const url = window.location.hash.slice(1);

    const auth = getAuth();
    const user = auth.currentUser;
    // console.log(user)


    if (url === 'account' && !user) {
      this.links['#authorization'].render();
    } else if (url === 'account' && user?.email === 'em000306@g.bstu.by') {
      this.links['#statistic'].render();
    } else if (url === 'statistic' && user?.email != 'em000306@g.bstu.by') {
      this.links['#account'].render();
    } else if (url === 'statistic' && !user) {
      this.links['#authorization'].render();
    } else if (url === 'card' && !(this.links['#card'] as Card).data) {
      this.links['#'].render();
    } else if (url === 'testdrive' && !(this.links['#testdrive'] as Testdrive).data) {
      this.links['#'].render();
    }
    else {
      this.links['#' + url].render();
    }
    // else{

    //   if(url==='account'&& user.email!='em000306@g.bstu.by'){
    //     this.links['#authorization'].render();
    //   }else      {this.links['#' + url].render();}
    // }


  }
}