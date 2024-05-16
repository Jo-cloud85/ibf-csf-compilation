import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

const MATERIAL = [ 
    MatButtonModule, 
    MatIconModule, 
    MatRadioModule, 
    MatCheckboxModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatDatepickerModule];

@NgModule({
    imports: MATERIAL,
    exports: MATERIAL
})

export class MaterialModule {}