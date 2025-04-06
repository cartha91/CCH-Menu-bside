const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const monthSelect = document.getElementById('month');
const yearSelect = document.getElementById('year');
const menuContainer = document.getElementById('menu');
const saveButton = document.getElementById('saveMenu');
const loadButton = document.getElementById('loadMenu');
const printButton = document.getElementById('printMenu');

// Populate month and year selectors
months.forEach(month => {
  const option = document.createElement('option');
  option.textContent = month;
  monthSelect.appendChild(option);
});

const currentYear = new Date().getFullYear();
for (let year = currentYear - 5; year <= currentYear + 5; year++) {
  const option = document.createElement('option');
  option.textContent = year;
  yearSelect.appendChild(option);
}

// Function to adjust textarea size
function adjustTextareaSize(textarea) {
  textarea.style.height = 'auto'; // Reset height
  textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height dynamically

  textarea.style.width = 'auto'; // Reset width
  textarea.style.width = `${textarea.scrollWidth}px`; // Adjust width dynamically
}

// Create the menu layout
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
function renderMenu() {
  menuContainer.innerHTML = ''; // Clear previous menu
  days.forEach(day => {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'day';
      dayDiv.innerHTML = `
          <h3>${day}</h3>
          <div class="meal">
              <label>Breakfast:</label>
              <textarea class="breakfast" placeholder="Enter breakfast"></textarea>
          </div>
          <div class="meal">
              <label>Lunch:</label>
              <textarea class="lunch" placeholder="Enter lunch"></textarea>
          </div>
          <div class="meal">
              <label>Dinner:</label>
              <textarea class="dinner" placeholder="Enter dinner"></textarea>
          </div>
          <div class="meal">
              <label>Snack:</label>
              <textarea class="snack" placeholder="Enter snack"></textarea>
          </div>
      `;
      menuContainer.appendChild(dayDiv);

      // Add event listeners to dynamically adjust size
      dayDiv.querySelectorAll('textarea').forEach(textarea => {
          textarea.addEventListener('input', () => adjustTextareaSize(textarea));
      });
  });
}

// Save menu to local storage
saveButton.addEventListener('click', () => {
  const menuData = {};
  document.querySelectorAll('.day').forEach(dayDiv => {
      const dayName = dayDiv.querySelector('h3').textContent;
      menuData[dayName] = {
          breakfast: dayDiv.querySelector('.breakfast').value,
          lunch: dayDiv.querySelector('.lunch').value,
          dinner: dayDiv.querySelector('.dinner').value,
          snack: dayDiv.querySelector('.snack').value,
      };
  });
  localStorage.setItem('weeklyMenu', JSON.stringify(menuData));
  alert('Menu saved successfully!');
});

// Load menu from local storage
loadButton.addEventListener('click', () => {
  const menuData = JSON.parse(localStorage.getItem('weeklyMenu'));
  if (menuData) {
      document.querySelectorAll('.day').forEach(dayDiv => {
          const dayName = dayDiv.querySelector('h3').textContent;
          dayDiv.querySelector('.breakfast').value = menuData[dayName]?.breakfast || '';
          dayDiv.querySelector('.lunch').value = menuData[dayName]?.lunch || '';
          dayDiv.querySelector('.dinner').value = menuData[dayName]?.dinner || '';
          dayDiv.querySelector('.snack').value = menuData[dayName]?.snack || '';
      });
      alert('Menu loaded successfully!');
  } else {
      alert('No menu found!');
  }
});

// Print menu
printButton.addEventListener('click', () => {
  window.print();
});

// Render menu when the page loads
renderMenu();