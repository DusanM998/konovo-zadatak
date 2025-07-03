# PHP Backend za Product API

Ovaj projekat predstavlja PHP backend servis za upravljanje proizvodima, koji komunicira sa eksternim API-em i prosledjuje podatke frontend aplikaciji.

---

### Sadrzaj ###

- [Opis projekta](#opis-projekta)  
- [Tehnologije](#tehnologije)  
- [Kako pokrenuti backend server](#kako-pokrenuti-backend-server)  
- [Opis implementacije](#opis-implementacije)  
- [API Endpoints i komunikacija sa frontendom](#api-endpoints-i-komunikacija-sa-frontendom)  

---

### Opis projekta ###

Backend servis je razvijen u PHP-u, koristi Guzzle HTTP klijent za komunikaciju sa eksternim API-em (`https://zadatak.konovo.rs/`).  
Servis pruza API za dohvat liste proizvoda, specifican proizvod, kao i login endpoint za dobijanje tokena.  
Servis obradjuje podatke (povecava cenu monitora, menja opis proizvoda), filtrira ih po kategoriji i pretrazuje po nazivu i opisu.

---

## Tehnologije

- PHP 8+
- Guzzle HTTP Client
- Composer za upravljanje zavisnostima
- REST API stil komunikacije

---

## Kako pokrenuti backend server

1. **Preuzmi ili kloniraj ovaj repozitorijum**

git clone https://github.com/DusanM998/konovo-zadatak.git

2. **Instaliraj zavisnosti sa Composer-om**