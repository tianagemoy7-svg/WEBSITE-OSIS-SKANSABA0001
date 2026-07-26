const SANDI_ADMIN = "osisskansaba2026";
const NOMOR_KAMIL = "6283186723104";
const NOMOR_SALMA = "6285954571414";

let tahanMulai = null;
let sedangDitahan = false;

// ✅ Teks sambutan
let teksBerjalan = [
    ["OSIS SKANSABA", "Sangat Luar Biasa!"],
    ["SMK NEGERI 1 BANYUPUTIH", "Ramah, Kreatif, Berprestasi!"],
    ["Satu Hati Satu Tujuan", "Kita Bisa, Kita Hebat!"],
    ["Selamat Datang Rekan Belajar", "Siap Melangkah Bersama Kami!"],
    ["OSIS Selalu Ada Untukmu", "Siap Membantu Sepenuh Hati!"],
    ["Selamat Datang di Website OSIS", ""]
];

// ✅ Pertanyaan Robot
let daftarSoalRobot = [
    ["Di SMKN 1 Banyuputih Menggunakan Sepatu Apa?", "Sepatu Hitam"],
    ["Kaos Kaki Harus Warna Apa?", "Senin-Kamis [ Putih Polos ], Jum'At [ Hitam Polos ]"],
    ["Istigosah Biasanya Dibacakan Jam Berapa?", "Jam 06:30 Pagi"],
    ["Apakah Siswa Boleh Pakai Sandal?", "Dilarang Keras, Kecuali kaki cidera/Luka Parah"],
    ["Lihat Teman Dibully Harus Bagaimana?", "Tidak boleh ikut serta! Wajib melapor kepada Guru atau Satpam"],
    ["Apakah Sholat Duhur Berjamaah Di Absen?", "Iya!, Sholat Duhur Berjamaah Diabsen"]
];

// ==============================================
// ✅ KONEKSI DATABASE FIREBASE
// ==============================================
const FIREBASE_CONFIG = {
    databaseURL: "https://web-osis-e7fee-default-rtdb.firebaseio.com/"
};

// ==============================================
// FUNGSI UTAMA TEKAN LAMA & OPENING 20 DETIK
// ==============================================
const tombol = document.getElementById('tombolMasuk');
const lingkaran = document.getElementById('lingkaranMuat');

tombol.addEventListener('mousedown', mulaiTahan);
tombol.addEventListener('touchstart', function(e){e.preventDefault(); mulaiTahan();});
document.addEventListener('mouseup', lepasTahan);
document.addEventListener('touchend', lepasTahan);

function mulaiTahan(){
    sedangDitahan = true;
    lingkaran.style.transition = 'stroke-dashoffset 5s linear';
    lingkaran.style.strokeDashoffset = '0';
    
    tahanMulai = setTimeout(function(){
        if(sedangDitahan){
            bukaOpening();
        }
    }, 5000);
}

function lepasTahan(){
    sedangDitahan = false;
    clearTimeout(tahanMulai);
    lingkaran.style.transition = 'all 0.2s ease';
    lingkaran.style.strokeDashoffset = '345.6';
}

function bukaOpening(){
    sembunyikanSemua();
    document.getElementById('layarOpening').classList.remove('sembunyi');
    
    let urutan = 0;
    const gantiTeks = setInterval(() => {
        if(urutan < teksBerjalan.length){
            document.getElementById('teksOpening').innerText = teksBerjalan[urutan][0];
            document.getElementById('subOpening').innerText = teksBerjalan[urutan][1];
            urutan++;
        }
    }, 3200);

    setTimeout(() => {
        clearInterval(gantiTeks);
        sembunyikanSemua();
        document.getElementById('halamanMenu').classList.remove('sembunyi');
    }, 20000);
}

// ==============================================
// FUNGSI BANTUAN UMUM
// ==============================================
function sembunyikanSemua(){
    document.querySelectorAll('.layar-penuh').forEach(el => el.classList.add('sembunyi'));
}
function kembaliKeAwal(){
    sembunyikanSemua();
    document.getElementById('halamanAwal').classList.remove('sembunyi');
    lingkaran.style.strokeDashoffset = '345.6';
}
function kembaliKeMenu(){
    sembunyikanSemua();
    document.getElementById('halamanMenu').classList.remove('sembunyi');
}

