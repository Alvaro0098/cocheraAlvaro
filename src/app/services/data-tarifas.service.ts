import { inject, Injectable } from '@angular/core';
import { Tarifa } from '../interfaces/tarifa';
import { DataAuthService } from './data-auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataTarifasService {
  tarifas: Tarifa[] = [];
  authService = inject(DataAuthService);

  constructor() {
    this.getTarifas();
  }

  async getTarifas() {
    const res = await fetch('http://localhost:4000/' + 'tarifas', {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('authToken'),
      },
    });
    if (res.status !== 200) {
      console.log('Error');
    } else {
      console.log(res);
      this.tarifas = await res.json();
    }
  }

  async actualizarTarifa(idTarifa: string, valor: string) {
    const body = { valor }; // Solo incluimos nuevoValor en el cuerpo
    const res = await fetch(`http://localhost:4000/tarifas/${idTarifa}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('authToken'),
      },
      body: JSON.stringify(body),
    });

    if (res.status !== 200) {
      console.log('Error en actualizar tarifa');
    } else {
      console.log('Se actualizo la gran tarifa');
      await this.loadData();
      await this.getTarifas(); // Cargar nuevamente las tarifas después de la actualización
    }
  }

  // Método para cargar nuevamente las tarifas
  private async loadData() {
    await this.getTarifas(); // Llama a getTarifas para actualizar la lista de tarifas
  }
}
