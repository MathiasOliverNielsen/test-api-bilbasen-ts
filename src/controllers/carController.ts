import { Request, Response } from "express";

export const carController = {
  // GET /cars - Hent alle biler
  getAllCars: (req: Request, res: Response) => {
    try {
      // TODO: Implementer database logik
      const cars = [
        {
          id: 1,
          brand: "Audi",
          model: "A4",
          year: 2022,
          price: 450000,
          mileage: 15000,
          fuelType: "Benzin",
          transmission: "Automatisk",
          description: "Velholdt Audi A4 med lav kilometerstand",
        },
        {
          id: 2,
          brand: "BMW",
          model: "320i",
          year: 2021,
          price: 425000,
          mileage: 22000,
          fuelType: "Benzin",
          transmission: "Manuel",
          description: "BMW 320i i perfekt stand",
        },
        {
          id: 3,
          brand: "Mercedes-Benz",
          model: "C200",
          year: 2023,
          price: 520000,
          mileage: 8000,
          fuelType: "Diesel",
          transmission: "Automatisk",
          description: "Næsten ny Mercedes C200",
        },
      ];
      res.json(cars);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved hentning af biler" });
    }
  },

  // GET /cars/:id - Hent specifik bil
  getCarById: (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      // TODO: Implementer database logik
      const car = {
        id,
        brand: "Audi",
        model: "A4",
        year: 2022,
        price: 450000,
        mileage: 15000,
        fuelType: "Benzin",
        transmission: "Automatisk",
        description: "Velholdt Audi A4 med lav kilometerstand",
      };

      if (!car) {
        return res.status(404).json({ error: "Bil ikke fundet" });
      }

      res.json(car);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved hentning af bil" });
    }
  },

  // POST /cars - Opret ny bil
  createCar: (req: Request, res: Response) => {
    try {
      const { brand, model, year, price, mileage, fuelType, transmission, description } = req.body;

      if (!brand || !model || !year || !price) {
        return res.status(400).json({ error: "Brand, model, år og pris er påkrævet" });
      }

      // TODO: Implementer database logik
      const newCar = {
        id: Date.now(), // Temporary ID
        brand,
        model,
        year,
        price,
        mileage: mileage || 0,
        fuelType: fuelType || "Benzin",
        transmission: transmission || "Manuel",
        description: description || "",
      };

      res.status(201).json(newCar);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved oprettelse af bil" });
    }
  },

  // PUT /cars/:id - Opdater bil
  updateCar: (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { brand, model, year, price, mileage, fuelType, transmission, description } = req.body;

      // TODO: Implementer database logik
      const updatedCar = {
        id,
        brand: brand || "Audi",
        model: model || "A4",
        year: year || 2022,
        price: price || 450000,
        mileage: mileage || 15000,
        fuelType: fuelType || "Benzin",
        transmission: transmission || "Automatisk",
        description: description || "Opdateret bil",
      };

      res.json(updatedCar);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved opdatering af bil" });
    }
  },

  // DELETE /cars/:id - Slet bil
  deleteCar: (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      // TODO: Implementer database logik
      res.json({ message: `Bil med ID ${id} er slettet` });
    } catch (error) {
      res.status(500).json({ error: "Fejl ved sletning af bil" });
    }
  },

  // GET /cars/search - Søg biler
  searchCars: (req: Request, res: Response) => {
    try {
      const { brand, minPrice, maxPrice, year, fuelType } = req.query;

      // TODO: Implementer database søgelogik
      const searchResults = [
        {
          id: 1,
          brand: "Audi",
          model: "A4",
          year: 2022,
          price: 450000,
          mileage: 15000,
          fuelType: "Benzin",
        },
      ];

      res.json({
        results: searchResults,
        count: searchResults.length,
        filters: { brand, minPrice, maxPrice, year, fuelType },
      });
    } catch (error) {
      res.status(500).json({ error: "Fejl ved søgning af biler" });
    }
  },
};
