# PHP Backend za Product API

Ovaj projekat predstavlja PHP backend servis za upravljanje proizvodima, koji komunicira sa eksternim API-em i prosledjuje podatke frontend aplikaciji.

---

## Sadrzaj ##

- [Opis projekta](#opis-projekta)  
- [Tehnologije](#tehnologije)  
- [Kako pokrenuti backend server](#kako-pokrenuti-backend-server)  
- [Opis implementacije](#opis-implementacije)  
- [API Endpoints i komunikacija sa frontendom](#api-endpoints-i-komunikacija-sa-frontendom)

---

## Opis projekta 

Backend servis je razvijen u PHP-u, koristi Guzzle HTTP klijent za komunikaciju sa eksternim API-em (`https://zadatak.konovo.rs/`).  
Servis pruza API za dohvat liste proizvoda, specifican proizvod, kao i login endpoint za dobijanje tokena.  
Servis obradjuje podatke (povecava cenu monitora, menja opis proizvoda), filtrira ih po kategoriji i pretrazuje po nazivu i opisu.
Za razvoj i implementaciju frontend dela aplikacije koriscen je React + Typescript, a za komunikaciju sa API-jem upotrebljen je Redux
Toolkit Query.

---

## Tehnologije
**Backend**
- PHP 8+
- Guzzle HTTP Client
- Composer za upravljanje zavisnostima
- REST API stil komunikacije

**Frontend**
- React(Typescript)
- Redux Toolkit & RTK Query
- React Router DOM
- Tailwind CSS

---

## Kako pokrenuti backend server

1. **Preuzmi ili kloniraj ovaj repozitorijum**

git clone https://github.com/DusanM998/konovo-zadatak.git

2. **Instaliraj zavisnosti sa Composer-om**

composer install

3. **Pokrenuti PHP server**

php -S localhost:8000 -t public

4. **Backend je pokrenut na: **

http://localhost:8000

## Opis implementacije ## 

- Klase i funkcionalnosti

**1. ApiClient:**
- Koristi Guzzle za autentifikaciju(login endpoint) i pristup eksternom API-u
- Cuva dobijeni JWT token i prosledjuje ga headerima u svakom zahtevu
**2. Product Service**
- Dobavlja proizvode sa eksternog API-a preko ApiClient
- Modifikuje cenu monitora (povecava je za 10%)
- Menja rec "brzina" u opisu proizvoda u "performanse"
- Omogucava filtriranje po kategoriji i pretragu po nazivu/opisu proizvoda
- Dobavlja pojedinacni proizvod o sif_product
**3. index.php**
- Postavlja CORS zaglavlja za frontend pristup
- Ruta /procucts - vraca listu proizvoda sa opcionalnim filterima categoryName i search
- Ruta /products/{id} - vraca pojedinacni proizvod po ID-u
- Ruta /login - prihvata JSON sa username i password i prosledjuje login zahtev eksternom API-u i zatim vraca token
## API Endpoints i komunikacija sa frontendom

- Za pokretanje frontend dela aplikacije najpre je neophodno instalirati sve zavisnosti komandom **npm install**, zatim se aplikacije pokrece sa **npm run dev**

Frontend koristi Redux Toolkit Query za komunikaciju sa backendom:

baseQuery: fetchBaseQuery({
  baseUrl: "http://localhost:8000", // PHP backend server
})

**GET/products**: sluzi za dobavljanje proizvoda ciji opcioni parametri mogu biti:
1. kategorija; 2. brend; 3. naziv/opis
**GET/products/:id**: koristi se da dohvati detalje o pojedinacnom proizvodu

**POST/login**: prosledjuje korisnicke podatke i dobija JWT generisani token;
POST se koristi iz bezbednosnih razloga tj. da bi podaci mogli da se salju kroz
body a ne kroz URL, ali i zato sto kada korisnik zeli da se uloguje on zahteva
kreiranje sesije/tokena sto predstavlja akciju sa efektom

**Redux Store**
- Redux store koristi se da zapamti stanje aplikacije izmedju vise komponenti i predstavlja
- centralno mesto gde se nalazi zajednicko stanje aplikacije.
- Za citanje podataka iz Redux store-a koristi se **useSelector**

**Slice**
- Predstavlja deo Redux Toolkita koji grupise stanje i funkcije koje ga menjaju(reducers) na jednom mestu
- Funkcije iz slice-a koriste se tako sto se dispatch-uju tj. dispatch je funkcija kojom se salje akcija.
- Kada se dispatchuje akcija poziva se reducer i globalno stanje se azurira.

Znaci ukratko, **createSlice** kreira stanje + akcije, **dispatch(akcija)** pokrece promenu stanja, dok
**useSelector** sluzi da se iz stanja citaju vrednosti
  

