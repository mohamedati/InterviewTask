import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateCartDTO } from '../dtos/models';

@Injectable({
  providedIn: 'root',
})
export class CartRepoService {
  apiName = 'Default';
  

  create = (input: CreateUpdateCartDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/cart-repo',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/cart-repo/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getCartProductsCountByEmail = (Email: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, number>({
      method: 'GET',
      url: '/api/app/cart-repo/cart-products-count',
      params: { email: Email },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateCartDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/cart-repo/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
