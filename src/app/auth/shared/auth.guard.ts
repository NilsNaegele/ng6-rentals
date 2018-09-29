import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    NavigationExtras,
    Route
} from '@angular/router';
import { AuthInMemoryService } from '../../auth-in-memory.service';


@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    private url: string;

    private handleAuthState(): boolean {
        if (this.isLoginOrRegisterPage()) {
            this.router.navigate(['/rentals']);
            return false;
        }
        return true;
    }

    private handleNotAuthState(): boolean {
        if (this.isLoginOrRegisterPage()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

    private isLoginOrRegisterPage() {
        if (this.url.includes('login') || this.url.includes('register')) {
            return true;
        }
        return false;
    }

    constructor(private auth: AuthInMemoryService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.url = state.url;

        if (this.auth.isAuthenticated()) {
            return this.handleAuthState();
        }

        return this.handleNotAuthState();
    }
}
