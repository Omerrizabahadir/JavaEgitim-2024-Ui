
// JSON verisini almak için API URL'si
const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

// Tabloyu güncelleyen işlev

function updateTable(todos) {
    const tableBody = document.getElementById('todo-table');
    tableBody.innerHTML = '';

    todos.forEach((todo) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${todo.id}</td>
            <td>${todo.title}</td>
            <td>${todo.completed}</td>
            <td><input type="checkbox" class="form-check-input" data-todo-id="${todo.id}" ${todo.completed ? 'checked' : ''}></td>
            <td><button class="btn btn-primary" data-todo-id="${todo.id}">Detay</td>
        `;
        tableBody.appendChild(row);
    });
}
// JSON verisini API'den al
fetch(apiUrl, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then((response) => response.json())
    .then((data) => {
        updateTable(data);
   
        // Checkbox tıklamalarını dinle
const checkboxes = document.querySelectorAll('.form-check-input');
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        const todoId = checkbox.getAttribute('data-todo-id');
        
        })
    });


// Detay butonlarını dinle
const detailButtons = document.querySelectorAll('.btn-primary');
detailButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const todoId = button.getAttribute('data-todo-id');
        window.location.href = `detail-todo.html?id=${todoId}`;
    });
});
});
// Önceki sayfaya dönme fonksiyonu
function goBack() {
    window.history.back();
  }