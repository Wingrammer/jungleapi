// src/order/order-status.enum.ts

export enum OrderStatus {
  PENDING = 'pending',       // La commande est créée mais pas encore payée
  CONFIRMED = 'confirmed',   // La commande est confirmée après paiement
  SHIPPED = 'shipped',       // La commande est expédiée
  DELIVERED = 'delivered',   // La commande est livrée
  CANCELED = 'canceled',     // La commande est annulée
  RETURNED = 'returned',     // La commande est retournée
}
