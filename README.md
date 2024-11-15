
# Digital Marketplace


An interactive digital marketplace built using modern web technologies to provide users with a seamless browsing and purchasing experience. This project integrates robust state management, rich content editing, secure file uploads, and efficient database operations.



## Features

- User-Friendly Interface: Smooth navigation and interaction powered by Next.js and TypeScript.
- Global State Management: Managed with Zustand for efficient and lightweight state handling.
- Rich Content Editing: Integrated Tiptap for customizable and user-friendly product descriptions.
- File Uploads: Secure image uploads enabled by Uploadthing.
- Database Interaction: Optimized and scalable database queries using Prisma.
- Authentication: Secure user login and session management via Kinde.
- Data Validation: Ensured data integrity and input validation with Zod.


## Stack

- Frontend: Next.js, TypeScript, TailwindCSS, Shadcn UI
- State Management: Zustand
- Rich Text Editor: Tiptap
- File Uploads: Uploadthing
- Database: Prisma with SQL
- Authentication: Kinde
- Validation: Zod
- Deployment: Vercel
- Version Control: GitHub
## Installation

Install my-project with npm

```bash
git clone https://github.com/AkramRamoul/marketplace.git

cd marketplace

npm install

```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`KINDE_CLIENT_ID`

`KINDE_CLIENT_SECRET`

`KINDE_ISSUER_URL`

`KINDE_SITE_URL`

`KINDE_POST_LOGOUT_REDIRECT_URL`

`KINDE_POST_LOGIN_REDIRECT_URL`

`UPLOADTHING_SECRET`

`UPLOADTHING_APP_ID`

`POSTGRES_PRISMA_URL`

`POSTGRES_URL_NON_POOLING`

