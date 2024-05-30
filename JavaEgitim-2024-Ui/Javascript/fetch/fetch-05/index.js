
document.addEventListener('DOMContentLoaded',() =>{

    fetch(`http://localhost:8080/employee`, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        updateDiv(data);
    })
        .catch(error => {
            console.error('Error :',error);
        });
       
    });

    function updateDiv(data){
    
    const employeeListDiv=document.getElementById('employee-list');
    
    employeeListDiv.innerHTML='';

    const ol = document.createElement('ol');
    data.forEach(employee => {
        const li = document.createElement('li');
        li.textContent=employee.username;
        ol.appendChild(li);
    });
    employeeListDiv.appendChild(ol);
    }