## Beaucoups de difficultés à se connecter à la db sur le docker vu que postgres existait sur mon ordinateur et il y avait un conflit de port sans pour autant que la console le précise.

## Aucun test unitaires n'est implémentable.
- Ni dans le front
    - aucune fonction qui n'a pas d'integration avec d'autre fonction
- Ni dans le back
    - aucune fonction qui n'a pas d'integration avec d'autre fonction

## Difficulté à fermer proprement le serveur avec supertest et jest pour le server
### avant de basculer sur supertest j'ai essayé chai, mais des problèmes de comptabilité sont apparu
Tests d'intégration dans le back :
- controller
- routes 

## Aucune difficulté avec Puppeteer, mis en place de test-id sur les balises pour facilité la récupération des balises :

Tests de bout en bout dans le front :
- page d'accueil