import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListingComponent } from './employee-listing/employee-listing.component';

const routes: Routes = [
    {
        path: 'employee-listing',
        component: EmployeeListingComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
