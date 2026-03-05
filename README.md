<h1 align="center">AO3 Dupe</h1>

  <p align="center">
    A hybrid of manga and light novel websites, Wattpad, and Archive of Our Own ; a website for oneshot stories using a MERN techstack
    <br />
    **Nina Claudia Del Rosario & Hansen Maeve C. Quindao** 
  </p>

---
## 📖 Overview
**Tech Stack**: MERN (MongoDB Atlas, Express, React, Node.js)
**Architecture**: MVC (Model-View-Controller)
---
## 💻 Preparing the Environment
1. Git clone this repository
2. Install dependencies
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
3. Install React Typescript 
   ```bash
   npm install -g typescript ts-node nodemon
   tsc --version     # for verification
   ```

--- 
## ➡️ How to Run
1. Run terminal from backend using `cd server`
2. `npm run dev` (makes server run at localhost:5000)
3. Run split terminal from frontend using `cd client`
4. `npm run dev` (makes client side run at localhost:5173)
---
## API Endpoints

Base URL: `http://localhost:5000/api/v1`

### Public Routes
### Stories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/stories` | List all active stories |
| GET | `/stories/:id` | Get a single story |
| POST | `/stories` | Create a new story |
| PUT | `/stories/:id` | Update a story |
| DELETE | `/stories/:id` | Soft-delete a story |

### Library

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/library` | List all saved stories |
| POST | `/library` | Add a story to library |
| DELETE | `/library/:id` | Remove a story from library |

---

### Admin Routes

All admin routes require the header:
```
X-Admin-Key: <ADMIN_SECRET_KEY>
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/stories` | List all stories including deleted |
| GET | `/admin/stories/deleted` | List only deleted stories |
| PUT | `/admin/stories/:id/restore` | Restore a soft-deleted story |
| DELETE | `/admin/stories/:id` | Permanently delete a story |

