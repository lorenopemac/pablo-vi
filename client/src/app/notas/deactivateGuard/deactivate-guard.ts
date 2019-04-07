import { CanDeactivate } from '@angular/router';

export class DeactivateGuard implements CanDeactivate<any> {

  canDeactivate(component) {
    return component.canDeactivate();
  }
}
