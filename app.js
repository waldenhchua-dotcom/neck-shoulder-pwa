const STORAGE_KEY = "neckShoulderPwa.completions";
const SIDE_REST_SECONDS = 5;
const TRANSITION_REST_SECONDS = 15;
const REP_RELAX_SECONDS = 5;

const sideLabels = {
  center: "双侧",
  right: "右侧",
  left: "左侧"
};

const restExercise = {
  id: "rest",
  name: "放松间隔",
  purpose: "松开姿势，调整呼吸",
  kind: "rest",
  defaultSeconds: SIDE_REST_SECONDS,
  sides: ["center"],
  target: "肩颈和呼吸节奏",
  cue: "松开刚才的动作，肩膀自然放下。",
  focus: "脖子和肩膀回到轻松状态，准备下一段。",
  caution: "如果刚才出现头晕、手麻、刺痛或疼痛加重，就不要继续下一段。",
  visual: "rest",
  visualTips: ["肩膀放下", "慢吸慢呼", "准备下一段"],
  steps: ["松开手和肩膀", "轻轻活动一下手臂或肩膀", "慢慢吸气，再慢慢呼气", "准备进入下一段动作"]
};

const exercises = [
  {
    id: "chin-tuck",
    name: "下巴内收",
    purpose: "颈椎归位",
    kind: "holdReps",
    defaultReps: 10,
    defaultHoldSeconds: 5,
    sides: ["center"],
    target: "后颈、深层颈屈肌",
    cue: "像做双下巴，把头从前伸带回正位。",
    focus: "后颈轻微拉长，脖子后侧有被拉开的感觉。",
    caution: "不是低头，也不是仰头，动作小一点更好。",
    visual: "neck",
    visualTips: ["眼睛平视", "下巴后收", "不低头"],
    steps: ["坐直或站直", "眼睛平视前方", "下巴轻轻往后收", "保持呼吸，不要用力拉脖子"]
  },
  {
    id: "upper-trap-stretch",
    name: "上斜方肌拉伸",
    purpose: "放松肩颈最常用",
    kind: "timer",
    defaultSeconds: 30,
    sides: ["right", "left"],
    target: "脖子侧面到肩膀上方",
    cue: "固定一侧肩膀，头向另一侧轻轻倾斜。",
    focus: "侧颈和肩膀上方有温和拉伸感。",
    caution: "手只是辅助，不要暴力掰头，肩膀不要耸起来。",
    visual: "side-neck",
    sideNotes: {
      right: "右手抓住椅子边缘，左手扶头向左侧倾。",
      left: "左手抓住椅子边缘，右手扶头向右侧倾。"
    },
    visualTips: ["固定肩膀", "头侧倾", "不耸肩"],
    steps: ["坐直", "一手抓住椅子边缘固定肩膀", "另一手轻轻扶头侧倾", "保持肩膀下降"]
  },
  {
    id: "levator-scapulae-stretch",
    name: "肩胛提肌拉伸",
    purpose: "针对后颈和肩胛骨上角酸痛",
    kind: "timer",
    defaultSeconds: 30,
    sides: ["right", "left"],
    target: "后颈偏侧面、肩胛骨内上角",
    cue: "头转 45 度，低头看向对侧腋下。",
    focus: "后颈偏侧面和肩胛骨内上角附近被拉开。",
    caution: "不要压到刺痛或手麻，范围只到舒服的位置。",
    visual: "look-down",
    sideNotes: {
      right: "右手抓椅子，头转向左前方，低头看左侧腋下。",
      left: "左手抓椅子，头转向右前方，低头看右侧腋下。"
    },
    visualTips: ["转 45 度", "看向腋下", "轻扶后脑"],
    steps: ["坐直", "固定一侧肩膀", "头转向对侧前方约 45 度", "低头看向腋下方向", "手轻扶后脑勺稍微加压"]
  },
  {
    id: "doorway-pec-stretch",
    name: "门框胸肌拉伸",
    purpose: "改善圆肩、含胸",
    kind: "timer",
    defaultSeconds: 30,
    sides: ["right", "left"],
    target: "胸大肌、胸小肌、肩膀前侧",
    cue: "前臂贴门框，身体轻轻向前送。",
    focus: "胸前和肩膀前侧展开。",
    caution: "不要腰往前塌，肋骨不要外翻。",
    visual: "doorway",
    sideNotes: {
      right: "右前臂贴门框，右脚微微向前跨。",
      left: "左前臂贴门框，左脚微微向前跨。"
    },
    visualTips: ["手肘 90 度", "胸口向前", "肋骨不翻"],
    steps: ["站在门框旁", "手肘约 90 度，前臂贴门框", "同侧脚稍微向前跨一步", "身体轻轻往前送"]
  },
  {
    id: "cross-body-shoulder-stretch",
    name: "横向抱臂拉伸",
    purpose: "肩后侧放松",
    kind: "timer",
    defaultSeconds: 30,
    sides: ["right", "left"],
    target: "肩膀后侧、三角肌后束",
    cue: "手臂横过胸前，另一只手轻轻拉近。",
    focus: "肩膀后侧有拉伸感，肩膀保持放松。",
    caution: "不要耸肩，不要把肩膀往耳朵顶。",
    visual: "cross-arm",
    sideNotes: {
      right: "右手横过胸前，左手扣住右上臂轻拉。",
      left: "左手横过胸前，右手扣住左上臂轻拉。"
    },
    visualTips: ["横过胸前", "轻拉上臂", "肩膀放松"],
    steps: ["一侧手横过胸前", "另一手扣住上臂", "把手臂轻轻拉向胸口", "保持肩膀放松"]
  },
  {
    id: "child-pose-lat-stretch",
    name: "儿童式背阔肌拉伸",
    purpose: "拉开背部和腋下",
    kind: "timer",
    defaultSeconds: 45,
    sides: ["center"],
    target: "背阔肌、腋下、上背部",
    cue: "臀部坐向脚跟，双手向前伸远。",
    focus: "背部、腋下和上背部逐渐放松。",
    caution: "膝盖或腰不舒服时减小幅度。",
    visual: "child",
    visualTips: ["臀坐脚跟", "手伸远", "胸口下沉"],
    steps: ["跪姿，臀部坐向脚跟", "双手向前伸远", "胸口向地面靠近", "保持缓慢呼吸"]
  },
  {
    id: "cat-cow",
    name: "猫牛式",
    purpose: "活动整个脊柱",
    kind: "reps",
    defaultReps: 10,
    sides: ["center"],
    target: "整条脊柱、上背、腰背",
    cue: "吸气打开胸口，呼气低头拱背。",
    focus: "整条背部慢慢动起来。",
    caution: "慢，不要追求幅度大。",
    visual: "all-fours",
    visualTips: ["吸气打开", "呼气拱背", "慢慢移动"],
    steps: ["四点跪姿，双手在肩下，膝盖在髋下", "吸气抬头，胸口打开，腰背微微下沉", "呼气低头拱背，把背向上顶"]
  },
  {
    id: "thread-the-needle",
    name: "穿针式",
    purpose: "打开上背和胸椎旋转",
    kind: "timer",
    defaultSeconds: 30,
    sides: ["right", "left"],
    target: "上背部、肩胛骨内侧、胸椎",
    cue: "一只手从另一侧手臂下穿过去。",
    focus: "上背和肩胛骨内侧慢慢展开。",
    caution: "肩膀贴近地面即可，不要硬压。",
    visual: "thread",
    sideNotes: {
      right: "右手从左手和左膝之间穿过去，右肩轻轻靠近地面。",
      left: "左手从右手和右膝之间穿过去，左肩轻轻靠近地面。"
    },
    visualTips: ["手臂穿过", "肩贴近地", "不硬压"],
    steps: ["四点跪姿", "一只手从对侧手和膝盖之间穿过去", "同侧肩膀和头部轻轻靠近地面", "保持呼吸"]
  },
  {
    id: "chair-thoracic-extension",
    name: "椅背胸椎伸展",
    purpose: "改善驼背、上背僵硬",
    kind: "reps",
    defaultReps: 8,
    sides: ["center"],
    target: "胸椎、上背部",
    cue: "上背靠椅背，轻轻向后伸展。",
    focus: "上背打开，不是腰拼命后仰。",
    caution: "让椅背顶在中上背附近，腰部保持稳定。",
    visual: "chair",
    visualTips: ["顶住上背", "胸椎后伸", "腰别代偿"],
    steps: ["坐在椅子上", "双手抱头或交叉放胸前", "上背靠在椅背上", "身体轻轻向后伸展再回来"]
  },
  {
    id: "wall-angels",
    name: "靠墙天使",
    purpose: "肩胛稳定",
    kind: "reps",
    defaultReps: 10,
    sides: ["center"],
    target: "肩胛稳定、肩关节活动",
    cue: "背靠墙，手臂慢慢向上滑再放下。",
    focus: "肩胛更稳定，肩颈不抢力。",
    caution: "不要耸肩，不要腰过度拱起，手贴不到墙也没关系。",
    visual: "wall",
    visualTips: ["背贴墙", "手慢上滑", "不耸肩"],
    steps: ["背靠墙站立", "后脑勺、上背、臀部尽量贴墙", "手臂像投降姿势一样贴墙", "慢慢向上滑，再慢慢放下"]
  }
];

