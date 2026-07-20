# Synthetix News — Newsletter Page Setup

A modern, high-conversion newsletter subscription landing page styled with a sleek Cyber-Corporate aesthetic. Featuring grid backdrops, ambient glows, scanlines, scroll-driven fade-ins, and client-side integration with the MailerLite API.

## Pre-deployment Setup (MailerLite Integration)

Before uploading the files to production, you need to connect the form handlers to your MailerLite account:

1. **Sign up free** at [mailerlite.com](https://www.mailerlite.com).
2. Go to **Subscribers** → **Groups** → click **Create Group** and name it `Newsletter Subscribers`.
3. Click on the created group and **copy the Group ID** from the page URL (e.g., in `https://dashboard.mailerlite.com/groups/1234567890`, the Group ID is `1234567890`).
4. Go to **Integrations** → **API** → click **Create Token**, give it a name, and **copy the API Token** generated (keep it secure).
5. Open the local file `js/main.js`.
6. Replace `YOUR_MAILERLITE_API_KEY_HERE` with your copied API Token.
7. Replace `YOUR_MAILERLITE_GROUP_ID_HERE` with your copied Group ID.

---

## Deployment to GitHub Pages

To deploy this landing page to your custom domain `synthetixnews.online` via GitHub Pages:

### Step 1: Upload to GitHub
1. Create a new repository on GitHub (e.g., named `synthetixnews.github.io` or `synthetix-newsletter`).
2. Upload all files maintaining the directory structure:
   ```
   synthetix-newsletter/
   ├── index.html
   ├── css/
   │   └── style.css
   ├── js/
   │   └── main.js
   └── README.md
   ```
3. Commit and push the files to your repository's default branch (usually `main`).

### Step 2: Enable GitHub Pages
1. On GitHub, navigate to your repository's **Settings** tab.
2. Under the **Code and automation** sidebar section, click on **Pages**.
3. Under **Build and deployment** → **Source**, select **Deploy from a branch**.
4. Choose the `main` branch (and `/ (root)` folder) and click **Save**.

### Step 3: Add Custom Domain
1. Scroll down to the **Custom domain** section on the same Pages settings page.
2. Enter your domain: `synthetixnews.online` and click **Save**.
3. It is recommended to check **Enforce HTTPS** once the DNS configuration propagates.

---

## DNS Records Configuration

Configure the following records at your domain registrar (e.g., Namecheap, GoDaddy, Cloudflare) for `synthetixnews.online`:

### 1. A Records (Apex Domain)
Point your root domain (`@` or leave blank) to GitHub's IP addresses by creating four **A** records:
* `185.199.108.153`
* `185.199.109.153`
* `185.199.110.153`
* `185.199.111.153`

### 2. CNAME Record (Subdomain)
Set up a **CNAME** record to direct `www` traffic to your GitHub Pages user domain:
* **Host**: `www`
* **Target**: `YOUR-GITHUB-USERNAME.github.io` (replace with your actual GitHub username)

*Note: Allow up to 24–48 hours for global DNS propagation to complete.*
