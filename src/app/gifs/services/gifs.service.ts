import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusquedaGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private api_key:string = 'EEp5tRL1uf995dOfNfhnDZ3niQZMN1AI';
  private servicioUrl:string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  resultados:Gif[] = [];

  get historial() {

    //  trae todos los elementos que hay dentro del arreglo
    return [...this._historial];
  }
  

  constructor( private httpCliente: HttpClient ){
    this._historial =  JSON.parse( localStorage.getItem( 'historial' )! ) || [];
    this.resultados =  JSON.parse( localStorage.getItem( 'resultados' )! ) || [];
   }


  //  Se encarga de buscar gifs y ponerlos en orden 
  buscarGifs = (query: string = '') => {

    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      
      // Cortamos el arreglo principal para mostrarlo en pantalla
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem( 'historial', JSON.stringify( this._historial ) );
      

    }

    const params = new HttpParams()
    .set( 'api_key', this.api_key )
    .set( 'limit', '10' )    
    .set( 'q', query );


    this.httpCliente.get<BusquedaGifsResponse>( `${this.servicioUrl}/search`, { params } )
    .subscribe( (resp)=> {
      
      this.resultados = resp.data;
      localStorage.setItem( 'resultados', JSON.stringify( this.resultados ) );
    });    

}



}
