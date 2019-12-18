import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyService } from '../currency.service';
@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  countryCodes = [];
  countryNames = new Map();
  resultRate: any;
  swappedRate: any;
  fromValue: any;
  toValue: any;
  fromCurr: any = 'EUR';
  toCurr: any = 'GBP';

  // private _graphData: any = {
  //   nodes: [
  //     {data: {id: 'j', name: 'Jerry', faveColor: '#6FB1FC', faveShape: 'triangle'}},
  //     {data: {id: 'e', name: 'Elaine', faveColor: '#EDA1ED', faveShape: 'ellipse'}},
  //     {data: {id: 'k', name: 'Kramer', faveColor: '#86B342', faveShape: 'octagon'}},
  //     {data: {id: 'g', name: 'George', faveColor: '#F5A45D', faveShape: 'rectangle'}}
  //   ],
  //   edges: [
  //     {data: {source: 'j', target: 'e', faveColor: '#6FB1FC'}},
  //     {data: {source: 'j', target: 'k', faveColor: '#6FB1FC'}},
  //     {data: {source: 'j', target: 'g', faveColor: '#6FB1FC'}},

  //     {data: {source: 'e', target: 'j', faveColor: '#EDA1ED'}},
  //     {data: {source: 'e', target: 'k', faveColor: '#EDA1ED'}},

  //     {data: {source: 'k', target: 'j', faveColor: '#86B342'}},
  //     {data: {source: 'k', target: 'e', faveColor: '#86B342'}},
  //     {data: {source: 'k', target: 'g', faveColor: '#86B342'}},

  //     {data: {source: 'g', target: 'j', faveColor: '#F5A45D'}}
  //   ]
  // };

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  constructor(protected convertService: CurrencyService, public http: HttpClient) {

   }

  ngOnInit() {
    this.fetchCountries();
    this.getCurrencyRate();
  }

  // get graphData(): any {
  //   return this.graphData;
  // }

  // set graphData(value: any) {
  //   this.graphData = value;
  // }

  async fetchCountries() {
    try {
      const res = await this.convertService.getCountries();
      // tslint:disable-next-line: forin
      for (const x in res['results']) {
        this.countryCodes.push(x);
        this.countryNames.set(x, res['results'][x].currencyName);
      }
    } catch (err) {
      console.error(err);
    }
    console.log(this.countryNames);
  }

  async getCurrencyRate() {
    const from = this.fromCurr;
    const to = this.toCurr;
    try {
      const exchangeRate = await this.convertService.getExchangeRate(from, to);
      const rate = exchangeRate[from + '_' + to].val;
      this.resultRate = rate;
    } catch (err) {
      console.error(err);
    }
  }

  calculateCurrencyOne() {
    this.toValue = this.fromValue * parseFloat(this.resultRate);
    console.log(`Final Value ${this.toValue}`);
  }

  calculateCurrencyTwo() {
    this.fromValue = this.toValue / parseFloat(this.resultRate);
    console.log(`Final Value ${this.toValue}`);
  }

}