const programs = [
  {
    id: "daily-12",
    title: "每日肩颈舒展",
    durationLabel: "约 12 分钟",
    description: "完整版本，覆盖颈椎归位、肩颈放松、胸椎活动和肩胛稳定。",
    items: [
      { exerciseId: "chin-tuck", reps: 10, holdSeconds: 5 },
      { exerciseId: "upper-trap-stretch", seconds: 30 },
      { exerciseId: "levator-scapulae-stretch", seconds: 30 },
      { exerciseId: "doorway-pec-stretch", seconds: 30 },
      { exerciseId: "cross-body-shoulder-stretch", seconds: 30 },
      { exerciseId: "child-pose-lat-stretch", seconds: 45 },
      { exerciseId: "cat-cow", reps: 10 },
      { exerciseId: "thread-the-needle", seconds: 30 },
      { exerciseId: "chair-thoracic-extension", reps: 8 },
      { exerciseId: "wall-angels", reps: 10 }
    ]
  },
  {
    id: "quick-5",
    title: "5 分钟精简版",
    durationLabel: "约 5 分钟",
    description: "时间紧时优先做，对肩颈紧、圆肩、上背僵硬最划算。",
    items: [
      { exerciseId: "chin-tuck", reps: 10, holdSeconds: 5 },
      { exerciseId: "upper-trap-stretch", seconds: 20 },
      { exerciseId: "doorway-pec-stretch", seconds: 20 },
      { exerciseId: "cat-cow", reps: 10 },
      { exerciseId: "thread-the-needle", seconds: 20 }
    ]
  }
];

