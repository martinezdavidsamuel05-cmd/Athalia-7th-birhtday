import { useState, useMemo } from "react";
import { X, Plus, Minus, ShoppingBag, Search, Leaf } from "lucide-react";

const TEA_TYPES = {
  green: { label: "Green", color: "#8AA875", temp: "80°C", time: "2–3 min" },
  black: { label: "Black", color: "#8C5A3C", temp: "95°C", time: "3–5 min" },
  white: { label: "White", color: "#D9CBB3", temp: "75°C", time: "4–6 min" },
  herbal: { label: "Herbal", color: "#C77B4D", temp: "100°C", time: "5–7 min" },
};

const PRODUCTS = [
  {
    id: 1,
    name: "Dragon Well",
    type: "green",
    origin: "Hangzhou, China",
    price: 14,
    notes: "Chestnut, grass, a faint sweetness that lingers on the finish.",
    desc: "Pan-fired flat-leaf green tea, hand-pressed the traditional way. Delicate and vegetal, best taken plain.",
  },
  {
    id: 2,
    name: "Gyokuro",
    type: "green",
    origin: "Uji, Japan",
    price: 22,
    notes: "Umami-forward, seaweed, buttery mouthfeel.",
    desc: "Shade-grown for three weeks before harvest, concentrating chlorophyll and amino acids into a deep savory cup.",
  },
  {
    id: 3,
    name: "Golden Yunnan",
    type: "black",
    origin: "Yunnan, China",
    price: 16,
    notes: "Cocoa, dried fig, a whisper of pepper.",
    desc: "Large golden-tipped leaves from old-growth trees. Malty and full-bodied without turning bitter.",
  },
  {
    id: 4,
    name: "Assam Estate",
    type: "black",
    origin: "Assam, India",
    price: 12,
    notes: "Bold, brisk, malty — built for milk.",
    desc: "A breakfast standby grown on a single estate near the Brahmaputra. Reliable, robust, unfussy.",
  },
  {
    id: 5,
    name: "Silver Needle",
    type: "white",
    origin: "Fujian, China",
    price: 26,
    notes: "Honey, melon, barely-there tannins.",
    desc: "Only the unopened buds are picked, then sun-withered. The lightest processing of any tea in the shop.",
  },
  {
    id: 6,
    name: "Chamomile Bloom",
    type: "herbal",
    origin: "Nile Delta, Egypt",
    price: 11,
    notes: "Apple, hay, warm honey.",
    desc: "Whole dried chamomile flowers, nothing else. Caffeine-free and gentle enough for evenings.",
  },
  {
    id: 7,
    name: "Hibiscus Rooibos",
    type: "herbal",
    origin: "Western Cape, South Africa",
    price: 13,
    notes: "Tart cranberry, vanilla, red-fruit sweetness.",
    desc: "Fermented rooibos blended with whole hibiscus petals for a tart, garnet-colored infusion.",
  },
  {
    id: 8,
    name: "Bai Mudan",
    type: "white",
    origin: "Fujian, China",
    price: 18,
    notes: "Apricot, hay, soft floral top notes.",
    desc: "One bud, two leaves — slightly more oxidized than Silver Needle, with more body and depth.",
  },
];

function Swatch({ type, size = 10 }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        background: TEA_TYPES[type].color,
        flexShrink: 0,
      }}
    />
  );
}

