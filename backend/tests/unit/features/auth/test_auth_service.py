from app.features.auth import service


def test_login_user_success(mocker):
    db = mocker.Mock()

    # fake user
    user = type("User", (), {"id": 1, "hashed_password": "hashed"})

    # mock repo
    mocker.patch("app.features.auth.repository.get_by_email", return_value=user)

    # mock password check
    mocker.patch("app.features.auth.service.verify_password", return_value=True)

    # mock tokens
    mocker.patch("app.features.auth.service.create_access_token", return_value="access")
    mocker.patch("app.features.auth.service.create_refresh_token", return_value="refresh")

    result = service.login_user(db, "test@test.com", "1234")

    assert result["access_token"] == "access"


def test_register_user_success(mocker):
    db = mocker.Mock()

    mocker.patch("app.features.auth.repository.get_by_email", return_value=None)

    mocker.patch("app.features.auth.service.hash_password", return_value="hashed")

    user = type("User", (), {"id": 1})

    mocker.patch("app.features.auth.repository.create_user", return_value=user)

    mocker.patch("app.features.auth.service.create_access_token", return_value="access")

    mocker.patch("app.features.auth.service.create_refresh_token", return_value="refresh")

    result = service.register_user(db, "test@test.com", "1234")

    assert result["access_token"] == "access"
    assert result["refresh_token"] == "refresh"
