import { Request, Response } from "express";
import { prisma } from "../prisma.js";

// GET /categories - Hent alle kategorier
export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.category.findMany();
    res.json(data);
    console.log("categoryController - Alle kategorier hentet");
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke hente liste af kategorier");
  }
};

// GET /categories/:id - Hent specifik kategori
export const getRecord = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await prisma.category.findUnique({
      where: { id },
      include: { cars: true },
    });

    if (!data) {
      return res.status(404).json({ error: "Kategori ikke fundet" });
    }

    res.json(data);
    console.log(`Kategori ${id} detaljer besøgt`);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke hente kategori");
  }
};

// POST /categories - Opret kategori
export const createRecord = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Navn er påkrævet" });
    }

    const data = await prisma.category.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json(data);
    console.log("Ny kategori oprettet:", data.name);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke oprette kategori");
  }
};

// PUT /categories/:id - Opdater kategori
export const updateRecord = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, description } = req.body;

    const data = await prisma.category.update({
      where: { id },
      data: {
        name,
        description,
      },
    });

    res.json(data);
    console.log(`Kategori ${id} opdateret`);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke opdatere kategori");
  }
};

// DELETE /categories/:id - Slet kategori
export const deleteRecord = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.category.delete({
      where: { id },
    });

    res.json({ message: `Kategori med ID ${id} er slettet` });
    console.log(`Kategori ${id} slettet`);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke slette kategori");
  }
};
