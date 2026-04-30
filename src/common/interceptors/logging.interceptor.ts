import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();

    // Handle both HTTP and GraphQL
    if (context.getType() === 'http') {
      const req = context.switchToHttp().getRequest();
      const { method, url } = req;
      return next.handle().pipe(
        tap(() => {
          const ms = Date.now() - start;
          console.log(`[HTTP] ${method} ${url} - ${ms}ms`);
        }),
      );
    }

    return next.handle().pipe(
      tap(() => {
        const ms = Date.now() - start;
        console.log(`[GraphQL] - ${ms}ms`);
      }),
    );
  }
}