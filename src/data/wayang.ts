// AUTO-GENERATED FROM SANITY. Edit content via Sanity Studio.
// Run `npm run sanity:sync` to refresh from Sanity.

export type WayangCategory =
  | "pandawa"
  | "kurawa"
  | "punakawan"
  | "dewa-pahlawan";

export type WayangOrigin = "mahabharata" | "ramayana" | "lain";

export type WayangEntry = {
  slug: string;
  name: string;
  alias?: string;
  category: WayangCategory;
  origin: WayangOrigin;
  weapon?: string;
  summary: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
};

export const wayangCategoryLabels: Record<WayangCategory, string> = {
  pandawa: "Pandawa",
  kurawa: "Kurawa",
  punakawan: "Punakawan",
  "dewa-pahlawan": "Dewa & Pahlawan",
};

export const wayangOriginLabels: Record<WayangOrigin, string> = {
  mahabharata: "Mahabharata",
  ramayana: "Ramayana",
  lain: "Lain-lain",
};

export const wayangEntries: WayangEntry[] = [
  {
    slug: "yudistira",
    name: "Yudistira",
    alias: "Puntadewa",
    category: "pandawa",
    origin: "mahabharata",
    weapon: "Pusaka Jamus Kalimasada",
    summary: "Sulung Pandawa, raja Amarta yang adil, jujur, dan tak pernah mengucapkan dusta.",
    description: "Yudistira adalah putra sulung Prabu Pandu Dewanata dan Dewi Kunti. Ia dikenal sebagai sosok ksatria yang lembut, sabar, dan paling adil di antara saudara-saudaranya. Dalam pewayangan Jawa namanya menjadi Puntadewa. Ia memegang pusaka Jamus Kalimasada — kitab suci yang melambangkan kebenaran dan tuntunan hidup. Kelembutannya kerap diuji, terutama saat ia mempertaruhkan kerajaan dan saudaranya dalam permainan dadu melawan Kurawa.",
  },
  {
    slug: "bima",
    name: "Bima",
    alias: "Werkudara / Bratasena",
    category: "pandawa",
    origin: "mahabharata",
    weapon: "Gada Rujakpolo, Kuku Pancanaka",
    summary: "Ksatria perkasa berhati lurus, simbol keberanian dan kesetiaan tanpa basa-basi.",
    description: "Bima adalah putra kedua Pandu dan Kunti, lambang kekuatan dan ketulusan. Tubuhnya tinggi besar, suaranya menggelegar, sikapnya polos namun tegas. Ia hanya tunduk kepada Sang Hyang Tunggal dan tidak pernah menggunakan bahasa krama bahkan kepada dewa. Lakon 'Bima Bungkus' menceritakan kelahirannya yang dibungkus selaput, lalu dirobek oleh Gajah Sena hingga lahirlah ksatria perkasa. Senjata utamanya Gada Rujakpolo dan kuku Pancanaka — kuku ibu jari yang sanggup membelah gunung.",
  },
  {
    slug: "arjuna",
    name: "Arjuna",
    alias: "Janaka / Permadi",
    category: "pandawa",
    origin: "mahabharata",
    weapon: "Panah Pasopati, Keris Kalanadah",
    summary: "Pemanah ulung berparas rupawan, cerdas, dan terus mencari kesempurnaan jiwa.",
    description: "Arjuna, putra ketiga Pandu, dikenal sebagai ksatria paling tampan dan ahli memanah tanpa tanding. Ia murid kesayangan Resi Drona dan kekasih banyak dewi. Dalam Bhagavad Gita, ia menjadi penerima ajaran Krishna di tengah medan Kurusetra. Pasopati, panah pemberian Bathara Siwa, hanya digunakan untuk perkara yang benar-benar suci. Di balik kelembutan dan ketampanannya, Arjuna adalah perenung yang terus menyucikan diri lewat tapa.",
  },
  {
    slug: "nakula",
    name: "Nakula",
    alias: "Pinten",
    category: "pandawa",
    origin: "mahabharata",
    weapon: "Pedang sakti pemberian Indra",
    summary: "Si kembar yang ahli kuda, lemah lembut, dan paling rupawan setelah Arjuna.",
    description: "Nakula adalah putra Dewi Madrim, kembar dengan Sadewa. Ia paling fasih dalam ilmu kuda dan dunia satwa. Wajahnya tampan, hatinya halus, dan ia sangat berbakti kepada kakak-kakaknya. Dalam berbagai lakon, Nakula menjadi penengah yang menjaga keharmonisan keluarga Pandawa. Bersama Sadewa, ia melambangkan kesetiaan adik kepada saudara tua dan kemurnian niat dalam bertindak.",
  },
  {
    slug: "sadewa",
    name: "Sadewa",
    alias: "Tangsen",
    category: "pandawa",
    origin: "mahabharata",
    weapon: "Pedang sakti pemberian Indra",
    summary: "Si kembar yang menguasai kitab dan ilmu falak, bijak melampaui usianya.",
    description: "Sadewa adalah saudara kembar Nakula, putra bungsu Pandawa dari Dewi Madrim. Ia menguasai ilmu astronomi, kitab-kitab kuno, dan paling memahami pertanda alam. Dalam lakon 'Sudamala', Sadewa-lah yang berhasil meruwat Bathari Durga kembali menjadi Dewi Uma. Sosoknya tenang, jarang bicara, namun setiap kata-katanya bobotnya berat. Ia dan Nakula menjadi simbol bahwa kesempurnaan Pandawa lahir dari kesatuan jiwa kembar.",
  },
  {
    slug: "duryudana",
    name: "Duryudana",
    alias: "Suyudana",
    category: "kurawa",
    origin: "mahabharata",
    weapon: "Gada Inten Cumeti",
    summary: "Sulung Kurawa, raja Hastinapura yang ambisius dan keras kepala.",
    description: "Duryudana adalah putra sulung Prabu Destarata dan Dewi Gendari, pemimpin seratus Kurawa. Ia tumbuh dalam iri hati melihat keutamaan Pandawa, didorong oleh paman liciknya, Sengkuni. Ambisinya menguasai Hastinapura akhirnya membawa kerajaannya ke medan Kurusetra. Meski digambarkan sebagai antagonis, Duryudana memiliki sisi ksatria — ia menepati janji, menjamu sahabat dengan tulus, dan gugur di medan perang dengan kepala tegak menghadapi Bima.",
  },
  {
    slug: "sengkuni",
    name: "Sengkuni",
    alias: "Harya Suman",
    category: "kurawa",
    origin: "mahabharata",
    weapon: "Dadu sakti",
    summary: "Patih Hastinapura yang licik, dalang segala intrik melawan Pandawa.",
    description: "Sengkuni adalah paman para Kurawa dari pihak ibu (saudara Dewi Gendari). Ia patih Hastinapura yang dikenal cerdik tapi penuh tipu daya. Dadunya yang tak pernah kalah menjadi alat untuk menjatuhkan Yudistira hingga Pandawa kehilangan kerajaan dan harus menjalani pembuangan. Sengkuni menjadi simbol bahaya nasihat licik yang dibalut kata-kata manis — pelajaran bahwa pemimpin harus pandai memilih siapa yang ia dengar.",
  },
  {
    slug: "semar",
    name: "Semar",
    alias: "Bathara Ismaya",
    category: "punakawan",
    origin: "lain",
    weapon: "Tidak bersenjata, kekuatan dari kebijaksanaan",
    summary: "Penjelmaan dewa yang turun ke dunia menjadi rakyat jelata, simbol kebijaksanaan tertinggi.",
    description: "Semar adalah tokoh khas pewayangan Jawa yang tidak ada dalam epos asli India. Ia sesungguhnya Bathara Ismaya, kakak Bathara Guru, yang menerima kutuk untuk turun ke dunia menjadi Punakawan. Tubuhnya pendek gemuk, namun kebijaksanaannya melampaui para dewa. Ia menjadi pamomong para ksatria utama — terutama Pandawa — dan kerap menyelesaikan persoalan yang tak sanggup dipecahkan oleh dewa-dewi. Semar adalah simbol bahwa rakyat kecil pun dapat menjadi tempat lahirnya kebenaran.",
  },
  {
    slug: "gareng",
    name: "Gareng",
    alias: "Nala Gareng",
    category: "punakawan",
    origin: "lain",
    summary: "Sulung anak Semar, lugu, tubuhnya cacat, namun setia menjaga lakon.",
    description: "Gareng adalah anak sulung Semar dalam tradisi Punakawan Jawa. Tubuhnya pincang, mata juling, dan tangan cacat — semua simbol bahwa manusia yang tidak sempurna pun memiliki tempat dan tugas mulia. Ia jenaka, lugu, dan kerap menjadi obyek lelucon Petruk dan Bagong. Namun di balik kepolosannya, Gareng adalah penjaga adat dan pengingat saudara-saudaranya untuk tidak meninggalkan tata krama.",
  },
  {
    slug: "petruk",
    name: "Petruk",
    alias: "Kanthong Bolong",
    category: "punakawan",
    origin: "lain",
    summary: "Punakawan tinggi langsing yang humoris, pandai bicara, dan suka mengkritik halus.",
    description: "Petruk adalah Punakawan kedua, anak Semar setelah Gareng. Tubuhnya tinggi kurus dengan hidung panjang. Ia paling banyak bicara, paling cepat tertawa, dan paling tajam kritiknya kepada para penguasa. Lakon 'Petruk Dadi Ratu' menceritakan saat ia tanpa sengaja menjadi raja dan justru mengacaukan negeri — pelajaran bahwa setiap orang harus tahu tempatnya. Petruk adalah suara rakyat yang berani namun tetap rendah hati.",
  },
  {
    slug: "bagong",
    name: "Bagong",
    alias: "Bawor",
    category: "punakawan",
    origin: "lain",
    summary: "Si bungsu Punakawan, ceplas-ceplos, paling jujur dan paling mirip Semar.",
    description: "Bagong adalah anak bungsu Semar, lahir dari bayangan sang ayah ketika Semar memohon teman menemani tugasnya momong para ksatria. Tubuhnya pendek gendut menyerupai Semar. Ia ceplas-ceplos tanpa tedeng aling-aling, menjawab pertanyaan dewa pun apa adanya. Justru karena kejujurannya itulah ia kerap menjadi pemecah keraguan. Bagong adalah simbol bahwa kebenaran kadang datang dari mulut yang paling tak terduga.",
  },
  {
    slug: "anoman",
    name: "Anoman",
    alias: "Anjani Putra / Mahesa Sura",
    category: "dewa-pahlawan",
    origin: "ramayana",
    weapon: "Kuku, taring, dan kekuatan angin",
    summary: "Kera putih sakti, putra Bathara Bayu, panglima setia Sri Rama.",
    description: "Anoman adalah kera putih putra Dewi Anjani dan Bathara Bayu, sang dewa angin. Ia berperan sentral dalam Ramayana sebagai panglima yang menyusup ke Alengka untuk mencari Dewi Sinta. Lakon 'Anoman Obong' menceritakan saat ia membakar Alengka dengan ekornya yang dibakar oleh para raksasa. Anoman tidak pernah menua, terus hidup melintasi zaman sebagai pamomong dan saksi sejarah para ksatria. Ia simbol kesetiaan, kepatuhan, dan bakti tanpa pamrih.",
    imageUrl: "https://cdn.sanity.io/images/4tij5rov/production/9c20c1444277bf01887ed28e9fd4cb138f050e84-1493x1920.jpg",
  },
  {
    slug: "sri-krishna",
    name: "Sri Krishna",
    alias: "Bathara Kresna",
    category: "dewa-pahlawan",
    origin: "mahabharata",
    weapon: "Cakra Sudarsana",
    summary: "Titisan Bathara Wisnu, raja Dwarawati, penasihat utama Pandawa.",
    description: "Sri Krishna adalah titisan Bathara Wisnu, sang dewa pemelihara. Sebagai raja Dwarawati, ia menjadi penasehat paling tepercaya bagi Pandawa, terutama Arjuna. Di tengah medan Kurusetra, ia bertindak sebagai sais kereta Arjuna sekaligus guru spiritual yang menurunkan ajaran Bhagavad Gita. Cakra Sudarsana — senjata berbentuk roda berputar — hanya keluar dari tangannya saat ada yang melawan dharma. Dalam pewayangan Jawa, Krishna juga dikenal sebagai negarawan yang bijak dan pencipta strategi paling halus.",
  },
  {
    slug: "bathara-guru",
    name: "Bathara Guru",
    alias: "Sang Hyang Manikmaya",
    category: "dewa-pahlawan",
    origin: "lain",
    weapon: "Trisula, Cakra, Aji Pameling",
    summary: "Raja para dewa di Kahyangan Jonggringsalaka, pemegang tata semesta.",
    description: "Bathara Guru adalah raja para dewa, putra Sang Hyang Tunggal. Ia bersemayam di Kahyangan Jonggringsalaka dan memegang kendali pemerintahan langit. Sosoknya tampan, namun memiliki taring kecil dan kaki yang lemah — pengingat bahwa dewa pun tidak sempurna. Bathara Guru kerap turun tangan dalam permasalahan jagat, meminta bantuan Semar atau Krishna ketika ia sendiri tak sanggup. Ia simbol otoritas yang tetap perlu rendah hati pada hikmah dari bawah.",
  },
  {
    slug: "drupadi",
    name: "Dewi Drupadi",
    alias: "Dewi Krisna",
    category: "dewa-pahlawan",
    origin: "mahabharata",
    summary: "Permaisuri Pandawa, lambang kesetiaan, harga diri, dan kekuatan perempuan.",
    description: "Drupadi adalah putri Prabu Drupada dari Pancalaradya. Ia memenangkan sayembara memanah dan akhirnya menjadi permaisuri Yudistira (dalam tradisi Jawa, hanya Yudistira; dalam tradisi India, kelima Pandawa). Penghinaan yang ia terima di balai Hastinapura ketika hampir ditelanjangi oleh Dursasana menjadi pemicu utama Perang Bharatayuda. Drupadi melambangkan harga diri perempuan yang tak terbeli dan kesetiaan terhadap dharma — meski harus menanggung pembuangan bersama suaminya selama dua belas tahun.",
  },
];
