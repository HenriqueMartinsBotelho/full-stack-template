import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    logger.log('🚀 Starting NestJS application...');

    // Log environment information
    logger.log(`📋 Environment: ${process.env.NODE_ENV || 'development'}`);
    logger.log(`🌐 Port: ${process.env.PORT || 4003}`);
    logger.log(`💻 Platform: ${process.platform}`);
    logger.log(`📊 Node.js version: ${process.version}`);
    logger.log(
      `🔗 Database URL configured: ${process.env.DATABASE_URL ? 'Yes' : 'No'}`,
    );

    const app = await NestFactory.create(AppModule);

    // Enable CORS for development and production
    app.enableCors({
      origin: true,
      credentials: true,
    });

    // Add global prefix
    app.setGlobalPrefix('api');

    const port = process.env.PORT || 3004;
    const host = process.env.HOST || '0.0.0.0'; // Bind to all interfaces

    logger.log(`🔧 Binding to host: ${host}`);
    logger.log(`🔧 Binding to port: ${port}`);

    await app.listen(port, host);

    logger.log(`✅ Application is running on: http://${host}:${port}`);
    logger.log(`📚 API endpoints available at: http://${host}:${port}/api`);
    logger.log(`🏥 Health check available at: http://${host}:${port}/api`);
  } catch (error) {
    logger.error('❌ Error starting the application:', error);
    logger.error(`Stack trace: ${error.stack}`);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  const logger = new Logger('UnhandledRejection');
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  const logger = new Logger('UncaughtException');
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

bootstrap();
