# Домашнє завдання. Тема 9. Робота з файлами та тестування додатків

### 🔐 Авторизація

| Метод | Ендпоінт       | Опис                                               | Авторизація |
| ----- | -------------- | -------------------------------------------------- | ----------- |
| POST  | /auth/register | Реєстрація нового користувача                      | ❌ Ні       |
| POST  | /auth/login    | Вхід користувача та отримання токена               | ❌ Ні       |
| POST  | /auth/logout   | Вихід з системи (анулювання токена)                | ✅ Так      |
| GET   | /auth/current  | Отримати дані поточного авторизованого користувача | ✅ Так      |
| PATCH | /auth/avatars  | Поновити аватар користувача                        | ✅ Так      |

### 📇 Контакти

> Усі маршрути нижче вимагають авторизації (Bearer <token> у заголовку)

| Метод  | Ендпоінт               | Опис                                       | Тіло запиту              |
| ------ | ---------------------- | ------------------------------------------ | ------------------------ |
| GET    | /contacts              | Отримати список усіх контактів користувача | —                        |
| GET    | /contacts/:id          | Отримати контакт за його `id`              | —                        |
| POST   | /contacts              | Додати новий контакт                       | `name`, `email`, `phone` |
| PUT    | /contacts/:id          | Оновити дані контакту                      | `name`, `email`, `phone` |
| DELETE | /contacts/:id          | Видалити контакт за `id`                   | —                        |
| PATCH  | /contacts/:id/favorite | Оновити статус "улюблений"                 | `favorite` (boolean)     |

```bash
├── .env.example
├── .gitignore
├── .prettierrc
├── README.md
├── app.js
├── assets
    ├── .gitkeep
    └── avatar.png
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
    ├── isEmptyBody.js
    └── upload.js
├── package-lock.json
├── package.json
├── public
    └── avatars
    │   ├── .gitkeep
    │   └── 15_1745181144058_avatar.png
├── routes
    ├── authRouter.js
    └── contactsRouter.js
├── schemas
    ├── authSchemas.js
    └── contactsSchemas.js
├── services
    ├── authServices.js
    └── contactsServices.js
└── temp
    └── .gitkeep
```
