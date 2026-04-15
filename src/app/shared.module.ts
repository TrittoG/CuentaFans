import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro-pipie.pipe';
import { Filtro2Pipe } from './filtro2-pipie.pipe';

@NgModule({
  declarations: [FiltroPipe, Filtro2Pipe],
  imports: [CommonModule],
  exports: [FiltroPipe, Filtro2Pipe]
})
export class SharedModule {}
