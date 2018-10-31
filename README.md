# gae-micro

# Introduksjon

Dette prosjektet inneholder en superenkel webapplikasjon og to mikrotjenester som kan deployes på Google App Engine.
Den ene tjenesten er skrevet JavaScript/Node og den andre med Python/Flask.
Webapplikasjonen er hostet på Node.
Når disse tre tjenestene deployes på Google App Engine vil hver av dem kjøre i hver sin egen Docker-container.

For å få til dette må dere opprette en konto på [https://cloud.google.com/](https://cloud.google.com/).
Velg "Try free". Dere er nødt til å legge til kredittkortopplysninger, men dere skal få beskjed hvis limit'en er nådd og dere må begynne å betale.
Opprett et prosjekt og gi det et passe navn. Du kan bruke det genererte navnet eller finne et selv som ikke er brukt tidligere. Navnet vil bestemme URL'en til tjenestene: [https://prosjektnavnet.appspot.com](https://prosjektnavnet.appspot.com).

Du må også laste ned og installere Google Could SDK: [https://cloud.google.com/sdk/downloads](https://cloud.google.com/sdk/downloads). 
Etterpå kan du åpne et konsoll (f.eks. Git Bash) og skrive:

```
gcloud init
```

Her vil du bli bedt om å logge på Google-kontoen din, og velge AppEngine prosjekt (som du nettopp lagde).

# Tjenestene

## Web-app

Denne tjenesten er laget med node.js som server statiske websider. Webapplikasjonen består av *index.html* og *main.css*som begge ligger under katalogen *public*. 
*app.js* og *package.json* oppretter en node.js-server med express. I tillegg har vi fila *app.yaml* som gjør at vi kan deploye denne webapplikasjonen på Google App Engine:

```
gcloud app deploy app.yaml
```

Etter den er deployet vil den være tilgjengelig på URL'en:

[https://<prosjektnavn>.appspot.com](https://<prosjektnavn>.appspot.com)

Web-applikasjonen kan også startes lokalt med kommandoen:

```
npm install
npm start
```

Da vil den bli tilgjengelig på:

[http://localhost:8080](http://localhost:8080)

Applikasjonen gjør veldig lite:
* Den skriver ut en melding: "Hello from webapp"
* Kjører et ajax-kall til /node-service på node-service'n og skriver ut resultatet
* Kjører et kall til /forward-to-python på node service'n som videresender kallet til python-service'n og skriver ut resultatet

## Node-tjeneste

## Python-tjeneste

Når du står i mappen `python-service` kan du kjøre følghende for å deploye:
```
gcloud app deploy python-app.yaml
```

```
gcloud app services list
```

```
gcloud app services delete service1 service2
```

Du kan ikke fjerne default-servicen.

Skjermbilde fra Services i skyen

View Log

# Bruke Database

