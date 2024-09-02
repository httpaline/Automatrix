/*const graphviz = require('graphviz');
const fs = require('fs');
const path = require('path');

function gerarImagemAFN(nomeArquivo, estados, alfabeto, transicoes, estadoInicial, estadosFinais) {
    const g = graphviz.digraph('AFN');

    // Adiciona os estados
    estados.forEach(estado => {
        g.addNode(estado, { shape: 'circle' });
    });

    // Define o estado inicial
    if (g.getNode(estadoInicial)) {
        g.getNode(estadoInicial).set({ shape: 'doublecircle' });
    } else {
        console.warn(`Estado inicial ${estadoInicial} não encontrado.`);
    }

    // Define os estados finais
    estadosFinais.forEach(estadoFinal => {
        if (g.getNode(estadoFinal)) {
            g.getNode(estadoFinal).set({ shape: 'doublecircle' });
        } else {
            console.warn(`Estado final ${estadoFinal} não encontrado.`);
        }
    });

    // Adiciona as transições
    for (const estado in transicoes) {
        if (transicoes.hasOwnProperty(estado)) {
            for (const simbolo in transicoes[estado]) {
                if (transicoes[estado].hasOwnProperty(simbolo)) {
                    const transicao = transicoes[estado][simbolo];
                    if (Array.isArray(transicao)) {
                        transicao.forEach(transition => {
                            const [proximoEstado, simboloTransicao] = transition.split(',').map(s => s.trim());
                            if (g.getNode(estado) && g.getNode(proximoEstado)) {
                                g.addEdge(estado, proximoEstado, { label: simboloTransicao });
                            } else {
                                console.warn(`Um dos estados (${estado}, ${proximoEstado}) não foi encontrado.`);
                            }
                        });
                    } else {
                        console.warn(`Transição para ${estado} com símbolo ${simbolo} não é um array:`, transicao);
                    }
                }
            }
        }
    }

    // Salva a imagem
    const filepath = path.join(__dirname, '../images', 'afn', nomeArquivo);
    g.output('png', filepath, (err) => {
        if (err) {
            console.error(`Erro ao gerar a imagem: ${err.message}`);
        } else {
            console.log(`Imagem gerada: ${filepath}`);
        }
    });
}

// Função para gerar uma imagem de um AFD
function gerarImagemAFD(nomeArquivo, estados, alfabeto, transicoes, estadoInicial, estadosFinais) {
    const g = graphviz.digraph('AFD');

    // Adiciona os estados
    estados.forEach(estado => {
        g.addNode(estado, { shape: 'circle' });
    });

    // Define o estado inicial
    if (g.getNode(estadoInicial)) {
        g.getNode(estadoInicial).set({ shape: 'doublecircle' });
    } else {
        console.warn(`Estado inicial ${estadoInicial} não encontrado.`);
    }

    // Define os estados finais
    estadosFinais.forEach(estadoFinal => {
        if (g.getNode(estadoFinal)) {
            g.getNode(estadoFinal).set({ shape: 'doublecircle' });
        } else {
            console.warn(`Estado final ${estadoFinal} não encontrado.`);
        }
    });

    // Adiciona as transições
    for (const estado in transicoes) {
        if (transicoes.hasOwnProperty(estado)) {
            for (const simbolo in transicoes[estado]) {
                if (transicoes[estado].hasOwnProperty(simbolo)) {
                    const transicao = transicoes[estado][simbolo];
                    if (Array.isArray(transicao)) {
                        transicao.forEach(transition => {
                            const [proximoEstado, simboloTransicao] = transition.split(',').map(s => s.trim());
                            if (g.getNode(estado) && g.getNode(proximoEstado)) {
                                g.addEdge(estado, proximoEstado, { label: simboloTransicao });
                            } else {
                                console.warn(`Um dos estados (${estado}, ${proximoEstado}) não foi encontrado.`);
                            }
                        });
                    } else {
                        console.warn(`Transição para ${estado} com símbolo ${simbolo} não é um array:`, transicao);
                    }
                }
            }
        }
    }

    // Salva a imagem
    const filepath = path.join(__dirname, '../images', 'afd', nomeArquivo);
    g.output('png', filepath, (err) => {
        if (err) {
            console.error(`Erro ao gerar a imagem: ${err.message}`);
        } else {
            console.log(`Imagem do AFD gerada com sucesso: ${filepath}`);
        }
    });
}

// Função para gerar uma imagem de um AFN convertido para AFD
function gerarImagemAFNParaAFD(nomeArquivo, estados, alfabeto, transicoes, estadoInicial, estadosFinais) {
    const g = graphviz.digraph('AFNToAFD');

    // Adiciona os estados
    estados.forEach(estado => {
        g.addNode(estado, { shape: 'circle' });
    });

    // Define o estado inicial
    if (g.getNode(estadoInicial)) {
        g.getNode(estadoInicial).set({ shape: 'doublecircle' });
    } else {
        console.warn(`Estado inicial ${estadoInicial} não encontrado.`);
    }

    // Define os estados finais
    estadosFinais.forEach(estadoFinal => {
        if (g.getNode(estadoFinal)) {
            g.getNode(estadoFinal).set({ shape: 'doublecircle' });
        } else {
            console.warn(`Estado final ${estadoFinal} não encontrado.`);
        }
    });

    // Adiciona as transições
    for (const estado in transicoes) {
        if (transicoes.hasOwnProperty(estado)) {
            for (const simbolo in transicoes[estado]) {
                if (transicoes[estado].hasOwnProperty(simbolo)) {
                    const transicao = transicoes[estado][simbolo];
                    if (Array.isArray(transicao)) {
                        transicao.forEach(transition => {
                            const [proximoEstado, simboloTransicao] = transition.split(',').map(s => s.trim());
                            if (g.getNode(estado) && g.getNode(proximoEstado)) {
                                g.addEdge(estado, proximoEstado, { label: simboloTransicao });
                            } else {
                                console.warn(`Um dos estados (${estado}, ${proximoEstado}) não foi encontrado.`);
                            }
                        });
                    } else {
                        console.warn(`Transição para ${estado} com símbolo ${simbolo} não é um array:`, transicao);
                    }
                }
            }
        }
    }

    // Salva a imagem
    const filepath = path.join(__dirname, '../images', 'afnToAFD', nomeArquivo);
    g.output('png', filepath, (err) => {
        if (err) {
            console.error(`Erro ao gerar a imagem: ${err.message}`);
        } else {
            console.log(`Imagem do AFN convertido para AFD gerada com sucesso: ${filepath}`);
        }
    });
}

// Função para gerar uma imagem de um AFD minimizado
function gerarImagemAFDMinimizado(nomeArquivo, estados, alfabeto, transicoes, estadoInicial, estadosFinais) {
    const g = graphviz.digraph('AFDMinimizado');

    // Adiciona os estados
    estados.forEach(estado => {
        g.addNode(estado, { shape: 'circle' });
    });

    // Define o estado inicial
    if (g.getNode(estadoInicial)) {
        g.getNode(estadoInicial).set({ shape: 'doublecircle' });
    } else {
        console.warn(`Estado inicial ${estadoInicial} não encontrado.`);
    }

    // Define os estados finais
    estadosFinais.forEach(estadoFinal => {
        if (g.getNode(estadoFinal)) {
            g.getNode(estadoFinal).set({ shape: 'doublecircle' });
        } else {
            console.warn(`Estado final ${estadoFinal} não encontrado.`);
        }
    });

    // Adiciona as transições
    for (const estado in transicoes) {
        if (transicoes.hasOwnProperty(estado)) {
            for (const simbolo in transicoes[estado]) {
                if (transicoes[estado].hasOwnProperty(simbolo)) {
                    const transicao = transicoes[estado][simbolo];
                    if (Array.isArray(transicao)) {
                        transicao.forEach(transition => {
                            const [proximoEstado, simboloTransicao] = transition.split(',').map(s => s.trim());
                            if (g.getNode(estado) && g.getNode(proximoEstado)) {
                                g.addEdge(estado, proximoEstado, { label: simboloTransicao });
                            } else {
                                console.warn(`Um dos estados (${estado}, ${proximoEstado}) não foi encontrado.`);
                            }
                        });
                    } else {
                        console.warn(`Transição para ${estado} com símbolo ${simbolo} não é um array:`, transicao);
                    }
                }
            }
        }
    }

    // Salva a imagem
    const filepath = path.join(__dirname, '../images', 'afdMinimizado', nomeArquivo);
    g.output('png', filepath, (err) => {
        if (err) {
            console.error(`Erro ao gerar a imagem: ${err.message}`);
        } else {
            console.log(`Imagem do AFD minimizado gerada com sucesso: ${filepath}`);
        }
    });
}

module.exports = {
    gerarImagemAFN,
    gerarImagemAFD,
    gerarImagemAFNParaAFD,
    gerarImagemAFDMinimizado
};*/
