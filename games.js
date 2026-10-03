/* Each game: (stage) => cleanup function. Content comes from SITE_CONFIG.games */

/* 01 — CATCH MY HEART */
let catchFails = 0;
GAMES.catch = stage => {
  const g = C.games.catch;
  let score = 0, time = g.seconds, loopT, iv, live = true, tipShown = false;
  stage.innerHTML = `<div class="hudrow"><span>TIME <b id="gt">${time}</b></span><span>CAUGHT <b id="gs">0</b>/${g.goal}</span></div>
  <div id="arena"><button class="cta" id="go">START</button></div><p class="sub">${g.hint}</p>`;
  const arena = $("#arena");
  const stop = () => { live = false; clearTimeout(loopT); clearInterval(iv); };
  const end = ok => {
    stop(); catchFails = ok ? 0 : catchFails + 1;
    endPanel(stage, { ok, id: "catch", retry: 1, title: ok ? g.winTitle : g.loseTitle,
      line: ok ? rand(g.winLines) : (catchFails >= 3 ? C.messages.believe : g.lose) });
  };
  const spawn = () => {
    const b = document.createElement("button");
    b.className = "heart"; b.textContent = "♥"; b.setAttribute("aria-label", "heart");
    b.style.left = 8 + Math.random() * 74 + "%"; b.style.top = 8 + Math.random() * 74 + "%";
    b.onmouseenter = () => { if (!tipShown) { tipShown = true; whisper(g.hover); } };
    b.onclick = () => {
      if (!live) return;
      burst(arena, b.offsetLeft + 22, b.offsetTop + 22); b.remove(); score++;
      $("#gs").textContent = score; sfx("good");
      if (score >= g.goal) end(true);
    };
    arena.append(b);
    setTimeout(() => b.remove(), Math.max(g.minLife, g.life - score * g.speedUp));
  };
  $("#go").onclick = () => {
    $("#go").remove(); sfx("click");
    const loop = () => { if (!live) return; spawn(); loopT = setTimeout(loop, Math.max(g.minGap, g.gap - score * g.gapStep)); };
    loop();
    iv = setInterval(() => { time--; $("#gt").textContent = time; if (time <= 0) end(false); }, 1000);
  };
  return stop;
};

/* 02 — HOW WELL DO YOU KNOW ME? */
GAMES.quiz = stage => {
  const q = C.games.quiz; let i = 0, ok = 0, tm;
  const done = () => {
    const r = ok / q.questions.length, res = q.results.find(x => r >= x.min) || q.results[q.results.length - 1];
    endPanel(stage, { ok: true, id: "quiz", retry: 1, title: `${ok} / ${q.questions.length}`, line: res.line });
  };
  const ask = () => {
    const d = q.questions[i];
    stage.innerHTML = `<p class="kick">${i + 1} / ${q.questions.length}</p><h2>${T(d.question)}</h2>
    <div class="opts">${d.options.map((o, k) => `<button class="opt" data-k="${k}">${T(o)}</button>`).join("")}</div><p class="react" id="rx">&nbsp;</p>`;
    const bs = $$(".opt", stage);
    bs.forEach(b => b.onclick = () => {
      const good = +b.dataset.k === d.correct;
      bs.forEach(x => x.disabled = true); b.classList.add(good ? "good" : "bad");
      if (!good) bs[d.correct].classList.add("good"); else ok++;
      sfx(good ? "good" : "bad"); $("#rx").textContent = good ? q.right : q.wrong;
      tm = setTimeout(() => ++i < q.questions.length ? ask() : done(), 1700);
    });
  };
  ask();
  return () => clearTimeout(tm);
};

/* 03 — OUR LITTLE ADVENTURE */
GAMES.adventure = stage => {
  const A = C.games.adventure;
  const go = id => {
    const s = A.scenes[id];
    if (s.end) return endPanel(stage, { ok: true, id: "adventure", retry: 1, title: s.title, line: s.text });
    stage.innerHTML = `<div class="panel rise"><p class="story">${T(s.text)}</p></div>
    <div class="opts">${s.choices.map(c => `<button class="opt" data-n="${c[1]}">${T(c[0])}</button>`).join("")}</div>`;
    $$(".opt", stage).forEach(b => b.onclick = () => { sfx("click"); go(b.dataset.n); });
  };
  go("start");
};

/* 04 — CHOOSE CAREFULLY */
GAMES.choose = stage => {
  const c = C.games.choose; let i = 0, tm;
  const ask = () => {
    const r = c.rounds[i];
    stage.innerHTML = `<p class="kick">${i + 1} / ${c.rounds.length}</p><h2>${T(r.prompt)}</h2>
    <div class="opts">${r.options.map((o, k) => `<button class="opt" data-k="${k}">${T(o[0])}</button>`).join("")}</div><p class="react" id="rx">&nbsp;</p>`;
    const bs = $$(".opt", stage);
    bs.forEach(b => b.onclick = () => {
      bs.forEach(x => x.disabled = true); b.classList.add("pick"); sfx("click");
      $("#rx").textContent = T(r.options[+b.dataset.k][1]);
      tm = setTimeout(() => ++i < c.rounds.length ? ask() :
        endPanel(stage, { ok: true, id: "choose", retry: 1, title: c.doneTitle, line: c.doneLine }), 1700);
    });
  };
  ask();
  return () => clearTimeout(tm);
};
