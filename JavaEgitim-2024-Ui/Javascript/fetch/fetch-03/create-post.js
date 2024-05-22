const postForm = document.getElementById('post-form');

postForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    console.log(title)
    const body = document.getElementById('body').value;
    console.log(body)
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ //string ifadeleri JSON'a çevirir.
            title,
            body,
            userId: 1,
        })
    }).then(response => response.json())
        .then(data => {
            console.log('Oluşturulan Gönderi:', data);
            // İsteği başarıyla tamamladığınızı kullanıcıya bildirebilirsiniz
            alert('Gönderi başarıyla oluşturuldu!');
            // Formu temizle
            postForm.reset();
        })
        .catch(error => {
            console.error("Error:", error);
        })
    console.log("Gönderi oluşturuldu.")
});