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
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

const mix01 = (progress, start, end, ease = easeInOutCubic) =>
  ease(invLerp(progress, start, end));

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const story = document.getElementById("story");
const stage = document.getElementById("stage");
const deviceStack = document.getElementById("deviceStack");

const heroCopy = document.getElementById("heroCopy");
const endingCopy = document.getElementById("endingCopy");
const scrollIndicator = document.getElementById("scrollIndicator");
const infoPanel = document.getElementById("infoPanel");
const processPanel = document.getElementById("processPanel");

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
const processSummary = document.getElementById("processSummary");
const miniPoints = document.getElementById("miniPoints");

const infoCopyMotion = document.getElementById("infoCopyMotion");
const processSummaryMotion = document.getElementById("processSummaryMotion");

const progressFill = document.getElementById("progressFill");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

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

function getVideoSource(video, fallback) {
  return {
    width: video?.videoWidth || fallback.width,
    height: video?.videoHeight || fallback.height,
  };
}

const CROP = {
  v1Start: { x: 0, y: 0, w: 1080, h: 1920 },
  v1Hero: { x: 124, y: 0, w: 832, h: 1668 },

  v2Start: { x: 604, y: 0, w: 712, h: 1080 },
  v2Hero: { x: 620, y: 0, w: 680, h: 1080 },

  v3Start: { x: 0, y: 0, w: 1080, h: 1920 },
  v3Hero: { x: 0, y: 0, w: 1080, h: 1920 },
};

const COPY = {
  activation: {
    key: "activation",
    kicker: "Step 01",
    leadline: "Turn walk-by attention into instant participation.",
    title: "Scan. Start. Join.",
    body: "Guests notice the setup and enter the experience in seconds by scanning the QR code.",
    detail:
      "A clean first touchpoint that works across venues, offers and service flows.",
    implementation:
      "Demo branding is illustrative only. In production, visuals, CTA, tags and destination link are fully replaced with the client’s own brand system.",
    tag: "Brand-ready",
    pills: ["High attention", "Instant entry", "Low friction"],
    miniPoints: ["Physical trigger", "QR entry", "Clear CTA"],
    summary:
      "A real-world moment captures attention and starts the journey with almost no friction.",
  },
  creation: {
    key: "creation",
    kicker: "Step 02",
    leadline: "The guest moment becomes branded content.",
    title: "Your brand, built into the output.",
    body: "The captured moment is turned into a polished content asset shaped by your visual identity.",
    detail:
      "Overlays, motion, tags and styling adapt to the client, campaign or venue.",
    implementation:
      "Everything shown in the demo is replaceable — animation, naming, hashtags, CTA and visual treatment become fully client-specific.",
    tag: "Fully custom",
    pills: ["Your identity", "Your styling", "Share-ready"],
    miniPoints: ["Custom overlay", "Campaign tags", "Premium output"],
    summary:
      "Content is produced in a format people want to keep, share and associate with your brand.",
  },
  delivery: {
    key: "delivery",
    kicker: "Step 03",
    leadline: "Content moves into action.",
    title: "Share. Click. Convert.",
    body: "Once created, the content is delivered through a smooth flow for download, sharing and next-step action.",
    detail:
      "This is where the experience can drive bookings, product traffic, offers, referrals or repeat visits.",
    implementation:
      "The final link, reward logic and tracking method can be adapted to the business model — from bookings and promos to referral-driven growth.",
    tag: "Conversion layer",
    pills: ["Business CTA", "Reward-ready", "Trackable"],
    miniPoints: ["Brand link", "Referral logic", "Real outcomes"],
    summary:
      "The final layer turns branded content into measurable reach and usable business intent.",
  },
};

const TUNE = {
  scrollSmoothing: prefersReducedMotion ? 40 : 11.5,

  stackYDesktopStart: 88,
  stackYDesktopHero: 0,

  stackYTabletStart: 74,
  stackYTabletHero: 6,

  stackYMobileStart: 92,
  stackYMobileHero: 28,

  stackScaleDesktopStart: 0.84,
  stackScaleDesktopHero: 1.0,

  stackScaleTabletStart: 0.82,
  stackScaleTabletHero: 0.96,

  stackScaleMobileStart: 0.82,
  stackScaleMobileHero: 0.92,
};