const els = {
  homeView: document.querySelector("#home-view"),
  sessionView: document.querySelector("#session-view"),
  doneView: document.querySelector("#done-view"),
  programCards: document.querySelector("#program-cards"),
  todayCount: document.querySelector("#today-count"),
  totalCount: document.querySelector("#total-count"),
  backHome: document.querySelector("#back-home"),
  progressFill: document.querySelector("#progress-fill"),
  progressCount: document.querySelector("#progress-count"),
  segmentMeta: document.querySelector("#segment-meta"),
  sideMode: document.querySelector("#side-mode"),
  exerciseName: document.querySelector("#exercise-name"),
  exercisePurpose: document.querySelector("#exercise-purpose"),
  poseImage: document.querySelector("#pose-image"),
  timerLabel: document.querySelector("#timer-label"),
  timerValue: document.querySelector("#timer-value"),
  timerSubtitle: document.querySelector("#timer-subtitle"),
  exerciseCue: document.querySelector("#exercise-cue"),
  sideNote: document.querySelector("#side-note"),
  stepList: document.querySelector("#step-list"),
  exerciseFocus: document.querySelector("#exercise-focus"),
  exerciseTarget: document.querySelector("#exercise-target"),
  exerciseCaution: document.querySelector("#exercise-caution"),
  previousAction: document.querySelector("#previous-action"),
  primaryAction: document.querySelector("#primary-action"),
  skipAction: document.querySelector("#skip-action"),
  restartProgram: document.querySelector("#restart-program"),
  doneHome: document.querySelector("#done-home")
};

const state = {
  screen: "home",
  selectedProgram: programs[0],
  segments: [],
  segmentIndex: 0,
  sessionStartedAt: 0,
  isRunning: false,
  secondsLeft: 0,
  repCount: 0,
  holdLeft: 0,
  holdPhase: "hold",
  repRelaxLeft: 0,
  timerId: 0,
  completions: loadCompletions()
};

function getExercise(id) {
  const exercise = exercises.find((item) => item.id === id);
  if (!exercise) {
    throw new Error(`Unknown exercise: ${id}`);
  }
  return exercise;
}

function buildSession(program) {
  const exerciseSegments = program.items.flatMap((item) => {
    const exercise = getExercise(item.exerciseId);
    const sets = item.sets ?? 1;
    const sides = item.sides ?? exercise.sides;
    const segments = [];

    for (let setIndex = 1; setIndex <= sets; setIndex += 1) {
      sides.forEach((side) => {
        segments.push({
          id: `${exercise.id}-${side}-${setIndex}`,
          exercise,
          side,
          setIndex,
          totalSets: sets,
          seconds: item.seconds ?? exercise.defaultSeconds,
          reps: item.reps ?? exercise.defaultReps,
          holdSeconds: item.holdSeconds ?? exercise.defaultHoldSeconds
        });
      });
    }

    return segments;
  });

  return exerciseSegments.flatMap((segment, index) => {
    const nextSegment = exerciseSegments[index + 1];

    if (!nextSegment) {
      return [segment];
    }

    const isSameAction = nextSegment.exercise.id === segment.exercise.id;

    return [
      segment,
      {
        id: `rest-after-${segment.id}`,
        exercise: restExercise,
        side: "center",
        setIndex: 1,
        totalSets: 1,
        restType: isSameAction ? "side" : "transition",
        seconds: isSameAction ? SIDE_REST_SECONDS : TRANSITION_REST_SECONDS,
        nextSide: nextSegment.side,
        nextExerciseName: nextSegment.exercise.name
      }
    ];
  });
}

function estimateProgramSeconds(program) {
  return buildSession(program).reduce((sum, segment) => {
    if (segment.exercise.kind === "timer") {
      return sum + (segment.seconds ?? 0);
    }
    if (segment.exercise.kind === "rest") {
      return sum + (segment.seconds ?? SIDE_REST_SECONDS);
    }
    if (segment.exercise.kind === "holdReps") {
      const reps = segment.reps ?? 0;
      return sum + reps * (segment.holdSeconds ?? 0) + Math.max(0, reps - 1) * REP_RELAX_SECONDS;
    }
    return sum + (segment.reps ?? 0) * 3;
  }, 0);
}

