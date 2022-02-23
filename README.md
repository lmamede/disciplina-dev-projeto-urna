# disciplina-dev-projeto-urna
Projeto de Urna Eletrônica para a Disciplina de Desenvolvimento Web do Curso de Ciência da Computação da UFRJ - 2021.2

## Dúvidas
* Como deve ser mostrado o resultado da eleição.

## Objetivo
* Criar um banco para votação dos usuários
* A parte em php vai ser para fazer a conexão com o banco, registrando os votos lá

## Definition of Done
* [x] criar uma conta em um site de hospedagem grátis para o db (https://candidatos-urna.000webhostapp.com/)
* [x] levantar o banco
* [ ] popular dados do banco
* [ ] modificar requisição para inserir voto no banco
* [ ] fazer a requisição em php

## Tabelas do Banco

Votação

|  ID  | etapa | numero_candidato | 
|------|-------|------------------|
| 023  |   0   |      15123       |


Candidato
|  ID  | etapa | numero_candidato | nome_candidato | partido |
|------|-------|------------------| -------------- | --------|
| 523  |   0   |      15123       |   Fulano       | MDB     |


Etapas
|  ID  | numero_etapa | cargo   | 
|------|--------------|---------|
| 123  |   0          | prefeito|
