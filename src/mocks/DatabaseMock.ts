import { Type } from "@google/genai";

export const products: {
  name: string;
  stock: number;
}[] = [
  { name: "Feijão", stock: 10 },
  { name: "Arroz", stock: 5 },
  { name: "Macarrão", stock: 0 },
  { name: "Óleo", stock: 2 },
  { name: "Açúcar", stock: 1 },
  { name: "Sal", stock: 0 },
  { name: "Farinha", stock: 3 },
  { name: "Café", stock: 4 },
  { name: "Leite", stock: 0 },
  { name: "Iogurte Grego", stock: 0 },
  { name: "Queijo Manteiga", stock: 5 },
  { name: "Presunto", stock: 10 },
  { name: "Aveia", stock: 10 },
  { name: "Maçã", stock: 10 },
  { name: "Banana", stock: 10 },
];

// Define a function that the model can call to control smart lights
export const hasStockFunctionDeclaration = {
  name: "has_stock",
  description: "Lista os produtos que estao em estoque",
};

export const emptyStockFunctionDeclaration = {
  name: "empty_stock",
  description: "Lista os produtos que estao em falta(sem estoque)",
};

/**

*   List products by stock > 0. (mock API)
*   @return {Object} A dictionary containing name and stock.
*/
export const hasStock = () => {
  return products.filter((product) => {
    return product.stock > 0;
  });
};

/**

*   List products without stock. (mock API)
*   @return {Object} A dictionary containing name and stock.
*/
export const emptyStock = () => {
  return products.filter((product) => {
    return product.stock === 0;
  });
};
