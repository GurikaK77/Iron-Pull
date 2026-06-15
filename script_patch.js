/* IronPush — script_patch.js  (script.js-ის შემდეგ) */

/* ─── 0. CSS ─────────────────────────────────────────────── */
(function(){const s=document.createElement('style');s.textContent=`
.avatar-frame{display:inline-flex!important;align-items:center;justify-content:center;border-radius:50%!important;overflow:hidden!important;padding:0!important;vertical-align:middle;flex-shrink:0;box-sizing:border-box;line-height:0!important}
.avatar-frame img{display:block;width:100%;height:100%;object-fit:cover;border-radius:0!important}
.p-av{overflow:hidden}.p-av img{display:block;width:100%;height:100%;object-fit:cover}
.frame-iron    {border:0!important;box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #8a8a9a,0 0 10px rgba(138,138,154,.2)}
.frame-gold    {border:0!important;box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #d4af37,0 0 20px rgba(212,175,55,.55)}
.frame-champion{border:0!important;box-shadow:0 0 0 2px var(--bg,#07070f),0 0 0 5px #ffd700,0 0 0 7px var(--bg,#07070f),0 0 0 10px #c8a84b,0 0 26px rgba(212,175,55,.7)}
.frame-fire    {border:0!important;animation:firePulse 1.3s ease-in-out infinite}
@keyframes firePulse{0%,100%{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #ff4500,0 0 18px rgba(255,69,0,.5)}50%{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #ff8c00,0 0 30px rgba(255,140,0,.85)}}
.frame-ice     {border:0!important;animation:iceShimmer 2.4s ease-in-out infinite}
@keyframes iceShimmer{0%,100%{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #7dd8f8,0 0 18px rgba(125,216,248,.4)}50%{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 7px #c8f0ff,0 0 28px rgba(200,240,255,.65)}}
.frame-neon    {border:0!important;box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #00ff88,0 0 20px rgba(0,255,136,.6)}
.frame-lightning{border:0!important;animation:ltPulse 1.1s ease-in-out infinite}
@keyframes ltPulse{0%,100%{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #60d8f0,0 0 14px rgba(96,216,240,.4)}50%{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 7px #a8f0ff,0 0 30px rgba(168,240,255,.85)}}
.frame-shadow  {border:0!important;box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #6b21a8,0 0 24px rgba(107,33,168,.7)}
.frame-diamond {border:0!important;box-shadow:0 0 0 2px var(--bg,#07070f),0 0 0 4px #b8deff,0 0 0 6px var(--bg,#07070f),0 0 0 8px rgba(255,255,255,.6),0 0 0 10px var(--bg,#07070f),0 0 0 12px #b8deff,0 0 24px rgba(184,222,255,.5)}
.frame-mythic  {border:0!important;animation:mythicShift 2.8s ease-in-out infinite}
@keyframes mythicShift{0%,100%{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #a855f7,0 0 22px rgba(168,85,247,.65)}50%{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #d4af37,0 0 24px rgba(212,175,55,.6)}}
.frame-rainbow {border:0!important;animation:rbFrame 3s linear infinite}
@keyframes rbFrame{0%{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #ff0000,0 0 18px rgba(255,0,0,.5)}14%{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #ff8800,0 0 18px rgba(255,136,0,.5)}28%{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #ffee00,0 0 18px rgba(255,238,0,.5)}42%{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #00dd00,0 0 18px rgba(0,221,0,.5)}57%{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #0088ff,0 0 18px rgba(0,136,255,.5)}71%{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #aa00ff,0 0 18px rgba(170,0,255,.5)}85%{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #ff0088,0 0 18px rgba(255,0,136,.5)}100%{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #ff0000,0 0 18px rgba(255,0,0,.5)}}
.frame-galaxy  {border:0!important;animation:galaxyPulse 3.5s ease-in-out infinite}
@keyframes galaxyPulse{0%,100%{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #4f46e5,0 0 24px rgba(79,70,229,.5)}33%{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #7c3aed,0 0 32px rgba(124,58,237,.7)}66%{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #2563eb,0 0 26px rgba(37,99,235,.55)}}
.p-av.frame-iron,.p-av.frame-gold,.p-av.frame-champion,.p-av.frame-fire,.p-av.frame-ice,.p-av.frame-neon,.p-av.frame-lightning,.p-av.frame-shadow,.p-av.frame-diamond,.p-av.frame-mythic,.p-av.frame-rainbow,.p-av.frame-galaxy{border:none!important}
.p-av.frame-iron{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #8a8a9a!important}
.p-av.frame-gold{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #d4af37,0 0 26px rgba(212,175,55,.6)!important}
.p-av.frame-champion{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 6px #ffd700,0 0 0 9px var(--bg,#07070f),0 0 0 13px #c8a84b,0 0 30px rgba(212,175,55,.7)!important}
.p-av.frame-fire{animation:fireBig 1.3s ease-in-out infinite}@keyframes fireBig{0%,100%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #ff4500,0 0 22px rgba(255,69,0,.5)}50%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #ff8c00,0 0 36px rgba(255,140,0,.85)}}
.p-av.frame-ice{animation:iceBig 2.4s ease-in-out infinite}@keyframes iceBig{0%,100%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #7dd8f8,0 0 22px rgba(125,216,248,.4)}50%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 9px #c8f0ff,0 0 34px rgba(200,240,255,.65)}}
.p-av.frame-neon{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #00ff88,0 0 26px rgba(0,255,136,.6)!important}
.p-av.frame-lightning{animation:ltBig 1.1s ease-in-out infinite}@keyframes ltBig{0%,100%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #60d8f0,0 0 18px rgba(96,216,240,.4)}50%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 9px #a8f0ff,0 0 36px rgba(168,240,255,.85)}}
.p-av.frame-shadow{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #6b21a8,0 0 30px rgba(107,33,168,.7)!important}
.p-av.frame-diamond{box-shadow:0 0 0 3px var(--bg,#07070f),0 0 0 5px #b8deff,0 0 0 8px var(--bg,#07070f),0 0 0 10px rgba(255,255,255,.6),0 0 0 13px var(--bg,#07070f),0 0 0 16px #b8deff,0 0 28px rgba(184,222,255,.5)!important}
.p-av.frame-mythic{animation:mythicBig 2.8s ease-in-out infinite}@keyframes mythicBig{0%,100%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #a855f7,0 0 28px rgba(168,85,247,.65)}50%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #d4af37,0 0 30px rgba(212,175,55,.6)}}
.p-av.frame-rainbow{animation:rbBig 3s linear infinite}@keyframes rbBig{0%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #ff0000}25%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #00dd00}50%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #0088ff}75%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #aa00ff}100%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #ff0000}}
.p-av.frame-galaxy{animation:galaxyBig 3.5s ease-in-out infinite}@keyframes galaxyBig{0%,100%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #4f46e5,0 0 30px rgba(79,70,229,.5)}50%{box-shadow:0 0 0 4px var(--bg,#07070f),0 0 0 8px #7c3aed,0 0 38px rgba(124,58,237,.7)}}
.shop-frame-card{display:flex;align-items:center;gap:14px;background:var(--s2);border:1px solid var(--border);border-radius:14px;padding:14px 16px;margin-bottom:10px;transition:border-color .2s}
.shop-frame-card:hover{border-color:rgba(212,175,55,.25)}
.shop-frame-preview{width:52px;height:52px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0;background:var(--bg)}
.shop-frame-info{flex:1;min-width:0}.shop-frame-name{font-size:14px;font-weight:600;color:var(--txt)}.shop-frame-desc{font-size:11px;color:var(--txt2);margin-top:2px;line-height:1.4}
.shop-frame-right{display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0}.shop-frame-price{color:var(--gold);font-size:13px;font-weight:700;white-space:nowrap}.shop-frame-owned{font-size:11px;color:var(--txt2);white-space:nowrap}
.inv-frame-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:4px 0}
.inv-frame-cell{display:flex;flex-direction:column;align-items:center;gap:8px;background:var(--s2);border:1px solid var(--border);border-radius:12px;padding:14px 8px 10px;cursor:pointer;transition:all .2s}
.inv-frame-cell:hover{border-color:rgba(212,175,55,.35)}.inv-frame-cell.equipped{border-color:var(--gold);background:var(--gold-d,rgba(212,175,55,.08))}
.inv-frame-cell .ifp{width:54px;height:54px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:26px;background:var(--bg)}
.inv-frame-cell .ifn{font-size:11px;color:var(--txt2);text-align:center}.inv-frame-cell .ife{font-size:10px;font-weight:700;color:var(--gold);background:rgba(212,175,55,.12);border:1px solid rgba(212,175,55,.3);border-radius:8px;padding:3px 8px}
.inv-frame-cell .ifbtn{font-size:11px;font-weight:600;color:var(--txt);background:rgba(255,255,255,.06);border:1px solid var(--border);border-radius:8px;padding:4px 10px;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif}
.inv-frame-cell .ifbtn:hover{background:rgba(212,175,55,.15);border-color:var(--gold);color:var(--gold)}
.menu-hero{background:linear-gradient(135deg,var(--s1),var(--s2));border:1px solid var(--border2,var(--border));border-radius:20px;padding:18px;display:flex;align-items:center;gap:16px;cursor:pointer;transition:all .2s;margin-bottom:6px}
.menu-hero:active{transform:scale(.98)}.menu-hero:hover{border-color:var(--gold);box-shadow:0 0 20px rgba(200,168,75,.12)}
.menu-av{width:72px;height:72px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:40px;background:var(--s3,var(--s2));flex-shrink:0}
.menu-av img{width:100%;height:100%;object-fit:cover;display:block}
.menu-user{flex:1;min-width:0}.menu-name{font-size:18px;font-weight:700;color:var(--txt);line-height:1.2;margin-bottom:3px}
.menu-badges{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:6px}
.menu-note{font-size:12px;color:var(--txt2);line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.menu-xp{font-size:12px;color:var(--gold);font-weight:600;margin-top:4px}.menu-arrow{color:var(--txt2);font-size:20px;flex-shrink:0}
.menu-section-label{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--txt2);margin:18px 0 8px;padding:0 2px}
.menu-inv-btn{display:flex;align-items:center;gap:12px;background:var(--s2);border:1px solid var(--border);border-radius:14px;padding:14px 16px;cursor:pointer;transition:all .2s;width:100%;box-sizing:border-box}
.menu-inv-btn:hover{border-color:var(--gold);background:var(--gold-d,rgba(212,175,55,.08))}
.menu-inv-icon{font-size:22px}.menu-inv-label{font-size:14px;font-weight:600;color:var(--txt);flex:1}.menu-inv-arrow{color:var(--txt2);font-size:18px}
.menu-signout{display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;border-radius:12px;background:var(--red-d,rgba(239,68,68,.1));border:1px solid var(--red,#ef4444);color:var(--red,#ef4444);font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;width:100%;font-family:'DM Sans',sans-serif;margin-top:6px;box-sizing:border-box}
.menu-signout:hover{background:var(--red,#ef4444);color:#fff}
.notebook-wrap{background:var(--s1);border:1px solid var(--border);border-radius:18px;overflow:hidden}
.notebook-header{background:linear-gradient(90deg,var(--gold-d,rgba(212,175,55,.1)),transparent);border-bottom:1px solid var(--border);padding:14px 16px;display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600;color:var(--txt)}
.notebook-lines{background:repeating-linear-gradient(to bottom,var(--s1) 0px,var(--s1) 27px,var(--border) 28px)}
.notebook-ta{width:100%;min-height:200px;padding:14px 16px;background:transparent;border:none;outline:none;resize:none;color:var(--txt);font-family:'DM Sans',sans-serif;font-size:14px;line-height:28px;box-sizing:border-box}
.notebook-ta::placeholder{color:var(--txt2)}
.notebook-footer{padding:10px 16px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
.notebook-save-btn{background:var(--gold-d,rgba(212,175,55,.12));border:1px solid var(--gold);color:var(--gold);border-radius:10px;padding:7px 18px;font-size:13px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s}
.notebook-save-btn:hover{background:var(--gold);color:#07070f}.notebook-char{font-size:11px;color:var(--txt2)}
.ip-bio-card{background:var(--s2);border:1px solid var(--border);border-radius:14px;padding:12px 36px 12px 14px;font-size:14px;color:var(--txt);line-height:1.6;margin:8px 0 4px;cursor:pointer;transition:border-color .2s;min-height:44px;white-space:pre-wrap;word-break:break-word;position:relative;outline:none}
.ip-bio-card[contenteditable="true"]:focus{border-color:var(--gold)}.ip-bio-card::after{content:'✏️';position:absolute;top:10px;right:11px;font-size:12px;opacity:.4}.ip-bio-card:focus::after{display:none}
.ip-bio-label{font-size:10px;color:var(--txt2);text-transform:uppercase;letter-spacing:.8px;margin-top:8px}
.ip-bio-save{display:none;background:var(--gold-d,rgba(212,175,55,.12));border:1px solid var(--gold);color:var(--gold);border-radius:10px;padding:5px 14px;font-size:12px;font-weight:600;cursor:pointer;margin-top:4px;font-family:'DM Sans',sans-serif}.ip-bio-save.vis{display:inline-block}
.ip-friend-bio{background:var(--s2);border:1px solid var(--border);border-radius:14px;padding:12px 14px;font-size:14px;color:var(--txt2);line-height:1.6;margin:6px 0 10px;white-space:pre-wrap;word-break:break-word}
.ip-status{font-size:12px;color:var(--txt2);margin-top:4px;display:flex;align-items:center;gap:5px}
#ip-lang-float{display:none;position:fixed;top:14px;right:14px;z-index:200;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:20px;overflow:hidden}
#ip-lang-float.vis{display:flex}.ip-lb{padding:5px 12px;font-size:11px;font-weight:600;color:rgba(255,255,255,.3);background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s}.ip-lb.active{background:rgba(212,175,55,.2);color:var(--gold,#c8a84b)}
`;document.head.appendChild(s);})();

