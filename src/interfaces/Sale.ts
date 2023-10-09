export interface Sale {
  id: string;
  date_sale: string;
  price_sale: number;
  person: Person2;
  user: User;
  oders: Orders[];
}

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
  date_sale: Date;
  price_sale: number;
  id_client?: string;
  id_user: string;
  productsSale: Products[];
}
interface Products{
  id: string;
  amount_product: number;
}

export interface ProductBuySale {
  id: string;
  amount_product: number;
  product: Product;
  unit_price: number;
  productSearch: string;
}