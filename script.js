// Función para cargar el tema guardado
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcon(savedTheme);
}

// Función para cambiar entre temas claro/oscuro
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
}

// Actualiza el icono del botón de cambio de tema
function updateThemeToggleIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
        themeToggle.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Función para el menú móvil
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.innerHTML = nav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
}

// Función para el desplazamiento suave
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Cerrar menú móvil si está abierto
                const nav = document.querySelector('.nav');
                if (nav && nav.classList.contains('active')) {
                    const menuToggle = document.querySelector('.menu-toggle');
                    nav.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                // Desplazamiento suave
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Actualizar URL sin recargar la página
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
}

// Función para el modal de imágenes
function setupImageModal() {
    const modal = document.getElementById('imageModal');
    if (!modal) return;
    
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeModal = document.querySelector('.close-modal');
    
    // Abrir modal al hacer clic en imágenes
    document.querySelectorAll('img[onclick="openModal(this)"]').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            captionText.innerHTML = this.alt || this.nextElementSibling?.textContent || '';
        });
    });
    
    // Cerrar modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Cerrar al hacer clic fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Función para el reproductor de audio
function setupAudioPlayer() {
    const audioBtn = document.getElementById('audio-btn');
    if (!audioBtn) return;
    
    const audio = document.getElementById('resumenAudio');
    
    audioBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            audioBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Detener audio';
        } else {
            audio.pause();
            audio.currentTime = 0;
            audioBtn.innerHTML = '<i class="fas fa-volume-up"></i> Escuchar resumen';
        }
    });
    
    audio.addEventListener('ended', () => {
        audioBtn.innerHTML = '<i class="fas fa-volume-up"></i> Escuchar resumen';
    });
}

// Función para el simulador del universo
function setupUniverseSimulator() {
    const simContainer = document.getElementById('universe-sim');
    if (!simContainer) return;
    
    const expansionRate = document.getElementById('expansion-rate');
    const rateValue = document.getElementById('rate-value');
    const timeScale = document.getElementById('time-scale');
    const resetBtn = document.getElementById('reset-sim');
    
    let galaxies = [];
    let animationId;
    let scale = 1;
    
    // Crear galaxias iniciales
    function createGalaxies() {
        galaxies = [];
        simContainer.innerHTML = '';
        
        for (let i = 0; i < 50; i++) {
            const galaxy = document.createElement('div');
            galaxy.className = 'galaxy';
            
            // Posición aleatoria dentro del contenedor
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            galaxy.style.left = `${x}%`;
            galaxy.style.top = `${y}%`;
            
            // Tamaño y color aleatorio
            const size = 3 + Math.random() * 7;
            galaxy.style.width = `${size}px`;
            galaxy.style.height = `${size}px`;
            
            const hue = Math.random() * 60 + 180; // Tonos azules/cyan
            galaxy.style.backgroundColor = `hsl(${hue}, 80%, 60%)`;
            
            simContainer.appendChild(galaxy);
            galaxies.push({ element: galaxy, x, y, size });
        }
    }
    
    // Animar la expansión
    function animate() {
        const rate = expansionRate.value / 50; // Factor de expansión
        
        galaxies.forEach(galaxy => {
            // Calcular nueva posición (alejándose del centro)
            const centerX = 50;
            const centerY = 50;
            
            const dx = galaxy.x - centerX;
            const dy = galaxy.y - centerY;
            
            galaxy.x += dx * rate * 0.01;
            galaxy.y += dy * rate * 0.01;
            
            // Actualizar posición en pantalla
            galaxy.element.style.left = `${galaxy.x}%`;
            galaxy.element.style.top = `${galaxy.y}%`;
            
            // Hacer las galaxias más tenues a medida que se alejan
            const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            const opacity = Math.max(0.1, 1 - distance / 200);
            galaxy.element.style.opacity = opacity;
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Manejar cambios en los controles
    expansionRate.addEventListener('input', () => {
        rateValue.textContent = expansionRate.value;
    });
    
    timeScale.addEventListener('change', () => {
        // Detener animación actual
        cancelAnimationFrame(animationId);
        
        // Reiniciar con nueva escala de tiempo
        createGalaxies();
        animate();
    });
    
    resetBtn.addEventListener('click', () => {
        expansionRate.value = 50;
        rateValue.textContent = '50';
        timeScale.value = 'medium';
        
        // Reiniciar simulación
        cancelAnimationFrame(animationId);
        createGalaxies();
        animate();
    });
    
    // Iniciar simulación
    createGalaxies();
    animate();
}

// Función para filtrar la galería
function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    const tabs = document.querySelectorAll('.tab-btn');
    
    // Actualizar pestañas activas
    tabs.forEach(tab => {
        tab.classList.toggle('active', tab.textContent.toLowerCase().includes(category) || 
                                      (category === 'all' && tab.textContent === 'Todas'));
    });
    
    // Mostrar/ocultar elementos
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Función para el modal de nuevo tema
function setupNewTopicModal() {
    const newTopicBtn = document.getElementById('new-topic-btn');
    const newTopicModal = document.getElementById('newTopicModal');
    const closeModal = newTopicModal?.querySelector('.close-modal');
    
    if (!newTopicBtn || !newTopicModal) return;
    
    newTopicBtn.addEventListener('click', () => {
        newTopicModal.style.display = 'block';
    });
    
    closeModal.addEventListener('click', () => {
        newTopicModal.style.display = 'none';
    });
    
    newTopicModal.addEventListener('click', (e) => {
        if (e.target === newTopicModal) {
            newTopicModal.style.display = 'none';
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && newTopicModal.style.display === 'block') {
            newTopicModal.style.display = 'none';
        }
    });
    
    // Manejar envío del formulario (simulado)
    const topicForm = document.getElementById('topicForm');
    if (topicForm) {
        topicForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Tema creado exitosamente (simulación). En una implementación real, esto enviaría los datos al servidor.');
            newTopicModal.style.display = 'none';
            topicForm.reset();
        });
    }
}

// Función para manejar el envío de preguntas
function setupQuestionForm() {
    const questionForm = document.getElementById('questionForm');
    if (!questionForm) return;
    
    questionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Pregunta enviada exitosamente (simulación). En una implementación real, esto enviaría los datos al servidor.');
        questionForm.reset();
    });
}

