import { Controller, Get, Logger } from '@nestjs/common';

@Controller('/')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @Get()
  getHello(): string {
    this.logger.log('Health check endpoint accessed');
    return 'Hello World!';
  }

  @Get('health')
  getHealth() {
    const healthInfo = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      port: process.env.PORT || 4003,
      platform: process.platform,
      nodeVersion: process.version,
      pid: process.pid,
      memory: process.memoryUsage(),
    };

    this.logger.log('Health check accessed', healthInfo);
    return healthInfo;
  }

  @Get('ping')
  getPing() {
    this.logger.log('Ping endpoint accessed');
    return { message: 'pong', timestamp: new Date().toISOString() };
  }
}
