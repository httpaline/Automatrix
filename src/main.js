const readline = require('readline');
const AFN = require('./core/afn');
const AFNtoAFD = require('./core/converter');
const { simularAFN, simularAFD } = require('./core/aceita');
const { minimizarAFDDireto, minimizarAFDConvertido } = require('./core/minimizacao');
const AFD = require('./core/afd');
const { executarMaquinaTuring } = require('./core/MT');
const { executarMaquinaTuringUnaria } = require('./core/MTunario');
const { Console } = require('console');
/*const { 
    gerarImagemAFN, 
    gerarImagemAFD, 
    gerarImagemAFNParaAFD, 
    gerarImagemAFDMinimizado 
} = require('./draw');*/
//const ERtoAFN = require('./core/ER');


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

                        //gerarImagemAFN(afn);

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

                        //gerarImagemAFD(afd);

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

        //gerarImagemAFNParaAFD(afd);

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

        //gerarImagemAFDMinimizado(afdMinimizado);

    } else {
        console.log('\nPor favor, crie um AFN e converta-o para AFD primeiro.');
    }
    callback();
}

// Função para executar a Máquina de Turing
function executarMaquina(callback) {
    rl.question('Digite a fita para a Máquina de Turing: ', (fita) => {
        executarMaquinaTuring(fita);
        callback();
    });
}


function executarMaquinaUnaria(callback) {
    rl.question('Digite a fita para a Máquina de Turing: ', (fita) => {
        executarMaquinaTuringUnaria(fita);
        callback();
    });
}


function converterERparaAFN(callback) {
    rl.question('Digite a expressão regular: ', (er) => {
        try {
            const erToAFN = new ERtoAFN(er);
            afn = erToAFN.converter();

            console.log('\n★★★★★★ AFN GERADO DA ER ★★★★★★');
            console.log('Estados:', afn.estados);
            console.log('Alfabeto:', afn.alfabeto);
            console.log('Transições:', afn.transicoes);
            console.log('Estado Inicial:', afn.estadoInicial);
            console.log('Estados Finais:', afn.estadosFinais);

            //gerarImagemAFN(afn);

            callback();
        } catch (error) {
            console.log('Erro ao converter a expressão regular:', error.message);
            callback();
        }
    });
}


// Exibe o menu de ações
function exibirMenu() {
    console.log('▄▀█ █░█ ▀█▀ █▀█ █▀▄▀█ ▄▀█ ▀█▀ █▀█ █ ▀▄▀');
    console.log('█▀█ █▄█ ░█░ █▄█ █░▀░█ █▀█ ░█░ █▀▄ █ █░█');
    console.log('\n★★★★★★ MENU DE AÇÕES ★★★★★★★');
    console.log('1. Criar AFN');
    console.log('2. Criar AFD');
    console.log('3. Converter AFN para AFD');
    console.log('4. Simular aceitação de palavra');
    console.log('5. Minimizar AFD');
    console.log('6. Executar Máquina de Turing de Cópia');
    console.log('7. Executar Máquina de Turing Unária');
    console.log('8. Coverter Expressão Regular para AFN.');
    console.log('9. Sair.');
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
                executarMaquina(exibirMenu);
                break;
            case '7':
                executarMaquinaUnaria(exibirMenu);
                break;
            case '8':
                converterERparaAFN(exibirMenu);
                break;
            case '9':
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
