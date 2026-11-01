# 🚀 Azure Portfolio Website

A modern, responsive personal portfolio website deployed on **Microsoft Azure** using **Azure Static Web Apps**, with a **serverless Azure Functions backend** and automated **GitHub Actions CI/CD**.

This project demonstrates practical cloud deployment, serverless backend development, API integration, GitHub-based continuous deployment, and Azure monitoring.

---

## 🌐 Live Demo

**Live Website:**
https://orange-glacier-00b48c700.7.azurestaticapps.net

---

## 📌 Project Overview

This project is a personal portfolio website created to showcase my:

* Profile
* Education
* Technical Skills
* Projects
* Career Journey
* Resume
* Contact Information

The frontend is hosted on **Azure Static Web Apps**, while the contact form communicates with a **serverless Azure Function** through an HTTP API.

The application is connected to GitHub using **GitHub Actions**, allowing changes pushed to the `main` branch to be automatically deployed to Azure.

---

## 🏗️ Cloud Architecture

```text
                    ┌─────────────────────┐
                    │   GitHub Repository  │
                    └──────────┬──────────┘
                               │
                         Git Push / Commit
                               │
                               ▼
                    ┌─────────────────────┐
                    │    GitHub Actions    │
                    │     CI/CD Pipeline   │
                    └──────────┬──────────┘
                               │
                         Automated Deploy
                               │
                               ▼
                 ┌───────────────────────────┐
                 │   Azure Static Web Apps   │
                 │                           │
                 │  ┌─────────────────────┐  │
                 │  │ HTML / CSS / JS     │  │
                 │  │ Portfolio Frontend  │  │
                 │  └─────────────────────┘  │
                 │                           │
                 │  ┌─────────────────────┐  │
                 │  │ Azure Functions     │  │
                 │  │ Serverless Backend  │  │
                 │  └──────────┬──────────┘  │
                 └─────────────┼─────────────┘
                               │
                               ▼
                         /api/contact
                               │
                               ▼
                         JSON Response
```

---

## ☁️ Azure Services

### Azure Static Web Apps

The portfolio frontend is hosted using **Azure Static Web Apps**.

The application uses the **Free** hosting plan to minimize cloud costs.

Azure Static Web Apps provides:

* HTTPS
* Static website hosting
* GitHub integration
* Automated deployment
* Global content delivery
* Serverless API integration

### Azure Functions

The project includes a serverless HTTP-triggered **Azure Function** for handling contact form submissions.

API endpoint:

```text
POST /api/contact
```

The function receives:

* Name
* Email
* Subject
* Message

It processes the request and returns a JSON response to the frontend.

### GitHub Actions

GitHub Actions provides automated CI/CD.

Whenever changes are pushed to the `main` branch:

```text
Code Change
     ↓
Git Commit
     ↓
Git Push
     ↓
GitHub Actions
     ↓
Build
     ↓
Deploy to Azure
```

---

## ✨ Features

### Portfolio

* Responsive personal portfolio
* Modern dark-themed interface
* About section
* Education section
* Technical skills
* Projects showcase
* Career/Journey section
* Resume section
* Contact information

### Contact System

* Contact form
* Client-side validation
* Name validation
* Email validation
* Subject validation
* Message validation
* HTTP POST request to Azure Function
* Serverless backend processing
* Success and error notifications

### Cloud & DevOps

* Azure Static Web Apps
* Azure Functions
* GitHub integration
* GitHub Actions CI/CD
* HTTPS deployment
* Azure monitoring metrics

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Azure Functions
* Node.js
* HTTP API
* JSON

### Cloud

* Microsoft Azure
* Azure Static Web Apps
* Azure Functions

### DevOps

* Git
* GitHub
* GitHub Actions
* CI/CD

---

## 📂 Project Structure

```text
Azure-portfolio/
│
├── .github/
│   └── workflows/
│       └── azure-static-web-apps-orange-glacier-00b48c700.yml
│
├── api/
│   ├── src/
│   │   ├── functions/
│   │   │   └── contact.js
│   │   └── index.js
│   │
│   ├── .funcignore
│   ├── .gitignore
│   ├── host.json
│   └── package.json
│
├── index.html
├── script.js
├── style.css
├── .gitignore
└── README.md
```

---

## 📡 Contact API

The contact form sends submitted information to the Azure Function using:

```text
POST /api/contact
```

### Example Request

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "subject": "Azure Backend Test",
  "message": "Testing my Azure serverless contact API."
}
```

### Example Response

```json
{
  "message": "Thank you, Test User! Your message has been received."
}
```

The frontend displays the response to the user through a success notification.

---

## 🔄 CI/CD Pipeline

The project uses **GitHub Actions** to automatically deploy changes to Azure.

### Deployment Workflow

```text
Developer
    │
    ▼
Edit Code
    │
    ▼
Git Commit
    │
    ▼
Git Push
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ├── Build
    │
    ├── Validate
    │
    └── Deploy
          │
          ▼
Azure Static Web Apps
```

### Git Commands

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

Every push to the `main` branch triggers the Azure Static Web Apps CI/CD workflow.

---

## 📊 Backend Verification

The Azure Portal was used to verify that the serverless backend was successfully invoked.

Azure Static Web Apps Metrics showed:

```text
Metric: FunctionHits
Aggregation: Sum
FunctionHits: 1
```

This confirmed that the `/api/contact` Azure Function was successfully called when the contact form was submitted.

---

## 🧪 Testing

The deployed website was tested through the live Azure URL.

### Contact Form Test

The following test data was submitted:

```text
Name: Test User
Email: test@example.com
Subject: Azure Backend Test
Message: Testing my Azure serverless contact API.
```

The application successfully returned:

```text
Thank you, Test User! Your message has been received.
```

The Azure Portal `FunctionHits` metric also confirmed that the backend function was invoked successfully.

---

## 🔐 Security

The project follows basic cloud security practices:

* HTTPS is provided by Azure Static Web Apps.
* Azure deployment credentials are not stored in source code.
* No passwords or secret keys are committed to GitHub.
* Backend functionality is separated into an Azure Function.
* Sensitive Azure configuration is handled by the deployment environment.

---

## 💰 Cost Optimization

This project was designed specifically for a **student Azure subscription** with cost optimization in mind.

The primary hosting service uses the **Azure Static Web Apps Free plan**.

The architecture avoids unnecessary infrastructure such as:

* Virtual Machines
* Dedicated backend servers
* Premium hosting plans
* Managed databases
* Load balancers

The serverless architecture allows the backend to run without maintaining a dedicated server.

The project was developed with the goal of keeping Azure usage at minimal or zero cost within the available student subscription benefits.

---

## 📈 Monitoring

Azure Portal Metrics were used to verify application activity.

The `FunctionHits` metric provides visibility into calls made to the serverless API.

Example monitoring flow:

```text
Azure Portal
     ↓
Static Web App
     ↓
Monitoring
     ↓
Metrics
     ↓
FunctionHits
```

This provides a simple way to verify that the backend API is being used.

---

## 🎓 Learning Outcomes

This project provided practical experience with:

* Creating an Azure for Students account
* Deploying a web application to Microsoft Azure
* Using Azure Static Web Apps
* Creating Azure Functions
* Building serverless APIs
* Connecting frontend applications to backend APIs
* Using Git and GitHub
* Implementing GitHub Actions
* Building a CI/CD pipeline
* Monitoring Azure application activity
* Managing cloud resources with cost awareness

---

## 📸 Project Evidence

The following screenshots can be included in project documentation or an academic report:

1. Azure for Students subscription
2. Azure Static Web App overview
3. Live portfolio website
4. GitHub repository
5. GitHub Actions successful deployment
6. Working contact form
7. Azure `FunctionHits` metric

These screenshots demonstrate the complete deployment process and backend integration.

---

## 🎯 Academic Activity

This project was developed as part of:

### Activity 1: Azure Portfolio Launchpad

**Creating an Azure Account and Deploying a Personal Portfolio with Frontend and Backend**

The activity focuses on deploying a personal portfolio using Microsoft Azure and integrating suitable Azure services for frontend and backend functionality.

---

## 👨‍💻 Author

### Prajwal M M

**Cloud & Software Engineer | Full-Stack Developer**

### Technical Interests

* Cloud Computing
* Microsoft Azure
* Amazon Web Services
* Serverless Architecture
* DevOps
* Backend Development
* Full-Stack Development
* Infrastructure as Code
* Cloud-Native Applications

---

## 📄 License

This project is created primarily for educational and portfolio purposes.
