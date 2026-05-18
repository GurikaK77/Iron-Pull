// ─── FIREBASE ────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyCjPbqIGxokUxUAe-CpexWIbhf62C1il68",
  authDomain: "ironpull.firebaseapp.com",
  databaseURL: "https://ironpull-default-rtdb.firebaseio.com",
  projectId: "ironpull",
  storageBucket: "ironpull.firebasestorage.app",
  messagingSenderId: "883044066447",
  appId: "1:883044066447:web:979b1a600c480377a17cfa"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// ─── CONSTANTS ─────────────────────────────────────────────────────────────
const AVATARS=['💪','🦾','🏋️','⚡','🔥','🎯','🏆','👊','🦁','🐺','🦅','🐉','⚔️','🛡️','🥇'];
const DAYS_SHORT=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];

// ─── SHOP ITEMS ────────────────────────────────────────────────────────────
const SHOP_ITEMS = [
  { id:'theme-ocean', name:'Ocean Breeze', desc:'Cool blue tones', price:200, type:'theme', data:{ '--bg':'#0b1a2a','--bg2':'#0e2540','--gold':'#4a9eff','--gold2':'#6cb4ff','--border':'#1e3a5f','--s1':'#0f2d4a','--s2':'#143556' } },
  { id:'theme-sunset', name:'Sunset Glow', desc:'Warm orange/pink', price:250, type:'theme', data:{ '--bg':'#1a0e0b','--bg2':'#2d140f','--gold':'#ff8c42','--gold2':'#ffaa5e','--border':'#5f2a1e','--s1':'#2d1a12','--s2':'#3f2218' } },
  { id:'theme-forest', name:'Deep Forest', desc:'Natural greens', price:200, type:'theme', data:{ '--bg':'#0d1e0d','--bg2':'#142814','--gold':'#4caf50','--gold2':'#81c784','--border':'#1e4a1e','--s1':'#1a331a','--s2':'#224422' } },
  { id:'theme-neon', name:'Neon Nights', desc:'Cyberpunk glow', price:400, type:'theme', data:{ '--bg':'#0f0f1a','--bg2':'#1a1a2e','--gold':'#ff007f','--gold2':'#ff6ec7','--border':'#7a0035','--s1':'#1a1a2e','--s2':'#2a2a4e' } },
  { id:'theme-royal', name:'Royal Purple', desc:'Luxury purple & gold', price:350, type:'theme', data:{ '--bg':'#1a0e1a','--bg2':'#2d142d','--gold':'#d4af37','--gold2':'#e5c158','--border':'#5f1e5f','--s1':'#2d142d','--s2':'#3f1e3f' } },
  { id:'theme-mystic', name:'Mystic Void', desc:'Another dimension', price:600, type:'theme', data:{ '--bg':'#0a0a1a','--bg2':'#12122a','--gold':'#9b59b6','--gold2':'#c39bd3','--border':'#3d1a6e','--s1':'#16162e','--s2':'#1e1e3e' } },
  { id:'title-iron', name:'Iron Warrior', desc:'Title: Iron Warrior', price:100, type:'title', data:'🦾 Iron Warrior' },
  { id:'title-beast', name:'Beast Mode', desc:'Title: Beast Mode', price:150, type:'title', data:'🔥 Beast Mode' },
  { id:'title-legend', name:'Living Legend', desc:'Title: Living Legend', price:250, type:'title', data:'👑 Living Legend' },
  { id:'title-mythic', name:'Mythic Puller', desc:'Title: Mythic Puller', price:500, type:'title', data:'⚡ Mythic Puller' },
];

// ─── STATE ──────────────────────────────────────────────────────────────────
let S={
  uid:null,
  user:null,
  logs:{},
  cal:{y:0,m:0},
  curPage:'home',
  tmpUser:{},
  selAv:AVATARS[0],
  editAv:null,
  modalSets:[],
  logDate:null,
  friends:{},
  quests:[],
  editMode: false,
  adminTargetUser:null,
  inventory:[],
  equippedTheme:null,
  equippedTitle:null,
  status:'',
  unlockedAchievements: new Set(),
};

// ─── FIREBASE REFS ─────────────────────────────────────────────────────────
function userRef(){ return db.ref('users/' + S.uid); }
function logsRef(){ return db.ref('users/' + S.uid + '/logs'); }
function friendsRef(){ return db.ref('users/' + S.uid + '/friends'); }
function questsRef(){ return db.ref('users/' + S.uid + '/quests'); }

function syncFromFirebase(){
  if(!S.uid) return;
  userRef().once('value', snap => {
    const val = snap.val();
    if(val){
      S.user = val;
      S.logs = val.logs || {};
      S.friends = val.friends || {};
      S.user.xp = S.user.xp || 0;
      S.inventory = val.inventory || [];
      S.equippedTheme = val.equippedTheme || null;
      S.equippedTitle = val.equippedTitle || null;
      S.status = val.status || '';
      S.unlockedAchievements = new Set(val.unlockedAchievements || []);
      applyEquippedTheme();
      questsRef().once('value', qSnap => {
        S.quests = qSnap.val() || [];
        updateQuests();
        render(S.curPage);
        document.getElementById('ob').classList.add('hidden');
      });
    } else {
      document.getElementById('ob').classList.remove('hidden');
    }
  });
}

function saveUserToFirebase(){
  if(!S.uid) return;
  userRef().set({
    name: S.user.name,
    age: S.user.age,
    goalDays: S.user.goalDays,
    target: S.user.target,
    quote: S.user.quote,
    avatar: S.user.avatar,
    avatarImg: S.user.avatarImg || null,
    startDate: S.user.startDate,
    xp: S.user.xp,
    role: S.user.role || null,
    inventory: S.inventory,
    equippedTheme: S.equippedTheme,
    equippedTitle: S.equippedTitle,
    status: S.status,
    unlockedAchievements: Array.from(S.unlockedAchievements),
    logs: S.logs,
    friends: S.friends
  });
}

function saveLogsToFirebase(){
  if(!S.uid) return;
  logsRef().set(S.logs);
}

// ─── AUTH ───────────────────────────────────────────────────────────────────
auth.onAuthStateChanged(user => {
  if (user) {
    S.uid = user.uid;
    document.getElementById('auth-screen').classList.add('hidden');
    syncFromFirebase();
  } else {
    S.uid = null;
    S.user = null;
    document.getElementById('auth-screen').classList.remove('hidden');
    document.querySelectorAll('.ob, .page').forEach(e => e.classList.remove('active'));
  }
});

function authGoogleSignIn(){ auth.signInWithPopup(googleProvider).catch(e => alert(e.message)); }
function authSignIn(){
  const email = document.getElementById('auth-email').value;
  const pass = document.getElementById('auth-pass').value;
  auth.signInWithEmailAndPassword(email, pass).catch(e => alert(e.message));
}
function authRegister(){
  const email = document.getElementById('auth-email').value;
  const pass = document.getElementById('auth-pass').value;
  auth.createUserWithEmailAndPassword(email, pass).catch(e => alert(e.message));
}
function resetPassword(){
  const email = document.getElementById('auth-email').value;
  if(!email) return alert('Enter email first');
  auth.sendPasswordResetEmail(email).then(() => alert('Reset email sent!'));
}
function signOut(){ auth.signOut(); }

