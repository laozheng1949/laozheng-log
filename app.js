const REPO = "laozheng1949/laozheng-log";
const API = `https://api.github.com/repos/${REPO}`;

const posts = [
  {
    slug: "obsidian-study-dashboard",
    date: "2026-08-08",
    title: "把学习变成可见的系统：Study Dashboard",
    excerpt: "一个 Obsidian 学习总览插件，如何把分散的笔记、任务、复习节奏和掌握度组织到同一个界面。",
    tags: ["Obsidian", "学习系统", "开源项目"],
    repo: "https://github.com/laozheng1949/obsidian-study-dashboard",
    blocks: [
      { type: "quote", id: "intro", text: "学习工具真正有价值的地方，不是帮我们收集更多资料，而是让下一步行动变得清楚。" },
      { type: "h2", text: "为什么做这个插件" },
      { type: "p", id: "why", text: "使用 Obsidian 的时间越长，笔记越容易散落在课程、项目、日记和资料文件夹中。信息并没有丢失，但学习状态变得不可见：哪些内容正在学习，哪些该复习，哪些已经真正掌握，很难在一个地方回答。" },
      { type: "p", id: "goal", text: "Study Dashboard 的目标，是把 Vault 从文件集合变成学习系统。它不会替代笔记，而是在笔记之上建立状态、优先级、复习节奏和任务视角，让人打开 Obsidian 时能够直接看到今天最值得处理的内容。" },
      { type: "h2", text: "它能做什么" },
      { type: "list", id: "features", items: ["自动识别文件夹与笔记的学习状态", "用可验证的学习证据跟踪掌握度", "聚合今日待复习、待整理、学习中和核心考点", "整合任务、最近笔记、日历与间隔复习", "允许排除附件、模板和系统目录，减少统计噪声"] },
      { type: "h2", text: "设计思路" },
      { type: "p", id: "design", text: "插件把元数据当作学习行为的接口，而不是要求用户维护复杂表格。状态、难度和重要程度可以逐步补充；即使没有完整标注，仪表盘也能从目录和最近活动中给出有用的起点。" },
      { type: "p", id: "privacy", text: "这是一个本地优先插件。个人笔记和运行时配置不会上传到项目仓库，公开仓库只包含插件代码、样式、清单和使用说明。" },
      { type: "h2", text: "项目用途" },
      { type: "p", id: "use", html: "它适合希望长期经营个人知识库、课程笔记或研究资料的人。你可以在 <a href=\"https://github.com/laozheng1949/obsidian-study-dashboard\" target=\"_blank\" rel=\"noreferrer\">GitHub 仓库</a> 查看源码和安装文件。" }
    ]
  },
  {
    slug: "engine-dynamic-visualization",
    date: "2026-08-08",
    title: "让机械原理动起来：TORQUE 动力实验室",
    excerpt: "把发动机内部运动做成可以旋转、拆解和操控的数字展览，让抽象的四冲程真正被看见。",
    tags: ["Three.js", "机械可视化", "交互设计"],
    repo: "https://github.com/laozheng1949/engine-dynamic-visualization",
    blocks: [
      { type: "quote", id: "intro", text: "机械不该只是冰冷的参数。当结构开始运动，原理才真正被看见。" },
      { type: "h2", text: "为什么要做数字发动机展览" },
      { type: "p", id: "why", text: "发动机原理通常被压缩成几张剖面图和一组术语，但活塞、连杆、曲轴与燃烧过程本质上是连续运动。静态图片能解释结构，却很难传达各部件之间的时间关系。" },
      { type: "p", id: "goal", text: "TORQUE 动力实验室尝试用实时动画重建这种关系。访客可以旋转视角、观察结构、调整运行状态，在同一个画面中理解进气、压缩、做功和排气如何共同完成一个动力循环。" },
      { type: "h2", text: "目前的展品" },
      { type: "list", id: "engines", items: ["直列四缸：紧凑、均衡，是理解四冲程最直观的入口", "V 型六缸：展示两列气缸如何在有限空间中组织动力", "转子发动机：用旋转取代往复，呈现完全不同的燃烧室运动"] },
      { type: "h2", text: "技术与体验" },
      { type: "p", id: "tech", text: "项目使用 React、Three.js 和现代 Web 图形能力构建。重点不只是把模型放进网页，而是让动画、参数、镜头和讲解共同服务于理解，让技术展示具备博物馆式的叙事节奏。" },
      { type: "p", id: "future", text: "未来可以继续加入更多动力构型、爆炸分解视图、声音与负载模拟，并把它扩展成面向机械学习的互动档案。" },
      { type: "h2", text: "项目用途" },
      { type: "p", id: "use", html: "它既是一个机械科普作品，也是对 Web 端实时三维交互的工程实践。源码与模型说明可以在 <a href=\"https://github.com/laozheng1949/engine-dynamic-visualization\" target=\"_blank\" rel=\"noreferrer\">GitHub 仓库</a> 查看。" }
    ]
  }
];

