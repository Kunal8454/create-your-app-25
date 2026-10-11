import json

with open("thumbs.json", "r") as f:
    thumbs = json.load(f)

video_thumb = thumbs["video"]
likes_thumb = thumbs["likes"]

html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>TikTok Studio — Video Analytics</title>
  <style>
    * {{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }}
    body {{
      background-color: #0d0d0f;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 0;
      user-select: none;
    }}
    .phone-container {{
      width: 100%;
      max-width: 440px;
      min-height: 100vh;
      background-color: #000000;
      position: relative;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
    }}
    /* Top Status Bar */
    .status-bar {{
      height: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
      font-size: 12px;
      font-weight: 600;
      color: #ffffff;
      background-color: #000000;
      position: sticky;
      top: 0;
      z-index: 60;
    }}
    .status-bar-icons {{
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
    }}
    /* App Navigation Bar */
    .app-bar {{
      height: 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 14px;
      background-color: #000000;
      position: sticky;
      top: 28px;
      z-index: 50;
      border-bottom: 1px solid #141416;
    }}
    .app-bar-left {{
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
    }}
    .back-btn {{
      font-size: 20px;
      font-weight: 300;
      color: #ffffff;
    }}
    .app-title {{
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.2px;
    }}
    .studio-pill {{
      display: flex;
      align-items: center;
      gap: 6px;
      background-color: #242426;
      border-radius: 9999px;
      padding: 6px 12px;
      font-size: 12.5px;
      font-weight: 600;
      color: #ffffff;
      cursor: pointer;
      border: 1px solid #333336;
    }}
    .studio-pill svg {{
      width: 14px;
      height: 14px;
      fill: #ffffff;
    }}
    /* Tabs Bar */
    .tabs-bar {{
      display: flex;
      background-color: #000000;
      border-bottom: 1px solid #1c1c1f;
      position: sticky;
      top: 76px;
      z-index: 45;
    }}
    .tab-item {{
      flex: 1;
      text-align: center;
      padding: 12px 2px;
      font-size: 14px;
      font-weight: 500;
      color: #7c828c;
      cursor: pointer;
      position: relative;
      transition: color 0.15s ease;
    }}
    .tab-item.active {{
      color: #ffffff;
      font-weight: 700;
    }}
    .tab-item.active::after {{
      content: "";
      position: absolute;
      bottom: 0;
      left: 14%;
      right: 14%;
      height: 2.5px;
      background-color: #ffffff;
      border-radius: 2px;
    }}
    /* Main Content Area */
    .content {{
      padding: 12px 14px 50px;
      background-color: #000000;
      flex-grow: 1;
    }}
    /* Video Header */
    .video-header {{
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
      padding: 2px 0;
    }}
    .thumb-box {{
      width: 48px;
      height: 64px;
      border-radius: 4px;
      background-color: #242426;
      overflow: hidden;
      position: relative;
      flex-shrink: 0;
      box-shadow: 0 1px 4px rgba(0,0,0,0.5);
    }}
    .thumb-box img {{
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }}
    .thumb-badge {{
      position: absolute;
      bottom: 2px;
      right: 2px;
      background: rgba(0,0,0,0.75);
      border-radius: 2px;
      font-size: 9px;
      padding: 1px 3px;
      color: #fff;
      font-weight: 600;
    }}
    .post-info {{
      flex-grow: 1;
    }}
    .post-date {{
      font-size: 12px;
      color: #8e8e93;
      margin-bottom: 6px;
      display: block;
    }}
    .stats-row {{
      display: flex;
      align-items: center;
      gap: 12px;
    }}
    .stat-item {{
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11.5px;
      color: #c7c7cc;
    }}
    .stat-item svg {{
      width: 13px;
      height: 13px;
      fill: #8e8e93;
    }}
    /* Cards */
    .tt-card {{
      background-color: #1c1c1e;
      border: 1px solid #28282b;
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 12px;
    }}
    .card-title {{
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 16.5px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 4px;
    }}
    .info-circle {{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1px solid #7c828c;
      color: #7c828c;
      font-size: 9px;
      font-weight: bold;
    }}
    .card-desc {{
      color: #8e8e93;
      font-size: 12px;
      line-height: 1.4;
      margin-bottom: 14px;
      display: block;
    }}
    .metric-headline {{
      font-size: 13.5px;
      font-weight: 600;
      color: #ffffff;
      display: block;
      margin: 4px 0;
    }}
    /* Video Box inside Cards */
    .card-video-box {{
      width: 50%;
      max-width: 215px;
      aspect-ratio: 9 / 14.5;
      margin: 0 auto 16px;
      background-color: #242426;
      border-radius: 6px;
      overflow: hidden;
      position: relative;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
    }}
    .card-video-box img {{
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }}
    /* Chart Section */
    .retention-chart-row {{
      display: flex;
      align-items: stretch;
      height: 96px;
      position: relative;
      margin-top: 6px;
    }}
    .retention-plot {{
      flex: 1;
      position: relative;
      height: 100%;
    }}
    .retention-plot svg {{
      width: 100%;
      height: 100%;
      display: block;
      overflow: visible;
    }}
    .grid-line {{
      stroke: #48494d;
      stroke-width: 0.8;
      stroke-dasharray: 2.2 2.2;
    }}
    .base-line {{
      stroke: #48494d;
      stroke-width: 0.8;
    }}
    .curve-line {{
      fill: none;
      stroke: #55aaff;
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
    }}
    .marker-vertical-line {{
      stroke: #55aaff;
      stroke-width: 0.9;
      vector-effect: non-scaling-stroke;
    }}
    .marker-dot {{
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #55aaff;
      border: 1.5px solid #ffffff;
      transform: translate(-50%, -50%);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
      pointer-events: none;
      z-index: 5;
    }}
    .labels-col {{
      width: 44px;
      flex-shrink: 0;
      position: relative;
    }}
    .lbl-item {{
      position: absolute;
      left: 0;
      display: flex;
      align-items: center;
      transform: translateY(-50%);
    }}
    .lbl-dash {{
      width: 6px;
      height: 0;
      border-bottom: 0.8px dashed #48494d;
      margin-right: 4px;
    }}
    .lbl-text {{
      color: #8e8e93;
      font-size: 11px;
      font-weight: 400;
      line-height: 1;
    }}
    /* Slider Range */
    .slider-row {{
      width: calc(100% - 44px);
      margin-top: 14px;
      position: relative;
    }}
    .slider-range {{
      appearance: none;
      -webkit-appearance: none;
      width: 100%;
      height: 4px;
      display: block;
      margin: 0;
      padding: 0;
      border: 0;
      border-radius: 9999px;
      outline: none;
      cursor: pointer;
      background: linear-gradient(to right, #ffffff 0 var(--progress, 0%), #3f3f42 var(--progress, 0%) 100%);
    }}
    .slider-range::-webkit-slider-runnable-track {{
      height: 4px;
      border-radius: 9999px;
      background: transparent;
    }}
    .slider-range::-webkit-slider-thumb {{
      appearance: none;
      -webkit-appearance: none;
      width: 22px;
      height: 22px;
      margin-top: -9px;
      border: 0;
      border-radius: 50%;
      background-color: #ffffff;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
    }}
    .slider-range::-moz-range-thumb {{
      width: 22px;
      height: 22px;
      border: 0;
      border-radius: 50%;
      background-color: #ffffff;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
    }}
    .times-row {{
      width: calc(100% - 44px);
      display: flex;
      justify-content: space-between;
      color: #8e8e93;
      font-size: 12px;
      margin-top: 10px;
    }}
    /* Key Metrics Grid */
    .km-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 16px;
    }}
    .km-box {{
      background-color: #2c2c2e;
      border: 1.5px solid transparent;
      border-radius: 12px;
      padding: 12px 14px;
      cursor: pointer;
      transition: all 0.2s ease;
    }}
    .km-box.active {{
      background-color: #18283b;
      border-color: #2f80ed;
    }}
    .km-label {{
      color: #8e8e93;
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 4px;
      display: block;
    }}
    .km-val {{
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
    }}
    /* Progress Bars */
    .prog-row {{
      margin-bottom: 12px;
    }}
    .prog-header {{
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      margin-bottom: 6px;
    }}
    .prog-label {{
      color: #ffffff;
    }}
    .prog-pct {{
      color: #8e8e93;
    }}
    .prog-track {{
      height: 4px;
      background-color: #2c2c2e;
      border-radius: 2px;
      overflow: hidden;
    }}
    .prog-fill {{
      height: 100%;
      background-color: #3b82f6;
      border-radius: 2px;
    }}
    /* Dual Bar */
    .dual-nums {{
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 6px;
    }}
    .dual-track {{
      display: flex;
      height: 8px;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 6px;
    }}
    .dual-labels {{
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #8e8e93;
    }}
    /* Toast */
    .toast {{
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: rgba(30,30,30,0.92);
      backdrop-filter: blur(8px);
      color: #fff;
      padding: 10px 18px;
      border-radius: 9999px;
      font-size: 13px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.6);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 100;
      pointer-events: none;
      white-space: nowrap;
    }}
    .toast.show {{
      transform: translateX(-50%) translateY(0);
    }}
    /* Editable Mode */
    [contenteditable="true"] {{
      outline: 1.5px dashed #4ba1ff;
      outline-offset: 2px;
      border-radius: 3px;
      user-select: text;
    }}
  </style>
