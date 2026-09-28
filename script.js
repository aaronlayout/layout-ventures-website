document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.textContent = open ? 'Close' : 'Menu';
  });

  // Loops newsletter (same endpoint as the current site)
  var form = document.querySelector('.newsletter-form');
  var msg = document.querySelector('.newsletter-msg');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var last = Number(localStorage.getItem('loops-form-timestamp') || 0);
    if (last + 60000 > Date.now()) { show('Too many signups, please try again in a little while'); return; }
    localStorage.setItem('loops-form-timestamp', Date.now());
    var btn = form.querySelector('button'); btn.textContent = 'Please wait...'; btn.disabled = true;
    var email = form.querySelector('input').value;
    fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'userGroup=Newsletter&mailingLists=&email=' + encodeURIComponent(email) })
      .then(function (r) { if (r.ok) show("Thanks! We're excited to have you as part of our community!"); else return r.json().then(function (d) { show(d.message || 'Oops! Something went wrong, please try again'); }); })
      .catch(function () { localStorage.setItem('loops-form-timestamp', ''); show('Oops! Something went wrong, please try again'); });
  });
  function show(t) { form.style.display = 'none'; msg.textContent = t; msg.style.display = 'block'; }
});
