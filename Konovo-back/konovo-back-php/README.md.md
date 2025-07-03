\# PHP Backend za Product API



Ovaj projekat predstavlja PHP backend servis za upravljanje proizvodima, koji komunicira sa eksternim API-em i prosledjuje podatke frontend aplikaciji.



---



\### Opis projekta ###



Backend servis je razvijen u PHP-u, koristi Guzzle HTTP klijent za komunikaciju sa eksternim API-em (`https://zadatak.konovo.rs/`).  

Servis pruza API za dohvat liste proizvoda, specifican proizvod, kao i login endpoint za dobijanje tokena.  

Servis obradjuje podatke (povecava cenu monitora, menja opis proizvoda), filtrira ih po kategoriji i pretrazuje po nazivu i opisu.



---



\## Tehnologije



\- PHP 8+

\- Guzzle HTTP Client

\- Composer za upravljanje zavisnostima

\- REST API stil komunikacije



---



\## Kako pokrenuti backend server



1\. \*\*Preuzmi ili kloniraj ovaj repozitorijum\*\*



git clone https://github.com/DusanM998/konovo-zadatak.git



2\. \*\*Instaliraj zavisnosti sa Composer-om\*\*



composer install



Backend server je dostupan na: http://localhost:8000



\### Opis Implementacije ###



**--ApiClient:**

Koristi Guzzle za autentifikaciju (login endpoint) i pristup eksternom API-u.

Cuva dobijeni JWT token i prosledjuje ga headerima u svakom zahtevu.



**--ProductService**

Dobavlja proizvode preko ApiClient

Modifikuje cenu monitora (povecava je za 10%)

Menja rec brzina u opisu u performanse



**--index.php(glavna skripta)**

Postavlja CORS zaglavlja za frontend pristup

Ruta **/products** - vraca listu proizvoda sa opcionim filterima categoryName i search

Ruta **/products/{id}** vraca proizvod sa specificnim sid\_product

Ruta **/login** prihvata JSON sa username i password i prosledjuje login zahtev eksternom API-ju i na kraju vraca token

