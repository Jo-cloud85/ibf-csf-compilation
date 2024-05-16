import { NgModule } from '@angular/core';
import { MatError } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

const MATERIAL = [ 
    MatError, 
    MatInputModule,
    MatFormFieldModule, 
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    HttpClientModule,
    MatProgressSpinnerModule, 
    MatSidenavModule,
    MatTooltipModule, 
 ];

@NgModule({
    imports: MATERIAL,
    exports: MATERIAL
})

export class MaterialModule {}