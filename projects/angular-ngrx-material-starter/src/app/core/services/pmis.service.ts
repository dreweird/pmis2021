import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PmisService {
  // apiRoot: string = 'http://172.16.128.163:3900';
  // apiRoot: string = 'http://210.5.100.45:4000';
  apiRoot: string = 'http://localhost:3900';

  constructor(private http: HttpClient) {}

  find_commodity(id) {
    const url = `${this.apiRoot}/commodity/` + id;
    return this.http.get(url);
  }

  find_price(id) {
    const url = `${this.apiRoot}/find_price/` + id;
    return this.http.get(url);
  }

  getRowCommodity() {
    const url = `${this.apiRoot}/commodity`;
    return this.http.get(url);
  }

  getRow2020() {
    const url = `${this.apiRoot}/price/year2020`;
    return this.http.get(url);
  }

  insertCommodity(entries) {
    const url = `${this.apiRoot}/commodity`;
    return this.http.post(url, { entries });
  }

  insertPriceRow(entries) {
    const url = `${this.apiRoot}/price`;
    return this.http.post(url, { entries });
  }

  updateCommodity(id, col, value) {
    const url = `${this.apiRoot}/commodity/` + id;
    return this.http.put(url, { col, value });
  }

  updatePrice(id, col, value) {
    const url = `${this.apiRoot}/price/` + id;
    return this.http.put(url, { col, value });
  }

  searchCommodity(search) {
    const url = `${this.apiRoot}/searchCommodity/` + search;
    return this.http.get(url);
  }

  add_files(newFile) {
    const url = `${this.apiRoot}/add-files`;
    return this.http.post(url, { newFile });
  }

  removePriceRow(id) {
    const url = `${this.apiRoot}/price/` + id;
    return this.http.delete(url);
  }

  login(username, password) {
    const url = `${this.apiRoot}/authenticate`;
    return this.http.post(url, { username, password });
  }

  upload(formData) {
    const url = `${this.apiRoot}/multiple-upload`;
    return this.http.post<any>(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
