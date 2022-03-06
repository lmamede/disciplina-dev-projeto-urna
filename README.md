# disciplina-dev-projeto-urna
Projeto de Urna Eletrônica para a Disciplina de Desenvolvimento Web do Curso de Ciência da Computação da UFRJ - 2021.2

## Objetivo
* Criar um banco para votação dos usuários.
* Criar um Backend em php para fazer a conexão com o banco, registrando os votos lá.

## Como Acessar
O site se encontra hospedado em um host gratuito juntamente com o banco de dados. O mesmo código que consta aqui no github é o que foi publicado no site.

O acesso é feito por https://candidatos-urna.000webhostapp.com/

## Rodar o Projeto Localmente
Não é necessário rodar localmente, tudo que consta no site hospedado já representa todo o projeto. Caso se deseje, o projeto pode ser clonado na máquina local, porém a execução dependerá da configuração de um servidor.

## Features
Esse projeto usa como base um outro projeto do github feito por Ivan Filho. Nosso diferencial foi computar os votos do usuário em um banco de dados e disponibilizar um boletim com os votos para cada candidato.

Para emitir o boletim basta clicar em Gerar Boletim e uma relação com o andamento da eleição será disponibilizado.

## Tabelas do Banco

O banco é composto de apenas uma tabela responsável por computar os votos e retorná-los quando requisitados.

![Screenshot_20220306_002947](https://user-images.githubusercontent.com/43480784/156908009-7e8d16cd-5408-4d21-a946-935a6cbf1939.png)


