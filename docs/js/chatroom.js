/* chatroom.js - Gestion décentralisée des salons par référendum */
const CHAT_ENGINE = {
    BANNED_WORDS: ['insulte1', 'insulte2', 'spam'],
    currentRefId: null,

    init: function() {
        console.log("Chatroom Engine activé.");
    },

    // 1. Appelé automatiquement par RIC_ENGINE.navigate('chat')
    renderChatroomHome: function() {
        this.renderRoomsList();
        // Si aucun salon n'est ouvert, on remet l'écran d'accueil par défaut à droite
        if (!this.currentRefId) {
            const container = document.getElementById('chat-content-container');
            container.innerHTML = `
                <div class="card" style="flex: 1; display: flex; align-items: center; justify-content: center; text-align: center; color: var(--text-muted);">
                    <div>
                        <span style="font-size: 3rem;">💬</span>
                        <h3 style="margin-top: 10px;">Sélectionnez un salon de délibération</h3>
                        <p style="font-size: 0.9rem; max-width: 400px; margin: 8px auto 0 auto;">Cliquez sur l'un des référendums de la liste de gauche pour rejoindre les échanges citoyens.</p>
                    </div>
                </div>
            `;
        } else {
            // Si un salon était déjà ouvert, on le maintient/rafraîchit
            this.renderSalon(this.currentRefId);
        }
    },

    // 2. Génère la liste des salons à gauche à partir du state des référendums
    renderRoomsList: function() {
        const listContainer = document.getElementById('chat-rooms-list');
        if (!listContainer) return;

        listContainer.innerHTML = '';
        
        // On récupère uniquement les référendums validés pour le débat
        const validRefs = RIC_ENGINE.state.referendums.filter(r => r.status !== 'Attente');

        if (validRefs.length === 0) {
            listContainer.innerHTML = '<p style="font-size:0.8rem; color:var(--text-muted); italic">Aucun salon actif.</p>';
            return;
        }

        validRefs.forEach(r => {
            const isActive = (r.id === this.currentRefId) ? 'background: #eef3f8; border-left: 4px solid var(--blue-france); font-weight: bold;' : '';
            const commentCount = r.comments ? r.comments.length : 0;

            listContainer.innerHTML += `
                <div onclick="CHAT_ENGINE.renderSalon('${r.id}')" 
                     style="padding: 12px; border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; background: white; transition: 0.2s; ${isActive}"
                     onmouseover="this.style.background='#f4f6f9'" 
                     onmouseout="if('${r.id}' !== '${this.currentRefId}') this.style.background='white'">
                    <div style="font-size: 0.7rem; color: var(--text-muted); display:flex; justify-content:space-between;">
                        <span>📍 ${r.level}</span>
                        <span>💬 ${commentCount} msg</span>
                    </div>
                    <div style="font-size: 0.85rem; color: var(--blue-france); margin-top: 4px; line-height: 1.2;">
                        ${r.title}
                    </div>
                </div>
            `;
        });
    },

    // 3. Rendu du salon sélectionné à droite avec son fascicule de synthèse
    renderSalon: function(refId) {
        this.currentRefId = refId;
        this.renderRoomsList(); // Met à jour la surbrillance à gauche

        const container = document.getElementById('chat-content-container');
        const r = RIC_ENGINE.state.referendums.find(i => i.id === refId);
        
        if (!r) return;

        // Extraction du fascicule ou message par défaut
        const fasciculePour = (r.fascicule && r.fascicule.bilan && r.fascicule.bilan.argumentsPour.length > 0) 
            ? r.fascicule.bilan.argumentsPour.join('; ') 
            : "En cours de délibération...";
        const fasciculeContre = (r.fascicule && r.fascicule.bilan && r.fascicule.bilan.argumentsContre.length > 0) 
            ? r.fascicule.bilan.argumentsContre.join('; ') 
            : "En cours de délibération...";

        container.innerHTML = `
            <div class="card" style="flex: 1; display: flex; flex-direction: column; gap: 15px; padding: 20px;">
                <div>
                    <h2 style="font-size: 1.2rem; color: var(--blue-france); margin-bottom: 4px;">💬 Salon : ${r.title}</h2>
                    <p style="font-size: 0.85rem; color: var(--text-muted);"><strong>Question soumise :</strong> ${r.question}</p>
                </div>

                <!-- Section Mini Fascicule Synoptique -->
                <div style="background: #f4f6f9; border-radius: 6px; padding: 12px; font-size: 0.8rem; display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-weight: bold; color: var(--text-light);">📋 Fascicule Contradictoire Provisoire :</span>
                    <div style="color: var(--success);">• <strong>Arguments POUR :</strong> ${fasciculePour}</div>
                    <div style="color: var(--danger);">• <strong>Arguments CONTRE :</strong> ${fasciculeContre}</div>
                </div>

                <!-- Zone des messages de la délibération -->
                <div id="chat-messages" style="flex: 1; min-height: 200px; max-height: 320px; overflow-y: auto; background: #fafafa; border: 1px solid var(--border); border-radius: 6px; padding: 15px; display: flex; flex-direction: column; gap: 10px;">
                    ${this.formatComments(r.comments)}
                </div>

                <!-- Boîte d'envoi de message -->
                <div class="add-comment-box" style="display: flex; flex-direction: column; gap: 8px;">
                    <textarea id="chat-input-${refId}" rows="2" style="resize: none;" placeholder="Rédigez votre argument de manière constructive et factuelle..."></textarea>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.7rem; color: var(--text-muted);">⚖️ Label RIC — Votre avis alimente le fascicule contradictoire.</span>
                        <button class="btn" style="padding: 8px 16px; font-size: 0.85rem;" onclick="CHAT_ENGINE.postMessage('${refId}')">Publier l'argument</button>
                    </div>
                </div>
            </div>
        `;

        // Scroll automatique vers le bas des messages
        const msgBox = document.getElementById('chat-messages');
        if (msgBox) msgBox.scrollTop = msgBox.scrollHeight;
    },

    formatComments: function(comments) {
        if (!comments || comments.length === 0) {
            return `<p style="font-size:0.85rem; color:var(--text-muted); font-style:italic; text-align:center; margin-top:20px;">Aucun argumentaire déposé. Soyez le premier à ouvrir le débat réglementé.</p>`;
        }
        return comments.map(c => {
            const isAdmin = c.role === 'admin' ? 'border-left: 3px solid var(--blue-france); background: #f0v4ff;' : '';
            const badge = c.role === 'admin' ? '🛡️ Superviseur' : '👤 Citoyen Certifié';
            return `
                <div style="padding: 10px; background: white; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); ${isAdmin}">
                    <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-light); margin-bottom: 4px;">
                        <strong style="color: var(--blue-france);">${c.author} <span style="font-weight:normal; font-size:0.7rem; background:#eee; padding:2px 6px; border-radius:10px; margin-left:4px;">${badge}</span></strong>
                        <span>${c.date}</span>
                    </div>
                    <div style="font-size: 0.85rem; color: var(--text); line-height: 1.3;">${c.text}</div>
                </div>
            `;
        }).join('');
    },

    postMessage: function(refId) {
        const input = document.getElementById(`chat-input-${refId}`);
        if (!input) return;

        let text = input.value.trim();
        
        const containsBanned = this.BANNED_WORDS.some(word => text.toLowerCase().includes(word));
        if (containsBanned) {
            alert("Votre message contient des termes non conformes à la Charte du Dôme.");
            return;
        }

        if (!text) return;

        if (typeof RIC_ENGINE.addCommentToRef === 'function') {
            RIC_ENGINE.addCommentToRef(refId, text);
        } else {
            // Fallback si la méthode n'est pas encore implantée dans app-ric.js
            const r = RIC_ENGINE.state.referendums.find(i => i.id === refId);
            if (r) {
                if (!r.comments) r.comments = [];
                r.comments.push({
                    author: RIC_ENGINE.state.currentUser ? RIC_ENGINE.state.currentUser.name : "Citoyen",
                    text: text,
                    date: new Date().toLocaleDateString('fr-FR'),
                    role: RIC_ENGINE.state.currentUser ? RIC_ENGINE.state.currentUser.role : "citoyen"
                });
            }
        }

        input.value = '';
        this.renderSalon(refId); 
    }
};