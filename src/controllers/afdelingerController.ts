import { Request, Response } from "express";
import { prisma } from "../prisma.js";

export const afdelingerController = {
  // GET /afdelinger - Hent alle afdelinger/forhandlere
  getAllAfdelinger: async (req: Request, res: Response) => {
    try {
      const afdelinger = await prisma.afdeling.findMany();
      res.json(afdelinger);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fejl ved hentning af afdelinger" });
    }
  },

  // GET /afdelinger/:id - Hent specifik afdeling
  getAfdelingById: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const afdeling = await prisma.afdeling.findUnique({
        where: { id },
      });

      if (!afdeling) {
        return res.status(404).json({ error: "Afdeling ikke fundet" });
      }

      res.json(afdeling);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fejl ved hentning af afdeling" });
    }
  },

  // POST /afdelinger - Opret ny afdeling
  createAfdeling: async (req: Request, res: Response) => {
    try {
      const { name, address, phone, email, manager, openingHours, region } = req.body;

      if (!name || !address || !phone) {
        return res.status(400).json({ error: "Navn, adresse og telefon er påkrævet" });
      }

      const newAfdeling = await prisma.afdeling.create({
        data: {
          name,
          address,
          phone,
          email: email || null,
          manager: manager || null,
          openingHours: openingHours || null,
          region: region || null,
        },
      });

      res.status(201).json(newAfdeling);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fejl ved oprettelse af afdeling" });
    }
  },

  // PUT /afdelinger/:id - Opdater afdeling
  updateAfdeling: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { name, address, phone, email, manager, openingHours, region } = req.body;

      const existingAfdeling = await prisma.afdeling.findUnique({
        where: { id },
      });

      if (!existingAfdeling) {
        return res.status(404).json({ error: "Afdeling ikke fundet" });
      }

      const updatedAfdeling = await prisma.afdeling.update({
        where: { id },
        data: {
          name: name ?? existingAfdeling.name,
          address: address ?? existingAfdeling.address,
          phone: phone ?? existingAfdeling.phone,
          email: email ?? existingAfdeling.email,
          manager: manager ?? existingAfdeling.manager,
          openingHours: openingHours ?? existingAfdeling.openingHours,
          region: region ?? existingAfdeling.region,
        },
      });

      res.json(updatedAfdeling);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fejl ved opdatering af afdeling" });
    }
  },

  // DELETE /afdelinger/:id - Slet afdeling
  deleteAfdeling: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const existingAfdeling = await prisma.afdeling.findUnique({
        where: { id },
      });

      if (!existingAfdeling) {
        return res.status(404).json({ error: "Afdeling ikke fundet" });
      }

      await prisma.afdeling.delete({
        where: { id },
      });

      res.json({ message: `Afdeling med ID ${id} er slettet` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fejl ved sletning af afdeling" });
    }
  },

  // GET /afdelinger/:id/cars - Hent alle biler på en specifik afdeling
  // Note: This endpoint requires a Car model with afdelingId relation to be fully implemented
  getCarsByAfdeling: async (req: Request, res: Response) => {
    try {
      const afdelingId = parseInt(req.params.id);

      const afdeling = await prisma.afdeling.findUnique({
        where: { id: afdelingId },
      });

      if (!afdeling) {
        return res.status(404).json({ error: "Afdeling ikke fundet" });
      }

      // Note: Cars relation not yet implemented in Prisma schema
      // When Car model is added with afdelingId, replace with:
      // const cars = await prisma.car.findMany({ where: { afdelingId } });
      const cars: unknown[] = [];

      res.json({
        afdelingId,
        cars,
        count: cars.length,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fejl ved hentning af biler på afdeling" });
    }
  },

  // GET /afdelinger/search - Søg afdelinger efter region eller navn
  searchAfdelinger: async (req: Request, res: Response) => {
    try {
      const { region, name } = req.query;

      const searchResults = await prisma.afdeling.findMany({
        where: {
          AND: [
            region ? { region: { contains: region as string } } : {},
            name ? { name: { contains: name as string } } : {},
          ],
        },
      });

      res.json({
        results: searchResults,
        count: searchResults.length,
        filters: { region, name },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Fejl ved søgning af afdelinger" });
    }
  },
};
