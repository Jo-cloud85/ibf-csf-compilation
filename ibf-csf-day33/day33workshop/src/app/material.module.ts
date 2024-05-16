import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const MATERIAL = [ MatButtonModule, MatIconModule, MatRadioModule, MatCheckboxModule, MatInputModule, MatFormFieldModule];

@NgModule({
    imports: MATERIAL,
    exports: MATERIAL
})

export class MaterialModule {}