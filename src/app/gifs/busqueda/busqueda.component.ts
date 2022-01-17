import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {


  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {

  }

  buscar = () => {


    // Obtenemos el valor de la caja de texto
    const valor = this.txtBuscar.nativeElement.value;


    // Validamos los espacion en blanco adelnate y atras con el .trim
    if (valor.trim().length === 0) {
      return;
    }
    
    this.gifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = '';

  }

}
