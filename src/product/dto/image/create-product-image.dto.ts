import { IsOptional, IsString } from "class-validator";
import { Product } from "src/product/entities/product.entity";

export class CreateProductImageDto{  
    @IsString()
    url: string;

    @IsString()
    metadata: Record<string, any>;
    
    @IsString()
    rank: number;
    
    @IsOptional()
    @IsString()
    product: Product;

}