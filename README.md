# 🚀 LeadFlow CRM

LeadFlow CRM is a backend application for managing sales leads, built
with **FastAPI** and designed using **clean architecture (Vertical
Slice)**.

The project simulates a real-world CRM system with a sales pipeline and
analytics.

------------------------------------------------------------------------

## 🎯 Features

### 🔐 Authentication

-   User registration and login
-   JWT authentication (access token)
-   Protected endpoints
-   Password hashing

------------------------------------------------------------------------

### 📇 Leads

-   Create, update, and delete leads
-   Soft delete (`is_deleted`)
-   User ownership (users can only access their own data)
-   Sales pipeline statuses:
    -   NEW
    -   CONTACTED
    -   QUALIFIED
    -   WON
    -   LOST

------------------------------------------------------------------------

### 🔍 Query Features

-   Filtering (`status`)
-   Search (`ILIKE`)
-   Sorting (`created_at`)
-   Pagination (`page`, `limit`)

------------------------------------------------------------------------

### 📊 Analytics

-   Lead statistics:
    -   total
    -   won
    -   lost
    -   conversion rate
-   Status breakdown
-   Time-series (leads per day)

------------------------------------------------------------------------

## 🧱 Tech Stack

-   FastAPI
-   SQLAlchemy
-   PostgreSQL
-   Alembic
-   Pydantic

------------------------------------------------------------------------

## ▶️ How to Run

``` bash
git clone <repo-url>
cd backend
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

------------------------------------------------------------------------

## 📌 Project Goal

This project demonstrates: - Backend API design - Database modeling &
migrations - Clean architecture (Vertical Slice) - Real-world features
(auth, pipeline, analytics)
