import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseUrl } from '../baseurl';
import { IGateway } from '../models/gatewayModel';

@Injectable({
  providedIn: 'root'
})
export class GatewayService extends BaseUrl {

  constructor(private http: HttpClient) { 
    super();
  }

  createGateway(data: IGateway): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log(headers);
    return this.http
      .post<any>(this.BASE_URL, data, {
        headers,
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(async (error) => console.log(error))
      );
  }

  getAllGateways() {
    return this.http.get(
      this.BASE_URL,

      {
        headers: new HttpHeaders({
          'content-type': 'application/json'
        }),
      }
    );
  }

  getGatewayById(id: number) {
    return this.http.get(
      this.BASE_URL + '/gateway?id=' + id,

      {
        headers: new HttpHeaders({
          'content-type': 'application/json'
        }),
      }
    );
  }

  updateGateway(gatewayData: IGateway, id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http
      .put<any>(
        `${this.BASE_URL}/gateway?id=${id}`,
        gatewayData,
        { headers }
      )
      .pipe(
        tap((updatedGatewayDetail) =>
          console.log(
            `updated gateway detail = ${JSON.stringify(updatedGatewayDetail)}`
          )
        ),
        catchError(async (error) => console.log(error))
      );
  }

  deleteGateway(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log(headers);
    return this.http.delete<any>(
      `${this.BASE_URL}/gateway?id=${id}`,
      { headers }
    );
  }

  deleteGatewayDevice(id: any, deviceId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log(headers);
    return this.http.delete<any>(
      `${this.BASE_URL}/gateway/device?id=${id}&uid=${deviceId}`,
      { headers }
    );
  }
}
