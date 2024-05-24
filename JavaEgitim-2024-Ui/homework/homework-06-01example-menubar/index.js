document.addEventListener('DOMContentLoaded', function () {
    const dropdownMenuButton = document.getElementById('dropdownMenuButton');
    const createTodoLink = document.querySelector('a[href="#create-todo.html"]');
    const listTodoLink = document.querySelector('a[href="#list-todo.html"]');

    dropdownMenuButton.addEventListener('click', function () {
        const dropdownMenu = document.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.classList.toggle('show');
        }
    });

    if (createTodoLink) {
        createTodoLink.addEventListener('click', function (event) {
            event.preventDefault();

            fetch('create-todo.html')
                .then(response => response.text())
                .then(data => {
                    const content = document.getElementById('content');
                    content.innerHTML = data;
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        });
    }

    if (listTodoLink) {
        listTodoLink.addEventListener('click', function (event) {
            event.preventDefault();

            fetch('list-todo.html')
                .then(response => response.text())
                .then(data => {
                    const content = document.getElementById('content');
                    content.innerHTML = data;
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        });
    }
});
