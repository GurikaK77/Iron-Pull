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
};

// ─── FIREBASE REFS ─────────────────────────────────────────────────────────
function userRef(){ return db.ref('users/' + S.uid); }
function logsRef(){ return db.ref('users/' + S.uid + '/logs'); }
function friendsRef(){ return db.ref('users/' + S.uid + '/friends'); }

function syncFromFirebase(){
  if(!S.uid) return;
  userRef().once('value', snap => {
    const val = snap.val();
    if(val){
      S.user = val;
      S.logs = val.logs || {};
      S.friends = val.friends || {};
      render(S.curPage);
      document.getElementById('ob').classList.add('hidden');
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

function authGoogleSignIn(){
  auth.signInWithPopup(googleProvider).catch(e => alert(e.message));
}

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

function signOut(){
  auth.signOut();
}

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
  S.user={...S.tmpUser,avatar:S.selAv,avatarImg:null,startDate:todayStr()};
  S.friends = {};
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
  if(entry?.type==='workout')statusHTML=`<div class="tag tag-g">✓ Completed — ${entry.total} pull-ups</div>`;
  else if(entry?.type==='rest')statusHTML=`<div class="tag tag-b">💤 Rest Day</div>`;
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
        <div class="home-name">${u.name} ${av}</div>
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
      <div style="font-style:italic;color:var(--txt2);line-height:1.6;font-size:14px">"${u.quote}"</div>
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
  const wn=wDays().length+1;
  const suggested=suggestSets(wn);
  S.modalSets=existing?.type==='workout'
    ?existing.sets.map(r=>({reps:r,done:true}))
    :suggested.map(r=>({reps:r,done:false}));
  renderModalSets();
  showModal();
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

  document.getElementById('modal-body').innerHTML=`
    <div class="mtitle">LOG WORKOUT</div>
    <div class="msub">${dl} · Tap ✓ to check off each set</div>
    <div class="sets-wrap" id="sets-wrap">
      ${S.modalSets.map((set,i)=>`
        <div class="set-c${set.done?' done':''}" id="sc-${i}">
          <div class="set-num">S${i+1}</div>
          <div class="set-mid">
            <div class="set-rl">Reps</div>
            <input class="set-ri" type="number" value="${set.reps}" min="1" max="999"
              onchange="updReps(${i},this.value)" id="ri-${i}">
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

function togSet(i){S.modalSets[i].done=!S.modalSets[i].done;updUI()}
function updReps(i,v){S.modalSets[i].reps=parseInt(v)||0;updUI()}
function addSet(){S.modalSets.push({reps:10,done:false});renderModalSets()}
function updUI(){
  S.modalSets.forEach((s,i)=>{
    const c=document.getElementById('sc-'+i);
    const b=c?.querySelector('.set-chk');
    if(!c)return;
    c.classList.toggle('done',s.done);
    b.classList.toggle('done',s.done);
    b.textContent=s.done?'✓':'';
  });
  const t=S.modalSets.reduce((s,x)=>s+(x.done?x.reps:0),0);
  const el=document.getElementById('mod-tot');if(el)el.textContent=t;
}

function saveWorkout(){
  const done=S.modalSets.filter(s=>s.done);
  const all=S.modalSets;
  const sets=(done.length?done:all).map(s=>s.reps);
  const total=sets.reduce((s,v)=>s+v,0);
  S.logs[S.logDate]={type:'workout',sets,total};
  saveLogsToFirebase();
  hideModal();
  render(S.curPage);
}
function saveRest(ds){
  S.logs[ds]={type:'rest',sets:[],total:0};
  saveLogsToFirebase();
  render(S.curPage);
}
function saveRestFromModal(){saveRest(S.logDate); hideModal();}
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

  // Achievements computation
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
          <div class="ach-desc">${a.desc}</div>
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

  document.getElementById('page-stats').innerHTML=`
    <div class="sh">STATISTICS</div>
    <div class="ss">Full performance breakdown</div>
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

    <!-- 🏆 ACHIEVEMENTS 🏆 -->
    <div class="ach-card">
      <div class="ach-title">Achievements</div>
      ${achHTML}
    </div>
  `;
}

// ─── ACHIEVEMENTS LOGIC ────────────────────────────────────────────────────
function getAchievements(){
  const tr = totalReps();
  const wd = wDays().length;
  const st = streak();
  const bd = bestDay();
  const goal = S.user?.goalDays || 30;
  const target = S.user?.target || 100;
  const hitDays = wDays().filter(([,v])=>v.total >= target).length;

  return [
    { icon:'🥇', name:'First Workout', desc:'Complete 1 workout', max:1, current: wd >=1 ? 1 : 0, unlocked: wd >=1 },
    { icon:'🔥', name:'7-Day Streak', desc:'Maintain a streak of 7 days', max:7, current: Math.min(st,7), unlocked: st >=7 },
    { icon:'💪', name:'Pull-Up Centurion', desc:'Reach 1,000 total pull-ups', max:1000, current: Math.min(tr,1000), unlocked: tr >=1000 },
    { icon:'⚡', name:'Iron Man', desc:'10,000 total pull-ups', max:10000, current: Math.min(tr,10000), unlocked: tr >=10000 },
    { icon:'🏋️', name:'Dedicated', desc:'Complete 10 workouts', max:10, current: Math.min(wd,10), unlocked: wd >=10 },
    { icon:'🎯', name:'Consistent', desc:'Hit daily target 5 times', max:5, current: Math.min(hitDays,5), unlocked: hitDays >=5 },
    { icon:'🏆', name:'Challenge Champion', desc:'Complete your challenge (${goal} days)', max:goal, current: Math.min(wd,goal), unlocked: wd >= goal },
    { icon:'🦾', name:'Heavy Lifter', desc:'Best day: 200 pull-ups', max:200, current: Math.min(bd,200), unlocked: bd >=200 },
    { icon:'🌟', name:'Halfway Hero', desc:'Reach 50% challenge completion', unlocked: wd >= goal/2 },
    { icon:'👑', name:'IronPull Legend', desc:'Unlock all achievements', unlocked: false } // placeholder, we can compute later
  ];
}

// ─── PROFILE ────────────────────────────────────────────────────────────────
function renderProf(){
  const u=S.user;
  const av=u.avatarImg?`<img src="${u.avatarImg}">`:u.avatar;

  document.getElementById('page-prof').innerHTML=`
    <div class="sh">PROFILE</div>
    <div class="prof-top">
      <div class="p-av" onclick="document.getElementById('avatar-upload').click()">${av}<div class="p-av-ovr">CHANGE</div></div>
      <div class="p-name">${escapeHtml(u.name.toUpperCase())}</div>
      <div class="p-age">Age ${u.age} · ${u.goalDays}-day challenge</div>
      <div style="margin-top:8px;display:flex;align-items:center;gap:6px;justify-content:center">
        <span style="font-size:11px;color:var(--txt2);background:var(--s2);padding:4px 12px;border-radius:12px;font-family:'DM Mono',monospace;letter-spacing:0.5px;">UID: ${S.uid}</span>
        <button onclick="copyUID()" style="background:var(--gold-d);border:1px solid var(--gold);color:var(--gold);border-radius:8px;padding:4px 10px;font-size:12px;cursor:pointer">📋 Copy</button>
      </div>
    </div>
    <div class="p-quote">"${escapeHtml(u.quote)}"</div>
    <div class="card">
      <div class="card-title">Edit Profile</div>
      <div class="fg"><label class="fl">Name</label><input class="fi" id="e-name" value="${escapeHtml(u.name)}" maxlength="20"></div>
      <div class="fg"><label class="fl">Age</label><input class="fi" id="e-age" type="number" value="${u.age}" min="10" max="99"></div>
      <div class="fg"><label class="fl">Goal Days</label><input class="fi" id="e-days" type="number" value="${u.goalDays}" min="7" max="365"></div>
      <div class="fg"><label class="fl">Daily Target</label><input class="fi" id="e-target" type="number" value="${u.target||100}" min="10"></div>
      <div class="fg"><label class="fl">Quote</label><input class="fi" id="e-quote" value="${escapeHtml(u.quote)}" maxlength="90"></div>
      <div class="fg"><label class="fl">Avatar Emoji</label><div class="av-grid" id="edit-av-grid"></div></div>
      <button class="btn btn-gold" id="save-btn" onclick="saveProf()">Save Changes</button>
    </div>
    <div class="divider"></div>
    <button class="btn btn-red" onclick="signOut()">🚪 Sign Out</button>
    <div style="height:10px"></div>
  `;
  initAvGrid('edit-av-grid', u.avatar, 'selEditAv');
  S.editAv=null;
}

function escapeHtml(str){
  return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'})[m]);
}

function saveProf(){
  const name=document.getElementById('e-name').value.trim();
  if(!name){alert('Name cannot be empty.');return}
  S.user={...S.user, name,
    age:parseInt(document.getElementById('e-age').value)||S.user.age,
    goalDays:parseInt(document.getElementById('e-days').value)||S.user.goalDays,
    target:parseInt(document.getElementById('e-target').value)||S.user.target,
    quote:document.getElementById('e-quote').value.trim()||S.user.quote,
    avatar:S.editAv||S.user.avatar,
  };
  saveUserToFirebase();
  const btn=document.getElementById('save-btn');
  if(btn){btn.textContent='✓ Saved!';btn.style.background='var(--grn)';btn.style.color='#000';
    setTimeout(()=>{btn.textContent='Save Changes';btn.style.background='';btn.style.color=''},2000)}
  renderProf();
}

function handleAvatarUpload(input){
  const file=input.files[0];if(!file)return;
  const r=new FileReader();
  r.onload=e=>{S.user.avatarImg=e.target.result;saveUserToFirebase();renderProf()};
  r.readAsDataURL(file);
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
            <div class="friend-name">${escapeHtml(friend.name||'Unknown')}</div>
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
    S.friends[uid] = { name: val.name, avatar: val.avatar, avatarImg: val.avatarImg || null };
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
      <div class="p-name">${escapeHtml(f.name.toUpperCase())}</div>
      <div class="p-age">Age ${f.age} · ${f.goalDays}-day challenge</div>
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

// ─── UID COPY ──────────────────────────────────────────────────────────────
function copyUID(){
  navigator.clipboard.writeText(S.uid).then(() => alert('UID copied!'));
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

// ─── INIT ──────────────────────────────────────────────────────────────────
initAvGrid('av-grid', S.selAv, 'selAv');