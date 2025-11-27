import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CategoriesService } from './categories/categories.service';
import { InventoriesService } from './inventories/inventories.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const categoriesService = app.get(CategoriesService);
    const inventoriesService = app.get(InventoriesService);

    console.log('Seeding categories...');
    const electronics = await categoriesService.create({ name: 'Electronics' });
    const clothing = await categoriesService.create({ name: 'Clothing' });
    const groceries = await categoriesService.create({ name: 'Groceries' });
    console.log('Categories seeded.');

    console.log('Seeding inventories...');
    await inventoriesService.create({
        name: 'Smartphone',
        quantity: 50,
        price: 699,
        categoryId: electronics.id,
    });
    await inventoriesService.create({
        name: 'Laptop',
        quantity: 20,
        price: 999,
        categoryId: electronics.id,
    });
    await inventoriesService.create({
        name: 'T-Shirt',
        quantity: 100,
        price: 19,
        categoryId: clothing.id,
    });
    await inventoriesService.create({
        name: 'Jeans',
        quantity: 50,
        price: 49,
        categoryId: clothing.id,
    });
    await inventoriesService.create({
        name: 'Apple',
        quantity: 200,
        price: 1,
        categoryId: groceries.id,
    });
    console.log('Inventories seeded.');

    await app.close();
}

bootstrap();
