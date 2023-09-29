function validarInputSoloLetras(input) {
    const regex = /[^a-zA-Z\s]/g;
    input.value = input.value.replace(regex, '');
}

function validarSoloNumeros(input) {
    const regex = /[^0-9]/g;
    input.value = input.value.replace(regex, '');
}

window.onload = function() {
    // Primero, cargar los departamentos (usando tu primer JSON)
    fetch('departments.json')  // Cambia a la ruta correcta de tu archivo.
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

    // Ahora, escuchar cuando se cambia el departamento
    document.getElementById('selectDepartamento').addEventListener('change', function() {
        const selectedDepartment = this.value;

        // Cargar las ciudades basado en el departamento seleccionado (usando tu segundo JSON)
        fetch('towns.json')  // Cambia a la ruta correcta de tu archivo.
        .then(response => response.json())
        .then(data => {
            const selectCiudad = document.getElementById('selectCiudad');
            
            // Limpiar las ciudades anteriores
            selectCiudad.innerHTML = '';

            // Filtrar las ciudades que pertenecen al departamento seleccionado
            const ciudades = data.filter(ciudad => ciudad.department === selectedDepartment);

            // Agregar las ciudades filtradas al segundo select
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

