// app/components/nav.i18n.ts
// يترجم عناوين السايدبار عند العربية. يعمل مع lib/nav.ts كما هو.
// يدعم الترجمة بال (Title) أولاً، ثم بالمسار (href)، وإلا يرجّع النص الأصلي.

export type Locale = "en" | "ar";

/* ===== 1) ترجمة عناوين الأقسام (Section headers) ===== */
const TR_SECTIONS_AR: Record<string, string> = {
  "Gameplay": "أسلوب اللعب",
  "Blockchain": "البلوكتشين",
  "The Company": "الشركة",
  "Documentation": "التوثيق",
  "Links": "روابط",
};

/* ===== 2) ترجمة مباشرة بالعناوين (Title → Arabic) =====
   غطّيت الأقسام التي ظهرت عندك (Community, COPICafe, Nodes... إلخ)
   وأهم العناصر ضمنها. أي  غير مذكور سيعود للأصل تلقائيًا.
*/
const TR_TITLES_AR: Record<string, string> = {
  // Gameplay (نماذج رئيسية)
  "About the game": "عن اللعبة",
  "Cornucopias Game World": "عالم كورنوكوبياس",
  "Cornucopias Land": "أراضي كورنوكوبياس",
  "Play-and-Earn": "اللعب والربح",
  "Build-and-Earn": "البناء والربح",
  "Learn-and-Earn": "التعلّم والربح",
  "Stake-and-Earn": "التجميع والربح",
  "Host-and-Earn": "الاستضافة والربح",
  "$COPI Tokenomics": "اقتصاد عملة $COPI",
  "Token Economy": "اقتصاد العملة",
  "Reward Distribution": "توزيع المكافآت",
  "In-game Rewards": "مكافآت داخل اللعبة",
  "Token Metrics": "مقاييس العملة",
  "Business Model": "نموذج الأعمال",
  "Road Map": "خارطة الطريق",

  "Gameplay - PC": "أسلوب اللعب - الحاسوب",
  "The Origin Story": "قصة النشأة",
  "User Interface": "واجهة المستخدم",
  "Avatar Creator": "منشئ الشخصية",
  "Avatar Needs System": "نظام احتياجات الشخصية",
  "Crafting": "الصناعة",
  "Inventory": "الجرد",
  "Saving Location": "حفظ الموقع",
  "Clothing": "الملابس",
  "Cloud Gates": "بوابات السحاب",

  "Custom Domes": "القباب المخصّصة",
  "Custom Dome - Standard Templates": "القبة المخصّصة - قوالب قياسية",
  "Custom Dome Template - Project/Company HQ": "قالب قبة - مقر الشركة/المشروع",
  "Custom Dome Template - Nightclub Experience": "قالب قبة - تجربة نادي ليلي",
  "Custom Dome Template - Theatre/Stage - Live Audience Experience": "قالب قبة - مسرح/منصة - جمهور حي",
  "Custom Dome Template - Festival Experience": "قالب قبة - تجربة مهرجان",
  "Custom Dome Template - NFT Art Gallery Experience": "قالب قبة - معرض NFT فني",
  "Custom Dome Template - Global Expo Events": "قالب قبة - فعاليات معرض عالمي",
  "Custom Dome Template - Business Meetings": "قالب قبة - اجتماعات أعمال",
  "Custom Dome Template - Educational Centers": "قالب قبة - مراكز تعليمية",

  "Custom Dome - Game Templates - PVP": "القبة المخصّصة - قوالب ألعاب PvP",
  "Racing - Bubblejett & Javelin": "سباقات - Bubblejett & Javelin",

  "Custom Dome - Building Kits & Gameplay Kits": "القبة المخصّصة - باقات البناء واللعب",
  "Custom Dome - Community Built Asset Marketplace": "القبة المخصّصة - سوق أصول مجتمعية",
  "Custom Dome - Motion Capture/Custom Avatars": "القبة المخصّصة - موشن كابتشر/أفاتار مخصّص",
  "Custom Dome - Rent out your Space": "القبة المخصّصة - تأجير المساحة",
  "Custom Dome - Size your Event": "القبة المخصّصة - قياس الحدث",
  "Custom Dome - Tickets and Merchandise": "القبة المخصّصة - تذاكر وبضائع",
  "Custom Dome - Green Screen": "القبة المخصّصة - شاشة خضراء",
  "Mega Domes": "ميغا دوم",

  "Equipment": "المعدّات",
  "Armor": "الدروع",
  "Melee Weapons": "أسلحة الاشتباك",
  "Ranged Weapons": "أسلحة بعيدة المدى",
  "Swords": "السيوف",
  "Tools": "الأدوات",
  "Friends List": "قائمة الأصدقاء",
  "Guilds": "النقابات",
  "Quest and challenges": "المهمات والتحديات",

  "Resources": "الموارد",
  "Wood": "الخشب",
  "Metal": "المعادن",
  "Rock": "الصخور",
  "Plants": "النباتات",
  "Crops": "المحاصيل",
  "Livestock": "المواشي",
  "Fish": "الأسماك",

  "Seasons": "الفصول",

  "Non-Player Characters": "الشخصيات غير القابلة للعب",
  "NPC - Clyde the Horse": "NPC - كلايد الحصان",
  "NPC - Farmer Joe": "NPC - المزارع جو",
  "NPC - The Old Guard (OG)": "NPC - الحرس القديم (OG)",

  "Themed Zones": "المناطق ذات الطابع",
  "Sectors": "القطاعات",
  "Zone 1 - Solace": "المنطقة 1 - سوليس",
  "Zone 2 - Esperanza": "المنطقة 2 - إيسبيرنزا",
  "Zone 3 - Fortune": "المنطقة 3 - فورتشن",

  "Land Sector - Districts": "قطاع الأراضي - المناطق",
  "District - Land Plots": "منطقة - قطع أراضٍ",
  "Land Plot - Influence Sphere": "قطعة أرض - مجال التأثير",
  "Land Plot - Property Rentals": "قطعة أرض - تأجير العقارات",
  "Property Rentals - Farmhouse": "تأجير عقارات - مزرعة",
  "Property Rentals - Hotels": "تأجير عقارات - فنادق",
  "Land Plot - Utility": "قطعة أرض - خدمات",
  "Buildings, Utility & Vehicles": "مبانٍ وخدمات ومركبات",
  "Building Maintenance": "صيانة المباني",
  "Land Plot - Farming": "قطعة أرض - الزراعة",
  "Farming - Animals": "الزراعة - الحيوانات",
  "Farming - Crops": "الزراعة - المحاصيل",
  "District - Leagues and Leader board": "منطقة - الدوريات ولوحة المتصدرين",
  "District - Merchants": "منطقة - التجّار",
  "District - Season Evolution": "منطقة - تطوّر المواسم",
  "District - Town Hall": "منطقة - دار البلدية",
  "District - Workshops": "منطقة - ورش العمل",
  "Tailors": "الخياطون",
  "Blacksmith": "الحدّاد",
  "Carpenter": "النجّار",
  "Brickworks": "الطوب",
  "Kitchen": "المطبخ",
  "Metalworks": "الحدادة",
  "Tannery": "المدبغة",

  "Transport": "النقل",
  "Flying Vehicles": "المركبات الطائرة",
  "Flying Vehicle - Fuel": "مركبة طائرة - الوقود",
  "Flying Vehicle - Renting": "مركبة طائرة - الاستئجار",
  "Public Transport": "المواصلات العامة",

  "Mega Dome - Calido Valley": "الميغا دوم - وادي كاليدو",
  "Calido Valley Resort": "منتجع كاليدو فالي",
  "Calido Valley Pavilion": "جناح كاليدو فالي",
  "Calido Valley Raceway": "حلبة كاليدو فالي",
  "Calido City": "مدينة كاليدو",

  "Gameplay - eSports Cornucopias Racing League": "أسلوب اللعب - الرياضات الإلكترونية (دوري كورنوكوبياس)",
  "Gameplay - Mobile": "أسلوب اللعب - الموبايل",
  "Game Launcher": "مشغّل اللعبة",
  "City - Life": "حياة المدينة",

  // Community
  "Community": "المجتمع",
  "Blog": "المدونة",
  "COPICafe": "كوبي كافيه",
  "Latest Episodes": "أحدث الحلقات",
  "COPI Q-Wiki": "كوبي Q-ويكي",
  "COPILeaks": "تسريبات كوبي",
  "COPIShop": "متجر كوبي",
  "COPIWatch": "كوبي ووتش",
  "COPIWiki": "كوبي ويكي",
  "Discord": "ديسكورد",
  "Corn Points": "نقاط الذرة",
  "Dev Shorts": "ملخصات المطوّرين",
  "Social Media": "وسائل التواصل الاجتماعي",
  "Video Specials": "فيديوهات خاصة",
  "Live Streams": "بثوث مباشرة",

  "Cornucopias Universe": "كون كورنوكوبياس",
  "Short Recap of COPICafe Latest Episodes": "ملخّص قصير لأحدث حلقات كوبي كافيه",
  "Short Recap of COPICafe Episodes 110 - 119": "ملخّص قصير لحلقات 110–119",
  "Short Recap of COPICafe Episodes 100 - 109": "ملخّص قصير لحلقات 100–109",
  "Short Recap of COPICafe 90 - 99": "ملخّص قصير لحلقات 90–99",
  "Short Recap of COPICafe 80 - 89": "ملخّص قصير لحلقات 80–89",
  "Short Recap of COPICafe 70 - 79": "ملخّص قصير لحلقات 70–79",
  "Short Recap of COPICafe 60 - 68": "ملخّص قصير لحلقات 60–68",
  "Short Recap of COPICafe 50 - 56": "ملخّص قصير لحلقات 50–56",

  "COPICafe Video to Text Summaries": "تفريغ فيديوهات كوبي كافيه إلى نصوص",

  "Status Updates": "تحديثات الحالة",
  "Status Updates - 2024": "تحديثات 2024",
  "January 2024": "يناير 2024",
  "Status Updates - 2023": "تحديثات 2023",
  "December 2023": "ديسمبر 2023",
  "November 2023": "نوفمبر 2023",
  "October 2023": "أكتوبر 2023",
  "September 2023": "سبتمبر 2023",
  "August 2023": "أغسطس 2023",
  "July 2023": "يوليو 2023",
  "June 2023": "يونيو 2023",
  "May 2023": "مايو 2023",
  "April 2023": "أبريل 2023",
  "March 2023": "مارس 2023",
  "February 2023": "فبراير 2023",
  "January 2023": "يناير 2023",
  "Status Updates - 2022": "تحديثات 2022",
  "December 2022": "ديسمبر 2022",
  "November 2022": "نوفمبر 2022",
  "Cardano Summit 2022": "قمة كاردانو 2022",
  "Crypto A.M. Summit and Awards 2022": "قمة وجوائز كريبتو A.M. 2022",
  "October 2022": "أكتوبر 2022",
  "cNFTCon 2022": "مؤتمر cNFT 2022",
  "RareBloom 2022": "ريـربلوم 2022",
  "Web3Expo 2022": "ويب3 إكسبو 2022",
  "September 2022": "سبتمبر 2022",
  "August 2022": "أغسطس 2022",
  "July 2022": "يوليو 2022",
  "June 2022": "يونيو 2022",
  "Consensus 2022": "كونسينسَس 2022",
  "Manchester Workshops 2022": "ورش مانشستر 2022",
  "May 2022": "مايو 2022",
  "April 2022": "أبريل 2022",
  "March 2022": "مارس 2022",

  // Blockchain
  "Blockchain": "البلوكتشين",
  "Blockchain Wallet": "محفظة البلوكتشين",
  "Cardano World": "عالم كاردانو",
  "COPI Stake Pool": "تجمّع $COPI",
  "COPIC Stake Pool": "تجمّع $COPIC",
  "Cornucopias Token - $COPI": "عملة كورنوكوبياس - $COPI",
  "Cryptocurrency Exchanges": "منصّات تداول العملات",
  "CEX - Centralized Exchange": "منصة مركزية (CEX)",
  "DEX - Decentralized Exchange": "منصة لامركزية (DEX)",
  "Marketplace": "السوق",
  "Cross Chain NFTs": "NFTs عبر الشبكات",
  "NFTs": "رموز غير قابلة للاستبدال (NFTs)",

  // Company
  "COMPLIANCE": "الامتثال",
  "LEGALS": "الشؤون القانونية",
  "COPIWiki - Language and Dictionaries": "لغة وقواميس COPIWiki",
  "Players Safety": "سلامة اللاعبين",
  "Founders": "المؤسسون",
  "Governance": "الحوكمة",
  "Partners": "الشركاء",
  "Partner Network": "شبكة الشركاء",
  "Partners - Blockchain": "شركاء - بلوكتشين",
  "Blockchain Wallets": "محافظ البلوكتشين",
  "GeroWallet": "جيرو والت",
  "Dega": "ديغا",
  "DripDropz": "درب دروبز",
  "Grow Your Stake": "نمِّ حصتك",
  "Influencers": "المؤثرون",
  "Cardano Chats": "أحاديث كاردانو",
  "Cheeky Crypto": "شيكي كريبتو",
  "Crypto Crow": "كريبتو كرو",
  "Launchpads": "منصات الإطلاق",
  "Partners - Learn-and-Earn": "شركاء - تعلّم واربح",
  "European Business University (EBU)": "جامعة الأعمال الأوروبية (EBU)",
  "Partners - Metaverse": "شركاء - ميتافيرس",
  "Netwrk": "نتورك",
  "Veritree": "فاري تري",
  "Partners - Strategic / Technology": "شركاء - استراتيجي/تقني",
  "ChainPort": "تشين بورت",
  "Cudos": "كودوس",
  "Derp Birds": "ديرب بيردز",
  "Singularity": "سنغيولاريتي",
  "Tingo": "تينغو",

  "Technology": "التقنية",
  "Agile Methodology": "منهجية أجايل",
  "APIs": "واجهات برمجة التطبيقات",
  "COPI Nodes": "عُقد COPI",
  "COPI File Node": "عقدة ملفات COPI",
  "COPI Game Node": "عقدة لعبة COPI",
  "COPI Data Node": "عقدة بيانات COPI",
  "Cross Chain Technology": "تقنيات عبر السلاسل",
  "BASE Chain": "سلسلة BASE",
  "Cardano Blockchain": "بلوكتشين كاردانو",
  "Game Devices": "أجهزة اللعب",
  "PC Desktop": "حاسوب مكتبي",
  "Public Testing": "اختبارات عامة",
  "Mobile Phone Devices": "هواتف محمولة",
  "Mobile Tablet Devices": "أجهزة لوحية",
  "Games Consoles": "أجهزة ألعاب",
  "Smart TV": "تلفاز ذكي",
  "Microsoft .Net Framework": "إطار عمل .NET من مايكروسوفت",
  "Unreal Engine 5 (UE5)": "أنريل إنجن 5 (UE5)",
  "Visions and Values": "الرؤية والقيم",

  // Documentation
  "Game": "اللعبة",
  "Video Settings": "إعدادات الفيديو",
  "Nodes": "العُقد",
  "Guide: How to Set Up a File Node Pool": "دليل: كيفية إعداد تجمّع عقد ملفات",
  "Introduction": "مقدمة",
  "Pool Server Setup": "إعداد خادم التجمّع",
  "Updating and Verifying Pool Server": "تحديث والتحقق من الخادم",
  "Managing Pool Server": "إدارة خادم التجمّع",
  "Node Rewards": "مكافآت العقد",
  "Public Pools": "تجمّعات عامة",
  "Public Pools Dashboard": "لوحة التجمّعات العامة",
  "Node Delegation": "تفويض العقد",

  // Links
  "Cornucopias Link Tree ↗": "شجرة روابط كورنوكوبياس ↗",
  "Cornucopias Website ↗": "موقع كورنوكوبياس ↗",
};

