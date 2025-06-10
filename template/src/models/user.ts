import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, type: 'varchar', length: 50 })
  username: string

  @Column({ type: 'varchar', length: 100 })
  password: string

  @Column({ nullable: true, type: 'varchar', length: 100 })
  email: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
