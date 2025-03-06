## List of API Endpoints

<<<<<<< HEAD
### 1. POST /register
=======
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
>>>>>>> d68ac9fbf58e37327fee75c44cb132da34383d33

**Request:**

- Body:
  ```json
  {
    "email": "string",
    "name": "string",
    "password": "string"
  }
  ```

**Responses:**

- 201 - Created:
  ```json
  {
    "id": "integer",
    "name": "string",
    "email": "string"
  }
  ```

- 400 - Bad Request:
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

### 2. POST /login

**Request:**

- Body:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

**Responses:**

- 200 - OK:
  ```json
  {
    "access_token": "string"
  }
  ```

- 400 - Bad Request:
  ```json
  {
    "message": "Email is required"
  }
  OR
  {
    "message": "Password is required"
  }
  ```

- 401 - Unauthorized:
  ```json
  {
    "message": "Invalid email/password"
  }
  ```

### 3. POST /board

**Request:**

- Body:
  ```json
  {
    "name": "string"
  }
  ```

**Responses:**

- 201 - Created:
  ```json
  {
    "id": "integer",
    "name": "string"
  }
  ```

### 4. GET /board

**Responses:**

- 200 - OK:
  ```json
  [
    {
      "id": "integer",
      "name": "string"
    }
  ]
  ```

### 5. GET /board/:id

**Responses:**

- 200 - OK:
  ```json
  {
    "id": "integer",
    "name": "string"
  }
  ```

### 6. GET /board/member

**Responses:**

- 200 - OK:
  ```json
  [
    {
      "id": "integer",
      "name": "string"
    }
  ]
  ```

### 7. GET /boardMembers

**Responses:**

- 200 - OK:
  ```json
  [
    {
      "id": "integer",
      "Board": {
        "id": "integer",
        "name": "string"
      }
    }
  ]
  ```

### 8. POST /board/member

**Request:**

- Body:
  ```json
  {
    "boardId": "integer",
    "userId": "integer"
  }
  ```

**Responses:**

- 201 - Created:
  ```json
  {
    "id": "integer",
    "boardId": "integer",
    "userId": "integer"
  }
  ```

### 9. GET /user

**Responses:**

- 200 - OK:
  ```json
  {
    "id": "integer",
    "name": "string",
    "email": "string"
  }
  ```

### 10. GET /users/board

**Responses:**

- 200 - OK:
  ```json
  [
    {
      "id": "integer",
      "name": "string"
    }
  ]
  ```

### 11. GET /list/:boardId

**Responses:**

- 200 - OK:
  ```json
  [
    {
      "id": "integer",
      "name": "string",
      "boardId": "integer"
    }
  ]
  ```

### 12. POST /list/:boardId

**Request:**

- Body:
  ```json
  {
    "name": "string"
  }
  ```

**Responses:**

- 201 - Created:
  ```json
  {
    "id": "integer",
    "name": "string",
    "boardId": "integer"
  }
  ```


### 13. PATCH /card/:id

**Request:**

- Body:
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```

**Responses:**

- 200 - OK:
  ```json
  {
    "id": "integer",
    "name": "string",
    "description": "string",
    "listId": "integer"
  }
  ```

### 14. GET /card/:listId

**Responses:**

- 200 - OK:
  ```json
  [
    {
      "id": "integer",
      "name": "string",
      "description": "string",
      "listId": "integer"
    }
  ]
  ```

### 15. POST /card/:listId

**Request:**

- Body:
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```

**Responses:**

- 201 - Created:
  ```json
  {
    "id": "integer",
    "name": "string",
    "description": "string",
    "listId": "integer"
  }
  ```

<<<<<<< HEAD
=======
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
>>>>>>> d68ac9fbf58e37327fee75c44cb132da34383d33
