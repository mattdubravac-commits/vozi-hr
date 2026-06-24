import { useState } from "react";

const CATEGORIES = [
  { id: 1, emoji: "🚗", name: "Osobni automobili", count: 0 },
  { id: 2, emoji: "🏍️", name: "Motocikli / Motori", count: 0 },
  { id: 3, emoji: "🚛", name: "Gospodarska vozila", count: 0 },
  { id: 4, emoji: "🔧", name: "Dijelovi i oprema", count: 0 },
  { id: 5, emoji: "🏎️", name: "Oldtimeri", count: 0 },
  { id: 6, emoji: "⛵", name: "Nautika", count: 0 },
];

const SAMPLE_ADS = [
  { id: 1, title: "VW Golf 7 1.6 TDI", price: "12.500 €", year: 2016, km: "145.000 km", city: "Zagreb", img: "🚗", category: 1 },
  { id: 2, title: "BMW 320d xDrive", price: "18.900 €", year: 2018, km: "98.000 km", city: "Split", img: "🚗", category: 1 },
  { id: 3, title: "Toyota Yaris 1.0", price: "7.200 €", year: 2014, km: "87.000 km", city: "Rijeka", img: "🚗", category: 1 },
  { id: 4, title: "Honda CB500F", price: "5.400 €", year: 2019, km: "22.000 km", city: "Osijek", img: "🏍️", category: 2 },
];

