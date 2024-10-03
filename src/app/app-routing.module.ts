import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule )},
                    { path: 'collections', loadChildren: () => import('./pages/collections/collections.module').then(m => m.CollectionsModule )},
                    { path: 'recipes', loadChildren: () => import('./pages/recipes/recipes.module').then(m => m.RecipesModule )},
                ]
            },
            { path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule)},
            { path: 'register', loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule)},
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
