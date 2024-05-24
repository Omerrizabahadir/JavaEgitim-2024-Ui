document.querySelector('a[href="create-todo.html"]').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = 'create-todo.html';

    const content = document.getElementById('content');
    content.innerHTML = ''; //içeriği temizle
    fetch('create-todo.html')
        .then(response => response.text())
        .then(data => {
            content.innerHTML = data;
        }).catch(error => {
            console.error("Error:", error);
        });
});