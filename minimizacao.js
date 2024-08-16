const AFD = require('./afd');

function minimizarAFD(afd) {
    const { estados, alfabeto, transicoes, estadoInicial, estadosFinais } = afd;

    // Passo 1: Inicializar a tabela de distinção
    let distincoes = {};
    estados.forEach((e1, i) => {
        estados.slice(i + 1).forEach(e2 => {
            const chave = [e1, e2].sort().toString();
            distincoes[chave] = (estadosFinais.includes(e1) !== estadosFinais.includes(e2));
        });
    });

    // Passo 2: Refinar a tabela de distinção
    let alterou;
    do {
        alterou = false;
        estados.forEach((e1, i) => {
            estados.slice(i + 1).forEach(e2 => {
                const chave = [e1, e2].sort().toString();
                if (!distincoes[chave]) {
                    for (const simbolo of alfabeto) {
                        const t1 = (transicoes[e1] && transicoes[e1][simbolo] && transicoes[e1][simbolo][0]) || '';
                        const t2 = (transicoes[e2] && transicoes[e2][simbolo] && transicoes[e2][simbolo][0]) || '';
                        const chaveTransicao = [t1, t2].sort().toString();
                        if (distincoes[chaveTransicao]) {
                            distincoes[chave] = true;
                            alterou = true;
                            break;
                        }
                    }
                }
            });
        });
    } while (alterou);

    // Passo 3: Agrupar estados indistinguíveis
    let grupos = {};
    estados.forEach(e1 => {
        const grupo = Object.keys(grupos).find(grp => {
            return !distincoes[[e1, grupos[grp][0]].sort().toString()];
        });
        if (grupo) {
            grupos[grupo].push(e1);
        } else {
            grupos[e1] = [e1];
        }
    });

    // Corrigir agrupamento para a forma desejada
    let estadosMinimizados = Object.values(grupos).map(grupo => grupo.sort().join(','));
    estadosMinimizados = Array.from(new Set(estadosMinimizados)); // Remove duplicatas

    // Re-criar a tabela de transições minimizada
    const transicoesMinimizadas = {};
    const finaisMinimizados = new Set();
    let estadoInicialMinimizado = '';

    estadosMinimizados.forEach(grupo => {
        const representantes = grupo.split(',');
        
        alfabeto.forEach(simbolo => {
            const destinos = new Set();
            representantes.forEach(representante => {
                const destino = (transicoes[representante] && transicoes[representante][simbolo] && transicoes[representante][simbolo][0]) || '';
                if (destino) destinos.add(destino);
            });
            if (destinos.size > 0) {
                const grupoDestino = estadosMinimizados.find(g => {
                    return g.split(',').some(e => destinos.has(e));
                });
                if (grupoDestino) {
                    transicoesMinimizadas[`${grupo},${simbolo}`] = grupoDestino;
                }
            }
        });

        if (representantes.includes(estadoInicial)) {
            estadoInicialMinimizado = grupo;
        }

        if (representantes.some(e => estadosFinais.includes(e))) {
            finaisMinimizados.add(grupo);
        }
    });

    const afdMinimizado = new AFD(estadosMinimizados, alfabeto, transicoesMinimizadas, estadoInicialMinimizado, Array.from(finaisMinimizados));
    return afdMinimizado;
}

module.exports = minimizarAFD;
