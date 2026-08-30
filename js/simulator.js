/**
 * Toolbox Interactive Bot Simulator
 * Simulates real-time link extraction, Whisper AI transcription, format conversion & compression
 */
(function () {
  const PRESETS = {
    tiktok: {
      type: "url",
      input: "https://www.tiktok.com/@tech_guru/video/738291048201",
      title: "TikTok: AI Tech Trends in 2026",
      uploader: "@tech_guru",
      duration: "0:45",
      filesize: "14.2 MB",
      badge: "No Watermark • 1080p 60fps",
      actions: ["📥 Video (Clean)", "🎵 Audio Track (MP3)", "🖼️ Photos / Slides", "🎙️ Transcribe AI"]
    },
    youtube: {
      type: "url",
      input: "https://www.youtube.com/watch?v=k38F9b7W8aM",
      title: "Cyberpunk City 8K HDR 60FPS Showcase",
      uploader: "Future Vision Labs",
      duration: "14:20",
      filesize: "482 MB (4K) / 24 MB (1080p)",
      badge: "YouTube 4K / 8K Master",
      actions: ["📥 4K Ultra", "📥 1080p (Fast)", "🎵 MP3 320kbps", "📝 Subtitles / Text"]
    },
    insta: {
      type: "url",
      input: "https://www.instagram.com/reel/C-82kL90pQx/",
      title: "Instagram Reel: Cinematic Drone Shots",
      uploader: "@travel.lens",
      duration: "0:30",
      filesize: "9.8 MB",
      badge: "Instagram Reels • Full HD",
      actions: ["📥 Download Video", "🎵 Audio Only", "🖼️ Cover Photo", "☁️ Save to Cloud"]
    },
    voice: {
      type: "audio",
      input: "voice_note_memo_2026.ogg (0:48)",
      title: "Voice Memo: Project Architecture Brief",
      uploader: "Telegram Voice Message",
      duration: "0:48",
      filesize: "840 KB",
      badge: "Groq Whisper Pro • 99.4% Accuracy",
      actions: ["📝 Full Transcription", "📄 Export to PDF", "🎵 Convert to MP3", "🔣 Audio Hash"]
    },
    compress: {
      type: "compress",
      input: "drone_footage_raw_4k.mp4 (84.6 MB)",
      title: "Raw 4K Drone Footage (Uncompressed)",
      uploader: "Local Video File",
      duration: "1:15",
      filesize: "84.6 MB ➔ 12.8 MB (-85%)",
      badge: "H.265 Two-Pass Lossless Pass",
      actions: ["📥 Download Compressed", "🔄 Convert to WebM", "🗜️ ZIP Archive", "☁️ Pixeldrain 20GB"]
    }
  };

  let isProcessing = false;

  function initSimulator() {
    const inputEl = document.querySelector("#sim-input");
    const runBtn = document.querySelector("#sim-run-btn");
    const terminalLogs = document.querySelector("#sim-logs");
    const previewContainer = document.querySelector("#sim-preview");
    const presetButtons = document.querySelectorAll(".sim-preset-btn");
    const tabButtons = document.querySelectorAll(".sim-tab");

    if (!inputEl || !runBtn) return;

    // Preset button clicks
    presetButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const presetKey = btn.getAttribute("data-preset");
        if (PRESETS[presetKey]) {
          presetButtons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          inputEl.value = PRESETS[presetKey].input;
          runSimulation(PRESETS[presetKey]);
        }
      });
    });

    // Tab buttons
    tabButtons.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabButtons.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        const tabType = tab.getAttribute("data-tab");
        if (tabType === "audio") {
          inputEl.value = "audio_memo_whisper_sample.ogg";
          runSimulation(PRESETS.voice);
        } else if (tabType === "compress") {
          inputEl.value = "video_sample_84mb.mp4";
          runSimulation(PRESETS.compress);
        } else if (tabType === "convert") {
          inputEl.value = "presentation_photos_batch.zip";
          runSimulation({
            type: "convert",
            input: "batch_photos.zip",
            title: "12 High-Res Images Batch",
            uploader: "Multi-Image Document",
            duration: "12 Pages",
            filesize: "42.0 MB",
            badge: "PDF / WebP / ZIP Matrix",
            actions: ["📄 Convert to Single PDF", "🔄 Convert to WebP", "🗜️ Compress Images", "🔑 SHA-256 Hash"]
          });
        } else {
          inputEl.value = PRESETS.tiktok.input;
          runSimulation(PRESETS.tiktok);
        }
      });
    });

    // Run Button click
    runBtn.addEventListener("click", () => {
      const val = inputEl.value.trim();
      if (!val) {
        inputEl.focus();
        return;
      }

      // Check if matches preset, otherwise treat as general link
      let matched = Object.values(PRESETS).find((p) => p.input === val);
      if (!matched) {
        matched = {
          type: "url",
          input: val,
          title: "Extracted Media Stream: " + (val.length > 35 ? val.substring(0, 32) + "..." : val),
          uploader: "Universal Web Extractor",
          duration: "Auto-detected",
          filesize: "Optimal Stream",
          badge: "yt-dlp 1700+ Cluster Verified",
          actions: ["📥 Download Best Quality", "🎵 Extract Audio (MP3)", "🗜️ Lossless Compress", "🎙️ Transcribe AI"]
        };
      }
      runSimulation(matched);
    });

    // Run default preset on load
    setTimeout(() => {
      runSimulation(PRESETS.tiktok);
    }, 600);
  }

  function runSimulation(data) {
    if (isProcessing) return;
    isProcessing = true;

    const runBtn = document.querySelector("#sim-run-btn");
    const terminalLogs = document.querySelector("#sim-logs");
    const previewContainer = document.querySelector("#sim-preview");
    const statusText = document.querySelector("#sim-status-badge");

    if (runBtn) runBtn.classList.add("loading");
    if (previewContainer) {
      previewContainer.classList.remove("show");
      previewContainer.innerHTML = "";
    }

    if (statusText) {
      statusText.innerHTML = `<span class="pulse-dot active"></span> <span>[PROCESSING] Initializing Pipeline...</span>`;
    }

    const logLines = [
      `[SYS_INIT] Request payload received: ${data.input.substring(0, 45)}...`,
      `[CONTENT_PROBE] Handshake confirmed. Identified extractor: ${data.badge}`,
      `[STREAM_RESOLVER] Fetching adaptive manifests & video/audio bitrates...`,
      `[PIPELINE_ROUTING] Worker assigned: TaskCluster-EU-04 | Mode: Instant Bypass`,
      `[DISPATCH_READY] Media prepared in 0.42s with zero compression artifacts.`
    ];

    if (terminalLogs) {
      terminalLogs.innerHTML = "";
      let step = 0;

      const logInterval = setInterval(() => {
        if (step < logLines.length) {
          const p = document.createElement("div");
          p.className = "log-line glow-text";
          p.textContent = logLines[step];
          terminalLogs.appendChild(p);
          terminalLogs.scrollTop = terminalLogs.scrollHeight;
          step++;
        } else {
          clearInterval(logInterval);
          finishSimulation(data);
        }
      }, 220);
    }
  }

  function finishSimulation(data) {
    isProcessing = false;
    const runBtn = document.querySelector("#sim-run-btn");
    const previewContainer = document.querySelector("#sim-preview");
    const statusText = document.querySelector("#sim-status-badge");

    if (runBtn) runBtn.classList.remove("loading");
    if (statusText) {
      statusText.innerHTML = `<span class="pulse-dot done"></span> <span>[STATUS: READY FOR TELEGRAM]</span>`;
    }

    if (previewContainer) {
      previewContainer.innerHTML = `
        <div class="sim-card">
          <div class="sim-card-header">
            <div class="sim-media-type">
              <span class="type-icon">${data.type === "audio" ? "🎙️" : data.type === "compress" ? "🗜️" : "🎬"}</span>
              <span class="type-badge">${data.badge}</span>
            </div>
            <span class="sim-meta-time">⚡ 0.42s</span>
          </div>

          <div class="sim-card-body">
            <h4 class="sim-media-title">${data.title}</h4>
            <div class="sim-meta-row">
              <span class="meta-item">👤 <strong>${data.uploader}</strong></span>
              <span class="meta-item">⏱️ <strong>${data.duration}</strong></span>
              <span class="meta-item">💾 <strong>${data.filesize}</strong></span>
            </div>

            ${
              data.type === "audio"
                ? `<div class="sim-waveform-box">
                    <div class="sim-wave-bars">
                      ${Array.from({ length: 28 })
                        .map(
                          (_, i) =>
                            `<span class="wave-bar" style="height: ${Math.max(
                              15,
                              Math.sin(i * 0.4) * 80 + Math.random() * 20
                            )}%"></span>`
                        )
                        .join("")}
                    </div>
                    <p class="sim-transcription-preview">"Hey! Just confirming that all 1,700 extractors are active and Whisper AI transcription is running smoothly..."</p>
                  </div>`
                : `<div class="sim-preview-video-box">
                    <div class="sim-mock-player">
                      <div class="sim-play-pulse">▶</div>
                      <div class="sim-tag-floating">NO WATERMARK</div>
                    </div>
                  </div>`
            }

            <div class="sim-action-grid">
              ${data.actions
                .map(
                  (act, idx) =>
                    `<button class="sim-action-btn ${idx === 0 ? "primary" : ""}" onclick="ToolboxSimulator.handleActionClick('${act}')">
                      ${act}
                    </button>`
                )
                .join("")}
            </div>

            <div class="sim-telegram-cta">
              <a href="https://t.me/Toolbox_Bot" target="_blank" class="sim-tg-btn">
                <span>🚀 Execute in Telegram Bot</span>
                <span class="tg-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      `;
      previewContainer.classList.add("show");
    }
  }

  function handleActionClick(actionName) {
    const toast = document.createElement("div");
    toast.className = "cyber-toast";
    toast.innerHTML = `<span>⚡ Action selected: <strong>${actionName}</strong></span><br><small>Redirecting to @Toolbox_Bot in Telegram...</small>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("visible"), 10);
    setTimeout(() => {
      toast.classList.remove("visible");
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }

  window.ToolboxSimulator = {
    init: initSimulator,
    run: runSimulation,
    handleActionClick: handleActionClick
  };
})();
