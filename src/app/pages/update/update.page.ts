import { BookInterface } from './../../interfaces/book';
import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core'

@Component({
  selector: 'app-list',
  templateUrl: 'update.page.html',
  styleUrls: ['update.page.scss']
})
export class UpdatePage implements OnInit {
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
  public libri: BookInterface[];
  public libroSelezionato: BookInterface;
  constructor(public backend: BackendService, private pickerController: PickerController) {

    this.backend.getLibri().subscribe((libri: BookInterface[]) => {
      console.log(libri);
      this.libri = libri;
    });

    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
  }

  async mostraPickerLibri() {
    if (!this.libri)
      return;

    let opzioni: PickerOptions = {
      buttons: [
        {
          text: 'Nascondi',
          role: 'cancel'
        },
        {
          text: 'Seleziona',
        }
      ],
      columns: [
        {
          name: 'titolo',
          options: this.getColumnOptions()
        }
      ]
    }

    let picker = await this.pickerController.create(opzioni);
    picker.present();
    picker.onDidDismiss().then(async selezionato => {
      let colonna = await picker.getColumn('titolo');
      console.log('Valore col: ', colonna.options[colonna.selectedIndex].value.id + ' - Testo col: ' + colonna.options[colonna.selectedIndex].text);
      this.libroSelezionato = colonna.options[colonna.selectedIndex].value;
      console.log(this.libroSelezionato)
    })
  };


  getColumnOptions() {
    let options = [];
    this.libri.forEach((libro: BookInterface) => {
      options.push({ text: libro.titolo, value: libro });
    });
    return options;
  }

  isBookSelected() {
    return !!this.libroSelezionato;
  }
  
  updateBook(){
    this.backend.save(this.libroSelezionato)
    .subscribe((libro: BookInterface) => {
      this.libroSelezionato = null;
    },
    error => {
      console.log(error)
    });
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
