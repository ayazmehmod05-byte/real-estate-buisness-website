const cursor = document.querySelector('.cursor-trail');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');
const loadingScreen = document.getElementById('loadingScreen');
const chatWidget = document.getElementById('chatbotWidget');
const chatToggle = document.querySelector('.chat-toggle');
const chatClose = document.querySelector('.chat-close');
const chatBody = document.getElementById('chatBody');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

const keywordReplies = [
  { test: /price|cost|rate|pricing|rent|lease/i, replies: [
      'Property pricing is tailored to the asset class and market conditions. Share your location and requirements for a custom estimate.',
      'Our pricing guidance helps investors and sellers optimize value. Tell me whether you are looking to buy, sell, or lease.'
    ]
  },
  { test: /management|portfolio|asset|tenant|leasing|lease/i, replies: [
      'We manage portfolios and assets with tenant relations, lease oversight, and property performance tracking.',
      'For property operations, we streamline asset management, occupancy, and portfolio reporting.'
    ]
  },
  { test: /whatsapp|email|contact/i, replies: [
      'You can connect instantly through WhatsApp, email, or LinkedIn using the buttons in the contact panel.',
      'The contact section includes direct WhatsApp, Gmail, and LinkedIn links for fast follow-up.'
    ]
  },
  { test: /risk|compliance|safety|approval|permit/i, replies: [
      'We support zoning, permit review, and compliance audits to reduce operational risk.',
      'Our service includes documentation, approvals, and inspection readiness for every property transaction.'
    ]
  },
  { test: /inquiry|quote|proposal/i, replies: [
      'Tell me your location and investment goal, and I’ll help you prepare a focused proposal request.',
      'Submit your details in the inquiry box and I’ll guide you toward a proposal designed for your property business.'
    ]
  },
  { test: /property|real estate|investment|listing|building|estate/i, replies: [
      'We help investors source, acquire, and manage prime property assets with a focus on long-term returns.',
      'Our real estate services include acquisition strategy, market research, and project planning for your next property move.'
    ]
  }
];

function chooseReply(category) {
  const replies = category.replies;
  return replies[Math.floor(Math.random() * replies.length)];
}

function addMessage(text, type = 'bot') {
  const message = document.createElement('div');
  message.className = `message ${type}`;
  message.textContent = text;
  chatBody.appendChild(message);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotReply(message) {
  const matched = keywordReplies.find(item => item.test.test(message));
  if (matched) return chooseReply(matched);
  const fallbackReplies = [
    'I can help with property pricing, portfolio strategy, compliance, or investment questions. What would you like to know?',
    'Tell me more about your real estate challenge and I’ll recommend the best service option.',
    'Are you interested in buying, selling, leasing, or growing your property portfolio?'
  ];
  return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
}

function openChat() {
  chatWidget.classList.add('open');
  chatInput.focus();
}

function closeChat() {
  chatWidget.classList.remove('open');
}

function handleChatSubmit(event) {
  event.preventDefault();
  const value = chatInput.value.trim();
  if (!value) return;
  addMessage(value, 'user');
  chatInput.value = '';

  setTimeout(() => {
    const response = getBotReply(value);
    addMessage(response, 'bot');
  }, 600);
}

function initLoading() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.body.classList.remove('loading');
    }, 1800);
  });
}

function initCursor() {
  window.addEventListener('mousemove', event => {
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  });
}

function initScrollReveal() {
  const pages = document.querySelectorAll('.page');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.25
  });
  pages.forEach(page => observer.observe(page));
}

function toggleHamburger() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
}

function closeMenu() {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
}

function initNavigation() {
  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      closeMenu();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initHamburgerMenu() {
  if (hamburger) {
    hamburger.addEventListener('click', toggleHamburger);
  }
  document.addEventListener('click', event => {
    if (hamburger && navMenu && !hamburger.contains(event.target) && !navMenu.contains(event.target)) {
      closeMenu();
    }
  });
}

function initChatWidget() {
  chatToggle.addEventListener('click', openChat);
  chatClose.addEventListener('click', closeChat);
  chatForm.addEventListener('submit', handleChatSubmit);
}

initLoading();
initCursor();
initScrollReveal();
initHamburgerMenu();
initNavigation();
initChatWidget();
