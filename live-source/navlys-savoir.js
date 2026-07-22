/* NAVLYS — LE SAVOIR LOCAL (gravé 2026-07-05, demande de Bruno).
   La Bible condensée, embarquée dans CHAQUE application : les questions
   courantes reçoivent une réponse IMMÉDIATE, sans réseau, dans les 5 langues.
   Ton gravé : simple, gentil, direct — des phrases courtes, comme un ami.
   Le cerveau (assistant) ne prend que les questions hors de ce savoir. */
(function(){
  'use strict';

  var SAVOIR = [
    { mots: ['c est quoi navlys','quest ce que navlys','what is navlys','что такое navlys','מה זה navlys','ما هو navlys','navlys c est quoi'],
      r: { fr: "NAVLYS, c'est ton univers d'applications, simple et humain. Tu entres, tu essaies tout gratuitement — et c'est toi qui commandes. 🌊",
           en: "NAVLYS is your universe of apps — simple and human. You come in, you try everything for free, and you're in command. 🌊",
           ru: "NAVLYS — это твоя вселенная приложений, простая и человечная. Заходи, пробуй всё бесплатно — и командуешь ты. 🌊",
           he: "NAVLYS זה היקום של האפליקציות שלך — פשוט ואנושי. אתה נכנס, מנסה הכול בחינם — ואתה המפקד. 🌊",
           ar: "NAVLYS هو عالم تطبيقاتك — بسيط وإنساني. تدخل وتجرّب كل شيء مجانًا — وأنت من يقود. 🌊" } },
    { mots: ['combien','cotisation','cout','how much','cost','membership','сколько стоит','взнос','כמה עולה','דמי חבר','كم','اشتراك'],
      r: { fr: "Tu testes tout à 0 €. Ensuite, la cotisation démarre à 9,99 € HT par mois — engagement à l'année, débit léger chaque mois. Et −5 % si tu règles l'année d'un coup. 🎁",
           en: "You try everything at €0. Then membership starts at €9.99/month (excl. tax) — yearly commitment, a light charge each month. And −5% if you pay the year at once. 🎁",
           ru: "Ты пробуешь всё за 0 €. Потом членство — от 9,99 € в месяц (без налогов), обязательство на год, лёгкое списание каждый месяц. И −5%, если оплатишь год сразу. 🎁",
           he: "אתה מנסה הכול ב־0 €. אחר כך דמי החבר מתחילים מ־9.99 € לחודש (לפני מע״מ) — התחייבות לשנה, חיוב קל כל חודש. ו־−5% אם משלמים את השנה מראש. 🎁",
           ar: "تجرّب كل شيء بـ 0 €. ثم يبدأ الاشتراك من 9,99 € شهريًا (بدون ضرائب) — التزام سنوي وخصم خفيف كل شهر. و−5% إذا دفعت السنة دفعة واحدة. 🎁" } },
    { mots: ['gratuit','essai','essayer','free trial','try for free','бесплатно','попробовать','חינם','לנסות','مجانا','تجربة'],
      r: { fr: "Oui, tout s'essaie gratuitement, sans carte. Va sur la page Adhésion, mets ton prénom et ton e-mail — et c'est parti.",
           en: "Yes — everything is free to try, no card needed. Go to the Membership page, add your first name and email — and off you go.",
           ru: "Да — всё можно попробовать бесплатно, без карты. Зайди на страницу членства, укажи имя и e-mail — и вперёд.",
           he: "כן — הכול בחינם לניסיון, בלי כרטיס. היכנס לעמוד החברות, כתוב שם ואימייל — וזהו.",
           ar: "نعم — كل شيء مجاني للتجربة، بدون بطاقة. ادخل صفحة العضوية، اكتب اسمك وبريدك — وانطلق." } },
    { mots: ['inscrire','rejoindre','adherer','sign up','join','register','зарегистрироваться','вступить','להירשם','להצטרף','التسجيل','انضم'],
      r: { fr: "C'est tout simple : page Adhésion → ton prénom, ton e-mail → ton accès est créé tout de suite.",
           en: "It's simple: Membership page → your first name, your email → your access is created right away.",
           ru: "Всё просто: страница членства → имя и e-mail → доступ создаётся сразу.",
           he: "פשוט מאוד: עמוד החברות → שם ואימייל → הגישה שלך נוצרת מיד.",
           ar: "الأمر بسيط: صفحة العضوية → اسمك وبريدك → يُفتح لك الوصول فورًا." } },
    { mots: ['quelles applications','les applications','which apps','какие приложения','אילו אפליקציות','ما التطبيقات'],
      r: { fr: "Aujourd'hui : Finance, Next Gen (le livre de ta vie), NAVLEX (repères juridiques), l'Aide à la voix, La Mer. Et ça grandit chaque semaine.",
           en: "Today: Finance, Next Gen (the book of your life), NAVLEX (legal bearings), voice Help, The Sea. And it grows every week.",
           ru: "Сегодня: Финансы, Next Gen (книга твоей жизни), NAVLEX (юридические ориентиры), голосовая Помощь, Море. И каждую неделю — больше.",
           he: "היום: פיננסים, Next Gen (ספר חייך), NAVLEX (עוגנים משפטיים), עזרה קולית, הים. וזה גדל כל שבוע.",
           ar: "اليوم: المالية، Next Gen (كتاب حياتك)، NAVLEX (مرجعك القانوني)، المساعدة الصوتية، البحر. ويكبر كل أسبوع." } },
    { mots: ['conseil financier','investir mon argent','investment advice','что купить','инвестиционный совет','ייעוץ השקעות','نصيحة استثمارية'],
      r: { fr: "NAVLYS, c'est de l'éducation — jamais du conseil personnalisé. Bruno est un simple citoyen : on t'éclaire le chemin, et c'est toi qui tiens la barre. ⚓",
           en: "NAVLYS is education — never personalized advice. Bruno is a simple citizen: we light the path, you hold the helm. ⚓",
           ru: "NAVLYS — это образование, никогда не персональный совет. Бруно — простой гражданин: мы освещаем путь, а штурвал держишь ты. ⚓",
           he: "NAVLYS זה חינוך — לעולם לא ייעוץ אישי. ברונו הוא אזרח פשוט: אנחנו מאירים את הדרך, ואתה מחזיק בהגה. ⚓",
           ar: "NAVLYS تعليم — وليس نصيحة شخصية أبدًا. برونو مواطن عادي: نحن نضيء الطريق، وأنت تمسك الدفة. ⚓" } },
    { mots: ['langues','quelle langue','languages','какие языки','שפות','لغات'],
      r: { fr: "NAVLYS te parle en 15 langues : français, anglais, russe, espagnol, portugais, italien, allemand, néerlandais, wallon, chinois, hindi, bengali, hébreu, arabe et ourdou. Choisis ta langue dans le menu ⚙️.",
           en: "NAVLYS speaks 15 languages: French, English, Russian, Spanish, Portuguese, Italian, German, Dutch, Walloon, Chinese, Hindi, Bengali, Hebrew, Arabic and Urdu. Pick your language in the ⚙️ menu.",
           ru: "NAVLYS говорит на 15 языках: французский, английский, русский, испанский, португальский, итальянский, немецкий, нидерландский, валлонский, китайский, хинди, бенгальский, иврит, арабский и урду. Выбери язык в меню ⚙️.",
           he: "NAVLYS מדבר ב-15 שפות: צרפתית, אנגלית, רוסית, ספרדית, פורטוגזית, איטלקית, גרמנית, הולנדית, ולונית, סינית, הינדי, בנגלית, עברית, ערבית ואורדו. בחר את השפה בתפריט ⚙️.",
           ar: "يتحدث NAVLYS بـ 15 لغة: الفرنسية والإنجليزية والروسية والإسبانية والبرتغالية والإيطالية والألمانية والهولندية والوالونية والصينية والهندية والبنغالية والعبرية والعربية والأردية. اختر لغتك من قائمة ⚙️." } },
    { mots: ['installer','ecran d accueil','install','home screen','установить','на экран','להתקין','מסך הבית','تثبيت','الشاشة الرئيسية'],
      r: { fr: "Ouvre navlys.com sur ton téléphone → Partager → « Sur l'écran d'accueil ». NAVLYS s'installe comme une vraie application. 📲",
           en: "Open navlys.com on your phone → Share → “Add to Home Screen”. NAVLYS installs like a real app. 📲",
           ru: "Открой navlys.com на телефоне → Поделиться → «На экран “Домой”». NAVLYS установится как настоящее приложение. 📲",
           he: "פתח את navlys.com בטלפון → שיתוף → «למסך הבית». NAVLYS מותקן כמו אפליקציה אמיתית. 📲",
           ar: "افتح navlys.com على هاتفك → مشاركة → «إلى الشاشة الرئيسية». يُثبَّت NAVLYS كتطبيق حقيقي. 📲" } },
    { mots: ['coffret','cadeau','offrir','gift box','подарочный','подарок','מתנה','מארז','هدية','باقة هدية'],
      r: { fr: "Les coffrets cadeaux : 1 an offert en package, réglé une fois, prêt à offrir. −20 % pour 1 application, −30 % pour 2, −40 % pour 3. 🎀",
           en: "Gift boxes: 1 year included, paid once, ready to gift. −20% for 1 app, −30% for 2, −40% for 3. 🎀",
           ru: "Подарочные наборы: 1 год в подарок, оплата один раз, готово дарить. −20% за 1 приложение, −30% за 2, −40% за 3. 🎀",
           he: "מארזי מתנה: שנה במתנה, תשלום אחד, מוכן להענקה. ‎−20% על אפליקציה אחת, ‎−30% על שתיים, ‎−40% על שלוש. 🎀",
           ar: "باقات الهدايا: سنة كاملة، تُدفع مرة واحدة، جاهزة للإهداء. −20% لتطبيق واحد، −30% لاثنين، −40% لثلاثة. 🎀" } },
    { mots: ['a vie','integral','lifetime','навсегда','пожизненно','לכל החיים','مدى الحياة'],
      r: { fr: "L'offre à vie, c'est Univers Intégral : 100 % des applications, existantes et futures, pour toujours.",
           en: "The lifetime offer is Univers Intégral: 100% of the apps, existing and future, forever.",
           ru: "Пожизненное предложение — Univers Intégral: 100% приложений, существующих и будущих, навсегда.",
           he: "ההצעה לכל החיים היא Univers Intégral: ‏100% מהאפליקציות, הקיימות והעתידיות, לתמיד.",
           ar: "عرض مدى الحياة هو Univers Intégral: ‏100% من التطبيقات، الحالية والمستقبلية، إلى الأبد." } },
    { mots: ['mes donnees','confidentialite','privee','privacy','my data','мои данные','конфиденциальность','פרטיות','הנתונים שלי','خصوصية','بياناتي'],
      r: { fr: "Tes contenus restent privés et t'appartiennent. Point.",
           en: "Your content stays private and belongs to you. Period.",
           ru: "Твои материалы остаются приватными и принадлежат тебе. Точка.",
           he: "התכנים שלך נשארים פרטיים ושייכים לך. נקודה.",
           ar: "محتواك يبقى خاصًا وملكًا لك. نقطة." } },
    { mots: ['next gen','biographie','livre de ma vie','book of my life','книга моей жизни','ספר חיי','كتاب حياتي'],
      r: { fr: "Next Gen, c'est le livre de ta vie : tu racontes ou tu dictes, on garde tout précieusement. Ton histoire vaut de l'or. 📖",
           en: "Next Gen is the book of your life: you tell it or dictate it, we keep it safe. Your story is worth gold. 📖",
           ru: "Next Gen — это книга твоей жизни: рассказывай или диктуй, мы всё бережно сохраним. Твоя история дорога как золото. 📖",
           he: "Next Gen הוא ספר חייך: אתה מספר או מכתיב, ואנחנו שומרים הכול. הסיפור שלך שווה זהב. 📖",
           ar: "Next Gen هو كتاب حياتك: تحكي أو تُملي، ونحن نحفظ كل شيء. قصتك تساوي ذهبًا. 📖" } },
    { mots: ['bonjour','salut','coucou','hello','hi there','привет','здравствуй','שלום','היי','مرحبا','السلام عليكم'],
      r: { fr: "Bonjour ! Content de te voir. 😊 Que puis-je faire pour toi ?",
           en: "Hello! Glad to see you. 😊 What can I do for you?",
           ru: "Привет! Рад тебя видеть. 😊 Чем помочь?",
           he: "שלום! שמח לראות אותך. 😊 מה אוכל לעשות בשבילך?",
           ar: "مرحبًا! سعيد برؤيتك. 😊 ماذا أفعل لك؟" } },
    { mots: ['merci','thank you','thanks','спасибо','תודה','شكرا'],
      r: { fr: "Avec plaisir ! Je suis là quand tu veux. 🌊",
           en: "My pleasure! I'm here whenever you want. 🌊",
           ru: "С удовольствием! Я здесь, когда захочешь. 🌊",
           he: "בכיף! אני כאן מתי שתרצה. 🌊",
           ar: "بكل سرور! أنا هنا متى شئت. 🌊" } }
  ];

  function normal(s){
    s = String(s || '').toLowerCase();
    try { s = s.normalize('NFD').replace(/[̀-ͯ]/g, ''); } catch (e) {}
    return s.replace(/[’']/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function langDe(texte, lang){
    if (/[֐-׿]/.test(texte)) return 'he';
    if (/[؀-ۿ]/.test(texte)) return 'ar';
    if (/[Ѐ-ӿ]/.test(texte)) return 'ru';
    var l = String(lang || 'fr').slice(0, 2);
    return (l === 'en' || l === 'ru' || l === 'he' || l === 'ar') ? l : 'fr';
  }
  /* le mot-clé LE PLUS LONG gagne (le plus précis) — évite que « bonjour »
     avale « bonjour, combien coûte l'adhésion ? » */
  function cherche(texte, lang){
    var t = ' ' + normal(texte) + ' ';
    var l = langDe(texte, lang);
    var best = null, bestLen = 0, i, j;
    for (i = 0; i < SAVOIR.length; i++) {
      for (j = 0; j < SAVOIR[i].mots.length; j++) {
        var m = normal(SAVOIR[i].mots[j]);
        if (m.length > bestLen && t.indexOf(m) > -1) { best = SAVOIR[i]; bestLen = m.length; }
      }
    }
    return best ? (best.r[l] || best.r.fr) : null;
  }

  window.NAVLYS_SAVOIR = SAVOIR;
  window.NAVLYS_SAVOIR_CHERCHE = cherche;
})();