/* ===== 3) قواعد نمطية (Regex) لعناوين متكررة ===== */
type Rule = { re: RegExp; repl: (m: RegExpMatchArray) => string };
const RULES_AR: Rule[] = [
  { re: /^Gameplay - PC$/i, repl: () => "أسلوب اللعب - الحاسوب" },
  { re: /^Gameplay - Mobile$/i, repl: () => "أسلوب اللعب - الموبايل" },
  { re: /^Custom Dome - (.+)$/i, repl: (m) => `القبة المخصّصة - ${m[1]}` },
  { re: /^Custom Dome Template - (.+)$/i, repl: (m) => `قالب قبة - ${m[1]}` },
  { re: /^District - (.+)$/i, repl: (m) => `منطقة - ${m[1]}` },
  { re: /^Land Plot - (.+)$/i, repl: (m) => `قطعة أرض - ${m[1]}` },
  { re: /^Farming - (.+)$/i, repl: (m) => `الزراعة - ${m[1]}` },
  { re: /^NFT - (.+)$/i, repl: (m) => `NFT - ${m[1]}` }, // نترك NFT كما هي
];

/* ===== 4) ترجمة حسب المسار (href) عندما يلزم ===== */
export function stripLocalePrefix(href: string) {
  return href.replace(/^\/(ar|en)(?=\/|$)/, "");
}

const TR_HREFS_AR: Record<string, string> = {
  // مثال: مسارات خاصة تحتاج اسم عربي مختلف أو ثابت
  "/game/themed-zones/transport/flying-vehicles": "المركبات الطائرة",
  "/game/themed-zones/transport/public-transport": "المواصلات العامة",
};

/* ===== 5) دوال الترجمة العامة ===== */
export function tSection(locale: Locale, englishTitle: string) {
  if (locale !== "ar") return englishTitle;
  return TR_SECTIONS_AR[englishTitle] ?? englishTitle;
}

/** ترجمة  عنصر. تمرير title و href من عنصر الـ nav */
export function tItem(locale: Locale, href: string, title: string) {
  if (locale !== "ar") return title;

  // 1) حسب ال مباشرة
  const byTitle = TR_TITLES_AR[title];
  if (byTitle) return byTitle;

  // 2) القواعد النمطية
  for (const r of RULES_AR) {
    const m = title.match(r.re);
    if (m) return r.repl(m);
  }

  // 3) حسب المسار (بدون /ar أو /en)
  const key = stripLocalePrefix(href);
  const byHref = TR_HREFS_AR[key];
  if (byHref) return byHref;

  // 4) الافتراضي: ال كما هو
  return title;
}
