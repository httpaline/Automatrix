const readline = require('readline');
const AFN = require('./afn');
const AFNtoAFD = require('./converter');

// Configuração da interface de entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para solicitar transições para um estado específico e símbolo do alfabeto
function pedirTransicoesParaEstado(estados, alfabeto, transicoes, estado, i, callback) {
    if (i < alfabeto.length) {
        let simbolo = alfabeto[i];
        rl.question(`${estado}----${simbolo}----> `, (inputTransicoes) => {
            transicoes[estado] = transicoes[estado] || {};
            transicoes[estado][simbolo] = inputTransicoes.split('|').map(d => d.trim());
            pedirTransicoesParaEstado(estados, alfabeto, transicoes, estado, i + 1, callback);
        });
    } else {
        callback();
    }
}

// Função para solicitar as transições de cada estado
function pedirTransicoes(estados, alfabeto, transicoes, i, callback) {
    if (i < estados.length) {
        let estado = estados[i];
        pedirTransicoesParaEstado(estados, alfabeto, transicoes, estado, 0, () => {
            pedirTransicoes(estados, alfabeto, transicoes, i + 1, callback);
        });
    } else {
        callback();
    }
}

// Função principal para executar a conversão de AFN para AFD
function main() {
    rl.question('Digite os estados separados por vírgula: ', (inputEstados) => {
        const estados = inputEstados.split(',').map(e => e.trim());

        rl.question('Digite o alfabeto separado por vírgula: ', (inputAlfabeto) => {
            const alfabeto = inputAlfabeto.split(',').map(a => a.trim());
            let transicoes = {};

            pedirTransicoes(estados, alfabeto, transicoes, 0, () => {
                rl.question('Digite o estado inicial: ', (estadoInicial) => {
                    rl.question('Digite os estados finais separados por vírgula: ', (inputEstadosFinais) => {
                        const estadosFinais = inputEstadosFinais.split(',').map(e => e.trim());

                        // Criando o AFN com os dados fornecidos pelo usuário
                        const afn = new AFN(estados, transicoes, alfabeto, estadoInicial, estadosFinais);
                        
                        console.log('\n******PRINTANDO O AFN*****');
                        console.log('Estados:', afn.estados);
                        console.log('Alfabeto:', afn.alfabeto);
                        console.log('Transições:', afn.transicoes);
                        console.log('Estado Inicial:', afn.estadoInicial);
                        console.log('Estados Finais:', afn.estadosFinais);

                        // Convertendo o AFN para AFD
                        const afd = AFNtoAFD(afn);

                        // Exibindo os resultados do AFD
                        console.log('\n***** Resultados da Conversão para AFD *****');
                        console.log('Estados do AFD:', afd.estados);
                        console.log('Transições do AFD:', afd.transicoes);
                        console.log('Estado inicial do AFD:', afd.estadoInicial);
                        console.log('Estados finais do AFD:', afd.estadosFinais);

                        rl.close();
                    });
                });
            });
        });
    });
}

// Executa a função principal
main();
