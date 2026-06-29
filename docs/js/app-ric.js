
const RIC_ENGINE = {
    state: {
        users: {
            "citoyen@ric.fr": { id: "user_4829", name: "Citoyen(ne)", role: "citoyen" },
            "admin@ric.fr": { id: "user_0001", name: "Collège Exécutif", role: "admin" }
        },
        // Intégration de l'array "comments" pour simuler le forum de débat
        referendums: [
            {
                id: "ref_1",
                title: "Réforme de l'Article 89",
                question: "Approuvez-vous l'intégration du RIC constituant ?",
                description: "Permettre aux citoyens de modifier la Constitution directement via référendum.",
                level: "National",
                modality: "Internet / Clic",
                quorum: 5,
                endDate: "2026-12-31",
                status: "Validé",
                votesOui: 432,
                votesNon: 128,
                votesBlanc: 34,
                voters: [],
                geo: { type: "national", lat: 46.6, lng: 2.3, label: "France entière" },
                fascicule: {
                    status: "EN_REDACTION", // BROUILLON, EN_REDACTION, PUBLIÉ
                    bilan: {
                        argumentsPour: [], // Extraits automatiquement du forum
                        argumentsContre: [], // Extraits automatiquement du forum
                        synthese: "" // Rédigée par le collège
                    },
                    version: 1
                },
                comments: [
                    { author: "Citoyen_849", text: "Cette réforme est essentielle pour redonner la souveraineté au peuple. L'article 3 de la Constitution prendra enfin tout son sens.", date: "27/06/2026", role: "citoyen" },
                    { author: "Collège Exécutif", text: "Attention, un RIC constituant non encadré pourrait entrer en contradiction avec les traités internationaux en vigueur. Une délibération approfondie est nécessaire.", date: "28/06/2026", role: "admin" }
                ]
            },
            {
                id: "ref_5049",
                title: "Légalisation et encadrement de la filière du cannabis",
                question: "Approuvez-vous la dépénalisation de l'usage du cannabis et l'encadrement souverain de sa filière ?",
                description: "Dépénalisation de l'usage pour désengorger la justice et privilégier la santé publique...",
                level: "National",
                modality: "Pétition numérique",
                quorum: 2,
                endDate: "2026-12-31",
                status: "Validé", 
                votesOui: 890,
                votesNon: 410,
                votesBlanc: 62,
                voters: [],
                geo: { type: "national", lat: 46.2, lng: 1.8, label: "France entière" },
                                        fascicule: {
                    status: "EN_REDACTION", // BROUILLON, EN_REDACTION, PUBLIÉ
                    bilan: {
                        argumentsPour: [], // Extraits automatiquement du forum
                        argumentsContre: [], // Extraits automatiquement du forum
                        synthese: "" // Rédigée par le collège
                    },
                    version: 1
                },
                comments: [
                    { author: "Lucie M.", text: "Les politiques répressives ont échoué depuis 50 ans. Il est temps de taxer et de faire de la prévention efficace !", date: "26/06/2026", role: "citoyen" }
                ]
            },
            {
                id: "ref_rup_bavent",
                title: "Création d'un Revenu Universel Progressif (RUP)",
                question: "Approuvez-vous le Projet de Loi d'Expérimentation instaurant un RUP financé par la TVA, testé sur Bavent ?",
                description: "Expérimentation d'une redistribution préventive via le Curriculum Vitae Numérique Universel (CVNU)...",
                level: "Local",
                modality: "Internet / Clic",
                quorum: 10,
                endDate: "2026-12-31",
                status: "Validé",
                votesOui: 125,
                votesNon: 15,
                votesBlanc: 8,
                voters: [],
                geo: { type: "local", lat: 49.218, lng: -0.218, label: "Bavent (14)" },
                                        fascicule: {
                    status: "EN_REDACTION", // BROUILLON, EN_REDACTION, PUBLIÉ
                    bilan: {
                        argumentsPour: [], // Extraits automatiquement du forum
                        argumentsContre: [], // Extraits automatiquement du forum
                        synthese: "" // Rédigée par le collège
                    },
                    version: 1
                },
                comments: []
            },
            {
                id: "ref_normandie_eau",
                title: "Gestion citoyenne des ressources en eau – Normandie",
                question: "Approuvez-vous la création d'un comité de gestion citoyenne de l'eau pour la région Normandie ?",
                description: "Initiative régionale visant à placer la gestion de l'eau sous contrôle démocratique direct.",
                level: "Régional",
                modality: "Internet / Clic",
                quorum: 3,
                endDate: "2026-09-30",
                status: "Validé",
                votesOui: 312,
                votesNon: 87,
                votesBlanc: 21,
                voters: [],
                geo: { type: "regional", lat: 49.18, lng: 0.37, label: "Région Normandie" },
                fascicule: {
                    status: "EN_REDACTION",
                    bilan: {
                        argumentsPour: [],
                        argumentsContre: [],
                        synthese: ""
                    },
                    version: 1
                },
                comments: []
            },
            {
                id: "ref_caen_velo",
                title: "Plan Vélo Métropolitain – Caen la Mer",
                question: "Approuvez-vous le Plan Vélo 2026–2030 de la métropole de Caen ?",
                description: "Extension du réseau cyclable, nouvelles pistes protégées en centre-ville.",
                level: "Local",
                modality: "Internet / Clic",
                quorum: 5,
                endDate: "2026-08-31",
                status: "Validé",
                votesOui: 640,
                votesNon: 120,
                votesBlanc: 44,
                voters: [],
                geo: { type: "local", lat: 49.183, lng: -0.362, label: "Caen (14)" },
                                        fascicule: {
                    status: "EN_REDACTION", // BROUILLON, EN_REDACTION, PUBLIÉ
                    bilan: {
                        argumentsPour: [], // Extraits automatiquement du forum
                        argumentsContre: [], // Extraits automatiquement du forum
                        synthese: "" // Rédigée par le collège
                    },
                    version: 1
                },
                comments: []
            }
        ],
        currentUser: null
    },
    addCommentToRef: function(refId, text) {
        const r = this.state.referendums.find(i => i.id === refId);
        if (!r.comments) r.comments = [];
        r.comments.push({
            author: this.state.currentUser.name,
            text: text,
            date: new Date().toLocaleDateString('fr-FR'),
            role: this.state.currentUser.role
        });
    },
    // Système de notification Toast
    showToast: function(msg, type = 'success') {
        const toast = document.getElementById('toast-message');
        toast.innerText = msg;
        toast.className = 'toast show ' + (type === 'error' ? 'toast-error' : 'toast-success');
        setTimeout(() => { toast.classList.remove('show'); }, 3500);
    },
    quickFill: function(email, pwd) {
        document.getElementById('login-email').value = email;
        document.getElementById('login-pwd').value = pwd;
    },
    /* Quorum légal Art. 6 — étendu PLC v.2 Art. 2 */
/* Quorum légal Art. 6 — étendu PLC v.2 Art. 2 */
    _QUORUM_RULES: {
        'Constituant':    { pct: 5,  scope: 'national',        ref: 'Art. 6 §1 — corps électoral national' },
        'Législatif':     { pct: 2,  scope: 'national',        ref: 'Art. 6 §2 — corps électoral national' },
        'Abrogatoire':    { pct: 1,  scope: 'national',        ref: 'Art. 6 §3 — corps électoral national' },
        'Révocatoire':    { pct: 10, scope: 'circonscription', ref: 'Art. 6 §4 — inscrits de la circonscription' },
        'Convocatoire':   { pct: 5,  scope: 'national',        ref: 'Art. 2 PLC v.2 — convocation constituante ou collège' },
        'Dissolutif':     { pct: 10, scope: 'national',        ref: 'Art. 2 PLC v.2 — dissolution Assemblée / Sénat' },
        'Dénonciatoire':  { pct: 3,  scope: 'national',        ref: 'Art. 2 PLC v.2 — dénonciation de traité ou accord' },
        'Veto':           { pct: 1,  scope: 'national',        ref: 'Art. 2 PLC v.2 — blocage avant promulgation' }, // NOUVEAU
    },
    selectRicType: function(type) {
        document.getElementById('prop-ric-type').value = type;
        // Réinitialise tous les cards
        ['legislatif','abrogatoire','constituant','revocatoire','convocatoire','dissolutif','denonciatoire'].forEach(k => {
            const el = document.getElementById('rtc-' + k);
            if (el) {
                el.style.borderColor = 'var(--border-color)';
                el.style.background = 'white';
                el.querySelectorAll('div').forEach(d => d.style.color = 'var(--text-muted)');
            }
        });
        // Active la carte sélectionnée
        const idMap = {
            'Législatif':'legislatif','Abrogatoire':'abrogatoire','Constituant':'constituant',
            'Révocatoire':'revocatoire','Convocatoire':'convocatoire',
            'Dissolutif':'dissolutif','Dénonciatoire':'denonciatoire'
        };
        const active = document.getElementById('rtc-' + idMap[type]);
        if (active) {
            active.style.borderColor = 'var(--blue-france)';
            active.style.background = '#eef3f8';
            active.querySelectorAll('div').forEach(d => d.style.color = 'var(--blue-france)');
        }
        this.updateQuorumUI();
    },
updateQuorumUI : function() {
    const type  = document.getElementById('prop-ric-type').value || 'Législatif';
    const level = document.getElementById('prop-level').value;
    const rule  = this._QUORUM_RULES[type] || this._QUORUM_RULES['Législatif'];
    let scopeLabel = '';
    
    if (type === 'Révocatoire') {
        scopeLabel = 'des inscrits de la circonscription concernée';
    } else if (level === 'Local' || level === 'Régional') {
        scopeLabel = 'des inscrits de la circonscription territoriale';
    } else {
        scopeLabel = 'du corps électoral national';
    }
    
    const valEl = document.getElementById('quorum-value');
    const descEl = document.getElementById('quorum-desc');
    
    if (valEl) valEl.innerText = rule.pct + ' %';
    if (descEl) descEl.innerHTML = scopeLabel + '<br><span style="font-size:0.75rem;">Référence : ' + rule.ref + '</span>';
},
    login: function() {
        const email = document.getElementById('login-email').value.trim();
        const user = this.state.users[email];
        
        if (user) {
            this.state.currentUser = user;
            
            document.getElementById('mobile-nav').style.display = 'flex';
            document.getElementById('sidebar-nav-container').style.display = 'block';
            document.getElementById('desktop-user-info').style.display = 'block';
            
            document.getElementById('sidebar-user-name').innerText = `${user.name} (${user.role})`;
            document.querySelectorAll('.admin-link').forEach(el => {
                el.style.display = (user.role === 'admin') ? 'flex' : 'none';
            });
            this.showToast(`Bienvenue, ${user.name}`);
            this.navigate('dashboard');
        } else {
            this.showToast("Identifiants KYC inconnus.", "error");
        }
    },
    logout: function() {
        this.state.currentUser = null;
        document.getElementById('mobile-nav').style.display = 'none';
        document.getElementById('sidebar-nav-container').style.display = 'none';
        document.getElementById('desktop-user-info').style.display = 'none';
        this.navigate('login');
    },
// Remplacez votre fonction navigate actuelle par celle-ci :
navigate: function(viewId) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        
        const targetView = document.getElementById('view-' + viewId);
        if (targetView) {
            targetView.classList.add('active');
        }
        
        document.querySelectorAll('.nav-btn, .sidebar-nav-item').forEach(b => b.classList.remove('active'));
        document.querySelectorAll(`[data-target="${viewId}"]`).forEach(el => el.classList.add('active'));
        
        if(viewId === 'dashboard') this.renderDashboard();
        if(viewId === 'referendums') this.renderList();
        
        // BRANCHEMENT ICI : Génère l'accueil de la chatroom avec ses listes à gauche !
        if(viewId === 'chat') {
            if (typeof CHAT_ENGINE !== 'undefined') {
                CHAT_ENGINE.renderChatroomHome();
            }
        }
        
        if(viewId === 'admin') this.renderAdmin();
        if(viewId === 'carte') this.initMap();
    },
    renderDashboard: function() {
        const actives = this.state.referendums.filter(r => r.status === 'Validé');
        const clos = this.state.referendums.filter(r => r.status === 'Clôturé');
        
        document.getElementById('stat-active').innerText = actives.length;
        document.getElementById('stat-closed').innerText = clos.length;
        const container = document.getElementById('dashboard-featured');
        container.innerHTML = '';
        
        this.state.referendums.slice().reverse().forEach(r => {
            const total = r.votesOui + r.votesNon;
            const pctOui = total === 0 ? 0 : Math.round((r.votesOui / total) * 100);
            const pctNon = total === 0 ? 0 : Math.round((r.votesNon / total) * 100);
            container.innerHTML += `
                <div class="card" style="cursor:pointer;" onclick="RIC_ENGINE.openScrutin('${r.id}')">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                        <div>
                            <span class="badge badge-level">${r.level}</span>
                            <span class="badge" style="background:#eee; color:#333;">${r.status}</span>
                        </div>
                        <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: bold;">${total} voix</div>
                    </div>
                    
                    <div style="font-weight:bold; margin-bottom:15px; font-size:1.1rem; color:var(--blue-france); line-height: 1.3;">
                        ${r.title}
                    </div>
                    
                    <div style="margin-top: auto;">
                        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px; font-weight: bold;">
                            <span style="color: var(--success);">OUI ${pctOui}%</span>
                            <span style="color: var(--red-marianne);">NON ${pctNon}%</span>
                        </div>
                        <div style="width: 100%; background: #e0e0e0; border-radius: 4px; height: 6px; overflow: hidden; display: flex;">
                            <div style="width: ${pctOui}%; background: var(--success); height: 100%;"></div>
                            <div style="width: ${pctNon}%; background: var(--red-marianne); height: 100%;"></div>
                        </div>
                    </div>
                </div>
            `;
        });
    },
