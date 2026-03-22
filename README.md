# 🚀 LeadFlow CRM

## 🎯 1. ZAŁOŻENIA PROJEKTU

### 🧠 Cel

LeadFlow CRM --- aplikacja do zarządzania leadami sprzedażowymi z
naciskiem na: - prosty, ale realny workflow sprzedażowy - analitykę i
wizualizacje - clean architecture (Vertical Slice) - pełny flow: auth →
CRUD → analytics → deploy

------------------------------------------------------------------------

### 👤 Użytkownik końcowy może:

-   założyć konto i się zalogować
-   zarządzać leadami (CRUD)
-   zmieniać statusy (pipeline)
-   filtrować i wyszukiwać leady
-   widzieć dashboard (metryki + wykresy)
-   dodawać notatki do leadów
-   przypisywać leady do etapów (np. NEW → CONTACTED → WON)

------------------------------------------------------------------------

## 🧩 Core features (MVP+)

### 🔐 Auth

-   register / login
-   JWT (access + refresh)
-   hashowanie haseł
-   ochrona endpointów
-   refresh token flow (`/auth/refresh`)

------------------------------------------------------------------------

### 📇 Leads

-   create / update / delete
-   soft delete (`is_deleted`)
-   status (pipeline)
-   email, name, company
-   tagging (np. "hot", "cold")
-   user ownership (`user_id`)

------------------------------------------------------------------------

### 🧠 Pipeline

-   Kanban board (drag & drop)
-   Statusy:
    -   NEW
    -   CONTACTED
    -   QUALIFIED
    -   WON
    -   LOST

------------------------------------------------------------------------

### 📊 Dashboard

-   liczba leadów
-   conversion rate (WON / ALL)
-   liczba WON / LOST
-   wykresy (per dzień / status)

------------------------------------------------------------------------

### 📝 Notes / Activity

-   notatki do leada
-   status history (lead timeline)

------------------------------------------------------------------------

## 🧱 2. ARCHITEKTURA (Vertical Slice)

    app/
      features/
        auth/
        leads/
        analytics/

      core/
      db/

------------------------------------------------------------------------

## ⚙️ 3. STACK

### Backend

-   FastAPI
-   SQLAlchemy
-   PostgreSQL
-   Alembic
-   Pydantic v2

### Frontend

-   Next.js (App Router)
-   TypeScript
-   Tailwind
-   TanStack Query

### 📊 Wizualizacje

-   Recharts

------------------------------------------------------------------------

## 🔁 4. FLOW

### 🔐 Auth

1.  register
2.  login → JWT
3.  refresh token flow
4.  authenticated requests

### 📇 Leads

1.  create → NEW
2.  move in pipeline
3.  update status
4.  soft delete

### 📊 Dashboard

1.  `/analytics`
2.  backend computes metrics
3.  frontend renders charts

------------------------------------------------------------------------

## 📅 5. PLAN 7 DNI

-   **D1:** setup + auth\
-   **D2:** CRUD leads\
-   **D3:** Kanban\
-   **D4:** Dashboard\
-   **D5:** Notes + UX\
-   **D6:** README + polish\
-   **D7:** Deploy

------------------------------------------------------------------------

## 💎 6. DODATKI (ważne)

-   pagination + filtering (backend)
-   backend search (ILIKE)
-   error handling (global handler)
-   loading states
-   optimistic UI (TanStack Query)
-   validation (Pydantic + Zod)
-   API client layer
-   env config (.env)
-   logging (requests + errors)
-   basic tests (auth + leads)

------------------------------------------------------------------------

## 🧠 7. ARCHITEKTURA API (konwencja)

    GET    /leads
    POST   /leads
    PATCH  /leads/{id}
    DELETE /leads/{id}

    POST   /auth/login
    POST   /auth/register
    POST   /auth/refresh

------------------------------------------------------------------------

## ✨ 8. UX / QUALITY

-   skeleton loaders
-   disabled buttons on submit
-   toasts (success/error)
-   empty states
-   default sorting (newest first)

------------------------------------------------------------------------

## 🚀 9. DEPLOY

-   Backend: Railway / Render
-   Frontend: Vercel
-   demo account (optional)

------------------------------------------------------------------------

## 🏆 10. CEL PROJEKTU

Projekt portfolio pokazujący: - fullstack development (FastAPI +
Next.js) - clean architecture (Vertical Slice) - real-world features
(auth, pipeline, analytics) - nowoczesny frontend (TanStack Query,
charts)
