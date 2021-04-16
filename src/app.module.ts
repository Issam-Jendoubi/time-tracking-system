import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TrackedTime } from './tracked-time/entity/tracked-time.entity';
import { TrackedTimeModule } from './tracked-time/tracked-time.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      // url: `mongodb://localhost/test-app`,
      url: 'mongodb://root:root@mongodb/test-api?authSource=admin',
      extra: {
        authSource: 'admin',
      },
      entities: [TrackedTime],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TrackedTimeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
