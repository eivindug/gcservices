# gae-micro

Dette prosjektet inneholder en superenkel webapplikasjon og to mikrotjenester.
Den ene tjenesten er skrevet JavaScript/Node og den andre med Python/Flask.
Webapplikasjonen er hostet på Node.

Når disse tre tjenestene deployes på Google App Engine vil hver av dem kjøre i hver sin egen Docker-container.

For å få til dette må dere opprette en konto på [https://cloud.google.com/](https://cloud.google.com/).
Velg "Try free". Dere er nødt til å legge til kredittkortopplysninger, men dere skal få beskjed hvis limit'en er nådd og dere må begynne å betale.
Opprett så et prosjekt og gi det et passe navn. Du kan bruke det genererte navnet eller finne et selv som ikke er brukt tidligere. Navnet vil bestemme URL'en til tjenestene: [https://navnet.appspot.com](https://navnet.appspot.com).