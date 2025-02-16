import { PrismaClient } from '@prisma/client';
import * as fs from 'fs/promises';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

const BASE_PATH = '/Users/ethankallett/Documents/Projects/AgroAmigo_DataScraping/ServicioWeb/csv/upload_tables';

const prisma = new PrismaClient();

interface DepartamentoRow {
  Departamento: string;
  ID: string;
}

interface MunicipioRow {
  Departamento: string;
  CodDepartamento: string;
  Municipio: string;
  CodMunicipio: string;
}

interface MercadoRow {
  Departamento: string;
  CodDepartamento: string;
  Municipio: string;
  CodMunicipio: string;
  fuenId: string;
  futId: string;
  Mercado: string;
}

interface MajorCategoryRow {
  MajorCategory: string;
  id: string;
}

interface SubCategoryRow {
  SubCategory: string;
  id: string;
  MajorCategory_Id: string;
}

interface ProductoRow {
  artiId: string;
  artiNombre: string;
  keystring: string;
  MajorCategory_Id: string;
  SubCategory_Id: string;
}

async function readCsvFile<T>(filename: string): Promise<T[]> {
  const fileContent = await fs.readFile(path.join(BASE_PATH, filename), 'utf-8');
  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });
}

async function createDepartamentos(data: DepartamentoRow[]) {
  console.log('\n=== Creating Departamentos ===');
  console.log('Raw data sample (first 5 rows):', JSON.stringify(data.slice(0, 5), null, 2));
  
  const transformedData = data.map(row => {
    const values = Object.values(row);
    return {
      idDivipola: parseInt(values[1]),  // ID is at index 1
      nombre: values[0]                 // Departamento is at index 0
    };
  });
  
  console.log('\nTransformed data sample (first 5 rows):', JSON.stringify(transformedData.slice(0, 5), null, 2));
  
  await prisma.departamento.createMany({
    data: transformedData,
    skipDuplicates: true,
  });
}

async function createMunicipios(data: MunicipioRow[]) {
  console.log('\n=== Creating Municipios ===');
  console.log('Raw data sample (first 5 rows):', JSON.stringify(data.slice(0, 5), null, 2));
  
  const transformedData = data.map(row => ({
    idDivipola: parseInt(row.CodMunicipio),
    nombre: row.Municipio,
    departamentoId: parseInt(row.CodDepartamento)
  }));
  
  console.log('\nTransformed data sample (first 5 rows):', JSON.stringify(transformedData.slice(0, 5), null, 2));
  
  await prisma.municipio.createMany({
    data: transformedData,
    skipDuplicates: true,
  });
}

async function createMercados(data: MercadoRow[]) {
  console.log('\n=== Creating Mercados ===');
  console.log('Raw data sample (first 5 rows):', JSON.stringify(data.slice(0, 5), null, 2));

  const transformedData = data.map(row => ({
    nombre: row.Mercado,
    fuenId: parseInt(row.fuenId),
    futId: parseInt(row.futId),
    municipioId: parseInt(row.CodMunicipio),
    departamentoId: parseInt(row.CodDepartamento)
  }));

  console.log('\nTransformed data sample (first 5 rows):', JSON.stringify(transformedData.slice(0, 5), null, 2));

  for (const mercado of transformedData) {
    try {
      await prisma.mercado.create({
        data: mercado
      });
    } catch (error) {
      console.error('Error creating mercado:', mercado);
      throw error;
    }
  }
}

async function createMajorCategories(data: MajorCategoryRow[]) {
  console.log('\n=== Creating Major Categories ===');
  console.log('Raw data sample (first 5 rows):', JSON.stringify(data.slice(0, 5), null, 2));
  
  const transformedData = data.map(row => ({
    id: parseInt(row.id),
    name: Object.values(row)[0]
  }));
  
  console.log('\nTransformed data sample (first 5 rows):', JSON.stringify(transformedData.slice(0, 5), null, 2));
  
  await prisma.majorCategory.createMany({
    data: transformedData,
    skipDuplicates: true,
  });
}

async function createSubCategories(data: SubCategoryRow[]) {
  console.log('\n=== Creating Sub Categories ===');
  console.log('Raw data sample (first 5 rows):', JSON.stringify(data.slice(0, 5), null, 2));
  
  const transformedData = data.map(row => ({
    id: parseInt(row.id),
    name: Object.values(row)[0],
    majorCategoryId: parseInt(row.MajorCategory_Id)
  }));
  
  console.log('\nTransformed data sample (first 5 rows):', JSON.stringify(transformedData.slice(0, 5), null, 2));
  
  await prisma.subCategory.createMany({
    data: transformedData,
    skipDuplicates: true,
  });
}

async function createProductos(data: ProductoRow[]) {
  console.log('\n=== Creating Productos ===');
  console.log('Raw data sample (first 5 rows):', data.slice(0, 5));
  
  const transformedData = data.map(row => ({
    artiId: parseInt(Object.values(row)[0]),
    nombre: row.artiNombre,
    keystring: row.keystring,
    majorCategoryId: parseInt(row.MajorCategory_Id),
    subCategoryId: parseInt(row.SubCategory_Id)
  }));
  
  // console.log('\nTransformed data sample (first 5 rows):', JSON.stringify(transformedData.slice(0, 5), null, 2));
  
  await prisma.producto.createMany({
    data: transformedData,
    skipDuplicates: true,
  });
}

async function main() {
  try {
    const [
      departamentos,
      municipios,
      mercados,
      majorCategories,
      subCategories,
      productos,
    ] = await Promise.all([
      readCsvFile<DepartamentoRow>('departamento.csv'),
      readCsvFile<MunicipioRow>('municipio.csv'),
      readCsvFile<MercadoRow>('mercado.csv'),
      readCsvFile<MajorCategoryRow>('majorcategory.csv'),
      readCsvFile<SubCategoryRow>('subcategory.csv'),
      readCsvFile<ProductoRow>('producto.csv'),
    ]);

    // await createDepartamentos(departamentos);
    // await createMunicipios(municipios);
    // await createMercados(mercados);
    // await createMajorCategories(majorCategories);
    // await createSubCategories(subCategories);
    await createProductos(productos);

    console.log('\nData upload completed successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });