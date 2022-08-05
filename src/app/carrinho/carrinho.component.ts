import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { IProdutoCarrinho } from '../produtos';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  itensCarrinho: IProdutoCarrinho[] = [];
  total = 0;
  indice = 0;

  constructor(
    public carrinhoService: CarrinhoService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obtemCarrinho();
    this.calculaTotal();
  }

   calculaTotal(){
    //this.carrinhoService.SalvarLocalStorage();
    this.total = this.itensCarrinho.reduce((prev, curr) => prev + (curr.preco * curr.quantidade), 0);
  } //Na primeira chamada, previousValue = initialValue. A cada chamada da callbackFn, currentValue 
    //recebe o valor de um elemento do array em sequência e após o cálculo feito pela callbackFn, o valor 
    //acumulado é salvo em previousValue para ser usado na próxima chamada. 

    /*
  AtualizaQuantidade(id: number, quantidade: number){
    this.itensCarrinho[id].quantidade = quantidade;
    this.carrinhoService.SalvarLocalStorage();
    //this.calculaTotal();
  }*/
 
  removerProdutoCarrinho(produtoId: number){
    this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== produtoId); //Atualiza lista para o template
    this.carrinhoService.removerProdutoCarrinho(produtoId); //Remove o produto do localstorage do navegador
    this.calculaTotal();
  }

  comprar(){
    alert("Parabéns, você finalizou a sua compra!");
    this.carrinhoService.limparCarrinho();
    this.router.navigate(["produtos"]);
  }

}
