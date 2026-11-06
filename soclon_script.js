/* ==========================================================================
   CHÙA SÓC LỚN — DẤU ẤN LỊCH SỬ VÀ BẢN SẮC VĂN HÓA KHMER
   Presentation Engine & Slide Content (16 Slides Hoàn Chỉnh)
   100% hình ảnh thực tế, không AI, hiệu ứng chuyển cảnh mượt mà,
   tự động ẩn thanh điều hướng khi phóng to Fullscreen.
   ========================================================================== */

(() => {
  'use strict';

  // Helper hàm tiện ích
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const pad = num => String(num).padStart(2, '0');
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  /* SVG Icons dùng chung để không bao giờ bị lỗi font hay mất icon */
  const ICONS = {
    temple: `<svg class="card-icon-svg" viewBox="0 0 24 24"><path d="M12 2L2 9h20L12 2zm0 3.5l4.5 3.5h-9L12 5.5zM4 11v9h3v-9H4zm6 0v9h4v-9h-4zm7 0v9h3v-9h-3zM2 22h20v-2H2v2z"/></svg>`,
    mapPin: `<svg class="card-icon-svg" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>`,
    dharma: `<svg class="card-icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke-width="2"/><circle cx="12" cy="12" r="3" stroke-width="2"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M5.6 18.4l4.2-4.2M14.2 9.8l4.2-4.2"/></svg>`,
    nature: `<svg class="card-icon-svg" viewBox="0 0 24 24"><path d="M12 2a9 9 0 0 0-9 9c0 4.1 2.8 7.6 6.7 8.6L12 22l2.3-2.4C18.2 18.6 21 15.1 21 11a9 9 0 0 0-9-9zm0 15a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"/></svg>`,
    wing: `<svg class="card-icon-svg" viewBox="0 0 24 24"><path d="M12 3c-4.5 0-8.5 2.5-10 6 3-1 6.5-.5 9 1.5 2.5-2 6-2.5 9-1.5-1.5-3.5-5.5-6-10-6zM3.5 12c2.5 0 5 1 6.5 2.5 1.5-1.5 4-2.5 6.5-2.5 2 0 4 .5 5.5 1.5-2 3-5 5-9.5 5S4 16.5 2 13.5c.5-.5 1-1 1.5-1.5z"/></svg>`,
    shield: `<svg class="card-icon-svg" viewBox="0 0 24 24"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 2.18l6 2.25v4.66c0 4.14-2.73 8.01-6 9.07-3.27-1.06-6-4.93-6-9.07V6.43l6-2.25z"/></svg>`,
    book: `<svg class="card-icon-svg" viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>`,
    people: `<svg class="card-icon-svg" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
    heart: `<svg class="card-icon-svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
    star: `<svg class="card-icon-svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    fire: `<svg class="card-icon-svg" viewBox="0 0 24 24"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.61 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM12 20c-3.31 0-6-2.69-6-6 0-1.53.58-2.92 1.53-3.97.23 2.16 1.83 3.86 3.97 3.97C12.82 14.07 14 12.87 14 11.5c0-.44-.09-.86-.25-1.24C15.68 11.66 17 13.43 17 15.5c0 2.48-2.02 4.5-5 4.5z"/></svg>`
  };

  /* --------------------------------------------------------------------------
     1. DỮ LIỆU CHI TIẾT 16 SLIDE VÀ LỜI DẪN THUYẾT TRÌNH (SPEAKER NOTES)
     -------------------------------------------------------------------------- */
  const slidesData = [
    // SLIDE 1: Giới thiệu chủ đề
    {
      id: 1,
      title: "Chùa Sóc Lớn — Dấu ấn Lịch sử & Bản sắc Văn hóa Khmer",
      category: "01 · MỞ ĐẦU",
      thumb: "assets_soclon/img/thumb/s1_cover.jpg",
      render: () => `
        <div class="layout-cover">
          <div class="cover-left">
            <div class="eyebrow"><i></i> Di sản Văn hóa Địa phương · Tỉnh Bình Phước</div>
            <h1 class="hero-main-title">
              CHÙA SÓC LỚN
              <span>DẤU ẤN LỊCH SỬ VÀ BẢN SẮC VĂN HÓA KHMER</span>
            </h1>
            <p class="hero-desc">
              Ngôi chùa Khmer cổ nhất tỉnh Bình Phước — Cội nguồn tâm linh, chứng nhân lịch sử kiên trung và không gian hội tụ văn hóa lễ hội rực rỡ của đồng bào miền biên cương Lộc Ninh.
            </p>
            <div class="cover-meta-grid">
              <div class="meta-item">
                <small>Địa điểm</small>
                <span>Ấp Sóc Lớn, Xã Lộc Khánh, H. Lộc Ninh, Bình Phước</span>
              </div>
              <div class="meta-item">
                <small>Xếp hạng di tích</small>
                <span>Di tích Lịch sử - Văn hóa cấp Tỉnh (15/12/2004)</span>
              </div>
              <div class="meta-item">
                <small>Tôn giáo / Hệ phái</small>
                <span>Phật giáo Nam tông Khmer (Theravāda)</span>
              </div>
              <div class="meta-item">
                <small>Tên gọi Khmer / Pali</small>
                <span>Wat Phum Thum · Rajamahajetavananram</span>
              </div>
            </div>
          </div>
          <div class="cover-right" onclick="openZoom('assets_soclon/img/s1_cover.jpg', 'Chánh điện Chùa Sóc Lớn uy nghiêm với sắc vàng son rực rỡ (Ảnh thực tế tại chùa)')">
            <img src="assets_soclon/img/s1_cover.jpg" alt="Chánh điện Chùa Sóc Lớn" loading="eager">
            <div class="photo-caption">
              <div>
                <small>Ảnh tư liệu thực tế</small>
                <div>Chánh điện Chùa Sóc Lớn uy nghiêm với sắc vàng son rực rỡ tại Lộc Khánh, Lộc Ninh</div>
              </div>
            </div>
          </div>
        </div>
      `,
      notes: {
        intro: "Kính thưa quý thầy cô và các bạn! Hôm nay, nhóm chúng em xin trân trọng giới thiệu chuyên đề Giáo dục địa phương: 'Chùa Sóc Lớn – Dấu ấn lịch sử và bản sắc văn hóa Khmer'.",
        points: [
          "Giới thiệu ngôi chùa tọa lạc tại ấp Sóc Lớn, xã Lộc Khánh, huyện Lộc Ninh, tỉnh Bình Phước.",
          "Nhấn mạnh vị thế: Đây là ngôi chùa Phật giáo Nam tông Khmer cổ nhất trên địa bàn tỉnh Bình Phước (khởi dựng từ năm 1931).",
          "Nêu khái quát giá trị kép: Vừa là trung tâm tín ngưỡng - văn hóa độc đáo, vừa là di tích lịch sử cách mạng kiên cường qua hai cuộc kháng chiến."
        ],
        next: "Trước hết, xin mời thầy cô và các bạn cùng đi vào Slide 2 để tìm hiểu bức tranh tổng quan về quy mô và vị trí địa lý của ngôi chùa."
      }
    },

    // SLIDE 2: Tổng quan về Chùa Sóc Lớn
    {
      id: 2,
      title: "Tổng quan về Chùa Sóc Lớn — Wat Phum Thum",
      category: "02 · TỔNG QUAN",
      thumb: "assets_soclon/img/thumb/s2_overview.jpg",
      render: () => `
        <div class="layout-split">
          <div class="slide-content-left">
            <div class="eyebrow"><i></i> Khái quát tổng quan</div>
            <h2 class="slide-title">Ngôi Chùa Cổ Nhất<br><span style="color:var(--gold-bright);">Vùng Đất Đỏ Bình Phước</span></h2>
            <p class="slide-lead">
              Chùa Sóc Lớn không chỉ là chốn tu hành thanh tịnh mà còn là trung tâm hội tụ mọi sinh hoạt tinh thần, phong tục tập quán của cộng đồng Khmer Lộc Ninh.
            </p>
            <div class="stat-box">
              <b>42.000 m²</b>
              <span>Khuôn viên thanh tịnh rợp bóng thốt nốt, bồ đề và dầu đại thụ trăm năm</span>
            </div>
            <div class="cards-grid-2">
              <div class="info-card" style="--card-accent: var(--gold);">
                <div class="info-card-icon">${ICONS.temple}</div>
                <h4>Tên gọi ý nghĩa</h4>
                <p>Khmer: <b>Wat Phum Thum</b> (Chùa ở sóc lớn). Pháp danh Pali: <b>Rajamahajetavananram</b> (Kỳ Viên Tịnh Xá uy nghi).</p>
              </div>
              <div class="info-card" style="--card-accent: var(--crimson);">
                <div class="info-card-icon">${ICONS.mapPin}</div>
                <h4>Vị trí chiến lược</h4>
                <p>Nằm tại ấp Sóc Lớn, xã Lộc Khánh, cách thị trấn Lộc Ninh khoảng 10 km về phía Nam, sát vùng biên cương.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--amber);">
                <div class="info-card-icon">${ICONS.dharma}</div>
                <h4>Hệ phái Phật giáo</h4>
                <p>Phật giáo Nam tông (Theravāda), duy nhất phụng thờ Đức Bổn Sư Thích Ca Mâu Ni Phật trong Chánh điện.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--jungle-bright);">
                <div class="info-card-icon">${ICONS.nature}</div>
                <h4>Hòa quyện tự nhiên</h4>
                <p>Không gian rừng cây cổ thụ nguyên sinh bao bọc, tạo nên cảnh quan u tịch, tôn nghiêm và tách biệt thế tục.</p>
              </div>
            </div>
          </div>
          <div class="slide-visual-right">
            <div class="photo-frame" style="height: 100%; min-height: 480px;" onclick="openZoom('assets_soclon/img/s2_overview.jpg', 'Toàn cảnh khuôn viên Chùa Sóc Lớn rộng hơn 42.000 m² nhìn từ trên cao (Ảnh: Báo Ngày Nay / Tư liệu)')">
              <img src="assets_soclon/img/s2_overview.jpg" alt="Toàn cảnh Chùa Sóc Lớn">
              <div class="photo-caption">
                <div>
                  <small>Ảnh tư liệu thực tế</small>
                  <div>Toàn cảnh khuôn viên hơn 4,2 hecta của Chùa Sóc Lớn nhìn từ trên cao</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      notes: {
        intro: "Bước vào phần tổng quan, chúng ta thấy được quy mô rộng lớn và vị trí đặc biệt của Chùa Sóc Lớn.",
        points: [
          "Giải thích tên gọi: 'Wat' là chùa, 'Phum' là xóm làng, 'Thum' là lớn. Tên Pali có nghĩa là Kỳ Viên Tịnh Xá Hoàng Gia.",
          "Nhấn mạnh diện tích ấn tượng: Hơn 42.000 m² (4,2 hecta), là một quần thể xanh rộng lớn hiếm thấy.",
          "Khẳng định tôn chỉ Phật giáo Nam tông: Chỉ thờ duy nhất một tượng Phật Thích Ca Mâu Ni."
        ],
        next: "Vậy ngôi chùa cổ kính này đã được hình thành như thế nào gần một thế kỷ trước? Mời quý vị cùng theo dõi dòng lịch sử ở Slide 3."
      }
    },

    // SLIDE 3: Lịch sử hình thành và xây dựng
    {
      id: 3,
      title: "Lịch sử hình thành và xây dựng (1931 – 1954)",
      category: "03 · LỊCH SỬ HÌNH THÀNH",
      thumb: "assets_soclon/img/thumb/s3_history.jpg",
      render: () => `
        <div class="layout-split">
          <div class="slide-content-left">
            <div class="eyebrow"><i></i> Dòng thời gian lịch sử</div>
            <h2 class="slide-title">Hành Trình Khởi Dựng<br><span style="color:var(--gold-bright);">Bằng Đức Tin & Sức Dân</span></h2>
            <p class="slide-lead">
              Được kiến tạo từ những năm đầu thập niên 1930, Chùa Sóc Lớn là kết tinh mồ hôi, lòng kính Phật và tinh thần đoàn kết bền bỉ của người Khmer vùng đất Lộc Ninh.
            </p>
            <div class="timeline-track">
              <div class="timeline-step">
                <span class="timeline-step-badge">1931</span>
                <h4>Khởi công xây dựng</h4>
                <p>Các bô lão và đồng bào Khmer trong vùng đồng lòng quyên góp gỗ quý, tre nứa, khai hoang đất rừng lập chùa.</p>
              </div>
              <div class="timeline-step">
                <span class="timeline-step-badge gold">1937</span>
                <h4>Khánh thành ngôi chùa</h4>
                <p>Sau 6 năm thi công hoàn toàn thủ công, ngôi chùa khang trang với Chánh điện ngói vảy cá chính thức hoàn thành.</p>
              </div>
              <div class="timeline-step">
                <span class="timeline-step-badge">1954</span>
                <h4>Đại lễ Kiết giới Sima</h4>
                <p>Tổ chức nghi thức chôn đá Sima linh thiêng phân định ranh giới tâm linh, công nhận ngôi Chánh điện hoàn chỉnh.</p>
              </div>
            </div>
            <div class="quote-box">
              “Chùa Sóc Lớn là ngôi chùa Khmer xuất hiện sớm nhất tại Bình Phước, đánh dấu cột mốc định hình văn hóa Phật giáo Nam tông tại miền Đông Nam Bộ.”
            </div>
          </div>
          <div class="slide-visual-right">
            <div class="photo-frame" style="height: 100%; min-height: 480px;" onclick="openZoom('assets_soclon/img/s3_history.jpg', 'Tư liệu kiến trúc và tháp cổ Chùa Sóc Lớn trường tồn gần một thế kỷ (Ảnh tư liệu thực tế)')">
              <img src="assets_soclon/img/s3_history.jpg" alt="Kiến trúc tháp cổ Chùa Sóc Lớn">
              <div class="photo-caption">
                <div>
                  <small>Ảnh tư liệu thực tế</small>
                  <div>Tháp cổ và góc kiến trúc Chùa Sóc Lớn gìn giữ qua gần 100 năm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      notes: {
        intro: "Ở slide này, chúng ta cùng nhìn lại 3 mốc son lịch sử trọng đại trong quá trình hình thành của Chùa Sóc Lớn.",
        points: [
          "Mốc 1931: Xuất phát từ nhu cầu sinh hoạt tâm linh, đồng bào Khmer cùng chư tăng đã khởi công xây dựng.",
          "Mốc 1937: Khánh thành Chánh điện sau 6 năm lao động miệt mài.",
          "Mốc 1954: Đại lễ Kiết giới Sima tấn phong Chánh điện hoàn thành nghi thức tôn giáo tối cao."
        ],
        next: "Khi chiến tranh chống Mỹ lan rộng, ngôi chùa đã trở thành căn cứ cách mạng kiên cường. Mời quý vị đến Slide 4."
      }
    },

    // SLIDE 4: Vai trò trong thời kỳ chiến tranh
    {
      id: 4,
      title: "Chứng nhân lịch sử & Vai trò kháng chiến",
      category: "04 · THỜI KỲ CHIẾN TRANH",
      thumb: "assets_soclon/img/thumb/s4_war.jpg",
      render: () => `
        <div class="layout-split visual-left">
          <div class="slide-visual-right">
            <div class="photo-frame" style="height: 100%; min-height: 480px;" onclick="openZoom('assets_soclon/img/s4_war.jpg', 'Khu tưởng niệm di tích lịch sử và dấu ấn thời kháng chiến tại Chùa Sóc Lớn')">
              <img src="assets_soclon/img/s4_war.jpg" alt="Khu tưởng niệm Chùa Sóc Lớn">
              <div class="photo-caption">
                <div>
                  <small>Chứng tích di tích</small>
                  <div>Bia tưởng niệm và dấu tích lịch sử đấu tranh cách mạng tại chùa</div>
                </div>
              </div>
            </div>
          </div>
          <div class="slide-content-left">
            <div class="eyebrow" style="color:var(--crimson);"><i></i> Chứng nhân kháng chiến kiên trung</div>
            <h2 class="slide-title">Ngôi Chùa Căn Cứ<br><span style="color:#FFA4A8;">& Nỗi Đau Bom Đạn 1972</span></h2>
            <p class="slide-lead">
              Không chỉ là chốn tu hành, Chùa Sóc Lớn là 'pháo đài lòng dân', căn cứ nuôi giấu cán bộ cách mạng kiên trung suốt hai cuộc kháng chiến giải phóng dân tộc.
            </p>
            <div class="cards-grid-2">
              <div class="info-card" style="--card-accent: var(--crimson);">
                <div class="info-card-icon">${ICONS.shield}</div>
                <h4>Căn cứ cách mạng bí mật</h4>
                <p>Là cơ sở che chở cán bộ Huyện ủy Lộc Ninh, điểm tập kết thuốc men, lương thực chi viện cho bộ đội chủ lực miền Đông.</p>
              </div>
              <div class="info-card" style="--card-accent: #E53935;">
                <div class="info-card-icon">${ICONS.fire}</div>
                <h4>Trận bom B-52 tang thương 1972</h4>
                <p>Năm 1972, máy bay B-52 Mỹ rải 3 quả bom trúng Chánh điện, phá hủy hoàn toàn ngôi chùa; Sư trụ trì Đại đức Lâm Hên anh dũng tử nạn.</p>
              </div>
            </div>
            <div class="quote-box" style="margin-top:16px; border-left-color: var(--crimson);">
              “Bom đạn giặc có thể san bằng tường gạch, nhưng không thể khuất phục lòng kiên trung với cách mạng và ngọn lửa Phật pháp của đồng bào Khmer Sóc Lớn.”
            </div>
          </div>
        </div>
      `,
      notes: {
        intro: "Slide 4 khắc họa một giai đoạn lịch sử vô cùng oanh liệt nhưng cũng thấm đẫm máu và nước mắt của Chùa Sóc Lớn.",
        points: [
          "Căn cứ nuôi giấu cán bộ: Nơi chở che cho các đồng chí lãnh đạo Huyện ủy Lộc Ninh.",
          "Biến cố bom đạn năm 1972: 3 quả bom B-52 san phẳng Chánh điện, Đại đức Lâm Hên hy sinh.",
          "Ý chí bất khuất: Dựng chòi tranh giữ hương khói và tiếp tục ủng hộ cách mạng cho đến ngày 30/4/1975."
        ],
        next: "Sau chiến tranh, Chùa Sóc Lớn đã hồi sinh kỳ diệu như thế nào? Chúng ta cùng sang Slide 5 để tìm hiểu."
      }
    },

    // SLIDE 5: Quá trình phục dựng và phát triển (ĐÃ ĐƯỢC BỐ CỤC GỌN GÀNG, FIT ĐẸP THEO YÊU CẦU)
    {
      id: 5,
      title: "Hành trình phục dựng & Vươn mình phát triển",
      category: "05 · PHỤC DỰNG & TÔN VINH",
      thumb: "assets_soclon/img/thumb/s5_reconstruction.jpg",
      render: () => `
        <div class="layout-split">
          <div class="slide-content-left">
            <div class="eyebrow"><i></i> Hồi sinh từ hoang tàn</div>
            <h2 class="slide-title">Hành Trình Hồi Sinh<br><span style="color:var(--gold-bright);">& Vinh Danh Di Tích</span></h2>
            <p class="slide-lead">
              Từ đống tro tàn chiến tranh, Chùa Sóc Lớn vươn mình trỗi dậy nhờ sự chung tay của Nhà nước, chư tăng và bà con phật tử thập phương.
            </p>
            <div class="cards-grid-2">
              <div class="info-card" style="--card-accent: var(--gold);">
                <span class="timeline-step-badge" style="margin-bottom:4px;">1995</span>
                <h4>Vận động tái thiết</h4>
                <p>Ban Quản trị và phật tử khởi xướng quyên góp, từng bước dựng lại Chánh điện và nhà Sala kiên cố.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--crimson);">
                <span class="timeline-step-badge" style="background:var(--crimson); color:#FFF; margin-bottom:4px;">15/12/2004</span>
                <h4>Di tích cấp Tỉnh</h4>
                <p>Được UBND tỉnh Bình Phước ký quyết định xếp hạng là <b>Di tích Lịch sử - Văn hóa cấp Tỉnh</b>.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--amber);">
                <span class="timeline-step-badge gold" style="margin-bottom:4px;">2009 – 2015</span>
                <h4>Đại trùng tu quy mô lớn</h4>
                <p>Dự án phục dựng toàn diện với kinh phí hàng chục tỷ đồng, tái hiện trọn vẹn hoa văn kiến trúc cổ truyền.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--jungle-bright);">
                <span class="timeline-step-badge" style="background:var(--jungle-dim); color:#81C784; border-color:var(--jungle-bright); margin-bottom:4px;">Hôm nay</span>
                <h4>Top 100 điểm đến</h4>
                <p>Được tôn vinh trong <b>Top 100 điểm du lịch tâm linh tiêu biểu</b> Việt Nam, đón hàng vạn phật tử và du khách.</p>
              </div>
            </div>
          </div>
          <div class="slide-visual-right">
            <div class="photo-frame" style="height: 100%; min-height: 480px;" onclick="openZoom('assets_soclon/img/s5_reconstruction.jpg', 'Chùa Sóc Lớn sau đợt đại trùng tu khang trang rực rỡ (Ảnh thực tế)')">
              <img src="assets_soclon/img/s5_reconstruction.jpg" alt="Chùa Sóc Lớn sau phục dựng">
              <div class="photo-caption">
                <div>
                  <small>Ảnh tư liệu thực tế</small>
                  <div>Kiến trúc Chánh điện Chùa Sóc Lớn uy nghiêm sau đại dự án trùng tu hoàn mỹ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      notes: {
        intro: "Slide 5 trình bày 4 giai đoạn then chốt đưa Chùa Sóc Lớn hồi sinh ngoạn mục từ đống đổ nát chiến tranh.",
        points: [
          "Mốc 1995: Khởi đầu tái thiết với sự quyên góp của nhân dân.",
          "Mốc 15/12/2004: Được công nhận Di tích Lịch sử - Văn hóa cấp Tỉnh.",
          "Giai đoạn 2009 – 2015: Dự án đại trùng tu quy mô lớn của Nhà nước.",
          "Hiện nay: Điểm đến tâm linh tiêu biểu trong Top 100 điểm du lịch Việt Nam."
        ],
        next: "Tiếp theo, xin mời thầy cô và các bạn khám phá tổng thể quy hoạch không gian của chùa tại Slide 6."
      }
    },

    // SLIDE 6: Tổng thể kiến trúc và không gian chùa
    {
      id: 6,
      title: "Tổng thể kiến trúc & Cảnh quan quy hoạch",
      category: "06 · KIẾN TRÚC TỔNG THỂ",
      thumb: "assets_soclon/img/thumb/s6_masterplan.jpg",
      render: () => `
        <div class="layout-split">
          <div class="slide-content-left">
            <div class="eyebrow"><i></i> Bố cục quy hoạch không gian</div>
            <h2 class="slide-title">Tổng Thể Quần Thể Kiến Trúc<br><span style="color:var(--gold-bright);">Hài Hòa Giữa Thiên Nhiên</span></h2>
            <p class="slide-lead">
              Khuôn viên chùa được quy hoạch theo vũ trụ quan Phật giáo Nam tông, lấy Chánh điện làm tâm điểm tối thượng, xung quanh là các công trình phụ trợ kết nối mạch lạc.
            </p>
            <div class="cards-grid-2">
              <div class="info-card" style="--card-accent: var(--gold);">
                <div class="info-card-icon">${ICONS.temple}</div>
                <h4>1. Cổng chùa & Tường rào</h4>
                <p>Xây dựng kiên cố với 3 ngọn tháp nhọn Angkor, phù điêu chim Krud và tượng chư thiên canh giữ ranh giới.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--gold-bright);">
                <div class="info-card-icon">${ICONS.dharma}</div>
                <h4>2. Đại Chánh điện (Vihara)</h4>
                <p>Nằm ở vị trí trung tâm, quay mặt về hướng Đông đón ánh bình minh, nền cao tam cấp tượng trưng ngọn núi Meru.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--amber);">
                <div class="info-card-icon">${ICONS.people}</div>
                <h4>3. Nhà Sala cộng đồng</h4>
                <p>Công trình nhà sàn 2 tầng bề thế bên cạnh Chánh điện, phục vụ các nghi lễ thọ trai, hội họp và tiếp đón khách.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--mist);">
                <div class="info-card-icon">${ICONS.shield}</div>
                <h4>4. Khu tháp mộ để cốt</h4>
                <p>Quần thể tháp mộ thon vút nơi cất giữ tro cốt của các vị sư tiền bối và đồng bào phật tử qua nhiều thế hệ.</p>
              </div>
            </div>
            <div style="margin-top:14px; padding:10px 14px; background:rgba(29, 92, 66, 0.2); border-left:3px solid var(--jungle-bright); border-radius:6px; font-size:0.86rem; color:var(--ivory);">
              <b>5. Vành đai sinh thái:</b> Hơn 4,2 hecta rừng dầu cổ thụ nguyên sinh, rặng thốt nốt vút cao và vườn cây xanh mát bao bọc chùa.
            </div>
          </div>
          <div class="slide-visual-right">
            <div class="photo-frame" style="height: 100%; min-height: 480px;" onclick="openZoom('assets_soclon/img/s6_masterplan.jpg', 'Khuôn viên Chùa Sóc Lớn với sự hòa quyện giữa Chánh điện và rừng cây (Ảnh thực tế)')">
              <img src="assets_soclon/img/s6_masterplan.jpg" alt="Không gian Chùa Sóc Lớn">
              <div class="photo-caption">
                <div>
                  <small>Ảnh tư liệu thực tế</small>
                  <div>Không gian Chùa Sóc Lớn: Chánh điện, nhà Sala và rừng cây cổ thụ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      notes: {
        intro: "Slide 6 đưa chúng ta vào góc nhìn quy hoạch tổng thể của toàn bộ khuôn viên Chùa Sóc Lớn.",
        points: [
          "5 Hạng mục chủ đạo: Cổng tam quan, Chánh điện, Nhà Sala, Tháp cốt và Rừng cây cổ thụ.",
          "Mô hình vũ trụ quan: Chánh điện là trung tâm Meru, rừng cây và mặt nước bao quanh.",
          "Sự hài hòa: Công trình kiến trúc vàng son ẩn hiện dưới bóng mát ngàn năm của rừng Lộc Ninh."
        ],
        next: "Điểm chạm đầu tiên khi đến thăm chùa chính là Cổng Tam Quan và hệ thống tường rào. Mời quý vị đến Slide 7."
      }
    },

    // SLIDE 7: Cổng chùa và tường rào (ĐÃ SỬA ICON VECTOR, KHÔNG CÒN BỊ LỖI CHỮ Ô VUÔNG)
    {
      id: 7,
      title: "Cổng chùa & Tường rào điêu khắc",
      category: "07 · CỔNG & TƯỜNG RÀO",
      thumb: "assets_soclon/img/thumb/s7_gate_wall.jpg",
      render: () => `
        <div class="layout-split visual-left">
          <div class="slide-visual-right">
            <div class="photo-frame" style="height: 100%; min-height: 480px;" onclick="openZoom('assets_soclon/img/s7_gate_wall.jpg', 'Cổng Chùa Sóc Lớn bề thế với hoa văn Angkor và tượng linh vật bảo hộ (Ảnh thực tế)')">
              <img src="assets_soclon/img/s7_gate_wall.jpg" alt="Cổng Chùa Sóc Lớn">
              <div class="photo-caption">
                <div>
                  <small>Ảnh thực tế tại chùa</small>
                  <div>Tường rào Chùa Sóc Lớn: Phù điêu tướng khỉ Hanuman và bánh xe Pháp luân</div>
                </div>
              </div>
            </div>
          </div>
          <div class="slide-content-left">
            <div class="eyebrow"><i></i> Kiến trúc ngoại vi</div>
            <h2 class="slide-title">Cổng Tam Quan<br><span style="color:var(--gold-bright);">& Tường Rào Điêu Khắc</span></h2>
            <p class="slide-lead">
              Cổng chùa là ranh giới phân định thế giới trần tục và cõi Phật thiêng liêng, nơi gây ấn tượng thị giác mạnh mẽ với lối kiến trúc Angkor cổ kính.
            </p>
            <div class="cards-grid-2">
              <div class="info-card" style="--card-accent: var(--gold);">
                <div class="info-card-icon">${ICONS.temple}</div>
                <h4>3 Đỉnh tháp Angkor</h4>
                <p>Đỉnh cổng vươn cao 3 ngọn tháp nhọn phỏng theo Angkor Wat, chính giữa khắc họa phù điêu Thái tử Tất Đạt Đa đản sanh.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--crimson);">
                <div class="info-card-icon">${ICONS.wing}</div>
                <h4>Tượng Kinnara đỡ mái</h4>
                <p>Hình tượng nàng tiên nữ chim Kinnara với đôi cánh dang rộng đỡ góc mái, biểu trưng cho lòng bao dung và sự thuần khiết.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--amber);">
                <div class="info-card-icon">${ICONS.shield}</div>
                <h4>Phù điêu khỉ Hanuman</h4>
                <p>Dọc tường rào là phù điêu tướng khỉ Hanuman và bánh xe Pháp luân, biểu tượng cho sức mạnh kiên cường và trung nghĩa.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--timber);">
                <div class="info-card-icon">${ICONS.fire}</div>
                <h4>Thần Chằn Yeak canh gác</h4>
                <p>Cặp tượng Dạ xoa Yeak mặt dữ tợn cầm chày kim cang đứng hai bên cổng để trấn giữ, xua đuổi tà khí quấy nhiễu cõi Phật.</p>
              </div>
            </div>
          </div>
        </div>
      `,
      notes: {
        intro: "Slide 7 phân tích chi tiết mỹ thuật của Cổng tam quan và tường rào Chùa Sóc Lớn.",
        points: [
          "Kiến trúc 3 ngọn tháp nhọn Angkor trên cổng.",
          "Tượng Kinnara (nửa người nửa chim) đóng vai trò kết cấu nâng đỡ các bờ mái.",
          "Phù điêu tướng khỉ Hanuman và Dạ xoa gác cổng bảo vệ Phật pháp."
        ],
        next: "Đi qua cổng chùa, chúng ta sẽ bước tới công trình trung tâm và linh thiêng nhất: Đại Chánh điện. Mời quý vị sang Slide 8."
      }
    },

    // SLIDE 8: Chánh điện – Trung tâm tâm linh (HÌNH ẢNH TO VÀ CÂN ĐỐI 100%)
    {
      id: 8,
      title: "Chánh điện — Trái tim tâm linh ngôi chùa",
      category: "08 · ĐẠI CHÁNH ĐIỆN",
      thumb: "assets_soclon/img/thumb/s8_chanhdien.jpg",
      render: () => `
        <div class="layout-split">
          <div class="slide-content-left">
            <div class="eyebrow"><i></i> Trung tâm tín ngưỡng tối thượng</div>
            <h2 class="slide-title">Đại Chánh Điện<br><span style="color:var(--gold-bright);">(Vihara) Trang Nghiêm</span></h2>
            <p class="slide-lead">
              Chánh điện là nơi diễn ra các nghi lễ tôn giáo quan trọng nhất, nơi hội tụ tinh hoa điêu khắc, hội họa và kiến trúc đỉnh cao của Phật giáo Nam tông Khmer.
            </p>
            <div class="cards-grid-2">
              <div class="info-card" style="--card-accent: var(--gold);">
                <div class="info-card-icon">${ICONS.dharma}</div>
                <h4>Định hướng & Nền móng</h4>
                <p>Quay về hướng Đông đón nhận ánh sáng giác ngộ. Xây trên nền tam cấp cao, tượng trưng cho đỉnh núi thiêng Meru.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--crimson);">
                <div class="info-card-icon">${ICONS.temple}</div>
                <h4>Mái ngói uốn cong 3 tầng</h4>
                <p>Mái dốc lợp ngói vảy cá phân 3 cấp. Góc mái uốn cong vút hình đuôi rồng Reahu và rắn thần Naga 7 đầu xòe cánh.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--amber);">
                <div class="info-card-icon">${ICONS.star}</div>
                <h4>Bàn thờ Phật duy nhất</h4>
                <p>Nội điện chỉ thờ duy nhất tượng Đức Bổn Sư Thích Ca Mâu Ni mạ vàng uy nghi ngự trên tòa sen thiền định.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--jungle-bright);">
                <div class="info-card-icon">${ICONS.book}</div>
                <h4>Tranh bích họa 4 vách</h4>
                <p>Phủ kín các bức bích họa màu sắc rực rỡ, kể lại trọn vẹn cuộc đời Đức Phật từ đản sanh đến khi nhập Niết bàn.</p>
              </div>
            </div>
          </div>
          <div class="slide-visual-right">
            <div class="photo-frame-stack">
              <div class="photo-frame" onclick="openZoom('assets_soclon/img/s8_chanhdien.jpg', 'Không gian nội điện Chánh điện với tượng Phật Thích Ca Mâu Ni và tranh bích họa (Ảnh thực tế)')">
                <img src="assets_soclon/img/s8_chanhdien.jpg" alt="Bên trong Chánh điện">
                <div class="photo-caption">
                  <div>
                    <small>Ảnh thực tế</small>
                    <div>Nội điện Chánh điện: Tượng Phật Thích Ca tọa thiền và tranh bích họa</div>
                  </div>
                </div>
              </div>
              <div class="photo-frame" onclick="openZoom('assets_soclon/img/s8_chanhdien_ext.jpg', 'Ngoại thất Chánh điện Chùa Sóc Lớn với hệ thống mái uốn cong nhiều tầng (Ảnh thực tế)')">
                <img src="assets_soclon/img/s8_chanhdien_ext.jpg" alt="Ngoại thất Chánh điện">
                <div class="photo-caption">
                  <div>
                    <small>Ảnh thực tế</small>
                    <div>Ngoại thất Chánh điện: Mái ngói 3 tầng uốn cong vuốt đuôi rồng Reahu</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      notes: {
        intro: "Slide 8 đi sâu vào Chánh điện – 'trái tim' của toàn bộ ngôi chùa Sóc Lớn.",
        points: [
          "Định hướng Đông: Theo quan niệm Phật giáo Nam tông, Đức Phật ngồi tọa thiền quay về hướng Đông đón sao mai giác ngộ.",
          "Cấu trúc mái 3 tầng: Tượng trưng cho Tam Bảo (Phật – Pháp – Tăng) hoặc Tam giới.",
          "Nội điện: Đặc trưng duy nhất một ban thờ tôn trí Đức Phật Thích Ca.",
          "Hệ thống bích họa rực rỡ tái hiện cuộc đời Đức Phật."
        ],
        next: "Bên cạnh Chánh điện, Nhà Sala là không gian sinh hoạt cộng đồng gắn bó mật thiết với buôn sóc. Mời quý vị đến Slide 9."
      }
    },

    // SLIDE 9: Nhà Sala và các công trình phụ trợ (HÌNH ẢNH TO VÀ CÂN ĐỐI 100%)
    {
      id: 9,
      title: "Nhà Sala & Các công trình phụ trợ",
      category: "09 · NHÀ SALA & THÁP MỘ",
      thumb: "assets_soclon/img/thumb/s9_sala.jpg",
      render: () => `
        <div class="layout-split visual-left">
          <div class="slide-visual-right">
            <div class="photo-frame-stack">
              <div class="photo-frame" onclick="openZoom('assets_soclon/img/s9_sala.jpg', 'Nhà Sala 2 tầng bề thế theo kiểu nhà sàn Khmer tại Chùa Sóc Lớn (Ảnh thực tế)')">
                <img src="assets_soclon/img/s9_sala.jpg" alt="Nhà Sala Chùa Sóc Lớn">
                <div class="photo-caption">
                  <div>
                    <small>Ảnh thực tế</small>
                    <div>Nhà Sala 2 tầng: Nơi sinh hoạt văn hóa và hội họp của đồng bào sóc</div>
                  </div>
                </div>
              </div>
              <div class="photo-frame" onclick="openZoom('assets_soclon/img/s9_sala_lions.jpg', 'Hàng cột Sala và cặp sư tử đá uy nghiêm canh giữ bậc thềm (Ảnh thực tế)')">
                <img src="assets_soclon/img/s9_sala_lions.jpg" alt="Hàng cột và sư tử đá nhà Sala">
                <div class="photo-caption">
                  <div>
                    <small>Ảnh thực tế</small>
                    <div>Đôi sư tử đá uy nghiêm và hàng cột vững chãi trước tiền sảnh Sala</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="slide-content-left">
            <div class="eyebrow"><i></i> Không gian gắn kết đạo và đời</div>
            <h2 class="slide-title">Nhà Sala Cộng Đồng<br><span style="color:var(--gold-bright);">& Tháp Mộ Tổ Tiên</span></h2>
            <p class="slide-lead">
              Nếu Chánh điện là cõi thiêng thì Nhà Sala là ngôi nhà chung ấm áp của buôn sóc, nơi diễn ra các hoạt động tiếp khách, làm lễ thọ trai và sinh hoạt cộng đồng.
            </p>
            <div class="cards-grid-2">
              <div class="info-card" style="--card-accent: var(--gold);">
                <div class="info-card-icon">${ICONS.temple}</div>
                <h4>Kiến trúc nhà sàn 2 tầng</h4>
                <p>Tầng trệt thoáng đãng tiếp khách; tầng trên là giảng đường thuyết pháp trang nghiêm lót sàn gỗ mát mẻ.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--amber);">
                <div class="info-card-icon">${ICONS.wing}</div>
                <h4>Hàng cột chạm chim Krud</h4>
                <p>Cột đỡ mái ngoài hiên được đắp nổi chim thần Krud (Garuda) dang đôi cánh lực lưỡng nâng đỡ bờ mái.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--mist);">
                <div class="info-card-icon">${ICONS.shield}</div>
                <h4>Khu tháp để cốt thiêng liêng</h4>
                <p>Quần thể tháp mộ lưu giữ tro cốt tiền nhân và các vị hòa thượng, thể hiện lòng hiếu đạo 'Uống nước nhớ nguồn'.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--jungle-bright);">
                <div class="info-card-icon">${ICONS.people}</div>
                <h4>Tăng xá & Giảng đường</h4>
                <p>Khu vực sinh hoạt nội bộ của tăng chúng tu học, tiếp nối dòng truyền thừa Phật giáo qua nhiều thế hệ sư trẻ.</p>
              </div>
            </div>
          </div>
        </div>
      `,
      notes: {
        intro: "Slide 9 giới thiệu Nhà Sala – không gian mang đậm tính cộng đồng của người Khmer.",
        points: [
          "Chức năng đa dạng: Nơi sinh hoạt văn hóa, dùng bữa, hội họp và tiếp đón khách quý.",
          "Kiến trúc nhà sàn Khmer 2 tầng thoáng mát.",
          "Cột chạm chim Krud và quần thể tháp mộ tổ tiên."
        ],
        next: "Điểm làm nên nét độc đáo của ngôi chùa chính là hệ thống điêu khắc 5 linh vật huyền thoại. Mời quý vị đến Slide 10."
      }
    },

    // SLIDE 10: Nghệ thuật điêu khắc và hệ thống linh vật (HÌNH ẢNH TO VÀ CÂN ĐỐI 100%)
    {
      id: 10,
      title: "Nghệ thuật điêu khắc & 5 Linh vật Khmer",
      category: "10 · LINH VẬT THẦN THOẠI",
      thumb: "assets_soclon/img/thumb/s10_creatures.jpg",
      render: () => `
        <div class="layout-split">
          <div class="slide-content-left">
            <div class="eyebrow"><i></i> Tinh hoa biểu tượng thần thoại</div>
            <h2 class="slide-title">5 Linh Vật Bảo Hộ<br><span style="color:var(--gold-bright);">Trong Mỹ Thuật Chùa Sóc Lớn</span></h2>
            <p class="slide-lead">
              Nghệ thuật chạm khắc Chùa Sóc Lớn là sự dung hợp tài tình giữa thần thoại Ấn Độ cổ đại và giáo lý từ bi của đạo Phật Nam tông.
            </p>
            <div class="cards-grid-3">
              <div class="info-card" style="--card-accent: var(--gold);">
                <div class="info-card-icon">${ICONS.dharma}</div>
                <h4>1. Rắn thần Naga</h4>
                <p>Thần nước xòe 7 đầu uốn lượn lan can, che mưa chở gió cho Đức Phật đắc đạo.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--crimson);">
                <div class="info-card-icon">${ICONS.wing}</div>
                <h4>2. Chim thần Garuda</h4>
                <p>Chúa tể bầu trời (Krud) dang cánh đỡ mái, tiêu trừ tà ma và hiểm họa.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--timber);">
                <div class="info-card-icon">${ICONS.fire}</div>
                <h4>3. Thần Chằn Yeak</h4>
                <p>Dạ xoa hung dữ được Phật cảm hóa, gác cổng xua đuổi điều dữ, giữ bình yên.</p>
              </div>
            </div>
            <div class="cards-grid-2" style="margin-top:12px;">
              <div class="info-card" style="--card-accent: var(--amber);">
                <div class="info-card-icon">${ICONS.star}</div>
                <h4>4. Nàng tiên Kinnara</h4>
                <p>Nửa người nửa chim, biểu trưng cho vẻ đẹp nghệ thuật, ca múa và lòng bao dung.</p>
              </div>
              <div class="info-card" style="--card-accent: #7E57C2;">
                <div class="info-card-icon">${ICONS.shield}</div>
                <h4>5. Quái vật Rahu (Reahu)</h4>
                <p>Mặt ngậm nhật nguyệt đắp nổi diềm mái, nhắc nhở quy luật vô thường và sự thanh lọc tâm hồn.</p>
              </div>
            </div>
          </div>
          <div class="slide-visual-right">
            <div class="photo-frame-stack">
              <div class="photo-frame" onclick="openZoom('assets_soclon/img/s10_creatures.jpg', 'Phù điêu bánh xe Pháp luân và chư thiên hộ trì chánh điện Chùa Sóc Lớn (Ảnh thực tế)')">
                <img src="assets_soclon/img/s10_creatures.jpg" alt="Phù điêu chư thiên Chùa Sóc Lớn">
                <div class="photo-caption">
                  <div>
                    <small>Ảnh thực tế</small>
                    <div>Phù điêu bánh xe Pháp luân và chư thiên hộ trì quanh Chánh điện</div>
                  </div>
                </div>
              </div>
              <div class="photo-frame" onclick="openZoom('assets_soclon/img/s10_lion.jpg', 'Tượng sư tử canh cổng dũng mãnh và trang nghiêm tại khuôn viên chùa (Ảnh thực tế)')">
                <img src="assets_soclon/img/s10_lion.jpg" alt="Tượng sư tử đá">
                <div class="photo-caption">
                  <div>
                    <small>Ảnh thực tế</small>
                    <div>Tượng sư tử đá uy dũng trấn giữ lối vào khuôn viên chùa</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      notes: {
        intro: "Slide 10 giới thiệu hệ thống 5 linh vật Khmer đặc sắc hiện diện khắp các chi tiết của Chùa Sóc Lớn.",
        points: [
          "Naga: Loài rắn thần gắn liền tích vua rắn Mucalinda che mưa cho Phật.",
          "Garuda (Krud): Chúa tể bầu trời, ánh sáng chính nghĩa.",
          "Chằn Yeak: Dạ xoa được cảm hóa thành hộ pháp gác cổng.",
          "Kinnara: Nữ thần chim đại diện cho sự thanh cao và âm nhạc.",
          "Rahu: Biểu tượng cho sự vô thường của vạn vật."
        ],
        next: "Cảnh quan thiên nhiên của chùa cũng mang ý nghĩa biểu tượng sâu xa. Mời quý vị đến Slide 11."
      }
    },

    // SLIDE 11: Cảnh quan thiên nhiên và ý nghĩa biểu tượng (HÌNH ẢNH TO VÀ CÂN ĐỐI 100%)
    {
      id: 11,
      title: "Cảnh quan thiên nhiên & Ý nghĩa biểu tượng",
      category: "11 · CẢNH QUAN & Ý NGHĨA",
      thumb: "assets_soclon/img/thumb/s11_nature.jpg",
      render: () => `
        <div class="layout-split visual-left">
          <div class="slide-visual-right">
            <div class="photo-frame-stack">
              <div class="photo-frame" onclick="openZoom('assets_soclon/img/s11_nature.jpg', 'Hàng cây thốt nốt và rừng dầu cổ thụ râm mát bao bọc Chùa Sóc Lớn (Ảnh thực tế)')">
                <img src="assets_soclon/img/s11_nature.jpg" alt="Hàng cây thốt nốt Chùa Sóc Lớn">
                <div class="photo-caption">
                  <div>
                    <small>Ảnh thực tế</small>
                    <div>Hàng thốt nốt vươn cao bên cạnh những tán cây cổ thụ đại thụ</div>
                  </div>
                </div>
              </div>
              <div class="photo-frame" onclick="openZoom('assets_soclon/img/s11_courtyard.jpg', 'Sân chùa rộng rãi và yên tĩnh dưới bóng mát cây xanh đại thụ (Ảnh thực tế)')">
                <img src="assets_soclon/img/s11_courtyard.jpg" alt="Sân chùa rợp bóng mát">
                <div class="photo-caption">
                  <div>
                    <small>Ảnh thực tế</small>
                    <div>Sân chùa thoáng đãng, nơi đón tiếp bà con và du khách thập phương</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="slide-content-left">
            <div class="eyebrow" style="color:var(--jungle-bright);"><i></i> Không gian sinh thái thiền định</div>
            <h2 class="slide-title">Tiểu Vũ Trụ Xanh<br><span style="color:var(--gold-bright);">& Triết Lý Giác Ngộ</span></h2>
            <p class="slide-lead">
              Hơn 4,2 hecta rừng cây cổ thụ biến Chùa Sóc Lớn thành một 'ốc đảo xanh' thanh tịnh, nơi con người rũ bỏ muộn phiền để tìm về sự tĩnh lặng tâm can.
            </p>
            <div class="cards-grid-2">
              <div class="info-card" style="--card-accent: var(--jungle-bright);">
                <div class="info-card-icon">${ICONS.nature}</div>
                <h4>Cây Thốt Nốt kiên cường</h4>
                <p>Biểu tượng người Khmer: mộc mạc, bền bỉ, dẻo dai bám rễ vươn cao thách thức nắng gió miền biên giới.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--gold);">
                <div class="info-card-icon">${ICONS.dharma}</div>
                <h4>Cây Bồ Đề giác ngộ</h4>
                <p>Cội bồ đề đại thụ tỏa bóng râm mát, gợi nhắc sự kiện Đức Phật chứng đạt quả vị Chánh đẳng Chánh giác.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--amber);">
                <div class="info-card-icon">${ICONS.temple}</div>
                <h4>Mô hình Núi Meru</h4>
                <p>Chánh điện vươn cao như đỉnh núi thiêng trung tâm vũ trụ; khuôn viên xanh tượng trưng đại dương bao la.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--mist);">
                <div class="info-card-icon">${ICONS.heart}</div>
                <h4>Âm thanh thiền tịnh</h4>
                <p>Tiếng chuông chùa ngân nga hòa vào tiếng lá reo và tiếng chim rừng, mang lại nguồn năng lượng an lạc.</p>
              </div>
            </div>
          </div>
        </div>
      `,
      notes: {
        intro: "Slide 11 phân tích sự hòa quyện tuyệt vời giữa thiên nhiên và kiến trúc tâm linh tại Chùa Sóc Lớn.",
        points: [
          "Hệ sinh thái xanh: Rừng dầu, thốt nốt, bồ đề bao phủ 4,2 hecta.",
          "Cây Thốt nốt tượng trưng cho cốt cách kiên cường người Khmer.",
          "Không gian thiền định thoát tục giữa nhịp sống hiện đại."
        ],
        next: "Tiếp theo, chúng ta cùng tìm hiểu về các con người và cộng đồng gắn bó với chùa ở Slide 12."
      }
    },

    // SLIDE 12: Người sử dụng và vai trò cộng đồng
    {
      id: 12,
      title: "Con người & Vai trò trung tâm cộng đồng",
      category: "12 · CỘNG ĐỒNG DÂN CƯ",
      thumb: "assets_soclon/img/thumb/s12_community.jpg",
      render: () => `
        <div class="layout-split">
          <div class="slide-content-left">
            <div class="eyebrow"><i></i> Trung tâm kết nối xã hội</div>
            <h2 class="slide-title">Linh Hồn Của Buôn Sóc<br><span style="color:var(--gold-bright);">& Ngôi Nhà Đại Đoàn Kết</span></h2>
            <p class="slide-lead">
              Người Khmer có câu: 'Sống vào chùa gửi thân, chết vào chùa gửi cốt'. Chùa Sóc Lớn là nơi gắn bó máu thịt với đời sống con người từ lúc sinh ra đến khi tạ thế.
            </p>
            <div class="cards-grid-2">
              <div class="info-card" style="--card-accent: var(--gold);">
                <div class="info-card-icon">${ICONS.dharma}</div>
                <h4>Chư tăng & Ban Quản trị</h4>
                <p>Những vị sư thầy đức độ dẫn dắt đời sống tinh thần, giữ gìn giới luật và truyền bá nếp sống thiện lành cho bà con.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--crimson);">
                <div class="info-card-icon">${ICONS.heart}</div>
                <h4>Đồng bào Khmer bản địa</h4>
                <p>Mọi cột mốc đời người (đặt tên, học chữ, tu báo hiếu, cưới hỏi, lễ tang) đều diễn ra trang trọng dưới mái chùa.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--amber);">
                <div class="info-card-icon">${ICONS.people}</div>
                <h4>Đồng bào Kinh & Stiêng</h4>
                <p>Cùng sinh sống chan hòa tại Lộc Khánh, thường xuyên viếng chùa, thắt chặt tình đoàn kết các dân tộc anh em.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--jungle-bright);">
                <div class="info-card-icon">${ICONS.book}</div>
                <h4>Học sinh & Du khách</h4>
                <p>Điểm đến lý tưởng cho các buổi học tập trải nghiệm lịch sử, giáo dục địa phương và du lịch văn hóa tâm linh.</p>
              </div>
            </div>
          </div>
          <div class="slide-visual-right">
            <div class="photo-frame" style="height: 100%; min-height: 480px;" onclick="openZoom('assets_soclon/img/s12_community.jpg', 'Chư tăng và bà con phật tử sum họp tại Chùa Sóc Lớn (Ảnh: Báo Bình Phước / Tư liệu)')">
              <img src="assets_soclon/img/s12_community.jpg" alt="Cộng đồng phật tử Chùa Sóc Lớn">
              <div class="photo-caption">
                <div>
                  <small>Ảnh tư liệu thực tế</small>
                  <div>Chư tăng và bà con phật tử Khmer sum họp tại Chùa Sóc Lớn</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      notes: {
        intro: "Slide 12 nhấn mạnh khía cạnh con người – yếu tố làm cho ngôi chùa trở thành 'trái tim sống' của vùng đất Lộc Ninh.",
        points: [
          "Mối gắn kết máu thịt với đời sống người dân Khmer từ lúc sinh ra đến khi tạ thế.",
          "Chư tăng là tấm gương đạo đức và hòa giải buôn làng.",
          "Khối đại đoàn kết bền chặt giữa người Khmer, Kinh và Stiêng."
        ],
        next: "Đặc biệt, Chùa Sóc Lớn còn đảm nhận sứ mệnh: Trường học văn hóa và đạo đức. Mời quý vị theo dõi ở Slide 13."
      }
    },

    // SLIDE 13: Vai trò giáo dục truyền thống
    {
      id: 13,
      title: "Chùa Sóc Lớn — Trường học văn hóa và đạo đức",
      category: "13 · GIÁO DỤC TRUYỀN THỐNG",
      thumb: "assets_soclon/img/thumb/s13_education.jpg",
      render: () => `
        <div class="layout-split visual-left">
          <div class="slide-visual-right">
            <div class="photo-frame" style="height: 100%; min-height: 480px;" onclick="openZoom('assets_soclon/img/s13_education.jpg', 'Lớp học chữ Khmer miễn phí và giáo dục truyền thống đạo đức tại Chùa Sóc Lớn (Ảnh: Báo Bình Phước)')">
              <img src="assets_soclon/img/s13_education.jpg" alt="Lớp học chữ Khmer tại chùa">
              <div class="photo-caption">
                <div>
                  <small>Ảnh thực tế tại chùa</small>
                  <div>Lớp học chữ Khmer miễn phí dịp hè cho con em đồng bào tại chùa</div>
                </div>
              </div>
            </div>
          </div>
          <div class="slide-content-left">
            <div class="eyebrow"><i></i> Cái nôi bảo tồn tri thức cội nguồn</div>
            <h2 class="slide-title">Ngôi Trường Của Sóc<br><span style="color:var(--gold-bright);">Gìn Giữ Tiếng Nói & Đạo Đức</span></h2>
            <p class="slide-lead">
              Từ bao đời nay, mái chùa Khmer đảm nhận sứ mệnh cao cả như một trường học dân tộc, nơi truyền dạy ngôn ngữ mẹ đẻ và rèn giũa nhân cách cho thế hệ trẻ.
            </p>
            <div class="cards-grid-2">
              <div class="info-card" style="--card-accent: var(--gold);">
                <div class="info-card-icon">${ICONS.book}</div>
                <h4>Lớp dạy chữ Khmer hè</h4>
                <p>Mở đều đặn vào dịp hè do các nhà sư trực tiếp đứng lớp giảng dạy miễn phí, giúp con em biết đọc, biết viết chữ mẹ đẻ.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--crimson);">
                <div class="info-card-icon">${ICONS.heart}</div>
                <h4>Tục đi tu báo hiếu</h4>
                <p>Thanh niên Khmer đến tuổi trưởng thành thường vào chùa tu ngắn hạn để học đạo làm người và đền đáp công ơn cha mẹ.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--amber);">
                <div class="info-card-icon">${ICONS.star}</div>
                <h4>Kinh sách lá buông</h4>
                <p>Nơi bảo tồn các thư tịch cổ quý hiếm, những bài học luân lý, ca dao và truyện cổ răn dạy lòng hiếu thảo, tính trung thực.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--jungle-bright);">
                <div class="info-card-icon">${ICONS.nature}</div>
                <h4>Giáo dục lối sống thiện</h4>
                <p>Rèn luyện nếp sống kỷ luật, tôn trọng thiên nhiên, giữ gìn vệ sinh chung và ứng xử kính trên nhường dưới.</p>
              </div>
            </div>
          </div>
        </div>
      `,
      notes: {
        intro: "Slide 13 làm nổi bật vai trò giáo dục đặc sắc – một nét son của Phật giáo Nam tông Khmer tại Chùa Sóc Lớn.",
        points: [
          "Lớp học chữ Khmer miễn phí mùa hè gìn giữ ngôn ngữ mẹ đẻ.",
          "Tục đi tu báo hiếu cha mẹ: rèn luyện đạo đức nhân cách bắt buộc trước khi lập gia đình.",
          "Môi trường giáo dục nếp sống hiền hòa, vị tha."
        ],
        next: "Không khí tại Chùa Sóc Lớn trở nên náo nhiệt nhất trong các mùa lễ hội truyền thống. Mời các bạn cùng đến Slide 14."
      }
    },

    // SLIDE 14: Không gian lễ hội truyền thống
    {
      id: 14,
      title: "Không gian lễ hội truyền thống & Nghệ thuật",
      category: "14 · LỄ HỘI DÂN TỘC",
      thumb: "assets_soclon/img/thumb/s14_festivals.jpg",
      render: () => `
        <div class="layout-split">
          <div class="slide-content-left">
            <div class="eyebrow" style="color:var(--crimson);"><i></i> Sắc màu văn hóa rực rỡ</div>
            <h2 class="slide-title">3 Đại Lễ Hội Khmer<br><span style="color:var(--gold-bright);">& Âm Vang Dàn Nhạc Ngũ Âm</span></h2>
            <p class="slide-lead">
              Mỗi dịp lễ hội, sân chùa bừng sáng như một ngày hội lớn của cả vùng với trang phục truyền thống rực rỡ, điệu múa Lâm Thôn và âm nhạc rộn rã.
            </p>
            <div class="timeline-track" style="margin-top:16px;">
              <div class="timeline-step">
                <span class="timeline-step-badge">Tháng 4 DL</span>
                <h4>Chôl Chnăm Thmây</h4>
                <p>Tết đón năm mới cổ truyền; đắp núi cát tích phước, tắm tượng Phật và té nước chúc phúc thanh tẩy muộn phiền.</p>
              </div>
              <div class="timeline-step">
                <span class="timeline-step-badge gold">Tháng 8-9 ÂL</span>
                <h4>Sene Đôlta</h4>
                <p>Đại lễ cúng ông bà tổ tiên; tri ân sâu nặng với đấng sinh thành, làm lễ đặt cơm vắt cầu siêu linh hồn người đã khuất.</p>
              </div>
              <div class="timeline-step">
                <span class="timeline-step-badge">Rằm 10 ÂL</span>
                <h4>Óok Om Bók</h4>
                <p>Lễ cúng trăng tạ ơn mùa màng bội thu; nghi thức đút cốm dẹp cho trẻ nhỏ và thả hoa đăng ước nguyện an lành.</p>
              </div>
            </div>
            <div style="margin-top:14px; padding:12px 16px; background:rgba(212, 154, 61, 0.16); border-left:3px solid var(--gold); border-radius:6px; font-size:0.88rem; color:var(--ivory);">
              <b>Âm nhạc & Diễn xướng:</b> Âm vang dồn dập của dàn nhạc ngũ âm (Pinpeat), trống Sadam hòa cùng điệu múa Lâm Thôn uyển chuyển thâu đêm.
            </div>
          </div>
          <div class="slide-visual-right">
            <div class="photo-frame" style="height: 100%; min-height: 480px;" onclick="openZoom('assets_soclon/img/s14_festivals.jpg', 'Đoàn diễn xướng mặt nạ Chằn Yeak và trang phục lễ hội truyền thống cùng chư tăng tại cổng chùa (Ảnh: Báo Ngày Nay / Tư liệu)')">
              <img src="assets_soclon/img/s14_festivals.jpg" alt="Lễ hội truyền thống Chùa Sóc Lớn">
              <div class="photo-caption">
                <div>
                  <small>Ảnh tư liệu thực tế</small>
                  <div>Đoàn diễn xướng mặt nạ Chằn Yeak và trang phục lễ hội cùng chư tăng tại chùa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      notes: {
        intro: "Slide 14 tái hiện không gian lễ hội tưng bừng – phần hồn rực rỡ nhất trong đời sống văn hóa Chùa Sóc Lớn.",
        points: [
          "Chôl Chnăm Thmây (Tháng 4 DL): Tết đón năm mới với phong tục té nước cầu may.",
          "Sene Đôlta (Tháng 8-9 ÂL): Báo hiếu ông bà tổ tiên.",
          "Óok Om Bók (Rằm 10 ÂL): Lễ cúng trăng mừng mùa cốm dẹp bội thu.",
          "Dàn nhạc ngũ âm rộn rã và điệu múa Lâm Thôn gắn kết mọi người."
        ],
        next: "Chúng ta cùng nhìn lại các giá trị cốt lõi của di sản tại Slide 15."
      }
    },

    // SLIDE 15: Giá trị di sản, sự tôn vinh và thông điệp cốt lõi
    {
      id: 15,
      title: "Giá trị di sản & Thông điệp kết luận",
      category: "15 · GIÁ TRỊ DI SẢN",
      thumb: "assets_soclon/img/thumb/s15_conclusion.jpg",
      render: () => `
        <div class="layout-split">
          <div class="slide-content-left">
            <div class="eyebrow"><i></i> Tinh hoa hội tụ & Trách nhiệm tương lai</div>
            <h2 class="slide-title">Viên Ngọc Quý Di Sản<br><span style="color:var(--gold-bright);">Vùng Đất Biên Cương Lộc Ninh</span></h2>
            <p class="slide-lead">
              Chùa Sóc Lớn là tài sản văn hóa vô giá của tỉnh Bình Phước, hội tụ trọn vẹn 4 giá trị cốt lõi trường tồn với thời gian.
            </p>
            <div class="cards-grid-2">
              <div class="info-card" style="--card-accent: var(--crimson);">
                <div class="info-card-icon">${ICONS.shield}</div>
                <h4>1. Giá trị Lịch sử Kháng chiến</h4>
                <p>Căn cứ cách mạng kiên trung, chứng nhân của cuộc đấu tranh anh dũng chống giặc ngoại xâm giải phóng quê hương.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--gold);">
                <div class="info-card-icon">${ICONS.temple}</div>
                <h4>2. Giá trị Nghệ thuật Kiến trúc</h4>
                <p>Bảo tàng sống động về kiến trúc Angkor và nghệ thuật điêu khắc, bích họa cổ truyền của người Khmer Nam Bộ.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--amber);">
                <div class="info-card-icon">${ICONS.book}</div>
                <h4>3. Giá trị Văn hóa & Tín ngưỡng</h4>
                <p>Cái nôi gìn giữ ngôn ngữ, phong tục tập quán, đạo đức và các lễ hội truyền thống đặc sắc của dân tộc.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--jungle-bright);">
                <div class="info-card-icon">${ICONS.people}</div>
                <h4>4. Biểu tượng Đoàn kết Dân tộc</h4>
                <p>Nhịp cầu thắt chặt tình cảm anh em gắn bó keo sơn giữa đồng bào Khmer, Kinh và Stiêng nơi miền biên ải.</p>
              </div>
            </div>
            <div class="quote-box" style="margin-top:16px; background:linear-gradient(135deg, rgba(230,179,37,0.2) 0%, rgba(184,36,42,0.25) 100%); border-left:4px solid var(--gold-bright);">
              <b>THÔNG ĐIỆP HÀNH ĐỘNG:</b><br>
              “Trân trọng quá khứ – Gìn giữ bản sắc – Phát huy giá trị di sản Chùa Sóc Lớn trường tồn cùng non sông đất nước!”
            </div>
          </div>
          <div class="slide-visual-right">
            <div class="photo-frame" style="height: 100%; min-height: 480px;" onclick="openZoom('assets_soclon/img/s15_conclusion.jpg', 'Ngọn tháp Chùa Sóc Lớn vươn cao kiêu hãnh giữa đất trời Bình Phước (Ảnh thực tế)')">
              <img src="assets_soclon/img/s15_conclusion.jpg" alt="Tháp Chùa Sóc Lớn">
              <div class="photo-caption">
                <div>
                  <small>Ảnh tư liệu thực tế</small>
                  <div>Ngọn tháp Chùa Sóc Lớn vươn cao kiêu hãnh giữa đất trời Lộc Ninh, Bình Phước</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `,
      notes: {
        intro: "Slide 15 đúc kết toàn bộ ý nghĩa cốt lõi của chuyên đề Chùa Sóc Lớn.",
        points: [
          "Tổng kết 4 giá trị trường tồn: Lịch sử, Kiến trúc, Văn hóa và Đoàn kết dân tộc.",
          "Khẳng định trách nhiệm thế hệ trẻ trong việc bảo tồn và quảng bá di sản quê hương."
        ],
        next: "Và ngay sau đây là lời tri ân bế mạc gửi tới Thầy Cô và các bạn ở Slide 16."
      }
    },

    // SLIDE 16: LỜI KẾT & CẢM ƠN (SLIDE MỚI ĐƯỢC BỔ SUNG THEO YÊU CẦU)
    {
      id: 16,
      title: "XIN CẢM ƠN THẦY CÔ VÀ CÁC BẠN ĐÃ LẮNG NGHE!",
      category: "16 · LỜI KẾT & CẢM ƠN",
      thumb: "assets_soclon/img/thumb/s1_cover.jpg",
      render: () => `
        <div class="layout-cover">
          <div class="cover-left">
            <div class="eyebrow"><i></i> KẾT THÚC BÀI THUYẾT TRÌNH</div>
            <h1 class="hero-main-title" style="font-size:3.2rem;">
              XIN CHÂN THÀNH CẢM ƠN!
              <span style="font-size:1.8rem; color:var(--gold-bright); margin-top:8px;">Quý Thầy Cô & Các Bạn Đã Lắng Nghe!</span>
            </h1>
            <p class="hero-desc" style="font-size:1.05rem; margin-bottom:24px;">
              Kính chúc Quý Thầy Cô luôn dồi dào sức khỏe và công tác tốt, chúc các bạn học tập thật tốt và luôn tự hào về những di sản văn hóa quý báu của quê hương Bình Phước!
            </p>
            <div class="cards-grid-3" style="margin-top:0;">
              <div class="info-card" style="--card-accent: var(--gold); padding:16px;">
                <div class="info-card-icon">${ICONS.temple}</div>
                <h4 style="font-size:1rem;">Tự hào Di sản</h4>
                <p style="font-size:0.82rem;">Wat Phum Thum — Biểu tượng văn hóa Phật giáo Nam tông Khmer cổ nhất Bình Phước.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--crimson); padding:16px;">
                <div class="info-card-icon">${ICONS.heart}</div>
                <h4 style="font-size:1rem;">Đoàn kết Dân tộc</h4>
                <p style="font-size:0.82rem;">Tôn vinh nét đẹp văn hóa truyền thống gắn bó keo sơn giữa các dân tộc Khmer, Kinh, Stiêng.</p>
              </div>
              <div class="info-card" style="--card-accent: var(--amber); padding:16px;">
                <div class="info-card-icon">${ICONS.star}</div>
                <h4 style="font-size:1rem;">Thảo luận & Góp ý</h4>
                <p style="font-size:0.82rem;">Kính mời Thầy Cô và các bạn cùng đặt câu hỏi, đóng góp ý kiến để hoàn thiện bài học!</p>
              </div>
            </div>
            <div class="quote-box" style="margin-top:20px; padding:12px 18px; font-size:0.95rem; border-left-color:var(--gold-bright);">
              <b>BÀI BÁO CÁO MÔN:</b> GIÁO DỤC ĐỊA PHƯƠNG TỈNH BÌNH PHƯỚC · CHỦ ĐỀ CHÙA SÓC LỚN (WAT PHUM THUM)
            </div>
          </div>
          <div class="cover-right" onclick="openZoom('assets_soclon/img/s1_cover.jpg', 'Chùa Sóc Lớn tỏa sáng trong ánh bình minh (Ảnh thực tế tại chùa)')">
            <img src="assets_soclon/img/s1_cover.jpg" alt="Chùa Sóc Lớn">
            <div class="photo-caption">
              <div>
                <small>Ảnh tư liệu thực tế</small>
                <div>Chùa Sóc Lớn — Niềm tự hào di sản văn hóa Lộc Ninh, Bình Phước</div>
              </div>
            </div>
          </div>
        </div>
      `,
      notes: {
        intro: "Kính thưa Thầy Cô và các bạn, bài thuyết trình chuyên đề Chùa Sóc Lớn của nhóm chúng em xin được khép lại tại đây.",
        points: [
          "Gửi lời cảm ơn chân thành đến Thầy Cô đã tạo điều kiện và hướng dẫn chúng em thực hiện bài nghiên cứu.",
          "Cảm ơn các bạn trong lớp đã chú ý lắng nghe và đồng hành cùng nhóm.",
          "Mời Thầy Cô đưa ra những nhận xét quý báu và mời các bạn đặt câu hỏi thảo luận."
        ],
        next: "Đã hoàn thành toàn bộ 16 slide thuyết trình. Nhóm em rất sẵn sàng giải đáp mọi thắc mắc của Thầy Cô và các bạn!"
      }
    }
  ];

  /* --------------------------------------------------------------------------
     2. QUẢN LÝ TRẠNG THÁI VÀ ĐIỀU HƯỚNG SLIDE
     -------------------------------------------------------------------------- */
  let currentIndex = 0;
  const totalSlides = slidesData.length;

  const stage = $('#stage');
  const topCur = $('#topCur');
  const topTotal = $('#topTotal');
  const botCur = $('#botCur');
  const botTotal = $('#botTotal');
  const progFill = $('#progFill');
  const ticksContainer = $('#ticks');
  const btnPrev = $('#btnPrev');
  const btnNext = $('#btnNext');
  const fsPrev = $('#fsPrev');
  const fsNext = $('#fsNext');
  const btnFs = $('#btnFs');
  const btnToc = $('#btnToc');
  const btnNotes = $('#btnNotes');
  const btnHelp = $('#btnHelp');
  const tocOverlay = $('#tocOverlay');
  const tocBody = $('#tocBody');
  const helpOverlay = $('#helpOverlay');
  const notesPanel = $('#notesPanel');
  const notesSlideTitle = $('#notesSlideTitle');
  const notesBody = $('#notesBody');
  const notesClose = $('#notesClose');
  const toastEl = $('#toast');

  // Khởi tạo các phần tử slide vào DOM
  function renderAllSlides() {
    stage.innerHTML = '';
    slidesData.forEach((s, idx) => {
      const slideEl = document.createElement('section');
      slideEl.className = 'slide';
      slideEl.id = `slide-${idx + 1}`;
      slideEl.setAttribute('data-index', idx);
      slideEl.setAttribute('aria-label', `Slide ${idx + 1}: ${s.title}`);
      slideEl.innerHTML = s.render();
      stage.appendChild(slideEl);
    });

    // Tạo các tick đánh dấu trên thanh tiến trình
    ticksContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const tick = document.createElement('button');
      tick.className = 'tick';
      tick.type = 'button';
      tick.setAttribute('aria-label', `Chuyển đến Slide ${i + 1}`);
      tick.addEventListener('click', () => goToSlide(i));
      ticksContainer.appendChild(tick);
    }

    // Tạo danh sách mục lục (TOC Drawer)
    tocBody.innerHTML = '';
    slidesData.forEach((s, idx) => {
      const item = document.createElement('button');
      item.className = 'toc-item';
      item.type = 'button';
      item.innerHTML = `
        <span class="toc-idx">${pad(idx + 1)}</span>
        <img class="toc-thumb" src="${s.thumb}" alt="${s.title}" loading="lazy">
        <div class="toc-info">
          <small>${s.category}</small>
          <b>${s.title}</b>
        </div>
      `;
      item.addEventListener('click', () => {
        goToSlide(idx);
        closeOverlays();
      });
      tocBody.appendChild(item);
    });

    topTotal.textContent = pad(totalSlides);
    botTotal.textContent = pad(totalSlides);
  }

  // Chuyển đến slide chỉ định
  function goToSlide(targetIdx) {
    const idx = clamp(targetIdx, 0, totalSlides - 1);
    if (idx === currentIndex && document.querySelector('.slide.active')) return;

    currentIndex = idx;
    location.hash = `#${idx + 1}`;

    // Cập nhật class active cho slide
    const allSlideEls = $$('.slide', stage);
    allSlideEls.forEach((el, i) => {
      if (i === idx) {
        el.classList.add('active');
        el.removeAttribute('aria-hidden');
      } else {
        el.classList.remove('active');
        el.setAttribute('aria-hidden', 'true');
      }
    });

    // Cập nhật số đếm slide
    const strCur = pad(idx + 1);
    topCur.textContent = strCur;
    botCur.textContent = strCur;

    // Cập nhật thanh tiến trình
    const percent = ((idx) / (totalSlides - 1)) * 100;
    progFill.style.width = `${percent}%`;

    // Cập nhật các tick
    const allTicks = $$('.tick', ticksContainer);
    allTicks.forEach((t, i) => {
      t.classList.toggle('active', i === idx);
      t.classList.toggle('done', i < idx);
    });

    // Cập nhật trạng thái mục lục
    const allTocItems = $$('.toc-item', tocBody);
    allTocItems.forEach((item, i) => {
      item.classList.toggle('active', i === idx);
    });

    // Cập nhật nút điều hướng
    btnPrev.disabled = (idx === 0);
    btnNext.disabled = (idx === totalSlides - 1);
    if (idx === totalSlides - 1) {
      btnNext.classList.remove('primary');
    } else {
      btnNext.classList.add('primary');
    }

    // Cập nhật Lời dẫn thuyết trình (Speaker Notes)
    updateSpeakerNotes(idx);
  }

  // Cập nhật nội dung Lời dẫn thuyết trình
  function updateSpeakerNotes(idx) {
    const s = slidesData[idx];
    if (!s || !s.notes) return;
    notesSlideTitle.textContent = `Slide ${pad(idx + 1)}: ${s.title}`;
    notesBody.innerHTML = `
      <div class="notes-section">
        <small>Lời mở đầu & Kết nối</small>
        <p>${s.notes.intro}</p>
      </div>
      <div class="notes-section">
        <small>Ý chính cần nhấn mạnh</small>
        <ul>
          ${s.notes.points.map(pt => `<li>${pt}</li>`).join('')}
        </ul>
      </div>
      <div class="notes-section">
        <small>Câu chuyển tiếp slide sau</small>
        <p class="notes-next-cue">👉 <em>${s.notes.next}</em></p>
      </div>
    `;
  }

  // Chuyển slide tiếp / lùi
  function nextSlide() {
    if (currentIndex < totalSlides - 1) goToSlide(currentIndex + 1);
  }
  function prevSlide() {
    if (currentIndex > 0) goToSlide(currentIndex - 1);
  }

  // Thông báo toast
  let toastTimer = 0;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  // Bật / tắt Lời dẫn thuyết trình
  function toggleNotes() {
    const isOpen = document.body.classList.toggle('notes-open');
    btnNotes.setAttribute('aria-pressed', isOpen ? 'true' : 'false');
    btnNotes.classList.toggle('active', isOpen);
    notesPanel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    showToast(isOpen ? 'Đã bật Lời dẫn thuyết trình (N)' : 'Đã ẩn Lời dẫn thuyết trình');
  }

  // Bật / tắt Toàn màn hình
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        document.body.classList.add('fs');
        showToast('Chế độ Toàn màn hình (F)');
      }).catch(err => {
        console.warn('Lỗi toàn màn hình:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          document.body.classList.remove('fs');
          showToast('Đã thoát Toàn màn hình');
        });
      }
    }
  }

  // Quản lý Modal & Overlay
  function openToc() {
    closeOverlays();
    tocOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function openHelp() {
    closeOverlays();
    helpOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeOverlays() {
    tocOverlay.hidden = true;
    helpOverlay.hidden = true;
    document.body.style.overflow = '';
  }

  // Modal phóng to ảnh HD
  window.openZoom = function(imgSrc, captionText) {
    const modal = document.getElementById('imgModal');
    const modalImg = document.getElementById('modalImg');
    const modalCap = document.getElementById('modalCap');
    if (!modal || !modalImg) return;
    modalImg.src = imgSrc;
    modalCap.textContent = captionText || 'Ảnh tư liệu thực tế Chùa Sóc Lớn';
    modal.hidden = false;
  };
  window.closeZoom = function() {
    const modal = document.getElementById('imgModal');
    if (modal) modal.hidden = true;
  };

  /* --------------------------------------------------------------------------
     3. ĐĂNG KÝ SỰ KIỆN TƯƠNG TÁC
     -------------------------------------------------------------------------- */
  btnPrev.addEventListener('click', prevSlide);
  btnNext.addEventListener('click', nextSlide);
  if (fsPrev) fsPrev.addEventListener('click', prevSlide);
  if (fsNext) fsNext.addEventListener('click', nextSlide);
  btnFs.addEventListener('click', toggleFullscreen);
  btnToc.addEventListener('click', openToc);
  btnNotes.addEventListener('click', toggleNotes);
  notesClose.addEventListener('click', toggleNotes);
  btnHelp.addEventListener('click', openHelp);

  // Đóng modal khi click ra ngoài hoặc nút close
  $$('[data-close]').forEach(el => {
    el.addEventListener('click', closeOverlays);
  });

  // Xử lý ẩn hiện thanh bar khi di chuột trong chế độ Toàn màn hình
  window.addEventListener('mousemove', e => {
    if (!document.body.classList.contains('fs')) {
      document.body.classList.remove('peek-top', 'peek-bottom', 'peek-nav');
      return;
    }
    const y = e.clientY;
    const h = window.innerHeight;
    // Rê chuột lên sát đỉnh màn hình (<= 45px) thì hiện topbar
    if (y <= 45) {
      document.body.classList.add('peek-top');
    } else if (!e.target.closest('.topbar')) {
      document.body.classList.remove('peek-top');
    }
    // Rê chuột xuống sát đáy màn hình (>= h - 50px) thì hiện controls
    if (y >= h - 50) {
      document.body.classList.add('peek-bottom');
    } else if (!e.target.closest('.controls')) {
      document.body.classList.remove('peek-bottom');
    }
    // Hiện nút mũi tên chuyển slide khi chuột di chuyển
    document.body.classList.add('peek-nav');
    clearTimeout(window.__peekNavTimer);
    window.__peekNavTimer = setTimeout(() => {
      document.body.classList.remove('peek-nav');
    }, 2500);
  }, { passive: true });

  // Sự kiện bàn phím tiện lợi
  document.addEventListener('keydown', e => {
    if (e.target && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(totalSlides - 1);
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 't':
      case 'T':
        e.preventDefault();
        tocOverlay.hidden ? openToc() : closeOverlays();
        break;
      case 'n':
      case 'N':
        e.preventDefault();
        toggleNotes();
        break;
      case '?':
      case 'h':
      case 'H':
        e.preventDefault();
        helpOverlay.hidden ? openHelp() : closeOverlays();
        break;
      case 'Escape':
        closeOverlays();
        closeZoom();
        if (document.body.classList.contains('notes-open')) toggleNotes();
        break;
    }
  });

  // Hỗ trợ vuốt chạm trên màn hình cảm ứng điện thoại / tablet
  (function initTouchSwipe() {
    let startX = 0, startY = 0, startTime = 0;
    stage.addEventListener('touchstart', e => {
      const touch = e.changedTouches[0];
      startX = touch.pageX;
      startY = touch.pageY;
      startTime = Date.now();
    }, { passive: true });

    stage.addEventListener('touchend', e => {
      const touch = e.changedTouches[0];
      const deltaX = touch.pageX - startX;
      const deltaY = touch.pageY - startY;
      const deltaTime = Date.now() - startTime;

      if (deltaTime < 600 && Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        if (deltaX < 0) nextSlide();
        else prevSlide();
      }
    }, { passive: true });
  })();

  // Lắng nghe thay đổi Fullscreen từ trình duyệt
  document.addEventListener('fullscreenchange', () => {
    const isFs = !!document.fullscreenElement;
    document.body.classList.toggle('fs', isFs);
    if (!isFs) {
      document.body.classList.remove('peek-top', 'peek-bottom', 'peek-nav');
    }
  });

  // Tự động kiểm tra URL hash khi mở trang hoặc bấm Back / Forward
  window.addEventListener('hashchange', () => {
    const hashNum = parseInt((location.hash || '').replace('#', ''), 10);
    if (!isNaN(hashNum) && hashNum >= 1 && hashNum <= totalSlides) {
      if (hashNum - 1 !== currentIndex) goToSlide(hashNum - 1);
    }
  });

  /* --------------------------------------------------------------------------
     4. KHỞI CHẠY LẦN ĐẦU
     -------------------------------------------------------------------------- */
  renderAllSlides();

  const initHash = parseInt((location.hash || '').replace('#', ''), 10);
  const initialSlide = (!isNaN(initHash) && initHash >= 1 && initHash <= totalSlides) ? initHash - 1 : 0;
  goToSlide(initialSlide);

  window.__soclon = { goToSlide, nextSlide, prevSlide, toggleNotes, toggleFullscreen, slidesData };
  window.goToSlide = goToSlide;

  console.log("CHÙA SÓC LỚN Presentation Engine ready — 16 slides loaded.");
})();
