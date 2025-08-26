import { Expose, Type } from 'class-transformer';
import { Address } from '../entities/address.entity';
import { LineItem } from '../entities/line-item.entity';
import { CreditLine } from '../entities/credit-line.entity';
import { ShippingMethod } from '../entities/shipping-method.entity';

export class CartDTO {
  @Expose()
  id: string;

  @Expose()
  region_id: string;

  @Expose()
  sales_channel_id: string;

  @Expose()
  email: string;

  @Expose()
  currency_code: string;

  @Expose()
  metadata: Record<string, any>;

  @Expose()
  completed_at: Date;

  @Expose()
  @Type(() => Address)
  shipping_address: Address;

  @Expose()
  @Type(() => Address)
  billing_address: Address;

  @Expose()
  @Type(() => LineItem)
  items: LineItem[];

  @Expose()
  @Type(() => CreditLine)
  credit_lines: CreditLine[];

  @Expose()
  @Type(() => ShippingMethod)
  shipping_methods: ShippingMethod[];

  @Expose()
  deleted_at: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

    @Expose()
  subtotal: number;

  @Expose()
  total: number;

  @Expose()
  tax_total: number;

  @Expose()
  discount_total: number;

  @Expose()
  shipping_total: number;

}
