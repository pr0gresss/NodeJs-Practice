import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = () => {
  const _authService = inject(AuthService);
  const _router = inject(Router);

  if(!_authService.isAuthenticated()) {
    _router.navigate(['/auth/sign-in']).then();
    return false;
  }

  return true;
};