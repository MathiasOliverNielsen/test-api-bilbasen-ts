import path from "path";
import bcrypt from "bcrypt";
import { readdir, readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { parse } from "csv-parse/sync";
import { fieldTypes } from "./types.js";
import { prisma } from "../src/prisma.js";

const models = Object.keys(fieldTypes);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.join(__dirname, "csv");

async function main() {
  console.log("Starting CSV seeding...");

  const csvFiles = (await readdir(dir)).filter((f) => f.endsWith(".csv"));
  console.log("Found CSV files:", csvFiles);

  for (const model of models) {
    const file = `${model}.csv`;
    if (!csvFiles.includes(file)) {
      console.log(`Skipping ${model} - no ${file} found`);
      continue;
    }

    console.log(`Processing ${model} from ${file}...`);

    const raw = parse(await readFile(path.join(dir, file), "utf-8"), {
      columns: true,
      skip_empty_lines: true,
    });

    const data = await Promise.all(raw.map((row: any) => cast(model, row)));

    const result = await (prisma as any)[model].createMany({
      data,
      skipDuplicates: true,
    });

    console.log(`Created ${result.count} ${model} records`);
  }
}

async function cast(model: string, row: any) {
  const types = fieldTypes[model];
  const out: any = {};

  for (const key in row) {
    const val = row[key]?.toString().trim();
    const type = types[key];

    if (key === "password") {
      out[key] = await bcrypt.hash(val, 10);
    } else if (type === "number") {
      out[key] = Number(val);
    } else if (type === "boolean") {
      out[key] = val !== "0";
    } else if (type === "date") {
      out[key] = val ? new Date(val) : null;
    } else {
      out[key] = val ?? null;
    }
  }
  return out;
}

main()
  .then(() => console.log("CSV seeding completed successfully!"))
  .catch((e) => {
    console.error("CSV seeding failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
