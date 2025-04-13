# Домашнє завдання. Тема 7. Аутентифікація та авторизація

### 🔐 Авторизація

| Метод | Ендпоінт       | Опис                                               | Авторизація |
| ----- | -------------- | -------------------------------------------------- | ----------- |
| POST  | /auth/register | Реєстрація нового користувача                      | ❌ Ні       |
| POST  | /auth/login    | Вхід користувача та отримання токена               | ❌ Ні       |
| POST  | /auth/logout   | Вихід з системи (анулювання токена)                | ✅ Так      |
| GET   | /auth/current  | Отримати дані поточного авторизованого користувача | ✅ Так      |

### 🔐 Авторизація

| Метод | Ендпоінт       | Опис                                               | Авторизація |
| ----- | -------------- | -------------------------------------------------- | ----------- |
| POST  | /auth/register | Реєстрація нового користувача                      | ❌ Ні       |
| POST  | /auth/login    | Вхід користувача та отримання токена               | ❌ Ні       |
| POST  | /auth/logout   | Вихід з системи (анулювання токена)                | ✅ Так      |
| GET   | /auth/current  | Отримати дані поточного авторизованого користувача | ✅ Так      |

```bash
├── .env.example
├── .gitignore
├── .prettierrc
├── README.md
├── app.js
├── assets
    └── .gitkeep
├── constants
    └── regexp.js
├── controllers
    ├── authControllers.js
    └── contactsControllers.js
├── db
    ├── Sequelize.js
    ├── contacts.json
    └── models
    │   ├── Contact.js
    │   └── User.js
├── decorators
    ├── ctrlWrapper.js
    └── validateBody.js
├── helpers
    ├── HttpError.js
    └── jwt.js
├── middlewares
    ├── authenticate.js
    └── isEmptyBody.js
├── package-lock.json
├── package.json
├── routes
    ├── authRouter.js
    └── contactsRouter.js
├── schemas
    ├── authSchemas.js
    └── contactsSchemas.js
└── services
    ├── authServices.js
    └── contactsServices.js
```
