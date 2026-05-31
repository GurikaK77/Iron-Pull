/* ══════════════════════════════════════════════════════════
   IronPull — script_patch.js
   script.js-ის შემდეგ იტვირთება
══════════════════════════════════════════════════════════ */

/* ── 0. CSS ──────────────────────────────────────────────── */
(function(){
  const s = document.createElement('style');
  s.textContent = `

/* ═══ AVATAR FRAME FIX — overflow:hidden კრავს სურათს წრეში ═══ */
.avatar-frame {
  display:inline-flex!important; align-items:center; justify-content:center;
  border-radius:50%!important; overflow:hidden!important;
  padding:0!important; vertical-align:middle; flex-shrink:0;
  box-sizing:border-box; line-height:0!important;
}
.avatar-frame img { display:block; width:100%; height:100%; object-fit:cover; border-radius:0!important; }
.p-av { overflow:hidden; }
.p-av img { display:block; width:100%; height:100%; object-fit:cover; }

/* ═══ 12 FRAME DESIGNS ═══ */

/* 1. Iron — solid steel, no glow */
.frame-iron {
  border:0!important;
  box-shadow: 0 0 0 3px var(--bg,#07070f),
              0 0 0 6px #8a8a9a,
              0 0 0 7px rgba(255,255,255,.08),
              0 0 10px rgba(138,138,154,.2);
}

/* 2. Gold — warm classic */
.frame-gold {
  border:0!important;
  box-shadow: 0 0 0 3px var(--bg,#07070f),
              0 0 0 6px #d4af37,
              0 0 0 8px rgba(212,175,55,.25),
              0 0 20px rgba(212,175,55,.55);
}

/* 3. Champion — double ring, elite */
.frame-champion {
  border:0!important;
  box-shadow: 0 0 0 2px var(--bg,#07070f),
              0 0 0 5px #ffd700,
              0 0 0 7px var(--bg,#07070f),
              0 0 0 10px #c8a84b,
              0 0 26px rgba(212,175,55,.7);
}

/* 4. Fire — animated orange-red pulse */
.frame-fire {
  border:0!important;
  animation: firePulse 1.3s ease-in-out infinite;
}
@keyframes firePulse {
  0%,100% { box-shadow: 0 0 0 3px var(--bg,#07070f), 0 0 0 6px #ff4500, 0 0 18px rgba(255,69,0,.5); }
  50%     { box-shadow: 0 0 0 3px var(--bg,#07070f), 0 0 0 6px #ff8c00, 0 0 30px rgba(255,140,0,.85); }
}

/* 5. Ice — shimmer blue */
.frame-ice {
  border:0!important;
  animation: iceShimmer 2.4s ease-in-out infinite;
}
@keyframes iceShimmer {
  0%,100% { box-shadow: 0 0 0 3px var(--bg,#07070f), 0 0 0 6px #7dd8f8, 0 0 18px rgba(125,216,248,.4); }
  50%     { box-shadow: 0 0 0 3px var(--bg,#07070f), 0 0 0 7px #c8f0ff, 0 0 0 9px rgba(200,240,255,.15), 0 0 28px rgba(200,240,255,.65); }
}

/* 6. Neon — cyberpunk green */
.frame-neon {
  border:0!important;
  box-shadow: 0 0 0 3px var(--bg,#07070f),
              0 0 0 6px #00ff88,
              0 0 0 8px rgba(0,255,136,.2),
              0 0 20px rgba(0,255,136,.6);
}

/* 7. Lightning — fast electric pulse */
.frame-lightning {
  border:0!important;
  animation: ltPulse 1.1s ease-in-out infinite;
}
@keyframes ltPulse {
  0%,100% { box-shadow: 0 0 0 3px var(--bg,#07070f), 0 0 0 6px #60d8f0, 0 0 14px rgba(96,216,240,.4); }
  50%     { box-shadow: 0 0 0 3px var(--bg,#07070f), 0 0 0 7px #a8f0ff, 0 0 30px rgba(168,240,255,.85); }
}

/* 8. Shadow — dark purple smoke */
.frame-shadow {
  border:0!important;
  box-shadow: 0 0 0 3px var(--bg,#07070f),
              0 0 0 6px #6b21a8,
              0 0 0 9px rgba(107,33,168,.3),
              0 0 24px rgba(107,33,168,.7),
              0 0 40px rgba(107,33,168,.2);
}

/* 9. Diamond — triple ring crystalline */
.frame-diamond {
  border:0!important;
  box-shadow: 0 0 0 2px var(--bg,#07070f),
              0 0 0 4px #b8deff,
              0 0 0 6px var(--bg,#07070f),
              0 0 0 8px rgba(255,255,255,.6),
              0 0 0 10px var(--bg,#07070f),
              0 0 0 12px #b8deff,
              0 0 24px rgba(184,222,255,.5);
}

/* 10. Mythic — shifts purple ↔ gold */
.frame-mythic {
  border:0!important;
  animation: mythicShift 2.8s ease-in-out infinite;
}
@keyframes mythicShift {
  0%,100% { box-shadow: 0 0 0 3px var(--bg,#07070f), 0 0 0 6px #a855f7, 0 0 22px rgba(168,85,247,.65); }
  50%     { box-shadow: 0 0 0 3px var(--bg,#07070f), 0 0 0 6px #d4af37, 0 0 0 9px rgba(212,175,55,.2), 0 0 24px rgba(212,175,55,.6); }
}

/* 11. Rainbow — full color cycle */
.frame-rainbow {
  border:0!important;
  animation: rbFrame 3s linear infinite;
}
@keyframes rbFrame {
  0%  { box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #ff0000,0 0 18px rgba(255,0,0,.5) }
  14% { box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #ff8800,0 0 18px rgba(255,136,0,.5) }
  28% { box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #ffee00,0 0 18px rgba(255,238,0,.5) }
  42% { box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #00dd00,0 0 18px rgba(0,221,0,.5) }
  57% { box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #0088ff,0 0 18px rgba(0,136,255,.5) }
  71% { box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #aa00ff,0 0 18px rgba(170,0,255,.5) }
  85% { box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #ff0088,0 0 18px rgba(255,0,136,.5) }
  100%{ box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #ff0000,0 0 18px rgba(255,0,0,.5) }
}

/* 12. Galaxy — deep space nebula */
.frame-galaxy {
  border:0!important;
  animation: galaxyPulse 3.5s ease-in-out infinite;
}
@keyframes galaxyPulse {
  0%,100% { box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #4f46e5,0 0 0 9px rgba(99,102,241,.15),0 0 24px rgba(79,70,229,.5); }
  33%     { box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #7c3aed,0 0 0 10px rgba(124,58,237,.2),0 0 32px rgba(124,58,237,.7); }
  66%     { box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #2563eb,0 0 0 9px rgba(37,99,235,.15),0 0 26px rgba(37,99,235,.55); }
}

/* ── same frames on .p-av (profile avatar, bigger) ── */
.p-av.frame-iron,.p-av.frame-gold,.p-av.frame-champion,.p-av.frame-fire,
.p-av.frame-ice,.p-av.frame-neon,.p-av.frame-lightning,.p-av.frame-shadow,
.p-av.frame-diamond,.p-av.frame-mythic,.p-av.frame-rainbow,.p-av.frame-galaxy {
  border:none!important;
}
.p-av.frame-iron      { box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #8a8a9a,0 0 12px rgba(138,138,154,.2)!important; }
.p-av.frame-gold      { box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #d4af37,0 0 26px rgba(212,175,55,.6)!important; }
.p-av.frame-champion  { box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #ffd700,0 0 0 9px var(--bg,#07070f),0 0 0 13px #c8a84b,0 0 30px rgba(212,175,55,.7)!important; }
.p-av.frame-fire      { animation:firePulseBig 1.3s ease-in-out infinite; }
@keyframes firePulseBig{0%,100%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #ff4500,0 0 22px rgba(255,69,0,.5)}50%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #ff8c00,0 0 36px rgba(255,140,0,.85)}}
.p-av.frame-ice       { animation:iceShimmerBig 2.4s ease-in-out infinite; }
@keyframes iceShimmerBig{0%,100%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #7dd8f8,0 0 22px rgba(125,216,248,.4)}50%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 9px #c8f0ff,0 0 0 12px rgba(200,240,255,.15),0 0 34px rgba(200,240,255,.65)}}
.p-av.frame-neon      { box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #00ff88,0 0 0 10px rgba(0,255,136,.2),0 0 26px rgba(0,255,136,.6)!important; }
.p-av.frame-lightning { animation:ltPulseBig 1.1s ease-in-out infinite; }
@keyframes ltPulseBig{0%,100%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #60d8f0,0 0 18px rgba(96,216,240,.4)}50%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 9px #a8f0ff,0 0 36px rgba(168,240,255,.85)}}
.p-av.frame-shadow    { box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #6b21a8,0 0 0 12px rgba(107,33,168,.3),0 0 30px rgba(107,33,168,.7)!important; }
.p-av.frame-diamond   { box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 5px #b8deff,0 0 0 8px var(--bg,#07070f),0 0 0 10px rgba(255,255,255,.6),0 0 0 13px var(--bg,#07070f),0 0 0 16px #b8deff,0 0 28px rgba(184,222,255,.5)!important; }
.p-av.frame-mythic    { animation:mythicShiftBig 2.8s ease-in-out infinite; }
@keyframes mythicShiftBig{0%,100%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #a855f7,0 0 28px rgba(168,85,247,.65)}50%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #d4af37,0 0 0 11px rgba(212,175,55,.2),0 0 30px rgba(212,175,55,.6)}}
.p-av.frame-rainbow   { animation:rbFrameBig 3s linear infinite; }
@keyframes rbFrameBig{0%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #ff0000,0 0 22px rgba(255,0,0,.5)}14%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #ff8800,0 0 22px rgba(255,136,0,.5)}28%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #ffee00,0 0 22px rgba(255,238,0,.5)}42%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #00dd00,0 0 22px rgba(0,221,0,.5)}57%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #0088ff,0 0 22px rgba(0,136,255,.5)}71%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #aa00ff,0 0 22px rgba(170,0,255,.5)}85%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #ff0088,0 0 22px rgba(255,0,136,.5)}100%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #ff0000,0 0 22px rgba(255,0,0,.5)}}
.p-av.frame-galaxy    { animation:galaxyPulseBig 3.5s ease-in-out infinite; }
@keyframes galaxyPulseBig{0%,100%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #4f46e5,0 0 0 12px rgba(99,102,241,.15),0 0 30px rgba(79,70,229,.5)}33%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #7c3aed,0 0 0 13px rgba(124,58,237,.2),0 0 38px rgba(124,58,237,.7)}66%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #2563eb,0 0 0 12px rgba(37,99,235,.15),0 0 32px rgba(37,99,235,.55)}}

/* ═══ SHOP — frame card ═══ */
.shop-frame-card {
  display:flex; align-items:center; gap:14px;
  background:var(--s2); border:1px solid var(--border);
  border-radius:14px; padding:14px 16px; margin-bottom:10px;
  transition:border-color .2s;
}
.shop-frame-card:hover { border-color:rgba(212,175,55,.25); }
.shop-frame-preview {
  width:52px; height:52px; border-radius:50%; overflow:hidden;
  display:flex; align-items:center; justify-content:center;
  font-size:26px; flex-shrink:0; background:var(--bg);
  position:relative;
}
.shop-frame-info { flex:1; min-width:0; }
.shop-frame-name { font-size:14px; font-weight:600; color:var(--txt); }
.shop-frame-desc { font-size:11px; color:var(--txt2); margin-top:2px; line-height:1.4; }
.shop-frame-right { display:flex; flex-direction:column; align-items:flex-end; gap:6px; flex-shrink:0; }
.shop-frame-price { color:var(--gold); font-size:13px; font-weight:700; white-space:nowrap; }
.shop-frame-owned { font-size:11px; color:var(--txt2); white-space:nowrap; }

/* ═══ INVENTORY frame grid ═══ */
.inv-frame-grid {
  display:grid; grid-template-columns:repeat(3,1fr); gap:12px; padding:4px 0;
}
.inv-frame-cell {
  display:flex; flex-direction:column; align-items:center; gap:8px;
  background:var(--s2); border:1px solid var(--border);
  border-radius:12px; padding:14px 8px 10px; cursor:pointer;
  transition:all .2s; position:relative;
}
.inv-frame-cell:hover { border-color:rgba(212,175,55,.35); }
.inv-frame-cell.equipped { border-color:var(--gold); background:var(--gold-d,rgba(212,175,55,.08)); }
.inv-frame-cell .ifp {
  width:54px; height:54px; border-radius:50%; overflow:hidden;
  display:flex; align-items:center; justify-content:center;
  font-size:26px; background:var(--bg);
}
.inv-frame-cell .ifn { font-size:11px; color:var(--txt2); text-align:center; line-height:1.3; }
.inv-frame-cell .ife {
  font-size:10px; font-weight:700; color:var(--gold);
  background:rgba(212,175,55,.12); border:1px solid rgba(212,175,55,.3);
  border-radius:8px; padding:3px 8px;
}
.inv-frame-cell .ifbtn {
  font-size:11px; font-weight:600; color:var(--txt);
  background:rgba(255,255,255,.06); border:1px solid var(--border);
  border-radius:8px; padding:4px 10px; cursor:pointer;
  transition:all .2s; font-family:'DM Sans',sans-serif;
}
.inv-frame-cell .ifbtn:hover { background:rgba(212,175,55,.15); border-color:var(--gold); color:var(--gold); }

/* ═══ BIO / NOTE card ═══ */
.ip-bio-card {
  background:var(--s2); border:1px solid var(--border); border-radius:14px;
  padding:12px 36px 12px 14px; font-size:14px; color:var(--txt); line-height:1.6;
  margin:8px 0 4px; cursor:pointer; transition:border-color .2s;
  min-height:44px; white-space:pre-wrap; word-break:break-word;
  position:relative; outline:none;
}
.ip-bio-card[contenteditable="true"]:focus { border-color:var(--gold); }
.ip-bio-card::after { content:'✏️'; position:absolute; top:10px; right:11px; font-size:12px; opacity:.4; }
.ip-bio-card:focus::after { display:none; }
.ip-bio-empty { font-size:13px; color:var(--txt2); margin:8px 0 4px; cursor:pointer; padding:8px 0; opacity:.55; }
.ip-bio-label { font-size:10px; color:var(--txt2); text-transform:uppercase; letter-spacing:.8px; margin-top:8px; }
.ip-bio-save { display:none; background:var(--gold-d,rgba(212,175,55,.12)); border:1px solid var(--gold); color:var(--gold); border-radius:10px; padding:5px 14px; font-size:12px; font-weight:600; cursor:pointer; margin-top:4px; font-family:'DM Sans',sans-serif; }
.ip-bio-save.vis { display:inline-block; }

/* friend bio */
.ip-friend-bio { background:var(--s2); border:1px solid var(--border); border-radius:14px; padding:12px 14px; font-size:14px; color:var(--txt2); line-height:1.6; margin:6px 0 10px; white-space:pre-wrap; word-break:break-word; }
.ip-status { font-size:12px; color:var(--txt2); margin-top:4px; display:flex; align-items:center; gap:5px; }

/* ═══ FLOATING LANG TOGGLE ═══ */
#ip-lang-float { display:none; position:fixed; top:14px; right:14px; z-index:200;
  background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1);
  border-radius:20px; overflow:hidden; }
#ip-lang-float.vis { display:flex; }
.ip-lb { padding:5px 12px; font-size:11px; font-weight:600; color:rgba(255,255,255,.3);
  background:none; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; }
.ip-lb.active { background:rgba(212,175,55,.2); color:var(--gold,#c8a84b); }
  `;
  document.head.appendChild(s);
})();

