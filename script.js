// Handle dark mode toggling
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const darkModeClass = 'dark-mode';

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle(darkModeClass);

  // Store the user's preference in local storage
  const isDarkMode = body.classList.contains(darkModeClass);
  localStorage.setItem('darkMode', isDarkMode);
});

// Check the user's preference from local storage and apply it on page load
const isDarkMode = localStorage.getItem('darkMode');
if (isDarkMode === 'true') {
  body.classList.add(darkModeClass);
} else {
  body.classList.remove(darkModeClass);
}

const workExperienceCards = document.querySelectorAll('.work-experience-card');

workExperienceCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('show-description');
  });
});