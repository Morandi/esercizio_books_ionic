import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  // public items: Array<{ title: string; note: string; icon: string }> = [];
  public items: [];
  constructor(public backend: BackendService) {

    this.backend.getLibri().subscribe((libri: any) => {
      console.log(libri);
      this.items = libri;
    });

    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
  }

  public delete(id) {
    console.log(id);

    this.backend.delete(id).subscribe(
      (response: any) => {
        this.items = response
      },
      error => {
        console.log('ERRORACCIO RITORNATO: \n\n\n' + error);
        alert('Errore:' + error);
      }
    );
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
