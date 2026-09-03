import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content | Broken Fixture Co",
};

const wrapperStyle = {
  border: "1px solid #eee",
  padding: 2,
  margin: 2,
};

export default function ContentPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p>TEST FIXTURE — intentionally broken, not a real business.</p>
      <h1>Content</h1>
      <div style={wrapperStyle}>
        <div style={wrapperStyle}>
          <div style={wrapperStyle}>
            <div style={wrapperStyle}>
              <div style={wrapperStyle}>
                <div style={wrapperStyle}>
                  <div style={wrapperStyle}>
                    <div style={wrapperStyle}>
                      <div style={wrapperStyle}>
                        <div style={wrapperStyle}>
                          <p>
                            Solutions are being developed by our team, and
                            outcomes are being tracked by dashboards that were
                            configured by engineers whose names are not being
                            disclosed on this page, and specificity is being
                            avoided deliberately by whoever was tasked with
                            writing this paragraph in the first place.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={wrapperStyle}>
        <div style={wrapperStyle}>
          <div style={wrapperStyle}>
            <div style={wrapperStyle}>
              <div style={wrapperStyle}>
                <div style={wrapperStyle}>
                  <div style={wrapperStyle}>
                    <div style={wrapperStyle}>
                      <div style={wrapperStyle}>
                        <div style={wrapperStyle}>
                          <p>
                            Solutions are being developed by our team, and
                            outcomes are being tracked by dashboards that were
                            configured by engineers whose names are not being
                            disclosed on this page, and specificity is being
                            avoided deliberately by whoever was tasked with
                            writing this paragraph in the first place.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
