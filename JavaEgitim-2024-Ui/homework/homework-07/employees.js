const employeeForm = document.getElementById('employee-form');
const employeeList = document.getElementById('employee-list');
const employeeInputUsername = document.getElementById('employee-username');
const employeeInputAge = document.getElementById('employee-age');
const employeeInputSalary = document.getElementById('employee-salary');

const updateEmployeeModal = new bootstrap.Modal(document.getElementById('updateEmployeeModal'));
const updateEmployeeForm = document.getElementById('update-employee-form');
const updateEmployeeUsername = document.getElementById('update-employee-username');
const updateEmployeeAge = document.getElementById('update-employee-age');
const updateEmployeeSalary = document.getElementById('update-employee-salary');
const deleteEmployeeModal = new bootstrap.Modal(document.getElementById('deleteEmployeeModal'));
const confirmDeleteButton = document.getElementById('confirm-delete-button');


let employees = [];
let currentEmployeeId = null;
let employeeToDeleteElement = null;

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/employee?_limit=5', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        employees = data;
        employees.forEach(employee => {
            addEmployeeToDOM(employee);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Update employee form submission
    updateEmployeeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const updatedEmployee = {
            username: updateEmployeeUsername.value.trim(),
            age: updateEmployeeAge.value.trim(),
            salary: updateEmployeeSalary.value.trim()
        };
        if (updatedEmployee.username !== '' && currentEmployeeId !== null) {
            updateEmployeeFromApi(currentEmployeeId, updatedEmployee);
        }
    });

    // Add new employee form submission
    employeeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newEmployee = {
            username: employeeInputUsername.value.trim(),
            age: employeeInputAge.value.trim(),
            salary: employeeInputSalary.value.trim()
        };
        if (newEmployee.username !== '' && newEmployee.age !== '' && newEmployee.salary !== '') {
            addEmployeeFromApi(newEmployee);
            employeeInputUsername.value = '';
            employeeInputAge.value = '';
            employeeInputSalary.value = '';
        }
    });

    // Confirm delete button click
    confirmDeleteButton.addEventListener('click', () => {
        if (currentEmployeeId !== null && employeeToDeleteElement !== null) {
            deleteEmployeeFromApi(currentEmployeeId, employeeToDeleteElement);
            deleteEmployeeModal.hide();
        }
    });
});

// Add employee from API
function addEmployeeFromApi(employee) {
    fetch('http://localhost:8080/employee/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    })
    .then(response => response.json())
    .then(newEmployee => {
        employees.push(newEmployee);
        addEmployeeToDOM(newEmployee);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Add employee to DOM
function addEmployeeToDOM(employee) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${employee.id}</td>
        <td>${employee.username}</td>
        <td>${employee.age}</td>
        <td>${employee.salary}</td>
        <td>
            <button class="btn btn-secondary btn-sm mr-2" onclick="editEmployee(${employee.id})">Update</button>
            <button class="btn btn-danger btn-sm" onclick="confirmDeleteEmployee(${employee.id}, this)">Delete</button>
        </td>
    `;
    employeeList.appendChild(tr);
}

// Confirm delete employee
function confirmDeleteEmployee(employeeId, employeeElement) {
    currentEmployeeId = employeeId;
    employeeToDeleteElement = employeeElement.closest('tr');
    deleteEmployeeModal.show();
}

// Delete employee from API
function deleteEmployeeFromApi(employeeId, employeeElement) {
    fetch(`http://localhost:8080/employee/delete/${employeeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => {
        employees = employees.filter(employee => employee.id !== employeeId);
        employeeElement.remove();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Edit employee
function editEmployee(employeeId) {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
        currentEmployeeId = employee.id;
        updateEmployeeUsername.value = employee.username;
        updateEmployeeAge.value = employee.age;
        updateEmployeeSalary.value = employee.salary;
        updateEmployeeModal.show();
    }
}

// Update employee from API
function updateEmployeeFromApi(employeeId, updatedEmployee) {
    return fetch(`http://localhost:8080/employee/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEmployee)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(updatedEmployee => {
        employees = employees.map(emp => emp.id === employeeId ? updatedEmployee : emp);
        employeeList.innerHTML = '';
        employees.forEach(employee => {
            addEmployeeToDOM(employee);
        });
        updateEmployeeModal.hide();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Update employee form submission
updateEmployeeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const updatedEmployee = {
        username: updateEmployeeUsername.value.trim(),
        age: updateEmployeeAge.value.trim(),
        salary: parseFloat(updateEmployeeSalary.value.trim()) // parseFloat ile ondalık sayıya dönüştürme
    };
    if (updatedEmployee.username !== '' && currentEmployeeId !== null) {
        updateEmployeeFromApi(currentEmployeeId, updatedEmployee);
    }
});

// Add new employee form submission
employeeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newEmployee = {
        username: employeeInputUsername.value.trim(),
        age: employeeInputAge.value.trim(),
        salary: parseFloat(employeeInputSalary.value.trim()) // parseFloat ile ondalık sayıya dönüştürme
    };
    if (newEmployee.username !== '' && newEmployee.age !== '' && !isNaN(newEmployee.salary)) { // isNaN ile sayı olup olmadığını kontrol etme
        addEmployeeFromApi(newEmployee);
        employeeInputUsername.value = '';
        employeeInputAge.value = '';
        employeeInputSalary.value = '';
    }
});