/* ─── 1. LANGUAGE ────────────────────────────────────────── */
const I18N={
  en:{tagline:'Elite Push-Up Tracker',signin:'Sign In',signup:'Sign Up',
    google:'Continue with Google',or:'or',password:'Password',confirm:'Confirm Password',
    create:'Create Account',forgot:'Forgot password?',terms:'By signing up you agree to our Terms of Service',
    nav_home:'Home',nav_stats:'Stats',nav_log:'LOG',nav_friends:'Friends',nav_menu:'Menu',
    inventory:'Inventory',themes:'Themes',titles:'Titles',inv_frames:'Frames',
    bio_label:'📝 Bio',bio_ph:'Write your bio...',bio_save:'Save',
    w_saved:'💪 Push-Ups Logged!',r_saved:'😴 Rest Day Logged',f_added:'🤝 Friend Added!',
    note_saved:'📝 Bio Saved',nb_saved:'📔 Note Saved'},
  ka:{tagline:'ელიტური აჯიმანიების ტრეკერი',signin:'შესვლა',signup:'რეგისტრაცია',
    google:'Google-ით გაგრძელება',or:'ან',password:'პაროლი',confirm:'გაიმეორე პაროლი',
    create:'ანგარიშის შექმნა',forgot:'დაგავიწყდა პაროლი?',terms:'რეგისტრაციით ეთანხმები მომსახურების პირობებს',
    nav_home:'მთავარი',nav_stats:'სტატ.',nav_log:'ჩაწ.',nav_friends:'მეგ.',nav_menu:'მენიუ',
    inventory:'ინვენტარი',themes:'თემები',titles:'ტიტულები',inv_frames:'ჩარჩოები',
    bio_label:'📝 ბიო',bio_ph:'ბიო...',bio_save:'შენახვა',
    w_saved:'💪 ჩანიშნულია!',r_saved:'😴 დასვენება ჩანიშნულია',f_added:'🤝 მეგობარი დაემატა!',
    note_saved:'📝 ბიო შენახულია',nb_saved:'📔 ნოუთი შენახულია'}
};
const IPLang={
  current:localStorage.getItem('ip_lang')||'en',
  t(k){return(I18N[this.current]||I18N.en)[k]||k},
  set(lang){
    this.current=lang;localStorage.setItem('ip_lang',lang);
    document.documentElement.lang=lang==='ka'?'ka':'en';
    document.querySelectorAll('[data-i18n]').forEach(el=>{const v=(I18N[lang]||I18N.en)[el.dataset.i18n];if(v!==undefined)el.textContent=v});
    document.querySelectorAll('[data-i18n-ph]').forEach(el=>{const k=el.getAttribute('data-i18n-ph');const v=(I18N[lang]||I18N.en)[k];if(v!==undefined)el.placeholder=v});
    document.querySelectorAll('.ip-lb,.auth-lang-btn').forEach(b=>{if(b.dataset.lang)b.classList.toggle('active',b.dataset.lang===lang)});
    ['alb-en','alb-ka'].forEach(id=>{const el=document.getElementById(id);if(el)el.classList.toggle('active',id==='alb-'+lang)});
  },apply(){this.set(this.current)}
};
document.addEventListener('DOMContentLoaded',()=>IPLang.apply());

