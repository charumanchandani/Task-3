document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("expense-form");
    const list = document.getElementById("expense-list");
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  
    // Function to render expenses
    const renderExpenses = () => {
      list.innerHTML = "";
      expenses.forEach((expense, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${expense.category}: $${expense.amount}`;
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          expenses.splice(index, 1);
          updateLocalStorage();
          renderExpenses();
        });
  
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
      });
    };
  
    // Function to update local storage
    const updateLocalStorage = () => {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    };
  
    // Add expense
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const category = document.getElementById("category").value;
      const amount = parseFloat(document.getElementById("amount").value);
  
      if (category && amount) {
        expenses.push({ category, amount });
        updateLocalStorage();
        renderExpenses();
        form.reset();
      }
    });
  
    renderExpenses();
  });
  