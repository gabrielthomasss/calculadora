let display = document.getElementById('display');
let expressaoCompleta = '';
let resultadoAnterior = null;

// Função para adicionar números à expressão
function adicionarNumero(numero) {
    expressaoCompleta += numero;
    atualizarVisor();
}

// Função para definir operadores (+, -, *, /, %) na expressão
function definirOperador(operador) {
    if (expressaoCompleta !== '' && !isNaN(expressaoCompleta.slice(-1))) {
        expressaoCompleta += operadorParaVisual(operador);
        atualizarVisor();
    }
}

// Função para calcular o resultado da expressão
function igualar() {
    if (expressaoCompleta !== '' && !isNaN(expressaoCompleta.slice(-1))) {
        calcularResultado();
        atualizarVisor();
        expressaoCompleta = resultadoAnterior !== null ? resultadoAnterior.toString() : '';
        resultadoAnterior = null;
    }
}

// Função para limpar o visor e a expressão
function limparVisor() {
    expressaoCompleta = '';
    atualizarVisor();
}

// Função para apagar o último caractere da expressão
function apagarUltimo() {
    if (expressaoCompleta !== '') {
        expressaoCompleta = expressaoCompleta.slice(0, -1);
        atualizarVisor();
    }
}

// Função para calcular o resultado da expressão matemática
function calcularResultado() {
    try {
        // Converter os operadores visuais de volta para operadores matemáticos
        let expressaoMatematica = expressaoCompleta.replace(/×/g, '*').replace(/÷/g, '/');
        
        // Tratar o operador de porcentagem
        expressaoMatematica = expressaoMatematica.replace(/(\d+)%/g, function(match, p1) {
            let numero = parseFloat(p1);
            return numero / 100;
        });

        resultadoAnterior = eval(expressaoMatematica);
        expressaoCompleta = resultadoAnterior.toString();
    } catch (error) {
        expressaoCompleta = 'Erro';
    }
}

// Função para atualizar o visor com a expressão atual
function atualizarVisor() {
    display.value = expressaoCompleta;
    display.scrollLeft = display.scrollWidth; // Rola automaticamente para a direita
}

// Função para adicionar um ponto decimal à expressão
function adicionarPonto() {
    if (expressaoCompleta.slice(-1) !== '.') {
        expressaoCompleta += '.';
        atualizarVisor();
    }
}

// Função para inverter o sinal do último número na expressão
function inverterSinal() {
    if (expressaoCompleta !== '' && !isNaN(expressaoCompleta.slice(-1))) {
        let numeroAtual = parseFloat(expressaoCompleta.split(/[-+×÷]/).pop()) * -1;
        expressaoCompleta = expressaoCompleta.replace(/[\d.]+$/, numeroAtual);
        atualizarVisor();
    }
}

// Função para converter operadores matemáticos em operadores visuais
function operadorParaVisual(operador) {
    switch (operador) {
        case '*':
            return '×';
        case '/':
            return '÷';
        default:
            return operador;
    }
}

// Evento para interação do teclado
document.addEventListener('keydown', function(evento) {
    if (evento.keyCode >= 48 && evento.keyCode <= 57) { // Números 0 a 9
        adicionarNumero(evento.key);
    } else if (evento.keyCode === 107) { // Tecla de adição (+)
        definirOperador('+');
    } else if (evento.keyCode === 109) { // Tecla de subtração (-)
        definirOperador('-');
    } else if (evento.keyCode === 106) { // Tecla de multiplicação (*)
        definirOperador('*');
    } else if (evento.keyCode === 111) { // Tecla de divisão (/)
        definirOperador('/');
    } else if (evento.keyCode === 53 && evento.shiftKey) { // Tecla de porcentagem (%)
        definirOperador('%');
    } else if (evento.keyCode === 13) { // Tecla Enter (=)
        igualar();
    } else if (evento.keyCode === 8) { // Tecla Backspace (apagar último)
        apagarUltimo();
    } else if (evento.keyCode === 27) { // Tecla Esc (limpar visor)
        limparVisor();
    }
});