const app = document.querySelector("#app");
const drawer = document.querySelector("#annotationDrawer");
const annotationContext = document.querySelector("#annotationContext");
const annotationList = document.querySelector("#annotationList");
const newAnnotation = document.querySelector("#newAnnotation");
let annotationIssues = [];

function formatDate(value) {
  return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(`${value}T00:00:00+08:00`)).replaceAll("/", ".");
}

function renderHome() {
  document.title = "代码、产品与创造｜老郑的个人博客";
  app.className = "";
  app.innerHTML = `
    <section class="hero">
      <div class="hero-copy">
        <div class="eyebrow"><span class="status-dot"></span> ONLINE · SHANGHAI · UTC+8</div>
        <h1>在代码与灵感之间，<br><span>构建有趣的事。</span></h1>
        <p class="hero-intro">嗨，我是老郑。这里记录我对 <em>技术、产品、设计与数字生活</em> 的观察，以及那些从想法长成作品的过程。</p>
        <div class="hero-actions"><a class="button button-primary" href="#articles">开始阅读 <span>↓</span></a><a class="text-link" href="#about">关于我 <span>↗</span></a></div>
      </div>
      <div class="code-card" aria-label="个人状态卡片">
        <div class="code-card-bar"><span></span><span></span><span></span><small>about.ts</small></div>
        <div class="code-body">
          <p><b>01</b><span class="code-purple">const</span> maker = {</p>
          <p><b>02</b>&nbsp;&nbsp;name: <span class="code-green">"老郑"</span>,</p>
          <p><b>03</b>&nbsp;&nbsp;role: <span class="code-green">"Builder"</span>,</p>
          <p><b>04</b>&nbsp;&nbsp;focus: [</p><p><b>05</b>&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-green">"Product"</span>,</p>
          <p><b>06</b>&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-green">"Code"</span>,</p><p><b>07</b>&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-green">"Curiosity"</span></p>
          <p><b>08</b>&nbsp;&nbsp;],</p><p><b>09</b>&nbsp;&nbsp;shipping: <span class="code-blue">true</span></p><p><b>10</b>};</p>
          <div class="terminal-line"><span>❯</span> status <i>building in public...</i></div>
        </div>
      </div>
    </section>
    <div class="signal-strip" aria-hidden="true"><div><span>THINK</span> ✦ <span>BUILD</span> ✦ <span>SHIP</span> ✦ <span>LEARN</span> ✦ <span>REPEAT</span> ✦ <span>THINK</span> ✦ <span>BUILD</span> ✦</div></div>
    <section class="articles section" id="articles">
      <div class="section-heading"><div><span class="section-index">01 / LOG</span><h2>最新文章</h2></div><p>关于创造、技术，以及偶尔偏离航线的思考。</p></div>
      <div class="tag-filter" aria-label="按标签筛选文章"><button class="is-active" data-tag="全部">全部</button>${[...new Set(posts.flatMap(p => p.tags))].map(tag => `<button data-tag="${tag}">${tag}</button>`).join("")}</div>
      <div class="post-list">${posts.map((post, index) => `
        <a class="post-row" href="?post=${post.slug}" data-tags="${post.tags.join(",")}">
          <div class="post-number">${String(index + 1).padStart(2, "0")}</div>
          <div class="post-content"><div class="post-meta"><time>${formatDate(post.date)}</time><span>·</span><span>${Math.max(3, Math.ceil(JSON.stringify(post.blocks).length / 650))} MIN READ</span></div><h3>${post.title}</h3><p>${post.excerpt}</p><div class="post-tags">${post.tags.map(t => `<span>#${t}</span>`).join("")}</div></div>
          <div class="post-arrow">↗</div>
        </a>`).join("")}</div>
      <div class="github-auth-note"><span><strong>GITHUB_NATIVE</strong> · 评论和行内注释保存在公开 GitHub Issues 中，提交内容必须登录 GitHub。</span><a href="https://github.com/${REPO}/issues" target="_blank" rel="noreferrer">查看公开讨论 ↗</a></div>
    </section>
    <section class="about section" id="about"><div class="about-statement"><span class="section-index">02 / ABOUT</span><h2>相信好的产品来自<br><span>好奇心与手艺。</span></h2></div><div class="about-copy"><p>我喜欢把模糊的问题变成清晰的界面，把反复出现的工作变成可靠的工具。在这里，我分享真实的构建过程——包括那些不那么漂亮、却很有价值的弯路。</p><div class="principles"><div><b>01</b><span>保持简单</span></div><div><b>02</b><span>持续交付</span></div><div><b>03</b><span>公开学习</span></div></div></div></section>`;

  document.querySelectorAll(".tag-filter button").forEach(button => button.addEventListener("click", () => {
    const tag = button.dataset.tag;
    document.querySelectorAll(".tag-filter button").forEach(item => item.classList.toggle("is-active", item === button));
    document.querySelectorAll(".post-row").forEach(row => { row.hidden = tag !== "全部" && !row.dataset.tags.split(",").includes(tag); });
  }));
}

