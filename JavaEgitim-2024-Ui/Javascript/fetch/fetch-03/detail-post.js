// URL'den post ID'sini al
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

// JSON verisini almak için API URL'si
const apiUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;

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
     c

function showPostDetails(data) {
    const postDetails = document.getElementById('post-details');

    postDetails.innerHTML = `
    <h5>userId: ${data.userId}</h5>
    <h5>id: ${data.id}</h5>
   <h2>title: ${data.title}</h2>
   <p>data: ${data.body}</p>
   `;
}