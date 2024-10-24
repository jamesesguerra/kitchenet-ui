import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from '@auth0/auth0-angular';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', redirectTo: '/home', pathMatch: 'full' },
                    { path: 'home', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
                    { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule ), canActivate: [AuthGuard] },
                    { path: 'collections', loadChildren: () => import('./pages/collections/collections.module').then(m => m.CollectionsModule ), canActivate: [AuthGuard]},
                    { path: 'recipes', loadChildren: () => import('./pages/recipes/recipes.module').then(m => m.RecipesModule ), canActivate: [AuthGuard]},
                ]
            },
            { path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule)},
            { path: 'register', loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule)},
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) },
            { path: 'callback', loadChildren: () => import('./pages/auth/callback/callback.module').then(m => m.CallbackModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
