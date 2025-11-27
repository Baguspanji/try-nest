import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { InventoriesModule } from './inventories/inventories.module';
import { Category } from './categories/entities/category.entity';
import { Inventory } from './inventories/entities/inventory.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: `${configService.get('TURSO_DATABASE_URL')}?authToken=${configService.get('TURSO_AUTH_TOKEN')}`,
        driver: require('@libsql/sqlite3'),
        flags: 0x00000040, // SQLITE_OPEN_URI
        entities: [Category, Inventory],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CategoriesModule,
    InventoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
