import { Request, Response } from "express";

export const brandController = {
  // GET /brands - Hent alle brands
  getAllBrands: (req: Request, res: Response) => {
    try {
      // TODO: Implementer database logik
      const brands = [
        { id: 1, name: "Audi", country: "Germany", founded: 1909 },
        { id: 2, name: "BMW", country: "Germany", founded: 1916 },
        { id: 3, name: "Mercedes-Benz", country: "Germany", founded: 1926 },
        { id: 4, name: "Volkswagen", country: "Germany", founded: 1937 },
        { id: 5, name: "Toyota", country: "Japan", founded: 1937 },
      ];
      res.json(brands);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved hentning af brands" });
    }
  },

  // GET /brands/:id - Hent specifik brand
  getBrandById: (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      // TODO: Implementer database logik
      const brand = { id, name: "Audi", country: "Germany", founded: 1909 };

      if (!brand) {
        return res.status(404).json({ error: "Brand ikke fundet" });
      }

      res.json(brand);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved hentning af brand" });
    }
  },

  // POST /brands - Opret nyt brand
  createBrand: (req: Request, res: Response) => {
    try {
      const { name, country, founded } = req.body;

      if (!name || !country) {
        return res.status(400).json({ error: "Navn og land er påkrævet" });
      }

      // TODO: Implementer database logik
      const newBrand = {
        id: Date.now(), // Temporary ID
        name,
        country,
        founded: founded || null,
      };

      res.status(201).json(newBrand);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved oprettelse af brand" });
    }
  },

  // PUT /brands/:id - Opdater brand
  updateBrand: (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { name, country, founded } = req.body;

      // TODO: Implementer database logik
      const updatedBrand = {
        id,
        name: name || "Audi",
        country: country || "Germany",
        founded: founded || 1909,
      };

      res.json(updatedBrand);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved opdatering af brand" });
    }
  },

  // DELETE /brands/:id - Slet brand
  deleteBrand: (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      // TODO: Implementer database logik
      res.json({ message: `Brand med ID ${id} er slettet` });
    } catch (error) {
      res.status(500).json({ error: "Fejl ved sletning af brand" });
    }
  },
};
