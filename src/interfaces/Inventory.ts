//Crear Inventary
export interface InventoryCreate {
  date_purchase?: Date;
  person_id?: string;
  user_id: string;
  purchase_detail: PurchasedetailCreate[];
}

export interface PurchasedetailCreate {
  quantity: number;
  due_date: Date;
  purchase_unit_price: number;
  product_id: string;
}

// Modal de compra de inventario
export interface ProductBuyInventory {
  id: string;
  quantity: number;
  due_date: Date;
  purchase_unit_price: number;
  product: Product;
  productSearch: string;
}


// Get Inventary
export interface Inventory {
  id: string;
  date_purchase: string;
  user: UserInventory;
  person: PersonInventory;
  total_price: number;
  purchase_detail: Purchasedetail[];
}

export interface Purchasedetail {
  quantity: number;
  due_date: string;
  purchase_unit_price: string;
  product: Product;
}

interface UserInventory {
  id: string;
  username: string;
  email: string;
}

interface PersonInventory {
  id: string;
  name: string;
  last_name: string;
}

interface Product {
  id: string;
  name_product: string;
  brand: Brand;
  category: Brand;
}

interface Brand {
  id: string;
  name: string;
}
