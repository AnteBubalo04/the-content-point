const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const lerp = (a, b, t) => a + (b - a) * t;
const damp = (current, target, smoothing, dt) =>
  lerp(current, target, 1 - Math.exp(-smoothing * dt));

const invLerp = (value, min, max) => {
  if (max === min) return 0;
  return clamp((value - min) / (max - min), 0, 1);
};

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const story = document.getElementById("story");
const stage = document.getElementById("stage");
const deviceStack = document.getElementById("deviceStack");
const demoSection = document.getElementById("demoSection");

const heroCopy = document.getElementById("heroCopy");
const endingCopy = document.getElementById("endingCopy");
const scrollIndicator = document.getElementById("scrollIndicator");
const infoPanel = document.getElementById("infoPanel");
const processPanel = document.getElementById("processPanel");
const mobileStoryCard = document.getElementById("mobileStoryCard");
const langToggle = document.getElementById("langToggle");

const heroBadge = document.getElementById("heroBadge");
const heroTech = document.getElementById("heroTech");

const infoKicker = document.getElementById("infoKicker");
const infoLeadline = document.getElementById("infoLeadline");
const infoTitle = document.getElementById("infoTitle");
const infoBody = document.getElementById("infoBody");
const infoDetail = document.getElementById("infoDetail");
const infoImplementation = document.getElementById("infoImplementation");
const infoTag = document.getElementById("infoTag");

const infoPillA = document.getElementById("infoPillA");
const infoPillB = document.getElementById("infoPillB");
const infoPillC = document.getElementById("infoPillC");

const processSummaryLabel = document.getElementById("processSummaryLabel");
const processSummary = document.getElementById("processSummary");
const miniPoints = document.getElementById("miniPoints");

const infoCopyMotion = document.getElementById("infoCopyMotion");
const processSummaryMotion = document.getElementById("processSummaryMotion");

const mobileCopyMotion = document.getElementById("mobileCopyMotion");
const mobileKicker = document.getElementById("mobileKicker");
const mobileTag = document.getElementById("mobileTag");
const mobileLeadline = document.getElementById("mobileLeadline");
const mobileTitle = document.getElementById("mobileTitle");
const mobileBody = document.getElementById("mobileBody");
const mobileDetail = document.getElementById("mobileDetail");
const mobilePillA = document.getElementById("mobilePillA");
const mobilePillB = document.getElementById("mobilePillB");
const mobilePillC = document.getElementById("mobilePillC");
const mobileSummaryLabel = document.getElementById("mobileSummaryLabel");
const mobileSummary = document.getElementById("mobileSummary");

const progressFill = document.getElementById("progressFill");
const mobileProgressFill = document.getElementById("mobileProgressFill");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const stepLabel1 = document.getElementById("stepLabel1");
const stepLabel2 = document.getElementById("stepLabel2");
const stepLabel3 = document.getElementById("stepLabel3");

const mobileStep1 = document.getElementById("mobileStep1");
const mobileStep2 = document.getElementById("mobileStep2");
const mobileStep3 = document.getElementById("mobileStep3");
const mobileStepLabel1 = document.getElementById("mobileStepLabel1");
const mobileStepLabel2 = document.getElementById("mobileStepLabel2");
const mobileStepLabel3 = document.getElementById("mobileStepLabel3");

const endingOverline = document.getElementById("endingOverline");
const endingStrong = document.getElementById("endingStrong");
const endingBody = document.getElementById("endingBody");
const scrollIndicatorText = document.getElementById("scrollIndicatorText");

const demoKicker = document.getElementById("demoKicker");
const demoTitle = document.getElementById("demoTitle");
const demoLead = document.getElementById("demoLead");
const demoHighlightTitle1 = document.getElementById("demoHighlightTitle1");
const demoHighlightTitle2 = document.getElementById("demoHighlightTitle2");
const demoHighlightTitle3 = document.getElementById("demoHighlightTitle3");
const demoHighlightText1 = document.getElementById("demoHighlightText1");
const demoHighlightText2 = document.getElementById("demoHighlightText2");
const demoHighlightText3 = document.getElementById("demoHighlightText3");

const formLabelName = document.getElementById("formLabelName");
const formLabelEmail = document.getElementById("formLabelEmail");
const formLabelCompany = document.getElementById("formLabelCompany");
const formLabelMessage = document.getElementById("formLabelMessage");
const formInputName = document.getElementById("formInputName");
const formInputEmail = document.getElementById("formInputEmail");
const formInputCompany = document.getElementById("formInputCompany");
const formInputMessage = document.getElementById("formInputMessage");
const demoSubmit = document.getElementById("demoSubmit");
const demoSubmitText = document.getElementById("demoSubmitText");

const plateV1 = document.getElementById("plateV1");
const plateV3 = document.getElementById("plateV3");
const phonePlate = document.getElementById("phonePlate");
const phoneHalo = document.getElementById("phoneHalo");

const viewport1 = document.getElementById("viewport1");
const viewport2 = document.getElementById("viewport2");
const viewport3 = document.getElementById("viewport3");

const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");
const video3 = document.getElementById("video3");

const metaDescription = document.querySelector('meta[name="description"]');

const DESKTOP_STORY_STATE_KEYS = [
  "hero",
  "v1Focus",
  "v2Focus",
  "v3Focus",
  "ending",
];

const MOBILE_STORY_STATE_KEYS = [
  "hero",
  "v1Focus",
  "v1Detail",
  "v2Focus",
  "v2Detail",
  "v3Focus",
  "v3Detail",
  "ending",
];

const TUNE = {
  scrollSmoothing: prefersReducedMotion ? 40 : 9.2,
  snapDurationDesktop: 980,
  snapDurationMobile: 1060,
  snapCooldown: 180,
  touchThreshold: 18,
  wheelThreshold: 4,
  copySwapDelay: prefersReducedMotion ? 0 : 120,
};

