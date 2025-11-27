import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { InventoriesModule } from './inventories/inventories.module';
import { Category } from './categories/entities/category.entity';
import { Inventory } from './inventories/entities/inventory.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '0.0.0.0',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'inventory_db',
      entities: [Category, Inventory],
      synchronize: true,
    }),
    CategoriesModule,
    InventoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
