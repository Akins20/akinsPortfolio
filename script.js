// Advanced Dark Mode Toggling

// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  const darkModeClass = 'dark-mode';
  const isDarkMode = body.classList.toggle(darkModeClass);

  // Store the user's preference in local storage
  localStorage.setItem('darkMode', isDarkMode.toString());
}

// Function to initialize dark mode based on user preference
function initializeDarkMode() {
  const body = document.body;
  const darkModeClass = 'dark-mode';
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  if (isDarkMode) {
    body.classList.add(darkModeClass);
  } else {
    body.classList.remove(darkModeClass);
  }
}

// Event listener for dark mode toggle button
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', toggleDarkMode);

// Initialize dark mode on page load
initializeDarkMode();

// Advanced Work Experience Card Toggling

// Function to toggle the description for a work experience card
function toggleDescription(event) {
  const card = event.currentTarget;
  card.classList.toggle('show-description');
}

// Add event listeners to all work experience cards
const workExperienceCards = document.querySelectorAll('.work-experience-card');
workExperienceCards.forEach(card => {
  card.addEventListener('click', toggleDescription);
});

