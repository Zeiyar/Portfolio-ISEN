const moreBtn = document.getElementById('more-btn');
const moreContent = document.getElementById('more-content');

const skillsBtn = document.getElementById('skills-btn');
const skillsContent = document.getElementById('skills-content');

moreBtn.addEventListener('click', () => {
    moreContent.classList.toggle('hidden');
});

skillsBtn.addEventListener('click', () => {
    skillsContent.classList.toggle('hidden2');
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('#projets article');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        projects.forEach(project => {
            if (filter === 'all' || project.id.toLowerCase() === filter) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }
);
});