// ==============================================
// NAVIGASI MENU
// ==============================================
function tampilkanSosmed(){sembunyikanSemua();document.getElementById('halamanSosmed').classList.remove('sembunyi');}
function tampilkanMenuPengumuman(){sembunyikanSemua();document.getElementById('halamanPengumuman').classList.remove('sembunyi');}
function tampilkanGaleri(){sembunyikanSemua();document.getElementById('halamanGaleri').classList.remove('sembunyi');}
function tampilkanMusik(){sembunyikanSemua();document.getElementById('halamanMusik').classList.remove('sembunyi');}
function tampilkanRobot(){sembunyikanSemua();document.getElementById('halamanRobot').classList.remove('sembunyi');document.getElementById('kotakJawabRobot').classList.add('sembunyi');}
function tampilkanDaftarOsis(){sembunyikanSemua();document.getElementById('halamanDaftarOsis').classList.remove('sembunyi');}
function tampilkanRegistrasiLomba(){sembunyikanSemua();document.getElementById('halamanLomba').classList.remove('sembunyi');}
function tampilkanLapor(){sembunyikanSemua();document.getElementById('halamanLapor').classList.remove('sembunyi');}
function tampilkanMenuBaru(){sembunyikanSemua();document.getElementById('halamanHartaKarun').classList.remove('sembunyi');}
function tampilkanSejarah(){sembunyikanSemua();document.getElementById('halamanSejarah').classList.remove('sembunyi');}

// ==============================================
// FUNGSI TANYA JAWAB ROBOT
// ==============================================
function tanyaJawab(nomor){
    document.getElementById('teksJawabRobot').innerText = daftarSoalRobot[nomor][1];
    document.getElementById('kotakJawabRobot').classList.remove('sembunyi');
}

// ==============================================
// PENDAFTARAN OSIS & LAPORAN
// ==============================================
function kirimDaftarOsis(){
    let nama = document.getElementById('namaDaftar').value;
    let kelas = document.getElementById('kelasDaftar').value;
    let pilih = document.querySelector('input[name="tujuan"]:checked').value;
    
    if(!nama || !kelas){alert('Lengkapi dulu isiannya ya Kak!');return;}
    
    let isi = `Halo Kak! Saya mau daftar OSIS%0ANama: ${nama}%0AKelas: ${kelas}`;
    window.open(`https://wa.me/${pilih}?text=${isi}`,'_blank');
}

function kirimLapor(){
    let nama = document.getElementById('namaLapor').value;
    let kelas = document.getElementById('kelasLapor').value;
    let isi = document.getElementById('isiLapor').value;
    
    if(!nama || !kelas || !isi){alert('Lengkapi dulu semua isian ya Kak!');return;}
    
    let pesan = `LAPORAN / SARAN%0ANama: ${nama}%0AKelas: ${kelas}%0AIsi: ${isi}`;
    window.open(`https://wa.me/${NOMOR_KAMIL}?text=${pesan}`,'_blank');
}

// ==============================================
// ✅ SISTEM PENGUMUMAN FIREBASE
// ==============================================
function loginAdminPengumuman(){sembunyikanSemua();document.getElementById('halamanAdminPengumuman').classList.remove('sembunyi');}
function cekPassPengumuman(){
    let sandi = document.getElementById('passPengumuman').value;
    if(sandi === SANDI_ADMIN){
        sembunyikanSemua();
        document.getElementById('halamanBuatPengumuman').classList.remove('sembunyi');
    }else{alert('Kata sandi salah!');}
}

async function simpanPengumuman(){
    let teks = document.getElementById('isiPengumuman').value;
    if(!teks){alert('Tulis dulu pengumumannya!');return;}
    
    await fetch(FIREBASE_CONFIG.databaseURL + "/pengumuman.json", {
        method: "POST",
        body: JSON.stringify({isi:teks, waktu:Date.now()})
    });
    
    document.getElementById('isiPengumuman').value='';
    alert('✅ Berhasil! Langsung terlihat semua orang');
}

async function tampilDaftarPengumumanAdmin(){
    let res = await fetch(FIREBASE_CONFIG.databaseURL + "/pengumuman.json");
    let data = await res.json() || {};
    let wadah = document.getElementById('daftarPengumumanAdmin');
    wadah.innerHTML = '<h4 style="color:#0a2463;margin:8px 0;">Daftar Pengumuman:</h4>';
    
    Object.entries(data).forEach(([id, item]) => {
        let lewat = Math.floor((Date.now() - item.waktu) / (1000 * 60 * 60 * 24));
        if(lewat >=7){hapusPengumuman(id);return;}
        wadah.innerHTML += `
        <div class="kotak-pengumuman">
            <div class="teks-pengumuman">${item.isi}</div>
            <div class="info-bawah">
                <span>${lewat==0?'Hari ini':lewat+' hari lalu'}</span>
                <button class="btn-kirim" style="padding:5px 8px;font-size:12px;" onclick="hapusPengumuman('${id}')">Hapus</button>
            </div>
        </div>`;
    });
}

