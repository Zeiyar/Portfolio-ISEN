// ===== STRUCTURE DES DONNÉES =====
// Les projets sont stockés dans un objet JavaScript (pas codés en dur dans le HTML)
const portfolioData = {
  projects: [
    {
      id: 'full-stack',
      title: '🎬 Application type Netflix (Full-Stack)',
      category: ['fullstack'],
      description: [
        'Authentification utilisateur',
        'Recherche de films via l\'API TMDB',
        'Interface React avec barre de recherche',
        'Backend Express avec MongoDB'
      ]
    },
    {
      id: 'todo-list',
      title: '📝 To-Do List (Frontend)',
      category: ['frontend'],
      description: [
        'Ajouter, supprimer et marquer des tâches comme terminées',
        'Interface utilisateur simple et intuitive',
        'Stockage des tâches dans le local storage'
      ]
    },
    {
      id: 'sushi-bar',
      title: 'Site-vitrine Umuzoi-Sushi-Bar',
      category: ['frontend'],
      description: [
        'Design responsive avec TypeScript et Tailwind CSS',
        'Navigation fluide',
        'Intégration de photos et de menus'
      ]
    },
    {
      id: 'ai-report',
      title: '🤖 Compte Rendu Automatisé IA (en cours)',
      category: ['ia'],
      description: [
        'Compte rendu automatique à partir de données fournies',
        'Interface utilisateur simple pour interagir avec le chatbot',
        'Entraînement du modèle avec des données spécifiques',
        'Images Automatisé pris sur Unleash en fonction du sujet'
      ]
    }
  ]
};

// État de l'application (simple)
const appState = {
  activeFilter: 'all',
  formData: {
    name: '',
    email: '',
    message: ''
  }
};

// ===== GÉNÉRER LES PROJETS DYNAMIQUEMENT =====
function renderProjects(filter = 'all') {
  const projectsContainer = document.getElementById('projects-container');

  // If a dynamic container exists, render from data into it.
  if (projectsContainer) {
    projectsContainer.innerHTML = ''; // Vider le conteneur

    // Filtrer les projets
    const filtered = portfolioData.projects.filter(p => {
      if (filter === 'all') return true;
      return p.category.includes(filter);
    });

    // Créer les éléments HTML pour chaque projet
    filtered.forEach(project => {
      const article = document.createElement('article');
      article.id = project.id;
      article.setAttribute('data-category', project.category.join(' '));
      article.innerHTML = `
        <h4>${project.title}</h4>
        <ul>
          ${project.description.map(desc => `<li>${desc}</li>`).join('')}
        </ul>
      `;
      projectsContainer.appendChild(article);
    });

    return; // done
  }

  // Fallback: if no dynamic container, try to filter existing static articles inside #projets
  const staticArticles = document.querySelectorAll('#projets article');
  if (staticArticles.length) {
    staticArticles.forEach(a => {
      const catAttr = (a.getAttribute('data-category') || a.id || '').toLowerCase();
      const cats = catAttr.split(' ').map(s => s.trim()).filter(Boolean);
      if (filter === 'all' || cats.includes(filter)) {
        a.style.display = '';
      } else {
        a.style.display = 'none';
      }
    });
  }
}

// ===== GÉRER LES FILTRES =====
function setupFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const filter = this.id; // 'all', 'frontend', 'fullstack', 'ia'

      // Mettre à jour l'état
      appState.activeFilter = filter;

      // Marquer le bouton actif visuellement
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Rendu des projets filtrés
      renderProjects(filter);
    });
  });

  // Active state initial sur "Tous"
  const allBtn = document.getElementById('all');
  if (allBtn) allBtn.classList.add('active');
}

// ===== GÉRER LES TOGGLES (Plus sur moi, Compétences) =====
function setupToggles() {
  // Toggle "Plus sur moi"
  const moreBtn = document.getElementById('more-btn');
  const moreContent = document.getElementById('more-content');
  if (moreBtn && moreContent) {
    moreBtn.addEventListener('click', function () {
      const hidden = moreContent.classList.toggle('hidden');
      moreBtn.textContent = hidden ? 'Plus sur moi...' : 'Moins sur moi...';
    });
  }

  // Toggle "Compétences" - utilise hidden2
  const skillsBtn = document.getElementById('skills-btn');
  const skillsContent = document.getElementById('skills-content');
  if (skillsBtn && skillsContent) {
    skillsBtn.addEventListener('click', function () {
      const hidden = skillsContent.classList.toggle('hidden2');
      skillsBtn.textContent = hidden ? '🛠️ Compétences techniques...' : '🛠️ Compétences techniques (masquer)';
    });
  }
}

