import { Component, inject } from '@angular/core';
import { DataTarifasService } from '../services/data-tarifas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarifas.component.html',
  styleUrl: './tarifas.component.scss',
})
export class TarifasComponent {
  dataTarifasService = inject(DataTarifasService);
  async actualizarTarifa(idTarifa: string, valorActual: string) {
    const nuevoValor = prompt(
      'Ingrese el nuevo valor:',
      valorActual.toString()
    );
    if (nuevoValor !== null) {
      // Convertir el nuevo valor a número
      const valorNumerico = parseFloat(nuevoValor);
      if (!isNaN(valorNumerico)) {
        // Llama al método actualizarTarifa con el id y el nuevo valor
        await this.dataTarifasService.actualizarTarifa(idTarifa, valorActual);
      } else {
        console.error('Valor ingresado no es un número válido');
      }
    }
  }
}