// ─── CLICK SOUND ───────────────────────────────────────────────────────────
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playClick(){
  if(audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.frequency.value = 800; osc.type = 'sine';
  gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
  osc.start(audioCtx.currentTime); osc.stop(audioCtx.currentTime + 0.1);
}
document.addEventListener('click', function(e){
  if(e.target.closest('button, .btn')) playClick();
});

// ─── ROUTER ─────────────────────────────────────────────────────────────────
function go(page){
  if(!S.uid) return;
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nb').forEach(b=>b.classList.remove('active'));
  document.getElementById('nb-cal').classList.remove('active');
  const pg = document.getElementById('page-'+page);
  if(pg) pg.classList.add('active');
  if(page==='cal') document.getElementById('nb-cal').classList.add('active');
  else {
    const nb = document.getElementById('nb-'+page);
    if(nb) nb.classList.add('active');
  }
  S.curPage=page;
  render(page);
}

function render(p){
  if(!S.user) return;
  if(p==='home') renderHome();
  else if(p==='cal') renderCal();
  else if(p==='stats') renderStats();
  else if(p==='prof') renderProf();
  else if(p==='friends') renderFriends();
  else if(p==='shop') renderShop();
}

// ─── COMPUTED ──────────────────────────────────────────────────────────────
function wDays(){return Object.entries(S.logs).filter(([,v])=>v.type==='workout')}
function rDays(){return Object.entries(S.logs).filter(([,v])=>v.type==='rest')}
function totalReps(){return wDays().reduce((s,[,v])=>s+(v.total||0),0)}
function bestDay(){const d=wDays();return d.length?Math.max(...d.map(([,v])=>v.total||0)):0}
function avgDay(){const d=wDays();return d.length?Math.round(totalReps()/d.length):0}
function streak(){
  let n=0,d=new Date();
  while(true){
    const k=fmt(d),e=S.logs[k];
    if(!e||e.type!=='workout'){if(k===todayStr()&&!e){d.setDate(d.getDate()-1);continue}break}
    n++;d.setDate(d.getDate()-1);
  }
  return n;
}
function pct(){const g=S.user?.goalDays||30;return Math.min(100,Math.round(wDays().length/g*100))}
function dLeft(){return Math.max(0,(S.user?.goalDays||30)-wDays().length)}

function suggestSets(n){
  const t=S.user?.target||100;
  let count=n<=7?10:n<=14?8:n<=21?6:5;
  const base=Math.floor(t/count);
  const rem=t-base*count;
  return Array.from({length:count},(_,i)=>i<rem?base+1:base);
}

// ─── DATE UTILS ────────────────────────────────────────────────────────────
const fmt=d=>d.toISOString().split('T')[0];
const todayStr=()=>fmt(new Date());
const parseD=s=>new Date(s+'T00:00:00');
function formatTime(ts){
  if(!ts) return '';
  const d=new Date(ts);
  const h=String(d.getHours()).padStart(2,'0');
  const m=String(d.getMinutes()).padStart(2,'0');
  return `${h}:${m}`;
}

// ─── THEME ─────────────────────────────────────────────────────────────────
function applyEquippedTheme(){
  const root = document.documentElement;
  const defaultVars = {
    '--bg':'#07070f','--bg2':'#0d0d1c','--s1':'#11111e','--s2':'#171729','--s3':'#1f1f35','--s4':'#27273f',
    '--border':'#2a2a48','--border2':'#353558','--gold':'#c8a84b','--gold2':'#e8c96a','--gold3':'#f5dfa0',
    '--blu':'#4a9eff','--blu-d':'rgba(74,158,255,.13)','--grn':'#00c96e','--grn-d':'rgba(0,201,110,.13)',
    '--red':'#ff4a6e','--red-d':'rgba(255,74,110,.1)','--txt':'#eeeef8','--txt2':'#8888aa'
  };
  Object.entries(defaultVars).forEach(([k,v]) => root.style.setProperty(k, v));
  if(S.equippedTheme){
    const themeItem = SHOP_ITEMS.find(i => i.id === S.equippedTheme);
    if(themeItem && themeItem.data){
      Object.entries(themeItem.data).forEach(([k,v]) => root.style.setProperty(k, v));
    }
  }
}

// ─── TOAST ─────────────────────────────────────────────────────────────────
function showToast(message, icon='🏆'){
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `${icon} ${message}`;
  container.appendChild(toast);
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.frequency.value = 1200; osc.type = 'triangle';
  gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime+0.3);
  osc.start(); osc.stop(audioCtx.currentTime+0.3);
  setTimeout(() => toast.remove(), 3000);
}

// ─── AUTO SCROLL ───────────────────────────────────────────────────────────
function scrollModalBottom(){
  setTimeout(() => {
    const modal = document.querySelector('#modal-overlay .modal');
    if(modal) modal.scrollTo({ top: modal.scrollHeight, behavior: 'smooth' });
  }, 200);
}

// ─── XP & QUESTS ──────────────────────────────────────────────────────────
function addXP(amount){
  S.user.xp = (S.user.xp || 0) + amount;
  saveUserToFirebase();
}

function updateQuests(){
  const today = todayStr();
  if(!S.quests.length || S.quests[0].date !== today){
    S.quests = generateDailyQuests();
    questsRef().set(S.quests);
  }
}

function generateDailyQuests(){
  const today = todayStr();
  const possible = [
    { id: 'sets5', desc: 'Complete 5 sets today', goal: 5, reward: 10 },
    { id: 'rep100', desc: 'Reach 100 total pull-ups today', goal: 100, reward: 20 },
    { id: 'early', desc: 'Finish a workout before 10 AM', goal: 1, reward: 15 },
    { id: 'streak3', desc: 'Extend your streak to 3 days', goal: 3, reward: 30 },
    { id: 'rest', desc: 'Take a rest day', goal: 1, reward: 5 },
  ];
  const shuffled = possible.sort(()=>0.5-Math.random()).slice(0,3);
  return [{ date: today, quests: shuffled.map(q=>({ ...q, progress: 0, completed: false })) }];
}

function checkQuestCompletion(){
  const today = todayStr();
  if(!S.quests.length || S.quests[0].date !== today) return;
  const quests = S.quests[0].quests;
  let changed = false;
  quests.forEach(q => {
    if(q.completed) return;
    let progress = 0;
    const entry = S.logs[today];
    if(q.id === 'sets5') progress = entry?.type==='workout' ? entry.sets.length : 0;
    else if(q.id === 'rep100') progress = entry?.type==='workout' ? entry.total : 0;
    else if(q.id === 'early'){
      if(entry?.type==='workout' && entry.timestamp){
        const h = new Date(entry.timestamp).getHours();
        if(h < 10) progress = 1;
      }
    } else if(q.id === 'streak3') progress = Math.min(streak(), q.goal);
    else if(q.id === 'rest') progress = entry?.type === 'rest' ? 1 : 0;
    q.progress = progress;
    if(progress >= q.goal && !q.completed){
      q.completed = true;
      addXP(q.reward);
      showToast(`Quest Complete: ${q.desc} (+${q.reward} XP)`, '✅');
      changed = true;
    }
  });
  if(changed) questsRef().set(S.quests);
}

function checkDailyGoal(){
  const entry = S.logs[todayStr()];
  if(entry?.type==='workout' && entry.total >= S.user.target){
    showToast(`Daily Target Reached! 🎯 ${entry.total}/${S.user.target}`, '🎯');
  }
}

