import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { GetProductList, ProductCartDTo, ProductDTO } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class ProductRepoService {
  apiName = 'Default';
  

  addProduct = (product: ProductDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/product-repo/product',
      body: product,
    },
    { apiName: this.apiName,...config });
  

  addProductToCartByEmailAndProductID = (Email: string, ProductID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, number>({
      method: 'POST',
      url: '/api/app/product-repo/product-to-cart',
      params: { email: Email, productID: ProductID },
    },
    { apiName: this.apiName,...config });
  

  deleteProduct = (ID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/product-repo/product',
      params: { id: ID },
    },
    { apiName: this.apiName,...config });
  

  deleteProductFromCartByEmailAndProductID = (Email: string, ProductID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/product-repo/product-from-cart',
      params: { email: Email, productID: ProductID },
    },
    { apiName: this.apiName,...config });
  

  getAll = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductDTO[]>({
      method: 'GET',
      url: '/api/app/product-repo',
    },
    { apiName: this.apiName,...config });
  

  getPaginatedListByInput = (input: GetProductList, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ProductDTO>>({
      method: 'GET',
      url: '/api/app/product-repo/paginated-list',
      params: { size: input.size, page: input.page, sortBy: input.sortBy, sortOrder: input.sortOrder, search: input.search },
    },
    { apiName: this.apiName,...config });
  

  getProductByIDByID = (ID: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductDTO>({
      method: 'GET',
      url: '/api/app/product-repo/product-by-iD',
      params: { id: ID },
    },
    { apiName: this.apiName,...config });
  

  getProductsOfCartByEmail = (Email: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductCartDTo[]>({
      method: 'GET',
      url: '/api/app/product-repo/products-of-cart',
      params: { email: Email },
    },
    { apiName: this.apiName,...config });
  

  upadteProductinCartByProductCart = (productCart: ProductCartDTo[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/product-repo/upadte-productin-cart',
      body: productCart,
    },
    { apiName: this.apiName,...config });
  

  updateProduct = (product: ProductDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/app/product-repo/product',
      body: product,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
