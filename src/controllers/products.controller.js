
export const getAllProducts = (req, res) => {
  res.json({ message: "Get all products" });
}

export const getProductById = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Producto con Id: ${id}` });
}