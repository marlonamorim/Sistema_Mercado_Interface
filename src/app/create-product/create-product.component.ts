import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../shared/models/product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product: Product = new Product();
  id: string;
  private sub: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      if(this.id && this.id !== "0") {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json; charset=utf-8');

        this.http
          .get(`http://localhost:54861/api/produtos/${this.id}`, { headers: headers })
          .toPromise()
          .then((dados: any) => {
            if(dados) {
            this.product.name = dados.nome;
            this.product.codigoBarras = dados.codigoBarras;
            this.product.price = dados.preco;
            this.product.image = dados.imagem;
          }
            else {
              alert('Produto não encontrado.');
            }
          })
          .catch(error => console.log(error));
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async onSubmit(f: NgForm) {

    let Produto = {
      "Nome": this.product.name,
      "CodigoBarras": this.product.codigoBarras,
      "Preco": this.product.price,
      "Imagem": this.product.image
    };

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');

    let verb = this.id && this.id !== "0" ? this.http.put('http://localhost:54861/api/produtos', Produto, { headers: headers }) : this.http.post('http://localhost:54861/api/produtos', Produto, { headers: headers });
    await verb
      .toPromise()
      .then((dados: any) => {
        if(dados.sucesso) {
          alert(`Produto ${this.id && this.id !== "0" ? 'alterado' : 'cadastrado'} com sucesso!`);

          if(this.id && this.id === "0") {
            f.reset();
            this.product.image = '';
          }
        }
        else {
          alert(`\n${dados.inconsistencias}`);
        }
      })
      .catch(error => console.log(error));
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.product.image = 'data:image/png;base64,' + btoa(e.target.result);
  }

}
