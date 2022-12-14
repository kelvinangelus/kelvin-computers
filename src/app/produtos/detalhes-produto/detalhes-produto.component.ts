import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from 'src/app/carrinho.service';
import { NotificacaoService } from 'src/app/notificacao.service';
import { IProduto, IProdutoCarrinho } from 'src/app/produtos';
import { ProdutosService } from 'src/app/produtos.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {

  produto: IProduto | undefined;
  quantidade = 1;
  //produtoId = 0;

  constructor(
    private productService: ProdutosService,
    private route: ActivatedRoute,
    private notificacaoService: NotificacaoService,
    private carrinhoService: CarrinhoService
    ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const produtoId = Number(routeParams.get("id"));
    /*this.route.params.subscribe(
      (params: any) => {
        this.produtoId = Number(params['id']);
      }
    )*/
    this.produto = this.productService.getOne(produtoId);
  }

  adicionarAoCarrinho(){
    this.notificacaoService.notificar("O produto foi adicionado ao carrinho");
    const produto: IProdutoCarrinho = {
      ...this.produto!, //... tudo que existe em this.produto. ! o valor na propriedade existe.
      quantidade: this.quantidade, 
    }
    this.carrinhoService.adicionarAoCarrinho(produto);
  }

}
