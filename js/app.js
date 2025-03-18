// Añade este código al final de tu archivo JavaScript existente
// o dentro del evento DOMContentLoaded

document.addEventListener('DOMContentLoaded', function() {
    // Obtener el botón por su texto y clase en lugar de por ID
    const cerrarButton = document.querySelector('button.cerrar-button, button:contains("Cerrar")') || 
                         document.querySelector('.cerrar-button') || 
                         document.querySelector('button[id="cerrar"]');
    
    if (cerrarButton) {
        console.log('Botón Cerrar encontrado:', cerrarButton);
        
        // Eliminar cualquier evento previo (por si acaso)
        cerrarButton.replaceWith(cerrarButton.cloneNode(true));
        
        // Obtener la referencia actualizada
        const newCerrarButton = document.querySelector('button.cerrar-button, button:contains("Cerrar")') || 
                               document.querySelector('.cerrar-button') || 
                               document.querySelector('button[id="cerrar"]');
        
        if (newCerrarButton) {
            // Añadir el evento de clic directamente con múltiples enfoques
            newCerrarButton.onclick = function(e) {
                console.log('Botón Cerrar clickeado');
                e.preventDefault();
                
                // Intentar cerrar el modal de múltiples maneras
                const modal = document.getElementById('result-modal') || 
                             document.querySelector('.modal') || 
                             document.querySelector('.modal-container') ||
                             this.closest('.modal') || 
                             this.closest('.modal-container');
                
                if (modal) {
                    console.log('Modal encontrado:', modal);
                    modal.classList.add('hidden');
                    modal.style.display = 'none';
                } else {
                    console.log('Modal no encontrado, intentando con el padre del botón');
                    // Si no podemos encontrar el modal, intentar ocultar el contenedor padre
                    let parent = this.parentElement;
                    while (parent && !parent.classList.contains('modal') && parent.tagName !== 'BODY') {
                        parent = parent.parentElement;
                    }
                    
                    if (parent && parent.tagName !== 'BODY') {
                        console.log('Contenedor padre encontrado:', parent);
                        parent.classList.add('hidden');
                        parent.style.display = 'none';
                    }
                }
            };
            
            console.log('Evento click asignado al botón Cerrar');
        }
    } else {
        console.log('Botón Cerrar no encontrado, buscando por selector genérico');
        
        // Intento alternativo - buscar cualquier botón que parezca ser de cerrar
        const possibleCloseButtons = document.querySelectorAll('button');
        possibleCloseButtons.forEach(btn => {
            if (btn.textContent.trim().toLowerCase() === 'cerrar') {
                console.log('Encontrado botón cerrar por texto:', btn);
                btn.onclick = function() {
                    const modal = document.querySelector('.modal') || 
                                 document.getElementById('result-modal') ||
                                 btn.closest('.modal');
                    if (modal) {
                        modal.classList.add('hidden');
                        modal.style.display = 'none';
                    }
                };
            }
        });
    }
});