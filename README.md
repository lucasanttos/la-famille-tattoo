🦁 La Famille Tattoo - Landing Page Concept

Live Demo: Clique aqui para ver o projeto online

📄 Sobre o Projeto

Este projeto é uma Landing Page de Alta Performance desenvolvida para modernizar a presença digital de um estúdio de tatuagem real.

O objetivo principal não foi apenas criar um design estético ("Dark & Gold"), mas resolver um problema de negócio: otimizar a triagem de atendimentos no WhatsApp.

Para isso, desenvolvi uma aplicação Single Page (SPA) que guia o usuário e gera, via código, um link de agendamento pré-formatado, economizando tempo da recepção e qualificando o lead.

🚀 Funcionalidades & Destaques Técnicos

O diferencial deste projeto para um recrutador técnico:

1. Automação de WhatsApp (Lógica de Negócio)

Ao invés de um formulário de contato tradicional (que envia e-mail), criei um sistema que captura:

Nome

Ideia/Estilo

Local do corpo

Confirmação de arquivo de referência

O algoritmo processa esses dados e monta uma URL (wa.me) codificada, entregando a mensagem pronta no app do estúdio.

2. UI/UX & Animações (Custom Hooks)

Scroll Reveal: Implementei um IntersectionObserver personalizado dentro de um componente React reutilizável (<RevealOnScroll />). Isso garante que os elementos apareçam suavemente apenas quando entram na viewport, sem pesar o carregamento inicial.

Navbar Responsiva: A barra de navegação reage ao scroll (window.scrollY), alterando transparência, padding e escala do logo para melhorar a área útil de leitura.

3. SEO & Performance

Estrutura semântica de HTML5.

Uso de Meta Tags e Open Graph para garantir que o link seja visualmente atrativo ao ser compartilhado em redes sociais.

Pontuação alta no Lighthouse devido ao uso do Vite e carregamento otimizado de fontes.

🛠 Tecnologias Utilizadas

React.js: Estruturação da interface baseada em componentes funcionais.

Tailwind CSS v3: Estilização utility-first para agilidade e consistência de design system (paleta de cores customizada).

Lucide React: Ícones leves e otimizados via SVG.

Vite: Build tool para ambiente de desenvolvimento rápido e bundle otimizado.

📸 Screenshots

(Espaço reservado: Adicione aqui prints do site no Desktop e no Mobile)

💻 Como rodar o projeto localmente

Pré-requisitos: Node.js instalado.

# 1. Clone o repositório
git clone [https://github.com/SEU_USUARIO/la-famille-tattoo.git](https://github.com/SEU_USUARIO/la-famille-tattoo.git)

# 2. Entre na pasta
cd la-famille-tattoo

# 3. Instale as dependências
npm install

# 4. Rode o servidor de desenvolvimento
npm run dev


💡 Aprendizados

Durante o desenvolvimento deste projeto, aprofundei meus conhecimentos em:

Componentização Eficiente: Como quebrar uma Landing Page em blocos lógicos sem "prop drilling" excessivo.

Mobile First: O CSS foi pensado primeiramente para telas pequenas, garantindo responsividade total.

Deploy Contínuo: Configuração de pipeline de entrega automática via Netlify/GitHub.

📬 Contato

Estou em busca da minha primeira oportunidade como Desenvolvedor Front-end Júnior. Se você gostou do código e da solução, vamos conversar!

[Seu Nome]
[Seu LinkedIn]
[Seu E-mail]
