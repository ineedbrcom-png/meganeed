# meganeed

Express server with REST API, Socket.IO chat, and SQLite database.

## Getting Started

### Installation

```bash
npm install
```

### Database Setup

Run migrations to create the database tables:

```bash
npm run migrate
```

### Running the Server

```bash
npm start
```

The server will start at http://localhost:3000

### API Endpoints

#### Users

- `GET /users` - Get all users
- `POST /users` - Create a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

#### Orders

- `GET /orders` - Get all orders
- `POST /orders` - Create a new order
  ```json
  {
    "product": "Product Name",
    "quantity": 5
  }
  ```

### Chat

The application includes a Socket.IO-based chat interface. Open http://localhost:3000 in your browser to access it.

### Running Tests

```bash
npm test
```