let charts = [];

// ---------- Local Storage Helpers ----------

function getBudgetData() {
    const data = localStorage.getItem("budgetData");
    return data ? JSON.parse(data) : [];
}

function saveBudgetData(data) {
    localStorage.setItem("budgetData", JSON.stringify(data));
}

// ---------- Form Handling ----------

document.getElementById("budgetForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const category = document.getElementById("category").value.trim();
    const allocated = parseFloat(document.getElementById("allocated").value);
    const spent = parseFloat(document.getElementById("spent").value);

    if (!category || isNaN(allocated) || isNaN(spent)) return;

    let data = getBudgetData();

    // Check if category exists → update instead of duplicate
    const existing = data.find(item => item.category === category);

    if (existing) {
        existing.allocated = allocated;
        existing.spent = spent;
    } else {
        data.push({ category, allocated, spent });
    }

    saveBudgetData(data);

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

function createTotalChart(data) {
    const ctx = document.getElementById('totalBudgetChart').getContext('2d');

    const labels = data.map(item => item.category);
    const values = data.map(item => item.allocated);

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
                    text: 'Total Budget Distribution'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    charts.push(chart);
}

function createCategoryCharts(data) {
    const container = document.getElementById('categoryCharts');
    container.innerHTML = '';

    data.forEach(item => {
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

// ---------- Main Render ----------

function renderCharts() {
    clearCharts();

    const data = getBudgetData();

    if (!data.length) return;

    createTotalChart(data);
    createCategoryCharts(data);
}

// ---------- Init ----------

document.addEventListener("DOMContentLoaded", () => {
    renderCharts();
});