const styles = {
  app: { fontFamily: "'Segoe UI', sans-serif", maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: "#f2f4f7", position: "relative", paddingBottom: 70 },
  // Header
  header: { background: "linear-gradient(135deg, #1a3fbf 0%, #2952e3 100%)", padding: "20px 20px 28px", color: "white", position: "relative", overflow: "hidden" },
  headerBg: { position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.07)" },
  headerBg2: { position: "absolute", top: 20, right: 20, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.07)" },
  headerTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  logo: { fontSize: 24, fontWeight: 800, color: "white" },
  logoHr: { color: "#f5a623" },
  countryLabel: { fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: 2, marginBottom: 2 },
  avatarBtn: { width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "none", color: "white", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 22, fontWeight: 700, marginBottom: 4 },
  headerSub: { fontSize: 13, color: "rgba(255,255,255,0.75)", marginBottom: 16 },
  searchRow: { display: "flex", gap: 8 },
  searchInput: { flex: 1, padding: "12px 16px", borderRadius: 12, border: "none", fontSize: 14, outline: "none", background: "white" },
  searchBtn: { padding: "12px 18px", background: "#2952e3", border: "2px solid rgba(255,255,255,0.5)", borderRadius: 12, color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer" },
  // Body
  body: { padding: "0 0 16px" },
  postAdRow: { padding: "14px 16px", background: "white", marginBottom: 8 },
  postAdBtn: { background: "#0fb8a0", color: "white", border: "none", borderRadius: 10, padding: "13px 22px", fontWeight: 700, fontSize: 14, cursor: "pointer", letterSpacing: 0.5 },
  sectionTitle: { fontSize: 17, fontWeight: 700, color: "#1a1a2e", padding: "16px 16px 8px" },
  // Categories grid
  catGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "white", borderTop: "1px solid #e8eaf0", borderBottom: "1px solid #e8eaf0" },
  catCell: { display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 8px", borderRight: "1px solid #e8eaf0", borderBottom: "1px solid #e8eaf0", cursor: "pointer", background: "white" },
  catEmoji: { fontSize: 36, marginBottom: 8 },
  catCircle: { width: 64, height: 64, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, fontSize: 30 },
  catName: { fontSize: 12, fontWeight: 600, color: "#2952e3", textAlign: "center", lineHeight: 1.3 },
  catCount: { fontSize: 11, color: "#999", marginTop: 2 },
  // Ad cards
  adCard: { background: "white", borderRadius: 14, margin: "0 12px 12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" },
  adEmoji: { fontSize: 60, background: "#f0f4ff", height: 130, display: "flex", alignItems: "center", justifyContent: "center" },
  adBody: { padding: "12px 14px" },
  adTitle: { fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 4 },
  adPrice: { fontSize: 17, fontWeight: 800, color: "#2952e3", marginBottom: 6 },
  adMeta: { fontSize: 12, color: "#888", display: "flex", gap: 10 },
  adCity: { fontSize: 12, color: "#888" },
  heartBtn: { position: "absolute", top: 10, right: 10, background: "white", border: "none", borderRadius: "50%", width: 32, height: 32, fontSize: 16, cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" },
  adWrap: { position: "relative" },
  // Bottom nav
  bottomNav: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "white", borderTop: "1px solid #e8eaf0", display: "flex", alignItems: "center", height: 64, zIndex: 100 },
  navItem: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, cursor: "pointer", border: "none", background: "none", padding: 0 },
  navLabel: { fontSize: 11 },
  navCenter: { width: 54, height: 54, borderRadius: 16, background: "#2952e3", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 26, border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(41,82,227,0.4)", marginTop: -16 },
  // Login screen
  loginHeader: { background: "linear-gradient(135deg, #1a3fbf 0%, #2952e3 100%)", padding: "60px 20px 50px", textAlign: "center", color: "white" },
  loginLogo: { fontSize: 36, fontWeight: 800, color: "white", marginBottom: 8 },
  loginSub: { color: "rgba(255,255,255,0.8)", fontSize: 15 },
  loginBody: { padding: "32px 20px" },
  tabRow: { display: "flex", background: "#f2f4f7", borderRadius: 14, padding: 4, marginBottom: 28 },
  tabBtn: { flex: 1, padding: "12px", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" },
  label: { fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: 1, marginBottom: 6, display: "block" },
  input: { width: "100%", padding: "14px 16px", borderRadius: 12, border: "1.5px solid #e0e4ee", fontSize: 15, outline: "none", marginBottom: 16, boxSizing: "border-box" },
  primaryBtn: { width: "100%", padding: "16px", background: "linear-gradient(135deg, #1a3fbf, #2952e3)", color: "white", border: "none", borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: "pointer", marginBottom: 12 },
  secondaryBtn: { width: "100%", padding: "15px", background: "white", color: "#333", border: "1.5px solid #e0e4ee", borderRadius: 14, fontSize: 15, fontWeight: 600, cursor: "pointer" },
  // Profile
  profilePage: { padding: "60px 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", background: "#f2f4f7", minHeight: "100vh" },
  profileIcon: { fontSize: 70, marginBottom: 16 },
  profileTitle: { fontSize: 22, fontWeight: 700, marginBottom: 6 },
  profileSub: { color: "#888", fontSize: 14, marginBottom: 32 },
  // Search page
  searchPage: { padding: "16px" },
  filterRow: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 },
  filterBtn: { padding: "8px 14px", borderRadius: 20, border: "1.5px solid #e0e4ee", background: "white", fontSize: 13, cursor: "pointer" },
  // Post ad page
  postPage: { padding: "16px" },
  postHeader: { fontSize: 20, fontWeight: 700, marginBottom: 20, color: "#1a1a2e" },
  postStep: { background: "white", borderRadius: 14, padding: "16px", marginBottom: 12 },
  postStepTitle: { fontSize: 13, fontWeight: 700, color: "#2952e3", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 },
  select: { width: "100%", padding: "13px 16px", borderRadius: 12, border: "1.5px solid #e0e4ee", fontSize: 15, marginBottom: 12, background: "white", boxSizing: "border-box" },
  photoBox: { border: "2px dashed #ccd3e8", borderRadius: 12, height: 100, display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa", fontSize: 13, cursor: "pointer", marginBottom: 12 },
};

const catColors = ["#eef1ff", "#fff3e8", "#eafaf6", "#fff8ee", "#ffeef0", "#eef8ff"];

export default function App() {
  const [tab, setTab] = useState("home");
  const [loginTab, setLoginTab] = useState("prijava");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const toggleFav = (id) => {
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  };

  const filteredAds = SAMPLE_ADS.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.city.toLowerCase().includes(search.toLowerCase())
  );

  // LOGIN SCREEN
  if (showLogin) {
    return (
      <div style={styles.app}>
        <div style={styles.loginHeader}>
          <div style={styles.loginLogo}>Vozi<span style={styles.logoHr}>.hr</span></div>
          <div style={styles.loginSub}>Tržnica automobila</div>
        </div>
        <div style={styles.loginBody}>
          <div style={styles.tabRow}>
            <button style={{ ...styles.tabBtn, background: loginTab === "prijava" ? "white" : "transparent", color: loginTab === "prijava" ? "#2952e3" : "#888", boxShadow: loginTab === "prijava" ? "0 2px 8px rgba(0,0,0,0.1)" : "none" }} onClick={() => setLoginTab("prijava")}>Prijava</button>
            <button style={{ ...styles.tabBtn, background: loginTab === "registracija" ? "white" : "transparent", color: loginTab === "registracija" ? "#2952e3" : "#888", boxShadow: loginTab === "registracija" ? "0 2px 8px rgba(0,0,0,0.1)" : "none" }} onClick={() => setLoginTab("registracija")}>Registracija</button>
          </div>
          <label style={styles.label}>EMAIL</label>
          <input style={styles.input} placeholder="vas@email.com" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <label style={styles.label}>LOZINKA</label>
          <input style={styles.input} placeholder="••••••••" type="password" value={pass} onChange={e => setPass(e.target.value)} />
          {loginTab === "registracija" && <>
            <label style={styles.label}>IME I PREZIME</label>
            <input style={styles.input} placeholder="Vaše ime" />
            <label style={styles.label}>TELEFON</label>
            <input style={styles.input} placeholder="+385 9x xxx xxxx" />
          </>}
          <button style={styles.primaryBtn} onClick={() => { setIsLoggedIn(true); setShowLogin(false); setTab("home"); }}>
            {loginTab === "prijava" ? "Prijavi se" : "Kreiraj račun"}
          </button>
          <button style={styles.secondaryBtn} onClick={() => setShowLogin(false)}>← Nastavi bez prijave</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      {/* HOME */}
      {tab === "home" && (
        <>
          <div style={styles.header}>
            <div style={styles.headerBg} />
            <div style={styles.headerBg2} />
            <div style={styles.headerTop}>
              <div>
                <div style={styles.countryLabel}>HRVATSKA</div>
                <div style={styles.logo}>Vozi<span style={styles.logoHr}>.hr</span></div>
              </div>
              <button style={styles.avatarBtn} onClick={() => isLoggedIn ? setTab("profil") : setShowLogin(true)}>👤</button>
            </div>
            <div style={styles.headerTitle}>Pronađi savršeni auto</div>
            <div style={styles.headerSub}>{SAMPLE_ADS.length} oglasa diljem Hrvatske</div>
            <div style={styles.searchRow}>
              <input style={styles.searchInput} placeholder="Marka, model, grad..." value={search} onChange={e => setSearch(e.target.value)} />
              <button style={styles.searchBtn} onClick={() => setTab("trazi")}>Traži</button>
            </div>
          </div>

          <div style={styles.body}>
            <div style={styles.postAdRow}>
              <button style={styles.postAdBtn} onClick={() => isLoggedIn ? setTab("oglas") : setShowLogin(true)}>+ PREDAJ OGLAS</button>
            </div>

            <div style={styles.sectionTitle}>Auto Moto Nautika</div>
            <div style={styles.catGrid}>
              {CATEGORIES.map((c, i) => (
                <div key={c.id} style={styles.catCell} onClick={() => setTab("trazi")}>
                  <div style={{ ...styles.catCircle, background: catColors[i] }}>{c.emoji}</div>
                  <div style={styles.catName}>{c.name}</div>
                  <div style={styles.catCount}>{c.count}</div>
                </div>
              ))}
            </div>

            <div style={styles.sectionTitle}>Novi oglasi</div>
            {filteredAds.map(ad => (
              <div key={ad.id} style={styles.adWrap}>
                <div style={styles.adCard}>
                  <div style={styles.adEmoji}>{ad.img}</div>
                  <div style={styles.adBody}>
                    <div style={styles.adTitle}>{ad.title}</div>
                    <div style={styles.adPrice}>{ad.price}</div>
                    <div style={styles.adMeta}>
                      <span>{ad.year}</span>
                      <span>•</span>
                      <span>{ad.km}</span>
                      <span>•</span>
                      <span>{ad.city}</span>
                    </div>
                  </div>
                </div>
                <button style={{ ...styles.heartBtn, position: "absolute", top: 10, right: 10 }} onClick={() => toggleFav(ad.id)}>
                  {favorites.includes(ad.id) ? "❤️" : "🤍"}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* TRAŽI */}
      {tab === "trazi" && (
        <div style={{ background: "white", minHeight: "100vh" }}>
          <div style={{ background: "linear-gradient(135deg, #1a3fbf, #2952e3)", padding: "20px 16px 16px" }}>
            <div style={{ color: "white", fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Pretraži oglase</div>
            <div style={styles.searchRow}>
              <input style={styles.searchInput} placeholder="Marka, model, grad..." value={search} onChange={e => setSearch(e.target.value)} />
              <button style={styles.searchBtn}>Traži</button>
            </div>
          </div>
          <div style={{ padding: "12px 12px 0" }}>
            <div style={styles.filterRow}>
              {["Sve", "Automobili", "Motori", "Kamioni", "Nautika"].map(f => (
                <button key={f} style={{ ...styles.filterBtn, background: f === "Sve" ? "#2952e3" : "white", color: f === "Sve" ? "white" : "#333", borderColor: f === "Sve" ? "#2952e3" : "#e0e4ee" }}>{f}</button>
              ))}
            </div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>{filteredAds.length} oglasa pronađeno</div>
            {filteredAds.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#aaa" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#666" }}>Nema rezultata</div>
                <div style={{ fontSize: 13, marginTop: 6 }}>Pokušaj s drugom pretragom</div>
              </div>
            )}
            {filteredAds.map(ad => (
              <div key={ad.id} style={styles.adWrap}>
                <div style={styles.adCard}>
                  <div style={styles.adEmoji}>{ad.img}</div>
                  <div style={styles.adBody}>
                    <div style={styles.adTitle}>{ad.title}</div>
                    <div style={styles.adPrice}>{ad.price}</div>
                    <div style={styles.adMeta}><span>{ad.year}</span><span>•</span><span>{ad.km}</span><span>•</span><span>{ad.city}</span></div>
                  </div>
                </div>
                <button style={{ ...styles.heartBtn, position: "absolute", top: 10, right: 10 }} onClick={() => toggleFav(ad.id)}>
                  {favorites.includes(ad.id) ? "❤️" : "🤍"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PREDAJ OGLAS */}
      {tab === "oglas" && (
        <div style={{ background: "#f2f4f7", minHeight: "100vh" }}>
          <div style={{ background: "linear-gradient(135deg, #1a3fbf, #2952e3)", padding: "20px 16px 16px" }}>
            <div style={{ color: "white", fontWeight: 700, fontSize: 18 }}>Predaj oglas</div>
          </div>
          <div style={{ padding: 16 }}>
            <div style={styles.postStep}>
              <div style={styles.postStepTitle}>📋 Osnovno</div>
              <select style={styles.select}><option>Osobni automobil</option><option>Motor</option><option>Kamion</option><option>Oldtimer</option><option>Nautika</option></select>
              <input style={styles.input} placeholder="Marka (npr. Volkswagen)" />
              <input style={styles.input} placeholder="Model (npr. Golf)" />
              <input style={styles.input} placeholder="Godina (npr. 2018)" type="number" />
            </div>
            <div style={styles.postStep}>
              <div style={styles.postStepTitle}>⚙️ Detalji</div>
              <input style={styles.input} placeholder="Kilometraža (npr. 120000)" type="number" />
              <select style={styles.select}><option>Dizel</option><option>Benzin</option><option>Hibrid</option><option>Električni</option><option>Plin</option></select>
              <select style={styles.select}><option>Ručni</option><option>Automatik</option></select>
            </div>
            <div style={styles.postStep}>
              <div style={styles.postStepTitle}>💰 Cijena i lokacija</div>
              <input style={styles.input} placeholder="Cijena u € (npr. 12500)" type="number" />
              <input style={styles.input} placeholder="Grad (npr. Zagreb)" />
              <input style={styles.input} placeholder="Telefon za kontakt" />
            </div>
            <div style={styles.postStep}>
              <div style={styles.postStepTitle}>📸 Fotografije</div>
              <div style={styles.photoBox}>📷 Dodaj fotografije</div>
            </div>
            <div style={styles.postStep}>
              <div style={styles.postStepTitle}>📝 Opis</div>
              <textarea style={{ ...styles.input, height: 100, resize: "none" }} placeholder="Opišite vozilo..." />
            </div>
            <button style={styles.primaryBtn}>Objavi oglas</button>
          </div>
        </div>
      )}

      {/* FAVORITI */}
      {tab === "favoriti" && (
        <div style={{ padding: 16, background: "#f2f4f7", minHeight: "100vh" }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, paddingTop: 8 }}>Moji favoriti</div>
          {favorites.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px", color: "#aaa" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🤍</div>
              <div style={{ fontSize: 17, fontWeight: 600, color: "#555", marginBottom: 8 }}>Nema omiljenih oglasa</div>
              <div style={{ fontSize: 13 }}>Srce na oglasu da spremiš vozilo</div>
            </div>
          ) : SAMPLE_ADS.filter(a => favorites.includes(a.id)).map(ad => (
            <div key={ad.id} style={styles.adWrap}>
              <div style={styles.adCard}>
                <div style={styles.adEmoji}>{ad.img}</div>
                <div style={styles.adBody}>
                  <div style={styles.adTitle}>{ad.title}</div>
                  <div style={styles.adPrice}>{ad.price}</div>
                  <div style={styles.adMeta}><span>{ad.year}</span><span>•</span><span>{ad.km}</span><span>•</span><span>{ad.city}</span></div>
                </div>
              </div>
              <button style={{ ...styles.heartBtn, position: "absolute", top: 10, right: 10 }} onClick={() => toggleFav(ad.id)}>❤️</button>
            </div>
          ))}
        </div>
      )}

      {/* PROFIL */}
      {tab === "profil" && (
        <div style={styles.profilePage}>
          {isLoggedIn ? (
            <>
              <div style={{ fontSize: 64, marginBottom: 12 }}>👤</div>
              <div style={styles.profileTitle}>Moj profil</div>
              <div style={styles.profileSub}>{email || "korisnik@vozi.hr"}</div>
              {[{ icon: "📋", label: "Moji oglasi" }, { icon: "❤️", label: "Favoriti" }, { icon: "🔔", label: "Obavijesti" }, { icon: "⚙️", label: "Postavke" }].map(item => (
                <div key={item.label} style={{ width: "100%", background: "white", borderRadius: 12, padding: "16px 20px", marginBottom: 10, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                  <span style={{ fontSize: 22 }}>{item.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{item.label}</span>
                  <span style={{ marginLeft: "auto", color: "#ccc" }}>›</span>
                </div>
              ))}
              <button style={{ ...styles.secondaryBtn, marginTop: 16, color: "#e03" }} onClick={() => { setIsLoggedIn(false); setEmail(""); setPass(""); }}>Odjavi se</button>
            </>
          ) : (
            <>
              <div style={{ fontSize: 70, marginBottom: 16 }}>👤</div>
              <div style={styles.profileTitle}>Prijavi se</div>
              <div style={styles.profileSub}>Pristup svim funkcijama Vozi.hr</div>
              <button style={{ ...styles.primaryBtn, maxWidth: 360 }} onClick={() => setShowLogin(true)}>Prijava</button>
              <button style={{ ...styles.secondaryBtn, maxWidth: 360 }} onClick={() => { setShowLogin(true); setLoginTab("registracija"); }}>Kreiraj račun</button>
            </>
          )}
        </div>
      )}

      {/* BOTTOM NAV */}
      <div style={styles.bottomNav}>
        {[
          { id: "home", icon: "🏠", label: "Početna" },
          { id: "trazi", icon: "🔍", label: "Traži" },
        ].map(n => (
          <button key={n.id} style={styles.navItem} onClick={() => setTab(n.id)}>
            <span style={{ fontSize: 22, filter: tab === n.id ? "none" : "grayscale(1)" }}>{n.icon}</span>
            <span style={{ ...styles.navLabel, color: tab === n.id ? "#2952e3" : "#999", fontWeight: tab === n.id ? 700 : 400 }}>{n.label}</span>
          </button>
        ))}
        <button style={styles.navCenter} onClick={() => isLoggedIn ? setTab("oglas") : setShowLogin(true)}>+</button>
        {[
          { id: "favoriti", icon: "🤍", label: "Favoriti" },
          { id: "profil", icon: "👤", label: "Profil" },
        ].map(n => (
          <button key={n.id} style={styles.navItem} onClick={() => setTab(n.id)}>
            <span style={{ fontSize: 22, filter: tab === n.id ? "none" : "grayscale(1)" }}>{n.icon}</span>
            <span style={{ ...styles.navLabel, color: tab === n.id ? "#2952e3" : "#999", fontWeight: tab === n.id ? 700 : 400 }}>{n.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
