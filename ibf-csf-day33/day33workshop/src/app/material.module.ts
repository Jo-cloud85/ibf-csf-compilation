import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const MATERIAL = [ MatButtonModule, MatIconModule ];

@NgModule({
    imports: MATERIAL,
    exports: MATERIAL
})

export class MaterialModule {}