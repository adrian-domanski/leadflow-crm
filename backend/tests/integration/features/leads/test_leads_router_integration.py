def test_create_lead(client, db):
    payload = {"name": "Adrian", "email": "adrian@test.com", "company": "TestCorp"}

    response = client.post("/api/leads", json=payload)

    assert response.status_code == 201

    data = response.json()
    assert data["name"] == "Adrian"
    assert data["email"] == "adrian@test.com"


def test_create_lead_conflict_email(client):
    payload = {"name": "Adrian", "email": "dup@test.com", "company": "TestCorp"}

    response1 = client.post("/api/leads", json=payload)
    assert response1.status_code == 201

    response2 = client.post("/api/leads", json=payload)

    assert response2.status_code == 409
    assert "already exists" in response2.text