/* ── 1. LANGUAGE ─────────────────────────────────────────── */
const I18N = {
  en:{
    tagline:'Elite Pull-Up Tracker', signin:'Sign In', signup:'Sign Up',
    google:'Continue with Google', or:'or', password:'Password',
    confirm:'Confirm Password', create:'Create Account',
    forgot:'Forgot password?', terms:'By signing up you agree to our Terms of Service',
    nav_home:'Home', nav_stats:'Stats', nav_log:'LOG', nav_friends:'Friends', nav_prof:'Profile',
    inventory:'Inventory', themes:'Themes', titles:'Titles', inv_frames:'Frames',
    bio_label:'📝 Note', bio_ph:'Add a note or bio...', bio_save:'Save',
    w_saved:'💪 Workout Logged!', r_saved:'😴 Rest Day Logged', f_added:'🤝 Friend Added!',
    note_saved:'📝 Note Saved',
  },
  ka:{
    tagline:'ელიტური გამოჭიმვების ტრეკერი', signin:'შესვლა', signup:'რეგისტრაცია',
    google:'Google-ით გაგრძელება', or:'ან', password:'პაროლი',
    confirm:'გაიმეორე პაროლი', create:'ანგარიშის შექმნა',
    forgot:'დაგავიწყდა პაროლი?', terms:'რეგისტრაციით ეთანხმები მომსახურების პირობებს',
    nav_home:'მთავარი', nav_stats:'სტატ.', nav_log:'ჩაწ.', nav_friends:'მეგ.', nav_prof:'პროფ.',
    inventory:'ინვენტარი', themes:'თემები', titles:'ტიტულები', inv_frames:'ჩარჩოები',
    bio_label:'📝 შენიშვნა', bio_ph:'შენიშვნა ან ბიო...', bio_save:'შენახვა',
    w_saved:'💪 ჩანიშნულია!', r_saved:'😴 დასვენება ჩანიშნულია', f_added:'🤝 მეგობარი დაემატა!',
    note_saved:'📝 შენახულია',
  }
};
const IPLang = {
  current: localStorage.getItem('ip_lang')||'en',
  t(k){ return (I18N[this.current]||I18N.en)[k]||k; },
  set(lang){
    this.current = lang; localStorage.setItem('ip_lang', lang);
    document.documentElement.lang = lang==='ka'?'ka':'en';
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const v=(I18N[lang]||I18N.en)[el.dataset.i18n]; if(v!==undefined) el.textContent=v;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
      const k=el.getAttribute('data-i18n-ph');
      const v=(I18N[lang]||I18N.en)[k]; if(v!==undefined) el.placeholder=v;
    });
    document.querySelectorAll('.ip-lb').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
    const ae=document.getElementById('alb-'+lang), ai=document.getElementById('alb-'+(lang==='en'?'ka':'en'));
    if(ae){ae.classList.add('active');} if(ai){ai.classList.remove('active');}
  },
  apply(){ this.set(this.current); }
};
document.addEventListener('DOMContentLoaded',()=>IPLang.apply());

