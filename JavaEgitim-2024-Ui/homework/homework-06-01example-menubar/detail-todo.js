
   // URL'den todo ID'sini al
const urlParams = new URLSearchParams(window.location.search);
const todoId = urlParams.get('id');

// JSON verisini almak için API URL'si
const apiUrl = `https://jsonplaceholder.typicode.com/todos/${todoId}`;

// JSON verisini API'den al
fetch(apiUrl, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then((response) => response.json())
    .then((data) => {
        showPostDetails(data);
    })
    .catch((error) => {
        console.error('Veri alınırken bir hata oluştu: ', error);
    });


function showPostDetails(data) {
    const todoDetails = document.getElementById('todo-details');

    todoDetails.innerHTML = `
  <table class="table table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Completed</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${data.id}</td>
                <td>${data.title}</td>
                <td>${data.completed}</td>
            </tr>
        </tbody>
    </table>
    `;
}
    
 // Önceki sayfaya dönme fonksiyonu
function goBack() {
    window.history.back();
  }
