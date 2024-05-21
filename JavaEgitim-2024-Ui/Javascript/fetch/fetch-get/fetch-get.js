/*bir tane ürün için
*/

/*fetch('https://dummyjson.com/products/1')
    .then(response => response.json())
    .then(data => {
        updateTable(data)
    })
    .catch(error => {
        console.error("Error:", error);
    })

function updateTable(data) {

    console.log(data);
    console.log(data.id);
    console.log(data.brand);
 
    const tableBody = document.getElementById('table-body');
    const row = document.createElement('tr');
    row.innerHTML = ` 
    <td>${data.id}</td> 
    <td>${data.title}</td> 
    <td>${data.category}</td>
    <td>${data.price}</td>
    `  ;

    tableBody.appendChild(row);
}

*/



/*
Bütün ürünleri almak için For döngüsü kullanacğız. sıralama olamadan
*/



fetch('https://dummyjson.com/products',{
    method: 'GET'
})
.then(response => response.json())
.then(data => {
    updateTable(data)
    
})
.catch(error => {
    console.error('Error:', error)
})

function updateTable(data) {
    console.log(data);
    console.log(data.products[0].id);
    console.log(data.products[0].brand);
    console.log(data.products[0].category);
    console.log(data.products[0].description);

    
    const tableBody = document.getElementById('table-body');

    data.products.forEach(element => {
        const row = document.createElement('tr');
        row.innerHTML= ` 
        <td>${element.id}</td> 
        <td>${element.title}</td> 
        <td>${element.category}</td>
        <td>${element.price}</td>
        ` ;
        tableBody.appendChild(row);
    }); 
}
    
