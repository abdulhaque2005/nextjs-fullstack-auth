# DashFlow — Modern Next.js Full-Stack Authentication

A production-ready full-stack authentication system built with **Next.js 16 (App Router)**, **TypeScript**, **MongoDB (Mongoose)**, **JWT via HTTP-only Cookies**, and **Tailwind CSS**.

---

## Features

- **Secure Cookie-Based Authentication**: HTTP-only, secure, same-site cookies prevent XSS and CSRF token tampering.
- **Edge Route Protection (`proxy.ts`)**: Built using Next.js 16's modern `proxy` convention to protect private routes (`/dashboard`) and redirect authenticated sessions away from auth pages (`/login`, `/signup`).
- **Cryptographic Token Verification**: Fast, edge-compatible JWT signing and verification powered by `jose`.
- **Password Security**: Passwords hashed with `bcryptjs` (salt rounds: 10) before storing.
- **Strict Form Validation**: Type-safe validation on both client and server using `zod` and `react-hook-form`.
- **Interactive Dashboard**: Protected dashboard displaying real authenticated user sessions and statistics.
- **Modern UI**: Styled with Tailwind CSS, Lucide icons, and Sonner toast notifications.

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT via [jose](https://github.com/panva/jose) & HTTP-only Cookies
- **Password Hashing**: [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Validation**: [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

---

## Architecture Flow

```
[User Browser]
       │
       ├──► 1. Sign Up / Sign In (/api/signup, /api/login)
       │       └── Validate (Zod) -> Hash/Compare (Bcrypt) -> MongoDB
       │       └── Sign JWT -> Set HTTP-only Cookie ("auth_token")
       │
       ├──► 2. Navigate to /dashboard
       │       └── Next.js Proxy (src/proxy.ts) verifies JWT cookie
       │       └── If valid: Render dashboard with session data
       │       └── If invalid: Redirect to /login
       │
       └──► 3. Log Out (/api/logout)
               └── Delete "auth_token" Cookie -> Redirect to /login
```

---

## Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── login/      # Login API route (authenticates & issues cookie)
│   │   │   ├── logout/     # Logout API route (clears cookie)
│   │   │   └── signup/     # Signup API route (hashes password & saves user)
│   │   ├── dashboard/      # Protected dashboard page & layout
│   │   ├── login/          # Login page with client-side validation
│   │   ├── signup/         # Registration page
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing / Home page
│   ├── components/         # Reusable UI components (Header, Sidebar)
│   ├── lib/
│   │   ├── db.ts           # Cached MongoDB connection handler
│   │   ├── jwt.ts          # Edge-safe JWT sign & verify functions
│   │   ├── mongodb.ts      # Database connection export
│   │   └── session.ts      # Server-side cookie session management
│   ├── models/             # Mongoose schemas & models (User)
│   ├── schema/             # Zod validation schemas
│   └── proxy.ts            # Next.js 16 Proxy for auth route protection
├── .env.example            # Template for environment variables
├── package.json
└── README.md
```

---

## Getting Started

### 1. Prerequisites
- **Node.js** v18.18+ or v20+
- **MongoDB** instance running locally (`mongodb://127.0.0.1:27017`) or on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### 2. Clone the Repository
```bash
git clone https://github.com/abdulhaque2005/nextjs-fullstack-auth.git
cd nextjs-fullstack-auth
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your variables in `.env.local`:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/userDetails
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `POST` | `/api/signup` | Registers a new user and hashes password | No |
| `POST` | `/api/login` | Validates credentials & sets HTTP-only cookie | No |
| `POST` | `/api/logout` | Clears authentication cookie | Yes |

---

## Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Compiles the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Checks for linting and code style issues.

---

## License

This project is open source and available under the [MIT License](LICENSE).