/* ─── 2. AUTH TABS ───────────────────────────────────────── */
function authTab(t){
  const si=t==='si';
  ['tab-si','tab-su'].forEach((id,i)=>document.getElementById(id)?.classList.toggle('active',i===0?si:!si));
  ['panel-si','panel-su'].forEach((id,i)=>document.getElementById(id)?.classList.toggle('active',i===0?si:!si));
}
function doRegister(){
  const email=document.getElementById('reg-email')?.value?.trim();
  const pass=document.getElementById('reg-pass')?.value;
  const pass2=document.getElementById('reg-pass2')?.value;
  const ka=IPLang.current==='ka';
  if(!email||!pass)return alert(ka?'შეავსე ყველა ველი':'Fill all fields');
  if(pass!==pass2)return alert(ka?'პაროლები არ ემთხვევა':'Passwords do not match');
  firebase.auth().createUserWithEmailAndPassword(email,pass).catch(e=>alert(e.message));
}
window.resetPassword=function(){
  const email=(document.getElementById('auth-email')?.value||document.getElementById('reg-email')?.value||'').trim();
  if(!email)return alert(IPLang.current==='ka'?'ჯერ შეიყვანე ელ-ფოსტა':'Enter your email first');
  firebase.auth().sendPasswordResetEmail(email).then(()=>alert(IPLang.current==='ka'?'გამოგზავნილია!':'Reset email sent!')).catch(e=>alert(e.message));
};

