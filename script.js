/* ═══════════════════════════════════════════════════════════
   IronPush — Elite Pull-Up Tracker
   Full application logic
   ═══════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════
// I18N
// ═══════════════════════════════════════════════════════════
let LANGSEL = localStorage.getItem('ip_lang') || 'en';

const I18N = {
  en: {
    tagline: 'Elite Pull-Up Tracker', google: 'Sign in with Google', or: 'or',
    email: 'Email', password: 'Password', signin: 'Sign In', register: 'Register',
    forgot: 'Forgot password?',
    ob_h1: 'WHO ARE YOU?', ob_s1: 'Set up your profile.',
    name: 'Your Name', name_ph: 'e.g. Alex', age: 'Age', age_ph: 'e.g. 25',
    continue: 'Continue →', back: '← Back',
    ob_h2: 'YOUR CHALLENGE', ob_s2: 'Set your challenge and daily target.',
    duration: 'Duration (days)', daily_target: 'Daily Target',
    motivation: 'Motivational Quote', quote_ph: 'Pain is temporary...',
    ob_h3: 'PICK YOUR AVATAR', ob_s3: 'Choose an emoji avatar.',
    start_challenge: '🚀 Start Challenge',
    nav_home: 'Home', nav_stats: 'Stats', nav_log: 'LOG', nav_friends: 'Friends', nav_more: 'More',
    good_morning: 'Good morning', good_afternoon: 'Good afternoon', good_evening: 'Good evening',
    complete: 'Complete', days_done: '{n} of {total} days done',
    trained: 'Trained', left: 'Left', streak: 'Streak',
    today_label: 'TODAY', log_workout: '🏋️ Log Today\'s Workout',
    mark_rest: '💤 Mark as Rest Day', edit_log: '✏️ Edit Today\'s Log',
    your_motivation: 'Your Motivation',
    completed_at: '✓ Completed at {time} — {reps} pull-ups',
    rest_day_at: '💤 Rest Day at {time}', not_logged_yet: '⏳ Not logged yet',
    calendar: 'Calendar', completed: 'Completed', rest: 'Rest', missed: 'Missed',
    today: 'Today', log_today: 'Log Today', log_other_day: 'Log Other Day',
    statistics: 'STATISTICS', stats_sub: 'Full performance breakdown',
    today_pushups: "Today's Pull-Ups", total_pushups: 'Total Pull-Ups',
    workouts: 'Workouts', rest_days: 'Rest Days', best_day: 'Best Day',
    daily_avg: 'Daily Avg', target_hit: 'Target Hit', last_7_days: 'Last 7 Days',
    challenge_progress: 'Challenge Progress', days_completed: 'Days Completed',
    daily_quests: 'Daily Quests', achievements: 'Achievements',
    profile: 'PROFILE', edit_profile: '✏️ Edit Profile', inventory: '🎒 Inventory',
    sign_out: '🚪 Sign Out', save: 'Save', cancel: 'Cancel', save_changes: 'Save Changes',
    friends_title: 'FRIENDS', friends_sub: 'Your pull-up crew',
    add_friend_uid: 'Add Friend by UID', friend_uid_ph: "Friend's User ID",
    add_friend: '+ Add Friend', no_friends: 'No friends yet. Add someone!',
    friend_today: 'Today: {reps} pull-ups', friend_rest: 'Rest day',
    friend_not_logged: 'Not logged today', remove: 'Remove',
    shop_title: 'SHOP', themes: 'Themes', titles: 'Titles', frames: 'Frames',
    buy: 'Buy', equip: 'Equip', unequip: 'Unequip', active: 'Active', owned: 'Owned',
    menu_title: 'MENU', my_inventory: 'My Inventory', my_notebook: 'MY NOTEBOOK',
    notes: 'Notes', notes_ph: 'Start writing...',
    instructions: 'How to Use', language: 'Language',
    log_a_date: 'LOG A DATE', choose_date: 'Choose any past date to log.',
    log_workout_title: 'LOG WORKOUT', tap_to_check: 'Tap ✓ to check off each set',
    reps: 'Reps', add_set: '+ Add Set', total_label: 'Total: {n} pull-ups',
    save_workout: '💾 Save Workout', remove_log: '🗑 Remove Log',
    logged_at: '🕒 Logged at {time}',
    check_at_least_one: 'Check at least one set to save.',
    toast_logged: '💪 Workout Logged!', toast_rest: '😴 Rest Day Logged',
    toast_note: '📝 Bio Saved', toast_journal: '📔 Note Saved',
    toast_friend_added: '🤝 Friend Added!', toast_target: '🎯 Daily Target Reached!',
    toast_quest: '✅ Quest Complete', toast_achievement: '🏆 Achievement Unlocked',
    day: 'day', days: 'days',
    inventory_title: '🎒 Inventory',
    instructions_title: '📖 How to Use IronPush',
    save_btn: 'Save', cancel_btn: 'Cancel'
  },
  ka: {
    tagline: 'ელიტური აჯიმანიების ტრეკერი', google: 'Google-ით შესვლა', or: 'ან',
    email: 'ელ-ფოსტა', password: 'პაროლი', signin: 'შესვლა', register: 'რეგისტრაცია',
    forgot: 'დაგავიწყდა პაროლი?',
    ob_h1: 'ვინ ხარ?', ob_s1: 'შექმენი შენი პროფილი.',
    name: 'შენი სახელი', name_ph: 'მაგ. ალექსი', age: 'ასაკი', age_ph: 'მაგ. 25',
    continue: 'გაგრძელება →', back: '← უკან',
    ob_h2: 'შენი გამოწვევა', ob_s2: 'აირჩიე გამოწვევა და დღიური მიზანი.',
    duration: 'ხანგრძლივობა (დღე)', daily_target: 'დღიური მიზანი',
    motivation: 'სამოტივაციო ციტატა', quote_ph: 'ტკივილი დროებითია...',
    ob_h3: 'აირჩიე ავატარი', ob_s3: 'აირჩიე emoji ავატარი.',
    start_challenge: '🚀 დაიწყე გამოწვევა',
    nav_home: 'მთავარი', nav_stats: 'სტატისტიკა', nav_log: 'ჩაწერა',
    nav_friends: 'მეგობრები', nav_more: 'მეტი',
    good_morning: 'დილა მშვიდობისა', good_afternoon: 'შუადღე მშვიდობისა',
    good_evening: 'საღამო მშვიდობისა',
    complete: 'შესრულებული', days_done: '{n} / {total} დღე დასრულებული',
    trained: 'ვარჯიში', left: 'დარჩა', streak: 'სერია',
    today_label: 'დღეს', log_workout: '🏋️ დღევანდელი ვარჯიშის ჩაწერა',
    mark_rest: '💤 დასვენების დღედ მონიშვნა', edit_log: '✏️ დღევანდელი ჩანაწერის რედაქტირება',
    your_motivation: 'შენი მოტივაცია',
    completed_at: '✓ დასრულდა {time}-ზე — {reps} აჯიმანია',
    rest_day_at: '💤 დასვენების დღე {time}-ზე', not_logged_yet: '⏳ ჯერ არ არის ჩაწერილი',
    calendar: 'კალენდარი', completed: 'დასრულებული', rest: 'დასვენება',
    missed: 'გამოტოვებული', today: 'დღეს', log_today: 'დღეს ჩაწერა',
    log_other_day: 'სხვა დღის ჩაწერა',
    statistics: 'სტატისტიკა', stats_sub: 'სრული შედეგების ანალიზი',
    today_pushups: 'დღევანდელი აჯიმანიები', total_pushups: 'სულ აჯიმანიები',
    workouts: 'ვარჯიშები', rest_days: 'დასვენების დღეები', best_day: 'საუკეთესო დღე',
    daily_avg: 'დღიური საშუალო', target_hit: 'მიზანი მიღწეული', last_7_days: 'ბოლო 7 დღე',
    challenge_progress: 'გამოწვევის პროგრესი', days_completed: 'დასრულებული დღეები',
    daily_quests: 'დღიური ქვესთები', achievements: 'მიღწევები',
    profile: 'პროფილი', edit_profile: '✏️ პროფილის რედაქტირება',
    inventory: '🎒 ინვენტარი', sign_out: '🚪 გასვლა',
    save: 'შენახვა', cancel: 'გაუქმება', save_changes: 'ცვლილებების შენახვა',
    friends_title: 'მეგობრები', friends_sub: 'შენი აჯიმანიების გუნდი',
    add_friend_uid: 'მეგობრის დამატება UID-ით', friend_uid_ph: 'მეგობრის User ID',
    add_friend: '+ მეგობრის დამატება', no_friends: 'მეგობრები ჯერ არ გყავს. დაამატე ვინმე!',
    friend_today: 'დღეს: {reps} აჯიმანია', friend_rest: 'დასვენების დღე',
    friend_not_logged: 'დღეს არ არის ჩაწერილი', remove: 'წაშლა',
    shop_title: 'მაღაზია', themes: 'თემები', titles: 'ტიტულები', frames: 'ჩარჩოები',
    buy: 'ყიდვა', equip: 'აღჭურვა', unequip: 'მოხსნა', active: 'აქტიური', owned: 'შეძენილი',
    menu_title: 'მენიუ', my_inventory: 'ჩემი ინვენტარი', my_notebook: 'ჩემი ნოუთბუქი',
    notes: 'შენიშვნები', notes_ph: 'დაიწყე წერა...',
    instructions: 'როგორ გამოვიყენო', language: 'ენა',
    log_a_date: 'თარიღის ჩაწერა', choose_date: 'აირჩიე ნებისმიერი წარსული თარიღი.',
    log_workout_title: 'ვარჯიშის ჩაწერა', tap_to_check: 'დააჭირე ✓ თითოეული სეტისთვის',
    reps: 'გამეორება', add_set: '+ სეტის დამატება', total_label: 'სულ: {n} აჯიმანია',
    save_workout: '💾 ვარჯიშის შენახვა', remove_log: '🗑 ჩანაწერის წაშლა',
    logged_at: '🕒 ჩაწერილია {time}-ზე',
    check_at_least_one: 'მონიშნე მინიმუმ ერთი სეტი.',
    toast_logged: '💪 ვარჯიში ჩაწერილია!', toast_rest: '😴 დასვენება ჩაწერილია',
    toast_note: '📝 ბიო შენახულია', toast_journal: '📔 ნოუთი შენახულია',
    toast_friend_added: '🤝 მეგობარი დაემატა!', toast_target: '🎯 დღიური მიზანი მიღწეულია!',
    toast_quest: '✅ ქვესთი შესრულდა', toast_achievement: '🏆 მიღწევა გახსნილია',
    day: 'დღე', days: 'დღე',
    inventory_title: '🎒 ინვენტარი',
    instructions_title: '📖 როგორ გამოვიყენო IronPush',
    save_btn: 'შენახვა', cancel_btn: 'გაუქმება'
  }
};

function t(key, vars) {
  let str = (I18N[LANGSEL] || I18N.en)[key] || I18N.en[key] || key;
  if (vars) {
    Object.keys(vars).forEach(k => { str = str.replace(new RegExp('{' + k + '}', 'g'), vars[k]); });
  }
  return str;
}

function setLang(lang) {
  LANGSEL = lang;
  localStorage.setItem('ip_lang', lang);
  document.documentElement.lang = lang;
  updateStaticText();
  if (typeof S !== 'undefined' && S.user && S.curPage) render(S.curPage);
  if (typeof S !== 'undefined' && S.user) applyEquippedTheme();
}

function updateStaticText() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (val) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    const val = t(key);
    if (val) el.placeholder = val;
  });
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-lang') === LANGSEL);
  });
}

window.t = t;
window.setLang = setLang;

// ═══════════════════════════════════════════════════════════
// FIREBASE
// ═══════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════
const AVATARS = ['💪','🦾','🏋️','⚡','🔥','🎯','🏆','👊','🦁','🐺','🦅','🐉','⚔️','🛡️','🥇'];

const MONTHS = {
  en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  ka: ['იანვარი','თებერვალი','მარტი','აპრილი','მაისი','ივნისი','ივლისი','აგვისტო','სექტემბერი','ოქტომბერი','ნოემბერი','დეკემბერი']
};
const DAYS_SHORT = {
  en: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
  ka: ['კვი','ორშ','სამ','ოთხ','ხუთ','პარ','შაბ']
};

const SHOP_ITEMS = [
  // Themes
  { id:'theme-ocean',  name:'Ocean Breeze', nameKa:'ოკეანის სიო', desc:'Cool blue tones', descKa:'გრილი ლურჯი ტონები', price:200, type:'theme', data:{'--bg':'#0b1a2a','--bg2':'#0e2540','--gold':'#4a9eff','--gold2':'#6cb4ff','--border':'#1e3a5f','--s1':'#0f2d4a','--s2':'#143556','--gold-d':'rgba(74,158,255,.14)'} },
  { id:'theme-sunset', name:'Sunset Glow', nameKa:'მზის ჩასვლა', desc:'Warm orange/pink', descKa:'თბილი ნარინჯისფერი/ვარდისფერი', price:250, type:'theme', data:{'--bg':'#1a0e0b','--bg2':'#2d140f','--gold':'#ff8c42','--gold2':'#ffaa5e','--border':'#5f2a1e','--s1':'#2d1a12','--s2':'#3f2218','--gold-d':'rgba(255,140,66,.14)'} },
  { id:'theme-forest', name:'Deep Forest', nameKa:'ღრმა ტყე', desc:'Natural greens', descKa:'ბუნებრივი მწვანეები', price:200, type:'theme', data:{'--bg':'#0d1e0d','--bg2':'#142814','--gold':'#4caf50','--gold2':'#81c784','--border':'#1e4a1e','--s1':'#1a331a','--s2':'#224422','--gold-d':'rgba(76,175,80,.14)'} },
  { id:'theme-neon',   name:'Neon Nights', nameKa:'ნეონის ღამეები', desc:'Cyberpunk glow', descKa:'კიბერპანკური ბზინვარება', price:400, type:'theme', data:{'--bg':'#0f0f1a','--bg2':'#1a1a2e','--gold':'#ff007f','--gold2':'#ff6ec7','--border':'#7a0035','--s1':'#1a1a2e','--s2':'#2a2a4e','--gold-d':'rgba(255,0,127,.14)'} },
  { id:'theme-royal',  name:'Royal Purple', nameKa:'სამეფო იასამნისფერი', desc:'Luxury purple & gold', descKa:'მდიდრული იასამნისფერი და ოქრო', price:350, type:'theme', data:{'--bg':'#1a0e1a','--bg2':'#2d142d','--gold':'#d4af37','--gold2':'#e5c158','--border':'#5f1e5f','--s1':'#2d142d','--s2':'#3f1e3f','--gold-d':'rgba(212,175,55,.14)'} },
  { id:'theme-mystic', name:'Mystic Void', nameKa:'მისტიკური სიცარიელე', desc:'Another dimension', descKa:'სხვა განზომილება', price:600, type:'theme', data:{'--bg':'#0a0a1a','--bg2':'#12122a','--gold':'#9b59b6','--gold2':'#c39bd3','--border':'#3d1a6e','--s1':'#16162e','--s2':'#1e1e3e','--gold-d':'rgba(155,89,182,.14)'} },
  // Titles
  { id:'title-iron',   name:'Iron Warrior',  nameKa:'რკინის მეომარი',   desc:'Title: Iron Warrior',  descKa:'ტიტული: რკინის მეომარი',   price:100, type:'title', data:'🦾 Iron Warrior',  dataKa:'🦾 რკინის მეომარი' },
  { id:'title-beast',  name:'Beast Mode',    nameKa:'მხეცის რეჟიმი',    desc:'Title: Beast Mode',    descKa:'ტიტული: მხეცის რეჟიმი',    price:150, type:'title', data:'🔥 Beast Mode',   dataKa:'🔥 მხეცის რეჟიმი' },
  { id:'title-legend', name:'Living Legend', nameKa:'ცოცხალი ლეგენდა',  desc:'Title: Living Legend', descKa:'ტიტული: ცოცხალი ლეგენდა',  price:250, type:'title', data:'👑 Living Legend', dataKa:'👑 ცოცხალი ლეგენდა' },
  { id:'title-mythic', name:'Mythic Puller', nameKa:'მითიური ამწევი',   desc:'Title: Mythic Puller', descKa:'ტიტული: მითიური ამწევი',   price:500, type:'title', data:'⚡ Mythic Puller', dataKa:'⚡ მითიური ამწევი' },
  // Frames
  { id:'frame-iron',      name:'Iron Frame',      nameKa:'რკინის ჩარჩო',      desc:'Steel border',           descKa:'ფოლადის ჩარჩო',          price:150, type:'frame', data:'frame-iron',      emoji:'⚙️' },
  { id:'frame-gold',      name:'Gold Frame',      nameKa:'ოქროს ჩარჩო',       desc:'Shiny gold border',      descKa:'მბრწყინავი ოქროს ჩარჩო',  price:300, type:'frame', data:'frame-gold',      emoji:'🥇' },
  { id:'frame-neon',      name:'Neon Frame',      nameKa:'ნეონის ჩარჩო',      desc:'Glowing neon',           descKa:'ბრწყინავი ნეონი',        price:400, type:'frame', data:'frame-neon',      emoji:'💚' },
  { id:'frame-lightning', name:'Lightning Frame', nameKa:'ელვის ჩარჩო',       desc:'Electric effect',        descKa:'ელექტრული ეფექტი',       price:500, type:'frame', data:'frame-lightning', emoji:'⚡' },
  { id:'frame-fire',      name:'Fire Frame',      nameKa:'ცეცხლის ჩარჩო',     desc:'Burning glow',           descKa:'ცეცხლოვანი ბზინვარება',   price:600, type:'frame', data:'frame-fire',      emoji:'🔥' },
  { id:'frame-ice',       name:'Ice Frame',       nameKa:'ყინულის ჩარჩო',     desc:'Frost shimmer',          descKa:'ყინულოვანი ბზინვარება',   price:600, type:'frame', data:'frame-ice',       emoji:'❄️' },
  { id:'frame-champion',  name:'Champion Frame',  nameKa:'ჩემპიონის ჩარჩო',   desc:'Victory tier',           descKa:'გამარჯვებულის დონე',      price:800, type:'frame', data:'frame-champion',  emoji:'🏆' },
  { id:'frame-shadow',    name:'Shadow Frame',    nameKa:'ჩრდილის ჩარჩო',     desc:'Dark aura',              descKa:'მუქი აურა',              price:700, type:'frame', data:'frame-shadow',    emoji:'🌑' },
  { id:'frame-diamond',   name:'Diamond Frame',   nameKa:'ალმასის ჩარჩო',     desc:'Crystal edge',           descKa:'კრისტალური კიდე',         price:1000, type:'frame', data:'frame-diamond',  emoji:'💎' },
  { id:'frame-mythic',    name:'Mythic Frame',    nameKa:'მითიური ჩარჩო',     desc:'Legendary aura',         descKa:'ლეგენდარული აურა',       price:1200, type:'frame', data:'frame-mythic',    emoji:'🔮' },
  { id:'frame-rainbow',   name:'Rainbow Frame',   nameKa:'ცისარტყელას ჩარჩო', desc:'Animated colors',        descKa:'ანიმაციური ფერები',      price:1500, type:'frame', data:'frame-rainbow',   emoji:'🌈' },
  { id:'frame-galaxy',    name:'Galaxy Frame',    nameKa:'გალაქტიკის ჩარჩო',  desc:'Cosmic pulse',           descKa:'კოსმიური პულსი',         price:2000, type:'frame', data:'frame-galaxy',    emoji:'🌌' }
];

// ═══════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════
let S = {
  uid: null, user: null, logs: {}, cal: {y:0,m:0}, curPage: 'home',
  tmpUser: {}, selAv: AVATARS[0], editAv: null,
  modalSets: [], logDate: null, friends: {}, quests: [],
  editMode: false, adminTargetUser: null,
  inventory: [], equippedTheme: null, equippedTitle: null, equippedFrame: null,
  unlockedAchievements: new Set(), targetToastedFor: ''
};

// ═══════════════════════════════════════════════════════════
// FIREBASE REFS
// ═══════════════════════════════════════════════════════════
function userRef(){ return db.ref('users/' + S.uid); }
function logsRef(){ return db.ref('users/' + S.uid + '/logs'); }
function friendsRef(){ return db.ref('users/' + S.uid + '/friends'); }
function questsRef(){ return db.ref('users/' + S.uid + '/quests'); }

function syncFromFirebase(){
  if (!S.uid) return;
  userRef().once('value', snap => {
    const val = snap.val();
    if (val) {
      S.user = val;
      S.logs = val.logs || {};
      S.friends = val.friends || {};
      S.user.xp = S.user.xp || 0;
      S.inventory = val.inventory || [];
      S.equippedTheme = val.equippedTheme || null;
      S.equippedTitle = val.equippedTitle || null;
      S.equippedFrame = val.equippedFrame || null;
      S.unlockedAchievements = new Set(val.unlockedAchievements || []);
      applyEquippedTheme();
      // Populate achievement set silently on first load (no toasts)
      let changed = false;
      getAchievements().forEach(a => {
        if (a.unlocked && !S.unlockedAchievements.has(a.id)) {
          S.unlockedAchievements.add(a.id);
          changed = true;
        }
      });
      if (changed) saveUserToFirebase();
      questsRef().once('value', qSnap => {
        S.quests = qSnap.val() || [];
        updateQuests();
        render(S.curPage);
        document.getElementById('ob').classList.add('hidden');
      });
    } else {
      document.getElementById('ob').classList.remove('hidden');
      updateStaticText();
    }
  });
}

function saveUserToFirebase(){
  if (!S.uid || !S.user) return;
  userRef().set({
    name: S.user.name,
    age: S.user.age,
    goalDays: S.user.goalDays,
    target: S.user.target,
    quote: S.user.quote,
    avatar: S.user.avatar,
    avatarImg: S.user.avatarImg || null,
    startDate: S.user.startDate,
    xp: S.user.xp || 0,
    role: S.user.role || null,
    inventory: S.inventory,
    equippedTheme: S.equippedTheme,
    equippedTitle: S.equippedTitle,
    equippedFrame: S.equippedFrame,
    status: S.user.status || '',
    journal: S.user.journal || '',
    unlockedAchievements: Array.from(S.unlockedAchievements),
    logs: S.logs,
    friends: S.friends
  });
}

function saveLogsToFirebase(){
  if (!S.uid) return;
  logsRef().set(S.logs);
}

// ═══════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════
auth.onAuthStateChanged(user => {
  if (user) {
    S.uid = user.uid;
    document.getElementById('auth-screen').classList.add('hidden');
    syncFromFirebase();
  } else {
    S.uid = null; S.user = null;
    document.getElementById('auth-screen').classList.remove('hidden');
    document.querySelectorAll('.ob, .page').forEach(e => e.classList.remove('active'));
    document.getElementById('ob').classList.add('hidden');
    updateStaticText();
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
  if (!email || !pass) return alert(t('email') + ' / ' + t('password'));
  auth.createUserWithEmailAndPassword(email, pass).catch(e => alert(e.message));
}
function resetPassword(){
  const email = document.getElementById('auth-email').value;
  if (!email) return alert(t('email'));
  auth.sendPasswordResetEmail(email).then(() => alert('✓')).catch(e => alert(e.message));
}
function signOut(){ auth.signOut(); }

// ═══════════════════════════════════════════════════════════
// SOUND
// ═══════════════════════════════════════════════════════════
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playClick(){
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.frequency.value = 800; osc.type = 'sine';
  gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
  osc.start(audioCtx.currentTime); osc.stop(audioCtx.currentTime + 0.1);
}
document.addEventListener('click', e => {
  if (e.target.closest('button, .btn')) playClick();
});

// ═══════════════════════════════════════════════════════════
// ROUTER
// ═══════════════════════════════════════════════════════════
function go(page){
  if (!S.uid) return;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nb').forEach(b => b.classList.remove('active'));
  document.getElementById('nb-cal').classList.remove('active');
  const pg = document.getElementById('page-' + page);
  if (pg) pg.classList.add('active');
  if (page === 'cal') document.getElementById('nb-cal').classList.add('active');
  else {
    const nb = document.getElementById('nb-' + page);
    if (nb) nb.classList.add('active');
  }
  S.curPage = page;
  render(page);
}

function render(p){
  if (!S.user) return;
  if (p === 'home') renderHome();
  else if (p === 'cal') renderCal();
  else if (p === 'stats') renderStats();
  else if (p === 'prof') renderProf();
  else if (p === 'friends') renderFriends();
  else if (p === 'shop') renderShop();
  else if (p === 'menu') renderMenu();
}

// ═══════════════════════════════════════════════════════════
// COMPUTED
// ═══════════════════════════════════════════════════════════
function wDays(){ return Object.entries(S.logs).filter(([,v]) => v.type === 'workout'); }
function rDays(){ return Object.entries(S.logs).filter(([,v]) => v.type === 'rest'); }
function totalReps(){ return wDays().reduce((s,[,v]) => s + (v.total || 0), 0); }
function bestDay(){ const d = wDays(); return d.length ? Math.max(...d.map(([,v]) => v.total || 0)) : 0; }
function avgDay(){ const d = wDays(); return d.length ? Math.round(totalReps() / d.length) : 0; }
function pct(){ const g = S.user?.goalDays || 30; return Math.min(100, Math.round(wDays().length / g * 100)); }
function dLeft(){ return Math.max(0, (S.user?.goalDays || 30) - wDays().length); }

// Streak: allow 1 rest day gap
function streak(){
  let n = 0, d = new Date(), restCount = 0;
  while (true) {
    const k = fmt(d), e = S.logs[k];
    if (!e) {
      if (k === todayStr()) { d.setDate(d.getDate() - 1); continue; }
      break;
    }
    if (e.type === 'workout') { n++; restCount = 0; }
    else if (e.type === 'rest') { restCount++; if (restCount > 1) break; }
    else break;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

// ═══════════════════════════════════════════════════════════
// DATE UTILS
// ═══════════════════════════════════════════════════════════
const fmt = d => d.toISOString().split('T')[0];
const todayStr = () => fmt(new Date());
const parseD = s => new Date(s + 'T00:00:00');
function formatTime(ts){
  if (!ts) return '';
  const d = new Date(ts);
  return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
}

// ═══════════════════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════════════════
function applyEquippedTheme(){
  const root = document.documentElement;
  const defaults = {
    '--bg':'#07070f','--bg2':'#0d0d1c','--s1':'#11111e','--s2':'#171729','--s3':'#1f1f35','--s4':'#27273f',
    '--border':'#2a2a48','--border2':'#353558','--gold':'#c8a84b','--gold2':'#e8c96a','--gold3':'#f5dfa0','--gold-d':'rgba(200,168,75,.14)',
    '--blu':'#4a9eff','--blu-d':'rgba(74,158,255,.13)','--grn':'#00c96e','--grn-d':'rgba(0,201,110,.13)',
    '--red':'#ff4a6e','--red-d':'rgba(255,74,110,.1)','--txt':'#eeeef8','--txt2':'#8888aa'
  };
  Object.entries(defaults).forEach(([k,v]) => root.style.setProperty(k, v));
  if (S.equippedTheme) {
    const theme = SHOP_ITEMS.find(i => i.id === S.equippedTheme);
    if (theme && theme.data) {
      Object.entries(theme.data).forEach(([k,v]) => root.style.setProperty(k, v));
    }
  }
}

// ═══════════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════════
function showToast(message, icon = '🏆'){
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `${icon} ${message}`;
  container.appendChild(toast);
  try {
    const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.frequency.value = 1200; osc.type = 'triangle';
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
    osc.start(); osc.stop(audioCtx.currentTime + 0.3);
  } catch(e) {}
  setTimeout(() => toast.remove(), 3000);
}

// ═══════════════════════════════════════════════════════════
// XP & QUESTS
// ═══════════════════════════════════════════════════════════
function addXP(amount){
  S.user.xp = Math.max(0, (S.user.xp || 0) + amount);
  saveUserToFirebase();
}

function updateQuests(){
  const today = todayStr();
  if (!S.quests.length || S.quests[0].date !== today) {
    S.quests = generateDailyQuests();
    questsRef().set(S.quests);
  }
}

function generateDailyQuests(){
  const today = todayStr();
  const pool = [
    { id:'sets5',  desc: LANGSEL==='ka'?'დაასრულე 5 სეტი დღეს':'Complete 5 sets today', goal:5, reward:10 },
    { id:'rep100', desc: LANGSEL==='ka'?'მიაღწიე 100 აჯიმანიას დღეს':'Reach 100 total pull-ups today', goal:100, reward:20 },
    { id:'early',  desc: LANGSEL==='ka'?'დაასრულე ვარჯიში 10 საათამდე':'Finish a workout before 10 AM', goal:1, reward:15 },
    { id:'streak3',desc: LANGSEL==='ka'?'გააგრძელე სერია 3 დღემდე':'Extend your streak to 3 days', goal:3, reward:30 },
    { id:'rest',   desc: LANGSEL==='ka'?'აიღე დასვენების დღე':'Take a rest day', goal:1, reward:5 }
  ];
  const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, 3);
  return [{ date: today, quests: shuffled.map(q => ({ ...q, progress: 0, completed: false })) }];
}

function checkQuestCompletion(){
  const today = todayStr();
  if (!S.quests.length || S.quests[0].date !== today) return;
  const quests = S.quests[0].quests;
  let changed = false;
  quests.forEach(q => {
    if (q.completed) return;
    let progress = 0;
    const entry = S.logs[today];
    if (q.id === 'sets5') progress = entry?.type === 'workout' ? entry.sets.length : 0;
    else if (q.id === 'rep100') progress = entry?.type === 'workout' ? entry.total : 0;
    else if (q.id === 'early') {
      if (entry?.type === 'workout' && entry.timestamp) {
        if (new Date(entry.timestamp).getHours() < 10) progress = 1;
      }
    } else if (q.id === 'streak3') progress = Math.min(streak(), q.goal);
    else if (q.id === 'rest') progress = entry?.type === 'rest' ? 1 : 0;
    q.progress = progress;
    if (progress >= q.goal && !q.completed) {
      q.completed = true;
      addXP(q.reward);
      showToast(`${t('toast_quest')}: ${q.desc} (+${q.reward} XP)`, '✅');
      changed = true;
    }
  });
  if (changed) questsRef().set(S.quests);
}

function checkDailyGoal(){
  const key = todayStr();
  const entry = S.logs[key];
  if (entry?.type === 'workout' && entry.total >= S.user.target && S.targetToastedFor !== key) {
    showToast(`${t('toast_target')} (${entry.total}/${S.user.target})`, '🎯');
    S.targetToastedFor = key;
  }
}

function checkAchievements(){
  getAchievements().forEach(a => {
    if (a.unlocked && !S.unlockedAchievements.has(a.id)) {
      S.unlockedAchievements.add(a.id);
      showToast(`${t('toast_achievement')}: ${a.name} (+${a.xp} XP)`, a.icon);
    }
  });
  saveUserToFirebase();
}

// ═══════════════════════════════════════════════════════════
// ONBOARDING
// ═══════════════════════════════════════════════════════════
function initAvGrid(id, sel, onSel){
  const g = document.getElementById(id);
  if (!g) return;
  g.innerHTML = AVATARS.map(a => `<div class="av-opt${a===sel?' sel':''}" onclick="${onSel}(this,'${a}')">${a}</div>`).join('');
}
function selAv(el, av){
  document.querySelectorAll('#av-grid .av-opt').forEach(e => e.classList.remove('sel'));
  el.classList.add('sel'); S.selAv = av;
}
function selEditAv(el, av){
  document.querySelectorAll('#edit-av-grid .av-opt').forEach(e => e.classList.remove('sel'));
  el.classList.add('sel'); S.editAv = av;
}
function obDots(step){
  document.querySelectorAll('.ob-dot').forEach((d,i) => d.classList.toggle('active', i <= step-1));
}
function obNext(step){
  if (step === 1) {
    const name = document.getElementById('ob-name').value.trim();
    const age = parseInt(document.getElementById('ob-age').value);
    if (!name || !age) return alert(t('name') + ' / ' + t('age'));
    S.tmpUser = { name, age };
  } else if (step === 2) {
    const days = parseInt(document.getElementById('ob-days').value) || 30;
    const target = parseInt(document.getElementById('ob-target').value) || 100;
    const quote = document.getElementById('ob-quote').value.trim() || (LANGSEL==='ka'?'ტკივილი დროებითია, დიდება მარადიული.':'Pain is temporary, glory is forever.');
    S.tmpUser = { ...S.tmpUser, goalDays: days, target, quote };
  }
  document.getElementById('ob-s' + step).classList.remove('active');
  document.getElementById('ob-s' + (step+1)).classList.add('active');
  obDots(step + 1);
}
function obBack(toStep){
  document.getElementById('ob-s' + (toStep+1)).classList.remove('active');
  document.getElementById('ob-s' + toStep).classList.add('active');
  obDots(toStep);
}
function obFinish(){
  S.user = { ...S.tmpUser, avatar: S.selAv, avatarImg: null, startDate: todayStr(), xp: 0, status: '', journal: '' };
  S.friends = {}; S.inventory = [];
  S.equippedTheme = null; S.equippedTitle = null; S.equippedFrame = null;
  S.unlockedAchievements = new Set();
  saveUserToFirebase();
  document.getElementById('ob').classList.add('hidden');
  go('home');
}

// ═══════════════════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════════════════
function renderHome(){
  const u = S.user, p = pct(), wd = wDays().length, dl = dLeft(), st = streak();
  const R = 82, C = 2 * Math.PI * R, filled = C * (p / 100);
  const ringStyle = `stroke:${p>=100?'var(--grn)':'var(--gold)'};transform:rotate(-90deg);transform-origin:center`;
  const entry = S.logs[todayStr()];
  const hr = new Date().getHours();
  const greet = hr < 12 ? t('good_morning') : hr < 17 ? t('good_afternoon') : t('good_evening');

  let statusHTML = '';
  if (entry?.type === 'workout') {
    statusHTML = `<div class="tag tag-g">${t('completed_at', {time: formatTime(entry.timestamp), reps: entry.total})}</div>`;
  } else if (entry?.type === 'rest') {
    statusHTML = `<div class="tag tag-b">${t('rest_day_at', {time: formatTime(entry.timestamp)})}</div>`;
  } else {
    statusHTML = `<div class="tag tag-r">${t('not_logged_yet')}</div>`;
  }

  let btnHTML = '';
  if (!entry) {
    btnHTML = `<button class="btn btn-gold" onclick="openLog('${todayStr()}')">${t('log_workout')}</button>
               <button class="btn btn-blue" onclick="saveRest('${todayStr()}')">${t('mark_rest')}</button>`;
  } else {
    btnHTML = `<button class="btn btn-dark" onclick="openLog('${todayStr()}')">${t('edit_log')}</button>`;
  }

  const avInner = u.avatarImg ? `<img src="${u.avatarImg}">` : u.avatar;
  const frameClass = u.equippedFrame ? (SHOP_ITEMS.find(i=>i.id===u.equippedFrame)?.data || '') : '';
  const avHTML = frameClass
    ? `<span class="avatar-frame ${frameClass}" style="width:44px;height:44px">${avInner}</span>`
    : `<span style="font-size:28px">${avInner}</span>`;

  document.getElementById('page-home').innerHTML = `
    <div class="home-top">
      <div>
        <div class="home-greet">${greet},</div>
        <div class="home-name">${escapeHtml(u.name)} ${avHTML}</div>
        <div class="xp-badge" style="margin-top:6px">⭐ ${u.xp || 0} XP</div>
      </div>
      <div class="streak-pill">🔥 ${st} ${st===1?t('day'):t('days')}</div>
    </div>
    <div class="ring-card">
      <div class="ring-wrap">
        <svg width="210" height="210" viewBox="0 0 210 210">
          <circle cx="105" cy="105" r="${R}" fill="none" stroke="var(--s3)" stroke-width="15"/>
          <circle cx="105" cy="105" r="${R}" fill="none" stroke-width="13"
            stroke-linecap="round" stroke-dasharray="${filled} ${C-filled}" style="${ringStyle}"/>
        </svg>
        <div class="ring-inner">
          <div class="ring-pct">${p}%</div>
          <div class="ring-lbl">${t('complete')}</div>
        </div>
      </div>
      <div class="ring-goal">${t('days_done', {n: wd, total: u.goalDays})}</div>
    </div>
    <div class="stat-row">
      <div class="sc"><div class="sc-v">${wd}</div><div class="sc-l">${t('trained')}</div></div>
      <div class="sc"><div class="sc-v">${dl}</div><div class="sc-l">${t('left')}</div></div>
      <div class="sc"><div class="sc-v">${st}</div><div class="sc-l">${t('streak')} 🔥</div></div>
    </div>
    <div class="today-card">
      <div class="card-title">${t('today_label')} — ${new Date().toLocaleDateString(LANGSEL==='ka'?'ka-GE':'en-US',{weekday:'long',month:'short',day:'numeric'})}</div>
      <div style="margin-bottom:14px">${statusHTML}</div>
      ${btnHTML}
    </div>
    <div class="card">
      <div class="card-title">${t('your_motivation')}</div>
      <div style="font-style:italic;color:var(--txt2);line-height:1.6;font-size:14px">"${escapeHtml(u.quote || '')}"</div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════
// CALENDAR
// ═══════════════════════════════════════════════════════════
function renderCal(){
  const now = new Date();
  if (!S.cal.y) S.cal = { y: now.getFullYear(), m: now.getMonth() };
  const { y, m } = S.cal;
  const first = new Date(y, m, 1).getDay();
  const dims = new Date(y, m+1, 0).getDate();
  const td = todayStr();
  const weeks = LANGSEL==='ka' ? ['კ','ო','ს','ო','ხ','პ','შ'] : ['S','M','T','W','T','F','S'];

  let cells = '';
  for (let i = 0; i < first; i++) cells += `<div class="cd empty"></div>`;
  for (let d = 1; d <= dims; d++) {
    const ds = `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const e = S.logs[ds];
    const isT = ds === td, isPast = ds < td, isFut = ds > td;
    let cls = 'cd', dot = '';
    if (isT) cls += ' today';
    else if (isFut) cls += ' future';
    if (e?.type === 'workout') { cls += ' done'; dot = `<div class="cd-dot" style="background:var(--grn)"></div>`; }
    else if (e?.type === 'rest') { cls += ' rest'; dot = `<div class="cd-dot" style="background:var(--blu)"></div>`; }
    else if (isPast && !isT) { cls += ' miss'; dot = `<div class="cd-dot" style="background:var(--red)"></div>`; }
    const click = !isFut ? `onclick="openLog('${ds}')"` : '';
    cells += `<div class="${cls}" ${click}>${d}${dot}</div>`;
  }

  document.getElementById('page-cal').innerHTML = `
    <div class="cal-top">
      <div>
        <div style="font-size:10px;color:var(--txt2);text-transform:uppercase;letter-spacing:.8px">${t('calendar')}</div>
        <div class="cal-month">${MONTHS[LANGSEL][m]} ${y}</div>
      </div>
      <div class="cal-navs">
        <button class="cal-nav" onclick="chMo(-1)">‹</button>
        <button class="cal-nav" onclick="chMo(1)">›</button>
      </div>
    </div>
    <div class="wd-row">${weeks.map(d => `<div class="wd">${d}</div>`).join('')}</div>
    <div class="cal-grid">${cells}</div>
    <div class="legend">
      <div class="li"><div class="ld" style="background:var(--grn)"></div>${t('completed')}</div>
      <div class="li"><div class="ld" style="background:var(--blu)"></div>${t('rest')}</div>
      <div class="li"><div class="ld" style="background:var(--red)"></div>${t('missed')}</div>
      <div class="li"><div class="ld" style="background:var(--gold);border-radius:50%"></div>${t('today')}</div>
    </div>
    <div class="cal-actions">
      <div class="cal-btn" onclick="openLog('${td}')"><div class="ic">🏋️</div><div>${t('log_today')}</div></div>
      <div class="cal-btn" onclick="openDatePick()"><div class="ic">📅</div><div>${t('log_other_day')}</div></div>
    </div>
  `;
}

function chMo(dir){
  let { y, m } = S.cal; m += dir;
  if (m < 0) { m = 11; y--; }
  if (m > 11) { m = 0; y++; }
  S.cal = { y, m };
  renderCal();
}

// ═══════════════════════════════════════════════════════════
// LOG MODAL
// ═══════════════════════════════════════════════════════════
function openLog(dateStr){
  S.logDate = dateStr;
  const existing = S.logs[dateStr];
  if (existing?.type === 'workout') {
    const sets = existing.sets || [];
    S.modalSets = sets.map(s => {
      if (typeof s === 'number') return { reps: s, done: true, time: existing.timestamp || null };
      return { reps: s.reps, done: true, time: s.time || null };
    });
    if (!S.modalSets.length) S.modalSets = [{ reps: 10, done: false, time: null }];
  } else {
    S.modalSets = [{ reps: 10, done: false, time: null }];
  }
  renderModalSets();
  showModal();
}

function openDatePick(){
  document.getElementById('modal-body').innerHTML = `
    <div class="mtitle">${t('log_a_date')}</div>
    <div class="msub">${t('choose_date')}</div>
    <div class="fg"><input type="date" class="fi" id="modal-dp" max="${todayStr()}" value="${todayStr()}"></div>
    <button class="btn btn-gold" onclick="confirmDp()">${t('continue')}</button>
    <button class="btn btn-dark" onclick="hideModal()">${t('cancel')}</button>
  `;
  showModal();
}

function confirmDp(){
  const v = document.getElementById('modal-dp').value;
  if (!v) return;
  hideModal();
  setTimeout(() => openLog(v), 120);
}

function renderModalSets(){
  const dl = S.logDate === todayStr() ? t('today') : parseD(S.logDate).toLocaleDateString(LANGSEL==='ka'?'ka-GE':'en-US',{weekday:'short',month:'short',day:'numeric'});
  const total = S.modalSets.reduce((s,x) => s + (x.done ? x.reps : 0), 0);
  const existing = S.logs[S.logDate];
  const timeStr = existing?.timestamp ? formatTime(existing.timestamp) : null;

  document.getElementById('modal-body').innerHTML = `
    <div class="mtitle">${t('log_workout_title')}</div>
    <div class="msub">${dl} · ${t('tap_to_check')}</div>
    ${timeStr ? `<div style="text-align:center;font-size:13px;color:var(--txt2);margin-bottom:14px">${t('logged_at',{time:timeStr})}</div>` : ''}
    <div class="sets-wrap" id="sets-wrap">
      ${S.modalSets.map((set,i) => `
        <div class="set-c${set.done?' done':''}" id="sc-${i}">
          <div class="set-num">S${i+1}</div>
          <div class="set-mid">
            <div class="set-rl">${t('reps')}</div>
            <input class="set-ri" type="number" inputmode="numeric" value="${set.reps}" min="1" max="999"
              onchange="updReps(${i},this.value)" id="ri-${i}">
            ${set.time ? `<div style="font-size:10px;color:var(--txt2);margin-top:2px">🕒 ${formatTime(set.time)}</div>` : ''}
          </div>
          <button class="set-chk${set.done?' done':''}" onclick="togSet(${i})">${set.done?'✓':''}</button>
        </div>
      `).join('')}
    </div>
    <button class="btn btn-dark" onclick="addSet()" style="margin-bottom:12px">${t('add_set')}</button>
    <div class="set-total">${t('total_label',{n:total})}</div>
    <button class="btn btn-gold" onclick="saveWorkout()">${t('save_workout')}</button>
    <button class="btn btn-blue" onclick="saveRestFromModal()">${t('mark_rest')}</button>
    ${existing ? `<button class="btn btn-dark" onclick="deleteLog()">${t('remove_log')}</button>` : ''}
    <button class="btn btn-dark" onclick="hideModal()">${t('cancel')}</button>
  `;
}

function togSet(i){
  S.modalSets[i].done = !S.modalSets[i].done;
  S.modalSets[i].time = S.modalSets[i].done ? Date.now() : null;
  renderModalSets();
}
function updReps(i, v){
  S.modalSets[i].reps = parseInt(v) || 0;
  const total = S.modalSets.reduce((s,x) => s + (x.done ? x.reps : 0), 0);
  const el = document.getElementById('mod-tot');
  const tEl = document.querySelector('.set-total');
  if (tEl) tEl.innerHTML = t('total_label', {n: total});
}
function addSet(){
  const last = S.modalSets[S.modalSets.length - 1];
  S.modalSets.push({ reps: last ? last.reps : 10, done: false, time: null });
  renderModalSets();
}

function saveWorkout(){
  const done = S.modalSets.filter(s => s.done && s.reps > 0);
  if (!done.length) return alert(t('check_at_least_one'));
  const setsToStore = done.map(s => ({ reps: s.reps, time: s.time || null }));
  const total = setsToStore.reduce((sum, s) => sum + s.reps, 0);
  const existing = S.logs[S.logDate];
  const oldTotal = (existing?.type === 'workout') ? (existing.total || 0) : 0;
  S.logs[S.logDate] = { type:'workout', sets: setsToStore, total, timestamp: Date.now() };
  saveLogsToFirebase();
  const xpDelta = Math.floor(total/5) - Math.floor(oldTotal/5);
  if (xpDelta !== 0) addXP(xpDelta);
  checkQuestCompletion();
  checkDailyGoal();
  checkAchievements();
  hideModal();
  render(S.curPage);
  showToast(t('toast_logged'), '💪');
}

function saveRest(ds){
  const existing = S.logs[ds];
  if (existing?.type === 'workout') {
    const xpToRemove = Math.floor((existing.total || 0)/5);
    S.user.xp = Math.max(0, (S.user.xp || 0) - xpToRemove);
    saveUserToFirebase();
  }
  S.logs[ds] = { type:'rest', sets: [], total: 0, timestamp: Date.now() };
  saveLogsToFirebase();
  checkQuestCompletion();
  render(S.curPage);
  showToast(t('toast_rest'), '😴');
}

function saveRestFromModal(){
  saveRest(S.logDate);
  hideModal();
}

function deleteLog(){
  if (!confirm(t('remove_log') + '?')) return;
  const existing = S.logs[S.logDate];
  if (existing?.type === 'workout') {
    const xpToRemove = Math.floor((existing.total || 0)/5);
    S.user.xp = Math.max(0, (S.user.xp || 0) - xpToRemove);
    saveUserToFirebase();
  }
  delete S.logs[S.logDate];
  saveLogsToFirebase();
  hideModal();
  render(S.curPage);
}

function showModal(){ document.getElementById('modal-overlay').classList.remove('hidden'); }
function hideModal(){ document.getElementById('modal-overlay').classList.add('hidden'); }
document.getElementById('modal-overlay').addEventListener('click', function(e){ if (e.target === this) hideModal(); });

// Modal scroll lock
(function(){
  const ov = document.getElementById('modal-overlay');
  if (!ov) return;
  let scrollY = 0;
  new MutationObserver(() => {
    const open = !ov.classList.contains('hidden');
    if (open) {
      scrollY = window.scrollY;
      document.body.style.cssText += `;position:fixed;top:-${scrollY}px;width:100%`;
      const m = ov.querySelector('.modal'); if (m) m.scrollTop = 0;
    } else {
      document.body.style.position = document.body.style.top = document.body.style.width = '';
      window.scrollTo(0, scrollY);
    }
  }).observe(ov, { attributes: true, attributeFilter: ['class'] });
})();

// ═══════════════════════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════════════════════
function renderStats(){
  const tr = totalReps(), wd = wDays(), rd = rDays(), st = streak(), bd = bestDay(), ag = avgDay();
  const todayLog = S.logs[todayStr()];
  const todayReps = todayLog?.type === 'workout' ? todayLog.total : 0;
  const g = S.user?.goalDays || 30, tg = S.user?.target || 100;
  const hitRate = wd.length ? Math.round(wd.filter(([,v]) => v.total >= tg).length / wd.length * 100) : 0;
  const p = pct();

  const l7 = Array.from({length: 7}, (_,i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const k = fmt(d), e = S.logs[k];
    return { label: DAYS_SHORT[LANGSEL][d.getDay()], val: e?.type === 'workout' ? e.total : 0, type: e?.type || 'none' };
  });
  const mx = Math.max(...l7.map(x => x.val), 1);
  const bars = l7.map(d => {
    const h = d.type === 'rest' ? 22 : Math.max(5, (d.val / mx) * 80);
    const cls = d.type === 'workout' ? 'bar-w' : d.type === 'rest' ? 'bar-r' : 'bar-e';
    return `<div class="bw"><div style="font-size:9px;color:var(--txt2);margin-bottom:2px">${d.val||''}</div><div class="bar ${cls}" style="height:${h}px"></div><div class="bl">${d.label}</div></div>`;
  }).join('');

  let achHTML = '';
  getAchievements().forEach(a => {
    const locked = !a.unlocked;
    const progPct = a.max ? Math.min(100, Math.round((a.current / a.max) * 100)) : 0;
    achHTML += `
      <div class="ach-item ${locked ? 'ach-locked' : ''}">
        <div class="ach-icon">${a.icon}</div>
        <div class="ach-info">
          <div class="ach-name">${a.name}</div>
          <div class="ach-desc">${a.desc} (${a.xp || 0} XP)</div>
          ${a.max ? `<div class="ach-prog"><div class="ach-prog-bar"><div class="ach-prog-fill" style="width:${progPct}%"></div></div><div class="ach-stat">${a.current} / ${a.max}</div></div>` : ''}
        </div>
        <div class="ach-status">${locked ? '🔒' : '✅'}</div>
      </div>`;
  });

  const questsToday = S.quests.length && S.quests[0].date === todayStr() ? S.quests[0].quests : [];
  const questHTML = questsToday.length ? `
    <div class="ach-card">
      <div class="ach-title">${t('daily_quests')}</div>
      ${questsToday.map(q => `
        <div class="quest-card" style="opacity:${q.completed?0.5:1}">
          <div>${q.completed?'✅':'⬜'}</div>
          <div class="quest-progress">${q.desc} (${q.progress}/${q.goal})</div>
          <div class="quest-reward">+${q.reward} XP</div>
        </div>
      `).join('')}
    </div>` : '';

  document.getElementById('page-stats').innerHTML = `
    <div class="sh">${t('statistics')}</div>
    <div class="ss">${t('stats_sub')}</div>
    <div class="today-hero">
      <div class="today-hero-n">${todayReps}</div>
      <div class="today-hero-l">${t('today_pushups')}</div>
    </div>
    <div class="hero"><div class="hero-n">${tr.toLocaleString()}</div><div class="hero-l">${t('total_pushups')}</div></div>
    <div class="sg">
      <div class="sgc"><div class="sgc-v">${wd.length}</div><div class="sgc-l">${t('workouts')}</div></div>
      <div class="sgc"><div class="sgc-v">${rd.length}</div><div class="sgc-l">${t('rest_days')}</div></div>
      <div class="sgc"><div class="sgc-v">${st}</div><div class="sgc-l">🔥 ${t('streak')}</div></div>
      <div class="sgc"><div class="sgc-v">${bd}</div><div class="sgc-l">${t('best_day')}</div></div>
      <div class="sgc"><div class="sgc-v">${ag}</div><div class="sgc-l">${t('daily_avg')}</div></div>
      <div class="sgc"><div class="sgc-v">${hitRate}%</div><div class="sgc-l">${t('target_hit')}</div></div>
    </div>
    <div class="chart-box"><div class="chart-l">${t('last_7_days')}</div><div class="bars">${bars}</div></div>
    <div class="card">
      <div class="card-title">${t('challenge_progress')}</div>
      <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:14px;color:var(--txt2)">${t('days_completed')}</span><span style="font-weight:600">${wd.length} / ${g}</span></div>
      <div class="prog-wrap"><div class="prog-fill" style="width:${p}%"></div></div>
      <div style="margin-top:10px;font-size:12px;color:var(--txt2)">${t('days_done',{n: wd.length, total: g})} · ${dLeft()} ${t('days')}</div>
    </div>
    ${questHTML}
    <div class="ach-card">
      <div class="ach-title">${t('achievements')}</div>
      ${achHTML}
    </div>
  `;
}

function getAchievements(){
  const tr = totalReps(), wd = wDays().length, st = streak(), bd = bestDay();
  const goal = S.user?.goalDays || 30, target = S.user?.target || 100;
  const hitDays = wDays().filter(([,v]) => v.total >= target).length;
  const ka = LANGSEL === 'ka';

  const list = [
    { id:'first',      icon:'🥇', name: ka?'პირველი ვარჯიში':'First Workout',           desc: ka?'დაასრულე 1 ვარჯიში':'Complete 1 workout',              max:1,     current: Math.min(wd,1),        unlocked: wd>=1,      xp:10 },
    { id:'streak7',    icon:'🔥', name: ka?'7-დღიანი სერია':'7-Day Streak',             desc: ka?'შეინარჩუნე 7-დღიანი სერია':'Maintain a streak of 7 days', max:7,     current: Math.min(st,7),        unlocked: st>=7,      xp:40 },
    { id:'dedicated',  icon:'🏋️', name: ka?'თავდადებული':'Dedicated',                    desc: ka?'დაასრულე 10 ვარჯიში':'Complete 10 workouts',             max:10,    current: Math.min(wd,10),       unlocked: wd>=10,     xp:30 },
    { id:'consistent', icon:'🎯', name: ka?'თანმიმდევრული':'Consistent',                 desc: ka?'მიაღწიე დღიურ მიზანს 5-ჯერ':'Hit daily target 5 times',    max:5,     current: Math.min(hitDays,5),   unlocked: hitDays>=5, xp:50 },
    { id:'heavy',      icon:'🦾', name: ka?'მძიმე ამწევი':'Heavy Lifter',                 desc: ka?'საუკეთესო დღე: 200 აჯიმანია':'Best day: 200 pull-ups',   max:200,   current: Math.min(bd,200),      unlocked: bd>=200,    xp:60 },
    { id:'halfway',    icon:'🌟', name: ka?'ნახევრად გმირი':'Halfway Hero',               desc: ka?'მიაღწიე 50% გამოწვევის შესრულებას':'Reach 50% challenge',  max:null,  current: 0,                     unlocked: wd>=goal/2, xp:40 },
    { id:'centurion',  icon:'💪', name: ka?'აჯიმანიების ცენტურიონი':'Pull-Up Centurion',  desc: ka?'მიაღწიე 1000 აჯიმანიას':'Reach 1,000 total pull-ups',   max:1000,  current: Math.min(tr,1000),     unlocked: tr>=1000,   xp:100 },
    { id:'ironman',    icon:'⚡', name: ka?'რკინის კაცი':'Iron Man',                      desc: ka?'10000 აჯიმანია':'10,000 total pull-ups',                max:10000, current: Math.min(tr,10000),    unlocked: tr>=10000,  xp:400 },
    { id:'champion',   icon:'🏆', name: ka?'გამოწვევის ჩემპიონი':'Challenge Champion',    desc: ka?`დაასრულე გამოწვევა (${goal} დღე)`:`Complete challenge (${goal} days)`, max:goal, current: Math.min(wd,goal), unlocked: wd>=goal, xp:200 }
  ];

  const legendUnlocked = list.every(a => a.unlocked);
  list.push({
    id:'legend', icon:'👑', name: ka?'IronPush ლეგენდა':'IronPush Legend',
    desc: ka?'გახსენი ყველა მიღწევა':'Unlock all achievements',
    max: list.length, current: list.filter(a=>a.unlocked).length,
    unlocked: legendUnlocked, xp:1000
  });

  return list;
}

// ═══════════════════════════════════════════════════════════
// PROFILE (REDESIGNED)
// ═══════════════════════════════════════════════════════════
function renderProf(){
  const u = S.user;
  if (!u) return;
  S.editMode = S.editMode || false;
  const frameClass = u.equippedFrame ? (SHOP_ITEMS.find(i=>i.id===u.equippedFrame)?.data || '') : '';
  const avInner = u.avatarImg ? `<img src="${u.avatarImg}">` : u.avatar;
  const titleText = u.equippedTitle ? getTitleText(u.equippedTitle) : '';
  const wd = wDays().length;
  const st = streak();
  const total = totalReps();

  let adminHTML = '';
  if (u.role === 'admin') {
    adminHTML = `
      <div class="admin-panel">
        <div class="card-title">🔧 Admin Panel</div>
        <div class="fg"><input class="fi" id="admin-uid-input" placeholder="Enter user UID to edit"></div>
        <button class="btn btn-gold" onclick="adminLoadUser()" style="margin-bottom:12px">Load User</button>
        <div id="admin-user-edit" style="display:none">
          <div class="fg"><label class="fl">Name</label><input class="fi" id="admin-e-name" maxlength="20"></div>
          <div class="fg"><label class="fl">Age</label><input class="fi" id="admin-e-age" type="number" min="10" max="99"></div>
          <div class="fg"><label class="fl">Goal Days</label><input class="fi" id="admin-e-days" type="number" min="7" max="365"></div>
          <div class="fg"><label class="fl">Daily Target</label><input class="fi" id="admin-e-target" type="number" min="10"></div>
          <div class="fg"><label class="fl">Note</label><input class="fi" id="admin-e-quote" maxlength="200"></div>
          <button class="btn btn-gold" onclick="adminSaveUser()">Save User</button>
          <button class="btn btn-dark" onclick="adminClear()">Cancel</button>
        </div>
      </div>`;
  }

  const viewHTML = `
    <div class="prof-page-header">
      <div class="sh" style="padding-top:0">${t('profile')}</div>
      <button class="prof-icon-btn" onclick="go('shop')">🛒 ${u.xp||0}</button>
    </div>

    <div class="prof-hero">
      <div class="p-av-big ${frameClass}" onclick="document.getElementById('avatar-upload').click()">
        ${avInner}
        <div class="p-av-ovr">CHANGE</div>
      </div>
      <div class="prof-hero-info">
        <div class="p-name">${escapeHtml((u.name||'').toUpperCase())}</div>
        ${titleText ? `<div style="margin-bottom:6px"><span class="title-badge" style="margin-left:0">${titleText}</span>${u.role==='admin'?'<span class="admin-badge">ADMIN</span>':''}</div>` : (u.role==='admin'?'<div style="margin-bottom:6px"><span class="admin-badge" style="margin-left:0">ADMIN</span></div>':'')}
        <div class="p-age">${t('age')}: ${u.age} · ${u.goalDays}-${t('days')}</div>
        <div class="xp-badge">⭐ ${u.xp || 0} XP</div>
      </div>
    </div>

    <div class="prof-stats-row">
      <div class="prof-stat"><div class="prof-stat-v">${wd}</div><div class="prof-stat-l">${t('workouts')}</div></div>
      <div class="prof-stat"><div class="prof-stat-v">${total}</div><div class="prof-stat-l">${t('total_pushups').split(' ')[0]}</div></div>
      <div class="prof-stat"><div class="prof-stat-v">${st}</div><div class="prof-stat-l">🔥 ${t('streak')}</div></div>
    </div>

    <div class="prof-section-label">${t('edit_profile').replace('✏️ ','')}</div>
    <button class="btn btn-gold" onclick="toggleEdit(true)">${t('edit_profile')}</button>
    <button class="btn btn-dark" onclick="openInventory()">${t('inventory')}</button>

    <div style="margin-top:14px;display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-size:11px;color:var(--txt2);background:var(--s2);padding:4px 12px;border-radius:12px">UID: ${S.uid}</span>
      <button onclick="copyUID()" style="background:var(--gold-d);border:1px solid var(--gold);color:var(--gold);border-radius:8px;padding:4px 10px;font-size:12px;cursor:pointer">📋</button>
    </div>
    ${adminHTML}
    <div class="divider" style="margin-top:20px"></div>
    <button class="btn btn-red" onclick="signOut()">${t('sign_out')}</button>
    <div style="height:10px"></div>
  `;

  const editHTML = `
    <div class="prof-page-header">
      <div class="sh" style="padding-top:0">${t('edit_profile').replace('✏️ ','')}</div>
      <button class="prof-icon-btn" onclick="toggleEdit(false)">✕</button>
    </div>
    <div class="card">
      <div class="fg"><label class="fl">${t('name')}</label><input class="fi" id="e-name" value="${escapeHtml(u.name||'')}" maxlength="20"></div>
      <div class="fg"><label class="fl">${t('age')}</label><input class="fi" id="e-age" type="number" value="${u.age||''}" min="10" max="99"></div>
      <div class="fg"><label class="fl">${t('duration')}</label><input class="fi" id="e-days" type="number" value="${u.goalDays||30}" min="7" max="365"></div>
      <div class="fg"><label class="fl">${t('daily_target')}</label><input class="fi" id="e-target" type="number" value="${u.target||100}" min="10"></div>
      <div class="fg"><label class="fl">${LANGSEL==='ka'?'ბიო':'Bio'}</label><textarea class="fi" id="e-quote" maxlength="200" style="min-height:72px;resize:none;line-height:1.5">${escapeHtml(u.quote||'')}</textarea></div>
      <div class="fg"><label class="fl">${LANGSEL==='ka'?'სტატუსი':'Status'}</label><input class="fi" id="e-status" value="${escapeHtml(u.status||'')}" maxlength="60"></div>
      <div class="fg"><label class="fl">Avatar</label><div class="av-grid" id="edit-av-grid"></div></div>
      <button class="btn btn-gold" id="save-btn" onclick="saveProf()">${t('save_changes')}</button>
      <button class="btn btn-dark" onclick="toggleEdit(false)">${t('cancel')}</button>
    </div>
  `;

  document.getElementById('page-prof').innerHTML = S.editMode ? editHTML : viewHTML;
  if (S.editMode) {
    initAvGrid('edit-av-grid', u.avatar, 'selEditAv');
    S.editAv = null;
  }
}

function toggleEdit(mode){ S.editMode = mode; render('prof'); }

function saveProf(){
  const name = document.getElementById('e-name').value.trim();
  if (!name) return alert(t('name'));
  S.user.name = name;
  S.user.age = parseInt(document.getElementById('e-age').value) || S.user.age;
  S.user.goalDays = parseInt(document.getElementById('e-days').value) || S.user.goalDays;
  S.user.target = parseInt(document.getElementById('e-target').value) || S.user.target;
  S.user.quote = document.getElementById('e-quote').value.trim() || S.user.quote;
  S.user.status = document.getElementById('e-status').value.trim();
  if (S.editAv) S.user.avatar = S.editAv;
  saveUserToFirebase();
  checkAchievements();
  const btn = document.getElementById('save-btn');
  if (btn) { btn.classList.add('btn-saved'); btn.innerHTML = '✓'; }
  setTimeout(() => toggleEdit(false), 700);
}

function getTitleText(titleId){
  const item = SHOP_ITEMS.find(i => i.id === titleId);
  if (!item) return '';
  return LANGSEL === 'ka' ? (item.dataKa || item.data) : item.data;
}

function copyUID(){
  navigator.clipboard.writeText(S.uid).then(() => showToast('UID', '📋'));
}

function handleAvatarUpload(input){
  const file = input.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    S.user.avatarImg = e.target.result;
    saveUserToFirebase();
    render('prof');
  };
  reader.readAsDataURL(file);
}

// ═══════════════════════════════════════════════════════════
// ADMIN
// ═══════════════════════════════════════════════════════════
function adminLoadUser(){
  const uid = document.getElementById('admin-uid-input').value.trim();
  if (!uid) return;
  db.ref('users/' + uid).once('value').then(snap => {
    const data = snap.val();
    if (!data) return alert('User not found');
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
  if (!S.adminTargetUser) return;
  const newData = {
    name: document.getElementById('admin-e-name').value.trim(),
    age: parseInt(document.getElementById('admin-e-age').value) || 0,
    goalDays: parseInt(document.getElementById('admin-e-days').value) || 30,
    target: parseInt(document.getElementById('admin-e-target').value) || 100,
    quote: document.getElementById('admin-e-quote').value.trim()
  };
  if (!newData.name) return alert('Name required');
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

// ═══════════════════════════════════════════════════════════
// FRIENDS
// ═══════════════════════════════════════════════════════════
function renderFriends(){
  const friends = S.friends || {};
  const friendList = Object.entries(friends);

  document.getElementById('page-friends').innerHTML = `
    <div class="sh">${t('friends_title')}</div>
    <div class="ss">${t('friends_sub')}</div>
    <div class="fg">
      <label class="fl">${t('add_friend_uid')}</label>
      <input class="fi" id="friend-uid-input" placeholder="${t('friend_uid_ph')}">
    </div>
    <button class="btn btn-gold" onclick="addFriend()">${t('add_friend')}</button>
    <div style="margin-top:14px" id="friend-list-container">
      ${friendList.length === 0 ? `<div style="color:var(--txt2);text-align:center;padding:20px">${t('no_friends')}</div>` : ''}
      ${friendList.map(([uid]) => {
        const friend = friends[uid] || {};
        const title = friend.equippedTitle ? getTitleText(friend.equippedTitle) : '';
        return `<div class="friend-card" onclick="viewFriend('${uid}')" id="fc-${uid}">
          <div class="friend-av">${friend.avatarImg ? `<img src="${friend.avatarImg}">` : (friend.avatar || '👤')}</div>
          <div class="friend-info">
            <div class="friend-name">${escapeHtml(friend.name || 'Unknown')}${title ? ` <span class="title-badge">${title}</span>` : ''}${friend.role==='admin'?' <span class="admin-badge">ADMIN</span>':''}</div>
            <div class="friend-detail" id="frd-${uid}">...</div>
          </div>
          <button class="friend-remove" onclick="event.stopPropagation(); removeFriend('${uid}')">✕</button>
        </div>`;
      }).join('')}
    </div>
  `;

  friendList.forEach(([uid]) => {
    db.ref('users/' + uid + '/logs/' + todayStr()).once('value').then(snap => {
      const val = snap.val();
      const detailEl = document.getElementById('frd-' + uid);
      if (detailEl) {
        if (val && val.type === 'workout') detailEl.innerHTML = t('friend_today', {reps: val.total});
        else if (val && val.type === 'rest') detailEl.textContent = t('friend_rest');
        else detailEl.textContent = t('friend_not_logged');
      }
    });
  });
}

function addFriend(){
  const uid = document.getElementById('friend-uid-input').value.trim();
  if (!uid) return;
  if (uid === S.uid) return alert('!');
  db.ref('users/' + uid).once('value').then(snap => {
    const val = snap.val();
    if (!val) return alert('User not found');
    if (!S.friends) S.friends = {};
    S.friends[uid] = {
      name: val.name,
      avatar: val.avatar,
      avatarImg: val.avatarImg || null,
      role: val.role || null,
      equippedTitle: val.equippedTitle || null,
      equippedFrame: val.equippedFrame || null,
      status: val.status || '',
      xp: val.xp || 0
    };
    friendsRef().set(S.friends);
    render('friends');
    showToast(t('toast_friend_added'), '🤝');
  }).catch(e => alert('Error: ' + e.message));
}

function removeFriend(uid){
  if (!confirm(t('remove') + '?')) return;
  delete S.friends[uid];
  friendsRef().set(S.friends);
  render('friends');
}

function viewFriend(uid){
  db.ref('users/' + uid).once('value').then(snap => {
    const f = snap.val();
    if (!f) return alert('User not found');
    showFriendView(uid, f);
  });
}

function showFriendView(uid, f){
  const logs = f.logs || {};
  const w = Object.entries(logs).filter(([,v]) => v.type === 'workout');
  const r = Object.entries(logs).filter(([,v]) => v.type === 'rest');
  const total = w.reduce((s,[,v]) => s + (v.total || 0), 0);
  const best = w.length ? Math.max(...w.map(([,v]) => v.total || 0)) : 0;
  const avg = w.length ? Math.round(total / w.length) : 0;
  const stk = (() => {
    let n = 0, d = new Date(), rest = 0;
    while (true) {
      const k = fmt(d), e = logs[k];
      if (!e) { if (k === todayStr()) { d.setDate(d.getDate()-1); continue; } break; }
      if (e.type === 'workout') { n++; rest = 0; }
      else if (e.type === 'rest') { rest++; if (rest > 1) break; }
      else break;
      d.setDate(d.getDate() - 1);
    }
    return n;
  })();
  const p = f.goalDays ? Math.min(100, Math.round(w.length / f.goalDays * 100)) : 0;
  const todayLog = logs[todayStr()];
  const todayReps = todayLog?.type === 'workout' ? todayLog.total : 0;
  const frameClass = f.equippedFrame ? (SHOP_ITEMS.find(i=>i.id===f.equippedFrame)?.data || '') : '';
  const avInner = f.avatarImg ? `<img src="${f.avatarImg}" style="width:100%;height:100%;object-fit:cover;display:block">` : `<span style="font-size:56px">${f.avatar || '👤'}</span>`;
  const titleText = f.equippedTitle ? getTitleText(f.equippedTitle) : '';

  document.getElementById('friend-view').innerHTML = `
    <div class="friend-view-header">
      <button class="btn btn-dark" style="width:auto;padding:8px 16px;font-size:14px;margin:0" onclick="closeFriendView()">←</button>
      <div style="flex:1"></div>
      <button class="btn btn-dark" style="width:auto;padding:8px 16px;font-size:14px;margin:0" onclick="removeFriend('${uid}');closeFriendView()">${t('remove')}</button>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;padding:8px 0 20px">
      <div class="p-av-big ${frameClass}" style="cursor:default">${avInner}</div>
      <div class="p-name" style="margin-top:12px">${escapeHtml((f.name||'').toUpperCase())}${titleText ? ` <span class="title-badge">${titleText}</span>` : ''}${f.role==='admin'?' <span class="admin-badge">ADMIN</span>':''}</div>
      ${f.quote ? `<div class="ip-friend-bio" style="max-width:100%;text-align:center">${escapeHtml(f.quote)}</div>` : ''}
      ${f.status ? `<div class="ip-status">💬 ${escapeHtml(f.status)}</div>` : ''}
      <div class="p-age" style="margin-top:6px">${t('age')}: ${f.age} · ${f.goalDays}-${t('days')}</div>
      <div class="xp-badge" style="margin-top:8px">⭐ ${f.xp || 0} XP</div>
    </div>
    <div class="today-hero"><div class="today-hero-n">${todayReps}</div><div class="today-hero-l">${t('today_pushups')}</div></div>
    <div class="hero"><div class="hero-n">${total.toLocaleString()}</div><div class="hero-l">${t('total_pushups')}</div></div>
    <div class="sg">
      <div class="sgc"><div class="sgc-v">${w.length}</div><div class="sgc-l">${t('workouts')}</div></div>
      <div class="sgc"><div class="sgc-v">${r.length}</div><div class="sgc-l">${t('rest_days')}</div></div>
      <div class="sgc"><div class="sgc-v">${stk}</div><div class="sgc-l">🔥 ${t('streak')}</div></div>
      <div class="sgc"><div class="sgc-v">${best}</div><div class="sgc-l">${t('best_day')}</div></div>
      <div class="sgc"><div class="sgc-v">${avg}</div><div class="sgc-l">${t('daily_avg')}</div></div>
      <div class="sgc"><div class="sgc-v">${p}%</div><div class="sgc-l">${t('complete')}</div></div>
    </div>
    <div style="height:20px"></div>
  `;
  document.getElementById('friend-view').classList.remove('hidden');
}

function closeFriendView(){
  document.getElementById('friend-view').classList.add('hidden');
}

// ═══════════════════════════════════════════════════════════
// INVENTORY
// ═══════════════════════════════════════════════════════════
function openInventory(){
  document.getElementById('inventory-modal').classList.remove('hidden');
  document.querySelectorAll('#inventory-modal .inv-tab').forEach(t => t.classList.remove('active'));
  const firstTab = document.querySelector('#inventory-modal .inv-tab[data-tab="themes"]');
  if (firstTab) firstTab.classList.add('active');
  renderInventory('themes');
  document.querySelectorAll('#inventory-modal .inv-tab').forEach(tab => {
    tab.onclick = function(){
      document.querySelectorAll('#inventory-modal .inv-tab').forEach(t => t.classList.remove('active'));
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

  if (type === 'frames') {
    const owned = SHOP_ITEMS.filter(i => i.type === 'frame' && S.inventory.includes(i.id));
    if (!owned.length) {
      container.innerHTML = `<div style="text-align:center;color:var(--txt2);padding:24px 0">${LANGSEL==='ka'?'ჩარჩო არ გაქვს. შოპში შეიძინე!':'No frames yet. Buy some in the Shop!'}</div>`;
      return;
    }
    let html = '<div class="inv-frame-grid">';
    owned.forEach(item => {
      const eq = S.equippedFrame === item.id;
      const name = LANGSEL==='ka' ? (item.nameKa || item.name) : item.name;
      html += `<div class="inv-frame-cell${eq?' equipped':''}" onclick="equipItem('${item.id}')">
        <div class="ifp ${item.data}">${item.emoji || '🖼️'}</div>
        <div class="ifn">${name}</div>
        ${eq ? '<div class="ife">✓</div>' : '<div class="ifbtn">Equip</div>'}
      </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
    return;
  }

  items = S.inventory.filter(id => SHOP_ITEMS.find(i => i.id === id && i.type === type));
  let html = '';
  items.forEach(itemId => {
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) return;
    const isEquipped = (item.type === 'theme' && S.equippedTheme === itemId) ||
                       (item.type === 'title' && S.equippedTitle === itemId);
    const name = LANGSEL==='ka' ? (item.nameKa || item.name) : item.name;
    const desc = LANGSEL==='ka' ? (item.descKa || item.desc) : item.desc;
    html += `
      <div class="inv-item">
        <div>
          <div class="inv-item-name">${name} ${isEquipped?'<span style="color:var(--gold);font-size:11px">('+t('active')+')</span>':''}</div>
          <div style="font-size:11px;color:var(--txt2)">${desc}</div>
        </div>
        <button class="btn btn-blue" style="padding:6px 12px;font-size:12px;width:auto;margin:0" onclick="equipItem('${item.id}')">${isEquipped?t('unequip'):t('equip')}</button>
      </div>`;
  });
  if (!html) html = `<div style="text-align:center;color:var(--txt2);padding:20px">—</div>`;
  container.innerHTML = html;
}

document.getElementById('inventory-modal').addEventListener('click', function(e){
  if (e.target === this) closeInventory();
});

// ═══════════════════════════════════════════════════════════
// SHOP
// ═══════════════════════════════════════════════════════════
function renderShop(){
  const themes = SHOP_ITEMS.filter(i => i.type === 'theme');
  const titles = SHOP_ITEMS.filter(i => i.type === 'title');
  const frames = SHOP_ITEMS.filter(i => i.type === 'frame');

  let html = `<div class="sh">${t('shop_title')}</div>
    <div class="xp-badge" style="font-size:18px;margin-bottom:20px">⭐ ${S.user.xp || 0} XP</div>`;

  const itemName = i => LANGSEL==='ka' ? (i.nameKa || i.name) : i.name;
  const itemDesc = i => LANGSEL==='ka' ? (i.descKa || i.desc) : i.desc;
  const titleName = i => LANGSEL==='ka' ? (i.dataKa || i.data) : i.data;

  html += `<div class="ach-card"><div class="ach-title">${t('themes')}</div>`;
  themes.forEach(item => {
    const owned = S.inventory.includes(item.id), eq = S.equippedTheme === item.id;
    html += `<div class="inv-item">
      <div style="min-width:0;flex:1">
        <div class="inv-item-name">${itemName(item)} ${eq?`<span style="color:var(--gold);font-size:11px">(${t('active')})</span>`:''}</div>
        <div style="font-size:11px;color:var(--txt2)">${itemDesc(item)}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
        ${owned
          ? `<button class="btn btn-blue" style="padding:6px 12px;font-size:12px;width:auto;margin:0" onclick="equipItem('${item.id}')">${eq?t('unequip'):t('equip')}</button>`
          : `<span style="color:var(--gold);font-weight:600">${item.price}</span><button class="btn btn-gold" style="padding:6px 12px;font-size:12px;width:auto;margin:0" onclick="buyItem('${item.id}')">${t('buy')}</button>`}
      </div>
    </div>`;
  });
  html += `</div>`;

  html += `<div class="ach-card"><div class="ach-title">${t('titles')}</div>`;
  titles.forEach(item => {
    const owned = S.inventory.includes(item.id), eq = S.equippedTitle === item.id;
    html += `<div class="inv-item">
      <div style="min-width:0;flex:1">
        <div class="inv-item-name">${titleName(item)} ${eq?`<span style="color:var(--gold);font-size:11px">(${t('active')})</span>`:''}</div>
        <div style="font-size:11px;color:var(--txt2)">${itemDesc(item)}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
        ${owned
          ? `<button class="btn btn-blue" style="padding:6px 12px;font-size:12px;width:auto;margin:0" onclick="equipItem('${item.id}')">${eq?t('unequip'):t('equip')}</button>`
          : `<span style="color:var(--gold);font-weight:600">${item.price}</span><button class="btn btn-gold" style="padding:6px 12px;font-size:12px;width:auto;margin:0" onclick="buyItem('${item.id}')">${t('buy')}</button>`}
      </div>
    </div>`;
  });
  html += `</div>`;

  html += `<div class="ach-card"><div class="ach-title">${t('frames')}</div>`;
  frames.forEach(item => {
    const owned = S.inventory.includes(item.id), eq = S.equippedFrame === item.id;
    html += `<div class="shop-frame-card">
      <div class="shop-frame-preview ${item.data}">${item.emoji || '🖼️'}</div>
      <div class="shop-frame-info">
        <div class="shop-frame-name">${itemName(item)}</div>
        <div class="shop-frame-desc">${itemDesc(item)}</div>
      </div>
      <div class="shop-frame-right">
        <div class="shop-frame-price">⭐ ${item.price}</div>
        ${owned
          ? `<div class="shop-frame-owned">${eq?'✓ '+t('active'):t('owned')}</div>`
          : `<button class="btn btn-gold" style="padding:6px 14px;font-size:12px;width:auto;margin:0" onclick="buyItem('${item.id}')">${t('buy')}</button>`}
      </div>
    </div>`;
  });
  html += `</div>`;

  document.getElementById('page-shop').innerHTML = html;
}

function buyItem(itemId){
  const item = SHOP_ITEMS.find(i => i.id === itemId);
  if (!item) return;
  if (S.inventory.includes(itemId)) return;
  if ((S.user.xp || 0) < item.price) return alert('Not enough XP');
  S.user.xp -= item.price;
  S.inventory.push(itemId);
  saveUserToFirebase();
  const name = LANGSEL==='ka' ? (item.nameKa || item.name) : item.name;
  showToast(`🛒 ${name}`, '🛒');
  render('shop');
}

function equipItem(itemId){
  const item = SHOP_ITEMS.find(i => i.id === itemId);
  if (!item) return;
  if (item.type === 'theme') S.equippedTheme = (S.equippedTheme === itemId) ? null : itemId;
  else if (item.type === 'title') S.equippedTitle = (S.equippedTitle === itemId) ? null : itemId;
  else if (item.type === 'frame') S.equippedFrame = (S.equippedFrame === itemId) ? null : itemId;
  saveUserToFirebase();
  applyEquippedTheme();
  if (item.type === 'theme') render(S.curPage);
  else if (item.type === 'frame') render(S.curPage);
  else render(S.curPage);
}

// ═══════════════════════════════════════════════════════════
// MENU
// ═══════════════════════════════════════════════════════════
function renderMenu(){
  const u = S.user;
  if (!u) return;
  const frameClass = u.equippedFrame ? (SHOP_ITEMS.find(i=>i.id===u.equippedFrame)?.data || '') : '';
  const avInner = u.avatarImg ? `<img src="${u.avatarImg}">` : `<span style="font-size:38px">${u.avatar || '👤'}</span>`;
  const titleText = u.equippedTitle ? getTitleText(u.equippedTitle) : '';
  const notePreview = u.quote ? (escapeHtml(u.quote).substring(0,80) + (u.quote.length>80?'…':'')) : (LANGSEL==='ka'?'ბიო არ დამატებია...':'No bio yet...');

  document.getElementById('page-menu').innerHTML = `
    <div class="sh">${t('menu_title')}</div>
    <div class="menu-section-label">${t('profile')}</div>
    <div class="menu-hero" onclick="go('prof')">
      <div class="menu-av ${frameClass}">${avInner}</div>
      <div class="menu-user">
        <div class="menu-name">${escapeHtml((u.name||'').toUpperCase())}</div>
        <div class="menu-badges">
          ${titleText ? `<span class="title-badge" style="font-size:10px">${titleText}</span>` : ''}
          ${frameClass ? `<span style="font-size:10px;background:rgba(212,175,55,.12);color:var(--gold);padding:2px 8px;border-radius:8px;font-weight:600">🖼️</span>` : ''}
          ${u.role==='admin'?'<span class="admin-badge" style="font-size:10px">ADMIN</span>':''}
        </div>
        <div class="menu-note">${notePreview}</div>
        <div class="menu-xp">⭐ ${u.xp || 0} XP</div>
      </div>
      <div class="menu-arrow">›</div>
    </div>

    <div class="menu-section-label">${t('inventory')}</div>
    <div class="menu-inv-btn" onclick="openInventory()">
      <div class="menu-inv-icon">🎒</div>
      <div class="menu-inv-label">${t('my_inventory')}</div>
      <div class="menu-inv-arrow">›</div>
    </div>

    <div class="menu-section-label">${t('my_notebook')}</div>
    <div class="notebook-wrap">
      <div class="notebook-header">📔 ${t('notes')}</div>
      <div class="notebook-lines">
        <textarea class="notebook-ta" id="nb-ta" maxlength="2000"
          placeholder="${t('notes_ph')}"
          oninput="document.getElementById('nb-char').textContent=this.value.length+'/2000'"
        >${escapeHtml(u.journal||'')}</textarea>
      </div>
      <div class="notebook-footer">
        <span class="notebook-char" id="nb-char">${(u.journal||'').length}/2000</span>
        <button class="notebook-save-btn" onclick="IPSaveJournal()">${t('save')}</button>
      </div>
    </div>

    <div class="menu-section-label">${t('language')}</div>
    <div class="lang-row">
      <button class="lang-choice ${LANGSEL==='en'?'active':''}" onclick="setLang('en')">🇬🇧 English</button>
      <button class="lang-choice ${LANGSEL==='ka'?'active':''}" onclick="setLang('ka')">🇬🇪 ქართული</button>
    </div>

    <div class="menu-section-label">${t('instructions')}</div>
    <div class="menu-inv-btn" onclick="openInstructions()">
      <div class="menu-inv-icon">📖</div>
      <div class="menu-inv-label">${t('instructions_title')}</div>
      <div class="menu-inv-arrow">›</div>
    </div>

    <div style="margin-top:20px">
      <button class="menu-signout" onclick="signOut()">${t('sign_out')}</button>
    </div>
    <div style="height:10px"></div>
  `;
}

function IPSaveJournal(){
  const ta = document.getElementById('nb-ta');
  if (!ta || !S.user || !S.uid) return;
  S.user.journal = ta.value;
  saveUserToFirebase();
  showToast(t('toast_journal'), '📔');
}

// ═══════════════════════════════════════════════════════════
// INSTRUCTIONS
// ═══════════════════════════════════════════════════════════
function openInstructions(){
  document.getElementById('instructions-modal').classList.remove('hidden');
  const ka = LANGSEL === 'ka';
  document.getElementById('instr-title').textContent = t('instructions_title');

  const sections = ka ? [
    { h:'1. ვარჯიშის ჩაწერა', items:[
      'დააჭირე ქვედა ნავიგაციაში <strong>LOG</strong>-ს ან მთავარ გვერდზე <strong>"🏋️ დღევანდელი ვარჯიშის ჩაწერა"</strong>-ს.',
      'დაამატე სეტები და შეიყვანე თითოეულში გამეორებების რაოდენობა.',
      'დააჭირე წრეს ✓ რომ მონიშნო სეტი შესრულებულად.',
      'დააჭირე <strong>"💾 ვარჯიშის შენახვა"</strong>-ს.'
    ]},
    { h:'2. დასვენების დღე', items:[
      'თუ დღეს არ ვარჯიშობ, დააჭირე <strong>"💤 დასვენების დღედ მონიშვნა"</strong>-ს.',
      'დასვენების დღე არ წყვეტს სერიას (მაქსიმუმ 1 ზედიზედ).'
    ]},
    { h:'3. კალენდარი', items:[
      'მწვანე = ვარჯიში, ლურჯი = დასვენება, წითელი = გამოტოვებული.',
      'შეგიძლია ნებისმიერი წარსული დღე ჩაწერო.'
    ]},
    { h:'4. XP და ჯილდოები', items:[
      'ყოველ 5 აჯიმანზე იღებ 1 XP-ს.',
      'დღიური ქვესთები იძლევა დამატებით XP-ს.',
      'XP-ით შეგიძლია იყიდო თემები, ტიტულები და ავატარის ჩარჩოები <strong>მაღაზიაში</strong>.'
    ]},
    { h:'5. მეგობრები', items:[
      'გაუზიარე შენი UID მეგობარს (პროფილის გვერდზე).',
      'დაამატე მეგობარი მისი UID-ით <strong>მეგობრები</strong> გვერდიდან.',
      'ნახე მათი პროგრესი და შეადარე შენსას.'
    ]}
  ] : [
    { h:'1. Logging a Workout', items:[
      'Tap <strong>LOG</strong> in the bottom nav or <strong>"🏋️ Log Today\'s Workout"</strong> on the home page.',
      'Add sets and enter the rep count for each.',
      'Tap the ✓ circle to mark a set as done.',
      'Tap <strong>"💾 Save Workout"</strong>.'
    ]},
    { h:'2. Rest Days', items:[
      'If you\'re not training today, tap <strong>"💤 Mark as Rest Day"</strong>.',
      'A single rest day does not break your streak (max 1 in a row).'
    ]},
    { h:'3. Calendar', items:[
      'Green = workout, Blue = rest, Red = missed.',
      'You can log any past date by tapping it.'
    ]},
    { h:'4. XP & Rewards', items:[
      'You earn 1 XP per 5 pull-ups.',
      'Daily quests give bonus XP.',
      'Spend XP in the <strong>Shop</strong> to buy themes, titles, and avatar frames.'
    ]},
    { h:'5. Friends', items:[
      'Share your UID (on Profile page) with a friend.',
      'Add a friend using their UID on the <strong>Friends</strong> page.',
      'View their progress and compare against yours.'
    ]}
  ];

  document.getElementById('instructions-body').innerHTML = sections.map(s => `
    <div class="instr-section">
      <h3>${s.h}</h3>
      <ul>${s.items.map(i => `<li>${i}</li>`).join('')}</ul>
    </div>
  `).join('');
}

function closeInstructions(){
  document.getElementById('instructions-modal').classList.add('hidden');
}
document.getElementById('instructions-modal').addEventListener('click', function(e){
  if (e.target === this) closeInstructions();
});

// ═══════════════════════════════════════════════════════════
// ICON
// ═══════════════════════════════════════════════════════════
(function generateIcon(){
  try {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 512;
    const x = c.getContext('2d');

    x.fillStyle = '#07070f';
    x.fillRect(0, 0, 512, 512);

    const grad = x.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, '#c8a84b');
    grad.addColorStop(1, '#f5dfa0');
    x.strokeStyle = grad;
    x.fillStyle = grad;
    x.lineCap = 'round';
    x.lineJoin = 'round';

    // Bar
    x.lineWidth = 22;
    x.beginPath();
    x.moveTo(80, 120); x.lineTo(432, 120); x.stroke();

    // Head
    x.lineWidth = 18;
    x.beginPath();
    x.arc(256, 210, 40, 0, Math.PI * 2); x.stroke();

    // Arms
    x.beginPath();
    x.moveTo(228, 186); x.lineTo(160, 122);
    x.moveTo(284, 186); x.lineTo(352, 122);
    x.stroke();

    // Body
    x.beginPath();
    x.moveTo(256, 250); x.lineTo(256, 380); x.stroke();

    // Legs
    x.beginPath();
    x.moveTo(256, 380); x.lineTo(212, 460);
    x.moveTo(256, 380); x.lineTo(300, 460);
    x.stroke();

    const url = c.toDataURL('image/png');
    document.getElementById('apple-icon').href = url;
    document.getElementById('favicon').href = url;

    const mf = {
      name:'IronPush', short_name:'IronPush', start_url:'.', display:'standalone',
      background_color:'#07070f', theme_color:'#07070f',
      icons:[{src:url, sizes:'512x512', type:'image/png'}]
    };
    const blob = new Blob([JSON.stringify(mf)], { type: 'application/manifest+json' });
    const ml = document.createElement('link');
    ml.rel = 'manifest';
    ml.href = URL.createObjectURL(blob);
    document.head.appendChild(ml);
  } catch(e) { console.warn('Icon gen failed', e); }
})();

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
function escapeHtml(str){
  if (str == null) return '';
  return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'})[m]);
}

// ═══════════════════════════════════════════════════════════
// EXPOSE GLOBALS
// ═══════════════════════════════════════════════════════════
Object.assign(window, {
  authGoogleSignIn, authSignIn, authRegister, resetPassword, signOut,
  go, setLang, t, updateStaticText,
  initAvGrid, selAv, selEditAv, obNext, obBack, obFinish,
  openLog, openDatePick, confirmDp, togSet, updReps, addSet, saveWorkout,
  saveRest, saveRestFromModal, deleteLog, showModal, hideModal, chMo,
  toggleEdit, saveProf, copyUID, handleAvatarUpload,
  adminLoadUser, adminSaveUser, adminClear,
  addFriend, removeFriend, viewFriend, closeFriendView,
  openInventory, closeInventory, renderInventory,
  buyItem, equipItem, renderMenu, IPSaveJournal,
  openInstructions, closeInstructions,
  buyItem, equipItem, renderMenu
});

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  updateStaticText();
  initAvGrid('av-grid', S.selAv, 'selAv');
});

console.log('✅ IronPush loaded — v2.0');
