import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { ProductStatus } from "../product-enum";
import { request } from "http";

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({required:true})  // Le champ images sera un tableau de chaînes de caractères
  imageUrl: String;

  @Prop({ required: true })
  price: number;

 
  // Chaque produit contient un tableau de variantes
  @Prop([{
    size: { type: String, require: false },
    color: { type: String , require: false},
    price: { type: Number, required: false },
    stock: { type: Number, default: 0 },
  }])
  variants: {
    size?: string;
    color?: string;
    price: number;
    stock: number;
  }[];

  @Prop({ type: Types.ObjectId, ref: 'Store', required: true })
  storeId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
