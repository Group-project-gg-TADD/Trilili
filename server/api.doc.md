## List of api Group Project

- `POST /register`
- `POST /login`

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "name": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "name": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. POST /board

Request

- headers :

```json
{
  "access_token": "Bearer <access_token>"
}
```

- body :

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "name": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

_Response (400 - BadRequest)_

```json
{
  "message": "Name is required"
}
```

## 4. GET/board

Request:

-headers:

```json
{
  "access_token": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "name": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

## 5. GET/board/:id

Request :

-headers

```json
{
  "access_token": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "name": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

## 6. GET /board/member

Request:

- headers:

```json
{
  "access_token": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "boardId": "integer",
  "userId": "integer",
  "createdAt": "string",
  "updatedAt": "string"
}
```

## 7. GET /boardMembers

Request:

- headers

```json
{
  "access_token": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "boardId": "integer",
  "userId": "integer",
  "createdAt": "string",
  "updatedAt": "string",
  "Board": {
    "id": "integer",
    "name": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

## 8. POST /board/member

Request:

- headers

```json
{
  "access_token": "Bearer <access_token>"
}
```

- body

```json
{
  "boardId": "integer",
  "userId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "boardId": "integer",
  "userId": "integer",
  "createdAt": "string",
  "updatedAt": "string"
}
```

## 9. GET /users/board

request :

- headers

```json
{
  "access_token": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "name": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```
