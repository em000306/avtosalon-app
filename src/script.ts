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
import { DBService } from './Services/DBService';
import { getFirestore } from 'firebase/firestore';

const body = document.body;

const DBFirestore = initializeApp(firebaseConfig);
const db = getFirestore(DBFirestore);


const services = {
  logicService: new LogicService(),
  authService: new AuthService(),
  dbService: new DBService(DBFirestore)
}

class App {
  constructor(parrent: HTMLElement) {
    const wrap = new Component(body, 'div', ["wrapper"]);
    new Header(wrap.root, services);
    const main = new Component(wrap.root, "main");
    const links = {
      "#": new MainPage(main.root, services),
      "#account": new Account(main.root, services),
      "#authorization": new Authorization(main.root, services),
      "#card": new Card(main.root, services),
      "#catalog": new Catalog(main.root, services),
      "#statistic": new Statistic(main.root, services),
      "#testdrive": new Testdrive(main.root, services),
    }
    new Router(links, services);
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
  services.authService.user = user;
  services.dbService
    .getDataUser(user)
    .then(() => {
      if (!window.app) window.app = new App(document.body);
    })
    .catch(() => {
      console.log("error");
    })
}
)