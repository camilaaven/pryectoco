const monthSelect = document.getElementById('month-select');
const calendarBody = document.getElementById('calendar-body');


const expositions = {
    1: { 10: 'Pintura', 20: 'Escultura' },
    2: { 5: 'Fotografía', 15: 'Arquitectura' }, 
    3: { 3: 'Arte manuelino', 26: 'Arte manuelino xvi' },   
    4: { 5: 'Arte manuelino xv', 26: 'Instalaciones' },   
    5: { 5: 'Arte azulejo', 15: 'Arte azulejo xv' },   
    6: { 3: 'Arte azulejo xv', 15: 'Arte azulejo xvi' },   
    7: { 5: 'Escultura manuelina', 26: 'Paisaje manuelino' },   
    8: { 5: 'Arte portugal', 15: 'Arte manuelino' },   
    9: { 3: 'Arte promanuelino', 26: 'Arte manuelino xv' },   
    10: { 5: 'Arte de nates de la caida', 15: 'Arte manuelino xvi' },   
    11: { 5: 'Azulejos xv', 26: 'Azulejos xx' },   
    12: { 3: 'Arte premanuelino', 15: 'Arte manuelino arquitectura' }, 
  };
  
  monthSelect.addEventListener('change', generateCalendar);
  
  function generateCalendar() {
    const month = parseInt(monthSelect.value);
    const year = new Date().getFullYear();
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();
  
    let html = '';
  
    // Generar filas y celdas para el calendario
    for (let i = 0; i < 6; i++) {
      html += '<tr>';
      for (let j = 0; j < 7; j++) {
        const day = i * 7 + j - firstDayOfWeek + 1;
        if (day > 0 && day <= daysInMonth) {
          const cellId = `cell-${year}-${month}-${day}`;
          html += `<td id="${cellId}"${hasExposition(day, month) ? ' class="exposition"' : ''}>${day}</td>`;
        } else {
          html += '<td></td>';
        }
      }
      html += '</tr>';
    }
  
    calendarBody.innerHTML = html;
  
    // Agregar evento de clic a las celdas de exposición
    for (const monthExpositions of Object.values(expositions)) {
      for (const day in monthExpositions) {
        const cellId = `cell-${year}-${month}-${day}`;
        const cell = document.getElementById(cellId);
        if (cell) {
          const type = monthExpositions[day];
          cell.dataset.expositionType = type; // Almacenar el tipo de exposición en un atributo de datos
          cell.addEventListener('click', () => showExpositionInfo(month, day, type));
        }
      }
    }
  }
  
  function hasExposition(day, month) {
    // Verificar si el día actual tiene una exposición asociada
    return expositions.hasOwnProperty(month) && expositions[month].hasOwnProperty(day);
  }
  
  function showExpositionInfo(month, day, type) {
      const expositionInfo = getExpositionInfo(month, day, type);
      const expositionInfoContainer = document.getElementById('exposition-info');
      if (expositionInfo) {
          expositionInfoContainer.textContent = expositionInfo;
          expositionInfoContainer.style.display = 'block';
      } else {
          expositionInfoContainer.style.display = 'none';
      }
  }
  
  // La función getExpositionInfo(month, day, type) devuelve la información de la exposición para la fecha dada
  function getExpositionInfo(month, day, type) {
      return `El ${day}/${month} habrá una exposición de ${type}.`;
  }