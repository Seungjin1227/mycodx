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
      body: '공지사항, 연구 업데이트, 행사 안내가 준비되면 이곳에 목록으로 게시됩니다.'
    },
    gallery: {
      icon: 'G',
      title: '등록된 갤러리 이미지가 없습니다',
      body: '연구 사진, 실험실 이미지, 행사 사진이 준비되면 이곳에 갤러리 형태로 게시됩니다.'
    }
  };

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
    return String(base)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9가-힣]+/g, '-')
      .replace(/^-+|-+$/g, '') || `news-${index + 1}`;
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
          'MycoDx는 연구개발, 임상 검증, 분석 기술 고도화를 통해 현장에서 활용 가능한 분자진단 솔루션을 구축하고 있습니다.',
          '관련 연구와 협력 소식은 검증 단계에 맞춰 순차적으로 업데이트할 예정입니다.'
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
    const body = modal.querySelector('[data-board-body]');

    if (label) label.textContent = item.label || 'Notice';
    if (title) title.textContent = item.title || '';
    if (date) date.textContent = item.date || '';
    if (body) {
      body.innerHTML = formatBody(
        item.body,
        '상세 내용이 등록되면 이 영역에 표시됩니다.'
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
          <a class="newsBack" href="./news.html">목록으로</a>
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

  const renderAll = (content) => {
    renderNews(Array.isArray(content.news) ? content.news : []);
    renderBoard(Array.isArray(content.board) ? content.board : []);
    renderGallery(Array.isArray(content.gallery) ? content.gallery : []);
    document.dispatchEvent(new CustomEvent('content:rendered'));
  };

  const loadContent = async () => {
    try {
      const response = await fetch('./data/content.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('content.json을 불러오지 못해 window.MYCODX_CONTENT fallback을 사용합니다.', error);
      return window.MYCODX_CONTENT || { news: [], board: [], gallery: [] };
    }
  };

  loadContent().then(renderAll);
})();
