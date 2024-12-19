import { HttpInterceptorFn } from '@angular/common/http';

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const reqWithBaseUrl = req.clone({
    url: `http://localhost:3000/${req.url}`
  });
  return next(reqWithBaseUrl);
};
