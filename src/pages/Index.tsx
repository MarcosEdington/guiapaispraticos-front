import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ShieldCheck, Clock, Star, Heart, AlertTriangle, Baby, Brain, Utensils, Puzzle, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import heroImg from "@/assets/hero-maternity.jpg";
import ebookTdah from "@/assets/ebookTdah.png";
import ebookSono from "@/assets/mestresdosoninho.png";
import ebookAlimentar from "@/assets/introducaoalimentar.png";
import ebookAutismo from "@/assets/ebook-autismo.jpg";
import ebookAmamentacao    from "@/assets/amamentacao.png";
import ebookReceitas    from "@/assets/ebookReceitas.png"; 
import ebookBrincadeiras    from "@/assets/brincadeira.png"; 
import ebookMaeSaudavel    from "@/assets/maesaudavel.png";
import ebookEducacaoEspecial from "@/assets/educacaoespecial.png";
import ebookTelas from "@/assets/ebooktelas.png"; 
import ebookBirra from "@/assets/ebookBirra.png"; 

// Definição de interface para corrigir o erro de lint (no-explicit-any)
interface Ebook {
  id: number;
  title: string;
  description: string;
  oldPrice: string;
  price: string;
  fullPrice?: string;
  rating: number;
  reviews: number;
  image: string;
  badge: string;
  badgeColor: string;
  icon: any;
  link: string;
  benefits: string[];
}

