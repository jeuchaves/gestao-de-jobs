/**
 * @constant
 * @name jobComplexity
 * @type {Record<string, string>}
 * @description Mapeia os níveis de complexidade de um trabalho.
 *
 * @example
 * ```typescript
 * import { jobComplexity } from './utils/recordUtils';
 *
 * console.log(jobComplexity['simple']); // Saída: "Simples"
 * console.log(jobComplexity['regular']); // Saída: "Regular"
 * console.log(jobComplexity['complex']); // Saída: "Complexo"
 * ```
 */
export const jobComplexity: Record<string, string> = {
  simple: "Simples",
  regular: "Regular",
  complex: "Complexo",
};
