import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { GroupRole } from './groupRole.entity';

@Entity('group')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  group: string;

  @Column()
  description: string;

  @OneToMany(() => User, (user) => user.group)
  users: User[];

  @OneToMany(() => GroupRole, (groupRole) => groupRole.group)
  groupRoles: GroupRole[];
}