const ebooks: Ebook[] = [
  {
  id: 9,
  title: "Diga Adeus à Birra",
  description: "Aprenda como lidar com birras e mau comportamento de forma firme",
  oldPrice: "R$ 197,00",
  price: "9x de R$ 9,19",
  fullPrice: "ou R$ 69,97 à vista",
  rating: 4.9,
  reviews: 1200,
  image: ebookBirra,
  badge: "ALTA CONVERSÃO",
  badgeColor: "bg-highlight text-highlight-foreground",
  icon: AlertTriangle,
  link: "https://go.hotmart.com/W105065401A",
  benefits: ["Menos birra", "Mais obediência", "Sem gritos"],
  },
  {
  id: 10,
  title: "Compreendendo o TDAH",
  description: "Entenda o comportamento da criança e aplique estratégias práticas",
  oldPrice: "R$ 197,00",
  price: "12x de R$ 10,03",
  fullPrice: "ou R$ 97,00 à vista",
  rating: 4.8,
  reviews: 950,
  image: ebookTdah,
  badge: "GUIA COMPLETO",
  badgeColor: "bg-highlight text-highlight-foreground",
  icon: Brain,
  link: "https://go.hotmart.com/U105065781F",
  benefits: ["Mais foco", "Rotina organizada", "Estratégias práticas"],
  },
  {
    id: 5,
    title: "Método Mestres do Soninho",
    description: "A solução prática e gentil para noites tranquilas. Ensine seu bebê a dormir melhor com técnicas comprovadas.",
    oldPrice: "R$ 997,00",
    price: "12x R$ 51,40",
    fullPrice: "ou R$ 497,00 à vista",
    rating: 4.9,
    reviews: 2840,
    image: ebookSono,
    badge: "MAIS VENDIDO",
    badgeColor: "bg-accent",
    icon: Baby,
    link: "https://pay.kiwify.com.br/tbIG6xU?afid=wochKERW",
    benefits: ["Técnicas sem traumas", "Rotina de 0 a 24 meses", "Suporte para dúvidas"],
  },
  {
    id: 7,
    title: "Impacto das Telas no Desenvolvimento Infantil",
    description: "Descubra como o uso de telas afeta seu filho e aprenda a criar hábitos mais saudáveis no dia a dia.",
    oldPrice: "R$ 127,00",
    price: "R$ 69,00",
    fullPrice: "à vista",
    rating: 4.8,
    reviews: 890,
    image: ebookTelas,
    badge: "ALERTA PARA PAIS",
    badgeColor: "bg-highlight text-highlight-foreground",
    icon: AlertTriangle,
    link: "https://go.hotmart.com/K105013621N",
    benefits: ["Reduz telas", "Melhora o sono", "Mais foco"],
  },
  {
    id: 3,
    title: "Método Nutri: Introdução Alimentar",
    description: "O passo a passo definitivo para a fase mais importante do desenvolvimento do seu bebê.",
    oldPrice: "R$ 497,00",
    price: "12x R$ 30,72",
    fullPrice: "ou R$ 297,00 à vista",
    rating: 4.9,
    reviews: 1540,
    image: ebookAlimentar,
    badge: "RECOMENDADO",
    badgeColor: "bg-highlight text-highlight-foreground",
    icon: Utensils,
    link: "https://pay.kiwify.com.br/vUHFzA0?afid=yKlVCGBO",
    benefits: ["Suporte da Nutri", "Linguagem Acessível", "Passo a Passo Prático"],
  },
  {
    id: 4,
    title: "Como Aumentar a Produção de Leite Materno",
    description: "Aprenda técnicas práticas para aumentar sua produção de leite e garantir uma amamentação tranquila.",
    oldPrice: "R$ 897,00",
    price: "12x de R$ 61,74",
    fullPrice: "ou R$ 597,00 à vista",
    rating: 5.0,
    reviews: 2500,
    image: ebookAmamentacao,
    badge: "ALTA DEMANDA",
    badgeColor: "bg-highlight text-highlight-foreground",
    icon: Baby,
    link: "https://go.hotmart.com/X105004085M",
    benefits: ["Aumenta a produção", "Método prático", "Sem fórmula"],
  },
  {
    id: 8,
    title: "Receitas Saudáveis para Bebês",
    description: "Mais de 300 receitas práticas e nutritivas para facilitar a alimentação do seu bebê.",
    oldPrice: "R$ 97,00",
    price: "5x de R$ 8,83",
    fullPrice: "ou R$ 39,90 à vista",
    rating: 4.8,
    reviews: 1200,
    image: ebookReceitas,
    badge: "OFERTA ESPECIAL",
    badgeColor: "bg-highlight text-highlight-foreground",
    icon: Utensils,
    link: "https://go.hotmart.com/H105004250K",
    benefits: ["300+ receitas", "Guia ilustrado", "Bônus exclusivos"],
  },
  {
    id: 2,
    title: "100 Brincadeiras para Bebês",
    description: "Atividades práticas e divertidas para estimular o desenvolvimento do seu bebê.",
    oldPrice: "R$ 49,90",
    price: "2x de R$ 11,53",
    fullPrice: "ou R$ 21,90 à vista",
    rating: 4.7,
    reviews: 980,
    image: ebookBrincadeiras,
    badge: "DESENVOLVIMENTO",
    badgeColor: "bg-highlight text-highlight-foreground",
    icon: Baby,
    link: "https://go.hotmart.com/G105008850J",
    benefits: ["100 atividades", "Fácil de aplicar", "Bônus incluso"],
  },
  {
    id: 1,
    title: "190 Atividades para Educação Especial",
    description: "Estimule o desenvolvimento do seu filho com atividades práticas e divertidas.",
    oldPrice: "R$ 97,00",
    price: "6x de R$ 8,82",
    fullPrice: "ou R$ 47,00 à vista",
    rating: 4.8,
    reviews: 1300,
    image: ebookEducacaoEspecial,
    badge: "DESENVOLVIMENTO",
    badgeColor: "bg-highlight text-highlight-foreground",
    icon: Brain,
    link: "https://alfabetinho.com.br/educacaoespecial2025?ref=H105012573I",
    benefits: ["190 atividades", "Por idade", "Bônus exclusivo"],
  },
  {
    id: 6,
    title: "Plataforma Mãe Saudável",
    description: "Recupere seu corpo e autoestima após a gravidez com treinos práticos.",
    oldPrice: "R$ 897,00",
    price: "12x de R$ 51,61",
    fullPrice: "ou R$ 499,00 à vista",
    rating: 4.9,
    reviews: 2100,
    image: ebookMaeSaudavel,
    badge: "PROGRAMA COMPLETO",
    badgeColor: "bg-highlight text-highlight-foreground",
    icon: Heart,
    link: "https://go.hotmart.com/S105011705L",
    benefits: ["Treinos em casa", "Resultados reais", "Acompanhamento"],
  }
  
];

