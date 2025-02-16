"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var fs = require("fs/promises");
var path = require("path");
var sync_1 = require("csv-parse/sync");
var BASE_PATH = '/Users/ethankallett/Documents/Projects/AgroAmigo_DataScraping/ServicioWeb/csv/upload_tables';
var prisma = new client_1.PrismaClient();
function readCsvFile(filename) {
    return __awaiter(this, void 0, void 0, function () {
        var fileContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.readFile(path.join(BASE_PATH, filename), 'utf-8')];
                case 1:
                    fileContent = _a.sent();
                    return [2 /*return*/, (0, sync_1.parse)(fileContent, {
                            columns: true,
                            skip_empty_lines: true,
                        })];
            }
        });
    });
}
function createDepartamentos(data) {
    return __awaiter(this, void 0, void 0, function () {
        var transformedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('\n=== Creating Departamentos ===');
                    console.log('Raw data sample (first 5 rows):', JSON.stringify(data.slice(0, 5), null, 2));
                    transformedData = data.map(function (row) {
                        var values = Object.values(row);
                        return {
                            idDivipola: parseInt(values[1]), // ID is at index 1
                            nombre: values[0] // Departamento is at index 0
                        };
                    });
                    console.log('\nTransformed data sample (first 5 rows):', JSON.stringify(transformedData.slice(0, 5), null, 2));
                    return [4 /*yield*/, prisma.departamento.createMany({
                            data: transformedData,
                            skipDuplicates: true,
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createMunicipios(data) {
    return __awaiter(this, void 0, void 0, function () {
        var transformedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('\n=== Creating Municipios ===');
                    console.log('Raw data sample (first 5 rows):', JSON.stringify(data.slice(0, 5), null, 2));
                    transformedData = data.map(function (row) { return ({
                        idDivipola: parseInt(row.CodMunicipio),
                        nombre: row.Municipio,
                        departamentoId: parseInt(row.CodDepartamento)
                    }); });
                    console.log('\nTransformed data sample (first 5 rows):', JSON.stringify(transformedData.slice(0, 5), null, 2));
                    return [4 /*yield*/, prisma.municipio.createMany({
                            data: transformedData,
                            skipDuplicates: true,
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createMercados(data) {
    return __awaiter(this, void 0, void 0, function () {
        var transformedData, _i, transformedData_1, mercado, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('\n=== Creating Mercados ===');
                    console.log('Raw data sample (first 5 rows):', JSON.stringify(data.slice(0, 5), null, 2));
                    transformedData = data.map(function (row) { return ({
                        nombre: row.Mercado,
                        fuenId: parseInt(row.fuenId),
                        futId: parseInt(row.futId),
                        municipioId: parseInt(row.CodMunicipio),
                        departamentoId: parseInt(row.CodDepartamento)
                    }); });
                    console.log('\nTransformed data sample (first 5 rows):', JSON.stringify(transformedData.slice(0, 5), null, 2));
                    _i = 0, transformedData_1 = transformedData;
                    _a.label = 1;
                case 1:
                    if (!(_i < transformedData_1.length)) return [3 /*break*/, 6];
                    mercado = transformedData_1[_i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, prisma.mercado.create({
                            data: mercado
                        })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error creating mercado:', mercado);
                    throw error_1;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function createMajorCategories(data) {
    return __awaiter(this, void 0, void 0, function () {
        var transformedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('\n=== Creating Major Categories ===');
                    console.log('Raw data sample (first 5 rows):', JSON.stringify(data.slice(0, 5), null, 2));
                    transformedData = data.map(function (row) { return ({
                        id: parseInt(row.id),
                        name: Object.values(row)[0]
                    }); });
                    console.log('\nTransformed data sample (first 5 rows):', JSON.stringify(transformedData.slice(0, 5), null, 2));
                    return [4 /*yield*/, prisma.majorCategory.createMany({
                            data: transformedData,
                            skipDuplicates: true,
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createSubCategories(data) {
    return __awaiter(this, void 0, void 0, function () {
        var transformedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('\n=== Creating Sub Categories ===');
                    console.log('Raw data sample (first 5 rows):', JSON.stringify(data.slice(0, 5), null, 2));
                    transformedData = data.map(function (row) { return ({
                        id: parseInt(row.id),
                        name: Object.values(row)[0],
                        majorCategoryId: parseInt(row.MajorCategory_Id)
                    }); });
                    console.log('\nTransformed data sample (first 5 rows):', JSON.stringify(transformedData.slice(0, 5), null, 2));
                    return [4 /*yield*/, prisma.subCategory.createMany({
                            data: transformedData,
                            skipDuplicates: true,
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createProductos(data) {
    return __awaiter(this, void 0, void 0, function () {
        var transformedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('\n=== Creating Productos ===');
                    console.log('Raw data sample (first 5 rows):', data.slice(0, 5));
                    transformedData = data.map(function (row) { return ({
                        artiId: parseInt(Object.values(row)[0]),
                        nombre: row.artiNombre,
                        keystring: row.keystring,
                        majorCategoryId: parseInt(row.MajorCategory_Id),
                        subCategoryId: parseInt(row.SubCategory_Id)
                    }); });
                    // console.log('\nTransformed data sample (first 5 rows):', JSON.stringify(transformedData.slice(0, 5), null, 2));
                    return [4 /*yield*/, prisma.producto.createMany({
                            data: transformedData,
                            skipDuplicates: true,
                        })];
                case 1:
                    // console.log('\nTransformed data sample (first 5 rows):', JSON.stringify(transformedData.slice(0, 5), null, 2));
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, departamentos, municipios, mercados, majorCategories, subCategories, productos, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, 4, 6]);
                    return [4 /*yield*/, Promise.all([
                            readCsvFile('departamento.csv'),
                            readCsvFile('municipio.csv'),
                            readCsvFile('mercado.csv'),
                            readCsvFile('majorcategory.csv'),
                            readCsvFile('subcategory.csv'),
                            readCsvFile('producto.csv'),
                        ])];
                case 1:
                    _a = _b.sent(), departamentos = _a[0], municipios = _a[1], mercados = _a[2], majorCategories = _a[3], subCategories = _a[4], productos = _a[5];
                    // await createDepartamentos(departamentos);
                    // await createMunicipios(municipios);
                    // await createMercados(mercados);
                    // await createMajorCategories(majorCategories);
                    // await createSubCategories(subCategories);
                    return [4 /*yield*/, createProductos(productos)];
                case 2:
                    // await createDepartamentos(departamentos);
                    // await createMunicipios(municipios);
                    // await createMercados(mercados);
                    // await createMajorCategories(majorCategories);
                    // await createSubCategories(subCategories);
                    _b.sent();
                    console.log('\nData upload completed successfully!');
                    return [3 /*break*/, 6];
                case 3:
                    error_2 = _b.sent();
                    console.error('An error occurred:', error_2);
                    throw error_2;
                case 4: return [4 /*yield*/, prisma.$disconnect()];
                case 5:
                    _b.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
});
