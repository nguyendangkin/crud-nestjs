import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GroupRole } from './groupRole.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column('text', { array: true, default: () => 'ARRAY[]::text[]' })
  permissions: string[];

  @OneToMany(() => GroupRole, (groupRole) => groupRole.role)
  groupRoles: GroupRole[];
}
