export default function About() {
  return (
    <>
      <div className="about-hero">
        <div className="wrap">
          <div className="plaque">
            <div className="eyebrow">Our story</div>
            <h1>Built on trust since 2026.</h1>
            <p>
              Shiva Hardware started as a single counter store, stocking nuts,
              bolts, cement and fittings for local contractors. Today we supply
              genuine building materials and hardware to builders, electricians
              and homeowners — same trust, wider reach.
            </p>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="wrap">
          <h2>How we got here</h2>
          <div className="sub">A short timeline</div>
          <div className="timeline">
            <div className="tl-item">
              <div className="yr">March,2026</div>
              <div className="desc">Opened our first counter store.</div>
            </div>
            <div className="tl-item">
              <div className="yr">April,2026</div>
              <div className="desc">
                Started wholesale supply for local contractors and builders.
              </div>
            </div>
            <div className="tl-item">
              <div className="yr">May,2026</div>
              <div className="desc">
                Crossed 400 stocked SKUs across seven categories.
              </div>
            </div>
            <div className="tl-item">
              <div className="yr">July,2026</div>
              <div className="desc">
                Launched Shiva Hardware online, delivering nationwide.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2>Why buy from us</h2>
          <div className="sub">What hasn't changed since 2024</div>
          <div className="why-grid">
            <div className="why-card">
              <div className="ttl">Genuine, tested stock</div>
              <div className="d">
                Every product checked before it reaches the shelf.
              </div>
            </div>
            <div className="why-card">
              <div className="ttl">Contractor pricing</div>
              <div className="d">Bulk rates for builders and electricians.</div>
            </div>
            <div className="why-card">
              <div className="ttl">Fast dispatch</div>
              <div className="d">Same-day packing, 24–48 hour delivery.</div>
            </div>
            <div className="why-card">
              <div className="ttl">Real advice</div>
              <div className="d">
                Talk to people who've sold hardware for years.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
