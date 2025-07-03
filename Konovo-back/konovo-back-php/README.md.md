\# PHP Backend za Product API



Ovaj projekat predstavlja PHP backend servis za upravljanje proizvodima, koji komunicira sa eksternim API-em i prosledjuje podatke frontend aplikaciji.



---



\## Sadrzaj ##



\- \[Opis projekta](#opis-projekta)  

\- \[Tehnologije](#tehnologije)  

\- \[Kako pokrenuti backend server](#kako-pokrenuti-backend-server)  

\- \[Opis implementacije](#opis-implementacije)  

\- \[API Endpoints i komunikacija sa frontendom](#api-endpoints-i-komunikacija-sa-frontendom)  



---



\## Opis projekta 



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



3\. \*\*Pokrenuti PHP server\*\*



php -S localhost:8000 -t public



4\. \*\*Backend je pokrenut na: \*\*



http://localhost:8000



\## Opis implementacije ## 



&nbsp;-Klase i funkcionalnosti



&nbsp;1. **ApiClient:**

	-Koristi Guzzle za autentifikaciju(login endpoint) i pristup eksternom API-u

&nbsp;	-Cuva dobijeni JWT token i prosledjuje ga headerima u svakom zahtevu

&nbsp;2. **Product Service**

	-Dobavlja proizvode sa eksternog API-a preko ApiClient

&nbsp;	- Modifikuje cenu monitora (povecava je za 10%)

&nbsp;	- Menja rec "brzina" u opisu proizvoda u "performanse"

&nbsp;	- Omogucava filtriranje po kategoriji i pretragu po nazivu/opisu proizvoda

&nbsp;	- Dobavlja pojedinacni proizvod o sif\_product

&nbsp;3. **index.php**

	-Postavlja CORS zaglavlja za frontend pristup

&nbsp;	- Ruta **/procucts -** vraca listu proizvoda sa opcionalnim filterima categoryName i search

&nbsp;	-Ruta **/products/{id} -** vraca pojedinacni proizvod po ID-u

&nbsp;	- Ruta **/login** - prihvata JSON sa username i password i prosledjuje login zahtev eksternom API-u i zatim vraca token