function checkAchievements(){
  const achList = getAchievements();
  achList.forEach(a => {
    if(a.unlocked && !S.unlockedAchievements.has(a.id)){
      S.unlockedAchievements.add(a.id);
      showToast(`Achievement Unlocked: ${a.name} (+${a.xp} XP)`, a.icon);
    }
  });
  saveUserToFirebase();
}

// ─── ONBOARDING ────────────────────────────────────────────────────────────
function initAvGrid(id,sel,onSel){
  const g=document.getElementById(id);
  g.innerHTML=AVATARS.map((a,i)=>`<div class="av-opt${a===sel?' sel':''}" onclick="${onSel}(this,'${a}')">${a}</div>`).join('');
}
function selAv(el,av){
  document.querySelectorAll('#av-grid .av-opt').forEach(e=>e.classList.remove('sel'));
  el.classList.add('sel');S.selAv=av;
}
function selEditAv(el,av){
  document.querySelectorAll('#edit-av-grid .av-opt').forEach(e=>e.classList.remove('sel'));
  el.classList.add('sel');S.editAv=av;
}
function obDots(step){
  document.querySelectorAll('.ob-dot').forEach((d,i)=>d.classList.toggle('active',i<=step-1));
}
function obNext(step){
  if(step===1){
    const name=document.getElementById('ob-name').value.trim();
    const age=parseInt(document.getElementById('ob-age').value);
    if(!name||!age){alert('Fill all fields');return}
    S.tmpUser={name,age};
  }else if(step===2){
    const days=parseInt(document.getElementById('ob-days').value)||30;
    const target=parseInt(document.getElementById('ob-target').value)||100;
    const quote=document.getElementById('ob-quote').value.trim()||'Pain is temporary, glory is forever.';
    S.tmpUser={...S.tmpUser,goalDays:days,target,quote};
  }
  document.getElementById('ob-s'+step).classList.remove('active');
  document.getElementById('ob-s'+(step+1)).classList.add('active');
  obDots(step+1);
}
function obBack(toStep){
  document.getElementById('ob-s'+(toStep+1)).classList.remove('active');
  document.getElementById('ob-s'+toStep).classList.add('active');
  obDots(toStep);
}
function obFinish(){
  S.user={...S.tmpUser,avatar:S.selAv,avatarImg:null,startDate:todayStr(),xp:0};
  S.friends = {};
  S.inventory = [];
  S.equippedTheme = null;
  S.equippedTitle = null;
  S.status = '';
  S.unlockedAchievements = new Set();
  saveUserToFirebase();
  document.getElementById('ob').classList.add('hidden');
  go('home');
}

// ─── HOME ──────────────────────────────────────────────────────────────────
function renderHome(){
  const u=S.user,p=pct(),wd=wDays().length,dl=dLeft(),st=streak();
  const R=82,C=2*Math.PI*R,filled=C*(p/100);
  const ringCol=p>=100?'#00c96e':'#c8a84b';
  const entry=S.logs[todayStr()];
  const hr=new Date().getHours();
  const greet=hr<12?'Good morning':hr<17?'Good afternoon':'Good evening';

  let statusHTML='';
  if(entry?.type==='workout'){
    const timeStr=formatTime(entry.timestamp);
    statusHTML=`<div class="tag tag-g">✓ Completed at ${timeStr} — ${entry.total} pull-ups</div>`;
  }
  else if(entry?.type==='rest'){
    const timeStr=formatTime(entry.timestamp);
    statusHTML=`<div class="tag tag-b">💤 Rest Day at ${timeStr}</div>`;
  }
  else statusHTML=`<div class="tag tag-r">⏳ Not logged yet</div>`;

  let btnHTML='';
  if(!entry){
    btnHTML=`<button class="btn btn-gold" onclick="openLog('${todayStr()}')">🏋️ Log Today's Workout</button>
             <button class="btn btn-blue" onclick="saveRest('${todayStr()}')">💤 Mark as Rest Day</button>`;
  }else{
    btnHTML=`<button class="btn btn-dark" onclick="openLog('${todayStr()}')">✏️ Edit Today's Log</button>`;
  }

  const av=u.avatarImg?`<img src="${u.avatarImg}" style="width:44px;height:44px;object-fit:cover;border-radius:50%">`:u.avatar;

  document.getElementById('page-home').innerHTML=`
    <div class="home-top">
      <div>
        <div class="home-greet">${greet},</div>
        <div class="home-name">${escapeHtml(u.name)} ${av}</div>
        <div class="xp-badge">⭐ ${u.xp} XP</div>
      </div>
      <div class="streak-pill">🔥 ${st} day${st!==1?'s':''}</div>
    </div>
    <div class="ring-card">
      <div class="ring-wrap">
        <svg width="210" height="210" viewBox="0 0 210 210">
          <circle cx="105" cy="105" r="${R}" fill="none" stroke="#1a1a30" stroke-width="15"/>
          <circle cx="105" cy="105" r="${R}" fill="none" stroke="${ringCol}" stroke-width="13"
            stroke-linecap="round" stroke-dasharray="${filled} ${C-filled}"
            style="transform:rotate(-90deg);transform-origin:center"/>
        </svg>
        <div class="ring-inner">
          <div class="ring-pct">${p}%</div>
          <div class="ring-lbl">Complete</div>
        </div>
      </div>
      <div class="ring-goal">${wd} of ${u.goalDays} days done</div>
    </div>
    <div class="stat-row">
      <div class="sc"><div class="sc-v">${wd}</div><div class="sc-l">Trained</div></div>
      <div class="sc"><div class="sc-v">${dl}</div><div class="sc-l">Left</div></div>
      <div class="sc"><div class="sc-v">${st}</div><div class="sc-l">Streak 🔥</div></div>
    </div>
    <div class="today-card">
      <div class="card-title">TODAY — ${new Date().toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric'})}</div>
      <div style="margin-bottom:14px">${statusHTML}</div>
      ${btnHTML}
    </div>
    <div class="card">
      <div class="card-title">Your Motivation</div>
      <div style="font-style:italic;color:var(--txt2);line-height:1.6;font-size:14px">"${escapeHtml(u.quote)}"</div>
    </div>
  `;
}

