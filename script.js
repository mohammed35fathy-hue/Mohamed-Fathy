document.addEventListener('DOMContentLoaded', () => {

  /* ===== السنة في الفوتر ===== */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ===== شريط التنقل: تغيير الشكل عند التمرير ===== */
  const nav = document.getElementById('nav');
  const onScrollNav = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ===== قائمة الموبايل ===== */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ===== تمييز الرابط النشط أثناء التمرير ===== */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  sections.forEach(s => spyObserver.observe(s));

  /* ===== كشف عناصر عند الظهور ===== */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ===== فلترة بطاقات التدريب حسب الفئة ===== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const trainingCards = document.querySelectorAll('.training-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      trainingCards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  /* ===== نموذج التواصل ===== */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjyvkyrr'; // استبدل بعد إنشاء حساب Formspree

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formNote.style.color = '';
    formNote.textContent = 'جارٍ الإرسال...';

    if (FORMSPREE_ENDPOINT.includes('ضع_الكود')) {
      formNote.style.color = '#ffb199';
      formNote.textContent = 'خدمة الإرسال لسه مش مفعّلة. تواصل عبر البريد أو الهاتف الموضحين بالأعلى.';
      return;
    }

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if (response.ok) {
        formNote.style.color = '#9be79b';
        formNote.textContent = 'تم إرسال رسالتك بنجاح، هتوصلك الرد قريباً.';
        form.reset();
      } else {
        formNote.style.color = '#ffb199';
        formNote.textContent = 'حصل خطأ أثناء الإرسال، جرب تاني أو تواصل عبر الهاتف.';
      }
    } catch (err) {
      formNote.style.color = '#ffb199';
      formNote.textContent = 'مفيش اتصال بالإنترنت حالياً، جرب تاني أو تواصل عبر الهاتف.';
    }
  });

});
