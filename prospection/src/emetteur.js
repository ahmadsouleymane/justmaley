/**
 * emetteur.js — bus d'événements partagé entre le scraper et l'interface web.
 *
 * Le scraper émet des événements de progression (log, fiche extraite, fin de
 * requête…). L'interface web s'y abonne pour retransmettre en temps réel via
 * SSE. Le CLI, lui, ignore simplement ces événements : aucune régression.
 */

import { EventEmitter } from 'node:events';

/** Émetteur global, unique pour tout le processus. */
export const emetteur = new EventEmitter();

// Nombre max d'auditeurs pour éviter le warning de Node quand plusieurs
// clients SSE écoutent en parallèle.
emetteur.setMaxListeners(100);

/**
 * État partagé de l'exécution, utilisé pour l'annulation coopérative.
 * Le scraper vérifie `etat.annule` entre deux fiches ; le serveur le positionne
 * à `true` via l'endpoint d'arrêt.
 */
export const etat = {
  annule: false,
};
