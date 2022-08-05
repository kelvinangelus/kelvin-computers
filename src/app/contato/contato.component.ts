import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  constructor(
    private fb: FormBuilder //Agrupa todos os campos que estão presente em um 
                             //formulário e permite fazer validações
  ) { }

  //Cria o grupo que será o formulário
  //As chaves (keys) são os campos do formulário
  formContato = this.fb.group({
    nome: ["", [                //Começar vazio e possuir os validadores de tamanho mínimo 4 e ser obrigatório
      Validators.minLength(4),
      Validators.required
    ]], 
    assunto: ["", [             //Começar vazio e possuir os validadores de tamanho mínimo 10 e ser obrigatório
      Validators.minLength(10),
      Validators.required
    ] ],
    telefone: ["", [
      Validators.minLength(11),
      Validators.required
    ]],
    email: ["", [
      Validators.email,
      Validators.required  
    ]],
    mensagem: ["", [
      Validators.minLength(20),
      Validators.required
    ]]  
  }) 

  ngOnInit(): void {
  
  }

  enviarFormulario(){
    alert("A mensagem foi enviada!")
    this.formContato.reset();
  }

}
