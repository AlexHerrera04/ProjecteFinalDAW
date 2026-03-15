## Punt 1 – Idea del Projecte

El meu projecte final constarà d'una app principalment pensada per mobile en la que els usuaris podran rebre entrenament personalitzat pensat perquè puguin adquirir unes bases mínimes per poder jugar a tenis. Un cop aconsegueixin la base, la app permetrà agregar a diferents amics que també hagin completat l'entrenament i poder-se enfrentar entre ells en partits de tenis, on desde l'app es podrà informar dels resultats i crear una espècie de lliga.

El principal problema amb el tenis es que és un esport molt complicat si no l'has practicat mai on molta gent que el prova no torna a jugar més i prefereixen abans jugar a esports com el pàdel, a més que el preu que s'ha de pagar per entrenadors molts cops és exagerat. El meu objectiu és donar-li's una ajuda perquè tinguin la motivació per seguir jugant i millorant sense haver de gastar-se tants diners.

La app aniria dirigida per tots aquells grups d'amics que algún cop s'han proposat jugar a tenis i ho han acabat deixant per motius de dificultat o de preu, independentment de l'edat que tinguin.

---

## Punt 2 – Requisits Funcionals

### Mòdul d'entrenament
- L'usuari es pot registrar i crear un perfil amb el seu nivell inicial
- El sistema ofereix un pla d'entrenament progressiu estructurat per nivells (p.ex. grip, servei, dreta, revés...)
- L'usuari pot marcar exercicis com a completats i veure el seu progrés
- El sistema desbloqueja nous exercicis quan els anteriors estan completats
- Cada exercici inclou vídeo explicatiu i descripció tècnica

### Mòdul social / amics
- L'usuari pot buscar i afegir amics dins l'app
- Només es pot connectar amb amics que hagin completat el nivell mínim d'entrenament
- L'usuari pot veure el perfil i estadístiques dels seus amics

### Mòdul de partits i lliga
- L'usuari pot reptar un amic a un partit
- Un cop jugat el partit, qualsevol dels dos jugadors pot introduir el resultat
- L'altre jugador ha de confirmar el resultat
- El sistema calcula una classificació/ranking entre el grup d'amics
- Es poden veure l'historial de partits i resultats anteriors


## Punt 3 – Mock-up del Projecte

![Registre i Dashboard](mockups/mockup1.jpg)

![Entrenament](mockups/mockup2.jpg)

![Social](mockups/mockup3.jpg)



## Punt 4 – Arquitectura i Tecnologia

- **Frontend:** React + CSS
- **Backend:** Node.js
- **Base de dades:** SQL
- **Autenticació:** JWT

En quant a react, node i jwt encara no hem vist moltes coses a classe, però és el que utilitzo habitualment en les pràctiques.
