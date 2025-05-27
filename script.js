let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

document.getElementById("expense-form").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const note = document.getElementById("note").value;

  const expense = { date, category, amount, note };
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  
  this.reset();
  renderExpenses();
  renderCategoryTotals();
});

function renderExpenses() {
  const tbody = document.querySelector("#expense-table tbody");
  tbody.innerHTML = "";
  expenses.forEach(e => {
    const row = `<tr>
      <td>${e.date}</td>
      <td>${e.category}</td>
      <td>${e.amount.toFixed(2)}</td>
      <td>${e.note}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function renderCategoryTotals() {
  const totals = {};
  expenses.forEach(e => {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  });

  const ul = document.getElementById("category-totals");
  ul.innerHTML = "";
  for (let cat in totals) {
    ul.innerHTML += `<li>${cat}: ₹${totals[cat].toFixed(2)}</li>`;
  }
}

function searchByDate() {
  const searchDate = document.getElementById("search-date").value;
  const ul = document.getElementById("search-results");
  ul.innerHTML = "";

  const found = expenses.filter(e => e.date === searchDate);
  if (found.length === 0) {
    ul.innerHTML = "<li>No expenses found for this date.</li>";
  } else {
    found.forEach(e => {
      ul.innerHTML += `<li>${e.date} - ${e.category} - ₹${e.amount} - ${e.note}</li>`;
    });
  }
}

// Initial rendering
renderExpenses();
renderCategoryTotals();
