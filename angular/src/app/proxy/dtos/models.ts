import type { EntityDto } from '../abp/application/services/dto/models';

export interface CreateUpdateCartDTO extends EntityDto<number> {
  lastAddDate?: string;
}

export interface GetProductList {
  size: number;
  page: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}

export interface ProductCartDTo {
  cartId: number;
  productId: number;
  quantity: number;
  productName?: string;
  productPrice: number;
  productAvailableQuantity: number;
  date?: string;
}

export interface ProductDTO {
  id?: number;
  name: string;
  description?: string;
  title: string;
  price: number;
  quantityInStock: number;
}
