/* ==========================================================================
   DEVYANI CREATIVE STUDIO — CONTACT & INQUIRY FORM
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.querySelector('#studioContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#contactName')?.value.trim();
    const phone = form.querySelector('#contactPhone')?.value.trim();
    const email = form.querySelector('#contactEmail')?.value.trim();
    const service = form.querySelector('#contactService')?.value;
    const budget = form.querySelector('#contactBudget')?.value;
    const message = form.querySelector('#contactMessage')?.value.trim();

    if (!name || !phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const feedback = document.querySelector('#contactFormFeedback');
    if (feedback) {
      feedback.innerHTML = `
        <div style="background: rgba(212,175,55,0.12); border: 1px solid var(--gold-primary); border-radius: 12px; padding: 2rem; text-align: center; margin-top: 1.5rem;">
          <h4 style="font-family: var(--font-serif); color: var(--gold-light); font-size: 1.35rem; margin-bottom: 0.5rem;">Enquiry Received</h4>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem;">Thank you, ${name}. Our creative director will review your project requirements and connect within 4 business hours.</p>
          <a href="https://wa.me/919693125731?text=${encodeURIComponent(`Hi Devyani Creative Studio, I just submitted an enquiry for ${service || 'Creative Services'}. My name is ${name}.`)}" target="_blank" class="btn btn-whatsapp" style="display: inline-flex;">
            Connect Instantly on WhatsApp
          </a>
        </div>
      `;
      form.reset();
    }
  });
}
