# Basic Portfolio Website (Cloud Run Ready)

A clean, responsive portfolio website built with **Node.js + Express** serving static HTML/CSS/JS.

## Project Structure

```text
basic-portfolio-cloudrun/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── .dockerignore
├── .gitignore
├── build.yaml
├── Dockerfile
├── package.json
├── README.md
└── server.js
```

## Features

- Responsive and modern portfolio layout
- Sections included:
  - Home (intro + short bio)
  - About
  - Projects (3 sample project cards)
  - Contact (email + social links)
- Express server for local and cloud hosting
- Dockerized for container deployment
- Cloud Build pipeline for build + deploy to Google Cloud Run

## Run Locally

### 1) Install dependencies

```bash
npm install
```

### 2) Start the app

```bash
npm start
```

Open: [http://localhost:8080](http://localhost:8080)

## Run with Docker

### 1) Build image

```bash
docker build -t basic-portfolio-cloudrun .
```

### 2) Run container

```bash
docker run --rm -p 8080:8080 basic-portfolio-cloudrun
```

Open: [http://localhost:8080](http://localhost:8080)

## Deploy to Google Cloud Run with Cloud Build

### 1) Prerequisites

- Google Cloud project with billing enabled
- `gcloud` CLI installed and authenticated
- APIs enabled:

```bash
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
```

### 2) Set active project

```bash
gcloud config set project YOUR_PROJECT_ID
```

### 3) Submit Cloud Build

```bash
gcloud builds submit --config build.yaml
```

This pipeline will:
1. Create Artifact Registry repository (if not already present)
2. Build Docker image
3. Push image to Artifact Registry
4. Deploy service to Cloud Run on port `8080`

### Optional substitutions

You can override defaults at runtime:

```bash
gcloud builds submit \
  --config build.yaml \
  --substitutions=_SERVICE_NAME=portfolio-site,_REGION=asia-south1,_AR_REPO=cloud-run-images,_TAG=latest,_CPU=0.08,_MEMORY=128Mi,_MIN_INSTANCES=0,_MAX_INSTANCES=1,_CONCURRENCY=1,_TIMEOUT_SECONDS=30,_EXECUTION_ENVIRONMENT=gen1
```

## Notes

- Update name, bio, project links, and social links in `public/index.html`.
- Cloud Run service is deployed with `--allow-unauthenticated` for public access.

## Optional: Create a New Git Repository and Push

```bash
# from inside basic-portfolio-cloudrun/
git init
git add .
git commit -m "Initial portfolio website setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_NEW_REPO.git
git push -u origin main
```