function formatSeconds(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function formatDurationText(seconds) {
  if (seconds >= 60) {
    return formatSeconds(seconds);
  }

  return `${seconds} 秒`;
}

function sidesForAction(segment) {
  return [
    ...new Set(
      state.segments
        .filter((item) => item.exercise.kind !== "rest" && item.exercise.id === segment.exercise.id)
        .map((item) => item.side)
    )
  ];
}

function isTwoSideAction(segment) {
  const sides = sidesForAction(segment);
  return sides.includes("right") && sides.includes("left");
}

function restKindLabel(segment) {
  if (segment.restType === "transition") {
    return "换动作准备";
  }

  if (segment.restType === "side") {
    return "换侧放松";
  }

  return "放松间隔";
}

function restDisplayName(segment) {
  if (segment.restType === "transition") {
    return `准备 ${segment.seconds ?? TRANSITION_REST_SECONDS} 秒`;
  }

  if (segment.restType === "side") {
    return `换侧 ${segment.seconds ?? SIDE_REST_SECONDS} 秒`;
  }

  return `放松 ${segment.seconds ?? SIDE_REST_SECONDS} 秒`;
}

function restPurpose(segment) {
  if (segment.restType === "transition") {
    return "调整位置，准备下一个动作";
  }

  if (segment.restType === "side") {
    return "松开当前侧，准备换到另一侧";
  }

  return segment.exercise.purpose;
}

function restSubtitle(segment) {
  if (segment.restType === "side") {
    return `下一侧：${sideLabels[segment.nextSide] ?? "另一侧"} · 仍是${segment.nextExerciseName}`;
  }

  return segment.nextExerciseName ? `下一动作：${segment.nextExerciseName}` : "准备结束";
}

function exerciseNameFor(segment) {
  if (segment.exercise.kind === "rest") {
    return restDisplayName(segment);
  }

  return segment.exercise.name;
}

function exercisePurposeFor(segment) {
  if (segment.exercise.kind === "rest") {
    return restPurpose(segment);
  }

  return segment.exercise.purpose;
}

function sideAwareMeta(segment) {
  if (segment.exercise.kind === "rest") {
    return `${restKindLabel(segment)} · ${formatDurationText(segment.seconds ?? SIDE_REST_SECONDS)}`;
  }

  if (isTwoSideAction(segment)) {
    return `${sideLabels[segment.side]} · 左右模式 · 第 ${segment.setIndex}/${segment.totalSets} 组`;
  }

  return `双侧一起 · 第 ${segment.setIndex}/${segment.totalSets} 组`;
}

function timerSubtitleFor(segment) {
  if (isTwoSideAction(segment)) {
    return `${sideLabels[segment.side]} · 左右各 ${formatDurationText(segment.seconds ?? 0)} · 两侧做完再换动作`;
  }

  return "双侧一起完成";
}

function renderSideMode(segment) {
  els.sideMode.innerHTML = "";
  els.sideMode.className = `side-mode ${isTwoSideAction(segment) ? "side-mode-split" : "side-mode-center"}`;

  const track = document.createElement("div");
  track.className = "side-mode-track";

  const addChip = (label, active) => {
    const chip = document.createElement("span");
    chip.className = active ? "side-chip side-chip-active" : "side-chip";
    chip.textContent = label;
    track.append(chip);
  };

  if (segment.exercise.kind === "rest") {
    addChip(restKindLabel(segment), true);
    const note = document.createElement("span");
    note.className = "side-mode-note";
    note.textContent = restSubtitle(segment);
    els.sideMode.append(track, note);
    return;
  }

  if (isTwoSideAction(segment)) {
    addChip("右侧", segment.side === "right");
    addChip("左侧", segment.side === "left");
    const note = document.createElement("span");
    note.className = "side-mode-note";
    note.textContent = "左右都完成后进入下一动作";
    els.sideMode.append(track, note);
    return;
  }

  addChip("双侧一起", true);
  const note = document.createElement("span");
  note.className = "side-mode-note";
  note.textContent = "不分左右";
  els.sideMode.append(track, note);
}

function loadCompletions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveCompletions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.completions.slice(0, 50)));
}

