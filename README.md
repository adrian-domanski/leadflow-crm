# 🚀 LeadFlow CRM

## 📌 Opis projektu
LeadFlow CRM to aplikacja typu SaaS do zarządzania leadami (potencjalnymi klientami) oraz procesem sprzedaży.

Użytkownik może:
- zarządzać listą leadów
- śledzić status kontaktu
- analizować dane na dashboardzie
- generować nowe leady

Projekt został zaprojektowany jako **produkcyjna aplikacja fullstack**, pokazująca realne umiejętności backend + frontend + deployment.

---

# 🧱 Stack technologiczny

## Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- JWT (auth)

## Frontend
- Next.js
- React
- Tailwind CSS
- React Query / TanStack Query

## Wykresy
- Recharts (dashboard)

## Dev / Infra
- Docker + docker-compose
- Railway (backend + DB)
- Vercel (frontend)

---

# 🎯 Funkcjonalności (MVP)

## 🔐 Autoryzacja
- Rejestracja użytkownika
- Logowanie
- JWT access + refresh token
- Hashowanie haseł (bcrypt)

## 👤 Użytkownik
- Profil użytkownika
- Izolacja danych (user widzi tylko swoje leady)

## 📋 Lead Management
- CRUD leadów
- Pola:
  - email
  - company
  - status (NEW, CONTACTED, QUALIFIED, CLOSED)
  - notes
  - created_at

## 🔍 Filtrowanie i paginacja
- filtrowanie po statusie
- wyszukiwanie (email / company)
- paginacja wyników

## 📊 Dashboard
- liczba leadów
- liczba zamkniętych leadów
- conversion rate
- wykresy (Recharts)

## ⚡ Generowanie leadów
- endpoint generujący mock dane
- zapis do bazy danych

---

# 🏗️ Architektura backendu

```
backend/
├── app/
│   ├── main.py
│   ├── api/
│   ├── core/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── repositories/
│   └── tests/
```

---

# 🧪 Testy

## Zakres:
- testy unitowe (services)
- testy API (endpointy)

## Narzędzia:
- pytest
- httpx

---

# 🐳 Docker

- backend (FastAPI)
- frontend (Next.js)
- database (PostgreSQL)

Uruchomienie:
```
docker-compose up --build
```

---

# ☁️ Deployment

- Backend: Railway
- Frontend: Vercel
- Database: PostgreSQL (Railway / Supabase)

---

# 📄 README powinno zawierać

- opis projektu
- stack technologiczny
- instrukcję uruchomienia
- link do live demo
- screenshoty aplikacji

---

# 🎯 Definition of Done

Projekt jest gotowy gdy:

- działa online (live URL)
- można się zarejestrować i zalogować
- można dodawać i zarządzać leadami
- działa filtrowanie i dashboard
- są testy
- działa docker
- jest README

---

# ⏱️ Plan realizacji

## Tydzień 1
- setup backendu
- modele + baza danych

## Tydzień 2
- auth + CRUD API

## Tydzień 3
- frontend (Next.js)
- integracja API

## Tydzień 4
- testy
- docker
- deploy

---

# 💡 Cel projektu

Celem projektu jest stworzenie aplikacji, która:

- wygląda jak realny produkt SaaS
- pokazuje umiejętności fullstack (React + Python)
- pozwala aplikować na stanowiska Fullstack / Backend Python