const testimonials = [
  {
    name: "Ana L.",
    role: "Mãe de 2 filhos",
    text: "O Método Mestres do Soninho funcionou em 10 dias! Finalmente estamos dormindo a noite toda. Recomendo demais!",
    rating: 5,
    product: "Mestres do Soninho",
  },
  {
    name: "Marcos R.",
    role: "Pai e educador",
    text: "O guia sobre o Impacto das Telas abriu meus olhos. Reduzimos o tempo de tablet e o foco do meu filho melhorou 100%.",
    rating: 5,
    product: "Impacto das Telas",
  },
  {
    name: "Camila S.",
    role: "Mãe de primeira viagem",
    text: "A Introdução Alimentar ficou muito mais fácil com o passo a passo da Nutri. Sem medos e com muita praticidade!",
    rating: 5,
    product: "Introdução Alimentar",
  },
  {
    name: "Patrícia M.",
    role: "Mãe de um menino",
    text: "As 190 atividades de Educação Especial são maravilhosas. Consigo estimular o desenvolvimento dele brincando em casa.",
    rating: 5,
    product: "Educação Especial",
  },
  {
    name: "Juliana F.",
    role: "Mãe da Alice",
    text: "Estava quase desistindo de amamentar, mas as técnicas para aumentar a produção de leite salvaram meu aleitamento!",
    rating: 5,
    product: "Produção de Leite",
  },
  {
    name: "Ricardo T.",
    role: "Pai do Theo",
    text: "O ebook de 300 receitas é sensacional. O cardápio aqui em casa agora é variado, nutritivo e muito rápido de fazer.",
    rating: 5,
    product: "Receitas para Bebês",
  },
  {
    name: "Fernanda O.",
    role: "Mãe e Aluna",
    text: "A plataforma Mãe Saudável me devolveu a autoestima. Os treinos em casa são curtos e realmente dão resultado no pós-parto.",
    rating: 5,
    product: "Mãe Saudável",
  },
  {
    name: "Beatriz V.",
    role: "Mãe de gêmeos",
    text: "As 100 Brincadeiras salvaram meus dias chuvosos! Atividades simples que usam o que temos em casa e estimulam muito os bebês.",
    rating: 5,
    product: "100 Brincadeiras",
  },
  {
    name: "Gustavo M.",
    role: "Pai de primeira viagem",
    text: "O guia de Impacto das Telas deveria ser obrigatório para todo pai. Mudamos a rotina aqui e o sono do meu filho melhorou demais.",
    rating: 5,
    product: "Impacto das Telas",
  },
  {
    name: "Luciana K.",
    role: "Mãe do Pedro",
    text: "O Método Nutri tirou todo o meu peso das costas. O passo a passo da introdução alimentar é muito seguro e fácil de seguir.",
    rating: 5,
    product: "Introdução Alimentar",
  },
  {
    name: "Renata P.",
    role: "Mãe em recuperação",
    text: "Treinar em casa com a Plataforma Mãe Saudável é a única forma que encontrei de cuidar de mim com um bebê pequeno. Resultados reais!",
    rating: 5,
    product: "Mãe Saudável",
  },
  {
    name: "Sérgio A.",
    role: "Pai dedicado",
    text: "O material de Educação Especial é riquíssimo. As 190 atividades são lúdicas e ajudam muito na evolução motora e cognitiva.",
    rating: 5,
    product: "Educação Especial",
  },
  {
    name: "Mariana L.",
    role: "Mãe que amamenta",
    text: "Achei que meu leite era pouco, mas as técnicas de amamentação do guia funcionaram rápido. Hoje amamento com total tranquilidade.",
    rating: 5,
    product: "Produção de Leite",
  },
  {
    name: "Cláudia S.",
    role: "Mãe da Cecília",
    text: "O Método Mestres do Soninho foi o melhor investimento que fiz. Finalmente entendi a rotina de sono e minha filha parou de brigar com o berço.",
    rating: 5,
    product: "Mestres do Soninho",
  }
];

