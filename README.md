Spring backend source code. Below is documentation in Polish:

# Projekt na Zaawansowane Techniki Internetowe - F1 Fantasy League - Michał Kuś

## I. Projekt koncepcji, założenia
* 1. Zdefiniowanie tematu projektu  
    Celem projektu jest stworzenie aplikacji internetowej, która obsługuje grę typu Fantasy League opartą na Formule 1.
* 2. Analiza wynagań użytkownika  
    Aplikacja ma :
        - Obsługiwać logowanie i rejestrację
        - Wyświetlać harmonogram wyścigów(miejsca, daty, godziny)
        - Wyświetlać aktualną tabele wyników
        - Wyświetlać ranking użytkowników
        - Pozwalać na wprowadzanie przewidywań
        - Obsługiwać wprowadzanie danych przez moderatora

## II. Projekt dragramów (konceptualny)
* 4. Budowa i analiza diagramu przepływu danych DFD  
Baza danych w projekcie umożliwa użytkownikom na czytanie danych z tabel, a tym którzy mają uprawnienia administratora na wprowadzanie, więc diagram przepływu danych nie ma praktycznego zastosowania.
* 5. Zdefiniowanie encji oraz ich atrybutów,  Zaprojektowanie relacji pomiędzy encjami (Diagram ERD)
![Alt text](https://i.imgur.com/D9tat1G.jpg)

## III. Projekt logiczny
* 7. Słowniki danych - tabele  
<p>

|           | season  |                                            |  
|-----------|---------|--------------------------------------------|  
| Kolumna   | Typ     | Opis                                       |  
| season_id | INTEGER | Klucz główny                               |  
| year      | VARCHAR | Unikalny rok w którym odbywa się sezon     |  
| wdc       | VARCHAR | Imie i nazwisko Mistrza Świata Kierowców   |  
| wcc       | VARCHAR | Nazwa zespołu Mistrza Świata Konstruktorów |  
<p>

|           | teams   |                                              |
|-----------|---------|----------------------------------------------|
| Kolumna   | Typ     | Opis                                         |
| team_id   | INTEGER | Klucz główny                                 |
| season_id | INTEGER | ID sezonu w którym zapisany jest zespół [FK] |
| name      | VARCHAR | Nazwa zespołu                                |
| points    | INTEGER | Aktualna liczba punktów                      |
<p>

|           | drivers |                                                |
|-----------|---------|------------------------------------------------|
| Kolumna   | Typ     | Opis                                           |
| driver_id | INTEGER | Klucz główny                                   |
| team_id   | INTEGER | ID zespołu do którego należy kierowca [FK]     |
| season_id | INTEGER | ID sezonu w którym zapisany jest kierowca [FK] |
| fname     | VARCHAR | Imię kierowcy                                  |
| lname     | VARCHAR | Nazwisko kierowcy                              |
| points    | INTEGER | Aktualna liczba punktów                        |
<p>

|           | races     |                                                          |
|-----------|-----------|----------------------------------------------------------|
| Kolumna   | Typ       | Opis                                                     |
| race_id   | INTEGER   | Klucz główny                                             |
| season_id | INTEGER   | ID sezonu w którym zapisany jest wyścig [FK]             |
| name      | VARCHAR   | Nazwa Grand Prix np. AWS Grand Prix du Canada            |
| country   | VARCHAR   | Kraj w którym rozgrywane jest Grand Prix                 |
| city      | VARCHAR   | Miasto w którym rozgrywane jest Grand Prix               |
| track     | VARCHAR   | Nazwa toru na którym rozgrywane jest Grand Prix          |
| fp1       | TIMESTAMP | Data i czas startu FP1(yyyy-mm-dd hh:mm:ss) UTC          |
| fp2       | TIMESTAMP | Data i czas startu FP2(yyyy-mm-dd hh:mm:ss) UTC          |
| fp3       | TIMESTAMP | Data i czas startu FP3(yyyy-mm-dd hh:mm:ss) UTC          |
| quali     | TIMESTAMP | Data i czas startu kwalifikacji(yyyy-mm-dd hh:mm:ss) UTC |
| sprint    | TIMESTAMP | Data i czas startu sprintu(yyyy-mm-dd hh:mm:ss) UTC      |
| race      | TIMESTAMP | Data i czas startu wyścigu(yyyy-mm-dd hh:mm:ss) UTC      |
<p>

|             | race_results |                                                         |
|-------------|--------------|---------------------------------------------------------|
| Kolumna     | Typ          | Opis                                                    |
| result_id   | INTEGER      | Klucz główny                                            |
| race_id     | INTEGER      | ID wyścigu z którego jest wynik [FK]                    |
| driver_id   | INTEGER      | ID kierowcy którego jest wynik [FK]                     |
| position    | INTEGER      | Pozycja kierowcy w wyścigu                              |
| points      | INTEGER      | Zdobyte punkty                                          |
| dnf         | BOOLEAN      | Czy udało się kierowcy ukończyć wyścig                  |
| fastest_lap | INTEGER      | Czy kierowca uzyskał najszybsze okrążenie: TAK-1, NIE-0 |
<p>

|           | ranking |                              |
|-----------|---------|------------------------------|
| Kolumna   | Typ     | Opis                         |
| user_id   | INTEGER | ID użytkownika [PFK]         |
| season_id | INTEGER | ID sezonu [PFK]              |
| points    | INTEGER | Punkty użytkownika w sezonie |
<p>

|               | user_predictions |                                                    |
|---------------|------------------|----------------------------------------------------|
| Kolumna       | Typ              | Opis                                               |
| up_id         | INTEGER          | Klucz głowny                                       |
| user_id       | INTEGER          | ID użytkownika [FK]                                |
| race_id       | INTEGER          | ID wyścigu [FK]                                    |
| prediction_id | INTEGER          | ID przewidywania [FK]                              |
| title         | VARCHAR          | Tytuł przewidywania np. imię i nazwisko kierowcy   |
<p>

|               | available_predictions |                                                                       |
|---------------|-----------------------|-----------------------------------------------------------------------|
| Kolumna       | Typ                   | Opis                                                                  |
| prediction_id | INTEGER               | Klucz głowny                                                          |
| season_id     | INTEGER               | ID sezonu [FK]                                                        |
| target        | VARCHAR               | Oznaczenie czy przewidywanie odnosi się do kierowcy(D) czy zespołu(T) |
| type_code     | VARCHAR               | Kod przewidywania                                                     |
<p>

|                  | users   |                                           |
|------------------|---------|-------------------------------------------|
| Kolumna          | Typ     | Opis                                      |
| user_id          | INTEGER | Klucz głowny                              |
| email            | VARCHAR | Nazwa użytkownika                         |
| fname            | VARCHAR | Imię użytkownika                          |
| lname            | VARCHAR | Nazwisko użytkownika                      |
| pass             | VARCHAR | Hasło                                     |
| admin_privileges | INTEGER | Czy użytkownik jest adminem: TAK-1, NIE-0 |
<p>

## IV. Projekt funkcjonalny
Strona główna aplikacji, u góry pasek nawigacji po kliknięciu na poszczególne przyciski zmieniamy karty.
![Alt](https://i.imgur.com/bgWs6lI.jpg)
Na karcie wyników wybiera się tabele oraz sezony za pomocą rozwijanych menu  
Karta wyników - Tabela zespołów
![Alt](https://i.imgur.com/SQbe0ll.jpg)
Karta wyników - Tabela kierowców
![Alt](https://i.imgur.com/s6Bb3td.jpg)
Na karcie harmonogramu wybiera się sezona za pomocą rozwijanego menu, po kliknięciu na pojedynczy wiersz rozwija się dokładny rozkład weekendu wyścigowego  
Karta harmonogramu sezonu
![Alt](https://i.imgur.com/nK849Hn.jpg)
Na karcie przewidywań wybiera się wyścig, kierowcę lub zespół oraz przewidywanie, a następnie zatwierdza przyciskiem 
<p>

Karta przewidywań
![Alt](https://i.imgur.com/nK849Hn.jpg)
Panel administratora - Nowy Sezon 1/4
![Alt](https://i.imgur.com/UmkToTN.jpg)
Panel administratora - Nowy Sezon 2/4, Dodawanie zespołów
![Alt](https://i.imgur.com/QZQSeDe.jpg)
Panel administratora - Nowy Sezon 3/4, Dodawanie kierowców
![Alt](https://i.imgur.com/xFsHB9s.jpg)
Panel administratora - Nowy Sezon 4/4, Dodawanie wyscigów
![Alt](https://i.imgur.com/3EyRhP8.jpg)
Panel administratora - Nowy Wynik Wyścigu
![Alt](https://i.imgur.com/1I26Bdd.jpg)
Panel administratora - Modyfikacja danych użytkowników, nadawanie uprawnień administratora
![Alt](https://i.imgur.com/P5GdQBw.jpg)
Panel administratora - Modyfikacje zespołów
![Alt](https://i.imgur.com/H3ZCKCg.jpg)

## V. Dokumentacja
* Wprowadzanie danych  
    Przykładowe dane zostały wprowadzone do bazy przez autora, są to rzeczywiste dane z historycznych sezonów Formuły 1. Dane do bazy wprowadzane są ręcznie przez odpowiednie interfejsy w Panelu Administratora


# vue-frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

