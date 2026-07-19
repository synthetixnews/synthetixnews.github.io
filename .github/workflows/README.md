# SynthetixNews - Landing Page

SynthetixNews is a premium, high-converting, modern static landing page designed for elite newsletters focusing on technology, artificial intelligence, and synthetic biology.

## Features
- **Modern Aesthetic**: Glassmorphism elements, deep dark-mode themes, and subtle accent glows.
- **Micro-Animations**: Hover states, smooth accordion drawers, and fade-in loading animations.
- **Responsive Design**: Adapts beautifully to mobile, tablet, and desktop screens.
- **Client-side Verification**: Form validation and dynamic feedback for email subscriptions.
- **Static Hosting Ready**: Designed specifically to be hosted on free static web servers like GitHub Pages.

---

## 📩 Setting Up Email Subscriptions (Formspree)

Since this site is entirely static, it uses a form endpoint service (like **Formspree**) to collect subscriptions.

1. Go to [Formspree](https://formspree.io/) and create a free account.
2. Create a new form (e.g., call it "SynthetixNews Subscriptions").
3. Copy your unique target endpoint URL. It will look like:
   `https://formspree.io/f/xbjnyqrz`
4. Open `index.html` and search for the `<form>` element:
   ```html
   <form id="subscribeForm" class="subscribe-form fade-in" action="https://formspree.io/f/YOUR_ENDPOINT_HERE" method="POST">
   ```
5. Replace `https://formspree.io/f/YOUR_ENDPOINT_HERE` with your actual Formspree endpoint URL.
6. Save the file. When users fill out the form, their emails will be delivered directly to your Formspree dashboard.

---

## 🚀 How to Publish to GitHub Pages

Follow this step-by-step guide to make your newsletter website live on the web for free.

### Step 1: Create a GitHub Repository
1. Log in to your account at [GitHub](https://github.com).
2. In the top-right corner, click the **`+`** icon and select **New repository**.
3. Name your repository (e.g., `synthetix-news`).
4. Keep the repository **Public** (required for the free tier of GitHub Pages).
5. Do *not* initialize the repository with a README, `.gitignore`, or License (since you already have your files ready).
6. Click **Create repository**.

### Step 2: Upload Your Files
You can upload the files either directly in the browser or using the command line:

#### Option A: Uploading via the Web Browser (easiest)
1. On your empty repository page, click the link that says **"uploading an existing file"**.
2. Drag and drop the following files into the box:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
3. Wait for the files to upload.
4. Scroll down, add a commit message (e.g., `Initial commit`), and click **Commit changes**.

#### Option B: Uploading via Command Line (Git)
Open your terminal in the folder containing the files and run:
```bash
# Initialize git repository (if not already done)
git init

# Add all files to staging
git add .

# Commit files
git commit -m "Initial commit"

# Rename branch to main (recommended)
git branch -M main

# Link to your remote GitHub repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/synthetix-news.git

# Push changes
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click on the **Settings** tab (gear icon at the top menu).
3. In the left-side navigation menu, scroll down to the "Code and automation" section and click on **Pages**.
4. Under **Build and deployment**:
   - Source: Select **Deploy from a branch**.
   - Branch: Click the dropdown (currently *None*) and select **main** (or **master**).
   - Folder: Leave as `/ (root)`.
5. Click **Save**.

### Step 4: Access Your Live Website
- Wait 1 to 2 minutes for GitHub to build and deploy your site.
- Refresh the **Pages** settings screen. You will see a notification box at the top stating:
  > **Your site is live at:** `https://your-username.github.io/synthetix-news/`
- Click the link to view your live, production-ready website!
