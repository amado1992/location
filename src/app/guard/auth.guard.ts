import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate() {

        var logging = localStorage.getItem('usuarioInfoRol')
        console.log("Hola 111 ", logging)

        if (JSON.parse(logging) == 1 || JSON.parse(logging) == 2) {

            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }

}
