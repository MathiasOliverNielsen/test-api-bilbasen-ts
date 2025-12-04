import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // Clear existing data (optional - for development)
  await prisma.car.deleteMany();
  await prisma.user.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.fuelType.deleteMany();

  // 1. Seed Users
  console.log("Seeding users");
  const adminUser = await prisma.user.create({
    data: {
      firstname: "Admin",
      lastname: "Administrator",
      email: "admin@bilbasen.dk",
      password: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
      isActive: true,
    },
  });

  const normalUser = await prisma.user.create({
    data: {
      firstname: "John",
      lastname: "Doe",
      email: "user@bilbasen.dk",
      password: await bcrypt.hash("user123", 10),
      role: "USER",
      isActive: true,
    },
  });

  // 2. Seed Categories
  console.log("Seeding categories");
  const categories = await Promise.all([
    prisma.category.create({ data: { name: "Personbil" } }),
    prisma.category.create({ data: { name: "Varevogn" } }),
    prisma.category.create({ data: { name: "Lastbil" } }),
    prisma.category.create({ data: { name: "Autocamper" } }),
    prisma.category.create({ data: { name: "Andre" } }),
  ]);

  // 3. Seed Fuel Types
  console.log("Seeding fuel types");
  const fuelTypes = await Promise.all([
    prisma.fuelType.create({ data: { name: "Benzin" } }),
    prisma.fuelType.create({ data: { name: "Diesel" } }),
    prisma.fuelType.create({ data: { name: "El" } }),
    prisma.fuelType.create({ data: { name: "Hybrid" } }),
    prisma.fuelType.create({ data: { name: "Andre" } }),
  ]);

  // 4. Seed Brands
  console.log("Seeding brands");
  const brands = await Promise.all([
    prisma.brand.create({ data: { name: "Toyota" } }),
    prisma.brand.create({ data: { name: "Volkswagen" } }),
    prisma.brand.create({ data: { name: "BMW" } }),
    prisma.brand.create({ data: { name: "Mercedes-Benz" } }),
    prisma.brand.create({ data: { name: "Audi" } }),
    prisma.brand.create({ data: { name: "Ford" } }),
    prisma.brand.create({ data: { name: "Tesla" } }),
  ]);

  // 5. Seed Cars
  console.log("Seeding cars");
  const cars = await Promise.all([
    // Toyota cars
    prisma.car.create({
      data: {
        title: "Toyota Corolla 1.8 Hybrid",
        description: "Økonomisk og pålidelig hybridbil",
        price: 285000,
        year: 2022,
        mileage: 15000,
        brandId: brands[0].id, // Toyota
        categoryId: categories[0].id, // Personbil
        fuelTypeId: fuelTypes[3].id, // Hybrid
      },
    }),

    prisma.car.create({
      data: {
        title: "Toyota Hiace Varevogn",
        description: "Stor og praktisk varevogn",
        price: 195000,
        year: 2021,
        mileage: 25000,
        brandId: brands[0].id, // Toyota
        categoryId: categories[1].id, // Varevogn
        fuelTypeId: fuelTypes[1].id, // Diesel
      },
    }),

    // Volkswagen cars
    prisma.car.create({
      data: {
        title: "Volkswagen Golf 1.5 TSI",
        description: "Sporty og komfortabel",
        price: 255000,
        year: 2023,
        mileage: 8000,
        brandId: brands[1].id, // Volkswagen
        categoryId: categories[0].id, // Personbil
        fuelTypeId: fuelTypes[0].id, // Benzin
      },
    }),

    prisma.car.create({
      data: {
        title: "Volkswagen Crafter",
        description: "Kraftig lastbil til erhverv",
        price: 450000,
        year: 2022,
        mileage: 35000,
        brandId: brands[1].id, // Volkswagen
        categoryId: categories[2].id, // Lastbil
        fuelTypeId: fuelTypes[1].id, // Diesel
      },
    }),

    // BMW cars
    prisma.car.create({
      data: {
        title: "BMW X3 xDrive20d",
        description: "Luksuriøs SUV med firehjulstræk",
        price: 565000,
        year: 2023,
        mileage: 12000,
        brandId: brands[2].id, // BMW
        categoryId: categories[0].id, // Personbil
        fuelTypeId: fuelTypes[1].id, // Diesel
      },
    }),

    // Mercedes-Benz
    prisma.car.create({
      data: {
        title: "Mercedes-Benz Sprinter Autocamper",
        description: "Luksus autocamper til ferien",
        price: 750000,
        year: 2022,
        mileage: 18000,
        brandId: brands[3].id, // Mercedes-Benz
        categoryId: categories[3].id, // Autocamper
        fuelTypeId: fuelTypes[1].id, // Diesel
      },
    }),

    // Audi
    prisma.car.create({
      data: {
        title: "Audi A4 Avant 2.0 TDI",
        description: "Elegant stationcar med masser af plads",
        price: 425000,
        year: 2023,
        mileage: 7500,
        brandId: brands[4].id, // Audi
        categoryId: categories[0].id, // Personbil
        fuelTypeId: fuelTypes[1].id, // Diesel
      },
    }),

    // Ford
    prisma.car.create({
      data: {
        title: "Ford Transit Custom",
        description: "Populær varevogn til håndværkere",
        price: 245000,
        year: 2021,
        mileage: 45000,
        brandId: brands[5].id, // Ford
        categoryId: categories[1].id, // Varevogn
        fuelTypeId: fuelTypes[1].id, // Diesel
      },
    }),

    // Tesla
    prisma.car.create({
      data: {
        title: "Tesla Model 3 Long Range",
        description: "Fremtidens elbil med autopilot",
        price: 485000,
        year: 2023,
        mileage: 5000,
        brandId: brands[6].id, // Tesla
        categoryId: categories[0].id, // Personbil
        fuelTypeId: fuelTypes[2].id, // El
      },
    }),

    prisma.car.create({
      data: {
        title: "Tesla Model Y Performance",
        description: "Elektrisk SUV med imponerende ydeevne",
        price: 625000,
        year: 2023,
        mileage: 3000,
        brandId: brands[6].id, // Tesla
        categoryId: categories[0].id, // Personbil
        fuelTypeId: fuelTypes[2].id, // El
      },
    }),
  ]);

  console.log("✅ Seeding completed successfully!");
  console.log(`Created ${categories.length} categories`);
  console.log(`Created ${fuelTypes.length} fuel types`);
  console.log(`Created ${brands.length} brands`);
  console.log(`Created ${cars.length} cars`);
  console.log(`Created 2 users (admin@bilbasen.dk / user@bilbasen.dk)`);
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
