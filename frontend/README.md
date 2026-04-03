# 📋 Pro-Tasker

A modern, collaborative project management tool that is intuitive for single users but powerful enough for small teams

## 💻 Technologies Used

* **MongoDB:** Atlas combines the flexible document model with a suite of data services to give you a versatile cloud database that simplifies everything you build.
* **Express:** Fast, unopinionated, minimalist web framework for Node.js
* **React:** Frontend library for building the user interface.
* **Node.js:** A free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts
* **Tailwind CSS:** Utility-first framework for styling.
* **And more...:** More dependencies can be found in the package.json files.

## ✨ Features

* **Create Tasks and Projects:** User can create new tasks and projects.
* **View Tasks and Projects:** Displays a list of all user-owned projects or project-related tasks.
* **Update Status:** Change the current phase of any task (e.g., from pending to completed).
* **Edit Tasks and Projects:** Edit any task or project property.
* **Delete Items:** Permanently remove projects from the dashboard and/or tasks from the Project Details page.

## ✨ API Endpoints

**User Endpoints**

| Method | Endpoint| Description |
| :--- | :--- | :--- |
| POST | /api/users/register | Register a user |
| POST | /api/users/login | Log-in |
| GET | /api/users/| Verify user |

**Project Endpoints**

| Method | Endpoint| Description |
| :--- | :--- | :--- |
| GET | /api/projects/ | Retrieve user's projects |
| GET | /api/projects/:projectId | Retrieves user's project by Project ID |
| POST | /api/projects/ | Create a project |
| PUT | /api/projects/:projectId | Update a project with its ID |
| DELETE | /api/projects/:projectId | Delete a project with its ID |

**Task Endpoints**

| Method | Endpoint| Description |
| :--- | :--- | :--- |
| POST | /api/:projectId/tasks | Create a new task associated with a project |
| GET | /api/projects/:projectId/tasks | Retrieves tasks for given Project ID |
| PUT | /api/tasks/:taskId | Update a task with its ID |
| DELETE | /api/tasks/:taskId | Delete a task with its ID |


## ⚙️ Installation

To run this project locally, execute the following commands in your terminal:

```bash
# Clone the repository
git clone https://github.com/elysewelsh/project4.git

# Navigate into the frontend directory
cd pro-tasker/frontend

# Install dependencies (React, Tailwind, dotenv, etc.)
npm install

# Start the local development server
npm run dev

# Navigate into the backend directory
cd pro-tasker/backend

# Install dependencies (React, Tailwind, dotenv, etc.)
npm install

# Start the local development server
npm run dev
```