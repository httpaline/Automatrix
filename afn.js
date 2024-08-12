class AFN {
    constructor(estados, transicoes, alfabeto, estadoInicial, estadosFinais) {
        this.estados = estados;
        this.transicoes = transicoes;
        this.alfabeto = alfabeto;
        this.estadoInicial = estadoInicial;
        this.estadosFinais = estadosFinais || []; // Garantir que não seja undefined
    }
}

module.exports = AFN;
