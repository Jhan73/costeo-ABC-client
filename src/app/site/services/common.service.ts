import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient
  ) { }

  // paginate(path: string, dto: PaginateDTO) {
  //   const urlPath = `${environment.API_URL}${path}`;
  //   return this.http.post<Result>(urlPath, dto)
  // }

  getById(path: string, id: number): Observable<any>{
    const urlPath = `${environment.API_URL}${path}/${id}`;
    return this.http.get<any>(`${urlPath}endpoint`)
  }

  getAll(path: string): Observable<any>{
    const urlPath = `${environment.API_URL}${path}/`;
    return this.http.get<any>(urlPath)
  }

  getOnlyFields(path: string, fields: string[]): Observable<any>{
    const urlPath = `${environment.API_URL}${path}`;
    return this.http.post<any>(urlPath, { fields: fields });
  }

  create(path: string, data: any = {} ): Observable<any>{
    const urlPath = `${environment.API_URL}${path}/`
    return this.http.post<any>(urlPath, data)
  }

  update(path: string, id: number, data: {}){
    const urlPath = `${environment.API_URL}${path}/${id}/`;
    return this.http.put<any>(urlPath, data)
  }

  createOrUpdate(path: string, id: number, data: any = {}){
    if(id > 0){
      return this.update(path, id, data);
    } else {
      return this.create(path, data);
    }
  }

  delete(path: string, id: number) {
    const urlPath = `${environment.API_URL}${path}/${id}/`;
    return this.http.delete<any>(urlPath)
  }

  getByField(path: string, field: string, value: number | string){
    const urlPath = `${environment.API_URL}${path}`
    return this.http.post<any>(urlPath, {field: field, value: value})
  }
}
