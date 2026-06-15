import { useState, useEffect } from "react";
import { motion, Variants, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, CheckCircleFill as CheckCircle2, GraphUpArrow as TrendingUp, ShieldCheck as Shield, Phone as Smartphone, Clock, Award, People as Users, FileText, Briefcase, List as MenuIcon, X as XIcon, Person as UserIcon } from "react-bootstrap-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const WPP_LINK = "https://wa.me/5561985197551";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-accent pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ x: cursorX, y: cursorY, translateX: 12, translateY: 12 }}
      />
    </>
  );
}

export default function Home() {
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    telefone: "",
    email: "",
    servico: "Contabilidade Empresarial",
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { nome, empresa, telefone, email, servico } = formData;
    
    if (!nome || !empresa || !telefone || !email) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const text = `Olá, gostaria de solicitar uma proposta.\n\n*Nome:* ${nome}\n*Empresa:* ${empresa}\n*Telefone:* ${telefone}\n*E-mail:* ${email}\n*Serviço de Interesse:* ${servico}`;
    
    const url = `${WPP_LINK}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden cursor-default">
      <CustomCursor />
      
      {/* NAVBAR */}
      <header className="absolute top-0 w-full z-[100] bg-background/80 backdrop-blur-lg border-b border-border transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="flex items-center justify-between h-24 relative">
            {/* Logo - centralizada no mobile, esquerda no desktop */}
            <div className="absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0 flex-shrink-0">
              <a href="#" className="flex items-center">
                <img
                  src="/logo original.png"
                  alt="VOCÊ PJ Contabilidade"
                  className="h-24 md:h-28 w-auto object-contain"
                />
              </a>
            </div>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#solucoes" className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors">Serviços</a>
              <a href="#diferenciais" className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors">Diferenciais</a>
              <a href="#passo-a-passo" className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors">Como Funciona</a>
              <a href="#contato" className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors">Contato</a>
            </nav>

            {/* Desktop CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <a
                href="https://onvio.com.br/clientcenter/pt/auth?r=%2Fhome"
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white font-medium text-sm rounded-lg hover:bg-primary/90 transition-all shadow-md group"
              >
                <UserIcon className="w-4 h-4 mr-2 group-hover:text-accent transition-colors" />
                Área do Cliente
              </a>
              
              <button
                className="md:hidden p-2 text-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-24 left-0 w-full bg-background border-b border-border shadow-xl py-4 px-6 flex flex-col gap-4"
          >
            <a href="#solucoes" onClick={() => setIsMenuOpen(false)} className="text-base font-medium text-foreground py-2 border-b border-border/50">Serviços</a>
            <a href="#diferenciais" onClick={() => setIsMenuOpen(false)} className="text-base font-medium text-foreground py-2 border-b border-border/50">Diferenciais</a>
            <a href="#passo-a-passo" onClick={() => setIsMenuOpen(false)} className="text-base font-medium text-foreground py-2 border-b border-border/50">Como Funciona</a>
            <a href="#contato" onClick={() => setIsMenuOpen(false)} className="text-base font-medium text-foreground py-2 border-b border-border/50">Contato</a>
            <a
              href="https://onvio.com.br/clientcenter/pt/auth?r=%2Fhome"
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-md"
            >
              <UserIcon className="w-5 h-5 mr-2 text-accent" />
              Área do Cliente
            </a>
          </motion.div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 lg:px-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/40 z-10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent z-20" />
          <img
            src="/images/hero_bg.png"
            alt="Escritório corporativo"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-30 max-w-7xl mx-auto flex flex-col items-center text-center space-y-6 mt-0 md:-mt-16">


          <motion.h1
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400 max-w-5xl leading-tight tracking-tight drop-shadow-2xl"
          >
            Contabilidade inteligente para <br className="hidden sm:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Empresas que crescem</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] max-w-3xl"
          >
            Atendimento especializado para empresas de Brasília e todo o Brasil com suporte completo nas áreas contábil, fiscal, tributária e departamento pessoal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-8 w-full sm:w-auto px-4"
          >
            <a
              href={WPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="relative overflow-hidden group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-bold rounded-xl transition-all animate-cta-pulse text-center"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <span className="relative">👉 Falar com um Especialista</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* SERVIÇOS SECTION */}
      <section id="solucoes" className="py-20 px-6 lg:px-20 bg-muted/50 relative">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto md:mt-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-3">Nossos Serviços</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-primary dark:text-white">Soluções para sua empresa</h3>
            <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: "Contabilidade Empresarial", icon: Briefcase },
              { title: "Planejamento Tributário", icon: TrendingUp },
              { title: "Departamento Pessoal", icon: Users },
              { title: "Abertura de Empresas", icon: FileText },
              { title: "Regularização Empresarial", icon: Shield },
              { title: "BPO Financeiro", icon: TrendingUp },
              { title: "Consultoria Fiscal", icon: FileText },
              { title: "Gestão Contábil Completa", icon: Briefcase },
            ].map((srv, i) => (
              <motion.a
                href={`${WPP_LINK}?text=${encodeURIComponent(`Olá, gostaria de saber mais sobre o serviço de ${srv.title}.`)}`}
                target="_blank"
                rel="noreferrer"
                key={i}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5, zIndex: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="group p-6 rounded-2xl bg-white dark:bg-card border border-border/50 hover:border-accent/80 shadow-md hover:shadow-[0_20px_50px_rgba(200,164,107,0.25)] transition-colors duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer block text-left"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/20 to-transparent rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700 ease-out" />
                <srv.icon className="w-10 h-10 text-secondary mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                <h4 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary dark:group-hover:text-accent transition-colors">{srv.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">Estratégias personalizadas para maximizar seus resultados e garantir conformidade.</p>
                <div className="mt-auto flex items-center text-secondary text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Saiba mais 
                  <span className="ml-2 group-hover:translate-x-1 transition-transform flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 animate-scale-pulse" />
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DIFERENCIAIS SECTION */}
      <section id="diferenciais" className="py-12 md:py-24 px-6 lg:px-20 bg-muted/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-accent/20 rounded-[2rem] transform rotate-3 blur-sm" />
            <img
              src="/images/consultancy.png"
              alt="Reunião de consultoria"
              className="relative rounded-[2rem] shadow-2xl object-cover h-[300px] sm:h-[400px] md:h-[600px] w-full"
            />
            <div className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-8 bg-primary text-white p-5 md:p-8 rounded-2xl shadow-xl max-w-[180px] md:max-w-xs">
              <p className="text-3xl md:text-4xl font-bold text-accent mb-1 md:mb-2">100%</p>
              <p className="font-medium text-sm md:text-base">Foco no crescimento do seu negócio</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-3">Nossos Diferenciais</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-primary dark:text-white mb-6 md:mb-8">Por que escolher a VOCÊ PJ?</h3>
            
            <div className="space-y-6">
              {[
                "Atendimento Humanizado",
                "Especialistas em Pequenas e Médias Empresas",
                "Redução de Carga Tributária",
                "Atendimento 100% Digital",
                "Segurança e Transparência",
                "Suporte Ágil via WhatsApp"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-card transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0" />
                  <span className="text-lg font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* NÚMEROS SECTION */}
      <section className="py-14 md:py-24 px-6 lg:px-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/numbers_bg.png')] bg-cover bg-center opacity-5 mix-blend-overlay" />
        <div className="max-w-7xl mx-auto relative z-10 space-y-16">

          {/* Cards com ícones */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: Users, text: "+500 Empresas Atendidas" },
              { icon: TrendingUp, text: "Atendimento Nacional" },
              { icon: Award, text: "Suporte Especializado" },
              { icon: Smartphone, text: "Contabilidade Digital" }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white/10 border border-white/20 rounded-xl p-4 flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 hover:bg-white/20 transition-colors duration-300 group"
              >
                <div className="p-2 bg-accent/20 rounded-lg group-hover:bg-accent/40 transition-colors">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <p className="font-semibold text-sm text-white leading-snug">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Divisor */}
          <div className="w-full h-px bg-white/10" />

          {/* Números */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 text-center"
          >
            {[
              { number: "+500", label: "Clientes Atendidos" },
              { number: "+10", label: "Anos de Experiência" },
              { number: "+1000", label: "Declarações Entregues" },
              { number: "98%", label: "Clientes Satisfeitos" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="space-y-2 md:space-y-4">
                <h4 className="text-4xl md:text-6xl font-bold text-accent">{stat.number}</h4>
                <p className="text-sm md:text-lg text-white/80 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* DEPOIMENTOS SECTION */}
      <section className="py-16 md:py-32 px-6 lg:px-20 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-20">
            <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-3">Depoimentos</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-primary dark:text-white">O que dizem nossos clientes</h3>
            <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full" />
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            className="pb-16"
          >
            {[
              { name: "Carlos Silva", role: "CEO, Tech Solutions", text: "A VOCÊ PJ transformou nossa gestão financeira. A redução tributária foi impressionante." },
              { name: "Mariana Costa", role: "Diretora, Clínica Vida", text: "Atendimento impecável via WhatsApp. Nunca foi tão fácil resolver questões contábeis." },
              { name: "Roberto Alves", role: "Fundador, Agência Criativa", text: "Profissionalismo e transparência em cada etapa. Recomendo para qualquer empresa em crescimento." },
              { name: "Ana Beatriz", role: "Sócia, Retail Tech", text: "A transição para a VOCÊ PJ foi suave e a equipe é extremamente capacitada e solícita." },
            ].map((dep, i) => (
              <SwiperSlide key={i}>
                <div className="p-8 rounded-2xl bg-white dark:bg-card border border-border shadow-lg h-full flex flex-col">
                  <div className="flex gap-1 text-accent mb-6">
                    {[...Array(5)].map((_, idx) => (
                      <svg key={idx} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground/80 italic mb-8 flex-grow">"{dep.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                      {dep.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-bold text-foreground">{dep.name}</h5>
                      <p className="text-sm text-muted-foreground">{dep.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* PROCESSO SECTION */}
      <section id="passo-a-passo" className="py-14 md:py-24 px-6 lg:px-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-20">
            <h2 className="text-sm font-bold text-secondary uppercase tracking-wider mb-3">Passo a Passo</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-primary dark:text-white">Como funciona</h3>
            <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
            {[
              { title: "Entre em contato", desc: "Fale conosco via WhatsApp ou formulário." },
              { title: "Analisamos sua necessidade", desc: "Nossos especialistas avaliam o cenário da sua empresa." },
              { title: "Definimos a melhor estratégia", desc: "Criamos um plano personalizado com foco em economia." },
              { title: "Sua empresa cresce com segurança", desc: "Você foca no negócio enquanto cuidamos da contabilidade." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative z-10 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-primary text-accent rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-xl border-4 border-background">
                  {i + 1}
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{step.title}</h4>
                <p className="text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARIO & CTA SECTION */}
      <section id="contato" className="py-16 md:py-24 px-6 lg:px-20 bg-background">
        <div className="max-w-6xl mx-auto bg-primary rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row relative">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('/images/form_bg.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
          
          <div className="lg:w-1/2 p-6 sm:p-8 lg:p-20 relative z-10 text-white flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-accent">Sua contabilidade pode ser mais simples</h3>
            <p className="text-base md:text-lg text-white/80 mb-6 md:mb-10">
              Fale agora com nossa equipe e descubra como podemos ajudar sua empresa a crescer pagando menos impostos e mantendo tudo em conformidade.
            </p>
            <a
              href={WPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-bold rounded-xl hover:bg-white transition-all animate-cta-pulse w-max"
            >
              👉 Chamar no WhatsApp
            </a>
          </div>

          <div className="lg:w-1/2 bg-white dark:bg-card p-6 sm:p-8 lg:p-20 relative z-10">
            <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-6 md:mb-8">Solicite uma proposta</h4>
            <form className="space-y-6" onSubmit={handleWhatsAppSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Nome Completo</label>
                <input type="text" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="Seu nome" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Empresa</label>
                <input type="text" value={formData.empresa} onChange={(e) => setFormData({...formData, empresa: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="Nome da sua empresa" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Telefone/WhatsApp</label>
                  <input type="tel" value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">E-mail</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" placeholder="seu@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Serviço de Interesse</label>
                <select value={formData.servico} onChange={(e) => setFormData({...formData, servico: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors">
                  <option>Contabilidade Empresarial</option>
                  <option>Abertura de Empresa</option>
                  <option>BPO Financeiro</option>
                  <option>Consultoria Fiscal</option>
                  <option>Outros</option>
                </select>
              </div>
              <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-lg">
                Enviar Solicitação
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary pt-12 md:pt-20 pb-10 px-6 lg:px-20 text-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          <div className="md:col-span-2">
            <img
              src="/logo original.png"
              alt="VOCÊ PJ Contabilidade"
              className="h-20 md:h-36 w-auto object-contain mb-4 md:mb-6"
            />
            <p className="text-white/70 max-w-sm mb-8">
              Soluções contábeis modernas e eficientes para empresas que buscam crescimento com segurança e economia.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h6 className="font-bold mb-6 text-lg">Links Rápidos</h6>
            <ul className="space-y-4 text-white/70">
              <li><a href="#solucoes" className="hover:text-accent transition-colors">Serviços</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Diferenciais</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Como Funciona</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h6 className="font-bold mb-6 text-lg">Contato</h6>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-accent"><Smartphone className="w-4 h-4" /></div>
                (61) 98519-7551
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-accent"><CheckCircle2 className="w-4 h-4" /></div>
                Brasília - DF
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-accent"><Clock className="w-4 h-4" /></div>
                Seg - Sex, 08h às 18h
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-center md:text-left text-white/50 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} VOCÊ PJ CONTABILIDADE LTDA. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Produzida com 💚 por 
            <a href="https://camaly.com.br/" target="_blank" rel="noreferrer" className="text-accent font-bold hover:text-white transition-colors">
              CAMALY
            </a>
          </p>
          <div className="space-x-4">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        href={WPP_LINK}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
      </motion.a>
    </main>
  );
}
