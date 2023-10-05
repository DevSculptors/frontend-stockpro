export interface Inventory {
  id: string;
  date_purchase: string;
  user: User;
  person: Person2;
  purchase_detail: Purchasedetail[];
}

export interface Purchasedetail {
  id: string;
  quantity: string;
  due_date: string;
  purchase_unit_price: string;
  product: Product;
}

interface Product {
  id: string;
  name_product: string;
  description: string;
  measure_unit: string;
  sale_price: string;
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