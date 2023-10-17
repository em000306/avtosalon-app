import { getAuth } from "firebase/auth";
import { Component } from "../Abstract/Component";
import { TServices } from "../Abstract/Type";


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
    console.log(auth)

    if (url === 'account' && !user) {
      
      this.links['#authorization'].render();
    } else if(url === 'account'&& auth.currentUser?.email===this.services.logicService.emailAdmin && user){
      
      this.links['#statistic'].render();
    }
    else{
      this.links['#' + url].render();
    }
    
  }
}