const faqs = [
  {
    question: "Como vou receber o e-book?",
    answer: "Após a confirmação do pagamento, você receberá um e-mail com o link para download imediato do seu e-book em formato PDF. A entrega é instantânea.",
  },
  {
    question: "Posso ler em qualquer dispositivo?",
    answer: "Sim! O e-book é em PDF, compatível com smartphones, tablets, computadores e notebooks. Você também pode imprimir se preferir.",
  },
  {
    question: "Qual a garantia oferecida?",
    answer: "Oferecemos garantia incondicional de 7 dias. Se não gostar, basta solicitar o reembolso pela plataforma e terá seu dinheiro de volta, sem perguntas.",
  },
  {
    question: "O conteúdo é baseado em evidências?",
    answer: "Sim! Todos os nossos guias são elaborados por profissionais da área e revisados por especialistas, com técnicas comprovadas e atualizadas.",
  },
];

function Countdown() {
  const [time, setTime] = useState({ h: 4, m: 30, s: 0 });

  useEffect(() => {
    const target = Date.now() + 4 * 3600 * 1000 + 30 * 60 * 1000;
    const interval = setInterval(() => {
      let diff = Math.floor((target - Date.now()) / 1000);
      if (diff < 0) diff = 0;
      setTime({
        h: Math.floor(diff / 3600),
        m: Math.floor((diff % 3600) / 60),
        s: diff % 60,
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <span className="font-display text-3xl font-bold text-accent">
      {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
    </span>
  );
}

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= Math.floor(rating) ? "fill-highlight text-highlight" : "text-border"}`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-foreground">{rating}</span>
      <span className="text-sm text-muted-foreground">({reviews.toLocaleString("pt-BR")})</span>
    </div>
  );
}

function EbookCard({ ebook }: { ebook: Ebook }) {
  // Lógica de contador dinâmico: Gera um número base diferente para cada ID
  // e atualiza levemente para simular tráfego em tempo real
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    // Define um número inicial baseado no ID (Ex: ID 1 começa com 32, ID 2 com 45...)
    const baseViews = 25 + (ebook.id * 7);
    setViewCount(baseViews);

    // Simula novas pessoas entrando aleatoriamente entre 5 e 15 segundos
    const interval = setInterval(() => {
      setViewCount(prev => prev + Math.floor(Math.random() * 3));
    }, Math.random() * 10000 + 5000);

    return () => clearInterval(interval);
  }, [ebook.id]);

  return (
    <div className="group relative rounded-xl bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 overflow-hidden border border-border flex flex-col h-full">
      {/* Badge de Destaque Superior */}
      {ebook.badge && (
        <span className={`absolute top-3 right-3 z-10 ${ebook.badgeColor} text-xs font-bold px-2.5 py-1 rounded-md animate-pulse-soft text-accent-foreground shadow-sm`}>
          {ebook.badge}
        </span>
      )}

      {/* Imagem do Produto com Overlay de Visualização */}
      <div className="relative aspect-[3/4] overflow-hidden flex-shrink-0">
        <img
          src={ebook.image}
          alt={`Capa do produto ${ebook.title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          {/* ALTERE A LINHA ABAIXO: de text-white/90 para text-black ou text-slate-900 */}
          <p className="text-[11px] text-black font-bold flex items-center gap-1">
            <Clock className="h-3 w-3 text-highlight" /> 
            Alta busca: {viewCount} pessoas viram este guia hoje
          </p>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        {/* Avaliação e Título */}
        <div className="space-y-2 mb-3">
          <StarRating rating={ebook.rating} reviews={ebook.reviews} />
          <h3 className="font-display text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
            {ebook.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {ebook.description}
          </p>
        </div>

        {/* Benefícios em Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {ebook.benefits.map((b: string) => (
            <span key={b} className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
              {b}
            </span>
          ))}
        </div>

        {/* Espaçador para alinhar o rodapé */}
        <div className="flex-grow" />

        {/* Bloco de Preço Profissional */}
        <div className="bg-secondary/30 rounded-lg p-3 mb-3 border border-border/50">
          <div className="flex flex-col">
            <span className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">Apenas</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-primary">{ebook.price}</span>
              <span className="text-sm text-muted-foreground line-through opacity-70">{ebook.oldPrice}</span>
            </div>
            {ebook.fullPrice && (
              <span className="text-[12px] font-medium text-muted-foreground italic">
                {ebook.fullPrice}
              </span>
            )}
          </div>
        </div>

        {/* Selos de Segurança Pré-Botão */}
        <div className="flex items-center justify-between px-1 mb-3">
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase">
            <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
            Compra 100% Segura
          </div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase">
            <Clock className="h-3.5 w-3.5 text-blue-500" />
            Acesso Imediato
          </div>
        </div>

        {/* Botão de Chamada Principal */}
        <a
          href={ebook.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-primary text-primary-foreground font-extrabold py-3.5 rounded-lg shadow-cta transition-all duration-300 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] uppercase text-sm tracking-wider"
        >
          Garantir meu acesso agora
        </a>

        {/* Garantia Rodapé */}
        <div className="flex items-center justify-center gap-2 mt-3 pt-2 border-t border-border/50">
           <img 
             src="https://cdn-icons-png.flaticon.com/512/3503/3503565.png" 
             alt="Selo de Garantia" 
             className="h-4 w-4 grayscale opacity-70"
           />
           <p className="text-[10px] text-muted-foreground font-medium">
             Garantia incondicional de 7 dias
           </p>
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card border border-border space-y-3 min-w-[300px] md:min-w-[350px]">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= testimonial.rating ? "fill-highlight text-highlight" : "text-border"}`}
          />
        ))}
      </div>
      <p className="text-foreground text-sm leading-relaxed italic">"{testimonial.text}"</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
          {testimonial.product}
        </span>
      </div>
    </div>
  );
}

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredEbooks = useMemo(() => {
    return ebooks.filter((ebook) =>
      ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ebook.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      setSearchParams({ search: searchTerm }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [searchTerm, setSearchParams]);

  // Lógica do Carrossel Automático
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
        }
      }
    }, 3000); // Muda a cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -350 : 350;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between py-3">
          <a href="#" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary fill-primary" />
            <span className="font-display text-lg font-bold text-foreground">Pais & Mães Conectados</span>
          </a>
          
          <div className="relative flex-1 max-w-xs mx-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar ebook..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-full py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#ebooks" className="text-muted-foreground hover:text-primary transition-colors">Nossos Guias</a>
            <a href="#depoimentos" className="text-muted-foreground hover:text-primary transition-colors">Resultados</a>
            <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">Dúvidas</a>
          </div>
          <a
            href="#ebooks"
            className="bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-lg shadow-cta hover:opacity-90 transition-all"
          >
            Ver Ofertas
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-hero-gradient py-16 md:py-24">
        <div className="container grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-fade-up">
            <span className="inline-flex items-center gap-1.5 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
              <Heart className="h-3 w-3" /> Especialista em Maternidade
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Soluções práticas para pais e mães:{" "}
              <span className="text-gradient-primary">sono, rotina infantil</span>{" "}
              sem estresse.
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Guias validados por especialistas que já ajudaram mais de{" "}
              <strong className="text-foreground">5.000 famílias</strong> a transformarem sua rotina.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#ebooks"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground font-bold py-3.5 px-8 rounded-lg shadow-cta text-base hover:opacity-90 transition-all"
              >
                Ver Guias com Desconto
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Garantia de 7 dias</span>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-xs font-bold text-secondary-foreground">
                    {["AL", "MR", "CS", "PM"][i - 1]}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-3 w-3 fill-highlight text-highlight" />
                  ))}
                </div>
                <span className="text-muted-foreground">+5.000 mães satisfeitas</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <img
              src={heroImg}
              alt="Mãe segurando bebê dormindo"
              className="rounded-2xl shadow-card-hover w-full"
            />
            <div className="absolute -bottom-4 -left-4 bg-card rounded-xl p-3 shadow-card-hover border border-border">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <div className="text-xs">
                  <p className="font-semibold text-foreground">Oferta expira em</p>
                  <Countdown />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-border bg-card py-4">
        <div className="container flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="font-medium">Compra 100% Segura</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-medium">Acesso Imediato</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <span className="font-medium">Garantia de 7 Dias</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary fill-primary" />
            <span className="font-medium">4.8 Avaliação Média</span>
          </div>
        </div>
      </section>

      {/* Ebooks Section */}
      <section id="ebooks" className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Nossos Guias</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {searchTerm ? `Resultados para: ${searchTerm}` : "Guias práticos para pais e mães que querem facilitar a rotina e o desenvolvimento dos filhos"}
            </h2>
            <p className="text-muted-foreground">
              Conteúdo prático, direto ao ponto e baseado em evidências. Escolha o guia ideal para sua família.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {filteredEbooks.length > 0 ? (
              filteredEbooks.map((ebook) => (
                <EbookCard key={ebook.id} ebook={ebook} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">Nenhum ebook encontrado para sua busca.</p>
                <button onClick={() => setSearchTerm("")} className="text-primary font-bold mt-2 underline">Mostrar todos os guias</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why buy section */}
      <section className="bg-secondary/50 py-16">
        <div className="container grid md:grid-cols-3 gap-8">
          {[
            {
              icon: ShieldCheck,
              title: "Pagamento 100% Seguro",
              desc: "Transação processada pelas maiores plataformas da América Latina. Cartão, Pix ou Boleto.",
            },
            {
              icon: Clock,
              title: "Acesso Imediato e Vitalício",
              desc: "Após a compra, você recebe o link instantaneamente. Acesse quando e quantas vezes quiser.",
            },
            {
              icon: Heart,
              title: "Garantia Incondicional de 7 Dias",
              desc: "Não gostou? Devolvemos 100% do seu dinheiro, sem perguntas. Risco zero para você.",
            },
          ].map((item) => (
            <div key={item.title} className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-16 md:py-24 bg-secondary/20">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-3">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Depoimentos Reais</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Veja o que os pais estão dizendo
              </h2>
            </div>
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll("left")} className="p-2 rounded-full border border-border bg-card hover:bg-secondary transition-colors">
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button onClick={() => scroll("right")} className="p-2 rounded-full border border-border bg-card hover:bg-secondary transition-colors">
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="snap-center">
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-secondary/50 py-16 md:py-24">
        <div className="container max-w-2xl">
          <div className="text-center mb-12 space-y-3">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Dúvidas</span>
            <h2 className="font-display text-3xl font-bold text-foreground">Perguntas Frequentes</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-card py-12">
        <div className="container text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Heart className="h-5 w-5 text-primary fill-primary" />
            <span className="font-display text-lg font-bold">Pais & Mães Conectados</span>
          </div>
          <p className="text-sm opacity-70 max-w-md mx-auto">
            Guias práticos para pais que querem facilitar a rotina e o desenvolvimento dos filhos.
          </p>
          {/* <div className="flex justify-center gap-6 text-sm opacity-60">
            <a href="mailto:contato@maeconectada.com.br" className="hover:opacity-100 transition-opacity">Contato</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Termos de Uso</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Privacidade</a>
          </div> */}
          <div className="flex justify-center gap-4 pt-2 opacity-60 text-xs">
            <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Compra Segura</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Acesso Imediato</span>
          </div>
          <p className="text-xs opacity-40 pt-4">
            © {new Date().getFullYear()} Pais & Mães Conectados. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border p-3 md:hidden">
        <a
          href="#ebooks"
          className="block w-full text-center bg-primary text-primary-foreground font-bold py-3 rounded-lg shadow-cta"
        >
          🔥 Ver Ofertas com Desconto
        </a>
      </div>
    </div>
  );
}

function FaqItem({ faq }: { faq: { question: string; answer: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-semibold text-foreground pr-4">{faq.question}</span>
        <span className={`text-primary transition-transform duration-200 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border mt-2 pt-4">
          {faq.answer}
        </div>
      )}
    </div>
  );
}