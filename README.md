# Post Composer

A basic full-stack Post Composer app built for a Full Stack Development class project.

## Architecture

- **Frontend**: React (Vite) — deployed on Vercel / Netlify / GitHub Pages
- **Backend**: Node.js + Express — deployed on Render / Railway / Cyclic
- **Database**: MongoDB Atlas

```
Login/Register ──▶ MongoDB Atlas
                       │
Post Creation ──▶ Form ──▶ Title (required)
                       ├──▶ Image (optional)
                       └──▶ Video (optional)

Frontend (React) ──HTTP/REST──▶ Backend (Express) ──▶ MongoDB Atlas
```

## Features

- User signup & login (JWT authentication, passwords hashed with bcrypt)
- Any logged-in user can create a post: Title (required), Image URL (optional), Video URL (optional)
- Public feed showing all posts
- Admin login (an admin account is just a User document with `role: "admin"`)
- Admin CRUD:
  - Manage all users (create, edit, delete, promote/demote role)
  - Manage all posts (edit, delete any user's post)

## Folder Structure

```
postcomposer/
├── backend/     → Express API + MongoDB models
└── frontend/    → React app (Vite)
```

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=any_random_secret_string
```

Run it:
```bash
npm run dev
```

Backend runs at `http://localhost:5000`.

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

Run it:
```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Creating your first Admin

By default every signup gets `role: "user"`. To make yourself an admin:

1. Sign up normally through the app.
2. Go to your MongoDB Atlas cluster → Browse Collections → `users` collection.
3. Find your user document and change `"role": "user"` to `"role": "admin"`.
4. Log out and log back in — you'll now see the Admin link in the navbar.

(Alternatively, once you have one admin, that admin can create more admins from the Admin → Manage Users page.)

## Deploying (Live Website)

1. **Database**: Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), whitelist all IPs (0.0.0.0/0) for class demo purposes, and copy the connection string into your backend `.env`.
2. **Backend**: Push the `backend` folder to GitHub, then deploy it on [Render](https://render.com) (free web service). Set the same environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`) in Render's dashboard.
3. **Frontend**: Push the `frontend` folder to GitHub, then deploy it on [Vercel](https://vercel.com) or [Netlify](https://netlify.com). Set `VITE_API_URL` to your live Render backend URL (e.g. `https://your-backend.onrender.com/api`).
4. Push both folders to a single GitHub repo (this whole `postcomposer/` folder) so your project source is all in one place, even though frontend and backend deploy separately.

## API Endpoints

**Auth**
- `POST /api/auth/register` — signup
- `POST /api/auth/login` — login

**Posts**
- `GET /api/posts` — all posts (public)
- `POST /api/posts` — create post (logged in)
- `GET /api/posts/mine` — my posts (logged in)
- `PUT /api/posts/:id` — edit own post
- `DELETE /api/posts/:id` — delete own post

**Admin** (admin role only)
- `GET/POST /api/admin/users`
- `PUT/DELETE /api/admin/users/:id`
- `GET /api/admin/posts`
- `PUT/DELETE /api/admin/posts/:id`

## Notes

- Images/videos are added via URL (e.g. an image hosted online) rather than file upload, to keep the project simple. You can extend this later with something like Cloudinary or Multer if your class requires actual file uploads.
- Keep `.env` files out of GitHub — they're already in `.gitignore`.
