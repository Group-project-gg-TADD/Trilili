## List of api Group Project

- `POST /register`
- `POST /login`
- `POST /board`
- `GET /board`
- `GET /board/:id`
- `GET /board/member`
- `GET /boardMembers`
- `POST /board/member`
- `GET /users/board`
- `GET /list/:boardId`
- `POST /list/:boardId`
- `DELETE /list/delete/:id`
- `PATCH /card/:id`
- `GET /card/:listId`
- `POST /card/:listId`

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

## 10. GET /list/:boardId

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
  "boardId": "integer",
  "createdAt": "string",
  "updatedAt": "string"
}
```

## 11. POST /list/:boardId

Request:

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
  "boardId": "integer",
  "createdAt": "string",
  "updatedAt": "string"
}
```

## 12. DELETE /list/delete/:id

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
  "message": "List deleted successfully"
}
```

## 13. PATCH /card/:id

Request:

- headers :

```json
{
  "access_token": "Bearer <access_token>"
}
```

- body :

```json
{
  "name": "string",
  "description": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "name": "string",
  "description": "string",
  "listId": "integer",
  "createdAt": "string",
  "updatedAt": "string"
}
```

## 14. GET /card/:listId

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
  "name": "string",
  "description": "string",
  "listId": "integer",
  "createdAt": "string",
  "updatedAt": "string"
}
```

## 15. POST /card/:listId

Request :

- headers:

```json
{
  "access_token": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "string",
  "description": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "name": "string",
  "description": "string",
  "listId": "integer",
  "createdAt": "string",
  "updatedAt": "string"
}
```

## Error Handling

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You do not have access to this resource"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Resource not found"
}
```
