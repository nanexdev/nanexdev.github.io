//ktokolwiek czyta ten kod, niech wie, że nie jestem programistą JS i ten kod jest brzydki
//xD
//ale tak na serio to są inne sposoby na programowanie stron niż w czystym JS, np. frameworki, ale trzeba było to zrobić samemu bez użycia czegokolwiek innego
//nie ukrywam tego że chatgpt mi w tym pomógł, ale i tak większość rzeczy musiałem sam zrobić
//const iloscminutspedzonych = 180;
//okay, but in all seriousness let's end this joke now haha
//btw i use arch idk why you would care but yeah

document.addEventListener('DOMContentLoaded', function() {
  const przyciskOblicz = document.getElementById('calcBtn');
  
  if (przyciskOblicz) {
    przyciskOblicz.addEventListener('click', obliczOszczednosci);
  }
  
  inicjujMotyw();
});

function obliczOszczednosci() {
  const Q = parseFloat(document.getElementById('Q').value);
  const cenaPradu = parseFloat(document.getElementById('p_el').value);
  const COP = parseFloat(document.getElementById('COP').value);
  const kosztPompy = parseFloat(document.getElementById('cost_pompa').value) || 0;
  const czasZycia = parseFloat(document.getElementById('lifetime').value) || 20;
  
  if (isNaN(Q) || Q <= 0) {
    alert('Proszę wprowadzić prawidłowe zapotrzebowanie na ciepło (Q > 0)');
    return;
  }
  
  if (isNaN(cenaPradu) || cenaPradu <= 0) {
    alert('Proszę wprowadzić prawidłową cenę energii elektrycznej (p_el > 0)');
    return;
  }
  
  if (isNaN(COP) || COP < 1) {
    alert('Proszę wprowadzić prawidłowy COP (COP >= 1)');
    return;
  }
  
  const kosztOgrzewaniaElektrycznego = Q * cenaPradu;
  

  const zuzyteEnergii = Q / COP;
  const kosztPompyCiepla = zuzyteEnergii * cenaPradu;
  

  const roczneOszczednosci = kosztOgrzewaniaElektrycznego - kosztPompyCiepla;
  

  let okresZwrotu = 0;
  if (kosztPompy > 0 && roczneOszczednosci > 0) {
    okresZwrotu = kosztPompy / roczneOszczednosci;
  }
  

  const kosztNaKWh = kosztPompyCiepla / Q;
  

  document.getElementById('costEl').textContent = kosztOgrzewaniaElektrycznego.toFixed(2);
  document.getElementById('costPompa').textContent = kosztPompyCiepla.toFixed(2);
  document.getElementById('savings').textContent = roczneOszczednosci.toFixed(2);
  
  if (kosztPompy > 0 && roczneOszczednosci > 0) {
    document.getElementById('payback').textContent = okresZwrotu.toFixed(2);
  } else if (kosztPompy > 0) {
    document.getElementById('payback').textContent = 'Brak oszczędności - nie zwróci się';
  } else {
    document.getElementById('payback').textContent = 'Nie podano kosztu instalacji';
  }
  
  document.getElementById('costPerKWh').textContent = kosztNaKWh.toFixed(3);
  
  const divWynik = document.getElementById('result');
  divWynik.style.display = 'block';
  

  divWynik.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function inicjujMotyw() {
  const zapisanyMotyw = localStorage.getItem('geoenergyTheme') || 'light';
  zastosujMotyw(zapisanyMotyw);
  utworzPrzelacznikMotywu();
}

function zastosujMotyw(motyw) {
  if (motyw === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.style.setProperty('--tlo-podstawowe', '#1a1a1a');
    document.documentElement.style.setProperty('--tlo-drugorzedne', '#2d2d2d');
    document.documentElement.style.setProperty('--tekst-podstawowy', '#f0f0f0');
    document.documentElement.style.setProperty('--tekst-drugorzedny', '#b0b0b0');
    document.documentElement.style.setProperty('--kolor-obramowania', '#444');
    document.documentElement.style.setProperty('--cien-maly', '0 2px 4px rgba(0, 0, 0, 0.3)');
    document.documentElement.style.setProperty('--cien-sredni', '0 4px 12px rgba(0, 0, 0, 0.4)');
    document.documentElement.style.setProperty('--cien-duzy', '0 8px 24px rgba(0, 0, 0, 0.5)');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.style.setProperty('--tlo-podstawowe', '#ffffff');
    document.documentElement.style.setProperty('--tlo-drugorzedne', '#f8f9fa');
    document.documentElement.style.setProperty('--tekst-podstawowy', '#212529');
    document.documentElement.style.setProperty('--tekst-drugorzedny', '#6c757d');
    document.documentElement.style.setProperty('--kolor-obramowania', '#dee2e6');
    document.documentElement.style.setProperty('--cien-maly', '0 2px 4px rgba(0, 0, 0, 0.05)');
    document.documentElement.style.setProperty('--cien-sredni', '0 4px 12px rgba(0, 0, 0, 0.08)');
    document.documentElement.style.setProperty('--cien-duzy', '0 8px 24px rgba(0, 0, 0, 0.12)');
  }
  localStorage.setItem('geoenergyTheme', motyw);
}

function przelaczMotyw() {
  const obecnyMotyw = document.documentElement.getAttribute('data-theme') || 'light';
  const nowyMotyw = obecnyMotyw === 'light' ? 'dark' : 'light';
  zastosujMotyw(nowyMotyw);
  aktualizujIkonePrzelacznika();
}

function aktualizujIkonePrzelacznika() {
  const przelacznik = document.getElementById('themeToggle');
  if (!przelacznik) return;
  
  const obecnyMotyw = document.documentElement.getAttribute('data-theme') || 'light';
  przelacznik.innerHTML = obecnyMotyw === 'light' 
    ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>' 
    : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
  przelacznik.setAttribute('aria-label', obecnyMotyw === 'light' ? 'Przełącz na tryb ciemny' : 'Przełącz na tryb jasny');
}

function utworzPrzelacznikMotywu() {
  if (document.getElementById('themeToggle')) return;
  
  const nawigacja = document.querySelector('nav');
  if (!nawigacja) return;
  
  const przelacznik = document.createElement('button');
  przelacznik.id = 'themeToggle';
  przelacznik.className = 'theme-toggle';
  przelacznik.setAttribute('aria-label', 'Przełącz motyw');
  przelacznik.addEventListener('click', przelaczMotyw);

  const logo = nawigacja.querySelector('.logo');
  if (logo) {
    logo.parentNode.insertBefore(przelacznik, logo.nextSibling);
  }
  
  aktualizujIkonePrzelacznika();
}













//nic tu nie ma stop looking
































//ale na serio





















































//okej więc taki jesteś huh?
//niech ci bedzie












let spacebarCount = 0;
let spacebarTimer = null;

document.addEventListener('keydown', function(e) {
  if (e.code === 'Space' && !e.repeat) {
    spacebarCount++;
    
    clearTimeout(spacebarTimer);
    spacebarTimer = setTimeout(() => {
      spacebarCount = 0;
    }, 1000);
    
    if (spacebarCount === 10) {
      spacebarCount = 0;
      uruchomGre();
    }
  }
});

function uruchomGre() {
  const gameContainer = document.createElement('div');
  gameContainer.id = 'gameContainer';
  gameContainer.innerHTML = `
    <canvas id="gameCanvas"></canvas>
    <div id="gameUI">
      <div id="crosshair">+</div>
      <div id="scoreDisplay">Wynik: <span id="score">0</span></div>
      <div id="healthDisplay">Życie: <span id="health">100</span></div>
      <div id="ammoDisplay">Amunicja: <span id="ammo">30</span></div>
      <div id="gameInstructions">
        <p>WSAD - Ruch | Mysz - Celowanie | Klik - Strzał | ESC - Wyjście</p>
      </div>
    </div>
  `;
  document.body.appendChild(gameContainer);
  
  new Game3D();
}

class Game3D {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    this.player = {
      x: 5,
      y: 5,
      angle: 0,
      health: 100,
      ammo: 30,
      shooting: false,
      shootingTime: 0
    };
    

    this.loadTextures();
    
    //mapa (1 = ściana, 0 = puste)
    this.map = [
      [1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,1,0,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,1,0,0,0,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,0,1,1,0,0,1],
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,0,1,0,0,0,1,0,1],
      [1,1,1,1,1,1,1,1,1,1]
    ];
    
    this.enemies = [
      {x: 3, y: 3, health: 3, color: '#ff4444'},
      {x: 7, y: 2, health: 3, color: '#ff4444'},
      {x: 2, y: 7, health: 3, color: '#ff4444'},
      {x: 8, y: 8, health: 3, color: '#ff4444'}
    ];
    
    this.score = 0;
    this.keys = {};
    this.mouseX = 0;
    this.running = true;
    
    this.setupControls();
    this.gameLoop();
  }
  
  loadTextures() {
    this.enemySprite = document.createElement('canvas');
    this.enemySprite.width = 64;
    this.enemySprite.height = 64;
    const ectx = this.enemySprite.getContext('2d');
    
    ectx.fillStyle = '#ff0000';
    ectx.fillRect(20, 10, 24, 40);
    
    // Głowa
    ectx.fillStyle = '#ff4444';
    ectx.beginPath();
    ectx.arc(32, 15, 12, 0, Math.PI * 2);
    ectx.fill();
    
    //Oczy
    ectx.fillStyle = '#000';
    ectx.fillRect(27, 12, 4, 4);
    ectx.fillRect(37, 12, 4, 4);
    
    //Ręce
    ectx.fillStyle = '#cc0000';
    ectx.fillRect(15, 20, 5, 20);
    ectx.fillRect(44, 20, 5, 20);
    
    //Nogi
    ectx.fillRect(22, 50, 8, 14);
    ectx.fillRect(34, 50, 8, 14);
    
    //sprite broni
    this.gunSprite = document.createElement('canvas');
    this.gunSprite.width = 200;
    this.gunSprite.height = 150;
    const gctx = this.gunSprite.getContext('2d');
    gctx.fillStyle = '#222';
    gctx.fillRect(80, 40, 60, 20);
    gctx.fillStyle = '#111';
    gctx.fillRect(135, 45, 10, 10);
    gctx.fillStyle = '#333';
    gctx.fillRect(40, 50, 50, 30);
    gctx.fillStyle = '#444';
    gctx.fillRect(45, 55, 40, 20);
    gctx.fillStyle = '#654321';
    gctx.fillRect(50, 80, 20, 30);
    gctx.fillRect(55, 105, 10, 15);
    gctx.strokeStyle = '#666';
    gctx.lineWidth = 2;
    gctx.strokeRect(65, 35, 10, 10);
    this.gunSpriteRecoil = document.createElement('canvas');
    this.gunSpriteRecoil.width = 200;
    this.gunSpriteRecoil.height = 150;
    const grctx = this.gunSpriteRecoil.getContext('2d');
    grctx.drawImage(this.gunSprite, -10, 5);
    grctx.fillStyle = '#ffff00';
    grctx.beginPath();
    grctx.arc(145, 55, 15, 0, Math.PI * 2);
    grctx.fill();
    grctx.fillStyle = '#ff8800';
    grctx.beginPath();
    grctx.arc(145, 55, 8, 0, Math.PI * 2);
    grctx.fill();
  }
  
  setupControls() {
    document.addEventListener('keydown', (e) => this.keys[e.key.toLowerCase()] = true);
    document.addEventListener('keyup', (e) => this.keys[e.key.toLowerCase()] = false);
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.zakończGrę();
      }
    });
    
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.player.angle = (e.clientX / this.canvas.width - 0.5) * Math.PI;
    });
    
    this.canvas.addEventListener('click', () => {
      this.strzał();
    });
    
    this.canvas.style.cursor = 'none';
  }
  
  strzał() {
    if (this.player.ammo <= 0) return;
    
    this.player.ammo--;
    this.player.shooting = true;
    this.player.shootingTime = 0;
    document.getElementById('ammo').textContent = this.player.ammo;
    
    this.enemies.forEach((enemy, index) => {
      const dx = enemy.x - this.player.x;
      const dy = enemy.y - this.player.y;
      const angleToEnemy = Math.atan2(dy, dx);
      const angleDiff = Math.abs(angleToEnemy - this.player.angle);
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (angleDiff < 0.3 && distance < 8) {
        enemy.health--;
        if (enemy.health <= 0) {
          this.enemies.splice(index, 1);
          this.score += 100;
          document.getElementById('score').textContent = this.score;
          
          this.player.ammo += 10;
          document.getElementById('ammo').textContent = this.player.ammo;
          
          if (this.enemies.length === 0) {
            setTimeout(() => {
              alert('Gratulacje! Wygrałeś! Wynik: ' + this.score);
              this.zakończGrę();
            }, 100);
          }
        }
      }
    });
  }
  
  update() {
    const moveSpeed = 0.05;
    
    let newX = this.player.x + (this.keys['w'] ? Math.cos(this.player.angle) * moveSpeed : 0) -
                               (this.keys['s'] ? Math.cos(this.player.angle) * moveSpeed : 0);
    let newY = this.player.y + (this.keys['w'] ? Math.sin(this.player.angle) * moveSpeed : 0) -
                               (this.keys['s'] ? Math.sin(this.player.angle) * moveSpeed : 0);
    
    newX += (this.keys['d'] ? Math.cos(this.player.angle + Math.PI / 2) * moveSpeed : 0) -
            (this.keys['a'] ? Math.cos(this.player.angle + Math.PI / 2) * moveSpeed : 0);
    newY += (this.keys['d'] ? Math.sin(this.player.angle + Math.PI / 2) * moveSpeed : 0) -
            (this.keys['a'] ? Math.sin(this.player.angle + Math.PI / 2) * moveSpeed : 0);
    
    if (this.map[Math.floor(newY)][Math.floor(newX)] === 0) {
      this.player.x = newX;
      this.player.y = newY;
    }
    
    if (this.player.shooting) {
      this.player.shootingTime++;
      if (this.player.shootingTime > 10) {
        this.player.shooting = false;
        this.player.shootingTime = 0;
      }
    }
    
    this.enemies.forEach(enemy => {
      const dx = this.player.x - enemy.x;
      const dy = this.player.y - enemy.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 5) {
        const angle = Math.atan2(dy, dx);
        const newEnemyX = enemy.x + Math.cos(angle) * 0.02;
        const newEnemyY = enemy.y + Math.sin(angle) * 0.02;
        
        if (this.map[Math.floor(newEnemyY)][Math.floor(newEnemyX)] === 0) {
          enemy.x = newEnemyX;
          enemy.y = newEnemyY;
        }
        
        if (distance < 0.5 && Math.random() < 0.02) {
          this.player.health -= 5;
          document.getElementById('health').textContent = this.player.health;
          
          if (this.player.health <= 0) {
            alert('Przegrałeś! Wynik: ' + this.score);
            this.zakończGrę();
          }
        }
      }
    });
  }
  
  //makeshiftowy renderer idk
  //podobny do raycastingu w DOOMie

  render() {
    this.ctx.fillStyle = '#87CEEB';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height / 2);
    this.ctx.fillStyle = '#4a4a4a';
    this.ctx.fillRect(0, this.canvas.height / 2, this.canvas.width, this.canvas.height / 2);
    
    const numRays = 120;
    const fov = Math.PI / 3;
    
    for (let i = 0; i < numRays; i++) {
      const rayAngle = this.player.angle - fov / 2 + (fov / numRays) * i;
      let distance = 0;
      let hit = false;
      
      while (!hit && distance < 20) {
        distance += 0.05;
        const testX = this.player.x + Math.cos(rayAngle) * distance;
        const testY = this.player.y + Math.sin(rayAngle) * distance;
        
        if (this.map[Math.floor(testY)]?.[Math.floor(testX)] === 1) {
          hit = true;
        }
      }
      
      const correctedDistance = distance * Math.cos(rayAngle - this.player.angle);
      const wallHeight = (this.canvas.height / correctedDistance) * 0.5;
      const brightness = Math.max(50, 255 - distance * 30);
      this.ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
      this.ctx.fillRect(
        (this.canvas.width / numRays) * i,
        this.canvas.height / 2 - wallHeight / 2,
        this.canvas.width / numRays + 1,
        wallHeight
      );
    }
    
    this.enemies.forEach(enemy => {
      const dx = enemy.x - this.player.x;
      const dy = enemy.y - this.player.y;
      const angleToEnemy = Math.atan2(dy, dx) - this.player.angle;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (Math.abs(angleToEnemy) < fov / 2 && distance < 10) {
        const enemySize = (this.canvas.height / distance) * 0.6;
        const enemyX = this.canvas.width / 2 + Math.tan(angleToEnemy) * (this.canvas.width / 2);
        const enemyY = this.canvas.height / 2;
        
        this.ctx.drawImage(
          this.enemySprite,
          enemyX - enemySize / 2,
          enemyY - enemySize,
          enemySize,
          enemySize
        );
      }
    });
    
    const gunWidth = 300;
    const gunHeight = 225;
    const gunX = this.canvas.width - gunWidth + 50;
    const gunY = this.canvas.height - gunHeight + 50;
    
    if (this.player.shooting && this.player.shootingTime < 5) {
      this.ctx.drawImage(this.gunSpriteRecoil, gunX, gunY, gunWidth, gunHeight);
    } else {
      this.ctx.drawImage(this.gunSprite, gunX, gunY, gunWidth, gunHeight);
    }
  }
  
  gameLoop() {
    if (!this.running) return;
    
    this.update();
    this.render();
    
    requestAnimationFrame(() => this.gameLoop());
  }
  
  zakończGrę() {
    this.running = false;
    document.getElementById('gameContainer').remove();
  }
}