/* ── 2. AUTH TAB ─────────────────────────────────────────── */
function authTab(t){
  const si=t==='si';
  ['tab-si','tab-su'].forEach((id,i)=>document.getElementById(id)?.classList.toggle('active',i===0?si:!si));
  ['panel-si','panel-su'].forEach((id,i)=>document.getElementById(id)?.classList.toggle('active',i===0?si:!si));
}

/* ── 3. REGISTER + RESET ─────────────────────────────────── */
function doRegister(){
  const email=document.getElementById('reg-email')?.value?.trim();
  const pass=document.getElementById('reg-pass')?.value;
  const pass2=document.getElementById('reg-pass2')?.value;
  const ka=IPLang.current==='ka';
  if(!email||!pass) return alert(ka?'შეავსე ყველა ველი':'Fill all fields');
  if(pass!==pass2) return alert(ka?'პაროლები არ ემთხვევა':'Passwords do not match');
  firebase.auth().createUserWithEmailAndPassword(email,pass).catch(e=>alert(e.message));
}
window.resetPassword=function(){
  const email=(document.getElementById('auth-email')?.value||document.getElementById('reg-email')?.value||'').trim();
  if(!email) return alert(IPLang.current==='ka'?'ჯერ შეიყვანე ელ-ფოსტა':'Enter your email first');
  firebase.auth().sendPasswordResetEmail(email)
    .then(()=>alert(IPLang.current==='ka'?'გამოგზავნილია!':'Reset email sent!'))
    .catch(e=>alert(e.message));
};

