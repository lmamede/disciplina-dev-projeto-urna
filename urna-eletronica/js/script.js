const rVotoPara = document.querySelector('.esquerda .rotulo.r1 span')
const rCargo = document.querySelector('.esquerda .rotulo.r2 span')
const numeros = document.querySelector('.esquerda .rotulo.r3')
const rDescricao = document.querySelector('.esquerda .rotulo.r4')
const rMensagem = document.querySelector('.esquerda .rotulo.r4 .mensagem')
const rNomeCandidato = document.querySelector('.esquerda .rotulo.r4 .nome-candidato')
const rPartidoPolitico = document.querySelector('.esquerda .rotulo.r4 .partido-politico')
const rNomeVice = document.querySelector('.esquerda .rotulo.r4 .nome-vice')
const rRodape = document.querySelector('.tela .rodape')

const rBoletim = document.querySelector('.boletim') 
const rCandidato = document.querySelector('.direita .candidato')
const rVice = document.querySelector('.direita .candidato.menor')

const votos = []

var etapaAtual = 0
var etapas = null
var numeroDigitado = ''
var votoEmBranco = false
var rows = []

ajax('etapas.json', 'GET', null, (response) => {
  etapas = JSON.parse(response)
  console.log(etapas)

  comecarEtapa()
})

window.onload = () => {
  let btns = document.querySelectorAll('.teclado--botao')
  for (let btn of btns) {
    btn.onclick = () => {
      clicar(btn.innerHTML)
    }
  }

  document.querySelector('.teclado--botao.branco').onclick = () => branco()
  document.querySelector('.teclado--botao.laranja').onclick = () => corrigir()
  document.querySelector('.teclado--botao.verde').onclick = () => confirmar()
  document.querySelector('.teclado--botao.azul').onclick = () => gerarBoletim()
}

/**
 * Inicia a etapa atual.
 */
function comecarEtapa() {
  let etapa = etapas[etapaAtual]
  console.log('Etapa atual: ' + etapa['titulo'])

  numeroDigitado = ''
  votoEmBranco = false

  numeros.style.display = 'flex'
  numeros.innerHTML = ''
  rVotoPara.style.display = 'none'
  rCandidato.style.display = 'none'
  rVice.style.display = 'none'
  rDescricao.style.display = 'none'
  rMensagem.style.display = 'none'
  rNomeCandidato.style.display = 'none'
  rPartidoPolitico.style.display = 'none'
  rNomeVice.style.display = 'none'
  rRodape.style.display = 'none'
  rBoletim.style.display = 'none'

  for (let i = 0; i < etapa['numeros']; i++) {
    let pisca = i == 0 ? ' pisca' : ''
    numeros.innerHTML += `
      <div class="numero${pisca}"></div>
    `
  }

  rCargo.innerHTML = etapa['titulo']
}

/**
 * Procura o candidato pelo número digitado,
 * se encontrar, mostra os dados dele na tela.
 */
function atualizarInterface() {
  console.log('Número Digitado:', numeroDigitado)

  let etapa = etapas[etapaAtual]
  let candidato = null

  for (let num in etapa['candidatos']) {
    if (num == numeroDigitado) {
      candidato = etapa['candidatos'][num]
      break
    }
  }

  console.log('Candidato: ' + candidato)
  rDescricao.style.display = 'block'
  rNomeCandidato.style.display = 'block'
  rPartidoPolitico.style.display = 'block'

  if (candidato) {
    let vice = candidato['vice']

    rRodape.style.display = 'block'
    rNomeCandidato.querySelector('span').innerHTML = candidato['nome']
    rPartidoPolitico.querySelector('span').innerHTML = candidato['partido']

    rCandidato.style.display = 'block'
    rCandidato.querySelector('.imagem img').src = `img/${candidato['foto']}`
    rCandidato.querySelector('.cargo p').innerHTML = etapa['titulo']
    
    if (vice) {
      rNomeVice.style.display = 'block'
      rNomeVice.querySelector('span').innerHTML = vice['nome']
      rVice.style.display = 'block'
      rVice.querySelector('.imagem img').src = `img/${vice['foto']}`
    } else {
      rNomeVice.style.display = 'none'
    }

    return
  }

  if (votoEmBranco) return

  // Anular o voto
  rNomeCandidato.style.display = 'none'
  rPartidoPolitico.style.display = 'none'
  rNomeVice.style.display = 'none'

  rMensagem.style.display = 'block'
  rMensagem.classList.add('pisca')
  rMensagem.innerHTML = 'VOTO NULO'
}