// Función para manejar el envío de votos
function setupPollVoting() {
    document.querySelectorAll('.poll-card .btn-small').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Voto registrado (simulación). En una implementación real, esto enviaría el voto al servidor.');
        });
    });
}

// Función para animar elementos al hacer scroll
function setupScrollAnimations() {
    const animateOnScroll = (elements, animationClass) => {
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add(animationClass);
            }
        });
    };
    
    // Observar elementos con la clase 'animate'
    const animatedElements = document.querySelectorAll('.animate');
    if (animatedElements.length > 0) {
        window.addEventListener('scroll', () => {
            animateOnScroll(animatedElements, 'animated');
        });
        
        // Ejecutar una vez al cargar
        animateOnScroll(animatedElements, 'animated');
    }
}

// Función para abrir modal (compatibilidad con HTML onclick)
window.openModal = function(imgElement) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    
    if (modal && modalImg && captionText) {
        modal.style.display = 'block';
        modalImg.src = imgElement.src;
        captionText.innerHTML = imgElement.alt || imgElement.nextElementSibling?.textContent || '';
    }
};

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    
    // Configurar eventos
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    setupMobileMenu();
    setupSmoothScrolling();
    setupImageModal();
    setupAudioPlayer();
    setupUniverseSimulator();
    setupNewTopicModal();
    setupQuestionForm();
    setupPollVoting();
    setupScrollAnimations();
    
    // Activar pestaña de filtro por defecto
    if (document.querySelector('.gallery-tabs')) {
        filterGallery('all');
    }
});

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', () => {
    // Cerrar menú móvil si está abierto y la pantalla es grande
    if (window.innerWidth > 768) {
        const nav = document.querySelector('.nav');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
});