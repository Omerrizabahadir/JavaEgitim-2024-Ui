

//Ürünleri price'a göre sıralama
//Ürünleri isme göre sıralama

document.addEventListener('DOMContentLoaded', function() {
    let products = [];

    // Ürün verilerini fetch etme
    fetch('https://dummyjson.com/products', {
        method: 'GET'                           //GET işlemi yani datanın(listenin getirilmesi) default. yani GET yazmasanda OLUR
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.products && data.products.length > 0) {
            products = data.products;
            console.log('Fetched products:', products);
            sortProductsByPrice();  // Ürünleri fiyata göre sıralama
            //sortProductsByName();   // Ürünleri isme göre sıralama
            updateTable(products); // Sıralanan ürünleri tabloya ekleme
        } else {
            console.error('Error: Invalid data format or empty products array', data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Tabloyu güncelleme fonksiyonu
    function updateTable(data) {
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = '';

        if (data.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="4">No data available</td>`;
            tableBody.appendChild(row);
            return;
        }

        data.forEach(element => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${element.id}</td>
                <td>${element.title}</td>
                <td>${element.category}</td>
                <td>${element.price}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Fiyata göre sıralama fonksiyonu
    function sortProductsByPrice() {
        if (products && products.length > 0) {
            products.sort((a, b) => a.price - b.price);
        } else {
            console.error('Error: No products to sort');
        }
    }
     // İsme göre sıralama fonksiyonu
     function sortProductsByName() {
        if (products && products.length > 0) {
            products.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            console.error('Error: No products to sort');
        }
    }
});
