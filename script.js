const moreBtn = document.getElementById('more-btn');
const moreContent = document.getElementById('more-content');

const skillsBtn = document.getElementById('skills-btn');
const skillsContent = document.getElementById('skills-content');

moreBtn.addEventListener('click', () => {
    moreContent.classList.toggle('hidden');
});

skillsBtn.addEventListener('click', () => {
    skillsContent.classList.toggle('hidden');
});
