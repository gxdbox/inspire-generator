/* ============================================================
   Inspire Generator — Content Script
   Injects floating 💡 bubble + draggable behaviour + iframe
   panel into every page.
   ============================================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'inspire_bubble_pos';
  const PANEL_STORAGE_KEY = 'inspire_panel_pos';
  const BUBBLE_SIZE   = 56;
  const PANEL_WIDTH   = 380;
  const PANEL_HEIGHT  = 580;
  const DRAG_THRESHOLD = 3; // px — differentiate drag vs click
  const GAP = 12; // px gap between bubble and panel

  /* ----- State ----- */
  let bubble       = null;
  let panel        = null;
  let panelVisible = false;

  // Drag state (bubble)
  let isDragging     = false;
  let wasDragged     = false;
  let dragStartX     = 0;
  let dragStartY     = 0;
  let bubbleStartX   = 0;
  let bubbleStartY   = 0;

  // Drag state (panel)
  let panelDragging    = false;
  let panelDragStartX  = 0;
  let panelDragStartY  = 0;
  let panelStartX      = 0;
  let panelStartY      = 0;

  /* ==========================================================
     Injection
     ========================================================== */

  function injectStyles () {
    if (document.getElementById('inspire-styles')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('scripts/content.css');
    link.id = 'inspire-styles';
    document.head.appendChild(link);
  }

  function createBubble () {
    if (document.getElementById('inspire-bubble')) return;

    bubble = document.createElement('div');
    bubble.id = 'inspire-bubble';
    bubble.textContent = '\uD83D\uDCA1'; // 💡
    bubble.setAttribute('aria-label', 'Open Inspire Generator');
    bubble.setAttribute('role', 'button');
    bubble.setAttribute('tabindex', '0');

    // Restore saved position
    const saved = loadPosition();
    if (saved) {
      bubble.style.left = saved.x + 'px';
      bubble.style.top  = saved.y + 'px';
    }

    document.body.appendChild(bubble);
    attachDragListeners(bubble);
    bubble.addEventListener('click', onBubbleClick);
  }

  /* ==========================================================
     Position persistence
     ========================================================== */

  function savePosition (x, y) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ x, y }));
    } catch (_) { /* quota exceeded — ignore */ }
  }

  function loadPosition () {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
        return parsed;
      }
    } catch (_) { /* corrupted data */ }
    return null;
  }

  /* ==========================================================
     Dragging
     ========================================================== */

  function attachDragListeners (el) {
    el.addEventListener('mousedown', onDragStart);
    el.addEventListener('touchstart', onDragStart, { passive: false });
  }

  function onDragStart (e) {
    // Ignore right-click
    if (e.type === 'mousedown' && e.button !== 0) return;

    e.preventDefault();

    isDragging = false;
    wasDragged = false;

    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

    dragStartX   = clientX;
    dragStartY   = clientY;
    bubbleStartX = bubble.offsetLeft;
    bubbleStartY = bubble.offsetTop;

    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup',   onDragEnd);
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('touchend',  onDragEnd);
  }

  function onDragMove (e) {
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    const dx = clientX - dragStartX;
    const dy = clientY - dragStartY;

    // Mark as drag once moved beyond threshold
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
      isDragging = true;
      wasDragged = true;
    }

    if (!isDragging) return;

    let newX = bubbleStartX + dx;
    let newY = bubbleStartY + dy;

    // Boundary limits (keep within viewport)
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    newX = Math.max(0, Math.min(newX, vw - BUBBLE_SIZE));
    newY = Math.max(0, Math.min(newY, vh - BUBBLE_SIZE));

    bubble.style.left = newX + 'px';
    bubble.style.top  = newY + 'px';
  }

  function onDragEnd () {
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup',   onDragEnd);
    document.removeEventListener('touchmove', onDragMove);
    document.removeEventListener('touchend',  onDragEnd);

    if (!isDragging) {
      // Wasn't a drag — this allows the click handler to proceed
      return;
    }

    // Persist final position
    const x = parseInt(bubble.style.left, 10);
    const y = parseInt(bubble.style.top,  10);
    if (!isNaN(x) && !isNaN(y)) {
      savePosition(x, y);
    }

    isDragging = false;

    // Reset the dragged flag after a microtask so the
    // pending click event sees it as true
    setTimeout(() => { wasDragged = false; }, 0);
  }

  /* ==========================================================
     Click → toggle panel
     ========================================================== */

  function onBubbleClick () {
    // If this click was the tail-end of a drag, ignore it
    if (wasDragged) return;

    if (!panel) {
      createPanel();
    }

    togglePanel();
  }

  /* ==========================================================
     Panel creation & positioning
     ========================================================== */

  function createPanel () {
    panel = document.createElement('div');
    panel.id = 'inspire-panel';

    // Drag handle bar
    const handle = document.createElement('div');
    handle.className = 'inspire-panel-handle';
    handle.innerHTML = '<span class="inspire-handle-grip"></span>';
    panel.appendChild(handle);

    const iframe = document.createElement('iframe');
    iframe.src = chrome.runtime.getURL('popup/popup.html');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('aria-label', 'Inspire Generator Panel');
    panel.appendChild(iframe);

    document.body.appendChild(panel);
    attachPanelDragListeners(handle);
  }

  /* ==========================================================
     Panel dragging
     ========================================================== */

  function attachPanelDragListeners (handle) {
    handle.addEventListener('mousedown', onPanelDragStart);
    handle.addEventListener('touchstart', onPanelDragStart, { passive: false });
  }

  function onPanelDragStart (e) {
    if (e.type === 'mousedown' && e.button !== 0) return;
    e.preventDefault();

    panelDragging = true;
    panel.classList.add('dragging');

    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

    panelDragStartX = clientX;
    panelDragStartY = clientY;
    panelStartX = panel.offsetLeft;
    panelStartY = panel.offsetTop;

    document.addEventListener('mousemove', onPanelDragMove);
    document.addEventListener('mouseup', onPanelDragEnd);
    document.addEventListener('touchmove', onPanelDragMove, { passive: false });
    document.addEventListener('touchend', onPanelDragEnd);
  }

  function onPanelDragMove (e) {
    if (!panelDragging) return;

    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    let newX = panelStartX + (clientX - panelDragStartX);
    let newY = panelStartY + (clientY - panelDragStartY);

    // Keep within viewport
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    newX = Math.max(4, Math.min(newX, vw - PANEL_WIDTH - 4));
    newY = Math.max(4, Math.min(newY, vh - 40));

    panel.style.left = newX + 'px';
    panel.style.top  = newY + 'px';
  }

  function onPanelDragEnd () {
    document.removeEventListener('mousemove', onPanelDragMove);
    document.removeEventListener('mouseup', onPanelDragEnd);
    document.removeEventListener('touchmove', onPanelDragMove);
    document.removeEventListener('touchend', onPanelDragEnd);

    if (!panelDragging) return;
    panelDragging = false;
    panel.classList.remove('dragging');

    // Persist panel position
    const x = parseInt(panel.style.left, 10);
    const y = parseInt(panel.style.top, 10);
    if (!isNaN(x) && !isNaN(y)) {
      try {
        localStorage.setItem(PANEL_STORAGE_KEY, JSON.stringify({ x, y }));
      } catch (_) { /* ignore */ }
    }
  }

  function loadPanelPosition () {
    try {
      const raw = localStorage.getItem(PANEL_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
        return parsed;
      }
    } catch (_) { /* corrupted */ }
    return null;
  }

  function togglePanel () {
    if (!panel) return;

    panelVisible = !panelVisible;

    if (panelVisible) {
      positionPanel();
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  }

  function positionPanel () {
    // If user has manually dragged the panel, restore saved position
    const saved = loadPanelPosition();
    if (saved) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const px = Math.max(4, Math.min(saved.x, vw - PANEL_WIDTH - 4));
      const py = Math.max(4, Math.min(saved.y, vh - 40));
      panel.style.left = px + 'px';
      panel.style.top  = py + 'px';
      return;
    }

    const bx = bubble.offsetLeft;
    const by = bubble.offsetTop;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Try placing above the bubble first
    let px = bx + (BUBBLE_SIZE / 2) - (PANEL_WIDTH / 2);
    let py = by - GAP - PANEL_HEIGHT;

    // If not enough room above, place below
    if (py < 0) {
      py = by + BUBBLE_SIZE + GAP;
    }

    // Clamp horizontal so panel doesn't go off-screen
    px = Math.max(4, Math.min(px, vw - PANEL_WIDTH - 4));

    // Clamp vertical so panel doesn't go off-screen bottom
    py = Math.max(4, Math.min(py, vh - PANEL_HEIGHT - 4));

    panel.style.left = px + 'px';
    panel.style.top  = py + 'px';
  }

  /* ==========================================================
     Message listener (background → content)
     ========================================================== */

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'togglePanel') {
      if (!panel) {
        createPanel();
      }
      togglePanel();
      sendResponse({ success: true });
    }
    // Return false — synchronous response
    return false;
  });

  /* ==========================================================
     Reposition on resize / scroll
     ========================================================== */

  function clampBubble () {
    if (!bubble) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let x = parseInt(bubble.style.left, 10);
    let y = parseInt(bubble.style.top,  10);
    if (isNaN(x)) x = 20;
    if (isNaN(y)) y = 20;
    const cx = Math.max(0, Math.min(x, vw - BUBBLE_SIZE));
    const cy = Math.max(0, Math.min(y, vh - BUBBLE_SIZE));
    if (cx !== x || cy !== y) {
      bubble.style.left = cx + 'px';
      bubble.style.top  = cy + 'px';
      savePosition(cx, cy);
    }
  }

  let resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      clampBubble();
      if (panel && panelVisible) {
        positionPanel();
      }
    }, 150);
  });

  /* ==========================================================
     Save position on page unload (SPA safety)
     ========================================================== */

  window.addEventListener('beforeunload', function () {
    if (bubble) {
      const x = parseInt(bubble.style.left, 10);
      const y = parseInt(bubble.style.top,  10);
      if (!isNaN(x) && !isNaN(y)) savePosition(x, y);
    }
  });

  /* ==========================================================
     Boot
     ========================================================== */

  function init () {
    if (document.body) {
      injectStyles();
      createBubble();
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        injectStyles();
        createBubble();
      });
    }
  }

  init();
})();
