:: ادخل مجلد public
cd public

:: انشاء المجلدات
mkdir images
mkdir images\ui
mkdir images\gameplay\about
mkdir images\gameplay\pc
mkdir images\gameplay\npc
mkdir images\gameplay\zones
mkdir images\gameplay\esports
mkdir images\gameplay\mobile
mkdir images\gameplay\city
mkdir images\gameplay\community
mkdir images\blockchain\wallet
mkdir images\blockchain\cardano
mkdir images\blockchain\pools
mkdir images\blockchain\token
mkdir images\blockchain\marketplace
mkdir images\blockchain\nfts
mkdir images\company\founders
mkdir images\company\partners
mkdir images\company\tech
mkdir images\company\governance
mkdir images\company\compliance
mkdir images\company\values
mkdir images\docs\game
mkdir images\docs\nodes

:: انشاء ملفات فارغة داخل ui
type nul > images\ui\logo.svg
type nul > images\ui\favicon.ico
type nul > images\ui\og.jpg
type nul > images\ui\sidebar-gameplay.svg
type nul > images\ui\sidebar-blockchain.svg

:: gameplay
type nul > images\gameplay\about\hero.jpg
type nul > images\gameplay\pc\launcher.jpg
type nul > images\gameplay\npc\example.jpg
type nul > images\gameplay\zones\calido-valley.jpg
type nul > images\gameplay\esports\league.jpg
type nul > images\gameplay\mobile\mobile-ui.jpg
type nul > images\gameplay\city\city-life.jpg
type nul > images\gameplay\community\community.jpg

:: blockchain
type nul > images\blockchain\wallet\wallets.jpg
type nul > images\blockchain\cardano\world.jpg
type nul > images\blockchain\pools\copi-pool.jpg
type nul > images\blockchain\pools\copic-pool.jpg
type nul > images\blockchain\token\copi-token.jpg
type nul > images\blockchain\marketplace\market.jpg
type nul > images\blockchain\nfts\collection.jpg

:: company
type nul > images\company\founders\team.jpg
type nul > images\company\partners\partners.jpg
type nul > images\company\tech\stack.jpg
type nul > images\company\governance\dao.jpg
type nul > images\company\compliance\compliance.jpg
type nul > images\company\values\values.jpg

:: docs
type nul > images\docs\game\how-to-play.jpg
type nul > images\docs\nodes\rewards.jpg
