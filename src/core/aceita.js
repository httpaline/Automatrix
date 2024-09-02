function simularAFN(afn, palavra) {
    let estadosAtuais = new Set();
    estadosAtuais.add(afn.estadoInicial);

    function explorarEstados(estados, palavraRestante) {
        if (palavraRestante.length === 0) {
            return Array.from(estados).some(estado => afn.estadosFinais.includes(estado));
        }

        let simbolo = palavraRestante[0];
        let novosEstados = new Set();

        for (let estado of estados) {
            let transicoes = afn.transicoes[estado] || {};
            let proximosEstados = transicoes[simbolo] || [];
            for (let proxEstado of proximosEstados) {
                proximosEstados = proxEstado.split(',');
                for (let novoEstado of proximosEstados) {
                    novosEstados.add(novoEstado.trim());
                }
            }
        }

        return explorarEstados(Array.from(novosEstados), palavraRestante.slice(1));
    }

    return explorarEstados(Array.from(estadosAtuais), palavra);
}

function simularAFD(afd, palavra) {
    //simula aceitação de uma palavra a partir do estado atual
    function explorarEstado(estadoAtual, palavraRestante) {
        if (palavraRestante.length === 0) {
            //o estado atual é final?
            return afd.estadosFinais.includes(estadoAtual);
        }

        let simbolo = palavraRestante[0];
        let proximoEstado = afd.transicoes[`${estadoAtual},${simbolo}`];

        if (!proximoEstado) {
            console.log(`Nenhuma transição para o símbolo '${simbolo}' a partir do estado '${estadoAtual}'`);
            return false;
        }

        //continua a simulação
        return explorarEstado(proximoEstado, palavraRestante.slice(1));
    }

    //inicia simulação a partir do estado inicial
    return explorarEstado(afd.estadoInicial, palavra);
}

module.exports = { simularAFN, simularAFD };