import { Request, Response } from "express";
import { prisma } from "../prisma.js";

export const brandController = {
  // GET /brands - Hent alle brands
  getAllBrands: async (req: Request, res: Response) => {
    try {
      const brands = await prisma.brand.findMany();
      res.json(brands);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved hentning af brands" });
    }
  },

  // GET /brands/:id - Hent specifik brand
  getBrandById: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const brand = await prisma.brand.findUnique({
        where: { id },
      });

      if (!brand) {
        return res.status(404).json({ error: "Brand ikke fundet" });
      }

      res.json(brand);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved hentning af brand" });
    }
  },

  // POST /brands - Opret nyt brand
  createBrand: async (req: Request, res: Response) => {
    try {
      const { name, country, founded } = req.body;

      if (!name || !country) {
        return res.status(400).json({ error: "Navn og land er påkrævet" });
      }

      const newBrand = await prisma.brand.create({
        data: {
          name,
          country,
          founded: founded ?? null,
        },
      });

      res.status(201).json(newBrand);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved oprettelse af brand" });
    }
  },

  // PUT /brands/:id - Opdater brand
  updateBrand: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { name, country, founded } = req.body;

      const existingBrand = await prisma.brand.findUnique({
        where: { id },
      });

      if (!existingBrand) {
        return res.status(404).json({ error: "Brand ikke fundet" });
      }

      const updatedBrand = await prisma.brand.update({
        where: { id },
        data: {
          ...(name !== undefined && { name }),
          ...(country !== undefined && { country }),
          ...(founded !== undefined && { founded }),
        },
      });

      res.json(updatedBrand);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved opdatering af brand" });
    }
  },

  // DELETE /brands/:id - Slet brand
  deleteBrand: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const existingBrand = await prisma.brand.findUnique({
        where: { id },
      });

      if (!existingBrand) {
        return res.status(404).json({ error: "Brand ikke fundet" });
      }

      await prisma.brand.delete({
        where: { id },
      });

      res.json({ message: `Brand med ID ${id} er slettet` });
    } catch (error) {
      res.status(500).json({ error: "Fejl ved sletning af brand" });
    }
  },
};
