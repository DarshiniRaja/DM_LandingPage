/**
 * ScalePulse Digital Marketing Agency - Core Interactive Engine
 * Handles: Pop-up Modal, Video Showcase, Mobile Navigation,
 * ROI Calculator, A/B Testing Switcher, Problem Accordions, Confetti.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initUniversalModals();
  initRoiCalculator();
  initProblemAccordions();
  initAbComparison();
  initScrollAnimations();
  initThankYouPage();
});

/* ==========================================================================
   1. Navigation & Mobile Drawer
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (toggle && drawer && overlay) {
    const toggleMenu = () => {
      toggle.classList.toggle('active');
      drawer.classList.toggle('open');
      overlay.classList.toggle('active');
      document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
    };

    toggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        drawer.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ==========================================================================
   2. Universal "GET FREE ANALYSIS" Pop-up Modal & Video Modal
   ========================================================================== */
function initUniversalModals() {
  const analysisModal = document.getElementById('free-analysis-modal');
  const videoModal = document.getElementById('video-modal');

  // Open Analysis Modal Triggers
  const openAnalysisBtns = document.querySelectorAll('[data-open-modal="analysis"], .btn-analysis, .trigger-analysis');
  openAnalysisBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (videoModal?.classList.contains('active')) {
        closeModal(videoModal);
      }
      openModal(analysisModal);
    });
  });

  // Open Video Modal Triggers
  const openVideoBtns = document.querySelectorAll('[data-open-modal="video"], .trigger-video');
  openVideoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(videoModal);
    });
  });

  // Close buttons inside modals
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.modal-backdrop, .video-modal-backdrop');
      if (parentModal) closeModal(parentModal);
    });
  });

  // Backdrop click to close
  [analysisModal, videoModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (analysisModal?.classList.contains('active')) closeModal(analysisModal);
      if (videoModal?.classList.contains('active')) closeModal(videoModal);
    }
  });

  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Auto focus first input if it's the analysis modal
    const firstInput = modalEl.querySelector('input');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 150);
    }
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Initialize Form Validation, LocalStorage Sync & Lead Storage
  initFormValidationAndStorage();
}

/* ==========================================================================
   2b. Comprehensive Frontend Form Validation & Local Storage Engine
   ========================================================================== */