const PHASE = {
  intro: [0.0, 0.12],

  step1: [0.0, 0.375],
  step1Out: [0.375, 0.43],

  step2In: [0.375, 0.445],
  step2: [0.445, 0.635],
  step2Out: [0.635, 0.715],

  step3In: [0.705, 0.79],
  step3: [0.79, 0.895],
  step3Out: [0.895, 0.945],

  endingIn: [0.95, 0.98],
  endingHold: [0.98, 1.0],
};

let rafId = 0;
let resizeRaf = 0;
let lastTime = performance.now();
let targetProgress = 0;
let smoothProgress = 0;
let sceneVisible = true;
let lastRenderKey = "";
let currentCopyKey = "";
let rafResizeCounter = 0;

const layoutCache = {
  isTablet: false,
  isMobile: false,
  stackScaleStart: 1,
  stackScaleHero: 1,
  stackYStart: 0,
  stackYHero: 0,
};

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

function setActiveStep(activeIndex) {
  [step1, step2, step3].forEach((step, index) => {
    step.classList.toggle("is-active", index === activeIndex);
  });
}

function animateSwap(nodes, onMidpoint) {
  if (prefersReducedMotion) {
    onMidpoint();
    return;
  }

  nodes.forEach((node) => node?.classList.add("is-changing"));

  window.setTimeout(() => {
    onMidpoint();
    requestAnimationFrame(() => {
      nodes.forEach((node) => node?.classList.remove("is-changing"));
    });
  }, 180);
}

function renderMiniPoints(items = []) {
  if (!miniPoints) return;
  miniPoints.innerHTML = items
    .map((item) => `<span class="mini-point">${item}</span>`)
    .join("");
}

function setInfoCopy(content, force = false) {
  if (!content) return;
  if (!force && currentCopyKey === content.key) return;

  const apply = () => {
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
    currentCopyKey = content.key;
  };

  if (force || prefersReducedMotion || !currentCopyKey) {
    apply();
    return;
  }

  animateSwap([infoCopyMotion, processSummaryMotion], apply);
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

function updateStoryHeight() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  let value = 1180;

  if (w <= 560) value = 1580;
  else if (w <= 760) value = 1500;
  else if (w <= 980) value = 1360;

  if (w <= 980 && h <= 760) value += 70;

  story.style.height = `${value}vh`;
}

function updateLayoutCache() {
  const w = window.innerWidth;
  layoutCache.isMobile = w <= 980;
  layoutCache.isTablet = w > 980 && w <= 1280;

  if (layoutCache.isMobile) {
    layoutCache.stackScaleStart = TUNE.stackScaleMobileStart;
    layoutCache.stackScaleHero = TUNE.stackScaleMobileHero;
    layoutCache.stackYStart = TUNE.stackYMobileStart;
    layoutCache.stackYHero = TUNE.stackYMobileHero;
    return;
  }

  if (layoutCache.isTablet) {
    layoutCache.stackScaleStart = TUNE.stackScaleTabletStart;
    layoutCache.stackScaleHero = TUNE.stackScaleTabletHero;
    layoutCache.stackYStart = TUNE.stackYTabletStart;
    layoutCache.stackYHero = TUNE.stackYTabletHero;
    return;
  }

  layoutCache.stackScaleStart = TUNE.stackScaleDesktopStart;
  layoutCache.stackScaleHero = TUNE.stackScaleDesktopHero;
  layoutCache.stackYStart = TUNE.stackYDesktopStart;
  layoutCache.stackYHero = TUNE.stackYDesktopHero;
}

