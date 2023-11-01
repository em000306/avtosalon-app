import { FirebaseApp } from "firebase/app";
import { User } from "firebase/auth";
import { collection, doc, DocumentData, Firestore, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Observer } from "../Abstract/Observer";
import { TCar } from "../Abstract/Type";

export class DBService extends Observer {
  private db: Firestore = getFirestore(this.DBFirestore);

  dataUser: DocumentData | null = null;

  constructor(private DBFirestore: FirebaseApp) {
    super();
  }

  async getAllCars(): Promise<TCar[]> {
    const querySnapshot = await getDocs(collection(this.db, 'cars'));
    const storage = getStorage();
    const cars = querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const uri = ref(storage, data.url);
      const url = await getDownloadURL(uri);
      const car = {
        name: data.name as string,
        price: data.price as number,
        year: data.price as number,        
        url: url,
        id:doc.id
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
      this.dataUser = docSnap.data();
      console.log(docSnap.data());
    } else {
      const data = {
        email: user.email,
        name: user.displayName,
        fotoUrl: user.photoURL
      };
      await setDoc(doc(this.db, "users", user.uid), data);
      const docSetSnap = await getDoc(docRef);
      this.dataUser = docSetSnap.data() || null;
      console.log("create documemt");
    }
  }
}