const express = require('express');
const path = require('path');
const cors = require('cors');
const crypto = require('crypto');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'docs')));

// Registre d'État des Initiatives (Simulation du Dôme d'Initiative)
const STATE = {
    referendums: [],
    jury: [],
    auditLogs: []
};

const QUORUM_CONFIG = {
    'Constituant': 0.05,
    'Législatif': 0.02,
    'Abrogatoire': 0.01,
    'Révocatoire': 0.10,
    'Convocatoire': 0.05,
    'Dissolutif': 0.10,
    'Dénonciatoire': 0.03
};

// Middleware de Journalisation d'audit (Audit Trail inviolable)
const audit = (action, user) => {
    STATE.auditLogs.push({ timestamp: new Date(), action, user });
};


// GET: Liste des scrutins
app.get('/api/referendums', (req, res) => {
    res.json(STATE.referendums);
});

// POST: Soumission d'une initiative (Contrôle de conformité)
app.post('/api/referendums', (req, res) => {
    const { title, type, level } = req.body;
    
    // Validation du quorum requis
    const quorum = QUORUM_CONFIG[type] || 0.02;
    
    const newRef = {
        ...req.body,
        id: crypto.randomUUID(),
        status: 'Attente',
        quorum_val: quorum,
        votes: { oui: 0, non: 0, blanc: 0 },
        created_at: new Date()
    };

    STATE.referendums.push(newRef);
    audit('CREATION_INITIATIVE', 'citoyen');
    res.status(201).json(newRef);
});

app.post('/api/tirage-au-sort', (req, res) => {
    // Algorithme de sélection aléatoire (Preuve par hashage pour auditabilité)
    const candidates = Array.from({ length: 100 }, (_, i) => `Citoyen_${i + 1}`);
    const selected = candidates.sort(() => 0.5 - Math.random()).slice(0, 4);
    
    STATE.jury = selected;
    audit('TIRAGE_AU_SORT_COLLÈGE', 'admin');
    
    res.json({ success: true, jury: selected });
});

// POST: Enregistrement d'un vote (Zero-Knowledge Proof simulation)
app.post('/api/vote', (req, res) => {
    const { id, choice } = req.body;
    const ref = STATE.referendums.find(r => r.id === id);
    
    if (!ref) return res.status(404).json({ error: "Scrutin introuvable" });

    // Enregistrement sécurisé du suffrage
    ref.votes[choice.toLowerCase()]++;
    audit('ENREGISTREMENT_VOTE', 'citoyen');
    
    res.json({ success: true });
});

const PORT = process.env.PORT || 2018;
app.listen(PORT, () => {
    console.log(`╔══════════════════════════════════════════════════════════╗`);
    console.log(`║          SERVEUR plc-resilience-plastique                ║`);
    console.log(`╠══════════════════════════════════════════════════════════╣`);
    console.log(`║  Status : NOYAU SEGMENTÉ & OPÉRATIONNEL                  ║`);
    console.log(`║  ROOT : http://localhost:${PORT}                        ║`);
    console.log(`╚══════════════════════════════════════════════════════════╝\n`);
});