/**
 * Verifica se pode usar o teclado e atualiza o número.
 */
function clicar(value) {
  console.log(value)

  let elNum = document.querySelector('.esquerda .rotulo.r3 .numero.pisca')
  if (elNum && ! votoEmBranco) {
    numeroDigitado += (value)
    elNum.innerHTML = value
    elNum.classList.remove('pisca')

    let proximoNumero = elNum.nextElementSibling
    if (proximoNumero) {
      proximoNumero.classList.add('pisca')
    } else {
      atualizarInterface()
    }

    (new Audio('audio/se1.mp3')).play()
  }
}

/**
 * Verifica se há número digitado, se não,
 * vota em branco.
 */
function branco() {
  console.log('branco')
  
  // Verifica se há algum número digitado,
  // se sim, não vota
  if (! numeroDigitado) {
    votoEmBranco = true

    numeros.style.display = 'none'
    rVotoPara.style.display = 'inline'
    rDescricao.style.display = 'block'
    rMensagem.style.display = 'block'
    rMensagem.innerHTML = 'VOTO EM BRANCO';

    (new Audio('audio/se1.mp3')).play()
  }

}

/**
 * Reinicia a etapa atual.
 */
function corrigir() {
  console.log('corrigir');
  (new Audio('audio/se2.mp3')).play()
  comecarEtapa()
}

/**
 * Confirma o numero selecionado e envia os votos para o banco.
 */
function confirmar() {
  console.log('confirmar')

  let etapa = etapas[etapaAtual]

  if (numeroDigitado.length == etapa['numeros']) {
    if (etapa['candidatos'][numeroDigitado]) {
      // Votou em candidato
      votos.push({
        'etapa': etapa['titulo'],
        'numero': numeroDigitado
      })
      console.log(`Votou em ${numeroDigitado}`)
    } else {
      // Votou nulo
      let nulo = 'nulo-p';
      if(etapaAtual == 0){
          nulo = 'nulo-v';
      }
      votos.push({
        'etapa': etapa['titulo'],
        'numero': nulo
      })
      console.log('Votou Nulo')
    }
  } else if (votoEmBranco) {
    // Votou em branco
      let numero = '00';
      if(etapaAtual == 0){
          numero = '00000';
      }
      votos.push({
        'etapa': etapa['titulo'],
        'numero': numero
      })
      console.log('Votou em Branco')
  } else {
    // Voto não pode ser confirmado
    console.log('Voto não pode ser confirmado')
    return
  }

  if (etapas[etapaAtual + 1]) {
    etapaAtual++
  } else {
    document.querySelector('.tela').innerHTML = `
      <div class="fim">FIM</div>
    `
  }

  let dados = JSON.stringify(votos.pop());

  //Envia os votos da etapa corrente para ser computado em php
  ajax('https://candidatos-urna.000webhostapp.com/db_connect.php', 'POST', dados, (response) => {
    console.log("SUCESSO");
  })

  (new Audio('audio/se3.mp3')).play()
  comecarEtapa()
}

/**
 * Requisita um JSON com o resultado parcial da eleição corrente
 * e mostra em uma tabela HTML na tela
 */

function gerarBoletim() {
    let dados;
    ajax('https://candidatos-urna.000webhostapp.com/db_connect.php', 'GET', null, (response) => {
        dados = JSON.parse(response);
        console.log(dados);
        rBoletim.style.display = 'block';
        var table;
        
        for(let row of rows){
            row.remove();
        }
       
        for(let dado of dados){
          var etapa;
          if(dado['etapa'] == "vereador"){
            table = document.getElementById("vereador-table");
            etapa = etapas[0];
          }else{
            table = document.getElementById("prefeito-table");
            etapa = etapas[1];
          }
            var row = document.createElement("tr");
            var cell1 = document.createElement("td");
            var cell2 = document.createElement("td");
            var cell3 = document.createElement("td");
            
            let numero_candidato = dado['numero_candidato'];
            let nome_candidato = "Votos Brancos";
            let dados_candidato = etapa['candidatos'][numero_candidato];
            
            if(dados_candidato){
                nome_candidato = dados_candidato['nome'];
            }else if(numero_candidato == "nulo-p" || numero_candidato == "nulo-v"){
                nome_candidato = 'Votos Nulos';
                numero_candidato = ""
            }
            
            let votos = dado['votos'];
    
            cell1.innerHTML = nome_candidato;
            cell2.innerHTML = numero_candidato;
            cell3.innerHTML = votos;
    
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
            
            rows.push(row);
            table.appendChild(row);    
        }    
        
    }); 
}