// ─── CALENDAR ──────────────────────────────────────────────────────────────
function renderCal(){
  const now=new Date();
  if(!S.cal.y){S.cal={y:now.getFullYear(),m:now.getMonth()}}
  const{y,m}=S.cal;
  const first=new Date(y,m,1).getDay();
  const dims=new Date(y,m+1,0).getDate();
  const td=todayStr();

  let cells='';
  for(let i=0;i<first;i++)cells+=`<div class="cd empty"></div>`;
  for(let d=1;d<=dims;d++){
    const ds=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const e=S.logs[ds];
    const isT=ds===td,isPast=ds<td,isFut=ds>td;
    let cls='cd',dot='';
    if(isT)cls+=' today';
    else if(isFut)cls+=' future';
    if(e?.type==='workout'){cls+=' done';dot='<div class="cd-dot" style="background:var(--grn)"></div>'}
    else if(e?.type==='rest'){cls+=' rest';dot='<div class="cd-dot" style="background:var(--blu)"></div>'}
    else if(isPast&&!isT){cls+=' miss';dot='<div class="cd-dot" style="background:var(--red)"></div>'}
    const click=!isFut?`onclick="openLog('${ds}')"`:''
    cells+=`<div class="${cls}" ${click}>${d}${dot}</div>`;
  }

  document.getElementById('page-cal').innerHTML=`
    <div class="cal-top">
      <div>
        <div style="font-size:10px;color:var(--txt2);text-transform:uppercase;letter-spacing:.8px">Calendar</div>
        <div class="cal-month">${MONTHS[m]} ${y}</div>
      </div>
      <div class="cal-navs">
        <button class="cal-nav" onclick="chMo(-1)">‹</button>
        <button class="cal-nav" onclick="chMo(1)">›</button>
      </div>
    </div>
    <div class="wd-row">${['S','M','T','W','T','F','S'].map(d=>`<div class="wd">${d}</div>`).join('')}</div>
    <div class="cal-grid">${cells}</div>
    <div class="legend">
      <div class="li"><div class="ld" style="background:var(--grn)"></div>Completed</div>
      <div class="li"><div class="ld" style="background:var(--blu)"></div>Rest</div>
      <div class="li"><div class="ld" style="background:var(--red)"></div>Missed</div>
      <div class="li"><div class="ld" style="background:var(--gold);border-radius:50%"></div>Today</div>
    </div>
    <div class="cal-actions">
      <div class="cal-btn" onclick="openLog('${td}')"><div class="ic">🏋️</div><div>Log Today</div></div>
      <div class="cal-btn" onclick="openDatePick()"><div class="ic">📅</div><div>Log Other Day</div></div>
    </div>
  `;
}

function chMo(dir){
  let{y,m}=S.cal;m+=dir;
  if(m<0){m=11;y--}if(m>11){m=0;y++}
  S.cal={y,m};renderCal();
}

// ─── LOG MODAL ─────────────────────────────────────────────────────────────
function openLog(dateStr){
  S.logDate=dateStr;
  const existing=S.logs[dateStr];
  if(existing?.type==='workout'){
    const existingSets = existing.sets || [];
    if(existingSets.length > 0 && typeof existingSets[0] === 'number'){
      S.modalSets = existingSets.map(r => ({reps: r, done: true, time: existing.timestamp || null}));
    } else {
      S.modalSets = existingSets.map(s => ({reps: s.reps, done: true, time: s.time || null}));
    }
  } else {
    const wn=wDays().length+1;
    const suggested=suggestSets(wn);
    S.modalSets = suggested.map(r => ({reps: r, done: false, time: null}));
  }
  renderModalSets();
  showModal();
  scrollModalBottom();
}

function openDatePick(){
  document.getElementById('modal-body').innerHTML=`
    <div class="mtitle">LOG A DATE</div>
    <div class="msub">Choose any past date to log.</div>
    <div class="fg"><input type="date" class="fi" id="modal-dp" max="${todayStr()}" value="${todayStr()}"></div>
    <button class="btn btn-gold" onclick="confirmDp()">Continue →</button>
    <button class="btn btn-dark" onclick="hideModal()">Cancel</button>
  `;
  showModal();
}
function confirmDp(){
  const v=document.getElementById('modal-dp').value;
  if(!v)return;hideModal();setTimeout(()=>openLog(v),120);
}

function renderModalSets(){
  const dl=S.logDate===todayStr()?'Today':parseD(S.logDate).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
  const total=S.modalSets.reduce((s,x)=>s+(x.done?x.reps:0),0);
  const existing=S.logs[S.logDate];
  const timeStr = existing?.timestamp ? formatTime(existing.timestamp) : null;

  document.getElementById('modal-body').innerHTML=`
    <div class="mtitle">LOG WORKOUT</div>
    <div class="msub">${dl} · Tap ✓ to check off each set</div>
    ${timeStr ? `<div style="text-align:center;font-size:13px;color:var(--txt2);margin-bottom:14px;">🕒 Logged at ${timeStr}</div>` : ''}
    <div class="sets-wrap" id="sets-wrap">
      ${S.modalSets.map((set,i)=>`
        <div class="set-c${set.done?' done':''}" id="sc-${i}">
          <div class="set-num">S${i+1}</div>
          <div class="set-mid">
            <div class="set-rl">Reps</div>
            <input class="set-ri" type="number" inputmode="numeric" pattern="[0-9]*" value="${set.reps}" min="1" max="999"
              onchange="updReps(${i},this.value)" id="ri-${i}">
            ${set.time ? `<div style="font-size:10px;color:var(--txt2);margin-top:2px;">🕒 ${formatTime(set.time)}</div>` : ''}
          </div>
          <button class="set-chk${set.done?' done':''}" onclick="togSet(${i})">${set.done?'✓':''}</button>
        </div>
      `).join('')}
    </div>
    <button class="btn btn-dark" onclick="addSet()" style="margin-bottom:12px">+ Add Set</button>
    <div class="set-total">Total: <span id="mod-tot">${total}</span> pull-ups</div>
    <button class="btn btn-gold" onclick="saveWorkout()">💾 Save Workout</button>
    <button class="btn btn-blue" onclick="saveRestFromModal()">💤 Mark as Rest Day</button>
    ${existing?`<button class="btn btn-dark" onclick="deleteLog()">🗑 Remove Log</button>`:''}
    <button class="btn btn-dark" onclick="hideModal()">Cancel</button>
  `;
}

function togSet(i){
  const s = S.modalSets[i];
  s.done = !s.done;
  s.time = s.done ? Date.now() : null;
  renderModalSets();
  scrollModalBottom();
}
function updReps(i,v){
  S.modalSets[i].reps = parseInt(v) || 0;
  const total = S.modalSets.reduce((s,x) => s + (x.done ? x.reps : 0), 0);
  const el = document.getElementById('mod-tot'); if(el) el.textContent = total;
}
function addSet(){ S.modalSets.push({reps:10, done:false, time:null}); renderModalSets(); scrollModalBottom(); }

function saveWorkout(){
  const done = S.modalSets.filter(s => s.done);
  const all = S.modalSets;
  const setsToStore = (done.length ? done : all).map(s => ({ reps: s.reps, time: s.time || null }));
  const total = setsToStore.reduce((sum, s) => sum + s.reps, 0);
  S.logs[S.logDate] = { type:'workout', sets: setsToStore, total, timestamp: Date.now() };
  saveLogsToFirebase();
  addXP(Math.floor(total / 5));
  checkQuestCompletion();
  checkDailyGoal();
  checkAchievements();
  hideModal();
  render(S.curPage);
}
function saveRest(ds){
  S.logs[ds] = { type:'rest', sets:[], total:0, timestamp:Date.now() };
  saveLogsToFirebase();
  checkQuestCompletion();
  render(S.curPage);
}
function saveRestFromModal(){ saveRest(S.logDate); hideModal(); }
function deleteLog(){
  if(!confirm('Remove this log entry?'))return;
  delete S.logs[S.logDate];
  saveLogsToFirebase();
  hideModal();
  render(S.curPage);
}

function showModal(){document.getElementById('modal-overlay').classList.remove('hidden')}
function hideModal(){document.getElementById('modal-overlay').classList.add('hidden')}
document.getElementById('modal-overlay').addEventListener('click',function(e){if(e.target===this)hideModal()});