function vibrate(pattern = 35) {
  if ("vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

function renderHome() {
  els.programCards.innerHTML = "";
  programs.forEach((program) => {
    const button = document.createElement("button");
    button.className = "program-card";
    button.type = "button";
    button.innerHTML = `
      <div class="program-title-row">
        <span class="program-title">${program.title}</span>
        <span class="duration-badge">${program.durationLabel}</span>
      </div>
      <p class="program-description">${program.description}</p>
      <p class="program-meta">${buildSession(program).length} 个训练段 · 换侧 ${SIDE_REST_SECONDS} 秒 · 换动作 ${TRANSITION_REST_SECONDS} 秒 · 估算 ${formatSeconds(estimateProgramSeconds(program))}</p>
    `;
    button.addEventListener("click", () => startProgram(program));
    els.programCards.append(button);
  });
  renderStats();
}

function renderStats() {
  const today = new Date().toDateString();
  const todayCount = state.completions.filter((item) => new Date(item.completedAt).toDateString() === today).length;
  els.todayCount.textContent = String(todayCount);
  els.totalCount.textContent = String(state.completions.length);
}

function showView(viewName) {
  state.screen = viewName;
  [els.homeView, els.sessionView, els.doneView].forEach((view) => view.classList.remove("view-active"));
  if (viewName === "home") {
    els.homeView.classList.add("view-active");
  }
  if (viewName === "session") {
    els.sessionView.classList.add("view-active");
  }
  if (viewName === "done") {
    els.doneView.classList.add("view-active");
  }
}

function startProgram(program) {
  state.selectedProgram = program;
  state.segments = buildSession(program);
  state.segmentIndex = 0;
  state.sessionStartedAt = Date.now();
  state.isRunning = true;
  setupSegment();
  showView("session");
  startTicker();
  vibrate(25);
}

function setupSegment() {
  const segment = currentSegment();
  if (!segment) {
    return;
  }

    if (segment.exercise.kind === "timer" || segment.exercise.kind === "rest") {
      state.secondsLeft = segment.seconds ?? 0;
      state.repCount = 0;
      state.holdLeft = 0;
      state.holdPhase = "hold";
      state.repRelaxLeft = 0;
  }

  if (segment.exercise.kind === "reps") {
    state.repCount = 0;
    state.secondsLeft = 0;
    state.holdLeft = 0;
    state.holdPhase = "hold";
    state.repRelaxLeft = 0;
  }

  if (segment.exercise.kind === "holdReps") {
    state.repCount = 1;
    state.holdLeft = segment.holdSeconds ?? 0;
    state.secondsLeft = 0;
    state.holdPhase = "hold";
    state.repRelaxLeft = 0;
  }

  renderSession();
}

function currentSegment() {
  return state.segments[state.segmentIndex];
}

function renderSession() {
  const segment = currentSegment();
  if (!segment) {
    return;
  }

  const exercise = segment.exercise;
  const progress = state.segments.length === 0 ? 0 : ((state.segmentIndex + 1) / state.segments.length) * 100;
  els.progressFill.style.width = `${Math.round(progress)}%`;
  els.progressCount.textContent = `${state.segmentIndex + 1}/${state.segments.length}`;
  els.segmentMeta.textContent = sideAwareMeta(segment);
  els.exerciseName.textContent = exerciseNameFor(segment);
  els.exercisePurpose.textContent = exercisePurposeFor(segment);
  els.exerciseCue.textContent = exercise.cue;
  els.exerciseFocus.textContent = exercise.focus;
  els.exerciseTarget.textContent = exercise.target;
  els.exerciseCaution.textContent = exercise.caution;
  renderPoseImage(exercise.id);
  renderSideMode(segment);

  const note = exercise.sideNotes?.[segment.side] ?? "";
  els.sideNote.textContent = note;
  els.sideNote.hidden = note.length === 0;

  els.stepList.innerHTML = "";
  exercise.steps.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    els.stepList.append(li);
  });

  if (exercise.kind === "timer") {
    els.timerLabel.textContent = "倒计时";
    els.timerValue.textContent = formatSeconds(state.secondsLeft);
    els.timerSubtitle.textContent = timerSubtitleFor(segment);
    els.primaryAction.textContent = state.isRunning ? "暂停" : "继续";
  }

  if (exercise.kind === "rest") {
    els.timerLabel.textContent = segment.restType === "transition" ? "准备" : "放松";
    els.timerValue.textContent = `${state.secondsLeft}s`;
    els.timerSubtitle.textContent = restSubtitle(segment);
    els.primaryAction.textContent = state.isRunning ? "暂停" : "继续";
  }

  if (exercise.kind === "reps") {
    els.timerLabel.textContent = "次数";
    els.timerValue.textContent = `${state.repCount}/${segment.reps ?? 0}`;
    els.timerSubtitle.textContent = "做完一次点一下";
    els.primaryAction.textContent = "完成一次";
  }

  if (exercise.kind === "holdReps") {
    if (state.holdPhase === "relax") {
      els.timerLabel.textContent = "微放松";
      els.timerValue.textContent = `${state.repRelaxLeft}s`;
      els.timerSubtitle.textContent = `下一次：第 ${state.repCount + 1}/${segment.reps ?? 0} 次`;
    } else {
      els.timerLabel.textContent = "保持";
      els.timerValue.textContent = `${state.holdLeft}s`;
      els.timerSubtitle.textContent = `第 ${state.repCount}/${segment.reps ?? 0} 次`;
    }
    els.primaryAction.textContent = state.isRunning ? "暂停" : "继续";
  }
}

