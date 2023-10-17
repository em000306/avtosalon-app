import './style.scss';

import { Component } from './Abstract/Component';
import { Header } from './Common/Header';
import { Router } from './Common/Router';
import { Footer } from './Common/Footer';
import { MainPage } from './Pages/MainPage';
import { Account } from './Pages/Account';
import { Authorization } from './Pages/Authorization';
import { Card } from './Pages/Card';
import { Catalog } from './Pages/Catalog';
import { Statistic } from './Pages/Statistic';
import { Testdrive } from './Pages/Testdrive';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../configFB";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LogicService } from './Services/LogicService';
import { AuthService } from './Services/AuthService';

const body = document.body;

initializeApp(firebaseConfig);

const services={
  logicService: new LogicService(),
  authService: new AuthService()
}

class App {
  constructor(parrent: HTMLElement) {
    const wrap = new Component(body, 'div', ["wrapper"]);
    new Header(wrap.root,services);
    const main = new Component (wrap.root, "main");
    const links = {
      "#": new MainPage (main.root,services), 
      "#account": new Account (main.root,services),
      "#authorization": new Authorization (main.root,services),
      "#card": new Card (main.root,services),
      "#catalog": new Catalog (main.root,services),
      "#statistic": new Statistic (main.root,services),
      "#testdrive": new Testdrive (main.root,services),
    }
    new Router(links,services);
    new Footer(wrap.root);
    
  }
}

    declare global {
      interface Window {
        app: App;
      }
    }
    
    const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (!window.app) window.app = new App(document.body); 
}
)