// ─── STATS ──────────────────────────────────────────────────────────────────
function renderStats(){
  const tr=totalReps(),wd=wDays(),rd=rDays(),st=streak(),bd=bestDay(),ag=avgDay();
  const todayLog = S.logs[todayStr()];
  const todayReps = todayLog?.type==='workout' ? todayLog.total : 0;
  const g=S.user?.goalDays||30,t=S.user?.target||100;
  const hitRate=wd.length?Math.round(wd.filter(([,v])=>v.total>=t).length/wd.length*100):0;
  const p=pct();

  const l7=Array.from({length:7},(_,i)=>{
    const d=new Date();d.setDate(d.getDate()-(6-i));
    const k=fmt(d),e=S.logs[k];
    return{label:DAYS_SHORT[d.getDay()],val:e?.type==='workout'?e.total:0,type:e?.type||'none'};
  });
  const mx=Math.max(...l7.map(x=>x.val),1);
  const bars=l7.map(d=>{
    const h=d.type==='rest'?22:Math.max(5,(d.val/mx)*80);
    const cls=d.type==='workout'?'bar-w':d.type==='rest'?'bar-r':'bar-e';
    return`<div class="bw"><div style="font-size:9px;color:var(--txt2);margin-bottom:2px">${d.val||''}</div><div class="bar ${cls}" style="height:${h}px"></div><div class="bl">${d.label}</div></div>`;
  }).join('');

  const achList = getAchievements();
  let achHTML = '';
  achList.forEach(a => {
    const locked = !a.unlocked;
    const progPct = a.max ? Math.min(100, Math.round((a.current / a.max) * 100)) : 0;
    achHTML += `
      <div class="ach-item ${locked ? 'ach-locked' : ''}">
        <div class="ach-icon">${a.icon}</div>
        <div class="ach-info">
          <div class="ach-name">${a.name}</div>
          <div class="ach-desc">${a.desc} (${a.xp || 0} XP)</div>
          ${a.max ? `
          <div class="ach-prog">
            <div class="ach-prog-bar">
              <div class="ach-prog-fill" style="width:${progPct}%"></div>
            </div>
            <div class="ach-stat">${a.current} / ${a.max}</div>
          </div>` : ''}
        </div>
        <div class="ach-status">${locked ? '🔒' : '✅'}</div>
      </div>
    `;
  });

  const questsToday = S.quests.length && S.quests[0].date === todayStr() ? S.quests[0].quests : [];
  let questHTML = questsToday.length ? `
    <div class="ach-card">
      <div class="ach-title">Daily Quests</div>
      ${questsToday.map(q => `
        <div class="quest-card" style="opacity:${q.completed?0.5:1}">
          <div>${q.completed?'✅':'⬜'}</div>
          <div class="quest-progress">${q.desc} (${q.progress}/${q.goal})</div>
          <div class="quest-reward">+${q.reward} XP</div>
        </div>
      `).join('')}
    </div>
  ` : '';

  document.getElementById('page-stats').innerHTML=`
    <div class="sh">STATISTICS</div>
    <div class="ss">Full performance breakdown</div>
    <div class="today-hero">
      <div class="today-hero-n">${todayReps}</div>
      <div class="today-hero-l">Today's Pull-Ups</div>
    </div>
    <div class="hero"><div class="hero-n">${tr.toLocaleString()}</div><div class="hero-l">Total Pull-Ups</div></div>
    <div class="sg">
      <div class="sgc"><div class="sgc-v">${wd.length}</div><div class="sgc-l">Workouts</div></div>
      <div class="sgc"><div class="sgc-v">${rd.length}</div><div class="sgc-l">Rest Days</div></div>
      <div class="sgc"><div class="sgc-v">${st}</div><div class="sgc-l">🔥 Streak</div></div>
      <div class="sgc"><div class="sgc-v">${bd}</div><div class="sgc-l">Best Day</div></div>
      <div class="sgc"><div class="sgc-v">${ag}</div><div class="sgc-l">Daily Avg</div></div>
      <div class="sgc"><div class="sgc-v">${hitRate}%</div><div class="sgc-l">Target Hit</div></div>
    </div>
    <div class="chart-box"><div class="chart-l">Last 7 Days</div><div class="bars">${bars}</div></div>
    <div class="card">
      <div class="card-title">Challenge Progress</div>
      <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:14px;color:var(--txt2)">Days Completed</span><span style="font-weight:600">${wd.length} / ${g}</span></div>
      <div class="prog-wrap"><div class="prog-fill" style="width:${p}%"></div></div>
      <div style="margin-top:10px;font-size:12px;color:var(--txt2)">${p}% of ${g}-day challenge complete · ${dLeft()} days remaining</div>
    </div>
    ${questHTML}
    <div class="ach-card">
      <div class="ach-title">Achievements</div>
      ${achHTML}
    </div>
  `;
}

function getAchievements(){
  const tr = totalReps(); const wd = wDays().length; const st = streak(); const bd = bestDay();
  const goal = S.user?.goalDays||30; const target = S.user?.target||100;
  const hitDays = wDays().filter(([,v])=>v.total >= target).length;
  return [
    { id:'first', icon:'🥇', name:'First Workout', desc:'Complete 1 workout', max:1, current: wd >=1 ? 1 : 0, unlocked: wd >=1, xp: 10 },
    { id:'streak7', icon:'🔥', name:'7-Day Streak', desc:'Maintain a streak of 7 days', max:7, current: Math.min(st,7), unlocked: st >=7, xp: 40 },
    { id:'centurion', icon:'💪', name:'Pull-Up Centurion', desc:'Reach 1,000 total pull-ups', max:1000, current: Math.min(tr,1000), unlocked: tr >=1000, xp: 100 },
    { id:'ironman', icon:'⚡', name:'Iron Man', desc:'10,000 total pull-ups', max:10000, current: Math.min(tr,10000), unlocked: tr >=10000, xp: 400 },
    { id:'dedicated', icon:'🏋️', name:'Dedicated', desc:'Complete 10 workouts', max:10, current: Math.min(wd,10), unlocked: wd >=10, xp: 30 },
    { id:'consistent', icon:'🎯', name:'Consistent', desc:'Hit daily target 5 times', max:5, current: Math.min(hitDays,5), unlocked: hitDays >=5, xp: 50 },
    { id:'champion', icon:'🏆', name:'Challenge Champion', desc:`Complete your challenge (${goal} days)`, max:goal, current: Math.min(wd,goal), unlocked: wd >= goal, xp: 200 },
    { id:'heavy', icon:'🦾', name:'Heavy Lifter', desc:'Best day: 200 pull-ups', max:200, current: Math.min(bd,200), unlocked: bd >=200, xp: 60 },
    { id:'halfway', icon:'🌟', name:'Halfway Hero', desc:'Reach 50% challenge completion', unlocked: wd >= goal/2, xp: 40 },
    { id:'legend', icon:'👑', name:'IronPull Legend', desc:'Unlock all achievements', unlocked: false, xp: 1000 }
  ];
}

