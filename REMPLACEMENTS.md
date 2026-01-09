# Modifications à faire dans index.html

## 1. Remplacer les projets statiques (LIGNE 69-106 environ)

**AVANT :**
```html
        <div class="filters">
            <button class="filter-btn" id="all">Tous</button>
            <button class="filter-btn" id="frontend">Frontend</button>
            <button class="filter-btn" id="backend">Backend</button>
            <button class="filter-btn" id="fullstack">Full-Stack</button>
            <button class="filter-btn" id="ia">IA</button>
        </div>
        <article id="full-stack" data-category="fullstack">
            <h4>🎬 Application type Netflix (Full-Stack)</h4>
            <ul>
                <li>Authentification utilisateur</li>
                <li>Recherche de films via l'API TMDB</li>
                <li>Interface React avec barre de recherche</li>
                <li>Backend Express avec MongoDB</li>
            </ul>
        </article>
        <article id="todo-list" data-category="frontend">
            <h4>📝 To-Do List (Frontend)</h4>
            <ul>
                <li>Ajouter, supprimer et marquer des tâches comme terminées</li>
                <li>Interface utilisateur simple et intuitive</li>
                <li>Stockage des tâches dans le local storage</li>
            </ul>
        </article>
        <article id="sushi-bar" data-category="frontend">
            <h4>Site-vitrine Umuzoi-Sushi-Bar</h4>
            <ul>
                <li>Design responsive avec TypeScript et Tailwind CSS</li>
                <li>Navigation fluide </li>
                <li>Intégration de photos et de menus</li>
            </ul>
        </article>
        <article id="ai-report" data-category="ia">
            <h4>🤖 Compte Rendu Automatisé IA (en cours)</h4>
            <ul>
                <li>Compte rendu automatique à partir de données fournies</li>
                <li>Interface utilisateur simple pour interagir avec le chatbot</li>
                <li>Entraînement du modèle avec des données spécifiques</li>
                <li>Images Automatisé pris sur Unleash en fonction du sujet</li>
            </ul>
        </article>
```

**APRÈS :**
```html
        <div class="filters">
            <button class="filter-btn" id="all">Tous</button>
            <button class="filter-btn" id="frontend">Frontend</button>
            <button class="filter-btn" id="backend">Backend</button>
            <button class="filter-btn" id="fullstack">Full-Stack</button>
            <button class="filter-btn" id="ia">IA</button>
        </div>
        <!-- Les projets seront générés dynamiquement ici par app.js -->
        <div id="projects-container"></div>
```

## 2. Changer le script (LIGNE 156 environ)

**AVANT :**
```html
    <script src="script.js"></script>
```

**APRÈS :**
```html
    <script src="app.js"></script>
```

---

### Résumé pédagogique :
- ✅ Les données des projets sont maintenant dans `app.js` (objet `portfolioData`)
- ✅ Le HTML ne contient pas les données codées en dur
- ✅ Les projets sont générés dynamiquement via `renderProjects()`
- ✅ Le filtrage fonctionne via `setupFilters()`
- ✅ L'état est géré dans `appState`
- ✅ Le formulaire de contact avec validation est en place

Le code est simple, lisible, et suit les modalités pédagogiques !
