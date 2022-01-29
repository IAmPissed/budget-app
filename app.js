// Expense Class: Represents an Expense
class Expense {
    constructor(title, value, id) {
        this.title = title
        this.value = value
        this.id = id
    }
}

// Income Class: Represents an Income
class Income {
    constructor(title, value, id) {
        this.title = title
        this.value = value
        this.id = id
    }
}

// Store Class: Handles Store
class Store {

    static getIncomes() {
        const incomes = JSON.parse(localStorage.getItem('incomes')) || []

        return incomes
    }
    static addIncome(income) {
        const incomes = Store.getIncomes()
        incomes.push(income)
        localStorage.setItem('incomes', JSON.stringify(incomes))
    }
    static removeIncome(incomeTitle) {
        const incomes = Store.getIncomes()

        incomes.forEach((income, index) => {
            if (income.title.toLowerCase() === incomeTitle.toLowerCase()) {
                incomes.splice(index, 1)
            }
        });
        localStorage.setItem('incomes', JSON.stringify(incomes))
    }
    static getExpenses() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || []

        return expenses
    }
    static addExpense(expense) {
        const expenses = Store.getExpenses()
        expenses.push(expense)
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }
    static removeExpense(expenseTitle) {
        const expenses = Store.getexpenses()

        expenses.forEach((expense, index) => {
            if (expense.title.toLowerCase() === expenseTitle.toLowerCase()) {
                expenses.splice(index, 1)
            }
        });
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }

}

