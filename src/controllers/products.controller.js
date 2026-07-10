import {
  getAllProducts as getAllProductsModel,
  getProductById as getProductByIdModel,
  createProduct as createProductModel,
  deleteProduct as deleteProductModel,
} from "../models/products.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsModel();
    return res.json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Id invalido" });
  }

  try {
    const product = await getProductByIdModel(id);

    if (product) {
      return res.json(product);
    }

    return res.status(404).json({ message: "Producto no encontrado" });
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, stock } = req.body;

  if (!name || price === undefined || stock === undefined) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  if (Number.isNaN(Number(price)) || Number.isNaN(Number(stock))) {
    return res.status(400).json({ message: "Precio o stock inválidos" });
  }

  try {
    const newProduct = await createProductModel({
      name: name.trim(),
      price: Number(price),
      stock: Number(stock),
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Id invalido" });
  }

  try {
    const existingProduct = await getProductByIdModel(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await deleteProductModel(id);
    return res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
