import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';

const baseUrl = 'https://mtos.kuantanport.com.my/cockpitnew/api/v1';

@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class DashboardService {
  //refreshListBtnBg$: EventEmitter<{}>;
  //refreshAddBtnBg$: EventEmitter<{}>;


  constructor(private http: HttpClient) {
    //this.refreshListBtnBg$ = new EventEmitter();
    //this.refreshAddBtnBg$ = new EventEmitter();
   }


  //  public setListBtnBg() {
  //   // localStorage.setItem("collapse-nav", val.toString());
  //   this.refreshListBtnBg$.emit();
  // }
  // public setAddBtnBg() {
  //   this.refreshAddBtnBg$.emit();
  // }

  loginSave<T>(data:any) {
     return this.http.post<T>(baseUrl+'/auth/login', data);
  }

  createAuthorizationHeader(): HttpHeaders {
    var token = localStorage.getItem("token");
    const headerDict = {
      "Authorization": 'Bearer '+token,
    }
    return new HttpHeaders(headerDict);
  }

  getSearchData<T>(scnOrName:any) {
    this.createAuthorizationHeader();
    return this.http.get<T>(baseUrl + "/search?scnOrName="+scnOrName, {
      headers: this.createAuthorizationHeader()
    });
  }

  getBerthAnchorageData<T>() {
    this.createAuthorizationHeader();
    return this.http.get<T>(baseUrl + "/vessel-list", {
      headers: this.createAuthorizationHeader()
    });
  }

  getBerthStatusData<T>() {
    this.createAuthorizationHeader();
    return this.http.get<T>(baseUrl + "/berth-status", {
      headers: this.createAuthorizationHeader()
    });
  }

  getVesselData<T>(vesselId:any) {
    this.createAuthorizationHeader();
    return this.http.get<T>(baseUrl + "/vessels?visitId="+vesselId, {
      headers: this.createAuthorizationHeader()
    });
  }

  cargoInfo<T>(vesselId:any) {
    this.createAuthorizationHeader();
    return this.http.get<T>(baseUrl + "/cargo-information?visitId="+vesselId, {
      headers: this.createAuthorizationHeader()
    });
  }

  agentInfo<T>(vesselId:any) {
    this.createAuthorizationHeader();
    return this.http.get<T>(baseUrl + "/agent-information?visitId="+vesselId, {
      headers: this.createAuthorizationHeader()
    });
  }

  hatchData<T>(vesselId:any) {
    this.createAuthorizationHeader();
    return this.http.get<T>(baseUrl + "/hatch-information?visitId="+vesselId, {
      headers: this.createAuthorizationHeader()
    });
  }

  vochersData<T>(vesselId:any) {
    this.createAuthorizationHeader();
    return this.http.get<T>(baseUrl + "/voucher-status?visitId="+vesselId, {
      headers: this.createAuthorizationHeader()
    });
  }

  storageData<T>(vesselId:any) {
    this.createAuthorizationHeader();
    return this.http.get<T>(baseUrl + "/storage-location?visitId="+vesselId, {
      headers: this.createAuthorizationHeader()
    });
  }

  equipmentData<T>(vesselId:any) {
    this.createAuthorizationHeader();
    return this.http.get<T>(baseUrl + "/equipment-information?visitId="+vesselId, {
      headers: this.createAuthorizationHeader()
    });
  }

  delayData<T>(vesselId:any) {
    this.createAuthorizationHeader();
    return this.http.get<T>(baseUrl + "/delay-information?visitId="+vesselId, {
      headers: this.createAuthorizationHeader()
    });
  }


}