// ─── PROFILE ────────────────────────────────────────────────────────────────
function renderProf(){
  const u = S.user;
  const av = u.avatarImg ? `<img src="${u.avatarImg}">` : u.avatar;
  S.editMode = S.editMode || false;

  let adminHTML = '';
  if(u.role === 'admin'){
    adminHTML = `
      <div class="admin-panel">
        <div class="card-title">🔧 Admin Panel</div>
        <div class="fg">
          <input class="fi" id="admin-uid-input" placeholder="Enter user UID to edit">
        </div>
        <button class="btn btn-gold" onclick="adminLoadUser()" style="margin-bottom:12px;">Load User</button>
        <div id="admin-user-edit" style="display:none;">
          <div class="fg"><label class="fl">Name</label><input class="fi" id="admin-e-name" maxlength="20"></div>
          <div class="fg"><label class="fl">Age</label><input class="fi" id="admin-e-age" type="number" min="10" max="99"></div>
          <div class="fg"><label class="fl">Goal Days</label><input class="fi" id="admin-e-days" type="number" min="7" max="365"></div>
          <div class="fg"><label class="fl">Daily Target</label><input class="fi" id="admin-e-target" type="number" min="10"></div>
          <div class="fg"><label class="fl">Quote</label><input class="fi" id="admin-e-quote" maxlength="90"></div>
          <button class="btn btn-gold" onclick="adminSaveUser()">Save User</button>
          <button class="btn btn-dark" onclick="adminClear()">Cancel</button>
        </div>
      </div>
    `;
  }

  document.getElementById('page-prof').innerHTML = `
    <div style="position:relative;">
      <div class="sh">PROFILE</div>
      <button class="prof-shop-btn" onclick="go('shop')">🛒 Shop <span style="font-size:12px;">⭐ ${u.xp}</span></button>
    </div>
    <div class="prof-top">
      <div class="p-av" onclick="document.getElementById('avatar-upload').click()">${av}<div class="p-av-ovr">CHANGE</div></div>
      <div id="profile-view" style="${S.editMode ? 'display:none' : ''}">
        <div class="p-name">${escapeHtml(u.name.toUpperCase())} ${u.equippedTitle ? `<span class="title-badge">${getTitleText(u.equippedTitle)}</span>` : ''} ${u.role==='admin' ? '<span class="admin-badge">ADMIN</span>' : ''}</div>
        ${u.status ? `<div style="color:var(--txt2);font-size:13px;margin-top:4px;">💬 ${escapeHtml(u.status)}</div>` : ''}
        <div class="p-age">Age ${u.age} · ${u.goalDays}-day challenge</div>
        <div class="p-quote">"${escapeHtml(u.quote)}"</div>
        <div class="xp-badge" style="margin-top:10px;">⭐ ${u.xp} XP</div>
        <div style="margin-top:14px;">
          <span style="font-size:11px;color:var(--txt2);background:var(--s2);padding:4px 12px;border-radius:12px;">UID: ${S.uid}</span>
          <button onclick="copyUID()" style="background:var(--gold-d);border:1px solid var(--gold);color:var(--gold);border-radius:8px;padding:4px 10px;font-size:12px;cursor:pointer">📋 Copy</button>
        </div>
        <button class="btn btn-gold" style="margin-top:20px;" onclick="toggleEdit(true)">✏️ Edit Profile</button>
        <button class="btn btn-gold" style="margin-top:12px;" onclick="openInventory()">🎒 Inventory</button>
        ${adminHTML}
      </div>
      <div id="profile-edit" style="${S.editMode ? '' : 'display:none'}">
        <div class="card">
          <div class="card-title">Edit Profile</div>
          <div class="fg"><label class="fl">Name</label><input class="fi" id="e-name" value="${escapeHtml(u.name)}" maxlength="20"></div>
          <div class="fg"><label class="fl">Age</label><input class="fi" id="e-age" type="number" value="${u.age}" min="10" max="99"></div>
          <div class="fg"><label class="fl">Goal Days</label><input class="fi" id="e-days" type="number" value="${u.goalDays}" min="7" max="365"></div>
          <div class="fg"><label class="fl">Daily Target</label><input class="fi" id="e-target" type="number" value="${u.target||100}" min="10"></div>
          <div class="fg"><label class="fl">Quote</label><input class="fi" id="e-quote" value="${escapeHtml(u.quote)}" maxlength="90"></div>
          <div class="fg"><label class="fl">Status / Note</label><input class="fi" id="e-status" value="${escapeHtml(u.status)}" maxlength="60"></div>
          <div class="fg"><label class="fl">Avatar Emoji</label><div class="av-grid" id="edit-av-grid"></div></div>
          <div style="display:flex; gap:10px;">
            <button class="btn btn-gold" id="save-btn" onclick="saveProf()">Save Changes</button>
            <button class="btn btn-dark" onclick="toggleEdit(false)">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <button class="btn btn-red" onclick="signOut()">🚪 Sign Out</button>
    <div style="height:10px"></div>
  `;
  if(S.editMode){
    initAvGrid('edit-av-grid', u.avatar, 'selEditAv');
    S.editAv = null;
  }
}

function toggleEdit(mode){
  S.editMode = mode;
  render('prof');
}

function saveProf(){
  const name = document.getElementById('e-name').value.trim();
  if(!name){ alert('Name cannot be empty.'); return; }
  S.user.name = name;
  S.user.age = parseInt(document.getElementById('e-age').value)||S.user.age;
  S.user.goalDays = parseInt(document.getElementById('e-days').value)||S.user.goalDays;
  S.user.target = parseInt(document.getElementById('e-target').value)||S.user.target;
  S.user.quote = document.getElementById('e-quote').value.trim()||S.user.quote;
  S.user.status = document.getElementById('e-status').value.trim();
  if(S.editAv) S.user.avatar = S.editAv;
  saveUserToFirebase();
  const btn = document.getElementById('save-btn');
  btn.classList.add('btn-saved');
  btn.innerHTML = '✓ Saved!';
  setTimeout(() => { toggleEdit(false); }, 1500);
}

function getTitleText(titleId){
  const item = SHOP_ITEMS.find(i => i.id === titleId);
  return item ? item.data : '';
}

function copyUID(){
  navigator.clipboard.writeText(S.uid).then(() => alert('UID copied!'));
}

function handleAvatarUpload(input){
  const file = input.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    S.user.avatarImg = e.target.result;
    saveUserToFirebase();
    render('prof');
  };
  reader.readAsDataURL(file);
}

// ─── ADMIN ──────────────────────────────────────────────────────────────────
function adminLoadUser(){
  const uid = document.getElementById('admin-uid-input').value.trim();
  if(!uid) return alert('Enter UID');
  db.ref('users/' + uid).once('value').then(snap => {
    const data = snap.val();
    if(!data) return alert('User not found');
    S.adminTargetUser = { uid, data };
    document.getElementById('admin-user-edit').style.display = 'block';
    document.getElementById('admin-e-name').value = data.name || '';
    document.getElementById('admin-e-age').value = data.age || '';
    document.getElementById('admin-e-days').value = data.goalDays || '';
    document.getElementById('admin-e-target').value = data.target || '';
    document.getElementById('admin-e-quote').value = data.quote || '';
  });
}

function adminSaveUser(){
  if(!S.adminTargetUser) return;
  const newData = {
    name: document.getElementById('admin-e-name').value.trim(),
    age: parseInt(document.getElementById('admin-e-age').value) || 0,
    goalDays: parseInt(document.getElementById('admin-e-days').value) || 30,
    target: parseInt(document.getElementById('admin-e-target').value) || 100,
    quote: document.getElementById('admin-e-quote').value.trim(),
  };
  if(!newData.name) return alert('Name required');
  db.ref('users/' + S.adminTargetUser.uid).update(newData).then(() => {
    alert('User updated!');
    adminClear();
  });
}

