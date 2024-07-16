class AFN {
    constructor(estados, transicoes, alfabeto, estadoInicial, estadosAceitos ){
        this.estados=estados;
        this.transicoes=transicoes;
        this.alfabeto=alfabeto;
        this.estadoInicial=estadoInicial;
        this.estadosAceitos=estadosAceitos;
    }

    processarCadeia(estadoAtual, cadeia, posicao){
        if(posicao===cadeia.lenght){
            return this.estadosAceitos.includes(estadoAtual);
        }
        const simbolo=cadeia[posicao];
        const Possiveistransicoes=this.transicoes[estadoAtual] && this.transicoes[estadoAtual][simbolo] ? this.transicoes[estadoAtual][simbolo] : [];

        for(let proximoEstado of Possiveistransicoes){
            if(this.processarCadeia(proximoEstado, cadeia, posicao+1)){
                return true;
            }
        }
        return false;
    }

    Aceita(cadeia){
        return this.processarCadeia(this.estadoInicial, cadeia, 0);
    }



}

module.exports=AFN;