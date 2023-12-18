import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { monthsInYear } from "date-fns";
import ru from "date-fns/locale/ru";
import { Component } from "../Abstract/Component";

export class Graph extends Component {
  graphik: Chart<"bar", { x: Date, y: number }[], Date>;

  constructor(parrent: HTMLElement) {
    super(parrent, 'div', ["chart"]);

    const canvas = new Component(this.root, 'canvas', ["graph"]);

    this.graphik = new Chart(canvas.root as HTMLCanvasElement, {
      type: "bar",
      data: {
        labels: [new Date()],
        datasets: [
          {
            label: "",
            data: [
              {
                x: new Date(),
                y: 0
              }
            ],
            backgroundColor: "black",
            borderColor: "black",
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "",
          },
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
              displayFormats: {
                day: "dd.MM.yy"
              }
            },
            ticks: {
              source: "auto"
            },
            adapters: {
              date: {
                locale: ru
              }
            }
          },
          y: {
            title: {
              text: "",
              display: true
            },
            beginAtZero: true
          }
        }
      }
    });
  }
}