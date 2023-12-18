import { FirebaseApp } from "firebase/app";
import { User } from "firebase/auth";
import { addDoc, collection, doc, DocumentData, Firestore, getDoc, getDocs, getFirestore, orderBy, query, runTransaction, setDoc, Timestamp, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Observer } from "../Abstract/Observer";
import { TCar, TCarBasket, TCriteria, TDataBasket, TDataGraph, TDataHistory, TDataUser } from "../Abstract/Type";

export class DBService extends Observer {
  public db: Firestore = getFirestore(this.DBFirestore);

  dataUser: TDataUser | null = null; //массив пользователя

  dataBasket: TDataBasket = {
    summa: 0,
    count: 0
  }
  constructor(private DBFirestore: FirebaseApp) {
    super();
  }

  async getAllCars(criteria: TCriteria): Promise<TCar[]> {
    const crit = [];
    if (criteria.year != 'all') crit.push(where("year", "==", Number(criteria.year)));
    if (criteria.price === "up") {
      crit.push(orderBy("price", "asc"));
    } else {
      crit.push(orderBy("price", "desc"));
    }
    const q = query(collection(this.db, 'cars'), ...crit);
    const querySnapshot = await getDocs(q);
    const storage = getStorage();
    const cars = querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const uri = ref(storage, data.url);
      const url = await getDownloadURL(uri);
      const car = {
        name: data.name as string,
        price: data.price as number,
        year: data.year as number,
        url: url,
        id: doc.id,
        detail: data.detail as string,
        dates: data.dates as Timestamp[]
      };
      return car;
    });
    return Promise.all(cars);
  }

  async getDataUser(user: User | null): Promise<void> {
    if (user === null) return;

    const docRef = doc(this.db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.dataUser = docSnap.data() as TDataUser;
      // console.log(docSnap.data());
    } else {
      const data = {
        email: user.email,
        name: user.displayName,
        fotoUrl: user.photoURL,
        basket: []
      };
      await setDoc(doc(this.db, "users", user.uid), data);
      const docSetSnap = await getDoc(docRef);
      this.dataUser = docSetSnap.data() as TDataUser || null;
      console.log("create documemt");
    }
  }

  openDetailPage(car: TCar): void {
    this.dispatch('updateDetailPage', car);
    window.location.hash = "#card";
  }
  openTestdrivePage(car: TCar): void {
    this.dispatch('updateTestdrivePage', car);
    window.location.hash = "#testdrive";
  }
  async addCarInBasket(user: User | null, car: TCar, date: string): Promise<void> {
    if (!user || !this.dataUser) return;

    const index = this.dataUser.basket.findIndex(el => el.car.id === car.id);
    if (index >= 0) return;


    const newUser = {} as TDataUser;
    Object.assign(newUser, this.dataUser);

    const carBasket = {
      car: car,
      date: date
    } as TCarBasket;

    newUser.basket.push(carBasket);

    await setDoc(doc(this.db, "users", user.uid), newUser)
      .then(() => {
        this.dataUser = newUser;
        // this.calcDataBasket(user);
        this.dispatch('carInBasket', carBasket);
        // this.dispatch('changeDataBasket', this.dataBasket);
      })
      .catch(() => {

      })
  }
  async calcDataBasket(user: User | null): Promise<void> { //высчитывает общую сумму корзины
    if (!user || !this.dataUser) return;
    let count = 0;
    this.dataUser.basket.forEach(el => {
      count += 1;
    })
    this.dataBasket.count = count;
  }
  async addBasketInHistory(user: User | null): Promise<void> {//добавление корзины в историю
    if (!user || !this.dataUser) return;

    const newUser = {} as TDataUser;
    Object.assign(newUser, this.dataUser)
    newUser.basket = [];

    const dataHistory = {
      basket: this.dataUser.basket,
      dataBasket: this.dataBasket,
      date: Timestamp.now()
    };

    await addDoc(collection(this.db, 'users', user.uid, 'history'), dataHistory)
      .then(async () => {
        await setDoc(doc(this.db, 'users', user.uid), newUser)
          .then(() => {
            if (!this.dataUser) throw "БД отсутствует";
            this.dataUser.basket.forEach((el) => {
              this.dispatch('delBookFromBasket', el.car.id);
            })
            this.dispatch('addInHistory', dataHistory)
            this.dataUser = newUser;
            this.dispatch('clearBasket');
            this.dispatch('changeDataBasket', this.dataBasket);
            this.calcCountDocsHistory(user);
          })
          .catch(() => { });
      })
      .catch(() => { });
  }

  async calcCountDocsHistory(user: User | null): Promise<void> {//считает количество документов в истории
    if (!user || !this.dataUser) return;

    const querySnapshot = await getDocs(collection(this.db, "users", user.uid, "history"));
    const count = querySnapshot.docs.length;
    this.dispatch('changeStat', count);
  }
  async getAllHistory(user: User | null): Promise<TDataHistory[]> {
    if (!user || !this.dataUser) return [];
    const querySnapshot = await getDocs(collection(this.db, 'users', user.uid, 'history'));
    const rez = querySnapshot.docs.map((doc) => {
      const data = doc.data() as TDataHistory;
      data.id = doc.id;
      return data;
    })
    return rez;
  }
  // async getUserHistoryData(): Promise<TDataHistory[]> {
  //   const usersQuerySnapshot = await getDocs(collection(this.db, 'users'));

  //   usersQuerySnapshot.forEach(async (userDoc) => {
  //     const historyCollectionRef = collection(userDoc.ref, 'history');
  //     const historyQuerySnapshot = await getDocs(historyCollectionRef);

  //     console.log(`Данные пользователя с ID ${userDoc.id}:`);
  //     const rez = historyQuerySnapshot.forEach((historyDoc) => {
  //       const historyData = historyDoc.data() as TDataHistory;
  //       console.log(historyData);
  //       return historyData as TDataHistory;
  //     });
  //     return rez;
  //   });
  // }

  async getUserHistoryData(): Promise<TDataHistory[]> {
    const usersQuerySnapshot = await getDocs(collection(this.db, 'users'));
    const result: TDataHistory[] = [];

    for (const userDoc of usersQuerySnapshot.docs) {
      const historyCollectionRef = collection(userDoc.ref, 'history');
      const historyQuerySnapshot = await getDocs(historyCollectionRef);

      console.log(`Данные пользователя с ID ${userDoc.id}:`);
      historyQuerySnapshot.forEach((historyDoc) => {
        const historyData = historyDoc.data() as TDataHistory;
        console.log(historyData);
        result.push(historyData);
      });
    }

    return result;
  }
  async updateDataGraph(): Promise<TDataGraph[]> {
    const data: Record<string, number> = {};
    const usersQuerySnapshot = await getDocs(collection(this.db, 'users'));

    for (const userDoc of usersQuerySnapshot.docs) {
      const historyCollectionRef = collection(userDoc.ref, 'history');
      const historyQuerySnapshot = await getDocs(historyCollectionRef);
      const historyCount = historyQuerySnapshot.size;
      console.log(`Количество документов в коллекции "history" для пользователя с ID ${userDoc.id}: ${historyCount}`);

      historyQuerySnapshot.docs.forEach((el) => {
        const dataString = el.data().date.toDate().toDateString();
        if (data[dataString]) {
          data[dataString] += historyCount;
        } else {
          data[dataString] = historyCount;
        }
      });
    }

    const sortData: TDataGraph[] = [];
    for (const day in data) {
      sortData.push({
        x: new Date(day),
        y: data[day],
      });
    }

    return sortData.sort((a, b) => a.x.getTime() - b.x.getTime());
  }
}