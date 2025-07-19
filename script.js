const body = document.body;

// Escuchamos el evento 'mousemove' en todo el documento
window.addEventListener('mousemove', (e) => {

    // Obtenemos las coordenadas X e Y del cursor
    const x = e.clientX;
    const y = e.clientY;

    // Actualizamos las variables de CSS en el elemento body
    // Es importante añadir 'px' para que CSS lo interprete como una unidad de píxeles
    body.style.setProperty('--spotlight-x', x + 'px');
    body.style.setProperty('--spotlight-y', y + 'px');

});


// Class projects

class projects {

    constructor(img, alt, title, text, technology, linkgithub, linkWeb){
        
        this.img = img;
        this.alt = alt;
        this.title = title;
        this.text = text;
        this.technology = technology;
        this.linkgithub = linkgithub;
        this.linkWeb = linkWeb;

    }

    render(containerId){ 

        const container = document.getElementById(containerId);
   

        // Contenedor principal del proyecto
        const card = document.createElement("div");
        card.className = "project-card";


        // bloque0
        const cont0 = document.createElement("div");
        cont0.className = "cont-card0";

        // bloque1
        const cont1 = document.createElement("div");
        cont1.className = "cont-card1";

        // bloque2
        const cont2 = document.createElement("div");
        cont2.className = "cont-card2";

        // bloque3
        const cont3 = document.createElement("div");
        cont3.className = "cont-card3";

        // Imagen
        const image = document.createElement("img");
        image.src = this.img;
        image.alt = `Imagen de ${this.alt}`;
        image.className = "image-card";
   
        // Título 
        const title = document.createElement("h3");
        title.textContent = `${this.title}`;
        title.className = "title-card";

        // Texto
        const paragraph = document.createElement("p");
        paragraph.textContent = `${this.text}`;
        
        // Link a GitHub
        const githubLink = document.createElement("a");
        githubLink.href = this.linkgithub;
        githubLink.target = "_blank";
        githubLink.rel = "noopener noreferrer"; // seguridad adicional
        githubLink.className = "github-icon";

        // Redirección a web del proyecto
        const webProject = document.createElement("a");
        webProject.href = this.linkWeb;
        webProject.target = "_blank";
        webProject.rel = "noopener noreferrer";
        webProject.className = "url-icon";


        // ciclo creacion tecnologias
        if (this.technology && this.technology.length > 0) {

            const techList = document.createElement("div");
            techList.className = "tech-list";
            
            this.technology.forEach(tech => {

               const item = document.createElement("p");
               item.textContent = tech;
               item.className = "item";                
               techList.appendChild(item);        

            });

            card.appendChild(techList);
        };

        // Agregar al contenedor padre
        container.appendChild(card);

        card.appendChild(cont0)

        cont0.appendChild(cont1)
        cont1.appendChild(image);

        cont0.appendChild(cont2);
        cont2.appendChild(title); 
        cont2.appendChild(paragraph);

        cont2.appendChild(cont3)
        cont3.appendChild(githubLink);
        cont3.appendChild(webProject);

    };

};



// Inicializaciones Projects



// Class Certified