async function lihatPengumuman(){
    sembunyikanSemua();document.getElementById('halamanLihatPengumuman').classList.remove('sembunyi');
    let res = await fetch(FIREBASE_CONFIG.databaseURL + "/pengumuman.json");
    let data = await res.json() || {};
    let wadah = document.getElementById('daftarPengumuman');
    wadah.innerHTML='';
    
    if(Object.keys(data).length===0){
        wadah.innerHTML='<p style="text-align:center;color:white">Belum ada pengumuman</p>';return;
    }
    
    Object.entries(data).forEach(([id, item]) => {
        let lewat = Math.floor((Date.now() - item.waktu) / (1000 * 60 * 60 * 24));
        if(lewat >=7) return;
        wadah.innerHTML += `
        <div class="kotak-pengumuman">
            <div class="teks-pengumuman">${item.isi}</div>
            <div class="info-bawah">
                <span>${lewat==0?'Hari ini':lewat+' hari lalu'}</span>
                <button class="tombol-suka" onclick="tambahSuka(this)">❤️ Suka</button>
            </div>
        </div>`;
    });
}

async function hapusPengumuman(id){
    await fetch(`${FIREBASE_CONFIG.databaseURL}/pengumuman/${id}.json`, {method:"DELETE"});
    tampilDaftarPengumumanAdmin();
    alert('Berhasil dihapus!');
}
function tambahSuka(el){el.classList.add('sudah');el.innerText='❤️ Disukai';}

// ==============================================
// ✅ SISTEM MEMBURU HARTA KARUN SUDAH DIPERBARUI PENUH
// ==============================================
function loginAdminHarta(){sembunyikanSemua();document.getElementById('halamanAdminHarta').classList.remove('sembunyi');}
function cekPassHarta(){
    let sandi = document.getElementById('passHarta').value;
    if(sandi === SANDI_ADMIN){
        sembunyikanSemua();
        document.getElementById('halamanBuatHarta').classList.remove('sembunyi');
        tampilDaftarHartaAdmin();
    }else{alert('Kata sandi salah!');}
}

async function cekStatusPemenang(){
    const res = await fetch(FIREBASE_CONFIG.databaseURL + "/statusmenang.json");
    const status = await res.json();
    return status || {ada_pemenang: false, id_pemenang: null};
}

async function simpanHarta(){
    let soal = document.getElementById('soalHarta').value;
    let jawab = document.getElementById('jawabHarta').value.trim().toLowerCase();
    if(!soal || !jawab){alert('Lengkapi dulu isiannya!');return;}

    const status = await cekStatusPemenang();
    if(status.ada_pemenang){
        alert('⚠️ Permainan sudah selesai! Hapus semua soal lama dulu untuk membuat babak baru.');
        return;
    }
    
    await fetch(FIREBASE_CONFIG.databaseURL + "/hartakarun.json", {
        method: "POST",
        body: JSON.stringify({soal:soal, jawab:jawab})
    });
    
    document.getElementById('soalHarta').value='';
    document.getElementById('jawabHarta').value='';
    alert('✅ Berhasil ditambahkan!');
    tampilDaftarHartaAdmin();
}

async function tampilDaftarHartaAdmin(){
    let res = await fetch(FIREBASE_CONFIG.databaseURL + "/hartakarun.json");
    let data = await res.json() || {};
    let wadah = document.getElementById('daftarHartaAdmin');
    wadah.innerHTML = '<h4 style="color:#0a2463;margin:8px 0;">Daftar Petunjuk:</h4>';
    
    Object.entries(data).forEach(([id, item]) => {
        wadah.innerHTML += `
        <div class="form-kotak" style="padding:10px;">
            <p style="font-weight:bold;">${item.soal}</p>
            <p style="font-size:13px;">Jawab: ${item.jawab}</p>
            <button class="btn-kirim" style="padding:5px;font-size:12px;" onclick="hapusHarta('${id}')">Hapus</button>
        </div>`;
    });
}