/* ─── 3. FLOATING LANG TOGGLE ────────────────────────────── */
function _ipShowLang(){
  if(document.getElementById('ip-lang-float')){document.getElementById('ip-lang-float').classList.add('vis');return}
  const d=document.createElement('div');d.id='ip-lang-float';
  d.innerHTML=`<button class="ip-lb${IPLang.current==='en'?' active':''}" data-lang="en" onclick="IPLang.set('en')">EN</button><button class="ip-lb${IPLang.current==='ka'?' active':''}" data-lang="ka" onclick="IPLang.set('ka')">ქარ</button>`;
  document.body.appendChild(d);setTimeout(()=>d.classList.add('vis'),50);
}
(function watchAuthForLang(){
  const a=document.getElementById('auth-screen');
  if(!a){document.addEventListener('DOMContentLoaded',watchAuthForLang);return}
  new MutationObserver(()=>{
    if(a.classList.contains('hidden'))_ipShowLang();
    else document.getElementById('ip-lang-float')?.classList.remove('vis');
  }).observe(a,{attributes:true,attributeFilter:['class']});
  if(a.classList.contains('hidden'))_ipShowLang();
})();

/* ─── 4. BLACK PAGES FIX ─────────────────────────────────
   Root cause: auth.onAuthStateChanged(null) removes .active
   from ALL page divs. After login, render() sets innerHTML
   but never re-adds .active → page has content but is hidden.

   Three-part fix:
   A) render() always activates the page after calling original
   B) go() retries render when S.user becomes available
   C) After login, watch for S.user and force-refresh the page
────────────────────────────────────────────────────────── */

// A: render() always activates target page
const _baseRender=window.render;
window.render=function(p){
  // Menu page (not in original render)
  if(p==='menu'){
    _ipShowPage('menu');
    if(typeof S!=='undefined'&&S.user)renderMenu();
    return;
  }
  // Call original (it renders the content, checks S.user itself)
  if(typeof _baseRender==='function')_baseRender.call(this,p);
  // ALWAYS ensure the page is visible after render attempt
  _ipShowPage(p);
};
function _ipShowPage(p){
  const pg=document.getElementById('page-'+p);
  if(!pg)return;
  if(!pg.classList.contains('active')){
    document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
    pg.classList.add('active');
  }
}

// B: go() retries if S.user not ready yet
const _baseGo=window.go;
window.go=function(page){
  if(typeof _baseGo==='function')_baseGo.call(this,page);
  // If user data not loaded yet, retry when ready
  if(typeof S!=='undefined'&&!S.user){
    let n=0;
    const t=setInterval(()=>{
      n++;
      if(S&&S.user){clearInterval(t);if(typeof _baseGo==='function')_baseGo.call(window,page);}
      else if(n>100)clearInterval(t);
    },150);
  }
};

// C: watch auth→hidden, then force-refresh when S.user ready
(function watchLoginRefresh(){
  const a=document.getElementById('auth-screen');
  if(!a){document.addEventListener('DOMContentLoaded',watchLoginRefresh);return}
  let wasVisible=!a.classList.contains('hidden');
  new MutationObserver(()=>{
    const hidden=a.classList.contains('hidden');
    if(hidden&&wasVisible){
      // Just logged in — wait for S.user then refresh current page
      let n=0;
      const t=setInterval(()=>{
        n++;
        if(typeof S!=='undefined'&&S.user){
          clearInterval(t);
          const p=S.curPage||'home';
          if(typeof _baseGo==='function')_baseGo.call(window,p);
        }else if(n>150)clearInterval(t);
      },100);
    }
    wasVisible=!hidden;
  }).observe(a,{attributes:true,attributeFilter:['class']});
})();

