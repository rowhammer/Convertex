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
  fromCurr: any = 'USD';
  toCurr: any = 'LKR';
  constructor(protected convertService: CurrencyService, public http: HttpClient) {
   }

  ngOnInit() {
    this.fetchCountries();
    this.getCurrencyRate();
  }

  async fetchCountries() {
    try {
      const res = await this.convertService.getCountries();
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
