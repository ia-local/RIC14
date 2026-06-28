/**
 * ==========================================================
 * RIC - Dôme d'Initiative Citoyenne
 * Point d'entrée de l'application
 * ==========================================================
 */

import { state } from "./state.js";

import * as Auth from "./auth.js";
import * as Navigation from "./navigation.js";
import * as Dashboard from "./dashboard.js";
import * as Referendum from "./referendum.js";
import * as Forum from "./forum.js";
import * as MapManager from "./map.js";
import * as Admin from "./admin.js";

import * as UI from "./ui.js";
import * as Storage from "./storage.js";
import * as Charts from "./chartManager.js";
import * as Utils from "./utils.js";

/**
 * API publique utilisée par le HTML
 */
window.RIC_ENGINE = {

    state,

    // Authentification
    ...Auth,

    // Navigation
    ...Navigation,

    // Dashboard
    ...Dashboard,

    // Référendums
    ...Referendum,

    // Forum
    ...Forum,

    // Carte
    ...MapManager,

    // Administration
    ...Admin,

    // Interface
    ...UI,

    // Stockage
    ...Storage,

    // Graphiques
    ...Charts,

    // Utilitaires
    ...Utils

};

/**
 * Initialisation
 */
document.addEventListener("DOMContentLoaded", init);

/**
 * ==========================================================
 */

function init() {

    console.log("====================================");
    console.log("RIC v2");
    console.log("Initialisation...");
    console.log("====================================");

    Storage.initializeStorage();
    
    loadApplication();

}

/**
 * Chargement principal
 */

function loadApplication() {

    // charge les données locales
    if (Storage.loadState) {
        Storage.loadState();
    }

    // initialise la navigation

    if (Navigation.initNavigation) {
        Navigation.initNavigation();
    }

    // initialise les cartes

    if (MapManager.preloadMap) {
        MapManager.preloadMap();
    }

    // initialise les graphiques

    if (Charts.initCharts) {
        Charts.initCharts();
    }

    // initialise le thème

    if (UI.initTheme) {
        UI.initTheme();
    }

    // page de départ

    Navigation.navigate("login");

}

/**
 * ==========================================================
 * Rafraîchissement global
 * ==========================================================
 */

export function refreshApplication() {

    Dashboard.renderDashboard();

    Referendum.renderList();

    Admin.renderAdmin();

}

/**
 * ==========================================================
 * Sauvegarde globale
 * ==========================================================
 */

export function saveApplication() {

    Storage.saveState();

}

/**
 * ==========================================================
 * Reset
 * ==========================================================
 */

export function resetApplication() {

    Storage.resetState();

    location.reload();

}