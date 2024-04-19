import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Group } from './group.entity';
import { Role } from './role.entity';

@Entity('groupRole')
export class GroupRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupId: number;

  @Column()
  roleId: number;

  @ManyToOne(() => Group, (group) => group.groupRoles)
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @ManyToOne(() => Role, (role) => role.groupRoles)
  @JoinColumn({ name: 'roleId' })
  role: Role;
}
