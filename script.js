// Load after DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Toggle Plus sur moi
    const moreBtn = document.getElementById('more-btn');
    const moreContent = document.getElementById('more-content');
    if (moreBtn && moreContent) {
        moreBtn.addEventListener('click', function () {
            const hidden = moreContent.classList.toggle('hidden');
            moreBtn.textContent = hidden ? 'Plus sur moi...' : 'Moins sur moi...';
        });
    }

    // Toggle Compétences
    const skillsBtn = document.getElementById('skills-btn');
    const skillsContent = document.getElementById('skills-content');
    if (skillsBtn && skillsContent) {
        skillsBtn.addEventListener('click', function () {
            const hidden = skillsContent.classList.toggle('hidden2');
            skillsBtn.textContent = hidden ? '🛠️ Compétences techniques...' : '🛠️ Compétences techniques (masquer)';
        });
    }

    // Buttons 
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('#projets article');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const key = this.id; // example frontend ou ia

            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            projects.forEach(p => {
                const cat = (p.getAttribute('data-category') || p.id || '').toLowerCase();
                // si key est all on affiche tout sinon on compare
                if (key === 'all' || cat.includes(key)) {
                    p.style.display = '';
                } else {
                    p.style.display = 'none';
                }
            });
        });
    });
});