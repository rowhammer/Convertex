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





  fromText = 1;
  toText = 1;
  rates = [
    {id: 1, code: 'EUR'},
    {id: 2, code: 'GBP'},
    {id: 3, code: 'RND'},
    {id: 4, code: 'CAD'},
    {id: 5, code: 'USD'}
  ];
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

  }

}
