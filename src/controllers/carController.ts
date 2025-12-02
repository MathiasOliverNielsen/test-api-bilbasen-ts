import { Request, Response } from "express";
import { prisma } from "../prisma.js";

// GET /cars - Hent alle biler med brand og kategori info
export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.car.findMany({
      select: {
        id: true,
        model: true,
        year: true,
        price: true,
        mileage: true,
        fuelType: true,
        transmission: true,
        brand: {
          select: {
            name: true,
            country: true,
          },
        },
        category: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    });
    res.json(data);
    console.log("carController - Alle biler hentet med relationer");
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke hente liste af biler");
  }
};

// GET /cars/:id - Hent specifik bil
export const getRecord = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await prisma.car.findUnique({
      where: { id },
      include: {
        brand: true,
        category: true,
      },
    });

    if (!data) {
      return res.status(404).json({ error: "Bil ikke fundet" });
    }

    res.json(data);
    console.log(`Bil ${id} detaljer besøgt`);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke hente bil");
  }
};

// POST /cars - Opret bil
export const createRecord = async (req: Request, res: Response) => {
  try {
    const { brandId, categoryId, model, year, price, mileage, fuelType } = req.body;

    if (!brandId || !categoryId || !model || !year || !price) {
      return res.status(400).json({ error: "BrandId, categoryId, model, år og pris er påkrævet" });
    }

    const data = await prisma.car.create({
      data: {
        brandId: Number(brandId),
        categoryId: Number(categoryId),
        model,
        year: Number(year),
        price: Number(price),
        mileage: mileage ? Number(mileage) : null,
        fuelType,
      },
      include: {
        brand: true,
        category: true,
      },
    });

    res.status(201).json(data);
    console.log("Ny bil oprettet:", data.model);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke oprette bil");
  }
};

// PUT /cars/:id - Opdater bil
export const updateRecord = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { brandId, categoryId, model, year, price, mileage, fuelType } = req.body;

    const data = await prisma.car.update({
      where: { id },
      data: {
        brandId: brandId ? Number(brandId) : undefined,
        categoryId: categoryId ? Number(categoryId) : undefined,
        model,
        year: year ? Number(year) : undefined,
        price: price ? Number(price) : undefined,
        mileage: mileage ? Number(mileage) : undefined,
        fuelType,
      },
      include: {
        brand: true,
        category: true,
      },
    });

    res.json(data);
    console.log(`Bil ${id} opdateret`);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke opdatere bil");
  }
};

// DELETE /cars/:id - Slet bil
export const deleteRecord = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.car.delete({
      where: { id },
    });

    res.json({ message: `Bil med ID ${id} er slettet` });
    console.log(`Bil ${id} slettet`);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke slette bil");
  }
};
