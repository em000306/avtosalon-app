import { Timestamp } from "firebase/firestore";
import { Component } from "../Abstract/Component";
import { TCar, TServices } from "../Abstract/Type";

export class Testdrive extends Component {
   data: TCar | null = null;
   divDates: Component;
   btnRecord: Component;
   constructor(parrent: HTMLElement, private services: TServices) {
      super(parrent, "div", ["testdrive"]);
      const container = new Component(this.root, 'div', ["container"]);
      // new Component(container.root, 'h1', null, "Testdrive")

      const divCard = new Component(container.root, 'div', ["card__row"]);

      const imgCar = new Component(divCard.root, 'img', ["detail-img"], null, ["src", "alt"], ["", ""]);

      const divDetail = new Component(divCard.root, 'div', ["testdrive__detail"]);
      const nameCar = new Component(divDetail.root, 'span', ["detail__name"], "");

      this.divDates = new Component(divDetail.root, 'select', ["testdrive__dates"]);
      // const testDrive = new Component(divDetail.root, 'input', ["cart-btn"], null, ["type", "value"], ["button", "TESTDRIVE"]);

      this.btnRecord = new Component(divDetail.root, 'input', ["testdrive__btn"], null, ["type", "value"], ["button", "TESTDRIVE"])
      services.dbService.addListener('updateTestdrivePage', (car) => {
         this.data = car as TCar;
         (imgCar.root as HTMLImageElement).src = this.data.url;
         (imgCar.root as HTMLImageElement).alt = this.data.name;
         nameCar.root.innerHTML = this.data.name;
         this.data.dates.forEach(el => {
            new Component(this.divDates.root, 'option', ["testdrive__date"], `${el.toDate().toLocaleDateString('ru')}`)
         })
         this.btnRecord.root.onclick = () => {
            this.data = car as TCar;
            this.addCarInBasket((this.divDates.root as HTMLSelectElement).value);
            window.location.hash = "#account"
         }
      })

   }
   addCarInBasket(date: string) {
      const user = this.services.authService.user;
      if (!this.data) return;
      this.services.dbService.addCarInBasket(user, this.data, date)//а затем добавляем карточку книги в корзину
         .catch(() => { });
      this.services.dbService.addBasketInHistory(user)
   }
}