🐲 Fernandes Tattoo Studio - Landing Page

Uma Landing Page de alta performance focada em conversão e experiência do usuário (UX), desenvolvida para um estúdio de tatuagem local.

🔗 Acesse o Projeto Online (Demo)
https://fernandeswebsite.netlify.app/
🖼️ Preview

<img width="1904" height="925" alt="image" src="https://github.com/user-attachments/assets/01398940-1fde-48db-a887-b9eb58d75961" />

🎯 Sobre o Projeto

Este projeto foi desenvolvido para resolver um problema real de um estúdio de tatuagem: a desorganização no processo de agendamento e a falta de uma presença digital que transmitisse autoridade.

O objetivo não foi apenas criar uma página bonita, mas desenvolver uma ferramenta de conversão que filtra clientes curiosos e entrega leads qualificados diretamente no WhatsApp do tatuador, com todas as informações necessárias (incluindo referências visuais).

✨ Funcionalidades Técnicas & Destaques

1. UX/UI Avançada

Navbar Dinâmica ("Zoom Out"): Implementação de lógica de estado baseada no evento de scroll. A barra de navegação reage à rolagem diminuindo a escala e aumentando a transparência (glassmorphism), melhorando a área útil de visualização.

Scroll Reveal Animations: Desenvolvimento de um componente reutilizável (FadeInSection) utilizando a Intersection Observer API para animar elementos apenas quando entram na viewport, garantindo performance.

2. Integração e Automação

Smart WhatsApp Booking: O formulário não envia um simples e-mail. Ele constrói dinamicamente uma URL da API do WhatsApp contendo Nome, Ideia e Local do corpo formatados.

Upload Simulation: UX aprimorada com um input de arquivo simulado que valida a seleção da imagem e instrui o usuário a enviá-la na conversa gerada, resolvendo a limitação de upload direto via link wa.me.

3. Performance e SEO

SEO Local: Implementação de Meta Tags dinâmicas e JSON-LD (Schema.org) estruturado para negócios locais, visando rankeamento no Google Maps e busca orgânica.

Otimização de Imagens: Uso de formatos modernos (WebP) e lazy loading implícito via React.

Mobile First: Design totalmente responsivo, garantindo experiência fluida em dispositivos móveis (foco principal do público-alvo).

🛠️ Tecnologias Utilizadas

Core: React.js (Vite)

Estilização: Tailwind CSS (para agilidade e consistência de design system)

Ícones: Lucide React

Deploy/CI: Netlify

Controle de Versão: Git & GitHub

🧠 Desafios e Aprendizados

Durante o desenvolvimento, um dos principais desafios foi gerenciar a experiência do usuário no upload de arquivos sem um backend dedicado.

Solução: Criei uma interface de feedback visual onde o ícone de upload muda para um "Check" verde ao selecionar o arquivo, e adicionei lógica condicional na string de mensagem do WhatsApp para avisar o tatuador que existe uma referência a ser enviada.

Isso demonstrou a importância de pensar na Jornada do Usuário para contornar limitações técnicas de forma elegante.

🚀 Como rodar o projeto localmente

Pré-requisitos: Node.js instalado.

# 1. Clone o repositório
git clone [https://github.com/SEU-USUARIO/fernandes-tattoo.git](https://github.com/SEU-USUARIO/fernandes-tattoo.git)

# 2. Entre na pasta
cd fernandes-tattoo

# 3. Instale as dependências
npm install

# 4. Rode o servidor de desenvolvimento
npm run dev


📬 Contato

Estou em busca de oportunidades como Desenvolvedor Front-end Júnior. Se você procura alguém apaixonado por criar interfaces que geram valor real, vamos conversar!


Desenvolvido com 💙 por [Lucas Santos]
