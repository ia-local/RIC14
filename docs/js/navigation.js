/**
 * ==========================================================
 * RIC Navigation Manager
 * ==========================================================
 */

import { state } from "./state.js";

const VIEW_PREFIX = "view-";

/**
 * Liste des vues disponibles
 */
export const VIEWS = {

    LOGIN: "login",

    DASHBOARD: "dashboard",

    PROPOSE: "propose",

    REFERENDUMS: "referendums",

    VOTE: "vote-detail",

    ADMIN: "admin",

    CARTE: "carte"

};

/**
 * Initialisation
 */

export function initNavigation() {

    window.addEventListener("hashchange", onHashChange);

    const hash = location.hash.replace("#", "");

    if (hash && document.getElementById(VIEW_PREFIX + hash)) {

        navigate(hash);

    }

}

/**
 * Navigation principale
 */

export function navigate(viewName) {

    const sections = document.querySelectorAll(".view");

    sections.forEach(section => {

        section.classList.remove("active");

    });

    const target = document.getElementById(VIEW_PREFIX + viewName);

    if (!target) {

        console.warn("Vue inconnue :", viewName);

        return;

    }

    target.classList.add("active");

    state.navigation.previousView = state.navigation.currentView;

    state.navigation.currentView = viewName;

    state.navigation.history.push(viewName);

    location.hash = viewName;

    updateNavigation();

}

/**
 * Retour
 */

export function back() {

    if (state.navigation.history.length < 2) return;

    state.navigation.history.pop();

    const previous = state.navigation.history.pop();

    navigate(previous);

}

/**
 * Navigation mobile + desktop
 */

export function updateNavigation() {

    document
        .querySelectorAll("[data-view]")
        .forEach(button => {

            button.classList.remove("active");

            if (button.dataset.view === state.navigation.currentView) {

                button.classList.add("active");

            }

        });

}

/**
 * Vue courante
 */

export function getCurrentView() {

    return state.navigation.currentView;

}

/**
 * Hash URL
 */

function onHashChange() {

    const hash = location.hash.replace("#", "");

    if (!hash) return;

    navigate(hash);

}