/* ── 4. FLOATING LANG TOGGLE ─────────────────────────────── */
function _ipShowLang(){
  if(document.getElementById('ip-lang-float')){document.getElementById('ip-lang-float').classList.add('vis');return;}
  const d=document.createElement('div'); d.id='ip-lang-float';
  d.innerHTML=`<button class="ip-lb${IPLang.current==='en'?' active':''}" data-lang="en" onclick="IPLang.set('en')">EN</button>
    <button class="ip-lb${IPLang.current==='ka'?' active':''}" data-lang="ka" onclick="IPLang.set('ka')">ქარ</button>`;
  document.body.appendChild(d); setTimeout(()=>d.classList.add('vis'),50);
}
(function(){
  const a=document.getElementById('auth-screen');
  if(!a){document.addEventListener('DOMContentLoaded',arguments.callee);return;}
  new MutationObserver(()=>{
    if(a.classList.contains('hidden')) _ipShowLang();
    else document.getElementById('ip-lang-float')?.classList.remove('vis');
  }).observe(a,{attributes:true,attributeFilter:['class']});
  if(a.classList.contains('hidden')) _ipShowLang();
})();

/* ── 5. MODAL SCROLL FIX ─────────────────────────────────── */
(function(){
  const ov=document.getElementById('modal-overlay');
  if(!ov){document.addEventListener('DOMContentLoaded',arguments.callee);return;}
  let y=0;
  new MutationObserver(()=>{
    const open=!ov.classList.contains('hidden');
    if(open){y=window.scrollY;document.body.style.cssText+=`;position:fixed;top:-${y}px;width:100%`;const m=ov.querySelector('.modal');if(m)m.scrollTop=0;}
    else{document.body.style.position=document.body.style.top=document.body.style.width='';window.scrollTo(0,y);}
  }).observe(ov,{attributes:true,attributeFilter:['class']});
})();

