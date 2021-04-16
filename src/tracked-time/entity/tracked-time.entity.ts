import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class TrackedTime {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  description: string;

  @Column({ type: 'datetime' })
  startTime: Date;

  @Column({ type: 'datetime' })
  endTime: Date;

  @Column()
  duration: string;

  @Column({ type: 'datetime' })
  insertDate: Date;

  @Column({ type: 'datetime', nullable: true })
  updateDate: Date;
}

export type TrackedTimeEntity = TrackedTime;
