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
  
  public libri: BookInterface[];
  public libroSelezionato: BookInterface;
  constructor(public backend: BackendService, private pickerController: PickerController) {
  }

  ngOnInit() {
    this.backend.getLibri().subscribe((libri: BookInterface[]) => {
      console.log(libri);
      this.libri = libri;
    });
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
}
