import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'day-details',
    loadChildren: () => import('./pages/day-details/day-details.module').then( m => m.DayDetailsPageModule)
  },
  {
    path: 'add-shehada',
    loadChildren: () => import('./pages/add-shehada/add-shehada.module').then( m => m.AddShehadaPageModule)
  },
  {
    path: 'shehada-details',
    loadChildren: () => import('./pages/shehada-details/shehada-details.module').then( m => m.ShehadaDetailsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
