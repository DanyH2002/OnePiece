import { HttpInterceptorFn } from '@angular/common/http';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');
  const request = token ? req.clone({
    setHeaders: {
      Authorization: `Bearer${token}`
    }
  }) : req
  console.log(request);
  return next(request);
};
