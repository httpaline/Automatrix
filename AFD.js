class AFD {
    constructor(estados, alfabeto, transicoes, estadoInicial, estadosAceitos) {
        this.estados = estados;
        this.alfabeto = alfabeto;
        this.transicoes = transicoes;
        this.estadoInicial = estadoInicial;
        this.estadosAceitos = estadosAceitos;
    }

    Aceita(cadeia){
        let estadoAtual = this.estadoInicial;

        for (let simbolo of cadeia) {
            if (this.transicoes[estadoAtual] && this.transicoes[estadoAtual][simbolo]) {
                estadoAtual = this.transicoes[estadoAtual][simbolo];
            } else {
                return false;
            }
        }

        return this.estadosAceitos.includes(estadoAtual);
    }
}

module.exports = AFD;
