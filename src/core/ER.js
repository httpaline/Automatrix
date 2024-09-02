const AFN = require('./afn');

/*class ERtoAFN {
    constructor(er) {
        this.er = er;
    }

    converter() {
        return this.construirAFN(this.er);
    }

    construirAFN(er) {
        if (er === '') {
            return new AFN(['q0'], [], {}, 'q0', ['q0']);
        }

        if (er.length === 1) {
            const afn = new AFN(['q0', 'q1'], [er], { 'q0': { [er]: ['q1'] } }, 'q0', ['q1']);
            return afn;
        }

        const kleeneStar = /(.+)\; // Kleene 
        const concatenacao = /(.+)(.+)/; //concatenação
        const uniao = /(.+)\|(.+)/; //união
        const opcional = /(.+)\?/; 
        const umOuMais = /(.+)\+/; //um ou mais

        // Avaliar as expressões da ER
        if (kleeneStar.test(er)) {
            return this.kleeneStar(kleeneStar.exec(er)[1]);
        } else if (concatenacao.test(er)) {
            const match = concatenacao.exec(er);
            return this.concatenacao(match[1], match[2]);
        } else if (uniao.test(er)) {
            const match = uniao.exec(er);
            return this.uniao(match[1], match[2]);
        } else if (opcional.test(er)) {
            return this.opcional(opcional.exec(er)[1]);
        } else if (umOuMais.test(er)) {
            return this.umOuMais(umOuMais.exec(er)[1]);
        }

        throw new Error(`Expressão regular inválida: ${er}`);
    }

    // Implementação da operação Kleene Star
    kleeneStar(subEr) {
        const afn = this.construirAFN(subEr);
        const novoEstadoInicial = `q${afn.estados.length}`;
        const novoEstadoFinal = `q${afn.estados.length + 1}`;
        afn.estados.push(novoEstadoInicial, novoEstadoFinal);
        afn.transicoes[novoEstadoInicial] = { 'ε': [afn.estadoInicial, novoEstadoFinal] };
        afn.transicoes[afn.estadosFinais[0]] = { 'ε': [afn.estadoInicial, novoEstadoFinal] };
        afn.estadoInicial = novoEstadoInicial;
        afn.estadosFinais = [novoEstadoFinal];
        return afn;
    }

    //operação de União
    uniao(er1, er2) {
        const afn1 = this.construirAFN(er1);
        const afn2 = this.construirAFN(er2);
        const novoEstadoInicial = `q${afn1.estados.length + afn2.estados.length}`;
        const novoEstadoFinal = `q${afn1.estados.length + afn2.estados.length + 1}`;
        const estados = [novoEstadoInicial, ...afn1.estados, ...afn2.estados, novoEstadoFinal];
        const transicoes = {
            ...afn1.transicoes,
            ...afn2.transicoes,
            [novoEstadoInicial]: { 'ε': [afn1.estadoInicial, afn2.estadoInicial] }
        };
        transicoes[afn1.estadosFinais[0]] = { 'ε': [novoEstadoFinal] };
        transicoes[afn2.estadosFinais[0]] = { 'ε': [novoEstadoFinal] };
        return new AFN(estados, [...new Set([...afn1.alfabeto, ...afn2.alfabeto])], transicoes, novoEstadoInicial, [novoEstadoFinal]);
    }

    //operação de Concatenacao
    concatenacao(er1, er2) {
        const afn1 = this.construirAFN(er1);
        const afn2 = this.construirAFN(er2);
        const estados = [...afn1.estados, ...afn2.estados];
        const transicoes = { ...afn1.transicoes, ...afn2.transicoes };
        transicoes[afn1.estadosFinais[0]] = { 'ε': [afn2.estadoInicial] };
        return new AFN(estados, [...new Set([...afn1.alfabeto, ...afn2.alfabeto])], transicoes, afn1.estadoInicial, afn2.estadosFinais);
    }
    
    opcional(subEr) {
        const afn = this.construirAFN(subEr);
        const novoEstadoInicial = `q${afn.estados.length}`;
        const novoEstadoFinal = `q${afn.estados.length + 1}`;
        afn.estados.push(novoEstadoInicial, novoEstadoFinal);
        afn.transicoes[novoEstadoInicial] = { 'ε': [afn.estadoInicial, novoEstadoFinal] };
        afn.transicoes[afn.estadosFinais[0]] = { 'ε': [novoEstadoFinal] };
        afn.estadoInicial = novoEstadoInicial;
        afn.estadosFinais = [novoEstadoFinal];
        return afn;
    }

    //operação Um ou Mais
    umOuMais(subEr) {
        const afn = this.construirAFN(subEr);
        const novoEstadoInicial = `q${afn.estados.length}`;
        const novoEstadoFinal = `q${afn.estados.length + 1}`;
        afn.estados.push(novoEstadoInicial, novoEstadoFinal);
        afn.transicoes[novoEstadoInicial] = { 'ε': [afn.estadoInicial] };
        afn.transicoes[afn.estadosFinais[0]] = { 'ε': [afn.estadoInicial, novoEstadoFinal] };
        afn.estadoInicial = novoEstadoInicial;
        afn.estadosFinais = [novoEstadoFinal];
        return afn;
    }
}

module.exports = ERtoAFN;*/
