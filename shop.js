/* ============================================================
   TIMM INK LAB — SHOP JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Cart state ────────────────────────────────────────────
  let cart = JSON.parse(localStorage.getItem('timmCart') || '[]');

  function saveCart() {
    localStorage.setItem('timmCart', JSON.stringify(cart));
  }

  function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.classList.toggle('visible', count > 0);
    });
  }

  function showToast(message) {
    let toast = document.querySelector('.cart-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'cart-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  function addToCart(id, name, price) {
    const existing = cart.find(i => i.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id, name, price, qty: 1 });
    }
    saveCart();
    updateCartUI();
    showToast(`✦ Added: ${name}`);
  }

  // Init cart count on load
  updateCartUI();

  // ── Product data ──────────────────────────────────────────
  const products = [
    {
      id: 'p1',
      name: 'Custom Tattoo Design Consultation',
      category: 'services',
      price: 2500,
      emoji: '✏️',
      imgSrc: 'images/tattoo.jpeg',
      desc: '60-minute one-on-one session with a lead artist to develop your custom tattoo concept.',
      badge: null,
      featured: false
    },
    {
      id: 'p2',
      name: 'Tattoo Pen Crtridges',
      category: 'supplies',
      price: 5000,
      emoji: '🎁',
      imgSrc: 'images/pencartridgeneedles.jpeg',
      desc: 'Give the gift of exceptional ink. Valid for any service or product in-studio.',
      badge: 'new',
      featured: false
    },
    {
      id: 'p3',
      name: 'Second Skin Aftercare ',
      category: 'aftercare',
      price: 1800,
      priceOld: 2200,
      emoji: '🧴',
      imgSrc: 'images/secondskn.jpeg',
      desc: 'Everything you need to heal beautifully: foam cleanser, healing balm, moisturiser, and aftercare guide.',
      badge: 'sale',
      featured: false
    },
    {
      id: 'p4',
      name: 'Timm Black Tee — Classic Logo',
      category: 'merch',
      price: 1500,
      emoji: '👕',
      imgSrc: 'images/Logo.jpg',
      desc: 'Heavy-weight 100% cotton tee. Embossed gold Timm Ink Lab logo on chest. Available S–3XL.',
      badge: 'hot',
      featured: false
    },
    {
      id: 'p5',
      name: 'KVM Color tattoo Ink',
      category: 'art',
      price: 2200,
      emoji: '🖼️',
      imgSrc: 'images/color.jpeg',
      desc: 'Museum-quality giclée print on 300gsm cotton rag paper. Original flash designs from our resident artists.',
      badge: 'new',
      featured: false
    },
    {
      id: 'p6',
      name: 'Piercing Rings',
      category: 'merch',
      price: 950,
      emoji: '📌',
      imgSrc: 'images/piercing.jpeg',
      desc: 'piercing rings in surgical steel. Available in 16g, 14g, and 12g. Perfect for ears, nose, and more.',
      badge: null,
      featured: false
    },
    {
      id: 'p7',
      name: 'Healing Tattoo Foam Soap 150ml',
      category: 'aftercare',
      price: 650,
      emoji: '🫧',
      imgSrc: 'images/saniderm.jpg',
      desc: 'Gentle, fragrance-free foam cleanser formulated for fresh tattoo aftercare. pH-balanced.',
      badge: null,
      featured: false
    },
    {
      id: 'p8',
      name: 'Aquaphor Healing Balm 60ml',
      category: 'aftercare',
      price: 850,
      emoji: '🌿',
      imgSrc: 'images/aquaphor.jpg',
      desc: 'Organic shea, vitamin E, and calendula balm. Accelerates healing, enhances colour vibrancy.',
      badge: null,
      featured: false
    },
    {
      id: 'p9',
      name: 'Timm Snapback Cap — Gold Edition',
      category: 'merch',
      price: 2000,
      emoji: '🧢',
      imgSrc: 'images/Logo.jpg',
      desc: 'All-black structured snapback. Embroidered gold logo. Adjustable fit.',
      badge: null,
      featured: false
    },
    {
      id: 'p10',
      name: 'Timm Snapback Cap-Commando Edition',
      category: 'art',
      price: 2500,
      emoji: '✦',
      imgSrc: 'images/Logo.jpg',
      desc: 'Commando-style snapback cap. Embroidered gold logo. Adjustable fit.',
      badge: 'hot',
      featured: false
    },
    {
      id: 'p11',
      name: 'Timm Snapback Cap-Black Edition',
      category: 'art',
      price: 2000,
      priceOld: 4500,
      emoji: '📓',
      imgSrc: 'images/Logo.jpg',
      desc: 'Limited edition black snapback cap. Embroidered gold logo. Adjustable fit.',
      badge: 'sale',
      featured: false
    },
    {
      id: 'p12',
      name: 'Timm Snapback Cap-White Edition',
      category: 'art',
      price: 2000,
      emoji: '🎨',
      imgSrc: 'images/Logo.jpg',
      desc: 'White snapback cap. Embroidered gold logo. Adjustable fit.',
      badge: 'new',
      featured: false
    },
    // {
    //   id: 'p12.1',
    //   name: 'Touch-Up Session Voucher',
    //   category: 'services',
    //   price: 1500,
    //   emoji: '🎨',
    //   imgSrc: 'images/gun1.jpeg',
    //   desc: 'Pre-paid touch-up session voucher. Redeemable within 12 months of original tattoo date.',
    //   badge: null,
    //   featured: false
    // },
    // Tattoo Guns
    {
      id: 'p13',
      name: 'Professional Rotary Tattoo Machine',
      category: 'supplies',
      price: 15000,
      emoji: '🔫',
      imgSrc: 'images/gun1.jpeg',
      desc: 'High-performance rotary tattoo machine. Quiet, powerful, and precise. Suitable for lining and shading.',
      badge: 'hot',
      featured: false
    },
    {
      id: 'p14',
      name: 'Premium Coil Tattoo Gun',
      category: 'supplies',
      price: 12000,
      emoji: '⚡',
      imgSrc: 'images/gun2.jpeg',
      desc: 'Traditional coil tattoo machine. Hand-wound, powerful hit. Perfect for bold lines and traditional work.',
      badge: null,
      featured: false
    },
    // Tattoo Inks
    {
      id: 'p15',
      name: 'Dynamic Black Ink 30ml',
      category: 'supplies',
      price: 1200,
      emoji: '⚫',
      imgSrc: 'images/30mlblack.jpeg',
      desc: 'Super black, highly pigmented tattoo ink. Smooth consistency, perfect for lining and shading.',
      badge: null,
      featured: false
    },
    {
      id: 'p16',
      name: 'Dynamic Black Ink 240ml',
      category: 'supplies',
      price: 6500,
      emoji: '⚫',
      imgSrc: 'images/blackink240.jpeg',
      desc: 'Professional size super black tattoo ink. Economy bottle for high-volume artists.',
      badge: null,
      featured: false
    },
    {
      id: 'p17',
      name: 'Ultimate Black Ink 30ml',
      category: 'supplies',
      price: 1500,
      emoji: '⚫',
      imgSrc: 'images/ultablack.jpeg',
      desc: 'The darkest black ink on the market. Vegan-friendly, highly concentrated pigment.',
      badge: 'new',
      featured: false
    },
    {
      id: 'p18',
      name: 'White Ink 30ml',
      category: 'supplies',
      price: 1100,
      emoji: '⚪',
      imgSrc: 'images/white30ml.jpeg',
      desc: 'Pure white tattoo ink for highlights and mixing. Creamy consistency, excellent coverage.',
      badge: null,
      featured: false
    },
    {
      id: 'p19',
      name: 'Premium White Ink',
      category: 'supplies',
      price: 1800,
      emoji: '⚪',
      imgSrc: 'images/whiteink.jpeg',
      desc: 'Ultra-pure white ink. Perfect for cover-ups, highlights, and pastel mixing.',
      badge: null,
      featured: false
    },
    {
      id: 'p20',
      name: 'Color Ink Set — 6 Colors',
      category: 'supplies',
      price: 4500,
      emoji: '🌈',
      imgSrc: 'images/color.jpeg',
      desc: 'Set of 6 vibrant tattoo inks: red, blue, green, yellow, purple, orange. 30ml each.',
      badge: 'sale',
      featured: false
    },
    {
      id: 'p21',
      name: 'Brown Ink 30ml',
      category: 'supplies',
      price: 1100,
      emoji: '🟤',
      imgSrc: 'images/bink.jpeg',
      desc: 'Rich brown tattoo ink. Great for traditional work, portraits, and aging effects.',
      badge: null,
      featured: false
    },
    {
      id: 'p22',
      name: 'Copper Ink 30ml',
      category: 'supplies',
      price: 1300,
      emoji: '🟠',
      imgSrc: 'images/clink.jpeg',
      desc: 'Metallic copper tattoo ink. Unique shimmer effect for special designs.',
      badge: 'new',
      featured: false
    },
    // Stands
    {
      id: 'p23',
      name: 'Adjustable Hand Stand',
      category: 'supplies',
      price: 3500,
      emoji: '🖐️',
      imgSrc: 'images/handstand.jpeg',
      desc: 'Adjustable hand rest stand for client comfort during tattooing. Padded and sterilizable.',
      badge: null,
      featured: false
    },
    {
      id: 'p24',
      name: 'Professional Ink Stand',
      category: 'supplies',
      price: 2800,
      emoji: '🎯',
      imgSrc: 'images/stand.jpeg',
      desc: 'Sturdy ink cup holder stand. Holds up to 8 ink cups. Easy to clean and sterilize.',
      badge: null,
      featured: false
    },
    {
      id: 'p25',
      name: 'Ink Tray Set',
      category: 'supplies',
      price: 1500,
      emoji: '📋',
      imgSrc: 'images/tray.jpeg',
      desc: 'Set of 3 stainless steel ink trays. Disposable or sterilizable. Various sizes.',
      badge: null,
      featured: false
    },
  ];

  // ── Render products ───────────────────────────────────────
  const grid = document.getElementById('productsGrid');
  let activeFilter = 'all';
  let filteredProducts = [...products];

  function badgeHTML(badge) {
    if (!badge) return '';
    const labels = { new: 'New', hot: 'Hot', sale: 'Sale' };
    return `<span class="product-badge badge-${badge}">${labels[badge]}</span>`;
  }

  function renderProducts(list) {
    if (!grid) return;
    if (list.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--gold-dim);font-family:var(--font-heading);letter-spacing:0.2em;">No products found in this category.</div>`;
      return;
    }
    grid.innerHTML = list.map(p => `
      <div class="product-card fade-up" data-category="${p.category}" data-id="${p.id}">
        ${badgeHTML(p.badge)}
        <div class="product-image">
          ${p.imgSrc ? `<img src="${p.imgSrc}" alt="${p.name}" loading="lazy" />` : `<span>${p.emoji}</span>`}
          <button class="btn btn-gold product-quick-add" onclick="event.stopPropagation(); window.timmAddToCart('${p.id}','${p.name}',${p.price})">
            Add to Cart
          </button>
        </div>
        <div class="product-info">
          <div class="product-category">${p.category}</div>
          <div class="product-name">${p.name}</div>
          <p class="product-desc">${p.desc}</p>
          <div class="product-footer">
            <div class="product-price">
              ${p.priceOld ? `<span class="product-price-old">KES ${p.priceOld.toLocaleString()}</span>` : ''}
              KES ${p.price.toLocaleString()}
            </div>
            <button class="add-to-cart" onclick="window.timmAddToCart('${p.id}','${p.name}',${p.price})">
              + Cart
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Re-run fade-up for new items
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), idx * 60);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      grid.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    } else {
      grid.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
    }
  }

  // Expose addToCart globally
  window.timmAddToCart = addToCart;

  // ── Filter tabs ───────────────────────────────────────────
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.dataset.filter;

      filteredProducts = activeFilter === 'all'
        ? [...products]
        : products.filter(p => p.category === activeFilter);

      const sortEl = document.getElementById('sortSelect');
      if (sortEl) applySort(sortEl.value, filteredProducts);
      else renderProducts(filteredProducts);
    });
  });

  // ── Sort ──────────────────────────────────────────────────
  function applySort(value, list) {
    let sorted = [...list];
    switch (value) {
      case 'price-asc':  sorted.sort((a,b) => a.price - b.price); break;
      case 'price-desc': sorted.sort((a,b) => b.price - a.price); break;
      case 'name':       sorted.sort((a,b) => a.name.localeCompare(b.name)); break;
      default: break; // featured/default
    }
    renderProducts(sorted);
  }

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      applySort(sortSelect.value, filteredProducts);
    });
  }

  // ── Initial render ────────────────────────────────────────
  renderProducts(products);

  // ── Cart page (if exists) ─────────────────────────────────
  updateCartUI();

});
