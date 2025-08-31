🚀 CodeCircle – Developer Social Feed App

CodeCircle is a full-stack social platform built with Next.js + TypeScript, powered by Prisma & MongoDB, and enhanced with real-time features via Socket.IO.
It’s a space for developers to connect, share posts, and interact seamlessly.

✨ Features
* 🔐 Authentication & Authorization with cookies + JWT
* 📝 Create & Manage Posts (CRUD with Prisma + MongoDB)
* 💬 Real-time Chat powered by Socket.IO
* 👥 Follow / Unfollow System with live updates
* 📊 Clean API & Service Layer design for scalability
* 🛠️ TypeScript-first approach for safety & clarity
* ⚡ Next.js App Router with server & client components

🛠️ Tech Stack
* Frontend & Backend → Next.js 14 + TypeScript
* Database → MongoDB with Prisma ORM
* Real-time Communication → Socket.IO
* Authentication → JWT + HTTP-only cookies
* Deployment → Render


⚡ Getting Started
1️⃣ Clone the repo
git clone https://github.com/Ayush-3012/codecircle.git
cd codecircle

2️⃣ Install dependencies
npm install

3️⃣ Setup environment variables

Create a .env file in the root directory:

DATABASE_URL="your-mongodb-url"
JWT_SECRET="your-secret-key"
NEXT_PUBLIC_SOCKET_URL="http://localhost:5000"

4️⃣ Run database migrations
npx prisma migrate dev

5️⃣ Start the dev server
npm run dev


Server will be available at:
👉 http://localhost:3000

🧠 Learnings from this Project

Gained hands-on experience in Next.js + TypeScript full-stack development

Learned to integrate Prisma with MongoDB effectively

Explored real-time communication using Socket.IO

Understood token verification, cookies & authentication flows deeply

Improved understanding of structuring scalable full-stack apps

📜 License

This project is licensed under the MIT License.