function initFormValidationAndStorage() {
  const forms = document.querySelectorAll('#analysis-form, #contact-page-form');

  // Validation Rules Definition
  const validationRules = {
    fullName: {
      required: true,
      minLength: 2,
      pattern: /^[a-zA-Z\s'.-]{2,60}$/,
      message: 'Please enter your full name (at least 2 letters).'
    },
    phone: {
      required: true,
      pattern: /^[0-9\+\-\(\)\s]{7,20}$/,
      message: 'Please enter a valid phone number (e.g. +1 555-019-2831).'
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid business email (e.g. name@company.com).'
    },
    businessName: {
      required: true,
      minLength: 2,
      message: 'Please enter your business or company name.'
    },
    website: {
      required: true,
      pattern: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/,
      message: 'Please enter a valid website URL (e.g. https://yourbrand.com or brand.com).'
    }
  };

  // Helper: Format website URL if missing scheme
  const formatWebsiteUrl = (val) => {
    if (!val) return val;
    val = val.trim();
    if (!/^https?:\/\//i.test(val) && val.includes('.')) {
      return 'https://' + val;
    }
    return val;
  };

  // Helper: Display or clear inline field error
  const setFieldError = (inputEl, errorMessage) => {
    const group = inputEl.closest('.form-group');
    if (!group) return;

    inputEl.classList.add('is-invalid');
    inputEl.classList.remove('is-valid');

    let errorEl = group.querySelector('.form-error-msg');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'form-error-msg';
      group.appendChild(errorEl);
    }
    errorEl.textContent = errorMessage;
  };

  const clearFieldError = (inputEl) => {
    const group = inputEl.closest('.form-group');
    if (!group) return;

    inputEl.classList.remove('is-invalid');
    inputEl.classList.add('is-valid');

    const errorEl = group.querySelector('.form-error-msg');
    if (errorEl) {
      errorEl.remove();
    }
  };

  // Single field validator
  const validateSingleField = (inputEl) => {
    const name = inputEl.name;
    const rule = validationRules[name];
    if (!rule) return true;

    let value = inputEl.value.trim();

    // Auto-format website on blur
    if (name === 'website' && value) {
      value = formatWebsiteUrl(value);
      inputEl.value = value;
    }

    if (rule.required && !value) {
      setFieldError(inputEl, rule.message);
      return false;
    }

    if (rule.minLength && value.length < rule.minLength) {
      setFieldError(inputEl, rule.message);
      return false;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      setFieldError(inputEl, rule.message);
      return false;
    }

    clearFieldError(inputEl);
    return true;
  };

  // Services checkboxes validator
  const validateServicesGroup = (formEl) => {
    const serviceCheckboxes = formEl.querySelectorAll('input[name="services"]');
    if (!serviceCheckboxes.length) return true;

    const isAnyChecked = Array.from(serviceCheckboxes).some(cb => cb.checked);
    const chipsGrid = formEl.querySelector('.service-chips-grid');
    const group = chipsGrid ? chipsGrid.closest('.form-group') : null;

    if (!isAnyChecked) {
      if (chipsGrid) chipsGrid.classList.add('is-invalid');
      if (group) {
        let errorEl = group.querySelector('.form-error-msg');
        if (!errorEl) {
          errorEl = document.createElement('div');
          errorEl.className = 'form-error-msg';
          group.appendChild(errorEl);
        }
        errorEl.textContent = 'Please select at least one service option.';
      }
      return false;
    } else {
      if (chipsGrid) chipsGrid.classList.remove('is-invalid');
      if (group) {
        const errorEl = group.querySelector('.form-error-msg');
        if (errorEl) errorEl.remove();
      }
      return true;
    }
  };

  // Auto-Save Draft to LocalStorage
  const saveDraftToStorage = (formEl) => {
    try {
      const formData = new FormData(formEl);
      const draft = {
        fullName: formData.get('fullName') || '',
        phone: formData.get('phone') || '',
        email: formData.get('email') || '',
        businessName: formData.get('businessName') || '',
        website: formData.get('website') || '',
        budget: formData.get('budget') || '',
        message: formData.get('message') || '',
        services: formData.getAll('services')
      };
      localStorage.setItem('scalepulse_draft_lead', JSON.stringify(draft));
    } catch (err) {
      console.warn('Draft auto-save warning:', err);
    }
  };

  // Restore Draft from LocalStorage
  const restoreDraftFromStorage = (formEl) => {
    try {
      const rawDraft = localStorage.getItem('scalepulse_draft_lead');
      if (!rawDraft) return;

      const draft = JSON.parse(rawDraft);
      Object.keys(draft).forEach(key => {
        if (key === 'services' && Array.isArray(draft.services)) {
          const serviceCbs = formEl.querySelectorAll('input[name="services"]');
          serviceCbs.forEach(cb => {
            cb.checked = draft.services.includes(cb.value);
          });
        } else {
          const field = formEl.querySelector(`[name="${key}"]`);
          if (field && draft[key]) {
            field.value = draft[key];
          }
        }
      });
    } catch (err) {
      console.warn('Draft restore warning:', err);
    }
  };

  // Save Lead Submission to LocalStorage History
  const saveLeadSubmission = (leadData) => {
    try {
      // 1. Save single active lead for Thank You page
      localStorage.setItem('scalepulse_lead', JSON.stringify(leadData));

      // 2. Append to all submissions array in localStorage
      let history = [];
      const rawHistory = localStorage.getItem('scalepulse_all_submissions');
      if (rawHistory) {
        try {
          history = JSON.parse(rawHistory);
          if (!Array.isArray(history)) history = [];
        } catch (e) {
          history = [];
        }
      }

      history.unshift(leadData); // put latest lead at top
      localStorage.setItem('scalepulse_all_submissions', JSON.stringify(history));

      // 3. Clear draft
      localStorage.removeItem('scalepulse_draft_lead');
    } catch (err) {
      console.error('Lead storage error:', err);
    }
  };

  // Setup forms
  forms.forEach(form => {
    // Restore draft on load
    restoreDraftFromStorage(form);

    // Real-time input validation & draft saving
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          validateSingleField(input);
        }
        saveDraftToStorage(form);
      });

      input.addEventListener('blur', () => {
        if (input.value.trim() !== '') {
          validateSingleField(input);
        }
      });

      if (input.type === 'checkbox') {
        input.addEventListener('change', () => {
          validateServicesGroup(form);
          saveDraftToStorage(form);
        });
      }
    });

    // Form Submit Event Handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all fields
      let isFormValid = true;
      const textInputs = form.querySelectorAll('input[name="fullName"], input[name="phone"], input[name="email"], input[name="businessName"], input[name="website"]');
      
      let firstInvalidInput = null;

      textInputs.forEach(input => {
        const isValid = validateSingleField(input);
        if (!isValid) {
          isFormValid = false;
          if (!firstInvalidInput) firstInvalidInput = input;
        }
      });

      const isServicesValid = validateServicesGroup(form);
      if (!isServicesValid) {
        isFormValid = false;
        if (!firstInvalidInput) {
          firstInvalidInput = form.querySelector('.service-chips-grid');
        }
      }

      // If validation fails, block submit & focus first invalid input
      if (!isFormValid) {
        if (firstInvalidInput) {
          firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (firstInvalidInput.focus) firstInvalidInput.focus();
        }
        return;
      }

      // Collect Lead Data
      const formData = new FormData(form);
      let websiteVal = formData.get('website') || '';
      websiteVal = formatWebsiteUrl(websiteVal);

      const leadData = {
        refId: 'SP-' + Math.floor(100000 + Math.random() * 900000),
        name: formData.get('fullName')?.toString().trim() || 'Valued Client',
        phone: formData.get('phone')?.toString().trim() || 'Not Provided',
        email: formData.get('email')?.toString().trim() || 'Not Provided',
        business: formData.get('businessName')?.toString().trim() || 'Your Business',
        website: websiteVal || 'yourwebsite.com',
        services: formData.getAll('services'),
        budget: formData.get('budget') || '$5k - $15k / mo',
        message: formData.get('message')?.toString().trim() || '',
        submittedAt: new Date().toLocaleString()
      };

      // Store in LocalStorage
      saveLeadSubmission(leadData);

      // Submit Button Loading Feedback
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 0.8s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10"></path>
          </svg>
          Saving &amp; Generating Report...
        `;
      }

      // Redirect to Thank You page
      setTimeout(() => {
        window.location.href = 'thank-you.html';
      }, 750);
    });
  });

  // Initialize Leads Viewer Admin Modal & Global CSV Export Helper
  initLeadsAdminViewer();
}

/* ==========================================================================
   2c. Leads Admin Dashboard & CSV Export Utilities
   ========================================================================== */
function initLeadsAdminViewer() {
  // Expose global console helper for user
  window.getScalePulseLeads = () => {
    const raw = localStorage.getItem('scalepulse_all_submissions');
    const leads = raw ? JSON.parse(raw) : [];
    console.table(leads);
    return leads;
  };

  window.exportLeadsCSV = () => {
    const raw = localStorage.getItem('scalepulse_all_submissions');
    const leads = raw ? JSON.parse(raw) : [];
    if (!leads.length) {
      alert('No lead submissions found in local storage yet!');
      return;
    }

    const headers = ['Ref ID', 'Full Name', 'Phone', 'Email', 'Business Name', 'Website', 'Services', 'Budget', 'Message', 'Submitted At'];
    const rows = leads.map(l => [
      `"${l.refId || ''}"`,
      `"${l.name || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${l.business || ''}"`,
      `"${l.website || ''}"`,
      `"${(l.services || []).join(', ')}"`,
      `"${l.budget || ''}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${l.submittedAt || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `scalepulse_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  window.clearScalePulseLeads = () => {
    if (confirm('Are you sure you want to clear all stored lead submissions from LocalStorage?')) {
      localStorage.removeItem('scalepulse_all_submissions');
      alert('Lead submissions cleared!');
      location.reload();
    }
  };

  // Keyboard shortcut Ctrl + Shift + L to open Leads Admin Modal
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
      e.preventDefault();
      openLeadsAdminModal();
    }
  });

  // Inject "View Stored Leads" button into Footer if not present
  const footerBottom = document.querySelector('.footer-bottom');
  if (footerBottom && !document.getElementById('open-leads-admin-btn')) {
    const leadsBtn = document.createElement('button');
    leadsBtn.id = 'open-leads-admin-btn';
    leadsBtn.className = 'btn-leads-trigger';
    leadsBtn.innerHTML = '📁 View Stored Leads (LocalStorage)';
    leadsBtn.addEventListener('click', openLeadsAdminModal);
    footerBottom.appendChild(leadsBtn);
  }

  function openLeadsAdminModal() {
    let adminModal = document.getElementById('leads-admin-modal');

    if (!adminModal) {
      adminModal = document.createElement('div');
      adminModal.id = 'leads-admin-modal';
      adminModal.className = 'modal-backdrop';
      adminModal.innerHTML = `
        <div class="modal-window leads-modal-window">
          <button type="button" class="modal-close-btn" data-close-admin-modal aria-label="Close modal">✕</button>
          <div class="modal-content-wrap">
            <div class="leads-admin-header">
              <div>
                <span class="modal-pill">💾 LocalStorage Leads Database</span>
                <h3 class="modal-title">Captured Lead Submissions</h3>
                <p class="modal-desc">All form entries submitted on this browser are stored here.</p>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button type="button" id="admin-export-csv-btn" class="btn btn-primary" style="font-size:0.85rem; padding:0.5rem 1rem;">
                  ⬇️ Export CSV
                </button>
                <button type="button" id="admin-clear-leads-btn" class="btn btn-secondary" style="font-size:0.85rem; padding:0.5rem 1rem; color:#ef4444;">
                  🗑️ Clear
                </button>
              </div>
            </div>
            <div id="leads-table-container"></div>
          </div>
        </div>
      `;
      document.body.appendChild(adminModal);

      adminModal.querySelector('[data-close-admin-modal]').addEventListener('click', () => {
        adminModal.classList.remove('active');
        document.body.style.overflow = '';
      });

      adminModal.addEventListener('click', (e) => {
        if (e.target === adminModal) {
          adminModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });

      document.getElementById('admin-export-csv-btn').addEventListener('click', window.exportLeadsCSV);
      document.getElementById('admin-clear-leads-btn').addEventListener('click', window.clearScalePulseLeads);
    }

    // Render Table Content
    const tableContainer = adminModal.querySelector('#leads-table-container');
    const leads = window.getScalePulseLeads();

    if (!leads.length) {
      tableContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📥</div>
          <h4 style="font-size: 1.1rem; color: var(--text-main);">No Form Submissions Yet</h4>
          <p style="font-size: 0.9rem; margin-top: 0.25rem;">Fill out and submit any form on the site to see stored lead data populate here automatically!</p>
        </div>
      `;
    } else {
      let tableHtml = `
        <div class="leads-table-wrap">
          <table class="leads-table">
            <thead>
              <tr>
                <th>Ref ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Business / Website</th>
                <th>Services</th>
                <th>Budget</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
      `;

      leads.forEach(l => {
        tableHtml += `
          <tr>
            <td><span class="badge-lead-tag">${l.refId || 'N/A'}</span></td>
            <td><strong>${escapeHtml(l.name)}</strong>${l.email ? `<br><small style="color:var(--text-muted);">${escapeHtml(l.email)}</small>` : ''}</td>
            <td>${escapeHtml(l.phone)}</td>
            <td>${escapeHtml(l.business)}<br><a href="${escapeHtml(l.website)}" target="_blank" rel="noopener" style="color:var(--primary); font-size:0.8rem;">${escapeHtml(l.website)}</a></td>
            <td>${(l.services || []).map(s => `<span style="display:inline-block; font-size:0.75rem; background:#eff6ff; color:#2563eb; padding:0.15rem 0.4rem; border-radius:4px; margin:2px;">${escapeHtml(s)}</span>`).join('')}</td>
            <td><small>${escapeHtml(l.budget)}</small></td>
            <td><small style="color:var(--text-muted);">${escapeHtml(l.submittedAt || '')}</small></td>
          </tr>
        `;
      });

      tableHtml += `
            </tbody>
          </table>
        </div>
      `;
      tableContainer.innerHTML = tableHtml;
    }

    adminModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

/* ==========================================================================


/* ==========================================================================
   3. Interactive ROI & Growth Calculator (Home Page)
   ========================================================================== */
function initRoiCalculator() {
  const spendSlider = document.getElementById('spend-slider');
  const convSlider = document.getElementById('conv-slider');
  const spendDisplay = document.getElementById('spend-display');
  const convDisplay = document.getElementById('conv-display');
  const revenueDisplay = document.getElementById('calc-revenue-gain');
  const roasDisplay = document.getElementById('calc-new-roas');
  const leadsDisplay = document.getElementById('calc-leads-gain');

  if (!spendSlider || !convSlider) return;

  function updateCalc() {
    const spend = parseInt(spendSlider.value, 10);
    const convRate = parseFloat(convSlider.value);

    // Display inputs
    if (spendDisplay) spendDisplay.textContent = '$' + spend.toLocaleString();
    if (convDisplay) convDisplay.textContent = convRate.toFixed(1) + '%';

    // Model calculations:
    // With ScalePulse conversion architecture, CVR typically lifts by 2.4x - 3.2x
    // And ROAS improves from ~1.8x to ~4.4x
    const estimatedNewCvr = Math.min(convRate * 2.6, 9.8);
    const avgDealValue = 380; // normalized unit value
    const approxClicks = Math.round(spend / 2.8); // avg CPC $2.80
    const currentLeads = Math.round(approxClicks * (convRate / 100));
    const projectedLeads = Math.round(approxClicks * (estimatedNewCvr / 100));
    const addedLeads = Math.max(projectedLeads - currentLeads, 12);

    const projectedRevenue = Math.round(addedLeads * avgDealValue * 1.8);
    const newRoas = ((spend + projectedRevenue) / spend).toFixed(1);

    if (revenueDisplay) {
      revenueDisplay.textContent = '+$' + projectedRevenue.toLocaleString();
    }
    if (roasDisplay) {
      roasDisplay.textContent = newRoas + 'x ROAS';
    }
    if (leadsDisplay) {
      leadsDisplay.textContent = '+' + addedLeads + ' Leads / Mo';
    }
  }

  spendSlider.addEventListener('input', updateCalc);
  convSlider.addEventListener('input', updateCalc);
  updateCalc();
}

/* ==========================================================================
   4. Problem Solving Accordions (Problem Solving Page & FAQs)
   ========================================================================== */
function initProblemAccordions() {
  const accordionItems = document.querySelectorAll('.problem-accordion-item, .faq-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.problem-accordion-header, .faq-question');
    const body = item.querySelector('.problem-accordion-body, .faq-answer');

    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close other open items in the same container
      const siblings = item.parentElement.querySelectorAll('.problem-accordion-item, .faq-item');
      siblings.forEach(sibling => {
        if (sibling !== item) {
          sibling.classList.remove('open');
          const siblingBody = sibling.querySelector('.problem-accordion-body, .faq-answer');
          if (siblingBody) siblingBody.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('open');
        body.style.maxHeight = null;
      } else {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Pre-open the first accordion item by default
  const firstAccordion = document.querySelector('.problem-accordion-item');
  if (firstAccordion) {
    const firstBody = firstAccordion.querySelector('.problem-accordion-body');
    if (firstBody) {
      firstAccordion.classList.add('open');
      firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
    }
  }
}

/* ==========================================================================
   5. Interactive A/B Comparison Toggle (Conversion Page)
   ========================================================================== */
function initAbComparison() {
  const btnControl = document.getElementById('ab-btn-control');
  const btnWinner = document.getElementById('ab-btn-winner');
  const panelControl = document.getElementById('ab-panel-control');
  const panelWinner = document.getElementById('ab-panel-winner');

  if (!btnControl || !btnWinner) return;

  btnControl.addEventListener('click', () => {
    btnControl.classList.add('active');
    btnWinner.classList.remove('active');
    panelControl?.classList.add('active');
    panelWinner?.classList.remove('active');
  });

  btnWinner.addEventListener('click', () => {
    btnWinner.classList.add('active');
    btnControl.classList.remove('active');
    panelWinner?.classList.add('active');
    panelControl?.classList.remove('active');
  });
}

/* ==========================================================================
   6. Reveal-on-Scroll Animations
   ========================================================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('is-visible'));
  }
}

/* ==========================================================================
   7. Thank You Page Dynamic Personalization & Celebration Confetti
   ========================================================================== */
function initThankYouPage() {
  const thankYouContainer = document.querySelector('.thankyou-card');
  if (!thankYouContainer) return;

  // Retrieve lead data from localStorage
  try {
    const rawData = localStorage.getItem('scalepulse_lead');
    if (rawData) {
      const data = JSON.parse(rawData);
      const nameEl = document.getElementById('lead-personal-name');
      const websiteEl = document.getElementById('lead-personal-website');
      const refEl = document.getElementById('lead-personal-ref');

      if (nameEl && data.name) nameEl.textContent = data.name;
      if (websiteEl && data.website) websiteEl.textContent = data.website;
      if (refEl && data.refId) refEl.textContent = 'Reference #' + data.refId;
    }
  } catch (err) {
    console.error('Lead load error:', err);
  }

  // Launch celebration confetti
  launchConfetti();
}

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;

  const confettiPieces = [];
  const colors = ['#2563eb', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];

  for (let i = 0; i < 90; i++) {
    confettiPieces.push({
      x: canvas.width / 2,
      y: canvas.height / 3,
      r: Math.random() * 6 + 3,
      dx: (Math.random() - 0.5) * 12,
      dy: (Math.random() - 0.5) * 12 - 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 5,
      tiltSpeed: Math.random() * 0.1 + 0.05,
      opacity: 1
    });
  }

  let animationFrame;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let allFinished = true;

    confettiPieces.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.dy += 0.22; // gravity
      p.dx *= 0.98; // air drag
      p.tilt += p.tiltSpeed;
      p.opacity -= 0.006;

      if (p.opacity > 0) {
        allFinished = false;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.r, p.r / 2, p.tilt, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });

    if (!allFinished) {
      animationFrame = requestAnimationFrame(animate);
    }
  }

  animate();
}

// Add simple CSS animation for spinner in JS
const spinStyle = document.createElement('style');
spinStyle.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
document.head.appendChild(spinStyle);
