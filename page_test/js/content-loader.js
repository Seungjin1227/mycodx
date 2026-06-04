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

    const [lead, ...rest] = sortByDateDesc(items);
    target.innerHTML = `
      <div class="newsDigest">
        <article class="newsLeadCard">
          <div class="newsLeadVisual thumb ${escapeHTML(lead.visual || 'researchThumb')}" ${imageStyle(lead.image)}></div>
          <div class="newsLeadBody">
            <time>${escapeHTML(lead.date)}</time>
            <h2>${escapeHTML(lead.title)}</h2>
            <p>${escapeHTML(lead.summary)}</p>
          </div>
        </article>
        <div class="newsDigestList">
          ${rest.map((item) => `
            <article class="newsDigestItem">
              <div class="thumb ${escapeHTML(item.visual || 'screenImg')}" ${imageStyle(item.image)}></div>
              <div>
                <time>${escapeHTML(item.date)}</time>
                <h3>${escapeHTML(item.title)}</h3>
                <p>${escapeHTML(item.summary)}</p>
              </div>
            </article>
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

    target.innerHTML = `
      <div class="boardList">
        ${sortByDateDesc(items).map((item) => `
          <a href="${escapeHTML(item.url || '#')}" class="boardRow" data-category="${escapeHTML(item.category || 'notice')}">
            <span class="badge">${escapeHTML(item.label || 'Notice')}</span>
            <strong>${escapeHTML(item.title)}</strong>
            <time>${escapeHTML(item.date)}</time>
          </a>
        `).join('')}
      </div>
    `;
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
