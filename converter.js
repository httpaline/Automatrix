const AFN=require('./AFN');  
const AFD=require('./AFD');

function AFNtoAFD(AFN){

    const novoEstado=(estados)=>estados.sort().join(',');
    let estadosAFD = [];
    let transicoesAFD={};
    let estadosAceitosAFD=[];
    let novosEstados=[new Set([AFN.estadoInicial])];
    let processados=new Set();

    while (novosEstados.lenght>0){
        let estadoAtual=novosEstados.pop();
        let nomeEstadoAtual=novosEstado(Array.from(estadoAtual));
        processados.add(nomeEstadoAtual);

        if(!estadosAFD.includes(nomeEstadoAtual)){
            estadosAFD.push(nomeEstadoAtual)
            transicoesAFD[nomeEstadoAtual]={};

        }
        if (Array.from(estadoAtual).some(s => AFN.estadosAceitosAFD.includes(s))) {
            estadosAceitosAFD.push(nomeEstadoAtual);
        }

        for(let simbolo of AFN.alfabeto){
            let novoEstadoSet=new Set();
            for(let estado of estadoAtual){
                if(AFN.transicoes[estado] && AFN.transicoes[estado][simbolo]){
                    AFN.transicoes[estado][simbolo].forEach(s => novoEstadoSet.add(s)); 
                }
            }

            if(novoEstadoSet.size>0){
                let nomeNovoEstado=novoEstado(Array.from(novoEstadoSet));
                transicoesAFD[nomeEstadoAtual][simbolo]=novoEstadoSet;
                if(!processados.has(nomeNovoEstado)){
                    novosEstados.push(novoEstadoSet);
                }
            }
    
        }
        
    }

    return new AFD(estadosAFD, AFN.alfabeto, transicoesAFD, novoEstado([AFN.estadoInicial]), estadosAceitosAFD);
}

module.exports=AFNtoAFD;