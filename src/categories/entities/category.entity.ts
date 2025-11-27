import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Inventory } from '../../inventories/entities/inventory.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Inventory, (inventory) => inventory.category)
    inventories: Inventory[];
}
