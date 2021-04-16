import { UpdateTrackedTimeDto } from './dto/update-tracked-time.dto';
import { TrackedTimeDto } from './dto/tracked-time.dto';
import { TrackedTime } from './entity/tracked-time.entity';
import { TrackedTimeService } from './tracked-time.service';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('trackedTime')
@Controller('trackedTime')
export class TrackedTimeController {
  constructor(private trackedTimeService: TrackedTimeService) {}

  @Get()
  @ApiOkResponse({ type: [TrackedTime] })
  async findAll(): Promise<TrackedTime[]> {
    return await this.trackedTimeService.findAll();
  }

  @Post()
  @ApiOkResponse({
    description: 'Successfully saved resource',
  })
  async postTrackedTime(@Body() createTrackedTime: TrackedTimeDto) {
    const result = await this.trackedTimeService.create(createTrackedTime);
    return result;
  }

  @Get(':trackedTimeId')
  @ApiOperation({ operationId: 'getSingleTrackedTime' })
  @ApiParam({
    name: 'trackedTimeId',
    type: 'string',
    description: 'MongoDB Object Id of the tracked time',
  })
  @ApiOkResponse({
    description: 'Successfully loaded single resource',
  })
  async getSingleTrackedTime(@Param('trackedTimeId') id) {
    const result = await this.trackedTimeService.findById(id);
    if (result) {
      return result;
    } else {
      throw new NotFoundException({
        meta: { status: false },
        data: { trackedTime: null },
      });
    }
  }

  @Patch(':trackedTimeId')
  @ApiOperation({ operationId: 'getSingleTrackedTime' })
  @ApiParam({
    name: 'trackedTimeId',
    type: 'string',
    description: 'MongoDB Object Id of the tracked time',
  })
  @ApiOkResponse({
    description: 'Successfully update single resource',
  })
  async patchSingleTrackedTime(
    @Param('trackedTimeId') id,
    @Body() trackedTime: UpdateTrackedTimeDto,
  ) {
    const result = await this.trackedTimeService.update(id, trackedTime);

    if (result) {
      return result;
    } else {
      throw new NotFoundException({
        meta: { status: false },
        data: { trackedTime: null },
      });
    }
  }

  @Delete(':trackedTimeId')
  @ApiOperation({ operationId: 'deleteTrackedTime' })
  @ApiParam({
    name: 'trackedTimeId',
    type: 'string',
    description: 'Id of the MongoDB Object',
  })
  @ApiOkResponse({
    description: 'Updated Resource',
  })
  async deleteTrackedTime(@Param('trackedTimeId') id: string) {
    try {
        await this.trackedTimeService.delete(id);
    } catch (exception) {
        throw new exception;
    }
  }
}