/* ── 6. TOAST OVERRIDES ──────────────────────────────────── */
const _oSW=window.saveWorkout;
window.saveWorkout=function(){_oSW?.call(this);setTimeout(()=>showToast(IPLang.t('w_saved'),'💪'),80);};
const _oSR=window.saveRest;
window.saveRest=function(ds){_oSR?.call(this,ds);setTimeout(()=>showToast(IPLang.t('r_saved'),'😴'),80);};

/* ── 7. FRAME HELPERS ────────────────────────────────────── */
function _ipFrameCss(id){ return id||''; } // ID === CSS class (frame-gold etc)

function _ipApplyFrames(){
  const css=_ipFrameCss(S.equippedFrame||'');
  const all=SHOP_ITEMS.filter(i=>i.type==='frame').map(i=>i.data);
  document.querySelectorAll('.p-av,.avatar-frame').forEach(el=>{
    all.forEach(c=>{if(c)el.classList.remove(c);}); if(css) el.classList.add(css);
  });
}

/* ── 8. OVERRIDE renderShop ──────────────────────────────── */
window.renderShop = function(){
  const themes = SHOP_ITEMS.filter(i=>i.type==='theme');
  const titles  = SHOP_ITEMS.filter(i=>i.type==='title');
  const frames  = SHOP_ITEMS.filter(i=>i.type==='frame');
  const lang = IPLang.current;

  let html = `
    <div class="sh">SHOP</div>
    <div class="xp-badge" style="font-size:18px;margin-bottom:20px;">⭐ ${S.user.xp} XP</div>
  `;

  /* Themes */
  html += `<div class="ach-card"><div class="ach-title">${lang==='ka'?'თემები':'Themes'}</div>`;
  themes.forEach(item=>{
    const owned=S.inventory.includes(item.id), eq=S.equippedTheme===item.id;
    html+=`<div class="inv-item"><div>
      <div class="inv-item-name">${item.name}${eq?' <span style="color:var(--gold);font-size:11px;">(Active)</span>':''}</div>
      <div style="font-size:11px;color:var(--txt2)">${item.desc}</div>
    </div><div style="display:flex;align-items:center;gap:8px;">
      <span style="color:var(--gold);font-weight:600;">${item.price} XP</span>
      ${owned
        ? `<button class="btn btn-blue" style="padding:6px 12px;font-size:12px;width:auto;" onclick="equipItem('${item.id}')">${eq?'Unequip':'Equip'}</button>`
        : `<button class="btn btn-gold" style="padding:6px 12px;font-size:12px;width:auto;" onclick="buyItem('${item.id}')">Buy</button>`}
    </div></div>`;
  });
  html += `</div>`;

  /* Titles */
  html += `<div class="ach-card"><div class="ach-title">${lang==='ka'?'ტიტულები':'Titles'}</div>`;
  titles.forEach(item=>{
    const owned=S.inventory.includes(item.id), eq=S.equippedTitle===item.id;
    html+=`<div class="inv-item"><div>
      <div class="inv-item-name">${item.data}${eq?' <span style="color:var(--gold);font-size:11px;">(Active)</span>':''}</div>
      <div style="font-size:11px;color:var(--txt2)">${item.desc}</div>
    </div><div style="display:flex;align-items:center;gap:8px;">
      <span style="color:var(--gold);font-weight:600;">${item.price} XP</span>
      ${owned
        ? `<button class="btn btn-blue" style="padding:6px 12px;font-size:12px;width:auto;" onclick="equipItem('${item.id}')">${eq?'Unequip':'Equip'}</button>`
        : `<button class="btn btn-gold" style="padding:6px 12px;font-size:12px;width:auto;" onclick="buyItem('${item.id}')">Buy</button>`}
    </div></div>`;
  });
  html += `</div>`;

  /* Frames — visual cards */
  html += `<div class="ach-card"><div class="ach-title">${lang==='ka'?'ჩარჩოები':'Frames'}</div>`;
  frames.forEach(item=>{
    const owned=S.inventory.includes(item.id), eq=S.equippedFrame===item.id;
    html+=`
      <div class="shop-frame-card">
        <div class="shop-frame-preview ${owned?item.data:''}">${item.emoji||'🖼️'}</div>
        <div class="shop-frame-info">
          <div class="shop-frame-name">${item.name}</div>
          <div class="shop-frame-desc">${item.desc}</div>
        </div>
        <div class="shop-frame-right">
          <div class="shop-frame-price">⭐ ${item.price} XP</div>
          ${owned
            ? `<div class="shop-frame-owned">${eq?'✓ Equipped':'Owned · Equip via Inventory'}</div>`
            : `<button class="btn btn-gold" style="padding:6px 14px;font-size:12px;width:auto;" onclick="buyItem('${item.id}')">Buy</button>`}
        </div>
      </div>`;
  });
  html += `</div>`;

  document.getElementById('page-shop').innerHTML=html;
};

