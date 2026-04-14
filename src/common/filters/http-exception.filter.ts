import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from '../services/prisma.service';

@Injectable()
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly prisma: PrismaService) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    const errorContent =
      typeof message === 'string' ? message : JSON.stringify(message);
    const errorCode = (exception as any).errorCode || 'UNKNOWN_ERROR';

    // Intentar obtener el user ID de la request (generalmente seteado por guards/middlewares)
    const sessionId = (request as any).user?.id || null;

    // Almacenar la información en la base de datos
    try {
      await this.prisma.logs.create({
        data: {
          statusCode: status,
          path: request.url,
          error: errorContent,
          errorCode: errorCode,
          session_id: sessionId,
        },
      });
    } catch (error) {
      console.error('Error al guardar log en Prisma:', error);
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error:
        typeof message === 'string' ? message : (message as any) || message,
      errorCode: errorCode,
    });
  }
}