// ===== FORMULAIRE DE CONTACT =====
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('contact-submit');
  const feedback = document.getElementById('contact-feedback');

  // --- Temporary storage helpers (sessionStorage) ---
  const STORAGE_KEY = 'contactFormTemp';

  function saveFormToStorage() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(appState.formData));
    } catch (err) {
      // ignore storage errors
    }
  }

  function loadFormFromStorage() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (err) {
      return null;
    }
  }

  // Load any saved values into the form and appState
  const saved = loadFormFromStorage();
  if (saved) {
    appState.formData = Object.assign(appState.formData, saved);
    if (nameInput) nameInput.value = appState.formData.name || '';
    if (emailInput) emailInput.value = appState.formData.email || '';
    if (messageInput) messageInput.value = appState.formData.message || '';
  }

  // Écouter les changements d'entrée et sauvegarder temporairement
  if (nameInput) nameInput.addEventListener('input', (e) => {
    appState.formData.name = e.target.value;
    saveFormToStorage();
  });
  if (emailInput) emailInput.addEventListener('input', (e) => {
    appState.formData.email = e.target.value;
    saveFormToStorage();
  });
  if (messageInput) messageInput.addEventListener('input', (e) => {
    appState.formData.message = e.target.value;
    saveFormToStorage();
  });

  // Soumettre le formulaire
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const validation = validateForm();

    if (validation.valid) {
      // Afficher un message de succès
      feedback.textContent = '✅ Message envoyé avec succès ! Merci de votre intérêt.';
      feedback.style.color = '#10b981';
      feedback.style.display = 'block';

      // Réinitialiser le formulaire et le stockage temporaire
      if (nameInput) nameInput.value = '';
      if (emailInput) emailInput.value = '';
      if (messageInput) messageInput.value = '';
      appState.formData = { name: '', email: '', message: '' };
      try { sessionStorage.removeItem(STORAGE_KEY); } catch (err) {}

      // Masquer le message après 5 secondes
      setTimeout(() => {
        feedback.style.display = 'none';
      }, 5000);
    } else {
      // Afficher un message d'erreur
      feedback.textContent = '❌ ' + validation.error;
      feedback.style.color = '#ef4444';
      feedback.style.display = 'block';
    }
  });
}

// ===== VALIDATION DU FORMULAIRE =====
function validateForm() {
  const { name, email, message } = appState.formData;

  // Vérifier que tous les champs sont remplis
  if (!name.trim()) {
    return { valid: false, error: 'Veuillez entrer votre nom.' };
  }
  if (!email.trim()) {
    return { valid: false, error: 'Veuillez entrer votre email.' };
  }
  if (!message.trim()) {
    return { valid: false, error: 'Veuillez entrer un message.' };
  }

  // Valider le format de l'email (simple)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Veuillez entrer un email valide (ex: user@example.com).' };
  }

  // Vérifier la longueur minimale du message
  if (message.trim().length < 10) {
    return { valid: false, error: 'Le message doit contenir au moins 10 caractères.' };
  }

  return { valid: true };
}

// ===== INITIALISER L'APP =====
document.addEventListener('DOMContentLoaded', function () {
  // Rendu initial des projets
  renderProjects('all');

  // Initialiser les filtres
  setupFilters();

  // Initialiser les toggles
  setupToggles();

  // Initialiser le formulaire de contact
  setupContactForm();
});

const heroBtn = document.getElementById("hero-cta");
const target = document.getElementById("about");

if (heroBtn) {
  // Ensure the button's container is positioned so absolute particles are placed correctly
  const parent = heroBtn.closest('.hero') || heroBtn.parentElement;
  if (parent && getComputedStyle(parent).position === 'static') {
    parent.style.position = 'relative';
  }

  heroBtn.addEventListener("click", (e) => {
    const rect = heroBtn.getBoundingClientRect();
    const parentRect = (heroBtn.closest('.hero') || heroBtn.parentElement).getBoundingClientRect();

    for (let i = 0; i < 25; i++) {
      const particle = document.createElement("span");
      particle.classList.add("particle");

      const x = (Math.random() - 0.5) * 200 + "px";
      const y = (Math.random() - 0.5) * 200 + "px";

      particle.style.setProperty("--x", x);
      particle.style.setProperty("--y", y);

      // position particle at click coordinates relative to the .hero container
      const clickX = (e.clientX - parentRect.left) + "px";
      const clickY = (e.clientY - parentRect.top) + "px";
      particle.style.left = clickX;
      particle.style.top = clickY;

      // append to the hero container so absolute coordinates match parentRect
      const container = heroBtn.closest('.hero') || heroBtn.parentElement;
      container.appendChild(particle);

      setTimeout(() => particle.remove(), 800);
    }

    // small visual feedback: hide CTA briefly
    heroBtn.style.opacity = "0";
    heroBtn.style.pointerEvents = "none";

    setTimeout(() => {
      if (target) target.scrollIntoView({ behavior: "smooth" });
      // restore CTA after animation completes
      setTimeout(() => {
        heroBtn.style.opacity = "";
        heroBtn.style.pointerEvents = "";
      }, 600);
    }, 250);
  });
}
