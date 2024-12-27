import { format, parse } from "date-fns";
import Papa from "papaparse";
import * as XLSX from "xlsx";

const formatDate = (date: string | number | Date): string => {
  let parsedDate: Date;

  if (typeof date === "string") {
    parsedDate = parse(date, "dd/MM/yyyy", new Date());
  } else if (typeof date === "number") {
    const basedDate = new Date(Date.UTC(1899, 11, 30));
    parsedDate = new Date(basedDate.getTime() + date * 24 * 60 * 60 * 1000);
  } else {
    parsedDate = new Date(date);
  }

  if (isNaN(parsedDate.getTime())) {
    throw new Error("Data inválida");
  }

  return format(parsedDate, "dd/MM/yyyy");
};

const normalizeHeader = (header: string): string => {
  return header
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "_");
};

const processCsvData = <T extends object>(
  data: string,
  transformHeader: (header: string) => string,
): T[] => {
  const result = Papa.parse<T>(data, {
    header: true,
    transformHeader,
    skipEmptyLines: true,
  });
  return result.data.map((item: T) => {
    if ("prazo" in item && item.prazo) {
      (item as { prazo: string | number | Date }).prazo = formatDate(
        (item as { prazo: string | number | Date }).prazo,
      );
    }
    return item;
  });
};

const processXlsxData = <T extends object>(
  data: ArrayBuffer,
  transformHeader: (header: string) => string,
): T[] => {
  const workbook = XLSX.read(data, { type: "array" });
  const sheetName = workbook.SheetNames[0]; // Primeira aba
  const worksheet = workbook.Sheets[sheetName];

  // Converte os dados para JSON bruto
  const rawData: (string | number | boolean)[][] = XLSX.utils.sheet_to_json(
    worksheet,
    { header: 1 },
  );

  // Processa cabeçalhos e linhas
  const headers = rawData[0].map((value) =>
    transformHeader(String(value)),
  ) as string[];
  const rows = rawData.slice(1);

  // Mapear usando headers ou transformar diretamente com mapXlsxData
  const transformedData = rows
    .map((row: (string | number | boolean)[]) => {
      const obj: Record<string, unknown> = {};
      headers.forEach((header, index) => {
        let value = row[index];
        if (header === "prazo" && typeof value !== "boolean" && value) {
          value = formatDate(value);
        }
        if (value !== undefined && value !== null && value !== "") {
          obj[header] = value;
        }
      });
      // Retorna o objeto apenas se contiver propriedades
      return Object.keys(obj).length > 0 ? obj : null;
    })
    .filter((obj) => obj !== null); // Remove os valores null do array

  return transformedData as T[];
};

export const parseFile = async <T extends object>(file: File): Promise<T[]> => {
  const transformHeader = normalizeHeader;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target?.result;

      try {
        if (file.type === "text/csv" && typeof data === "string") {
          resolve(processCsvData<T>(data, transformHeader));
        } else if (
          (file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            file.type === "application/vnd.ms-excel") &&
          data instanceof ArrayBuffer
        ) {
          resolve(processXlsxData<T>(data, transformHeader));
        } else {
          reject(new Error("Formato de arquivo não suportado"));
        }
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error("Erro ao ler o arquivo"));

    if (file.type === "text/csv") {
      reader.readAsText(file);
    } else if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel"
    ) {
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error("Formato de arquivo não suportado"));
    }
  });
};