/* ─── 5. DATA LEAK FIX ───────────────────────────────────
   When signing into a new account, old S.logs/friends etc.
   would still be visible until Firebase loads new data.
   Fix: reset S before each sync.
────────────────────────────────────────────────────────── */
const _baseSyncFB=window.syncFromFirebase;
window.syncFromFirebase=function(){
  if(typeof S!=='undefined'){
    S.user=null;S.logs={};S.friends={};S.quests=[];
    S.inventory=[];S.equippedTheme=null;S.equippedTitle=null;
    S.equippedFrame=null;S.status='';
    if(S.unlockedAchievements instanceof Set)S.unlockedAchievements=new Set();
  }
  if(typeof _baseSyncFB==='function')_baseSyncFB.call(this);
};

/* ─── 6. MODAL SCROLL FIX ────────────────────────────────── */
(function(){
  const ov=document.getElementById('modal-overlay');
  if(!ov){document.addEventListener('DOMContentLoaded',arguments.callee);return}
  let y=0;
  new MutationObserver(()=>{
    const open=!ov.classList.contains('hidden');
    if(open){y=window.scrollY;document.body.style.cssText+=`;position:fixed;top:-${y}px;width:100%`;const m=ov.querySelector('.modal');if(m)m.scrollTop=0}
    else{document.body.style.position=document.body.style.top=document.body.style.width='';window.scrollTo(0,y)}
  }).observe(ov,{attributes:true,attributeFilter:['class']});
})();

/* ─── 7. TOAST OVERRIDES ─────────────────────────────────── */
const _oSW=window.saveWorkout;
window.saveWorkout=function(){if(typeof _oSW==='function')_oSW.call(this);setTimeout(()=>showToast(IPLang.t('w_saved'),'💪'),80)};
const _oSR=window.saveRest;
window.saveRest=function(ds){if(typeof _oSR==='function')_oSR.call(this,ds);setTimeout(()=>showToast(IPLang.t('r_saved'),'😴'),80)};

/* ─── 8. FRAME HELPERS ───────────────────────────────────── */
function _ipFrameCss(id){return id||''}
function _ipApplyFrames(){
  if(typeof S==='undefined'||!S)return;
  const css=_ipFrameCss(S.equippedFrame||'');
  const all=(typeof SHOP_ITEMS!=='undefined'?SHOP_ITEMS:[]).filter(i=>i.type==='frame').map(i=>i.data);
  document.querySelectorAll('.p-av,.avatar-frame,.menu-av').forEach(el=>{
    all.forEach(c=>{if(c)el.classList.remove(c)});if(css)el.classList.add(css);
  });
}

/* ─── 9. SHOP OVERRIDE ───────────────────────────────────── */
window.renderShop=function(){
  if(typeof SHOP_ITEMS==='undefined')return;
  const themes=SHOP_ITEMS.filter(i=>i.type==='theme');
  const titles=SHOP_ITEMS.filter(i=>i.type==='title');
  const frames=SHOP_ITEMS.filter(i=>i.type==='frame');
  const lang=IPLang.current;
  let html=`<div class="sh">SHOP</div><div class="xp-badge" style="font-size:18px;margin-bottom:20px;">⭐ ${S.user.xp} XP</div>`;
  html+=`<div class="ach-card"><div class="ach-title">${lang==='ka'?'თემები':'Themes'}</div>`;
  themes.forEach(item=>{const owned=S.inventory.includes(item.id),eq=S.equippedTheme===item.id;html+=`<div class="inv-item"><div><div class="inv-item-name">${item.name}${eq?' <span style="color:var(--gold);font-size:11px;">(Active)</span>':''}</div><div style="font-size:11px;color:var(--txt2)">${item.desc}</div></div><div style="display:flex;align-items:center;gap:8px;"><span style="color:var(--gold);font-weight:600;">${item.price} XP</span>${owned?`<button class="btn btn-blue" style="padding:6px 12px;font-size:12px;width:auto;" onclick="equipItem('${item.id}')">${eq?'Unequip':'Equip'}</button>`:`<button class="btn btn-gold" style="padding:6px 12px;font-size:12px;width:auto;" onclick="buyItem('${item.id}')">Buy</button>`}</div></div>`;});html+=`</div>`;
  html+=`<div class="ach-card"><div class="ach-title">${lang==='ka'?'ტიტულები':'Titles'}</div>`;
  titles.forEach(item=>{const owned=S.inventory.includes(item.id),eq=S.equippedTitle===item.id;html+=`<div class="inv-item"><div><div class="inv-item-name">${item.data}${eq?' <span style="color:var(--gold);font-size:11px;">(Active)</span>':''}</div><div style="font-size:11px;color:var(--txt2)">${item.desc}</div></div><div style="display:flex;align-items:center;gap:8px;"><span style="color:var(--gold);font-weight:600;">${item.price} XP</span>${owned?`<button class="btn btn-blue" style="padding:6px 12px;font-size:12px;width:auto;" onclick="equipItem('${item.id}')">${eq?'Unequip':'Equip'}</button>`:`<button class="btn btn-gold" style="padding:6px 12px;font-size:12px;width:auto;" onclick="buyItem('${item.id}')">Buy</button>`}</div></div>`;});html+=`</div>`;
  html+=`<div class="ach-card"><div class="ach-title">${lang==='ka'?'ჩარჩოები':'Frames'}</div>`;
  frames.forEach(item=>{const owned=S.inventory.includes(item.id),eq=S.equippedFrame===item.id;html+=`<div class="shop-frame-card"><div class="shop-frame-preview ${owned?item.data:''}">${item.emoji||'🖼️'}</div><div class="shop-frame-info"><div class="shop-frame-name">${item.name}</div><div class="shop-frame-desc">${item.desc}</div></div><div class="shop-frame-right"><div class="shop-frame-price">⭐ ${item.price} XP</div>${owned?`<div class="shop-frame-owned">${eq?'✓ Equipped':lang==='ka'?'ინვენტარიდან':'Owned · Inventory'}</div>`:`<button class="btn btn-gold" style="padding:6px 14px;font-size:12px;width:auto;" onclick="buyItem('${item.id}')">Buy</button>`}</div></div>`;});html+=`</div>`;
  document.getElementById('page-shop').innerHTML=html;
};

