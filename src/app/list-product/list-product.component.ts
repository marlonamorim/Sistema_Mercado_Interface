import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Product } from '../shared/models/product';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  products: Product[] = [];

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');

    await this.http
      .get('http://localhost:54861/api/produtos', { headers: headers })
      .toPromise()
      .then((dados: any) => {

          dados.forEach(item => {
            let product = new Product();

            product.name = item.nome;
            product.price = item.preco;
            product.codigoBarras = item.codigoBarras;
            product.image = item.imagem;

            this.products.push(product);
          });
      })
      .catch(error => alert('Erro ao carregar os produtos'));
  }

  formatPriceInStringMoney(price: Number) {
    return price && price > 0 ? `R$ ${price.toFixed(2).replace('.',',').toString()}` : ''
  }

  async deleteProduct(codigoBarras: string) {

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');

    await this.http
      .delete(`http://localhost:54861/api/produtos/${codigoBarras}`, { headers: headers })
      .toPromise()
      .then((dados: any) => {
        if(dados.sucesso) {
          alert('Produto excluído com sucesso!');

          let product = this.products.filter(c => c.codigoBarras === codigoBarras)[0];
          let index: number = this.products.indexOf(product);
          if (index !== -1) {
              this.products.splice(index, 1);
          }
        }
        else
          alert(`\n${dados.inconsistencias}`);
      })
      .catch(error => alert('Erro ao excluir o produto'));
  }

}
