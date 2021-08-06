import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'day-details',
    loadChildren: () => import('./day-details/day-details.module').then( m => m.DayDetailsPageModule)
  },
  {
    path: 'add-shehada',
    loadChildren: () => import('./add-shehada/add-shehada.module').then( m => m.AddShehadaPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
