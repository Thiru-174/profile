(function () {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDarkMode = document.body.classList.toggle('dark');
      const icon = themeToggle.querySelector('i');
      if (isDarkMode) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    });
  }

  // IST Date and Time Display
  const dateTimeElement = document.getElementById('current-date-time');
  const timeElement = document.getElementById('current-time');
  const spinnerCircle = document.getElementById('spinner-circle');

  if (dateTimeElement && timeElement && spinnerCircle) {
    function updateDateTime() {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const ist = new Date(utc + 3600000 * 5.5);

      const day = ist.toLocaleString('en-IN', { day: 'numeric' });
      const month = ist.toLocaleString('en-IN', { month: 'short' });
      const weekday = ist.toLocaleString('en-IN', { weekday: 'short' });
      const year = ist.toLocaleString('en-IN', { year: 'numeric' });

      dateTimeElement.innerHTML = `
        <div class="text-xs font-semibold">${month} ${day}</div>
        <div class="text-[10px] font-medium">${weekday}</div>
        <div class="text-[8px] border-t border-gray-300 dark:border-gray-600 pt-0.5">${year}</div>
      `;

      const formattedTime = ist.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      timeElement.textContent = formattedTime;

      const seconds = ist.getSeconds();
      const dashOffset = 9.42 - (seconds / 60) * 9.42;
      spinnerCircle.style.strokeDashoffset = `${dashOffset}`;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
  }

  // Infinite Scroll Carousel with Auto-scroll and Center Highlight
  const carousel = document.getElementById('carousel');
  if (carousel) {
    function cloneCarouselItems() {
      const items = Array.from(carousel.children);
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
      });
    }

    cloneCarouselItems();
    setInterval(cloneCarouselItems, 10000);

    let scrollPos = 0;
    const scrollSpeed = 1;

    function autoScroll() {
      scrollPos += scrollSpeed;
      carousel.scrollLeft = scrollPos;

      if (scrollPos >= carousel.scrollWidth - carousel.clientWidth) {
        scrollPos = 0;
      }

      highlightCenterCard();
      requestAnimationFrame(autoScroll);
    }

    function highlightCenterCard() {
      const cards = carousel.querySelectorAll('div');
      const center = carousel.scrollLeft + carousel.clientWidth / 2;

      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        card.classList.toggle('active', Math.abs(center - cardCenter) < card.offsetWidth / 2);
      });
    }

    requestAnimationFrame(autoScroll);
  }

  // Random Grid Image Assignment
  const grid = document.getElementById('bg-grid');
  if (grid) {
    const imageList = [
      'bg1.jpg', 'bg2.jpg', 'bg3.png', 'bg4.png', 'bg5.webp', 'bg6.jpg',
      'bg7.avif', 'bg8.jpg', 'bg9.jpg', 'bg10.jpg', 'bg11.jpg', 'bg12.jpg',
      'bg13.jpg', 'bg14.jpg'
    ];
    const rows = 5;
    const cols = 7;
    const rowClasses = ['row-1', 'row-2', 'row-3', 'row-4', 'row-5'];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const div = document.createElement('div');
        const randomImage = imageList[Math.floor(Math.random() * imageList.length)];
        div.className = `grid-item ${rowClasses[row]}`;
        div.style.backgroundImage = `url('assets/${randomImage}')`;
        grid.appendChild(div);
      }
    }
  }
})();

