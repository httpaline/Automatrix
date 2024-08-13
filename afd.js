class AFD {
    constructor(estados, alfabeto, transicoes, estadoInicial, estadosFinais) {
        this.estados = estados;
        this.transicoes = transicoes;
        this.alfabeto = alfabeto;
        this.estadoInicial = estadoInicial;
        this.estadosFinais = estadosFinais;
    }
}

module.exports = AFD;