const I18N = {
  en: {
    docTitle: "The Content Point — Premium Experience Showcase",
    metaDescription:
      "A premium scroll-driven showcase of guest activation, branded content creation, and seamless delivery.",
    langButton: "HR",
    langAria: "Prebaci na hrvatski",
    heroBadge: "Offline attention. Multi-brand growth.",
    heroTech: "Event Conversion & Collaboration Technology",
    processSummaryLabel: "System logic",
    mobileSummaryLabel: "System logic",
    scroll: "Scroll",
    endingOverline: "From attention to shared growth",
    endingStrong: "Your Guest = Media Channel. Use it",
    endingBody:
      "The Content Point transforms event energy into branded content, amplified reach and measurable outcomes for every partner involved.",
    steps: ["Activation", "Creation", "Delivery"],
    demoKicker: "Next step",
    demoTitle: "See it on your brand — and your partners",
    demoLead:
      "Book a live walkthrough and see how The Content Point turns guest attention into shared branded distribution, sponsor value and measurable business results.",
    demoHighlights: [
      {
        title: "Activation",
        text: "Capture attention and onboard guests into a multi-brand journey",
      },
      {
        title: "Creation",
        text: "Turn every guest moment into co-branded, sponsor-ready content",
      },
      {
        title: "Delivery",
        text: "Drive shares, rewards, partner activations and measurable outcomes",
      },
    ],
    form: {
      name: "Name",
      email: "Email",
      company: "Company",
      message: "Message",
      namePlaceholder: "Your full name",
      emailPlaceholder: "you@company.com",
      companyPlaceholder: "Company name",
      messagePlaceholder: "Tell us what you want to see in the demo",
      submit: "Book a Demo",
    },
    copy: {
      activation: {
        key: "activation",
        kicker: "Step 01",
        leadline:
          "Turn real-world attention into a shared entry point for brands.",
        title: "Scan. Enter. Engage.",
        body: "A simple scan pulls guests into a branded experience designed not just for one brand — but for multiple partners within the same moment.",
        detail:
          "Every physical interaction becomes a structured digital entry where brands, sponsors and campaigns can plug into the same guest journey.",
        implementation:
          "Entry logic, brand hierarchy, sponsor visibility and reward paths are fully configurable per event, partner or activation.",
        tag: "Multi-brand entry",
        pills: ["Instant entry", "High intent", "Sponsor-ready"],
        miniPoints: ["Physical trigger", "QR entry", "Brand + sponsor entry"],
        summary:
          "One guest interaction becomes a shared access point for multiple brands.",
      },
      creation: {
        key: "creation",
        kicker: "Step 02",
        leadline: "Turn every guest moment into a shared branded asset.",
        title: "One moment. Multiple brands.",
        body: "Each captured moment becomes premium content where multiple brands can appear together — seamlessly integrated into one output.",
        detail:
          "Primary brand, event identity and sponsor brands can all be embedded into the same animation, visual layer and narrative — without breaking the experience.",
        implementation:
          "Brand roles, sponsor visibility, co-branding rules and campaign logic are fully configurable across events, partners and activations.",
        tag: "Collaborative content",
        pills: [
          "Multi-brand output",
          "Sponsor exposure",
          "Share amplification",
        ],
        miniPoints: [
          "Primary brand",
          "Sponsor integration",
          "Co-branded asset",
        ],
        summary:
          "One guest moment becomes a distribution asset for multiple brands at once.",
      },
      delivery: {
        key: "delivery",
        kicker: "Step 03",
        leadline:
          "Turn shared content into shared value and measurable action.",
        title: "Share. Reward. Convert.",
        body: "Content is delivered instantly — unlocking sharing, partner rewards and the next step in the guest journey.",
        detail:
          "Guests can engage with one or multiple brands through rewards, offers or actions — while each partner benefits from visibility, clicks and measurable outcomes.",
        implementation:
          "Reward logic, sponsor activation, CTA paths and tracking can be structured per brand, partner or campaign objective.",
        tag: "Partner conversion layer",
        pills: ["Reward-driven", "Multi-brand CTA", "Trackable results"],
        miniPoints: [
          "Shared distribution",
          "Sponsor reward",
          "Measured action",
        ],
        summary:
          "One interaction creates value for the guest, the host and every partner involved.",
      },
    },
  },
  hr: {
    docTitle: "The Content Point — Premium Experience Showcase",
    metaDescription:
      "Premium prikaz iskustva vođen skrolanjem za aktivaciju gostiju, izradu brendiranog sadržaja i trenutnu isporuku.",
    langButton: "EN",
    langAria: "Switch to English",
    heroBadge: "Pažnja uživo. Rast za više brendova.",
    heroTech: "Tehnologija za konverziju i kolaboracije",
    processSummaryLabel: "Logika sustava",
    mobileSummaryLabel: "Logika sustava",
    scroll: "Skrolaj",
    endingOverline: "Od pažnje do zajedničkog rasta",
    endingStrong:
      "Pretvorite svakog gosta u distribucijski kanal za više brendova.",
    endingBody:
      "The Content Point pretvara energiju eventa u co-brand sadržaj, veći doseg i mjerljive rezultate za sve uključene partnere.",
    steps: ["Aktivacija", "Izrada", "Isporuka"],
    demoKicker: "Sljedeći korak",
    demoTitle: "Pogledajte ga na svom brendu — i partnerima",
    demoLead:
      "Rezervirajte demo i vidite kako The Content Point pretvara pažnju gostiju u zajedničku distribuciju, vrijednost za sponzore i mjerljive rezultate.",
    demoHighlights: [
      {
        title: "Aktivacija",
        text: "Privucite pažnju i uvedite goste u multi-brand iskustvo",
      },
      {
        title: "Izrada",
        text: "Pretvorite svaki trenutak u co-brand sadržaj spreman za sponzore",
      },
      {
        title: "Isporuka",
        text: "Pokrenite share, nagrade, partner aktivacije i mjerljive rezultate",
      },
    ],
    form: {
      name: "Ime",
      email: "Email",
      company: "Tvrtka",
      message: "Poruka",
      namePlaceholder: "Vaše ime i prezime",
      emailPlaceholder: "vi@tvrtka.com",
      companyPlaceholder: "Naziv tvrtke",
      messagePlaceholder: "Recite nam što želite vidjeti u demu",
      submit: "Rezervirajte demo",
    },
    copy: {
      activation: {
        key: "activation",
        kicker: "Korak 01",
        leadline: "Pretvorite pažnju uživo u zajednički ulaz za više brendova.",
        title: "Skeniraj. Uđi. Aktiviraj se.",
        body: "Jedno skeniranje uvodi gosta u iskustvo koje nije vezano za jedan brend — već za više partnera unutar istog trenutka.",
        detail:
          "Svaka fizička interakcija postaje digitalni ulaz u kojem brendovi, sponzori i kampanje mogu sudjelovati u istom journeyu.",
        implementation:
          "Logika ulaza, hijerarhija brendova, vidljivost sponzora i reward flow mogu se potpuno prilagoditi eventu i partnerima.",
        tag: "Multi-brand entry",
        pills: ["Trenutan ulaz", "Visoka namjera", "Spremno za sponzore"],
        miniPoints: ["Fizički trigger", "QR ulaz", "Brend + sponzor"],
        summary: "Jedna interakcija otvara prostor za više brendova.",
      },
      creation: {
        key: "creation",
        kicker: "Korak 02",
        leadline:
          "Pretvorite svaki trenutak gosta u zajednički brendirani asset.",
        title: "Jedan trenutak. Više brendova.",
        body: "Svaki trenutak postaje premium sadržaj u kojem se više brendova pojavljuje zajedno — prirodno integrirano u isti output.",
        detail:
          "Glavni brend, identitet eventa i sponzori mogu biti ugrađeni u istu animaciju, vizual i priču — bez narušavanja iskustva.",
        implementation:
          "Uloge brendova, vidljivost sponzora i pravila co-brandinga mogu se potpuno prilagoditi kampanji ili partnerima.",
        tag: "Collaborative content",
        pills: ["Više brendova", "Vidljivost sponzora", "Jači reach"],
        miniPoints: ["Glavni brend", "Sponzor integracija", "Co-brand asset"],
        summary:
          "Jedan trenutak postaje distribucijski asset za više brendova.",
      },
      delivery: {
        key: "delivery",
        kicker: "Korak 03",
        leadline:
          "Pretvorite zajednički sadržaj u zajedničku vrijednost i akciju.",
        title: "Podijeli. Nagradi. Konvertiraj.",
        body: "Sadržaj se isporučuje odmah — otvara share, nagrade partnera i sljedeći korak u journeyu gosta.",
        detail:
          "Gost može ostvariti nagradu ili akciju s jednim ili više brendova — dok svaki partner dobiva vidljivost, klikove i mjerljive rezultate.",
        implementation:
          "Reward logika, aktivacija sponzora, CTA putanje i tracking mogu se konfigurirati po brendu ili partneru.",
        tag: "Partner conversion",
        pills: ["Reward-driven", "Više CTA-ova", "Mjerljivo"],
        miniPoints: [
          "Zajednička distribucija",
          "Nagrada sponzora",
          "Mjerljiva akcija",
        ],
        summary:
          "Jedna interakcija stvara vrijednost za gosta, organizatora i partnere.",
      },
    },
  },
};

