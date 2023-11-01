import { AuthService } from "../Services/AuthService";
import { DBService } from "../Services/DBService";
import { LogicService } from "../Services/LogicService";

export type TServices={
   authService:AuthService;
   logicService:LogicService;
   dbService: DBService;
}

export type TCar={
   name: string,
   price: number,
   year: number,
   id: string,
   url: string
}