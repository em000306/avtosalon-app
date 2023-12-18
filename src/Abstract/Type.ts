import { Timestamp } from "firebase/firestore";
import { AuthService } from "../Services/AuthService";
import { DBService } from "../Services/DBService";
import { LogicService } from "../Services/LogicService";

export type TServices = {
   authService: AuthService;
   logicService: LogicService;
   dbService: DBService;
}

export type TCar = {
   name: string,
   price: number,
   year: number,
   id: string,
   url: string,
   detail: string,
   dates: Timestamp[]
}
export type TCarBasket = {
   car: TCar,
   date: string
}
export type TDataUser = {
   name: string,
   fotoUrl: string,
   email: string,
   basket: TCarBasket[],
}
export type TCriteria = {
   year: string,
   price: string
}

export type TDataBasket = {
   summa: number,
   count: number
}
export type TDataHistory = {//переменная для оформленного заказа
   basket: TCarBasket[],
   dataBasket: TDataBasket,
   date: Timestamp,
   id: string
}
export type TDataGraph = {
   x: Date,
   y: number
}