/* ── 9. OVERRIDE openInventory — Frames tab shows grid ───── */
const _oOI=window.openInventory;
window.openInventory=function(){
  _oOI?.call(this);
  setTimeout(()=>{
    document.querySelectorAll('.inv-tab').forEach(tab=>{
      tab.onclick=function(){
        document.querySelectorAll('.inv-tab').forEach(t=>t.classList.remove('active'));
        this.classList.add('active');
        const type=this.dataset.tab;
        if(type==='frames') _ipRenderInvFrames();
        else renderInventory(type);
      };
    });
  },60);
};

function _ipRenderInvFrames(){
  const c=document.getElementById('inv-items-container'); if(!c) return;
  const ownedFrames=SHOP_ITEMS.filter(i=>i.type==='frame'&&S.inventory.includes(i.id));
  if(!ownedFrames.length){
    c.innerHTML='<div style="text-align:center;color:var(--txt2);padding:24px 0;">'+
      (IPLang.current==='ka'?'ჩარჩო არ გაქვს. შოპში შეიძინე!':'No frames yet. Buy some in the Shop!')+'</div>';
    return;
  }
  let html='<div class="inv-frame-grid">';
  ownedFrames.forEach(item=>{
    const eq=S.equippedFrame===item.id;
    html+=`<div class="inv-frame-cell${eq?' equipped':''}" onclick="_ipEquipFrame('${item.id}')">
      <div class="ifp ${item.data}">${item.emoji||'🖼️'}</div>
      <div class="ifn">${item.name}</div>
      ${eq
        ? `<div class="ife">✓ ${IPLang.current==='ka'?'Equipped':'Equipped'}</div>`
        : `<div class="ifbtn">${IPLang.current==='ka'?'Equip':'Equip'}</div>`}
    </div>`;
  });
  html+='</div>';
  c.innerHTML=html;
}

function _ipEquipFrame(itemId){
  S.equippedFrame=(S.equippedFrame===itemId)?null:itemId;
  saveUserToFirebase();
  const item=SHOP_ITEMS.find(i=>i.id===itemId);
  showToast(S.equippedFrame?`🖼️ ${item?.name} equipped!`:'🖼️ Frame removed','🖼️');
  _ipApplyFrames();
  _ipRenderInvFrames(); // re-render grid
}

/* Also override equipItem so it applies visually instantly */
const _oEI=window.equipItem;
window.equipItem=function(itemId){
  _oEI?.call(this,itemId);
  setTimeout(_ipApplyFrames,50);
};

