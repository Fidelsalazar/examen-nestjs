import { Schema } from 'mongoose';

export const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  title: String,
  price: Number,
  stock: Number,
  category: String,
});