const CROP = {
  v1Start: { x: 0, y: 0, w: 1080, h: 1920 },
  v1Hero: { x: 124, y: 0, w: 832, h: 1668 },

  v2Start: { x: 604, y: 0, w: 712, h: 1080 },
  v2Hero: { x: 620, y: 0, w: 680, h: 1080 },

  v3Start: { x: 0, y: 0, w: 1080, h: 1920 },
};

const DESKTOP_POSES = {
  hero: { y: 42, scale: 0.88 },
  v1Focus: { y: -2, scale: 1.04 },
  v2Focus: { y: -2, scale: 1.04 },
  v3Focus: { y: -2, scale: 1.04 },
  ending: { y: -2, scale: 1.04 },
};

const MOBILE_POSES = {
  hero: { y: 4, scale: 1.02 },
  v1Focus: { y: -12, scale: 1.08 },
  v1Detail: { y: -8, scale: 0.64 },
  v2Focus: { y: -12, scale: 1.08 },
  v2Detail: { y: -8, scale: 0.64 },
  v3Focus: { y: -12, scale: 1.08 },
  v3Detail: { y: -8, scale: 0.64 },
  ending: { y: -8, scale: 0.64 },
};

const state = {
  rafId: 0,
  resizeRaf: 0,
  mobileReadyRafA: 0,
  mobileReadyRafB: 0,
  lastTime: performance.now(),
  targetProgress: 0,
  smoothProgress: 0,
  sceneVisible: true,
  currentLanguage: "en",
  currentCopySignature: "",
  pendingCopySignature: "",
  copySwapTimer: 0,
  isCopyAnimating: false,
  lastRenderKey: "",
  lastLogicalCopyKey: "",
  lastMobileLayoutKey: "",
};

const snapState = {
  isAnimating: false,
  animationFrame: 0,
  currentIndex: 0,
  requestedIndex: 0,
  lockUntil: 0,

  wheelLocked: false,
  wheelTimer: 0,

  touchActive: false,
  touchStartY: 0,
  touchTriggered: false,

  releaseSnapTimer: 0,
};

const layoutCache = {
  isMobile: false,
};

function getStoryStateKeys() {
  return layoutCache.isMobile
    ? MOBILE_STORY_STATE_KEYS
    : DESKTOP_STORY_STATE_KEYS;
}

function getStoryStationCount() {
  return getStoryStateKeys().length;
}

function getGlobalDemoIndex() {
  return getStoryStationCount();
}

function getLocalePack() {
  return I18N[state.currentLanguage] || I18N.en;
}

function getCopySet() {
  return getLocalePack().copy;
}

function setTransform(el, x, y, scale) {
  if (!el) return;
  el.style.transform =
    `translate3d(${x.toFixed(3)}px, ${y.toFixed(3)}px, 0) ` +
    `scale(${scale.toFixed(5)})`;
}

function setOpacity(el, value) {
  if (!el) return;
  el.style.opacity = String(clamp(value, 0, 1));
}

function setVisibility(el, visible) {
  if (!el) return;
  el.style.visibility = visible ? "visible" : "hidden";
}

function getVideoSource(video, fallback) {
  return {
    width: video?.videoWidth || fallback.width,
    height: video?.videoHeight || fallback.height,
  };
}

function lerpRect(a, b, t) {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    w: lerp(a.w, b.w, t),
    h: lerp(a.h, b.h, t),
  };
}

function normalizeCropRect(rect, source, options = {}) {
  const sourceW = source?.width || 0;
  const sourceH = source?.height || 0;

  let next = {
    x: rect.x,
    y: rect.y,
    w: rect.w,
    h: rect.h,
  };

  if (options.snapRectToSourcePixels) {
    next.x = Math.round(next.x);
    next.y = Math.round(next.y);
    next.w = Math.round(next.w);
    next.h = Math.round(next.h);
  }

  next.w = clamp(next.w, 1, sourceW || next.w);
  next.h = clamp(next.h, 1, sourceH || next.h);
  next.x = clamp(next.x, 0, Math.max((sourceW || next.x + next.w) - next.w, 0));
  next.y = clamp(next.y, 0, Math.max((sourceH || next.y + next.h) - next.h, 0));

  return next;
}

function setVideoCrop(video, viewportEl, rect, source, options = {}) {
  if (!video || !viewportEl || !rect || !source) return;

  const viewportW = viewportEl.clientWidth;
  const viewportH = viewportEl.clientHeight;
  if (!viewportW || !viewportH) return;

  const crop = normalizeCropRect(rect, source, options);
  const dpr = Math.max(window.devicePixelRatio || 1, 1);

  const overscan = options.overscan ?? 1.002;
  const hairlineFixX = options.hairlineFixX ?? 0;
  const hairlineFixY = options.hairlineFixY ?? 0;
  const snapTransformToDevicePixels =
    options.snapTransformToDevicePixels ?? false;
  const snapScaleToDevicePixels = options.snapScaleToDevicePixels ?? false;

  let scale = Math.max(viewportW / crop.w, viewportH / crop.h) * overscan;

  if (snapScaleToDevicePixels) {
    scale = Math.round(scale * dpr * 1000) / (dpr * 1000);
  }

  let tx = (viewportW - crop.w * scale) / 2 - crop.x * scale - hairlineFixX;
  let ty = (viewportH - crop.h * scale) / 2 - crop.y * scale - hairlineFixY;

  if (snapTransformToDevicePixels) {
    tx = Math.round(tx * dpr) / dpr;
    ty = Math.round(ty * dpr) / dpr;
  }

  video.style.width = `${source.width}px`;
  video.style.height = `${source.height}px`;
  video.style.transform =
    `translate3d(${tx.toFixed(4)}px, ${ty.toFixed(4)}px, 0) ` +
    `scale(${scale.toFixed(6)})`;
}

function getVideo3CropRect(source) {
  const sourceW = source?.width || 1080;
  const sourceH = source?.height || 1920;

  if (sourceW > sourceH) {
    return {
      x: Math.round(sourceW * 0.365),
      y: Math.round(sourceH * 0.11),
      w: Math.round(sourceW * 0.27),
      h: Math.round(sourceH * 0.81),
    };
  }

  return {
    x: Math.round(sourceW * 0.09),
    y: Math.round(sourceH * 0.055),
    w: Math.round(sourceW * 0.82),
    h: Math.round(sourceH * 0.89),
  };
}

function getCopyAnimationNodes() {
  return layoutCache.isMobile
    ? [mobileCopyMotion]
    : [infoCopyMotion, processSummaryMotion];
}

function clearCopySwapTimer() {
  if (state.copySwapTimer) {
    clearTimeout(state.copySwapTimer);
    state.copySwapTimer = 0;
  }
}

function clearMobileReadyFrames() {
  if (state.mobileReadyRafA) {
    cancelAnimationFrame(state.mobileReadyRafA);
    state.mobileReadyRafA = 0;
  }
  if (state.mobileReadyRafB) {
    cancelAnimationFrame(state.mobileReadyRafB);
    state.mobileReadyRafB = 0;
  }
}

