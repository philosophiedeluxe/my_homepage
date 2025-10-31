// Small helper: year + accessible collapsing nav
(function(){
  var yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  var toggle = document.querySelector('.nav-toggle');
  var list   = document.getElementById('primary-nav');
  if(!toggle || !list) return;

  function setOpen(open){
    toggle.setAttribute('aria-expanded', String(open));
    list.dataset.open = open ? 'true' : 'false';
  }

  toggle.addEventListener('click', function(e){
    var open = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!open);
  });

  // close on outside click
  document.addEventListener('click', function(e){
    if(!list.dataset.open || list.dataset.open === 'false') return;
    var within = e.target.closest('.nav');
    if(!within){ setOpen(false); }
  });

  // close on ESC
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){ setOpen(false); toggle.focus(); }
  });

  // close when a link is clicked (mobile)
  list.addEventListener('click', function(e){
    if(e.target.closest('a')){ setOpen(false); }
  });
})();