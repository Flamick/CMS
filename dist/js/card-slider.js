
class Slider {
  constructor(element, index = 0) {
    this.element = element;
    this.cards = Array.from(element.children);
    this.currentCard = index;
    this.cloneCards();
    this.addEventListeners();
  }

  cloneCards() {
    const firstCardClone = this.cards[0].cloneNode(true);
    const lastCardClone = this.cards[this.cards.length - 1].cloneNode(true);
    this.element.insertBefore(lastCardClone, this.cards[0]);
    this.element.appendChild(firstCardClone);
    this.cards = Array.from(this.element.children);
    this.element.style.transform = `translateX(-${this.currentCard * (innerWidth - 40)}px)`;
  }

  addEventListeners() {
    this.element.addEventListener('mousedown', (event) => {
    this.startX = event.pageX;
  });  
    this.element.addEventListener('mouseup', (event) => {
    this.endX = event.pageX;
    this.handleSwipe();
  });

  this.element.addEventListener('touchstart', (event) => {
      this.startX = event.touches[0].pageX;
  });

  this.element.addEventListener('touchend', (event) => {
      this.endX = event.changedTouches[0].pageX;
      this.handleSwipe();
  });
  }

  handleSwipe() {
    const diffX = this.startX - this.endX;
    if (diffX > 0) {
        if(this.currentCard === this.cards.length-1) {
            // Transition to the first card
            this.element.style.transition = 'none';
            this.currentCard = 1;
            this.element.style.transform = `translateX(-${this.currentCard * (innerWidth - 40)}px)`;
            setTimeout(() => {
                this.element.style.transition = '';
            }, 50);
        }else {
            this.currentCard++;
            this.element.style.transform = `translateX(-${this.currentCard * (innerWidth - 40)}px)`;
        }
    } else {
        if(this.currentCard === 0) {
            // Transition to the last card
            this.element.style.transition = 'none';
            this.currentCard = this.cards.length - 2;
            this.element.style.transform = `translateX(-${this.currentCard * (innerWidth - 40)}px)`;
            setTimeout(() => {
                this.element.style.transition = '';
            }, 50);
        }else {
            this.currentCard--;
            this.element.style.transform = `translateX(-${this.currentCard * (innerWidth - 40)}px)`;
        }
    }
  }
}

const sliders = document.querySelectorAll('.slider-container');
sliders.forEach(slider => new Slider(slider));
