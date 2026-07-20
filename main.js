/**
 * Synthetix News - Newsletter Integration & UI Logic
 */

// REMOVE THIS LINE BEFORE GOING LIVE
// Development only — clears test localStorage entries
localStorage.removeItem('synthetix_submitted_emails');

// MailerLite API Subscriber Handler
async function subscribeEmail(email) {
  const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Replace with your MailerLite API key from:
      // mailerlite.com → Integrations → API → API Tokens
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMzRlZDA3MzIxMGJjMTFlMjYzMjNmN2U0MzZhNTFmMDY4YjRjODY2MDFmZDYyMWRhNjVhNDBhMmE3YThjOTZiYWMyZjU2YmU0Y2QzZDQzOGQiLCJpYXQiOjE3ODQ1MTU5NzAuMzk2MzY4LCJuYmYiOjE3ODQ1MTU5NzAuMzk2MzcsImV4cCI6NDk0MDE4OTU3MC4zODk0ODEsInN1YiI6IjI1Mzc5MTgiLCJzY29wZXMiOltdfQ.GNqvwvopZ70RlprsqLg69gKB8jthTch9bxqszROiTZra1PxTF5f3rSWbfoCN8wfALf0ZXwDzX7YJz56U53FzfkYa3BYbL8z5X7pZxBUODVRZoq0u2srmVZvKeMozdBZ8rLYNIX7OAe8x0qMnxMCF23GCbFjPmAURDnDeom0Xye-PaKcHBwiP1wkFZk2P0RMOlMY3aEJmp_475CtwvA_jk2oRubN_hgh5XuY6Rd4AIWi3BGmJpzv7nI8OAi4mh-GiRyVI0MoZ1bqbMOnCT-IYqqZw87IpNt19aaVZ-N5wCpfBaF-2LiQIISci1aXS6PIJfyWr75nyj69FslTruJvOKoZy6AoGgR7UIunwdCp2gwlgFjp8SOuJdmazXyWEXvIsWjsILYvyBdRBrNO951mB-y8hVbUU7bZcng9RxN3WNw6USYinsDdlrgE0mDWO1_1b1Gl6bZVb2OMkbVO_nkFAHK3cpcb8Atqtn3qlSW2ElsHMiVHAFy53dmJTCdpoOyUQ9HD14tNGaU90L2us4fJeUbcq50wFMEdmp9Q7Ssl8dHW2dHPDYfAANPjKcdl6u1FehuSfD9_WQD6y4zyQ_ADRFWJkaQ77iOeMuQAmAVWvb2Z-jd2OyYW53EB37lXdch8-5g-1RpdkmcCwcIT4CNzPhc7LiKVVImbZ4_QSMrD1Gg8',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      // Replace with your Group ID from:
      // mailerlite.com → Subscribers → Groups
      groups: ['193478884006561469']
    })
  });
  return response;
}