function renderPoseImage(exerciseId) {
  els.poseImage.src = `./assets/exercises/${exerciseId}.png`;
}

function renderVisual(kind) {
  const standing = [
    ["circle", "silhouette-head", "111", "43", "13"],
    ["path", "silhouette", "M100 60c-5 17-4 38 3 55h16c7-17 8-38 3-55-6 5-16 5-22 0Z"],
    ["path", "silhouette", "M100 67c-9 15-15 33-18 54-1 7 9 9 11 2 3-18 8-33 15-46Z"],
    ["path", "silhouette", "M122 67c9 15 15 33 18 54 1 7-9 9-11 2-3-18-8-33-15-46Z"],
    ["path", "silhouette", "M104 112c-6 13-12 29-18 48-2 8 10 11 13 3l12-35 12 35c3 8 15 5 13-3-6-19-12-35-18-48Z"]
  ];

  const relaxed = [
    ["circle", "silhouette-head", "111", "43", "13"],
    ["path", "silhouette", "M100 60c-5 17-4 38 3 55h16c7-17 8-38 3-55-6 5-16 5-22 0Z"],
    ["path", "silhouette", "M100 69c-10 14-15 30-16 50 0 7 10 8 11 1 2-15 7-29 15-41Z"],
    ["path", "silhouette", "M122 69c10 14 15 30 16 50 0 7-10 8-11 1-2-15-7-29-15-41Z"],
    ["path", "silhouette", "M104 112c-6 13-12 29-18 48-2 8 10 11 13 3l12-35 12 35c3 8 15 5 13-3-6-19-12-35-18-48Z"],
    ["path", "guide", "M75 57c-8 18-8 39 1 57M147 57c8 18 8 39-1 57"]
  ];

  const presets = {
    neck: [
      ...standing,
      ["path", "guide", "M84 44c14-20 39-24 58-7M91 48h44"]
    ],
    "side-neck": [
      ["circle", "silhouette-head", "102", "45", "13"],
      ["path", "silhouette", "M100 61c-5 17-4 38 3 55h16c7-17 8-38 3-55-6 5-16 5-22 0Z"],
      ["path", "silhouette", "M98 69c-16 17-27 32-34 48-3 7 7 12 11 5 8-14 19-28 34-42Z"],
      ["path", "silhouette", "M122 68c12 10 25 18 40 23 7 2 11-8 4-12-14-6-27-14-39-25Z"],
      ["path", "silhouette", "M104 113c-6 13-12 29-18 47-2 8 10 11 13 3l12-35 12 35c3 8 15 5 13-3-6-18-12-34-18-47Z"],
      ["path", "guide", "M128 42c-7 21-22 35-42 42"]
    ],
    "look-down": [
      ["circle", "silhouette-head", "101", "53", "13"],
      ["path", "silhouette", "M100 70c-5 15-4 34 3 48h16c7-14 8-33 3-48-6 5-16 5-22 0Z"],
      ["path", "silhouette", "M99 77c-15 14-27 27-36 41-4 7 6 13 11 6 8-11 20-23 34-35Z"],
      ["path", "silhouette", "M122 76c11 11 24 20 39 27 7 3 12-8 5-12-14-6-27-15-39-26Z"],
      ["path", "silhouette", "M104 116c-6 12-12 27-18 45-2 8 10 11 13 3l12-33 12 33c3 8 15 5 13-3-6-18-12-33-18-45Z"],
      ["path", "guide", "M128 52c-11 22-27 35-51 40"]
    ],
    doorway: [
      ["path", "prop", "M67 31v133"],
      ["circle", "silhouette-head", "119", "45", "13"],
      ["path", "silhouette", "M108 62c-5 17-4 38 3 55h16c7-17 8-38 3-55-6 5-16 5-22 0Z"],
      ["path", "silhouette", "M109 70H77c-6 0-6 10 0 10h24V42c0-7-11-7-11 0v30Z"],
      ["path", "silhouette", "M130 70c11 13 24 24 38 32 7 4 13-7 6-12-13-7-24-17-35-29Z"],
      ["path", "silhouette", "M111 114c-8 12-17 27-26 45-3 8 8 13 12 5l18-33 23 32c4 7 15 1 10-6-11-17-21-31-32-43Z"]
    ],
    "cross-arm": [
      ["circle", "silhouette-head", "111", "43", "13"],
      ["path", "silhouette", "M100 60c-5 17-4 38 3 55h16c7-17 8-38 3-55-6 5-16 5-22 0Z"],
      ["path", "silhouette", "M75 78c29 16 62 20 96 8 7-2 4-13-4-11-30 9-58 7-85-7-7-3-14 7-7 10Z"],
      ["path", "silhouette", "M104 112c-6 13-12 29-18 48-2 8 10 11 13 3l12-35 12 35c3 8 15 5 13-3-6-19-12-35-18-48Z"],
      ["path", "guide", "M73 91c28 22 63 25 99 7"]
    ],
    child: [
      ["circle", "silhouette-head", "72", "121", "12"],
      ["path", "silhouette", "M83 120c25-24 57-34 96-31 8 1 8 13 0 13-35-1-62 8-83 28Z"],
      ["path", "silhouette", "M104 132c-14 11-25 20-35 28-6 5 2 14 9 9 10-7 22-15 36-25Z"],
      ["path", "silhouette", "M116 130c16 8 29 17 42 28 6 5 14-4 8-10-13-12-27-22-43-31Z"],
      ["path", "silhouette", "M121 98c22-11 43-18 64-20 8-1 10 11 2 13-19 3-39 9-59 19Z"],
      ["path", "silhouette", "M122 110c23-5 43-7 64-6 8 1 8 13 0 13-20-1-39 0-60 5Z"],
      ["path", "guide", "M102 106c24-24 54-36 84-38"]
    ],
    "all-fours": [
      ["circle", "silhouette-head", "72", "85", "13"],
      ["path", "silhouette", "M88 91c30-18 66-18 103 0 7 3 3 14-5 11-34-14-63-14-91 0-8 3-14-7-7-11Z"],
      ["path", "silhouette", "M91 101c-8 16-14 32-19 50-2 8 10 11 13 3 5-17 11-32 19-46Z"],
      ["path", "silhouette", "M118 103c-3 17-5 33-5 51 0 8 12 8 12 0 0-17 2-32 5-48Z"],
      ["path", "silhouette", "M157 103c1 17 3 34 6 51 1 8 13 6 12-2-3-18-5-34-6-51Z"],
      ["path", "silhouette", "M186 99c8 15 15 32 20 51 2 8 14 5 12-3-6-20-13-38-22-54Z"],
      ["path", "guide", "M91 84c31-13 63-13 96 1"]
    ],
    thread: [
      ["circle", "silhouette-head", "72", "126", "12"],
      ["path", "silhouette", "M88 119c27-18 61-24 100-18 8 1 7 13-1 13-35-5-65 1-89 18Z"],
      ["path", "silhouette", "M103 131c-12 10-22 19-33 28-6 5 2 14 9 9 11-8 22-16 34-26Z"],
      ["path", "silhouette", "M130 124c15 10 28 20 39 33 5 6 14-2 9-9-12-14-26-26-43-37Z"],
      ["path", "silhouette", "M101 109c19 5 39 11 60 18 8 3 12-9 4-12-21-8-42-14-62-19Z"],
      ["path", "silhouette", "M128 99c18-12 36-22 55-30 8-3 12 8 5 12-18 8-35 18-52 30Z"],
      ["path", "guide", "M94 119c26-25 59-34 95-30"]
    ],
    chair: [
      ["path", "prop", "M81 116h88v48M169 116v48"],
      ["circle", "silhouette-head", "107", "48", "13"],
      ["path", "silhouette", "M102 64c-9 18-11 37-5 57 2 7 14 4 12-4-4-16-2-31 5-46Z"],
      ["path", "silhouette", "M101 86c-12 8-23 16-34 25-6 5 2 14 9 9 10-8 21-15 32-23Z"],
      ["path", "silhouette", "M105 87c10 9 21 17 32 24 7 4 13-6 7-11-11-7-21-15-31-24Z"],
      ["path", "silhouette", "M99 122c19 2 38 2 57 0 8-1 9 11 1 12-20 3-39 3-59 0Z"],
      ["path", "silhouette", "M132 128c8 10 16 20 23 32 4 7-6 13-11 7-7-11-14-21-22-30Z"]
    ],
    wall: [
      ["path", "prop", "M57 31v133M165 31v133"],
      ["circle", "silhouette-head", "111", "44", "13"],
      ["path", "silhouette", "M100 61c-5 17-4 38 3 55h16c7-17 8-38 3-55-6 5-16 5-22 0Z"],
      ["path", "silhouette", "M103 75 78 48c-5-5-13 3-8 8l27 29Z"],
      ["path", "silhouette", "M119 75l25-27c5-5 13 3 8 8l-27 29Z"],
      ["path", "silhouette", "M104 112c-6 13-12 29-18 48-2 8 10 11 13 3l12-35 12 35c3 8 15 5 13-3-6-19-12-35-18-48Z"]
    ],
    rest: relaxed
  };

  const shapes = presets[kind] ?? presets.neck;
  const mat = '<path class="mat" d="M35 166h150" />';
  const body = shapes
    .map((shape) => {
      if (shape[0] === "circle") {
        return `<circle class="${shape[1]}" cx="${shape[2]}" cy="${shape[3]}" r="${shape[4]}" />`;
      }
      return `<path class="${shape[1]}" d="${shape[2]}" />`;
    })
    .join("");
  els.poseSvg.innerHTML = `${mat}${body}`;
}

