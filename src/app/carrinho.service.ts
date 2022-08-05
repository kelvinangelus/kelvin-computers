import { Injectable } from '@angular/core';
import { IProdutoCarrinho, produtos } from './produtos';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  itens: IProdutoCarrinho[] = [];

  constructor() { }

  obtemCarrinho(){
    //Retorna uma string referente ao carrinho armazenado no localStorage do navegador. Para converter em um 
    //objeto, utiliza-se o JSON.parse(). getItem() atribui um vetor de string vazio caso não consiga pegar o 
    //valor no local storage cuja chave é 'carrinho'
    this.itens = JSON.parse(localStorage.getItem("carrinho") || "[]"); 
    return this.itens;
  }

  /*adicionarAoCarrinho(produto: IProdutoCarrinho){
    this.itens.push(produto);
    //setItem() define o nome da chave, neste caso 'carrinho'
    localStorage.setItem("carrinho", JSON.stringify(this.itens)); //Salva o carrinho no localstorage
                                                                  //do navegador
  }*/

  adicionarAoCarrinho(produto: IProdutoCarrinho){
    const indice = this.itens.findIndex(prod => prod.id === produto.id);
    if (indice !== -1){
      this.itens[indice].quantidade +=  produto.quantidade;
    }else{
      this.itens.push(produto);
    }
    //console.log(this.itens);
    //setItem() define o nome da chave, neste caso 'carrinho'
    localStorage.setItem("carrinho", JSON.stringify(this.itens)); //Salva o carrinho no localstorage
                                                                  //do navegador
  }

  SalvarLocalStorage(produtos: IProdutoCarrinho[]){
    localStorage.setItem("carrinho", JSON.stringify(produtos));
  }

  removerProdutoCarrinho(produtoId: number){
    this.itens = this.itens.filter(item => item.id !== produtoId);
    localStorage.setItem("carrinho", JSON.stringify(this.itens));
  }

  limparCarrinho(){
    this.itens = [];
    localStorage.clear();
  }

}
