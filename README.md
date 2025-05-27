frontend/
├── public/
│ └── index.html
├── src/
│ ├── assets/ # Images, logos, etc.
│ ├── components/ # Reusable UI components (e.g., Button, Input, Modal)
│ ├── features/
│ │ ├── auth/ # Auth-related pages and logic
│ │ │ ├── SignIn.tsx
│ │ │ ├── SignUp.tsx
│ │ │ └── authSlice.ts # Redux slice if using Redux
│ │ └── contacts/ # Contacts feature logic and UI
│ │ ├── ContactList.tsx
│ │ ├── ContactForm.tsx
│ │ ├── ImportExport.tsx
│ │ └── contactsSlice.ts
│ ├── hooks/ # Custom React hooks
│ ├── layouts/ # Layout components (if needed)
│ ├── pages/ # Page-level components for routing
│ │ ├── Home.tsx
│ │ └── NotFound.tsx
│ ├── routes/ # Route definitions and guards
│ │ └── AppRoutes.tsx
│ ├── services/ # API calls and services (e.g., axios instances)
│ │ └── contactService.ts
│ ├── store/ # Redux or Zustand setup
│ │ ├── index.ts
│ │ └── rootReducer.ts
│ ├── types/ # TypeScript interfaces and types
│ ├── utils/ # Helper functions (e.g., CSV parser)
│ ├── App.tsx
│ ├── main.tsx
│ └── tailwind.config.ts
├── .env
├── package.json
├── tsconfig.json
└── postcss.config.js

backend/
├── src/
│ ├── config/ # DB connection, environment config
│ │ ├── db.ts
│ │ └── env.ts
│ ├── controllers/ # Business logic (e.g., userController, contactController)
│ │ ├── authController.ts
│ │ └── contactController.ts
│ ├── middleware/ # Auth middleware, error handling, file upload middleware
│ │ ├── authMiddleware.ts
│ │ ├── errorHandler.ts
│ │ └── uploadMiddleware.ts
│ ├── models/ # Mongoose models
│ │ ├── User.ts
│ │ └── Contact.ts
│ ├── routes/ # All route definitions
│ │ ├── authRoutes.ts
│ │ └── contactRoutes.ts
│ ├── utils/ # Helper functions (e.g., CSV parsing, JWT handling)
│ │ ├── jwt.ts
│ │ └── csvParser.ts
│ ├── uploads/ # Uploaded images will be stored here (or use cloud storage)
│ ├── app.ts # Express app setup
│ └── server.ts # Entry point (listen to port)
├── .env
├── tsconfig.json
├── package.json
└── README.md
