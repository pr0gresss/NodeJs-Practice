import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { RoleService } from "../services/role.service";
import { map, switchMap, tap } from "rxjs/operators";

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const roleService = inject(RoleService);
  const router = inject(Router);

  return authService.getMe().pipe(
    tap(response => authService.me.set(response)),
    switchMap(response =>
      roleService.getAll().pipe(
        map(roles => {
          const adminRoleId = roles.find(r => r.name === "Admin")?.id;
					
          if (response.roleId === adminRoleId) {
            return true;
          }

          router.navigate(["/home"]);
          return false;
        })
      )
    )
  );
};
