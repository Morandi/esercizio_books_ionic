import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  
  constructor( private client:HttpClient) { 

  }
  public getLibri() {
    return this.client.get('http://esercitazione.local/api/libri/elencoLibri');
  }

  public save(libro){
    this.client.post('http://esercitazione.local/api/libri/aggiornaLibro', libro).subscribe((libro:any) => {
      console.log(libro);
    });
  }

  public delete(id){
    let headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT');
    // , {headers: headers}
    
    this.client.post('http://esercitazione.local/api/libri/eliminaLibro/', id, {headers}).subscribe(error => {
      console.log(error);
    });
  }
}