function startTicker() {
  stopTicker();
  state.timerId = window.setInterval(tick, 1000);
}

function stopTicker() {
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = 0;
  }
}

function tick() {
  if (!state.isRunning || state.screen !== "session") {
    return;
  }

  const segment = currentSegment();
  if (!segment) {
    return;
  }

  if (segment.exercise.kind === "timer" || segment.exercise.kind === "rest") {
    state.secondsLeft -= 1;
    if (state.secondsLeft <= 0) {
      moveNext();
      return;
    }
  }

  if (segment.exercise.kind === "holdReps") {
    if (state.holdPhase === "relax") {
      state.repRelaxLeft -= 1;
      if (state.repRelaxLeft <= 0) {
        state.repCount += 1;
        state.holdLeft = segment.holdSeconds ?? 0;
        state.holdPhase = "hold";
        state.repRelaxLeft = 0;
        vibrate(20);
      }
      renderSession();
      return;
    }

    state.holdLeft -= 1;
    if (state.holdLeft <= 0) {
      if (state.repCount >= (segment.reps ?? 1)) {
        moveNext();
        return;
      }
      state.holdPhase = "relax";
      state.repRelaxLeft = REP_RELAX_SECONDS;
      state.holdLeft = 0;
      vibrate(20);
    }
  }

  renderSession();
}

