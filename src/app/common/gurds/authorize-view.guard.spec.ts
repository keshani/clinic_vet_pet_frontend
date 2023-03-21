import { TestBed } from '@angular/core/testing';

import { AuthorizeViewGuard } from './authorize-view.guard';

describe('AuthorizeViewGuard', () => {
  let guard: AuthorizeViewGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizeViewGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