/* ─── 10. INVENTORY FRAMES TAB ───────────────────────────── */
const _oOI=window.openInventory;
window.openInventory=function(){
  if(typeof _oOI==='function')_oOI.call(this);
  setTimeout(()=>{
    document.querySelectorAll('.inv-tab').forEach(tab=>{
      tab.onclick=function(){
        document.querySelectorAll('.inv-tab').forEach(t=>t.classList.remove('active'));
        this.classList.add('active');
        if(this.dataset.tab==='frames')_ipRenderInvFrames();
        else if(typeof renderInventory==='function')renderInventory(this.dataset.tab);
      };
    });
  },60);
};
function _ipRenderInvFrames(){
  const c=document.getElementById('inv-items-container');if(!c)return;
  if(typeof SHOP_ITEMS==='undefined'){c.innerHTML='';return}
  const owned=SHOP_ITEMS.filter(i=>i.type==='frame'&&S.inventory.includes(i.id));
  if(!owned.length){c.innerHTML=`<div style="text-align:center;color:var(--txt2);padding:24px 0;">${IPLang.current==='ka'?'ჩარჩო არ გაქვს. შოპში შეიძინე!':'No frames yet. Buy some in the Shop!'}</div>`;return}
  let html='<div class="inv-frame-grid">';
  owned.forEach(item=>{const eq=S.equippedFrame===item.id;html+=`<div class="inv-frame-cell${eq?' equipped':''}" onclick="_ipEquipFrame('${item.id}')"><div class="ifp ${item.data}">${item.emoji||'🖼️'}</div><div class="ifn">${item.name}</div>${eq?`<div class="ife">✓ Equipped</div>`:`<div class="ifbtn">Equip</div>`}</div>`;});
  html+='</div>';c.innerHTML=html;
}
function _ipEquipFrame(itemId){
  S.equippedFrame=(S.equippedFrame===itemId)?null:itemId;
  saveUserToFirebase();
  const item=(typeof SHOP_ITEMS!=='undefined'?SHOP_ITEMS:[]).find(i=>i.id===itemId);
  showToast(S.equippedFrame?`🖼️ ${item?.name||''} equipped!`:'🖼️ Frame removed','🖼️');
  _ipApplyFrames();_ipRenderInvFrames();
  if(S.curPage==='menu')renderMenu();
}
const _oEI=window.equipItem;
window.equipItem=function(itemId){if(typeof _oEI==='function')_oEI.call(this,itemId);setTimeout(_ipApplyFrames,50)};

/* ─── 11. MENU PAGE ──────────────────────────────────────── */
function renderMenu(){
  const u=S.user;if(!u)return;
  const lang=IPLang.current;
  const frameCss=_ipFrameCss(S.equippedFrame||'');
  const avInner=u.avatarImg?`<img src="${u.avatarImg}">`:`<span style="font-size:38px;display:flex;align-items:center;justify-content:center;width:100%;height:100%">${u.avatar||'👤'}</span>`;
  const titleBadge=(typeof getTitleText==='function'&&u.equippedTitle)?`<span class="title-badge" style="font-size:10px">${getTitleText(u.equippedTitle)}</span>`:'';
  const notePreview=u.quote?(escapeHtml(u.quote).substring(0,80)+(u.quote.length>80?'…':'')):(lang==='ka'?'ბიო არ დამატებია...':'No bio yet...');
  document.getElementById('page-menu').innerHTML=`
    <div class="sh">${lang==='ka'?'მენიუ':'MENU'}</div>
    <div class="menu-section-label">${lang==='ka'?'პროფილი':'PROFILE'}</div>
    <div class="menu-hero" onclick="go('prof')">
      <div class="menu-av ${frameCss}">${avInner}</div>
      <div class="menu-user">
        <div class="menu-name">${escapeHtml(u.name.toUpperCase())}</div>
        <div class="menu-badges">${titleBadge}${frameCss?`<span style="font-size:10px;background:rgba(212,175,55,.12);color:var(--gold);padding:2px 8px;border-radius:8px;font-weight:600">🖼️ Frame</span>`:''}${u.role==='admin'?'<span class="admin-badge" style="font-size:10px">ADMIN</span>':''}</div>
        <div class="menu-note">${notePreview}</div>
        <div class="menu-xp">⭐ ${u.xp||0} XP</div>
      </div>
      <div class="menu-arrow">›</div>
    </div>
    <div class="menu-section-label">${lang==='ka'?'ინვენტარი':'INVENTORY'}</div>
    <div class="menu-inv-btn" onclick="openInventory()">
      <div class="menu-inv-icon">🎒</div>
      <div class="menu-inv-label">${lang==='ka'?'ჩემი ინვენტარი':'My Inventory'}</div>
      <div class="menu-inv-arrow">›</div>
    </div>
    <div class="menu-section-label">${lang==='ka'?'ჩემი ნოუთი':'MY NOTEBOOK'}</div>
    <div class="notebook-wrap">
      <div class="notebook-header">📔 ${lang==='ka'?'ჩანიშვნები':'Notes'}</div>
      <div class="notebook-lines">
        <textarea class="notebook-ta" id="nb-ta" maxlength="2000"
          placeholder="${lang==='ka'?'დაიწყე წერა...':'Start writing...'}"
          oninput="document.getElementById('nb-char').textContent=this.value.length+'/2000'"
        >${escapeHtml(u.journal||'')}</textarea>
      </div>
      <div class="notebook-footer">
        <span class="notebook-char" id="nb-char">${(u.journal||'').length}/2000</span>
        <button class="notebook-save-btn" onclick="IPSaveJournal()">${lang==='ka'?'შენახვა':'Save'}</button>
      </div>
    </div>
    <div style="margin-top:20px;">
      <button class="menu-signout" onclick="signOut()">🚪 ${lang==='ka'?'გასვლა':'Sign Out'}</button>
    </div>
    <div style="height:10px"></div>
  `;
  setTimeout(_ipApplyFrames,50);
}
function IPSaveJournal(){
  const ta=document.getElementById('nb-ta');
  if(!ta||!S.user||!S.uid)return;
  S.user.journal=ta.value;
  db.ref('users/'+S.uid+'/journal').set(S.user.journal);
  showToast(IPLang.t('nb_saved'),'📔');
}