function makeAnnotationLink(post, block) {
  const title = `[注释] ${post.slug}#${block.id}`;
  const marker = `<!-- annotation:${post.slug}:${block.id} -->`;
  const source = (block.text || block.items?.join("；") || "").slice(0, 220);
  const body = `${marker}\n\n> 原文：${source}\n\n请在这里填写你的注释：\n`;
  return `https://github.com/${REPO}/issues/new?labels=annotation&title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
}

function annotationKey(issue) {
  const match = issue.body?.match(/<!-- annotation:([^:]+):([^ ]+) -->/);
  return match ? `${match[1]}:${match[2]}` : "";
}

function cleanAnnotationBody(body = "") {
  return body.replace(/<!-- annotation:[^>]+ -->/, "").replace(/^> 原文：.*$/m, "").replace("请在这里填写你的注释：", "").trim();
}

function openAnnotations(post, block) {
  const key = `${post.slug}:${block.id}`;
  const related = annotationIssues.filter(issue => annotationKey(issue) === key);
  annotationContext.textContent = block.text || block.items?.join("；") || "当前内容块";
  annotationList.replaceChildren();
  if (!related.length) {
    const empty = document.createElement("p"); empty.className = "api-state"; empty.textContent = "这里还没有注释。成为第一个留下思考的人。"; annotationList.append(empty);
  } else {
    related.forEach(issue => {
      const item = document.createElement("article"); item.className = "annotation-item";
      const header = document.createElement("header");
      const author = document.createElement("strong"); author.textContent = `@${issue.user.login}`;
      const link = document.createElement("a"); link.href = issue.html_url; link.target = "_blank"; link.rel = "noreferrer"; link.textContent = `#${issue.number} ↗`;
      header.append(author, link);
      const text = document.createElement("p"); text.textContent = cleanAnnotationBody(issue.body) || "查看 GitHub 中的注释内容";
      item.append(header, text); annotationList.append(item);
    });
  }
  newAnnotation.href = makeAnnotationLink(post, block);
  drawer.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false");
}

function renderBlock(post, block) {
  if (block.type === "h2") { const h = document.createElement("h2"); h.textContent = block.text; return h; }
  const wrapper = document.createElement("div"); wrapper.className = "annotation-block";
  let content;
  if (block.type === "quote") { content = document.createElement("blockquote"); content.textContent = block.text; }
  else if (block.type === "list") { content = document.createElement("ul"); block.items.forEach(value => { const li = document.createElement("li"); li.textContent = value; content.append(li); }); }
  else { content = document.createElement("p"); if (block.html) content.innerHTML = block.html; else content.textContent = block.text; }
  wrapper.append(content);
  const tools = document.createElement("div"); tools.className = "annotation-tools";
  const button = document.createElement("button"); button.type = "button"; button.className = "annotation-trigger"; button.textContent = "注释";
  const count = annotationIssues.filter(issue => annotationKey(issue) === `${post.slug}:${block.id}`).length;
  if (count) { button.classList.add("has-notes"); button.textContent = `注释 ${count}`; }
  button.addEventListener("click", () => openAnnotations(post, block)); tools.append(button); wrapper.append(tools);
  return wrapper;
}

