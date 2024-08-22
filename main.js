const readline = require('readline');
const AFN = require('./afn');
const AFNtoAFD = require('./converter');
const { simularAFN, simularAFD } = require('./aceita');
const { minimizarAFDDireto, minimizarAFDConvertido } = require('./minimizacao');
const AFD = require('./afd');

let afn = null;
let afd = null;
let afdConvertido = false;

// Configuração da interface de entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para solicitar transições para um estado específico e símbolo do alfabeto
function pedirTransicoesParaEstado(estados, alfabeto, transicoes, estado, i, callback) {
    if (i < alfabeto.length) {
        let simbolo = alfabeto[i];
        rl.question(`${estado} ----${simbolo}----> `, (inputTransicoes) => {
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

// Função para criar um AFN
function criarAFN(callback) {
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
                        afn = new AFN(estados, alfabeto, transicoes, estadoInicial, estadosFinais);

                        console.log('\n★★★★★★ AFN GERADO ★★★★★★');
                        console.log('Estados:', afn.estados);
                        console.log('Alfabeto:', afn.alfabeto);
                        console.log('Transições:', afn.transicoes);
                        console.log('Estado Inicial:', afn.estadoInicial);
                        console.log('Estados Finais:', afn.estadosFinais);

                        callback();
                    });
                });
            });
        });
    });
}

// Função para criar um AFD
function criarAFD(callback) {
    rl.question('Digite os estados separados por vírgula: ', (inputEstados) => {
        const estados = inputEstados.split(',').map(e => e.trim());

        rl.question('Digite o alfabeto separado por vírgula: ', (inputAlfabeto) => {
            const alfabeto = inputAlfabeto.split(',').map(a => a.trim());
            let transicoes = {};

            pedirTransicoes(estados, alfabeto, transicoes, 0, () => {
                rl.question('Digite o estado inicial: ', (estadoInicial) => {
                    rl.question('Digite os estados finais separados por vírgula: ', (inputEstadosFinais) => {
                        const estadosFinais = inputEstadosFinais.split(',').map(e => e.trim());

                        // Criando o AFD com os dados fornecidos pelo usuário
                        afd = new AFD(estados, alfabeto, transicoes, estadoInicial, estadosFinais);
                        afdConvertido = false;

                        console.log('\n★★★★★★ AFD GERADO ★★★★★★');
                        console.log('Estados:', afd.estados);
                        console.log('Alfabeto:', afd.alfabeto);
                        console.log('Transições:', afd.transicoes);
                        console.log('Estado Inicial:', afd.estadoInicial);
                        console.log('Estados Finais:', afd.estadosFinais);

                        callback();
                    });
                });
            });
        });
    });
}

// Função para converter AFN para AFD
function converterAFNtoAFD(callback) {
    if (afn) {
        afd = AFNtoAFD(afn);
        afdConvertido = true;
        console.log('\n★★★★★★ AFD GERADO ★★★★★★');
        console.log('Estados do AFD:', afd.estados);
        console.log('Transições do AFD:', afd.transicoes);
        console.log('Estado inicial do AFD:', afd.estadoInicial);
        console.log('Estados finais do AFD:', afd.estadosFinais);
    } else {
        console.log('\nPor favor, crie um AFN primeiro.');
    }
    callback();
}

// Função para simular a aceitação de uma palavra
function simularAceitacao(callback) {
    if (!afn) {
        console.log('\nPor favor, crie um AFN primeiro.');
        return callback();
    }

    rl.question('Digite a palavra a ser simulada: ', (palavra) => {
        console.log('\n★★★★★★ SIMULANDO NO AFN ★★★★★★');
        const aceitaAFN = simularAFN(afn, palavra);
        console.log(`Palavra "${palavra}" aceita pelo AFN? ${aceitaAFN ? 'Sim' : 'Não'}`);

        if (afd) {
            console.log('\n★★★★★★ SIMULANDO NO AFD ★★★★★★');
            const aceitaAFD = simularAFD(afd, palavra);
            console.log(`Palavra "${palavra}" aceita pelo AFD? ${aceitaAFD ? 'Sim' : 'Não'}`);
        } else {
            console.log('\nPor favor, converta o AFN para AFD antes de simular no AFD.');
        }

        callback();
    });
}

// Função para minimizar um AFD
function minimizarAFD(callback) {
    if (afd) {
        let afdMinimizado;
        if (afdConvertido) {
            // AFD foi convertido de um AFN
            afdMinimizado = minimizarAFDConvertido(afd);
        } else {
            // AFD foi criado diretamente
            afdMinimizado = minimizarAFDDireto(afd);
        }
        console.log('\n★★★★★★ AFD MINIMIZADO ★★★★★★');
        console.log('Estados do AFD minimizado:', afdMinimizado.estados);
        console.log('Transições do AFD minimizado:', afdMinimizado.transicoes);
        console.log('Estado inicial do AFD minimizado:', afdMinimizado.estadoInicial);
        console.log('Estados finais do AFD minimizado:', afdMinimizado.estadosFinais);
    } else {
        console.log('\nPor favor, crie um AFN e converta-o para AFD primeiro.');
    }
    callback();
}

// Função para exibir o menu de ações
function exibirMenu() {
    console.log('\n★★★★★★ MENU DE AÇÕES ★★★★★★★');
    console.log('1. Criar AFN');
    console.log('2. Criar AFD');
    console.log('3. Converter AFN para AFD');
    console.log('4. Simular aceitação de palavra');
    console.log('5. Minimizar AFD');
    console.log('6. Sair');
    rl.question('Escolha uma opção: ', (opcao) => {
        switch (opcao) {
            case '1':
                criarAFN(exibirMenu);
                break;
            case '2':
                criarAFD(exibirMenu);
                break;
            case '3':
                converterAFNtoAFD(exibirMenu);
                break;
            case '4':
                simularAceitacao(exibirMenu);
                break;
            case '5':
                minimizarAFD(exibirMenu);
                break;
            case '6':
                rl.close();
                break;
            default:
                console.log('Opção inválida. Tente novamente.');
                exibirMenu();
                break;
        }
    });
}

// Executa a função principal
exibirMenu();
