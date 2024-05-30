document.querySelector('a[href="create.html"]').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = 'create.html';

    const content = document.getElementById('content');
    content.innerHTML = ''; //içeriği temizle
    fetch('create.html')
        .then(response => response.text())
        .then(data => {
            content.innerHTML = data;
        }).catch(error => {
            console.error("Error:", error);
        });
});