import { Request, Response } from "express";

export const afdelingerController = {
  // GET /afdelinger - Hent alle afdelinger/forhandlere
  getAllAfdelinger: (req: Request, res: Response) => {
    try {
      // TODO: Implementer database logik
      const afdelinger = [
        {
          id: 1,
          name: "Bilbasen København",
          address: "Hovedgade 123, 1000 København K",
          phone: "70 10 10 15",
          email: "kbh@bilbasen.dk",
          manager: "Lars Nielsen",
          openingHours: "Man-Fre: 9-17, Lør: 10-14",
          region: "Hovedstaden",
        },
        {
          id: 2,
          name: "Bilbasen Aarhus",
          address: "Ringgade 456, 8000 Aarhus C",
          phone: "87 12 34 56",
          email: "aarhus@bilbasen.dk",
          manager: "Mette Andersen",
          openingHours: "Man-Fre: 9-17, Lør: 10-14",
          region: "Midtjylland",
        },
        {
          id: 3,
          name: "Bilbasen Odense",
          address: "Vestergade 789, 5000 Odense C",
          phone: "66 78 90 12",
          email: "odense@bilbasen.dk",
          manager: "Peter Jensen",
          openingHours: "Man-Fre: 9-17, Lør: 10-14",
          region: "Syddanmark",
        },
        {
          id: 4,
          name: "Bilbasen Aalborg",
          address: "Boulevarden 321, 9000 Aalborg",
          phone: "98 34 56 78",
          email: "aalborg@bilbasen.dk",
          manager: "Susanne Hansen",
          openingHours: "Man-Fre: 9-17, Lør: 10-14",
          region: "Nordjylland",
        },
      ];
      res.json(afdelinger);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved hentning af afdelinger" });
    }
  },

  // GET /afdelinger/:id - Hent specifik afdeling
  getAfdelingById: (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      // TODO: Implementer database logik
      const afdeling = {
        id,
        name: "Bilbasen København",
        address: "Hovedgade 123, 1000 København K",
        phone: "70 10 10 15",
        email: "kbh@bilbasen.dk",
        manager: "Lars Nielsen",
        openingHours: "Man-Fre: 9-17, Lør: 10-14",
        region: "Hovedstaden",
        carCount: 245, // Antal biler på denne afdeling
        employees: 12,
      };

      if (!afdeling) {
        return res.status(404).json({ error: "Afdeling ikke fundet" });
      }

      res.json(afdeling);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved hentning af afdeling" });
    }
  },

  // POST /afdelinger - Opret ny afdeling
  createAfdeling: (req: Request, res: Response) => {
    try {
      const { name, address, phone, email, manager, openingHours, region } = req.body;

      if (!name || !address || !phone) {
        return res.status(400).json({ error: "Navn, adresse og telefon er påkrævet" });
      }

      // TODO: Implementer database logik
      const newAfdeling = {
        id: Date.now(), // Temporary ID
        name,
        address,
        phone,
        email: email || "",
        manager: manager || "",
        openingHours: openingHours || "Man-Fre: 9-17",
        region: region || "",
        carCount: 0,
        employees: 0,
      };

      res.status(201).json(newAfdeling);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved oprettelse af afdeling" });
    }
  },

  // PUT /afdelinger/:id - Opdater afdeling
  updateAfdeling: (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { name, address, phone, email, manager, openingHours, region } = req.body;

      // TODO: Implementer database logik
      const updatedAfdeling = {
        id,
        name: name || "Bilbasen København",
        address: address || "Hovedgade 123, 1000 København K",
        phone: phone || "70 10 10 15",
        email: email || "kbh@bilbasen.dk",
        manager: manager || "Lars Nielsen",
        openingHours: openingHours || "Man-Fre: 9-17, Lør: 10-14",
        region: region || "Hovedstaden",
        carCount: 245,
        employees: 12,
      };

      res.json(updatedAfdeling);
    } catch (error) {
      res.status(500).json({ error: "Fejl ved opdatering af afdeling" });
    }
  },

  // DELETE /afdelinger/:id - Slet afdeling
  deleteAfdeling: (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      // TODO: Implementer database logik
      // Check om der er biler tilknyttet afdelingen før sletning
      res.json({ message: `Afdeling med ID ${id} er slettet` });
    } catch (error) {
      res.status(500).json({ error: "Fejl ved sletning af afdeling" });
    }
  },

  // GET /afdelinger/:id/cars - Hent alle biler på en specifik afdeling
  getCarsByAfdeling: (req: Request, res: Response) => {
    try {
      const afdelingId = parseInt(req.params.id);

      // TODO: Implementer database logik
      const cars = [
        {
          id: 1,
          brand: "Audi",
          model: "A4",
          year: 2022,
          price: 450000,
          afdelingId,
        },
        {
          id: 2,
          brand: "BMW",
          model: "320i",
          year: 2021,
          price: 425000,
          afdelingId,
        },
      ];

      res.json({
        afdelingId,
        cars,
        count: cars.length,
      });
    } catch (error) {
      res.status(500).json({ error: "Fejl ved hentning af biler på afdeling" });
    }
  },

  // GET /afdelinger/search - Søg afdelinger efter region eller navn
  searchAfdelinger: (req: Request, res: Response) => {
    try {
      const { region, name } = req.query;

      // TODO: Implementer database søgelogik
      const searchResults = [
        {
          id: 1,
          name: "Bilbasen København",
          region: "Hovedstaden",
          carCount: 245,
        },
      ];

      res.json({
        results: searchResults,
        count: searchResults.length,
        filters: { region, name },
      });
    } catch (error) {
      res.status(500).json({ error: "Fejl ved søgning af afdelinger" });
    }
  },
};
