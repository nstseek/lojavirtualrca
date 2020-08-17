import { TestBed, async, inject } from '@angular/core/testing';

import { AuthRouteGuard } from './auth-route.guard';

describe('AuthRouteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthRouteGuard]
    });
  });

  it('should ...', inject([AuthRouteGuard], (guard: AuthRouteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
