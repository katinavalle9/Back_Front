import mongoose from "mongoose";

const catEnum = [
  "Electrónica",
  "Ropa",
  "Accesorios",
  "Hogar y Cocina",
  "Juguetes y Juegos",
  "Libros",
  "Salud y Belleza",
  "Deportes y Aire Libre",
  "Alimentos y Bebidas",
  "Mascotas",
];

const itemSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, enum: catEnum },
    brand: { type: String, required: true },
    sku: { type: String, required: true },
    image: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
