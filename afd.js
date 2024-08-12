class AFD {
    constructor(estados, transicoes, alfabeto, estadoInicial, estadosFinais){
        this.estados=estados;
        this.transicoes=transicoes;
        this.alfabeto=alfabeto;
        this.estadoInicial=estadoInicial;
        this.estadosFinais=estadosFinais;
    }
}

module.exports = AFD;
