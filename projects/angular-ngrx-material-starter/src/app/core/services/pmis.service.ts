import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PmisService {
    // apiRoot: string = 'http://172.16.128.37:3117';
     apiRoot: string = 'http://210.5.100.45:3117';
    // apiRoot: string = 'http://localhost:3117';

  constructor(private http: HttpClient) {}

  getChart(pid) {
    const url = `${this.apiRoot}/chart/${pid}`;
    return this.http.get(url);
  }

  pdz() {
    const url = `${this.apiRoot}/pdz`;
    return this.http.get(url);
  }


  summary_all() {
    const url = `${this.apiRoot}/summary_all`;
    return this.http.get(url);
  }

  logsReport() {
    const url = `${this.apiRoot}/logsReport/`;
    return this.http.get(url);
  }

  postAnnouncement(text, id) {
    const url = `${this.apiRoot}/postAnnouncement`;
    let entries = { text: text, id: id };
    return this.http.put(url, { entries });
  }

  updateAnnouncement(checked, id) {
    const url = `${this.apiRoot}/upAnnouncement`;
    let entries = { checked: checked, id: id };
    return this.http.put(url, { entries });
  }

  getAnnouncement() {
    const url = `${this.apiRoot}/getAnnouncement/`;
    return this.http.get(url);
  }

  by_mun_generation(params) {
    const url = `${this.apiRoot}/by_mun/${params.prov}/${params.mun}/${params.prog}`;
    return this.http.get(url);
  }

  distinctMun() {
    const url = `${this.apiRoot}/distinctMun`;
    return this.http.get(url);
  }

  by_district_generation(params) {
    const url = `${this.apiRoot}/by_district/${params.prov}/${params.district}/${params.prog}`;
    return this.http.get(url);
  }

  distinctProv() {
    const url = `${this.apiRoot}/distinctProv`;
    return this.http.get(url);
  }

  syncPhysicalDistrict(mfo_id) {
    const url = `${this.apiRoot}/syncPhysicalDistrict/${mfo_id}`;
    return this.http.get(url);
  }

  updateDistrict(col, value, id) {
    const url = `${this.apiRoot}/upDistrict`;
    let entries = { col: col, value: value, id: id };
    return this.http.put(url, { entries });
  }

  getAreabyMfoID(mfo_id) {
    const url = `${this.apiRoot}/getAreabyMfoID/${mfo_id}`;
    return this.http.get(url);
  }

  getAllLogs(uid) {
    const url = `${this.apiRoot}/getAllLogs/${uid}`;
    return this.http.get(url);
  }

  lastUpdated(pid, beds) {
    const url = `${this.apiRoot}/lastUpdated/${pid}/${beds}`;
    return this.http.get(url);
  }

  addLogs(entries) {
    const url = `${this.apiRoot}/addLogs`;
    return this.http.post(url, { entries });
  }

  updateLocked(checked, id) {
    const url = `${this.apiRoot}/upLocked`;
    let entries = { checked: checked, id: id };
    return this.http.put(url, { entries });
  }

  month_locked() {
    const url = `${this.apiRoot}/getLocked/`;
    return this.http.get(url);
  }

  updatePhysical(col, value, id) {
    const url = `${this.apiRoot}/upPhysical`;
    let entries = { col: col, value: value, mfo_id: id };
    return this.http.put(url, { entries });
  }

  updateAllotment(col, value, id) {
    const url = `${this.apiRoot}/upAllotment`;
    let entries = { col: col, value: value, id: id };
    return this.http.put(url, { entries });
  }

  removeObject(id) {
    const url = `${this.apiRoot}/delObject/` + id;
    return this.http.delete(url);
  }

  addObject(mfo_id, object_id, pid) {
    const url = `${this.apiRoot}/addObject`;
    return this.http.post(url, { mfo_id, object_id, pid });
  }

  getObjectCode() {
    const url = `${this.apiRoot}/getObjectCode/`;
    return this.http.get(url);
  }

  getBudgetAssignmnet(uid) {
    const url = `${this.apiRoot}/budget_assignment/` + uid;
    return this.http.get(url);
  }

  getObligation(pid) {
    const url = `${this.apiRoot}/getObligation/` + pid;
    return this.http.get(url);
  }

  getPhysical(pid) {
    const url = `${this.apiRoot}/getPhysical/` + pid;
    return this.http.get(url);
  }

  login(username, password) {
    const url = `${this.apiRoot}/authenticate`;
    return this.http.post(url, { username, password });
  }
}