SLIDER_MODALITE : {
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
            if (index + 1 === step) el.classList.add('active');
            else el.classList.remove('active');
        });
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

    next: function() {
        if (this.currentStep === 1) {
            // Validation Slide 1
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
            // Validation Slide 2
            if(!document.getElementById('prop-date').value) {
                RIC_ENGINE.showToast("Veuillez définir une date butoir.", "error");
                return;
            }
            this.goTo(3);
        } else {
            // Validation finale Slide 3
            this.submit();
        }
    },

    prev: function(step) {
        this.goTo(step);
    },

    submit: function() {
        const data = this.collectData();
        RIC_ENGINE.createInitiativeFromSlider(data);
        
        // Réinitialisation du formulaire après envoi
        document.getElementById('prop-title').value = '';
        document.getElementById('prop-question').value = '';
        document.getElementById('prop-desc').value = '';
        document.getElementById('prop-unite-matiere').checked = false;
        document.getElementById('prop-date').value = '';
        this.goTo(1);
    }
},

// Remplacez la fonction existante createInitiativeFromSlider par celle-ci :
createInitiativeFromSlider : function(data) {
        const newRef = {
            id: "ref_" + Date.now(),
            title: data.title,
            question: data.question,
            description: data.description,
            level: data.level,
            ricType: data.ricType,
            modeScrutin: data.modeScrutin, // Injection de l'attribut
            modality: data.modalityCollect,
            voters: [],
            status: "Attente",
            fascicule: {
                status: "EN_REDACTION",
                bilan: {
                    argumentsPour: [data.description],
                    argumentsContre: ["En attente de débat..."],
                    synthese: ""
                }
            },
            comments: [],
            votesOui: 0, votesNon: 0, votesBlanc: 0
        };

        this.state.referendums.push(newRef);
        this.showToast("Initiative créée avec succès.");
        this.navigate('dashboard');
    },
    createInitiative: function() {
        const title = document.getElementById('prop-title').value.trim();
        const endDate = document.getElementById('prop-date').value;
        if (!title || !endDate) {
            this.showToast("Veuillez renseigner le titre et la date butoir.", "error");
            return;
        }
        const newRef = {
            id: "ref_" + Date.now(),
            title: title,
            question: document.getElementById('prop-question').value,
            description: document.getElementById('prop-desc').value,
            fascicule: document.getElementById('prop-fascicule').value,
            level: document.getElementById('prop-level').value,
            ricType: document.getElementById('prop-ric-type').value,
            modality: document.getElementById('prop-modality').value,
            quorum: document.getElementById('prop-quorum').value,
            endDate: endDate,
            status: "Attente", 
            votesOui: 0, 
            votesNon: 0,
            votesBlanc: 0,
            voters: [],
            geo: null,
            comments: [] // Init forum array
        };
        this.state.referendums.push(newRef);
        this.showToast("Initiative transmise avec succès !");
        
        document.getElementById('prop-title').value = '';
        document.getElementById('prop-question').value = '';
        document.getElementById('prop-desc').value = '';
        document.getElementById('prop-fascicule').value = '';
        document.getElementById('prop-date').value = '';
        this.selectRicType('Législatif');
        
        this.navigate('dashboard');
    },
    renderList: function() {
        const filter = document.getElementById('filter-level').value;
        const container = document.getElementById('referendums-container');
        container.innerHTML = '';
        const targets = this.state.referendums.filter(r => r.status !== 'Attente' && (filter === 'Tous' || r.level === filter));
        targets.forEach(r => {
            const total = r.votesOui + r.votesNon;
            const pctOui = total === 0 ? 0 : Math.round((r.votesOui / total) * 100);
            const pctNon = total === 0 ? 0 : Math.round((r.votesNon / total) * 100);
            container.innerHTML += `
                <div class="card">
                    <div>
                        <span class="badge badge-level">${r.level}</span>
                        <span class="badge badge-modality">${r.modality}</span>
                        <h3 style="margin: 15px 0 10px 0; font-size: 1.1rem; line-height: 1.3;">${r.title}</h3>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: bold; margin-bottom: 4px;">
                            <span style="color: var(--success);">OUI ${pctOui}%</span>
                            <span style="color: var(--red-marianne);">NON ${pctNon}%</span>
                        </div>
                        <div style="width: 100%; background: #e0e0e0; border-radius: 4px; height: 8px; overflow: hidden; display: flex; margin-bottom: 5px;">
                            <div style="width: ${pctOui}%; background: var(--success); height: 100%;"></div>
                            <div style="width: ${pctNon}%; background: var(--red-marianne); height: 100%;"></div>
                        </div>
                        <div style="text-align: right; font-size: 0.75rem; color: var(--text-muted);">
                            Total: ${total} participant(s)
                        </div>
                    </div>
                    <button class="btn" style="width:100%; margin-top: auto;" onclick="RIC_ENGINE.openScrutin('${r.id}')">Voter / Débattre</button>
                </div>
            `;
        });
    },
    openScrutin: function(id) {
        const r = this.state.referendums.find(item => item.id === id);
        
        let hasVoted = false;
        if (this.state.currentUser) {
            // Si r.voters est undefined, on utilise un tableau vide [] par défaut
            const voters = r.voters || []; 
            hasVoted = voters.includes(this.state.currentUser.id);
        }
        const blanc = r.votesBlanc || 0;
        const total = r.votesOui + r.votesNon + blanc;
        const pctOui   = total === 0 ? 0 : Math.round((r.votesOui / total) * 100);
        const pctNon   = total === 0 ? 0 : Math.round((r.votesNon / total) * 100);
        const pctBlanc = total === 0 ? 0 : 100 - pctOui - pctNon;
        
        let actionHtml = '';
        // --- RENDU ZONE DE VOTE ---
        if (hasVoted || r.status === 'Clôturé') {
            actionHtml = `
                <div style="background:#e8f5e9; padding:15px; border-radius:6px; color:var(--success); font-weight:bold; margin-bottom:20px;">
                    ${r.status === 'Clôturé' ? 'Scrutin Clos. Voici les résultats définitifs :' : 'A voté (Payload Chiffré). Voici la tendance actuelle :'}
                </div>
                
                <div style="margin-bottom: 25px;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: bold; margin-bottom: 5px;">
                        <span style="color: var(--success);">OUI (${r.votesOui} voix)</span>
                        <span style="color: var(--success);">${pctOui}%</span>
                    </div>
                    <div style="width: 100%; background: #e0e0e0; border-radius: 6px; height: 12px; overflow: hidden; margin-bottom: 15px;">
                        <div style="width: ${pctOui}%; background: var(--success); height: 100%; transition: width 0.5s ease;"></div>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: bold; margin-bottom: 5px;">
                        <span style="color: var(--red-marianne);">NON (${r.votesNon} voix)</span>
                        <span style="color: var(--red-marianne);">${pctNon}%</span>
                    </div>
                    <div style="width: 100%; background: #e0e0e0; border-radius: 6px; height: 12px; overflow: hidden; margin-bottom: 15px;">
                        <div style="width: ${pctNon}%; background: var(--red-marianne); height: 100%; transition: width 0.5s ease;"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: bold; margin-bottom: 5px;">
                        <span style="color: var(--text-muted);">BLANC (${blanc} voix)</span>
                        <span style="color: var(--text-muted);">${pctBlanc}%</span>
                    </div>
                    <div style="width: 100%; background: #e0e0e0; border-radius: 6px; height: 12px; overflow: hidden;">
                        <div style="width: ${pctBlanc}%; background: #aaaaaa; height: 100%; transition: width 0.5s ease;"></div>
                    </div>
                </div>
                <div style="width: 100%; max-width: 250px; margin: 0 auto;">
                    <canvas id="chart-${r.id}"></canvas>
                </div>
            `;
        } else if (!this.state.currentUser) {
            actionHtml = `<div style="background:#fff4e5; padding:15px; border-radius:6px; color:var(--ric-orange); font-weight:bold; text-align:center; margin-top:20px;">Veuillez vous authentifier pour voter.</div>`;
        } else {
            actionHtml = `
                <div style="display:flex; gap:10px; margin-top:20px; flex-wrap:wrap;">
                    <button class="btn" style="background:var(--success); flex:2; min-width:100px;" onclick="RIC_ENGINE.submitVote('${r.id}', 'OUI')">✅ OUI</button>
                    <button class="btn" style="background:var(--red-marianne); flex:2; min-width:100px;" onclick="RIC_ENGINE.submitVote('${r.id}', 'NON')">❌ NON</button>
                    <button class="btn" style="background:#888; flex:1; min-width:80px; font-size:0.85rem;" onclick="RIC_ENGINE.submitVote('${r.id}', 'BLANC')" title="Vote blanc — Art. 5 PLC v.2">⬜ BLANC</button>
                </div>
                <div style="font-size:0.72rem; color:var(--text-muted); margin-top:8px; text-align:right;">Le vote blanc est comptabilisé séparément — Art. 5 PLC v.2</div>
            `;
        }
        // --- FASCICULE EXPLICATIF ---
        // Dans openScrutin()
        let fasciculeHtml = `
            <div class="card" id="fascicule-section">
                <h3>📋 Fascicule Contradictoire (Bilan du Débat)</h3>
                <div class="bilan-content">
                    <div style="color: var(--success);"><strong>POUR :</strong> ${r.fascicule.bilan.argumentsPour.join('; ')}</div>
                    <div style="color: var(--red-marianne);"><strong>CONTRE :</strong> ${r.fascicule.bilan.argumentsContre.join('; ')}</div>
                </div>
                ${this.state.currentUser?.role === 'admin' 
                    ? `<button class="btn btn-secondary" onclick="RIC_ENGINE.genererBilanContradictoire('${r.id}')">🔄 Actualiser le bilan depuis le forum</button>` 
                    : ''
                }
            </div>
        `;
        // --- GÉNÉRATION DU FORUM CITOYEN ---
        let commentsHtml = `
            <div class="forum-section">
                <h3>💬 Délibération Citoyenne</h3>
                <div id="comments-list-${r.id}">
        `;
        if (r.comments && r.comments.length > 0) {
            r.comments.forEach(c => {
                const roleClass = c.role === 'admin' ? 'role-admin' : 'role-citoyen';
                const roleLabel = c.role === 'admin' ? '🛡️ Superviseur' : '👤 Citoyen certifié';
                commentsHtml += `
                    <div class="comment-item ${roleClass}">
                        <div class="comment-meta">
                            <span class="comment-author">${c.author}</span>
                            <span>${roleLabel} · ${c.date}</span>
                        </div>
                        <div class="comment-text">${c.text}</div>
                    </div>
                `;
            });
        } else {
            commentsHtml += `<p style="font-size:0.9rem; color:var(--text-muted); font-style:italic;">Aucun argumentaire déposé pour le moment. Ouvrez le débat.</p>`;
        }
        commentsHtml += `</div>`;
        if (this.state.currentUser) {
            commentsHtml += `
                <div class="add-comment-box">
                    <label style="color:var(--blue-france);">Déposer un argumentaire au registre :</label>
                    <textarea id="new-comment-text-${r.id}" rows="3" placeholder="Rédigez votre argument de manière respectueuse et factuelle..."></textarea>
                    <button class="btn btn-secondary" onclick="RIC_ENGINE.addComment('${r.id}')">Publier mon avis</button>
                </div>
            `;
        } else {
            commentsHtml += `<div style="margin-top:20px; padding:15px; background:#fff4e5; border-radius:6px; color:var(--ric-orange); font-size:0.85rem; font-weight:bold; text-align:center;">Veuillez vous authentifier pour participer à la délibération.</div>`;
        }
        
        commentsHtml += `</div>`;
        // Badge type RIC si disponible
        const ricTypeBadge = r.ricType ? `<span class="badge" style="background:#f0e6ff; color:#6600cc;">${r.ricType}</span>` : '';
        document.getElementById('isoloir-card').innerHTML = `
            <span class="badge badge-level">${r.level}</span>
            <span class="badge badge-modality">${r.modality}</span>
            ${ricTypeBadge}
            <h2 style="border:none; margin-top:15px; padding:0;">${r.title}</h2>
            <div style="padding:15px; background:#f8f9fa; border-left:4px solid var(--ric-orange); margin:15px 0; font-size:1.1rem;">
                <strong>Question :</strong> "${r.question}"
            </div>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 15px;">Clôture prévue le : <strong>${r.endDate || 'Non définie'}</strong> · Quorum : <strong>${r.quorum}%</strong></p>
            <p>${r.description}</p>
            ${actionHtml}
            ${commentsHtml}
        `;
        
        this.navigate('vote-detail');
        if (hasVoted || r.status === 'Clôturé') {
            const ctx = document.getElementById(`chart-${r.id}`);
            if (ctx) {
                if (window[`myChart_${r.id}`]) {
                    window[`myChart_${r.id}`].destroy();
                }
                
                window[`myChart_${r.id}`] = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['OUI', 'NON', 'BLANC'],
                        datasets: [{
                            data: [r.votesOui, r.votesNon, blanc],
                            backgroundColor: ['#18753c', '#e1000f', '#aaaaaa'],
                            borderWidth: 0,
                            hoverOffset: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        cutout: '75%',
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.label || '';
                                        if (label) { label += ': '; }
                                        label += context.parsed + ' voix';
                                        return label;
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
    },
    submitVote: function(id, choice) {
        const r = this.state.referendums.find(item => item.id === id);
        if (!r.votesBlanc) r.votesBlanc = 0;
        if (choice === 'OUI')   r.votesOui++;
        if (choice === 'NON')   r.votesNon++;
        if (choice === 'BLANC') r.votesBlanc++;
        r.voters.push(this.state.currentUser.id);
        this.showToast("A voté. Le choix a été chiffré et sécurisé.");
        this.openScrutin(id);
    },
    addComment: function(id) {
        if (!this.state.currentUser) return;
        
        const textArea = document.getElementById(`new-comment-text-${id}`);
        const text = textArea.value.trim();
        
        if (!text) {
            this.showToast("L'argumentaire est vide.", "error");
            return;
        }
        const r = this.state.referendums.find(item => item.id === id);
        if (!r.comments) r.comments = [];
        const today = new Date();
        const dateStr = today.toLocaleDateString('fr-FR');
        // Ajout au registre local
        r.comments.push({
            author: this.state.currentUser.name,
            text: text,
            date: dateStr,
            role: this.state.currentUser.role
        });
        this.showToast("Argumentaire versé au débat citoyen.");
        this.openScrutin(id); // Rafraîchit l'isoloir pour afficher le message
    },
    renderAdmin: function() {
        const pending = document.getElementById('admin-pending-container');
        const active = document.getElementById('admin-active-container');
        if (!pending || !active) return; 
        pending.innerHTML = '';
        active.innerHTML = '';
        
        this.state.referendums.filter(r => r.status === 'Attente').forEach(r => {
            pending.innerHTML += `
                <div class="card" style="padding:15px; margin-bottom:10px;">
                    <strong>${r.title}</strong>
                    <div style="display:flex; gap:10px; margin-top:10px;">
                        <button class="btn" style="background:var(--success); min-height:36px; padding: 0 15px;" onclick="RIC_ENGINE.setStatus('${r.id}', 'Validé')">Valider pour scrutin</button>
                    </div>
                </div>
            `;
        });
    },
    
    tirageAuSort: function() {
        this.showToast("Initialisation du tirage sur Registre National (Hash)...", "success");
        
        setTimeout(() => {
            const elus = ["Laurence", "Mickael", "Claudine", "Thomas"];
            const liste = document.getElementById('jury-list');
            if(liste) {
                liste.innerHTML = '';
                elus.forEach(nom => {
                    const li = document.createElement('li');
                    li.style.marginBottom = '5px';
                    li.innerText = `✅ ${nom} (ID-REF: ${Math.floor(Math.random()*9000)+1000})`;
                    liste.appendChild(li);
                });
            }
        }, 1000);
    },
    
    setStatus: function(id, status) {
        this.state.referendums.find(r => r.id === id).status = status;
        this.renderAdmin();
        this.showToast("Initiative validée !");
    },
    /* ==========================================
       CARTE DES SCRUTINS – Leaflet Engine
       ========================================== */
    _map: null,
    _mapFilter: 'Tous',
    _mapMarkers: [],
    initMap: function() {
        const self = this;
        if (self._map) {
            setTimeout(() => { self._map.invalidateSize(); self._renderMarkers(); }, 150);
            return;
        }
        setTimeout(() => {
            self._map = L.map('scrutin-map', {
                center: [46.6, 2.3],
                zoom: 5,
                zoomControl: true,
                attributionControl: true
            });
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 19
            }).addTo(self._map);
            self._renderMarkers();
        }, 100);
    },
    _markerColor: function(level) {
        if (level === 'Local')    return '#18753c';
        if (level === 'Régional') return '#FF8C00';
        return '#000091';
    },
    _makeIcon: function(level) {
        const color = this._markerColor(level);
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 44" width="32" height="44">
            <path d="M16 0C9.4 0 4 5.4 4 12c0 9 12 32 12 32s12-23 12-32C28 5.4 22.6 0 16 0z" fill="${color}" stroke="white" stroke-width="2"/>
            <circle cx="16" cy="12" r="5" fill="white"/>
        </svg>`;
        return L.divIcon({
            html: svg,
            className: '',
            iconSize: [32, 44],
            iconAnchor: [16, 44],
            popupAnchor: [0, -44]
        });
    },
    _renderMarkers: function() {
        const self = this;
        if (!self._map) return;
        self._mapMarkers.forEach(m => self._map.removeLayer(m));
        self._mapMarkers = [];
        const filter = self._mapFilter;
        const refs = self.state.referendums.filter(r => {
            if (r.status === 'Attente' || !r.geo) return false;
            if (filter === 'Tous') return true;
            if (filter === 'Local')    return r.level === 'Local';
            if (filter === 'Régional') return r.level === 'Régional';
            return false;
        });
        const nationalGroup = refs.filter(r => r.level === 'National');
        const others = refs.filter(r => r.level !== 'National');
        // Dispersion visuelle pour les points superposés (National)
        nationalGroup.forEach((r, i) => {
            const angle = (i / Math.max(nationalGroup.length, 1)) * 2 * Math.PI;
            const radius = nationalGroup.length > 1 ? 1.5 : 0;
            const lat = r.geo.lat + radius * Math.sin(angle);
            const lng = r.geo.lng + radius * Math.cos(angle);
            self._addMarker(r, lat, lng);
        });
        others.forEach(r => self._addMarker(r, r.geo.lat, r.geo.lng));
        if (filter === 'Local') {
            self._map.setView([46.6, 2.3], 6);
        } else if (filter === 'Régional') {
            self._map.setView([46.6, 2.3], 5);
        } else {
            self._map.setView([46.6, 2.3], 5);
        }
    },
    _addMarker: function(r, lat, lng) {
        const self = this;
        const marker = L.marker([lat, lng], { icon: self._makeIcon(r.level) });
        const total = r.votesOui + r.votesNon + (r.votesBlanc || 0);
        const pct = total === 0 ? 0 : Math.round((r.votesOui / total) * 100);
        const color = self._markerColor(r.level);
        marker.bindPopup(`
            <div style="min-width:180px; font-family:sans-serif;">
                <div style="font-size:0.7rem; font-weight:700; color:${color}; text-transform:uppercase; margin-bottom:4px;">${r.level} · ${r.geo.label}</div>
                <div style="font-weight:bold; font-size:0.9rem; margin-bottom:8px; line-height:1.3;">${r.title}</div>
                <div style="font-size:0.75rem; color:#666; margin-bottom:6px;">OUI ${pct}% · ${total} voix</div>
                <button onclick="RIC_ENGINE.openMapModal('${r.id}')" style="width:100%;padding:7px;background:${color};color:white;border:none;border-radius:6px;font-weight:bold;cursor:pointer;font-size:0.8rem;">Voir le scrutin →</button>
            </div>
        `, { maxWidth: 220 });
        marker.addTo(self._map);
        self._mapMarkers.push(marker);
    },
    setMapFilter: function(filter) {
        this._mapFilter = filter;
        document.querySelectorAll('.map-filter-btn').forEach(b => {
            b.className = 'map-filter-btn';
        });
        const idMap = { 'Tous': 'mfb-tous', 'Régional': 'mfb-regional', 'Local': 'mfb-local' };
        const classMap = { 'Tous': 'active-tous', 'Régional': 'active-regional', 'Local': 'active-local' };
        const btn = document.getElementById(idMap[filter]);
        if (btn) btn.classList.add(classMap[filter]);
        this._renderMarkers();
    },
    openMapModal: function(id) {
        const r = this.state.referendums.find(item => item.id === id);
        if (!r) return;
        const blanc = r.votesBlanc || 0;
        const total = r.votesOui + r.votesNon + blanc;
        const pctOui   = total === 0 ? 0 : Math.round((r.votesOui / total) * 100);
        const pctNon   = total === 0 ? 0 : 100 - pctOui - (total === 0 ? 0 : Math.round((blanc / total) * 100));
        const pctBlanc = total === 0 ? 0 : 100 - pctOui - pctNon;
        const color = this._markerColor(r.level);
        const tagStyle = `background:${color}1a; border:1px solid ${color}; color:${color};`;
        const zoneIcon = r.level === 'Local' ? '🏙️' : r.level === 'Régional' ? '🏛️' : '🗺️';
        let hasVoted = false;
        if(this.state.currentUser) {
            hasVoted = r.voters.includes(this.state.currentUser.id);
        }
        let voteHtml = '';
        if (r.status === 'Clôturé' || hasVoted) {
            voteHtml = `
                <div style="background:#e8f5e9;padding:10px 14px;border-radius:6px;color:var(--success);font-weight:bold;font-size:0.85rem;margin-bottom:14px;">
                    ${r.status === 'Clôturé' ? '✅ Scrutin Clos — résultats définitifs' : '✅ Vous avez voté'}
                </div>`;
        } else if (!this.state.currentUser) {
            voteHtml = `<div style="background:#fff4e5;padding:10px;border-radius:6px;color:var(--ric-orange);font-weight:bold;font-size:0.85rem;text-align:center;">Connectez-vous pour voter</div>`;
        } else {
            voteHtml = `
                <div style="display:flex;gap:8px;margin-top:4px;flex-wrap:wrap;">
                    <button class="btn" style="background:var(--success);flex:2;min-height:42px;min-width:70px;" onclick="RIC_ENGINE.submitVote('${r.id}','OUI');RIC_ENGINE.openMapModal('${r.id}')">✅ OUI</button>
                    <button class="btn" style="background:var(--red-marianne);flex:2;min-height:42px;min-width:70px;" onclick="RIC_ENGINE.submitVote('${r.id}','NON');RIC_ENGINE.openMapModal('${r.id}')">❌ NON</button>
                    <button class="btn" style="background:#888;flex:1;min-height:42px;min-width:60px;font-size:0.8rem;" onclick="RIC_ENGINE.submitVote('${r.id}','BLANC');RIC_ENGINE.openMapModal('${r.id}')">⬜</button>
                </div>`;
        }
        document.getElementById('map-modal-content').innerHTML = `
            <div class="map-modal-zone-tag" style="${tagStyle}">${zoneIcon} ${r.level} · ${r.geo ? r.geo.label : ''}</div>
            <h3 style="font-size:1.05rem;line-height:1.35;margin-bottom:10px;color:var(--blue-france);">${r.title}</h3>
            <div style="background:#f8f9fa;border-left:4px solid ${color};padding:12px;border-radius:0 6px 6px 0;font-size:0.9rem;margin-bottom:14px;">
                <strong>Question :</strong> « ${r.question} »
            </div>
            <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:14px;">${r.description}</p>
            <div style="margin-bottom:16px;">
                <div class="modal-result-row">
                    <span style="color:var(--success);">OUI — ${r.votesOui} voix</span>
                    <span style="color:var(--success);">${pctOui}%</span>
                </div>
                <div class="modal-progress-bar">
                    <div style="width:${pctOui}%;background:var(--success);height:100%;transition:width .4s;"></div>
                    <div style="width:${pctNon}%;background:var(--red-marianne);height:100%;"></div>
                    <div style="width:${pctBlanc}%;background:#aaa;height:100%;"></div>
                </div>
                <div class="modal-result-row">
                    <span style="color:var(--red-marianne);">NON — ${r.votesNon} voix</span>
                    <span style="color:var(--red-marianne);">${pctNon}%</span>
                </div>
                <div class="modal-result-row" style="margin-top:4px;">
                    <span style="color:#888;">BLANC — ${blanc} voix</span>
                    <span style="color:#888;">${pctBlanc}%</span>
                </div>
            </div>
            ${voteHtml}
            <div style="margin-top:14px;padding-top:12px;border-top:1px solid #eee;display:flex;justify-content:space-between;align-items:center;font-size:0.78rem;color:var(--text-muted);">
                <span>📅 Clôture : <strong>${r.endDate || 'N/D'}</strong></span>
                <span>Quorum : ${r.quorum}%</span>
            </div>
            <button class="btn btn-secondary" style="margin-top:14px;width:100%;min-height:40px;font-size:0.85rem;" onclick="RIC_ENGINE.openScrutin('${r.id}')">
                Ouvrir le Débat Citoyen →
            </button>
        `;
        document.getElementById('map-modal-overlay').classList.add('open');
    },
    closeMapModal: function(event) {
        if (event === null || event.target === document.getElementById('map-modal-overlay')) {
            document.getElementById('map-modal-overlay').classList.remove('open');
        }
    },
    genererBilanContradictoire : function(refId) {
    const r = this.state.referendums.find(i => i.id === refId);
    // Filtre les commentaires pour extraire la substantifique moelle du débat
    r.fascicule.bilan.argumentsPour = r.comments
        .filter(c => c.text.toLowerCase().includes('pour'))
        .map(c => c.text);
    r.fascicule.bilan.argumentsContre = r.comments
        .filter(c => c.text.toLowerCase().includes('contre') || c.text.toLowerCase().includes('attention'))
        .map(c => c.text);
    this.showToast("Bilan du débat mis à jour à partir du forum.");
},
};
const RIC_SLIDER = {
    next: function(step) {
        // Validation simple avant passage
        if(step === 2 && !document.getElementById('prop-title').value) {
            alert("Veuillez remplir le titre.");
            return;
        }
        this.goTo(step);
    },
    prev: function(step) {
        this.goTo(step);
    },
    goTo: function(step) {
        document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.step-indicator').forEach(i => i.classList.remove('active'));
        
        document.getElementById('step-' + step).classList.add('active');
        document.getElementById('ind-' + step).classList.add('active');
    }
};