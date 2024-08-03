const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const btnNew = document.querySelector("#btnNew");

const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");
const total = document.querySelector(".total");

let items = [];

btnNew.onclick = () => {
  if (descItem.value === "" || amount.value === "" || type.value === "") {
    return alert("Preencha todos os campos!");
  }

  items.push({
    desc: descItem.value,
    amount: Math.abs(amount.value).toFixed(2),
    type: type.value,
  });

  setItensBD();
  loadItens();

  descItem.value = "";
  amount.value = "";
};

function deleteItem(index) {
  items.splice(index, 1);
  setItensBD();
  loadItens();
}

function insertItem(item, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${item.desc}</td>
    <td>R$ ${item.amount}</td>
    <td class="columnType">${
      item.type === "Entrada"
        ? '<i class="bx bxs-chevron-up-circle"></i>'
        : '<i class="bx bxs-chevron-down-circle"></i>'
    }</td>
    <td class="columnAction">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;

  tbody.appendChild(tr);
}

function loadItens() {
  items = getItensBD();
  tbody.innerHTML = "";
  items.forEach((item, index) => {
    insertItem(item, index);
  });

  getTotals();
}

function getTotals() {
  const amountIncomes = items
    .filter((item) => item.type === "Entrada")
    .map((transaction) => Number(transaction.amount));

  const amountExpenses = items
    .filter((item) => item.type === "Saída")
    .map((transaction) => Number(transaction.amount));

  const totalIncomes = amountIncomes
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);

  const totalExpenses = Math.abs(
    amountExpenses.reduce((acc, cur) => acc + cur, 0)
  ).toFixed(2);

  const totalItems = (totalIncomes - totalExpenses).toFixed(2);

  incomes.innerHTML = totalIncomes;
  expenses.innerHTML = totalExpenses;
  total.innerHTML = totalItems;
}

const getItensBD = () => JSON.parse(localStorage.getItem("db_items")) ?? [];
const setItensBD = () =>
  localStorage.setItem("db_items", JSON.stringify(items));

loadItens();

document.getElementById('menuInicio').onclick = () => showSection('inicio');
document.getElementById('menuGanhos').onclick = () => showSection('ganhos');
document.getElementById('menuGastos').onclick = () => showSection('gastos');
document.getElementById('menuQuizzes').onclick = () => showSection('quizzes');
document.getElementById('menuInvestimento').onclick = () => showSection('investimento');

function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.style.display = 'none');

  document.getElementById(sectionId).style.display = 'block';
}

// Perguntas do quiz
const quizData = [
  {
    question: "Qual é a melhor forma de economizar dinheiro?",
    a: "Gastar mais do que ganha",
    b: "Guardar uma porcentagem da renda mensal",
    c: "Não fazer orçamento",
    correct: "b",
    tip: "Guardar uma porcentagem da renda mensal ajuda a criar uma reserva financeira."
  },
  {
    question: "O que é um fundo de emergência?",
    a: "Dinheiro reservado para gastos inesperados",
    b: "Dinheiro investido em ações",
    c: "Dinheiro usado para compras mensais",
    correct: "a",
    tip: "Um fundo de emergência é essencial para cobrir gastos inesperados sem prejudicar seu orçamento."
  },
  {
    question: "Qual é a importância de um orçamento mensal?",
    a: "Ajudar a controlar os gastos e economizar",
    b: "Aumentar as dívidas",
    c: "Gastar sem se preocupar",
    correct: "a",
    tip: "Um orçamento mensal ajuda a controlar os gastos e a economizar de forma eficiente."
  },
  {
    question: "O que é um investimento de baixo risco?",
    a: "Investir em ações de empresas novas",
    b: "Investir em títulos do governo",
    c: "Investir em criptomoedas",
    correct: "b",
    tip: "Investir em títulos do governo geralmente é considerado um investimento de baixo risco."
  },
  {
    question: "Por que é importante diversificar os investimentos?",
    a: "Para aumentar o risco",
    b: "Para reduzir o risco",
    c: "Para concentrar os investimentos em uma única opção",
    correct: "b",
    tip: "Diversificar os investimentos ajuda a reduzir o risco de perdas significativas."
  },
  {
    question: "Qual é a vantagem de investir a longo prazo?",
    a: "Menor risco e maiores retornos",
    b: "Maior risco e menores retornos",
    c: "Alta liquidez",
    correct: "a",
    tip: "Investir a longo prazo geralmente oferece menor risco e potencial para maiores retornos."
  },
  {
    question: "O que é um CDB?",
    a: "Certificado de Depósito Bancário",
    b: "Certificado de Dívida Bancária",
    c: "Certificado de Depósito Bruto",
    correct: "a",
    tip: "CDB é um investimento oferecido pelos bancos com uma taxa de retorno fixa ou pós-fixada."
  },
  {
    question: "Qual é a melhor prática ao usar um cartão de crédito?",
    a: "Pagar o valor total da fatura mensal",
    b: "Pagar apenas o valor mínimo",
    c: "Ignorar a fatura",
    correct: "a",
    tip: "Pagar o valor total da fatura evita o acúmulo de juros e dívidas."
  },
  {
    question: "O que é uma reserva de emergência?",
    a: "Dinheiro guardado para viagens",
    b: "Dinheiro guardado para despesas médicas e imprevistos",
    c: "Dinheiro guardado para presentes",
    correct: "b",
    tip: "Uma reserva de emergência deve ser usada para cobrir despesas médicas e imprevistos."
  },
  {
    question: "O que é uma taxa de juros?",
    a: "Valor pago pelo empréstimo de dinheiro",
    b: "Valor recebido ao vender um bem",
    c: "Valor pago por um produto",
    correct: "a",
    tip: "A taxa de juros é o valor pago pelo empréstimo de dinheiro."
  }
];

const quizContainer = document.getElementById('quiz');
const submitQuiz = document.getElementById('submitQuiz');
const quizResult = document.getElementById('quizResult');

function loadQuiz() {
  quizContainer.innerHTML = '';
  quizData.forEach((quiz, index) => {
    const quizQuestion = document.createElement('div');
    quizQuestion.classList.add('quiz-question');
    
    quizQuestion.innerHTML = `
      <h3>${index + 1}. ${quiz.question}</h3>
      <div class="quiz-options">
        <label><input type="radio" name="question${index}" value="a"> ${quiz.a}</label>
        <label><input type="radio" name="question${index}" value="b"> ${quiz.b}</label>
        <label><input type="radio" name="question${index}" value="c"> ${quiz.c}</label>
      </div>
    `;
    
    quizContainer.appendChild(quizQuestion);
  });
}

submitQuiz.onclick = () => {
  let score = 0;
  quizResult.innerHTML = '';
  
  quizData.forEach((quiz, index) => {
    const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
    
    if (selectedOption) {
      const answer = selectedOption.value;
      
      if (answer === quiz.correct) {
        score++;
      } else {
        quizResult.innerHTML += `<p>Questão ${index + 1}: Resposta errada. Dica: ${quiz.tip}</p>`;
      }
    } else {
      quizResult.innerHTML += `<p>Questão ${index + 1}: Nenhuma resposta selecionada.</p>`;
    }
  });
  
  quizResult.innerHTML += `<p>Você acertou ${score} de ${quizData.length} perguntas.</p>`;
  if (score === quizData.length) {
    quizResult.innerHTML += '<p>Parabéns! Você acertou todas as perguntas!</p>';
  }
}

loadQuiz();
