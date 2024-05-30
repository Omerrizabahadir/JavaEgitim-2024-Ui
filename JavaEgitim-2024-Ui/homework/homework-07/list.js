// JSON verisini almak için API URL'si
const apiUrl = 'http://localhost:8080/employee'; // API URL

// Tabloyu güncelleyen işlev
function updateTable(employee) {
    // Tablo gövdesini bul
    const tableBody = document.getElementById('employee-table');
    tableBody.innerHTML = ''; // Mevcut içeriği temizle

    // Her bir çalışan için tablo satırı oluştur
    employee.forEach((employee) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.username}</td>
            <td>${employee.age}</td>
            <td>${employee.salary}</td>
            <td>
                <button class="btn btn-primary" onclick="redirectToEmployeeList(${employee.id})">Modify Employee</button>
            </td>
        `;
        // Yeni satırı tablo gövdesine ekle
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
.then((response) => {
    // Yanıtın başarılı olup olmadığını kontrol et
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json(); // JSON verisini çöz
})
.then((data) => {
    console.log(data); // Veriyi konsolda kontrol et
    updateTable(data); // Tabloyu güncelle
})
.catch((error) => {
    console.error('There was a problem with the fetch operation:', error); // Hata durumunda konsola yazdır
});

// Employee List sayfasına yönlendirme işlevi
function redirectToEmployeeList(employeeId) {
    window.location.href = 'employees.html'; // Employee List sayfasına yönlendir
}
