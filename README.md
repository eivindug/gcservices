# gae-micro

# Introduksjon

Dette prosjektet inneholder en superenkel webapplikasjon og to mikrotjenester som kan depliyes på Google App Engine.
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