function setMobileStoryReady(isReady) {
  if (!document.body) return;
  document.body.classList.toggle(
    "mobile-story-ready",
    Boolean(isReady && layoutCache.isMobile),
  );
}

function resetMobileStoryReady() {
  clearMobileReadyFrames();
  setMobileStoryReady(false);
}

function queueMobileStoryReady() {
  clearMobileReadyFrames();

  if (!layoutCache.isMobile) {
    setMobileStoryReady(false);
    return;
  }

  state.mobileReadyRafA = requestAnimationFrame(() => {
    state.mobileReadyRafA = 0;
    state.mobileReadyRafB = requestAnimationFrame(() => {
      state.mobileReadyRafB = 0;
      setMobileStoryReady(true);
    });
  });
}

function animateSwap(nodes, onMidpoint, onComplete) {
  if (prefersReducedMotion) {
    onMidpoint();
    onComplete?.();
    return;
  }

  nodes.forEach((node) => node?.classList.add("is-changing"));

  state.copySwapTimer = window.setTimeout(() => {
    onMidpoint();

    requestAnimationFrame(() => {
      nodes.forEach((node) => node?.classList.remove("is-changing"));

      window.setTimeout(() => {
        onComplete?.();
      }, 220);
    });
  }, TUNE.copySwapDelay);
}

function renderMiniPoints(items = []) {
  if (!miniPoints) return;
  miniPoints.innerHTML = items
    .map((item) => `<span class="mini-point">${item}</span>`)
    .join("");
}

function setMobileCardStep(key) {
  if (!mobileStoryCard) return;
  mobileStoryCard.dataset.step = key || "activation";
}

function setActiveStep(activeIndex) {
  [step1, step2, step3].forEach((step, index) => {
    step?.classList.toggle("is-active", index === activeIndex);
  });

  [mobileStep1, mobileStep2, mobileStep3].forEach((step, index) => {
    step?.classList.toggle("is-active", index === activeIndex);
  });
}

function applyGlobalLanguage() {
  const locale = getLocalePack();

  document.documentElement.lang = state.currentLanguage === "hr" ? "hr" : "en";
  document.title = locale.docTitle;

  if (metaDescription) {
    metaDescription.setAttribute("content", locale.metaDescription);
  }

  if (langToggle) {
    langToggle.textContent = locale.langButton;
    langToggle.setAttribute("aria-label", locale.langAria);
    langToggle.setAttribute("title", locale.langAria);
  }

  if (heroBadge) heroBadge.textContent = locale.heroBadge;
  if (heroTech) heroTech.textContent = locale.heroTech;

  if (processSummaryLabel)
    processSummaryLabel.textContent = locale.processSummaryLabel;
  if (mobileSummaryLabel)
    mobileSummaryLabel.textContent = locale.mobileSummaryLabel;

  if (stepLabel1) stepLabel1.textContent = locale.steps[0];
  if (stepLabel2) stepLabel2.textContent = locale.steps[1];
  if (stepLabel3) stepLabel3.textContent = locale.steps[2];

  if (mobileStepLabel1) mobileStepLabel1.textContent = locale.steps[0];
  if (mobileStepLabel2) mobileStepLabel2.textContent = locale.steps[1];
  if (mobileStepLabel3) mobileStepLabel3.textContent = locale.steps[2];

  if (endingOverline) endingOverline.textContent = locale.endingOverline;
  if (endingStrong) endingStrong.textContent = locale.endingStrong;
  if (endingBody) endingBody.textContent = locale.endingBody;

  if (scrollIndicatorText) scrollIndicatorText.textContent = locale.scroll;

  if (demoKicker) demoKicker.textContent = locale.demoKicker;
  if (demoTitle) demoTitle.textContent = locale.demoTitle;
  if (demoLead) demoLead.textContent = locale.demoLead;

  if (demoHighlightTitle1)
    demoHighlightTitle1.textContent = locale.demoHighlights[0].title;
  if (demoHighlightTitle2)
    demoHighlightTitle2.textContent = locale.demoHighlights[1].title;
  if (demoHighlightTitle3)
    demoHighlightTitle3.textContent = locale.demoHighlights[2].title;

  if (demoHighlightText1)
    demoHighlightText1.textContent = locale.demoHighlights[0].text;
  if (demoHighlightText2)
    demoHighlightText2.textContent = locale.demoHighlights[1].text;
  if (demoHighlightText3)
    demoHighlightText3.textContent = locale.demoHighlights[2].text;

  if (formLabelName) formLabelName.textContent = locale.form.name;
  if (formLabelEmail) formLabelEmail.textContent = locale.form.email;
  if (formLabelCompany) formLabelCompany.textContent = locale.form.company;
  if (formLabelMessage) formLabelMessage.textContent = locale.form.message;

  if (formInputName) formInputName.placeholder = locale.form.namePlaceholder;
  if (formInputEmail) formInputEmail.placeholder = locale.form.emailPlaceholder;
  if (formInputCompany)
    formInputCompany.placeholder = locale.form.companyPlaceholder;
  if (formInputMessage)
    formInputMessage.placeholder = locale.form.messagePlaceholder;

  if (demoSubmit) demoSubmit.setAttribute("aria-label", locale.form.submit);
  if (demoSubmitText) demoSubmitText.textContent = locale.form.submit;
}

function applyCopyToDOM(content) {
  if (!content) return;

  infoKicker.textContent = content.kicker;
  infoLeadline.textContent = content.leadline;
  infoTitle.textContent = content.title;
  infoBody.textContent = content.body;
  infoDetail.textContent = content.detail;
  infoImplementation.textContent = content.implementation;
  infoTag.textContent = content.tag;

  infoPillA.textContent = content.pills?.[0] || "";
  infoPillB.textContent = content.pills?.[1] || "";
  infoPillC.textContent = content.pills?.[2] || "";

  processSummary.textContent = content.summary;
  renderMiniPoints(content.miniPoints || []);

  mobileKicker.textContent = content.kicker;
  mobileTag.textContent = content.tag;
  mobileLeadline.textContent = content.leadline;
  mobileTitle.textContent = content.title;
  mobileBody.textContent = content.body;
  mobileDetail.textContent = content.detail;
  mobilePillA.textContent = content.pills?.[0] || "";
  mobilePillB.textContent = content.pills?.[1] || "";
  mobilePillC.textContent = content.pills?.[2] || "";
  mobileSummary.textContent = content.summary;

  setMobileCardStep(content.key);
}

function getCopySignature(content) {
  return `${state.currentLanguage}:${content.key}`;
}

function flushPendingCopy() {
  if (
    !state.pendingCopySignature ||
    state.pendingCopySignature === state.currentCopySignature
  ) {
    state.pendingCopySignature = "";
    state.isCopyAnimating = false;
    return;
  }

  const signature = state.pendingCopySignature;
  state.pendingCopySignature = "";

  const [lang, key] = signature.split(":");
  const locale = I18N[lang] || I18N.en;
  const content = locale.copy[key];

  if (!content) {
    state.isCopyAnimating = false;
    return;
  }

  const finish = () => {
    state.currentCopySignature = signature;
    state.isCopyAnimating = false;

    if (
      state.pendingCopySignature &&
      state.pendingCopySignature !== state.currentCopySignature
    ) {
      flushPendingCopy();
    }
  };

  const apply = () => applyCopyToDOM(content);

  if (prefersReducedMotion) {
    apply();
    finish();
    return;
  }

  state.isCopyAnimating = true;
  clearCopySwapTimer();
  animateSwap(getCopyAnimationNodes(), apply, finish);
}

