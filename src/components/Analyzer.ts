import {Candle} from "./KonvaChart/Candles/CandlesComponent.tsx";

export class Analyzer {
  constructor(public multiCandles:Candle[][],public singleCandles:Candle[]) {

  }

  public async getAnalytic() {
    await fetch('http://localhost:8080/analyze', {
      method: 'POST',
      body: JSON.stringify({multiCandles: this.multiCandles, singleCandles: this.singleCandles}),
      headers: {'Content-Type': 'application/json',},
    }).then(response => {
      response.json().then(data => {
        return data;
      })

    })
  }





}