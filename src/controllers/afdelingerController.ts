import { Request, Response } from "express";
// import { prisma } from "../prisma.js"

// GET /afdelinger - Alle afdelinger
export const getRecords = (req: Request, res: Response) => {
  try {
    res.send("Find vores afdelinger i hele Danmark");
    console.log("Afdelinger hovedside besøgt");
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke hente liste af afdelinger");
  }
};

// GET /afdelinger/:id - Specifik afdeling
export const getRecord = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    res.send(`Afdeling detaljer for afdeling ${id}`);
    console.log(`Afdeling ${id} detaljer besøgt`);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke hente afdeling");
  }
};

// POST /afdelinger - Opret afdeling
export const createRecord = (req: Request, res: Response) => {
  try {
    // TODO: Implementer database logik
    res.send("Ny afdeling oprettet");
    console.log("Ny afdeling oprettet");
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke oprette afdeling");
  }
};

// PUT /afdelinger/:id - Opdater afdeling
export const updateRecord = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    res.send(`Afdeling ${id} opdateret`);
    console.log(`Afdeling ${id} opdateret`);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke opdatere afdeling");
  }
};

// DELETE /afdelinger/:id - Slet afdeling
export const deleteRecord = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    res.send(`Afdeling ${id} slettet`);
    console.log(`Afdeling ${id} slettet`);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke slette afdeling");
  }
};

// GET /afdelinger/jylland - Jylland afdelinger
export const getJylland = (req: Request, res: Response) => {
  try {
    res.send("Bilbasen afdelinger i Jylland");
    console.log("Jylland afdelinger besøgt");
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke hente Jylland afdelinger");
  }
};

// GET /afdelinger/jylland/cars - Alle biler i Jylland
export const getJyllandCars = (req: Request, res: Response) => {
  try {
    res.send("Alle biler til salg i Jylland");
    console.log("Jylland biler liste besøgt");
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke hente Jylland biler");
  }
};

// GET /afdelinger/jylland/cars/:id - Specifik bil i Jylland
export const getJyllandCarById = (req: Request, res: Response) => {
  try {
    const carId = req.params.id;
    res.send(`Bil detaljer for bil ${carId} i Jylland`);
    console.log(`Jylland bil ${carId} detaljer besøgt`);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke hente bil fra Jylland");
  }
};

// GET /afdelinger/fyn - Fyn afdelinger
export const getFyn = (req: Request, res: Response) => {
  try {
    res.send("Bilbasen afdelinger på Fyn");
    console.log("Fyn afdelinger besøgt");
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke hente Fyn afdelinger");
  }
};

// GET /afdelinger/fyn/cars - Alle biler på Fyn
export const getFynCars = (req: Request, res: Response) => {
  try {
    res.send("Alle biler til salg på Fyn");
    console.log("Fyn biler liste besøgt");
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke hente Fyn biler");
  }
};

// GET /afdelinger/fyn/cars/:id - Specifik bil på Fyn
export const getFynCarById = (req: Request, res: Response) => {
  try {
    const carId = req.params.id;
    res.send(`Bil detaljer for bil ${carId} på Fyn`);
    console.log(`Fyn bil ${carId} detaljer besøgt`);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke hente bil fra Fyn");
  }
};

// GET /afdelinger/sjaelland - Sjælland afdelinger
export const getSjaelland = (req: Request, res: Response) => {
  try {
    res.send("Bilbasen afdelinger på Sjælland");
    console.log("Sjælland afdelinger besøgt");
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke hente Sjælland afdelinger");
  }
};

// GET /afdelinger/sjaelland/cars - Alle biler på Sjælland
export const getSjaellandCars = (req: Request, res: Response) => {
  try {
    res.send("Alle biler til salg på Sjælland");
    console.log("Sjælland biler liste besøgt");
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke hente Sjælland biler");
  }
};

// GET /afdelinger/sjaelland/cars/:id - Specifik bil på Sjælland
export const getSjaellandCarById = (req: Request, res: Response) => {
  try {
    const carId = req.params.id;
    res.send(`Bil detaljer for bil ${carId} på Sjælland`);
    console.log(`Sjælland bil ${carId} detaljer besøgt`);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke hente bil fra Sjælland");
  }
};
