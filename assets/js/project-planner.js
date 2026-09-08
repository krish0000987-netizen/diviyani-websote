/* ==========================================================================
   DEVYANI CREATIVE STUDIO — MULTI-STEP PROJECT PLANNER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initProjectPlanner();
});

function initProjectPlanner() {
  const form = document.querySelector('#projectPlannerForm');
  if (!form) return;

  const panes = form.querySelectorAll('.planner-step-pane');
  const progressSteps = document.querySelectorAll('.planner-progress-step');
  const stepIndicators = document.querySelectorAll('.planner-step-indicator');
  const currentStepNum = document.querySelector('#currentStepNum');

  let currentStep = 1;
  const totalSteps = panes.length;

  // Selected state store
  const projectData = {
    name: '',
    business: '',
    phone: '',
    email: '',
    services: [],
    audience: '',
    timeline: 'Within 3-4 Weeks',
    budget: '₹50,000 – ₹1,50,000',
    description: ''
  };

  // Service Pill Toggles
  const serviceCards = form.querySelectorAll('.service-option-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-selected');
      const serviceName = card.getAttribute('data-service');
      if (card.classList.contains('is-selected')) {
        if (!projectData.services.includes(serviceName)) {
          projectData.services.push(serviceName);
        }
      } else {
        projectData.services = projectData.services.filter(s => s !== serviceName);
      }
    });
  });

  const updateStepView = (step) => {
    panes.forEach((pane, idx) => {
      if (idx + 1 === step) {
        pane.classList.add('is-active');
      } else {
        pane.classList.remove('is-active');
      }
    });

    progressSteps.forEach((pStep, idx) => {
      if (idx + 1 <= step) {
        pStep.classList.add('is-active');
      } else {
        pStep.classList.remove('is-active');
      }
    });

    if (currentStepNum) {
      currentStepNum.textContent = `0${step}`;
    }

    if (step === 4) {
      populateReviewSummary();
    }

    window.scrollTo({ top: form.offsetTop - 120, behavior: 'smooth' });
  };

  const validateStep = (step) => {
    if (step === 1) {
      const name = form.querySelector('#clientName').value.trim();
      const phone = form.querySelector('#clientPhone').value.trim();
      const email = form.querySelector('#clientEmail').value.trim();
      if (!name || !phone) {
        alert('Please provide your name and phone number to continue.');
        return false;
      }
      projectData.name = name;
      projectData.business = form.querySelector('#clientBusiness').value.trim() || 'Not specified';
      projectData.phone = phone;
      projectData.email = email || 'Not specified';
      return true;
    }

    if (step === 2) {
      if (projectData.services.length === 0) {
        alert('Please select at least one creative service to proceed.');
        return false;
      }
      return true;
    }

    if (step === 3) {
      projectData.audience = form.querySelector('#clientAudience')?.value.trim() || 'General / Premium';
      projectData.timeline = form.querySelector('#clientTimeline')?.value || 'Flexible';
      projectData.budget = form.querySelector('#clientBudget')?.value || 'Custom';
      projectData.description = form.querySelector('#clientDescription')?.value.trim() || 'To be discussed during consultation';
      return true;
    }

    return true;
  };

  // Next / Back Navigation
  form.querySelectorAll('.btn-next-step').forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        currentStep++;
        updateStepView(currentStep);
      }
    });
  });

  form.querySelectorAll('.btn-prev-step').forEach(btn => {
    btn.addEventListener('click', () => {
      currentStep--;
      updateStepView(currentStep);
    });
  });

  // Populate Review Step
  const populateReviewSummary = () => {
    const summaryWrap = form.querySelector('#plannerSummaryWrap');
    if (!summaryWrap) return;

    summaryWrap.innerHTML = `
      <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(212,175,55,0.2); border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem;">
        <h4 style="font-family: var(--font-serif); color: var(--gold-light); margin-bottom: 1.25rem; font-size: 1.25rem;">Project Brief Summary</h4>
        <div class="form-row" style="font-size: 0.9rem; row-gap: 1rem;">
          <div><strong style="color: var(--gold-primary);">Client Name:</strong> <span style="color: #fff;">${projectData.name}</span></div>
          <div><strong style="color: var(--gold-primary);">Business:</strong> <span style="color: #fff;">${projectData.business}</span></div>
          <div><strong style="color: var(--gold-primary);">Phone:</strong> <span style="color: #fff;">${projectData.phone}</span></div>
          <div><strong style="color: var(--gold-primary);">Email:</strong> <span style="color: #fff;">${projectData.email}</span></div>
          <div style="grid-column: 1 / -1;"><strong style="color: var(--gold-primary);">Selected Services:</strong> <span style="color: var(--gold-light);">${projectData.services.join(', ')}</span></div>
          <div><strong style="color: var(--gold-primary);">Budget Range:</strong> <span style="color: #fff;">${projectData.budget}</span></div>
          <div><strong style="color: var(--gold-primary);">Estimated Timeline:</strong> <span style="color: #fff;">${projectData.timeline}</span></div>
          <div style="grid-column: 1 / -1;"><strong style="color: var(--gold-primary);">Project Objective:</strong> <p style="color: var(--text-secondary); margin-top: 4px; line-height: 1.6;">${projectData.description}</p></div>
        </div>
      </div>
    `;
  };

  // Submit Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const successPane = form.querySelector('#plannerSuccessPane');
    const formContent = form.querySelector('#plannerFormContent');

    if (formContent) formContent.style.display = 'none';
    if (successPane) successPane.style.display = 'block';

    // Build WhatsApp URL
    const waText = encodeURIComponent(
      `*New Project Enquiry — Devyani Creative Studio*\n\n` +
      `*Name:* ${projectData.name}\n` +
      `*Business:* ${projectData.business}\n` +
      `*Phone:* ${projectData.phone}\n` +
      `*Email:* ${projectData.email}\n` +
      `*Services:* ${projectData.services.join(', ')}\n` +
      `*Budget:* ${projectData.budget}\n` +
      `*Timeline:* ${projectData.timeline}\n` +
      `*Objective:* ${projectData.description}\n\n` +
      `Looking forward to discussing creative direction!`
    );

    const waBtn = form.querySelector('#waDirectSubmitBtn');
    if (waBtn) {
      waBtn.href = `https://wa.me/919693125731?text=${waText}`;
    }
  });
}
