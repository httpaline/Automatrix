// MT.js

class Estado {
    constructor(proximoEstado, escreve, direcaoMovimento) {
      this.proximoEstado = proximoEstado;
      this.escreve = escreve;
      this.direcaoMovimento = direcaoMovimento;
    }
  }
  
  class Maquina {
    constructor(transicoes, estadoInicial, estadoFinal) {
      this.transicoes = transicoes;
      this.estadoAtual = estadoInicial;
      this.estadoFinal = estadoFinal;
      this.i = 1;  // Começa a leitura na posição após o '_'
      this.fita = [];
    }
  
    ler(fita) {
      this.fita = ['_'].concat([...fita], ['_', '_']);  // Adiciona delimitadores e espaço para a cópia
      console.log("Fita inicial:", this.fita.join(''));
      while (this.estadoAtual !== this.estadoFinal) {
        const simboloAtual = this.fita[this.i];
        const transicao = this.transicoes[this.estadoAtual][simboloAtual];
  
        if (!transicao) {
          console.log("Erro: A máquina não tem uma transição para este símbolo.");
          return;
        }
  
        this.fita[this.i] = transicao.escreve;
        this.estadoAtual = transicao.proximoEstado;
  
        if (transicao.direcaoMovimento === 'D') {
          this.i++;
        } else if (transicao.direcaoMovimento === 'E') {
          this.i--;
        }
  
        console.log("Fita atual:", this.fita.join(''), "| Cabeçote em:", this.i, "| Estado:", this.estadoAtual);
      }
  
      // Encontrar a posição do primeiro delimitador '_'
      const posFinal = this.fita.indexOf('_', this.fita.indexOf('_') + 1);
  
      // Mostrar a fita copiada
      const fitaOriginal = this.fita.slice(1, posFinal).join(''); // Extrai a fita original
      const fitaCopiada = this.fita.slice(posFinal + 1).join(''); // Extrai a fita copiada
  
      console.log("Fita copiada:\n", fitaOriginal + fitaCopiada);  // Exibe a fita copiada
    }
  }
  
  function executarMaquinaTuring(fita) {
    const transicoes = {
      'q0': {
        'a': new Estado('q1', 'X', 'D'),
        'b': new Estado('q1', 'Y', 'D'),
        '_': new Estado('qAceitar', '_', 'D')
      },
      'q1': {
        'a': new Estado('q1', 'a', 'D'),
        'b': new Estado('q1', 'b', 'D'),
        '_': new Estado('q2', '_', 'E')
      },
      'q2': {
        'X': new Estado('q0', 'a', 'E'),
        'Y': new Estado('q0', 'b', 'E'),
        'a': new Estado('q2', 'a', 'E'),
        'b': new Estado('q2', 'b', 'E'),
        '_': new Estado('qAceitar', '_', 'D')
      }
    };
  
    const maquina = new Maquina(transicoes, 'q0', 'qAceitar');
    maquina.ler(fita);
  }
  
  module.exports = { executarMaquinaTuring };
  