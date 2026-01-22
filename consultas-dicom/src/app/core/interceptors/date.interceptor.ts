import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;

export const dateInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map((event) => {
      if (event instanceof HttpResponse && event.body) {
        convertDates(event.body);
      }
      return event;
    }),
  );
};

function convertDates(object: any): void {
  if (!object || typeof object !== 'object') {
    return;
  }

  for (const key of Object.keys(object)) {
    const value = object[key];

    if (typeof value === 'string' && ISO_DATE_REGEX.test(value)) {
      object[key] = new Date(value);
    } else if (typeof value === 'object') {
      convertDates(value);
    }
  }
}
