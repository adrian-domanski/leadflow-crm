from app.main import app
from app.core.dependencies import get_current_user


def test_get_leads(client, mocker):
    # fakse user
    mock_user = type("User", (), {"id": 1})

    # override auth dependency
    app.dependency_overrides[get_current_user] = lambda: mock_user

    # mock data from service
    mock_leads = [
        {"id": 1, "name": "Lead 1"},
        {"id": 2, "name": "Lead 2"},
    ]

    mocker.patch("app.features.leads.service.get_leads", return_value=mock_leads)

    response = client.get("/api/leads")

    assert response.status_code == 200
    assert response.json() == mock_leads

    # cleanup
    app.dependency_overrides.clear()
