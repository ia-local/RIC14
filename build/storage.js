/**
 * ==========================================================
 * RIC Storage Manager
 * Version 2.0
 * ==========================================================
 */

import { state } from "./state.js";

const STORAGE_KEY = "RIC_STATE";

const STORAGE_VERSION = 2;

/**
 * ==========================================================
 * Sauvegarde complète
 * ==========================================================
 */

export function saveState() {

    try {

        state.storage.lastSave = new Date().toISOString();

        state.storage.version = STORAGE_VERSION;

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(state)
        );

        console.info("[Storage] Sauvegarde OK");

        return true;

    } catch (error) {

        console.error("[Storage]", error);

        return false;

    }

}

/**
 * ==========================================================
 * Chargement
 * ==========================================================
 */

export function loadState() {

    try {

        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) {

            console.info("[Storage] Nouvelle installation");

            return false;

        }

        const data = JSON.parse(raw);

        migrateState(data);

        Object.assign(state, data);

        console.info("[Storage] Etat chargé");

        return true;

    } catch (error) {

        console.error("[Storage]", error);

        return false;

    }

}

/**
 * ==========================================================
 * Suppression
 * ==========================================================
 */

export function resetState() {

    localStorage.removeItem(STORAGE_KEY);

    console.warn("[Storage] Etat supprimé");

}

/**
 * ==========================================================
 * Export JSON
 * ==========================================================
 */

export function exportState() {

    return JSON.stringify(state, null, 2);

}

/**
 * ==========================================================
 * Import JSON
 * ==========================================================
 */

export function importState(json) {

    try {

        const imported = JSON.parse(json);

        Object.assign(state, imported);

        saveState();

        return true;

    } catch (e) {

        console.error(e);

        return false;

    }

}

/**
 * ==========================================================
 * Etat par défaut
 * ==========================================================
 */

export function clearUserSession() {

    state.auth.authenticated = false;

    state.auth.token = null;

    state.currentUser = null;

    saveState();

}

/**
 * ==========================================================
 * Migration
 * ==========================================================
 */

export function migrateState(data) {

    if (!data.storage) {

        data.storage = {};

    }

    if (!data.storage.version) {

        data.storage.version = 1;

    }

    if (data.storage.version < STORAGE_VERSION) {

        console.info("[Storage] Migration");

        /*
            Exemple

            if(version==1){

                data.notifications=[];

            }

        */

        data.storage.version = STORAGE_VERSION;

    }

}

/**
 * ==========================================================
 * Vérification
 * ==========================================================
 */

export function storageAvailable() {

    try {

        const test = "__ric__";

        localStorage.setItem(test, test);

        localStorage.removeItem(test);

        return true;

    }

    catch {

        return false;

    }

}

/**
 * ==========================================================
 * AutoSave
 * ==========================================================
 */

export function enableAutoSave(interval = 30000) {

    setInterval(() => {

        if (state.settings.autosave) {

            saveState();

        }

    }, interval);

}

/**
 * ==========================================================
 * Statistiques
 * ==========================================================
 */

export function getStorageInfo() {

    const raw = localStorage.getItem(STORAGE_KEY);

    return {

        exists: raw !== null,

        size: raw ? raw.length : 0,

        version: STORAGE_VERSION,

        lastSave: state.storage.lastSave

    };

}

/**
 * ==========================================================
 * Initialisation
 * ==========================================================
 */

export function initializeStorage() {

    if (!storageAvailable()) {

        console.error("LocalStorage indisponible");

        return;

    }

    loadState();

    enableAutoSave();

}