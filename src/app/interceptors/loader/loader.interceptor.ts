import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { IsLoaderService } from '../../services/loader/is-loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(IsLoaderService);
  loading.isLoading = true;
  return next(req).pipe(
    finalize(() => {
      loading.isLoading = false;
    }),
  );
};