async function lihatHarta(){
    sembunyikanSemua();document.getElementById('halamanLihatHarta').classList.remove('sembunyi');
    
    const status = await cekStatusPemenang();
    const idSiswa = localStorage.getItem('idSiswa') || 'user-'+Math.random().toString(36).substr(2,9);
    localStorage.setItem('idSiswa', idSiswa);
    let sudahJawab = JSON.parse(localStorage.getItem('sudahJawab')) || [];
    let skorBenar = sudahJawab.length;

    // JIKA SUDAH ADA PEMENANG
    if(status.ada_pemenang){
        document.getElementById('halamanLihatHarta').innerHTML = `
        <div style="text-align:center;padding:30px;color:white;">
            <h2>🎉 PERMAINAN SUDAH SELESAI 🎉</h2>
            <p style="margin:15px 0;">Selamat sudah ada yang berhasil mengumpulkan 6 jawaban benar!</p>
            <p>Permainan akan dibuka kembali jika Kakak OSIS sudah membuat soal yang baru.</p>
            <button class="btn-kirim btn-ungu mt-4" onclick="kembaliKeMenu()">Kembali ke Menu</button>
        </div>`;
        return;
    }

    // JIKA DIRINYA SENDIRI YANG SUDAH MENANG
    if(localStorage.getItem('saya_sudah_menang') === 'ya'){
        document.getElementById('halamanLihatHarta').innerHTML = `
        <div style="text-align:center;padding:30px;color:white;">
            <h2>✅ ANDA SUDAH MENANG!</h2>
            <p style="margin:15px 0;">Silakan datang untuk mengambil hadiah kepada Kakak OSIS KAMIL</p>
            <p>Anda tidak dapat menjawab lagi untuk permainan kali ini.</p>
            <button class="btn-kirim btn-ungu mt-4" onclick="kembaliKeMenu()">Kembali ke Menu</button>
        </div>`;
        return;
    }
    
    let res = await fetch(FIREBASE_CONFIG.databaseURL + "/hartakarun.json");
    let semua = await res.json() || {};
    let wadah = document.getElementById('daftarHarta');
    wadah.innerHTML = '';
    
    if(Object.keys(semua).length===0){
        wadah.innerHTML='<p style="text-align:center;color:white">Belum ada petunjuk harta karun</p>';return;
    }
    
    Object.entries(semua).forEach(([id, item]) => {
        let sdh = sudahJawab.includes(id);
        wadah.innerHTML += `
        <div class="form-kotak">
            <p style="font-weight:bold;margin-bottom:5px;">${item.soal}</p>
            <input type="text" id="jawabSiswa-${id}" placeholder="Masukkan jawabanmu..." ${sdh?'disabled':''}>
            <button class="btn-kirim btn-ungu mt-3" onclick="cekJawabHarta('${id}','${item.jawab}')" ${sdh?'disabled':''}>${sdh?'✅ Sudah Benar':'Periksa Jawaban'}</button>
        </div>`;
    });

    // TOMBOL AMBIL HADIAH MUNCUL JIKA SUDAH 6 BENAR
    if(skorBenar >= 6){
        wadah.innerHTML += `
        <div style="text-align:center;margin-top:25px;">
            <button class="btn-kirim" style="background:#ffc107;color:black;font-weight:bold;padding:12px 25px;font-size:16px;" onclick="klaimHadiah()">🎁 AMBIL HADIAH</button>
        </div>`;
    }
}

function cekJawabHarta(id, jawabBenar){
    let jawabSiswa = document.getElementById(`jawabSiswa-${id}`).value.trim().toLowerCase();
    let sudahJawab = JSON.parse(localStorage.getItem('sudahJawab')) || [];
    
    if(jawabSiswa === jawabBenar){
        sudahJawab.push(id);
        localStorage.setItem('sudahJawab', JSON.stringify(sudahJawab));
        alert('🎉 BENAR! Hitungan saat ini: '+sudahJawab.length+' dari 6');
        lihatHarta();
    }else{
        alert('😅 Jawaban belum benar, coba lagi ya!');
    }
}

async function klaimHadiah(){
    if(!confirm('Yakin sudah mau mengambil hadiah? Setelah ini tidak bisa menjawab lagi ya!')) return;
    
    const idSiswa = localStorage.getItem('idSiswa');
    // TANDAI SUDAH ADA PEMENANG DI DATABASE
    await fetch(FIREBASE_CONFIG.databaseURL + "/statusmenang.json", {
        method: "PUT",
        body: JSON.stringify({ada_pemenang: true, id_pemenang: idSiswa, waktu: Date.now()})
    });

    localStorage.setItem('saya_sudah_menang', 'ya');
    alert('✅ SELAMAT! Silakan datang mengambil hadiah kepada Kakak OSIS KAMIL ya!');
    lihatHarta();
}

async function hapusHarta(id){
    await fetch(`${FIREBASE_CONFIG.databaseURL}/hartakarun/${id}.json`, {method:"DELETE"});
    tampilDaftarHartaAdmin();
    alert('Berhasil dihapus!');
}

// FUNGSI KHUSUS ADMIN: MULAI BABAK BARU SETELAH ADA PEMENANG
async function mulaiBabakBaru(){
    if(!confirm('Yakin mau hapus semua soal dan mulai permainan baru? Semua data lama akan hilang!')) return;
    await fetch(FIREBASE_CONFIG.databaseURL + "/hartakarun.json", {method:"DELETE"});
    await fetch(FIREBASE_CONFIG.databaseURL + "/statusmenang.json", {method:"DELETE"});
    localStorage.removeItem('sudahJawab');
    localStorage.removeItem('saya_sudah_menang');
    alert('✅ Babak baru siap dimulai! Silakan buat soal lagi.');
    tampilDaftarHartaAdmin();
}
