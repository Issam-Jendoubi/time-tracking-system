import { TrackedTimeDto } from './tracked-time.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateTrackedTimeDto extends PartialType(TrackedTimeDto) {}