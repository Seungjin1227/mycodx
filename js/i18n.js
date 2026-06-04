(function () {
  const messages = {
    ko: {
      skip: '본문으로 바로가기',
      navAbout: 'About',
      navNews: 'News',
      navBoard: 'Board',
      navGallery: 'Gallery',
      menuOpen: '모바일 메뉴 열기',
      heroTitle: '보이지 않는 결핵을, 가장 정확하게 드러내다',
      heroLead: 'MycoDx는 분자 진단 기술과 연구개발 역량을 기반으로 결핵균을 정밀하게 검출하고, 약제 내성을 신속하게 분석하는 진단 플랫폼을 개발합니다.',
      coreTechnology: 'Core Technology',
      developmentPipeline: 'Development Pipeline',
      aboutBody1: '동백꽃(Camellia)은 추운 겨울에도 선명한 붉은 꽃을 피우는 강인함의 상징입니다. MycoDx는 이 철학을 담아 보이지 않는 병원체를 정밀하게 검출하고, 가장 어려운 진단 문제를 해결하는 기술 기업입니다.',
      aboutBody2: '결핵균(Mycobacterium tuberculosis)과 비결핵항산균(NTM) 진단에 특화된 플랫폼을 개발하며, 기업부설연구소를 기반으로 임상 현장에서 신뢰할 수 있는 검증된 솔루션을 제공합니다.',
      tech1: '분자 기반 검출 기술로 결핵균의 DNA/RNA를 정밀하게 탐지합니다.',
      tech2: '약제 내성 유전자를 신속하게 분석해 치료 방향 설정을 지원합니다.',
      tech3: '연구실부터 임상 현장까지 확장 가능한 진단 플랫폼을 구축합니다.',
      pipelineDesc: '연구 기반 구축부터 상용화와 글로벌 전개까지 이어지는 개발 로드맵입니다.',
      pipeline1: '기업부설연구소 기반 핵심 기술 개발 및 진단 플랫폼 최적화.',
      pipeline2: '진단 플랫폼 확장과 상용화를 위한 적용 모델 개발.',
      pipeline3: '결핵 진단 기술의 글로벌 시장 진출과 파트너십 확대.',
      collabSub: '함께 만들어가는 진단 기술의 미래',
      medical: '의료기관',
      medicalDesc: '임상 시험 및 진단 플랫폼 검증',
      researchOrg: '연구기관',
      researchOrgDesc: '공동 연구 개발 및 기술 협력',
      industry: '산업 파트너',
      industryDesc: '상용화 및 글로벌 시장 진출',
      partnershipInquiry: '파트너십 문의',
      partnershipDesc: 'MycoDx와 함께 결핵 진단의 미래를 만들어갈 파트너를 찾습니다. 연구 협력, 임상 시험, 투자 관련 문의를 환영합니다.',
      contactDesc: '연구 협력, 임상 시험, 투자 및 사업화 관련 문의를 남겨주세요.',
      addressShort: '경상남도 창원시 의창구 용동로83번안길 7',
      namePlaceholder: '성함',
      messagePlaceholder: '문의 내용을 입력하세요',
      sending: '문의 내용을 전송하고 있습니다.',
      sent: '문의가 전송되었습니다.',
      failed: '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      endpointNeeded: '폼 전송 endpoint 설정이 필요합니다.',
      newsLead: 'MycoDx의 분자 진단 기술, 기업부설연구소 기반 연구개발, 임상 검증과 협력 소식을 정리합니다.',
      boardLead: '기업부설연구소 운영, 진단 플랫폼 검증, 공동 연구 및 파트너십 관련 안내를 모았습니다.',
      galleryLead: '분자 진단 플랫폼, 임상 검증, 연구 인프라와 협력 과정을 시각적으로 정리한 갤러리입니다.',
      boardBack: '목록으로',
      boardEmpty: '상세 내용이 등록되면 이 영역에 표시됩니다.',
      close: '닫기'
    },
    en: {
      skip: 'Skip to main content',
      navAbout: 'About',
      navNews: 'News',
      navBoard: 'Board',
      navGallery: 'Gallery',
      menuOpen: 'Open mobile menu',
      heroTitle: 'Revealing hidden tuberculosis with precision',
      heroLead: 'MycoDx develops diagnostic platforms that precisely detect Mycobacterium tuberculosis and rapidly analyze drug resistance through molecular diagnostics and R&D expertise.',
      coreTechnology: 'Core Technology',
      developmentPipeline: 'Development Pipeline',
      aboutBody1: 'The camellia is a symbol of resilience, blooming vividly even in the cold winter. Inspired by this philosophy, MycoDx precisely detects invisible pathogens and solves difficult diagnostic challenges.',
      aboutBody2: 'We develop platforms specialized for Mycobacterium tuberculosis and non-tuberculous mycobacteria diagnostics, delivering reliable solutions grounded in our certified corporate R&D center.',
      tech1: 'Precisely detects TB DNA/RNA with molecular detection technology.',
      tech2: 'Rapidly analyzes drug-resistance genes to support treatment decisions.',
      tech3: 'Builds scalable diagnostic platforms from the laboratory to clinical settings.',
      pipelineDesc: 'A development roadmap from research foundation to commercialization and global expansion.',
      pipeline1: 'Core technology development and diagnostic platform optimization through our corporate R&D center.',
      pipeline2: 'Application model development for platform expansion and commercialization.',
      pipeline3: 'Global market expansion and partnerships for tuberculosis diagnostic technology.',
      collabSub: 'Building the future of diagnostics together',
      medical: 'Medical Institutions',
      medicalDesc: 'Clinical trials and diagnostic platform evaluation',
      researchOrg: 'Research Institutes',
      researchOrgDesc: 'Joint R&D and technical collaboration',
      industry: 'Industry Partners',
      industryDesc: 'Commercialization and global market entry',
      partnershipInquiry: 'Partnership Inquiry',
      partnershipDesc: 'MycoDx is looking for partners to build the future of tuberculosis diagnostics together. We welcome inquiries about research collaboration, clinical trials, and investment.',
      contactDesc: 'Send us inquiries about research collaboration, clinical trials, investment, or commercialization.',
      addressShort: '7 Yongdong-ro 83beonan-gil, Uichang-gu, Changwon-si, Gyeongsangnam-do',
      namePlaceholder: 'Name',
      messagePlaceholder: 'Enter your message',
      sending: 'Sending your inquiry.',
      sent: 'Your inquiry has been sent.',
      failed: 'Submission failed. Please try again later.',
      endpointNeeded: 'Form endpoint setup is required.',
      newsLead: 'Updates on MycoDx molecular diagnostics, corporate R&D, clinical validation, and collaboration.',
      boardLead: 'Notices related to R&D center operations, diagnostic platform evaluation, joint research, and partnerships.',
      galleryLead: 'A visual archive of molecular diagnostic platforms, clinical validation, research infrastructure, and collaboration.',
      boardBack: 'Back to list',
      boardEmpty: 'Detailed content will appear here once it is registered.',
      close: 'Close'
    }
  };

  const getLanguage = () => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('lang');
    if (fromUrl === 'en' || fromUrl === 'ko') return fromUrl;
    return localStorage.getItem('mycodx-lang') || 'ko';
  };

  const setLanguage = (lang) => {
    const data = messages[lang] || messages.ko;
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    localStorage.setItem('mycodx-lang', lang);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = data[el.dataset.i18n];
      if (value) el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const value = data[el.dataset.i18nPlaceholder];
      if (value) el.setAttribute('placeholder', value);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const value = data[el.dataset.i18nAria];
      if (value) el.setAttribute('aria-label', value);
    });
    document.querySelectorAll('[data-i18n-status]').forEach((el) => {
      el.textContent = '';
    });
    document.querySelectorAll('[data-lang-switch]').forEach((button) => {
      const active = button.dataset.langSwitch === lang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    document.dispatchEvent(new CustomEvent('language:changed', { detail: { lang, messages: data } }));
  };

  window.MycoDxI18n = {
    messages,
    getLanguage,
    setLanguage,
    t(key) {
      return (messages[getLanguage()] || messages.ko)[key] || messages.ko[key] || key;
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-lang-switch]').forEach((button) => {
      button.addEventListener('click', () => setLanguage(button.dataset.langSwitch));
    });
    setLanguage(getLanguage());
  });
})();
