function validarInputSoloLetras(input) {
    const regex = /[^a-zA-Z\s]/g;
    input.value = input.value.replace(regex, '');
}

function validarSoloNumeros(input) {
    const regex = /[^0-9]/g;
    input.value = input.value.replace(regex, '');
}

window.onload = function() {
    fetch('departments.json')  
    .then(response => response.json())
    .then(data => {
        const selectDepartamento = document.getElementById('selectDepartamento');
        data.forEach(departamento => {
            const optionElement = document.createElement('option');
            optionElement.value = departamento.code;
            optionElement.textContent = departamento.name;
            selectDepartamento.appendChild(optionElement);
        });
    })
    .catch(error => console.error('Error cargando departamentos:', error));

   
    document.getElementById('selectDepartamento').addEventListener('change', function() {
        const selectedDepartment = this.value;

        
        fetch('towns.json')  
        .then(response => response.json())
        .then(data => {
            const selectCiudad = document.getElementById('selectCiudad');
            
            selectCiudad.innerHTML = '';

            const ciudades = data.filter(ciudad => ciudad.department === selectedDepartment);

            ciudades.forEach(ciudad => {
                const optionElement = document.createElement('option');
                optionElement.value = ciudad.code;
                optionElement.textContent = ciudad.name;
                selectCiudad.appendChild(optionElement);
            });
        })
        .catch(error => console.error('Error cargando ciudades:', error));
    });
};
let contadorID = 0; 

document.getElementById('agregarBtn').addEventListener('click', function() {

    
   

    const apellido= document.getElementById('apellidos');
    const nombre= document.getElementById('nombres');
    const selectDepartamento = document.getElementById('selectDepartamento');
    const selectCiudad = document.getElementById('selectCiudad');
    const fecha= document.getElementById('fecha');
    const salario= document.getElementById('salario');

    const apellidoE=apellido.value;
    const nombreE=nombre.value;
    const departamentoSeleccionado = selectDepartamento.options[selectDepartamento.selectedIndex].text;
    const ciudadSeleccionada = selectCiudad.options[selectCiudad.selectedIndex].text;
    const fechaE= fecha.value;
    const salarioE = salario.value;


    const tabla = document.getElementById('resultados').getElementsByTagName('tbody')[0];


    const nuevaFila = tabla.insertRow();

    const celda1 = nuevaFila.insertCell(0);
    const celda2 = nuevaFila.insertCell(1);
    const celda3 = nuevaFila.insertCell(2);
    const celda4 = nuevaFila.insertCell(3);
    

    celda1.textContent = nombreE +" "+ apellidoE;
    celda2.textContent = ciudadSeleccionada;
    celda3.textContent = fechaE;
    contadorID++
    celda4.textContent= contadorID;

 
});




