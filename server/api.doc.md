## List of API Endpoints

### 1. POST /register

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

