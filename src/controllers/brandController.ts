import { Request, Response } from "express";
import { prisma } from "../prisma.js";

// GET /brands - Hent alle brands
export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.brand.findMany();
    res.json(data);
    console.log("brandController - Alle brands hentet");
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke hente liste af brands");
  }
};

// GET /brands/:id - Hent specifik brand
export const getRecord = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await prisma.brand.findUnique({
      where: { id },
      include: { cars: true },
    });

    if (!data) {
      return res.status(404).json({ error: "Brand ikke fundet" });
    }

    res.json(data);
    console.log(`Brand ${id} detaljer besøgt`);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke hente brand");
  }
};

// POST /brands - Opret brand
export const createRecord = async (req: Request, res: Response) => {
  try {
    const { name, country, founded, logoUrl } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Navn er påkrævet" });
    }

    const data = await prisma.brand.create({
      data: {
        name,
        country,
        founded: founded ? Number(founded) : null,
        logoUrl,
      },
    });

    res.status(201).json(data);
    console.log("Nyt brand oprettet:", data.name);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke oprette brand");
  }
};

// PUT /brands/:id - Opdater brand
export const updateRecord = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, country, founded, logoUrl } = req.body;

    const data = await prisma.brand.update({
      where: { id },
      data: {
        name,
        country,
        founded: founded ? Number(founded) : null,
        logoUrl,
      },
    });

    res.json(data);
    console.log(`Brand ${id} opdateret`);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke opdatere brand");
  }
};

// DELETE /brands/:id - Slet brand
export const deleteRecord = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.brand.delete({
      where: { id },
    });

    res.json({ message: `Brand med ID ${id} er slettet` });
    console.log(`Brand ${id} slettet`);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke slette brand");
  }
};
