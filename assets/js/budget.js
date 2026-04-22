let charts = [];

// ---------- Storage ----------

function getBudgetState() {
    const data = localStorage.getItem("budgetState");
    return data ? JSON.parse(data) : { balance: 0, categories: [] };
}

function saveBudgetState(state) {
    localStorage.setItem("budgetState", JSON.stringify(state));
}

// ---------- Balance Handling ----------

document.getElementById("balanceForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const balanceInput = document.getElementById("balance");
    const balance = parseFloat(balanceInput.value);

    if (isNaN(balance) || balance < 0) return;

    const state = getBudgetState();
    state.balance = balance;

    saveBudgetState(state);
    balanceInput.value = "";

    renderCharts();
});

// ---------- Category Handling ----------

document.getElementById("budgetForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const allocated = parseFloat(document.getElementById("allocated").value);
    const spent = parseFloat(document.getElementById("spent").value);

    if (!category || isNaN(allocated) || isNaN(spent)) return;

    const state = getBudgetState();

    const totalAllocated = state.categories.reduce((sum, c) => sum + c.allocated, 0);

    const existing = state.categories.find(c => c.category === category);

    let newTotalAllocated;

    if (existing) {
        newTotalAllocated = totalAllocated - existing.allocated + allocated;
    } else {
        newTotalAllocated = totalAllocated + allocated;
    }

    if (newTotalAllocated > state.balance) {
        alert("Allocated budget exceeds total balance.");
        return;
    }

    if (existing) {
        existing.allocated = allocated;
        existing.spent = spent;
    } else {
        state.categories.push({ category, allocated, spent });
    }

    saveBudgetState(state);

    document.getElementById("budgetForm").reset();

    renderCharts();
});

// ---------- Chart Helpers ----------

function clearCharts() {
    charts.forEach(chart => chart.destroy());
    charts = [];
}

function generateColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(`hsl(${i * 360 / count}, 70%, 60%)`);
    }
    return colors;
}

// ---------- Charts ----------

function createTotalChart(state) {
    const ctx = document.getElementById('totalBudgetChart').getContext('2d');

    const labels = state.categories.map(c => c.category);
    const values = state.categories.map(c => c.allocated);

    const totalAllocated = values.reduce((a, b) => a + b, 0);
    const remainingBalance = Math.max(0, state.balance - totalAllocated);

    labels.push("Unallocated");
    values.push(remainingBalance);

    const colors = generateColors(values.length);

    const chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Total Balance: $${state.balance}`
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    charts.push(chart);
}

function createCategoryCharts(state) {
    const container = document.getElementById('categoryCharts');
    container.innerHTML = '';

    state.categories.forEach(item => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('chart-container');

        const canvas = document.createElement('canvas');
        wrapper.appendChild(canvas);
        container.appendChild(wrapper);

        const remaining = Math.max(0, item.allocated - item.spent);

        const chart = new Chart(canvas, {
            type: 'pie',
            data: {
                labels: ['Spent', 'Remaining'],
                datasets: [{
                    data: [item.spent, remaining],
                    backgroundColor: ['#FF6384', '#4CAF50']
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: item.category
                    }
                }
            }
        });

        charts.push(chart);
    });
}

// ---------- Render ----------

function renderCharts() {
    clearCharts();

    const state = getBudgetState();

    if (!state.balance && state.categories.length === 0) return;

    createTotalChart(state);
    createCategoryCharts(state);
}

// ---------- Init ----------

document.addEventListener("DOMContentLoaded", () => {
    renderCharts();
});