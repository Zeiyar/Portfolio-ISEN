// Simple, easy-to-read JavaScript for toggles and project filters
document.addEventListener('DOMContentLoaded', function () {
    // Toggle sections: "Plus sur moi" and "Compétences"
    const moreBtn = document.getElementById('more-btn');
    const moreContent = document.getElementById('more-content');
    const skillsBtn = document.getElementById('skills-btn');
    const skillsContent = document.getElementById('skills-content');

    function simpleToggle(button, section, showText, hideText) {
        if (!button || !section) return;
        button.addEventListener('click', function () {
            const hidden = section.classList.toggle('hidden');
            // update button label so it's clear what it does
            button.textContent = hidden ? showText : hideText;
        });
    }

    simpleToggle(moreBtn, moreContent, 'Plus sur moi...', 'Moins sur moi...');
    simpleToggle(skillsBtn, skillsContent, '🛠️ Compétences techniques...', '🛠️ Compétences techniques (masquer)');

    // Project filtering by category
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
});