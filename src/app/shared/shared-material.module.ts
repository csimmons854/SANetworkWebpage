import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule
} from '@angular/material';

@NgModule({
    declarations: [],
    exports: [
        MatButtonModule,
        MatTabsModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatDialogModule,
        MatDatepickerModule,
        MatSelectModule
    ]
})
export class SharedMaterialModule {}
