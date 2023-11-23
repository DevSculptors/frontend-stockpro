export interface Sale {
  id: string;
  date_sale: string;
  price_sale: number;
  person: Person2;
  user: User;
  oders: Orders[];
  turn: Turn;
}
export interface SaleTurn {
  id: string;
  date_sale: string;
  price_sale: number;
  oders: Orders[];
}
export interface Turn {
  id: string;
  date_time_start: Date;
  base_cash: number;
  date_time_end: Date;
  final_cash: number;
  is_active: boolean;
  user: UserTurn;
}
export interface UserTurn{
  id: string;
  username: string;
  email: string;
  roleUser: string;
};
export interface Orders {
  id: string;
  price: string;
  amount_product: string;
  product: Product;
}

interface Product {
  id: string;
  name_product: string;
  description: string;
  measure_unit: string;
  sale_price: number;
  stock: string;
  brand: Brand;
  category: Brand;
}

interface Brand {
  id: string;
  name: string;
}

interface Person2 {
  id: string;
  name: string;
  last_name: string;
  phone: string;
  email: string;
  id_document: string;
  type_document: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  isActive: string;
  person: Person;
  roleUser: string;
}

interface Person {
  id: string;
  name: string;
  last_name: string;
  phone: string;
  id_document: string;
  type_document: string;
}

export interface SaleCreate {
  date_sale?: Date;
  price_sale: number;
  id_client?: string;
  id_user: string;
  id_turn: string;
  products: ProductsSale[];
}
interface ProductsSale{
  id: string;
  amount_product: number;
}

export interface ProductDetailSale {
  id: string;
  amount_product: number;
  product: Product;
  unit_price: number;
  productSearch: string;
}