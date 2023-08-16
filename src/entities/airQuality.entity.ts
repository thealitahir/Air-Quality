import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'airQuality' })
export class AirQuality {
  @PrimaryGeneratedColumn() id!: number;

  @Column({type: 'json'})
  polutionJson!: string;

  @Column()
  aqius!: number;

  @Column()
  aqicn!: number

  @Column()
  mainus!: string

  @Column()
  maincn!: string

  @Column()
  ts!: string

  @Column()
  datetime!: Date;  

  @Column()
  @CreateDateColumn()
  created_at!: Date;

  @Column()
  @UpdateDateColumn()
  updated_at!: Date;

  @Column()
  @DeleteDateColumn()
  deleted_at!: Date;
}
