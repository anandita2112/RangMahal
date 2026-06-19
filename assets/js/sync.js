/*  sync.js — Reads admin settings & products from localStorage
    and applies them to the live website pages. */

(function () {
  function get(key) {
    var d = localStorage.getItem('rm_' + key);
    return d ? JSON.parse(d) : null;
  }

  /* ─── Settings → footer, promise strip, checkout ─── */
  var s = get('settings');
  if (s) {
    var el;

    // Contact
    el = document.getElementById('footer-address');
    if (el && s.address) el.textContent = s.address;

    el = document.getElementById('footer-email');
    if (el && s.email) { el.textContent = s.email; el.href = 'mailto:' + s.email; }

    el = document.getElementById('footer-phone');
    if (el && s.phone) el.textContent = s.phone;

    // Socials
    el = document.getElementById('social-instagram');
    if (el && s.instagram) { el.href = s.instagram; el.style.display = ''; }

    el = document.getElementById('social-facebook');
    if (el && s.facebook) { el.href = s.facebook; el.style.display = ''; }

    el = document.getElementById('social-whatsapp');
    if (el && s.whatsapp) {
      var num = s.whatsapp.replace(/[^0-9]/g, '');
      el.href = 'https://wa.me/' + num;
      el.style.display = '';
    }

    // Free shipping text
    el = document.getElementById('free-ship-text');
    if (el && s.freeShippingMin) el.textContent = 'Free shipping on orders above ₹' + s.freeShippingMin;

    // Checkout gift packaging price
    el = document.getElementById('gift-price');
    if (el && s.giftPackagingPrice) el.textContent = '₹' + s.giftPackagingPrice;

    // Checkout total recalc
    el = document.getElementById('order-total');
    var subtotalEl = document.getElementById('order-subtotal');
    if (el && subtotalEl && s.giftPackagingPrice) {
      var subtotal = parseInt(subtotalEl.dataset.amount || 549);
      el.textContent = '₹' + (subtotal + s.giftPackagingPrice).toLocaleString('en-IN');
    }
  }

  /* ─── Products → catalogue grid + homepage featured ─── */
  var products = get('products');
  if (!products) return;

  // Only keep active products
  var active = products.filter(function (p) { return p.status === 'active'; });

  function cardHTML(p) {
    var off = p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0;
    return '<div class="card">' +
      '<div class="card-img">' +
        '<div class="ph ' + (p.color || 'ph-gold') + '"></div>' +
        '<button class="card-wish"><i class="far fa-heart"></i></button>' +
      '</div>' +
      '<div class="card-body">' +
        '<div class="card-sub">' + p.category + '</div>' +
        '<div class="card-name">' + p.name + '</div>' +
        '<div class="card-price">' +
          '<span class="price-now">₹' + p.price.toLocaleString('en-IN') + '</span>' +
          (p.mrp > p.price ? '<span class="price-was">₹' + p.mrp.toLocaleString('en-IN') + '</span>' : '') +
          (off ? '<span class="price-off">' + off + '% off</span>' : '') +
        '</div>' +
      '</div>' +
      '<div class="card-footer">' +
        '<a href="product.html" class="card-btn" style="display:block;text-align:center;padding:10px;">View Product</a>' +
      '</div>' +
    '</div>';
  }

  // Catalogue page — full grid
  var catGrid = document.getElementById('productsGrid');
  if (catGrid && active.length) {
    catGrid.innerHTML = active.map(cardHTML).join('');
  }

  // Homepage — first 4 products
  var homeGrid = document.getElementById('homeProducts');
  if (homeGrid && active.length) {
    homeGrid.innerHTML = active.slice(0, 4).map(cardHTML).join('');
  }
})();
