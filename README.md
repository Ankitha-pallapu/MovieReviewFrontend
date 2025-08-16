# Movie Review System — Frontend
A clean, responsive frontend for a **Movie Review System** built with React + Vite.  
It allows users to browse movies, view details, write reviews with ratings, and interact with a modern UI.  
This repository contains only the **frontend** — connect it with your backend API for full functionality.


## Tech stack

* **React (Vite)** — frontend framework
* **JavaScript (ES6+)**
* **HTML5 & CSS3**
* **Material-UI (MUI)** — UI components
* **React Router** — client-side routing
* **Axios / Fetch** — API requests
* Optional: **Context API / Redux** — state management


## Features

* Browse movies (list/grid view)
* Movie detail page with poster, description, cast & reviews
* User authentication (login/register forms integrated with backend)
* Authenticated users can add/edit/delete reviews & ratings
* Search, filter, and pagination support
* Responsive design (mobile-friendly)
* Loading & error states for smooth UX



## Getting started

Follow these steps to run the project locally.

### Prerequisites

* Node.js (v16+ recommended) & npm (or yarn)
* Git
* A backend server (Spring Boot / Node.js API)

---

### Clone & install
# Clone repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# Install dependencies
npm install
# or
yarn
Environment variables
Create a .env file in the project root:

env
Copy
Edit
VITE_API_URL=http://localhost:8080/api
(Change URL to your backend API. For React CRA, use REACT_APP_ prefix instead of VITE_.)

Run locally
bash
Copy
Edit
npm run dev
App runs at: http://localhost:5173/ (default Vite port)

Available scripts
npm run dev — start development server

npm run build — build production bundle

npm run preview — preview production build

npm run lint — run ESLint (if configured)

npm run test — run tests (if configured)

Folder structure
arduino
Copy
Edit
/movie-review-frontend
├─ public/                # static assets
├─ src/
│  ├─ assets/             # images, icons
│  ├─ components/         # reusable components
│  ├─ pages/              # app pages (Home, Login, etc.)
│  ├─ services/           # axios API services
│  ├─ context/            # auth & global context
│  ├─ App.jsx             # root component
│  └─ main.jsx            # entry point
├─ .env
├─ vite.config.js
├─ package.json
└─ README.md

# dependencies
/node_modules/

# production build
/dist/
/build/

# environment variables
.env
.env.*
!.env.example

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# misc
.DS_Store
.vscode/
Git workflow
bash
Copy
Edit
# initialize git
git init
git add .
git commit -m "chore: initial commit — movie review frontend"

# add remote (replace with your repo URL)
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
Commit & branch conventions
Use prefixes: feat:, fix:, docs:, chore:, refactor:

Branch naming:

feature/<short-desc>

bugfix/<short-desc>

hotfix/<short-desc>

Contributing
Fork the repository

Create a branch: feature/your-feature

Commit your changes

Push and open a Pull Request

Contact
👩‍💻 Ankitha Pallapu
📧 pallapuankitha79@gmail.com
🌐 GitHub: @Ankitha-Pallapu