// Balance Class: Handles Balance
class Balance {
    static sumIncomes() {
        let incomes = Store.getIncomes()
        let values = []
        incomes.forEach(incomeObj => {
            values.push(+incomeObj.value)
        })
        return values.reduce((curr, prev) => curr + prev, 0)
    }
    static sumExpenses() {
        let expenses = Store.getExpenses()
        let values = []
        expenses.forEach(expenseObj => {
            values.push(+expenseObj.value)
        })
        return values.reduce((curr, prev) => curr + prev, 0)
    }
    static currentBalance() {
        return this.sumIncomes() - this.sumExpenses()
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayIncomes() {
        const incomes = Store.getIncomes()

        incomes.forEach((income) => UI.addIncomeToList(income))
    }
    static addIncomeToList(income) {
        const table = document.querySelector('#income-table tbody')

        const row = document.createElement('tr')

        row.innerHTML = `
            <th scopte="row" class="text-center align-middle">${UI.nextNumber('income')}</th>
            <td class="text-capitalize align-middle">${income.title}</td>
            <td class="align-middle">${income.value}</td>
            <td class="income-icons d-flex justify-content-evenly"><i class="bi bi-pencil-square edit"></i><i class="bi bi-trash delete"></i></td>
        `
        table.append(row)
    }
    static removeIncome(el) {
        if (el.classList.contains('delete')) {
            const title = el.parentElement.parentElement.children[1].innerText
            el.parentElement.parentElement.remove()
            const incomes = Store.getIncomes()
            const index = incomes.findIndex((income) => income.title.toLowerCase() === title.toLowerCase())
            incomes.splice(index, 1)
            localStorage.setItem('incomes', JSON.stringify(incomes))
            document.querySelector('#income-amount').innerText = Balance.sumIncomes()
            document.querySelector('#balance-amount').innerText = Balance.currentBalance()
        }
    }
    static editIncome(el) {
        if (el.classList.contains('edit')) {
            const title = el.parentElement.parentElement.children[1].innerText
            const value = el.parentElement.parentElement.children[2].innerText

            document.querySelector('#income-title').value = title
            document.querySelector('#income-value').value = value

            // Remove the income from table
            el.parentElement.parentElement.remove()
            const incomes = Store.getIncomes()
            const index = incomes.findIndex((income) => income.title.toLowerCase() === title.toLowerCase())
            incomes.splice(index, 1)
            localStorage.setItem('incomes', JSON.stringify(incomes))
            document.querySelector('#income-amount').innerText = Balance.sumIncomes()
            document.querySelector('#balance-amount').innerText = Balance.currentBalance()

        }
    }
    static displayExpenses() {
        const expenses = Store.getExpenses()

        expenses.forEach((expense) => UI.addExpenseToList(expense))
    }
    static addExpenseToList(expense) {
        const table = document.querySelector('#expense-table tbody')

        const row = document.createElement('tr')

        row.innerHTML = `
            <th scope="row" class="align-middle text-center">${UI.nextNumber('expense')}</th>
            <td class="text-capitalize align-middle">${expense.title}</td>
            <td class="align-middle">${expense.value}</td>
            <td class="expense-icons d-flex justify-content-evenly"><i class="bi bi-pencil-square edit"></i><i class="bi bi-trash delete"></i></td>
        `
        table.append(row)
    }
    static removeExpense(el) {
        if (el.classList.contains('delete')) {
            const title = el.parentElement.parentElement.children[1].innerText
            el.parentElement.parentElement.remove()
            const expenses = Store.getExpenses()
            const index = expenses.findIndex((expense) => expense.title.toLowerCase() === title.toLowerCase())
            expenses.splice(index, 1)
            localStorage.setItem('expenses', JSON.stringify(expenses))
            document.querySelector('#expense-amount').innerText = Balance.sumExpenses()
            document.querySelector('#balance-amount').innerText = Balance.currentBalance()
        }

    }
    static editExpense(el) {
        if (el.classList.contains('edit')) {
            const title = el.parentElement.parentElement.children[1].innerText
            const value = el.parentElement.parentElement.children[2].innerText

            document.querySelector('#expense-title').value = title
            document.querySelector('#expense-value').value = value

            // Remove the expense from table
            el.parentElement.parentElement.remove()
            const expenses = Store.getExpenses()
            const index = expenses.findIndex((expense) => expense.title.toLowerCase() === title.toLowerCase())
            expenses.splice(index, 1)
            localStorage.setItem('expenses', JSON.stringify(expenses))
            document.querySelector('#expense-amount').innerText = Balance.sumExpenses()
            document.querySelector('#balance-amount').innerText = Balance.currentBalance()

        }
    }
    static displayIncomesValue() {
        document.querySelector('#income-amount').innerText = Balance.sumIncomes().toLocaleString()
    }
    static displayExpensesValue() {
        document.querySelector('#expense-amount').innerText = Balance.sumExpenses().toLocaleString()
    }
    static displayBalance() {
        document.querySelector('#balance-amount').innerText = Balance.currentBalance().toLocaleString()
        let balance = Balance.currentBalance()
        let classToApply = balance > 0 ? 'text-success' : 'text-danger';
        if (balance === 0) {
            classToApply = ''
        }
        document.querySelector('#balance-amount').className = classToApply
    }
    static checkValues(id) {
        return document.querySelector(`#${id}-title`).value === '' || document.querySelector(`#${id}-value`).value === '' || parseInt(document.querySelector(`#${id}-value`).value) <= 0
    }
    static validate(text) {
        const pattern = /^[^\s0-9\.\\\/\|\!\~\@\#\$\%\^\&\*\(\)\\+\=\]\[\{\}\'\"\:\;\?\<\>\,]+[a-zA-Z\-\_\s]{2,24}$/
        return pattern.test(text)
    }
    static showAlert(formId, msg, className) {
        // Message Div
        const div = document.createElement('div');
        div.className = `alert alert-${className} text-capitalize fst-italic`;
        div.innerText = msg
        const form = document.querySelector(`#${formId}-form`);
        const container = document.querySelector(`.${formId}-form-container`);
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000)

    }
    static updateNumbers(type, tableName) {
        let list = type === 'expenses' ? Store.getExpenses() : Store.getIncomes()
        const tableId = `#${tableName}-table`

        for (let i = 0; i < list.length; i++) {
            document.querySelector(`${tableId} > tbody > tr:nth-child(${i + 1}) > th`).innerText = i + 1
        }
    }
    static nextNumber(tableName) {
        const tableId = `#${tableName}-table`

        let lastItemNumber;
        if (document.querySelector(`${tableId} > tbody > tr:last-child th`)) {
            lastItemNumber = parseInt(document.querySelector(`${tableId} > tbody > tr:last-child th`).innerText)
            return lastItemNumber + 1
        }

        return 1
    }
    static clearFields(id) {
        document.querySelector(`#${id}-title`).value = ''
        document.querySelector(`#${id}-value`).value = ''
    }
    static collectValues(id) {
        const title = document.querySelector(`#${id}-title`).value
        const value = document.querySelector(`#${id}-value`).value

        return { title, value }
    }
}


// Event: Display Incomes, Expenses, Balance
document.addEventListener('DOMContentLoaded', () => {
    // Display Expenses
    UI.displayExpenses()

    // Display Incomes
    UI.displayIncomes()

    // Update Incomes Amount
    UI.displayIncomesValue()

    // Update Expenses Amount
    UI.displayExpensesValue()

    // Update Balance
    UI.displayBalance()
})


document.querySelectorAll('.title').forEach((formTitleInput) => {
    formTitleInput.addEventListener('keyup', (e) => {
        const titleText = e.target.value
        if (titleText.length === 0) {
            e.target.classList.remove('invalid')
            e.target.classList.remove('valid')
            return
        }
        if (UI.validate(titleText)) {
            e.target.classList.add('valid')
            e.target.classList.remove('invalid')
            return
        }
        if (!UI.validate(titleText)) {
            e.target.classList.add('invalid')
            e.target.classList.remove('valid')
            return
        }
    })
})

// Event: Add an Expense
document.querySelector('#expense-form').addEventListener('submit', (e) => {
    e.preventDefault()

    // Expense Details
    const { title } = UI.collectValues('expense')
    const { value } = UI.collectValues('expense')



    // Instantiate an Expense
    const expense = new Expense(title, value, Date.now())

    // Check for existing expense title
    const expenses = Store.getExpenses()
    if (expenses.some((expense) => expense.title.toLowerCase() === title.toLowerCase().trim().replace(/\s+/g, " "))) {
        UI.showAlert('expense', 'expense title already exists', 'danger')
        return
    }
    // Validate title and value
    if (UI.checkValues('expense') || !UI.validate(title)) {
        UI.showAlert('expense', 'Missing title/value or negative amount', 'danger')
        return
    }
    else {
        UI.showAlert('expense', 'expense added', 'success')

        // Vanish expense form values
        UI.clearFields('expense')

        // Add expense to list
        UI.addExpenseToList(expense)

        // Expense Number in Table
        UI.nextNumber('expense')

        // Store income
        Store.addExpense(expense)

        // Update Expenses Amount
        UI.displayExpensesValue()

        // Update Balance
        UI.displayBalance()
    }
})

// Event: Remove an Expense
document.querySelector('#expense-table').addEventListener('click', (e) => {
    UI.removeExpense(e.target)
    UI.displayBalance()
    UI.displayExpensesValue()
    UI.updateNumbers('expense')

})

// Event: Edit an Expense
document.querySelector('#expense-table').addEventListener('click', (e) => {
    UI.editExpense(e.target)
    UI.displayBalance()
    UI.displayExpensesValue()
    UI.updateNumbers('expenses', 'expense')
})




// Event: Add an Income
document.querySelector('#income-form').addEventListener('submit', (e) => {
    e.preventDefault()

    // Income Details
    const { title } = UI.collectValues('income')
    const { value } = UI.collectValues('income')

    // Check for existing income title
    const incomes = Store.getIncomes()
    if (incomes.some((income) => income.title.toLowerCase() === title.toLowerCase().trim().replace(/\s+/g, " "))) {
        UI.showAlert('income', 'income title already exists', 'danger')
        return
    }

    // Instantiate an Income
    const income = new Income(title, value, Date.now())

    // Validate title and value
    if (UI.checkValues('income') || !UI.validate(title)) {
        UI.showAlert('income', 'Missing title/value or negative amount', 'danger')
        return
    } else {
        // Alert
        UI.showAlert('income', 'income added', 'success')

        // Vanish income form values
        UI.clearFields('income')

        // Add income to list
        UI.addIncomeToList(income)

        // Income Number in Table

        // Store income
        Store.addIncome(income)

        // Update Incomes Amount
        UI.displayIncomesValue()

        // Update Balance
        UI.displayBalance()
    }
})



// Event: Remove an Income
document.querySelector('#income-table').addEventListener('click', (e) => {
    UI.removeIncome(e.target)
    UI.displayBalance()
    UI.displayIncomesValue()
    UI.updateNumbers('incomes', 'income')
})

// Event: Edit an Income
document.querySelector('#income-table').addEventListener('click', (e) => {
    UI.editIncome(e.target)
    UI.displayBalance()
    UI.displayIncomesValue()
    UI.updateNumbers('incomes', 'income')

})

