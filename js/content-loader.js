(function () {
  const emptyMessages = {
    news: {
      icon: 'N',
      title: '등록된 뉴스가 없습니다',
      body: '새로운 연구 소식, 공지 또는 보도자료가 준비되면 이 영역에 게시됩니다.'
    },
    board: {
      icon: 'B',
      title: '등록된 게시글이 없습니다',
      body: '공지사항, 연구 업데이트, 행사 안내가 준비되면 목록으로 게시됩니다.'
    },
    gallery: {
      icon: 'G',
      title: '등록된 갤러리 이미지가 없습니다',
      body: '연구 사진, 실험실 이미지, 행사 사진이 준비되면 갤러리 형태로 게시됩니다.'
    }
  };

  const defaultContent = {
    news: [
      {
        date: '2026.06.04',
        title: 'MycoDx 공식 웹사이트 오픈',
        summary: '분자진단 플랫폼 연구개발과 협력 소식을 전하는 공식 웹사이트를 오픈했습니다.',
        visual: 'plateImg'
      },
      {
        date: '2026.05.28',
        title: '결핵 및 NTM 분자진단 연구 업데이트',
        summary: '결핵균과 비결핵항산균 진단을 위한 assay 연구와 검증 과정을 지속하고 있습니다.',
        visual: 'screenImg'
      }
    ],
    board: [
      {
        label: 'Notice',
        category: 'notice',
        title: 'MycoDx 웹사이트 오픈 안내',
        date: '2026.06.04',
        body: 'MycoDx 공식 웹사이트가 오픈했습니다.\n\n분자진단 플랫폼 연구개발 소식, 공지사항, 갤러리 콘텐츠를 순차적으로 업데이트할 예정입니다.',
        url: '#'
      },
      {
        label: 'Research',
        category: 'research',
        title: '결핵균 및 NTM 분자진단 assay 연구 업데이트',
        date: '2026.05.28',
        body: '결핵균 및 비결핵항산균 진단을 위한 assay 연구 업데이트입니다.\n\n임상 검증과 분석 정확도 향상을 목표로 주요 검출 프로세스를 지속적으로 고도화하고 있습니다.',
        url: '#'
      },
      {
        label: 'Event',
        category: 'event',
        title: '공동 연구 및 기술 검증 파트너십 문의 안내',
        date: '2026.05.12',
        body: '공동 연구, 기술 검증, 임상 협력과 관련된 파트너십 문의를 받고 있습니다.\n\n협력 제안은 문의 채널을 통해 접수해 주시면 담당자가 검토 후 안내드립니다.',
        url: '#'
      }
    ],
    gallery: [
      {
        title: 'Diagnostic Platform',
        visual: 'plateImg'
      },
      {
        title: 'Molecular Analysis',
        visual: 'screenImg'
      },
      {
        title: 'Research Workflow',
        visual: 'tubeImg'
      }
    ],
    team: [
      {
        order: 1,
        name: '없음',
        role: '없음',
        summary: '없음'
      },
      {
        order: 2,
        name: '없음',
        role: '없음',
        summary: '없음'
      },
      {
        order: 3,
        name: '없음',
        role: '없음',
        summary: '없음'
      }
    ]
  };
  let lastContent = null;

  const escapeHTML = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);

  const normalizePath = (path) => {
    if (!path) return '';
    const value = String(path).trim();
    if (!value) return '';
    if (/^(https?:)?\/\//.test(value) || value.startsWith('data:')) return value;
    if (value.startsWith('./') || value.startsWith('../')) return value;
    if (value.startsWith('/')) return `.${value}`;
    return `./${value}`;
  };

  const imageStyle = (image) => {
    const src = normalizePath(image);
    return src
      ? `style="background-image:url('${escapeHTML(src)}');background-size:cover;background-position:center;"`
      : '';
  };

  const makeSlug = (item, index) => {
    const base = `${item.date || index}-${item.title || 'news'}`;
    const slug = String(base)
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/^-+|-+$/g, '');

    return slug || `news-${index + 1}`;
  };

  const enrichNews = (items) => sortByDateDesc(items).map((item, index) => ({
    ...item,
    id: item.id || makeSlug(item, index)
  }));

  const newsDetailBody = (item) => {
    const body = Array.isArray(item.body) && item.body.length
      ? item.body
      : [
          item.summary,
          'MycoDx는 연구개발, 임상 검증, 분석 기술 고도화를 통해 현장에서 사용할 수 있는 분자진단 솔루션을 구축하고 있습니다.',
          '관련 연구와 협력 소식은 검증 단계에 맞춰 순차적으로 업데이트될 예정입니다.'
        ];

    return body.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join('');
  };

  const formatBody = (value, fallback = '') => {
    const text = Array.isArray(value) ? value.join('\n\n') : String(value || fallback || '');
    return text
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph) => `<p>${escapeHTML(paragraph).replace(/\n/g, '<br>')}</p>`)
      .join('');
  };

  const openBoardModal = (item) => {
    const modal = document.getElementById('boardLightbox');
    if (!modal) return;

    const label = modal.querySelector('[data-board-label]');
    const title = modal.querySelector('[data-board-title]');
    const date = modal.querySelector('[data-board-date]');
    const image = modal.querySelector('[data-board-image]');
    const body = modal.querySelector('[data-board-body]');

    if (label) label.textContent = item.label || 'Notice';
    if (title) title.textContent = item.title || '';
    if (date) date.textContent = item.date || '';
    if (image) {
      const src = normalizePath(item.image);
      image.hidden = !src;
      image.style.backgroundImage = src ? `url("${escapeHTML(src)}")` : '';
    }
    if (body) {
      body.innerHTML = formatBody(
        item.body,
        window.MycoDxI18n?.t('boardEmpty') || '상세 내용이 등록되면 이 영역에 표시됩니다.'
      );
    }

    modal.hidden = false;
    document.body.classList.add('lock');
  };

  const emptyState = (type) => {
    const data = emptyMessages[type];
    return `
      <div class="emptyState reveal isVisible">
        <span class="emptyIcon">${data.icon}</span>
        <h2>${data.title}</h2>
        <p>${data.body}</p>
      </div>
    `;
  };

  const sortByDateDesc = (items) => [...items].sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));

  const renderNews = (items) => {
    const target = document.getElementById('newsContent');
    if (!target) return;
    if (!items.length) {
      target.innerHTML = emptyState('news');
      return;
    }

    const newsItems = enrichNews(items);
    const params = new URLSearchParams(window.location.search);
    const activeId = params.get('id') || window.location.hash.replace(/^#/, '');
    const activeItem = newsItems.find((item) => item.id === activeId);

    if (activeItem) {
      target.innerHTML = `
        <article class="newsDetail reveal isVisible">
          <a class="newsBack" href="./news.html">${escapeHTML(window.MycoDxI18n?.t('boardBack') || '紐⑸줉?쇰줈')}</a>
          <div class="newsDetailVisual thumb newsPhoto ${activeItem.image ? '' : 'newsPhotoPlaceholder'}" ${imageStyle(activeItem.image)}></div>
          <div class="newsDetailBody">
            <time>${escapeHTML(activeItem.date)}</time>
            <h2>${escapeHTML(activeItem.title)}</h2>
            <div class="prose">
              ${newsDetailBody(activeItem)}
            </div>
          </div>
        </article>
      `;
      return;
    }

    const [lead, ...rest] = newsItems;
    target.innerHTML = `
      <div class="newsDigest">
        <a class="newsLeadCard" href="./news.html?id=${encodeURIComponent(lead.id)}">
          <div class="newsLeadVisual thumb newsPhoto ${lead.image ? '' : 'newsPhotoPlaceholder'}" ${imageStyle(lead.image)}></div>
          <div class="newsLeadBody">
            <time>${escapeHTML(lead.date)}</time>
            <h2>${escapeHTML(lead.title)}</h2>
            <p>${escapeHTML(lead.summary)}</p>
          </div>
        </a>
        <div class="newsDigestList">
          ${rest.map((item) => `
            <a class="newsDigestItem" href="./news.html?id=${encodeURIComponent(item.id)}">
              <div class="thumb newsPhoto ${item.image ? '' : 'newsPhotoPlaceholder'}" ${imageStyle(item.image)}></div>
              <div>
                <time>${escapeHTML(item.date)}</time>
                <h3>${escapeHTML(item.title)}</h3>
                <p>${escapeHTML(item.summary)}</p>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  };

  const renderBoard = (items) => {
    const target = document.getElementById('boardContent');
    if (!target) return;
    if (!items.length) {
      target.innerHTML = emptyState('board');
      return;
    }

    const boardItems = sortByDateDesc(items);
    target.innerHTML = `
      <div class="boardList">
        ${boardItems.map((item, index) => `
          <button type="button" class="boardRow" data-board-index="${index}" data-category="${escapeHTML(item.category || 'notice')}">
            <span class="badge">${escapeHTML(item.label || 'Notice')}</span>
            <strong>${escapeHTML(item.title)}</strong>
            <time>${escapeHTML(item.date)}</time>
          </button>
        `).join('')}
      </div>
    `;

    target.querySelectorAll('[data-board-index]').forEach((row) => {
      row.addEventListener('click', () => {
        openBoardModal(boardItems[Number(row.dataset.boardIndex)]);
      });
    });
  };

  const renderGallery = (items) => {
    const target = document.getElementById('galleryContent');
    if (!target) return;
    if (!items.length) {
      target.innerHTML = emptyState('gallery');
      return;
    }

    target.innerHTML = `
      <div class="galleryGrid pageGallery">
        ${items.map((item, index) => {
          const src = normalizePath(item.image);
          return `
            <button class="galleryCard ${index === 0 ? 'large' : ''}" type="button" data-title="${escapeHTML(item.title)}" data-image="${escapeHTML(src)}">
              ${src ? `<img class="galleryPhoto" src="${escapeHTML(src)}" alt="${escapeHTML(item.title)}" />` : `<span class="galleryMock ${escapeHTML(item.visual || 'plateImg')}"></span>`}
              <strong>${escapeHTML(item.title)}</strong>
            </button>
          `;
        }).join('')}
      </div>
    `;
  };

  const initials = (name) => String(name || 'M')
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'M';

  const currentLang = () => document.documentElement.dataset.lang || localStorage.getItem('mycodx-lang') || 'ko';
  const noneText = () => window.MycoDxI18n?.t('none') || (currentLang() === 'en' ? 'None' : '없음');
  const localizedTeamValue = (item, key) => {
    const lang = currentLang();
    const enKey = `${key}En`;
    const koKey = `${key}Ko`;
    const preferred = lang === 'en' ? item[enKey] : item[koKey];
    const fallback = item[key];
    const value = preferred || fallback || noneText();
    if (lang === 'en' && String(value).trim() === '없음') return noneText();
    return value;
  };

  const initTeamCarousel = (target) => {
    const track = target.querySelector('.teamTrack');
    if (!track || target.dataset.carouselReady === 'true') return;
    target.dataset.carouselReady = 'true';

    let isDragging = false;
    let startX = 0;
    let startOffset = 0;
    let offset = 0;
    let frame = 0;
    let lastTime = performance.now();
    const speed = 18;
    const loopWidth = () => Math.max(0, track.scrollWidth / 2);
    const normalizeOffset = () => {
      const width = loopWidth();
      if (!width) return;
      while (offset <= -width) offset += width;
      while (offset > 0) offset -= width;
    };
    const applyOffset = () => {
      normalizeOffset();
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
    };

    const tick = (time) => {
      const delta = Math.min(48, time - lastTime);
      lastTime = time;
      if (!isDragging) {
        offset -= (speed * delta) / 1000;
        applyOffset();
      }
      frame = requestAnimationFrame(tick);
    };

    target.addEventListener('pointerdown', (event) => {
      isDragging = true;
      startX = event.clientX;
      startOffset = offset;
      target.classList.add('isDragging');
      target.setPointerCapture?.(event.pointerId);
    });

    target.addEventListener('pointermove', (event) => {
      if (!isDragging) return;
      offset = startOffset + (event.clientX - startX);
      applyOffset();
    });

    const stopDrag = (event) => {
      if (!isDragging) return;
      isDragging = false;
      target.classList.remove('isDragging');
      target.releasePointerCapture?.(event.pointerId);
      applyOffset();
    };

    target.addEventListener('pointerup', stopDrag);
    target.addEventListener('pointercancel', stopDrag);
    target.addEventListener('mouseleave', () => {
      isDragging = false;
      target.classList.remove('isDragging');
      applyOffset();
    });

    frame = requestAnimationFrame(tick);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
      } else {
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      }
    });
  };

  const renderTeam = (items) => {
    const target = document.getElementById('teamContent');
    if (!target) return;

    const teamItems = Array.isArray(items) ? [...items] : [];
    teamItems.sort((a, b) => Number(a.order || 999) - Number(b.order || 999));
    const placeholders = [
      { order: 1, name: noneText(), role: noneText(), summary: noneText() },
      { order: 2, name: noneText(), role: noneText(), summary: noneText() },
      { order: 3, name: noneText(), role: noneText(), summary: noneText() },
      { order: 4, name: noneText(), role: noneText(), summary: noneText() }
    ];
    const visibleItems = teamItems.length ? teamItems : placeholders;

    const cardHTML = (item) => {
      const src = normalizePath(item.image);
      const hasImage = Boolean(src);
      const name = localizedTeamValue(item, 'name');
      const role = localizedTeamValue(item, 'role');
      const summary = localizedTeamValue(item, 'summary');

      return `
        <article class="teamCard">
          ${
            hasImage
              ? `<img class="teamPortrait" src="${escapeHTML(src)}" alt="${escapeHTML(name)}" />`
              : `<div class="teamPortrait teamPortraitFallback" aria-hidden="true">${escapeHTML(noneText())}</div>`
          }
          <div>
            <p class="teamRole">${escapeHTML(role)}</p>
            <h3>${escapeHTML(name)}</h3>
            <p>${escapeHTML(summary)}</p>
          </div>
        </article>
      `;
    };

    target.innerHTML = `
      <div class="teamTrack">
        ${visibleItems.map(cardHTML).join('')}
        ${visibleItems.map(cardHTML).join('')}
      </div>
    `;

    target.scrollLeft = 0;
    initTeamCarousel(target);
  };

  const renderAll = (content) => {
    lastContent = content;
    renderNews(Array.isArray(content.news) ? content.news : []);
    renderBoard(Array.isArray(content.board) ? content.board : []);
    renderGallery(Array.isArray(content.gallery) ? content.gallery : []);
    renderTeam(Array.isArray(content.team) ? content.team : []);
    document.dispatchEvent(new CustomEvent('content:rendered'));
  };

  const loadContent = async () => {
    try {
      const response = await fetch('./data/content.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('content.json??遺덈윭?ㅼ? 紐삵빐 window.MYCODX_CONTENT fallback???ъ슜?⑸땲??', error);
      return window.MYCODX_CONTENT || defaultContent;
    }
  };

  document.addEventListener('language:changed', () => {
    if (lastContent) renderAll(lastContent);
  });

  loadContent().then(renderAll);
})();