function adminClear(){
  S.adminTargetUser = null;
  document.getElementById('admin-user-edit').style.display = 'none';
  document.getElementById('admin-uid-input').value = '';
}

// ─── FRIENDS ───────────────────────────────────────────────────────────────
function renderFriends(){
  const friends = S.friends || {};
  const friendList = Object.entries(friends);

  document.getElementById('page-friends').innerHTML=`
    <div class="sh">FRIENDS</div>
    <div class="ss">Your pull-up crew</div>
    <div class="fg">
      <label class="fl">Add Friend by UID</label>
      <input class="fi" id="friend-uid-input" placeholder="Friend's User ID">
    </div>
    <button class="btn btn-gold" onclick="addFriend()">+ Add Friend</button>
    <div style="margin-top:14px">
      ${friendList.length===0 ? '<div style="color:var(--txt2);text-align:center;padding:20px">No friends yet. Add someone!</div>' : ''}
      ${friendList.map(([uid]) => {
        const friend = friends[uid] || {};
        return `<div class="friend-card" onclick="viewFriend('${uid}')">
          <div class="friend-av">${friend.avatar||'👤'}</div>
          <div class="friend-info">
            <div class="friend-name">${escapeHtml(friend.name||'Unknown')} ${friend.role==='admin' ? '<span class="admin-badge">ADMIN</span>' : ''} ${friend.title ? `<span class="title-badge">${friend.title}</span>` : ''}</div>
            <div class="friend-detail">Tap to view stats</div>
          </div>
          <button class="friend-remove" onclick="event.stopPropagation(); removeFriend('${uid}')">✕</button>
        </div>`;
      }).join('')}
    </div>
  `;
}

function addFriend(){
  const uid = document.getElementById('friend-uid-input').value.trim();
  if(!uid) return alert('Enter a UID');
  if(uid === S.uid) return alert('Cannot add yourself');
  db.ref('users/' + uid).once('value').then(snap => {
    const val = snap.val();
    if(!val) return alert('User not found');
    if(!S.friends) S.friends = {};
    S.friends[uid] = { 
      name: val.name, 
      avatar: val.avatar, 
      avatarImg: val.avatarImg || null,
      role: val.role || null,
      title: val.equippedTitle ? getTitleText(val.equippedTitle) : null,
      status: val.status || '',
      xp: val.xp || 0
    };
    friendsRef().set(S.friends);
    render('friends');
  }).catch(e => alert('Error: '+e.message));
}

function removeFriend(uid){
  if(!confirm('Remove this friend?')) return;
  delete S.friends[uid];
  friendsRef().set(S.friends);
  render('friends');
}

function viewFriend(uid){
  db.ref('users/' + uid).once('value').then(snap => {
    const f = snap.val();
    if(!f) return alert('User no longer exists');
    showFriendView(uid, f);
  });
}

function showFriendView(uid, f){
  const logs = f.logs || {};
  const w = Object.entries(logs).filter(([,v])=>v.type==='workout');
  const r = Object.entries(logs).filter(([,v])=>v.type==='rest');
  const total = w.reduce((s,[,v])=>s+(v.total||0),0);
  const best = w.length ? Math.max(...w.map(([,v])=>v.total||0)) : 0;
  const avg = w.length ? Math.round(total/w.length) : 0;
  const streak = (()=>{
    let n=0,d=new Date();
    while(true){
      const k=fmt(d),e=logs[k];
      if(!e||e.type!=='workout'){if(k===todayStr()&&!e){d.setDate(d.getDate()-1);continue}break}
      n++;d.setDate(d.getDate()-1);
    }
    return n;
  })();
  const p = f.goalDays ? Math.min(100, Math.round(w.length/f.goalDays*100)) : 0;
  const todayLog = logs[todayStr()];
  const todayReps = todayLog?.type==='workout' ? todayLog.total : 0;
  const xp = f.xp || 0;
  const friendStatus = f.status || '';

  const av = f.avatarImg ? `<img src="${f.avatarImg}" style="width:60px;height:60px;border-radius:50%;object-fit:cover">` : f.avatar;

  document.getElementById('friend-view').innerHTML = `
    <div class="friend-view-header">
      <button class="btn btn-dark" style="width:auto;padding:8px 16px;font-size:14px" onclick="closeFriendView()">← Back</button>
      <div style="flex:1;text-align:right">
        <button class="btn btn-dark" style="width:auto;padding:8px 16px;font-size:14px" onclick="removeFriend('${uid}');closeFriendView()">Remove Friend</button>
      </div>
    </div>
    <div class="prof-top" style="padding-top:0">
      <div style="font-size:60px">${av}</div>
      <div class="p-name">${escapeHtml(f.name.toUpperCase())} ${f.equippedTitle ? `<span class="title-badge">${getTitleText(f.equippedTitle)}</span>` : ''} ${f.role==='admin' ? '<span class="admin-badge">ADMIN</span>' : ''}</div>
      ${friendStatus ? `<div style="color:var(--txt2);font-size:13px;margin-top:4px;">💬 ${escapeHtml(friendStatus)}</div>` : ''}
      <div class="p-age">Age ${f.age} · ${f.goalDays}-day challenge</div>
      <div class="xp-badge">⭐ ${xp} XP</div>
    </div>
    <div class="today-hero">
      <div class="today-hero-n">${todayReps}</div>
      <div class="today-hero-l">Today's Pull-Ups</div>
    </div>
    <div class="hero"><div class="hero-n">${total.toLocaleString()}</div><div class="hero-l">Total Pull-Ups</div></div>
    <div class="sg">
      <div class="sgc"><div class="sgc-v">${w.length}</div><div class="sgc-l">Workouts</div></div>
      <div class="sgc"><div class="sgc-v">${r.length}</div><div class="sgc-l">Rest Days</div></div>
      <div class="sgc"><div class="sgc-v">${streak}</div><div class="sgc-l">🔥 Streak</div></div>
      <div class="sgc"><div class="sgc-v">${best}</div><div class="sgc-l">Best Day</div></div>
      <div class="sgc"><div class="sgc-v">${avg}</div><div class="sgc-l">Daily Avg</div></div>
      <div class="sgc"><div class="sgc-v">${p}%</div><div class="sgc-l">Complete</div></div>
    </div>
    ${f.quote ? `<div class="p-quote">"${escapeHtml(f.quote)}"</div>` : ''}
  `;
  document.getElementById('friend-view').classList.remove('hidden');
}

function closeFriendView(){
  document.getElementById('friend-view').classList.add('hidden');
}

