import { TrackedTimeController } from './tracked-time.controller';
import { TrackedTimeService } from './tracked-time.service';
import { TrackedTime } from './entity/tracked-time.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TrackedTime])],
  providers: [TrackedTimeService],
  controllers: [TrackedTimeController],
  exports: [TrackedTimeService],
})
export class TrackedTimeModule {}