/* ─── 12. renderProf OVERRIDE (frame + bio editable) ─────── */
window.renderProf=function(){
  const u=S.user;if(!u)return;
  S.editMode=S.editMode||false;
  const lang=IPLang.current;
  const frameCss=_ipFrameCss(S.equippedFrame||'');
  const avInner=u.avatarImg?`<img src="${u.avatarImg}">`:`<span style="font-size:46px;display:flex;align-items:center;justify-content:center;width:100%;height:100%">${u.avatar||'👤'}</span>`;
  let adminHTML='';
  if(u.role==='admin'){adminHTML=`<div class="admin-panel"><div class="card-title">🔧 Admin Panel</div><div class="fg"><input class="fi" id="admin-uid-input" placeholder="Enter user UID to edit"></div><button class="btn btn-gold" onclick="adminLoadUser()" style="margin-bottom:12px;">Load User</button><div id="admin-user-edit" style="display:none;"><div class="fg"><label class="fl">Name</label><input class="fi" id="admin-e-name" maxlength="20"></div><div class="fg"><label class="fl">Age</label><input class="fi" id="admin-e-age" type="number" min="10" max="99"></div><div class="fg"><label class="fl">Goal Days</label><input class="fi" id="admin-e-days" type="number" min="7" max="365"></div><div class="fg"><label class="fl">Daily Target</label><input class="fi" id="admin-e-target" type="number" min="10"></div><div class="fg"><label class="fl">Note</label><input class="fi" id="admin-e-quote" maxlength="200"></div><button class="btn btn-gold" onclick="adminSaveUser()">Save User</button><button class="btn btn-dark" onclick="adminClear()">Cancel</button></div></div>`}
  document.getElementById('page-prof').innerHTML=`
    <div style="position:relative;"><div class="sh">PROFILE</div><button class="prof-shop-btn" onclick="go('shop')">🛒 Shop <span style="font-size:12px;">⭐ ${u.xp||0}</span></button></div>
    <div class="prof-top">
      <div class="p-av ${frameCss}" onclick="document.getElementById('avatar-upload').click()">${avInner}<div class="p-av-ovr">CHANGE</div></div>
      <div id="profile-view" style="${S.editMode?'display:none':''}">
        <div class="p-name">${escapeHtml(u.name.toUpperCase())}${(typeof getTitleText==='function'&&u.equippedTitle)?` <span class="title-badge">${getTitleText(u.equippedTitle)}</span>`:''}${u.role==='admin'?' <span class="admin-badge">ADMIN</span>':''}</div>
        ${u.status?`<div class="ip-status">💬 ${escapeHtml(u.status)}</div>`:''}
        <div class="ip-bio-label">${IPLang.t('bio_label')}</div>
        <div id="ip-note" class="ip-bio-card" contenteditable="true"
          onfocus="document.getElementById('ip-note-save').classList.add('vis')"
          onblur="IPSaveNote()"
          onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();this.blur()}"
        >${escapeHtml(u.quote||'')}</div>
        <button class="ip-bio-save" id="ip-note-save" onclick="IPSaveNote()">${IPLang.t('bio_save')}</button>
        <div class="p-age">Age ${u.age} · ${u.goalDays}-day challenge</div>
        <div class="xp-badge" style="margin-top:10px;">⭐ ${u.xp||0} XP</div>
        <div style="margin-top:14px;"><span style="font-size:11px;color:var(--txt2);background:var(--s2);padding:4px 12px;border-radius:12px;">UID: ${S.uid}</span><button onclick="copyUID()" style="background:var(--gold-d);border:1px solid var(--gold);color:var(--gold);border-radius:8px;padding:4px 10px;font-size:12px;cursor:pointer;margin-left:4px;">📋 Copy</button></div>
        <button class="btn btn-gold" style="margin-top:20px;" onclick="toggleEdit(true)">✏️ Edit Profile</button>
        ${adminHTML}
      </div>
      <div id="profile-edit" style="${S.editMode?'':'display:none'}">
        <div class="card"><div class="card-title">Edit Profile</div>
          <div class="fg"><label class="fl">Name</label><input class="fi" id="e-name" value="${escapeHtml(u.name||'')}" maxlength="20"></div>
          <div class="fg"><label class="fl">Age</label><input class="fi" id="e-age" type="number" value="${u.age||''}" min="10" max="99"></div>
          <div class="fg"><label class="fl">Goal Days</label><input class="fi" id="e-days" type="number" value="${u.goalDays||30}" min="7" max="365"></div>
          <div class="fg"><label class="fl">Daily Target</label><input class="fi" id="e-target" type="number" value="${u.target||100}" min="10"></div>
          <div class="fg"><label class="fl">${lang==='ka'?'ბიო':'Bio'}</label><textarea class="fi" id="e-quote" maxlength="200" style="min-height:72px;resize:none;line-height:1.5">${escapeHtml(u.quote||'')}</textarea></div>
          <div class="fg"><label class="fl">${lang==='ka'?'სტატუსი':'Status'}</label><input class="fi" id="e-status" value="${escapeHtml(u.status||'')}" maxlength="60" placeholder="${lang==='ka'?'სამოტივაციო...':'Motivational...'}"></div>
          <div class="fg"><label class="fl">Avatar</label><div class="av-grid" id="edit-av-grid"></div></div>
          <div style="display:flex;gap:10px;"><button class="btn btn-gold" id="save-btn" onclick="saveProf()">Save</button><button class="btn btn-dark" onclick="toggleEdit(false)">Cancel</button></div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <button class="btn btn-red" onclick="signOut()">🚪 Sign Out</button>
    <div style="height:10px"></div>
  `;
  if(S.editMode&&typeof initAvGrid==='function'){initAvGrid('edit-av-grid',u.avatar,'selEditAv');S.editAv=null}
};
function IPSaveNote(){
  const el=document.getElementById('ip-note'),btn=document.getElementById('ip-note-save');
  if(!el||!S.user)return;
  const val=el.innerText.trim();
  if(val===(S.user.quote||'').trim()){btn?.classList.remove('vis');return}
  S.user.quote=val;saveUserToFirebase();showToast(IPLang.t('note_saved'),'📝');btn?.classList.remove('vis');
}

