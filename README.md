# Next.js Authentication App

This is my first Next.js App, it has simple Authentication nothing complex. By building this I got to know how we write both the
frontend and the backend in Next.js and also helpful things which Next.js provides. (Not a proper production level project,but just a simple one to understand the Nextjs Basics )

---

## Features

- **Sign Up** — Register with username, email, and password (bcrypt-hashed)
- **Sign In** — JWT-based authentication stored in HTTP-only cookies
- **Email Verification** — Token-based verification via Mailtrap SMTP
- **Protected Routes** — Middleware guards for authenticated/public paths
- **Profile Page** — View account details and sign out
- **Password Reset** — Token infrastructure for forgot-password flow

## Tech Stack

| Layer     | Technology              |
| --------- | ----------------------- |
| Framework | Next.js 16 (App Router) |
| Language  | TypeScript              |
| Database  | MongoDB (Mongoose ODM)  |
| Auth      | JWT + bcryptjs          |
| Email     | Nodemailer (Mailtrap)   |
| Styling   | Tailwind CSS 4          |
| HTTP      | Axios                   |
| Toasts    | react-hot-toast         |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (dark theme)
│   ├── page.tsx                # Landing page
│   ├── login/page.tsx          # Sign in form
│   ├── signup/page.tsx         # Registration form
│   ├── profile/page.tsx        # User profile (protected)
│   ├── verifyemail/page.tsx    # Email verification handler
│   └── api/users/
│       ├── signup/route.ts     # POST — register user
│       ├── login/route.ts      # POST — authenticate user
│       ├── logout/route.ts     # GET  — clear auth cookie
│       ├── profile/route.ts    # GET  — get current user
│       └── verifyemail/route.ts# POST — verify email token
├── dbConfig/dbConfig.ts        # MongoDB connection
├── helpers/
│   ├── getDataFromToken.ts     # Extract user ID from JWT
│   └── mailer.ts               # Send verification/reset emails
├── models/userModel.ts         # Mongoose user schema
└── middleware.ts               # Route protection middleware
```

## Getting Started

### Prerequisites

- **Node.js** 18+
- **MongoDB** instance (local or Atlas)
- **Mailtrap** account (for email testing)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd next_auth_project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret_key
DOMAIN=http://localhost:3000
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASSWORD=your_mailtrap_password
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Routes

| Method | Endpoint                 | Description                   | Auth |
| ------ | ------------------------ | ----------------------------- | ---- |
| POST   | `/api/users/signup`      | Register a new user           | No   |
| POST   | `/api/users/login`       | Authenticate & set JWT cookie | No   |
| GET    | `/api/users/logout`      | Clear auth cookie             | Yes  |
| GET    | `/api/users/profile`     | Get current user data         | Yes  |
| POST   | `/api/users/verifyemail` | Verify email with token       | No   |

## Route Protection

The middleware at `src/middleware.ts` handles route guarding:

- **Public paths** (`/login`, `/signup`) — redirects to `/profile` if already authenticated
- **Protected paths** (`/`, `/profile`) — redirects to `/login` if no valid token

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Create production build  |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## License

This project is for educational purposes.
