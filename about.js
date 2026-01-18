
const sectionAbout = document.getElementById('about-me');

let imageTerminalWrapper = document.createElement('div');
imageTerminalWrapper.classList.add('image-terminal-wrapper');

let image = document.createElement('img');
image.src = 'https://i.ibb.co/84YLVXwD/image-Photoroom.png';
image.alt = 'Profile Picture';
image.classList.add('profile-image');


let glasTerminal = document.createElement('div');
glasTerminal.classList.add('glasTerminal');




// --- AQUÍ EMPIEZA LA MAGIA DE LA TERMINAL ---

// 1. Datos falsos para generar código "DevOps"
const verbs = ["Installing", "Fetching", "Building", "Deploying", "Compiling"];
const packages = ["react-core", "node-modules", "mongo-db-driver", "docker-container", "k8s-pod", "aws-sdk"];
const status = ["[OK]", "[SUCCESS]", "[CACHED]", "[200]"];

// 2. Función que crea una línea nueva
function addTerminalLine() {
    let p = document.createElement('div');
    p.classList.add('terminal-line'); // Clase para estilizar la letra
    
    // Generar texto aleatorio: "Installing react-core... [OK]"
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const pkg = packages[Math.floor(Math.random() * packages.length)];
    const stat = status[Math.floor(Math.random() * status.length)];
    const time = Math.floor(Math.random() * 500) + "ms";
    
    // Usamos innerHTML para poder dar colores distintos
    p.innerHTML = `<span class="cmd-verb">${verb}</span> ${pkg} <span class="cmd-time">(${time})</span> <span class="cmd-status">${stat}</span>`;

    // Insertar en tu variable glasTerminal
    glasTerminal.appendChild(p);

    // 3. Auto-scroll: Mantener siempre abajo
    glasTerminal.scrollTop = glasTerminal.scrollHeight;

    // 4. Limpieza: Si hay más de 20 líneas, borra la primera para no llenar la memoria
    if (glasTerminal.childNodes.length > 20) {
        glasTerminal.removeChild(glasTerminal.firstChild);
    }
}

// 5. Iniciar el bucle rápido (cada 100ms)
setInterval(addTerminalLine, 250);

// --- FIN DE LA MAGIA ---

let sectionInfo= document.createElement('div');
sectionInfo.classList.add('section-info');

let heading = document.createElement('h2');
heading.textContent = "About Me";

let paragraph = document.createElement('p');
paragraph.classList.add('paragraph');
paragraph.textContent = "Hello! I’m a web developer in training, deeply interested in designing clean, functional, and visually appealing interfaces. I’m currently focused on improving my skills in HTML, CSS, and JavaScript, while preparing to master more advanced tools like React, Node.js, and databases such as MongoDB. ";

sectionAbout.appendChild(imageTerminalWrapper);
imageTerminalWrapper.appendChild(image);
imageTerminalWrapper.appendChild(glasTerminal);
sectionAbout.appendChild(sectionInfo);
sectionInfo.appendChild(heading);
sectionInfo.appendChild(paragraph);