/* ─── 13. showFriendView OVERRIDE ───────────────────────── */
window.showFriendView=function(uid,f){
  const logs=f.logs||{};
  const _fmt=d=>d.toISOString().split('T')[0],_today=()=>_fmt(new Date());
  const w=Object.entries(logs).filter(([,v])=>v.type==='workout');
  const r=Object.entries(logs).filter(([,v])=>v.type==='rest');
  const total=w.reduce((s,[,v])=>s+(v.total||0),0);
  const best=w.length?Math.max(...w.map(([,v])=>v.total||0)):0;
  const avg=w.length?Math.round(total/w.length):0;
  const stk=(()=>{let n=0,d=new Date();while(true){const k=_fmt(d),e=logs[k];if(!e||e.type!=='workout'){if(k===_today()&&!e){d.setDate(d.getDate()-1);continue}break}n++;d.setDate(d.getDate()-1)}return n})();
  const p=f.goalDays?Math.min(100,Math.round(w.length/f.goalDays*100)):0;
  const todayLog=logs[_today()],todayReps=todayLog?.type==='workout'?todayLog.total:0;
  const frameCss=_ipFrameCss(f.equippedFrame||'');
  const avInner=f.avatarImg?`<img src="${f.avatarImg}" style="width:100%;height:100%;object-fit:cover;display:block;">`:`<span style="font-size:56px;display:flex;align-items:center;justify-content:center;width:100%;height:100%">${f.avatar||'👤'}</span>`;
  const titleText=(typeof getTitleText==='function'&&f.equippedTitle)?getTitleText(f.equippedTitle):'';
  document.getElementById('friend-view').innerHTML=`
    <div class="friend-view-header">
      <button class="btn btn-dark" style="width:auto;padding:8px 16px;font-size:14px" onclick="closeFriendView()">← Back</button>
      <div style="flex:1;text-align:right"><button class="btn btn-dark" style="width:auto;padding:8px 16px;font-size:14px" onclick="removeFriend('${uid}');closeFriendView()">Remove</button></div>
    </div>
    <div class="prof-top" style="padding-top:8px;">
      <div class="p-av ${frameCss}" style="width:88px;height:88px;cursor:default;border:none;">${avInner}</div>
      <div class="p-name">${escapeHtml(f.name.toUpperCase())}${titleText?` <span class="title-badge">${titleText}</span>`:''}${f.role==='admin'?' <span class="admin-badge">ADMIN</span>':''}</div>
      ${f.quote?`<div class="ip-friend-bio">${escapeHtml(f.quote)}</div>`:''}
      ${f.status?`<div class="ip-status">💬 ${escapeHtml(f.status)}</div>`:''}
      <div class="p-age" style="margin-top:6px;">Age ${f.age} · ${f.goalDays}-day challenge</div>
      <div class="xp-badge" style="margin-top:8px;">⭐ ${f.xp||0} XP</div>
    </div>
    <div class="today-hero"><div class="today-hero-n">${todayReps}</div><div class="today-hero-l">Today's Push-Ups</div></div>
    <div class="hero"><div class="hero-n">${total.toLocaleString()}</div><div class="hero-l">Total Push-Ups</div></div>
    <div class="sg">
      <div class="sgc"><div class="sgc-v">${w.length}</div><div class="sgc-l">Workouts</div></div>
      <div class="sgc"><div class="sgc-v">${r.length}</div><div class="sgc-l">Rest Days</div></div>
      <div class="sgc"><div class="sgc-v">${stk}</div><div class="sgc-l">🔥 Streak</div></div>
      <div class="sgc"><div class="sgc-v">${best}</div><div class="sgc-l">Best Day</div></div>
      <div class="sgc"><div class="sgc-v">${avg}</div><div class="sgc-l">Daily Avg</div></div>
      <div class="sgc"><div class="sgc-v">${p}%</div><div class="sgc-l">Complete</div></div>
    </div><div style="height:20px"></div>
  `;
  document.getElementById('friend-view').classList.remove('hidden');
};

document.addEventListener('DOMContentLoaded',()=>setTimeout(_ipApplyFrames,800));
console.log('✅ IronPush patch — black pages fix(3-layer), data leak fix, menu, notebook');