function setInfoCopy(content, force = false) {
  if (!content) return;

  const signature = getCopySignature(content);

  if (force) {
    clearCopySwapTimer();
    state.pendingCopySignature = "";
    state.isCopyAnimating = false;
    applyCopyToDOM(content);
    state.currentCopySignature = signature;
    return;
  }

  if (signature === state.currentCopySignature && !state.isCopyAnimating) {
    return;
  }

  state.pendingCopySignature = signature;

  if (state.isCopyAnimating) return;
  flushPendingCopy();
}

function ensureAmbientPlayback(video) {
  if (!video) return;
  video.muted = true;
  video.playsInline = true;
  video.loop = true;

  const playPromise = video.play();
  if (playPromise && typeof playPromise.then === "function") {
    playPromise.catch(() => {});
  }
}

function pauseVideo(video) {
  if (!video || video.paused) return;
  try {
    video.pause();
  } catch (_) {}
}

function updateLayoutCache() {
  layoutCache.isMobile = window.innerWidth <= 980;
}

function updateStoryHeight() {
  story.style.height = `${getStoryStationCount() * 100}vh`;
}

function getStoryMetrics() {
  const rect = story.getBoundingClientRect();
  const top = window.scrollY + rect.top;
  const maxScroll = Math.max(story.offsetHeight - window.innerHeight, 1);
  return {
    top,
    maxScroll,
    startY: top,
    endY: top + maxScroll,
  };
}

function getStoryProgress() {
  const metrics = getStoryMetrics();
  const current = clamp(window.scrollY - metrics.startY, 0, metrics.maxScroll);
  return clamp(current / metrics.maxScroll, 0, 1);
}

function progressToPageY(progress) {
  const metrics = getStoryMetrics();
  return metrics.startY + metrics.maxScroll * clamp(progress, 0, 1);
}

function getStoryStationPageY(index) {
  const count = getStoryStationCount();
  const clamped = clamp(index, 0, count - 1);
  return progressToPageY(clamped / (count - 1));
}

function getDemoStationPageY() {
  return demoSection.offsetTop;
}

function getGlobalStationPageY(index) {
  const demoIndex = getGlobalDemoIndex();
  if (index < demoIndex) {
    return getStoryStationPageY(index);
  }
  return getDemoStationPageY();
}

function getClosestGlobalStationIndex() {
  const y = window.scrollY;
  const maxIndex = getGlobalDemoIndex();
  let closestIndex = 0;
  let closestDistance = Infinity;

  for (let i = 0; i <= maxIndex; i += 1) {
    const stationY = getGlobalStationPageY(i);
    const distance = Math.abs(y - stationY);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  }

  return closestIndex;
}

function syncCurrentStationFromScroll() {
  const index = getClosestGlobalStationIndex();
  snapState.currentIndex = index;
  snapState.requestedIndex = index;
}

function isSnapRegionActive() {
  const storyMetrics = getStoryMetrics();
  const y = window.scrollY;
  const lowerBound = storyMetrics.startY - 2;
  const upperBound = storyMetrics.endY - 2;

  return y >= lowerBound && y <= upperBound;
}

function cancelSnapAnimation() {
  if (snapState.animationFrame) {
    cancelAnimationFrame(snapState.animationFrame);
    snapState.animationFrame = 0;
  }
  snapState.isAnimating = false;
}

function animateWindowScrollTo(targetY, duration = 900, onDone) {
  cancelSnapAnimation();

  const startY = window.scrollY;
  const delta = targetY - startY;

  if (Math.abs(delta) < 1 || prefersReducedMotion) {
    window.scrollTo(0, targetY);
    snapState.isAnimating = false;
    onDone?.();
    return;
  }

  snapState.isAnimating = true;
  const startTime = performance.now();

  const step = (now) => {
    const t = clamp((now - startTime) / duration, 0, 1);
    const eased = easeInOutCubic(t);
    window.scrollTo(0, startY + delta * eased);
    state.lastRenderKey = "";

    if (t < 1) {
      snapState.animationFrame = requestAnimationFrame(step);
      return;
    }

    window.scrollTo(0, targetY);
    snapState.animationFrame = 0;
    snapState.isAnimating = false;
    state.lastRenderKey = "";
    onDone?.();
  };

  snapState.animationFrame = requestAnimationFrame(step);
}

function snapToIndex(index, options = {}) {
  const maxIndex = getGlobalDemoIndex();
  const clampedIndex = clamp(index, 0, maxIndex);
  const targetY = getGlobalStationPageY(clampedIndex);
  const duration =
    options.duration ??
    (layoutCache.isMobile ? TUNE.snapDurationMobile : TUNE.snapDurationDesktop);

  snapState.requestedIndex = clampedIndex;
  snapState.lockUntil = performance.now() + duration + TUNE.snapCooldown;
  document.body.classList.add("is-snap-locked");

  if (prefersReducedMotion || options.instant) {
    cancelSnapAnimation();
    window.scrollTo(0, targetY);
    snapState.currentIndex = clampedIndex;
    snapState.requestedIndex = clampedIndex;
    state.lastRenderKey = "";
    document.body.classList.remove("is-snap-locked");
    return;
  }

  animateWindowScrollTo(targetY, duration, () => {
    snapState.currentIndex = clampedIndex;
    snapState.requestedIndex = clampedIndex;
    document.body.classList.remove("is-snap-locked");
  });
}

function snapToNearestStation() {
  if (!isSnapRegionActive()) return;
  if (snapState.isAnimating) return;
  snapToIndex(getClosestGlobalStationIndex(), {
    duration: layoutCache.isMobile ? 720 : 680,
  });
}

function getNextSnapIndex(direction) {
  const baseIndex = snapState.isAnimating
    ? snapState.requestedIndex
    : snapState.currentIndex;
  const maxIndex = getGlobalDemoIndex();

  if (direction > 0) return clamp(baseIndex + 1, 0, maxIndex);
  if (direction < 0) return clamp(baseIndex - 1, 0, maxIndex);
  return baseIndex;
}

function releaseWheelLockLater() {
  if (snapState.wheelTimer) clearTimeout(snapState.wheelTimer);
  snapState.wheelTimer = window.setTimeout(() => {
    snapState.wheelLocked = false;
  }, 640);
}

function nudgeFirstFrame(video) {
  if (!video) return;

  const applyFrameHack = () => {
    try {
      if (video.readyState >= 2 && video.currentTime === 0) {
        video.currentTime = 0.033;
      }
    } catch (_) {}
  };

  video.addEventListener("loadeddata", applyFrameHack, { passive: true });
  video.addEventListener("canplay", applyFrameHack, { passive: true });
}

function primeVideo(video) {
  if (!video) return;

  video.muted = true;
  video.playsInline = true;
  video.loop = true;
  video.preload = "auto";

  nudgeFirstFrame(video);

  const onReady = () => {
    ensureAmbientPlayback(video);
    state.lastRenderKey = "";
  };

  video.addEventListener("loadedmetadata", onReady, { passive: true });
  video.addEventListener("loadeddata", onReady, { passive: true });
  video.addEventListener("canplay", onReady, { passive: true });

  try {
    video.load();
  } catch (_) {}

  ensureAmbientPlayback(video);
}

