// À remplacer intégralement dans slider-modalite.js
const SLIDER_MODALITE = {
    currentStep: 1,

    init: function() {
        this.goTo(1);
    },

    goTo: function(step) {
        this.currentStep = step;
        document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
        const targetStep = document.getElementById(`step-${step}`);
        if (targetStep) targetStep.classList.add('active');

        document.querySelectorAll('.step-indicator').forEach((el, index) => {
            if (index + 1 === step) {
                el.classList.add('active');
                el.style.color = '#000091';
                el.style.borderBottomColor = '#000091';
                el.style.fontWeight = 'bold';
            } else {
                el.classList.remove('active');
                el.style.color = '#666666';
                el.style.borderBottomColor = '#e5e5e5';
                el.style.fontWeight = 'normal';
            }
        });
    },

    next: function() {
        if (this.currentStep === 1) {
            if(!document.getElementById('prop-title').value || !document.getElementById('prop-question').value) {
                RIC_ENGINE.showToast("Le titre et la question sont obligatoires.", "error");
                return;
            }
            if(!document.getElementById('prop-unite-matiere').checked) {
                RIC_ENGINE.showToast("Vous devez certifier l'unité de matière.", "error");
                return;
            }
            this.goTo(2);
        } else if (this.currentStep === 2) {
            if(!document.getElementById('prop-date').value) {
                RIC_ENGINE.showToast("Veuillez définir une date butoir.", "error");
                return;
            }
            this.goTo(3);
        } else if (this.currentStep === 3) {
            this.goTo(4); // Déclenchée manuellement ou via le bouton du Collège
        }
    },

    prev: function(step) {
        this.goTo(step);
    },

    collectData: function() {
        return {
            title: document.getElementById('prop-title').value,
            question: document.getElementById('prop-question').value,
            description: document.getElementById('prop-desc').value,
            ricType: document.getElementById('prop-ric-type').value,
            level: document.getElementById('prop-level').value,
            modality: document.getElementById('prop-modality').value,
            endDate: document.getElementById('prop-date').value
        };
    },

    submit: function() {
        const data = this.collectData();
        RIC_ENGINE.createInitiativeFromSlider(data);
        
        // Reset form
        document.getElementById('prop-title').value = '';
        document.getElementById('prop-question').value = '';
        document.getElementById('prop-desc').value = '';
        document.getElementById('prop-unite-matiere').checked = false;
        document.getElementById('prop-date').value = '';
        
        this.goTo(1);
    }
};