function getStoryProgress() {
  const rect = story.getBoundingClientRect();
  const maxScroll = Math.max(story.offsetHeight - window.innerHeight, 1);
  const current = clamp(-rect.top, 0, maxScroll);
  return clamp(current / maxScroll, 0, 1);
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
  video.style.transform = `translate3d(${tx.toFixed(4)}px, ${ty.toFixed(4)}px, 0) scale(${scale.toFixed(6)})`;
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

function getOpacities(progress) {
  let v1 = 1;
  if (progress > PHASE.step1Out[0]) {
    v1 =
      1 - mix01(progress, PHASE.step1Out[0], PHASE.step1Out[1], easeInOutCubic);
  }

  let v2 = 0;
  if (progress >= PHASE.step2In[0] && progress < PHASE.step2In[1]) {
    v2 = mix01(progress, PHASE.step2In[0], PHASE.step2In[1], easeInOutCubic);
  } else if (progress >= PHASE.step2In[1] && progress <= PHASE.step2Out[0]) {
    v2 = 1;
  } else if (progress > PHASE.step2Out[0] && progress < PHASE.step2Out[1]) {
    v2 =
      1 - mix01(progress, PHASE.step2Out[0], PHASE.step2Out[1], easeInOutCubic);
  }

  let v3 = 0;
  if (progress >= PHASE.step3In[0] && progress < PHASE.step3In[1]) {
    v3 = mix01(progress, PHASE.step3In[0], PHASE.step3In[1], easeInOutCubic);
  } else if (progress >= PHASE.step3In[1] && progress <= PHASE.step3Out[0]) {
    v3 = 1;
  } else if (progress > PHASE.step3Out[0] && progress < PHASE.step3Out[1]) {
    v3 =
      1 - mix01(progress, PHASE.step3Out[0], PHASE.step3Out[1], easeInOutCubic);
  }

  return {
    v1: clamp(v1, 0, 1),
    v2: clamp(v2, 0, 1),
    v3: clamp(v3, 0, 1),
  };
}

function getDominantStep(progress) {
  if (progress >= PHASE.step3In[0]) return 2;
  if (progress >= PHASE.step2In[0]) return 1;
  return 0;
}

function updateCopyAndProgress(progress) {
  const activeIndex = getDominantStep(progress);

  if (activeIndex === 0) setInfoCopy(COPY.activation);
  if (activeIndex === 1) setInfoCopy(COPY.creation);
  if (activeIndex === 2) setInfoCopy(COPY.delivery);

  setActiveStep(activeIndex);

  const fillVisual =
    activeIndex === 0
      ? lerp(14, 38, mix01(progress, 0.01, 0.305, easeOutCubic))
      : activeIndex === 1
        ? lerp(41, 70, mix01(progress, 0.385, 0.63, easeOutCubic))
        : lerp(74, 100, mix01(progress, 0.72, 0.95, easeOutCubic));

  progressFill.style.width = `${fillVisual.toFixed(2)}%`;
}

function manageVideoActivity(progress) {
  if (!sceneVisible) {
    pauseVideo(video1);
    pauseVideo(video2);
    pauseVideo(video3);
    return;
  }

  const v1Active = progress <= PHASE.step1Out[1] + 0.04;
  const v2Active =
    progress >= PHASE.step2In[0] - 0.05 && progress <= PHASE.step2Out[1] + 0.05;
  const v3Active =
    progress >= PHASE.step3In[0] - 0.05 && progress <= PHASE.step3Out[1] + 0.05;

  if (v1Active) ensureAmbientPlayback(video1);
  else pauseVideo(video1);

  if (v2Active) ensureAmbientPlayback(video2);
  else pauseVideo(video2);

  if (v3Active) ensureAmbientPlayback(video3);
  else pauseVideo(video3);
}

function renderScene(progress) {
  const renderKey = `${progress.toFixed(5)}|${window.innerWidth}|${window.innerHeight}|${rafResizeCounter}`;
  if (renderKey === lastRenderKey) return;
  lastRenderKey = renderKey;

  manageVideoActivity(progress);

  const introT = mix01(progress, ...PHASE.intro, easeOutCubic);

  const step1ZoomT = mix01(
    progress,
    PHASE.step1[0],
    PHASE.step1[1],
    easeInOutCubic,
  );

  const step2ZoomT = mix01(
    progress,
    PHASE.step2In[0],
    PHASE.step2[1],
    easeInOutCubic,
  );

  const stackScale = lerp(
    layoutCache.stackScaleStart,
    layoutCache.stackScaleHero,
    introT,
  );
  const stackY = lerp(layoutCache.stackYStart, layoutCache.stackYHero, introT);

  deviceStack.style.transform = `translate3d(-50%, calc(-50% + ${stackY.toFixed(
    3,
  )}px), 0) scale(${stackScale.toFixed(5)})`;

  const opacities = getOpacities(progress);

  setOpacity(plateV1, opacities.v1);
  setOpacity(phonePlate, opacities.v2);
  setOpacity(plateV3, opacities.v3);

  const haloOpacity = Math.max(opacities.v2 * 0.42, opacities.v3 * 0.16);
  setOpacity(phoneHalo, haloOpacity);

  setVisibility(plateV1, opacities.v1 > 0.01);
  setVisibility(phonePlate, opacities.v2 > 0.01);
  setVisibility(plateV3, opacities.v3 > 0.01);
  setVisibility(phoneHalo, haloOpacity > 0.01);

  setTransform(plateV1, 0, 0, 1);
  setTransform(phonePlate, 0, 0, 1);
  setTransform(plateV3, 0, 0, 1);
  setTransform(phoneHalo, 0, 0, 1.03);

  updateCopyAndProgress(progress);

  const v1Rect = lerpRect(CROP.v1Start, CROP.v1Hero, step1ZoomT);
  const v2Rect = lerpRect(CROP.v2Start, CROP.v2Hero, step2ZoomT);

  const sourceV1 = getVideoSource(video1, { width: 1080, height: 1920 });
  const sourceV2 = getVideoSource(video2, { width: 1920, height: 1080 });
  const sourceV3 = getVideoSource(video3, { width: 1080, height: 1920 });

  const v3Rect = getVideo3CropRect(sourceV3);

  setVideoCrop(video1, viewport1, v1Rect, sourceV1, {
    overscan: 1.001,
    hairlineFixX: 0,
    hairlineFixY: 0,
    snapRectToSourcePixels: true,
    snapTransformToDevicePixels: true,
    snapScaleToDevicePixels: true,
  });

  setVideoCrop(video2, viewport2, v2Rect, sourceV2, {
    overscan: 1.002,
    hairlineFixX: 0.25,
    hairlineFixY: 0.2,
    snapRectToSourcePixels: false,
    snapTransformToDevicePixels: false,
    snapScaleToDevicePixels: false,
  });

  setVideoCrop(video3, viewport3, v3Rect, sourceV3, {
    overscan: 0.9,
    hairlineFixX: 0.5,
    hairlineFixY: 0.5,
    snapRectToSourcePixels: true,
    snapTransformToDevicePixels: true,
    snapScaleToDevicePixels: true,
  });

  video1.style.filter = "brightness(1) contrast(1.01) saturate(1.01)";
  video2.style.filter = "brightness(1) contrast(1.01) saturate(1.01)";
  video3.style.filter = "none";

  const stageLift =
    lerp(2, -4, introT) + lerp(0, -3, mix01(progress, 0.82, 1, easeOutCubic));

  const stageGlow =
    0.11 +
    lerp(0, 0.03, step1ZoomT) +
    lerp(0, 0.035, step2ZoomT) +
    lerp(0, 0.02, mix01(progress, 0.76, 0.9, easeOutCubic));

  const demoBlend = mix01(progress, 0.985, 1.0, easeOutQuart);

  stage.style.setProperty("--hero-lift", `${stageLift.toFixed(3)}px`);
  stage.style.setProperty("--global-glow", stageGlow.toFixed(4));
  stage.style.setProperty("--global-contrast", "1.01");
  stage.style.setProperty("--global-saturate", "1.01");
  stage.style.setProperty("--demo-blend", demoBlend.toFixed(4));

  const heroFade = 1 - mix01(progress, 0.05, 0.14, easeInOutCubic);
  const scrollFade = 1 - mix01(progress, 0.03, 0.09, easeOutCubic);

  const leftPanelIn = mix01(progress, 0.06, 0.14, easeOutCubic);
  const rightPanelIn = mix01(progress, 0.09, 0.17, easeOutCubic);
  const panelsFadeForEnding = 1 - mix01(progress, 0.88, 0.925, easeOutCubic);

  const endingIn = mix01(
    progress,
    PHASE.endingIn[0],
    PHASE.endingIn[1],
    easeOutCubic,
  );

  setOpacity(heroCopy, heroFade);
  setOpacity(scrollIndicator, scrollFade);
  setOpacity(infoPanel, leftPanelIn * panelsFadeForEnding);
  setOpacity(processPanel, rightPanelIn * panelsFadeForEnding);
  setOpacity(endingCopy, endingIn);

  heroCopy.style.transform = `translate3d(-50%, ${lerp(
    0,
    -18,
    mix01(progress, 0.02, 0.12, easeOutCubic),
  ).toFixed(3)}px, 0)`;

  if (window.innerWidth <= 980) {
    infoPanel.style.transform = `translate3d(-50%, ${lerp(20, 0, leftPanelIn).toFixed(3)}px, 0)`;
    processPanel.style.transform = `translate3d(-50%, ${lerp(18, 0, rightPanelIn).toFixed(3)}px, 0)`;
  } else {
    infoPanel.style.transform = `translate3d(${lerp(-26, 0, leftPanelIn).toFixed(3)}px, -50%, 0)`;
    processPanel.style.transform = `translate3d(${lerp(26, 0, rightPanelIn).toFixed(3)}px, -50%, 0)`;
  }

  endingCopy.style.transform = `translate3d(0, ${lerp(18, 0, endingIn).toFixed(
    3,
  )}px, 0) scale(${lerp(0.986, 1, endingIn).toFixed(4)})`;

  plateV1.style.zIndex = progress < PHASE.step2In[0] ? "3" : "1";
  phoneHalo.style.zIndex = "2";
  phonePlate.style.zIndex =
    progress >= PHASE.step2In[0] && progress < PHASE.step3In[0] ? "4" : "2";
  plateV3.style.zIndex = progress >= PHASE.step3In[0] ? "5" : "2";
}

function tick(now) {
  rafId = requestAnimationFrame(tick);

  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;

  targetProgress = getStoryProgress();
  smoothProgress = prefersReducedMotion
    ? targetProgress
    : damp(smoothProgress, targetProgress, TUNE.scrollSmoothing, dt);

  renderScene(smoothProgress);
}

function requestResizeRecalc() {
  if (resizeRaf) return;

  resizeRaf = requestAnimationFrame(() => {
    resizeRaf = 0;
    rafResizeCounter += 1;
    updateStoryHeight();
    updateLayoutCache();
    lastRenderKey = "";
    renderScene(smoothProgress);
  });
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
    lastRenderKey = "";
  };

  video.addEventListener("loadedmetadata", onReady, { passive: true });
  video.addEventListener("loadeddata", onReady, { passive: true });
  video.addEventListener("canplay", onReady, { passive: true });

  try {
    video.load();
  } catch (_) {}

  ensureAmbientPlayback(video);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      sceneVisible = entry.isIntersecting;

      if (!sceneVisible) {
        pauseVideo(video1);
        pauseVideo(video2);
        pauseVideo(video3);
      } else {
        ensureAmbientPlayback(video1);
        ensureAmbientPlayback(video2);
        ensureAmbientPlayback(video3);
        lastRenderKey = "";
      }
    });
  },
  { threshold: 0.01 },
);