function togglePrimaryAction() {
  const segment = currentSegment();
  if (!segment) {
    return;
  }

  if (segment.exercise.kind === "reps") {
    state.repCount += 1;
    if (state.repCount >= (segment.reps ?? 1)) {
      moveNext();
      return;
    }
    vibrate(20);
    renderSession();
    return;
  }

  state.isRunning = !state.isRunning;
  vibrate(20);
  renderSession();
}

function moveNext() {
  vibrate([30, 30, 30]);
  if (state.segmentIndex + 1 >= state.segments.length) {
    finishSession();
    return;
  }
  state.segmentIndex += 1;
  setupSegment();
}

function previousActionIndex(fromIndex) {
  for (let index = fromIndex - 1; index >= 0; index -= 1) {
    if (state.segments[index].exercise.kind !== "rest") {
      return index;
    }
  }

  return -1;
}

function movePrevious() {
  vibrate(20);
  const previousIndex = previousActionIndex(state.segmentIndex);

  if (previousIndex < 0) {
    setupSegment();
    return;
  }

  state.segmentIndex = previousIndex;
  setupSegment();
}

function finishSession() {
  stopTicker();
  state.isRunning = false;
  const actionSegments = state.segments.filter((segment) => segment.exercise.kind !== "rest");
  const restSegments = state.segments.filter((segment) => segment.exercise.kind === "rest");
  const sideRestSegments = restSegments.filter((segment) => segment.restType === "side");
  const transitionRestSegments = restSegments.filter((segment) => segment.restType === "transition");
  const repRelaxCount = actionSegments.reduce((sum, segment) => {
    if (segment.exercise.kind !== "holdReps") {
      return sum;
    }
    return sum + Math.max(0, (segment.reps ?? 0) - 1);
  }, 0);
  const repRelaxSeconds = repRelaxCount * REP_RELAX_SECONDS;
  const actualSeconds = state.sessionStartedAt > 0 ? Math.max(1, Math.round((Date.now() - state.sessionStartedAt) / 1000)) : 0;
  state.completions = [
    {
      completedAt: new Date().toISOString(),
      recordTitle: `${state.selectedProgram.title} · ${new Date().toLocaleDateString("zh-CN")}`,
      programId: state.selectedProgram.id,
      programTitle: state.selectedProgram.title,
      plannedDuration: state.selectedProgram.durationLabel,
      plannedSeconds: estimateProgramSeconds(state.selectedProgram),
      actualSeconds,
      actionSegmentCount: actionSegments.length,
      restCount: restSegments.length + repRelaxCount,
      restSeconds: restSegments.reduce((sum, segment) => sum + (segment.seconds ?? SIDE_REST_SECONDS), 0) + repRelaxSeconds,
      sideRestCount: sideRestSegments.length,
      sideRestSeconds: sideRestSegments.reduce((sum, segment) => sum + (segment.seconds ?? SIDE_REST_SECONDS), 0),
      transitionRestCount: transitionRestSegments.length,
      transitionRestSeconds: transitionRestSegments.reduce((sum, segment) => sum + (segment.seconds ?? TRANSITION_REST_SECONDS), 0),
      repRelaxCount,
      repRelaxSeconds,
      source: "PWA"
    },
    ...state.completions
  ].slice(0, 50);
  saveCompletions();
  renderStats();
  showView("done");
}

function resetHome() {
  stopTicker();
  state.isRunning = false;
  showView("home");
  renderHome();
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => undefined);
  }
}

els.backHome.addEventListener("click", resetHome);
els.doneHome.addEventListener("click", resetHome);
els.primaryAction.addEventListener("click", togglePrimaryAction);
els.previousAction.addEventListener("click", movePrevious);
els.skipAction.addEventListener("click", moveNext);
els.restartProgram.addEventListener("click", () => startProgram(state.selectedProgram));

renderHome();
registerServiceWorker();
