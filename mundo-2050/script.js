document.addEventListener('DOMContentLoaded', function() {
    // Cambio de tema
    const themeSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const toggleIcon = document.getElementById('toggle-icon');
    
    function switchTheme(e) {
        if(e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            toggleIcon.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleIcon.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    themeSwitch.addEventListener('change', switchTheme, false);
    
    // Guardar preferencia de tema
    const currentTheme = localStorage.getItem('theme');
    if(currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if(currentTheme === 'light') {
            themeSwitch.checked = true;
            toggleIcon.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    // Menú hamburguesa
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });
    
    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Botón explorar
    const exploreBtn = document.getElementById('explore-btn');
    if(exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.getElementById('tecnologia').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Modal de imágenes
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const captionText = document.getElementById('modal-caption');
    const closeModal = document.querySelector('.close-modal');
    
    document.querySelectorAll('.zoom-img').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });
    
    window.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.style.display = "none";
        }
    });
    
    // Audio explicativo
    const audioBtn = document.getElementById('audio-btn');
    const climateAudio = document.getElementById('climate-audio');
    
    if(audioBtn && climateAudio) {
        audioBtn.addEventListener('click', function() {
            if(climateAudio.paused) {
                climateAudio.play();
                this.innerHTML = '<i class="fas fa-volume-mute"></i> Pausar Audio';
            } else {
                climateAudio.pause();
                this.innerHTML = '<i class="fas fa-volume-up"></i> Escuchar Resumen';
            }
        });
    }
    
    // Simulador de vida en 2050
    const simulateBtn = document.getElementById('simulate-btn');
    const simulatorResult = document.getElementById('simulator-result');
    
    if(simulateBtn && simulatorResult) {
        simulateBtn.addEventListener('click', function() {
            const birthYear = parseInt(document.getElementById('birth-year').value);
            const profession = document.getElementById('profession').value;
            
            if(isNaN(birthYear)) {
                alert('Por favor ingresa un año de nacimiento válido');
                return;
            }
            
            const ageIn2050 = 2050 - birthYear;
            let professionFuture = '';
            let prediction = '';
            
            switch(profession) {
                case 'tech':
                    professionFuture = 'Ingeniero de IA Cuántica';
                    prediction = 'Trabajarás diseñando sistemas de inteligencia artificial que funcionan en computadoras cuánticas, resolviendo problemas que hoy son imposibles de abordar.';
                    break;
                case 'health':
                    professionFuture = 'Especialista en Longevidad';
                    prediction = 'Ayudarás a las personas a extender su vida saludablemente más allá de los 120 años mediante terapias genéticas y nanotecnología.';
                    break;
                case 'education':
                    professionFuture = 'Diseñador de Experiencias Educativas Inmersivas';
                    prediction = 'Crearás entornos de aprendizaje en realidad virtual que adaptan el contenido en tiempo real según las necesidades de cada estudiante.';
                    break;
                case 'art':
                    professionFuture = 'Artista de Realidad Mixta';
                    prediction = 'Tus obras de arte existirán en el espacio físico y digital simultáneamente, interactuando con los espectadores de formas nunca antes vistas.';
                    break;
                default:
                    professionFuture = 'Especialista en Adaptación al Futuro';
                    prediction = 'Ayudarás a las personas y organizaciones a navegar los rápidos cambios tecnológicos y sociales que caracterizan esta era.';
            }
            
            let resultHTML = `
                <h3>Tu vida en 2050</h3>
                <div class="result-details">
                    <p><strong>Edad:</strong> ${ageIn2050} años</p>
                    <p><strong>Profesión:</strong> ${professionFuture}</p>
                    <p>${prediction}</p>
                    <div class="result-icon">
                        <i class="fas fa-rocket"></i>
                    </div>
                </div>
            `;
            
            simulatorResult.innerHTML = resultHTML;
            simulatorResult.style.animation = 'fadeInUp 0.5s ease-out';
        });
    }
    
    // Efecto de scroll para navbar
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if(window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            header.style.background = 'rgba(15, 15, 26, 0.95)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(15, 15, 26, 0.9)';
        }
        
        // Actualizar enlace activo
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if(pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${current}` || 
               (current === 'inicio' && link.getAttribute('href') === '#') ||
               (current === '' && link.getAttribute('href') === '#')) {
                link.classList.add('active');
            }
        });
    });
    
    // Efecto parallax para hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if(hero) {
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
    
    // Animación de carga
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});