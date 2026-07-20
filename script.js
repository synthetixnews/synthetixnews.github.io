document.addEventListener('DOMContentLoaded', () => {
    // 1. Header scroll effect
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = question.nextElementSibling;
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // Close all other active items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            question.setAttribute('aria-expanded', !isExpanded);

            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // 3. Form Validation & Submission Handler
    const subscribeForm = document.getElementById('subscribeForm');
    const emailInput = document.getElementById('emailInput');
    const formFeedback = document.getElementById('formFeedback');
    const submitBtn = document.getElementById('submitBtn');
    const submitBtnText = submitBtn.querySelector('span');

    subscribeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailVal = emailInput.value.trim();

        // Basic client-side email pattern check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
            showFeedback('Please enter a valid email address.', 'error');
            return;
        }

        // Check if endpoint has been configured
        const formAction = subscribeForm.getAttribute('action');
        if (formAction.includes('YOUR_ENDPOINT_HERE')) {
            // Mock success state for testing/demo purposes
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                showFeedback('🎉 Thank you! You have subscribed to SynthetixNews (Demo Mode).', 'success');
                subscribeForm.reset();
            }, 1000);
            return;
        }

        // Actual endpoint submission (e.g. Formspree)
        setLoading(true);
        try {
            const response = await fetch(formAction, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email: emailVal })
            });

            if (response.ok) {
                showFeedback('🎉 Welcome aboard! Please check your inbox to confirm your subscription.', 'success');
                subscribeForm.reset();
            } else {
                const data = await response.json();
                const errorMsg = data.error || 'Something went wrong. Please try again later.';
                showFeedback(errorMsg, 'error');
            }
        } catch (error) {
            showFeedback('Network error. Please verify your connection and try again.', 'error');
        } finally {
            setLoading(false);
        }
    });

    // Helper to set loading UI state
    function setLoading(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            submitBtnText.textContent = 'Submitting...';
            submitBtn.style.opacity = '0.7';
        } else {
            submitBtn.disabled = false;
            submitBtnText.textContent = 'Subscribe Now';
            submitBtn.style.opacity = '1';
        }
    }

    // Helper to display visual feedback messages
    function showFeedback(message, type) {
        formFeedback.textContent = message;
        formFeedback.className = 'form-feedback'; // reset categories
        formFeedback.classList.add(type);
        
        // Scroll slightly if feedback is not visible
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Optional auto-hide success message after 7 seconds
        if (type === 'success') {
            setTimeout(() => {
                formFeedback.classList.add('hidden');
            }, 7000);
        }
    }
});
