// Initialisation du contexte de dessin
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Tableau des particules
let particles = [];

// Classe Particule
class Particle {
    constructor(x, y, speedX, speedY, radius, blur) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.radius = radius;
        this.blur = blur; // Niveau de flou
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        // Si la particule a un blur, appliquer un effet lumineux
        if (this.blur) {
            ctx.shadowColor = "white";
            ctx.shadowBlur = this.blur;
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        } else {
            ctx.shadowBlur = 0; // Pas de flou pour les autres
            ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        }

        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Réapparaître de l'autre côté si la particule sort de l'écran
        if (this.x > canvas.width) this.x = 0;
        if (this.y > canvas.height) this.y = 0;
    }
}

// Générer des particules
function createParticles() {
    particles = [];
    for (let i = 0; i < 150; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = (Math.random() - 0.5) * 0.5;
        const speedY = (Math.random() - 0.5) * 0.5;
        const radius = Math.random() * 3 + 1; // Taille de 1 à 4
        const blur = Math.random() < 0.3 ? Math.random() * 10 + 5 : 0; // 30% des particules ont un flou
        particles.push(new Particle(x, y, speedX, speedY, radius, blur));
    }
}

// Animation des particules
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

// Réagir au redimensionnement de la fenêtre
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
});

// Initialiser les particules
createParticles();
animateParticles();

// Fonction pour ouvrir le client mail
function openMail() {
    window.location.href = "mailto:malki.aro@icloud.com";
}

// Fonction pour copier le numéro de téléphone dans le presse-papiers
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Numéro copié dans le presse-papiers : " + text);
    }).catch(err => {
        console.error("Erreur lors de la copie :", err);
    });
}

// Fonction pour ouvrir Instagram dans un nouvel onglet
function openInstagram() {
    window.open("https://www.instagram.com/aroun_mlk_/", "_blank");
}

// Variables pour détecter la position de la souris
let mouseX = 0;
let mouseY = 0;
let mouseClicked = false; // Variable pour savoir si le clic est effectué

// Écouteur d'événement pour la position de la souris
window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Écouteur d'événement pour détecter le clic de souris
window.addEventListener("mousedown", () => {
    mouseClicked = true; // Le clic est effectué
});

window.addEventListener("mouseup", () => {
    mouseClicked = false; // Le clic est relâché
});

// Fonction pour repousser les particules de la souris uniquement lors du clic
function updateParticleDirection() {
    if (!mouseClicked) return; // Ne pas appliquer l'effet si aucun clic

    particles.forEach((particle) => {
        // Calculer la direction de la souris par rapport à la particule
        let dx = particle.x - mouseX;
        let dy = particle.y - mouseY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Créer un "effet de repousser" en ajustant la vitesse des particules
        if (distance < 150) { // Si la particule est proche de la souris
            let angle = Math.atan2(dy, dx);
            let force = (150 - distance) / 200; // Réduit l'intensité du repousser
            particle.speedX += Math.cos(angle) * force;
            particle.speedY += Math.sin(angle) * force;
        }
    });
}

// Mettre à jour les particules avec le mouvement de la souris
function animateWithMouseEffect() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateParticleDirection(); // Appliquer le repousser seulement si le clic est effectué
    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateWithMouseEffect);
}

// Lancer l'animation avec effet de repousser
animateWithMouseEffect();
