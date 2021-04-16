import { UpdateTrackedTimeDto } from './dto/update-tracked-time.dto';
import { TrackedTimeDto } from './dto/tracked-time.dto';
import { TrackedTime } from './entity/tracked-time.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { DeleteWriteOpResultObject, MongoRepository, UpdateResult } from 'typeorm';

@Injectable()
export class TrackedTimeService {
  constructor(
    @InjectRepository(TrackedTime)
    private readonly trackedTimeRepository: MongoRepository<TrackedTime>,
  ) {}

  async findAll(): Promise<TrackedTime[]> {
    return await this.trackedTimeRepository.find();
  }

  async findAndCount(query: {
    take: number;
    skip: number;
  }): Promise<[TrackedTime[], number]> {
    return await this.trackedTimeRepository.findAndCount(query);
  }

  async findOne(query: Record<string, unknown>): Promise<TrackedTime | null> {
    return await this.trackedTimeRepository.findOne(query);
  }

  async find(query: Record<string, unknown>): Promise<TrackedTime[] | null> {
    return await this.trackedTimeRepository.find(query);
  }

  async findById(id: string): Promise<TrackedTime | null> {
    return await this.trackedTimeRepository.findOne(id);
  }

  async create(createTrackedTime: TrackedTimeDto): Promise<TrackedTime> {
    createTrackedTime.insertDate = new Date();
    createTrackedTime.updateDate = new Date();

    try {
      return await this.trackedTimeRepository.save(createTrackedTime);
    } catch (e) {
      throw new BadRequestException(
        `Error on saving Object: Exception ${e}`,
        'saving',
      );
    }
  }

  async update(id: string, update: UpdateTrackedTimeDto): Promise<UpdateResult> {
    try {
      const result = await this.trackedTimeRepository.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: update },
        {
          returnOriginal: false,
        },
      );
      return result.value;
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string): Promise<DeleteWriteOpResultObject> {
    return this.trackedTimeRepository.deleteOne({ _id: new ObjectId(id) });
  }
}