</head>
<body>
  <div class="phone-container">
    <!-- Status Bar -->
    <div class="status-bar">
      <span>8:03 PM</span>
      <div class="status-bar-icons">
        <span>Vo LTE</span>
        <span>4G</span>
        <span>📶</span>
        <span>🔋 99</span>
      </div>
    </div>

    <!-- Navigation Header -->
    <div class="app-bar">
      <div class="app-bar-left" id="toggleEditBtn" title="Tap to toggle Edit Mode">
        <span class="back-btn">‹</span>
        <span class="app-title" id="appTitleText">Video an...</span>
      </div>
      <div class="studio-pill" id="studioPill">
        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <span>TikTok Studio</span>
      </div>
    </div>

    <!-- Tab Bar -->
    <div class="tabs-bar">
      <div class="tab-item" data-tab="0">Inspiration</div>
      <div class="tab-item active" data-tab="1">Overview</div>
      <div class="tab-item" data-tab="2">Viewers</div>
      <div class="tab-item" data-tab="3">Engagement</div>
    </div>

    <!-- Content Area -->
    <div class="content">
      <!-- Video Header -->
      <div class="video-header">
        <div class="thumb-box">
          <img src="{video_thumb}" alt="Video thumbnail">
          <span class="thumb-badge editable">11.53s</span>
        </div>
        <div class="post-info">
          <span class="post-date editable">Posted on Aug 28, 2026, 10:41 PM</span>
          <div class="stats-row">
            <div class="stat-item">
              <svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
              <span class="editable">284</span>
            </div>
            <div class="stat-item">
              <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <span class="editable">1</span>
            </div>
            <div class="stat-item">
              <svg viewBox="0 0 24 24"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/></svg>
              <span class="editable">0</span>
            </div>
            <div class="stat-item">
              <svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
              <span class="editable">0</span>
            </div>
            <div class="stat-item">
              <svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
              <span class="editable">0</span>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 1: OVERVIEW -->
      <div id="tab-overview" class="tab-content-panel">
        <!-- Key Metrics Card -->
        <div class="tt-card">
          <div class="card-title">
            <span class="editable">Key metrics</span>
            <span class="info-circle">i</span>
          </div>
          <div class="km-grid" id="kmGrid">
            <div class="km-box active" data-idx="0">
              <span class="km-label editable">Views</span>
              <span class="km-val editable">284</span>
            </div>
            <div class="km-box" data-idx="1">
              <span class="km-label editable">Total play time</span>
              <span class="km-val editable">4h 32m</span>
            </div>
            <div class="km-box" data-idx="2">
              <span class="km-label editable">Average watch time</span>
              <span class="km-val editable">1.9s</span>
            </div>
            <div class="km-box" data-idx="3">
              <span class="km-label editable">Watched full video</span>
              <span class="km-val editable">4.5%</span>
            </div>
          </div>
        </div>

        <!-- Retention Rate Card (EXACT SCREENSHOT MATCH) -->
        <div class="tt-card">
          <div class="card-title">
            <span class="editable">Retention rate</span>
            <span class="info-circle">i</span>
          </div>
          <span class="metric-headline editable">On average, viewers watched 29% of your video.</span>
          <span class="card-desc editable">Most viewers stopped watching at 0:01. Check out the moment in your video where most viewers lost interest.</span>

          <!-- Video thumbnail -->
          <div class="card-video-box">
            <img src="{video_thumb}" alt="Retention video preview">
          </div>

          <!-- Retention graph -->
          <div class="retention-chart-row">
            <div class="retention-plot" id="retentionPlot">
              <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#4ba1ff" stop-opacity="0.22" />
                    <stop offset="100%" stop-color="#4ba1ff" stop-opacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="10" x2="1000" y2="10" class="grid-line" />
                <line x1="0" y1="52" x2="1000" y2="52" class="grid-line" />
                <line x1="0" y1="94" x2="1000" y2="94" class="base-line" />

                <path id="retAreaPath" fill="url(#retGrad)" />
                <path id="retCurvePath" class="curve-line" />

                <line id="retVerticalLine" x1="790" y1="10" x2="790" y2="94" class="marker-vertical-line" />
              </svg>
              <div id="retMarkerDot" class="marker-dot"></div>
            </div>

            <div class="labels-col">
              <div class="lbl-item" style="top: 10%;">
                <span class="lbl-dash"></span>
                <span class="lbl-text">100%</span>
              </div>
              <div class="lbl-item" style="top: 52%;">
                <span class="lbl-dash"></span>
                <span class="lbl-text">50%</span>
              </div>
            </div>
          </div>

          <!-- Slider -->
          <div class="slider-row">
            <input type="range" id="retentionSlider" min="0" max="100" value="79" class="slider-range">
          </div>
          <div class="times-row">
            <span id="retentionTimeLbl" class="editable">00:19 (6%)</span>
            <span class="editable">00:24</span>
          </div>
        </div>

        <!-- Traffic Sources -->
        <div class="tt-card">
          <div class="card-title">
            <span class="editable">Traffic sources</span>
            <span class="info-circle">i</span>
          </div>
          <div style="margin-top: 12px;">
            <div class="prog-row">
              <div class="prog-header">
                <span class="prog-label editable">For You</span>
                <span class="prog-pct editable">89.2%</span>
              </div>
              <div class="prog-track"><div class="prog-fill" style="width: 89.2%;"></div></div>
            </div>
            <div class="prog-row">
              <div class="prog-header">
                <span class="prog-label editable">Personal profile</span>
                <span class="prog-pct editable">6.8%</span>
              </div>
              <div class="prog-track"><div class="prog-fill" style="width: 6.8%;"></div></div>
            </div>
            <div class="prog-row">
              <div class="prog-header">
                <span class="prog-label editable">Search</span>
                <span class="prog-pct editable">4.0%</span>
              </div>
              <div class="prog-track"><div class="prog-fill" style="width: 4.0%;"></div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 3: ENGAGEMENT (EXACT SCREENSHOT MATCH) -->
      <div id="tab-engagement" class="tab-content-panel" style="display: none;">
        <!-- Top words card -->
        <div class="tt-card">
          <div class="card-title">
            <span class="editable">Top words used in comments</span>
            <span class="info-circle">i</span>
          </div>
          <span class="card-desc editable">Top word insights are not ready yet. Please check back later.</span>
        </div>

        <!-- Likes card -->
        <div class="tt-card">
          <div class="card-title">
            <span class="editable">Likes</span>
            <span class="info-circle">i</span>
          </div>
          <span class="card-desc editable">Most viewers liked this video at 0:00. Check out the moment where most viewers liked your video.</span>

          <!-- Crossbow video thumbnail -->
          <div class="card-video-box">
            <img src="{likes_thumb}" alt="Likes video preview">
          </div>

          <!-- Likes graph -->
          <div class="retention-chart-row">
            <div class="retention-plot" id="likesPlot">
              <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="likesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#4ba1ff" stop-opacity="0.25" />
                    <stop offset="100%" stop-color="#4ba1ff" stop-opacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="10" x2="1000" y2="10" class="grid-line" />
                <line x1="0" y1="52" x2="1000" y2="52" class="grid-line" />
                <line x1="0" y1="94" x2="1000" y2="94" class="base-line" />

                <path d="M 0,10 L 25,94 L 0,94 Z" fill="url(#likesGrad)" />
                <path d="M 0,10 L 25,94 L 1000,94" class="curve-line" />

                <line id="likesVerticalLine" x1="0" y1="10" x2="0" y2="94" class="marker-vertical-line" />
              </svg>
              <div id="likesMarkerDot" class="marker-dot"></div>
            </div>

            <div class="labels-col">
              <div class="lbl-item" style="top: 10%;">
                <span class="lbl-dash"></span>
                <span class="lbl-text">100%</span>
              </div>
              <div class="lbl-item" style="top: 52%;">
                <span class="lbl-dash"></span>
                <span class="lbl-text">50%</span>
              </div>
            </div>
          </div>

          <!-- Likes Slider -->
          <div class="slider-row">
            <input type="range" id="likesSlider" min="0" max="100" value="0" class="slider-range">
          </div>
          <div class="times-row">
            <span id="likesTimeLbl" class="editable">00:00 (100%)</span>
            <span class="editable">00:24</span>
          </div>
        </div>
      </div>

      <!-- TAB 2: VIEWERS -->
      <div id="tab-viewers" class="tab-content-panel" style="display: none;">
        <div class="tt-card">
          <div class="card-title">
            <span class="editable">Gender</span>
            <span class="info-circle">i</span>
          </div>
          <div style="margin-top: 14px;">
            <div class="dual-nums">
              <span class="editable">68.4%</span>
              <span class="editable">31.6%</span>
            </div>
            <div class="dual-track">
              <div style="width: 68.4%; background-color: #80bdfb;"></div>
              <div style="width: 31.6%; background-color: #527c9f;"></div>
            </div>
            <div class="dual-labels">
              <span class="editable">Female</span>
              <span class="editable">Male</span>
            </div>
          </div>
        </div>

        <div class="tt-card">
          <div class="card-title">
            <span class="editable">Top locations</span>
            <span class="info-circle">i</span>
          </div>
          <div style="margin-top: 12px;">
            <div class="prog-row">
              <div class="prog-header">
                <span class="prog-label editable">United States</span>
                <span class="prog-pct editable">74%</span>
              </div>
              <div class="prog-track"><div class="prog-fill" style="width: 74%;"></div></div>
            </div>
            <div class="prog-row">
              <div class="prog-header">
                <span class="prog-label editable">United Kingdom</span>
                <span class="prog-pct editable">12%</span>
              </div>
              <div class="prog-track"><div class="prog-fill" style="width: 12%;"></div></div>
            </div>
            <div class="prog-row">
              <div class="prog-header">
                <span class="prog-label editable">Canada</span>
                <span class="prog-pct editable">8%</span>
              </div>
              <div class="prog-track"><div class="prog-fill" style="width: 8%;"></div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 0: INSPIRATION -->
      <div id="tab-inspiration" class="tab-content-panel" style="display: none;">
        <div class="tt-card">
          <div class="card-title">
            <span class="editable">Creator Inspiration</span>
            <span class="info-circle">i</span>
          </div>
          <span class="card-desc editable">Trending sounds and hashtags matched for your video content.</span>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div id="toast" class="toast"></div>
  </div>

  <script>
    // --- Retention Curve Math ---
    const RETENTION_POINTS = [
      [0.0, 100.0],
      [0.01, 85.0],
      [0.02, 68.0],
      [0.035, 47.0],
      [0.06, 33.0],
      [0.09, 27.0],
      [0.14, 20.6],
      [0.2, 16.5],
      [0.33, 12.9],
      [0.46, 10.0],
      [0.6, 8.2],
      [0.73, 7.1],
      [0.792, 6.0],
      [0.86, 5.5],
      [1.0, 4.5]
    ];

    function getRetention(progress) {{
      if (progress <= 0) return 100;
      if (progress >= 1) return 5;
      for (let i = 0; i < RETENTION_POINTS.length - 1; i++) {{
        const [t0, r0] = RETENTION_POINTS[i];
        const [t1, r1] = RETENTION_POINTS[i + 1];
        if (progress >= t0 && progress <= t1) {{
          const ratio = (progress - t0) / (t1 - t0);
          const smooth = (1 - Math.cos(ratio * Math.PI)) / 2;
          return Math.round(r0 + (r1 - r0) * smooth);
        }}
      }}
      return 5;
    }}

    // Pre-calculate retention path
    const steps = 100;
    const curvePts = [];
    for (let i = 0; i <= steps; i++) {{
      const p = i / steps;
      const x = (p * 1000).toFixed(1);
      const r = getRetention(p);
      const y = (94 - (r / 100) * 84).toFixed(1);
      curvePts.push([x, y]);
    }}
    const curveD = curvePts.reduce((acc, [x, y], idx) => idx === 0 ? `M ${{x}},${{y}}` : `${{acc}} L ${{x}},${{y}}`, "");
    const areaD = `${{curveD}} L 1000,94 L 0,94 Z`;

    document.getElementById("retCurvePath").setAttribute("d", curveD);
    document.getElementById("retAreaPath").setAttribute("d", areaD);

    // Retention slider interaction
    const retSlider = document.getElementById("retentionSlider");
    const retLine = document.getElementById("retVerticalLine");
    const retDot = document.getElementById("retMarkerDot");
    const retTimeLbl = document.getElementById("retentionTimeLbl");

    function updateRetention(val) {{
      const progress = val / 100;
      const seconds = Math.round(progress * 24);
      const ret = getRetention(progress);
      const x = progress * 1000;
      const yPct = (94 - (ret / 100) * 84);

      retLine.setAttribute("x1", x);
      retLine.setAttribute("x2", x);
      retDot.style.left = `${{progress * 100}}%`;
      retDot.style.top = `${{yPct}}%`;
      retSlider.style.setProperty("--progress", `${{val}}%`);
      retTimeLbl.innerText = `00:${{String(seconds).padStart(2, "0")}} (${{ret}}%)`;
    }}

    retSlider.addEventListener("input", (e) => updateRetention(Number(e.target.value)));
    updateRetention(79);

    // Likes slider interaction
    const likesSlider = document.getElementById("likesSlider");
    const likesLine = document.getElementById("likesVerticalLine");
    const likesDot = document.getElementById("likesMarkerDot");
    const likesTimeLbl = document.getElementById("likesTimeLbl");

    function updateLikes(val) {{
      const progress = val / 100;
      const seconds = Math.round(progress * 24);
      const pct = val === 0 ? 100 : val <= 3 ? Math.round(100 - (val / 3) * 100) : 0;
      const x = progress * 1000;
      const yPct = (94 - (pct / 100) * 84);

      likesLine.setAttribute("x1", x);
      likesLine.setAttribute("x2", x);
      likesDot.style.left = `${{progress * 100}}%`;
      likesDot.style.top = `${{yPct}}%`;
      likesSlider.style.setProperty("--progress", `${{val}}%`);
      likesTimeLbl.innerText = `00:${{String(seconds).padStart(2, "0")}} (${{pct}}%)`;
    }}

    likesSlider.addEventListener("input", (e) => updateLikes(Number(e.target.value)));
    updateLikes(0);

    // Tab Navigation
    const tabs = document.querySelectorAll(".tab-item");
    const panels = {{
      0: document.getElementById("tab-inspiration"),
      1: document.getElementById("tab-overview"),
      2: document.getElementById("tab-viewers"),
      3: document.getElementById("tab-engagement")
    }};

    tabs.forEach(tab => {{
      tab.addEventListener("click", () => {{
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const idx = Number(tab.dataset.tab);
        Object.keys(panels).forEach(key => {{
          panels[key].style.display = Number(key) === idx ? "block" : "none";
        }});
      }});
    }});

    // Key metrics boxes click
    document.querySelectorAll(".km-box").forEach(box => {{
      box.addEventListener("click", () => {{
        document.querySelectorAll(".km-box").forEach(b => b.classList.remove("active"));
        box.classList.add("active");
      }});
    }});

    // Toast helper
    const toast = document.getElementById("toast");
    let toastTimer = null;
    function showToast(msg) {{
      toast.innerText = msg;
      toast.classList.add("show");
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
    }}

    // Toggle Edit Mode (Clicking "Video an...")
    let isEditMode = false;
    document.getElementById("toggleEditBtn").addEventListener("click", () => {{
      isEditMode = !isEditMode;
      document.querySelectorAll(".editable").forEach(el => {{
        el.contentEditable = isEditMode ? "true" : "false";
      }});
      showToast(isEditMode ? "✏️ Edit Mode ON: Tap any text to edit" : "🔒 Edit Mode OFF: Locked");
    }});
  </script>
</body>
</html>
'''

with open("tiktok_studio_dashboard.html", "w", encoding="utf-8") as out:
    out.write(html_content)

print("Saved standalone tiktok_studio_dashboard.html successfully!")
