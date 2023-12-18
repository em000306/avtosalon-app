import { th } from "date-fns/locale";
import { FirebaseApp } from "firebase/app";
import { collection, CollectionReference, deleteDoc, doc, DocumentReference, Firestore, getDocs, getFirestore } from "firebase/firestore";
import { Component } from "../Abstract/Component";
import { TDataHistory, TServices } from "../Abstract/Type";
import { CardRecord } from "../Common/CardRecord";
import { Graph } from "../Common/Graph";

export class Statistic extends Component {
  outButton: Component;
  divHistory: Component;
  constructor(parrent: HTMLElement, private services: TServices) {
    super(parrent, "div", ["statistic"]);
    const container = new Component(this.root, 'div', ["container"]);
    new Component(container.root, 'h2', null, "Administrator")
    this.outButton = new Component(container.root, 'input', ["auth__btn"], null, ["type", "value"], ["button", " Log out"]);
    this.outButton.root.onclick = () => {
      this.services.authService.outFromGoogle();
    }
    const divGraph = new Component(container.root, "div", ["stat__graph"]);
    const graph = new Graph(divGraph.root);
    this.updateGraphData(graph);
    services.dbService.addListener("addInHistory", item => {
      this.updateGraphData(graph);
    })

    new Component(container.root, 'h2', ["statistic__title"], "Customer records")
    this.divHistory = new Component(container.root, 'div', [])
    this.loadUserHistoryData();
  }

  async updateGraphData(graph: Graph) {
    const data = await this.services.dbService.updateDataGraph();
    graph.graphik.data.datasets[0].data = data;
    graph.graphik.update();
  }
  async loadUserHistoryData() {
    const usersQuerySnapshot = await getDocs(collection(this.services.dbService.db, 'users'));

    for (const userDoc of usersQuerySnapshot.docs) {
      const historyCollectionRef = collection(userDoc.ref, 'history');
      const historyQuerySnapshot = await getDocs(historyCollectionRef);

      // console.log(`Данные пользователя с ID ${userDoc.id}:`);
      const historys: TDataHistory[] = [];
      historyQuerySnapshot.forEach((historyDoc) => {
        const historyData = historyDoc.data() as TDataHistory;
        // console.log(historyData);
        historys.push(historyData);
      });

      const userDiv = new Component(this.divHistory.root, 'div', []);

      new Component(userDiv.root, 'span', [], `${userDoc.data().name}`);
      this.putHistoryOnPage(userDiv, historys, userDoc.ref, historyCollectionRef);
    }
  }

  async putHistoryOnPage(teg: Component, historys: TDataHistory[], userDocRef: DocumentReference, historyCollectionRef: CollectionReference) {
    historys.forEach((history) => {
      const cardRecord = new CardRecord(teg.root, this.services, history);

      const btnDel = new Component(cardRecord.root, 'input', ["statistic__btn"], null, ['type', 'value'], ['button', 'DELETE']);
      btnDel.root.addEventListener('click', async () => {
        if (history.id === undefined) {
          await this.deleteHistoryDocument(userDocRef, historyCollectionRef, history.id);
          // cardRecord.root.remove();
          cardRecord.root.innerHTML = 'deleted'
          // const cardRecordi = new Component(teg.root, 'span', [], "Deleted")
        }
      });
    });
  }

  async deleteHistoryDocument(userDocRef: DocumentReference, historyCollectionRef: CollectionReference, historyId: string) {
    try {
      if (!historyId) {
        throw new Error('Идентификатор документа не указан.');
      }

      const historyDocRef = doc(historyCollectionRef, historyId);
      await deleteDoc(historyDocRef);

      console.log(`Документ с ID ${historyId} успешно удален из подколлекции "history"`);

    } catch (error) {
      console.error(`Ошибка при удалении документа с ID ${historyId} из подколлекции "history":`, error);
    }
  }
}