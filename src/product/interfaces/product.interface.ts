import { Document } from 'mongoose';

export interface Product extends Document {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly stock: number;
  readonly category: string;
}