export default function TeaShop() {
  const [activeType, setActiveType] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesType = activeType === "all" || p.type === activeType;
      const matchesQuery =
        query.trim() === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.origin.toLowerCase().includes(query.toLowerCase());
      return matchesType && matchesQuery;
    });
  }, [activeType, query]);

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === Number(id)), qty }))
    .filter((i) => i.qty > 0);

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  function addToCart(id, qty = 1) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + qty }));
    const p = PRODUCTS.find((p) => p.id === id);
    setToast(`Added ${p.name} to bag`);
    setTimeout(() => setToast(null), 1800);
  }

  function setQty(id, qty) {
    setCart((c) => ({ ...c, [id]: Math.max(0, qty) }));
  }

  return (
    <div
      style={{
        fontFamily: "'Work Sans', sans-serif",
        background: "#1B2E22",
        color: "#F0ECE0",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .tea-shop-root button { font-family: inherit; cursor: pointer; }
        .tea-shop-root ::selection { background: #C9A24B; color: #1B2E22; }
        .card:hover { transform: translateY(-4px); border-color: #C9A24B; }
        .card { transition: transform 0.2s ease, border-color 0.2s ease; }
        .tab { transition: all 0.15s ease; }
        .scrollbar::-webkit-scrollbar { width: 6px; }
        .scrollbar::-webkit-scrollbar-thumb { background: #3A4E3E; border-radius: 4px; }
      `}</style>

      <div className="tea-shop-root">
        {/* Header */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 32px",
            borderBottom: "1px solid #2A3D2F",
            position: "sticky",
            top: 0,
            background: "#1B2E22",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Leaf size={20} color="#C9A24B" />
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              Steep &amp; Ledger
            </span>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            style={{
              background: "transparent",
              border: "1px solid #3A4E3E",
              borderRadius: 8,
              padding: "8px 14px",
              color: "#F0ECE0",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
            }}
          >
            <ShoppingBag size={16} />
            Bag
            {cartCount > 0 && (
              <span
                style={{
                  background: "#C9A24B",
                  color: "#1B2E22",
                  borderRadius: "50%",
                  width: 18,
                  height: 18,
                  fontSize: 11,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </header>

        {/* Hero */}
        <div style={{ padding: "48px 32px 24px", maxWidth: 780 }}>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 500,
              lineHeight: 1.1,
              margin: "0 0 12px",
            }}
          >
            Loose leaf, sourced by season, sold by the ledger.
          </h1>
          <p style={{ color: "#B7C4B9", fontSize: 16, lineHeight: 1.6, maxWidth: 560 }}>
            Eight teas, one page, no filler blends. Every entry lists its steep
            temperature and time — read the label before you brew.
          </p>
        </div>

        {/* Controls */}
        <div
          style={{
            padding: "0 32px 24px",
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["all", ...Object.keys(TEA_TYPES)].map((t) => (
              <button
                key={t}
                className="tab"
                onClick={() => setActiveType(t)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 20,
                  border: `1px solid ${activeType === t ? "#C9A24B" : "#3A4E3E"}`,
                  background: activeType === t ? "#C9A24B" : "transparent",
                  color: activeType === t ? "#1B2E22" : "#F0ECE0",
                  fontSize: 13,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  textTransform: "capitalize",
                }}
              >
                {t !== "all" && <Swatch type={t} size={8} />}
                {t}
              </button>
            ))}
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid #3A4E3E",
              borderRadius: 20,
              padding: "8px 14px",
              minWidth: 200,
            }}
          >
            <Search size={14} color="#B7C4B9" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tea or origin"
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#F0ECE0",
                fontSize: 13,
                width: "100%",
              }}
            />
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            padding: "8px 32px 64px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
            gap: 20,
          }}
        >
          {filtered.map((p) => (
            <div
              key={p.id}
              className="card"
              onClick={() => setSelected(p)}
              style={{
                border: "1px solid #2A3D2F",
                borderRadius: 12,
                padding: 18,
                background: "#20342689",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  height: 90,
                  borderRadius: 8,
                  marginBottom: 14,
                  background: `linear-gradient(135deg, ${TEA_TYPES[p.type].color}55, ${TEA_TYPES[p.type].color}15)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Leaf size={28} color={TEA_TYPES[p.type].color} />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11,
                  color: "#B7C4B9",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 6,
                }}
              >
                <Swatch type={p.type} size={7} />
                {TEA_TYPES[p.type].label} · {p.temp !== undefined ? p.temp : TEA_TYPES[p.type].temp}
              </div>
              <h3
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 19,
                  margin: "0 0 4px",
                  fontWeight: 500,
                }}
              >
                {p.name}
              </h3>
              <p style={{ fontSize: 12, color: "#8FA093", margin: "0 0 12px" }}>{p.origin}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 15,
                  }}
                >
                  ${p.price}
                  <span style={{ fontSize: 11, color: "#8FA093" }}> /2oz</span>
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p.id);
                  }}
                  style={{
                    background: "transparent",
                    border: "1px solid #C9A24B",
                    color: "#C9A24B",
                    borderRadius: 6,
                    padding: "6px 10px",
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p style={{ gridColumn: "1/-1", color: "#8FA093", padding: "24px 0" }}>
              Nothing matches that search. Try a different leaf or origin.
            </p>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "#0F1811cc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 30,
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#20342e",
              border: "1px solid #3A4E3E",
              borderRadius: 16,
              maxWidth: 460,
              width: "100%",
              padding: 28,
              position: "relative",
            }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                background: "transparent",
                border: "none",
                color: "#B7C4B9",
              }}
            >
              <X size={18} />
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 11,
                color: "#B7C4B9",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 10,
              }}
            >
              <Swatch type={selected.type} size={8} />
              {TEA_TYPES[selected.type].label} tea
            </div>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 28,
                margin: "0 0 4px",
                fontWeight: 500,
              }}
            >
              {selected.name}
            </h2>
            <p style={{ fontSize: 13, color: "#8FA093", margin: "0 0 18px" }}>
              {selected.origin}
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "#DCE4DC", margin: "0 0 16px" }}>
              {selected.desc}
            </p>
            <p style={{ fontSize: 13, fontStyle: "italic", color: "#B7C4B9", margin: "0 0 20px" }}>
              Tasting notes: {selected.notes}
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                marginBottom: 22,
                color: "#F0ECE0",
              }}
            >
              <span style={{ border: "1px solid #3A4E3E", borderRadius: 6, padding: "6px 10px" }}>
                {TEA_TYPES[selected.type].temp}
              </span>
              <span style={{ border: "1px solid #3A4E3E", borderRadius: 6, padding: "6px 10px" }}>
                steep {TEA_TYPES[selected.type].time}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 20 }}>
                ${selected.price}
              </span>
              <button
                onClick={() => {
                  addToCart(selected.id);
                  setSelected(null);
                }}
                style={{
                  background: "#C9A24B",
                  border: "none",
                  color: "#1B2E22",
                  borderRadius: 8,
                  padding: "10px 20px",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                Add to bag
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: 340,
          maxWidth: "90vw",
          background: "#20342e",
          borderLeft: "1px solid #3A4E3E",
          transform: cartOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.25s ease",
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 20px 16px",
            borderBottom: "1px solid #2A3D2F",
          }}
        >
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 20 }}>Your bag</span>
          <button
            onClick={() => setCartOpen(false)}
            style={{ background: "transparent", border: "none", color: "#B7C4B9" }}
          >
            <X size={18} />
          </button>
        </div>
        <div className="scrollbar" style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {cartItems.length === 0 && (
            <p style={{ color: "#8FA093", fontSize: 14, padding: "20px 4px" }}>
              Empty. Add a tea to start your order.
            </p>
          )}
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: 12,
                padding: "12px 0",
                borderBottom: "1px solid #2A3D2F",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: `${TEA_TYPES[item.type].color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Leaf size={18} color={TEA_TYPES[item.type].color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13 }}>
                    ${item.price * item.qty}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                  <button
                    onClick={() => setQty(item.id, item.qty - 1)}
                    style={{
                      background: "transparent",
                      border: "1px solid #3A4E3E",
                      borderRadius: 5,
                      width: 22,
                      height: 22,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#F0ECE0",
                    }}
                  >
                    <Minus size={11} />
                  </button>
                  <span style={{ fontSize: 13, minWidth: 14, textAlign: "center" }}>{item.qty}</span>
                  <button
                    onClick={() => setQty(item.id, item.qty + 1)}
                    style={{
                      background: "transparent",
                      border: "1px solid #3A4E3E",
                      borderRadius: 5,
                      width: 22,
                      height: 22,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#F0ECE0",
                    }}
                  >
                    <Plus size={11} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: 20, borderTop: "1px solid #2A3D2F" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontSize: 14, color: "#B7C4B9" }}>Subtotal</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 16 }}>
              ${subtotal}
            </span>
          </div>
          <button
            disabled={cartItems.length === 0}
            onClick={() => {
              setToast("Order placed — thank you");
              setCart({});
              setCartOpen(false);
              setTimeout(() => setToast(null), 2200);
            }}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "none",
              background: cartItems.length === 0 ? "#3A4E3E" : "#C9A24B",
              color: cartItems.length === 0 ? "#8FA093" : "#1B2E22",
              fontWeight: 600,
              fontSize: 14,
              cursor: cartItems.length === 0 ? "not-allowed" : "pointer",
            }}
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#C9A24B",
            color: "#1B2E22",
            padding: "10px 18px",
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 500,
            zIndex: 50,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}