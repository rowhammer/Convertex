import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  apikey = 'e8d044c121e67ef6d30f';

  constructor(public http: HttpClient) { }

  getCountries() {
      return this.http.get(`https://free.currencyconverterapi.com/api/v6/currencies?apiKey=${this.apikey}`).toPromise();
  }

  getExchangeRate(from: string, to: string) {
    return this.http.get(`http://free.currencyconverterapi.com/api/v5/convert?q=${from}_${to}&compact=y&apiKey=${this.apikey}`).toPromise();
  }

}
