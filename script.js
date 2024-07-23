let salario = 0;
let totalGastos = 0;

document.getElementById('salario-form').addEventListener('submit', function(event) {
    event.preventDefault();
    salario = parseFloat(document.getElementById('salario').value);
    atualizarSaldo();
    document.getElementById('salario-form').reset();
});

document.getElementById('gastos-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const categoria = document.getElementById('categoria').value;

    if (!isNaN(valor) && valor > 0) {
        const li = document.createElement('li');
        li.textContent = `${descricao} (${categoria}): R$ ${valor.toFixed(2)}`;
        document.getElementById('lista-gastos').appendChild(li);

        totalGastos += valor;
        document.getElementById('total-gastos').textContent = totalGastos.toFixed(2);
        atualizarSaldo();

        document.getElementById('gastos-form').reset();
    }
});

document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const idade = parseInt(document.getElementById('idade').value);
    const dividas = document.getElementById('dividas').value.toLowerCase();
    const investimentos = document.getElementById('investimentos').value.toLowerCase();
    const poupanca = parseFloat(document.getElementById('poupanca').value);

    let resultado = '';
    let saldo = salario - totalGastos;

    if (saldo > 0) {
        resultado += `Parabéns! Você está economizando R$ ${saldo.toFixed(2)} por mês.\n`;
    } else {
        resultado += `Atenção! Você está gastando R$ ${Math.abs(saldo).toFixed(2)} a mais do que sua renda mensal.\n`;
    }

    if (dividas === 'sim') {
        resultado += 'Você possui dívidas. É importante focar em quitá-las o mais rápido possível.\n';
    }

    if (investimentos === 'não') {
        resultado += 'Considere começar a investir para melhorar sua saúde financeira.\n';
    }

    if (poupanca < salario * 3) {
        resultado += 'Sua poupança está abaixo do recomendado. Tente economizar pelo menos 3 meses de salário.\n';
    }

    if (idade < 30) {
        resultado += 'Você tem tempo a seu favor. Comece a investir cedo para aproveitar os juros compostos.\n';
    } else if (idade >= 30 && idade <= 50) {
        resultado += 'Foque em diversificar seus investimentos e garantir uma aposentadoria confortável.\n';
    } else {
        resultado += 'Revise seu portfólio de investimentos e garanta que esteja alinhado com seus objetivos de aposentadoria.\n';
    }

    document.getElementById('resultado-quiz').textContent = resultado;
});

function atualizarSaldo() {
    const saldo = salario - totalGastos;
    document.getElementById('saldo').textContent = saldo.toFixed(2);
}
