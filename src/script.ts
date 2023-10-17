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

const body = document.body;
initializeApp(firebaseConfig);

class App {
  constructor(parrent: HTMLElement) {
    const wrap = new Component(body, 'div', ["wrapper"]);
    new Header(wrap.root);
    const main = new Component (wrap.root, "main");
    const links = {
      "#": new MainPage (main.root), 
      "#account": new Account (main.root),
      "#authorization": new Authorization (main.root),
      "#card": new Card (main.root),
      "#catalog": new Catalog (main.root),
      "#statistic": new Statistic (main.root),
      "#testdrive": new Testdrive (main.root),
    }
    new Router(links);
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