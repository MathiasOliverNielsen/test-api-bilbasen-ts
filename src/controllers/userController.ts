import { Request, Response } from "express";
import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";

// GET /users - Hent alle users
export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true,
        isActive: true,
        // Exclude password from response for security
      },
    });
    res.json(data);
    console.log("userController - Alle brugere hentet");
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke hente liste af brugere");
  }
};

// GET /users/:id - Hent specifik user
export const getRecord = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true,
        isActive: true,
        // Exclude password from response for security
      },
    });

    if (!data) {
      return res.status(404).json({ error: "Bruger ikke fundet" });
    }

    res.json(data);
    console.log(`Bruger ${id} detaljer besøgt`);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke hente bruger");
  }
};

// POST /users - Opret user
export const createRecord = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password, role, isActive } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: "Fornavn, efternavn, email og password er påkrævet" });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const data = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role: role || "USER",
        isActive: Boolean(isActive ?? true),
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true,
        isActive: true,
        // Exclude password from response
      },
    });

    res.status(201).json(data);
    console.log("Ny bruger oprettet:", data.email);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke oprette bruger");
  }
};

// PUT /users/:id - Opdater user
export const updateRecord = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { firstname, lastname, email, password, role, isActive } = req.body;

    // Prepare update data
    const updateData: any = {
      firstname,
      lastname,
      email,
      role,
      isActive: isActive !== undefined ? Boolean(isActive) : undefined,
    };

    // Only hash password if it's being updated
    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Remove undefined values
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const data = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true,
        isActive: true,
        // Exclude password from response
      },
    });

    res.json(data);
    console.log(`Bruger ${id} opdateret`);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke opdatere bruger");
  }
};

// DELETE /users/:id - Slet user
export const deleteRecord = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.user.delete({
      where: { id },
    });

    res.json({ message: `Bruger med ID ${id} er slettet` });
    console.log(`Bruger ${id} slettet`);
  } catch (error) {
    console.error(error);
    res.status(500).send("DB Fejl: Kunne ikke slette bruger");
  }
};