function getStorySegment(progress) {
  const keys = getStoryStateKeys();
  const stationCount = keys.length;
  const scaled = clamp(progress, 0, 1) * (stationCount - 1);
  const index = clamp(Math.floor(scaled), 0, stationCount - 2);
  const local = clamp(scaled - index, 0, 1);

  return {
    index,
    local,
    fromKey: keys[index],
    toKey: keys[index + 1],
  };
}

function getPose(key) {
  return layoutCache.isMobile ? MOBILE_POSES[key] : DESKTOP_POSES[key];
}

function getStepIndexForState(key) {
  if (key === "hero" || key === "v1Focus" || key === "v1Detail") return 0;
  if (key === "v2Focus" || key === "v2Detail") return 1;
  if (key === "v3Focus" || key === "v3Detail" || key === "ending") return 2;
  return 0;
}

function getCopyForState(key, lang = state.currentLanguage) {
  const locale = I18N[lang] || I18N.en;
  if (key === "v1Focus" || key === "v1Detail") return locale.copy.activation;
  if (key === "v2Focus" || key === "v2Detail") return locale.copy.creation;
  if (key === "v3Focus" || key === "v3Detail" || key === "ending") {
    return locale.copy.delivery;
  }
  return locale.copy.activation;
}

function getVideoForState(key) {
  if (key === "hero" || key === "v1Focus" || key === "v1Detail") return 1;
  if (key === "v2Focus" || key === "v2Detail") return 2;
  if (key === "v3Focus" || key === "v3Detail") return 3;
  return 0;
}

function getFocusCrop(videoIndex, focusT) {
  if (videoIndex === 1) {
    return lerpRect(CROP.v1Start, CROP.v1Hero, focusT);
  }

  if (videoIndex === 2) {
    return lerpRect(CROP.v2Start, CROP.v2Hero, focusT);
  }

  const sourceV3 = getVideoSource(video3, { width: 1080, height: 1920 });
  return getVideo3CropRect(sourceV3);
}

function renderProgressUI(segment) {
  const progressSteps = [14, 36, 68, 100];
  const fromStep = getStepIndexForState(segment.fromKey);
  const toStep = getStepIndexForState(segment.toKey);
  const fromValue = progressSteps[fromStep];
  const toValue = progressSteps[toStep];
  const width = lerp(fromValue, toValue, segment.local);

  progressFill.style.width = `${width.toFixed(2)}%`;
  mobileProgressFill.style.width = `${width.toFixed(2)}%`;
  setActiveStep(Math.round(lerp(fromStep, toStep, segment.local)));
}

function applyShellState(shell, opacity, y, scale, zIndex) {
  setOpacity(shell, opacity);
  setVisibility(shell, opacity > 0.01);
  setTransform(shell, 0, y, scale);
  shell.style.zIndex = String(zIndex);
}

function isMobileSplitStateKey(key) {
  return key === "v1Detail" || key === "v2Detail" || key === "v3Detail";
}

function applyMobileCardLayout(layoutKey) {
  if (!mobileStoryCard) return;
  if (state.lastMobileLayoutKey === layoutKey) return;

  state.lastMobileLayoutKey = layoutKey;
  mobileStoryCard.dataset.layout = layoutKey === "split" ? "split" : "stack";
}

function renderVideos(segment) {
  const { fromKey, toKey, local } = segment;
  const fromVideo = getVideoForState(fromKey);
  const toVideo = getVideoForState(toKey);

  const sameVideo = fromVideo === toVideo;
  const splitFadeOut = sameVideo ? 1 : 1 - clamp(local / 0.48, 0, 1);
  const splitFadeIn = sameVideo ? 1 : clamp((local - 0.52) / 0.48, 0, 1);

  const poseFrom = getPose(fromKey);
  const poseTo = getPose(toKey);

  const v1Opacity =
    fromVideo === 1 ? splitFadeOut : toVideo === 1 ? splitFadeIn : 0;

  const v2Opacity =
    fromVideo === 2 ? splitFadeOut : toVideo === 2 ? splitFadeIn : 0;

  const v3Opacity =
    fromVideo === 3 ? splitFadeOut : toVideo === 3 ? splitFadeIn : 0;

  let v1Y = poseFrom?.y ?? 0;
  let v1Scale = poseFrom?.scale ?? 1;
  let v2Y = poseFrom?.y ?? 0;
  let v2Scale = poseFrom?.scale ?? 1;
  let v3Y = poseFrom?.y ?? 0;
  let v3Scale = poseFrom?.scale ?? 1;

  if (sameVideo) {
    const y = lerp(poseFrom.y, poseTo.y, local);
    const scale = lerp(poseFrom.scale, poseTo.scale, local);

    if (fromVideo === 1) {
      v1Y = y;
      v1Scale = scale;
    }
    if (fromVideo === 2) {
      v2Y = y;
      v2Scale = scale;
    }
    if (fromVideo === 3) {
      v3Y = y;
      v3Scale = scale;
    }
  } else {
    if (fromVideo === 1) {
      v1Y = poseFrom.y;
      v1Scale = poseFrom.scale;
    }
    if (fromVideo === 2) {
      v2Y = poseFrom.y;
      v2Scale = poseFrom.scale;
    }
    if (fromVideo === 3) {
      v3Y = poseFrom.y;
      v3Scale = poseFrom.scale;
    }

    if (toVideo === 1) {
      v1Y = poseTo.y;
      v1Scale = poseTo.scale;
    }
    if (toVideo === 2) {
      v2Y = poseTo.y;
      v2Scale = poseTo.scale;
    }
    if (toVideo === 3) {
      v3Y = poseTo.y;
      v3Scale = poseTo.scale;
    }
  }

  applyShellState(plateV1, v1Opacity, v1Y, v1Scale, v1Opacity > 0 ? 5 : 1);
  applyShellState(phonePlate, v2Opacity, v2Y, v2Scale, v2Opacity > 0 ? 5 : 1);
  applyShellState(plateV3, v3Opacity, v3Y, v3Scale, v3Opacity > 0 ? 5 : 1);

  const haloOpacity = Math.max(v1Opacity, v2Opacity, v3Opacity) * 0.22;
  const haloY =
    v1Opacity >= v2Opacity && v1Opacity >= v3Opacity
      ? v1Y
      : v2Opacity >= v3Opacity
        ? v2Y
        : v3Y;
  const haloScale =
    v1Opacity >= v2Opacity && v1Opacity >= v3Opacity
      ? v1Scale + 0.03
      : v2Opacity >= v3Opacity
        ? v2Scale + 0.03
        : v3Scale + 0.03;

  setOpacity(phoneHalo, haloOpacity);
  setVisibility(phoneHalo, haloOpacity > 0.01);
  setTransform(phoneHalo, 0, haloY, haloScale);
  phoneHalo.style.zIndex = "4";

  const focusT1 =
    fromKey === "hero"
      ? local
      : fromKey === "v1Focus"
        ? 1
        : toKey === "v1Focus"
          ? 1
          : fromKey === "v1Detail"
            ? 1
            : toKey === "v1Detail"
              ? 1
              : 0;

  const focusT2 =
    fromKey === "v2Focus"
      ? 1
      : toKey === "v2Focus"
        ? 1
        : fromKey === "v2Detail"
          ? 1
          : toKey === "v2Detail"
            ? 1
            : 0;

  const sourceV1 = getVideoSource(video1, { width: 1080, height: 1920 });
  const sourceV2 = getVideoSource(video2, { width: 1920, height: 1080 });
  const sourceV3 = getVideoSource(video3, { width: 1080, height: 1920 });

  setVideoCrop(video1, viewport1, getFocusCrop(1, focusT1), sourceV1, {
    overscan: 1.001,
    hairlineFixX: 0,
    hairlineFixY: 0,
    snapRectToSourcePixels: true,
    snapTransformToDevicePixels: true,
    snapScaleToDevicePixels: true,
  });

  setVideoCrop(video2, viewport2, getFocusCrop(2, focusT2), sourceV2, {
    overscan: 1.002,
    hairlineFixX: 0.25,
    hairlineFixY: 0.2,
    snapRectToSourcePixels: false,
    snapTransformToDevicePixels: false,
    snapScaleToDevicePixels: false,
  });

  setVideoCrop(video3, viewport3, getVideo3CropRect(sourceV3), sourceV3, {
    overscan: 0.92,
    hairlineFixX: 0.4,
    hairlineFixY: 0.4,
    snapRectToSourcePixels: true,
    snapTransformToDevicePixels: true,
    snapScaleToDevicePixels: true,
  });

  video1.style.filter = "brightness(1) contrast(1.01) saturate(1.01)";
  video2.style.filter = "brightness(1) contrast(1.01) saturate(1.01)";
  video3.style.filter = "none";
}

