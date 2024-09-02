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
        this.fita = ['_'].concat([...fita], ['_', '_']);  // Adiciona delimitadores
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
  
            // Corrigir a situação quando o cabeçote está fora dos limites da fita
            if (this.i < 0 || this.i >= this.fita.length) {
                console.log("Erro: O cabeçote está fora dos limites da fita.");
                return;
            }
  
            console.log("Fita atual:", this.fita.join(''), "| Cabeçote em:", this.i, "| Estado:", this.estadoAtual);
        }
  
        // Mostrar o resultado
        console.log("Fita final:", this.fita.join(''));
    }
  }
  
  // Definição das transições para incremento de número unário
  const transicoes = {
    'q0': {
        '1': new Estado('q0', '1', 'D'), // Continua movendo para a direita
        '_': new Estado('q1', '_', 'E')  // Encontrou o final, vai para substituir o último '1'
    },
    'q1': {
        '1': new Estado('q1', '1', 'E'), // Continua movendo para a esquerda até encontrar o último '1'
        '_': new Estado('q2', 'X', 'D')  // Substitui o último '1' por 'X' e move para a direita
    },
    'q2': {
        '1': new Estado('q2', '1', 'D'), // Continua movendo para a direita
        'X': new Estado('q2', 'X', 'D'), // Pular o 'X' (último substituído)
        '_': new Estado('q3', '1', 'D')  // Adiciona um '1' ao final da fita e vai para aceitação
    },
    'q3': {
        '1': new Estado('q3', '1', 'D'), // Continua movendo para a direita
        '_': new Estado('q3', '_', 'D')  // Continua movendo para a direita
    }
  };
  
  const maquina = new Maquina(transicoes, 'q0', 'q3');
  maquina.ler("111"); // Teste com um número unário (3 em notação unária)
  