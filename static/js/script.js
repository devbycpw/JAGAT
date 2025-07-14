document.addEventListener('DOMContentLoaded', function() {
  // Sidebar functionality
  const sidebar = document.getElementById('sidebar');
  const menuButton = document.getElementById('menu');
  const expandedWidth = '250px';
  const collapsedWidth = '78px';

  // Mobile menu toggle elements
  const mobileToggle = document.createElement('div');
  mobileToggle.className = 'mobile-menu-toggle';
  mobileToggle.innerHTML = '<i class="bi bi-list"></i>';
  document.body.appendChild(mobileToggle);
  
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);

  function toggleSidebar() {
    if (!sidebar) return;
    
    sidebar.classList.toggle('active');
    const isActive = sidebar.classList.contains('active');
    
    // Only adjust padding on desktop
    if (window.innerWidth > 768) {
      document.body.style.paddingLeft = isActive ? expandedWidth : collapsedWidth;
    }
    
    // For mobile
    overlay.classList.toggle('active', isActive);
    localStorage.setItem('sidebarState', isActive ? 'expanded' : 'collapsed');
    
    setActiveMenu();
  }

  function initializeSidebar() {
    if (sidebar && menuButton) {
      menuButton.addEventListener('click', toggleSidebar);
      mobileToggle.addEventListener('click', toggleSidebar);
      overlay.addEventListener('click', toggleSidebar);

      const savedState = localStorage.getItem('sidebarState');
      const isExpanded = savedState === 'expanded';
      
      // Only restore state on desktop
      if (window.innerWidth > 768) {
        sidebar.classList.toggle('active', isExpanded);
        document.body.style.paddingLeft = isExpanded ? expandedWidth : collapsedWidth;
      }
      
      setActiveMenu();
    }
  }

  function setActiveMenu() {
    let currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    if (currentPage === '') currentPage = 'index';

    const menuLinks = document.querySelectorAll('.menu li a');
    menuLinks.forEach(link => {
      const href = link.getAttribute('href').replace('.html', '');
      link.classList.toggle('active', href === currentPage);
      
      // Close sidebar when clicking a menu item on mobile
      if (window.innerWidth <= 768) {
        link.addEventListener('click', toggleSidebar);
      }
    });
  }

  // Initialize charts
  function initializeCharts() {
    // Multi-ring chart
    const multiChartEl = document.getElementById("multiRingChart");
    if (multiChartEl) {
      new Chart(multiChartEl, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              label: 'Langkah',
              data: [78, 22],
              backgroundColor: ['#163172', '#e0e0e0'],
              borderWidth: 0,
              radius: '100%',
              cutout: '60%'
            },
            {
              label: 'Waktu',
              data: [81, 19],
              backgroundColor: ['#0072BC', '#e0e0e0'],
              borderWidth: 0,
              radius: '80%',
              cutout: '50%'
            },
            {
              label: 'Kalori',
              data: [83, 17],
              backgroundColor: ['#00BCD4', '#e0e0e0'],
              borderWidth: 0,
              radius: '60%',
              cutout: '40%'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Added for better mobile responsiveness
          animation: {
            animateScale: true
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: context => `${context.dataset.label}: ${context.raw}%`
              }
            },
            legend: { display: false }
          }
        }
      });
    }

    // Macro chart
    const macroChartEl = document.getElementById("macroChart");
    if (macroChartEl) {
      new Chart(macroChartEl, {
        type: 'doughnut',
        data: {
          labels: ['Karbo', 'Lemak', 'Protein'],
          datasets: [{
            data: [300, 66.7, 150],
            backgroundColor: ['#00aaff', '#00cc99', '#005daa'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Added for better mobile responsiveness
          cutout: '50%',
          animation: {
            animateScale: true
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${context.raw} g`;
                }
              }
            }
          }
        }
      });
    }

    // Additional macro charts
    function renderMacroChart(id) {
      const ctx = document.getElementById(id);
      if (!ctx) return;

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Karbo', 'Lemak', 'Protein'],
          datasets: [{
            data: [73.7, 7.1, 24.4],
            backgroundColor: ['#b2ebf2', '#00acc1', '#003b64'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Added for better mobile responsiveness
          cutout: '65%',
          animation: {
            animateScale: true
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => `${ctx.label}: ${ctx.raw} g`
              }
            }
          }
        }
      });
    }

    ['macroChart1', 'macroChart2', 'macroChart3', 'macroChart4'].forEach(renderMacroChart);
  }

  // Progress bars
  function initializeProgressBars() {
    function renderBarProgress(containerId, fillId, labelId, current, target) {
      const percent = Math.min((current / target) * 100, 100).toFixed(2);
      const fill = document.getElementById(fillId);
      const label = document.getElementById(labelId);
      const container = document.getElementById(containerId);
      
      if (fill && label && container) {
        fill.style.width = `${percent}%`;
        label.innerText = `${Math.round(percent)}%`;
        const containerWidth = container.offsetWidth;
        const labelOffset = (percent / 100) * containerWidth;
        label.style.left = `${labelOffset}px`;
      }
    }

    renderBarProgress("barContainer2", "barFill2", "barLabel2", 6.31, 8);
    renderBarProgress("barContainer3", "barFill3", "barLabel3", 8980, 10000);
    renderBarProgress("barContainer4", "barFill4", "barLabel4", 2.43, 3);
  }

  // Image hover effects
  function initializeImageHovers() {
    const cengkehImg = document.querySelector('img[alt="Cengkeh"]');
    if (cengkehImg) {
      cengkehImg.addEventListener('mouseenter', () => {
        cengkehImg.style.transform = 'scale(1.1)';
        cengkehImg.style.transition = 'transform 0.3s ease';
        cengkehImg.style.zIndex = '2';
      });

      cengkehImg.addEventListener('mouseleave', () => {
        cengkehImg.style.transform = 'scale(1)';
      });
    }

    // Doctor chat buttons
    const chatButtons = document.querySelectorAll(".chat-label, .chat-btn");
    chatButtons.forEach((button) => {
      const img = button.closest('.dokter-img-wrapper')?.querySelector('img');
      
      if (img) {
        button.addEventListener("mouseenter", () => {
          img.style.transform = "scale(1.1)";
          img.style.transition = "transform 0.3s ease";
        });

        button.addEventListener("mouseleave", () => {
          img.style.transform = "scale(1)";
        });
      }
    });
  }

  // Window resize handler
  function handleResize() {
    if (window.innerWidth <= 768) {
      // Mobile view
      document.body.style.paddingLeft = '0';
      sidebar?.classList.remove('active');
      overlay?.classList.remove('active');
    } else {
      // Desktop view - restore saved state
      const savedState = localStorage.getItem('sidebarState');
      const isExpanded = savedState === 'expanded';
      document.body.style.paddingLeft = isExpanded ? expandedWidth : collapsedWidth;
      sidebar?.classList.toggle('active', isExpanded);
    }
  }

  // Initialize all functionality
  initializeSidebar();
  initializeCharts();
  initializeProgressBars();
  initializeImageHovers();
  
  // Add resize event listener
  window.addEventListener('resize', handleResize);
  
  // Initial resize check
  handleResize();
});