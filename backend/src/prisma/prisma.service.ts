import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      this.logger.log('🔌 Attempting to connect to database...');

      await this.$connect();

      this.logger.log('✅ Successfully connected to database');

      // Test the connection
      await this.$queryRaw`SELECT 1`;
      this.logger.log('✅ Database connection test successful');
    } catch (error) {
      this.logger.error('❌ Failed to connect to database:', error);
      this.logger.error(
        `Database URL configured: ${process.env.DATABASE_URL ? 'Yes' : 'No'}`,
      );
      throw error;
    }
  }

  async onModuleDestroy() {
    this.logger.log('🔌 Disconnecting from database...');
    await this.$disconnect();
    this.logger.log('✅ Disconnected from database');
  }
}
