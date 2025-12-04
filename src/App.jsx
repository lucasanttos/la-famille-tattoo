import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Instagram, MapPin, Clock, 
  Upload, ChevronRight, Star, Heart, 
  Code, MessageCircle, ArrowUp 
} from 'lucide-react';

/**
 * COMPONENTE REUTILIZÁVEL: RevealOnScroll
 * Responsável por animar os elementos quando eles entram na viewport.
 * Usa IntersectionObserver para performance.
 */
const RevealOnScroll = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Se o elemento aparecer na tela, ativa a animação
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Para de observar após aparecer (animação única)
        }
      },
      { threshold: 0.1 } // Dispara quando 10% do elemento estiver visível
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

/**
 * COMPONENTE PRINCIPAL: App
 */
export default function App() {
  // --- ESTADOS ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Estados do Formulário
  const [formData, setFormData] = useState({
    nome: '',
    estilo: '',
    local: '',
    tamanho: ''
  });
  const [hasFile, setHasFile] = useState(false); // Simula o upload

  // Estados do Popup do Desenvolvedor
  const [showDevPopup, setShowDevPopup] = useState(false);
  const [minimizeDevPopup, setMinimizeDevPopup] = useState(false);

  // --- EFEITOS (Hooks) ---

  // 1. Controla a Navbar ao rolar a página
  useEffect(() => {
    const handleScroll = () => {
      // Se rolar mais de 50px, ativa o modo "scrolled"
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Controla o tempo de exibição do Popup do Dev
  useEffect(() => {
    // Aparece após 4 segundos
    const showTimer = setTimeout(() => {
      setShowDevPopup(true);
    }, 4000);

    // Minimiza após 5 segundos de exibição (4s inicio + 5s duração = 9s total)
    const minimizeTimer = setTimeout(() => {
      setMinimizeDevPopup(true);
    }, 9000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(minimizeTimer);
    };
  }, []);

  // --- FUNÇÕES AUXILIARES ---

  // Rolagem suave para seções (fechando o menu mobile se aberto)
  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // offsetTop - 80 para compensar a altura da navbar fixa
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Manipulação do Formulário
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simulação de Upload de arquivo
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setHasFile(true);
    }
  };

  // Envio para WhatsApp
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    
    // Construção da mensagem
    let message = `Olá! Visitei o site da La Famille Tattoo e gostaria de solicitar um orçamento.\n\n`;
    message += `*Nome:* ${formData.nome}\n`;
    message += `*Ideia/Estilo:* ${formData.estilo}\n`;
    message += `*Local do Corpo:* ${formData.local}\n`;
    message += `*Tamanho Aprox:* ${formData.tamanho}\n`;
    
    if (hasFile) {
      message += `\n📷 *Tenho uma foto de referência para enviar!* (Vou anexar aqui na conversa)`;
    }

    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "5584998979050";
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  // --- RENDERIZAÇÃO ---
  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans selection:bg-gold selection:text-black">
      
      {/* Estilos Globais para Fontes e Cores Personalizadas */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Lato:wght@300;400;700&display=swap');
        
        .font-display { font-family: 'Cinzel', serif; }
        .font-body { font-family: 'Lato', sans-serif; }
        .text-gold { color: #D4AF37; }
        .bg-gold { background-color: #D4AF37; }
        .border-gold { border-color: #D4AF37; }
        .hover-text-gold:hover { color: #D4AF37; }
        .hover-bg-gold:hover { background-color: #D4AF37; }
      `}</style>

      {/* --- NAVBAR --- */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 border-b border-white/5 ${
          isScrolled 
            ? 'py-2 bg-black/90 backdrop-blur-md shadow-lg' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div 
            className={`font-display font-bold text-2xl tracking-widest transition-transform duration-300 cursor-pointer ${
              isScrolled ? 'scale-90' : 'scale-100'
            }`}
            onClick={() => scrollToSection('hero')}
          >
            <span className="text-gold">LA</span> FAMILLE <span className="text-xs tracking-widest block text-zinc-400 -mt-1">TATTOO</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 font-body text-sm tracking-wider uppercase">
            {['Início', 'Sobre', 'Galeria', 'Contato'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item === 'Início' ? 'hero' : item.toLowerCase())}
                className="hover:text-gold transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Botão Mobile */}
          <button 
            className="md:hidden text-white hover:text-gold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-zinc-800 p-6 flex flex-col space-y-4 animate-fadeIn">
            {['Início', 'Sobre', 'Galeria', 'Contato'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item === 'Início' ? 'hero' : item.toLowerCase())}
                className="text-left text-lg font-body uppercase tracking-wider hover:text-gold py-2 border-b border-white/10"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image com Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=1974&auto=format&fit=crop" 
            alt="Tattoo Background" 
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <RevealOnScroll>
            <h2 className="text-gold font-body tracking-[0.3em] text-sm md:text-base mb-4 uppercase">
              Arte • Exclusividade • Tradição
            </h2>
          </RevealOnScroll>
          
          <RevealOnScroll delay={200}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              <span className="text-gold">LA</span> FAMILLE<br/>TATTOO
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={400}>
            <p className="font-body text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
              Transformando histórias em arte na pele. Localizado no coração de Lagoa Nova.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={600}>
            <button 
              onClick={() => scrollToSection('contato')}
              className="group relative px-8 py-4 bg-transparent border border-gold text-gold font-bold uppercase tracking-widest overflow-hidden transition-all hover:text-black"
            >
              <span className="absolute inset-0 w-0 bg-gold transition-all duration-[250ms] ease-out group-hover:w-full"></span>
              <span className="relative z-10 flex items-center gap-2">
                Agendar Tattoo <ChevronRight size={16} />
              </span>
            </button>
          </RevealOnScroll>
        </div>
      </section>

      {/* --- SOBRE & LOCALIZAÇÃO --- */}
      <section id="sobre" className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            
            {/* Texto */}
            <div className="w-full md:w-1/2 space-y-6">
              <RevealOnScroll>
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-px w-12 bg-gold"></div>
                  <span className="text-gold uppercase tracking-widest text-sm">O Estúdio</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl text-white">
                  Onde a arte encontra a <span className="text-gold italic">técnica</span>.
                </h2>
                <p className="text-zinc-400 font-body leading-relaxed">
                  Na La Famille Tattoo, entendemos que cada traço conta uma história. 
                  Nosso ambiente é preparado para oferecer conforto, segurança e uma 
                  experiência única para nossos clientes.
                </p>
                
                <div className="space-y-4 pt-4 border-t border-zinc-800">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-gold shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white font-bold mb-1">Localização Privilegiada</h4>
                      <p className="text-zinc-500 text-sm">
                        Av. Salgado Filho N. 1595, Sala 104<br/>
                        Lagoa Nova - Natal/RN<br/>
                        <span className="text-gold text-xs">(Próximo ao Shopping Midway Mall)</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Clock className="text-gold shrink-0 mt-1" />
                    <div>
                      <h4 className="text-white font-bold mb-1">Horários</h4>
                      <p className="text-zinc-500 text-sm">
                        Segunda a Sábado: 10h às 19h<br/>
                        Domingo: Fechado
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Imagem */}
            <div className="w-full md:w-1/2 relative">
              <RevealOnScroll delay={300}>
                <div className="relative border border-zinc-800 p-2">
                  <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-gold opacity-50"></div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-gold opacity-50"></div>
                  <img 
                    src="local.jpg" 
                    alt="Interior do Estúdio" 
                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* --- GALERIA --- */}
      <section id="galeria" className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl text-white mb-2">Trabalhos Recentes</h2>
              <div className="w-24 h-1 bg-gold mx-auto"></div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "t1.jpeg",
              "/t2.jpeg",
              "/t2.jpg",
              "/t3.jpg",
              "/t4.jpg",
              "/t5.jpg"
            ].map((img, index) => (
              <RevealOnScroll key={index} delay={index * 100}>
                <div className="group relative overflow-hidden aspect-square cursor-pointer bg-black">
                  <img 
                    src={img} 
                    alt={`Tattoo Work ${index}`}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-gold font-display tracking-widest text-sm">Ver no Instagram</span>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="https://instagram.com/lafamilletattoo" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-gold transition-colors font-body uppercase tracking-widest text-sm border-b border-white/20 pb-1 hover:border-gold"
            >
              <Instagram size={18} /> Ver mais no Instagram
            </a>
          </div>
        </div>
      </section>

      {/* --- FORMULÁRIO DE CONTATO (WHATSAPP INTELIGENTE) --- */}
      <section id="contato" className="py-20 relative bg-zinc-950">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 p-8 md:p-12 shadow-2xl relative overflow-hidden">
            
            {/* Elemento decorativo */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl"></div>

            <div className="text-center mb-10">
              <RevealOnScroll>
                <h2 className="font-display text-3xl md:text-4xl text-white mb-4">Orçamento & Agendamento</h2>
                <p className="text-zinc-400">Preencha os dados abaixo. Você será redirecionado para o WhatsApp já com tudo preenchido.</p>
              </RevealOnScroll>
            </div>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
              <RevealOnScroll delay={100}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nome */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-gold font-bold">Seu Nome</label>
                    <input 
                      type="text" 
                      name="nome"
                      required
                      placeholder="Como gostaria de ser chamado?"
                      className="w-full bg-zinc-950 border border-zinc-800 text-white p-4 focus:border-gold focus:outline-none transition-colors"
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Local do Corpo */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-gold font-bold">Local do Corpo</label>
                    <input 
                      type="text" 
                      name="local"
                      required
                      placeholder="Ex: Braço, Costela, Perna..."
                      className="w-full bg-zinc-950 border border-zinc-800 text-white p-4 focus:border-gold focus:outline-none transition-colors"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={200}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tamanho */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-gold font-bold">Tamanho Aproximado (cm)</label>
                    <input 
                      type="text" 
                      name="tamanho"
                      required
                      placeholder="Ex: 15cm"
                      className="w-full bg-zinc-950 border border-zinc-800 text-white p-4 focus:border-gold focus:outline-none transition-colors"
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Estilo/Ideia */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-gold font-bold">Estilo ou Ideia</label>
                    <input 
                      type="text" 
                      name="estilo"
                      required
                      placeholder="Ex: Realismo, Old School, Escrita..."
                      className="w-full bg-zinc-950 border border-zinc-800 text-white p-4 focus:border-gold focus:outline-none transition-colors"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </RevealOnScroll>

              {/* Upload Falso / Visual */}
              <RevealOnScroll delay={300}>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-gold font-bold block">Referência (Opcional)</label>
                  <label className={`flex items-center justify-center w-full p-4 border border-dashed cursor-pointer transition-all ${
                    hasFile 
                      ? 'border-green-500 bg-green-900/10 text-green-500' 
                      : 'border-zinc-700 hover:border-gold text-zinc-500 hover:text-white'
                  }`}>
                    <input type="file" className="hidden" onChange={handleFileChange} />
                    <div className="flex items-center gap-3">
                      {hasFile ? <Star size={20} fill="currentColor" /> : <Upload size={20} />}
                      <span className="text-sm">
                        {hasFile 
                          ? 'Foto selecionada! (Será solicitado o envio no chat)' 
                          : 'Clique para anexar uma referência'}
                      </span>
                    </div>
                  </label>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={400}>
                <button 
                  type="submit"
                  className="w-full bg-gold text-black font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Enviar via WhatsApp
                </button>
                <p className="text-center text-zinc-600 text-xs mt-4">
                  Ao clicar, você será direcionado para o WhatsApp oficial do estúdio.
                </p>
              </RevealOnScroll>
            </form>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black border-t border-zinc-900 py-12 text-center md:text-left">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Brand */}
            <div>
              <h2 className="font-display text-2xl font-bold text-white">
                <span className="text-gold">LA</span> FAMILLE
              </h2>
              <p className="text-zinc-500 text-sm mt-2">© {new Date().getFullYear()} Todos os direitos reservados.</p>
            </div>

            {/* Social */}
            <div className="flex gap-6">
              <a href="https://instagram.com/lafamilletattoo" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-gold transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://wa.me/5584998979050" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-gold transition-colors">
                <MessageCircle size={24} />
              </a>
            </div>

            {/* Créditos Estáticos */}
            <div className="text-sm text-zinc-600">
              <p>Desenvolvido por <a href="https://uicode-dev.netlify.app/" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-gold transition-colors">UiCode.dev</a></p>
            </div>
          </div>
        </div>
      </footer>

      {/* --- POPUP DO DESENVOLVEDOR --- */}
      {showDevPopup && (
        <div className={`fixed bottom-4 left-4 z-50 transition-all duration-500 ${
          minimizeDevPopup ? 'w-12 h-12 rounded-full overflow-hidden' : 'w-auto max-w-sm rounded-lg'
        }`}>
          {minimizeDevPopup ? (
            // Versão Minimizada (Ícone)
            <button 
              onClick={() => setMinimizeDevPopup(false)}
              className="w-full h-full bg-zinc-900 border border-gold/30 flex items-center justify-center text-gold shadow-lg hover:bg-zinc-800 transition-colors"
              title="Sobre o Desenvolvedor"
            >
              <Code size={20} />
            </button>
          ) : (
            // Versão Completa (Popup)
            <div className="bg-zinc-900 border border-zinc-800 p-4 shadow-2xl relative animate-fadeIn flex flex-col gap-3">
              <button 
                onClick={() => setMinimizeDevPopup(true)}
                className="absolute top-2 right-2 text-zinc-500 hover:text-white"
              >
                <X size={14} />
              </button>
              
              <div className="flex items-center gap-2 text-gold font-bold text-sm uppercase tracking-wider">
                <Code size={16} /> UiCode.dev
              </div>
              
              <p className="text-zinc-300 text-sm leading-relaxed">
                Gostou deste site? Crie uma presença digital profissional para o seu negócio hoje mesmo.
              </p>
              
              <div className="flex gap-3 text-xs font-bold pt-2 border-t border-zinc-800">
                <a 
                  href="https://instagram.com/uicode.dev" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-white hover:text-gold transition-colors flex items-center gap-1"
                >
                  <Instagram size={12} /> @uicode.dev
                </a>
                <a 
                  href="https://wa.me/5511916474626" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-white hover:text-green-400 transition-colors flex items-center gap-1"
                >
                  <MessageCircle size={12} /> WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Botão Voltar ao Topo (Aparece quando scroll > 500) */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-4 right-4 bg-gold text-black p-3 rounded-full shadow-lg transition-all duration-500 z-40 hover:bg-white ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <ArrowUp size={20} />
      </button>

    </div>
  );
}