function getDominantStoryState(segment) {
  return segment.local < 0.5 ? segment.fromKey : segment.toKey;
}

function shouldShowCopyForState(key) {
  if (layoutCache.isMobile) {
    return (
      key === "v1Detail" ||
      key === "v2Focus" ||
      key === "v2Detail" ||
      key === "v3Focus" ||
      key === "v3Detail" ||
      key === "ending"
    );
  }

  return (
    key === "v1Focus" ||
    key === "v2Focus" ||
    key === "v3Focus" ||
    key === "ending"
  );
}

function renderTextLayers(segment) {
  const { fromKey, toKey, local } = segment;

  const showHero =
    (fromKey === "hero" && (toKey === "v1Focus" ? 1 - local : 1)) ||
    (toKey === "hero" ? local : 0);

  const endingFrom = fromKey === "ending" ? 1 : 0;
  const endingTo = toKey === "ending" ? 1 : 0;
  const endingOpacity = lerp(endingFrom, endingTo, local);

  let activeInfoFrom = 0;
  let activeInfoTo = 0;

  if (layoutCache.isMobile) {
    activeInfoFrom =
      fromKey === "v1Detail" || fromKey === "v2Detail" || fromKey === "v3Detail"
        ? 1
        : 0;
    activeInfoTo =
      toKey === "v1Detail" || toKey === "v2Detail" || toKey === "v3Detail"
        ? 1
        : 0;
  } else {
    activeInfoFrom =
      fromKey === "v1Focus" || fromKey === "v2Focus" || fromKey === "v3Focus"
        ? 1
        : 0;
    activeInfoTo =
      toKey === "v1Focus" || toKey === "v2Focus" || toKey === "v3Focus" ? 1 : 0;
  }

  const detailOpacity =
    lerp(activeInfoFrom, activeInfoTo, local) * (1 - endingOpacity);

  setOpacity(heroCopy, showHero * (1 - endingOpacity * 0.6));
  setOpacity(scrollIndicator, showHero > 0.08 ? showHero : 0);

  if (layoutCache.isMobile) {
    const dominantState = getDominantStoryState(segment);

    const splitLayout =
      isMobileSplitStateKey(fromKey) ||
      isMobileSplitStateKey(toKey) ||
      isMobileSplitStateKey(dominantState);

    applyMobileCardLayout(splitLayout ? "split" : "stack");

    setOpacity(infoPanel, 0);
    setOpacity(processPanel, 0);
    setOpacity(mobileStoryCard, detailOpacity);

    if (splitLayout) {
      mobileStoryCard.style.transform = "translate3d(-50%, 0, 0)";
    } else {
      const cardY = lerp(28, 0, detailOpacity);
      mobileStoryCard.style.transform = `translate3d(-50%, ${cardY.toFixed(3)}px, 0)`;
    }
  } else {
    applyMobileCardLayout("stack");

    setOpacity(infoPanel, detailOpacity);
    setOpacity(processPanel, detailOpacity);
    setOpacity(mobileStoryCard, 0);

    infoPanel.style.transform = `translate3d(${lerp(-20, 0, detailOpacity).toFixed(3)}px, -50%, 0)`;
    processPanel.style.transform = `translate3d(${lerp(20, 0, detailOpacity).toFixed(3)}px, -50%, 0)`;
  }

  setOpacity(endingCopy, endingOpacity);
  endingCopy.style.transform = `translate3d(0, ${lerp(
    18,
    0,
    endingOpacity,
  ).toFixed(3)}px, 0) scale(${lerp(0.986, 1, endingOpacity).toFixed(4)})`;

  heroCopy.style.transform = `translate3d(-50%, ${lerp(
    0,
    -14,
    clamp(1 - showHero, 0, 1),
  ).toFixed(3)}px, 0)`;
}

function updateCopyAndSteps(segment) {
  const dominantState = getDominantStoryState(segment);
  const content = getCopyForState(dominantState);

  if (shouldShowCopyForState(dominantState)) {
    const logicalKey = `${state.currentLanguage}:${content.key}:${layoutCache.isMobile ? "m" : "d"}:${isMobileSplitStateKey(dominantState) ? "split" : "stack"}`;
    if (logicalKey !== state.lastLogicalCopyKey) {
      setInfoCopy(content);
      state.lastLogicalCopyKey = logicalKey;
    }
  }

  renderProgressUI(segment);
}

function manageVideoActivity(segment) {
  if (!state.sceneVisible) {
    pauseVideo(video1);
    pauseVideo(video2);
    pauseVideo(video3);
    return;
  }

  const visibleVideos = new Set([
    getVideoForState(segment.fromKey),
    getVideoForState(segment.toKey),
  ]);

  if (visibleVideos.has(1)) ensureAmbientPlayback(video1);
  else pauseVideo(video1);

  if (visibleVideos.has(2)) ensureAmbientPlayback(video2);
  else pauseVideo(video2);

  if (visibleVideos.has(3)) ensureAmbientPlayback(video3);
  else pauseVideo(video3);
}

function renderScene(progress) {
  const renderKey = `${progress.toFixed(5)}|${window.innerWidth}|${window.innerHeight}|${layoutCache.isMobile ? "m" : "d"}|${state.currentLanguage}|${state.currentCopySignature}`;
  if (renderKey === state.lastRenderKey) return;
  state.lastRenderKey = renderKey;

  const segment = getStorySegment(progress);

  manageVideoActivity(segment);
  updateCopyAndSteps(segment);
  renderVideos(segment);
  renderTextLayers(segment);

  deviceStack.style.transform = "translate3d(-50%, -50%, 0) scale(1)";

  const stageGlow =
    0.11 +
    lerp(0, 0.03, invLerp(progress, 0, 0.22)) +
    lerp(0, 0.035, invLerp(progress, 0.28, 0.58)) +
    lerp(0, 0.02, invLerp(progress, 0.62, 0.92));

  const demoBlend = invLerp(progress, 0.94, 1);
  stage.style.setProperty(
    "--hero-lift",
    `${lerp(2, -4, progress).toFixed(3)}px`,
  );
  stage.style.setProperty("--global-glow", stageGlow.toFixed(4));
  stage.style.setProperty("--global-contrast", "1.01");
  stage.style.setProperty("--global-saturate", "1.01");
  stage.style.setProperty("--demo-blend", demoBlend.toFixed(4));
}

