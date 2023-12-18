import { Component } from "../Abstract/Component";
import { TCar, TServices } from "../Abstract/Type";

export class Card extends Component {
   data: TCar | null = null;
   constructor(parrent: HTMLElement, private services: TServices) {
      super(parrent, "div", ["card"]);
      const container = new Component(this.root, 'div', ["container"]);
      // new Component(container.root, 'h1', null, "Card")

      const divCard = new Component(container.root, 'div', ["card__row"]);

      const imgCar = new Component(divCard.root, 'img', ["detail-img"], null, ["src", "alt"], ["", ""]);

      const divDetail = new Component(divCard.root, 'div', ["card__detail"]);
      const nameCar = new Component(divDetail.root, 'span', ["detail__name"], "");
      const detailCar = new Component(divDetail.root, 'span', ["detail__detail"], "");

      const testDrive = new Component(divDetail.root, 'input', ["cart-btn"], null, ["type", "value"], ["button", "TESTDRIVE"]);

      (testDrive.root as HTMLButtonElement).onclick = () => {
         services.dbService.openTestdrivePage(this.data as TCar);
      }

      services.dbService.addListener('updateDetailPage', (car) => {
         this.data = car as TCar;
         (imgCar.root as HTMLImageElement).src = this.data.url;
         (imgCar.root as HTMLImageElement).alt = this.data.name;
         nameCar.root.innerHTML = this.data.name;
         detailCar.root.innerHTML = this.data.detail;
      })
   }
}