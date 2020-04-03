import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private client: HttpClient) {

  }
  public getLibri() {
    return this.client.get('http://esercitazione.local/api/libri/elencoLibri');
  }

  public save(libro) {
    const headers = new HttpHeaders(
      {
        _method: 'PUT'
      }
    )
    return this.client.post('http://esercitazione.local/api/libri/aggiornaLibro/' + libro.id, libro, { headers: headers });
  }

  public delete(id) {
    const headers = new HttpHeaders(
      {
        _method: 'DELETE'
      }
    )
    return this.client.post('http://esercitazione.local/api/libri/eliminaLibro/' + id, {}, { headers: headers });
  }
}