// Simple email regex validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Form Submission Manager
async function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const input = form.querySelector('input[type="email"]');
  const button = form.querySelector('button[type="submit"]');
  const statusDiv = document.getElementById(form.id === 'hero-form' ? 'hero-status' : 'footer-status');
  
  const emailVal = input.value.trim();
  const defaultBtnText = "Get the Signal";
  
  // Clear any existing states
  statusDiv.textContent = "";
  statusDiv.className = "form-status";
  statusDiv.style.color = "";
  statusDiv.style.display = "";
  
  // 1. Validate email format first
  if (!isValidEmail(emailVal)) {
    statusDiv.textContent = "Something went wrong — try again.";
    statusDiv.classList.add('error');
    statusDiv.style.color = '#FF6B6B';
    button.textContent = defaultBtnText;
    button.disabled = false;
    input.classList.add('invalid-input');
    return;
  }
  
  input.classList.remove('invalid-input');

  // 1.5 Client-side duplicate check (localStorage)
  let submittedEmails = [];
  try {
    submittedEmails = JSON.parse(localStorage.getItem('synthetix_submitted_emails') || '[]');
  } catch (e) {}
  
  if (Array.isArray(submittedEmails) && submittedEmails.includes(emailVal)) {
    statusDiv.textContent = "This email is already subscribed — you're good! ✓";
    statusDiv.style.color = '#2EC5FF';
    statusDiv.style.display = 'block';
    button.textContent = defaultBtnText;
    button.disabled = false;
    input.disabled = false;
    return;
  }
  
  // 2. Loading state: button text → "Sending..." + disabled
  button.textContent = "Sending...";
  button.disabled = true;
  input.disabled = true;
  
  try {
    const response = await subscribeEmail(emailVal);
    
    if (response.status === 200 || response.status === 201) {
      // Save successfully subscribed email to localStorage
      try {
        let currentEmails = JSON.parse(localStorage.getItem('synthetix_submitted_emails') || '[]');
        if (!currentEmails.includes(emailVal)) {
          currentEmails.push(emailVal);
          localStorage.setItem('synthetix_submitted_emails', JSON.stringify(currentEmails));
        }
      } catch (e) {}

      // 3. Success: inline message in neon green, button → "You're in ✓", form resets after 3 seconds
      statusDiv.textContent = "Check your inbox — first drop incoming. ✓";
      statusDiv.classList.add('success');
      statusDiv.style.color = '#39FF8F';
      button.textContent = "You're in ✓";
      
      setTimeout(() => {
        form.reset();
        button.textContent = defaultBtnText;
        button.disabled = false;
        input.disabled = false;
        statusDiv.textContent = "";
        statusDiv.className = "form-status";
        statusDiv.style.color = "";
        statusDiv.style.display = "";
      }, 3000);
      
    } else if (response.status === 422) {
      // 422: Parse response JSON and check for duplicate signups
      let isDuplicate = false;
      try {
        const responseData = await response.json();
        const stringified = JSON.stringify(responseData).toLowerCase();
        if (stringified.includes("already") || stringified.includes("taken") || stringified.includes("exists")) {
          isDuplicate = true;
        }
      } catch (jsonErr) {
        // Response body wasn't valid JSON
      }
      
      if (isDuplicate) {
        // Save to localStorage as well so client-side detection catches it next time
        try {
          let currentEmails = JSON.parse(localStorage.getItem('synthetix_submitted_emails') || '[]');
          if (!currentEmails.includes(emailVal)) {
            currentEmails.push(emailVal);
            localStorage.setItem('synthetix_submitted_emails', JSON.stringify(currentEmails));
          }
        } catch (e) {}

        // Show message in electric blue, reset button, do NOT reset form
        statusDiv.textContent = "This email is already subscribed — you're good! ✓";
        statusDiv.style.color = '#2EC5FF';
        statusDiv.style.display = 'block';
        button.textContent = defaultBtnText;
        button.disabled = false;
        input.disabled = false;
      } else {
        // Other 422 validation errors
        statusDiv.textContent = "Something went wrong — try again.";
        statusDiv.classList.add('error');
        statusDiv.style.color = '#FF6B6B';
        button.textContent = defaultBtnText;
        button.disabled = false;
        input.disabled = false;
      }
      
    } else {
      // Other API response statuses
      statusDiv.textContent = "Something went wrong — try again.";
      statusDiv.classList.add('error');
      statusDiv.style.color = '#FF6B6B';
      button.textContent = defaultBtnText;
      button.disabled = false;
      input.disabled = false;
    }
  } catch (error) {
    // Network/Connection failure
    statusDiv.textContent = "Something went wrong — try again.";
    statusDiv.classList.add('error');
    statusDiv.style.color = '#FF6B6B';
    button.textContent = defaultBtnText;
    button.disabled = false;
    input.disabled = false;
  }
}

// Initialize Page Features
document.addEventListener("DOMContentLoaded", () => {
  // Bind form submissions
  const heroForm = document.getElementById("hero-form");
  const footerForm = document.getElementById("footer-form");
  
  if (heroForm) heroForm.addEventListener("submit", handleFormSubmit);
  if (footerForm) footerForm.addEventListener("submit", handleFormSubmit);
  
  // Auto-focus hero email input on desktop page load (min-width: 769px)
  // Do NOT auto-focus on mobile (max-width: 768px) to avoid triggering virtual keyboard
  if (window.innerWidth >= 769) {
    const heroEmailInput = document.getElementById("hero-email");
    if (heroEmailInput) {
      heroEmailInput.focus();
    }
  }
  
  // IntersectionObserver for scroll animations (fade-in on scroll for each section)
  const fadeSections = document.querySelectorAll(".fade-in-section");
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  };
  
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  fadeSections.forEach(section => {
    fadeObserver.observe(section);
  });
});
