import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse/sync';
import * as fs from 'fs';

const prisma = new PrismaClient();

interface CSVRow {
  artiId: string;
  artiNombre: string;  // We'll read this but won't store it
  fechaMesIni: string;
  fuenId: string;
  fuenNombre: string;  // We'll read this but won't store it
  futiId: string;
  maximoKg: string;
  minimoKg: string;
  promedioKg: string;
}

interface ProcessedRow {
  artiId: number;
  fechaMesIni: Date;
  fuenId: number;
  futiId: number;
  maximoKg: number;
  minimoKg: number;
  promedioKg: number;
}

async function validateForeignKeys(rows: ProcessedRow[]) {
  // Get unique artiIds and fuenIds from the CSV
  const artiIds = [...new Set(rows.map(row => row.artiId))];
  const fuenIds = [...new Set(rows.map(row => row.fuenId))];

  // Check if all productos exist
  const productos = await prisma.producto.findMany({
    where: {
      artiId: {
        in: artiIds
      }
    },
    select: {
      artiId: true
    }
  });

  const existingArtiIds = new Set(productos.map((p: { artiId: number }) => p.artiId));
  const missingArtiIds = artiIds.filter(id => !existingArtiIds.has(id));

  if (missingArtiIds.length > 0) {
    throw new Error(`Missing productos with artiIds: ${missingArtiIds.join(', ')}`);
  }

  // Check if all mercados exist
  const mercados = await prisma.mercado.findMany({
    where: {
      fuenId: {
        in: fuenIds
      }
    },
    select: {
      fuenId: true
    }
  });

  const existingFuenIds = new Set(mercados.map((m: { fuenId: number }) => m.fuenId));
  const missingFuenIds = fuenIds.filter(id => !existingFuenIds.has(id));

  if (missingFuenIds.length > 0) {
    throw new Error(`Missing mercados with fuenIds: ${missingFuenIds.join(', ')}`);
  }
}

async function uploadMonthlyPriceObservations(filePath: string) {
  try {
    // Read and parse CSV file
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    }) as CSVRow[];

    // Process and validate data types
    const processedRows: ProcessedRow[] = records.map(row => ({
      artiId: parseInt(row.artiId),
      fechaMesIni: new Date(row.fechaMesIni),
      fuenId: parseInt(row.fuenId),
      futiId: parseInt(row.futiId),
      maximoKg: parseFloat(row.maximoKg),
      minimoKg: parseFloat(row.minimoKg),
      promedioKg: parseFloat(row.promedioKg)
    }));

    // Log first 5 rows for debugging
    console.log('First 5 rows of processed data:');
    console.log(JSON.stringify(processedRows.slice(0, 5), null, 2));

    // Validate foreign keys
    await validateForeignKeys(processedRows);

    // Upload data in batches
    const batchSize = 100;
    for (let i = 0; i < processedRows.length; i += batchSize) {
      const batch = processedRows.slice(i, i + batchSize);
      await prisma.monthlyPriceObservation.createMany({
        data: batch,
        skipDuplicates: true // Skip if combination of artiId, fuenId, and fechaMesIni already exists
      });
      console.log(`Processed batch ${Math.floor(i / batchSize) + 1}`);
    }

    console.log('Upload completed successfully');
  } catch (error) {
    console.error('Error during upload:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Usage
const filePath = process.argv[2];
if (!filePath) {
  console.error('Please provide the CSV file path as an argument');
  process.exit(1);
}

uploadMonthlyPriceObservations(filePath)
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
  