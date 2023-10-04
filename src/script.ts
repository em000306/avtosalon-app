import './style.scss';

import { Component } from './Abstract/Component';
import { Header } from './Common/Header';
import { Footer } from './Common/Footer';
import { MainPage } from './Pages/MainPage';

const body = document.body;

class App {
  constructor(parrent: HTMLElement) {
    const wrap = new Component(body, 'div', ["wrapper"]);
    new Header(wrap.root);
    new MainPage(wrap.root);
    new Footer(wrap.root);
    
  }
}

    declare global {
      interface Window {
        app: App;
      }
    }
    window.app = new App(document.body);