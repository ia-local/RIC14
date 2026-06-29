/* slider-modalite.js - Gestion du Wizard d'Initiative */
const SLIDER_MODALITE = {
    currentStep: 1,

    // Initialisation
    init: function() {
        console.log("Slider Modalité initialisé.");
        this.goTo(1);
    },

    // Navigation entre les étapes
    goTo: function(step) {
        this.currentStep = step;
        
        // Cacher tous les steps
        document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
        // Afficher le step cible
        const targetStep = document.getElementById(`step-${step}`);
        if (targetStep) targetStep.classList.add('active');

        // Mise à jour des indicateurs visuels (si présents dans votre HTML)
        document.querySelectorAll('.step-indicator').forEach((el, index) => {
            if (index + 1 === step) el.classList.add('active');
            else el.classList.remove('active');
        });
    },

    // Récupération des données du formulaire pour le CRUD
    collectData: function() {
        return {
            title: document.getElementById('prop-title').value,
            question: document.getElementById('prop-question').value,
            description: document.getElementById('prop-desc').value,
            level: document.getElementById('prop-level').value,
            endDate: document.getElementById('prop-date').value
        };
    },

    // Validation et passage à l'étape suivante
    next: function() {
        if (this.currentStep < 3) {
            this.goTo(this.currentStep + 1);
        } else {
            this.submit();
        }
    },

    submit: function() {
        const data = this.collectData();
        // Appel au moteur RIC pour créer l'initiative (CRUD Create)
        RIC_ENGINE.createInitiativeFromSlider(data);
    }
};