observer.observe(story);

const resizeObserver = new ResizeObserver(() => {
  requestResizeRecalc();
});

resizeObserver.observe(document.documentElement);

window.addEventListener("resize", requestResizeRecalc, { passive: true });
window.addEventListener("orientationchange", requestResizeRecalc, {
  passive: true,
});

window.addEventListener(
  "scroll",
  () => {
    lastRenderKey = "";
  },
  { passive: true },
);

window.addEventListener("load", () => {
  updateStoryHeight();
  updateLayoutCache();
  setInfoCopy(COPY.activation, true);

  primeVideo(video1);
  primeVideo(video2);
  primeVideo(video3);

  smoothProgress = getStoryProgress();
  renderScene(smoothProgress);
  rafId = requestAnimationFrame(tick);

  setTimeout(() => {
    updateStoryHeight();
    updateLayoutCache();
    lastRenderKey = "";
    renderScene(smoothProgress);
  }, 140);

  setTimeout(() => {
    updateStoryHeight();
    updateLayoutCache();
    lastRenderKey = "";
    renderScene(smoothProgress);
  }, 420);
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
  lastTime = performance.now();
  lastRenderKey = "";
});

window.addEventListener("beforeunload", () => {
  cancelAnimationFrame(rafId);
  observer.disconnect();
  resizeObserver.disconnect();
});
