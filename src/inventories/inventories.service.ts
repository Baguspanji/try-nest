import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) { }

  create(createInventoryDto: CreateInventoryDto) {
    const { categoryId, ...inventoryData } = createInventoryDto;
    const inventory = this.inventoryRepository.create({
      ...inventoryData,
      category: { id: categoryId },
    });
    return this.inventoryRepository.save(inventory);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [data, total] = await this.inventoryRepository.findAndCount({
      relations: ['category'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return this.inventoryRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    const { categoryId, ...inventoryData } = updateInventoryDto;
    const updateData: any = { ...inventoryData };
    if (categoryId) {
      updateData.category = { id: categoryId };
    }
    return this.inventoryRepository.update(id, updateData);
  }

  remove(id: number) {
    return this.inventoryRepository.delete(id);
  }
}
