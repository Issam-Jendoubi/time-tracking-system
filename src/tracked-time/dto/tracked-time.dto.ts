import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class TrackedTimeDto {
  @ApiPropertyOptional({ type: 'string', name: 'id' })
  id?: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @IsDateString()
  startTime: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  @IsDateString()
  endTime: string;

  @ApiProperty()
  @IsString()
  duration: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  insertDate: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  updateDate: Date;
}