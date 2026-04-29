        // --- CONSTRUCCIÓN DINÁMICA DE LA GLASS CARD ---
        function buildCardUI() {
            const glassCard = document.createElement('div');
            glassCard.className = 'glass-card';

            const header = document.createElement('div');
            header.className = 'card-header';

            const headerLeft = document.createElement('div');
            headerLeft.className = 'header-left';
            headerLeft.style.alignItems = 'center';

            const profileContainer = document.createElement('div');
            profileContainer.className = 'profile-container';
            const profileImg = document.createElement('img');
            profileImg.src = 'https://i.ibb.co/5mRNFs4/imgcv.png';
            profileImg.alt = 'Perfil DevOps';
            profileContainer.appendChild(profileImg);

            const titleContainer = document.createElement('div');
            titleContainer.className = 'title-container';
            const titleH2 = document.createElement('h2');
            titleH2.textContent = 'CI/CD Automation';
            
            const statusText = document.createElement('p');
            statusText.id = 'status-text';
            
            const textNodeActive = document.createTextNode('Active ');
            const statusSpan = document.createElement('span');
            statusSpan.className = 'status-dot';
            statusSpan.id = 'status-dot';
            const textNodeReady = document.createTextNode(' Production Ready');
            
            statusText.appendChild(textNodeActive);
            statusText.appendChild(statusSpan);
            statusText.appendChild(textNodeReady);

            titleContainer.appendChild(titleH2);
            titleContainer.appendChild(statusText);

            headerLeft.appendChild(profileContainer);
            headerLeft.appendChild(titleContainer);

            const reliabilityBadge = document.createElement('div');
            reliabilityBadge.className = 'reliability-badge';
            reliabilityBadge.id = 'reliability-badge-text';

            header.appendChild(headerLeft);
            header.appendChild(reliabilityBadge);

            const logsWindow = document.createElement('div');
            logsWindow.className = 'logs-window';
            logsWindow.id = 'logsWindow';

            const logsTrack = document.createElement('div');
            logsTrack.className = 'logs-track';
            logsTrack.id = 'logsTrack';

            logsWindow.appendChild(logsTrack);
            glassCard.appendChild(header);
            glassCard.appendChild(logsWindow);

            return {
                track: logsTrack,
                badgeElement: reliabilityBadge,
                glassCard: glassCard
            };
        }

        // 1. Construimos la interfaz del panel
        const ui = buildCardUI();
        const track = ui.track;
        const badgeElement = ui.badgeElement;

        // 2. LÓGICA DE CÓDIGO PARA INTEGRAR LA GLASS CARD EN LA SECCIÓN "SOBRE MÍ"
        const sectionAbout = document.getElementById('about-me');
        sectionAbout.classList.add('section-about');

        let terminalFrame = document.createElement('div');
        terminalFrame.classList.add('terminal-frame');

        let sectionInfo = document.createElement('div');
        sectionInfo.classList.add('info-about');

        let heading = document.createElement('h2');
        heading.setAttribute("data-i18n", "title-aboutme.heading");
        
        // Nota: Agregamos texto temporal para ver la previsualización aquí. 
        // Reemplaza por tu i18next.t("title-aboutme.heading") original.
        heading.textContent = "Sobre Mí (Info)"; 

        let paragraph = document.createElement('p');
        paragraph.classList.add('paragraph');
        paragraph.setAttribute("data-i18n", "about.paragraph");
        
        // Nota: Agregamos texto temporal. Reemplázalo por tu i18next
        paragraph.textContent = "Información del desarrollador estructurada según tu portafolio."; 

        // Ensamblado
        sectionAbout.appendChild(sectionInfo);
        sectionAbout.appendChild(terminalFrame);
        sectionInfo.appendChild(heading);
        sectionInfo.appendChild(paragraph);

        // 3. Insertamos LA GLASS CARD DENTRO DE TU TERMINAL FRAME
        terminalFrame.appendChild(ui.glassCard);


        // --- LÓGICA DE DATOS Y ANIMACIÓN (DevOps) ---
        const devopsLogs = [
            { title: "Ejecutando flujos de trabajo...", desc: "Fases de compilación y pruebas automatizadas" },
            { title: "Monitoreando despliegues...", desc: "+6 lanzamientos hoy • 0 ejecuciones fallidas" },
            { title: "Aprovisionando infraestructura...", desc: "Terraform apply completado con éxito" },
            { title: "Sincronización de clúster K8s...", desc: "Todos los pods están sanos y en ejecución" },
            { title: "Escaneo de seguridad de contenedores...", desc: "0 vulnerabilidades críticas encontradas" },
            { title: "Construyendo imagen Docker...", desc: "Imagen subida a AWS ECR (tag: v2.4.1)" }
        ];
        
        function renderLogs() {
            const allLogs = [...devopsLogs, ...devopsLogs];
            track.innerHTML = allLogs.map((log) => `
                <div class="log-item">
                    <div class="log-title">${log.title}</div>
                    <div class="log-desc">${log.desc}</div>
                </div>
            `).join('');

            const animationDuration = devopsLogs.length * 20; 
            track.style.animation = `scrollUp ${animationDuration}s linear infinite`;
        }

        // --- EFECTO TYPED LENTO PARA EL BADGE ---
        const badgeWords = ["Plan", "Code", "Build", "Test", "Release", "Deploy", "Monitor", "99.9% Reliability"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

  function typeBadge() { 
      const currentWord = badgeWords[wordIndex];
      
      if (isDeleting) {
          badgeElement.innerHTML = currentWord.substring(0, charIndex - 1) + '<span class="type-cursor"></span>';
          charIndex--;
      } else {
          badgeElement.innerHTML = currentWord.substring(0, charIndex + 1) + '<span class="type-cursor"></span>';
          charIndex++;
      }

      let typeSpeed = 150; 
      if (isDeleting) typeSpeed = 80;

      if (!isDeleting && charIndex === currentWord.length) {
          typeSpeed = 2000; 
          isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % badgeWords.length;
          typeSpeed = 500; 
      }

      setTimeout(typeBadge, typeSpeed);
  }

    renderLogs();
    typeBadge();

    ui.glassCard.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    ui.glassCard.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });

if (typeof window.updateContent === "function") {
  window.updateContent();
}


