import { Locale } from "./i18n";

// Leaf: a single nav item
// Branch: a nav item that may contain children
// Section: a top-level section with an icon and items

type Leaf = { title: string; href: string };
type Branch = Leaf & { children?: (Leaf | Branch)[] };
type Section = { title: string; icon: string; items: (Leaf | Branch)[] };

export function getNav(locale: Locale): Section[] {
  const P = (p: string) => `/${locale}${p}`;

  return [
    // ========== GAMEPLAY ==========
    {
      title: "Gameplay",
      icon: "🎮",
      items: [
        {
          title: "About the game",
          href: P("/game/about-the-game"),
          children: [
            { title: "Artwork", href: P("/game/about-the-game/artwork") },
            { title: "Cornucopias Game World", href: P("/game/about-the-game/world") },
            { title: "Cornucopias Land", href: P("/game/about-the-game/land") },
            { title: "Play-and-Earn", href: P("/game/about-the-game/play-and-earn") },
            { title: "Build-and-Earn", href: P("/game/about-the-game/build-and-earn") },
            { title: "Learn-and-Earn", href: P("/game/about-the-game/learn-and-earn") },
            { title: "Stake-and-Earn", href: P("/game/about-the-game/stake-and-earn") },
            { title: "Host-and-Earn", href: P("/game/about-the-game/host-and-earn") },
            {
              title: "$COPI Tokenomics",
              href: P("/game/about-the-game/copi-tokenomics"),
              children: [
                {
                  title: "Token Economy",
                  href: P("/game/about-the-game/copi-tokenomics/token-economy"),
                  children: [
                    {
                      title: "Reward Distribution",
                      href: P("/game/about-the-game/copi-tokenomics/token-economy/reward-distribution"),
                    },
                    {
                      title: "In-game Rewards",
                      href: P("/game/about-the-game/copi-tokenomics/token-economy/in-game-rewards"),
                    },
                  ],
                },
                { title: "Token Metrics", href: P("/game/about-the-game/copi-tokenomics/token-metrics") },
                { title: "Business Model", href: P("/game/about-the-game/copi-tokenomics/business-model") },
              ],
            },
            { title: "Road Map", href: P("/game/about-the-game/road-map") },
          ],
        },

        {
          title: "Gameplay - PC",
          href: P("/game/pc"),
          children: [
            { title: "The Origin Story", href: P("/game/pc/origin-story") },
            {
              title: "User Interface",
              href: P("/game/pc/user-interface"),
              children: [
                { title: "Avatar Creator", href: P("/game/pc/user-interface/avatar-creator") },
                { title: "Avatar Needs System", href: P("/game/pc/user-interface/avatar-needs-system") },
                { title: "Crafting", href: P("/game/pc/user-interface/crafting") },
                { title: "Inventory", href: P("/game/pc/user-interface/inventory") },
                { title: "Saving Location", href: P("/game/pc/user-interface/saving-location") },
              ],
            },
            { title: "Clothing", href: P("/game/pc/clothing") },
            { title: "Cloud Gates", href: P("/game/pc/cloud-gates") },
            {
              title: "Custom Domes",
              href: P("/game/pc/custom-domes"),
              children: [
                {
                  title: "Custom Dome - Standard Templates",
                  href: P("/game/pc/custom-domes/standard-templates"),
                  children: [
                    {
                      title: "Custom Dome Template - Project/Company HQ",
                      href: P("/game/pc/custom-domes/standard-templates/project-company-hq"),
                    },
                    {
                      title: "Custom Dome Template - Nightclub Experience",
                      href: P("/game/pc/custom-domes/standard-templates/nightclub-experience"),
                    },
                    {
                      title: "Custom Dome Template - Theatre/Stage - Live Audience Experience",
                      href: P("/game/pc/custom-domes/standard-templates/theatre-stage-live-audience"),
                    },
                    {
                      title: "Custom Dome Template - Festival Experience",
                      href: P("/game/pc/custom-domes/standard-templates/festival-experience"),
                    },
                    {
                      title: "Custom Dome Template - NFT Art Gallery Experience",
                      href: P("/game/pc/custom-domes/standard-templates/nft-art-gallery"),
                    },
                    {
                      title: "Custom Dome Template - Global Expo Events",
                      href: P("/game/pc/custom-domes/standard-templates/global-expo-events"),
                    },
                    {
                      title: "Custom Dome Template - Business Meetings",
                      href: P("/game/pc/custom-domes/standard-templates/business-meetings"),
                    },
                    {
                      title: "Custom Dome Template - Educational Centers",
                      href: P("/game/pc/custom-domes/standard-templates/educational-centers"),
                    },
                  ],
                },
                {
                  title: "Custom Dome - Game Templates - PVP",
                  href: P("/game/pc/custom-domes/game-templates-pvp"),
                  children: [
                    {
                      title: "Racing - Bubblejett & Javelin",
                      href: P("/game/pc/custom-domes/game-templates-pvp/racing-bubblejett-javelin"),
                    },
                  ],
                },
                {
                  title: "Custom Dome - Building Kits & Gameplay Kits",
                  href: P("/game/pc/custom-domes/building-gameplay-kits"),
                },
                {
                  title: "Custom Dome - Community Built Asset Marketplace",
                  href: P("/game/pc/custom-domes/community-asset-marketplace"),
                },
                {
                  title: "Custom Dome - Motion Capture/Custom Avatars",
                  href: P("/game/pc/custom-domes/motion-capture-custom-avatars"),
                },
                {
                  title: "Custom Dome - Rent out your Space",
                  href: P("/game/pc/custom-domes/rent-out-your-space"),
                },
                { title: "Custom Dome - Size your Event", href: P("/game/pc/custom-domes/size-your-event") },
                { title: "Custom Dome - Tickets and Merchandise", href: P("/game/pc/custom-domes/tickets-and-merchandise") },
                { title: "Custom Dome - Green Screen", href: P("/game/pc/custom-domes/green-screen") },
                { title: "Mega Domes", href: P("/game/pc/custom-domes/mega-domes") },
              ],
            },
            {
              title: "Equipment",
              href: P("/game/pc/equipment"),
              children: [
                { title: "Armor", href: P("/game/pc/equipment/armor") },
                { title: "Melee Weapons", href: P("/game/pc/equipment/melee-weapons") },
                { title: "Ranged Weapons", href: P("/game/pc/equipment/ranged-weapons") },
                { title: "Swords", href: P("/game/pc/equipment/swords") },
                { title: "Tools", href: P("/game/pc/equipment/tools") },
              ],
            },
            { title: "Friends List", href: P("/game/pc/friends-list") },
            { title: "Guilds", href: P("/game/pc/guilds") },
            { title: "Quest and challenges", href: P("/game/pc/quests-challenges") },
            {
              title: "Resources",
              href: P("/game/pc/resources"),
              children: [
                { title: "Wood", href: P("/game/pc/resources/wood") },
                { title: "Metal", href: P("/game/pc/resources/metal") },
                { title: "Rock", href: P("/game/pc/resources/rock") },
                { title: "Plants", href: P("/game/pc/resources/plants") },
                { title: "Crops", href: P("/game/pc/resources/crops") },
                { title: "Livestock", href: P("/game/pc/resources/livestock") },
                { title: "Fish", href: P("/game/pc/resources/fish") },
              ],
            },
            { title: "Seasons", href: P("/game/pc/seasons") },
          ],
        },

        {
          title: "Non-Player Characters",
          href: P("/game/npc"),
          children: [
            { title: 'NPC - Abigale Nelson', href: P("/game/npc/abigale-nelson") },
            { title: 'NPC - Alfonso "Carl" Rosso', href: P("/game/npc/alfonso-carl-rosso") },
            { title: "NPC - Clyde the Horse", href: P("/game/npc/clyde-the-horse") },
            { title: "NPC - Farmer Joe", href: P("/game/npc/farmer-joe") },
            { title: "NPC - The Old Guard (OG)", href: P("/game/npc/the-old-guard") },
          ],
        },

        {
          title: "Themed Zones",
          href: P("/game/themed-zones"),
          children: [
            {
              title: "Sectors",
              href: P("/game/themed-zones/sectors"),
              children: [
                { title: "Zone 1 - Solace", href: P("/game/themed-zones/sectors/zone-1-solace") },
                { title: "Zone 2 - Esperanza", href: P("/game/themed-zones/sectors/zone-2-esperanza") },
                { title: "Zone 3 - Fortune", href: P("/game/themed-zones/sectors/zone-3-fortune") },
                {
                  title: "Land Sector - Districts",
                  href: P("/game/themed-zones/sectors/land-sector-districts"),
                  children: [
                    {
                      title: "District - Land Plots",
                      href: P("/game/themed-zones/sectors/land-sector-districts/land-plots"),
                      children: [
                        {
                          title: "Land Plot - Influence Sphere",
                          href: P("/game/themed-zones/sectors/land-sector-districts/land-plots/influence-sphere"),
                        },
                        {
                          title: "Land Plot - Property Rentals",
                          href: P("/game/themed-zones/sectors/land-sector-districts/land-plots/property-rentals"),
                          children: [
                            {
                              title: "Property Rentals - Farmhouse",
                              href: P("/game/themed-zones/sectors/land-sector-districts/land-plots/property-rentals/farmhouse"),
                            },
                            {
                              title: "Property Rentals - Hotels",
                              href: P("/game/themed-zones/sectors/land-sector-districts/land-plots/property-rentals/hotels"),
                            },
                          ],
                        },
                        {
                          title: "Land Plot - Utility",
                          href: P("/game/themed-zones/sectors/land-sector-districts/land-plots/utility"),
                          children: [
                            {
                              title: "Buildings, Utility & Vehicles",
                              href: P("/game/themed-zones/sectors/land-sector-districts/land-plots/utility/buildings-utility-vehicles"),
                              children: [
                                {
                                  title: "Building Maintenance",
                                  href: P("/game/themed-zones/sectors/land-sector-districts/land-plots/utility/buildings-utility-vehicles/building-maintenance"),
                                },
                              ],
                            },
                            {
                              title: "Land Plot - Farming",
                              href: P("/game/themed-zones/sectors/land-sector-districts/land-plots/farming"),
                              children: [
                                {
                                  title: "Farming - Animals",
                                  href: P("/game/themed-zones/sectors/land-sector-districts/land-plots/farming/animals"),
                                },
                                {
                                  title: "Farming - Crops",
                                  href: P("/game/themed-zones/sectors/land-sector-districts/land-plots/farming/crops"),
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: "District - Leagues and Leader board",
                      href: P("/game/themed-zones/sectors/land-sector-districts/leagues-leaderboard"),
                    },
                    {
                      title: "District - Merchants",
                      href: P("/game/themed-zones/sectors/land-sector-districts/merchants"),
                    },
                    {
                      title: "District - Season Evolution",
                      href: P("/game/themed-zones/sectors/land-sector-districts/season-evolution"),
                    },
                    {
                      title: "District - Town Hall",
                      href: P("/game/themed-zones/sectors/land-sector-districts/town-hall"),
                    },
                    {
                      title: "District - Workshops",
                      href: P("/game/themed-zones/sectors/land-sector-districts/workshops"),
                      children: [
                        { title: "Tailors", href: P("/game/themed-zones/sectors/land-sector-districts/workshops/tailors") },
                        { title: "Blacksmith", href: P("/game/themed-zones/sectors/land-sector-districts/workshops/blacksmith") },
                        { title: "Carpenter", href: P("/game/themed-zones/sectors/land-sector-districts/workshops/carpenter") },
                        { title: "Brickworks", href: P("/game/themed-zones/sectors/land-sector-districts/workshops/brickworks") },
                        { title: "Kitchen", href: P("/game/themed-zones/sectors/land-sector-districts/workshops/kitchen") },
                        { title: "Metalworks", href: P("/game/themed-zones/sectors/land-sector-districts/workshops/metalworks") },
                        { title: "Tannery", href: P("/game/themed-zones/sectors/land-sector-districts/workshops/tannery") },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: "Transport",
              href: P("/game/themed-zones/transport"),
              children: [
                {
                  title: "Flying Vehicles",
                  href: P("/game/themed-zones/transport/flying-vehicles"),
                  children: [
                    { title: "Flying Vehicle - Fuel", href: P("/game/themed-zones/transport/flying-vehicles/fuel") },
                    { title: "Flying Vehicle - Renting", href: P("/game/themed-zones/transport/flying-vehicles/renting") },
                  ],
                },
                { title: "Public Transport", href: P("/game/themed-zones/transport/public-transport") },
              ],
            },
          ],
        },

        {
          title: "Mega Dome - Calido Valley",
          href: P("/game/calido-valley"),
          children: [
            {
              title: "Calido Valley Resort",
              href: P("/game/calido-valley/resort"),
              children: [
                { title: "Calido Valley Pavilion", href: P("/game/calido-valley/resort/pavilion") },
                { title: "Calido Valley Raceway", href: P("/game/calido-valley/resort/raceway") },
              ],
            },
            { title: "Calido City", href: P("/game/calido-valley/calido-city") },
          ],
        },

        { title: "Gameplay - eSports Cornucopias Racing League", href: P("/game/esports-cornucopias-racing-league") },
        { title: "Gameplay - Mobile", href: P("/game/mobile") },
        { title: "Game Launcher", href: P("/game/launcher") },
        { title: "City - Life", href: P("/game/city-life") },

        // ===== COMMUNITY (ضمن Gameplay كما طلبت الحفاظ على كل شيء) =====
        {
          title: "Community",
          href: P("/community"),
          children: [
            { title: "Blog", href: P("/community/blog") },
            {
              title: "COPICafe",
              href: P("/community/copicafe"),
              children: [
                { title: "Latest Episodes", href: P("/community/copicafe/latest") },
                { title: "Episodes 120 - 129", href: P("/community/copicafe/ep-120-129") },
                { title: "Episodes 110 - 119", href: P("/community/copicafe/ep-110-119") },
                { title: "Episodes 100 - 109", href: P("/community/copicafe/ep-100-109") },
                { title: "Episodes 90 - 99", href: P("/community/copicafe/ep-90-99") },
                { title: "Episodes 80 - 89", href: P("/community/copicafe/ep-80-89") },
                { title: "Episodes 70 - 79", href: P("/community/copicafe/ep-70-79") },
                { title: "Episodes 60 - 69", href: P("/community/copicafe/ep-60-69") },
                { title: "Episodes 50 - 59", href: P("/community/copicafe/ep-50-59") },
                { title: "Episodes 40 - 49", href: P("/community/copicafe/ep-40-49") },
                { title: "Episodes 30 - 39", href: P("/community/copicafe/ep-30-39") },
                { title: "Episodes 20 - 29", href: P("/community/copicafe/ep-20-29") },
                { title: "Episodes 10 - 19", href: P("/community/copicafe/ep-10-19") },
                { title: "Episodes 1 - 9", href: P("/community/copicafe/ep-1-9") },
                {
                  title: "Cornucopias Universe",
                  href: P("/community/copicafe/cornucopias-universe"),
                  children: [
                    {
                      title: "Short Recap of COPICafe Latest Episodes",
                      href: P("/community/copicafe/cornucopias-universe/latest-recap"),
                    },
                    {
                      title: "Short Recap of COPICafe Episodes 110 - 119",
                      href: P("/community/copicafe/cornucopias-universe/ep-110-119-recap"),
                    },
                    {
                      title: "Short Recap of COPICafe Episodes 100 - 109",
                      href: P("/community/copicafe/cornucopias-universe/ep-100-109-recap"),
                    },
                    { title: "Short Recap of COPICafe 90 - 99", href: P("/community/copicafe/cornucopias-universe/ep-90-99-recap") },
                    { title: "Short Recap of COPICafe 80 - 89", href: P("/community/copicafe/cornucopias-universe/ep-80-89-recap") },
                    { title: "Short Recap of COPICafe 70 - 79", href: P("/community/copicafe/cornucopias-universe/ep-70-79-recap") },
                    { title: "Short Recap of COPICafe 60 - 68", href: P("/community/copicafe/cornucopias-universe/ep-60-68-recap") },
                    { title: "Short Recap of COPICafe 50 - 56", href: P("/community/copicafe/cornucopias-universe/ep-50-56-recap") },
                  ],
                },
                {
                  title: "COPICafe Video to Text Summaries",
                  href: P("/community/copicafe/summaries"),
                  children: [
                    { title: "Episode 138 - Quantum Artistry", href: P("/community/copicafe/summaries/ep-138") },
                    { title: "Episode 137 - Game Director Download", href: P("/community/copicafe/summaries/ep-137") },
                    { title: "Episode 136 - New Heights", href: P("/community/copicafe/summaries/ep-136") },
                    { title: "Episode 135 - Elevated Spaces", href: P("/community/copicafe/summaries/ep-135") },
                    { title: "Episode 134 - Next Level Building", href: P("/community/copicafe/summaries/ep-134") },
                    { title: "Episode 133 - Land Unlocked", href: P("/community/copicafe/summaries/ep-133") },
                    { title: "Episode 132 - Live + Loaded", href: P("/community/copicafe/summaries/ep-132") },
                    { title: "Episode 131 - Coming of Age", href: P("/community/copicafe/summaries/ep-131") },
                    { title: "Episode 130 - Ground Breaking", href: P("/community/copicafe/summaries/ep-130") },
                    { title: "Episode 129 - The Elysian", href: P("/community/copicafe/summaries/ep-129") },
                    { title: "Episode 128 - Property Rights", href: P("/community/copicafe/summaries/ep-128") },
                    { title: "Episode 127 - Unreal Development", href: P("/community/copicafe/summaries/ep-127") },
                    { title: "Episode 126 - Huge Miner Update", href: P("/community/copicafe/summaries/ep-126") },
                    { title: "Episode 125 - Rift Awakening", href: P("/community/copicafe/summaries/ep-125") },
                    { title: "Episode 124 - Dig. Decorate. Dominate", href: P("/community/copicafe/summaries/ep-124") },
                    { title: "Episode 123 - Welcome to the Gun Show", href: P("/community/copicafe/summaries/ep-123") },
                    { title: "Episode 122 - Pet Friendly", href: P("/community/copicafe/summaries/ep-122") },
                    { title: "Episode 121 - Alpha Drop", href: P("/community/copicafe/summaries/ep-121") },
                    { title: "Episode 120 - A Night at the Museum", href: P("/community/copicafe/summaries/ep-120") },
                    { title: "Episode 119 - Crafting Gameplay", href: P("/community/copicafe/summaries/ep-119") },
                    { title: "Episode 118 - Guns N' Ammo", href: P("/community/copicafe/summaries/ep-118") },
                    { title: "Episode 117 - Unreal 5.5.1 Upgrade", href: P("/community/copicafe/summaries/ep-117") },
                    { title: "Episode 116 - Happy New Year", href: P("/community/copicafe/summaries/ep-116") },
                    { title: "Episode 115 - Aero Trails", href: P("/community/copicafe/summaries/ep-115") },
                    { title: "Episode 114 - Copiobar", href: P("/community/copicafe/summaries/ep-114") },
                    { title: "Episode 113 - Happy Thanksgiving", href: P("/community/copicafe/summaries/ep-113") },
                    { title: "Episode 112 - Super Nodes", href: P("/community/copicafe/summaries/ep-112") },
                    { title: "Episode 111 - Size Matters", href: P("/community/copicafe/summaries/ep-111") },
                    { title: "Episode 110 - Rocket Man", href: P("/community/copicafe/summaries/ep-110") },
                    { title: "Episode 109 - A Glimpse of Fear", href: P("/community/copicafe/summaries/ep-109") },
                    { title: "Episode 108 - Quantum Jen", href: P("/community/copicafe/summaries/ep-108") },
                    { title: "Episode 107 - The Game Economist", href: P("/community/copicafe/summaries/ep-107") },
                    { title: "Episode 106 - Limited Edition", href: P("/community/copicafe/summaries/ep-106") },
                    { title: "Episode 105 - Scrapyard Special", href: P("/community/copicafe/summaries/ep-105") },
                    { title: "Episode 104 - Creative Fast Track", href: P("/community/copicafe/summaries/ep-104") },
                    { title: "Episode 103 - Retail is Coming", href: P("/community/copicafe/summaries/ep-103") },
                    { title: "Episode 102 - Enter the Multiverse", href: P("/community/copicafe/summaries/ep-102") },
                    { title: "Episode 101 - Wingman", href: P("/community/copicafe/summaries/ep-101") },
                    { title: "Episode 100 - RareEvo Centenary Special", href: P("/community/copicafe/summaries/ep-100") },
                    { title: "Episode 99 - Next Stop… Solace!", href: P("/community/copicafe/summaries/ep-99") },
                    { title: "Episode 98 - DEcentralized GAming", href: P("/community/copicafe/summaries/ep-98") },
                    { title: "Episode 97 - Ready Player Corn", href: P("/community/copicafe/summaries/ep-97") },
                    { title: "Episode 96 - Quantum Leak!", href: P("/community/copicafe/summaries/ep-96") },
                    { title: "Episode 95 - Sink Holes!", href: P("/community/copicafe/summaries/ep-95") },
                    { title: "Episode 94 - Live Nodes!", href: P("/community/copicafe/summaries/ep-94") },
                    { title: "Episode 93 - Consensus 2024 Special", href: P("/community/copicafe/summaries/ep-93") },
                    { title: "Episode 92 - Taking the Lead", href: P("/community/copicafe/summaries/ep-92") },
                    { title: "Episode 91 - Solace Revealed", href: P("/community/copicafe/summaries/ep-91") },
                    { title: "Episode 90 - Node Mastermind", href: P("/community/copicafe/summaries/ep-90") },
                  ],
                },
              ],
            },

            { title: "COPI Q-Wiki", href: P("/community/copi-q-wiki") },
            { title: "COPILeaks", href: P("/community/copileaks") },
            { title: "COPIShop", href: P("/community/copishop") },
            { title: "COPIWatch", href: P("/community/copiwatch") },
            { title: "COPIWiki", href: P("/community/copiwiki") },

            {
              title: "Discord",
              href: P("/community/discord"),
              children: [{ title: "Corn Points", href: P("/community/discord/corn-points") }],
            },

            { title: "Dev Shorts", href: P("/community/dev-shorts") },
            { title: "Social Media", href: P("/community/social-media") },

            {
              title: "Video Specials",
              href: P("/community/video-specials"),
              children: [{ title: "Live Streams", href: P("/community/video-specials/live-streams") }],
            },

            {
              title: "Status Updates",
              href: P("/community/status-updates"),
              children: [
                {
                  title: "Status Updates - 2024",
                  href: P("/community/status-updates/2024"),
                  children: [{ title: "January 2024", href: P("/community/status-updates/2024/january") }],
                },
                {
                  title: "Status Updates - 2023",
                  href: P("/community/status-updates/2023"),
                  children: [
                    { title: "December 2023", href: P("/community/status-updates/2023/december") },
                    { title: "November 2023", href: P("/community/status-updates/2023/november") },
                    { title: "October 2023", href: P("/community/status-updates/2023/october") },
                    { title: "September 2023", href: P("/community/status-updates/2023/september") },
                    { title: "August 2023", href: P("/community/status-updates/2023/august") },
                    { title: "July 2023", href: P("/community/status-updates/2023/july") },
                    { title: "June 2023", href: P("/community/status-updates/2023/june") },
                    { title: "May 2023", href: P("/community/status-updates/2023/may") },
                    { title: "April 2023", href: P("/community/status-updates/2023/april") },
                    { title: "March 2023", href: P("/community/status-updates/2023/march") },
                    { title: "February 2023", href: P("/community/status-updates/2023/february") },
                    { title: "January 2023", href: P("/community/status-updates/2023/january") },
                  ],
                },
                { 
  title: "Status Updates - 2022", 
  href: P("/community/status-updates/2022"),
  children: [
    { title: "December 2022", href: P("/community/status-updates/2022/december") },
    { title: "November 2022", href: P("/community/status-updates/2022/november"),
      children: [
        { title: "Cardano Summit 2022", href: P("/community/status-updates/2022/november/cardano-summit") },
        { title: "Crypto A.M. Summit and Awards 2022", href: P("/community/status-updates/2022/november/crypto-am-summit") }
      ]
    },
    { title: "October 2022", href: P("/community/status-updates/2022/october"),
      children: [
        { title: "cNFTCon 2022", href: P("/community/status-updates/2022/october/cnftcon") },
        { title: "RareBloom 2022", href: P("/community/status-updates/2022/october/rarebloom") },
        { title: "Web3Expo 2022", href: P("/community/status-updates/2022/october/web3expo") }
      ]
    },
    { title: "September 2022", href: P("/community/status-updates/2022/september") },
    { title: "August 2022", href: P("/community/status-updates/2022/august") },
    { title: "July 2022", href: P("/community/status-updates/2022/july") },
    { title: "June 2022", href: P("/community/status-updates/2022/june"),
      children: [
        { title: "Consensus 2022", href: P("/community/status-updates/2022/june/consensus") },
        { title: "Manchester Workshops 2022", href: P("/community/status-updates/2022/june/manchester-workshops") }
      ]
    },
    { title: "May 2022", href: P("/community/status-updates/2022/may") },
    { title: "April 2022", href: P("/community/status-updates/2022/april") },
    { title: "March 2022", href: P("/community/status-updates/2022/march") }
  ]
}
,
              ],
            },
          ],
        },
      ],
    },

    // ========== BLOCKCHAIN ==========
    {
      title: "Blockchain",
      icon: "🌐",
      items: [
        { title: "Blockchain Wallet", href: P("/blockchain/wallet") },
        { title: "Cardano World", href: P("/blockchain/cardano-world") },
        { title: "COPI Stake Pool", href: P("/blockchain/copi-stake-pool") },
        { title: "COPIC Stake Pool", href: P("/blockchain/copic-stake-pool") },
        {
          title: "Cornucopias Token - $COPI",
          href: P("/blockchain/token-copi"),
          children: [
            {
              title: "Cryptocurrency Exchanges",
              href: P("/blockchain/token-copi/exchanges"),
              children: [
                {
                  title: "CEX - Centralized Exchange",
                  href: P("/blockchain/token-copi/exchanges/cex"),
                  
                },
                {
                  title: "DEX - Decentralized Exchange",
                  href: P("/blockchain/token-copi/exchanges/dex"),
                
                },
              ],
            },
          ],
        },
        {
          title: "Marketplace",
          href: P("/blockchain/marketplace"),
          children: [{ title: "Cross Chain NFTs", href: P("/blockchain/marketplace/cross-chain-nfts") }],
        },
        {
          title: "NFTs",
          href: P("/blockchain/nfts"),
          children: [
            {
              title: "NFT - Apparel",
              href: P("/blockchain/nfts/apparel"),
              children: [
                { title: "Cheeky Racer Suit", href: P("/blockchain/nfts/apparel/cheeky-racer-suit") },
                { title: "Quantum Jack Helmet", href: P("/blockchain/nfts/apparel/quantum-jack-helmet") },
                { title: "Burger Barn Deluxe #1 Hat", href: P("/blockchain/nfts/apparel/burger-barn-deluxe-hat") },
              ],
            },
            { title: "NFT - Bobblehead Series", href: P("/blockchain/nfts/bobblehead-series") },
            { title: "NFT - Custom Domes", href: P("/blockchain/nfts/custom-domes") },
            { title: "NFT - File Node Access Key", href: P("/blockchain/nfts/file-node-access-key") },
            {
  title: "NFT - Flying Vehicles",
  href: P("/blockchain/nfts/flying-vehicles"),
  children: [
    {
      title: "Atmos",
      href: P("/blockchain/nfts/flying-vehicles/atmos"),
      children: [
        { title: "Atmos Juggernaut 2024", href: P("/blockchain/nfts/flying-vehicles/atmos/juggernaut-2024") },
      ],
    },
    {
      title: "Bubblejett",
      href: P("/blockchain/nfts/flying-vehicles/bubblejett"),
      children: [
        { title: "Bubblejett Bonanza OG Custom 2023", href: P("/blockchain/nfts/flying-vehicles/bubblejett/bonanza-og-2023") },
        { title: "Bubblejett Sprinter 2022", href: P("/blockchain/nfts/flying-vehicles/bubblejett/sprinter-2022") },
        { title: "Bubblejett Sprinter OG Custom 2022", href: P("/blockchain/nfts/flying-vehicles/bubblejett/sprinter-og-2022") },
        { title: "Bubblejett Super Phantom 2024", href: P("/blockchain/nfts/flying-vehicles/bubblejett/super-phantom-2024") },
      ],
    },
    {
      title: "Core Dynamics",
      href: P("/blockchain/nfts/flying-vehicles/core-dynamics"),
      children: [
        { title: "Core Dynamics Astro IV", href: P("/blockchain/nfts/flying-vehicles/core-dynamics/astro-iv") },
      ],
    },
    {
      title: "Genesis",
      href: P("/blockchain/nfts/flying-vehicles/genesis"),
    },
    {
      title: "GTi",
      href: P("/blockchain/nfts/flying-vehicles/gti"),
      children: [
        { title: "GTi Javelin 2022", href: P("/blockchain/nfts/flying-vehicles/gti/javelin-2022") },
        { title: "$1m NFT Giveaway", href: P("/blockchain/nfts/flying-vehicles/gti/1m-nft-giveaway") },
      ],
    },
    {
      title: "Spirra",
      href: P("/blockchain/nfts/flying-vehicles/spirra"),
    },
    {
      title: "Valkyrie",
      href: P("/blockchain/nfts/flying-vehicles/valkyrie"),
      children: [
        { title: "Valkyrie F9-R", href: P("/blockchain/nfts/flying-vehicles/valkyrie/f9-r") },
      ],
    },
    {
      title: "Valley Raceworx",
      href: P("/blockchain/nfts/flying-vehicles/valley-raceworx"),
      children: [
        { title: "Valley Raceworx T1", href: P("/blockchain/nfts/flying-vehicles/valley-raceworx/t1") },
        { title: "Valley Raceworx T3", href: P("/blockchain/nfts/flying-vehicles/valley-raceworx/t3") },
      ],
    },
    {
      title: "Rando's Metalworks - Vehicles",
      href: P("/blockchain/nfts/flying-vehicles/randos-metalworks-vehicles"),
      children: [
        { title: "Rando's Metalworks Sunset Speeder 2024", href: P("/blockchain/nfts/flying-vehicles/randos-metalworks-vehicles/sunset-speeder-2024") },
      ],
    },
  ],
}
,
            {
              title: "NFT - NFT2Tree Series",
              href: P("/blockchain/nfts/nft2tree-series"),
              children: [
                { title: "NFT2Tree Series 1", href: P("/blockchain/nfts/nft2tree-series/series-1") },
                { title: "NFT2Tree Series 2", href: P("/blockchain/nfts/nft2tree-series/series-2") },
                { title: "NFT2Tree Series 3", href: P("/blockchain/nfts/nft2tree-series/series-3") },
              ],
            },
            {
  title: "NFT - Packs",
  href: P("/blockchain/nfts/packs"),
  children: [
    {
      title: "Blackhorn",
      href: P("/blockchain/nfts/packs/blackhorn"),
      children: [
        { title: "Blackhorn - Tactical Outlander Desert Backpack", href: P("/blockchain/nfts/packs/blackhorn/tactical-outlander-desert-backpack") },
        { title: "Blackhorn - Tactical Outlander Woodland Backpack", href: P("/blockchain/nfts/packs/blackhorn/tactical-outlander-woodland-backpack") },
        { title: "Blackhorn - Tactical Overlander Backpack", href: P("/blockchain/nfts/packs/blackhorn/tactical-overlander-backpack") },
        { title: "Luna Di Lusso - Selene Backpack", href: P("/blockchain/nfts/packs/blackhorn/luna-di-lusso-selene-backpack") },
      ],
    },
    {
      title: "Corn Cutties",
      href: P("/blockchain/nfts/packs/corn-cutties"),
      children: [
        { title: "Corn Cutties - Grizzly Brown Brawler Backpack", href: P("/blockchain/nfts/packs/corn-cutties/grizzly-brown-brawler-backpack") },
        { title: "Corn Cutties - Grizzly Purple Fury Backpack", href: P("/blockchain/nfts/packs/corn-cutties/grizzly-purple-fury-backpack") },
        { title: "Corn Cutties - Orange Prowler Backpack", href: P("/blockchain/nfts/packs/corn-cutties/orange-prowler-backpack") },
      ],
    },
    {
      title: "Kargo Outfitters",
      href: P("/blockchain/nfts/packs/kargo-outfitters"),
      children: [
        { title: "Kargo Outfitters - Titan XL Backpack", href: P("/blockchain/nfts/packs/kargo-outfitters/titan-xl-backpack") },
      ],
    },
    {
      title: "Zero G",
      href: P("/blockchain/nfts/packs/zero-g"),
      children: [
        { title: "Zero G - Stratos Jetpack", href: P("/blockchain/nfts/packs/zero-g/stratos-jetpack") },
        { title: "Zero G - Stratos Solace Explorer Special Edition Jetpack", href: P("/blockchain/nfts/packs/zero-g/stratos-solace-explorer-special-edition-jetpack") },
      ],
    },
    {
      title: "Rando's Metalworks - Jetpacks",
      href: P("/blockchain/nfts/packs/randos-metalworks-jetpacks"),
      children: [
        { title: "Rando's Metalworks - Junkerjet Jetpack", href: P("/blockchain/nfts/packs/randos-metalworks-jetpacks/junkerjet-jetpack") },
      ],
    },
    {
      title: "GTi - Jetpacks",
      href: P("/blockchain/nfts/packs/gti-jetpacks"),
      children: [
        { title: "GTi - Rampage 2XS OG Custom Jetpack", href: P("/blockchain/nfts/packs/gti-jetpacks/rampage-2xs-og-custom-jetpack") },
      ],
    },
  ],
}
,
            {
  title: "NFT - Themed Zones 1-3",
  href: P("/blockchain/nfts/themed-zones-1-3"),
  children: [
    { title: "NFT - Seasonal Tenant Key", href: P("/blockchain/nfts/themed-zones-1-3/seasonal-tenant-key") },
  ],
}
,
            {
  title: "NFT - Weapons",
  href: P("/blockchain/nfts/weapons"),
  children: [
    {
      title: "Rando's Metalworks - Weapons",
      href: P("/blockchain/nfts/weapons/randos-metalworks"),
      children: [
        {
          title: "Rando's Metalworks - Meat Grinder",
          href: P("/blockchain/nfts/weapons/randos-metalworks/meat-grinder"),
        },
      ],
    },
  ],
}
,
          ],
        },
      ],
    },

    // ========== THE COMPANY ==========
    {
      title: "The Company",
      icon: "👥🤝",
      items: [
        {
          title: "COMPLIANCE",
          href: P("/company/compliance"),
          children: [
            { title: "LEGALS", href: P("/company/compliance/legals") },
            { title: "COPIWiki - Language and Dictionaries", href: P("/company/compliance/copi-language") },
            { title: "Players Safety", href: P("/company/compliance/players-safety") },
          ],
        },
        { title: "Founders", href: P("/company/founders") },
        { title: "Governance", href: P("/company/governance") },
        {
          title: "Partners",
          href: P("/company/partners"),
          children: [
            { title: "Partner Network", href: P("/company/partners/network") },
            {
              title: "Partners - Blockchain",
              href: P("/company/partners/blockchain"),
              children: [
                {
                  title: "Blockchain Wallets",
                  href: P("/company/partners/blockchain/wallets"),
                  children: [{ title: "GeroWallet", href: P("/company/partners/blockchain/wallets/gerowallet") }],
                },
                { title: "Dega", href: P("/company/partners/blockchain/dega") },
                { title: "DripDropz", href: P("/company/partners/blockchain/dripdropz") },
                { title: "Grow Your Stake", href: P("/company/partners/blockchain/grow-your-stake") },
                {
                  title: "Influencers",
                  href: P("/company/partners/blockchain/influencers"),
                  children: [
                    { title: "Cardano Chats", href: P("/company/partners/blockchain/influencers/cardano-chats") },
                    { title: "Cheeky Crypto", href: P("/company/partners/blockchain/influencers/cheeky-crypto") },
                    { title: "Crypto Crow", href: P("/company/partners/blockchain/influencers/crypto-crow") },
                  ],
                },
                { title: "Launchpads", href: P("/company/partners/blockchain/launchpads") },
              ],
            },
            {
              title: "Partners - Learn-and-Earn",
              href: P("/company/partners/learn-and-earn"),
              children: [{ title: "European Business University (EBU)", href: P("/company/partners/learn-and-earn/ebu") }],
            },
            {
              title: "Partners - Metaverse",
              href: P("/company/partners/metaverse"),
              children: [
                { title: "Netwrk", href: P("/company/partners/metaverse/netwrk") },
                { title: "Veritree", href: P("/company/partners/metaverse/veritree") },
              ],
            },
            {
              title: "Partners - Strategic / Technology",
              href: P("/company/partners/strategic-technology"),
              children: [
                { title: "ChainPort", href: P("/company/partners/strategic-technology/chainport") },
                { title: "Cudos", href: P("/company/partners/strategic-technology/cudos") },
                { title: "Derp Birds", href: P("/company/partners/strategic-technology/derp-birds") },
                { title: "Singularity", href: P("/company/partners/strategic-technology/singularity") },
                { title: "Tingo", href: P("/company/partners/strategic-technology/tingo") },
              ],
            },
          ],
        },
        {
          title: "Technology",
          href: P("/company/technology"),
          children: [
            { title: "Agile Methodology", href: P("/company/technology/agile-methodology") },
            { title: "APIs", href: P("/company/technology/apis") },
            {
              title: "COPI Nodes",
              href: P("/company/technology/copi-nodes"),
              children: [
                { title: "COPI File Node", href: P("/company/technology/copi-nodes/file-node") },
                { title: "COPI Game Node", href: P("/company/technology/copi-nodes/game-node") },
                { title: "COPI Data Node", href: P("/company/technology/copi-nodes/data-node") },
              ],
            },
            {
              title: "Cross Chain Technology",
              href: P("/company/technology/cross-chain-technology"),
              children: [
                { title: "BASE Chain", href: P("/company/technology/cross-chain-technology/base") },
                { title: "Cardano Blockchain", href: P("/company/technology/cross-chain-technology/cardano") },
              ],
            },
            {
              title: "Game Devices",
              href: P("/company/technology/game-devices"),
              children: [
                {
  title: "PC Desktop",
  href: P("/company/technology/game-devices/pc-desktop"),
  children: [
    {
      title: "Public Testing",
      href: P("/company/technology/game-devices/pc-desktop/public-testing")
    }
  ]
}
,
                { title: "Mobile Phone Devices", href: P("/company/technology/game-devices/mobile-phones") },
                { title: "Mobile Tablet Devices", href: P("/company/technology/game-devices/mobile-tablets") },
                { title: "Games Consoles", href: P("/company/technology/game-devices/consoles") },
                { title: "Smart TV", href: P("/company/technology/game-devices/smart-tv") },
              ],
            },
            { title: "Microsoft .Net Framework", href: P("/company/technology/dotnet-framework") },
            { title: "Unreal Engine 5 (UE5)", href: P("/company/technology/unreal-engine-5") },
          ],
        },
        { title: "Visions and Values", href: P("/company/visions-and-values") },
      ],
    },

    // ========== DOCUMENTATION ==========
    {
      title: "Documentation",
      icon: "📖",
      items: [
        {
          title: "Game",
          href: P("/docs/game"),
          children: [{ title: "Video Settings", href: P("/docs/game/video-settings") }],
        },
        {
          title: "Nodes",
          href: P("/docs/nodes"),
          children: [
            {
              title: "Guide: How to Set Up a File Node Pool",
              href: P("/docs/nodes/guide-file-node-pool"),
              children: [
                { title: "Introduction", href: P("/docs/nodes/guide-file-node-pool/introduction") },
                { title: "Pool Server Setup", href: P("/docs/nodes/guide-file-node-pool/pool-server-setup") },
                { title: "Updating and Verifying Pool Server", href: P("/docs/nodes/guide-file-node-pool/update-verify-server") },
                { title: "Managing Pool Server", href: P("/docs/nodes/guide-file-node-pool/manage-server") },
                { title: "Node Rewards", href: P("/docs/nodes/guide-file-node-pool/node-rewards") },
                { title: "Public Pools", href: P("/docs/nodes/guide-file-node-pool/public-pools") },
              ],
            },
            { title: "Public Pools Dashboard", href: P("/docs/nodes/public-pools-dashboard") },
            { title: "Node Delegation", href: P("/docs/nodes/node-delegation") },
          ],
        },
      ],
    },

    // ========== LINKS ==========
    {
      title: "Links",
      icon: "🔗",
      items: [
        { title: "Cornucopias Link Tree ↗", href: "https://linktr.ee/cornucopiasgame" },
        { title: "Cornucopias Website ↗", href: "https://cornucopias.io" },
      ],
    },
  ];
}