async function loadComments(post) {
  const state = document.querySelector("#commentState");
  const list = document.querySelector("#commentList");
  try {
    const issues = await fetch(`${API}/issues?state=open&labels=discussion&per_page=100`).then(r => { if (!r.ok) throw new Error(); return r.json(); });
    const issue = issues.find(item => item.title === `[讨论] ${post.slug}`);
    if (!issue) throw new Error();
    document.querySelector("#commentLink").href = `${issue.html_url}#new_comment_field`;
    const comments = await fetch(`${API}/issues/${issue.number}/comments?per_page=100`).then(r => { if (!r.ok) throw new Error(); return r.json(); });
    list.replaceChildren();
    if (!comments.length) { state.textContent = "讨论区还没有留言。登录 GitHub 写下第一条评论。"; return; }
    state.remove();
    comments.forEach(comment => {
      const article = document.createElement("article"); article.className = "comment";
      const avatar = document.createElement("a"); avatar.className = "comment-avatar"; avatar.href = comment.user.html_url; avatar.target = "_blank"; avatar.rel = "noreferrer";
      const image = document.createElement("img"); image.src = comment.user.avatar_url; image.alt = ""; avatar.append(image);
      const body = document.createElement("div"); const header = document.createElement("header"); const strong = document.createElement("strong"); strong.textContent = `@${comment.user.login}`;
      const time = document.createElement("time"); time.textContent = formatDate(comment.created_at.slice(0,10)); header.append(strong, time);
      const text = document.createElement("p"); text.textContent = comment.body; body.append(header, text); article.append(avatar, body); list.append(article);
    });
  } catch { state.textContent = "暂时无法读取 GitHub 评论，但仍可前往 GitHub 参与讨论。"; }
}

async function renderPost(post) {
  document.title = `${post.title}｜老郑的个人博客`;
  app.className = "post-main";
  app.innerHTML = `<article class="article"><a class="back-link" href="./#articles">← 返回文章列表</a><header class="article-header"><div class="article-kicker"><time>${formatDate(post.date)}</time><span>·</span><span>项目记录</span></div><h1>${post.title}</h1><p>${post.excerpt}</p><div class="post-tags">${post.tags.map(t => `<span>#${t}</span>`).join("")}</div></header><div class="article-body-static" id="articleBody"></div><footer class="article-end"><span>END_OF_ENTRY</span><div><p>读到这里，谢啦。</p><a href="${post.repo}" target="_blank" rel="noreferrer">查看项目仓库 →</a></div></footer><section class="discussion"><div class="discussion-heading"><div><span class="section-index">DISCUSSION</span><h2>公开讨论</h2></div><p>阅读公开 · 发言需登录 GitHub</p></div><div class="discussion-signin"><p>评论保存在本项目的 GitHub Issue 中。</p><a class="github-discussion-link" id="commentLink" href="https://github.com/${REPO}/issues" target="_blank" rel="noreferrer">登录 GitHub 参与评论 ↗</a></div><p class="api-state" id="commentState">正在连接 GitHub 讨论区…</p><div class="comment-list" id="commentList"></div></section></article>`;
  const body = document.querySelector("#articleBody"); post.blocks.forEach(block => body.append(renderBlock(post, block)));
  loadComments(post);
}

async function boot() {
  try { annotationIssues = await fetch(`${API}/issues?state=open&labels=annotation&per_page=100`).then(r => r.ok ? r.json() : []); } catch { annotationIssues = []; }
  const slug = new URLSearchParams(location.search).get("post");
  const post = posts.find(item => item.slug === slug);
  if (post) renderPost(post); else renderHome();
}

document.querySelector(".menu-toggle").addEventListener("click", event => {
  const nav = document.querySelector(".site-nav"); const open = nav.classList.toggle("is-open"); event.currentTarget.setAttribute("aria-expanded", String(open));
});
document.querySelector("#closeAnnotation").addEventListener("click", () => { drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); });
drawer.addEventListener("click", event => { if (event.target === drawer) document.querySelector("#closeAnnotation").click(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") document.querySelector("#closeAnnotation").click(); });
boot();
