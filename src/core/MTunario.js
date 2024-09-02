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
        this.i = 1;  
        this.fita = [];
    }

    ler(fita) {
        this.fita = ['_'].concat([...fita], ['_', '_']);  //adiciona delimitadores
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

            if (this.i < 0 || this.i >= this.fita.length) {
                console.log("Erro: O cabeçote está fora dos limites da fita.");
                return;
            }

            console.log("Fita atual:", this.fita.join(''), "| Cabeçote em:", this.i, "| Estado:", this.estadoAtual);
        }

        console.log("Fita final:", this.fita.join(''));
    }
}

const transicoes = {
    'q0': {
        '1': new Estado('q0', '1', 'D'), //movendo para a direita
        '_': new Estado('q1', '_', 'E')  //no fim substitui o último '1' 
    },
    'q1': {
        '1': new Estado('q1', '1', 'E'), // continua movendo até encontrar o último '1'
        '_': new Estado('q2', 'X', 'D')  // substitui o último '1' na esquerda por 'X' e move para a direita
    },
    'q2': {
        '1': new Estado('q2', '1', 'D'), // continua movendo para a direita
        'X': new Estado('q2', 'X', 'D'), // pula o 'X'
        '_': new Estado('q3', '1', 'D')  // adiciona '1' ao final da fita e vai para aceitação
    },
    'q3': {
        '1': new Estado('q3', '1', 'D'), // continua movendo para a direita
        '_': new Estado('q3', '_', 'D')  // continua movendo para a direita
    }
};

const maquina = new Maquina(transicoes, 'q0', 'q3');

function executarMaquinaTuringUnaria(fita) {
    maquina.ler(fita);
}

module.exports = {
    executarMaquinaTuringUnaria
};
