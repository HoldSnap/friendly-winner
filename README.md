# Games API

REST API для управления играми с авторизацией.

## 📦 Стек

* Node.js
* Express
* Sequelize
* PostgreSQL
* JWT
* Docker

---

## 🚀 Запуск (Docker)

```bash
docker-compose up --build
```

Приложение доступно:

```
http://localhost:3001
```

---

## 🔐 Авторизация

### POST /auth/login

```json
{
  "username": "admin",
  "password": "1234"
}
```

Ответ:

```json
{
  "token": "..."
}
```

---

## 🎮 Game API (требуется токен)

Во все запросы:

```
Authorization: Bearer TOKEN
```

---

### GET /games

Получить все игры

### GET /games/:id

Получить игру по id

### POST /games

Создать игру

```json
{
  "title": "Dota 2",
  "genre": "MOBA",
  "price": 0,
  "rating": 9,
  "isMultiplayer": true
}
```

---

### PUT /games/:id

Полное обновление

### PATCH /games/:id

Частичное обновление

### DELETE /games/:id

Удаление

---

## ⚠️ Ошибки

Все ошибки возвращаются в формате:

```json
{
  "error": "message"
}
```

Коды:

* 400 Bad Request
* 401 Unauthorized
* 404 Not Found
* 405 Method Not Allowed
* 422 Unprocessable Entity
* 500 Internal Server Error

---

## 📌 Примечание

.env не используется, так как пароль не соответствует требованиям безопасности, поэтому подключение указано напрямую в коде ))))))))))))))))
