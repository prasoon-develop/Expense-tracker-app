const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const addBtn = document.getElementById("addTransactionBtn");
const list = document.getElementById("transactionList");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {

    list.innerHTML = "";

    let total = 0;
    let inc = 0;
    let exp = 0;

    transactions.forEach((t, index) => {

        const li = document.createElement("li");

        li.classList.add("transaction");

        li.classList.add(t.amount > 0 ? "plus" : "minus");

        li.innerHTML = `
            ${t.text} <span>₹${t.amount}</span>
            <button class="delete-btn" onclick="removeTransaction(${index})">X</button>
        `;

        list.appendChild(li);

        total += Number(t.amount);

        if (t.amount > 0) {
            inc += Number(t.amount);
        } else {
            exp += Number(t.amount);
        }

    });

    balance.innerText = `₹${total}`;
    income.innerText = `₹${inc}`;
    expense.innerText = `₹${Math.abs(exp)}`;

    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {

    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please enter values");
        return;
    }

    const transaction = {
        text: text.value,
        amount: Number(amount.value)
    };

    transactions.push(transaction);

    text.value = "";
    amount.value = "";

    updateUI();
}

function removeTransaction(index) {

    transactions.splice(index, 1);

    updateUI();
}

addBtn.addEventListener("click", addTransaction);

updateUI();