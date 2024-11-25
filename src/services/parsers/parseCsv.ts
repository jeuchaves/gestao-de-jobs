import Papa from "papaparse";

export const parseCsv = <T>(csvFile: File): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target?.result;
      if (typeof csvData === "string") {
        Papa.parse<T>(csvData, {
          header: true,
          transformHeader: (header) => {
            // Normaliza o cabeçalho removendo caracteres especiais e convertendo para minúsculas
            return header
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "_");
          },
          complete: (results: Papa.ParseResult<T>) => {
            resolve(results.data as T[]);
          },
          error: (error: Error) => {
            reject(error);
          },
        });
      } else {
        reject(new Error("Erro ao ler o arquivo"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Erro ao ler o arquivo"));
    };
    reader.readAsText(csvFile);
  });
};