function tick(now) {
  state.rafId = requestAnimationFrame(tick);

  const dt = Math.min((now - state.lastTime) / 1000, 0.05);
  state.lastTime = now;

  state.targetProgress = getStoryProgress();
  state.smoothProgress = prefersReducedMotion
    ? state.targetProgress
    : damp(
        state.smoothProgress,
        state.targetProgress,
        TUNE.scrollSmoothing,
        dt,
      );

  renderScene(state.smoothProgress);
}

function requestResizeRecalc() {
  if (state.resizeRaf) return;

  state.resizeRaf = requestAnimationFrame(() => {
    state.resizeRaf = 0;

    resetMobileStoryReady();
    updateLayoutCache();
    updateStoryHeight();
    state.lastRenderKey = "";
    state.lastLogicalCopyKey = "";
    state.lastMobileLayoutKey = "";
    renderScene(state.smoothProgress);
    syncCurrentStationFromScroll();
    queueMobileStoryReady();
  });
}

function handleDirectionalSnap(direction) {
  if (!isSnapRegionActive()) return false;
  if (snapState.isAnimating) return true;
  if (performance.now() < snapState.lockUntil) return true;

  const targetIndex = getNextSnapIndex(direction);
  snapToIndex(targetIndex);
  return true;
}

function setLanguage(nextLanguage) {
  const safeLang = nextLanguage === "hr" ? "hr" : "en";
  if (safeLang === state.currentLanguage) return;

  state.currentLanguage = safeLang;
  applyGlobalLanguage();

  const activeSegment = getStorySegment(state.smoothProgress);
  const content = getCopyForState(getDominantStoryState(activeSegment));
  state.lastLogicalCopyKey = "";
  setInfoCopy(content, true);
  state.lastRenderKey = "";
  renderScene(state.smoothProgress);
}

function toggleLanguage() {
  setLanguage(state.currentLanguage === "en" ? "hr" : "en");
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      state.sceneVisible = entry.isIntersecting;

      if (!state.sceneVisible) {
        pauseVideo(video1);
        pauseVideo(video2);
        pauseVideo(video3);
      } else {
        ensureAmbientPlayback(video1);
        ensureAmbientPlayback(video2);
        ensureAmbientPlayback(video3);
        state.lastRenderKey = "";
      }
    });
  },
  { threshold: 0.01 },
);

observer.observe(story);

window.addEventListener("resize", requestResizeRecalc, { passive: true });
window.addEventListener("orientationchange", requestResizeRecalc, {
  passive: true,
});

window.addEventListener(
  "scroll",
  () => {
    state.lastRenderKey = "";

    if (snapState.releaseSnapTimer) {
      clearTimeout(snapState.releaseSnapTimer);
    }

    if (!snapState.isAnimating && isSnapRegionActive()) {
      snapState.releaseSnapTimer = window.setTimeout(() => {
        snapToNearestStation();
      }, 110);
    }
  },
  { passive: true },
);

window.addEventListener(
  "wheel",
  (event) => {
    if (prefersReducedMotion) return;
    if (!isSnapRegionActive()) return;

    event.preventDefault();

    if (snapState.wheelLocked || snapState.isAnimating) return;
    if (performance.now() < snapState.lockUntil) return;

    const deltaY = event.deltaY || 0;
    if (Math.abs(deltaY) < TUNE.wheelThreshold) return;

    snapState.wheelLocked = true;
    releaseWheelLockLater();

    const direction = deltaY > 0 ? 1 : -1;
    handleDirectionalSnap(direction);
  },
  { passive: false },
);

window.addEventListener(
  "keydown",
  (event) => {
    if (
      event.target &&
      /input|textarea|select|button/i.test(event.target.tagName)
    ) {
      return;
    }

    if (event.key.toLowerCase() === "l") {
      toggleLanguage();
      return;
    }

    if (prefersReducedMotion) return;
    if (!isSnapRegionActive()) return;

    const key = event.key;

    if (key === "ArrowDown" || key === "PageDown" || key === " ") {
      event.preventDefault();
      handleDirectionalSnap(1);
      return;
    }

    if (key === "ArrowUp" || key === "PageUp") {
      event.preventDefault();
      handleDirectionalSnap(-1);
    }
  },
  { passive: false },
);

window.addEventListener(
  "touchstart",
  (event) => {
    if (!event.touches || !event.touches.length) return;
    if (prefersReducedMotion) return;

    snapState.touchActive = isSnapRegionActive();
    snapState.touchTriggered = false;
    snapState.touchStartY = event.touches[0].clientY;
  },
  { passive: true },
);

window.addEventListener(
  "touchmove",
  (event) => {
    if (!snapState.touchActive) return;
    if (!event.touches || !event.touches.length) return;

    event.preventDefault();

    if (snapState.touchTriggered || snapState.isAnimating) return;
    if (performance.now() < snapState.lockUntil) return;

    const currentY = event.touches[0].clientY;
    const deltaY = currentY - snapState.touchStartY;

    if (Math.abs(deltaY) < TUNE.touchThreshold) return;

    snapState.touchTriggered = true;
    const direction = deltaY < 0 ? 1 : -1;
    handleDirectionalSnap(direction);
  },
  { passive: false },
);

window.addEventListener(
  "touchend",
  () => {
    if (prefersReducedMotion) return;
    if (!snapState.touchActive) return;

    snapState.touchActive = false;

    if (
      !snapState.touchTriggered &&
      !snapState.isAnimating &&
      isSnapRegionActive()
    ) {
      snapToNearestStation();
    }
  },
  { passive: true },
);

langToggle?.addEventListener("click", toggleLanguage);

window.addEventListener("load", () => {
  resetMobileStoryReady();
  updateLayoutCache();
  updateStoryHeight();
  applyGlobalLanguage();
  setInfoCopy(getCopySet().activation, true);

  primeVideo(video1);
  primeVideo(video2);
  primeVideo(video3);

  state.smoothProgress = getStoryProgress();
  syncCurrentStationFromScroll();
  applyMobileCardLayout("stack");
  renderScene(state.smoothProgress);
  queueMobileStoryReady();
  state.rafId = requestAnimationFrame(tick);

  setTimeout(() => {
    resetMobileStoryReady();
    updateLayoutCache();
    updateStoryHeight();
    state.lastRenderKey = "";
    state.lastLogicalCopyKey = "";
    state.lastMobileLayoutKey = "";
    renderScene(state.smoothProgress);
    syncCurrentStationFromScroll();
    queueMobileStoryReady();
  }, 180);
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    pauseVideo(video1);
    pauseVideo(video2);
    pauseVideo(video3);
    return;
  }

  ensureAmbientPlayback(video1);
  ensureAmbientPlayback(video2);
  ensureAmbientPlayback(video3);
  state.lastTime = performance.now();
  state.lastRenderKey = "";

  if (layoutCache.isMobile) {
    queueMobileStoryReady();
  }
});

window.addEventListener("beforeunload", () => {
  cancelAnimationFrame(state.rafId);
  cancelSnapAnimation();
  observer.disconnect();
  clearCopySwapTimer();
  clearMobileReadyFrames();

  if (snapState.wheelTimer) clearTimeout(snapState.wheelTimer);
  if (snapState.releaseSnapTimer) clearTimeout(snapState.releaseSnapTimer);
});
