import { Request, Response } from "express";

export const categoryController = {
  // GET /categories - Hent alle kategorier
  getAllCategories: (req: Request, res: Response) => {
    try {
      // TODO: Implementer database logik
      const categories = [
        { id: 1, name: "Personbiler", description: "Private biler til hverdagsbrug" },
        { id: 2, name: "SUV", description: "Sport Utility Vehicles" },
        { id: 3, name: "Stationcars", description: "Familiebiler med stor bagagerum" },
        { id: 4, name: "Cabriolet", description: "Biler med nedfældelig tag" },
        { id: 5, name: "Varebiler", description: "Erhvervsbiler til transport" },
        { id: 6, name: "Lastbiler", description: "Store erhvervskøretøjer" },
        { id: 7, name: "Motorcykler", description: "Tovhjulede køretøjer" },
        { id: 8, name: "Elektriske biler", description: "Miljøvenlige elbiler" },
      ];
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved hentning af kategorier" });
    }
  },

  // GET /categories/:id - Hent specifik kategori
  getCategoryById: (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      // TODO: Implementer database logik
      const category = {
        id,
        name: "Personbiler",
        description: "Private biler til hverdagsbrug",
        carCount: 1250, // Antal biler i denne kategori
      };

      if (!category) {
        return res.status(404).json({ error: "Kategori ikke fundet" });
      }

      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved hentning af kategori" });
    }
  },

  // POST /categories - Opret ny kategori
  createCategory: (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Kategorinavn er påkrævet" });
      }

      // TODO: Implementer database logik
      const newCategory = {
        id: Date.now(), // Temporary ID
        name,
        description: description || "",
        carCount: 0,
      };

      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved oprettelse af kategori" });
    }
  },

  // PUT /categories/:id - Opdater kategori
  updateCategory: (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { name, description } = req.body;

      // TODO: Implementer database logik
      const updatedCategory = {
        id,
        name: name || "Personbiler",
        description: description || "Opdateret beskrivelse",
        carCount: 1250,
      };

      res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved opdatering af kategori" });
    }
  },

  // DELETE /categories/:id - Slet kategori
  deleteCategory: (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      // TODO: Implementer database logik
      // Check om der er biler i kategorien før sletning
      res.json({ message: `Kategori med ID ${id} er slettet` });
    } catch (error) {
      res.status(500).json({ error: "Fejl ved sletning af kategori" });
    }
  },

  // GET /categories/:id/cars - Hent alle biler i en kategori
  getCarsByCategory: (req: Request, res: Response) => {
    try {
      const categoryId = parseInt(req.params.id);

      // TODO: Implementer database logik
      const cars = [
        {
          id: 1,
          brand: "Audi",
          model: "A4",
          year: 2022,
          price: 450000,
          categoryId,
        },
        {
          id: 2,
          brand: "BMW",
          model: "320i",
          year: 2021,
          price: 425000,
          categoryId,
        },
      ];

      res.json({
        categoryId,
        cars,
        count: cars.length,
      });
    } catch (error) {
      res.status(500).json({ error: "Fejl ved hentning af biler i kategori" });
    }
  },
};
