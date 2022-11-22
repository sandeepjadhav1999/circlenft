import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatSortModule} from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


let components=[
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
  MatInputModule,
  MatSnackBarModule,
  MatButtonToggleModule,
  MatCardModule,
  MatRippleModule,
  MatSelectModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatSidenavModule,
  MatDividerModule,
  MatListModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule
]



@NgModule({
  imports: [components],
  exports:[components]
})
export class MaterialModule { }