// ─── INVENTORY MODAL ───────────────────────────────────────────────────────
function openInventory(){
  document.getElementById('inventory-modal').classList.remove('hidden');
  // Activate first tab
  document.querySelectorAll('.inv-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('.inv-tab[data-tab="themes"]').classList.add('active');
  renderInventory('themes');
  // Tab events
  document.querySelectorAll('.inv-tab').forEach(tab => {
    tab.onclick = function(){
      document.querySelectorAll('.inv-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      renderInventory(this.dataset.tab);
    };
  });
}

function closeInventory(){
  document.getElementById('inventory-modal').classList.add('hidden');
}

function renderInventory(type){
  const container = document.getElementById('inv-items-container');
  let items = [];
  if(type === 'themes'){
    items = S.inventory.filter(id => SHOP_ITEMS.find(i => i.id === id && i.type === 'theme'));
  } else if(type === 'titles'){
    items = S.inventory.filter(id => SHOP_ITEMS.find(i => i.id === id && i.type === 'title'));
  }

  let html = '';
  items.forEach(itemId => {
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if(!item) return;
    const isEquipped = (item.type==='theme' && S.equippedTheme===itemId) || (item.type==='title' && S.equippedTitle===itemId);
    html += `
      <div class="inv-item">
        <div>
          <div class="inv-item-name">${item.name || item.data} ${isEquipped?'(Equipped)':''}</div>
          <div style="font-size:11px;color:var(--txt2)">${item.desc}</div>
        </div>
        <div class="inv-item-actions">
          <button class="btn btn-blue" style="padding:6px 12px;font-size:12px;width:auto;" onclick="equipItem('${item.id}')">${isEquipped?'Unequip':'Equip'}</button>
        </div>
      </div>
    `;
  });

  if(!html) html = '<div style="text-align:center;color:var(--txt2);padding:20px;">No items in this category.</div>';
  container.innerHTML = html;
}

// Close inventory when clicking outside
document.getElementById('inventory-modal').addEventListener('click', function(e){
  if(e.target === this) closeInventory();
});

// ─── SHOP ──────────────────────────────────────────────────────────────────
function renderShop(){
  const themes = SHOP_ITEMS.filter(i => i.type === 'theme');
  const titles = SHOP_ITEMS.filter(i => i.type === 'title');

  let html = `
    <div class="sh">SHOP</div>
    <div class="xp-badge" style="font-size:18px; margin-bottom:20px;">⭐ ${S.user.xp} XP</div>
  `;

  html += `<div class="ach-card"><div class="ach-title">Themes</div>`;
  themes.forEach(item => {
    const owned = S.inventory.includes(item.id);
    const equipped = S.equippedTheme === item.id;
    html += `
      <div class="inv-item">
        <div>
          <div class="inv-item-name">${item.name} ${equipped?'(Active)':''}</div>
          <div style="font-size:11px;color:var(--txt2)">${item.desc}</div>
        </div>
        <div>
          <span style="color:var(--gold);font-weight:600;">${item.price} XP</span>
          ${owned ? 
            `<button class="btn btn-blue" style="padding:6px 12px;font-size:12px;width:auto;" onclick="equipItem('${item.id}')">${equipped?'Unequip':'Equip'}</button>` :
            `<button class="btn btn-gold" style="padding:6px 12px;font-size:12px;width:auto;" onclick="buyItem('${item.id}')">Buy</button>`
          }
        </div>
      </div>
    `;
  });
  html += `</div>`;

  html += `<div class="ach-card"><div class="ach-title">Titles</div>`;
  titles.forEach(item => {
    const owned = S.inventory.includes(item.id);
    const equipped = S.equippedTitle === item.id;
    html += `
      <div class="inv-item">
        <div>
          <div class="inv-item-name">${item.data}</div>
          <div style="font-size:11px;color:var(--txt2)">${item.desc}</div>
        </div>
        <div>
          <span style="color:var(--gold);font-weight:600;">${item.price} XP</span>
          ${owned ? 
            `<button class="btn btn-blue" style="padding:6px 12px;font-size:12px;width:auto;" onclick="equipItem('${item.id}')">${equipped?'Unequip':'Equip'}</button>` :
            `<button class="btn btn-gold" style="padding:6px 12px;font-size:12px;width:auto;" onclick="buyItem('${item.id}')">Buy</button>`
          }
        </div>
      </div>
    `;
  });
  html += `</div>`;

  document.getElementById('page-shop').innerHTML = html;
}

function buyItem(itemId){
  const item = SHOP_ITEMS.find(i => i.id === itemId);
  if(!item) return;
  if(S.inventory.includes(itemId)) return alert('Already owned');
  if(S.user.xp < item.price) return alert('Not enough XP');
  S.user.xp -= item.price;
  S.inventory.push(itemId);
  saveUserToFirebase();
  showToast(`Purchased: ${item.name}`, '🛒');
  render('shop');
}

function equipItem(itemId){
  const item = SHOP_ITEMS.find(i => i.id === itemId);
  if(!item) return;
  if(item.type === 'theme'){
    S.equippedTheme = (S.equippedTheme === itemId) ? null : itemId;
  } else if(item.type === 'title'){
    S.equippedTitle = (S.equippedTitle === itemId) ? null : itemId;
  }
  saveUserToFirebase();
  applyEquippedTheme();
  render(S.curPage === 'shop' ? 'shop' : 'prof');
}

// ─── APP ICON GENERATION (PWA) ────────────────────────────────────────────
(function(){
  const c=document.createElement('canvas');
  c.width=512;c.height=512;
  const x=c.getContext('2d');
  x.fillStyle='#07070f';
  x.beginPath();x.roundRect(0,0,512,512,100);x.fill();
  const rg=x.createLinearGradient(60,60,452,452);
  rg.addColorStop(0,'#c8a84b');rg.addColorStop(1,'#f5dfa0');
  x.strokeStyle=rg;x.lineWidth=36;x.lineCap='round';
  x.beginPath();x.arc(256,256,180,-Math.PI*0.6,Math.PI*1.2);x.stroke();
  x.strokeStyle='#f5dfa0';x.lineWidth=22;x.lineCap='round';x.lineJoin='round';
  x.beginPath();x.moveTo(156,168);x.lineTo(356,168);x.stroke();
  x.beginPath();x.moveTo(200,168);x.lineTo(256,220);x.lineTo(312,168);x.stroke();
  x.beginPath();x.moveTo(256,220);x.lineTo(256,330);x.stroke();
  x.beginPath();x.arc(256,152,28,0,Math.PI*2);x.fillStyle='#f5dfa0';x.fill();
  x.strokeStyle='#f5dfa0';
  x.beginPath();x.moveTo(256,330);x.lineTo(226,385);x.lineTo(248,420);x.stroke();
  x.beginPath();x.moveTo(256,330);x.lineTo(286,385);x.lineTo(264,420);x.stroke();
  x.fillStyle=rg;x.font='bold 68px sans-serif';x.textAlign='center';x.textBaseline='bottom';
  x.fillText('IRONPULL',256,494);
  const url=c.toDataURL('image/png');
  document.getElementById('apple-icon').href=url;
  document.getElementById('favicon').href=url;
  const mf={name:'IronPull',short_name:'IronPull',start_url:'.',display:'standalone',background_color:'#07070f',theme_color:'#07070f',icons:[{src:url,sizes:'512x512',type:'image/png'}]};
  const blob=new Blob([JSON.stringify(mf)],{type:'application/manifest+json'});
  const ml=document.createElement('link');ml.rel='manifest';ml.href=URL.createObjectURL(blob);
  document.head.appendChild(ml);
})();

// ─── HELPERS ───────────────────────────────────────────────────────────────
function escapeHtml(str){
  if (str == null) return '';
  return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'})[m]);
}

// ─── INIT ──────────────────────────────────────────────────────────────────
initAvGrid('av-grid', S.selAv, 'selAv');