/* ── 10. OVERRIDE renderProf (frame + note, NO frame selector) */
window.renderProf=function(){
  const u=S.user; S.editMode=S.editMode||false;
  const lang=IPLang.current;
  const frameCss=_ipFrameCss(S.equippedFrame||'');
  const avInner=u.avatarImg
    ?`<img src="${u.avatarImg}">`
    :`<span style="font-size:46px;display:flex;align-items:center;justify-content:center;width:100%;height:100%">${u.avatar}</span>`;
  const noteText=u.quote||'';
  let adminHTML='';
  if(u.role==='admin'){
    adminHTML=`<div class="admin-panel"><div class="card-title">🔧 Admin Panel</div>
      <div class="fg"><input class="fi" id="admin-uid-input" placeholder="Enter user UID to edit"></div>
      <button class="btn btn-gold" onclick="adminLoadUser()" style="margin-bottom:12px;">Load User</button>
      <div id="admin-user-edit" style="display:none;">
        <div class="fg"><label class="fl">Name</label><input class="fi" id="admin-e-name" maxlength="20"></div>
        <div class="fg"><label class="fl">Age</label><input class="fi" id="admin-e-age" type="number" min="10" max="99"></div>
        <div class="fg"><label class="fl">Goal Days</label><input class="fi" id="admin-e-days" type="number" min="7" max="365"></div>
        <div class="fg"><label class="fl">Daily Target</label><input class="fi" id="admin-e-target" type="number" min="10"></div>
        <div class="fg"><label class="fl">Note</label><input class="fi" id="admin-e-quote" maxlength="200"></div>
        <button class="btn btn-gold" onclick="adminSaveUser()">Save User</button>
        <button class="btn btn-dark" onclick="adminClear()">Cancel</button>
      </div></div>`;
  }
  document.getElementById('page-prof').innerHTML=`
    <div style="position:relative;">
      <div class="sh">PROFILE</div>
      <button class="prof-shop-btn" onclick="go('shop')">🛒 Shop <span style="font-size:12px;">⭐ ${u.xp}</span></button>
    </div>
    <div class="prof-top">
      <div class="p-av ${frameCss}" onclick="document.getElementById('avatar-upload').click()">
        ${avInner}<div class="p-av-ovr">CHANGE</div>
      </div>
      <div id="profile-view" style="${S.editMode?'display:none':''}">
        <div class="p-name">
          ${escapeHtml(u.name.toUpperCase())}
          ${u.equippedTitle?`<span class="title-badge">${getTitleText(u.equippedTitle)}</span>`:''}
          ${u.role==='admin'?'<span class="admin-badge">ADMIN</span>':''}
        </div>
        ${u.status?`<div class="ip-status">💬 ${escapeHtml(u.status)}</div>`:''}
        <div class="ip-bio-label">${IPLang.t('bio_label')}</div>
        <div id="ip-note" class="ip-bio-card" contenteditable="true"
             data-orig="${escapeHtml(noteText)}"
             onfocus="document.getElementById('ip-note-save').classList.add('vis')"
             onblur="IPSaveNote()"
             onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();this.blur()}"
        >${escapeHtml(noteText)}</div>
        <button class="ip-bio-save" id="ip-note-save" onclick="IPSaveNote()">${IPLang.t('bio_save')}</button>
        <div class="p-age">Age ${u.age} · ${u.goalDays}-day challenge</div>
        <div class="xp-badge" style="margin-top:10px;">⭐ ${u.xp} XP</div>
        <div style="margin-top:14px;">
          <span style="font-size:11px;color:var(--txt2);background:var(--s2);padding:4px 12px;border-radius:12px;">UID: ${S.uid}</span>
          <button onclick="copyUID()" style="background:var(--gold-d);border:1px solid var(--gold);color:var(--gold);border-radius:8px;padding:4px 10px;font-size:12px;cursor:pointer;margin-left:4px;">📋 Copy</button>
        </div>
        <button class="btn btn-gold" style="margin-top:20px;" onclick="toggleEdit(true)">✏️ Edit Profile</button>
        <button class="btn btn-gold" style="margin-top:0;" onclick="openInventory()">🎒 Inventory</button>
        ${adminHTML}
      </div>
      <div id="profile-edit" style="${S.editMode?'':'display:none'}">
        <div class="card">
          <div class="card-title">Edit Profile</div>
          <div class="fg"><label class="fl">Name</label><input class="fi" id="e-name" value="${escapeHtml(u.name)}" maxlength="20"></div>
          <div class="fg"><label class="fl">Age</label><input class="fi" id="e-age" type="number" value="${u.age}" min="10" max="99"></div>
          <div class="fg"><label class="fl">Goal Days</label><input class="fi" id="e-days" type="number" value="${u.goalDays}" min="7" max="365"></div>
          <div class="fg"><label class="fl">Daily Target</label><input class="fi" id="e-target" type="number" value="${u.target||100}" min="10"></div>
          <div class="fg"><label class="fl">${lang==='ka'?'შენიშვნა / ბიო':'Note / Bio'}</label>
            <textarea class="fi" id="e-quote" maxlength="200" style="min-height:72px;resize:none;line-height:1.5">${escapeHtml(u.quote)}</textarea></div>
          <div class="fg"><label class="fl">${lang==='ka'?'სტატუსი':'Status'}</label>
            <input class="fi" id="e-status" value="${escapeHtml(u.status)}" maxlength="60"
              placeholder="${lang==='ka'?'სამოტივაციო წინადადება...':'Motivational sentence...'}"></div>
          <div class="fg"><label class="fl">Avatar Emoji</label><div class="av-grid" id="edit-av-grid"></div></div>
          <div style="display:flex;gap:10px;">
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
  if(S.editMode){initAvGrid('edit-av-grid',u.avatar,'selEditAv');S.editAv=null;}
};

/* Note save */
function IPSaveNote(){
  const el=document.getElementById('ip-note'), btn=document.getElementById('ip-note-save');
  if(!el||!S.user) return;
  const val=el.innerText.trim();
  if(val===(S.user.quote||'').trim()){btn?.classList.remove('vis');return;}
  S.user.quote=val; saveUserToFirebase();
  showToast(IPLang.t('note_saved'),'📝'); btn?.classList.remove('vis');
}

/* ── 11. OVERRIDE showFriendView (bio + frame) ───────────── */
window.showFriendView=function(uid,f){
  const logs=f.logs||{};
  const _fmt=d=>d.toISOString().split('T')[0];
  const _today=()=>_fmt(new Date());
  const w=Object.entries(logs).filter(([,v])=>v.type==='workout');
  const r=Object.entries(logs).filter(([,v])=>v.type==='rest');
  const total=w.reduce((s,[,v])=>s+(v.total||0),0);
  const best=w.length?Math.max(...w.map(([,v])=>v.total||0)):0;
  const avg=w.length?Math.round(total/w.length):0;
  const stk=(()=>{let n=0,d=new Date();while(true){const k=_fmt(d),e=logs[k];if(!e||e.type!=='workout'){if(k===_today()&&!e){d.setDate(d.getDate()-1);continue}break}n++;d.setDate(d.getDate()-1);}return n;})();
  const p=f.goalDays?Math.min(100,Math.round(w.length/f.goalDays*100)):0;
  const todayLog=logs[_today()];
  const todayReps=todayLog?.type==='workout'?todayLog.total:0;
  const frameCss=_ipFrameCss(f.equippedFrame||'');
  const avInner=f.avatarImg
    ?`<img src="${f.avatarImg}" style="width:100%;height:100%;object-fit:cover;display:block;">`
    :`<span style="font-size:56px;display:flex;align-items:center;justify-content:center;width:100%;height:100%">${f.avatar||'👤'}</span>`;
  document.getElementById('friend-view').innerHTML=`
    <div class="friend-view-header">
      <button class="btn btn-dark" style="width:auto;padding:8px 16px;font-size:14px" onclick="closeFriendView()">← Back</button>
      <div style="flex:1;text-align:right">
        <button class="btn btn-dark" style="width:auto;padding:8px 16px;font-size:14px" onclick="removeFriend('${uid}');closeFriendView()">Remove Friend</button>
      </div>
    </div>
    <div class="prof-top" style="padding-top:8px;">
      <div class="p-av ${frameCss}" style="width:88px;height:88px;cursor:default;border:none;">
        ${avInner}
      </div>
      <div class="p-name">
        ${escapeHtml(f.name.toUpperCase())}
        ${f.equippedTitle?`<span class="title-badge">${getTitleText(f.equippedTitle)}</span>`:''}
        ${f.role==='admin'?'<span class="admin-badge">ADMIN</span>':''}
      </div>
      ${f.quote?`<div class="ip-friend-bio">${escapeHtml(f.quote)}</div>`:''}
      ${f.status?`<div class="ip-status">💬 ${escapeHtml(f.status)}</div>`:''}
      <div class="p-age" style="margin-top:6px;">Age ${f.age} · ${f.goalDays}-day challenge</div>
      <div class="xp-badge" style="margin-top:8px;">⭐ ${f.xp||0} XP</div>
    </div>
    <div class="today-hero"><div class="today-hero-n">${todayReps}</div><div class="today-hero-l">Today's Pull-Ups</div></div>
    <div class="hero"><div class="hero-n">${total.toLocaleString()}</div><div class="hero-l">Total Pull-Ups</div></div>
    <div class="sg">
      <div class="sgc"><div class="sgc-v">${w.length}</div><div class="sgc-l">Workouts</div></div>
      <div class="sgc"><div class="sgc-v">${r.length}</div><div class="sgc-l">Rest Days</div></div>
      <div class="sgc"><div class="sgc-v">${stk}</div><div class="sgc-l">🔥 Streak</div></div>
      <div class="sgc"><div class="sgc-v">${best}</div><div class="sgc-l">Best Day</div></div>
      <div class="sgc"><div class="sgc-v">${avg}</div><div class="sgc-l">Daily Avg</div></div>
      <div class="sgc"><div class="sgc-v">${p}%</div><div class="sgc-l">Complete</div></div>
    </div>
    <div style="height:20px"></div>
  `;
  document.getElementById('friend-view').classList.remove('hidden');
};

document.addEventListener('DOMContentLoaded',()=>setTimeout(_ipApplyFrames,700));
console.log('✅ IronPull patch loaded — 12 frames, shop visual, inventory equip only');
