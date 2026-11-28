var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var etuNavPassos = 0;
(function() {
  var st = document.createElement("style");
  st.textContent = "#etuVolta{display:inline-flex;flex:none;margin-right:10px}#etuVolta.hidden{display:none}#etuBtnInicio{display:none!important}#etuBtnVoltar{font-family:Cinzel,Georgia,serif;font-size:13px;font-weight:600;letter-spacing:.06em;background:none;color:#E2C47A;border:1px solid #C9A24A;border-radius:8px;height:40px;padding:0 12px;display:inline-flex;align-items:center;gap:6px;cursor:pointer}#etuBtnVoltar:hover{background:rgba(201,162,74,.14)}#etuBtnVoltar svg{width:18px;height:18px}@media(max-width:480px){#etuBtnVoltar span{display:none}#etuBtnVoltar{padding:0 10px}}";
  document.head.appendChild(st);
  var d = document.createElement("div");
  d.id = "etuVolta";
  d.className = "hidden";
  d.setAttribute("aria-label", "Navegação rápida");
  d.innerHTML = '<button type="button" id="etuBtnVoltar" aria-label="Voltar à tela anterior"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M15 5l-7 7 7 7"/></svg><span>Voltar</span></button><button type="button" id="etuBtnInicio" aria-label="Ir para a página inicial"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" d="M3 11l9-8 9 8v10h-6v-6H9v6H3z"/></svg>Início</button>';
  function por() {
    var w = document.querySelector("header.top .wrap");
    if (w) w.insertBefore(d, w.firstChild);
    else document.body.appendChild(d);
  }
  if (document.body) por();
  else addEventListener("DOMContentLoaded", por);
  d.querySelector("#etuBtnVoltar").onclick = function() {
    if (etuNavPassos > 0) {
      history.back();
    } else {
      location.hash = "inicio";
    }
  };
  d.querySelector("#etuBtnInicio").onclick = function() {
    location.hash = "inicio";
  };
  function chave() {
    var t = history.state && history.state.etuTab;
    return (location.hash || "#inicio") + "|" + (t || "");
  }
  var pilha = [chave()], ultHash = location.hash || "#inicio";
  function registra() {
    var k = chave();
    if (pilha.length > 1 && pilha[pilha.length - 2] === k) pilha.pop();
    else if (pilha[pilha.length - 1] !== k) pilha.push(k);
    etuNavPassos = pilha.length - 1;
    etuMostraVolta(window.etuViewAtual);
  }
  function aplicaAba() {
    var t = history.state && history.state.etuTab;
    if (!t) return;
    var b = document.querySelector('.tabs button[data-tab="' + t + '"]');
    if (!b || b.classList.contains("on")) return;
    window.etuAplicandoAba = true;
    try {
      b.click();
    } finally {
      window.etuAplicandoAba = false;
    }
    var tb = document.querySelector(".tabs");
    if (tb) tb.scrollIntoView({ block: "start" });
  }
  addEventListener("hashchange", function() {
    ultHash = location.hash || "#inicio";
    registra();
    setTimeout(aplicaAba, 60);
  });
  addEventListener("popstate", function() {
    if ((location.hash || "#inicio") !== ultHash) return;
    registra();
    aplicaAba();
  });
  document.addEventListener("click", function(e) {
    var b = e.target.closest && e.target.closest(".tabs button[data-tab]");
    if (!b || window.etuAplicandoAba) return;
    var t = b.dataset.tab, on = document.querySelector(".tabs button.on"), atual = history.state && history.state.etuTab || on && on.dataset.tab;
    if (t === atual) return;
    if (!(history.state && history.state.etuTab)) {
      try {
        history.replaceState({ etuTab: atual || "alunos" }, "", location.href);
      } catch (_) {
      }
      pilha[pilha.length - 1] = chave();
    }
    try {
      history.pushState({ etuTab: t }, "", location.href);
    } catch (_) {
      return;
    }
    pilha.push(chave());
    etuNavPassos = pilha.length - 1;
    etuMostraVolta(window.etuViewAtual);
  }, true);
})();
function etuMostraVolta(view) {
  window.etuViewAtual = view;
  var d = document.getElementById("etuVolta");
  if (d) d.classList.toggle("hidden", (!view || view === "inicio") && !(etuNavPassos > 0));
}
(function() {
  try {
    var q = new URLSearchParams(location.search);
    if (q.get("app") === "play" || /^android-app:\/\/br\.com\.etu\.app/.test(document.referrer || "")) localStorage.setItem("etu_loja", "1");
    if (q.get("loja") === "0") localStorage.removeItem("etu_loja");
  } catch (e) {
  }
  var LOJA = false;
  try {
    LOJA = localStorage.getItem("etu_loja") === "1";
  } catch (e) {
  }
  window.ETU_LOJA = LOJA;
  if (!LOJA) return;
  document.documentElement.classList.add("modo-loja");
  var st = document.createElement("style");
  st.textContent = '.modo-loja .pixbox,.modo-loja .pixkey,.modo-loja a[href="#matricula"],.modo-loja [data-nav="matricula"],.modo-loja .nao-loja{display:none!important}.loja-aviso{max-width:640px;margin:30px auto;background:#fff;border:1px solid #E1D4B2;border-left:4px solid #C9A24A;border-radius:10px;padding:22px 24px;font-size:18px;line-height:1.6}';
  document.head.appendChild(st);
  var RX = /\bpix\b|comprovante|pagamento|pague|pagar|R\$\s?\d/i;
  function varre() {
    document.querySelectorAll('[data-view]:not([data-view="admin"]) p, [data-view]:not([data-view="admin"]) li, [data-view]:not([data-view="admin"]) .step, .cartao, #myPays').forEach(function(el) {
      if (el.closest('[data-view="admin"]') || el.closest(".loja-aviso")) return;
      if (el.id === "myPays") {
        var pn = el.closest(".panel");
        if (pn) pn.classList.add("nao-loja");
        return;
      }
      if (RX.test(el.textContent || "")) el.classList.add("nao-loja");
    });
    var m = document.querySelector('[data-view="matricula"]');
    if (m && !m.dataset.loja) {
      m.dataset.loja = "1";
      Array.prototype.forEach.call(m.children, function(c) {
        c.classList.add("nao-loja");
      });
      var av = document.createElement("div");
      av.innerHTML = '<div class="dash-head"><div class="wrap"><h2>Área do aluno</h2><p>Escola Teológica União</p></div></div><div class="wrap"><div class="loja-aviso"><p style="margin:0 0 12px">Este aplicativo é o ambiente de estudo dos alunos da Escola Teológica União. Entre com o e-mail e a senha da sua conta para acessar os seus cursos.</p><p style="margin:0 0 16px">As aulas grátis e a Biblioteca grátis estão abertas a todos.</p><div class="res"><a class="btn btn-gold" href="#entrar">Entrar</a><a class="btn btn-line" href="#estudos">Biblioteca grátis</a></div></div></div>';
      m.appendChild(av);
    }
  }
  function liga() {
    varre();
    try {
      new MutationObserver(function() {
        clearTimeout(liga.t);
        liga.t = setTimeout(varre, 80);
      }).observe(document.body, { childList: true, subtree: true });
    } catch (e) {
    }
  }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", liga);
  else liga();
})();
(function() {
  var OFICIAL = "escolateologicauniao.github.io", h = location.hostname;
  var local = !h || h === "localhost" || h === "127.0.0.1" || location.protocol === "file:";
  function por(fn) {
    if (document.body) fn();
    else addEventListener("DOMContentLoaded", fn);
  }
  if (!local && h !== OFICIAL) {
    por(function() {
      var b = document.createElement("div");
      b.setAttribute("role", "alert");
      b.style.cssText = "position:sticky;top:0;z-index:2000;background:#7A1B2B;color:#fff;padding:12px 16px;font:600 16px/1.4 Georgia,serif;text-align:center;border-bottom:3px solid #C9A24A";
      b.innerHTML = "Atenção: este NÃO é o endereço oficial da Escola Teológica União. O endereço verdadeiro é <u>" + OFICIAL + "</u>. Não informe senha nem faça pagamentos por esta página.";
      document.body.prepend(b);
    });
    return;
  }
  var visto = false;
  try {
    visto = localStorage.getItem("etu_aviso_seg") === "1";
  } catch (_) {
  }
  if (visto) return;
  setTimeout(function() {
    por(function() {
      if (document.getElementById("etuAvisoSeg") || document.getElementById("etu-aviso-samsung") || document.querySelector(".modal")) return;
      var d = document.createElement("div");
      d.id = "etuAvisoSeg";
      d.setAttribute("role", "status");
      d.style.cssText = "position:fixed;left:12px;right:12px;bottom:calc(140px + env(safe-area-inset-bottom,0px));z-index:950;max-width:560px;margin:0 auto;background:#0F1B3D;color:#F8F3E6;border:2px solid #C9A24A;border-radius:12px;padding:14px 16px;box-shadow:0 8px 26px rgba(0,0,0,.4);font:16px/1.5 Georgia,serif";
      d.innerHTML = '<div style="display:flex;gap:12px;align-items:center"><img src="selo-fita.webp" alt="" width="52" height="52" style="flex:none"><div><b style="color:#E2C47A">Você está na plataforma oficial</b><br>A escola nunca pede senha, código por SMS ou Pix fora da chave exibida aqui.</div></div><div style="display:flex;gap:8px;justify-content:flex-end;margin-top:10px"><a href="#verificar" style="color:#0F1B3D;background:#D4AF37;border-radius:8px;padding:8px 14px;text-decoration:none;font-weight:bold">Ver o selo</a><button type="button" style="font:inherit;background:transparent;color:#F8F3E6;border:1px solid #F8F3E6;border-radius:8px;padding:8px 14px">Entendi</button></div>';
      function fecha() {
        d.remove();
        try {
          localStorage.setItem("etu_aviso_seg", "1");
        } catch (_) {
        }
      }
      d.querySelector("button").onclick = fecha;
      d.querySelector("a").addEventListener("click", fecha);
      document.body.appendChild(d);
    });
  }, 6e3);
})();
(function() {
  var NIVEIS = [0.9, 1, 1.1, 1.2, 1.3], i = 1;
  try {
    var g = parseFloat(localStorage.getItem("etu_zoom"));
    var k = NIVEIS.indexOf(g);
    if (k >= 0) i = k;
  } catch (_) {
  }
  function aplica() {
    var z = NIVEIS[i];
    if (window.matchMedia("(min-width:701px)").matches) document.body.style.zoom = z === 1 ? "" : String(z);
    else document.body.style.zoom = "";
    try {
      localStorage.setItem("etu_zoom", String(z));
    } catch (_) {
    }
  }
  function monta() {
    var w = document.querySelector("header.top .wrap"), sino = document.getElementById("sinoBt");
    if (!w || document.getElementById("visBar")) return;
    var b = document.createElement("div");
    b.className = "vis-bar";
    b.id = "visBar";
    b.innerHTML = '<button type="button" id="visMenos" title="Diminuir as letras" aria-label="Diminuir as letras">A−</button><button type="button" id="visMais" title="Aumentar as letras" aria-label="Aumentar as letras">A+</button><button type="button" id="visCheia" title="Tela cheia" aria-label="Tela cheia"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg><span>Tela cheia</span></button>';
    w.insertBefore(b, sino || w.querySelector(".menu-btn"));
    document.getElementById("visMenos").onclick = function() {
      if (i > 0) {
        i--;
        aplica();
      }
    };
    document.getElementById("visMais").onclick = function() {
      if (i < NIVEIS.length - 1) {
        i++;
        aplica();
      }
    };
    var c = document.getElementById("visCheia");
    c.onclick = function() {
      try {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
      } catch (_) {
      }
    };
    document.addEventListener("fullscreenchange", function() {
      c.querySelector("span").textContent = document.fullscreenElement ? "Sair da tela cheia" : "Tela cheia";
    });
    if (!document.documentElement.requestFullscreen) c.style.display = "none";
    aplica();
    window.addEventListener("resize", aplica);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", monta);
  else monta();
  document.addEventListener("click", function(e) {
    var n = document.getElementById("mainNav"), b = document.getElementById("menuBtn");
    if (n && n.classList.contains("open") && !n.contains(e.target) && e.target !== b) {
      n.classList.remove("open");
      b && b.setAttribute("aria-expanded", "false");
    }
  });
})();
var pedidoInstalar = null;
var ehSamsung = /SamsungBrowser/i.test(navigator.userAgent), ehAndroid = /Android/i.test(navigator.userAgent), ehIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  if (ehSamsung) return;
  pedidoInstalar = e;
  $$("[data-instalar]").forEach((b) => b.classList.remove("hidden"));
});
var SELO_CONFIANCA = `<div style="border:1px solid #c9a227;border-radius:10px;padding:10px 12px;margin:10px 0;background:rgba(201,162,39,.08)"><p style="margin:0 0 6px"><b>Aplicativo oficial da Escola Teológica União</b></p><p style="margin:0 0 4px">✔ Instalado pelo próprio navegador, a partir do endereço oficial <b>${location.host}</b>.</p><p style="margin:0 0 4px">✔ Não é preciso baixar nenhum arquivo de instalação.</p><p style="margin:0 0 4px">✔ Não pede acesso a contatos, fotos, mensagens ou localização.</p><p style="margin:0">✔ Funciona em celulares novos e antigos; nos aparelhos antigos aparece como atalho na tela inicial.</p></div>`;
function linkChrome() {
  const alvo = location.host + location.pathname;
  return "intent://" + alvo + "#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=" + encodeURIComponent("https://play.google.com/store/apps/details?id=com.android.chrome") + ";end";
}
function instalarApp() {
  var av = document.getElementById("etu-aviso-samsung");
  if (av) av.remove();
  if (ehSamsung) {
    modal(`<h3>Instalar o aplicativo da escola</h3>${SELO_CONFIANCA}<p>O navegador <b>Samsung Internet</b> gera o aplicativo num formato antigo, e por isso o Google Play Protect mostra o aviso <i>"App de risco bloqueado"</i>. Não é vírus e nada foi instalado. Para instalar com segurança, use o <b>Google Chrome</b>:</p><p><b>1.</b> Toque no botão abaixo para abrir a escola no Chrome.<br><b>2.</b> No Chrome, toque nos três pontinhos e em <b>Instalar aplicativo</b> ou <b>Adicionar à tela inicial</b>.</p><div class="acts"><a class="btn btn-gold" href="${linkChrome()}">Abrir no Google Chrome</a><button class="btn" data-close>Fechar</button></div>`);
    return;
  }
  if (pedidoInstalar) {
    pedidoInstalar.prompt();
    pedidoInstalar.userChoice.finally(() => pedidoInstalar = null);
    return;
  }
  modal(`<h3>Instalar o aplicativo da escola</h3>${SELO_CONFIANCA}<p><b>No Android (Google Chrome):</b> toque nos três pontinhos do navegador e em <b>Instalar aplicativo</b> ou <b>Adicionar à tela inicial</b>.</p><p><b>No iPhone (Safari):</b> toque no botão de compartilhar e em <b>Adicionar à Tela de Início</b>.</p>${ehAndroid && !/Chrome\//.test(navigator.userAgent) ? `<p>Se o seu navegador não mostrar essa opção, abra a escola no Chrome: <a href="${linkChrome()}"><b>Abrir no Google Chrome</b></a>.</p>` : ""}<p>O ícone da Escola Teológica União aparece na tela do celular e abre como aplicativo.</p><div class="acts"><button class="btn btn-gold" data-close>Entendi</button></div>`);
}
(function() {
  if (!ehSamsung || matchMedia("(display-mode: standalone)").matches) return;
  let visto = false;
  try {
    visto = localStorage.getItem("etu_aviso_samsung") === "1";
  } catch (_) {
  }
  if (visto) return;
  const d = document.createElement("div");
  d.setAttribute("role", "status");
  d.id = "etu-aviso-samsung";
  d.style.cssText = "position:fixed;left:10px;right:10px;bottom:84px;z-index:9999;background:#0A192F;color:#fff;border:1px solid #c9a227;border-radius:12px;padding:12px 14px;font-size:15px;line-height:1.4;box-shadow:0 6px 20px rgba(0,0,0,.4)";
  d.innerHTML = '<b style="color:#D4AF37">Aplicativo oficial da ETU</b><br>Para instalar no celular com segurança, use o <b>Google Chrome</b>. Pelo Samsung Internet o Android pode mostrar um aviso de bloqueio.<div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap"><a href="' + linkChrome() + '" style="background:#D4AF37;color:#0A192F;padding:7px 12px;border-radius:8px;font-weight:700;text-decoration:none">Abrir no Chrome</a><button type="button" style="background:transparent;color:#fff;border:1px solid #fff;padding:7px 12px;border-radius:8px">Agora não</button></div>';
  d.querySelector("button").onclick = () => {
    d.remove();
    try {
      localStorage.setItem("etu_aviso_samsung", "1");
    } catch (_) {
    }
  };
  addEventListener("load", () => setTimeout(() => document.body.appendChild(d), 1500));
})();
const CONFIG = {
  SUPABASE_URL: "",
  // ex.: https://xxxxxxxx.supabase.co
  SUPABASE_ANON_KEY: "",
  // chave "anon public" do projeto
  LINK_PUBLICO: "https://escolateologicauniao.github.io/",
  // endereço que os alunos e interessados recebem
  SITE_URL: "",
  // endereço onde a plataforma ficará publicada (para o link de redefinição de senha)
  WHATSAPP: "(61) 99521-1432",
  // número exibido
  WHATSAPP_LINK: "5561995211432",
  // país + DDD + número, só dígitos
  EMAIL: "etu.escolateologicauniao215@gmail.com",
  PIX_CHAVE: "(61) 99521-1432",
  // chave Pix exibida (telefone)
  PIX_COPIAR: "+5561995211432",
  // chave Pix copiada pelo botão
  NOTA_MINIMA: 70,
  TOLERANCIA_DIAS: 5,
  // dias de tolerância após o vencimento da mensalidade, antes do bloqueio automático
  AVISO_DIAS: 5,
  // dias antes do vencimento em que o aluno começa a ser avisado
  LIBERACAO_PROVISORIA_DIAS: 0,
  // dias de acesso automático ao enviar o comprovante (igual ao banco de dados; 0 = desligado)
  ACESSO_CONFIRMADO_DIAS: 365,
  // validade padrão ao confirmar o pagamento                                   // % para aprovação na prova (igual ao banco de dados)
  AVISOS: [
    "Matrículas abertas — Curso Livre de Teologia: Básico, Médio e Avançado",
    "Não pare no meio do caminho: cada aula concluída é uma pedra no alicerce do seu ministério",
    "MATRÍCULA VIA PIX — chave (telefone): (61) 99521-1432 · Envie o comprovante pelo WhatsApp e o curso completo é liberado",
    "Curso completo com vídeo-aulas, apostilas em PDF, provas, certificado e carteira de estudante",
    "NOVIDADE: novos certificados e Carteira de Estudante (válida por 3 anos) — veja os modelos na página inicial",
    "“Procura apresentar-te a Deus aprovado…” — 2 Timóteo 2.15",
    "Dúvidas? Fale com a direção pelo WhatsApp (61) 99521-1432"
  ]
};
const DISC_PADRAO = [{ "curso_id": "basico", "ordem": 1, "nome": "Introdução à Teologia", "descricao": "Por que estudar teologia, o que é teologia, suas áreas e o lugar do estudo bíblico na vida da Igreja." }, { "curso_id": "basico", "ordem": 2, "nome": "Bibliologia", "descricao": "A doutrina das Escrituras: revelação, inspiração, inerrância, cânon e autoridade da Bíblia." }, { "curso_id": "basico", "ordem": 3, "nome": "Teologia Propriamente Dita", "descricao": "A doutrina de Deus: existência, nomes, atributos e a Santíssima Trindade." }, { "curso_id": "basico", "ordem": 4, "nome": "Cristologia", "descricao": "A pessoa e a obra de Jesus Cristo: divindade, humanidade, encarnação, morte, ressurreição e glória." }, { "curso_id": "basico", "ordem": 5, "nome": "Pneumatologia", "descricao": "A pessoa e a obra do Espírito Santo: divindade, batismo no Espírito, dons e fruto." }, { "curso_id": "basico", "ordem": 6, "nome": "Angelologia", "descricao": "Os anjos, Satanás e os demônios à luz das Escrituras." }, { "curso_id": "basico", "ordem": 7, "nome": "Antropologia Bíblica", "descricao": "O ser humano: criação, imagem de Deus, natureza e propósito." }, { "curso_id": "basico", "ordem": 8, "nome": "Hamartiologia", "descricao": "A doutrina do pecado: origem, natureza, consequências e a provisão divina." }, { "curso_id": "basico", "ordem": 9, "nome": "Soteriologia", "descricao": "A doutrina da salvação: graça, arrependimento, fé, justificação, regeneração e santificação." }, { "curso_id": "basico", "ordem": 10, "nome": "Eclesiologia", "descricao": "A Igreja de Cristo: natureza, missão, ministérios, ordenanças e governo." }, { "curso_id": "basico", "ordem": 11, "nome": "Escatologia", "descricao": "As últimas coisas: arrebatamento, tribulação, milênio, juízos e estado eterno." }, { "curso_id": "medio", "ordem": 1, "nome": "Hermenêutica Bíblica", "descricao": "Princípios e regras para interpretar a Bíblia com fidelidade ao contexto, à gramática e à história." }, { "curso_id": "medio", "ordem": 2, "nome": "Panorama do Antigo Testamento", "descricao": "Visão geral dos livros do Antigo Testamento: autor, época, propósito e mensagem." }, { "curso_id": "medio", "ordem": 3, "nome": "Panorama do Novo Testamento", "descricao": "Visão geral dos Evangelhos, de Atos, das Epístolas e do Apocalipse." }, { "curso_id": "medio", "ordem": 4, "nome": "Geografia Bíblica", "descricao": "As terras da Bíblia: regiões, cidades, rotas e o cenário dos acontecimentos bíblicos." }, { "curso_id": "medio", "ordem": 5, "nome": "História de Israel", "descricao": "De Abraão ao retorno do exílio: a formação e a trajetória do povo de Israel." }, { "curso_id": "medio", "ordem": 6, "nome": "História da Igreja", "descricao": "Da Igreja primitiva aos dias atuais: os pais da Igreja, a Reforma e os avivamentos." }, { "curso_id": "medio", "ordem": 7, "nome": "Homilética", "descricao": "A arte de preparar e pregar sermões fiéis ao texto bíblico." }, { "curso_id": "medio", "ordem": 8, "nome": "Ética Cristã", "descricao": "Os princípios bíblicos para a conduta do cristão na família, na igreja e na sociedade." }, { "curso_id": "medio", "ordem": 9, "nome": "Evangelismo e Missões", "descricao": "O mandamento da Grande Comissão e a prática da evangelização e das missões." }, { "curso_id": "medio", "ordem": 10, "nome": "Educação Cristã", "descricao": "O ensino da Palavra na igreja local: didática, Escola Bíblica Dominical e discipulado." }, { "curso_id": "avancado", "ordem": 1, "nome": "Exegese Bíblica", "descricao": "O estudo aprofundado do texto bíblico: contexto, estrutura, palavras-chave e sentido original." }, { "curso_id": "avancado", "ordem": 2, "nome": "Teologia Contemporânea", "descricao": "As principais correntes teológicas dos séculos 19 a 21 avaliadas à luz das Escrituras." }, { "curso_id": "avancado", "ordem": 3, "nome": "Filosofia e Fé Cristã", "descricao": "As grandes questões da filosofia — Deus, verdade, conhecimento e moral — respondidas pela cosmovisão bíblica." }, { "curso_id": "avancado", "ordem": 4, "nome": "Teologia do Antigo Testamento", "descricao": "Os grandes temas da revelação no Antigo Testamento e seu cumprimento em Cristo." }, { "curso_id": "avancado", "ordem": 5, "nome": "Teologia do Novo Testamento", "descricao": "Os grandes temas do ensino de Jesus e dos apóstolos." }, { "curso_id": "avancado", "ordem": 6, "nome": "Apologética Cristã", "descricao": "A defesa racional e bíblica da fé cristã diante das objeções e dos desafios atuais." }, { "curso_id": "avancado", "ordem": 7, "nome": "Seitas e Heresias", "descricao": "Análise bíblica dos principais desvios doutrinários e de como responder a eles." }, { "curso_id": "avancado", "ordem": 8, "nome": "Teologia Pentecostal", "descricao": "A doutrina e a história do movimento pentecostal: batismo no Espírito Santo e dons espirituais." }, { "curso_id": "avancado", "ordem": 9, "nome": "Patrística", "descricao": "Os pais da Igreja: vida, escritos e contribuição para a fé cristã." }, { "curso_id": "avancado", "ordem": 10, "nome": "Teologia Pastoral", "descricao": "O cuidado do rebanho: aconselhamento, visitação, ordenanças e vida do pastor." }, { "curso_id": "avancado", "ordem": 11, "nome": "Liderança e Administração Eclesiástica", "descricao": "Princípios bíblicos de liderança e a organização da igreja local." }];
const ESTUDOS_PADRAO = [{ "id": "e1", "tipo": "Esboço de pregação", "titulo": "Revesti-vos de toda a armadura de Deus", "descricao": "Pregação expositiva em Efésios 6.11: a armadura de Deus para a batalha espiritual do cristão.", "pdf_url": "https://drive.google.com/file/d/17U3RZh8uea2tc3RgiJCdSMn3nU39vUzn/view", "ordem": 1, "ativo": true }, { "id": "e2", "tipo": "Esboço de pregação", "titulo": "Vem para o Meio", "descricao": "Pregação para a juventude.", "pdf_url": "https://drive.google.com/file/d/1Rz97k_jwmkBWcJfxvtPhwkKmOGbo6GDZ/view", "ordem": 2, "ativo": true }, { "id": "e3", "tipo": "Esboço de pregação", "titulo": "Que queres que te faça?", "descricao": "Pregação expositiva em Lucas 18.35-43: o encontro de Jesus com o cego de Jericó.", "pdf_url": "https://drive.google.com/file/d/1dEPCW0s9Pe4haqAJItSX6id63L4sx5vJ/view", "ordem": 3, "ativo": true }, { "id": "e4", "tipo": "Estudo", "titulo": "O Mundo Jaz no Maligno", "descricao": "Estudo bíblico — edição ampliada.", "pdf_url": "https://drive.google.com/file/d/1WD7oWKx0xAjnqoTAIUL26H4iS83vBmex/view", "ordem": 4, "ativo": true }, { "id": "e5", "tipo": "Estudo", "titulo": "Cidadãos do Céu", "descricao": "A Igreja de Cristo diante da política, das leis e dos reinos deste mundo.", "pdf_url": "https://drive.google.com/file/d/13_mh4H1ex84GLpUVMaaCPZXPl-6voO4v/view", "ordem": 5, "ativo": true }, { "id": "e6", "tipo": "Revista", "titulo": "A Esperança Cristã diante da Morte", "descricao": "O consolo e a esperança que as Escrituras oferecem diante da morte.", "pdf_url": "https://drive.google.com/file/d/1ZhibqqVF_bb-XsMWJ5KM2NRL4P9zoNEH/view", "ordem": 6, "ativo": true }, { "id": "e7", "tipo": "Escola Dominical", "titulo": "Manual do Professor — Lição 8", "descricao": "Manual de apoio ao professor da Escola Bíblica Dominical.", "pdf_url": "https://drive.google.com/file/d/1dedZJl9XbxgrLJz650rPUdCzYnhQQcGX/view", "ordem": 7, "ativo": true }];
let CURSOS = [
  { id: "basico", tipo: "formacao", ordem: 1, nivel: 1, cat: "Nível Básico", titulo: "Curso Básico de Teologia", desc: "Os fundamentos da fé cristã: por que estudar teologia, o que é teologia, as Escrituras e as grandes doutrinas da Bíblia." },
  { id: "medio", tipo: "formacao", ordem: 2, nivel: 2, cat: "Nível Médio", titulo: "Curso Médio de Teologia", desc: "Aprofundamento nas doutrinas bíblicas, interpretação da Bíblia, história da Igreja e preparo para o ensino." },
  { id: "avancado", tipo: "formacao", ordem: 3, nivel: 3, cat: "Nível Avançado", titulo: "Curso Avançado de Teologia", desc: "Teologia Sistemática, estudo do texto bíblico, defesa da fé e pregação para o ministério da Palavra." },
  { id: "esp-apocalipse", tipo: "extra", ordem: 10, nivel: 0, cat: "Curso Extra", titulo: "Curso de Apocalipse", desc: "Estudo expositivo do livro de Apocalipse, capítulo por capítulo, na perspectiva pré-tribulacionista.", ativo: false },
  { id: "esp-escatologia", tipo: "extra", ordem: 11, nivel: 0, cat: "Curso Extra", titulo: "Curso de Escatologia Bíblica", desc: "As últimas coisas de Gênesis a Apocalipse: arrebatamento, tribulação, milênio e estado eterno.", ativo: false },
  { id: "esp-deus", tipo: "extra", ordem: 12, nivel: 0, cat: "Curso Extra", titulo: "Curso Doutrina de Deus", desc: "A existência, os atributos e a Trindade.", ativo: false }
];
const BRASAO = document.querySelector(".crest").src;
const ASSINATURA = "data:image/webp;base64,UklGRqJCAABXRUJQVlA4WAoAAAAQAAAAowEAZAAAQUxQSB4nAAAB8Ib9/zop/f/dH4/nFg2CsLTSoDQqYQegWIDYgmLSvu0gRbC7/SBiImJ3091IvQWEZWG7d6dedb+ws7Mzs7P7eV+MiAlAwlUjqNz2gtHXj7v83C4pgOL/kSIaXlB3FwWAJoPvePj1bWW254YK93x2V3fI/w9EVQURiopIXUwUQNsRT2/0s7ITCrFy1vXQOp+oCCrXa9GmfccObdu0boDKolLHUgXqnfV/mRZJ5n4x96E7brrx7kW7bde1ZsDU6UQNAKR1vmjK4jX/ZBw/cfxYxtHNs8/q0CINgKjUnVSBlvdvKiFZsn7J/L6osvHtObSt26F1NlEF0HDG8qXrj1Uw8sJ/925aPCwVgJG6kSow5PWdAdJbN/60hgCgYQUYdIhu1kBotETrNmIANL/hldUWKwdObPrhkyUfff7tuv8e9LFy7uplD50EmDqQKnDh21kks+de2BIAVFGlGAz+1+USSHREUacVA8jINzYGSWbMmXDr1Wd1PbmBEU1Kbda243mPzH3pGEl6Gx5uCtE6jihwxkuFJI8tPBOAqiDyJIz3eX8JoqrAKWcn1V0UaDH+8xKSPz5yV19Etc+97+WQ5J/XAlqnUaDTzDySR14dBIgRVFs0ZSkPtoNEQZE2fqtvGiTxiIpKjRNB09s2kDy2ZGJTAGKMUZWqVVUFwFnzdpLk6x2hdRcRNJ5wmOTRD/sBqoiqwVSWjIJWSwTdPieZ0ReaaBSJUIELVpPu5rfPBKBGEVU1AqS/kE2H+86H1lUUOGM1yfyPegGqiLKRO1lxXfVEcP0JhgLBwG0JR4EzX7o1FVKTRND6lRDdf+Y0AdQIYqgG6L+WDstvhKmTiKLRc8Vk8Ie+gCqibnA3S4dXSwSPhMhghZ17boIRQc9lJa77ktQkBSYcJPPmtgBUEWsxSFvoeI5vIkwdxABXbyW5dXgKRBHDSse6VUcUj9vkexP/5c/JkESiwH3HyRDXJUFqjEH6kgCtNzoDKohHBa4poF1xA7SuIQbpb5SQJQ+1AhQxVTzAvS0gEYnikRDth9A/jw/CIIEaNH3XoWVb3qtQ1FSDYevITRcJRBCnorjwGN2Cs6F1CwNcvp7k8sGACmIreIubGlZDcW+QgWnAeyy/CJpADLr/THqkVzSy5igu/pd8Ix1QxLHBiLwQdzeB1CFE0fyxIjLrwTQYQYwVQ49yczUUtwVpPwgZXOT91BCSMERwzk7y++vuOuqtawCpIYrhx5g5zcAgvpMwmRVcoFp3UOCsFaT11QBAEXOD2eTalIgUw8tdPg2VT8ipMEiUAkzMY/C5+mj+N5+FomYqRuRx+7kQRZyL1vvEDfrOgNYVFA0fKyeLHgSMIOYCXe65C6CoWtHzmMNP0hR98rxt7UQThSB5gcvySRAs9P7uWlMMhudxe1ckCaIvUYKic6HDj1OkbiAGPdfS5f5LIIo4VDn7OPe0jUTRah25piVM0lLyJigSpCB1Eem/FUnSN4MzoKiRisGZ/KcbDGIoiLriAdexLxRTF1Dg6kx6XJIOFcQF3iI/h6BK0aRXyBO9kIRhZdzcSiRBiJpX6IYmIkmxnPt6SM0QbbuKJ86FQUzToiZoeoR8AloHUCTNLSOD05JhEJeKvhkeHxBTlcEdIdc/CknS9HeGLociQRpM9lxOhirOK+ZkKGqk4hn67oVBDBXXbhwOjQ4EL5B720NrPYP2n9HlkUsBRXwKvqC3phmkCsUFOZ7zOIzBHa73Y6pIgjAYVeJyDlTReCMPdJSaoRiQyQ+TjcRAxGzgPTBRUnTJIifB1HaK/qtpcW1fGEF8Ki4uczkZBuEFnXeRfySrQb9/WdAXisSo6PMvvfdUVPEAvQlQ1EjBYpZcBIMYGswIbW4NiZLArCPfgtZuIrj8CB0uaQWDOBVJXkX+3lwknGjSV+S/vWE0+QM6s6FIjKJN/yLXNoUoTjvBrY1FaoSg3kYuMooYGowq9i6GItqC98nPILWaAHcHPK/kAUARr4prfG7J2VCEV/wn5PrGwihuLuefqSIJwuA5eplnQEXrvceSC6GokYr+Wd44mBgYXJDLb1JFoqaY6vH3FEgtpkia7TrMuxoiiFdFnzyH90MRXnFGgcsFMCrttjHrAigSo2J0seu/CQYG4213MQQ15apQ+Vmi0TM47yhPdIMiBucXs2AYtPZS1P8/2jw8GEYQr6LN/yJXNBIJJ2i+i1zZQlSxhJwHRWJUdDtKLoSBos9e7kqXmtMlM3Q2TNQUZ2fQfR6K6AsabyenwdRaihZfMcRdPWEQvwYP0SnqD0VY0ZS36fjPgyquL/f+bKaSGAT1V5O/NFURTf2KgWlQ1FTBh5wHjZZg8AHXPdhKJCb4mby39jI49Rda/LE9FPFrcGWhE5gARXjFCNfmo1BF2wOedzUMEqPqArq5g6BQPObw62SVGqMYa3EcNDoiDf5imTcfilgKviHvrrUMeq6lzaUnwSB+FX2PkO9CJZxK2y0eNzeGSsoy8uUklcSgGBlyeQcUikGZ3NsdghpsLp09EBIdlcvKQtzaTCQmwHd0b6+tDHrvYCj0cgMo4lfRbD25/mQRhDeYR69iKNRgCvlzUwgSouKUXeSSJBWRer+5xaNgkJgVb7p26TVQxFIqVYyG1kqKQbs9h3MARfyKJH1A78SZUIRXnJ3jeE9BDc7J4+H2UCRE0XqfkXtbQkUx3+LDMKjZaiRKgrNPuHwTilh/y6whtZPBhRmOZc+FCOJXFHM9N3gjDMKLJn9Jbq0vBh220jcCBonR4AG6vpFQGNxo8asGIjUs6oLWB+lk9o+VQH7g9i61ksHoIjq+KRBB/IrBFNt1psGgSsVkyy2/BkbTltKdC0ViVJxx1OW7UBgMzuXB9lAkZtUn6PB+KGJlfuayFEjtY3B1oWcHboUK4tjg5oDH+6BShaDFDvIdmCTMJ79SlcQgkvoruaO5iKLTVhYNhSIxK7qVeF5Wd4mVYuC/fBaCWtfgslxa3gNQQfyKwQ3F5BMQQXgRLHK9zW0lGTf6ubMdFIlRMY9u8UiooMkyll8HRaKSWXQ5GYqYvRQKTYOpdQxG5tDiE1BB/IritiLyZSOCKhVXBTzehWQMz2PJcBgkRsWZBS5fgRE1L9vOfCgStGJIkcN/W8VMIL+zYkI4NVJrGFyQzyBfFxHErwjuriDfT4WgSsVJuz3+1DQJfTLIWTBIjCLJf9Lb0VHU4NEAv0hTiZ3UDNGUj2g7N0IRs+SNPHwmFBAFILWEYtBxBvlBmgjiV4HpQXJxfQiqFp1FN3AB0HIzuayBSoJQXG/ZHAujmOjjllMgiLUIpEYYXGPbXJMiEivFiAK+poLKPcd3gtQKiq67afHzhhDEXCHhFMmzbHJxKhRVK04v9/hSkqR+RK5qAUViVKQfcPlRfTW4spRHz4Ii1gIIpAaIpnxFp/RsKGIskrqKzmgYiNS7+wR/bwCpBRSt/6DFHxtDEWsRVGnQ6B3HcV5OhSASfYo82lHwGLmvAxQJ40HHy+uCZAzMZtlIGMQ+dcGn7SHxp7jHDnEZBLFWDCz1DnWAQvAurQprHDTxiTT8nCGuOgmKWCtw8WdXQgGD1t96nvWoQBChweBSL3QzMCHEojNgkCAV5xeFnHuQhM67vdBdMIi1SPNPyW3dIfEm0nAjnX+7isZMUj4mXxQBBItY4R7sUwuIymu0uDEdilgrUp/L50IYUfRf77H4RoggQtGUd8nf6+OcXPqvhSJBqnTf6XBHA4PWK2jNF5WYKe5nSRn/A407PO36OQ+KWCs6F3r22TCASKN3uKUvBIleFE94Ie7sCEWsFe2Xucw/F8nA+H9c7jgLIojU4NqAU34ROm6i+ygUidLgSVpF5wEnfcfQp2kiiIN+f5PvniQSZ4ou2R5XNFWJncz2uKoxBJXrjWwHQcJXzHBsHuwNRawVgzayzHtLDNJfrKD9SjsoIhZt+CP5qaYtpTtfVBKFypmZDt8DGn1Grm0JRRwKejx1ez0I4lzMUtq+UVDE2mBgqRe8DIrKAkCR8BXjbdfNuQgGsVYMOMQKX/Ai4JLVZOZdgEHkivtCbkZfPGnxJSOChIH36R48FfUWkwd7QxGXAgCCOFf0qXC5yChiLZq8mNzTCBIGYgTxKqpaQxQX+FzLGY8kxFrRZQ/9Act/Z6eFPjp/DoMoIhdpvoN8GXcG+VF9CBKl4pJcm08g7V3PyzwfBtWVKEFVBXEukvYZnfIhMDEzuM5xrfFQRF9UJSoCAFIjFN2OeEE+K0Zil7KUQdtyvLI88vgz9WFQXcVCzzvUc1gxV54MRaIUkZXkhhbJL9ItHAmDaopCJDo1UTHMdvm0KmItcvIGckWSSLRUUFmjoKh3/phTUBNFGyxlkD81hCDWBtc4tu3Ylu0xsKIfoKiuostxj6+OyOL+U6FImIox5Z7vMjzruf5rYRC5KCpLYhBtsJzM6oTYGbxHN38wFICoVksBIK3n4MaovqLh56HQP+dD48/gfvq5Ox2KmIv5giHLtmzy7zGpUEF1RZK+pm3tOcj93aFImIL628k5eNTxrPEwiFyBZo+seKkpJCEYjKETug6KWBvc51hcCAWgqLYqcPHbP2/JKt5xGyCRGbT8kU6Qr9YAg8uKHS+nDxQxV9xiWSHbJTeMawkoqq8YZbshy+HB3lAkTsWNtsvlr9peYCIUEaug8aPbLfLrdJGI1EiNEGm9zuOqZJFYGVxY5vLreiqAQdfnr5dIRIFzPivwSHoMPqaRGfTaQMt2i0fFn2JwBm3/WBjEw6hy0tsyb1RLQAXVF5z8Ny3H4dFBMEicghZ76Xgky6+HSkQGGLfKYTAY5EyYSBQ11GAa3eLzoIixQZdD5IZ2EEBx+W7uqgepQoEh75wgGSoNWj5uaQCpShQX/pehkMUNaZA4U7TbwQCfhUF8Xjh7xtguAIwgmor76ARtFo6CQU0UgUTFyMWOZzt+lt0EI4hQgD5vlJOkE3Q/hESgOOfh1pD4E236p8ufIIixos1aOrlDYQCDawvozBRBeEX6E9kk98y5+owrM1xvqQiqVGBCDknP4sqkKIlo+OqJpP3AAL+prxInYcUIoqo4Pcu1QrY1FQaJVPE4HdvPopthEKlAbskiSxdN/8y2+Cq0KoMLM/ltqkjcKR507Myh0BgpWvxIi3fCAIqrCskN9RBOBMPW0/KCb3QC0PqQw8dhqjBoON8iP3ngiBcF0cqC6CueYMg70A2KOFVjjCLaKs/TcUN8SRSAqEq0REVEpVoizee/3VkEoioRiTRdQdvy8sfAIFKRpOdpe4euAkYE3MJzIjAYeoTe2vqIO5H2e1y+BUVsFY2/YYhvJKtAcU42nfIRUFQWxYQSBpl5E5CCHps8e3c3aBhRtPmaLl9Jwgvkd4hAVBVVpjZs26N3z64Du1ZLcbnlWM5NMEiABpf5HMvhHydBIAoAGhVRhDcqkSneI5cgSVFdg0tdz/IKLoVBpKL6Ki332CCgz06LC6AIb3DGYbqZfSCIO3xI65++EiNFvU8Z5E/1IRC0/ochLoaisgjutxjigb4wyeiyiwE+BEVlBc7bS1rzoOZJchkEAERVUblJl8EjJj37wZrdOT47FGDhoGooOmUwxFeNQQIU1WW0g8zsDoUCLS67oRWkeqJAs7HvLPtsYioAiUTRL89xN6cAraZNagSpSqXe5wx6vsthELHBFFpe6QXA+Zl0d3aUcGJw7lHa7oNQxLuiZ57D56CIqUHaJwzwz6YQQHQxLW5rI1LJAE96nsWdnZFs0HcfbS+/v1RSQaOFJWT+eEiSPEu+DRVjBADqD5k487M9eQGPJO2C/ZtX/bD6py6RiZo3aDGzEzQRGEwIubbnHw5V4JSXdxdUbDkXUh0F0p/ZHyDp/jnuzHREKIqfaLmh9699c4/PfS9FJJwC82l71s0wiFgxoiLkhMYB4/LpVpwLRWUVjM9liD+kqMSdmOW0is+R2Bic/B39XNUSCijOqnBtToQBoAb136UT4raOSAFuPk7H5qsiECPALVst8s/eUEnC6+QcYwCg9RWz31hf6JFk8bHdH99zcZ9TmqQlwSgiNxgbDLn2SCgSoEjSKlqufSeMgZm6n3SC/NVAIjNInv63y/BW7o7RkCoM7nE8h2QFWcFvk6owSH/b7zr+SVCJSNF1txe0pyB5TqnDkiugqGyAR/wM2nnnQlG1mPhQnFpk82koYiiK/hvo43ctoYBIw99o8/1kA4gBLvmLToD/nI4kdFpsMeQ4vF5TDIArvqogyx5rgmSjSF7LwoGQ9DHzPttdRpKB/IPvXtyldWNEKhGpdNxNizOhSISKqSHH4WswBl2XOaRj+dyjvaCRiGDYlzYdHn7u7nHfuC45ExrO4NwSOqTjupaf37aFAIAYnLWebpC/QATVWMAyLkP/Lz2P286DAoAKWrzmMBTkQhhUKQZxKsnv0CocGBMFrvuXPn7cBArA4CLH9bK6Q8UAHZ8rpOW41k2ATvmHDum4vAFA2phFxWTwrSGAAhjwscPS1xd8sSNEknnfL5l+VvcOCGuMqoRFZHieQf6VLJIIRJrsZ5BrGhnFBdtId3OeZ3sFYyMSwcQiBnhiYQ8ACxlyDnerwqDHPtr8YfhDrmfxx+YQABDBRRm0HTc0SRQRC1J/9QLur49n0uHnnWAAiAIX/EnbtZyjPUTDiQJN71g6FBozg/4hm0+IIvoGjRbansOX0qAAIOZNWt7tSFIgeew2kq7Dj4E+n5IuD/xhu/zzvLPv+coine/HAAZ60axP80mPYY///sG9A1IR1qgIoqwYnGV7eX2hSISKhY7l5A6B4LYi8thjJz3oOG7++ZGIyKOkzb/OAZJxTZHrurdCUNmg8xrafK8BJnoO150MAwAKjM0j6TCzH6phpPdxz7FckuXzU2AAKNDtGT9puy7vgqKyKHDyuN38rSskZpL8Jr3szoieAKd8zRAzpgMKAIruR21mNAfQ6MIlLvnLSs/hRz3vzqXNso86pxe7NgMBkqHVk5KgBkM+9ujR8WzSt3PZk4PTAECMqgqiLypfM+A8BEUiVPQo8kJ8EEhZaJN/DQDOrnC8fSdBqhAxC2lZ9pv1YZJwWR5DXF1PKonBaZtp8/UkjC53vYLTYACIoumTIfo/P+hxexNIRCqY6dme7dLafjWggCrSJmWTKz4sc5jTSSqJAZpN/YfBR5MQe4Oz/HTugCLaClx1mEFuHgQVVDY433YCB4c26jB2pUtmzzNDLc/x55PkrtFAygekTTJrzeQUwAhmBris6/ueFWLRh9e2AAAxKoi1YqI/wOVqJBGISfmSAX7TEK2W0/Peqo9kPOKF+BUEVRrMYjAUmAIYgxsKGPDyz4QCEMVlGXT5sqLjbtruw1AACpyznayYgafJ7yCIUBVmQiEdj/aOO+pDBSpA/99ccnWrlO3kQhWIGiD5zj3kfy8EJHaKheSm+pAoqaDV+yF6/KQZDMIbXOwGc44f2nfCJgu+Og3oUkzLJb2sRxpADZr/UOrznfigjwJGFFODXvD2bnu8IItGAxCjgjgUNNnP4JEzoKj5ooLraFnFQ9FtIz37AYWRBuvollwJrcJgkhu0nFshanBdqef38VuIAAa4v4Ke9RAU8xni4RZQiIF5pIDMGg35iHwdWpUY4KKVAc9zeXhMIyDJGAF6f5Dr0f9kE3Q64LqjkGIApI1dQfrfbQkVxFwxrMj1HoUiqmKA6/9Li/l3KhRVKvoW2YW5pSTzXugmUMXUcs+1jz3YFlAASO550bntAahAoH8wYBcWkDx2KYwK4lTlGQY5GwY1XwEdl+NanIbT/6YbmggRxRTb4U8iEkYMxle4tjcVaoDxxQxVOJlDoBCDpovosPxWqLTd4zmhSVAxwICfHHJTX4j8QT4nVagBOr9fQNJ1+QRgBADOXpZF8pehgJzvC3CJABj24lo/+eMQgSIOFS+wnNEyQI+l5XT4VS9AEaHIdFbeeHMnAAoA/a66+vwOgAoACMKqAIDi0hJWLn2sAxRxq+ha4HJ1ukjNM2j/zPd5tPgVeuyl678FKoJ6W2i7U2FQ2QB3lHuWMw+ahHpziryQ5eOHEDHAxasYZPZVUINHafP3VJMENH7gX5LvtoMBfiMXI0kAMQK0euS/JE/k0eOmS9KAjuMeX3qC5KHxTSFJOM8LhkIf/WfOJ8dJfj+qGSCIQ8HJmz3mnxUVFaRN3keX+dMbQgURQa+cOXfKpekAFJUFlUURXlRVUaVg2Ctb9345oz+giFvR1CWeZQ2HoqaLYOgG0vHzcKNTt9PNHQMVKC6pcLmuOQSACE6aE2SQfxpj0PNr2jbdkP8ukyxoNjePPm4eAiNI+ZO2ew2ApDF/kNwzEVAAyz3vSBeIGgAXzNpEMvBcr/MzPIslv7y/bK9HkplP9QYUIo2W0wox7O93NAUU0RWVyBTDC3j4fAiqrQoM/8ojK145C1BEWRVVqjGqiLYA6aekAKKIX8XFjsv3UlVqmgKjj9N2rRB33bCJPHEJDCBI+YYhzoIBoMBFq+jYzDlPgZEH6Kd7oND2TQdk8G+0aS1pAwPFiBLHduf26Dfuc4/0Pu0CUUDxCi2uOVOB+he8GSTJdWMATCVtl+H3v302YASAIP0b0qN3cOmk5oARRFdRXUW/fO8aGFRTVIDTnguQ/HMcYATVN6rGCOJVBYBRxLFIi7/oFp0ORQ1XpD3usCTfsl3Xo80TF8EAUJyaS8d3sRiIovE8m47j8COg2bwggzxy96l/0Tt025j3yklr/W2AAorXGAg5XmEpSe66FzBApUv9rsWKZXfd+p1H0toxtyHUqJn5b4gkS7Z+ObMjoIqwguQH/ljz3cPdARhBlBWpZ/aMDJD7p8MgclEAHR/LIZ3dM9OgigQoKohrgwl0nCeMoGaLou0ycuOI+y3HcRy/m3khkhDmXL/Ln+sZI0CPP0jPocu/h47aQcfjyj7Ab16AlZ1/HkqFCADBZ/QFAyHPcr0TrzSFKMIKniYrLFa2CzZOaggYVG537+crNn86shEAVVQtgNQDIEYQbUXPr0snQCOrviognZ/NJnn06WaAQS0skr7WY0YraM1SxSV7GXyxIZ5hyHEs59BgGIS70XH4Zz0AJz+ZRebeM66QLoM2XZbOT0OSPE3HdRnKmX8SoKismOGEQpbtOkWvdQAUVYokLyx2XNIp2nhvrxRABZUVgCYDEBVELApAFdFXXJbFLxqJVEM1EjUA0q79K4v0cp9OB1RQGxtMo2PPgaBGG2BqDjNGAX0z3JBjeflDYFDFbY7jeD9OW7B8L8lfTodud4JBh7Te6QmoSOPny2zfigkdARWEFUn9gCRLXukFiCBCAbrf/Ponz17VtSEAFVQpCkBUUH0RQQwVQ3O5rz0UURY1CuCMVzf7SGbO6AiooFYWafCrx/3NapYoOi0JclVPKD5h0Al5vtEwqOqyoB1wGHb9VQ1gzJckaT97pkAElfuMGNIYEEGkDUZM+s9NfQWiiFwEQAoAqAoiF0H8iy6h8xoUURVjAKDbvO+Ok+TGW7oAIqilFdNtx3saihqswI27yA9bI1k6ZHp2yPPfDEUEHfIYtCv9dk8bQAVdZ324/KWRABSVBZVVEbEgvKL6qoCoChKgYlCGn4+oqZ6oEQB67n/e3UOSztcT2wCqqK1FzEp6f7cSqUEGTZ92GJybAiN4nU7I9d0BRYSCKcUsPfzXG/c0B4ygsqQCoqhajQqqK0bVqCC6ggRpMMZfyq8AIxGqqgoAtLvkjo/KSTL325euTwOMovZWjPO5fBaKGiuC7j+RByYAqmiXx5ATnASDiAUjH76qdyMARlBZDaAGtb9I818YqpiI6rcaNOatfRZJZv389ggBYAS1uEB/p/d3J6k5Clx1lFzRFSoQzKJt81EYiQyCymoEVYugTqgYlEHPeuvMdi2aNKhnJKlB83bdet/wf/sDJBnK2fveeQJAjaBWV/TI8fgiFDVUFA1eCpIfNoQBFG1POBYXQgXVVaMqqIsq+m3yyNJjh/+7Y9NPP/y+7cjx3AKbJAOZK24/rQUAVUFtL5jnubxJTA1RYNBaMvhwEhSV2hwlX0gSQd1Z0OD2/RarGyra+fzl7ZMAiApqf0GzfeTvzSA1wyB13gly50WAoLJgyDsTkyCoSyvQ8pz7fzphhfGcku0vTLigZwsAUBXUCRXdislxMKiJKhj0I8nXO0AEEQvq1qIAGvQ8b/Rtt948etTwga1RWVQFdUXFDMfLOV20Jhjg+qNk3gyFQYQqKqhziyoiFqMqqFO2PEDv/TRI/Img7fMhcvVwiKK2F9EoiohGKpGrqqiqVA4DQNRUrVLdukA/n+NdD4O4V+DCnWTBc41hBLWoVKlVSmXUbKkuoiwRa3iJdYIZ41mBYfGngmYLfeT+SwBFYpewGlZEEOUGbdq363hql+69Tu/Vs2ePHt17nXHJ2Jtvvfm6MWPHXD3y/DP79urercupHdqmp7dOb906vXW7du3atm/frm2bVs3TEE2TUr9R48YNGzRs3KRJo3rJBjVTwmr1pcp4+w9DB9pB40sMcN1um8HFraCCxCuilaUyqq/1WrVp1qx9z7NHjrp0+CWX33DrHffc/+aqQxlHj53Izs7NOZ5x9PDhgwePZOUXFRYV5hcUFuSeOHpo/65tWzasXrVu6849+/YfOHg0IyMjM/PYsSP/7Pp+/h033njD9TeOHXPtdTfedOvtkx+Y98JbH//w56oVv/2xct2GDat+Wr74tZeemvv4Q/fdd9+MqTPunTTu4osvu/Lyc/qc2q5du/TmTRo1bNigQcNGTZo2qtegYaOGDRs2atSwUaM0QZxKZVUJH4OnaX+cAokrBTp9WE7uHwEoEqSIqqoxRlUFkZv6DRo0attnwICzho+bPOvZD79avW/vtm37Dmfm5Jw4duTYibzCogqS9OjZluW4rut6JG1fSXFpaVl5hS8QclzbV1pUkF9Q7A9Zjut5jNguzs3JycnOzMg4evTfw/8ePZGbm19c4S8vKw+Egn5fRWlpUVFRQV52bnZubm5uXlFB9rFjWTlZR/Zt3bRp07oVf/z6yy8///LrbytWrVi5Ycu2bVu2bt++def2lV8sfmXhwvkz7582Zeq0aVPuuOHyC885Z+jg/j06tW+dfnKjFKki6lJlFfIegzdAEb9iBEkzdpPZ8zsCgposomrCqiDylDb9hg4+9/pHFz793JsfffLJokUffvHH6rVb9x8t9PtJ0iPphELBUChkBQMBf8Bvhfz+YMBX4fP5/OXlpaWlFf6KivLS0rKK8kDQ7ysrys/LycrKzs7JzSssKi4uKS0rK68oKy0rLqvw+wN+f8AftG3bDvkDfr+/rKystLSooLikpKS4MC+vqLi0tKy0pKyiosLn9wcDocpBKxiyQiHLCllWKBSyQiHL9kg3ZDu2FbIc17H8paXFhfk5WTm5eTnZOdnZ2dmZ/+xcv+KX73/4ful7b7/+2msvPffss089OX/m/eNHDO7fu1vbJmkpyclGK1W74yY618LEEYBzPiN9X54PKGqgiIYXQcT12nTtN/SSq295+OkX31r2184Da374/rcNv//w4y+/fPLOMy+/+fIb7y7/fs2WHfv2ZxzPPHrkeHZ+bm52bmF+fn5BVk5BfkFRWYU/GAxZIX9FWUlRfl5+fl5eQUF+YVFxaXlZSWlpSXFRSWlpaUUgaNmWZVmhYCAUDAZ85eWlJSWlZSVlZeXlFb4KX8Dv9/mDAb/P56uo8FVUlJVX+MrLystKi0tKyspLSspKS8rKynwV5RW+cp+/osLv8/l8FeXl5WUlRcUlBXn5edlZObl5eflZ/x7Jys0vyDmRmZGReTzzRHZOXn5u5n93bVm3csW6jRu37tixffumDZs3b966bfOmdb9///Vni154fNKtN1437opLL7ts5EVnD+jZpVOHVo2TRQD03evyjjgSaX3j4mzy4MzGUEXcioiGR8Sp7c4YduHVt9w+5f7Zb/x64NChw0eOFDJ84Pj+fet/e/+l55+a99D998x4dM6CWU8ufHXx8hWb9u7950hOmc9yGbHneq7jeS5Zfmjzn99/uvjt11975aXnF8565KGHZ89bsHDBE/PmPzF//uyZs+bMnjVr7ry5s2fOfPTRRx97/LGZM+c+ueDpl9587+Oly7/+8fc/V67dsHnr1h179u3bv2vT+rUrfvvl5x9/+PbLL5Yt/fjDj5d+vHjRojdff/nlN95+69XnF8xfsPDJBU/MmTPr0YceePDB+2ZMnz5l8uQpU+65/dZbJ0wYf+O1Y0ZfdfVVl19++ZVXXDlq+AXDzhrUr3ePLqe2b3dqp1NO6XjKqV26dO7StVv3nr1O73/m0PPOO+/sYYPPGNC/72m9TuvTr9/pXTu0aX1yk1RB5W67XV4fPyp4wCFDX1wAGMSjiKgqIm7cun3nfuePuXPOk6/+eqjQZzF8/sFNv6/8/et33lj84SdLFr30/PwHH7j/4ckTbhw35spRw0dcMXbcFcMvuGjk6Fsm3jn+9in3P/7EU8+9+NIrr772xutvvPLc/JmPP/Lwww898J8Z99977bAebZqlCOI/qV7DJs1bte3QqVuv3v36nzlk2LAhA0/v0fWUtq1bnnzySU0bN6yfllqvfr3kpCQBIKqoXbvvIcfFiygwZCO5c7xABLEVUVURhE9r1LzT6UMuGDF22uLV+4/llwUdhrezM7L2/brovtFn9erUse8ZfdObtGyTfnKTBvWTUdOlsoYX0RiLCGqiaLVNTDVCERGVyhpFqX5Vp2WQ18aJAn2+yKX1WlNAEXURNaqK8KZ+835XPfTRuj2Hckv8gaDLqj3HV5C575s7Bw89p3d6GqIq0dT4lMqIf4lYq5RoAxAR1K6nHaQ3CRoHqkh9OJvMuBowgqiKGqOosuGp1y74v29Wb9mX7/NYte2vyN7zzaJ3n3n8lquGdG/fTBBeVFWqi/8tdt5GfpiEmKsCV/3l0nvjVIig2qLGKMKfNPCeeW988P3GA2UeI7Rysv7+5vHrLxk88JQWKYhUK4vgf56t//KY0UE0NqLA0LfLyD8uAwwiFlVVQdgmfa946K2vN2V6jLD8uzdeenjaPeMv7tm9XRoiFNHKIvhfqXmZnnshYqIKdF9wjDx4XxOIIqxoZYRv2f+a6fM+XHHCzyrtY+veeeLx6Xdd2ACRilYWwf9iL7Q9fpkmEgOg9V27Sd8nfQCD6jbtPGDk1JfXnmCVgcO/L/vkhdk3n9EW4UXUGGNURfC/3MZraPNOaPRS+ty7m17F+hsAI6i6aadegy4Z/38bjpdbpOs7tm37lu9fe/yxW09PQ3gxxhgV/G9Yca8X8LanQ6IkmJxPOt7aNhBFlYJzlh/KKgx5JOnaQf/u+848q6cirIgxRgX/UwZWUDggXhsAAHBmAJ0BKqQBZQA+MRaJQyIhIRP6vjggAwShwAnwD+ADM9+Z/Udopmjy3m28e9f3uX7Z5ueszsLzbOgvOl/lv2T9xP6z9gX9YPPc9UX7rfjN8EP6H/if+1/kfeY/2H7he9P+z/7v2AP6D/ov/t63nsNf3b/Y///3BP5F/vfV//537i/BL/Uf9h+5n/V+Qr+c/4f/6ewB6AH/M///sAfv/3GH9P9GPhj+j6SH4B468yiQDXiZF8AJ3PaEYN+CniAf4/0F70w0JnP1C/La9f37nf//3TP2iQE3zXEYWuPZ8/Pf7RIZ/pI0Z9xAB8QpyZ5vc5BnNxGcPUjsYbgPKhPYkMgrSaXRmgz9xrffdbsF7kjI24LP0vE/yFHdwCrrWta1lRFFxLAGhoIeGPEgDdMz40+cGZS1A5tSuYXdbAarFJpx5Pa9TZYDyqBn2fofCslo3y64AEnlAigXs9Twq2w0nZtUPgf00C1Fb9OX5ODPlH2TICEH06+sNKPp5JAWNUikmNwBWHpjN160FLHWQCUSwDmzRKA40levQNBNZzZBT+MvcnwpOgRDxoQZe5vTX3rwpH7Ost0cVcIVErPd3e9BzTekvJ3aSThOGNfcFy/psfcdXTbX/42U5BRmKxwengdNp1ZzbKCsXCA96xoxSdYRo6ucWZsSWroY49Adq9UHOfZix9gfmY5DSKsV0cmHPboKXjm6JAuHA16dKwlAhPpCJRO+UFbqH2YUN3q4PpKwSxsCvhFm5w6n2RVlxuNj3MneSAq9ky4MzEWxWKp9LYOXY3+1EgPS/nvqgwDNGC2LaMgbZ11h8jy19Gi3E0av8wylC7P1/y15N6F9dCjR9W/PE1l+458rSJeEX2JAhUv00BVd8m7HhG6MbOFFM2Ov6VzZdBEN1IfSyyDxMt/npDrdK6FT1QvKE5gvg9utJdejIVwxsrFZSF02mfIEihveOy0CdtDXDONzoTJ6byG7TrStl/zaihsV125Ew+X3ETZh/MYgWgi0+JpaFa7CefxEv8G1/I8cDzgLyKoFOc+UKmimdt90x6WpJ3RD03NyLJShGfDgprS+tBYWdHkTE5Bc2cLzHHHHI8xutOxN0VgkAAD+iRiDutbic58XALp6QkCnvyB5aWIv0cSC1vbcjZ5yDYYwmw2lKOpURe87Yv9C61K8164ro01mw5qG1fBK3W7Hoa4F/fNyNiurUnm8YLN2+Sn5PS1LGDN4rQacHtw7JHPkvC+ejhmmV+Ia/bXt5wP2s4Vm9BmJB/RsP6mZy/W8HUtV8GXG/V58JiGtGNX5x8Z+OPbj8Yesa93vD/5toPWvhGogx6sUH+uEVHweZWaW1mhVGpfBExyPH+rN0S2no89BjZp5P7PFHtCoXhzTMaQwEy7rU1gNtuXU1y9prVoStrk5y6yqZ7C5FWjMLjaanqyOIhbD6sH86bAZNX+7LknKVkG5OqmLq511eIFwlu2ZjFNEtPeaXMqPP0LPLoOIOduv8OXwt+SvxkHaps/niYZW7XLhvWyW7V6YtPIl7bPwvGA4jxLKJSA2c7b/RceSxzzvHZdrC7lWYUvWS3FvkEn6xUQm7SHh2y5XRnUnRculFOtB8iXYkJX1BTCONbePO8wMnzgK7ptiknrWEe8V+FQDKyupG/gBszJlggVBm/Khu5Z1dWbqXss5StGi0R2sWSnwueu+GYkO1m+BYFKuZol6d75KOJWc18e3UzCfj3YZl4gWlQuRGTrQk8FAtBVGcWrc3vuxMgyKU/JUjnViWmRs0OIeaIDi0PDQuwEbiAkiqvh/dwtn2jAV2uuNQ7SzZjoXg7TwXzmDeh2h1vadZtnpEjJ/qvPjsYNQUQ1zZqr2982aHwN8hiPEMe5sSZBW94Qbtp39bVtAab/Cj+FjEmTrcrGW7gTH0xSAaGuaqhg1ZPUZXu8EYgMjVIyPTbHR8uodyQAO+zZvwRqQbei51PolZ9VcZkoUzq5FoSqi+2HLWIfO/vXEcEPTPIGMHAACHCCOvQwR3is/jRY+I5iTW0ONd1/E2djK0TezY3Qm5DBNpdUXUZLoMYuocLdieRG+0xBv3kxF9dv1dMay0/44JiWY0Y4/M6FWj2SaLrlpBCCB7y5QFs7DkjauRk33FGpQWqRtIF0a2Z+wic5/LMu3gULWxjuKb94tUxWcuDdvJPr5YZqGglo7v/YY7tLz8SyogYDy1wnVbVjl4+85dTMtDsKflOwW0mE5tsx2cBiGYeNcXRE6UhDgdutl4zbuDtuss0+wF5BwRSl9QF6b8mKlFoBe2VSqRgEmP7cYJ0He5fgPtiMqghnnzPjIiNaG45HC/LeKQd9HJ01I4h9FW/gumqJvvuNpBuR9CMFL4Fz4aT20MfkdZdZD3twWLxeX1m3dD/udcKlhZOU2cvoxnOBTMHSDWANCs1cQrirsXfgPqY0p0NUuIS7zmqScAAo2zB7l8r3s+RyqprcPDcqHfWt0mXEg/vrcv7sykhyZSwfpAzmnXUI7GZ9EyxZUL4Ejw1K5A/318DO8fFGDyhHsksQHb2xMsd6Ua0ZfMUnpCdfKBVvKujRu0ot7eGYGhG6RuhXi6guSYzvjlXkGNT14ATUa71O/T9JH4txm3XbcWsSOKcs9duQKNi+RANtrpj6PvSfwLWuocaD8LJIzp3gA8NL2nqmHZicbiUnjoqvWNmJrB/pAhQHcjTbfyYiSyAZNjvjtEjVaa2LAmJs8uFkJp9DeeXWjP8X8SYTIBl9ZLL/0oVtO8HYPHfqRU0Eb/KbmkrwdTfGW4M9McPKXaS/FhvYsBPjtAjOqz0c9YAG0QH/+0xbcy08pNff0HrUXnlvnnVrb7CQw5EsvDsITyfFfGj0AWxVAI8KdGbgURECoFiVmnT05zlNs2vOLvaC+IJRkqsd75dBgxY6sMkdfoHHwzUnxgNrPy9dxanI2BViohSHC8FEYCNu1arzkTYFmxnzAB/c03JgQlPDvcqDtSuaZ6MqeR/e8xXHZ8mHjFZQPhTQ5xOY1D4XuTeUvWTYAAAJfuHhPpFNVhB0Fg+vr2COYLKG7OHIBz4IMspu80NL36t5amldXm4F9WD2SkvYZADoZDjvHldR4mrxdt0iBM03gSGWwDIxAAyprpIg4GDjfnlmOAfNAdwkO0dmlBAWEz2WTdspTPmAItrucuS64VP23MsbRQgtk0LJsLfL0VBJdiYNUqMgWRVhV8SbLv/LCOgsk3QZ93jcksbPttfTQne8maVL97gNuQ6JOmE5FWHiGDYYAfIJzdI5VtzUiFJKEhQreHA2U+KUhEuVVt7P1l7UZvUDD2Mul68brORmFRg2310YLCnAlVUjN1uoUzXgcDoLWBtDyB/CqY63m6hWg0kcZ2eH6POHHkP7zq5hW9O5ewzlC9ytpVd6mojMe3tQAk12yj0Ru6HLbEgLqkidVXjZMPWlkDtedhQ47pedn6PkwvN7rW4g+uZkQ0biy01FSEo7J/pWAACzXxt9jU8LkuupSOX900cFTzaCdILJaPYwO2H7P7VPtZEcdvsOV3Pr5kmjHNFAYedkiGfkbgBtdcf7Bbe8mRa4WLD9D6Q+g5BWFoBsjN+9Gl8RKoFax7g5mdEBGfmjF0VKrzKqgekQaRQ+yjuDrxaUedXsNNcb+UZZCtscXuXPoYR2q6nJxodEvz0EOxXb6Vvq5NmQJBJNR8ss9pvDvRztCHYsSQzC6FtYOdlZqv3p9ZqXMGKAt9iS1dwB7y6unlV+aFYIobRgK4Kqxhxnoqo+VI+WgLlVAEzyUGOxk3187o5lheaoX5XntepZcQgmiV5kyaTzW0w6L1t1wlkinfhGic+IriU5husRDGuvFM2lMcF14PtaO3X37BZPWW6NgMq4mgwgKb8/8gOXfdQHMFbTpTfirhLlLBZj7/wJGEZViWwgh6WU3Fih1EI7tm/yj2Rht3XMa528mHOqgESn0m4xKHCSg8uEeBF7MqEKzdRGApq52J67W1JcAg+7oBecPpr6uvnkZEjRe3ESZ2N7HZqNcQ98QY972+6kM8k2GnDakCVn1ZWtAQSzrNByNMnIH0Xss/zHpi2rKaLxtKXVbpzaS6CVCEzs1p5FrW/Cs4nncnLncTNgKxGv+v4t/KyzmUnAYBM7BgxY7C6TJnBvQnq3kRW7UqiJGM51O98wUaOn2k63x87SnBWobenYTjPrK8OhzKbd4ECQPwCpcn+2x+EslJbB/4zcLFU9wCJDtQnX/aM2Hz2OxofRz2K7eTTu0sqC4PStCgu20vSZKf+s9FNlx0q+jR+Lj4zySaWzGLhpXGcrxY62O6tCP2odWIC1OyXhns8lHNvv6fwBTcXI93oKXTfMp0jMxobXGwZvSOY7pdT1I8RuJWuL+ujkZ0RPPBO6fZPaLTS5dsigWUubNXs3tzREX+7f493KbUO1bFUQiHGQQmdmq9r5QlmCQtRly+QhHXXkh715DUqkym4SJLgXVH+kvtNPFhT3cryIJoMa9QgRIJw0ols9rOfFGd8qoj4h/YKlEQEk/smOazLpX4w/hOwvSLymq6ORrl56WIjfgyiI5g9GoXDmOdZSnEb3rvYEiSz6u2vuK0TAU3zLC8MW0AGG8zOOJOopGfmbN9iDz6/JEmWeAMVh1nPlvb8DLp6m0P9hjGZTeKYDQUcxtmHqjF0ZVxfrPQ11wPCLGHn8mL3Y+lYB/bi5D9xwjEhM5MCIjg29zChfBkluLtjyxNzKytH0Qz5i4j4TsHOHboWKG3ZEyfiiU63kk+xsOpYCKTUZBQqXYtLjb6ZXtYV5hOHdTsv0HJtb9o014mOMqTHqrGC7oydO/5l2OBfN7m3Wy36xkj8GFSf5UUBK3lAVvDRUlmfKinf1B9fKiL+f1xn3TqpFeFMVA7n9isXjTqBtctL1fdnbOYS9wGP5qrRUTWSmmETiS18u7JXkJQf+hN87zSXTJrIjYB8l4Vepf9aPT/FceeGdhRTY03KFDYRekAQJlduwi2fcpZEuaG2DASKg9/tDisVvdFixCD2aNwBgeLsfTBPMw37zgmkMfgvSW62EhBlkQeuhqSQySHn0nft7SduYZJbDaS3u7xkBGV9vqPaPMzTCAnF8a+zvX5OC6OO1Dfj6b8PfjKQ4qwnirmSUvQTgZZbC0rKemrMvlteYRolAiKT9d0ekRq+nNHv8W0w3FHOvzGn4Nb3FN3BJ1k44FMuLgx4y3eMSFs1jUqn99HV1/zfB7jdXQsOVFUEhN3UU8bBzlaH6854wap4BTk22ouZ8j+XNt6yXz/BGV8t2iDpt3809qJ3COFl3KkRpPJh56LyrAFTcoVDCaAaf2KU7gzn88UT2lzl5YxcNxpRAJQ2x1K5k0KMm0uxyTjCF4zQ1fQlZyacdBZu5b1+3Dk77q833u9cy/ugJ4WKD10rtng7poUUdZfVCCErSfTmS0IwxF7SLcvrCSdTb8Sma1g6cYY2mBq9zIODWKx8eM8FLXyRvgfQSubdW6UqLUgNmH45szpMK1BHCA4M7asgb4icnVEO3B7hWI295SsGJa/Q5z6qKSZVyzgV2WiByRSAnzAKS/NozA+jK620Lm6/JGic/IBxjZRg0tuGFuKMZ1vnE8e7IzLnAnT358e9ZHsSlESPersirb5f9JGA36linUYY05yKZJMIN9/1d5DRk+6ws2NfRZ9DIudopPZ1AbwUhSvAuR4qITIm5MQlOA0w2F44A7X8FaSC2i48nMktcSPoAy5qEUQ5O/8qM4n7JmB9qsM7KpGTMzQte3hxA1Ja0WEAR74sLFxlTgjeXoXtUoY29PYjFaOlaIs6SwGyt6Sk0YgEB0Onn4nParzGX5d4c/lDlMfiB0OwPG3+576rItV/8D5WXmjrycI/gRLilR9KUsG6IzQWxacFpMfraVmpcO0FPYAOEErhUBoTSqUd1CMK36HKOQWGQCDxgJJb9QRdPgxjNMDKRN4dD2SZTxcST3/6tIBa0whNAiTFB3Rh1lwZkCTEmiwEWDNtC6pXqi7Co9mez7pnoL57YZ1u4u3zjf31xSa5ZE6ro7SuYGMt+TYc++BPdQAP6HaGWogWr88ZOStSEHpYDsZn17fU34eowEao05qiXEsmeInU4VmxYVVYW5YhIdKVaKVfzz5ePRdzCahDmzRqxZHAuj2HWY9LhQNb6CCiIAQwqVtsOxJggSXq7BeLpYH/7XhKA/Yo8Nt9/nM+Axdzs0HjGGxrNOUtdQeVDO9C7jkCSUySw4m6PtzqYC5XrYbc2kDQZhQYS+UGYNWjST78sxW9C1vQrcZmdomz7haRv1nKsVFPE6OOT197PyDeAB06AgF1GfkokOKZboGaMFysC+/31aEwiMHJ7Ns2Tbm/jvc+gkA7K5C8V0o9wrK+sjT+Uh0+JvdU0dsjB2NNY9zH9wb024Fjofg+sDQ44iWyLshFMFWig5lJe19/v7SPQjqek27FjgDX1xnRQs2nTX5FN0UCKS/vWA8vLK6sz4ukAQD6yghsleqPHv2dIKSHAuXrKKWTnb64R6B1gEOf/mHAvHcUHfxc3d2lZCeW4m/rU93huYZpRrKj/pI0Td6NuyuhxcKYYcpR90FMqakcnQZe1mDxLsKdVPAoN19QFPg2V7CZtHt5s4GRvgWcWunIVZ274Hgacjh1yqhoABFYGTFiG/4qBYu17B58GE/0VgNP1el3dxm5cEzvSvZV0ajaHJ09KUt+DB871+/GygGEzPCagyHdd6oiqXW0mafZbO0p0IwCInSsQ8c/xcqC5q/lu3AT6TWpG0d9sCWQGPncT4QDRWmgn8BgowKi8pE66db7It43o0jpbTZ7TdbQO88DZ7912VFi7gD9LRcj72gznCkBvuKtyAbHnSg+4mOb1Ng2/xmc1Hb5xdKyAs7/lqpxCvbZtn/ZrfVpDQFYZDzkn8ldPlRVt1TH1WgPi8VAwWHQR3mCUWAfxaItM/l/uaRVE0iGXBYcUC1aHqGi5KjX5uzngnMQtXvL1JWmsKCKpP/7S7SBQukN+RAe4L4RpX4qDhJ+fw/zJCRqnlMpq29NN3bcligPVFlXobjeXlyeHa+AS6pHcUkzOgfiUVVaY8ctSYKXdfND4521hAh9+HAGicGesL6Uiv81kILb3BchPngSn2LofIx1AN9fwqqdScxQB7JkJXiEOsCOtN3CrbCt+r2ec3V7Bx7j4MKt5apRovSWs1rH1C1hE8y2MZuBoAOEYSrK+i/tyPQMYoftda0TMtVAU8IqBRQcgB7TYVI2wqePhFpRVgCZFi34MMylgG1a9T0dJhT/MqE8mh2t3Esm0mdK5Nvut5moBGv0tqMIuEhAXjsu0VdtL253GHkZArmeJG2ERA3YZiJ8oJ12cVmb14d25AFlsr5TyaAbjUxj6Ke9HRmOqKQ5T9+CqMwxygNzq3KF1r/0gnlsv7kOmda0ZaAl1BTxlQ3U443ElNiKOpZDdSloYXCHPBP2UOD23fqWW5Xmt++nW0OQILXIvgZqYii5b+IvxFVRXs37usIMRqjEciNWG9atL2xEnqwSC5XR9LihSP5WAvYG2C5AzsLrOOkcKHyqPNfsG49dagcWTh7Wusc3O4DuOfGfZkrqB6qNGVg5TXYyCcHugQoAAEQoycKb8ChhC9f4EilVReu7cRCV8NvX6cU++4sfaP22xmDRnbu+DOjtIhgt063p0rXcStXibDA3GFJagAMB27b92ksdkRD7RHbxYDM5u8mktlwb2iQ4dzwBGo4Wnvvkd/st21QwJjc41s8ck1oySY4Wfo/RLZIKLbmhPYn8Cfx+7nqj3nf9N0chKZpzuB39lPGwB/8TTCQPcpfGhMf03QwPXlDVbdSK2cytax0SAXrh+dKFbVboCcUUrB0ZQ3CNMUypwbgEhx9vHAq1zoOHAsmISrmPK6hQy4hkbqSyqrhdxyMngEuChS7F1nzSMQ7TE5xihUEECStYdhntk68nmt+003rrSn4z0CsW+ql2cabbl3WBDpxt2yT6n69T7Xo8z86a7idtICBmfdUIEBHDOc1StHqA32gkrkeG9tB6KnEfQLhe2MJZ0/2byO9hlXySoZQXsTeqg7U6LPL/58l7nKMnXVrLitF0/qMJ3p/bf9sGy02Vcfo+RvCAALPfULL1ruqMneZtRxenAqf5ufysVUy8qK4zkeNefPmVgqDN2wUFIfcw+zQrNFVgX1ssAFwzo1EMt+sgPWT7kg9Kd3USGbgcN0BsML3+oclO3Z+lXSz2aDngRt0G3z3icWIhN0TFDy6fcbpJjuQZyRsEE9mtcbzC2eF80Vq+V95sSZpqoeaBkL0UMsUOXqqS7FV0fMkn8uWidQzaFVot/99SS7iw/DoKwd7QyR8UnOVTnQ5m0DNrC4u7hk+QkNPUaA5yBAz7Bat6xtHxUrSEk4UrqTYoZJbvxsiEZf8YXb1HwQS615WyAbA7DEpp2i8H57DpR8ZG+XL4OBxM/sqj7V/tYiIAy7Z/fqCACga8jDfrLMDBkH1Rgeef7GZ2nKP3u/J5UmoWky+DfU8KRXY0Zzi3Gig1Py6RZFHh/OOGjsEtXYDBViVaGCYxeGjUOr9BfS5CLhcFk1MQHgXhghokhsDCq/ajeVG/kOCRIvvWgap1KQFPL2+9fxnEbi2+xFGmywvzDXzmUGHANbu87yW3kqwWTalyzphzME5ODR/snjZI26CSxTEVZCClVaJGQgVpiEx5zXg5VwBpj00IgNXlgo85HhxAUHfw4K/MtRNh2M0DWmQ2UMMIyOGp9uAmI5goiSq4xC3azAXMEbDOfWrZnRrz14Y20S2TMuHIXvNJX0BAAntDKYeIZySakVNQTNjJSZw1cZWeMsbKXbtP0PxT2n6HxwEz+b6MVPDAl5Ah3MG8OT17zDPkMnGcZ8pDg/poQZTJMHkOqA3tLC/RCSJFGfYKOwVMB28Tk5qdvvLkkTMgH6EsDIHV3yO9kdbObOWEKLgFafnPaOuaHgwx80Uk+xadNq5HHvX5O/xW8J35B2SITUw0ey58HXKaUEZBN/bLV/Au/V9Ejpkkvytx69TADvvObZtNOtjkNxq6cizhxF3ZN33k857XuK20QtvWTSzj6ZONUijXfRaIZ6y5Da51mzi7aCzGubo6pyq5bTNXiFjQ9SSNef4rLwe4WjHNAz53k34uJ1jMrxQH37YjeDgZ61jkmaSHQgr8pnvPJ1FKBy5t6z96q3xtpAacFc+H2LEu1Nri7AwcU16n2PgD8MQmNthvGPvg3r0dXw9S5RNS8dN/GUDKs/Emg1+infiN6lKRWc39FprS1RC7Rco3w7ix7oOPIjst3IcKVY5xb6jE82BixauoL26z8tS24ZxM9zN4c1mHb3d3kFDyoHXtUAAAAAAAAAAAAAAAAAAAA=";
const EMBED_OK = !/claude\.ai|claudeusercontent|anthropic/.test(location.hostname + " " + document.referrer);
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const esc = (s) => String(s != null ? s : "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const today = () => {
  const d = /* @__PURE__ */ new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
};
const fmtDate = (d) => d ? d.split("-").reverse().join("/") : "—";
const curso = (id) => CURSOS.find((c) => c.id === id);
function star(n, color = "#C9A24A", s = 14) {
  let o = "";
  for (let i = 0; i < n; i++) o += `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" fill="${color}"/></svg>`;
  return o;
}
function show(el, text, kind) {
  el.className = "msg " + kind;
  el.textContent = text;
  el.classList.remove("hidden");
}
function toEmbed(url) {
  if (!url) return "";
  let m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/);
  if (m) return `https://www.youtube.com/embed/${m[1]}?rel=0&modestbranding=1`;
  m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (m) return `https://player.vimeo.com/video/${m[1]}`;
  m = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (m) return `https://drive.google.com/file/d/${m[1]}/preview`;
  return url;
}
function isStorage(u) {
  return /^storage:/.test(u || "");
}
function pdfEmbed(url) {
  if (!url) return "";
  const m = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
  return m ? `https://drive.google.com/file/d/${m[1]}/preview` : url;
}
function modal(html, onReady) {
  const root = $("#modalRoot");
  root.innerHTML = `<div class="modal" role="dialog" aria-modal="true"><div class="box">${html}</div></div>`;
  const close = () => root.innerHTML = "";
  root.querySelector(".modal").addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) close();
  });
  root.querySelectorAll("[data-close]").forEach((b) => b.onclick = close);
  onReady && onReady(root, close);
}
function confirmBox(text, onYes) {
  modal(
    `<h3>Confirmar</h3><p>${esc(text)}</p><div class="acts"><button class="btn btn-line" data-close>Cancelar</button><button class="btn btn-red" id="yes">Confirmar</button></div>`,
    (r, close) => {
      r.querySelector("#yes").onclick = async () => {
        close();
        await onYes();
      };
    }
  );
}
function SupaBackend() {
  const sb = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
  const site = CONFIG.SITE_URL || location.origin + location.pathname;
  const err = (r) => {
    if (r.error) throw new Error(traduz(r.error.message));
    return r.data;
  };
  return {
    demo: false,
    async carteirinhas() {
      return err(await sb.from("carteirinhas_pdf").select("*").eq("user_id", S.user.id)) || [];
    },
    async avisosPessoais() {
      return err(await sb.from("notificacoes").select("*").eq("user_id", S.user.id).order("criado_em", { ascending: false }).limit(100)) || [];
    },
    async lerAvisos(ids) {
      if (ids.length) err(await sb.rpc("ler_notificacoes", { p_ids: ids }));
    },
    async links() {
      const { data } = await sb.rpc("etu_links");
      return data && data[0] || {};
    },
    async linksSalvar(g, y) {
      err(await sb.rpc("etu_links_salvar", { p_grupo: g, p_youtube: y }));
    },
    async mensagensAnimo() {
      return err(await sb.from("mensagens_animo").select("*").eq("ativa", true)) || [];
    },
    async animoConfig() {
      const r = err(await sb.rpc("animo_config"));
      return r && r[0] || null;
    },
    async animoSalvar(ativo, dias, modo) {
      err(await sb.rpc("animo_config_salvar", { p_ativo: ativo, p_dias: dias, p_modo: modo }));
    },
    async animoParados() {
      return err(await sb.rpc("animo_parados")) || [];
    },
    async animoPreparar(uid) {
      const r = err(await sb.rpc("animo_preparar", { p_user: uid }));
      return r && r[0];
    },
    async animoRegistrar(uid, msg, texto, canais) {
      err(await sb.rpc("animo_registrar", { p_user: uid, p_mensagem: msg, p_texto: texto, p_origem: "manual", p_canais: canais }));
    },
    async animoEnviar(uid, canais) {
      const { data, error } = await sb.functions.invoke("animo", { body: { aluno: uid, canais } });
      if (error) throw new Error("O envio automático ainda não está ativado no servidor.");
      if (data == null ? void 0 : data.erro) throw new Error(data.erro);
      return data;
    },
    async animoVapid() {
      const { data } = await sb.rpc("animo_vapid");
      return data || null;
    },
    async pushSalvar(s) {
      const j = s.toJSON();
      err(await sb.from("push_inscricoes").upsert({ endpoint: j.endpoint, user_id: S.user.id, p256dh: j.keys.p256dh, auth: j.keys.auth }));
    },
    async publicarCarteirinha(uid, cid, file) {
      var _a;
      if (!((_a = S.profile) == null ? void 0 : _a.is_admin)) throw new Error("Exclusivo da Direção.");
      await validarCarteirinhaPDF(file);
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      const path = uid + "/" + cid + "/" + Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("") + ".pdf";
      err(await sb.storage.from("carteirinhas").upload(path, file, { contentType: "application/pdf", upsert: false }));
      err(await sb.rpc("publicar_carteirinha", { p_aluno: uid, p_curso: cid, p_arquivo: path }));
    },
    async baixarCarteirinha(cid) {
      const card = err(await sb.from("carteirinhas_pdf").select("arquivo").eq("user_id", S.user.id).eq("curso_id", cid).single());
      return err(await sb.storage.from("carteirinhas").createSignedUrl(card.arquivo, 120, { download: "carteirinha-ETU.pdf" })).signedUrl;
    },
    async registrarDoc(tipo, cid) {
      const r = await sb.rpc("registrar_documento", { p_tipo: tipo, p_curso: cid });
      if (r.error) return null;
      return r.data;
    },
    async validarDoc(cod) {
      return err(await sb.rpc("validar_documento", { p_codigo: cod })) || [];
    },
    async nota(aid) {
      var _a;
      if (!S.user) return "";
      const r = await sb.from("anotacoes").select("texto").eq("user_id", S.user.id).eq("aula_id", aid).maybeSingle();
      return ((_a = r.data) == null ? void 0 : _a.texto) || "";
    },
    async salvarNota(aid, t) {
      err(await sb.from("anotacoes").upsert({ user_id: S.user.id, aula_id: aid, texto: t, atualizado_em: (/* @__PURE__ */ new Date()).toISOString() }));
    },
    async canais() {
      const r = await sb.from("canais_oficiais").select("*").order("id");
      return (r.data && r.data.length ? r.data : CANAIS_PADRAO).map((c) => __spreadProps(__spreadValues({}, c), { valor: etuMascaraCNPJ(c.valor) }));
    },
    async salvarCanal(c) {
      err(await sb.from("canais_oficiais").insert(c));
    },
    async apagarCanal(id) {
      err(await sb.from("canais_oficiais").delete().eq("id", id));
    },
    async perguntarDirecao(msgs) {
      const { data, error } = await sb.functions.invoke("assistente", { body: { mensagens: msgs, modo: "direcao" } });
      if (error) throw new Error("O assistente não respondeu agora. Tente novamente em instantes.");
      if (data == null ? void 0 : data.erro) throw new Error(data.erro);
      return data;
    },
    async lancamentos() {
      return err(await sb.from("lancamentos").select("*").order("data", { ascending: false }).limit(5e3));
    },
    async salvarLancamento(l) {
      return err(await sb.from("lancamentos").insert(l).select("id").single());
    },
    async anexarCaixa(file, mes) {
      const m = /^\d{4}-\d{2}$/.test(mes || "") ? mes : today().slice(0, 7);
      const ext = ((file.name || "").split(".").pop() || "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5) || (file.type === "application/pdf" ? "pdf" : "jpg");
      const nome = m.slice(0, 4) + "/" + m.slice(5, 7) + "/" + Date.now() + "-" + Math.random().toString(36).slice(2, 8) + "." + ext;
      err(await sb.storage.from("caixa").upload(nome, file, { contentType: file.type || "application/octet-stream", upsert: false }));
      return nome;
    },
    async linkCaixa(nome, baixar) {
      return err(await sb.storage.from("caixa").createSignedUrl(nome, 300, baixar ? { download: true } : void 0)).signedUrl;
    },
    async anexoLancamento(id, nome) {
      err(await sb.from("lancamentos").update({ anexo: nome }).eq("id", id));
    },
    async contasPagar() {
      return err(await sb.from("contas_pagar").select("*").order("vencimento", { ascending: true }).limit(2e3));
    },
    async salvarContaPagar(c) {
      return err(await sb.from("contas_pagar").insert(c).select("id").single());
    },
    async alterarContaPagar(id, c) {
      err(await sb.from("contas_pagar").update(c).eq("id", id));
    },
    async apagarContaPagar(id) {
      err(await sb.from("contas_pagar").delete().eq("id", id));
    },
    async declaracoesMei() {
      return err(await sb.from("declaracoes_mei").select("*"));
    },
    async salvarDeclaracaoMei(d) {
      err(await sb.from("declaracoes_mei").upsert(d));
    },
    async apagarDeclaracaoMei(a) {
      err(await sb.from("declaracoes_mei").delete().eq("ano_ref", a));
    },
    async apagarLancamento(id) {
      err(await sb.from("lancamentos").delete().eq("id", id));
    },
    async perguntarContador(msgs, modo = "contabil") {
      const { data, error } = await sb.functions.invoke("assistente", { body: { mensagens: msgs, modo } });
      if (error) throw new Error("O assistente não respondeu agora. Tente novamente em instantes.");
      if (data == null ? void 0 : data.erro) throw new Error(data.erro);
      return data;
    },
    async atualizarConta(d) {
      var _a, _b, _c;
      if (d && d.nome && !((_a = S.profile) == null ? void 0 : _a.is_admin) && etuNomeReservado(d.nome, "")) {
        etuAlertaSeg("tentativa de trocar o nome da conta", d.nome, ((_b = S.user) == null ? void 0 : _b.email) || "", ((_c = S.profile) == null ? void 0 : _c.telefone) || "", etuNomeReservado(d.nome, ""));
        throw new Error("Este nome é reservado à Direção da Escola Teológica União.");
      }
      return this._atualizarConta(d);
    },
    async _atualizarConta(d) {
      var _a;
      const { data: { user } } = await sb.auth.getUser();
      if (!user) throw new Error("Entre novamente.");
      const v = await sb.auth.signInWithPassword({ email: user.email, password: d.atual });
      if (v.error) throw new Error("A senha atual não confere.");
      const up = {};
      if (d.email && d.email.toLowerCase() !== user.email.toLowerCase()) up.email = d.email;
      if (d.pw) up.password = d.pw;
      if (Object.keys(up).length) err(await sb.auth.updateUser(up));
      if (d.nome || d.telefone !== void 0) err(await sb.rpc("atualizar_meu_perfil", { p_nome: d.nome || null, p_telefone: (_a = d.telefone) != null ? _a : null }));
      return up.email ? "Enviamos um e-mail de confirmação para o novo endereço; a troca vale depois que você confirmar." : "";
    },
    async mensagens(sala) {
      var _a;
      return ((_a = err(await sb.from("mensagens").select("id,sala,user_id,nome,is_direcao,texto,criado_em").eq("sala", sala).eq("apagada", false).order("criado_em", { ascending: false }).limit(80))) == null ? void 0 : _a.reverse()) || [];
    },
    async enviarMensagem(sala, texto) {
      err(await sb.from("mensagens").insert({ sala, texto }));
    },
    async apagarMensagem(id) {
      err(await sb.from("mensagens").update({ apagada: true }).eq("id", id));
    },
    ouvirMensagens(sala, cb) {
      const ch = sb.channel("sala-" + sala).on("postgres_changes", { event: "*", schema: "public", table: "mensagens", filter: "sala=eq." + sala }, () => cb()).subscribe();
      return () => sb.removeChannel(ch);
    },
    async escolaConfig() {
      const r = await sb.from("escola_config").select("*").eq("id", 1).maybeSingle();
      return r.data || null;
    },
    async saveEscolaConfig(c) {
      err(await sb.from("escola_config").upsert(__spreadValues({ id: 1 }, c)));
    },
    async aiPublico() {
      const r = await sb.rpc("assistente_publico");
      if (r.error) return null;
      return r.data && r.data[0] || null;
    },
    async aiConfig() {
      return err(await sb.from("assistente_config").select("*").eq("id", 1).maybeSingle());
    },
    async saveAiConfig(c) {
      err(await sb.from("assistente_config").upsert(__spreadProps(__spreadValues({}, c), { id: 1, atualizado_em: (/* @__PURE__ */ new Date()).toISOString() })));
    },
    async aiLog() {
      return err(await sb.from("assistente_log").select("*").order("criado_em", { ascending: false }).limit(60));
    },
    async perguntar(msgs) {
      const { data, error } = await sb.functions.invoke("assistente", { body: { mensagens: msgs } });
      if (error) throw new Error("O assistente não respondeu agora. Tente novamente em instantes ou toque em “Falar com a direção”.");
      if (data == null ? void 0 : data.erro) throw new Error(data.erro);
      return data;
    },
    async abrirAtendimento(a) {
      err(await sb.rpc("abrir_atendimento", { p_nome: a.nome, p_contato: a.contato, p_mensagem: a.mensagem, p_conversa: a.conversa }));
    },
    async atendimentos() {
      return err(await sb.from("atendimentos").select("*").order("criado_em", { ascending: false }).limit(200));
    },
    async salvarAtendimento(id, c) {
      err(await sb.from("atendimentos").update(c).eq("id", id));
    },
    async apagarAtendimento(id) {
      err(await sb.from("atendimentos").delete().eq("id", id));
    },
    async apagarAiLog() {
      err(await sb.from("assistente_log").delete().gt("id", 0));
    },
    onAuth(cb) {
      sb.auth.onAuthStateChange((ev, s) => cb(ev, (s == null ? void 0 : s.user) || null));
    },
    async session() {
      var _a;
      const { data } = await sb.auth.getSession();
      return ((_a = data.session) == null ? void 0 : _a.user) || null;
    },
    async signIn(email, pw) {
      err(await sb.auth.signInWithPassword({ email, password: pw }));
    },
    async signUp(nome, tel, email, pw, interesse) {
      err(await sb.auth.signUp({ email, password: pw, options: { data: { nome, telefone: tel, interesse }, emailRedirectTo: site } }));
    },
    async signOut() {
      await sb.auth.signOut();
    },
    async forgot(email) {
      err(await sb.auth.resetPasswordForEmail(email, { redirectTo: site }));
    },
    async newPassword(pw) {
      err(await sb.auth.updateUser({ password: pw }));
    },
    async profile(uid) {
      return err(await sb.from("perfis").select("*").eq("id", uid).maybeSingle());
    },
    async aulas() {
      return err(await sb.from("aulas").select("*").order("disc_ordem").order("ordem"));
    },
    async cursos() {
      return err(await sb.from("cursos").select("*").order("ordem")).map((c) => __spreadProps(__spreadValues({}, c), { desc: c.descricao }));
    },
    async disciplinas() {
      return err(await sb.from("disciplinas").select("*").order("ordem"));
    },
    async estudos() {
      return err(await sb.from("estudos").select("*").order("ordem"));
    },
    async saveEstudo(e) {
      const row = { tipo: e.tipo, titulo: e.titulo, descricao: e.descricao, pdf_url: e.pdf_url, ordem: e.ordem || 0, ativo: e.ativo !== false };
      e.id ? err(await sb.from("estudos").update(row).eq("id", e.id)) : err(await sb.from("estudos").insert(row));
    },
    async delEstudo(id) {
      err(await sb.from("estudos").delete().eq("id", id));
    },
    async saveDisciplinas(cid, list) {
      err(await sb.from("disciplinas").delete().eq("curso_id", cid));
      if (list.length) err(await sb.from("disciplinas").insert(list.map((d, i) => ({ curso_id: cid, ordem: i + 1, nome: d.nome, descricao: d.descricao || null }))));
    },
    async saveCurso(c, novo) {
      const row = { titulo: c.titulo, cat: c.cat, tipo: c.tipo, nivel: c.nivel || 0, descricao: c.desc, capa: c.capa || null, ordem: c.ordem || 0, ativo: c.ativo !== false, oferece_certificado: c.oferece_certificado === true, em_breve: c.em_breve === true };
      novo ? err(await sb.from("cursos").insert(__spreadValues({ id: c.id }, row))) : err(await sb.from("cursos").update(row).eq("id", c.id));
    },
    async conteudo(id) {
      var _a, _b, _c, _d, _e, _f;
      const r1 = await sb.from("aulas_conteudo").select("aula_id,video_url,audio_url").eq("aula_id", id).maybeSingle();
      const r2 = await sb.from("aulas_apostila").select("pdf_url").eq("aula_id", id).maybeSingle();
      if (!r1.data && !r2.data) return null;
      let pdf = ((_a = r2.data) == null ? void 0 : _a.pdf_url) || "";
      if (isStorage(pdf)) {
        const [b, ...p] = pdf.slice(8).split("/");
        const sg = await sb.storage.from(b).createSignedUrl(p.join("/"), 3600);
        pdf = ((_b = sg.data) == null ? void 0 : _b.signedUrl) || "";
      }
      const assina = async (u) => {
        var _a2;
        if (!isStorage(u)) return u || "";
        const [b, ...p] = u.slice(8).split("/");
        const sg = await sb.storage.from(b).createSignedUrl(p.join("/"), 3600 * 4);
        return ((_a2 = sg.data) == null ? void 0 : _a2.signedUrl) || "";
      };
      return { aula_id: id, video_url: await assina((_c = r1.data) == null ? void 0 : _c.video_url), video_raw: ((_d = r1.data) == null ? void 0 : _d.video_url) || "", audio_url: await assina((_e = r1.data) == null ? void 0 : _e.audio_url), audio_raw: ((_f = r1.data) == null ? void 0 : _f.audio_url) || "", pdf_url: pdf };
    },
    async apostilaBruta(id) {
      var _a;
      const r = await sb.from("aulas_apostila").select("pdf_url").eq("aula_id", id).maybeSingle();
      return ((_a = r.data) == null ? void 0 : _a.pdf_url) || "";
    },
    async enviarArquivo(file, publico) {
      const bucket = publico ? "materiais" : "apostilas";
      const nome = Date.now() + "-" + file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w.-]+/g, "_");
      err(await sb.storage.from(bucket).upload(nome, file, { contentType: file.type || "application/octet-stream", upsert: false }));
      return publico ? sb.storage.from(bucket).getPublicUrl(nome).data.publicUrl : "storage:" + bucket + "/" + nome;
    },
    async listarArquivos() {
      const out = [];
      for (const b of ["apostilas", "materiais"]) {
        const r = await sb.storage.from(b).list("", { limit: 500, sortBy: { column: "created_at", order: "desc" } });
        (r.data || []).filter((f) => f.name && !f.name.startsWith(".")).forEach((f) => {
          var _a;
          return out.push({ bucket: b, nome: f.name, tam: ((_a = f.metadata) == null ? void 0 : _a.size) || 0 });
        });
      }
      return out;
    },
    async linkArquivo(b, n) {
      var _a;
      if (b === "materiais") return sb.storage.from(b).getPublicUrl(n).data.publicUrl;
      const r = await sb.storage.from(b).createSignedUrl(n, 3600, { download: true });
      return (_a = r.data) == null ? void 0 : _a.signedUrl;
    },
    async salvarFoto(dataUrl) {
      err(await sb.rpc("salvar_foto", { p_foto: dataUrl }));
    },
    async enviarComprovante(cid, valor, arquivo) {
      return err(await sb.rpc("enviar_comprovante", { p_curso: cid, p_valor: valor, p_arquivo: arquivo }));
    },
    async meusComprovantes(uid) {
      return err(await sb.from("comprovantes").select("id,curso_id,valor,status,criado_em,obs").eq("user_id", uid).order("criado_em", { ascending: false }));
    },
    async comprovantes() {
      return err(await sb.from("comprovantes").select("id,user_id,curso_id,valor,status,criado_em,obs").order("criado_em", { ascending: false }));
    },
    async comprovanteArquivo(id) {
      return err(await sb.from("comprovantes").select("arquivo").eq("id", id).single()).arquivo;
    },
    async decidirComprovante(id, aprovar, expira, obs) {
      err(await sb.rpc("decidir_comprovante", { p_id: id, p_aprovar: aprovar, p_expira: expira || null, p_obs: obs || null }));
    },
    async minhasMatriculas(uid) {
      return err(await sb.from("matriculas").select("*").eq("user_id", uid));
    },
    async progresso(uid) {
      return err(await sb.from("progresso").select("aula_id").eq("user_id", uid)).map((r) => r.aula_id);
    },
    async marcar(uid, aid, feito) {
      feito ? err(await sb.from("progresso").upsert({ user_id: uid, aula_id: aid })) : err(await sb.from("progresso").delete().eq("user_id", uid).eq("aula_id", aid));
    },
    async alunos() {
      const ps = err(await sb.from("perfis").select("*").order("criado_em", { ascending: false }));
      const ms = err(await sb.from("matriculas").select("*"));
      return ps.map((p) => __spreadProps(__spreadValues({}, p), { matriculas: ms.filter((m) => m.user_id === p.id) }));
    },
    async setMatricula(uid, cid, status, expira) {
      err(await sb.from("matriculas").upsert({ user_id: uid, curso_id: cid, status, expira_em: expira || null }, { onConflict: "user_id,curso_id" }));
    },
    async delMatricula(uid, cid) {
      err(await sb.from("matriculas").delete().eq("user_id", uid).eq("curso_id", cid));
    },
    async setBloqueio(uid, bloq) {
      err(await sb.from("perfis").update({ bloqueado: bloq }).eq("id", uid));
    },
    async questoes(aid) {
      return err(await sb.rpc("questoes_aluno", { p_aula: aid })) || [];
    },
    async questoesAdmin(aid) {
      return err(await sb.rpc("questoes_admin", { p_aula: aid })) || [];
    },
    async saveQuestoes(aid, list) {
      err(await sb.from("questoes").delete().eq("aula_id", aid));
      if (list.length) err(await sb.from("questoes").insert(list.map((q, i) => ({ aula_id: aid, ordem: i + 1, enunciado: q.enunciado, alternativas: q.alternativas, correta: q.correta, explicacao: q.explicacao || null }))));
    },
    async corrigir(aid, resp) {
      return err(await sb.rpc("corrigir_prova", { p_aula: aid, p_resp: resp }));
    },
    async tentativas(uid) {
      return err(await sb.from("tentativas").select("aula_id,nota,aprovado,criado_em").eq("user_id", uid));
    },
    async tentativasTodas() {
      return err(await sb.from("tentativas").select("user_id,aula_id,nota,aprovado,criado_em"));
    },
    async fichaObs(uid) {
      const r = await sb.from("ficha_obs").select("texto,atualizado_em").eq("user_id", uid).maybeSingle();
      if (r.error) throw new Error("Rode o arquivo 09_ficha.sql no Supabase para guardar as anotações.");
      return r.data || { texto: "" };
    },
    async salvarFichaObs(uid, t) {
      err(await sb.from("ficha_obs").upsert({ user_id: uid, texto: t, atualizado_em: (/* @__PURE__ */ new Date()).toISOString() }, { onConflict: "user_id" }));
    },
    async todosProgressos() {
      return err(await sb.from("progresso").select("user_id,aula_id"));
    },
    async mural() {
      return err(await sb.from("mural").select("*").order("criado_em", { ascending: false }));
    },
    async saveMural(m) {
      const row = { tipo: m.tipo, titulo: m.titulo, texto: m.texto, video_url: m.video_url };
      m.id ? err(await sb.from("mural").update(row).eq("id", m.id)) : err(await sb.from("mural").insert(row));
    },
    async delMural(id) {
      err(await sb.from("mural").delete().eq("id", id));
    },
    async votar(mid, op) {
      err(await sb.from("enquete_votos").upsert({ mural_id: mid, user_id: S.user.id, opcao: op }, { onConflict: "mural_id,user_id" }));
    },
    async meusVotos() {
      if (!S.user) return [];
      return err(await sb.from("enquete_votos").select("mural_id,opcao").eq("user_id", S.user.id));
    },
    async resultado(mid) {
      return err(await sb.rpc("enquete_resultado", { p_mural: mid }));
    },
    async saveAula(a, c) {
      const row = { curso_id: a.curso_id, modulo: a.modulo, disc_ordem: a.disc_ordem || 1, ordem: a.ordem, titulo: a.titulo, descricao: a.descricao, previa: a.previa, horas: a.horas || 0, previa_texto: a.previa_texto || null, apostila_amostra: !!a.apostila_amostra };
      let id = a.id;
      if (id) err(await sb.from("aulas").update(row).eq("id", id));
      else id = err(await sb.from("aulas").insert(row).select("id").single()).id;
      err(await sb.from("aulas_conteudo").upsert({ aula_id: id, video_url: c.video_url, audio_url: c.audio_url || null }));
      err(await sb.from("aulas_apostila").upsert({ aula_id: id, pdf_url: c.pdf_url }));
      return id;
    },
    async delAula(id) {
      err(await sb.from("aulas").delete().eq("id", id));
    }
  };
}
function traduz(m) {
  const t = {
    "Invalid login credentials": "E-mail ou senha incorretos.",
    "Email not confirmed": "Confirme o seu e-mail pelo link que enviamos antes de entrar.",
    "User already registered": "Este e-mail já está cadastrado.",
    "Password should be at least 6 characters.": "A senha deve ter pelo menos 6 caracteres."
  };
  return t[m] || m;
}
const PREVIA_B1 = `“Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar, que maneja bem a palavra da verdade.” (2 Timóteo 2.15)

Paulo escreve a Timóteo, jovem pastor em Éfeso, cercado de homens que se desviavam da verdade e pervertiam a fé de alguns (2 Timóteo 2.16-18). Diante disso, o apóstolo não manda Timóteo improvisar: manda-o manejar bem a Palavra. A expressão traduzida por “maneja bem” traz a ideia de cortar em linha reta, de traçar um caminho direito — ensinar a verdade sem torcê-la para nenhum lado.

Aplicação: estudar teologia não é luxo de poucos; é responsabilidade de quem foi chamado a servir. Quem ama a Deus deseja conhecê-lo como Ele se revelou, e quem ensina precisa ensinar com fidelidade. O púlpito não é lugar de achismo: é lugar de Palavra bem manejada.

Na aula completa você vai estudar por que todo cristão faz teologia, os perigos da ignorância bíblica, o exemplo dos bereanos (Atos 17.11) e o preparo para responder com mansidão a quem pede a razão da nossa esperança (1 Pedro 3.15).`;
function DemoBackend() {
  const KEY = "etu_demo_v14";
  let mem = null;
  const listeners = [];
  const uid = () => Math.random().toString(36).slice(2, 10);
  function seed() {
    const adm = { id: "adm", email: "7094a824cd68673e@invalido", pw: "438fd2a50dfea1d8aa7f8dcc2ecc19e5", nome: "Pr. Charlei de Jesus Lima Dias", telefone: "", is_admin: true, bloqueado: false, criado_em: "2026-11-01" };
    const alu = { id: "a1", email: "4364e8f11a399749@invalido", pw: "cb16f3d3474de27bbcd178ee95c46e1f", nome: "Aluno de Demonstração", telefone: "(00) 0 0000-0000", interesse: "basico", is_admin: false, bloqueado: false, criado_em: "2026-11-05" };
    const aulas = [
      { id: "b1", curso_id: "basico", modulo: "Introdução à Teologia", ordem: 1, titulo: "Por que estudar teologia?", descricao: "A importância do estudo sério das Escrituras para todo cristão e para o obreiro.", previa: true },
      { id: "b2", curso_id: "basico", modulo: "Introdução à Teologia", ordem: 2, titulo: "Mitos e verdades sobre o estudo da teologia", descricao: "Respostas bíblicas às objeções mais comuns contra o estudo teológico.", previa: false },
      { id: "b3", curso_id: "basico", modulo: "Introdução à Teologia", ordem: 3, titulo: "O que é teologia", descricao: "O sentido da palavra, as áreas da teologia e o seu lugar na vida da Igreja.", previa: false },
      { id: "b4", curso_id: "basico", modulo: "Introdução à Teologia", ordem: 4, titulo: "A Teologia Sistemática", descricao: "Como as doutrinas bíblicas são organizadas e estudadas.", previa: false }
    ];
    const conteudo = aulas.map((a) => ({ aula_id: a.id, video_url: "", pdf_url: "https://drive.google.com/file/d/1d-vKMNuG4fGW0ktu3URdR0oGnyxihmkr/view" }));
    aulas.forEach((a) => {
      a.horas = 2;
      a.disc_ordem = 1;
    });
    aulas[0].previa_texto = PREVIA_B1;
    aulas[0].apostila_amostra = true;
    const questoes = [
      { id: "q1", aula_id: "b1", ordem: 1, enunciado: "Segundo 2 Timóteo 2.15, como o obreiro deve manejar a palavra da verdade?", alternativas: ["Com pressa, para alcançar mais pessoas", "Bem, procurando apresentar-se a Deus aprovado", "Apenas pela tradição recebida dos pais", "Somente com base em experiências pessoais", "Sem necessidade de estudo, apenas pela inspiração do momento"], correta: 1 },
      { id: "q2", aula_id: "b1", ordem: 2, enunciado: "Qual atitude os bereanos tiveram diante da pregação de Paulo (Atos 17.11)?", alternativas: ["Rejeitaram a mensagem sem ouvir", "Aceitaram tudo sem examinar", "Examinavam cada dia nas Escrituras se as coisas eram assim", "Pediram sinais antes de crer", "Consultaram os filósofos de Atenas"], correta: 2 },
      { id: "q3", aula_id: "b1", ordem: 3, enunciado: "De acordo com 1 Pedro 3.15, o cristão deve estar sempre preparado para:", alternativas: ["Discutir com ira contra os que discordam", "Evitar qualquer pergunta sobre a fé", "Responder com mansidão e temor a todo aquele que pedir a razão da sua esperança", "Impor a fé pela força", "Responder apenas aos líderes religiosos"], correta: 2 }
    ];
    const mural = [
      { id: "m1", tipo: "Aviso", titulo: "Matrículas abertas para o Curso Básico de Teologia", texto: "Inscreva-se, assista à aula grátis e matricule-se via Pix para liberar o curso completo.", video_url: "", criado_em: "2026-11-07" }
    ];
    return { estudos: ESTUDOS_PADRAO.map((e) => __spreadValues({}, e)), disciplinas: DISC_PADRAO.map((d) => __spreadValues({}, d)), cursos: CURSOS.map((c) => __spreadProps(__spreadValues({}, c), { ativo: c.ativo !== false })), users: [adm, alu], session: null, aulas, conteudo, questoes, mural, tentativas: [], matriculas: [{ user_id: "a1", curso_id: "basico", status: "ativo", expira_em: "2027-11-07" }], progresso: [] };
  }
  function load() {
    if (mem) return mem;
    try {
      mem = JSON.parse(localStorage.getItem(KEY));
    } catch (e) {
    }
    if (!mem) mem = seed();
    return mem;
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(mem));
    } catch (e) {
    }
  }
  const db = load();
  const me = () => db.users.find((u) => u.id === db.session);
  const pub = (u) => u ? { id: u.id, email: u.email } : null;
  const fire = (ev) => listeners.forEach((f) => f(ev, pub(me())));
  return {
    demo: true,
    onAuth(cb) {
      listeners.push(cb);
    },
    async session() {
      return pub(me());
    },
    async signIn(email, pw) {
      const u = db.users.find((u2) => u2.email.toLowerCase() === email.toLowerCase());
      if (!u || u.pw !== pw) throw new Error("E-mail ou senha incorretos.");
      db.session = u.id;
      save();
      fire("SIGNED_IN");
    },
    async signUp(nome, tel, email, pw, interesse) {
      if (db.users.some((u2) => u2.email.toLowerCase() === email.toLowerCase())) throw new Error("Este e-mail já está cadastrado.");
      const u = { id: uid(), email, pw, nome, telefone: tel, interesse, is_admin: false, bloqueado: false, criado_em: today() };
      db.users.push(u);
      db.session = u.id;
      save();
      fire("SIGNED_IN");
    },
    async signOut() {
      db.session = null;
      save();
      fire("SIGNED_OUT");
    },
    async forgot(email) {
      const u = db.users.find((u2) => u2.email.toLowerCase() === email.toLowerCase());
      db.recovery = u ? u.id : null;
      save();
    },
    async newPassword(pw) {
      const id = db.session || db.recovery;
      const u = db.users.find((u2) => u2.id === id);
      if (!u) throw new Error("Link de redefinição inválido ou expirado.");
      u.pw = pw;
      db.recovery = null;
      save();
    },
    simulateRecovery() {
      if (db.recovery) {
        return true;
      }
      return false;
    },
    async profile(id) {
      const u = db.users.find((u2) => u2.id === id);
      return u ? __spreadValues({}, u) : null;
    },
    async aulas() {
      return db.aulas.slice().sort((a, b) => (a.disc_ordem || 1) - (b.disc_ordem || 1) || a.ordem - b.ordem);
    },
    async cursos() {
      return (db.cursos || []).map((c) => __spreadValues({}, c));
    },
    async disciplinas() {
      return (db.disciplinas || DISC_PADRAO).map((d) => __spreadValues({}, d));
    },
    async enviarArquivo() {
      throw new Error("No modo demonstração os arquivos não são guardados. Com a plataforma ativada (Supabase), o PDF fica armazenado na própria plataforma.");
    },
    async listarArquivos() {
      return [];
    },
    async linkArquivo() {
      return "";
    },
    async estudos() {
      return (db.estudos || ESTUDOS_PADRAO).map((e) => __spreadValues({}, e)).sort((a, b) => a.ordem - b.ordem);
    },
    async saveEstudo(e) {
      db.estudos = db.estudos || ESTUDOS_PADRAO.map((x) => __spreadValues({}, x));
      if (e.id) Object.assign(db.estudos.find((x) => x.id === e.id), e);
      else db.estudos.push(__spreadProps(__spreadValues({}, e), { id: uid() }));
      save();
    },
    async delEstudo(id) {
      db.estudos = (db.estudos || ESTUDOS_PADRAO.slice()).filter((x) => x.id !== id);
      save();
    },
    async saveDisciplinas(cid, list) {
      db.disciplinas = (db.disciplinas || DISC_PADRAO.slice()).filter((d) => d.curso_id !== cid).concat(list.map((d, i) => ({ curso_id: cid, ordem: i + 1, nome: d.nome, descricao: d.descricao || "" })));
      save();
    },
    async saveCurso(c, novo) {
      db.cursos = db.cursos || [];
      if (novo) {
        if (db.cursos.some((x) => x.id === c.id)) throw new Error("Já existe um curso com esse nome.");
        db.cursos.push(__spreadValues({}, c));
      } else Object.assign(db.cursos.find((x) => x.id === c.id), c);
      save();
    },
    async conteudo(id) {
      const a = db.aulas.find((x) => x.id === id);
      const u = me();
      const p = u && db.users.find((x) => x.id === u.id);
      const ok = a && (a.previa || p && p.is_admin || p && !p.bloqueado && db.matriculas.some((m) => m.user_id === p.id && m.curso_id === a.curso_id && m.status === "ativo" && vigente(m.expira_em)));
      if (!ok) return null;
      const c = db.conteudo.find((c2) => c2.aula_id === id) || { aula_id: id };
      const full = p && p.is_admin || p && !p.bloqueado && db.matriculas.some((m) => m.user_id === p.id && m.curso_id === a.curso_id && m.status === "ativo" && vigente(m.expira_em));
      return __spreadProps(__spreadValues({}, c), { pdf_url: full || a.apostila_amostra ? c.pdf_url : "" });
    },
    async enviarComprovante(cid, valor, arq) {
      const u = me();
      if (!u) throw new Error("Entre na sua conta.");
      db.comprovantes = db.comprovantes || [];
      db.comprovantes.unshift({ id: uid(), user_id: u.id, curso_id: cid, valor, arquivo: arq, status: "pendente", criado_em: (/* @__PURE__ */ new Date()).toISOString() });
      let dias = 0;
      const d = CONFIG.LIBERACAO_PROVISORIA_DIAS;
      const m = db.matriculas.find((x) => x.user_id === u.id && x.curso_id === cid);
      const ativo = m && m.status === "ativo" && vigente(m.expira_em);
      if (d > 0 && !ativo) {
        const x = /* @__PURE__ */ new Date();
        x.setDate(x.getDate() + d);
        const e = x.toISOString().slice(0, 10);
        if (m) {
          m.status = "ativo";
          m.expira_em = e;
          m.provisoria = true;
        } else db.matriculas.push({ user_id: u.id, curso_id: cid, status: "ativo", expira_em: e, provisoria: true });
        dias = d;
      }
      save();
      return { dias };
    },
    async meusComprovantes(id) {
      return (db.comprovantes || []).filter((c) => c.user_id === id).map((_a) => {
        var _b = _a, { arquivo } = _b, c = __objRest(_b, ["arquivo"]);
        return c;
      });
    },
    async comprovantes() {
      return (db.comprovantes || []).map((_a) => {
        var _b = _a, { arquivo } = _b, c = __objRest(_b, ["arquivo"]);
        return c;
      });
    },
    async comprovanteArquivo(id) {
      var _a;
      return (_a = (db.comprovantes || []).find((c) => c.id === id)) == null ? void 0 : _a.arquivo;
    },
    async decidirComprovante(id, ok, exp, obs) {
      const c = db.comprovantes.find((x) => x.id === id);
      c.status = ok ? "aprovado" : "recusado";
      c.obs = obs || null;
      const m = db.matriculas.find((x) => x.user_id === c.user_id && x.curso_id === c.curso_id);
      if (ok) {
        if (m) {
          m.status = "ativo";
          m.expira_em = exp || null;
          m.provisoria = false;
        } else db.matriculas.push({ user_id: c.user_id, curso_id: c.curso_id, status: "ativo", expira_em: exp || null });
      } else if (m && m.provisoria) {
        db.matriculas = db.matriculas.filter((x) => x !== m);
      }
      save();
    },
    async salvarFoto(d) {
      const u = me();
      if (!u) throw new Error("Entre na sua conta.");
      db.users.find((x) => x.id === u.id).foto = d;
      save();
    },
    async minhasMatriculas(id) {
      return db.matriculas.filter((m) => m.user_id === id);
    },
    async progresso(id) {
      return db.progresso.filter((p) => p.user_id === id).map((p) => p.aula_id);
    },
    async marcar(u, a, f) {
      db.progresso = db.progresso.filter((p) => !(p.user_id === u && p.aula_id === a));
      if (f) db.progresso.push({ user_id: u, aula_id: a });
      save();
    },
    async alunos() {
      return db.users.slice().reverse().map((u) => __spreadProps(__spreadValues({}, u), { matriculas: db.matriculas.filter((m) => m.user_id === u.id) }));
    },
    async setMatricula(u, c, s, e) {
      const m = db.matriculas.find((m2) => m2.user_id === u && m2.curso_id === c);
      if (m) {
        m.status = s;
        m.expira_em = e || null;
      } else db.matriculas.push({ user_id: u, curso_id: c, status: s, expira_em: e || null });
      save();
    },
    async delMatricula(u, c) {
      db.matriculas = db.matriculas.filter((m) => !(m.user_id === u && m.curso_id === c));
      save();
    },
    async setBloqueio(u, b) {
      db.users.find((x) => x.id === u).bloqueado = b;
      save();
    },
    async saveAula(a, c) {
      let id = a.id;
      if (id) {
        Object.assign(db.aulas.find((x) => x.id === id), a);
      } else {
        id = uid();
        db.aulas.push(__spreadProps(__spreadValues({}, a), { id }));
      }
      const k = db.conteudo.find((x) => x.aula_id === id);
      if (k) Object.assign(k, c);
      else db.conteudo.push(__spreadValues({ aula_id: id }, c));
      save();
      return id;
    },
    async questoes(aid) {
      return db.questoes.filter((q) => q.aula_id === aid).sort((a, b) => a.ordem - b.ordem).map((_a) => {
        var _b = _a, { correta, explicacao } = _b, q = __objRest(_b, ["correta", "explicacao"]);
        return q;
      });
    },
    async questoesAdmin(aid) {
      return db.questoes.filter((q) => q.aula_id === aid).sort((a, b) => a.ordem - b.ordem).map((q) => __spreadValues({}, q));
    },
    async saveQuestoes(aid, list) {
      db.questoes = db.questoes.filter((q) => q.aula_id !== aid).concat(list.map((q, i) => ({ id: uid(), aula_id: aid, ordem: i + 1, enunciado: q.enunciado, alternativas: q.alternativas, correta: q.correta, explicacao: q.explicacao || "" })));
      save();
    },
    async corrigir(aid, resp) {
      const u = me();
      if (!u) throw new Error("Entre na sua conta para fazer a prova.");
      const au = db.aulas.find((x) => x.id === aid);
      const pf = db.users.find((x) => x.id === u.id);
      const full = au && (pf.is_admin || !pf.bloqueado && db.matriculas.some((m) => m.user_id === pf.id && m.curso_id === au.curso_id && m.status === "ativo" && vigente(m.expira_em)));
      if (!full) throw new Error("A prova é liberada após a matrícula.");
      const qs = db.questoes.filter((q) => q.aula_id === aid);
      const resultado = {};
      let ac = 0;
      const gabarito = {}, explic = {};
      qs.forEach((q) => {
        const ok = Number(resp[q.id]) === q.correta;
        resultado[q.id] = ok;
        gabarito[q.id] = q.correta;
        explic[q.id] = q.explicacao || "";
        if (ok) ac++;
      });
      const nota = qs.length ? Math.round(ac * 100 / qs.length) : 0;
      const aprovado = nota >= CONFIG.NOTA_MINIMA;
      db.tentativas.push({ user_id: u.id, aula_id: aid, nota, aprovado, criado_em: today() });
      if (aprovado && !db.progresso.some((p) => p.user_id === u.id && p.aula_id === aid)) db.progresso.push({ user_id: u.id, aula_id: aid });
      save();
      return { nota, aprovado, resultado, gabarito, explicacao: explic };
    },
    async tentativas(id) {
      return db.tentativas.filter((t) => t.user_id === id);
    },
    async tentativasTodas() {
      return db.tentativas.slice();
    },
    async todosProgressos() {
      return db.progresso.slice();
    },
    async fichaObs(uid2) {
      try {
        return JSON.parse(localStorage.getItem("etu_ficha_obs") || "{}")[uid2] || { texto: "" };
      } catch (e) {
        return { texto: "" };
      }
    },
    async salvarFichaObs(uid2, t) {
      const o = JSON.parse(localStorage.getItem("etu_ficha_obs") || "{}");
      o[uid2] = { texto: t, atualizado_em: (/* @__PURE__ */ new Date()).toISOString() };
      localStorage.setItem("etu_ficha_obs", JSON.stringify(o));
    },
    async mural() {
      return db.mural.slice();
    },
    async registrarDoc(tipo, cid) {
      var _a, _b;
      const L = JSON.parse(localStorage.getItem("etu_docs") || "[]");
      const cod = "ETU-" + (S.user.id || "").replace(/-/g, "").slice(0, 6).toUpperCase() + "-" + cid.toUpperCase().slice(0, 3);
      if (!L.some((x) => x.codigo === cod && x.tipo === tipo)) {
        L.push({ codigo: cod, tipo, nome: ((_a = S.profile) == null ? void 0 : _a.nome) || "", curso: ((_b = curso(cid)) == null ? void 0 : _b.titulo) || cid, emitido_em: today(), situacao: "válido" });
        localStorage.setItem("etu_docs", JSON.stringify(L));
      }
      return cod;
    },
    async validarDoc(cod) {
      if (VITRINE) throw new Error("A validação de documentos funciona quando a plataforma estiver ligada ao banco de dados da escola. Enquanto isso, confirme pelo WhatsApp oficial.");
      return JSON.parse(localStorage.getItem("etu_docs") || "[]").filter((x) => x.codigo === cod);
    },
    async nota(aid) {
      var _a;
      try {
        return JSON.parse(localStorage.getItem("etu_notas_" + (((_a = S.user) == null ? void 0 : _a.id) || "x")) || "{}")[aid] || "";
      } catch (e) {
        return "";
      }
    },
    async salvarNota(aid, t) {
      var _a;
      const k = "etu_notas_" + (((_a = S.user) == null ? void 0 : _a.id) || "x");
      const o = JSON.parse(localStorage.getItem(k) || "{}");
      o[aid] = t;
      localStorage.setItem(k, JSON.stringify(o));
    },
    async canais() {
      if (VITRINE) return CANAIS_PADRAO;
      try {
        return JSON.parse(localStorage.getItem("etu_canais") || "null") || CANAIS_PADRAO;
      } catch (e) {
        return CANAIS_PADRAO;
      }
    },
    async salvarCanal(c) {
      const L = (await this.canais()).slice();
      L.push(__spreadValues({ id: uid() }, c));
      localStorage.setItem("etu_canais", JSON.stringify(L));
    },
    async apagarCanal(id) {
      const L = (await this.canais()).filter((x) => String(x.id) !== String(id));
      localStorage.setItem("etu_canais", JSON.stringify(L));
    },
    async perguntarDirecao() {
      return { resposta: "O Assistente da Direção responde com inteligência completa quando a plataforma estiver ligada ao banco de dados e à chave do assistente. Tudo já está preparado: falta apenas a ativação." };
    },
    async lancamentos() {
      try {
        return JSON.parse(localStorage.getItem("etu_caixa") || "[]");
      } catch (e) {
        return [];
      }
    },
    async salvarLancamento(l) {
      const L = await this.lancamentos();
      L.unshift(__spreadValues({ id: uid(), criado_em: (/* @__PURE__ */ new Date()).toISOString() }, l));
      localStorage.setItem("etu_caixa", JSON.stringify(L));
    },
    async apagarLancamento(id) {
      const L = (await this.lancamentos()).filter((x) => x.id !== id);
      localStorage.setItem("etu_caixa", JSON.stringify(L));
    },
    async anexarCaixa() {
      throw new Error("Os comprovantes ficam guardados no banco de dados da escola. Entre pela plataforma ligada ao banco.");
    },
    async linkCaixa() {
      return "";
    },
    async anexoLancamento() {
      throw new Error("Os comprovantes ficam guardados no banco de dados da escola.");
    },
    async contasPagar() {
      try {
        return JSON.parse(localStorage.getItem("etu_contas") || "[]");
      } catch (e) {
        return [];
      }
    },
    async salvarContaPagar(c) {
      const L = await this.contasPagar();
      const id = uid();
      L.push(__spreadValues({ id, status: "aberto", criado_em: (/* @__PURE__ */ new Date()).toISOString() }, c));
      localStorage.setItem("etu_contas", JSON.stringify(L));
      return { id };
    },
    async alterarContaPagar(id, c) {
      const L = (await this.contasPagar()).map((x) => String(x.id) === String(id) ? __spreadValues(__spreadValues({}, x), c) : x);
      localStorage.setItem("etu_contas", JSON.stringify(L));
    },
    async apagarContaPagar(id) {
      const L = (await this.contasPagar()).filter((x) => String(x.id) !== String(id));
      localStorage.setItem("etu_contas", JSON.stringify(L));
    },
    async declaracoesMei() {
      try {
        return JSON.parse(localStorage.getItem("etu_dasn") || "[]");
      } catch (e) {
        return [];
      }
    },
    async salvarDeclaracaoMei(d) {
      const L = (await this.declaracoesMei()).filter((x) => +x.ano_ref !== +d.ano_ref);
      L.push(d);
      localStorage.setItem("etu_dasn", JSON.stringify(L));
    },
    async apagarDeclaracaoMei(a) {
      const L = (await this.declaracoesMei()).filter((x) => +x.ano_ref !== +a);
      localStorage.setItem("etu_dasn", JSON.stringify(L));
    },
    async perguntarContador() {
      return { resposta: "A assessoria virtual ainda aguarda a conexão com o banco de dados e a ativação do serviço de inteligência artificial. Sua pergunta não foi enviada a um modelo de IA. Os manuais e as opções podem ser preparados antes da ativação." };
    },
    async atualizarConta(d) {
      const u = me();
      if (!u) throw new Error("Entre novamente.");
      if (u.pw !== d.atual) throw new Error("A senha atual não confere.");
      if (d.email && db.users.some((x) => x.id !== u.id && x.email.toLowerCase() === d.email.toLowerCase())) throw new Error("Este e-mail já é usado por outra conta. A conta da Direção precisa de um e-mail só dela.");
      if (d.email) u.email = d.email;
      if (d.pw) u.pw = d.pw;
      if (d.nome) u.nome = d.nome;
      if (d.telefone !== void 0 && d.telefone !== null) u.telefone = d.telefone;
      save();
      return "";
    },
    async mensagens(sala) {
      try {
        return JSON.parse(localStorage.getItem("etu_chat_" + sala) || "[]").filter((m) => !m.apagada);
      } catch (e) {
        return [];
      }
    },
    async enviarMensagem(sala, texto) {
      var _a, _b, _c;
      if (VITRINE) throw new Error("A comunidade abre quando a plataforma estiver ligada ao banco de dados da escola.");
      const k = "etu_chat_" + sala, L = JSON.parse(localStorage.getItem(k) || "[]");
      L.push({ id: uid(), sala, user_id: (_a = S.user) == null ? void 0 : _a.id, nome: ((_b = S.profile) == null ? void 0 : _b.nome) || "Aluno", is_direcao: !!((_c = S.profile) == null ? void 0 : _c.is_admin), texto, criado_em: (/* @__PURE__ */ new Date()).toISOString() });
      localStorage.setItem(k, JSON.stringify(L.slice(-200)));
    },
    async apagarMensagem(id) {
      for (const k of Object.keys(localStorage).filter((k2) => k2.startsWith("etu_chat_"))) {
        const L = JSON.parse(localStorage.getItem(k) || "[]");
        L.forEach((m) => {
          if (m.id === id) m.apagada = true;
        });
        localStorage.setItem(k, JSON.stringify(L));
      }
    },
    ouvirMensagens() {
      return () => {
      };
    },
    async escolaConfig() {
      try {
        return JSON.parse(localStorage.getItem("etu_escola") || "null");
      } catch (e) {
        return null;
      }
    },
    async saveEscolaConfig(c) {
      try {
        localStorage.setItem("etu_escola", JSON.stringify(c));
      } catch (e) {
      }
    },
    async aiPublico() {
      const c = demoAi();
      return { ativo: c.ativo, nome: c.nome, publico: c.publico, foto: c.foto || "" };
    },
    async aiConfig() {
      return demoAi();
    },
    async saveAiConfig(c) {
      try {
        localStorage.setItem("etu_ai_cfg", JSON.stringify(__spreadValues(__spreadValues({}, demoAi()), c)));
      } catch (e) {
        throw new Error("Não foi possível guardar a configuração. Exporte os manuais e reduza o tamanho da foto.");
      }
    },
    async aiLog() {
      return [];
    },
    async perguntar(msgs) {
      return { resposta: faqResposta(msgs[msgs.length - 1].content, !VITRINE) };
    },
    async abrirAtendimento(a) {
      const L = demoAt();
      L.unshift(__spreadProps(__spreadValues({}, a), { id: uid(), status: "aberto", criado_em: (/* @__PURE__ */ new Date()).toISOString(), user_id: db.session }));
      try {
        localStorage.setItem("etu_atend", JSON.stringify(L));
      } catch (e) {
      }
    },
    async atendimentos() {
      return demoAt();
    },
    async apagarAtendimento(id) {
      try {
        localStorage.setItem("etu_atend", JSON.stringify(demoAt().filter((x) => x.id !== id)));
      } catch (e) {
      }
    },
    async apagarAiLog() {
    },
    async salvarAtendimento(id, c) {
      const L = demoAt();
      Object.assign(L.find((x) => x.id === id) || {}, c);
      try {
        localStorage.setItem("etu_atend", JSON.stringify(L));
      } catch (e) {
      }
    },
    async saveMural(m) {
      if (m.id) Object.assign(db.mural.find((x) => x.id === m.id), m);
      else db.mural.unshift(__spreadProps(__spreadValues({}, m), { id: uid(), criado_em: today() }));
      save();
    },
    async delMural(id) {
      db.mural = db.mural.filter((m) => m.id !== id);
      save();
    },
    async votar(mid, op) {
      const v = JSON.parse(localStorage.getItem("etu_votos") || "{}");
      v[mid] = op;
      localStorage.setItem("etu_votos", JSON.stringify(v));
    },
    async meusVotos() {
      const v = JSON.parse(localStorage.getItem("etu_votos") || "{}");
      return Object.keys(v).map((k) => ({ mural_id: k, opcao: v[k] }));
    },
    async resultado(mid) {
      const v = JSON.parse(localStorage.getItem("etu_votos") || "{}");
      return v[mid] !== void 0 ? [{ opcao: v[mid], votos: 1 }] : [];
    },
    async delAula(id) {
      db.questoes = db.questoes.filter((q) => q.aula_id !== id);
      db.aulas = db.aulas.filter((a) => a.id !== id);
      db.conteudo = db.conteudo.filter((c) => c.aula_id !== id);
      db.progresso = db.progresso.filter((p) => p.aula_id !== id);
      save();
    },
    reset() {
      mem = seed();
      Object.assign(db, mem);
      save();
    }
  };
}
Object.assign(CONFIG, window.ETU_CONFIG || {});
if (CONFIG.SUPABASE_URL && CONFIG.SUPABASE_ANON_KEY && !window.supabase) {
  document.body.insertAdjacentHTML("afterbegin", '<p role="alert" class="msg err">Não foi possível carregar a conexão segura. Confira a internet e recarregue a página.</p>');
  throw new Error("Conexão de autenticação indisponível");
}
const API = CONFIG.SUPABASE_URL && CONFIG.SUPABASE_ANON_KEY ? SupaBackend() : DemoBackend();
const VITRINE = API.demo && /^https?:$/.test(location.protocol) && EMBED_OK;
const S = { estudos: [], discs: [], user: null, profile: null, aulas: [], mats: [], prog: [], tent: [], mural: [], curso: null, aula: null, alunos: [] };
let recovering = false;
function addDias(d, n) {
  const x = /* @__PURE__ */ new Date(d + "T12:00:00");
  x.setDate(x.getDate() + n);
  return x.toISOString().slice(0, 10);
}
function vigente(e) {
  return !e || addDias(e, +CONFIG.TOLERANCIA_DIAS || 0) >= today();
}
function isActive(m) {
  return m && m.status === "ativo" && vigente(m.expira_em);
}
function diasEntre(a, b) {
  return Math.round((/* @__PURE__ */ new Date(b + "T12:00:00") - /* @__PURE__ */ new Date(a + "T12:00:00")) / 864e5);
}
function avisoMensalidade(m, titulo) {
  var _a, _b;
  if (!m || m.status !== "ativo" || !m.expira_em || ((_a = S.profile) == null ? void 0 : _a.is_admin)) return "";
  const hoje = today(), venc = m.expira_em, limite = addDias(venc, +CONFIG.TOLERANCIA_DIAS || 0), wa = WA("A paz do Senhor! Sou " + (((_b = S.profile) == null ? void 0 : _b.nome) || "") + ". Segue o comprovante da mensalidade do " + titulo + ".");
  const botoes = `<div class="res" style="margin-top:10px"><a class="btn btn-gold btn-sm" href="#matricula">Enviar comprovante</a><a class="btn btn-line btn-sm" href="${wa}" target="_blank" rel="noopener">Falar com a direção</a></div>`;
  if (hoje <= venc) {
    const d = diasEntre(hoje, venc);
    if (d > (+CONFIG.AVISO_DIAS || 0)) return "";
    return `<div class="aviso-pag lembrete"><b>Lembrete do seu compromisso — ${esc(titulo)}</b><p>A sua mensalidade vence ${d === 0 ? "<b>hoje</b>" : `em <b>${d} dia${d > 1 ? "s" : ""}</b>`} (${fmtDate(venc)}). Faça o Pix para a chave ${esc(CONFIG.PIX_CHAVE)} e envie o comprovante para continuar estudando sem interrupção.</p>${botoes}</div>`;
  }
  if (hoje <= limite) {
    const d = diasEntre(hoje, limite);
    return `<div class="aviso-pag atraso"><b>Mensalidade em aberto — ${esc(titulo)}</b><p>A mensalidade venceu em ${fmtDate(venc)}. Você está no prazo de tolerância: as aulas continuam liberadas até <b>${fmtDate(limite)}</b>${d ? ` (${d} dia${d > 1 ? "s" : ""})` : " (último dia)"}. Depois dessa data o acesso será bloqueado automaticamente até a regularização.</p>${botoes}</div>`;
  }
  return `<div class="aviso-pag bloq"><b>Acesso suspenso — ${esc(titulo)}</b><p>A mensalidade venceu em ${fmtDate(venc)} e o prazo de tolerância terminou em ${fmtDate(limite)}. Envie o comprovante: assim que a direção confirmar, as aulas voltam a ser liberadas, com todo o seu progresso guardado.</p>${botoes}</div>`;
}
function hasAccess(cid) {
  var _a, _b;
  if ((_a = S.profile) == null ? void 0 : _a.is_admin) return true;
  if (((_b = curso(cid)) == null ? void 0 : _b.em_breve) === true) return false;
  if (!S.profile || S.profile.bloqueado) return false;
  return isActive(S.mats.find((m) => m.curso_id === cid));
}
let escolaCfgOk = false;
async function refreshUser() {
  var _a;
  if (!escolaCfgOk) {
    escolaCfgOk = true;
    try {
      const c = await API.escolaConfig();
      if (c) {
        if (c.tolerancia_dias != null) CONFIG.TOLERANCIA_DIAS = +c.tolerancia_dias;
        if (c.aviso_dias != null) CONFIG.AVISO_DIAS = +c.aviso_dias;
        if (c.nota_minima != null) CONFIG.NOTA_MINIMA = +c.nota_minima;
        if (c.video_destaque) CONFIG.VIDEO_DESTAQUE = c.video_destaque;
        if (c.video_titulo) CONFIG.VIDEO_TITULO = c.video_titulo;
        drawVideoDiretor();
      }
    } catch (e) {
    }
  }
  S.user = await API.session();
  S.profile = S.user ? await API.profile(S.user.id) : null;
  S.mats = S.user ? await API.minhasMatriculas(S.user.id) : [];
  S.prog = S.user ? await API.progresso(S.user.id) : [];
  S.tent = S.user ? await API.tentativas(S.user.id) : [];
  await atualizarDocumentosPessoais();
  try {
    const cs = await API.cursos();
    if (cs && cs.length) CURSOS = cs;
  } catch (e) {
  }
  try {
    S.discs = await API.disciplinas();
  } catch (e) {
    S.discs = DISC_PADRAO;
  }
  try {
    S.estudos = await API.estudos();
  } catch (e) {
    S.estudos = ESTUDOS_PADRAO;
  }
  fillSelects();
  S.aulas = await API.aulas();
  try {
    S.mural = await API.mural();
  } catch (e) {
    S.mural = [];
  }
  setTimeout(() => {
    try {
      drawSino();
    } catch (_) {
    }
  }, 300);
  renderTicker();
  const inn = !!S.user, adm = !!((_a = S.profile) == null ? void 0 : _a.is_admin);
  $$(".when-in").forEach((e) => e.classList.toggle("hidden", !inn));
  $$(".when-out").forEach((e) => e.classList.toggle("hidden", inn));
  $$(".when-admin").forEach((e) => e.classList.toggle("hidden", !adm));
}
const PRIVATE = ["aluno", "admin", "documento"];
async function route() {
  var _a, _b, _c, _d;
  let h = location.hash.replace("#", "");
  if (h.includes("access_token") || h.includes("type=recovery")) return;
  if (!h) h = "inicio";
  if (h === "sair") {
    await API.signOut();
    await refreshUser();
    location.hash = "inicio";
    return;
  }
  let view = h, cid = null;
  if (h.startsWith("validar-")) {
    S.codValidar = h.slice(8);
    location.hash = "validar";
    return;
  }
  if (h === "compartilhar") {
    location.hash = "inicio";
    setTimeout(() => {
      var _a2;
      return (_a2 = document.querySelector(".compartilhe")) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
    }, 500);
    return;
  }
  if (h === "ajuda") {
    location.hash = "mais";
    setTimeout(() => aiAbrir(), 500);
    return;
  }
  if (h === "instalar") {
    location.hash = "mais";
    setTimeout(instalarApp, 300);
    return;
  }
  if (h.startsWith("curso-")) {
    view = "curso";
    cid = h.slice(6);
  }
  let doc = null;
  if (h.startsWith("certificado-")) {
    view = "documento";
    doc = "certificado";
    cid = h.slice(12);
  }
  if (h.startsWith("carteira-")) {
    view = "documento";
    doc = "carteira";
    cid = h.slice(9);
  }
  if (VITRINE && view === "entrar") {
    location.hash = "matricula";
    setTimeout(() => alert("Esta versão ainda aguarda a ativação das contas. Fale com a direção para saber quando as matrículas estarão disponíveis."), 300);
    return;
  }
  if (VITRINE && ["entrar", "cadastro", "esqueci", "nova-senha", "direcao", "aluno", "admin", "documento"].includes(view)) {
    location.hash = "matricula";
    return;
  }
  if (PRIVATE.includes(view) && !S.user) {
    location.hash = "entrar";
    return;
  }
  if (view === "admin" && !((_a = S.profile) == null ? void 0 : _a.is_admin)) {
    location.hash = "aluno";
    return;
  }
  if (view === "cadastro" && S.user) {
    location.hash = ((_b = S.profile) == null ? void 0 : _b.is_admin) ? "admin" : "aluno";
    return;
  }
  if (view === "direcao" && S.user) {
    location.hash = ((_c = S.profile) == null ? void 0 : _c.is_admin) ? "admin" : "aluno";
    return;
  }
  if (view === "entrar" && S.user) {
    location.hash = ((_d = S.profile) == null ? void 0 : _d.is_admin) ? "admin" : "aluno";
    return;
  }
  $$("[data-view]").forEach((v) => v.classList.toggle("hidden", v.dataset.view !== view));
  if (!$$("[data-view]").some((v) => v.dataset.view === view)) {
    location.hash = "inicio";
    return;
  }
  $$("nav.main a").forEach((a) => a.classList.toggle("on", a.dataset.nav === view || view === "curso" && a.dataset.nav === "aluno"));
  $("#mainNav").classList.remove("open");
  window.scrollTo(0, 0);
  if (view === "inicio") {
    renderMural();
    renderHomeCursos();
  }
  if (view === "matricula") waEnroll();
  if (view === "cursos") renderCursos();
  if (view === "aluno") renderAluno();
  if (view === "curso") {
    S.disc = S.pendDisc || null;
    S.aula = S.pendAula || null;
    S.pendDisc = S.pendAula = null;
    S.discCurso = cid;
    openCurso(cid);
    if (S.disc) setTimeout(() => $("#coursePlayer").scrollIntoView({ behavior: "smooth" }), 150);
  }
  if (view === "videoaulas") renderVideoaulas();
  if (view === "estudos") renderEstudos();
  if (view === "verificar") drawVerificar();
  if (view === "validar") drawValidar();
  if (view === "idioma") drawIdioma();
  if (view === "comunidade") drawComunidade();
  if (view === "mais") $$(".mais .when-in").forEach((e) => e.style.display = S.user ? "" : "none");
  if (view === "aluno") drawPerfil();
  if (view === "aluno") setTimeout(drawLembretes, 300);
  if (view === "busca") {
    setTimeout(() => $("#bsIn").focus(), 100);
    buscar();
  }
  if (view === "inicio") drawPrateleiras();
  marcaTab(view);
  if (S._ultView !== view) {
    S._ultView = view;
    topo();
  }
  if (view === "depoimentos") renderDepoimentos();
  if (view === "documento") renderDoc(doc, cid);
  if (view === "previa") renderPrevia();
  if (view === "admin") renderAdmin();
  if (view === "nova-senha" && !S.user && !recovering && !(API.demo && API.simulateRecovery())) {
    show($("#mNew"), "Abra esta página pelo link enviado ao seu e-mail.", "info");
  }
}
function ofereceCertificado(c) {
  return !!c && c.oferece_certificado !== false;
}
function courseCard(c, mode) {
  var _a;
  const n = lessonsOf(c.id).length;
  const m = S.mats.find((x) => x.curso_id === c.id);
  const head = c.tipo === "extra" ? capaHTML(c) : `<div class="head"><div class="lvl">${esc((c.cat || "").toUpperCase())}</div><h3>${esc(c.titulo)}</h3><div class="stars">${star(c.nivel || 0)}</div></div>`;
  const title = c.tipo === "extra" && c.capa ? `<h3 class="cz" style="font-size:17px;color:var(--navy)">${esc(c.titulo)}</h3>` : "";
  const certificado = ofereceCertificado(c) ? '<p class="meta"><b>Com certificado após a conclusão</b></p>' : "";
  if (c.em_breve === true) return `<article class="course">${head}<div class="body">${title}<span class="pill lock">EM BREVE</span><p>${esc(c.desc || "")}</p>${certificado}<p class="meta">Este curso está em preparação. Acompanhe os avisos da escola para saber quando começar.</p><a class="btn btn-line btn-sm" href="#curso-${esc(c.id)}">Conhecer o curso</a></div></article>`;
  if (mode === "aluno") {
    const ok = hasAccess(c.id);
    const done = lessonsOf(c.id).filter((a) => S.prog.includes(a.id)).length;
    const pct = n ? Math.round(done * 100 / n) : 0;
    const pill = ok ? (m == null ? void 0 : m.expira_em) && m.expira_em < today() && !((_a = S.profile) == null ? void 0 : _a.is_admin) ? `<span class="pill lock">MENSALIDADE VENCIDA · TOLERÂNCIA ATÉ ${fmtDate(addDias(m.expira_em, +CONFIG.TOLERANCIA_DIAS || 0))}</span>` : `<span class="pill ok">ACESSO LIBERADO${(m == null ? void 0 : m.expira_em) ? " · ATÉ " + fmtDate(m.expira_em) : ""}</span>` : m && m.status === "bloqueado" ? `<span class="pill off">ACESSO SUSPENSO</span>` : m && m.expira_em && m.expira_em < today() ? `<span class="pill off">ACESSO EXPIRADO</span>` : `<span class="pill lock">SOMENTE PRÉVIA</span>`;
    const acts2 = `<a class="btn btn-navy btn-sm" href="#curso-${c.id}">${ok ? "Continuar estudando" : "Ver disciplinas e aulas grátis"}</a>${ok ? "" : ' <a class="btn btn-gold btn-sm" href="#matricula">Fazer matrícula</a>'}`;
    return `<article class="course">${head}<div class="body">${title}${pill}${certificado}${statsHTML(c.id)}<div class="progress" aria-label="Progresso ${pct}%"><i style="width:${pct}%"></i></div><div class="meta">${done} de ${n} aulas concluídas</div><div class="acts">${acts2}</div></div></article>`;
  }
  let acts = `<a class="btn btn-navy btn-sm" href="#curso-${c.id}">${c.tipo === "extra" ? "Ver as aulas" : "Ver as disciplinas"}</a>`;
  if (!hasAccess(c.id)) acts += ` <a class="btn btn-gold btn-sm" href="#${S.user ? "matricula" : "cadastro"}">${S.user ? "Matricular-se" : "Inscrever-se"}</a>`;
  return `<article class="course">${head}
    <div class="body">${title}<p>${esc(c.desc || "")}</p>${certificado}${statsHTML(c.id)}<div class="meta">${n ? "Conteúdo para matriculados: vídeo-aulas, apostilas e provas." : "Disciplinas e aulas em preparação."}</div><div class="acts">${acts}</div></div></article>`;
}
function renderCursos() {
  $("#gridFormacao").innerHTML = ativosCursos().filter((c) => c.tipo !== "extra").map((c) => courseCard(c, "pub")).join("");
  const ex = ativosCursos().filter((c) => c.tipo === "extra");
  $("#extrasSec").classList.remove("hidden");
  $("#gridExtras").innerHTML = ex.map((c) => courseCard(c, "pub")).join("") || '<div class="panel"><h3>Novos cursos adicionais em breve</h3><p>Acompanhe aqui os próximos cursos da Escola Teológica União.</p></div>';
}
function renderHomeCursos() {
  const el = $("#homeCursos");
  if (el) el.innerHTML = ativosCursos().filter((c) => c.tipo !== "extra").map((c) => courseCard(c, "pub")).join("");
}
function renderAluno() {
  var _a, _b;
  const p = S.profile || {};
  $("#helloName").textContent = "Paz do Senhor, " + (p.nome ? p.nome.split(" ")[0] : "aluno") + "!";
  const ativos = CURSOS.filter((c) => hasAccess(c.id));
  let aviso = "";
  if (p.bloqueado) aviso = `<div class="msg err" style="margin:0 0 22px">O seu acesso está suspenso. Entre em contato com a direção da escola.</div>`;
  else if (!ativos.length && !p.is_admin) aviso = `<div class="pixbox" style="margin:0 0 24px"><h3>FALTA POUCO PARA LIBERAR O SEU CURSO</h3>
    <p style="margin:8px 0 0">Sua inscrição foi recebida e você já pode assistir às aulas grátis. Para ter acesso ao <b>curso completo</b> — vídeo-aulas, apostilas, provas, certificado e carteira de estudante — faça o pagamento da matrícula via Pix:</p>
    <div class="pixkey"><span>Chave Pix (telefone):</span><b>${esc(CONFIG.PIX_CHAVE)}</b></div>
    <p style="margin:0">Depois, envie o comprovante pelo WhatsApp. Assim que a direção confirmar o pagamento, o curso é liberado aqui na sua área.</p>
    <div class="res" style="margin-top:14px"><a class="btn btn-gold" href="#matricula">Fazer a matrícula</a><a class="btn btn-ghost" href="${WA("Olá! Sou " + (p.nome || "") + " (" + (((_a = S.user) == null ? void 0 : _a.email) || "") + "). Fiz o pagamento via Pix da matrícula. Segue o comprovante.")}" target="_blank" rel="noopener">Enviar comprovante</a></div></div>`;
  const avs = S.mats.map((m) => {
    var _a2;
    return avisoMensalidade(m, ((_a2 = curso(m.curso_id)) == null ? void 0 : _a2.titulo) || m.curso_id);
  }).join("");
  if (avs.includes("aviso-pag bloq") && !p.bloqueado) aviso = avs;
  else aviso += avs;
  $("#alunoAviso").innerHTML = aviso;
  const lista = p.is_admin ? ativosCursos() : ativosCursos().filter((c) => hasAccess(c.id) || S.mats.some((m) => m.curso_id === c.id) || c.id === p.interesse || S.aulas.some((a) => a.curso_id === c.id && a.previa));
  $("#myCourses").innerHTML = lista.map((c) => courseCard(c, "aluno")).join("");
  $("#myAccount").innerHTML = `<b>${esc(p.nome || "")}</b><br>${esc(((_b = S.user) == null ? void 0 : _b.email) || "")}${p.telefone ? "<br>" + esc(p.telefone) : ""}`;
  $("#myFoto").src = p.foto || BRASAO;
  const meus = CURSOS.filter((c) => S.mats.some((m) => m.curso_id === c.id));
  $("#myDocs").innerHTML = meus.map((c) => {
    const card = (S.carteirinhas || []).find((x) => x.curso_id === c.id);
    const ok = hasAccess(c.id), l = lessonsOf(c.id), d = l.filter((x) => S.prog.includes(x.id)).length, fim = ok && l.length && d === l.length;
    return `<div class="doc"><h4>${esc(c.titulo)}</h4>
      <p>Carteirinha de estudante: ${card ? '<b style="color:var(--ok)">PDF disponível</b>' : "aguardando a preparação e o envio pela Direção"}</p>
      ${card ? `<button class="btn btn-navy btn-sm" type="button" data-card-download="${esc(c.id)}">Baixar carteirinha em PDF</button>` : ""}
      ${ofereceCertificado(c) ? `<p style="margin-top:14px">Certificado: ${fim ? '<b style="color:var(--ok)">curso concluído</b>' : `${d} de ${l.length} aulas concluídas`}</p>
      ${fim ? `<a class="btn btn-gold btn-sm" href="#certificado-${c.id}" data-baixar>Baixar certificado</a>` : `<button class="btn btn-line btn-sm" type="button" disabled>Certificado após concluir o curso</button>`}` : ""}</div>`;
  }).join("") || `<p style="margin:0">Os documentos aparecem aqui depois da matrícula.</p>`;
  $("#alunoAviso").insertAdjacentHTML("beforeend", meus.filter((c) => cursoConcluido(c.id)).map(certBar).join(""));
  renderMyPays();
  $("#waDepo").href = WA(`Olá! Sou ${p.nome || ""}, aluno(a) da Escola Teológica União. Quero enviar o meu depoimento em vídeo e autorizo a publicação no mural da ETU.`);
}
function lessonsOf(cid) {
  return S.aulas.filter((a) => a.curso_id === cid).sort((x, y) => (x.disc_ordem || 1) - (y.disc_ordem || 1) || x.ordem - y.ordem);
}
function discsOf(cid) {
  const map = /* @__PURE__ */ new Map();
  S.discs.filter((d) => d.curso_id === cid).sort((a, b) => a.ordem - b.ordem).forEach((d) => map.set(d.ordem, { n: d.ordem, nome: d.nome, desc: d.descricao || "", aulas: [] }));
  lessonsOf(cid).forEach((a) => {
    const n = a.disc_ordem || 1;
    if (!map.has(n)) map.set(n, { n, nome: a.modulo, desc: "", aulas: [] });
    map.get(n).aulas.push(a);
  });
  return [...map.values()].sort((a, b) => a.n - b.n);
}
function totais(cid) {
  const l = lessonsOf(cid);
  return { disc: discsOf(cid).length, aulas: l.length, horas: l.reduce((t, a) => t + (+a.horas || 0), 0) };
}
const fmtH = (h) => h ? String(+h.toFixed(1)).replace(".", ",") + " h" : "—";
function ativosCursos() {
  return CURSOS.filter((c) => c.ativo !== false).sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
}
function fillSelects() {
  const opt = (l) => l.map((c) => `<option value="${c.id}">${esc(c.titulo)}</option>`).join("");
  const keep = (id) => {
    const el = $(id);
    return el ? el.value : "";
  };
  const matriculaveis = () => {
    const f = ativosCursos().filter((c) => c.tipo !== "extra" && !c.em_breve), x = ativosCursos().filter((c) => c.tipo === "extra" && !c.em_breve && lessonsOf(c.id).length);
    return `<optgroup label="Formação em Teologia">${opt(f)}</optgroup>${x.length ? `<optgroup label="Cursos Extras">${opt(x)}</optgroup>` : ""}`;
  };
  ["#sCurso", "#mCursoSel"].forEach((id) => {
    const el = $(id);
    if (!el) return;
    const v = el.value;
    el.innerHTML = matriculaveis();
    if (v && [...el.options].some((o) => o.value === v)) el.value = v;
  });
  const ad = $("#aCursoSel");
  if (ad) {
    const v = ad.value;
    ad.innerHTML = opt(CURSOS);
    if (v) ad.value = v;
  }
}
function capaHTML(c, h = 150) {
  if (c.capa) return `<div style="height:${h}px;background:#0F1E3D url('${c.capa}') center/cover no-repeat;border-bottom:2px solid var(--gold)"></div>`;
  return `<div style="height:${h}px;background:radial-gradient(120% 120% at 30% 20%,#1E3463,#0F1E3D 70%);border-bottom:2px solid var(--gold);display:flex;align-items:center;gap:14px;padding:0 20px;overflow:hidden">
    <img src="${BRASAO}" alt="" style="height:${Math.round(h * 0.62)}px;flex:0 0 auto"><div><div class="cz" style="color:var(--gold2);font-size:11px;letter-spacing:.2em">CURSO EXTRA</div><div class="cz" style="color:#F7F1E3;font-size:17px;line-height:1.25;margin-top:4px">${esc(c.titulo)}</div></div></div>`;
}
function statsHTML(cid, dark) {
  const t = totais(cid);
  const box = (n, l) => `<div style="flex:1;text-align:center;padding:8px 4px;border:1px solid ${dark ? "rgba(201,162,74,.5)" : "#E1D4B2"};border-radius:8px;background:${dark ? "rgba(255,255,255,.05)" : "#fffaf0"}"><b class="cz" style="display:block;font-size:20px;color:${dark ? "var(--gold2)" : "var(--navy)"}">${n}</b><span style="font-size:13px;color:${dark ? "#D9D0B8" : "var(--muted)"}">${l}</span></div>`;
  return `<div style="display:flex;gap:8px">${box(t.disc || "—", "disciplina" + (t.disc === 1 ? "" : "s"))}${box(t.aulas || "—", "aula" + (t.aulas === 1 ? "" : "s"))}${box(t.horas ? String(+t.horas.toFixed(1)).replace(".", ",") : "—", "horas")}</div>`;
}
function sideHTML(list, cid, current, previewOnly) {
  let html = `<h4>${previewOnly ? "AULAS DE PRÉVIA" : "CONTEÚDO DO CURSO"}</h4>`, mod = null;
  const ok = hasAccess(cid);
  list.forEach((a) => {
    const mk = (a.disc_ordem || 1) + "|" + a.modulo;
    if (mk !== mod) {
      mod = mk;
      html += `<div class="mod">Disciplina ${a.disc_ordem || 1} — ${esc(a.modulo)}</div>`;
    }
    const open = a.previa || ok;
    const done = S.prog.includes(a.id);
    const ic = done ? '<svg class="ic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F6B45" stroke-width="2.4" aria-label="concluída"><path d="M4 12l5 5L20 6"/></svg>' : open ? '<svg class="ic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A8842F" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M10 8l6 4-6 4z" fill="#A8842F"/></svg>' : '<svg class="ic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a8f9c" stroke-width="2" aria-label="bloqueada"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
    html += `<button class="les ${current === a.id ? "on" : ""}" data-aula="${a.id}">${ic}<span>${a.ordem}. ${esc(a.titulo)}${a.previa && !ok ? ' <span class="pill ok" style="font-size:9px;padding:2px 6px">PRÉVIA</span>' : ""}</span></button>`;
  });
  if (!list.length) html += `<p style="padding:14px 16px;margin:0;color:var(--muted)">As aulas deste curso estão em preparação.</p>`;
  return html;
}
function driveDownload(url) {
  const m = (url || "").match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
  return m ? `https://drive.google.com/uc?export=download&id=${m[1]}` : url;
}
function bestOf(aid) {
  const t = S.tent.filter((x) => x.aula_id === aid);
  if (!t.length) return null;
  return t.reduce((m, x) => x.nota > m.nota ? x : m);
}
const LETRAS = ["A", "B", "C", "D", "E"];
let FS = 0;
function setFont(d) {
  FS = Math.max(0, Math.min(2, FS + d));
  document.documentElement.classList.remove("fs1", "fs2");
  if (FS) document.documentElement.classList.add("fs" + FS);
  try {
    localStorage.setItem("etu_fs", FS);
  } catch (e) {
  }
}
function toggleNight() {
  document.body.classList.toggle("night");
  try {
    localStorage.setItem("etu_night", document.body.classList.contains("night") ? "1" : "");
  } catch (e) {
  }
}
try {
  FS = +(localStorage.getItem("etu_fs") || 0);
  if (FS) document.documentElement.classList.add("fs" + FS);
  if (localStorage.getItem("etu_night")) document.body.classList.add("night");
} catch (e) {
}
function previaHTML(a) {
  if (!a.previa_texto) return "";
  const parts = a.previa_texto.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);
  const first = parts.shift();
  return `<div class="previa-box"><div class="k">${a.previa ? "PRÉVIA GRATUITA" : "LEITURA DA AULA"}</div><p class="verse">${esc(first)}</p>${parts.map((p) => `<p>${esc(p)}</p>`).join("")}</div>`;
}
function lockHTML() {
  return `<div class="lockbox"><h4>CURSO COMPLETO PARA ALUNOS MATRICULADOS</h4>
    <ul><li>Aula completa e apostila em PDF para ler e baixar</li><li>Prova da aula com resultado na hora</li><li>Progresso, carga horária e certificado ao concluir o curso</li><li>Carteira de estudante de curso livre</li></ul>
    <p style="margin:12px 0 0">Matrícula via Pix — chave (telefone): <b style="color:#fff">${esc(CONFIG.PIX_CHAVE)}</b></p>
    <div class="res" style="margin-top:12px"><a class="btn btn-gold btn-sm" href="#${S.user ? "matricula" : "cadastro"}">${S.user ? "Fazer a matrícula" : "Inscrever-se"}</a><a class="btn btn-ghost btn-sm" href="#matricula">Como funciona</a></div></div>`;
}
function videoBox(v, title, raw) {
  if (!v) return `<div class="video"><div class="ph"><img src="${BRASAO}" alt=""><span class="cz">Vídeo em breve</span></div></div>`;
  if (/\.(mp4|webm|m4v|mov)(\?|$)|\/storage\/v1\/object\//i.test(v)) return `<div class="video"><video controls preload="metadata" playsinline controlslist="nodownload" src="${esc(v)}" style="width:100%;height:100%;background:#000"></video></div>`;
  if (!EMBED_OK) return `<div class="video"><div class="ph"><img src="${BRASAO}" alt=""><span>O vídeo é exibido aqui na plataforma publicada.</span><a class="btn btn-gold btn-sm" href="${esc(raw)}" target="_blank" rel="noopener">Assistir ao vídeo</a></div></div>`;
  return `<div class="video"><iframe src="${esc(v)}" title="${esc(title)}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
}
async function stageHTML(a, cid) {
  if (!a) return { html: `<div class="video"><div class="ph"><img src="${BRASAO}" alt=""><span class="cz">Aulas em preparação</span></div></div>` };
  const full = hasAccess(cid);
  const readbar = `<div class="readbar" aria-label="Ajustes de leitura">Leitura: <button type="button" data-fs="-1" aria-label="Diminuir texto">A−</button><button type="button" data-fs="1" aria-label="Aumentar texto">A+</button><button type="button" data-night style="min-width:120px">${document.body.classList.contains("night") ? "Modo claro" : "Modo noturno"}</button></div>`;
  if (!full && !a.previa) {
    return { html: readbar + `<div class="video"><div class="ph"><img src="${BRASAO}" alt=""><span class="cz" style="color:#E2C47A">AULA EXCLUSIVA PARA MATRICULADOS</span></div></div>
      <h3>${esc(a.titulo)}</h3><p class="desc">${esc(a.descricao || "")}</p>${lockHTML()}` };
  }
  const c = await API.conteudo(a.id) || {};
  if (!full) {
    const amostra = c.pdf_url ? `<div class="previa-box" style="border-left-color:var(--ok)"><div class="k">APOSTILA DE AMOSTRA — GRÁTIS</div>
      <p style="margin-top:8px">Leia gratuitamente a apostila desta disciplina e conheça o padrão de ensino da Escola Teológica União.</p>
      <div class="res" style="margin-top:12px"><button type="button" class="btn btn-gold btn-sm" data-ler="${esc(c.pdf_url)}" data-tit="Apostila de amostra">Ler a apostila de amostra</button></div></div>
      ${EMBED_OK ? `<div class="pdfbox"><iframe src="${esc(pdfEmbed(c.pdf_url))}" title="Apostila de amostra"></iframe></div>` : ""}` : "";
    return { html: readbar + videoBox(toEmbed(c.video_url), a.titulo, c.video_url) + `<h3>${esc(a.titulo)}</h3><p class="desc">${esc(a.descricao || "")}</p>${previaHTML(a)}${amostra}${lockHTML()}` };
  }
  let qs = [];
  try {
    qs = await API.questoes(a.id);
  } catch (e) {
  }
  const pdf = pdfEmbed(c.pdf_url);
  const done = S.prog.includes(a.id);
  const best = bestOf(a.id);
  let quiz = "";
  if (qs.length) {
    quiz = `<form class="quiz" id="quizForm" novalidate><h4>PROVA DA AULA</h4>
      <p class="info">${qs.length} quest${qs.length > 1 ? "ões" : "ão"} · nota mínima para aprovação: ${CONFIG.NOTA_MINIMA}% · você pode refazer quantas vezes precisar.${best ? ` Sua melhor nota: <b>${best.nota}%</b>${best.aprovado ? " — aprovado." : "."}` : ""}</p>
      ${qs.map((q, i) => `<fieldset class="q" data-q="${q.id}" style="border:0;padding:0;margin:18px 0 0"><legend class="en">${i + 1}. ${esc(q.enunciado)}</legend>
        ${(q.alternativas || []).map((t, j) => `<label class="opt" style="font-family:inherit;letter-spacing:0;color:inherit;font-weight:400;font-size:16.5px;margin:8px 0 0"><input type="radio" name="q_${q.id}" value="${j}"><span class="lt">${LETRAS[j]}</span><span>${esc(t)}</span></label>`).join("")}
        <div class="fb"></div></fieldset>`).join("")}
      <div class="res" style="margin-top:18px"><button class="btn btn-navy" type="submit">Enviar respostas</button></div>
      <div id="quizScore"></div></form>`;
  }
  const html = readbar + videoBox(toEmbed(c.video_url), a.titulo, c.video_url) + `
    <h3>${esc(a.titulo)}</h3><p class="desc">${esc(a.descricao || "")}${a.horas ? ` <span class="pill lock" style="margin-left:6px">${a.horas} H</span>` : ""}${done ? ' <span class="pill ok" style="margin-left:6px">AULA CONCLUÍDA</span>' : ""}</p>
    <div class="ferr" role="group" aria-label="Recursos da aula">
      ${c.pdf_url ? `<a href="${esc(c.pdf_url)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M6 3h9l4 4v14H6zM9 12h7M9 16h7M9 8h3"/></svg>Apostila</a>` : `<button type="button" disabled style="opacity:.5"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M6 3h9l4 4v14H6z"/></svg>Apostila</button>`}
      <button type="button" data-audio ${c.audio_url ? "" : 'disabled style="opacity:.5"'}><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v6H4zM17 14h3v6h-3z"/></svg>${c.audio_url ? "Áudio" : "Áudio em breve"}</button>
      <button type="button" data-lista><svg viewBox="0 0 24 24" aria-hidden="true"><path stroke="currentColor" stroke-width="2" d="M4 6h12M4 12h12M4 18h8M18 15l4 3-4 3z"/></svg>Aulas</button>
      <button type="button" data-notas><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M4 20h4L19 9l-4-4L4 16zM14 6l4 4"/></svg>Anotações</button>
    </div>
    <div id="audioBox" class="hidden" style="margin-top:12px">${c.audio_url ? /drive\.google\.com/.test(c.audio_url) ? `<iframe src="${esc(pdfEmbed(c.audio_url))}" title="Áudio da aula" style="width:100%;height:90px;border:1px solid #E1D4B2;border-radius:8px"></iframe>` : `<audio controls preload="none" style="width:100%" src="${esc(c.audio_url)}"></audio>` : ""}</div>
    ${previaHTML(a)}
    <div class="notas" id="notasBox"><h4>MINHAS ANOTAÇÕES DESTA AULA</h4><textarea id="notaTxt" rows="5" placeholder="Escreva aqui o que aprendeu, versículos e ideias para a pregação."></textarea>
      <div class="res" style="margin-top:8px"><button class="btn btn-navy btn-sm" type="button" id="notaSalvar">Salvar anotação</button><span id="notaOk" style="align-self:center;color:var(--ok);font-size:15px"></span></div></div>
    <div class="res" style="margin-top:16px">
      ${c.pdf_url ? `<button type="button" class="btn btn-gold btn-sm" data-ler="${esc(c.pdf_url)}" data-tit="Apostila da aula">Ler a apostila</button><a class="btn btn-line btn-sm" href="${esc(driveDownload(c.pdf_url))}" target="_blank" rel="noopener">Baixar a apostila (PDF)</a>` : '<span class="pill lock">APOSTILA EM PREPARAÇÃO</span>'}
      ${c.video_url ? `<a class="btn btn-line btn-sm" href="${esc(c.video_url)}" target="_blank" rel="noopener">Vídeo em tela cheia</a>` : ""}
      ${!qs.length ? `<button class="btn ${done ? "btn-line" : "btn-navy"} btn-sm" id="btnDone" type="button">${done ? "Desmarcar conclusão" : "Marcar aula como concluída"}</button>` : ""}
    </div>
    ${pdf && EMBED_OK ? `<div class="pdfbox"><iframe src="${esc(pdf)}" title="Apostila da aula"></iframe></div><p style="font-size:15px;color:var(--muted);margin:8px 0 0">Use os botões do leitor para aproximar o texto. Se a apostila não aparecer, toque em “Ler a apostila”.</p>` : ""}
    ${quiz}`;
  return { html, qs };
}
async function mountPlayer(container, cid, list, previewOnly, onChange) {
  var _a;
  let cur = S.aula && list.some((a) => a.id === S.aula) ? S.aula : (_a = list.find((a) => (a.previa || hasAccess(cid)) && !S.prog.includes(a.id)) || list.find((a) => a.previa || hasAccess(cid)) || list[0]) == null ? void 0 : _a.id;
  async function draw() {
    const a = list.find((x) => x.id === cur);
    const st = await stageHTML(a, cid);
    container.innerHTML = `<aside class="side">${sideHTML(list, cid, cur, previewOnly)}</aside><div class="stage">${st.html}</div>`;
    try {
      if (a && S.user) {
        const cc = CURSOS.find((x) => x.id === cid);
        localStorage.setItem("etu_ultima", JSON.stringify({ cid, a: cur, d: S.disc || null, t: a.titulo || "", c: cc ? cc.titulo : "" }));
      }
    } catch (e) {
    }
    container.querySelectorAll("[data-aula]").forEach((b) => b.onclick = () => {
      cur = b.dataset.aula;
      S.aula = cur;
      draw();
      scrollTo({ top: Math.max(0, container.getBoundingClientRect().top + scrollY - 120), behavior: "smooth" });
    });
    container.querySelectorAll("[data-fs]").forEach((b) => b.onclick = () => setFont(+b.dataset.fs));
    const nb = container.querySelector("[data-night]");
    if (nb) nb.onclick = () => {
      toggleNight();
      nb.textContent = document.body.classList.contains("night") ? "Modo claro" : "Modo noturno";
    };
    const ab = container.querySelector("[data-audio]");
    if (ab && !ab.disabled) ab.onclick = () => {
      const b = container.querySelector("#audioBox");
      b.classList.toggle("hidden");
      ab.classList.toggle("on");
    };
    const lb = container.querySelector("[data-lista]");
    if (lb) lb.onclick = () => {
      var _a2;
      return (_a2 = container.querySelector(".side")) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
    };
    const nbx = container.querySelector("[data-notas]");
    if (nbx) nbx.onclick = () => {
      var _a2, _b;
      (_a2 = container.querySelector("#notasBox")) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth", block: "center" });
      (_b = container.querySelector("#notaTxt")) == null ? void 0 : _b.focus();
    };
    const nt = container.querySelector("#notaTxt");
    if (nt) {
      API.nota(cur).then((t) => {
        nt.value = t || "";
      }).catch(() => {
      });
      container.querySelector("#notaSalvar").onclick = async () => {
        try {
          await API.salvarNota(cur, nt.value);
          const o = container.querySelector("#notaOk");
          o.textContent = "Anotação salva ✓";
          setTimeout(() => o.textContent = "", 2500);
        } catch (e) {
          container.querySelector("#notaOk").textContent = e.message;
        }
      };
    }
    const d = container.querySelector("#btnDone");
    if (d) d.onclick = async () => {
      const f2 = !S.prog.includes(cur);
      await API.marcar(S.user.id, cur, f2);
      S.prog = await API.progresso(S.user.id);
      onChange && onChange();
      draw();
    };
    const f = container.querySelector("#quizForm");
    if (f && S.user) f.onsubmit = async (e) => {
      e.preventDefault();
      const resp = {};
      let falta = 0;
      st.qs.forEach((q) => {
        const r = f.querySelector(`input[name="q_${q.id}"]:checked`);
        if (r) resp[q.id] = +r.value;
        else falta++;
      });
      const box = f.querySelector("#quizScore");
      if (falta) {
        box.innerHTML = `<div class="score no">Responda todas as questões antes de enviar (faltam ${falta}).</div>`;
        return;
      }
      try {
        const r = await API.corrigir(cur, resp);
        st.qs.forEach((q) => {
          var _a2, _b, _c;
          const fs = f.querySelector(`[data-q="${q.id}"]`), ok = r.resultado[q.id];
          fs.querySelectorAll(".opt").forEach((o) => o.classList.remove("right", "wrong"));
          const chosen = fs.querySelector(`input[value="${resp[q.id]}"]`).closest(".opt");
          chosen.classList.add(ok ? "right" : "wrong");
          const fb = fs.querySelector(".fb");
          fb.className = "fb " + (ok ? "r" : "w");
          const gc = (_a2 = r.gabarito) == null ? void 0 : _a2[q.id];
          if (!ok && gc != null) {
            const c2 = (_b = fs.querySelector(`input[value="${gc}"]`)) == null ? void 0 : _b.closest(".opt");
            c2 && c2.classList.add("right");
          }
          fb.innerHTML = (ok ? "<b>✓ Correto.</b>" : "<b>✕ Incorreto.</b>" + (gc != null ? ` A resposta certa é a alternativa <b>${LETRAS[gc]}</b>.` : "")) + (((_c = r.explicacao) == null ? void 0 : _c[q.id]) ? `<span style="display:block;margin-top:6px;color:var(--ink);font-weight:400">${esc(r.explicacao[q.id])}</span>` : "");
        });
        S.tent = await API.tentativas(S.user.id);
        S.prog = await API.progresso(S.user.id);
        box.innerHTML = r.aprovado ? `<div class="score ok"><b>Aprovado com ${r.nota}%.</b> Esta aula foi registrada como concluída. Siga para a próxima aula.</div><div class="res"><button class="btn btn-gold btn-sm" type="button" id="nextLes">Ir para a próxima aula</button></div>` : `<div class="score no"><b>Nota: ${r.nota}%.</b> A nota mínima é ${CONFIG.NOTA_MINIMA}%. Revise o vídeo e a apostila e refaça a prova — não desista!</div><div class="res"><button class="btn btn-navy btn-sm" type="button" id="retry">Refazer a prova</button></div>`;
        f.querySelectorAll("input[type=radio]").forEach((i) => i.disabled = true);
        if (r.aprovado) {
          try {
            etuFesta("Aprovado! Glória a Deus!", `Você alcançou ${r.nota}%. Continue firme: “Procura apresentar-te a Deus aprovado” (2 Timóteo 2.15).`);
          } catch (_) {
          }
        }
        f.querySelector("button[type=submit]").classList.add("hidden");
        const rt = box.querySelector("#retry");
        if (rt) rt.onclick = () => draw();
        const nx = box.querySelector("#nextLes");
        if (nx) nx.onclick = () => {
          const i = list.findIndex((x) => x.id === cur);
          const n = list.slice(i + 1).find((x) => x.previa || hasAccess(cid));
          if (n) {
            cur = n.id;
            S.aula = cur;
          }
          draw();
          scrollTo({ top: Math.max(0, container.getBoundingClientRect().top + scrollY - 120), behavior: "smooth" });
        };
        onChange && onChange();
        box.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch (er) {
        box.innerHTML = `<div class="score no">${esc(er.message)}</div>`;
      }
    };
  }
  await draw();
}
function courseTop(cid) {
  const c = curso(cid), list = lessonsOf(cid);
  const n = list.length, done = list.filter((a) => S.prog.includes(a.id)).length;
  const horas = list.reduce((t, a) => t + (+a.horas || 0), 0);
  const hd = list.filter((a) => S.prog.includes(a.id)).reduce((t, a) => t + (+a.horas || 0), 0);
  const pct = n ? Math.round(done * 100 / n) : 0;
  const fim = n && done === n && hasAccess(cid);
  $("#courseTop").innerHTML = `<div class="course-top">
    <div><b class="cz" style="color:var(--navy);font-size:14px">SEU PROGRESSO: ${pct}%</b><br><span style="font-size:16px;color:var(--muted)">${done} de ${n} aulas concluídas${horas ? ` · ${hd} de ${horas} horas cumpridas` : ""}</span></div>
    <div style="text-align:right;font-size:16px"><b>Carga horária:</b> ${horas ? horas + " horas" : "a definir"}</div>
    <div class="progress"><i style="width:${pct}%"></i></div>
    ${fim ? `<div class="done-banner"><b>Parabéns! Você concluiu todas as aulas do ${esc(c.titulo)}.</b> ${ofereceCertificado(c) ? `O seu certificado já está disponível. <a href="#certificado-${cid}" data-baixar>Baixar o certificado</a>` : ""}</div>` : ""}
  </div>`;
}
function openCurso(cid) {
  var _a, _b;
  const c = curso(cid);
  if (!c) {
    location.hash = "cursos";
    return;
  }
  $("#pTitle").textContent = c.titulo;
  if (c.em_breve && !((_a = S.profile) == null ? void 0 : _a.is_admin)) {
    $("#pSub").textContent = "Em breve · Curso Livre de Teologia";
    $("#courseHead").innerHTML = `<div class="panel" style="margin-top:24px"><span class="pill lock">EM BREVE</span><p>${esc(c.desc || "")}</p>${ofereceCertificado(c) ? "<p><b>Com certificado após a conclusão das aulas e provas.</b></p>" : ""}<p>As aulas e matrículas serão liberadas pela Direção.</p></div>`;
    $("#courseTop").innerHTML = "";
    $("#grade").innerHTML = discsOf(cid).map((d) => `<div class="panel"><b>${esc(d.nome)}</b><p>${esc(d.desc || "")}</p></div>`).join("");
    $("#coursePlayer").innerHTML = "";
    $("#coursePlayer").style.display = "none";
    return;
  }
  const m = S.mats.find((x) => x.curso_id === cid);
  $("#pSub").textContent = hasAccess(cid) ? ((_b = S.profile) == null ? void 0 : _b.is_admin) ? "Visualização da Direção" : "Acesso liberado" + ((m == null ? void 0 : m.expira_em) ? " até " + fmtDate(m.expira_em) : "") : c.cat || "Curso livre de teologia";
  const avM = avisoMensalidade(m, c.titulo);
  $("#courseHead").innerHTML = (avM ? `<div style="margin-top:22px">${avM}</div>` : "") + `<div class="panel" style="margin:24px 0 0;display:grid;grid-template-columns:1.3fr 1fr;gap:20px;align-items:center" id="chBox">
    <div>${c.tipo === "extra" && c.capa ? `<img src="${c.capa}" alt="" style="width:100%;max-height:200px;object-fit:cover;border-radius:8px;border:1px solid var(--gold);margin-bottom:10px">` : ""}<p style="margin:0">${esc(c.desc || "")}</p>
    ${hasAccess(cid) ? "" : `<div class="res" style="margin-top:12px"><a class="btn btn-gold btn-sm" href="#${S.user ? "matricula" : "cadastro"}">${S.user ? "Fazer a matrícula" : "Inscrever-se"}</a><a class="btn btn-line btn-sm" href="#matricula">Como funciona a matrícula</a></div>`}</div>
    <div>${statsHTML(cid)}</div></div>${acoesCurso(cid)}${S.user && cursoConcluido(cid) ? certBar(c) : ""}`;
  ligaAcoesCurso(cid);
  if (S.user && hasAccess(cid)) courseTop(cid);
  else $("#courseTop").innerHTML = "";
  const ds = discsOf(cid);
  const key = (d) => d.n + "|" + d.nome;
  if (S.discCurso !== cid) {
    S.disc = null;
    S.discCurso = cid;
  }
  const atual = ds.find((d) => key(d) === S.disc);
  if (!atual) {
    $("#grade").innerHTML = `<div class="panel" style="margin-top:22px"><h3>${c.tipo === "extra" ? "Conteúdo do curso" : "Disciplinas do curso"}</h3>
      <p style="margin:0 0 6px;color:var(--muted);font-size:16px">${ds.length} disciplina${ds.length === 1 ? "" : "s"}, na ordem do curso. Toque em uma disciplina para ver as aulas.</p>
      ${ds.length ? ds.map((d) => {
      const h2 = d.aulas.reduce((t, a) => t + (+a.horas || 0), 0);
      const dn = d.aulas.filter((a) => S.prog.includes(a.id)).length;
      const gr = d.aulas.some((a) => a.previa);
      if (!d.aulas.length) return `<div class="disc-row" style="opacity:.85">
          <span class="cz" style="width:44px;height:44px;border-radius:50%;background:#E9E1CC;color:var(--navy);display:flex;align-items:center;justify-content:center;border:2px solid var(--gold);font-weight:700">${d.n}</span>
          <span><span class="cz" style="display:block;font-size:11px;letter-spacing:.16em;color:var(--goldd)">DISCIPLINA ${d.n}</span><b style="font-size:18px;color:var(--navy)">${esc(d.nome)}</b>
            ${d.desc ? `<span style="display:block;font-size:15px;color:var(--muted)">${esc(d.desc)}</span>` : ""}</span>
          <span class="pill lock">EM PREPARAÇÃO</span></div>`;
      return `<button type="button" class="disc-row" data-disc="${esc(key(d))}" style="all:unset;box-sizing:border-box;cursor:pointer;width:100%;display:grid">
          <span class="cz" style="width:44px;height:44px;border-radius:50%;background:var(--navy);color:var(--gold2);display:flex;align-items:center;justify-content:center;border:2px solid var(--gold);font-weight:700">${d.n}</span>
          <span><span class="cz" style="display:block;font-size:11px;letter-spacing:.16em;color:var(--goldd)">DISCIPLINA ${d.n}${gr ? ' · <span style="color:var(--ok)">COM AULA GRÁTIS</span>' : ""}</span><b style="font-size:18px;color:var(--navy)">${esc(d.nome)}</b>
            ${d.desc ? `<span style="display:block;font-size:15px;color:var(--muted)">${esc(d.desc)}</span>` : ""}
            <span style="display:block;font-size:15px;color:var(--ink);margin-top:2px">${d.aulas.length} aula${d.aulas.length > 1 ? "s" : ""} · ${fmtH(h2)}${S.user && hasAccess(cid) ? ` · ${dn} concluída${dn === 1 ? "" : "s"}` : ""}</span></span>
          <span class="btn btn-gold btn-sm">Ver aulas</span></button>`;
    }).join("") : `<p style="margin:0">As disciplinas deste curso estão em preparação.</p>`}</div>`;
    $("#coursePlayer").innerHTML = "";
    $("#coursePlayer").style.display = "none";
    $$("[data-disc]").forEach((b) => b.onclick = () => {
      S.disc = b.dataset.disc;
      S.aula = null;
      openCurso(cid);
      $("#grade").scrollIntoView({ behavior: "smooth" });
    });
    return;
  }
  const h = atual.aulas.reduce((t, a) => t + (+a.horas || 0), 0);
  $("#grade").innerHTML = `<div class="panel" style="margin-top:22px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between">
    <div><span class="cz" style="font-size:11px;letter-spacing:.16em;color:var(--goldd)">DISCIPLINA ${atual.n}</span><h3 style="margin:2px 0 0;font-size:20px">${esc(atual.nome)}</h3>
    <span style="font-size:15px;color:var(--muted)">${atual.aulas.length} aula${atual.aulas.length > 1 ? "s" : ""} · ${fmtH(h)}</span></div>
    <button type="button" class="btn btn-line btn-sm" id="voltarDisc">← Todas as disciplinas</button></div>`;
  $("#voltarDisc").onclick = () => {
    S.disc = null;
    openCurso(cid);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  $("#coursePlayer").style.display = "";
  mountPlayer($("#coursePlayer"), cid, atual.aulas, false, () => courseTop(cid));
}
function renderPrevia() {
  const list = S.aulas.filter((a) => a.previa);
  if (!list.length) {
    $("#previewPlayer").innerHTML = `<div class="stage" style="grid-column:1/-1"><p style="margin:0">As aulas de prévia serão publicadas em breve.</p></div>`;
    return;
  }
  mountPlayer($("#previewPlayer"), list[0].curso_id, list, true);
}
async function renderAdmin() {
  S.alunos = await API.alunos();
  try {
    S.allProg = await API.todosProgressos();
  } catch (e) {
    S.allProg = [];
  }
  try {
    S.mural = await API.mural();
  } catch (e) {
  }
  drawMural();
  drawEstudosAdm();
  drawArquivos();
  await drawPag();
  const alunos = S.alunos.filter((a) => !a.is_admin);
  const ativos = alunos.filter((a) => !a.bloqueado && a.matriculas.some(isActive)).length;
  const pend = alunos.filter((a) => !a.matriculas.length).length;
  let pendPag = 0;
  try {
    pendPag = (await API.comprovantes()).filter((c) => c.status === "pendente").length;
  } catch (e) {
  }
  try {
    await etuPainelNumeros(alunos, pendPag);
  } catch (e) {
    $("#stats").innerHTML = `<div><b>${alunos.length}</b><span>Alunos inscritos</span></div><div><b>${ativos}</b><span>Com acesso liberado</span></div>`;
  }
  try {
    etuMensalidades();
  } catch (e) {
  }
  drawAlunos();
  fillSelects();
  drawCursosAdm();
  drawAulas();
  drawConfig();
  drawAiAdm();
  drawAtend();
  drawContab();
  drawSec();
  drawAnimo();
  drawDivulgacao();
}
function drawAlunos() {
  const q = ($("#busca").value || "").toLowerCase();
  const rows = S.alunos.filter((a) => !a.is_admin).filter((a) => [a.nome, a.email, a.telefone].join(" ").toLowerCase().includes(q));
  $("#tbAlunos").innerHTML = rows.map((a) => {
    var _a;
    const chips = a.matriculas.map((m) => {
      const c = curso(m.curso_id);
      const cls = isActive(m) ? "ok" : m.status === "bloqueado" ? "off" : "lock";
      return `<span class="pill ${cls}" title="${m.expira_em ? "Validade: " + fmtDate(m.expira_em) : "Sem validade"}">${esc(c ? c.titulo.replace("Curso ", "").replace(" de Teologia", "") : m.curso_id)}${m.expira_em ? " · " + fmtDate(m.expira_em) : ""}</span>`;
    }).join("") || '<span class="pill lock">AGUARDANDO</span>';
    return `<tr><td><b>${esc(a.nome)}</b>${a.bloqueado ? ' <span class="pill off">SUSPENSO</span>' : ""}<br><span style="font-size:14px;color:var(--muted)">Inscrito em ${fmtDate((a.criado_em || "").slice(0, 10))}${a.interesse ? " · Interesse: " + esc(((_a = curso(a.interesse)) == null ? void 0 : _a.titulo) || a.interesse) : ""}</span></td>
      <td>${esc(a.email || "")}<br>${esc(a.telefone || "")}</td><td><div class="chips">${chips}</div></td>
      <td style="min-width:120px">${a.matriculas.map((m) => {
      var _a2;
      const l = lessonsOf(m.curso_id);
      const d = l.filter((x) => (S.allProg || []).some((p) => p.user_id === a.id && p.aula_id === x.id)).length;
      return l.length ? `<div style="font-size:14px">${esc((((_a2 = curso(m.curso_id)) == null ? void 0 : _a2.titulo) || "").replace("Curso ", "").replace(" de Teologia", ""))}: ${Math.round(d * 100 / l.length)}%</div>` : "";
    }).join("") || "—"}</td>
      <td><div class="chips"><button class="btn btn-gold btn-sm" data-acomp="${a.id}">Ficha do aluno</button><button class="btn btn-navy btn-sm" data-lib="${a.id}">Liberar / editar acesso</button>
      <button class="btn btn-line btn-sm" data-card-admin="${a.id}">Enviar carteirinha PDF</button>
      <button class="btn btn-line btn-sm" data-reset="${a.id}">Enviar nova senha</button>
      <button class="btn btn-red btn-sm" data-bloq="${a.id}">${a.bloqueado ? "Reativar" : "Suspender"}</button></div></td></tr>`;
  }).join("") || `<tr><td colspan="5">Nenhum aluno encontrado.</td></tr>`;
  $$("[data-card-admin]").forEach((b) => b.onclick = () => dlgCarteirinha(S.alunos.find((a) => a.id === b.dataset.cardAdmin)));
  $$("[data-lib]").forEach((b) => b.onclick = () => dlgAcesso(S.alunos.find((a) => a.id === b.dataset.lib)));
  $$("[data-acomp]").forEach((b) => b.onclick = () => dlgAcomp(S.alunos.find((a) => a.id === b.dataset.acomp)));
  $$("[data-reset]").forEach((b) => b.onclick = async () => {
    const a = S.alunos.find((x) => x.id === b.dataset.reset);
    try {
      await API.forgot(a.email);
      modal(`<h3>Link enviado</h3><p>${API.demo ? "No modo demonstração nenhum e-mail é enviado. Com a plataforma ativada, " : ""}${esc(a.nome)} recebe em <b>${esc(a.email)}</b> um link para criar uma nova senha.</p><div class="acts"><button class="btn btn-gold" data-close>Fechar</button></div>`);
    } catch (e) {
      modal(`<h3>Não foi possível enviar</h3><p>${esc(e.message)}</p><div class="acts"><button class="btn btn-gold" data-close>Fechar</button></div>`);
    }
  });
  $$("[data-bloq]").forEach((b) => b.onclick = () => {
    const a = S.alunos.find((x) => x.id === b.dataset.bloq);
    confirmBox(a.bloqueado ? `Reativar o acesso de ${a.nome}?` : `Suspender todo o acesso de ${a.nome}? O aluno continuará vendo apenas as aulas de prévia.`, async () => {
      await API.setBloqueio(a.id, !a.bloqueado);
      renderAdmin();
    });
  });
}
async function dlgAcomp(a) {
  let tent = [];
  try {
    tent = await API.tentativasTodas();
  } catch (e) {
  }
  tent = tent.filter((t) => t.user_id === a.id);
  const prog = (S.allProg || []).filter((p) => p.user_id === a.id).map((p) => p.aula_id);
  const cursosAluno = CURSOS.filter((c) => a.matriculas.some((m) => m.curso_id === c.id) || lessonsOf(c.id).some((l) => prog.includes(l.id) || tent.some((t) => t.aula_id === l.id)));
  const blocos = cursosAluno.map((c) => {
    const l = lessonsOf(c.id);
    const d = l.filter((x) => prog.includes(x.id)).length;
    const hT = l.reduce((t, x) => t + (+x.horas || 0), 0), hD = l.filter((x) => prog.includes(x.id)).reduce((t, x) => t + (+x.horas || 0), 0);
    const m = a.matriculas.find((x) => x.curso_id === c.id);
    const linhas = l.map((x) => {
      const ts = tent.filter((t) => t.aula_id === x.id);
      const best = ts.length ? Math.max(...ts.map((t) => t.nota)) : null;
      return `<tr><td>${x.ordem}. ${esc(x.titulo)}</td><td>${prog.includes(x.id) ? '<span class="pill ok">CONCLUÍDA</span>' : '<span class="pill lock">PENDENTE</span>'}</td>
        <td>${best === null ? "—" : `<b style="color:${best >= CONFIG.NOTA_MINIMA ? "#1F6B45" : "#A3202F"}">${best}%</b>`}</td><td>${ts.length || "—"}</td></tr>`;
    }).join("");
    return `<div class="panel" style="padding:14px;margin:12px 0"><b class="cz" style="font-size:13px;color:var(--navy)">${esc(c.titulo)}</b>
      <div style="font-size:15px;color:var(--muted);margin:4px 0 8px">${m ? (isActive(m) ? "Acesso liberado" : "Acesso " + (m.status === "bloqueado" ? "suspenso" : "expirado")) + (m.expira_em ? " · até " + fmtDate(m.expira_em) : "") : "Sem matrícula"} · ${d} de ${l.length} aulas · ${hD} de ${hT} horas</div>
      <div class="progress"><i style="width:${l.length ? Math.round(d * 100 / l.length) : 0}%"></i></div>
      <div class="tbl-wrap" style="margin-top:10px"><table><thead><tr><th>Aula</th><th>Situação</th><th>Melhor nota</th><th>Tentativas</th></tr></thead><tbody>${linhas || '<tr><td colspan="4">Sem aulas.</td></tr>'}</tbody></table></div>
      ${l.length && d === l.length ? `<div class="done-banner" style="margin-top:10px">Curso concluído. A carteirinha é preparada e enviada separadamente pela Direção.</div>` : ""}</div>`;
  }).join("");
  let comps = [];
  try {
    comps = (S.pags || await API.comprovantes()).filter((c) => c.user_id === a.id);
  } catch (e) {
  }
  let ats = [];
  try {
    const tel = String(a.telefone || "").replace(/\D/g, "").slice(-8);
    ats = (await API.atendimentos()).filter((t) => {
      const c = String(t.contato || "") + " " + String(t.nome || "");
      return a.email && c.toLowerCase().includes(a.email.toLowerCase()) || tel.length >= 8 && c.replace(/\D/g, "").includes(tel);
    });
  } catch (e) {
  }
  let obs = { texto: "" }, obsErr = "";
  try {
    obs = await API.fichaObs(a.id);
  } catch (e) {
    obsErr = e.message;
  }
  const nreg = etuNumMatricula(a), ultimo = tent.concat().sort((x, y) => x.criado_em < y.criado_em ? 1 : -1)[0];
  const SP = { pendente: "A conferir", aprovado: "Aprovado", recusado: "Recusado" };
  modal(
    `<div class="fi-h"><div><h3 style="margin:0">Ficha do aluno</h3><p style="margin:4px 0 0;font-size:19px"><b>${esc(a.nome || "")}</b>${a.bloqueado ? ' <span class="pill off">SUSPENSO</span>' : ""}</p></div><div class="fi-n"><small>MATRÍCULA</small>${esc(nreg)}</div></div>
    <div class="fi-g"><div><small>E-MAIL</small>${esc(a.email || "—")}</div><div><small>WHATSAPP</small>${esc(a.telefone || "—")}</div><div><small>INSCRITO EM</small>${fmtDate((a.criado_em || "").slice(0, 10))}</div><div><small>INTERESSE</small>${esc(a.interesse || "—")}</div><div><small>ÚLTIMA PROVA</small>${ultimo ? fmtDate(ultimo.criado_em.slice(0, 10)) + " · " + ultimo.nota + "%" : "—"}</div><div><small>AULAS CONCLUÍDAS</small>${prog.length}</div></div>
    <div class="fi-sec">Matrículas</div>${a.matriculas.length ? a.matriculas.map((m) => {
      var _a;
      return `<div style="font-size:15.5px;margin:4px 0">• <b>${esc(((_a = curso(m.curso_id)) == null ? void 0 : _a.titulo) || m.curso_id)}</b> — ${isActive(m) ? '<span class="pill ok">ATIVA</span>' : m.status === "bloqueado" ? '<span class="pill off">SUSPENSA</span>' : '<span class="pill lock">VENCIDA</span>'}${m.expira_em ? " · vence em " + fmtDate(m.expira_em) : " · sem validade"}</div>`;
    }).join("") : '<p style="margin:4px 0;color:var(--muted)">Sem matrícula.</p>'}
    <div class="fi-sec">Cursos, aulas e notas</div>
    ${blocos || '<p class="msg info">Este aluno ainda não iniciou nenhum curso.</p>'}
    <div class="fi-sec">Pagamentos</div>${comps.length ? `<div class="tbl-wrap"><table><thead><tr><th>Data</th><th>Curso</th><th>Valor</th><th>Situação</th></tr></thead><tbody>${comps.map((c) => {
      var _a;
      return `<tr><td>${fmtDate((c.criado_em || "").slice(0, 10))}</td><td>${esc(((_a = curso(c.curso_id)) == null ? void 0 : _a.titulo) || c.curso_id || "")}</td><td>${c.valor ? brl(numBR(c.valor)) : "—"}</td><td>${esc(SP[c.status] || c.status || "")}</td></tr>`;
    }).join("")}</tbody></table></div>` : '<p style="margin:4px 0;color:var(--muted)">Nenhum comprovante enviado.</p>'}
    <div class="fi-sec">Atendimentos</div>${ats.length ? ats.slice(0, 8).map((t) => `<div style="font-size:15px;margin:6px 0;padding:8px;background:#FBF7EC;border-radius:8px"><b>${fmtDate((t.criado_em || "").slice(0, 10))}</b> — ${esc(String(t.mensagem || "").slice(0, 220))}</div>`).join("") : '<p style="margin:4px 0;color:var(--muted)">Nenhum atendimento registrado.</p>'}
    <div class="fi-sec">Anotações da Direção</div>${obsErr ? `<p class="msg info">${esc(obsErr)}</p>` : ""}
    <textarea id="fiObs" rows="4" placeholder="Ex.: pediu para pagar no dia 10; é obreiro na igreja tal; prefere contato à noite.">${esc(obs.texto || "")}</textarea>
    <div class="msg hidden" id="mFi"></div><div class="res"><button class="btn btn-navy btn-sm" id="fiSalvar" type="button">Salvar anotação</button><button class="btn btn-line btn-sm" id="fiImp" type="button">Imprimir a ficha</button></div>
    <div class="acts">${a.telefone ? `<a class="btn btn-line" href="https://wa.me/55${esc((a.telefone || "").replace(/\D/g, "").replace(/^55/, ""))}" target="_blank" rel="noopener">WhatsApp do aluno</a>` : ""}<button class="btn btn-gold" data-close>Fechar</button></div>`,
    (r) => {
      r.querySelector(".box").style.maxWidth = "760px";
      r.querySelector("#fiSalvar").onclick = async () => {
        try {
          await API.salvarFichaObs(a.id, r.querySelector("#fiObs").value);
          show(r.querySelector("#mFi"), "Anotação salva.", "ok");
        } catch (e) {
          show(r.querySelector("#mFi"), e.message, "err");
        }
      };
      r.querySelector("#fiImp").onclick = () => {
        const w = window.open("", "_blank");
        if (!w) return;
        const c = r.querySelector(".box").cloneNode(true);
        c.querySelectorAll("button,.acts,.res,.msg").forEach((x) => x.remove());
        const ta = c.querySelector("textarea");
        if (ta) {
          const p2 = document.createElement("p");
          p2.textContent = r.querySelector("#fiObs").value || "—";
          ta.replaceWith(p2);
        }
        w.document.write(`<html><head><title>Ficha — ${esc(a.nome || "")}</title><style>body{font-family:Georgia,serif;color:#1b2340;margin:26px;font-size:14px}h3{margin:0}.fi-h{display:flex;justify-content:space-between;border-bottom:2px solid #C9A24A;padding-bottom:8px}.fi-n{border:1.5px solid #C9A24A;padding:6px 10px;font-weight:700}.fi-g{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:10px 0}.fi-g div{border:1px solid #ddd;padding:5px}.fi-g small{display:block;color:#8C6A1E;font-size:11px}.fi-sec{font-weight:700;margin:14px 0 4px;border-bottom:1px solid #C9A24A}table{width:100%;border-collapse:collapse}td,th{border:1px solid #ccc;padding:4px;text-align:left}.progress{display:none}</style></head><body><p style="margin:0 0 8px"><b>ESCOLA TEOLÓGICA UNIÃO</b> · Curso Livre de Teologia · ficha de uso interno da Direção</p>${c.innerHTML}<p style="margin-top:18px;font-size:12px">Impresso em ${dataExtenso(/* @__PURE__ */ new Date())}. Documento interno; contém dados pessoais protegidos pela LGPD.</p></body></html>`);
        w.document.close();
        w.print();
      };
    }
  );
}
function dlgAcesso(a) {
  const plus = (d) => {
    const x = /* @__PURE__ */ new Date();
    x.setDate(x.getDate() + d);
    return x.toISOString().slice(0, 10);
  };
  const rows = CURSOS.map((c) => {
    const m = a.matriculas.find((x) => x.curso_id === c.id);
    return `<div class="panel" style="padding:14px;margin:10px 0"><b class="cz" style="font-size:13px;color:var(--navy)">${esc(c.titulo)}</b>
      <div class="grid2"><div><label for="st-${c.id}">Situação</label><select id="st-${c.id}">
        <option value="">Sem acesso</option><option value="ativo" ${(m == null ? void 0 : m.status) === "ativo" ? "selected" : ""}>Liberado</option><option value="bloqueado" ${(m == null ? void 0 : m.status) === "bloqueado" ? "selected" : ""}>Suspenso</option></select></div>
      <div><label for="ex-${c.id}">Acesso até</label><input type="date" id="ex-${c.id}" value="${(m == null ? void 0 : m.expira_em) || ""}"></div></div>
      <div class="chips" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-d="7" data-c="${c.id}">Prévia 7 dias</button><button type="button" class="btn btn-line btn-sm" data-d="30" data-c="${c.id}">30 dias</button><button type="button" class="btn btn-line btn-sm" data-d="365" data-c="${c.id}">1 ano</button></div></div>`;
  }).join("");
  modal(`<h3>Acesso de ${esc(a.nome)}</h3><p style="margin:6px 0 0;color:var(--muted);font-size:16px">Libere cursos inteiros, defina a validade ou conceda uma prévia por poucos dias.</p>${rows}
    <div class="acts"><button class="btn btn-line" data-close>Cancelar</button><button class="btn btn-gold" id="salvarAc">Salvar</button></div>`, (r, close) => {
    r.querySelectorAll("[data-d]").forEach((b) => b.onclick = () => {
      r.querySelector("#st-" + b.dataset.c).value = "ativo";
      r.querySelector("#ex-" + b.dataset.c).value = plus(+b.dataset.d);
    });
    r.querySelector("#salvarAc").onclick = async () => {
      for (const c of CURSOS) {
        const st = r.querySelector("#st-" + c.id).value, ex = r.querySelector("#ex-" + c.id).value;
        const had = a.matriculas.some((m) => m.curso_id === c.id);
        if (st) await API.setMatricula(a.id, c.id, st, ex);
        else if (had) await API.delMatricula(a.id, c.id);
      }
      close();
      renderAdmin();
    };
  });
}
function drawAulas() {
  const cid = $("#aCursoSel").value;
  const list = lessonsOf(cid);
  $("#tbAulas").innerHTML = list.map((a) => `<tr><td>${a.disc_ordem || 1}. ${esc(a.modulo)}</td><td>${a.ordem}</td><td><b>${esc(a.titulo)}</b></td><td>${a.horas || "—"}</td><td data-v="${a.id}">…</td><td data-p="${a.id}">…</td><td>${a.previa ? '<span class="pill ok">SIM</span>' : "—"}</td>
    <td><div class="chips"><button class="btn btn-line btn-sm" data-ed="${a.id}">Editar</button><button class="btn btn-red btn-sm" data-del="${a.id}">Excluir</button></div></td></tr>`).join("") || `<tr><td colspan="8">Nenhuma aula cadastrada neste curso.</td></tr>`;
  list.forEach(async (a) => {
    const c = await API.conteudo(a.id) || {};
    const v = $(`[data-v="${a.id}"]`), p = $(`[data-p="${a.id}"]`);
    if (v) v.textContent = c.video_url ? "✓" : "—";
    if (p) p.textContent = c.pdf_url ? "✓" : "—";
  });
  $$("[data-ed]").forEach((b) => b.onclick = () => dlgAula(S.aulas.find((a) => a.id === b.dataset.ed)));
  $$("[data-del]").forEach((b) => b.onclick = () => {
    const a = S.aulas.find((x) => x.id === b.dataset.del);
    confirmBox(`Excluir a aula “${a.titulo}”?`, async () => {
      await API.delAula(a.id);
      S.aulas = await API.aulas();
      renderAdmin();
    });
  });
}
async function dlgAula(a) {
  const cid = (a == null ? void 0 : a.curso_id) || $("#aCursoSel").value;
  const c = a ? await API.conteudo(a.id) || {} : {};
  if (a && API.apostilaBruta) {
    try {
      c.pdf_raw = await API.apostilaBruta(a.id);
    } catch (e) {
    }
  }
  let qs = a ? await API.questoesAdmin(a.id) : [];
  qs = qs.map((q) => {
    var _a;
    return { enunciado: q.enunciado, alternativas: [...q.alternativas || [], "", "", "", "", ""].slice(0, 5), correta: (_a = q.correta) != null ? _a : 0, explicacao: q.explicacao || "" };
  });
  const mods = [...new Set(lessonsOf(cid).map((x) => x.modulo))];
  modal(`<h3>${a ? "Editar aula" : "Nova aula"}</h3>
    <label for="fCur">Curso</label><select id="fCur">${CURSOS.map((x) => `<option value="${x.id}" ${x.id === cid ? "selected" : ""}>${esc(x.titulo)}</option>`).join("")}</select>
    <div class="grid2" style="grid-template-columns:2fr 1fr"><div><label for="fMod">Disciplina</label><input id="fMod" list="modsList" value="${esc((a == null ? void 0 : a.modulo) || mods[0] || "")}" placeholder="Ex.: Introdução à Teologia"><datalist id="modsList">${[.../* @__PURE__ */ new Set([...S.discs.filter((d) => d.curso_id === cid).map((d) => d.nome), ...mods])].map((m) => `<option value="${esc(m)}">`).join("")}</datalist></div>
    <div><label for="fDisc">Nº da disciplina</label><input id="fDisc" type="number" min="1" value="${(a == null ? void 0 : a.disc_ordem) || 1}"></div></div>
    <div class="grid3"><div><label for="fOrd">Nº da aula</label><input id="fOrd" type="number" min="1" value="${(a == null ? void 0 : a.ordem) || lessonsOf(cid).length + 1}"></div>
    <div><label for="fHor">Carga horária (h)</label><input id="fHor" type="number" min="0" step="0.5" value="${(a == null ? void 0 : a.horas) || ""}"></div>
    <div class="check" style="margin-top:42px"><input type="checkbox" id="fPrev" ${(a == null ? void 0 : a.previa) ? "checked" : ""}><label for="fPrev" style="margin:0;font-family:inherit;font-size:16px;letter-spacing:0;color:var(--ink);font-weight:400">Aula grátis</label></div></div>
    <label for="fTit">Título da aula</label><input id="fTit" value="${esc((a == null ? void 0 : a.titulo) || "")}">
    <label for="fDes">Descrição</label><textarea id="fDes" rows="3">${esc((a == null ? void 0 : a.descricao) || "")}</textarea>
    <label for="fPrevTxt">Texto bíblico e aplicação da prévia (1º parágrafo: o versículo; deixe uma linha em branco entre os parágrafos)</label><textarea id="fPrevTxt" rows="6">${esc((a == null ? void 0 : a.previa_texto) || "")}</textarea>
    <label for="fVid">Link do vídeo (YouTube “não listado”, Vimeo ou Google Drive)</label><input id="fVid" value="${esc(c.video_raw || c.video_url || "")}" placeholder="https://youtu.be/...">${uploadField("fVid", false, "video")}
    <label for="fAud">Link do áudio da aula (opcional — MP3 ou Google Drive)</label><input id="fAud" value="${esc(c.audio_raw || c.audio_url || "")}" placeholder="https://drive.google.com/...">${uploadField("fAud", false, "audio")}
    <div class="check"><input type="checkbox" id="fAmo" ${(a == null ? void 0 : a.apostila_amostra) ? "checked" : ""}><label for="fAmo" style="margin:0;font-family:inherit;font-size:16px;letter-spacing:0;color:var(--ink);font-weight:400">Apostila de amostra grátis (qualquer visitante pode ler a apostila desta aula)</label></div>
    <label for="fPdf">Link da apostila em PDF (Google Drive com “Qualquer pessoa com o link”)</label><input id="fPdf" value="${esc(c.pdf_raw || c.pdf_url || "")}" placeholder="https://drive.google.com/file/d/...">${uploadField("fPdf", false)}
    <h3 style="margin-top:22px">Prova da aula</h3>
    <p style="margin:4px 0 0;font-size:15px;color:var(--muted)">Questões com alternativas de A a E. Marque a alternativa correta. Nota mínima: ${CONFIG.NOTA_MINIMA}%.</p>
    <div id="qList"></div>
    <button type="button" class="btn btn-line btn-sm" id="addQ" style="margin-top:12px">Adicionar questão</button>
    <div class="msg hidden" id="mAula"></div>
    <div class="acts"><button class="btn btn-line" data-close>Cancelar</button><button class="btn btn-gold" id="salvarAula">Salvar aula</button></div>`, (r, close) => {
    const qList = r.querySelector("#qList");
    function readQs() {
      return [...qList.querySelectorAll(".qedit")].map((el) => {
        var _a;
        return {
          enunciado: el.querySelector(".qen").value.trim(),
          alternativas: [...el.querySelectorAll(".qalt")].map((i) => i.value.trim()),
          correta: +el.querySelector(".qok").value,
          explicacao: (((_a = el.querySelector(".qex")) == null ? void 0 : _a.value) || "").trim()
        };
      });
    }
    function drawQs() {
      qList.innerHTML = qs.map((q, i) => `<div class="qedit"><b class="cz" style="font-size:12px;color:var(--navy)">QUESTÃO ${i + 1}</b>
        <textarea class="qen" rows="2" placeholder="Enunciado da questão" aria-label="Enunciado da questão ${i + 1}" style="margin-top:6px">${esc(q.enunciado)}</textarea>
        ${q.alternativas.map((t, j) => `<div class="alt"><b>${LETRAS[j]}</b><input class="qalt" value="${esc(t)}" aria-label="Alternativa ${LETRAS[j]}"></div>`).join("")}
        <div class="grid2" style="align-items:end"><div><label>Alternativa correta</label><select class="qok">${LETRAS.map((L, j) => `<option value="${j}" ${q.correta === j ? "selected" : ""}>${L}</option>`).join("")}</select></div>
        <div><button type="button" class="btn btn-red btn-sm" data-rmq="${i}" style="margin-top:10px">Remover questão</button></div></div>
        <label>Explicação da resposta (aparece para o aluno depois que ele enviar a prova)</label><textarea class="qex" rows="2">${esc(q.explicacao || "")}</textarea></div>`).join("");
      qList.querySelectorAll("[data-rmq]").forEach((b) => b.onclick = () => {
        qs = readQs();
        qs.splice(+b.dataset.rmq, 1);
        drawQs();
      });
    }
    drawQs();
    r.querySelector("#fDisc").oninput = () => {
      const n = +r.querySelector("#fDisc").value;
      const d = S.discs.find((x) => x.curso_id === r.querySelector("#fCur").value && x.ordem === n);
      if (d) r.querySelector("#fMod").value = d.nome;
    };
    r.querySelector("#fMod").onchange = () => {
      const x = lessonsOf(r.querySelector("#fCur").value).find((l) => l.modulo === r.querySelector("#fMod").value.trim());
      if (x) r.querySelector("#fDisc").value = x.disc_ordem || 1;
    };
    bindUploads(r);
    r.querySelector("#addQ").onclick = () => {
      qs = readQs();
      qs.push({ enunciado: "", alternativas: ["", "", "", "", ""], correta: 0 });
      drawQs();
    };
    r.querySelector("#salvarAula").onclick = async () => {
      const m = r.querySelector("#mAula");
      const t = r.querySelector("#fTit").value.trim();
      if (!t) {
        show(m, "Informe o título da aula.", "err");
        return;
      }
      const lista = readQs();
      const bad = lista.findIndex((q) => !q.enunciado || q.alternativas.some((x) => !x));
      if (bad >= 0) {
        show(m, `Complete o enunciado e as cinco alternativas da questão ${bad + 1}.`, "err");
        return;
      }
      try {
        const cur = r.querySelector("#fCur").value;
        const id = await API.saveAula(
          { id: a == null ? void 0 : a.id, curso_id: cur, modulo: r.querySelector("#fMod").value.trim() || "Disciplina", disc_ordem: +r.querySelector("#fDisc").value || 1, ordem: +r.querySelector("#fOrd").value || 1, horas: +r.querySelector("#fHor").value || 0, titulo: t, descricao: r.querySelector("#fDes").value.trim(), previa_texto: r.querySelector("#fPrevTxt").value.trim(), previa: r.querySelector("#fPrev").checked, apostila_amostra: r.querySelector("#fAmo").checked },
          { video_url: r.querySelector("#fVid").value.trim(), audio_url: r.querySelector("#fAud").value.trim(), pdf_url: r.querySelector("#fPdf").value.trim() }
        );
        await API.saveQuestoes(id || (a == null ? void 0 : a.id), lista);
        S.aulas = await API.aulas();
        close();
        await renderAdmin();
        $("#aCursoSel").value = cur;
        drawAulas();
      } catch (e) {
        show(m, e.message, "err");
      }
    };
  });
}
function drawCursosAdm() {
  const el = $("#tbCursos");
  if (!el) return;
  el.innerHTML = CURSOS.slice().sort((a, b) => (a.ordem || 0) - (b.ordem || 0)).map((c) => {
    const t = totais(c.id);
    return `<tr><td><b>${esc(c.titulo)}</b><br><span style="font-size:14px;color:var(--muted)">${esc(c.cat || "")}</span></td><td>${c.tipo === "extra" ? "Curso extra" : "Formação"}</td><td>${t.disc}</td><td>${t.aulas}</td><td>${fmtH(t.horas)}</td>
      <td>${c.ativo === false ? '<span class="pill off">OCULTO</span>' : c.em_breve ? '<span class="pill lock">EM BREVE</span>' : '<span class="pill ok">VISÍVEL</span>'}</td><td><button class="btn btn-line btn-sm" data-edc="${c.id}">Editar</button></td></tr>`;
  }).join("");
  $$("[data-edc]").forEach((b) => b.onclick = () => dlgCurso(CURSOS.find((c) => c.id === b.dataset.edc)));
}
function slug(t) {
  return "x-" + t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
}
function dlgCurso(c) {
  var _a;
  const novo = !c;
  let capa = (c == null ? void 0 : c.capa) || "";
  modal(`<h3>${novo ? "Novo curso extra" : "Editar curso"}</h3>
    <label for="kTit">Título do curso</label><input id="kTit" value="${esc((c == null ? void 0 : c.titulo) || "")}" placeholder="Ex.: Curso de Hermenêutica Bíblica">
    <label for="kCat">Rótulo</label><input id="kCat" value="${esc((c == null ? void 0 : c.cat) || "Curso Extra")}">
    <label for="kDesc">Descrição (aparece no cartão e na página do curso)</label><textarea id="kDesc" rows="3">${esc((c == null ? void 0 : c.desc) || "")}</textarea>
    <label for="kDisc">Disciplinas do curso (uma por linha, na ordem; se quiser, escreva a descrição depois de “ — ”)</label>
    <textarea id="kDisc" rows="8" placeholder="Introdução à Teologia — Por que estudar teologia…&#10;Bibliologia — A doutrina das Escrituras…">${esc(discsOf((c == null ? void 0 : c.id) || "").filter((d) => S.discs.some((x) => x.curso_id === (c == null ? void 0 : c.id) && x.ordem === d.n)).map((d) => d.nome + (d.desc ? " — " + d.desc : "")).join("\n"))}</textarea>
    <div class="grid2"><div><label for="kOrd">Ordem de exibição</label><input id="kOrd" type="number" value="${(_a = c == null ? void 0 : c.ordem) != null ? _a : 20}"></div>
    <div class="check" style="margin-top:42px"><input type="checkbox" id="kAtivo" ${(c == null ? void 0 : c.ativo) === false ? "" : "checked"}><label for="kAtivo" style="margin:0;font-family:inherit;font-size:16px;letter-spacing:0;color:var(--ink);font-weight:400">Visível na plataforma</label></div></div>
    <div class="check"><input type="checkbox" id="kCert" ${novo ? "" : ofereceCertificado(c) ? "checked" : ""}><label for="kCert">Oferece certificado após concluir as aulas e provas</label></div>
    <div class="check"><input type="checkbox" id="kBreve" ${novo || (c == null ? void 0 : c.em_breve) ? "checked" : ""}><label for="kBreve">Em breve — anunciar sem liberar aulas ou matrícula</label></div>
    ${((c == null ? void 0 : c.tipo) || "extra") === "extra" ? `<label for="kCapa">Capa do curso (imagem horizontal)</label><input type="file" id="kCapa" accept="image/*">
    <div id="kPrev" style="margin-top:10px;border-radius:8px;overflow:hidden;border:1px solid #E1D4B2"></div>
    <button type="button" class="btn btn-line btn-sm" id="kSemCapa" style="margin-top:8px">Usar capa padrão da ETU</button>` : ""}
    <div class="msg hidden" id="mK"></div>
    <div class="acts"><button class="btn btn-line" data-close>Cancelar</button><button class="btn btn-gold" id="kSalvar">Salvar curso</button></div>`, (r, close) => {
    const prev = () => {
      const p = r.querySelector("#kPrev");
      if (p) p.innerHTML = capaHTML({ titulo: r.querySelector("#kTit").value || "Título do curso", capa }, 140);
    };
    prev();
    r.querySelector("#kTit").oninput = prev;
    const fi = r.querySelector("#kCapa");
    if (fi) fi.onchange = async () => {
      const f = fi.files[0];
      if (!f) return;
      const img = await new Promise((ok, no) => {
        const i = new Image();
        i.onload = () => ok(i);
        i.onerror = no;
        i.src = URL.createObjectURL(f);
      });
      const W = 960, H = 540, cv = document.createElement("canvas");
      cv.width = W;
      cv.height = H;
      const k = Math.max(W / img.width, H / img.height), w = img.width * k, h = img.height * k;
      cv.getContext("2d").drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
      capa = cv.toDataURL("image/jpeg", 0.8);
      prev();
    };
    const sc = r.querySelector("#kSemCapa");
    if (sc) sc.onclick = () => {
      capa = "";
      prev();
    };
    r.querySelector("#kSalvar").onclick = async () => {
      const t = r.querySelector("#kTit").value.trim();
      if (!t) return show(r.querySelector("#mK"), "Informe o título do curso.", "err");
      const obj = { id: (c == null ? void 0 : c.id) || slug(t), tipo: (c == null ? void 0 : c.tipo) || "extra", nivel: (c == null ? void 0 : c.nivel) || 0, titulo: t, cat: r.querySelector("#kCat").value.trim() || "Curso Extra", desc: r.querySelector("#kDesc").value.trim(), ordem: +r.querySelector("#kOrd").value || 0, ativo: r.querySelector("#kAtivo").checked, oferece_certificado: r.querySelector("#kCert").checked, em_breve: r.querySelector("#kBreve").checked, capa };
      const linhas = r.querySelector("#kDisc").value.split("\n").map((x) => x.trim()).filter(Boolean).map((x) => {
        const p = x.split(/\s+[—-]\s+/);
        return { nome: p[0].trim(), descricao: (p.slice(1).join(" — ") || "").trim() };
      });
      try {
        await API.saveCurso(obj, novo);
        await API.saveDisciplinas(obj.id, linhas);
        CURSOS = await API.cursos();
        S.discs = await API.disciplinas();
        fillSelects();
        renderTicker();
        close();
        drawCursosAdm();
      } catch (e) {
        show(r.querySelector("#mK"), e.message, "err");
      }
    };
  });
}
async function drawArquivos() {
  var _a;
  const el = $("#tbArq");
  if (!el) return;
  const rows = [];
  for (const a of S.aulas) {
    let c = {};
    try {
      c = await API.conteudo(a.id) || {};
    } catch (e) {
    }
    if (c.pdf_url) rows.push({ t: `Apostila — ${a.titulo}`, o: `${((_a = curso(a.curso_id)) == null ? void 0 : _a.titulo) || ""} · ${a.modulo}`, ac: a.apostila_amostra ? "Amostra grátis (só leitura)" : "Somente matriculados", u: c.pdf_url });
  }
  S.estudos.forEach((e) => {
    if (e.pdf_url) rows.push({ t: e.titulo, o: "Biblioteca gratuita · " + e.tipo, ac: "Grátis (ler e baixar)", u: e.pdf_url });
  });
  el.innerHTML = rows.map((r) => `<tr><td><b>${esc(r.t)}</b></td><td>${esc(r.o)}</td><td>${esc(r.ac)}</td><td><div class="chips"><a class="btn btn-line btn-sm" href="${esc(r.u)}" target="_blank" rel="noopener">Abrir</a>${/drive\.google/.test(r.u) ? `<a class="btn btn-line btn-sm" href="${esc(driveDownload(r.u))}" target="_blank" rel="noopener">Baixar</a>` : ""}</div></td></tr>`).join("") || '<tr><td colspan="4">Nenhum arquivo ainda.</td></tr>';
}
function drawEstudosAdm() {
  const el = $("#tbEstudos");
  if (!el) return;
  el.innerHTML = S.estudos.map((e) => `<tr><td><span class="pill lock">${esc((e.tipo || "").toUpperCase())}</span></td><td><b>${esc(e.titulo)}</b><br><span style="font-size:14px;color:var(--muted)">${esc(e.descricao || "")}</span></td>
    <td>${e.ativo === false ? '<span class="pill off">OCULTO</span>' : '<span class="pill ok">VISÍVEL</span>'}</td>
    <td><div class="chips"><button class="btn btn-line btn-sm" data-ee="${e.id}">Editar</button><button class="btn btn-red btn-sm" data-ed2="${e.id}">Excluir</button></div></td></tr>`).join("") || '<tr><td colspan="4">Nenhum estudo cadastrado.</td></tr>';
  $$("[data-ee]").forEach((b) => b.onclick = () => dlgEstudo(S.estudos.find((x) => x.id === b.dataset.ee)));
  $$("[data-ed2]").forEach((b) => b.onclick = () => {
    const e = S.estudos.find((x) => x.id === b.dataset.ed2);
    confirmBox(`Excluir “${e.titulo}”?`, async () => {
      await API.delEstudo(e.id);
      S.estudos = await API.estudos();
      drawEstudosAdm();
    });
  });
}
function dlgEstudo(e) {
  var _a;
  const tipos = ["Esboço de pregação", "Estudo", "Revista", "Escola Dominical", "Apostila"];
  modal(`<h3>${e ? "Editar estudo" : "Novo estudo"}</h3>
    <label for="esTipo">Tipo</label><select id="esTipo">${tipos.map((t) => `<option ${(e == null ? void 0 : e.tipo) === t ? "selected" : ""}>${t}</option>`).join("")}</select>
    <label for="esTit">Título</label><input id="esTit" value="${esc((e == null ? void 0 : e.titulo) || "")}">
    <label for="esDesc">Descrição curta</label><textarea id="esDesc" rows="2">${esc((e == null ? void 0 : e.descricao) || "")}</textarea>
    <label for="esPdf">Link do PDF (Google Drive, “Qualquer pessoa com o link”)</label><input id="esPdf" value="${esc((e == null ? void 0 : e.pdf_url) || "")}" placeholder="https://drive.google.com/file/d/...">${uploadField("esPdf", true)}
    <div class="grid2"><div><label for="esOrd">Ordem</label><input id="esOrd" type="number" value="${(_a = e == null ? void 0 : e.ordem) != null ? _a : S.estudos.length + 1}"></div>
    <div class="check" style="margin-top:42px"><input type="checkbox" id="esAt" ${(e == null ? void 0 : e.ativo) === false ? "" : "checked"}><label for="esAt" style="margin:0;font-family:inherit;font-size:16px;letter-spacing:0;color:var(--ink);font-weight:400">Visível</label></div></div>
    <div class="msg hidden" id="mEs"></div>
    <div class="acts"><button class="btn btn-line" data-close>Cancelar</button><button class="btn btn-gold" id="esOk">Salvar</button></div>`, (r, close) => {
    bindUploads(r);
    r.querySelector("#esOk").onclick = async () => {
      const t = r.querySelector("#esTit").value.trim();
      if (!t) return show(r.querySelector("#mEs"), "Informe o título.", "err");
      try {
        await API.saveEstudo({ id: e == null ? void 0 : e.id, tipo: r.querySelector("#esTipo").value, titulo: t, descricao: r.querySelector("#esDesc").value.trim(), pdf_url: r.querySelector("#esPdf").value.trim(), ordem: +r.querySelector("#esOrd").value || 0, ativo: r.querySelector("#esAt").checked });
        S.estudos = await API.estudos();
        close();
        drawEstudosAdm();
      } catch (er) {
        show(r.querySelector("#mEs"), er.message, "err");
      }
    };
  });
}
function drawMural() {
  $("#tbMural").innerHTML = S.mural.map((m) => `<tr><td><span class="pill lock">${esc((m.tipo || "").toUpperCase())}</span></td><td><b>${esc(m.titulo)}</b><br><span style="font-size:14px;color:var(--muted)">${esc(m.texto || "")}</span></td><td>${m.video_url ? "✓" : "—"}</td>
    <td><div class="chips"><button class="btn btn-line btn-sm" data-med="${m.id}">Editar</button><button class="btn btn-red btn-sm" data-mdel="${m.id}">Excluir</button></div></td></tr>`).join("") || `<tr><td colspan="4">Nenhum item no mural.</td></tr>`;
  $$("[data-med]").forEach((b) => b.onclick = () => dlgMural(S.mural.find((x) => x.id === b.dataset.med)));
  $$("[data-mdel]").forEach((b) => b.onclick = () => {
    const m = S.mural.find((x) => x.id === b.dataset.mdel);
    confirmBox(`Excluir “${m.titulo}” do mural?`, async () => {
      await API.delMural(m.id);
      S.mural = await API.mural();
      drawMural();
      renderTicker();
    });
  });
}
function dlgMural(m) {
  const tipos = ["Aviso", "Anúncio", "Depoimento", "Lançamento", "Áudio", "Podcast", "Enquete", "Pergunta e resposta", "Desafio bíblico", "Pedido de oração", "Evento", "Concluinte"];
  const muLs = etuOpcoes((m == null ? void 0 : m.texto) || ""), muNiv = (muLs.find((x) => x.startsWith("#")) || "#Básico").slice(1), muDt = (muLs.find((x) => x.startsWith("@")) || "@").slice(1);
  modal(`<h3>${m ? "Editar item do mural" : "Novo item do mural"}</h3>
    <label for="muTipo">Tipo</label><select id="muTipo">${tipos.map((t) => `<option ${(m == null ? void 0 : m.tipo) === t ? "selected" : ""}>${t}</option>`).join("")}</select>
    <label for="muTit">Título</label><input id="muTit" value="${esc((m == null ? void 0 : m.titulo) || "")}">
    <label for="muTxt">Texto</label><textarea id="muTxt" rows="3">${esc(etuTextoSem((m == null ? void 0 : m.texto) || ""))}</textarea>
    <label for="muVid">Link do vídeo ou do áudio (opcional — YouTube, Google Drive, Spotify ou arquivo .mp3)</label><input id="muVid" value="${esc((m == null ? void 0 : m.video_url) || "")}" placeholder="https://...">
    <div id="muOpBox"><label for="muOps" id="muOpsLb">Opções da enquete (uma por linha, até 10)</label><textarea id="muOps" rows="4" placeholder="Opção 1&#10;Opção 2">${esc(muLs.filter((x) => !x.startsWith("#") && !x.startsWith("@")).join("\n"))}</textarea></div>
    <div id="muNivBox"><label for="muNiv">Nível da pergunta</label><select id="muNiv">${["Básico", "Médio", "Avançado", "Quem sou eu?"].map((n) => `<option ${muNiv === n ? "selected" : ""}>${n}</option>`).join("")}</select></div>
    <div id="muDtBox"><label for="muDt">Data e hora do evento</label><input id="muDt" type="datetime-local" value="${esc(muDt)}"></div>
    <p style="font-size:14.5px;color:var(--muted);margin:6px 0 0">Áudio e Podcast aparecem em “Áudios e podcast”. Pergunta e resposta aparece em “Perguntas teológicas” (título = pergunta; texto = resposta). Enquete: escreva a pergunta no título e as opções acima. Desafio bíblico: pergunta no título, alternativas acima com * antes da certa, e a explicação com o texto bíblico no campo Texto. Pedido de oração: publique só com autorização e sem o nome. Evento: aparece na Agenda e avisa no dia. Concluinte: nome do aluno no título (com autorização) e o curso no texto.</p>
    <div class="msg hidden" id="mMu"></div>
    <div class="acts"><button class="btn btn-line" data-close>Cancelar</button><button class="btn btn-gold" id="salvarMu">Salvar</button></div>`, (r, close) => {
    const muT = r.querySelector("#muTipo"), muB = r.querySelector("#muOpBox");
    const muF = () => {
      const v = muT.value;
      muB.style.display = v === "Enquete" || v === "Desafio bíblico" ? "" : "none";
      r.querySelector("#muOpsLb").textContent = v === "Desafio bíblico" ? "Alternativas (uma por linha; coloque * antes da certa)" : "Opções da enquete (uma por linha, até 10)";
      r.querySelector("#muNivBox").style.display = v === "Desafio bíblico" ? "" : "none";
      r.querySelector("#muDtBox").style.display = v === "Evento" ? "" : "none";
    };
    muT.onchange = muF;
    muF();
    r.querySelector("#salvarMu").onclick = async () => {
      const t = r.querySelector("#muTit").value.trim();
      if (!t) {
        show(r.querySelector("#mMu"), "Informe o título.", "err");
        return;
      }
      const tp = r.querySelector("#muTipo").value;
      let tx = r.querySelector("#muTxt").value.trim();
      if (tp === "Enquete") {
        const ops = r.querySelector("#muOps").value.split("\n").map((x) => x.trim()).filter(Boolean).slice(0, 10);
        if (ops.length < 2) {
          show(r.querySelector("#mMu"), "A enquete precisa de pelo menos 2 opções.", "err");
          return;
        }
        tx = tx + "\n" + ETU_OPS + "\n" + ops.join("\n");
      }
      if (tp === "Desafio bíblico") {
        const ops = r.querySelector("#muOps").value.split("\n").map((x) => x.trim()).filter(Boolean).slice(0, 10);
        if (ops.length < 2 || ops.filter((x) => x.startsWith("*")).length !== 1) {
          show(r.querySelector("#mMu"), "Escreva pelo menos 2 alternativas e marque só a certa com * no início.", "err");
          return;
        }
        tx = tx + "\n" + ETU_OPS + "\n#" + r.querySelector("#muNiv").value + "\n" + ops.join("\n");
      }
      if (tp === "Evento") {
        const d = r.querySelector("#muDt").value;
        if (!d) {
          show(r.querySelector("#mMu"), "Informe a data e a hora do evento.", "err");
          return;
        }
        tx = tx + "\n" + ETU_OPS + "\n@" + d;
      }
      try {
        await API.saveMural({ id: m == null ? void 0 : m.id, tipo: tp, titulo: t, texto: tx, video_url: r.querySelector("#muVid").value.trim() });
        close();
        S.mural = await API.mural();
        drawMural();
        renderTicker();
      } catch (e) {
        show(r.querySelector("#mMu"), e.message, "err");
      }
    };
  });
}
function drawMensalidadeCfg() {
  const box = document.createElement("div");
  box.className = "panel";
  box.style.marginTop = "18px";
  box.innerHTML = `<h3>Mensalidades e provas: aviso, tolerância e nota mínima</h3>
    <p style="margin:0 0 10px;color:var(--muted);font-size:16px">O aluno começa a receber o lembrete do seu compromisso alguns dias antes do vencimento. Se o pagamento não for identificado, ele ainda estuda durante o prazo de tolerância, sempre vendo o aviso. Terminado esse prazo, as aulas e apostilas daquele curso são bloqueadas automaticamente, e voltam assim que a direção confirmar o pagamento.</p>
    <div class="grid2"><div><label for="cfAviso">Avisar quantos dias antes do vencimento</label><input id="cfAviso" type="number" min="0" max="30" value="${CONFIG.AVISO_DIAS}"></div>
    <div><label for="cfTol">Dias de tolerância depois do vencimento</label><input id="cfTol" type="number" min="0" max="60" value="${CONFIG.TOLERANCIA_DIAS}"></div></div>
    <label for="cfNota">Nota mínima para aprovação nas provas (%)</label><input id="cfNota" type="number" min="0" max="100" value="${CONFIG.NOTA_MINIMA}">
    <div class="msg hidden" id="mCfg"></div><div class="res"><button class="btn btn-gold" id="cfSalvar" type="button">Salvar</button></div>`;
  $("#configPanel").after(box);
  box.querySelector("#cfSalvar").onclick = async () => {
    const a = Math.max(0, +box.querySelector("#cfAviso").value || 0), t = Math.max(0, +box.querySelector("#cfTol").value || 0);
    const nm = Math.min(100, Math.max(0, +box.querySelector("#cfNota").value || 70));
    try {
      await API.saveEscolaConfig({ aviso_dias: a, tolerancia_dias: t, nota_minima: nm });
      CONFIG.AVISO_DIAS = a;
      CONFIG.TOLERANCIA_DIAS = t;
      CONFIG.NOTA_MINIMA = nm;
      show(box.querySelector("#mCfg"), "Configuração salva.", "ok");
    } catch (e) {
      show(box.querySelector("#mCfg"), e.message, "err");
    }
  };
}
function drawConfig() {
  document.querySelectorAll("#configPanel ~ .panel").forEach((x) => x.remove());
  setTimeout(drawMensalidadeCfg, 0);
  setTimeout(drawContaDir, 0);
  setTimeout(drawVideoCfg, 0);
  setTimeout(drawCanaisAdm, 0);
  $("#configPanel").innerHTML = API.demo ? `<h3>Modo demonstração</h3><p>A plataforma está funcionando apenas neste navegador, para você conhecer e testar. Para receber alunos de verdade — com contas próprias, e-mail de “esqueci a senha” e acesso pelo celular de cada um — preencha o bloco <b>CONFIG</b> no início do código com os dados do seu projeto Supabase, como explicado no guia de ativação.</p>
     <div class="res"><button class="btn btn-red btn-sm" id="resetDemo">Apagar dados de teste</button></div>` : `<h3>Plataforma ativa</h3><p>Conectada ao banco de dados da escola. Novos alunos se inscrevem pela página de inscrição e aparecem na aba “Alunos”, aguardando a liberação do acesso.</p>
     <p>Para tornar outra pessoa administradora, marque a coluna <b>is_admin</b> do perfil dela no painel do Supabase.</p>`;
  const r = $("#resetDemo");
  if (r) r.onclick = () => confirmBox("Apagar todos os dados de teste e voltar ao início?", async () => {
    API.reset();
    await API.signOut();
    await refreshUser();
    location.hash = "inicio";
  });
}
(function() {
  const u = CONFIG.LINK_PUBLICO, msg = "Conheça a Escola Teológica União — Curso Livre de Teologia: formação bíblica, teológica e ministerial. Acesse: " + u;
  $("#cpUrl").textContent = u;
  $("#cpZap").href = "https://wa.me/?text=" + encodeURIComponent(msg);
  $("#cpCopiar").onclick = async () => {
    try {
      await navigator.clipboard.writeText(u);
    } catch (e) {
      const t = document.createElement("textarea");
      t.value = u;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    $("#cpCopiar").textContent = "Link copiado ✓";
    setTimeout(() => $("#cpCopiar").textContent = "Copiar o link", 2500);
  };
  if (navigator.share) $("#cpShare").onclick = () => navigator.share({ title: "Escola Teológica União", text: msg, url: u }).catch(() => {
  });
  else $("#cpShare").style.display = "none";
})();
function certBar(c) {
  if (!ofereceCertificado(c) || c.em_breve) return "";
  return `<div class="cert-bar" role="status"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="6" fill="none" stroke="#fff" stroke-width="2"/><path d="M9 14l-2 8 5-3 5 3-2-8" fill="none" stroke="#fff" stroke-width="2"/><path d="M9.5 9l1.8 1.8L14.8 7.3" fill="none" stroke="#fff" stroke-width="2"/></svg>
  <b>Certificado disponível<small>${esc(c.titulo)} concluído</small></b><a href="#certificado-${esc(c.id)}" data-baixar>Baixar certificado</a></div>`;
}
function cursoConcluido(cid) {
  const l = lessonsOf(cid);
  return hasAccess(cid) && l.length && l.every((a) => S.prog.includes(a.id));
}
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-baixar]")) S.autoPrint = true;
});
function drawValidar() {
  const ir = async () => {
    const c = $("#vdIn").value.trim().toUpperCase(), r = $("#vdRes");
    if (!c) {
      r.innerHTML = "";
      return;
    }
    try {
      const L = await API.validarDoc(c);
      r.innerHTML = L.length ? L.map((d) => `<div class="vf ${d.situacao === "válido" ? "ok" : "ind"}"><b class="t">Documento localizado no registro da Escola Teológica União</b>${d.tipo === "certificado" ? "Certificado" : "Carteira de estudante"} de <b>${esc(d.nome)}</b> — ${esc(d.curso)}.<br>Emitido em ${fmtDate(String(d.emitido_em).slice(0, 10))}.${d.situacao && d.situacao !== "válido" ? `<br><b>Situação: ${esc(d.situacao)}</b>` : ""}</div>`).join("") : `<div class="vf no"><b class="t">✕ Código não encontrado</b>Este código não corresponde a nenhum documento emitido pela Escola Teológica União. Confira se foi digitado corretamente. Se persistir, o documento pode ser falso: avise a Direção pelo WhatsApp oficial.</div>`;
    } catch (e) {
      r.innerHTML = `<div class="vf ind"><b class="t">Validação indisponível no momento</b>${esc(e.message)}</div>`;
    }
  };
  $("#vdBt").onclick = ir;
  $("#vdIn").onkeydown = (e) => {
    if (e.key === "Enter") ir();
  };
  if (S.codValidar) {
    $("#vdIn").value = S.codValidar;
    S.codValidar = null;
    ir();
  }
}
function drawIdioma() {
  const base = CONFIG.LINK_PUBLICO.replace(/^https?:\/\//, "").replace(/\/$/, ""), host = base.split("/")[0].replace(/-/g, "--").replace(/\./g, "-");
  $$("[data-lang]").forEach((a) => a.href = `https://${host}.translate.goog/?_x_tr_sl=pt&_x_tr_tl=${a.dataset.lang}&_x_tr_hl=pt-BR`);
}
function drawPerfil() {
  const B = $("#perfilBox");
  if (!B || !S.user) return;
  const p = S.profile || {};
  B.innerHTML = `<h3>Meu perfil</h3>
   <p style="margin:0 0 10px;color:var(--muted);font-size:16px">Mantenha seus dados atualizados: é por eles que a escola fala com você sobre matrícula, mensalidade e documentos.</p>
   <div class="grid2"><div><label for="pfNome">Nome completo (sai no certificado e na carteirinha)</label><input id="pfNome" value="${esc(p.nome || "")}"></div>
   <div><label for="pfTel">WhatsApp com DDD</label><input id="pfTel" value="${esc(p.telefone || "")}" inputmode="tel"></div></div>
   <label for="pfEmail">E-mail de acesso</label><input id="pfEmail" type="email" value="${esc(p.email || S.user.email || "")}">
   <details style="margin-top:12px"><summary style="cursor:pointer;font-weight:700;color:var(--navy)">Trocar minha senha</summary>
    <div class="grid2"><div><label for="pfNova">Nova senha (mínimo de 8 caracteres)</label><input id="pfNova" type="password" autocomplete="new-password"></div><div><label for="pfConf">Repita a nova senha</label><input id="pfConf" type="password" autocomplete="new-password"></div></div></details>
   <label for="pfAtual">Senha atual (para confirmar qualquer mudança)</label><input id="pfAtual" type="password" autocomplete="current-password">
   <div class="msg hidden" id="mPf"></div><div class="res"><button class="btn btn-gold" id="pfSalvar" type="button">Salvar meu perfil</button></div>`;
  ligaOlho(B);
  $("#pfSalvar").onclick = async () => {
    const m = $("#mPf"), nova = $("#pfNova").value, conf = $("#pfConf").value, atual = $("#pfAtual").value, email = $("#pfEmail").value.trim(), nome = $("#pfNome").value.trim(), tel = $("#pfTel").value.trim();
    if (!atual) return show(m, "Digite a sua senha atual para confirmar.", "err");
    if (nome.length < 3) return show(m, "Digite o seu nome completo.", "err");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return show(m, "Digite um e-mail válido.", "err");
    if (nova && (nova.length < 8 || nova !== conf)) return show(m, nova.length < 8 ? "A nova senha precisa ter pelo menos 8 caracteres." : "As duas senhas novas não são iguais.", "err");
    try {
      const aviso = await API.atualizarConta({ nome, telefone: tel, email, pw: nova || null, atual });
      await refreshUser();
      drawPerfil();
      show($("#mPf"), "Perfil atualizado." + (aviso ? " " + aviso : ""), "ok");
    } catch (e) {
      show(m, e.message, "err");
    }
  };
}
const favKey = () => {
  var _a;
  return "etu_fav_" + (((_a = S.user) == null ? void 0 : _a.id) || "x");
};
function favs() {
  try {
    return JSON.parse(localStorage.getItem(favKey()) || "[]");
  } catch (e) {
    return [];
  }
}
function togFav(cid) {
  const f = favs();
  const i = f.indexOf(cid);
  if (i >= 0) f.splice(i, 1);
  else f.push(cid);
  try {
    localStorage.setItem(favKey(), JSON.stringify(f));
  } catch (e) {
  }
  return i < 0;
}
function proxAula(cid) {
  return lessonsOf(cid).find((a) => !S.prog.includes(a.id));
}
function acoesCurso(cid) {
  const pode = S.user && hasAccess(cid), px = pode && proxAula(cid), fav = favs().includes(cid);
  return `<div class="acoes-curso">${pode && lessonsOf(cid).length ? `<button class="btn btn-gold btn-sm" type="button" id="acCont">${px ? S.prog.length ? "Continuar de onde parei" : "Começar o curso" : "Rever as aulas"}</button>` : ""}
    ${S.user ? `<button class="btn btn-line btn-sm" type="button" id="acFav" aria-pressed="${fav}">${fav ? "★ Nos favoritos" : "☆ Favoritar"}</button>` : ""}
    <button class="btn btn-line btn-sm" type="button" id="acShare">Compartilhar</button></div>`;
}
function ligaAcoesCurso(cid) {
  const c = curso(cid);
  const ct = $("#acCont");
  if (ct) ct.onclick = () => {
    const a = proxAula(cid) || lessonsOf(cid)[0];
    if (!a) return;
    const d = discsOf(cid).find((x) => x.aulas.some((y) => y.id === a.id));
    S.disc = d.n + "|" + d.nome;
    S.aula = a.id;
    openCurso(cid);
    setTimeout(() => $("#coursePlayer").scrollIntoView({ behavior: "smooth" }), 200);
  };
  const fv = $("#acFav");
  if (fv) fv.onclick = () => {
    const on = togFav(cid);
    fv.textContent = on ? "★ Nos favoritos" : "☆ Favoritar";
    fv.setAttribute("aria-pressed", on);
  };
  $("#acShare").onclick = async () => {
    const u = CONFIG.LINK_PUBLICO + "#curso-" + cid, t = `${c.titulo} — Escola Teológica União, Curso Livre de Teologia`;
    if (navigator.share) {
      navigator.share({ title: t, text: t, url: u }).catch(() => {
      });
    } else {
      try {
        await navigator.clipboard.writeText(u);
        $("#acShare").textContent = "Link copiado ✓";
      } catch (e) {
      }
    }
  };
}
function cartaoCurso(c) {
  const l = lessonsOf(c.id), d = l.filter((a) => S.prog.includes(a.id)).length, p = l.length ? Math.round(d * 100 / l.length) : 0;
  return `<a class="cartao" href="#curso-${esc(c.id)}"><div class="tp"><small>${esc((c.cat || "CURSO").toUpperCase())}</small><b>${esc(c.titulo)}</b></div><div class="barra"><i style="width:${p}%"></i></div><div class="bt">${d} de ${l.length} aulas · ${p}%</div></a>`;
}
function drawPrateleiras() {
  const cont = ativosCursos().filter((c) => S.user && hasAccess(c.id) && lessonsOf(c.id).length && lessonsOf(c.id).some((a) => !S.prog.includes(a.id)));
  const fv = ativosCursos().filter((c) => favs().includes(c.id));
  const pc = $("#pratCont"), pf = $("#pratFav");
  if (pc) {
    pc.classList.toggle("hidden", !(S.user && cont.length));
    $("#trCont").innerHTML = cont.map(cartaoCurso).join("");
  }
  if (pf) {
    pf.classList.toggle("hidden", !(S.user && fv.length));
    $("#trFav").innerHTML = fv.map(cartaoCurso).join("");
  }
}
(function() {
  const sl = [...document.querySelectorAll("#banner .sl")];
  const dots = $("#bDots");
  if (!sl.length) return;
  let i = 0, t;
  dots.innerHTML = sl.map((_, k) => `<button type="button" aria-label="Anúncio ${k + 1}" class="${k ? "" : "on"}"></button>`).join("");
  const ir = (k) => {
    sl[i].classList.remove("on");
    dots.children[i].classList.remove("on");
    i = (k + sl.length) % sl.length;
    sl[i].classList.add("on");
    dots.children[i].classList.add("on");
  };
  const auto = () => {
    clearInterval(t);
    t = setInterval(() => ir(i + 1), 6e3);
  };
  [...dots.children].forEach((b, k) => b.onclick = () => {
    ir(k);
    auto();
  });
  auto();
})();
function marcaTab(view) {
  var _a, _b;
  etuMostraVolta(view);
  const m = { inicio: "inicio", cursos: "cursos", curso: "cursos", busca: "busca", aluno: "conta", entrar: "conta", admin: "conta" }[view];
  (_a = $("#tbMenu")) == null ? void 0 : _a.classList.toggle("on", ["mais", "validar", "idioma", "termos", "sobre"].includes(view));
  $$("#tabbar [data-tb]").forEach((a) => a.classList.toggle("on", a.dataset.tb === m));
  const c = $("#tbConta");
  if (c) {
    const adm = (_b = S.profile) == null ? void 0 : _b.is_admin;
    c.href = S.user ? adm ? "#admin" : "#aluno" : VITRINE && !window.ETU_LOJA ? "#matricula" : "#entrar";
    $("#tbContaT").textContent = S.user ? adm ? "Direção" : "Minha Área" : VITRINE && !window.ETU_LOJA ? "Matrícula" : "Entrar";
  }
}
$("#tbMenu").onclick = () => {
  if (location.hash === "#mais") {
    if (etuNavPassos > 0) history.back();
    else location.hash = "inicio";
  } else location.hash = "mais";
};
function buscar() {
  const q = ($("#bsIn").value || "").trim().toLowerCase(), R = $("#bsRes");
  if (!R) return;
  if (q.length < 2) {
    R.innerHTML = '<p style="color:var(--muted);margin-top:14px">Digite pelo menos duas letras.</p>';
    return;
  }
  const sem = (t) => String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(), qq = sem(q);
  const hl = (t) => {
    const s = String(t || "");
    const k = sem(s).indexOf(qq);
    return k < 0 ? esc(s) : esc(s.slice(0, k)) + "<mark>" + esc(s.slice(k, k + q.length)) + "</mark>" + esc(s.slice(k + q.length));
  };
  const out = [];
  ativosCursos().forEach((c) => {
    if (sem(c.titulo + " " + (c.desc || "") + " " + (c.cat || "")).includes(qq)) out.push(`<a href="#curso-${esc(c.id)}"><small>CURSO</small><b>${hl(c.titulo)}</b><span>${hl((c.desc || "").slice(0, 160))}</span></a>`);
    discsOf(c.id).forEach((d) => {
      if (sem(d.nome + " " + d.desc).includes(qq)) out.push(`<a href="#curso-${esc(c.id)}" data-bdisc="${esc(c.id)}|${esc(d.n + "|" + d.nome)}"><small>DISCIPLINA · ${esc(c.titulo)}</small><b>${hl(d.nome)}</b><span>${d.aulas.length} aula${d.aulas.length === 1 ? "" : "s"}</span></a>`);
      d.aulas.forEach((a) => {
        if (sem(a.titulo + " " + (a.descricao || "")).includes(qq)) out.push(`<a href="#curso-${esc(c.id)}" data-baula="${esc(c.id)}|${esc(d.n + "|" + d.nome)}|${esc(a.id)}"><small>AULA · ${esc(d.nome)}</small><b>${hl(a.titulo)}</b><span>${hl((a.descricao || "").slice(0, 140))}</span></a>`);
      });
    });
  });
  (S.estudos || []).filter((e) => e.ativo !== false).forEach((e) => {
    if (sem(e.titulo + " " + (e.descricao || "") + " " + e.tipo).includes(qq)) out.push(`<a href="${esc(e.pdf_url)}" target="_blank" rel="noopener"><small>GRÁTIS · ${esc((e.tipo || "").toUpperCase())}</small><b>${hl(e.titulo)}</b><span>${hl(e.descricao || "")}</span></a>`);
  });
  [["O Método de ensino", "#metodo"], ["Aula grátis", "#previa"], ["Matrícula e Pix", "#matricula"], ["Verificar contato oficial", "#verificar"], ["Contato e WhatsApp", "#contato"], ["Depoimentos", "#depoimentos"], ["Vídeo-aulas", "#videoaulas"]].forEach(([t, h]) => {
    if (sem(t).includes(qq)) out.push(`<a href="${h}"><small>PÁGINA</small><b>${hl(t)}</b></a>`);
  });
  R.innerHTML = out.length ? `<p style="color:var(--muted);margin:14px 0 4px">${out.length} resultado${out.length === 1 ? "" : "s"}</p>` + out.join("") : '<p style="color:var(--muted);margin-top:14px">Nada encontrado. Tente outra palavra ou fale com a escola pelo WhatsApp.</p>';
  R.querySelectorAll("[data-bdisc]").forEach((a) => a.onclick = () => {
    const [, ...k] = a.dataset.bdisc.split("|");
    S.pendDisc = k.join("|");
  });
  R.querySelectorAll("[data-baula]").forEach((a) => a.onclick = () => {
    const p = a.dataset.baula.split("|");
    S.pendDisc = p[1] + "|" + p[2];
    S.pendAula = p[3];
  });
}
$("#bsIn").oninput = buscar;
const sinoKey = () => {
  var _a;
  return "etu_avisos_vistos_" + (((_a = S.user) == null ? void 0 : _a.id) || "visitante");
};
function avisos() {
  return (S.mural || []).filter((m) => (m.tipo || "").toLowerCase() === "aviso");
}
function drawSino() {
  let v = [];
  try {
    v = JSON.parse(localStorage.getItem(sinoKey()) || "[]");
  } catch (e) {
  }
  const n = avisos().filter((a) => !v.includes(String(a.id))).length + (S.notificacoes || []).filter((a) => !a.lida_em).length;
  const b = $("#sinoN");
  b.textContent = n;
  b.classList.toggle("hidden", !n);
  try {
    if (navigator.setAppBadge) {
      n ? navigator.setAppBadge(n) : navigator.clearAppBadge();
    }
  } catch (_) {
  }
  try {
    const kN = "etu_avisos_notif", ja = JSON.parse(localStorage.getItem(kN) || "null"), ids = avisos().map((a) => String(a.id));
    if (!S.mural || !S.mural.length) return;
    if (ja === null) {
      localStorage.setItem(kN, JSON.stringify(ids));
      return;
    }
    const novos = avisos().filter((a) => !ja.includes(String(a.id)) && !v.includes(String(a.id)));
    localStorage.setItem(kN, JSON.stringify([...new Set(ja.concat(ids))].slice(-300)));
    if (novos.length && "Notification" in window && Notification.permission === "granted" && navigator.serviceWorker)
      navigator.serviceWorker.ready.then((r) => novos.slice(0, 3).forEach((a) => r.showNotification("Escola Teológica União", { body: a.titulo, icon: "./icone-192.png", badge: "./selo-notif.png", tag: "aviso-" + a.id, data: { url: "./#inicio" } }))).catch(() => {
      });
  } catch (_) {
  }
}
$("#sinoBt").onclick = async () => {
  var _a, _b;
  const L = avisos(), pessoais = S.notificacoes || [], uid = (_a = S.user) == null ? void 0 : _a.id;
  try {
    localStorage.setItem(sinoKey(), JSON.stringify(L.map((a) => String(a.id))));
  } catch (e) {
  }
  modal(`<h3>Avisos da escola</h3>${"Notification" in window && Notification.permission !== "granted" ? '<div style="background:#FFF6DC;border:1px solid #C9A24A;border-radius:10px;padding:10px 12px;margin:6px 0 10px"><p style="margin:0 0 8px">Quer receber os avisos também na tela do celular?</p><button class="btn btn-gold btn-sm" id="sinoNotAtiva">Ativar notificações</button><div class="msg hidden" id="sinoNotMsg" style="margin-top:8px"></div></div>' : ""}${pessoais.map((a) => `<div style="padding:10px 0;border-bottom:1px solid #EFE6D0"><b>${esc(a.titulo)}</b><p>${esc(a.mensagem)}</p><button class="btn btn-gold btn-sm" data-card-download="${esc(a.curso_id)}">Baixar carteirinha PDF</button></div>`).join("")}${L.map((a) => {
    const eImg = /\.(jpe?g|png|webp|gif)(\?|#|$)/i.test(a.video_url || "");
    return `<div style="padding:10px 0;border-bottom:1px solid #EFE6D0"><b>${esc(a.titulo)}</b>${eImg ? `<a href="${esc(a.video_url)}" target="_blank" rel="noopener"><img src="${esc(a.video_url)}" alt="${esc(a.titulo)}" loading="lazy" style="display:block;width:100%;height:auto;border-radius:8px;margin:8px 0"></a>` : ""}<p style="white-space:pre-line">${etuLinkify(etuTextoSem(a.texto || ""))}</p>${a.video_url && !eImg ? `<a class="btn btn-gold btn-sm" href="${esc(a.video_url)}" target="_blank" rel="noopener">${/\.pdf(\?|#|$)/i.test(a.video_url) ? "Abrir o estudo em PDF" : "Abrir o link"}</a>` : ""}</div>`;
  }).join("")}${!L.length && !pessoais.length ? "<p>Nenhum aviso no momento.</p>" : ""}<div class="acts"><button class="btn btn-gold" data-close>Fechar</button></div>`);
  const bsn = document.getElementById("sinoNotAtiva");
  if (bsn) bsn.onclick = () => window.etuAtivarNotif(document.getElementById("sinoNotMsg"), () => {
    if (Notification.permission === "granted") bsn.style.display = "none";
  });
  try {
    if (!API.demo && uid) {
      await API.lerAvisos(pessoais.filter((a) => !a.lida_em).map((a) => a.id));
      if (((_b = S.user) == null ? void 0 : _b.id) === uid) await atualizarDocumentosPessoais();
    }
  } catch (e) {
  }
  drawSino();
};
setTimeout(drawSino, 1500);
function topo() {
  const r = document.documentElement, v = r.style.scrollBehavior;
  r.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  setTimeout(() => {
    window.scrollTo(0, 0);
    r.style.scrollBehavior = v;
  }, 80);
}
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || e.defaultPrevented || a.target === "_blank") return;
  const h = a.getAttribute("href");
  if (!h || h === "#") return;
  e.preventDefault();
  if (h === location.hash || h === "#inicio" && !location.hash) {
    route();
    topo();
    return;
  }
  try {
    location.hash = h;
  } catch (_) {
    try {
      history.pushState(null, "", h);
    } catch (__) {
    }
    route();
  }
  setTimeout(() => {
    if (location.hash !== h) {
      try {
        history.pushState(null, "", h);
      } catch (_) {
      }
      route();
    }
  }, 120);
});
(function() {
  const t = document.querySelector(".ticker");
  if (!t || t.querySelector(".ticker-pausa")) return;
  const b = document.createElement("button");
  b.type = "button";
  b.className = "ticker-pausa";
  b.textContent = "Pausar";
  b.setAttribute("aria-label", "Pausar a faixa de avisos");
  b.onclick = () => {
    const p = t.classList.toggle("pausado");
    b.textContent = p ? "Continuar" : "Pausar";
    b.setAttribute("aria-label", p ? "Continuar a faixa de avisos" : "Pausar a faixa de avisos");
  };
  t.appendChild(b);
})();
function etuMascaraCNPJ(v) {
  return String(v == null ? "" : v).replace(/\b(\d{2})\.(\d{2})(\d)\.(\d{3})\/(\d{4})-(\d{2})\b/g, "••.••$3.$4/$5-••");
}
const CANAIS_PADRAO = [
  { id: "p1", tipo: "WhatsApp e telefone", valor: "(61) 99521-1432", descricao: "Atendimento, matrícula e comprovantes" },
  { id: "p2", tipo: "Chave Pix", valor: "(61) 99521-1432", descricao: "Única chave Pix da escola (telefone)" },
  { id: "p3", tipo: "E-mail", valor: "etu.escolateologicauniao215@gmail.com", descricao: "E-mail oficial da Direção" },
  { id: "p4", tipo: "Site", valor: "escolateologicauniao.github.io", descricao: "Plataforma oficial da escola" },
  { id: "p5", tipo: "CNPJ", valor: "••.••7.548/0001-••", descricao: "Escola Teológica União, Cristalina, Goiás" }
];
function normCanal(v) {
  v = String(v || "").trim().toLowerCase();
  if (/@/.test(v)) return { k: "mail", v: v.replace(/^mailto:/, "").replace(/\s/g, "") };
  if (/[a-z]/.test(v) && /\./.test(v)) return { k: "site", v: v.replace(/^https?:\/\//, "").replace(/^www\./, "").split(/[/?#]/)[0] };
  let d = v.replace(/\D/g, "");
  if (d.length >= 12 && d.startsWith("55") && d.length <= 13) d = d.slice(2);
  return { k: "num", v: d };
}
function canalBate(c, entrada) {
  const a = normCanal(c.valor), b = normCanal(entrada);
  if (!b.v) return false;
  if (a.k !== b.k) return false;
  if (a.k === "site") return b.v === a.v;
  if (a.k === "num") {
    const x = a.v.length === 11 && a.v[2] === "9" ? [a.v, a.v.slice(0, 2) + a.v.slice(3)] : [a.v];
    return x.includes(b.v);
  }
  return a.v === b.v;
}
async function drawVerificar() {
  const L = await API.canais();
  $("#vfLista").innerHTML = L.map((c) => `<div class="vf-l"><span>${esc(c.tipo)}</span><b>${esc(c.valor)}</b><span style="flex-basis:100%">${esc(c.descricao || "")}</span></div>`).join("");
  const ir = () => {
    const t = $("#vfIn").value.trim(), r = $("#vfRes");
    if (!t) {
      r.innerHTML = "";
      return;
    }
    const n = normCanal(t);
    if (!n.v || n.k === "num" && n.v.length < 8) {
      r.innerHTML = `<div class="vf ind"><b class="t">Não foi possível conferir</b>Digite o número completo com DDD, o e-mail inteiro ou o endereço do site.</div>`;
      return;
    }
    const ok = L.find((c) => canalBate(c, t));
    r.innerHTML = ok ? `<div class="vf ok"><b class="t">✓ Canal oficial da Escola Teológica União</b>${esc(ok.tipo)}: <b>${esc(ok.valor)}</b>${ok.descricao ? " — " + esc(ok.descricao) : ""}.<br>Mesmo assim, nunca informe a sua senha a ninguém.</div>` : `<div class="vf no"><b class="t">✕ Este contato NÃO pertence à Escola Teológica União</b>Não é a Direção nem a escola. Não pague, não envie documentos, fotos ou códigos e não clique em links recebidos dele.<div class="res" style="margin-top:10px"><a class="btn btn-red btn-sm" target="_blank" rel="noopener" href="https://wa.me/${CONFIG.WHATSAPP_LINK}?text=${encodeURIComponent("A paz do Senhor. Recebi contato em nome da Escola Teológica União que NÃO é oficial: " + t)}">Avisar a Direção pelo WhatsApp oficial</a></div></div>`;
  };
  $("#vfBt").onclick = ir;
  $("#vfIn").onkeydown = (e) => {
    if (e.key === "Enter") ir();
  };
}
async function drawCanaisAdm() {
  const box = document.createElement("div");
  box.className = "panel";
  box.style.marginTop = "18px";
  const L = await API.canais();
  box.innerHTML = `<h3>Canais oficiais (proteção contra golpes)</h3>
   <p style="margin:0 0 10px;color:var(--muted);font-size:16px">Na página “Verificar Contato”, qualquer pessoa digita um número, e-mail, chave Pix ou site. Se estiver nesta lista, aparece em <b style="color:#1F5B3A">verde</b>: canal oficial. Se não estiver, aparece em <b style="color:#7A1B2B">vermelho</b>: não é a escola. Cadastre aqui somente o que é realmente da ETU.</p>
   ${L.map((c) => `<div class="vf-l"><span>${esc(c.tipo)}</span><b>${esc(c.valor)}</b><button class="btn btn-red btn-sm" data-delcn="${esc(c.id)}" type="button">Remover</button></div>`).join("")}
   <div class="grid3" style="margin-top:12px"><div><label for="cnTipo">Tipo</label><select id="cnTipo"><option>WhatsApp e telefone</option><option>Chave Pix</option><option>E-mail</option><option>Site</option><option>Rede social</option><option>CNPJ</option></select></div>
   <div><label for="cnValor">Número, e-mail ou endereço</label><input id="cnValor"></div><div><label for="cnDesc">Para que serve</label><input id="cnDesc"></div></div>
   <div class="msg hidden" id="mCn"></div><div class="res"><button class="btn btn-gold" id="cnAdd" type="button">Adicionar canal oficial</button></div>
   ${VITRINE || API.demo ? '<p style="margin:8px 0 0;font-size:14.5px;color:var(--muted)">Enquanto a plataforma não estiver ligada ao banco de dados, o site público mostra a lista padrão da escola.</p>' : ""}`;
  [...document.querySelectorAll("#configPanel ~ .panel")].pop().after(box);
  box.querySelector("#cnAdd").onclick = async () => {
    const v = box.querySelector("#cnValor").value.trim();
    if (!v) return show(box.querySelector("#mCn"), "Digite o contato.", "err");
    try {
      await API.salvarCanal({ tipo: box.querySelector("#cnTipo").value, valor: v, descricao: box.querySelector("#cnDesc").value.trim() });
      drawConfig();
    } catch (e) {
      show(box.querySelector("#mCn"), e.message, "err");
    }
  };
  box.querySelectorAll("[data-delcn]").forEach((b) => b.onclick = () => confirmBox("Remover este canal da lista oficial?", async () => {
    await API.apagarCanal(isNaN(+b.dataset.delcn) ? b.dataset.delcn : +b.dataset.delcn);
    drawConfig();
  }));
}
const SEC = { hist: [] };
function drawSec() {
  const P = $("#secPanel");
  if (!P) return;
  P.innerHTML = `<h3>Assistente da Direção</h3>
   <p style="margin:0 0 10px;color:var(--muted);font-size:16px">Um auxiliar só do diretor, separado do atendimento aos alunos: pesquisa bíblica e teológica na linha da ETU, revisão e edição de textos, apostilas e pregações, planejamento de aulas e provas, gestão da escola, finanças e segurança. Ele distingue o que a Bíblia afirma do que é interpretação, não inventa fontes e diz com franqueza quando algo não está certo.</p>
   <div class="ad-chat" id="secChat">${SEC.hist.length ? SEC.hist.map((m) => `<div class="${m.role === "user" ? "q" : "a"}">${esc(m.content)}</div>`).join("") : '<p style="margin:0;color:var(--muted)">Escreva o que precisa. Exemplos: “Revise este parágrafo no padrão da ETU”; “Quais textos de Gênesis a Apocalipse tratam da santidade?”; “Monte 10 questões de A a E sobre os atributos de Deus”.</p>'}</div>
   <label for="secIn" style="margin-top:12px">Sua mensagem</label><textarea id="secIn" rows="5"></textarea>
   <div class="res"><button class="btn btn-gold" id="secBt" type="button">Enviar</button><button class="btn btn-line" id="secNovo" type="button">Nova conversa</button><button class="btn btn-line" id="secCopiar" type="button">Copiar última resposta</button></div>`;
  const ch = $("#secChat");
  ch.scrollTop = ch.scrollHeight;
  $("#secNovo").onclick = () => {
    SEC.hist = [];
    drawSec();
  };
  $("#secCopiar").onclick = async () => {
    const a = [...SEC.hist].reverse().find((m) => m.role === "assistant");
    if (a) {
      try {
        await navigator.clipboard.writeText(a.content);
        $("#secCopiar").textContent = "Copiado ✓";
      } catch (e) {
      }
    }
  };
  $("#secBt").onclick = async () => {
    const t = $("#secIn").value.trim();
    if (!t) return;
    SEC.hist.push({ role: "user", content: t });
    drawSec();
    $("#secChat").insertAdjacentHTML("beforeend", '<div class="a" id="secEsp">Pensando…</div>');
    try {
      const d = await API.perguntarDirecao(SEC.hist.slice(-16));
      SEC.hist.push({ role: "assistant", content: d.resposta });
    } catch (e) {
      SEC.hist.push({ role: "assistant", content: e.message });
    }
    drawSec();
  };
}
function forcaSenha(p) {
  let n = 0;
  if (p.length >= 10) n++;
  if (p.length >= 14) n++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) n++;
  if (/\d/.test(p)) n++;
  if (/[^A-Za-z0-9]/.test(p)) n++;
  return n;
}
function drawContaDir() {
  const p = S.profile || {};
  const box = document.createElement("div");
  box.className = "panel";
  box.style.marginTop = "18px";
  box.innerHTML = `<h3>Minha conta da Direção</h3>
    <p style="margin:0 0 10px;color:var(--muted);font-size:16px">Esta conta é só da Direção e não tem relação com nenhuma conta de aluno. Use um e-mail que nenhum aluno use e uma senha forte, que só o senhor conheça. Para qualquer mudança, a senha atual é pedida de novo.</p>
    <div class="grid2"><div><label for="cdNome">Nome</label><input id="cdNome" value="${esc(p.nome || "")}"></div>
    <div><label for="cdEmail">E-mail de acesso da Direção</label><input id="cdEmail" type="email" value="${esc(p.email || "")}"></div></div>
    <div class="grid2"><div><label for="cdNova">Nova senha (deixe em branco para manter)</label><input id="cdNova" type="password" autocomplete="new-password"><div class="forca"><i id="cdForca"></i></div><span id="cdDica" style="font-size:13.5px;color:var(--muted)">Mínimo de 10 caracteres, com letra maiúscula, minúscula, número e símbolo.</span></div>
    <div><label for="cdConf">Repita a nova senha</label><input id="cdConf" type="password" autocomplete="new-password"></div></div>
    <label for="cdAtual">Senha atual (obrigatória para salvar)</label><input id="cdAtual" type="password" autocomplete="current-password">
    <div class="msg hidden" id="mCd"></div><div class="res"><button class="btn btn-gold" id="cdSalvar" type="button">Salvar minha conta</button></div>`;
  (document.querySelectorAll("#configPanel ~ .panel").length ? [...document.querySelectorAll("#configPanel ~ .panel")].pop() : $("#configPanel")).after(box);
  ligaOlho(box);
  const nv = box.querySelector("#cdNova");
  nv.oninput = () => {
    const f = forcaSenha(nv.value);
    const i = box.querySelector("#cdForca");
    i.style.width = f * 20 + "%";
    i.style.background = f >= 5 ? "#1F5B3A" : f >= 3 ? "#B8902F" : "#7A1B2B";
    box.querySelector("#cdDica").textContent = !nv.value ? "Mínimo de 10 caracteres, com letra maiúscula, minúscula, número e símbolo." : f >= 5 ? "Senha forte." : f >= 3 ? "Senha média: acrescente o que falta." : "Senha fraca.";
  };
  box.querySelector("#cdSalvar").onclick = async () => {
    const m = box.querySelector("#mCd");
    const nova = nv.value, conf = box.querySelector("#cdConf").value, atual = box.querySelector("#cdAtual").value;
    const email = box.querySelector("#cdEmail").value.trim(), nome = box.querySelector("#cdNome").value.trim();
    if (!atual) return show(m, "Digite a senha atual para confirmar que é o senhor.", "err");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return show(m, "Digite um e-mail válido.", "err");
    if (nova) {
      if (forcaSenha(nova) < 5) return show(m, "A nova senha precisa ter pelo menos 10 caracteres, com letra maiúscula, minúscula, número e símbolo.", "err");
      if (nova !== conf) return show(m, "As duas senhas novas não são iguais.", "err");
      if (nova === atual) return show(m, "A nova senha precisa ser diferente da atual.", "err");
    }
    try {
      const aviso = await API.atualizarConta({ nome, email, pw: nova || null, atual });
      await refreshUser();
      ["#cdNova", "#cdConf", "#cdAtual"].forEach((q) => box.querySelector(q).value = "");
      show(m, "Conta da Direção atualizada." + (aviso ? " " + aviso : "") + (nova ? " Guarde a nova senha em lugar seguro." : ""), "ok");
    } catch (e) {
      show(m, e.message, "err");
    }
  };
}
const CX_CAT = {
  entrada: ["Mensalidades", "Matrículas", "Venda de apostilas e livros", "Ofertas e doações", "Outras entradas"],
  saida: ["Material, gráfica e impressão", "Internet, site e plataforma", "Divulgação", "Impostos e taxas", "Contador e serviços", "Aluguel, água, luz e telefone", "Transporte", "Professores e colaboradores", "Equipamentos", "Outras saídas"]
};
const brl = (v) => (+v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const numBR = (v) => {
  if (typeof v === "number") return v;
  const t = String(v || "").replace(/[^\d,.-]/g, "");
  return +(t.includes(",") ? t.replace(/\./g, "").replace(",", ".") : t) || 0;
};
const CX = { mes: today().slice(0, 7) };
async function etuPrepArquivo(f) {
  if (!f) return null;
  if (f.type === "application/pdf") {
    if (f.size > 10 * 1024 * 1024) throw new Error("O PDF passa de 10 MB. Envie um arquivo menor.");
    return f;
  }
  if (!/^image\//.test(f.type)) throw new Error("Envie uma foto ou um arquivo PDF.");
  if (f.size <= 1.5 * 1024 * 1024 && /jpe?g|png|webp/.test(f.type)) return f;
  try {
    const img = await new Promise((ok, no) => {
      const i = new Image();
      i.onload = () => ok(i);
      i.onerror = no;
      i.src = URL.createObjectURL(f);
    });
    const k = Math.min(1, 1800 / Math.max(img.width, img.height));
    const c = document.createElement("canvas");
    c.width = Math.round(img.width * k);
    c.height = Math.round(img.height * k);
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    const b = await new Promise((ok) => c.toBlob(ok, "image/jpeg", 0.85));
    if (b) return new File([b], (f.name || "comprovante").replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch (e) {
  }
  if (f.size > 10 * 1024 * 1024) throw new Error("A foto passa de 10 MB.");
  return f;
}
async function etuEnviarComprovante(f, mes) {
  const a = await etuPrepArquivo(f);
  return a ? await API.anexarCaixa(a, mes) : null;
}
async function etuAbrirComprovante(nome) {
  const w = window.open("", "_blank");
  try {
    const u = await API.linkCaixa(nome);
    if (!u) throw new Error("Arquivo não encontrado.");
    if (w) w.location.href = u;
    else location.href = u;
  } catch (e) {
    if (w) w.close();
    alert("Não foi possível abrir o comprovante: " + e.message);
  }
}
function etuPedirArquivo(cb) {
  const i = document.createElement("input");
  i.type = "file";
  i.accept = "application/pdf,image/*";
  i.onchange = () => {
    if (i.files && i.files[0]) cb(i.files[0]);
  };
  i.click();
}
async function drawContab() {
  var _a;
  const P = $("#contabPanel");
  if (!P) return;
  let L = [];
  try {
    L = await API.lancamentos();
  } catch (e) {
    P.innerHTML = `<div class="msg err">Não foi possível abrir o caixa: ${esc(e.message)}. Se a plataforma já estiver ativada, rode de novo o arquivo de banco de dados atualizado.</div>`;
    return;
  }
  let C = [];
  try {
    C = (await API.comprovantes()).filter((c) => c.status === "aprovado");
  } catch (e) {
  }
  const mes = CX.mes, ano = mes.slice(0, 4);
  const doMes = L.filter((l) => (l.data || "").startsWith(mes)), doAno = L.filter((l) => (l.data || "").startsWith(ano));
  const soma = (arr, t) => arr.filter((l) => l.tipo === t).reduce((a, l) => a + numBR(l.valor), 0);
  const ent = soma(doMes, "entrada"), sai = soma(doMes, "saida"), entA = soma(doAno, "entrada"), saiA = soma(doAno, "saida");
  const refs = new Set(L.map((l) => l.ref).filter(Boolean));
  const naoLanc = C.filter((c) => !refs.has("comp:" + c.id));
  const autoL = naoLanc.filter((c) => numBR(c.valor) > 0 && !(CX.autoFeitos || (CX.autoFeitos = /* @__PURE__ */ new Set())).has(c.id));
  if (autoL.length) {
    let n = 0;
    for (const c of autoL) {
      CX.autoFeitos.add(c.id);
      const a = (S.alunos || []).find((x) => x.id === c.user_id) || {};
      try {
        await API.salvarLancamento({ tipo: "entrada", data: (c.criado_em || today()).slice(0, 10), categoria: "Mensalidades", descricao: `${a.nome || "Aluno"} — ${((_a = curso(c.curso_id)) == null ? void 0 : _a.titulo) || ""}`, valor: numBR(c.valor), forma: "Pix", documento: "Comprovante na plataforma", ref: "comp:" + c.id });
        n++;
      } catch (e) {
      }
    }
    if (n) {
      CX.autoMsg = n + (n > 1 ? " pagamentos aprovados foram lançados" : " pagamento aprovado foi lançado") + " automaticamente no caixa, com recibo.";
      return drawContab();
    }
  }
  const alunos = (S.alunos || []).filter((a) => !a.is_admin);
  const hoje = today(), em7 = addDias(hoje, 7);
  const venc = [];
  alunos.forEach((a) => (a.matriculas || []).forEach((m) => {
    if (m.status === "ativo" && m.expira_em) {
      if (m.expira_em < hoje) venc.push({ a, m, s: "vencida" });
      else if (m.expira_em <= em7) venc.push({ a, m, s: "vence" });
    }
  }));
  const porCat = {};
  doMes.forEach((l) => {
    const k = (l.tipo === "entrada" ? "Entrada · " : "Saída · ") + l.categoria;
    porCat[k] = (porCat[k] || 0) + numBR(l.valor);
  });
  const meses = [...Array(12)].map((_, i) => {
    const k = ano + "-" + String(i + 1).padStart(2, "0");
    const x = L.filter((l) => (l.data || "").startsWith(k));
    return [k, soma(x, "entrada"), soma(x, "saida")];
  });
  const nomeMes = (k) => MESES[+k.slice(5, 7) - 1] + " de " + k.slice(0, 4);
  P.innerHTML = `<h3>Contabilidade e finanças da escola</h3>${CX.autoMsg ? `<div class="msg ok" style="margin:8px 0">${esc(CX.autoMsg)}</div>` : ""}
   <p style="margin:0 0 6px;color:var(--muted);font-size:16px">O caixa da Escola Teológica União: tudo o que entra e sai, organizado por mês e por categoria, com recibos, relatórios e a planilha para entregar ao contador. Somente a Direção vê esta área.</p>
   <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:end"><div><label for="cxMes">Mês</label><input id="cxMes" type="month" value="${mes}"></div>
    <button class="btn btn-line btn-sm" id="cxCsv" type="button">Baixar planilha do ano</button><button class="btn btn-line btn-sm" id="cxImp" type="button">Imprimir relatório do mês</button></div>
   <div class="cx-cards"><div class="pos"><b>${brl(ent)}</b><span>Entradas em ${esc(nomeMes(mes))}</span></div><div class="neg"><b>${brl(sai)}</b><span>Saídas no mês</span></div>
    <div class="${ent - sai < 0 ? "neg" : "pos"}"><b>${brl(ent - sai)}</b><span>Resultado do mês</span></div><div class="${entA - saiA < 0 ? "neg" : "pos"}"><b>${brl(entA - saiA)}</b><span>Resultado de ${ano}</span></div></div>
   ${naoLanc.length ? `<div class="cx-sec"><h4>Pagamentos confirmados sem valor informado</h4><p style="margin:0 0 8px;font-size:15px">Os pagamentos aprovados com valor entram no caixa sozinhos. Estes vieram sem valor: confira e lance.</p><div class="tbl-wrap"><table><thead><tr><th>Aluno</th><th>Curso</th><th>Valor</th><th>Data</th><th></th></tr></thead><tbody>${naoLanc.map((c) => {
    var _a2;
    const a = alunos.find((x) => x.id === c.user_id) || {};
    return `<tr><td>${esc(a.nome || "Aluno")}</td><td>${esc(((_a2 = curso(c.curso_id)) == null ? void 0 : _a2.titulo) || c.curso_id)}</td><td>${c.valor ? brl(numBR(c.valor)) : "—"}</td><td>${fmtDate((c.criado_em || "").slice(0, 10))}</td><td><button class="btn btn-navy btn-sm" data-lancar="${esc(c.id)}" type="button">Lançar no caixa</button></td></tr>`;
  }).join("")}</tbody></table></div></div>` : ""}
   <div class="cx-sec"><h4>Novo lançamento</h4>
    <div class="grid3"><div><label for="cxTipo">Tipo</label><select id="cxTipo"><option value="entrada">Entrada (dinheiro que entrou)</option><option value="saida">Saída (dinheiro que saiu)</option></select></div>
     <div><label for="cxData">Data</label><input id="cxData" type="date" value="${mes === hoje.slice(0, 7) ? hoje : mes + "-01"}"></div>
     <div><label for="cxValor">Valor (R$)</label><input id="cxValor" inputmode="decimal" placeholder="0,00"></div></div>
    <div class="grid3"><div><label for="cxCat">Categoria</label><select id="cxCat"></select></div>
     <div><label for="cxForma">Forma</label><select id="cxForma"><option>Pix</option><option>Dinheiro</option><option>Transferência</option><option>Cartão</option><option>Boleto</option></select></div>
     <div><label for="cxDoc">Documento (nº do recibo, nota ou comprovante)</label><input id="cxDoc"></div></div>
    <label for="cxDesc">Descrição (de quem recebeu ou a quem pagou, e o motivo)</label><input id="cxDesc">
    <label for="cxArq">Comprovante (foto ou PDF) — opcional, mas recomendado</label><input id="cxArq" type="file" accept="application/pdf,image/*">
    <p style="margin:4px 0 0;font-size:14px;color:var(--muted)">O arquivo fica guardado no arquivo de comprovantes da escola, organizado por ano e mês. Só a Direção vê.</p>
    <div class="msg hidden" id="mCx"></div><div class="res"><button class="btn btn-gold" id="cxAdd" type="button">Registrar no caixa</button></div></div>
   <div class="cx-sec"><h4>Lançamentos de ${esc(nomeMes(mes))}</h4>${doMes.length ? `<div class="tbl-wrap"><table><thead><tr><th>Data</th><th>Tipo</th><th>Categoria e descrição</th><th>Valor</th><th></th></tr></thead><tbody>${doMes.slice().sort((a, b) => a.data < b.data ? -1 : 1).map((l) => `<tr><td>${fmtDate(l.data)}</td><td><span class="pill ${l.tipo === "entrada" ? "ok" : "off"}">${l.tipo === "entrada" ? "Entrada" : "Saída"}</span></td><td><b>${esc(l.categoria)}</b><br><span style="font-size:14px;color:var(--muted)">${esc(l.descricao || "")}${l.forma ? " · " + esc(l.forma) : ""}${l.documento ? " · doc. " + esc(l.documento) : ""}</span></td><td>${brl(numBR(l.valor))}</td><td style="white-space:nowrap">${l.anexo ? `<button class="btn btn-navy btn-sm" data-vercomp="${esc(l.id)}" type="button">Ver comprovante</button> ` : `<button class="btn btn-line btn-sm" data-anexar="${esc(l.id)}" type="button">Anexar comprovante</button> `}${l.tipo === "entrada" ? `<button class="btn btn-line btn-sm" data-recibo="${esc(l.id)}" type="button">Recibo</button> ` : ""}<button class="btn btn-red btn-sm" data-dellc="${esc(l.id)}" type="button">Apagar</button></td></tr>`).join("")}</tbody></table></div>` : '<p style="margin:0;color:var(--muted)">Nenhum lançamento neste mês.</p>'}</div>
   ${Object.keys(porCat).length ? `<div class="cx-sec"><h4>Resumo por categoria</h4><div class="tbl-wrap"><table><tbody>${Object.entries(porCat).sort().map(([k, v]) => `<tr><td>${esc(k)}</td><td style="text-align:right">${brl(v)}</td></tr>`).join("")}</tbody></table></div></div>` : ""}
   <div class="cx-sec"><h4>O ano de ${ano}, mês a mês</h4><div class="tbl-wrap"><table><thead><tr><th>Mês</th><th>Entradas</th><th>Saídas</th><th>Resultado</th></tr></thead><tbody>${meses.map(([k, e, s]) => `<tr><td>${esc(MESES[+k.slice(5) - 1])}</td><td>${brl(e)}</td><td>${brl(s)}</td><td style="color:${e - s < 0 ? "#7A1B2B" : "inherit"}">${brl(e - s)}</td></tr>`).join("")}<tr><td><b>Total</b></td><td><b>${brl(entA)}</b></td><td><b>${brl(saiA)}</b></td><td><b>${brl(entA - saiA)}</b></td></tr></tbody></table></div></div>
   <div class="cx-sec"><h4>Mensalidades vencidas e a vencer (próximos 7 dias)</h4>${venc.length ? `<div class="tbl-wrap"><table><thead><tr><th>Aluno</th><th>Curso</th><th>Vencimento</th><th>Situação</th><th></th></tr></thead><tbody>${venc.sort((x, y) => x.m.expira_em < y.m.expira_em ? -1 : 1).map((v) => {
    var _a2, _b;
    const tel = String(v.a.telefone || "").replace(/\D/g, "");
    const msg = `A paz do Senhor, ${v.a.nome || ""}. Aqui é da Escola Teológica União. Lembramos que a mensalidade do ${((_a2 = curso(v.m.curso_id)) == null ? void 0 : _a2.titulo) || "curso"} ${v.s === "vencida" ? "venceu em" : "vence em"} ${fmtDate(v.m.expira_em)}. O Pix é ${CONFIG.PIX_CHAVE}. Deus abençoe.`;
    return `<tr><td>${esc(v.a.nome || "")}</td><td>${esc(((_b = curso(v.m.curso_id)) == null ? void 0 : _b.titulo) || v.m.curso_id)}</td><td>${fmtDate(v.m.expira_em)}</td><td><span class="pill ${v.s === "vencida" ? "off" : "lock"}">${v.s === "vencida" ? "Vencida" : "Vence em breve"}</span></td><td>${tel ? `<a class="btn btn-line btn-sm" target="_blank" rel="noopener" href="https://wa.me/${tel.length <= 11 ? "55" + tel : tel}?text=${encodeURIComponent(msg)}">Lembrar pelo WhatsApp</a>` : ""}</td></tr>`;
  }).join("")}</tbody></table></div>` : '<p style="margin:0;color:var(--muted)">Nenhuma mensalidade vencida ou vencendo nos próximos 7 dias.</p>'}</div>
   <div class="cx-sec"><h4>Assessoria virtual da Direção</h4>
    <p style="margin:0 0 8px;color:var(--muted);font-size:15.5px">Dúvidas sobre organização do caixa, impostos, obrigações, contratos, recibos e direitos do aluno. As respostas orientam o diretor; decisões fiscais e jurídicas devem ser confirmadas com o contador ou o advogado da escola.</p>
    <label for="cxModo">Área de apoio</label><select id="cxModo"><option value="contabil">Contábil e financeiro</option><option value="juridico">Jurídico e burocrático</option><option value="direcao">Administrativo e plataforma</option></select>
    <p style="font-size:15px">Assistente de inteligência artificial, exclusivo da direção. Consulta os manuais aprovados; não consulta legislação atualizada na internet nesta versão. Minutas e decisões fiscais ou jurídicas precisam de revisão profissional.</p>
    <label for="cxPerg">Sua pergunta</label><textarea id="cxPerg" maxlength="6000" rows="3" placeholder="Ex.: Que documentos preciso guardar das mensalidades recebidas?"></textarea>
    <div class="res"><button class="btn btn-navy" id="cxPergBt" type="button">Perguntar</button></div><div id="cxResp" role="status" aria-live="polite" style="white-space:pre-wrap;margin-top:10px"></div></div>
   <div class="cx-sec guia"><h4>Guia do diretor: finanças, impostos e deveres da escola</h4>${GUIA_DIRETOR}</div>`;
  const cat = $("#cxCat"), tp = $("#cxTipo");
  const fc = () => cat.innerHTML = CX_CAT[tp.value].map((c) => `<option>${esc(c)}</option>`).join("");
  tp.onchange = fc;
  fc();
  $("#cxMes").onchange = (e) => {
    CX.mes = e.target.value || today().slice(0, 7);
    drawContab();
  };
  $("#cxAdd").onclick = async () => {
    const m = $("#mCx");
    const v = numBR($("#cxValor").value);
    if (!(v > 0)) return show(m, "Digite o valor.", "err");
    if (!$("#cxData").value) return show(m, "Escolha a data.", "err");
    const bt = $("#cxAdd");
    bt.disabled = true;
    try {
      const f = $("#cxArq").files && $("#cxArq").files[0];
      let anexo = null;
      if (f) {
        show(m, "Enviando o comprovante…", "ok");
        anexo = await etuEnviarComprovante(f, $("#cxData").value.slice(0, 7));
      }
      const reg = { tipo: tp.value, data: $("#cxData").value, categoria: cat.value, descricao: $("#cxDesc").value.trim(), valor: v, forma: $("#cxForma").value, documento: $("#cxDoc").value.trim() };
      if (anexo) reg.anexo = anexo;
      await API.salvarLancamento(reg);
      CX.mes = $("#cxData").value.slice(0, 7);
      drawContab();
    } catch (e) {
      bt.disabled = false;
      show(m, e.message, "err");
    }
  };
  $$("#contabPanel [data-vercomp]").forEach((b) => b.onclick = () => {
    const l = L.find((x) => String(x.id) === b.dataset.vercomp);
    if (l && l.anexo) etuAbrirComprovante(l.anexo);
  });
  $$("#contabPanel [data-anexar]").forEach((b) => b.onclick = () => etuPedirArquivo(async (f) => {
    const l = L.find((x) => String(x.id) === b.dataset.anexar);
    if (!l) return;
    b.disabled = true;
    b.textContent = "Enviando…";
    try {
      const n = await etuEnviarComprovante(f, (l.data || today()).slice(0, 7));
      await API.anexoLancamento(l.id, n);
      drawContab();
    } catch (e) {
      b.disabled = false;
      b.textContent = "Anexar comprovante";
      alert(e.message);
    }
  }));
  $$("#contabPanel [data-lancar]").forEach((b) => b.onclick = async () => {
    var _a2;
    const c = C.find((x) => String(x.id) === b.dataset.lancar);
    const a = alunos.find((x) => x.id === c.user_id) || {};
    await API.salvarLancamento({ tipo: "entrada", data: (c.criado_em || today()).slice(0, 10), categoria: "Mensalidades", descricao: `${a.nome || "Aluno"} — ${((_a2 = curso(c.curso_id)) == null ? void 0 : _a2.titulo) || ""}`, valor: numBR(c.valor), forma: "Pix", documento: "Comprovante na plataforma", ref: "comp:" + c.id });
    drawContab();
  });
  $$("#contabPanel [data-dellc]").forEach((b) => b.onclick = () => confirmBox("Apagar este lançamento do caixa?", async () => {
    await API.apagarLancamento(isNaN(+b.dataset.dellc) ? b.dataset.dellc : +b.dataset.dellc);
    drawContab();
  }));
  $$("#contabPanel [data-recibo]").forEach((b) => b.onclick = () => recibo(L.find((x) => String(x.id) === b.dataset.recibo)));
  $("#cxCsv").onclick = () => {
    const lin = [["Data", "Tipo", "Categoria", "Descrição", "Forma", "Documento", "Valor"]].concat(doAno.slice().sort((a2, b) => a2.data < b.data ? -1 : 1).map((l) => [fmtDate(l.data), l.tipo === "entrada" ? "Entrada" : "Saída", l.categoria, l.descricao || "", l.forma || "", l.documento || "", numBR(l.valor).toFixed(2).replace(".", ",")]));
    const csv = "\uFEFF" + lin.map((r) => r.map((x) => '"' + String(x).replace(/"/g, '""') + '"').join(";")).join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    a.download = `caixa-ETU-${ano}.csv`;
    a.click();
  };
  $("#cxImp").onclick = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<html><head><title>Relatório financeiro — ${nomeMes(mes)}</title><style>body{font-family:Georgia,serif;color:#1b2340;margin:30px}h1{font-size:20px;margin:0}table{width:100%;border-collapse:collapse;margin-top:14px;font-size:13px}td,th{border:1px solid #ccc;padding:6px;text-align:left}th{background:#f3eedf}.r{text-align:right}</style></head><body>
     <h1>Escola Teológica União</h1><div>CNPJ 59.037.548/0001-59 · Cristalina, Goiás</div><h2 style="font-size:16px">Relatório financeiro — ${esc(nomeMes(mes))}</h2>
     <p>Entradas: <b>${brl(ent)}</b> · Saídas: <b>${brl(sai)}</b> · Resultado: <b>${brl(ent - sai)}</b></p>
     <table><tr><th>Data</th><th>Tipo</th><th>Categoria</th><th>Descrição</th><th>Doc.</th><th class="r">Valor</th></tr>${doMes.slice().sort((a, b) => a.data < b.data ? -1 : 1).map((l) => `<tr><td>${fmtDate(l.data)}</td><td>${l.tipo === "entrada" ? "Entrada" : "Saída"}</td><td>${esc(l.categoria)}</td><td>${esc(l.descricao || "")}</td><td>${esc(l.documento || "")}</td><td class="r">${brl(numBR(l.valor))}</td></tr>`).join("")}</table>
     <p style="margin-top:40px">______________________________<br>Pr. Charlei de Jesus Lima Dias — Diretor Geral</p></body></html>`);
    w.document.close();
    w.print();
  };
  $("#cxPergBt").onclick = async () => {
    var _a2, _b, _c;
    if (!((_a2 = S.profile) == null ? void 0 : _a2.is_admin)) return;
    const q = $("#cxPerg").value.trim();
    if (!q) return;
    const botao = $("#cxPergBt"), r = $("#cxResp");
    botao.disabled = true;
    r.textContent = "Consultando…";
    try {
      const d = await API.perguntarContador([{ role: "user", content: q }], $("#cxModo").value);
      if (!((_b = S.profile) == null ? void 0 : _b.is_admin)) return;
      r.textContent = d.resposta + (((_c = d.fontes) == null ? void 0 : _c.length) ? "\n\nManuais consultados: " + [...new Set(d.fontes)].join("; ") : "");
    } catch (e) {
      r.textContent = e.message;
    } finally {
      botao.disabled = false;
    }
  };
  try {
    window.etuContas = await API.contasPagar();
    CX.contasErro = "";
  } catch (e) {
    window.etuContas = null;
    CX.contasErro = e.message;
  }
  try {
    window.etuDasnL = await API.declaracoesMei();
    CX.dasnErro = "";
  } catch (e) {
    window.etuDasnL = [];
    CX.dasnErro = e.message;
  }
  try {
    etuFechamento(P, L);
  } catch (e) {
    console.log(e);
  }
}
function recibo(l) {
  if (!l) return;
  const w = window.open("", "_blank");
  if (!w) return;
  const n = l.documento || "R-" + String(l.id).slice(-6).toUpperCase();
  w.document.write(`<html><head><title>Recibo ${esc(n)}</title><style>body{font-family:Georgia,serif;color:#1b2340;max-width:680px;margin:40px auto;border:2px solid #C9A24A;padding:30px}h1{text-align:center;letter-spacing:.2em;font-size:22px;margin:0}.c{text-align:center}.v{font-size:22px;font-weight:bold}</style></head><body>
   <div class="c"><b>ESCOLA TEOLÓGICA UNIÃO</b><br>CNPJ 59.037.548/0001-59 · Cristalina, Goiás<br>Curso Livre de Teologia</div><hr>
   <h1>RECIBO</h1><p class="c">Nº ${esc(n)} &nbsp;·&nbsp; <span class="v">${brl(numBR(l.valor))}</span></p>
   <p>Recebemos de <b>${esc((l.descricao || "").split(" — ")[0] || "__________________")}</b> a importância de <b>${brl(numBR(l.valor))}</b>, referente a <b>${esc(l.categoria)}${(l.descricao || "").includes(" — ") ? " — " + esc(l.descricao.split(" — ").slice(1).join(" — ")) : ""}</b>, paga por ${esc(l.forma || "Pix")} em ${fmtDate(l.data)}.</p>
   <p>Para clareza, firmamos o presente recibo.</p><p style="text-align:right">Cristalina, Goiás, ${dataExtenso(/* @__PURE__ */ new Date(l.data + "T12:00:00"))}.</p>
   <p style="margin-top:50px;text-align:center">______________________________<br>Pr. Charlei de Jesus Lima Dias<br>Diretor Geral</p></body></html>`);
  w.document.close();
  w.print();
}
const GUIA_DIRETOR = `
<details><summary>1. Separar o dinheiro da escola do dinheiro pessoal</summary><ul>
<li>Use uma conta bancária e uma chave Pix no CNPJ da escola para receber mensalidades. Misturar com a conta pessoal dificulta provar a origem do dinheiro e confunde o imposto de renda do diretor.</li>
<li>Registre aqui tudo o que entra e sai, no mesmo dia. O que não está registrado, o contador não consegue declarar.</li>
<li>Se o senhor retirar dinheiro da escola para uso pessoal, registre como saída com a descrição correta (por exemplo, retirada do responsável). Combine com o contador a forma certa para o tipo de empresa da escola.</li></ul></details>
<details><summary>2. Documentos que devem ser guardados</summary><ul>
<li>Comprovantes de Pix e transferências recebidos e pagos, notas fiscais de compras e serviços, contratos, recibos emitidos e extratos bancários mensais.</li>
<li>Guarde por, no mínimo, 5 anos: é o prazo geral em que a Receita Federal pode revisar os tributos. Em caso de dúvida, guarde por mais tempo.</li>
<li>Baixe a planilha do ano nesta área e entregue ao contador junto com os extratos.</li></ul></details>
<details><summary>3. Impostos e obrigações: depende do tipo de empresa da escola</summary><ul>
<li>O que a escola paga e declara depende de como o CNPJ está registrado: MEI, microempresa no Simples Nacional, ou associação/entidade sem fins lucrativos. Confira o tipo no cartão do CNPJ, no site da Receita Federal.</li>
<li><b>Se for MEI:</b> paga uma guia mensal fixa (DAS), faz a declaração anual (DASN-SIMEI) até 31 de maio e precisa respeitar o limite de faturamento anual e as atividades permitidas ao MEI. Confira o limite vigente no Portal do Empreendedor.</li>
<li><b>Se for microempresa no Simples Nacional:</b> o imposto é calculado sobre o faturamento de cada mês, e normalmente um contador cuida das guias e declarações.</li>
<li><b>Se for associação ou entidade religiosa sem fins lucrativos:</b> há regras próprias de imunidade ou isenção e obrigações acessórias. É indispensável a orientação de um contador.</li>
<li>Nota fiscal de serviço: a obrigação de emitir depende do município (prefeitura de Cristalina) e do tipo de empresa. Pergunte ao contador; enquanto isso, entregue recibo de todo pagamento recebido.</li></ul></details>
<details><summary>4. Direitos do aluno e deveres da escola</summary><ul>
<li>Deixe claro em todo material e anúncio que se trata de <b>curso livre de teologia</b>, sem equivalência a graduação reconhecida pelo MEC. A informação clara protege a escola de reclamações por propaganda enganosa (Código de Defesa do Consumidor).</li>
<li>Em contratações feitas pela internet, o Código de Defesa do Consumidor (artigo 49) dá ao aluno 7 dias para desistir, contados da contratação ou do recebimento do produto ou serviço, com devolução dos valores pagos.</li>
<li>Tenha um termo de matrícula com valor, forma de pagamento, vencimento, tolerância, regra de bloqueio e de cancelamento. As regras desta plataforma (aviso, tolerância e bloqueio) devem estar escritas nesse termo.</li></ul></details>
<details><summary>5. Proteção dos dados dos alunos (LGPD)</summary><ul>
<li>A Lei Geral de Proteção de Dados (Lei nº 13.709, de 2018) exige que os dados dos alunos (nome, telefone, e-mail, comprovantes) sejam usados só para a finalidade da matrícula e guardados com segurança.</li>
<li>Não compartilhe listas de alunos nem prints de comprovantes em grupos. Por isso o Assistente ETU nunca informa dados de ninguém.</li>
<li>O aluno pode pedir para ver, corrigir ou excluir os próprios dados. Atenda pelo canal oficial da escola.</li></ul></details>
<details><summary>6. Rotina do diretor no caixa</summary><ul>
<li><b>Todo dia:</b> confira os comprovantes na aba Pagamentos e use “Lançar no caixa”.</li>
<li><b>Toda semana:</b> veja as mensalidades vencidas nesta área e envie o lembrete pelo WhatsApp.</li>
<li><b>Todo mês:</b> imprima o relatório do mês, confira com o extrato do banco e pague as guias de imposto dentro do prazo.</li>
<li><b>Todo ano:</b> baixe a planilha do ano e entregue ao contador antes dos prazos das declarações.</li></ul></details>
<p style="font-size:14.5px;color:var(--muted);margin:10px 0 0">Este guia organiza a rotina da Direção e não substitui o contador nem o advogado da escola. Leis, limites e prazos mudam: confirme sempre a regra vigente com um profissional.</p>`;
const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
function dataExtenso(d = /* @__PURE__ */ new Date()) {
  return `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;
}
function sealHTML(size) {
  return `<img src="${document.querySelector("#seloImg").src}" alt="" style="width:${size + 10}px;display:block">`;
  return `<div style="position:relative;width:${size}px;height:${size + 30}px"><div style="position:absolute;inset:-3px -3px auto -3px;height:${size + 6}px;border-radius:50%;background:radial-gradient(circle,#F3DC8C 0%,#C9A24A 60%,#9C7424 100%)"></div><img src="${document.querySelector(".hero .seal img").src}" alt="" style="position:relative;width:${size}px;border-radius:50%;display:block"><svg style="position:absolute;left:50%;transform:translateX(-50%);top:${size - 20}px" width="40" height="44" viewBox="0 0 44 48" aria-hidden="true"><path d="M6 0 L20 0 L16 38 L10 31 L2 40 Z" fill="#C9A24A"/><path d="M24 0 L38 0 L42 40 L34 31 L28 38 Z" fill="#B8902F"/></svg></div>`;
}
async function renderDoc(tipo, cid) {
  const c = curso(cid), p = S.profile || {};
  const box = $("#docBox");
  $("#mPrint").classList.add("hidden");
  if (!c) {
    location.hash = "aluno";
    return;
  }
  if (tipo === "carteira") {
    $("#docTitle").textContent = "Carteirinha de estudante";
    $("#btnPrint").classList.add("hidden");
    const pronta = (S.carteirinhas || []).some((x) => x.curso_id === cid);
    box.innerHTML = pronta ? `<p>Sua carteirinha foi enviada pela Direção.</p><button type="button" class="btn btn-gold" data-card-download="${esc(cid)}">Baixar carteirinha em PDF</button>` : '<p class="msg info">Aguarde a preparação e o envio do PDF pela Direção. Você receberá um aviso aqui na plataforma.</p>';
    return;
  }
  const l = lessonsOf(cid), d = l.filter((x) => S.prog.includes(x.id)).length;
  const horas = l.reduce((t, x) => t + (+x.horas || 0), 0);
  const m = S.mats.find((x) => x.curso_id === cid);
  if (!hasAccess(cid) || tipo === "certificado" && (!ofereceCertificado(c) || c.em_breve || !(l.length && d === l.length))) {
    $("#docTitle").textContent = "Documento indisponível";
    box.innerHTML = `<div class="msg err">${tipo === "certificado" ? "O certificado só está disponível em cursos que oferecem esse documento, após a conclusão de todas as aulas e provas, com a matrícula ativa." : "A carteira de estudante é liberada somente para alunos com matrícula ativa."}</div>`;
    $("#btnPrint").classList.add("hidden");
    return;
  }
  $("#btnPrint").classList.remove("hidden");
  const imprimirAoFinal = !!S.autoPrint;
  S.autoPrint = false;
  let reg;
  try {
    reg = await API.registrarDoc(tipo, cid);
    if (!reg) throw new Error("Não foi possível registrar o documento.");
  } catch (e) {
    box.innerHTML = '<p class="msg err">' + esc(e.message) + "</p>";
    $("#btnPrint").classList.add("hidden");
    return;
  }
  if (tipo === "certificado") {
    $("#docTitle").textContent = "Certificado — " + c.titulo;
    box.innerHTML = `<div class="docview" style="aspect-ratio:1.414/1;position:relative;background:#FBF7EC;padding:26px;display:flex;flex-direction:column;justify-content:center">
      <div style="position:absolute;inset:14px;border:3px solid #C9A24A"></div><div style="position:absolute;inset:22px;border:1px solid #0F1E3D"></div>
      <img src="${BRASAO}" alt="" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:46%;opacity:.06">
      <div style="position:absolute;right:44px;top:40px">${sealHTML(76)}</div>
      <div style="position:relative;text-align:center;padding:0 70px">
        <img src="${BRASAO}" alt="Brasão" style="width:96px">
        <div class="cz" style="font-size:24px;letter-spacing:.2em;color:#0F1E3D;margin-top:4px">ESCOLA TEOLÓGICA UNIÃO</div>
        <div style="font-style:italic;color:#7A5A14;font-size:16px">Formação Bíblica, Teológica e Ministerial</div>
        <div class="cz gold-text" style="font-size:52px;letter-spacing:.22em;margin-top:14px;line-height:1.15;padding-top:4px">CERTIFICADO</div>
        <p style="font-size:19px;line-height:1.7;color:#1B2238;margin:14px auto 0;max-width:780px">Certificamos que <b class="cz" style="font-size:22px;letter-spacing:.06em">${esc(p.nome || "")}</b> concluiu o <b>${esc(c.titulo)}</b>, curso livre de formação bíblica, teológica e ministerial${horas ? `, com carga horária de <b>${horas} horas</b>` : ""}, cumprindo todas as aulas e avaliações exigidas pela Escola Teológica União.</p>
        <p style="font-size:17px;color:#1B2238;margin:12px 0 0">Cristalina, Goiás, ${dataExtenso()}.</p>
        <div style="display:flex;justify-content:center;margin-top:8px"><div style="text-align:center;width:330px"><img src="${ASSINATURA}" alt="Assinatura do Diretor" style="width:210px;margin-bottom:-8px"><div style="border-top:1px solid #1B2238;padding-top:4px;font-size:14px" class="cz">PR. CHARLEI DE JESUS LIMA DIAS</div><div style="font-size:14px;font-style:italic">Idealizador e Diretor Geral</div></div></div>
        <p style="font-size:12.5px;color:#4a4f5e;margin:12px 0 0">Registro ${reg} · CNPJ ••.••7.548/0001-•• · Curso livre; não equivale a curso de graduação ou pós-graduação.</p>
      </div></div>`;
  } else {
    const val = (m == null ? void 0 : m.expira_em) ? fmtDate(m.expira_em) : (() => {
      const x = /* @__PURE__ */ new Date();
      x.setFullYear(x.getFullYear() + 1);
      return x.toLocaleDateString("pt-BR");
    })();
    const foto = p.foto ? `<img src="${p.foto}" alt="Foto" style="width:100%;height:100%;object-fit:cover">` : `<span class="cz" style="font-size:12px;color:#6B5B36">FOTO 3×4</span>`;
    const lbl = (t) => `<div class="cz" style="font-size:10.5px;letter-spacing:.14em;color:#C9A24A;font-weight:700">${t}</div>`;
    const val2 = (t) => `<div style="font-size:18px;color:#F7F1E3;border-bottom:1px solid rgba(247,241,227,.45);padding-bottom:3px;margin-bottom:9px">${t}</div>`;
    $("#docTitle").textContent = "Carteira de Estudante — " + c.titulo;
    box.innerHTML = `<div style="display:flex;flex-wrap:wrap;gap:24px;justify-content:center;margin-top:20px">
      <div style="width:640px;max-width:100%;aspect-ratio:85.6/54;position:relative;border-radius:22px;overflow:hidden;background:radial-gradient(120% 90% at 50% 40%,#16294F,#0F1E3D 70%);box-shadow:0 10px 30px rgba(0,0,0,.25)">
        <div style="position:absolute;inset:9px;border:2px solid #C9A24A;border-radius:16px"></div>
        <div style="position:absolute;right:18px;top:14px">${sealHTML(44)}</div>
        <div style="display:flex;align-items:center;gap:12px;padding:20px 26px 0">
          <img src="${BRASAO}" alt="" style="width:62px"><div><div class="cz" style="color:#F7F1E3;font-size:17px;letter-spacing:.14em;line-height:1.1">ESCOLA TEOLÓGICA</div><div class="cz gold-text" style="font-size:28px;letter-spacing:.2em;line-height:1.15">UNIÃO</div><div class="cz" style="color:#C9A24A;font-size:10px;letter-spacing:.2em">CARTEIRA DE ESTUDANTE · CURSO LIVRE</div></div></div>
        <div style="display:flex;gap:18px;padding:12px 26px 0">
          <div style="width:104px;height:138px;flex:0 0 104px;border:2px solid #C9A24A;border-radius:6px;background:#F1EAD8;display:flex;align-items:center;justify-content:center;overflow:hidden">${foto}</div>
          <div style="flex:1;min-width:0">${lbl("NOME DO ALUNO")}${val2('<b class="cz" style="font-size:15px;letter-spacing:.06em">' + esc((p.nome || "").toUpperCase()) + "</b>")}
            ${lbl("CURSO")}${val2(esc(c.titulo))}
            ${lbl("NÍVEL")}${val2(esc(c.cat))}
            <div style="display:flex;gap:14px"><div style="flex:1">${lbl("EMISSÃO")}${val2((/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR"))}</div><div style="flex:1">${lbl("VALIDADE")}${val2(val)}</div></div></div></div>
        <div style="position:absolute;left:12px;right:12px;bottom:12px;height:34px;background:#7A1B2B;border-top:2px solid #C9A24A;border-radius:0 0 12px 12px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;color:#F7F1E3;font-size:12px"><span class="cz" style="letter-spacing:.14em">${esc(c.cat.toUpperCase())}</span><span style="font-style:italic">Não substitui documento oficial de identidade</span></div>
      </div>
      <div style="width:640px;max-width:100%;aspect-ratio:85.6/54;position:relative;border-radius:22px;overflow:hidden;background:#F8F3E6;box-shadow:0 10px 30px rgba(0,0,0,.25);color:#1B2238">
        <div style="position:absolute;inset:9px;border:2px solid #A8842F;border-radius:16px"></div>
        <div style="padding:30px 30px 0;text-align:center"><div class="cz" style="font-size:17px;letter-spacing:.16em;color:#0F1E3D">ESCOLA TEOLÓGICA UNIÃO</div><div style="font-size:12.5px;font-style:italic;color:#7A5A14">Formação Bíblica, Teológica e Ministerial</div>
          <p style="font-size:14.5px;line-height:1.45;text-align:justify;margin:10px 0 0">Certificamos que <b>${esc(p.nome || "")}</b> é aluno(a) regularmente matriculado(a) no ${esc(c.titulo)}, curso livre de formação bíblica, teológica e ministerial da Escola Teológica União, Cristalina, Goiás.</p>
          <p style="font-size:12px;line-height:1.4;text-align:justify;margin:8px 0 0;border:1px solid #A8842F;padding:6px 10px;border-radius:4px">Documento de uso pessoal e intransferível. <b>Não substitui documento oficial de identidade</b> e não equivale a curso de graduação ou pós-graduação.</p>
          <p style="font-size:12.5px;font-style:italic;margin:10px 0 0">“Procura apresentar-te a Deus aprovado…” — 2 Timóteo 2.15</p>
          <div style="display:flex;gap:24px;margin-top:6px"><div style="flex:1;text-align:center"><div style="height:44px;border-bottom:1px solid #1B2238"></div><div class="cz" style="font-size:9.5px;margin-top:3px">ASSINATURA DO ALUNO</div></div>
          <div style="flex:1;text-align:center"><div style="height:44px;border-bottom:1px solid #1B2238;position:relative"><img src="${ASSINATURA}" alt="Assinatura do Diretor" style="position:absolute;left:50%;bottom:2px;transform:translateX(-50%);width:140px"></div><div class="cz" style="font-size:9.5px;margin-top:3px">PR. CHARLEI DE JESUS LIMA DIAS</div><div style="font-size:10px;font-style:italic">Idealizador e Diretor Geral</div></div></div></div>
        <div style="position:absolute;left:12px;right:12px;bottom:12px;height:28px;background:#0F1E3D;border-top:2px solid #C9A24A;border-radius:0 0 12px 12px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;color:#C9A24A;font-size:10.5px" class="cz"><span>CNPJ ••.••7.548/0001-••</span><span>${reg}</span></div>
      </div></div>`;
  }
  {
    const cod = reg;
    const urlV = CONFIG.LINK_PUBLICO + "#validar-" + cod;
    box.insertAdjacentHTML("beforeend", `<div style="display:flex;gap:14px;align-items:center;justify-content:center;margin:14px 0 0;flex-wrap:wrap">${qrSVG(urlV, 92)}<p style="font-size:14px;color:#4a4f5e;margin:0;max-width:420px">Código de autenticidade: <b>${esc(cod)}</b><br>Aponte a câmera para o QR Code ou confira em ${esc(CONFIG.LINK_PUBLICO)}#validar</p></div>`);
  }
  if (imprimirAoFinal) setTimeout(() => $("#btnPrint").click(), 300);
}
$("#btnPrint").onclick = () => {
  try {
    window.print();
  } catch (e) {
  }
  setTimeout(() => show($("#mPrint"), "Se a janela de impressão não abriu, abra a plataforma no navegador do celular ou do computador e toque novamente. Na impressão, escolha “Salvar como PDF”.", "info"), 800);
};
$("#fotoIn").onchange = async (e) => {
  const f = e.target.files[0];
  const m = $("#mFoto");
  if (!f) return;
  try {
    const img = await new Promise((ok, no) => {
      const i = new Image();
      i.onload = () => ok(i);
      i.onerror = no;
      i.src = URL.createObjectURL(f);
    });
    const W = 300, H = 400, cv = document.createElement("canvas");
    cv.width = W;
    cv.height = H;
    const r = Math.max(W / img.width, H / img.height), w = img.width * r, h = img.height * r;
    cv.getContext("2d").drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
    const data = cv.toDataURL("image/jpeg", 0.85);
    await API.salvarFoto(data);
    S.profile = await API.profile(S.user.id);
    $("#myFoto").src = data;
    show(m, "Foto salva. Ela aparecerá na sua carteira de estudante.", "ok");
  } catch (er) {
    show(m, "Não foi possível salvar a foto: " + (er.message || "arquivo inválido"), "err");
  }
};
function uploadField(inputId, publico, tipo = "pdf") {
  const T = {
    pdf: ["application/pdf", "Escolher PDF do aparelho ou do Drive", "ou cole um link do Google Drive acima"],
    video: ["video/*", "Escolher vídeo do aparelho", "ou cole o link do YouTube, Vimeo ou Google Drive acima (recomendado para vídeos longos)"],
    audio: ["audio/*", "Escolher áudio do aparelho", "ou cole um link do Google Drive acima"]
  }[tipo];
  return `<div class="res" style="margin-top:6px;align-items:center"><label class="btn btn-line btn-sm" style="margin:0;font-family:'Cinzel',serif;letter-spacing:.06em;color:var(--navy)">${T[1]}
    <input type="file" accept="${T[0]}" data-up="${inputId}" data-pub="${publico ? 1 : 0}" style="display:none"></label><span class="upmsg" style="font-size:14px;color:var(--muted)">${T[2]}</span></div>`;
}
function bindUploads(root) {
  root.querySelectorAll("[data-up]").forEach((inp) => inp.onchange = async () => {
    const f = inp.files[0];
    if (!f) return;
    const msg = inp.closest(".res").querySelector(".upmsg");
    if (f.size > 50 * 1024 * 1024) {
      msg.innerHTML = '<span style="color:var(--crimson)">Arquivo maior que 50 MB. Para vídeos longos, publique no YouTube como “não listado” e cole o link acima.</span>';
      inp.value = "";
      return;
    }
    msg.textContent = "Enviando “" + f.name + "”… aguarde.";
    try {
      const url = await API.enviarArquivo(f, inp.dataset.pub === "1");
      root.querySelector("#" + inp.dataset.up).value = url;
      msg.innerHTML = '<b style="color:var(--ok)">Arquivo enviado e guardado na plataforma.</b>';
    } catch (e) {
      msg.innerHTML = '<span style="color:var(--crimson)">' + esc(e.message) + "</span>";
    }
  });
}
let E_TIPO = "";
function renderEstudos() {
  const l = S.estudos.filter((e) => e.ativo !== false);
  const tipos = [...new Set(l.map((e) => e.tipo))];
  $("#eTabs").innerHTML = tipos.length > 1 ? ["", ...tipos].map((t) => `<button type="button" class="${t === E_TIPO ? "on" : ""}" data-et="${esc(t)}">${t ? esc({ "Esboço de pregação": "Esboços de pregação", "Escola Dominical": "Escola Dominical" }[t] || t + "s") : "Todos"}</button>`).join("") : "";
  $$("[data-et]").forEach((b) => b.onclick = () => {
    E_TIPO = b.dataset.et;
    renderEstudos();
  });
  const v = l.filter((e) => !E_TIPO || e.tipo === E_TIPO);
  $("#eLista").innerHTML = v.length ? v.map((e) => `<article class="ecard"><div class="capa"><img src="${BRASAO}" alt=""><span>${esc((e.tipo || "").toUpperCase())}</span></div>
    <div class="bd"><span class="pill ok" style="align-self:flex-start">GRÁTIS</span><h3>${esc(e.titulo)}</h3><p>${esc(e.descricao || "")}</p>
    <div class="res" style="margin-top:6px">${e.pdf_url ? `<button type="button" class="btn btn-gold btn-sm" data-ler="${esc(e.pdf_url)}" data-tit="${esc(e.titulo)}">Ler</button><a class="btn btn-line btn-sm" href="${esc(driveDownload(e.pdf_url))}" target="_blank" rel="noopener">Baixar PDF</a>` : ""}</div></div></article>`).join("") : '<div class="panel"><p style="margin:0">Novos estudos em breve.</p></div>';
}
let V_CURSO = null;
function renderVideoaulas() {
  const cursos = ativosCursos().filter((c) => lessonsOf(c.id).length);
  if (!cursos.length) {
    $("#vTabs").innerHTML = "";
    $("#vLista").innerHTML = '<div class="panel"><p style="margin:0">As vídeo-aulas estão em preparação.</p></div>';
    return;
  }
  if (!V_CURSO || !cursos.some((c) => c.id === V_CURSO)) V_CURSO = cursos[0].id;
  $("#vTabs").innerHTML = cursos.map((c) => `<button type="button" role="tab" class="${c.id === V_CURSO ? "on" : ""}" data-vc="${c.id}">${esc(c.titulo.replace(" de Teologia", ""))}</button>`).join("");
  $$("[data-vc]").forEach((b) => b.onclick = () => {
    V_CURSO = b.dataset.vc;
    renderVideoaulas();
  });
  const ok = hasAccess(V_CURSO);
  const play = `<span class="play"><svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="#0F1E3D"/></svg></span>`;
  const lock = `<span class="play" style="background:rgba(247,241,227,.9)"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F1E3D" stroke-width="2" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg></span>`;
  $("#vLista").innerHTML = discsOf(V_CURSO).filter((d) => d.aulas.length).map((d) => `
    <h3 class="cz" style="font-size:15px;color:var(--navy);margin-top:6px"><span style="color:var(--goldd);font-size:12px;letter-spacing:.16em">DISCIPLINA ${d.n}</span><br>${esc(d.nome)}</h3>
    <div class="vgrid">${d.aulas.map((a) => {
    const livre = a.previa || ok;
    const done = S.prog.includes(a.id);
    return `<button type="button" class="vcard" data-va="${a.id}" aria-label="Assistir: ${esc(a.titulo)}">
        <span class="vthumb"><img class="br" src="${BRASAO}" alt=""><span class="num">AULA ${a.ordem}</span>
          <span class="tag">${done ? '<span class="pill ok">CONCLUÍDA</span>' : a.previa && !ok ? '<span class="pill ok">GRÁTIS</span>' : livre ? "" : '<span class="pill lock">MATRICULADOS</span>'}</span>${livre ? play : lock}</span>
        <span class="vbody"><span class="t" style="display:block">${esc(a.titulo)}</span><span class="m" style="display:block">${esc(d.nome)}${a.horas ? " · " + fmtH(+a.horas) : ""}</span></span></button>`;
  }).join("")}</div>`).join("");
  $$("[data-va]").forEach((b) => b.onclick = () => {
    var _a;
    const a = S.aulas.find((x) => x.id === b.dataset.va);
    S.pendDisc = (a.disc_ordem || 1) + "|" + (((_a = discsOf(a.curso_id).find((d) => d.n === (a.disc_ordem || 1))) == null ? void 0 : _a.nome) || a.modulo);
    S.pendAula = a.id;
    location.hash = "curso-" + a.curso_id;
  });
}
const STATUS_PAG = { pendente: ["lock", "EM CONFERÊNCIA"], aprovado: ["ok", "CONFIRMADO"], recusado: ["off", "RECUSADO"] };
function fmtDH(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  } catch (e) {
    return iso;
  }
}
async function lerArquivo(f) {
  if (f.type === "application/pdf") {
    if (f.size > 2.5 * 1024 * 1024) throw new Error("O PDF é muito grande (máximo 2,5 MB). Envie uma foto ou print do comprovante.");
    return await new Promise((ok, no) => {
      const r = new FileReader();
      r.onload = () => ok(r.result);
      r.onerror = no;
      r.readAsDataURL(f);
    });
  }
  const img = await new Promise((ok, no) => {
    const i = new Image();
    i.onload = () => ok(i);
    i.onerror = () => no(new Error("Arquivo de imagem inválido."));
    i.src = URL.createObjectURL(f);
  });
  const k = Math.min(1, 1400 / Math.max(img.width, img.height));
  const cv = document.createElement("canvas");
  cv.width = Math.round(img.width * k);
  cv.height = Math.round(img.height * k);
  cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
  return cv.toDataURL("image/jpeg", 0.8);
}
$("#fComp").onsubmit = async (e) => {
  e.preventDefault();
  const m = $("#mComp");
  const f = $("#cArq").files[0];
  const cid = $("#mCursoSel").value;
  if (!S.user) return show(m, "Entre na sua conta para enviar o comprovante.", "err");
  if (!f) return show(m, "Escolha a foto ou o PDF do comprovante.", "err");
  const btn = e.target.querySelector("button[type=submit]");
  btn.disabled = true;
  btn.textContent = "Enviando…";
  try {
    const arq = await lerArquivo(f);
    const r = await API.enviarComprovante(cid, $("#cValor").value.trim(), arq);
    await refreshUser();
    const dias = (r == null ? void 0 : r.dias) || 0;
    m.className = "msg ok";
    m.innerHTML = dias ? `Comprovante recebido! O <b>${esc(curso(cid).titulo)}</b> foi liberado provisoriamente por ${dias} dias enquanto a direção confere o pagamento. <a href="#curso-${cid}">Começar a estudar</a>` : `Comprovante recebido! A direção vai conferir o pagamento. Acompanhe em “Minha Área › Meus pagamentos”.`;
    m.classList.remove("hidden");
    e.target.reset();
  } catch (er) {
    show(m, er.message || "Não foi possível enviar.", "err");
  }
  btn.disabled = false;
  btn.textContent = "Enviar comprovante";
};
async function renderMyPays() {
  let l = [];
  try {
    l = await API.meusComprovantes(S.user.id);
  } catch (e) {
  }
  $("#myPays").innerHTML = l.length ? l.map((c) => {
    var _a;
    const st = STATUS_PAG[c.status] || ["lock", c.status];
    return `<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;padding:10px 0;border-bottom:1px solid #EFE6D0"><span><b>${esc(((_a = curso(c.curso_id)) == null ? void 0 : _a.titulo) || c.curso_id)}</b><br><span style="font-size:15px;color:var(--muted)">Enviado em ${fmtDH(c.criado_em)}${c.valor ? " · R$ " + esc(c.valor) : ""}${c.obs ? " · " + esc(c.obs) : ""}</span></span><span class="pill ${st[0]}" style="align-self:center">${st[1]}</span></div>`;
  }).join("") : `<p style="margin:0">Nenhum comprovante enviado. Depois de pagar via Pix (chave ${esc(CONFIG.PIX_CHAVE)}), envie o comprovante pela página de matrícula.</p>`;
}
async function drawPag() {
  let l = [];
  try {
    l = await API.comprovantes();
  } catch (e) {
  }
  S.pags = l;
  const pend = l.filter((c) => c.status === "pendente").length;
  $("#tabPag").textContent = pend ? `Pagamentos (${pend})` : "Pagamentos";
  $$('[data-nav="admin"]').forEach((a) => a.textContent = pend ? `Painel da Direção (${pend})` : "Painel da Direção");
  const f = $("#pagFiltro").value;
  const rows = l.filter((c) => !f || c.status === f);
  $("#tbPag").innerHTML = rows.map((c) => {
    var _a;
    const a = S.alunos.find((x) => x.id === c.user_id) || {};
    const st = STATUS_PAG[c.status] || ["lock", c.status];
    return `<tr><td><b>${esc(a.nome || "")}</b><br><span style="font-size:14px;color:var(--muted)">${esc(a.email || "")}</span></td><td>${esc(((_a = curso(c.curso_id)) == null ? void 0 : _a.titulo) || c.curso_id)}</td><td>${c.valor ? "R$ " + esc(c.valor) : "—"}</td><td>${fmtDH(c.criado_em)}</td><td><span class="pill ${st[0]}">${st[1]}</span></td>
      <td><div class="chips"><button class="btn btn-line btn-sm" data-vcomp="${c.id}">Ver comprovante</button>${c.status === "pendente" ? `<button class="btn btn-gold btn-sm" data-okcomp="${c.id}">Confirmar</button><button class="btn btn-red btn-sm" data-nocomp="${c.id}">Recusar</button>` : ""}</div></td></tr>`;
  }).join("") || `<tr><td colspan="6">Nenhum comprovante ${f === "pendente" ? "pendente" : "encontrado"}.</td></tr>`;
  $$("[data-vcomp]").forEach((b) => b.onclick = async () => {
    const arq = await API.comprovanteArquivo(b.dataset.vcomp);
    if (!arq) return;
    if (arq.startsWith("data:application/pdf")) {
      const blob = await (await fetch(arq)).blob();
      const url = URL.createObjectURL(blob);
      modal(`<h3>Comprovante (PDF)</h3><p><a class="btn btn-gold" href="${url}" target="_blank" rel="noopener">Abrir o PDF</a></p><div class="acts"><button class="btn btn-line" data-close>Fechar</button></div>`);
    } else modal(`<h3>Comprovante</h3><img src="${arq}" alt="Comprovante de pagamento" style="width:100%;border:1px solid #E1D4B2;border-radius:8px;margin-top:10px"><div class="acts"><button class="btn btn-line" data-close>Fechar</button></div>`, (r) => {
      r.querySelector(".box").style.maxWidth = "640px";
    });
  });
  $$("[data-okcomp]").forEach((b) => b.onclick = () => {
    var _a;
    const c = l.find((x2) => x2.id === b.dataset.okcomp);
    const x = /* @__PURE__ */ new Date();
    x.setDate(x.getDate() + CONFIG.ACESSO_CONFIRMADO_DIAS);
    modal(`<h3>Confirmar pagamento</h3><p>Confira no extrato do seu banco se o valor caiu. Ao confirmar, o <b>${esc(((_a = curso(c.curso_id)) == null ? void 0 : _a.titulo) || "")}</b> fica liberado até a data abaixo.</p>
      <label for="cfExp">Acesso até (próximo vencimento)</label><input type="date" id="cfExp" value="${x.toISOString().slice(0, 10)}">
      <div class="chips" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-mes="1">Mensalidade: +1 mês</button><button type="button" class="btn btn-line btn-sm" data-mes="3">+3 meses</button><button type="button" class="btn btn-line btn-sm" data-mes="6">+6 meses</button><button type="button" class="btn btn-line btn-sm" data-mes="12">Anual: +12 meses</button></div>
      <p style="font-size:14px;color:var(--muted);margin:8px 0 0">Os meses contam a partir do vencimento atual do aluno (ou de hoje, se não houver). Após o vencimento, o aluno tem ${CONFIG.TOLERANCIA_DIAS} dias de tolerância e depois é bloqueado automaticamente.</p>
      <div class="acts"><button class="btn btn-line" data-close>Cancelar</button><button class="btn btn-gold" id="cfOk">Confirmar e liberar</button></div>`, (r, close) => {
      var _a2;
      const al = S.alunos.find((a) => a.id === c.user_id);
      const mm = (_a2 = al == null ? void 0 : al.matriculas) == null ? void 0 : _a2.find((z) => z.curso_id === c.curso_id && !z.provisoria);
      r.querySelectorAll("[data-mes]").forEach((bt) => bt.onclick = () => {
        const base = (mm == null ? void 0 : mm.expira_em) && mm.expira_em > today() ? mm.expira_em : today();
        const d = /* @__PURE__ */ new Date(base + "T12:00:00");
        d.setMonth(d.getMonth() + +bt.dataset.mes);
        r.querySelector("#cfExp").value = d.toISOString().slice(0, 10);
      });
      r.querySelector("#cfOk").onclick = async () => {
        await API.decidirComprovante(c.id, true, r.querySelector("#cfExp").value, null);
        close();
        await renderAdmin();
        $("[data-tab=pagamentos]").click();
      };
    });
  });
  $$("[data-nocomp]").forEach((b) => b.onclick = () => {
    const c = l.find((x) => x.id === b.dataset.nocomp);
    modal(`<h3>Recusar comprovante</h3><p>O acesso provisório deste curso será retirado. Informe o motivo para o aluno.</p>
      <label for="rcObs">Motivo</label><input id="rcObs" value="Pagamento não identificado. Fale com a direção pelo WhatsApp.">
      <div class="acts"><button class="btn btn-line" data-close>Cancelar</button><button class="btn btn-red" id="rcOk">Recusar</button></div>`, (r, close) => {
      r.querySelector("#rcOk").onclick = async () => {
        await API.decidirComprovante(c.id, false, null, r.querySelector("#rcObs").value.trim());
        close();
        await renderAdmin();
        $("[data-tab=pagamentos]").click();
      };
    });
  });
}
$("#pagFiltro").onchange = drawPag;
$("#fLogin").onsubmit = async (e) => {
  var _a, _b, _c;
  e.preventDefault();
  const m = $("#mLogin");
  try {
    await API.signIn($("#lEmail").value.trim(), $("#lPass").value);
    await refreshUser();
    if ((_a = S.profile) == null ? void 0 : _a.is_admin) {
      await API.signOut();
      await refreshUser();
      return show(m, "Esta conta pertence à Direção e não entra pela Área do Aluno. A Direção tem acesso próprio e separado.", "err");
    }
    if ((_b = S.profile) == null ? void 0 : _b.bloqueado) show(m, "Seu acesso está suspenso. Fale com a direção.", "err");
    location.hash = ((_c = S.profile) == null ? void 0 : _c.is_admin) ? "admin" : "aluno";
  } catch (er) {
    show(m, er.message, "err");
  }
};
function dirTrava() {
  try {
    return JSON.parse(localStorage.getItem("etu_dir_trava") || '{"n":0,"ate":0}');
  } catch (e) {
    return { n: 0, ate: 0 };
  }
}
$("#fDir").onsubmit = async (e) => {
  var _a;
  e.preventDefault();
  const m = $("#mDir");
  const tv = dirTrava();
  if (tv.ate > Date.now()) return show(m, `Acesso bloqueado por excesso de tentativas. Tente novamente em ${Math.ceil((tv.ate - Date.now()) / 6e4)} minuto(s).`, "err");
  const falha = () => {
    const t = dirTrava();
    t.n = (t.n || 0) + 1;
    if (t.n >= 5) {
      t.ate = Date.now() + 15 * 6e4;
      t.n = 0;
    }
    try {
      localStorage.setItem("etu_dir_trava", JSON.stringify(t));
    } catch (e2) {
    }
  };
  try {
    await API.signIn($("#dEmail").value.trim(), $("#dPass").value);
    await refreshUser();
    if (!((_a = S.profile) == null ? void 0 : _a.is_admin)) {
      falha();
      await API.signOut();
      await refreshUser();
      return show(m, "Acesso negado. Esta área é exclusiva da direção da escola.", "err");
    }
    try {
      localStorage.removeItem("etu_dir_trava");
    } catch (e2) {
    }
    location.hash = "admin";
  } catch (er) {
    falha();
    show(m, er.message, "err");
  }
};
let ociosoT = null;
function marcaUso() {
  var _a;
  clearTimeout(ociosoT);
  if ((_a = S.profile) == null ? void 0 : _a.is_admin) ociosoT = setTimeout(async () => {
    var _a2;
    if ((_a2 = S.profile) == null ? void 0 : _a2.is_admin) {
      await API.signOut();
      await refreshUser();
      location.hash = "direcao";
      setTimeout(() => show($("#mDir"), "Por segurança, a sessão da direção foi encerrada após 30 minutos sem uso. Entre novamente.", "err"), 300);
    }
  }, 30 * 6e4);
}
["click", "keydown", "touchstart"].forEach((ev) => document.addEventListener(ev, marcaUso, { passive: true }));
$("#fSign").onsubmit = async (e) => {
  e.preventDefault();
  const m = $("#mSign");
  const nome = $("#sNome").value.trim(), email = $("#sEmail").value.trim(), pw = $("#sPass").value;
  if (!nome || !email) return show(m, "Preencha o nome e o e-mail.", "err");
  if (pw.length < 6) return show(m, "A senha deve ter pelo menos 6 caracteres.", "err");
  {
    const rz = etuNomeReservado(nome, email);
    if (rz) {
      etuAlertaSeg("tentativa de cadastro", nome, email, $("#sTel").value.trim(), rz);
      return show(m, "Este nome ou e-mail é reservado à Direção da Escola Teológica União. Se esse é realmente o seu nome, fale com a escola pelo WhatsApp oficial para liberar o cadastro.", "err");
    }
  }
  if (!$("#sAceite").checked) return show(m, "Para criar a conta, leia e aceite os Termos de Uso e o Contrato do curso.", "err");
  if (!$("#sPriv").checked) return show(m, "Para criar a conta, leia e concorde com a Política de Privacidade.", "err");
  try {
    localStorage.setItem("etu_termos_aceite", JSON.stringify({ versao: "2026-11-13", data: (/* @__PURE__ */ new Date()).toLocaleString("pt-BR") }));
  } catch (_) {
  }
  try {
    localStorage.setItem("etu_privacidade_aceite", JSON.stringify({ versao: "2026-11-13", data: (/* @__PURE__ */ new Date()).toLocaleString("pt-BR") }));
  } catch (_) {
  }
  try {
    await API.signUp(nome, $("#sTel").value.trim(), email, pw, $("#sCurso").value);
    await refreshUser();
    if (S.user) location.hash = "aluno";
    else show(m, "Conta criada! Enviamos um e-mail de confirmação. Abra o link e depois entre na plataforma.", "ok");
  } catch (er) {
    show(m, er.message, "err");
  }
};
$("#fForgot").onsubmit = async (e) => {
  e.preventDefault();
  const m = $("#mForgot");
  const email = $("#fEmail").value.trim();
  if (!email) return show(m, "Informe o seu e-mail.", "err");
  try {
    await API.forgot(email);
    if (API.demo) {
      m.className = "msg info";
      m.innerHTML = 'No modo demonstração nenhum e-mail é enviado. <a href="#nova-senha">Clique aqui para simular o link recebido.</a>';
      m.classList.remove("hidden");
    } else show(m, "Se este e-mail estiver cadastrado, você receberá em instantes um link para criar uma nova senha. Verifique também a caixa de spam.", "ok");
  } catch (er) {
    show(m, er.message, "err");
  }
};
$("#fNew").onsubmit = async (e) => {
  e.preventDefault();
  const m = $("#mNew");
  const a = $("#nPass").value, b = $("#nPass2").value;
  if (a.length < 6) return show(m, "A senha deve ter pelo menos 6 caracteres.", "err");
  if (a !== b) return show(m, "As senhas não são iguais.", "err");
  try {
    await API.newPassword(a);
    recovering = false;
    show(m, "Senha alterada com sucesso! Você já pode entrar com a nova senha.", "ok");
    await refreshUser();
  } catch (er) {
    show(m, er.message, "err");
  }
};
fillSelects();
$("#menuBtn").onclick = () => {
  const n = $("#mainNav");
  n.classList.toggle("open");
  $("#menuBtn").setAttribute("aria-expanded", n.classList.contains("open"));
};
$$(".tabs button").forEach((b) => b.onclick = () => {
  $$(".tabs button").forEach((x) => x.classList.toggle("on", x === b));
  $$("[data-tabpanel]").forEach((p) => p.classList.toggle("hidden", p.dataset.tabpanel !== b.dataset.tab));
});
$("#busca").oninput = drawAlunos;
$("#aCursoSel").onchange = drawAulas;
$("#btnNovaAula").onclick = () => dlgAula(null);
$("#btnNovoMural").onclick = () => dlgMural(null);
$("#btnNovoCurso").onclick = () => dlgCurso(null);
$("#btnNovoEstudo").onclick = () => dlgEstudo(null);
$("#ano").textContent = (/* @__PURE__ */ new Date()).getFullYear();
const WA = (msg) => `https://wa.me/${CONFIG.WHATSAPP_LINK}${msg ? "?text=" + encodeURIComponent(msg) : ""}`;
$("#contato").innerHTML = `WhatsApp: <a href="${WA("Olá! Gostaria de informações sobre a Escola Teológica União.")}" target="_blank" rel="noopener">${esc(CONFIG.WHATSAPP)}</a><br>E-mail: <a href="mailto:${esc(CONFIG.EMAIL)}">${esc(CONFIG.EMAIL)}</a><br>Pix (telefone): ${esc(CONFIG.PIX_CHAVE)}`;
$$(".waLink").forEach((a) => a.href = WA("Olá! Gostaria de informações sobre a Escola Teológica União."));
$$(".waShow").forEach((e) => e.textContent = CONFIG.WHATSAPP);
$$(".emailShow").forEach((e) => e.textContent = CONFIG.EMAIL);
$$(".emailLink").forEach((a) => a.href = "mailto:" + CONFIG.EMAIL);
$$(".pixShow").forEach((e) => e.textContent = CONFIG.PIX_CHAVE);
function waEnroll() {
  const c = curso($("#mCursoSel").value);
  const p = S.profile;
  $("#waEnroll").href = WA(`Olá! Sou ${(p == null ? void 0 : p.nome) || "[seu nome completo]"}${S.user ? " (e-mail da conta: " + S.user.email + ")" : ""}. Fiz o pagamento via Pix e quero me matricular no ${c.titulo}. Segue o comprovante.`);
}
$("#mCursoSel").onchange = waEnroll;
$("#copyPix").onclick = async () => {
  const m = $("#pixMsg");
  try {
    await navigator.clipboard.writeText(CONFIG.PIX_COPIAR);
    show(m, "Chave Pix copiada. Cole no aplicativo do seu banco.", "ok");
  } catch (e) {
    show(m, "Não foi possível copiar automaticamente. Chave: " + CONFIG.PIX_COPIAR, "info");
  }
};
function renderTicker() {
  const avisos2 = [...CONFIG.AVISOS, ...ativosCursos().filter((c) => c.em_breve).map((c) => "Em breve: " + c.titulo + (ofereceCertificado(c) ? " — com certificado após a conclusão" : "")), ...S.mural.filter((m) => m.tipo === "Aviso").map((m) => m.titulo)];
  const html = avisos2.map((a) => `<span class="it">${esc(a)}</span>`).join("");
  $("#tickerTrack").innerHTML = html + html;
}
function renderDepoimentos() {
  const l = S.mural.filter((m) => m.tipo === "Depoimento");
  $("#depGrid").innerHTML = l.length ? l.map((m) => {
    const v = toEmbed(m.video_url);
    return `<article class="mcard">${v && EMBED_OK ? `<div class="video"><iframe src="${esc(v)}" title="${esc(m.titulo)}" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>` : ""}
      <div class="bd"><div class="mtag">DEPOIMENTO</div><h3>${esc(m.titulo)}</h3><p>${esc(m.texto || "")}</p>${m.video_url ? `<a class="btn btn-line btn-sm" style="margin-top:10px" href="${esc(m.video_url)}" target="_blank" rel="noopener">Assistir ao vídeo</a>` : ""}</div></article>`;
  }).join("") : `<div class="panel" style="grid-column:1/-1;text-align:center"><p style="margin:0">Os primeiros depoimentos em vídeo serão publicados em breve.</p></div>`;
  $("#waDepo2").href = WA("Olá! Sou aluno(a) da Escola Teológica União e quero enviar o meu depoimento em vídeo. Autorizo a publicação na plataforma.");
}
function renderMural() {
  const items = S.mural.filter((m) => !["Pergunta e resposta", "Desafio bíblico", "Pedido de oração", "Evento", "Concluinte"].includes(m.tipo));
  $("#muralSec").classList.toggle("hidden", !items.length);
  $("#muralGrid").innerHTML = items.map(etuCard).join("");
  etuLigaEnquetes($("#muralGrid"));
}
function olho(abre) {
  return abre ? '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/></svg>' : '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M3 3l18 18M10.6 5.1A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.1M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7a10 10 0 0 0 4.4-1"/></svg>';
}
function ligaOlho(root = document) {
  root.querySelectorAll("input[type=password]").forEach((inp) => {
    if (inp.parentNode.classList.contains("pw")) return;
    const w = document.createElement("span");
    w.className = "pw";
    inp.parentNode.insertBefore(w, inp);
    w.appendChild(inp);
    const b = document.createElement("button");
    b.type = "button";
    b.className = "pw-eye";
    b.setAttribute("aria-controls", inp.id);
    b.setAttribute("aria-pressed", "false");
    const draw = () => {
      const vis = inp.type === "text";
      b.innerHTML = olho(!vis) + (vis ? "Ocultar" : "Mostrar");
      b.setAttribute("aria-label", vis ? "Ocultar a senha" : "Mostrar a senha");
      b.setAttribute("aria-pressed", String(vis));
    };
    b.onclick = () => {
      inp.type = inp.type === "password" ? "text" : "password";
      draw();
      inp.focus();
    };
    draw();
    w.appendChild(b);
    inp.form && inp.form.addEventListener("submit", () => {
      inp.type = "password";
      draw();
    });
  });
}
ligaOlho();
(function() {
  const u = CONFIG.LINK_PUBLICO;
  const msg = "Conheça a Escola Teológica União — Curso Livre de Teologia. Acesse a plataforma: " + u;
  $("#lpUrl").textContent = u;
  $("#lpZap").href = "https://wa.me/?text=" + encodeURIComponent(msg);
  $("#lpCopiar").onclick = async () => {
    try {
      await navigator.clipboard.writeText(u);
    } catch (e) {
      const t = document.createElement("textarea");
      t.value = u;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    $("#lpCopiar").textContent = "Link copiado ✓";
    setTimeout(() => $("#lpCopiar").textContent = "Copiar link", 2500);
  };
  if (navigator.share) $("#lpShare").onclick = () => navigator.share({ title: "Escola Teológica União", text: msg, url: u }).catch(() => {
  });
  else $("#lpShare").style.display = "none";
})();
$$("#qaAdmin [data-qa]").forEach((b) => b.onclick = () => {
  const t = $(`[data-tab="${b.dataset.qa}"]`);
  if (t) t.click();
  const bt = b.dataset.qaBtn && document.getElementById(b.dataset.qaBtn);
  const tb = $(".tabs");
  tb && tb.scrollIntoView({ behavior: "smooth", block: "start" });
  if (bt) setTimeout(() => bt.click(), 250);
});
const AI_PERFIL_PADRAO = `Você é o Assistente ETU, atendente virtual da Escola Teológica União (ETU), escola de cursos livres de formação bíblica, teológica e ministerial, com sede em Cristalina, Goiás. Idealizador e Diretor Geral: Pr. Charlei de Jesus Lima Dias.

Como atender:
- Responda sempre em português do Brasil, com cordialidade, clareza e respeito, como um secretário e professor cristão.
- Ajude os alunos a usar a plataforma: entrar, recuperar a senha, encontrar aulas, apostilas e vídeos, fazer as provas, acompanhar o progresso, enviar o comprovante de pagamento.
- Ajude nos estudos: explique termos teológicos, contextos bíblicos e doutrinas, sempre com a Bíblia e na linha da escola — trinitária, pentecostal clássica, arminiana, dispensacionalista e pré-tribulacionista —, apresentando com respeito as outras posições quando houver debate entre cristãos.
- Converse com naturalidade: responda saudações, agradeça, faça perguntas para entender a dúvida do aluno.
- Nas questões bíblicas e teológicas, responda com o preparo de um doutor em teologia: contexto histórico e literário, sentido das palavras no original explicado em português, teologia bíblica e sistemática, história da Igreja e apologética, sempre com as referências bíblicas e com aplicação para a vida e o ministério.
- Também ajude a direção: redação de avisos, organização de aulas, perguntas de prova, esboços e revisões, na linha editorial da escola.
- Quando o assunto exigir a direção (pagamento, liberação de curso, certificado, reclamação, caso pessoal delicado) ou quando o aluno pedir atendimento humano, explique que vai encaminhar e oriente o aluno a tocar em “Falar com a direção (atendimento humano)”.
- Em perguntas de prova, ensine o caminho para a resposta, mas não entregue o gabarito.
- Cursos: Curso Básico, Curso Médio e Curso Avançado de Teologia (cursos livres; não equivalem a graduação reconhecida pelo MEC). Matrícula via Pix, chave (61) 99521-1432; o comprovante é enviado na própria plataforma ou pelo WhatsApp (61) 99521-1432. E-mail: etu.escolateologicauniao215@gmail.com.
- Quem já fez curso básico ou médio em outra instituição pode pedir à Direção uma avaliação do conteúdo do nível já estudado; aprovado, pode ser matriculado no nível seguinte. Só a Direção decide.
- A plataforma funciona no celular, no tablet e no computador; o certificado tem código de verificação; há carteirinha de estudante.
- O aplicativo está sendo publicado na Google Play: a escola procura testadores com celular Android, que escrevem o endereço do Gmail no WhatsApp da escola (não é preciso mandar e-mail), instalam pelo convite e mantêm o app por 14 dias, abrindo uma vez por dia.
- Termos: curso livre, sem MEC; desistência em 7 dias com devolução total; dados tratados conforme a LGPD.
- Quando perguntarem se você é uma IA ou quem o treinou, diga com transparência que é o assistente virtual da escola e que responde conforme as orientações preparadas pela Direção, sob a responsabilidade do Pr. Charlei de Jesus Lima Dias; os estudos são submetidos à Bíblia, única regra de fé e prática.`;
const AI_LIMITES_PADRAO = `- Nunca peça nem informe senhas; para trocar a senha, oriente o aluno a usar “Esqueci a senha”.
- Não confirme pagamentos, não libere cursos, não emita certificados e não prometa prazos: isso é decidido pela direção. Encaminhe ao WhatsApp da escola.
- Não fale em nome do diretor nem invente regras, preços, datas ou documentos que não estejam nestas instruções.
- Não invente versículos, citações, autores nem fatos históricos; quando não souber, diga que não sabe.
- Em assuntos pessoais graves (saúde, crise emocional, conflitos familiares), acolha com respeito e oriente a procurar o pastor, a família e, se necessário, ajuda profissional.
- Não trate de política partidária nem de assuntos alheios à escola e aos estudos bíblicos.`;
function demoAt() {
  try {
    return JSON.parse(localStorage.getItem("etu_atend") || "[]");
  } catch (e) {
    return [];
  }
}
function demoAi() {
  let c = {};
  try {
    c = JSON.parse(localStorage.getItem("etu_ai_cfg") || "{}");
  } catch (e) {
  }
  return __spreadValues({ ativo: true, nome: "Assistente ETU", publico: "alunos", limite_diario: 30, modelo: "claude-sonnet-5-5", instrucoes: AI_PERFIL_PADRAO, limites: AI_LIMITES_PADRAO }, c);
}
const FAQ = [
  [/(senha|cpf|rg|documento|endere[çc]o|telefone|e-?mail|dados|nota|pagamento|matr[ií]cula) (d[oae]s?|de) (outr|meu (filho|irm[ãa]o|amigo|esposa|marido)|fulan|alun[oa]s?\b)|dados (pessoais )?de outr|(qual|me (passa|d[êe]|informe)) (a )?(senha|cpf|documento)/i, () => `Por segurança, o assistente nunca informa senhas, documentos, notas, pagamentos nem qualquer dado pessoal, nem de você nem de outra pessoa. Cada aluno vê os próprios dados só depois de entrar com a sua senha na Área do Aluno. Se precisar de algo assim, toque em “Falar com a direção”: a direção confirma a identidade antes de qualquer informação.`],
  [/^\s*(bom dia|boa tarde|boa noite|ol[áa]|oi|paz do senhor|a paz do senhor|gra[çc]a e paz|e a[íi])\b/i, () => {
    const h = (/* @__PURE__ */ new Date()).getHours();
    return `${h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite"}! A paz do Senhor. Seja bem-vindo à Escola Teológica União. Em que posso ajudar hoje? Pode perguntar sobre os cursos, a matrícula, o acesso à plataforma ou pedir para falar com a direção.`;
  }],
  [/obrigad|valeu|deus te aben[çc]oe|grato|grata/i, () => `Amém! Nós é que agradecemos. Que o Senhor abençoe os seus estudos. Se precisar de algo mais, é só escrever.`],
  [/humano|pessoa|atendente|diretor|dire[çc][ãa]o|pastor charlei|falar com algu[ée]m/i, () => `Claro. Toque no botão “Falar com a direção (atendimento humano)”, logo abaixo, deixe o seu nome, o seu contato e a sua mensagem: o pedido chega ao painel da direção e o senhor(a) recebe a resposta pelo WhatsApp ou e-mail informado.`],
  [/(\bmec\b|reconhecid|gradua[çc][ãa]o|diploma)/i, () => `Os cursos da Escola Teológica União são cursos livres de formação bíblica, teológica e ministerial, garantidos pela liberdade de ensino. Não equivalem a graduação ou pós-graduação reconhecidas pelo MEC e não conferem diploma. O aluno recebe certificado de conclusão de curso livre, com código de verificação, e carteirinha de estudante.`],
  [/(quem (te |o |lhe )?(treinou|criou|programou|ensinou)|voc[êe] [ée] (um )?(rob[ôo]|humano|pessoa|ia\b|intelig)|intelig[êe]ncia artificial|\bia\b|\bchat ?gpt|confi[áa]vel|posso confiar)/i, () => `Sou o assistente virtual da Escola Teológica União. Não respondo por conta própria: tudo o que informo segue as orientações, o conteúdo e as regras preparados pela Direção da escola, sob a responsabilidade do Idealizador e Diretor Geral, Pr. Charlei de Jesus Lima Dias. Quando não tenho a resposta, encaminho você à Direção. Os estudos bíblicos da escola são fruto de pesquisa, oração e ensino da Direção, sempre submetidos à Bíblia, que é a única regra de fé e prática. Se preferir conversar com uma pessoa, toque em “Falar com a direção (atendimento humano)”.`],
  [/(j[áa] (fiz|tenho|terminei|conclu[íi])|fiz (o|um) curso|outra (escola|institui)|nivelamento|aproveitamento|pular o b[áa]sico|come[çc]ar (pelo|no) m[ée]dio)/i, () => `Que bom que você já estudou! A formação da escola começa pelo Curso Básico, segue para o Curso Médio e termina no Curso Avançado. Quem já fez um curso básico (ou médio) de teologia em outra instituição pode pedir à Direção uma avaliação com o conteúdo do nível já estudado. Sendo aprovado, pode ser matriculado direto no nível seguinte. Fale com a direção pelo botão “Falar com a direção (atendimento humano)” ou pelo WhatsApp ${CONFIG.WHATSAPP}, informando o curso que já fez e onde estudou.`],
  [/(play ?store|google play|loja de aplicativ|testador|testar o (app|aplicativo)|aplicativo na loja)/i, () => `O aplicativo da escola está sendo publicado na Google Play, e a Google exige que 12 pessoas o testem por 14 dias. Para ajudar, você precisa de um celular Android e de uma conta Gmail. Basta escrever o endereço do seu Gmail (exemplo: nome@gmail.com) numa mensagem para o WhatsApp ${CONFIG.WHATSAPP}; não é preciso mandar e-mail. Depois a escola envia o link do convite, você mesmo instala o app no seu celular, deixa instalado por 14 dias seguidos e abre uma vez por dia. Não tem custo, e a escola nunca pede senha.`],
  [/(termo|contrato|privacidade|lgpd|desist|cancel|reembols|devolu|arrepend)/i, () => `Os Termos de Uso e a Política de Privacidade estão no rodapé do site (escolateologicauniao.github.io/termos.html e /privacidade.html). Em resumo: os cursos são livres, sem reconhecimento do MEC; você pode desistir em até 7 dias após o pagamento e receber todo o valor de volta; depois disso, valem as regras de cancelamento dos Termos. Os seus dados são usados só para o funcionamento do curso, não são vendidos, e você pode pedir a exclusão da conta.`],
  [/(celular|computador|notebook|tablet|funciona (no|em|onde)|instalar|baixar o (app|aplicativo))/i, () => `A plataforma funciona no celular, no tablet e no computador, pelo endereço escolateologicauniao.github.io. No celular, abra o endereço no Chrome, toque nos 3 pontinhos e em “Adicionar à tela inicial” (ou “Instalar app”): o ícone da escola aparece na tela, com os avisos do sininho.`],
  [/(golpe|falso|fake|canais oficiais|site oficial)/i, () => `Os canais oficiais da escola são o site escolateologicauniao.github.io, o WhatsApp ${CONFIG.WHATSAPP} e o e-mail ${CONFIG.EMAIL || "etu.escolateologicauniao215@gmail.com"}. A escola nunca pede senha. Antes de qualquer Pix, confira no aplicativo do banco se o recebedor é a Escola Teológica União. Na dúvida, fale com a direção.`],
  [/(disciplina|mat[ée]ria|grade|o que (vou|vamos) (aprender|estudar))/i, () => `Curso Básico: Introdução à Teologia, Bibliologia, Teologia Propriamente Dita, Cristologia, Pneumatologia, Angelologia, Antropologia Bíblica, Hamartiologia, Soteriologia, Eclesiologia e Escatologia.

Curso Médio: Hermenêutica Bíblica, Panorama do Antigo e do Novo Testamento, Geografia Bíblica, História de Israel, História da Igreja, Homilética, Ética Cristã, Evangelismo e Missões e Educação Cristã.

Curso Avançado: Exegese Bíblica, Teologia Contemporânea, Filosofia e Fé Cristã, Teologia do Antigo e do Novo Testamento, Apologética Cristã, Seitas e Heresias, Teologia Pentecostal, Patrística, Teologia Pastoral e Liderança e Administração Eclesiástica.

Na página “Cursos”, toque em “Ver disciplinas” para ler o resumo de cada uma.`],
  [/^(?!.*(matr[ií]cul|pix|pag|comprovante|certificad)).*(curso|n[íi]vel|b[áa]sico|m[ée]dio|avan[çc]ado|disciplin)/i, () => `A escola oferece o Curso Básico, o Curso Médio e o Curso Avançado de Teologia, cursos livres de formação bíblica, teológica e ministerial. A formação começa pelo Básico (os fundamentos da fé e as grandes doutrinas), segue para o Médio (interpretação da Bíblia, história da Igreja e preparo para o ensino) e termina no Avançado (Teologia Sistemática, defesa da fé e pregação). Na página “Cursos”, toque em “Ver disciplinas” para conhecer a grade de cada nível. Há aula grátis, Biblioteca Grátis e o Desafio Bíblico para experimentar. Ao concluir, o aluno recebe certificado com código de verificação e carteirinha de estudante.`],
  [/matr[ií]cul|inscri|valor|pre[çc]o|pagar|pagamento|pix/i, () => window.ETU_LOJA ? `Este aplicativo é o ambiente de estudo dos alunos. Para dúvidas sobre a sua matrícula, fale com a direção da escola pelo botão “Falar com a direção”.` : `Para se matricular, abra a página “Matrícula”, escolha o curso (Básico, Médio ou Avançado) e faça o Pix para a chave (telefone) ${CONFIG.PIX_CHAVE}. Depois envie o comprovante pela plataforma ou pelo WhatsApp ${CONFIG.WHATSAPP}. A direção confere e libera o curso completo.`],
  [/senha|esqueci|n[ãa]o consigo entrar|login|acessar/i, () => `Na tela “Área do Aluno”, toque em “Esqueci a senha”, informe o seu e-mail e siga o link que chegar na sua caixa de entrada (confira também o spam). Para ver o que está digitando, toque em “Mostrar”, ao lado do campo da senha.`],
  [/comprovante/i, () => `Depois de fazer o Pix, entre na sua área, abra o curso e use “Enviar comprovante”. Se preferir, envie pelo WhatsApp ${CONFIG.WHATSAPP}.`],
  [/certificad|carteir/i, () => `O certificado é liberado quando o aluno conclui todas as aulas e provas do curso. A carteirinha é preparada pela Direção. Quando o PDF estiver disponível, você receberá um aviso na plataforma e poderá baixá-lo na sua área.`],
  [/prova|nota|quest/i, () => `Cada aula tem uma prova com alternativas de A a E. A nota mínima é ${CONFIG.NOTA_MINIMA}%. Se não alcançar, revise a aula e faça novamente: a alternativa certa aparece em verde e a errada em vermelho.`],
  [/apostila|pdf|v[íi]deo|aula/i, () => `As aulas, os vídeos e as apostilas ficam dentro de cada curso, na sua área de aluno. Há também uma aula grátis e a Biblioteca Grátis, com estudos e esboços abertos a todos.`],
  [/mec|reconhecid|gradua/i, () => `Os cursos da Escola Teológica União são cursos livres de formação bíblica, teológica e ministerial; não equivalem a graduação ou pós-graduação reconhecidas pelo MEC.`]
];
function faqResposta(t, demo) {
  for (const [re, f] of FAQ) if (re.test(t)) return f();
  return demo ? `Ainda estou aprendendo a responder perguntas abertas: por enquanto atendo às perguntas frequentes (cursos, matrícula, senha, comprovante, provas, apostilas e certificado). Para esta pergunta, toque em “Falar com a direção (atendimento humano)” e a sua mensagem chega direto à direção da escola.` : `Não encontrei essa resposta nas perguntas frequentes. Toque em “Falar com a direção (atendimento humano)” e a sua mensagem chega direto à direção da escola.`;
}
const AI = { hist: [], cfg: null, busy: false };
function aiAdd(t, quem) {
  const d = document.createElement("div");
  d.className = "ai-m " + quem;
  d.textContent = t;
  $("#aiMsgs").appendChild(d);
  $("#aiMsgs").scrollTop = 1e9;
  if (quem === "eu") aiParaInatividade();
  else if (t !== "Escrevendo…") aiAgendaInatividade();
  return d;
}
let aiInatTimer = null;
const AI_INAT_MIN = 3;
function aiParaInatividade() {
  clearTimeout(aiInatTimer);
  aiInatTimer = null;
}
function aiAgendaInatividade() {
  aiParaInatividade();
  aiInatTimer = setTimeout(aiAvisoInatividade, AI_INAT_MIN * 60 * 1e3);
}
function aiAvisoInatividade() {
  const box = $("#aiBox");
  if (!box || box.classList.contains("hidden") || $("#aiMsgs .ai-inat")) return;
  const d = document.createElement("div");
  d.className = "ai-m bot ai-inat";
  d.innerHTML = '<p style="margin:0 0 6px">Percebemos que você ficou alguns minutos sem responder. Talvez esteja ocupado(a), e está tudo bem!</p><p style="margin:0 0 10px">Seguimos aqui, à sua disposição, para quando desejar continuar. Deseja prosseguir com o atendimento?</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button type="button" class="btn btn-gold btn-sm" data-inat="cont">Continuar a conversa</button><button type="button" class="btn btn-line btn-sm" data-inat="fim">Encerrar o atendimento</button></div>';
  $("#aiMsgs").appendChild(d);
  $("#aiMsgs").scrollTop = 1e9;
  d.querySelector('[data-inat="cont"]').onclick = () => {
    d.querySelector("div").remove();
    d.classList.remove("ai-inat");
    aiAdd("Que bom ter você conosco! Pode escrever a sua pergunta ou escolher uma das opções.", "bot");
    const s = $("#aiSug");
    if (s && !s.children.length) {
      s.innerHTML = ["Conhecer os cursos", "Como faço a matrícula?", "Falar com a direção"].map((x) => `<button type="button">${x}</button>`).join("");
      $$("#aiSug button").forEach((b) => b.onclick = () => {
        $("#aiTxt").value = b.textContent;
        aiEnviar();
      });
    }
  };
  d.querySelector('[data-inat="fim"]').onclick = () => {
    d.querySelector("div").remove();
    d.classList.remove("ai-inat");
    aiParaInatividade();
    aiAdd("Agradecemos o seu contato! Foi uma alegria servi-lo(a). “O SENHOR te abençoe e te guarde” (Números 6.24). Sempre que desejar, estaremos aqui: é só tocar em AJUDA. A paz do Senhor! 🙏", "bot");
    aiParaInatividade();
  };
}
function aiAjusta() {
  if (innerWidth > 700 || !window.visualViewport) {
    $("#aiBox").style.height = "";
    $("#aiBox").style.top = "";
    return;
  }
  const v = visualViewport;
  $("#aiBox").style.height = v.height + "px";
  $("#aiBox").style.top = v.offsetTop + "px";
  $("#aiMsgs").scrollTop = 1e9;
}
if (window.visualViewport) {
  visualViewport.addEventListener("resize", aiAjusta);
  visualViewport.addEventListener("scroll", aiAjusta);
}
async function aiAbrir() {
  var _a, _b;
  $("#aiBox").classList.remove("hidden");
  document.body.classList.add("ai-aberto");
  aiAjusta();
  $("#aiOpen").setAttribute("aria-expanded", "true");
  if (!AI.cfg) {
    try {
      AI.cfg = await API.aiPublico();
    } catch (e) {
      AI.cfg = null;
    }
    if ((_a = AI.cfg) == null ? void 0 : _a.nome) $("#aiNome").textContent = AI.cfg.nome;
  }
  etuAvatar(((_b = AI.cfg) == null ? void 0 : _b.foto) || "");
  if (!$("#aiMsgs").children.length) {
    aiAdd(`A paz do Senhor! Seja bem-vindo(a) à Escola Teológica União, dirigida pelo Pr. Charlei de Jesus Lima Dias.

Você sabe o que é teologia e como ela fortalece a vida e o ministério? Aqui você estuda Bibliologia, Teologia Propriamente Dita, Cristologia, Pneumatologia, Hamartiologia, Soteriologia e muito mais, sempre com a Bíblia como única regra de fé e prática.

Escolha uma opção abaixo ou escreva a sua pergunta:`, "bot");
    $("#aiSug").innerHTML = ["Conhecer os cursos", "Como faço a matrícula?", "Já fiz o curso básico em outra escola", "Funciona no celular e no computador?", "Aplicativo na Google Play", "Termos e privacidade", "Certificado e carteirinha", "Esqueci a minha senha"].map((x) => `<button type="button">${x}</button>`).join("");
    $$("#aiSug button").forEach((b) => b.onclick = () => {
      $("#aiTxt").value = b.textContent;
      aiEnviar();
    });
  }
  if (innerWidth > 700) $("#aiTxt").focus();
}
async function aiEnviar() {
  const t = $("#aiTxt").value.trim();
  if (!t || AI.busy) return;
  $("#aiTxt").value = "";
  $("#aiSug").innerHTML = "";
  aiAdd(t, "eu");
  AI.hist.push({ role: "user", content: t });
  const w = aiAdd("Escrevendo…", "bot");
  AI.busy = true;
  try {
    let r;
    const usaIA = !API.demo && AI.cfg && AI.cfg.ativo && !!S.user;
    if (usaIA) {
      const d = await API.perguntar(AI.hist.slice(-12));
      r = d.resposta;
      if (d.encaminhado) setTimeout(() => aiAdd("Seu pedido foi registrado no painel da direção. A resposta chegará pelo contato do seu cadastro.", "bot"), 300);
    } else if (!API.demo && AI.cfg && AI.cfg.ativo && !S.user) r = faqResposta(t, false) + "\n\nPara dúvidas de estudo bíblico, entre na Área do Aluno: o assistente completo atende os alunos matriculados.";
    else r = API.demo ? (await API.perguntar(AI.hist)).resposta : faqResposta(t, false);
    w.textContent = r;
    AI.hist.push({ role: "assistant", content: r });
  } catch (e) {
    w.textContent = e.message;
  }
  AI.busy = false;
  $("#aiMsgs").scrollTop = 1e9;
}
$("#aiOpen").onclick = () => $("#aiBox").classList.contains("hidden") ? aiAbrir() : ($("#aiBox").classList.add("hidden"), document.body.classList.remove("ai-aberto"), $("#aiOpen").setAttribute("aria-expanded", "false"));
$("#aiClose").onclick = () => {
  aiParaInatividade();
  $("#aiBox").classList.add("hidden");
  document.body.classList.remove("ai-aberto");
  $("#aiOpen").setAttribute("aria-expanded", "false");
  $("#aiOpen").focus();
};
$("#aiEnviar").onclick = aiEnviar;
$("#aiLimpar").onclick = () => confirmBox("Apagar toda esta conversa da tela? Ela não poderá ser recuperada neste aparelho.", () => {
  AI.hist = [];
  $("#aiMsgs").innerHTML = "";
  $("#aiSug").innerHTML = "";
  aiAbrir();
});
$("#aiHumano").onclick = () => {
  var _a, _b, _c, _d;
  if ($("#aiMsgs .ai-form")) return;
  const d = document.createElement("div");
  d.className = "ai-m bot ai-form";
  d.style.whiteSpace = "normal";
  d.innerHTML = `<b>Atendimento humano</b><br>Vou encaminhar a sua mensagem à direção da escola. Preencha abaixo:
    <label for="hNome">Seu nome</label><input id="hNome" value="${esc(((_a = S.profile) == null ? void 0 : _a.nome) || "")}">
    <label for="hCont">WhatsApp ou e-mail para resposta</label><input id="hCont" value="${esc(((_b = S.profile) == null ? void 0 : _b.telefone) || ((_c = S.user) == null ? void 0 : _c.email) || "")}">
    <label for="hMsg">Sua mensagem</label><textarea id="hMsg" rows="3">${esc(((_d = [...AI.hist].reverse().find((m) => m.role === "user")) == null ? void 0 : _d.content) || "")}</textarea>
    <div style="display:flex;gap:6px;margin-top:8px"><button class="btn btn-gold btn-sm" id="hEnv" type="button">Encaminhar à direção</button></div>`;
  $("#aiMsgs").appendChild(d);
  $("#aiMsgs").scrollTop = 1e9;
  d.querySelector("#hNome").focus();
  d.querySelector("#hEnv").onclick = async () => {
    const a = { nome: d.querySelector("#hNome").value.trim(), contato: d.querySelector("#hCont").value.trim(), mensagem: d.querySelector("#hMsg").value.trim(), conversa: AI.hist.slice(-20) };
    if (!a.nome || !a.contato || !a.mensagem) {
      aiAdd("Preencha o nome, o contato e a mensagem, por favor.", "bot");
      return;
    }
    try {
      await API.abrirAtendimento(a);
      d.remove();
      aiAdd("Encaminhar à direção: " + a.mensagem, "eu");
      const w = aiAdd("", "bot");
      w.style.whiteSpace = "normal";
      w.innerHTML = `Pronto, ${esc(a.nome.split(" ")[0])}! Sua mensagem foi encaminhada à direção da Escola Teológica União, que responderá pelo contato informado (${esc(a.contato)}). Se for urgente, você também pode chamar agora no WhatsApp:<br><a class="btn btn-line btn-sm" style="margin-top:8px" target="_blank" rel="noopener" href="https://wa.me/${CONFIG.WHATSAPP_LINK}?text=${encodeURIComponent("A paz do Senhor! Sou " + a.nome + ". " + a.mensagem)}">Abrir o WhatsApp da escola</a>`;
    } catch (e) {
      aiAdd(e.message, "bot");
    }
  };
};
async function drawAtend() {
  let L = [];
  try {
    L = await API.atendimentos();
  } catch (e) {
  }
  const ab = L.filter((x) => x.status !== "resolvido").length;
  $("#tabAtend").textContent = ab ? `Atendimentos (${ab})` : "Atendimentos";
  $("#atPanel").innerHTML = `<h3>Atendimentos encaminhados à direção</h3>
    <p style="margin:0 0 10px;color:var(--muted);font-size:16px">Quando o aluno toca em “Falar com a direção”, ou quando o assistente percebe que o assunto precisa da direção, o pedido aparece aqui com a conversa. Responda pelo WhatsApp e marque como resolvido. Se a sua resposta servir para outros alunos, use “Ensinar ao assistente”: ela entra na base de conhecimento dele.</p>
    ${L.length ? L.map((x) => `<div class="panel" style="margin:12px 0;padding:16px;${x.status === "resolvido" ? "opacity:.7" : ""}">
      <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><b>${esc(x.nome || "Sem nome")}</b><span class="pill ${x.status === "resolvido" ? "ok" : "lock"}">${x.status === "resolvido" ? "RESOLVIDO" : "AGUARDANDO A DIREÇÃO"}</span></div>
      <div style="font-size:14px;color:var(--muted)">${esc(x.contato || "")} • ${fmtDate((x.criado_em || "").slice(0, 10))}</div>
      <div style="margin-top:6px">${x.user_id ? '<span class="pill ok">CONTA VERIFICADA (ALUNO CONECTADO)</span>' : '<span class="pill off">NÃO VERIFICADO — VISITANTE SEM LOGIN</span>'}</div>
      ${x.user_id ? "" : '<p style="font-size:14px;color:var(--crimson);margin:6px 0 0">Atenção: este pedido veio de alguém sem login. Antes de passar qualquer informação pessoal, de matrícula ou de pagamento, confirme a identidade pelo telefone ou e-mail do cadastro do aluno, e nunca envie senhas ou documentos.</p>'}
      <p style="margin:8px 0">${esc(x.mensagem || "")}</p>
      ${(x.conversa || []).length ? `<details><summary style="cursor:pointer;color:var(--navy)">Ver a conversa com o assistente</summary>${(x.conversa || []).map((m) => `<p style="margin:6px 0;font-size:14.5px"><b>${m.role === "user" ? "Aluno" : "Assistente"}:</b> ${esc(m.content)}</p>`).join("")}</details>` : ""}
      <label for="r${x.id}">Resposta da direção (fica registrada)</label><textarea id="r${x.id}" rows="3">${esc(x.resposta || "")}</textarea>
      <div class="res">${/\d{8,}/.test((x.contato || "").replace(/\D/g, "")) ? `<a class="btn btn-navy btn-sm" target="_blank" rel="noopener" data-wa="${x.id}" href="#">Responder pelo WhatsApp</a>` : ""}${/@/.test(x.contato || "") ? `<a class="btn btn-navy btn-sm" data-mail="${x.id}" href="#">Responder por e-mail</a>` : ""}
        <button class="btn btn-gold btn-sm" data-res="${x.id}" type="button">${x.status === "resolvido" ? "Salvar resposta" : "Marcar como resolvido"}</button>
        <button class="btn btn-line btn-sm" data-ens="${x.id}" type="button">Ensinar ao assistente</button>
        <button class="btn btn-red btn-sm" data-delat="${x.id}" type="button">Apagar</button></div></div>`).join("") : "<p>Nenhum atendimento encaminhado até agora.</p>"}
    <div class="msg hidden" id="mAt"></div>`;
  const resp = (id) => {
    var _a;
    return (((_a = $("#r" + id)) == null ? void 0 : _a.value) || "").trim();
  };
  $$("#atPanel [data-wa]").forEach((a) => {
    const x = L.find((y) => String(y.id) === a.dataset.wa);
    a.onclick = (e) => {
      let n = (x.contato || "").replace(/\D/g, "");
      if (n.length <= 11) n = "55" + n;
      a.href = `https://wa.me/${n}?text=${encodeURIComponent("A paz do Senhor, " + (x.nome || "") + "! Aqui é da Escola Teológica União. " + resp(x.id))}`;
    };
  });
  $$("#atPanel [data-mail]").forEach((a) => {
    const x = L.find((y) => String(y.id) === a.dataset.mail);
    a.onclick = () => {
      a.href = `mailto:${x.contato}?subject=${encodeURIComponent("Escola Teológica União — resposta ao seu atendimento")}&body=${encodeURIComponent(resp(x.id))}`;
    };
  });
  $$("#atPanel [data-res]").forEach((b) => b.onclick = async () => {
    await API.salvarAtendimento(isNaN(+b.dataset.res) ? b.dataset.res : +b.dataset.res, { status: "resolvido", resposta: resp(b.dataset.res) });
    drawAtend();
  });
  $$("#atPanel [data-delat]").forEach((b) => b.onclick = () => confirmBox("Apagar este atendimento e a conversa registrada?", async () => {
    try {
      await API.apagarAtendimento(isNaN(+b.dataset.delat) ? b.dataset.delat : +b.dataset.delat);
      drawAtend();
    } catch (e) {
      show($("#mAt"), e.message, "err");
    }
  }));
  $$("#atPanel [data-ens]").forEach((b) => b.onclick = async () => {
    const x = L.find((y) => String(y.id) === b.dataset.ens);
    const r = resp(x.id);
    if (!r) return show($("#mAt"), "Escreva a resposta antes de ensinar ao assistente.", "err");
    try {
      const c = __spreadValues(__spreadValues({}, demoAi()), await API.aiConfig() || {});
      const novo = (c.conhecimento ? c.conhecimento + "\n\n" : "") + `Pergunta: ${x.mensagem}
Resposta da direção: ${r}`;
      await API.saveAiConfig(__spreadProps(__spreadValues({}, c), { conhecimento: novo }));
      show($("#mAt"), "Resposta acrescentada à base de conhecimento do assistente.", "ok");
    } catch (e) {
      show($("#mAt"), e.message, "err");
    }
  });
}
$("#aiTxt").addEventListener("focus", () => {
  if (innerWidth <= 700) $("#aiSug").innerHTML = "";
  setTimeout(aiAjusta, 300);
});
$("#aiTxt").addEventListener("input", () => {
  if (aiInatTimer) aiAgendaInatividade();
  const t = $("#aiTxt");
  t.style.height = "auto";
  t.style.height = Math.min(t.scrollHeight, 110) + "px";
});
$("#aiTxt").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    aiEnviar();
  }
});
async function drawAiAdm() {
  let c;
  try {
    c = await API.aiConfig();
  } catch (e) {
    c = null;
  }
  c = __spreadValues(__spreadValues({}, demoAi()), c || {});
  if (!c.instrucoes) c.instrucoes = AI_PERFIL_PADRAO;
  if (!c.limites) c.limites = AI_LIMITES_PADRAO;
  ETU_MANUAIS = Array.isArray(c.manuais) ? structuredClone(c.manuais) : [];
  ETU_FOTO = c.foto || "";
  ETU_MANUAL_EDIT = null;
  $("#aiPanel").innerHTML = `<h3>Assistente ETU — atendimento automático</h3>
    <p style="margin:0 0 10px;color:var(--muted);font-size:16px">O assistente aparece no botão <b>AJUDA</b>, no canto da tela. Ele orienta os alunos no uso da plataforma e tira dúvidas de estudo bíblico seguindo o perfil e os limites que a direção definir aqui. Pagamentos, liberação de cursos e certificados continuam sempre com a direção.</p>
    ${API.demo ? '<p class="msg" style="display:block">Modo demonstração: o assistente responde só às perguntas frequentes. A inteligência completa funciona quando a plataforma estiver ligada ao banco de dados e à chave do assistente, como explicado no guia de ativação.</p>' : ""}
    <div class="check"><input type="checkbox" id="aiAtivo" ${c.ativo ? "checked" : ""}><label for="aiAtivo" style="margin:0;font-family:inherit;font-size:16px;letter-spacing:0;color:var(--ink);font-weight:400">Assistente ligado</label></div>
    <div class="grid3"><div><label for="aiNomeIn">Nome do assistente</label><input id="aiNomeIn" value="${esc(c.nome)}"></div>
    <div><label for="aiPub">Quem pode usar a inteligência completa</label><select id="aiPub"><option value="alunos" ${c.publico === "alunos" ? "selected" : ""}>Somente alunos com conta</option><option value="todos" ${c.publico === "todos" ? "selected" : ""}>Alunos; visitantes usam perguntas frequentes</option></select></div>
    <div><label for="aiLim">Mensagens por pessoa por dia</label><input id="aiLim" type="number" min="1" max="200" value="${+c.limite_diario || 30}"></div></div>
    <label for="aiMod">Modelo</label><select id="aiMod"><option value="claude-sonnet-5-5" ${c.modelo !== "claude-haiku-5-5" ? "selected" : ""}>Mais completo (recomendado para teologia)</option><option value="claude-haiku-5-5" ${c.modelo === "claude-haiku-5-5" ? "selected" : ""}>Mais rápido e econômico</option></select>
    <label for="aiIns">Perfil do assistente (quem ele é e como deve atender)</label><textarea id="aiIns" rows="12">${esc(c.instrucoes)}</textarea>
    <label for="aiLmt">Limites impostos pela direção (o que ele nunca deve fazer)</label><textarea id="aiLmt" rows="8">${esc(c.limites)}</textarea>
    <label for="aiCon">Base comum para os alunos (somente informações que podem ser compartilhadas; use os manuais abaixo para conteúdo reservado)</label><textarea id="aiCon" rows="10" placeholder="Ex.: Pergunta: Posso fazer o Curso Médio sem o Básico?&#10;Resposta da direção: ...">${esc(c.conhecimento || "")}</textarea>
    <div class="msg hidden" id="mAi"></div>
    <div class="res"><button class="btn btn-gold" id="aiSalvar" type="button">Salvar o assistente</button><button class="btn btn-line" id="aiPadrao" type="button">Restaurar o texto padrão</button><button class="btn btn-line" id="aiTestar" type="button">Testar agora</button></div>
    <div id="etuPerfilManual"></div><h3 style="margin-top:26px">Últimas perguntas recebidas</h3><div id="aiLogBox" style="font-size:15px;color:var(--muted)">Carregando…</div>
    <div class="res"><button class="btn btn-red btn-sm" id="aiApagarLog" type="button">Apagar todo o histórico de perguntas</button></div>
    <h3 style="margin-top:26px">Regras de segurança permanentes</h3>
    <p style="margin:0;font-size:15px">Estas regras ficam travadas no sistema e não podem ser mudadas por nenhuma mensagem: o assistente nunca pede nem informa senhas; nunca informa documentos, notas, pagamentos, telefones, e-mails ou qualquer dado de outra pessoa; só conhece o nome de quem está conectado; nunca confirma se alguém é ou não aluno; e encaminha à direção tudo o que exigir confirmação de identidade.</p>`;
  etuDrawManual();
  $("#aiApagarLog").onclick = () => confirmBox("Apagar todo o histórico de perguntas do assistente?", async () => {
    try {
      await API.apagarAiLog();
      drawAiAdm();
    } catch (e) {
      show($("#mAi"), e.message, "err");
    }
  });
  $("#aiPadrao").onclick = () => {
    $("#aiIns").value = AI_PERFIL_PADRAO;
    $("#aiLmt").value = AI_LIMITES_PADRAO;
  };
  $("#aiTestar").onclick = () => aiAbrir();
  $("#aiSalvar").onclick = async () => {
    var _a, _b;
    if (((_a = $("#etuManualTexto")) == null ? void 0 : _a.value.trim()) || ((_b = $("#etuManualTitulo")) == null ? void 0 : _b.value.trim())) return show($("#mAi"), "Conclua a edição: toque em Adicionar à lista ou Atualizar manual antes de salvar.", "err");
    try {
      await API.saveAiConfig({ foto: ETU_FOTO, manuais: ETU_MANUAIS, ativo: $("#aiAtivo").checked, nome: $("#aiNomeIn").value.trim() || "Assistente ETU", publico: $("#aiPub").value, limite_diario: +$("#aiLim").value || 30, modelo: $("#aiMod").value, instrucoes: $("#aiIns").value.trim(), limites: $("#aiLmt").value.trim(), conhecimento: $("#aiCon").value.trim() });
      AI.cfg = null;
      show($("#mAi"), "Assistente salvo. As próximas conversas já seguem estas instruções.", "ok");
    } catch (e) {
      show($("#mAi"), e.message, "err");
    }
  };
  try {
    const L = await API.aiLog();
    $("#aiLogBox").innerHTML = L.length ? `<div class="tbl-wrap"><table><thead><tr><th>Quando</th><th>Quem</th><th>Pergunta</th></tr></thead><tbody>${L.map((l) => `<tr><td>${fmtDate((l.criado_em || "").slice(0, 10))}</td><td>${esc(l.nome || "Visitante")}</td><td>${esc((l.pergunta || "").slice(0, 220))}</td></tr>`).join("")}</tbody></table></div>` : "Nenhuma pergunta registrada ainda.";
  } catch (e) {
    $("#aiLogBox").textContent = "Histórico indisponível.";
  }
}
document.querySelectorAll("img[data-brasao]").forEach((i) => i.src = BRASAO);
$$(".obras-nav").forEach((b) => b.onclick = () => $("#obras").scrollBy({ left: (b.classList.contains("prox") ? 1 : -1) * 270, behavior: "smooth" }));
if (EMBED_OK) {
  const st2 = document.createElement("style");
  st2.textContent = ".so-direcao{display:none!important}";
  document.head.appendChild(st2);
}
if (API.demo && !VITRINE) $("#demoBar").classList.remove("hidden");
if (VITRINE) {
  document.body.classList.add("vitrine");
  const st = document.createElement("style");
  st.textContent = ".vitrine .when-in,.vitrine .when-admin,.vitrine #fComp{display:none!important}.vitrine .vit-only{display:block!important}.vitrine .no-vit{display:none!important}";
  document.head.appendChild(st);
}
let ETU_MANUAIS = [], ETU_FOTO = "", ETU_MANUAL_EDIT = null;
function etuAvatar(foto) {
  const nome = document.querySelector("#aiNome");
  if (!nome) return;
  let img = document.querySelector("#etuAgentAvatar");
  if (!img) {
    img = document.createElement("img");
    img.id = "etuAgentAvatar";
    img.className = "etu-agent-avatar";
    img.alt = "Assistente da ETU";
    nome.before(img);
  }
  const permitido = /^data:image\/(png|jpeg|webp);base64,[a-zA-Z0-9+/=]+$/.test(foto);
  img.hidden = !permitido;
  if (permitido) img.src = foto;
  else img.removeAttribute("src");
}
function etuDownload(nome, conteudo, tipo = "application/json") {
  const url = URL.createObjectURL(new Blob([conteudo], { type: tipo }));
  const a = document.createElement("a");
  a.href = url;
  a.download = nome;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 3e3);
}
function etuManualId() {
  const b = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
}
function etuDrawManual() {
  const box = document.querySelector("#etuPerfilManual");
  if (!box) return;
  box.innerHTML = `<h3 style="margin-top:26px">Foto e manuais do assistente</h3>
    <p>Defina a identidade do assistente e os materiais que ele poderá consultar. Um manual só entra nas respostas depois de ser aprovado pela direção e salvo.</p>
    <div class="res"><img id="etuFotoPreview" class="etu-avatar-preview" alt="Foto do assistente"><div><label for="etuFotoInput">Foto (PNG, JPG ou WebP, até 2 MB)</label><input id="etuFotoInput" type="file" accept="image/png,image/jpeg,image/webp"><button type="button" class="btn btn-line btn-sm" id="etuFotoRemover">Retirar foto</button></div></div>
    <label for="etuManualFile">Importar manual em TXT ou PDF com texto (até 5 MB)</label><input type="file" id="etuManualFile" accept=".txt,.md,.pdf,text/plain,application/pdf">
    <p style="font-size:15px">O texto importado aparece abaixo para revisão. PDFs digitalizados como imagem precisam ser convertidos em texto primeiro.</p>
    <label for="etuManualTitulo">Título do manual</label><input id="etuManualTitulo" maxlength="160" placeholder="Ex.: Orientações doutrinárias da ETU">
    <label for="etuManualEscopo">Quem poderá usar este conhecimento</label><select id="etuManualEscopo"><option value="direcao">Somente a direção</option><option value="alunos">Assistente dos alunos e direção</option></select>
    <label for="etuManualTexto">Texto revisado do manual</label><textarea id="etuManualTexto" rows="9" maxlength="100000" placeholder="Cole ou importe o conteúdo e confira antes de aprovar."></textarea>
    <div class="check"><input type="checkbox" id="etuManualAprovado"><label for="etuManualAprovado" style="margin:0">Aprovo este conteúdo para consulta pelo assistente</label></div>
    <div class="res"><button type="button" class="btn btn-gold" id="etuManualAdd">Adicionar à lista</button><button type="button" class="btn btn-line" id="etuManualExport">Baixar cópia dos manuais</button></div>
    <div id="etuManualMsg" role="status"></div><div id="etuManualLista"></div>
    <p><b>Depois das alterações, toque em “Salvar o assistente”, acima.</b> O uso nas respostas inteligentes depende da ativação do serviço da escola.</p>`;
  const msg = (t, erro = false) => {
    const e = document.querySelector("#etuManualMsg");
    e.textContent = t;
    e.className = "msg " + (erro ? "err" : "ok");
  };
  const foto = document.querySelector("#etuFotoPreview");
  if (/^data:image\/(png|jpeg|webp);base64,/.test(ETU_FOTO)) foto.src = ETU_FOTO;
  else foto.hidden = true;
  document.querySelector("#etuFotoRemover").onclick = () => {
    ETU_FOTO = "";
    foto.hidden = true;
    foto.removeAttribute("src");
    msg("Foto retirada da edição. Salve o assistente para confirmar.");
  };
  document.querySelector("#etuFotoInput").onchange = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(f.type) || f.size > 2 * 1024 * 1024) return msg("Selecione PNG, JPG ou WebP de até 2 MB.", true);
    try {
      const bitmap = await createImageBitmap(f);
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 192;
      const ctx = canvas.getContext("2d");
      const side = Math.min(bitmap.width, bitmap.height);
      ctx.drawImage(bitmap, (bitmap.width - side) / 2, (bitmap.height - side) / 2, side, side, 0, 0, 192, 192);
      bitmap.close();
      ETU_FOTO = canvas.toDataURL("image/jpeg", 0.85);
      foto.src = ETU_FOTO;
      foto.hidden = false;
      msg("Foto preparada. Salve o assistente para confirmar.");
    } catch (err) {
      msg("Não foi possível abrir esta imagem.", true);
    }
  };
  document.querySelector("#etuManualFile").onchange = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (document.querySelector("#etuManualTexto").value.trim()) return msg("Conclua a edição atual antes de importar outro manual.", true);
    if (f.size > 5 * 1024 * 1024) return msg("O limite de importação é 5 MB.", true);
    try {
      msg("Lendo o arquivo…");
      let texto = "";
      if (/\.pdf$/i.test(f.name)) {
        const pdfjs = await import("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs");
        pdfjs.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs";
        const doc = await pdfjs.getDocument({ data: new Uint8Array(await f.arrayBuffer()), isEvalSupported: false }).promise;
        try {
          for (let p = 1; p <= doc.numPages; p++) {
            const page = await doc.getPage(p);
            const content = await page.getTextContent();
            texto += "\n\n[Página " + p + "]\n" + content.items.map((x) => x.str + (x.hasEOL ? "\n" : " ")).join("");
            if (texto.length > 1e5) throw new Error("Manual muito extenso. Divida-o em partes de até 100 mil caracteres.");
          }
        } finally {
          await doc.destroy();
        }
        if (texto.replace(/\[Página \d+\]/g, "").trim().length < 20) throw new Error("Este PDF não possui texto legível para importação. Cole uma versão em texto.");
      } else if (/\.(txt|md)$/i.test(f.name)) {
        texto = await f.text();
      } else throw new Error("Escolha um arquivo TXT, MD ou PDF.");
      if (texto.length > 1e5) throw new Error("Divida o manual em partes de até 100 mil caracteres.");
      document.querySelector("#etuManualTitulo").value = f.name.replace(/\.[^.]+$/, "");
      document.querySelector("#etuManualTexto").value = texto.trim();
      document.querySelector("#etuManualAprovado").checked = false;
      msg("Arquivo importado. Revise o texto e escolha quem poderá consultá-lo.");
    } catch (err) {
      msg(err.message || "Não foi possível importar. Cole o texto no campo abaixo.", true);
    }
  };
  document.querySelector("#etuManualAdd").onclick = () => {
    const titulo = document.querySelector("#etuManualTitulo").value.trim(), texto = document.querySelector("#etuManualTexto").value.trim();
    if (!titulo || !texto) return msg("Preencha o título e o texto.", true);
    if (ETU_MANUAL_EDIT === null && ETU_MANUAIS.length >= 40) return msg("Limite de 40 manuais por configuração. Divida o acervo em outra etapa.", true);
    if (ETU_MANUAIS.filter((m) => m.id !== ETU_MANUAL_EDIT).reduce((n, m) => n + (m.texto || "").length, 0) + texto.length > 5e5) return msg("O limite desta base é 500 mil caracteres. Exporte e revise os materiais.", true);
    const novo = { id: ETU_MANUAL_EDIT || etuManualId(), titulo, texto, escopo: document.querySelector("#etuManualEscopo").value, aprovado: document.querySelector("#etuManualAprovado").checked, atualizado_em: (/* @__PURE__ */ new Date()).toISOString() };
    const i = ETU_MANUAIS.findIndex((m) => m.id === ETU_MANUAL_EDIT);
    if (i < 0) ETU_MANUAIS.push(novo);
    else ETU_MANUAIS[i] = novo;
    ETU_MANUAL_EDIT = null;
    document.querySelector("#etuManualAdd").textContent = "Adicionar à lista";
    document.querySelector("#etuManualTitulo").value = "";
    document.querySelector("#etuManualTexto").value = "";
    document.querySelector("#etuManualAprovado").checked = false;
    etuManualList();
    msg("Manual acrescentado à lista. Salve o assistente para confirmar.");
  };
  document.querySelector("#etuManualExport").onclick = () => etuDownload("ETU_Manuais_Assistente.json", JSON.stringify({ versao: 1, exportado_em: (/* @__PURE__ */ new Date()).toISOString(), manuais: ETU_MANUAIS }, null, 2));
  etuManualList();
}
function etuManualList() {
  const el = document.querySelector("#etuManualLista");
  if (!el) return;
  el.innerHTML = ETU_MANUAIS.length ? ETU_MANUAIS.map((m, i) => `<article class="etu-manual-card"><b>${esc(m.titulo)}</b><p>${m.escopo === "alunos" ? "Alunos e direção" : "Somente direção"} · ${m.aprovado ? "Aprovado" : "Rascunho"} · ${(m.texto || "").length} caracteres</p><details><summary>Conferir conteúdo</summary><p>${esc(m.texto || "")}</p></details><div class="res"><button class="btn btn-line btn-sm" type="button" data-manual-toggle="${i}">${m.aprovado ? "Suspender uso" : "Aprovar uso"}</button><button class="btn btn-line btn-sm" type="button" data-manual-edit="${i}">Editar</button><button class="btn btn-red btn-sm" type="button" data-manual-remove="${i}">Remover</button></div></article>`).join("") : "<p>Nenhum manual acrescentado. Os campos de perfil, limites e base de conhecimento anteriores continuam disponíveis.</p>";
  el.querySelectorAll("[data-manual-toggle]").forEach((b) => b.onclick = () => {
    ETU_MANUAIS[+b.dataset.manualToggle].aprovado = !ETU_MANUAIS[+b.dataset.manualToggle].aprovado;
    etuManualList();
  });
  el.querySelectorAll("[data-manual-remove]").forEach((b) => b.onclick = () => confirmBox("Remover este manual da lista em edição?", () => {
    ETU_MANUAIS.splice(+b.dataset.manualRemove, 1);
    etuManualList();
  }));
  el.querySelectorAll("[data-manual-edit]").forEach((b) => b.onclick = () => {
    const m = ETU_MANUAIS[+b.dataset.manualEdit];
    if (document.querySelector("#etuManualTexto").value.trim()) {
      alert("Adicione ou limpe o texto em edição antes de abrir outro manual.");
      return;
    }
    document.querySelector("#etuManualTitulo").value = m.titulo;
    document.querySelector("#etuManualTexto").value = m.texto;
    document.querySelector("#etuManualEscopo").value = m.escopo;
    document.querySelector("#etuManualAprovado").checked = false;
    ETU_MANUAL_EDIT = m.id;
    document.querySelector("#etuManualAdd").textContent = "Atualizar manual";
    document.querySelector("#etuManualTitulo").focus();
  });
}
async function validarCarteirinhaPDF(file) {
  if (!file || file.size < 5 || file.size > 10 * 1024 * 1024) throw new Error("Escolha um PDF de até 10 MB.");
  if (!/\.pdf$/i.test(file.name) || file.type && file.type !== "application/pdf") throw new Error("A carteirinha precisa estar em PDF.");
  const cabecalho = new TextDecoder().decode(await file.slice(0, 5).arrayBuffer());
  if (cabecalho !== "%PDF-") throw new Error("O arquivo selecionado não possui um cabeçalho PDF válido.");
}
async function atualizarDocumentosPessoais() {
  var _a, _b;
  const uid = (_a = S.user) == null ? void 0 : _a.id;
  S.carteirinhas = [];
  S.notificacoes = [];
  if (!uid || API.demo) return;
  try {
    const [cards, notifs] = await Promise.all([API.carteirinhas(), API.avisosPessoais()]);
    if (((_b = S.user) == null ? void 0 : _b.id) === uid) {
      S.carteirinhas = cards;
      S.notificacoes = notifs;
    }
  } catch (e) {
  }
}
async function dlgCarteirinha(a) {
  var _a;
  if (!a || !((_a = S.profile) == null ? void 0 : _a.is_admin)) return;
  const mats = a.matriculas || [];
  modal(`<h3>Enviar carteirinha em PDF</h3><p><b>Aluno: ${esc(a.nome)}</b><br>${esc(a.email)}</p>
    ${mats.length ? `<label for="cardCurso">Matrícula vinculada</label><select id="cardCurso">${mats.map((m) => {
    var _a2;
    return `<option value="${esc(m.curso_id)}">${esc(((_a2 = curso(m.curso_id)) == null ? void 0 : _a2.titulo) || m.curso_id)}</option>`;
  }).join("")}</select>
    <label for="cardPDF">Carteirinha pronta (PDF, até 10 MB)</label><input id="cardPDF" type="file" accept="application/pdf,.pdf">
    <p>Confira o nome e os dados no PDF. Ao enviar, o arquivo será disponibilizado somente para este aluno e a Direção. Um novo envio substitui a versão disponível.</p>
    <div id="cardMsg" class="msg hidden" role="status"></div><div class="acts"><button class="btn btn-gold" id="cardEnviar">Enviar e avisar o aluno</button><button class="btn btn-line" data-close>Fechar</button></div>` : '<p>Cadastre a matrícula do aluno antes de enviar a carteirinha.</p><button class="btn btn-line" data-close>Fechar</button>'}`, (r) => {
    const b = r.querySelector("#cardEnviar");
    if (!b) return;
    b.onclick = async () => {
      b.disabled = true;
      const msg = r.querySelector("#cardMsg");
      try {
        if (API.demo) throw new Error("O envio real estará disponível após ligar o banco de dados da escola.");
        await API.publicarCarteirinha(a.id, r.querySelector("#cardCurso").value, r.querySelector("#cardPDF").files[0]);
        r.querySelector("#cardPDF").value = "";
        show(msg, "Carteirinha enviada. O aviso está disponível na conta do aluno.", "ok");
      } catch (e) {
        show(msg, e.message, "err");
      } finally {
        b.disabled = false;
      }
    };
  });
}
document.addEventListener("click", async (e) => {
  var _a;
  const b = e.target.closest("[data-card-download]");
  if (!b) return;
  b.disabled = true;
  try {
    if (API.demo || !S.user) throw new Error("Entre na sua conta na plataforma ativada para baixar.");
    const uid = S.user.id, link = await API.baixarCarteirinha(b.dataset.cardDownload);
    if (((_a = S.user) == null ? void 0 : _a.id) !== uid) return;
    const a = document.createElement("a");
    a.href = link;
    a.download = "carteirinha-ETU.pdf";
    a.rel = "noopener";
    document.body.append(a);
    a.click();
    a.remove();
  } catch (err) {
    modal(`<h3>Não foi possível baixar</h3><p>${esc(err.message)}</p><button class="btn btn-line" data-close>Fechar</button>`);
  } finally {
    b.disabled = false;
  }
});
let cardPollEmCurso = false;
setInterval(async () => {
  if (cardPollEmCurso || document.hidden || !S.user || API.demo) return;
  cardPollEmCurso = true;
  try {
    const antes = JSON.stringify(S.carteirinhas);
    await atualizarDocumentosPessoais();
    try {
      const mm = await API.mural();
      if (mm && JSON.stringify(mm.map((x) => x.id)) !== JSON.stringify((S.mural || []).map((x) => x.id))) {
        S.mural = mm;
        renderTicker();
        if (location.hash === "" || location.hash === "#inicio") renderMural();
      }
    } catch (_) {
    }
    drawSino();
    if (location.hash === "#aluno" && antes !== JSON.stringify(S.carteirinhas)) renderAluno();
  } finally {
    cardPollEmCurso = false;
  }
}, 6e4);
API.onAuth(async (ev) => {
  if (ev === "PASSWORD_RECOVERY") {
    recovering = true;
    await refreshUser();
    location.hash = "nova-senha";
    route();
  }
});
window.addEventListener("hashchange", () => {
  if (!$("#aiBox").classList.contains("hidden") && innerWidth <= 700) {
    $("#aiBox").classList.add("hidden");
    document.body.classList.remove("ai-aberto");
  }
  route();
});
(async () => {
  var _a;
  try {
    await refreshUser();
  } catch (e) {
    console.error(e);
  }
  const app = matchMedia && matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  if (app && !VITRINE && (!location.hash || location.hash === "#inicio")) {
    history.replaceState(null, "", "#" + (S.user ? ((_a = S.profile) == null ? void 0 : _a.is_admin) ? "admin" : "aluno" : "entrar"));
  }
  route();
})();
function abrirLeitor(url, titulo) {
  const drive = /drive\.google\.com/.test(url);
  if (!drive && /Android|iPhone|iPad/i.test(navigator.userAgent)) {
    window.open(url, "_blank", "noopener");
    return;
  }
  const L = document.createElement("div");
  L.className = "leitor";
  L.setAttribute("role", "dialog");
  L.setAttribute("aria-label", "Leitura: " + titulo);
  L.innerHTML = `<div class="leitor-top"><img src="${BRASAO}" alt=""><b>${esc(titulo || "Leitura")}</b><button type="button" class="btn btn-gold btn-sm" data-fechar>Fechar</button></div>
    <iframe src="${esc(drive ? pdfEmbed(url) : url)}" title="${esc(titulo || "Leitura")}" allow="autoplay"></iframe>`;
  document.body.appendChild(L);
  document.body.classList.add("leitor-aberto");
  const fechar = () => {
    L.remove();
    document.body.classList.remove("leitor-aberto");
    removeEventListener("keydown", esc_);
  };
  const esc_ = (e) => {
    if (e.key === "Escape") fechar();
  };
  L.querySelector("[data-fechar]").onclick = fechar;
  addEventListener("keydown", esc_);
  L.querySelector("[data-fechar]").focus();
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-ler]");
  if (b) {
    e.preventDefault();
    abrirLeitor(b.dataset.ler, b.dataset.tit);
  }
});
function drawVideoDiretor() {
  const B = $("#videoDiretor");
  if (!B) return;
  const v = CONFIG.VIDEO_DESTAQUE;
  if (!v) {
    B.classList.add("hidden");
    return;
  }
  B.classList.remove("hidden");
  B.innerHTML = `<div class="wrap" style="max-width:900px"><div class="cz" style="color:var(--gold2);letter-spacing:.2em;font-size:13px;text-align:center">MENSAGEM DO DIRETOR</div>
    <h2 style="text-align:center;color:#F3EBD6;margin:6px 0 16px">${esc(CONFIG.VIDEO_TITULO || "Conheça a Escola Teológica União")}</h2>
    ${/\/shorts\//.test(v) ? `<div class="video-vertical">${videoBox(toEmbed(v), CONFIG.VIDEO_TITULO || "Mensagem do Diretor", v)}</div>` : videoBox(toEmbed(v), CONFIG.VIDEO_TITULO || "Mensagem do Diretor", v)}
    <p style="text-align:center;color:#E9E1CC;margin:16px auto 14px;max-width:640px">Pr. Charlei de Jesus Lima Dias, Idealizador e Diretor Geral, apresenta a escola. Se Deus tem falado ao seu coração sobre estudar a Palavra, dê o próximo passo.</p>
    <div class="res" style="justify-content:center"><a class="btn btn-gold" href="#matricula">Quero me matricular</a><a class="btn btn-line" style="color:#F3EBD6;border-color:var(--gold)" href="#cursos">Ver os cursos</a></div></div>`;
}
async function drawVideoCfg() {
  const box = document.createElement("div");
  box.className = "panel";
  box.style.marginTop = "18px";
  box.innerHTML = `<h3>Vídeo de apresentação na página inicial</h3>
   <p style="margin:0 0 10px;color:var(--muted);font-size:16px">Grave um vídeo seu apresentando a escola, publique no YouTube como “não listado” (ou no Google Drive) e cole o link aqui. Ele aparece logo abaixo do banner, com os botões “Quero me matricular” e “Ver os cursos”. Deixe em branco para esconder.</p>
   <label for="vdLink">Link do vídeo</label><input id="vdLink" value="${esc(CONFIG.VIDEO_DESTAQUE || "")}" placeholder="https://youtu.be/...">
   <label for="vdTit">Título</label><input id="vdTit" value="${esc(CONFIG.VIDEO_TITULO || "")}" placeholder="Conheça a Escola Teológica União">
   <div class="msg hidden" id="mVd"></div><div class="res"><button class="btn btn-gold" id="vdSalvar" type="button">Salvar vídeo</button></div>`;
  ([...document.querySelectorAll("#configPanel ~ .panel")].pop() || $("#configPanel")).after(box);
  box.querySelector("#vdSalvar").onclick = async () => {
    const l = box.querySelector("#vdLink").value.trim(), t = box.querySelector("#vdTit").value.trim();
    try {
      await API.saveEscolaConfig({ video_destaque: l || null, video_titulo: t || null });
      CONFIG.VIDEO_DESTAQUE = l;
      CONFIG.VIDEO_TITULO = t;
      drawVideoDiretor();
      show(box.querySelector("#mVd"), l ? "Vídeo publicado na página inicial." : "Vídeo retirado da página inicial.", "ok");
    } catch (e) {
      show(box.querySelector("#mVd"), e.message, "err");
    }
  };
}
const COM = { sala: (() => {
  try {
    return localStorage.getItem("etu_sala") || "geral";
  } catch (e) {
    return "geral";
  }
})(), parar: null, t: null };
function podeComunidade() {
  var _a, _b;
  return S.user && (((_a = S.profile) == null ? void 0 : _a.is_admin) || !((_b = S.profile) == null ? void 0 : _b.bloqueado) && (S.mats || []).some(isActive));
}
async function drawComunidade() {
  const B = $("#comBox");
  if (!B) return;
  if (!S.user) {
    B.innerHTML = `<div class="panel" style="margin:0"><p style="margin:0">A comunidade é o espaço de conversa dos alunos matriculados com a Direção. <a href="#matricula">Faça sua matrícula</a> ou <a href="#entrar">entre na sua conta</a>.</p></div>`;
    return;
  }
  if (!podeComunidade()) {
    B.innerHTML = `<div class="panel" style="margin:0"><p style="margin:0">A comunidade fica disponível para alunos com matrícula ativa. Se o seu pagamento já foi feito, aguarde a confirmação da Direção.</p></div>`;
    return;
  }
  const SALAS = [["geral", "Geral"], ["oracao", "Oração"], ["duvidas", "Dúvidas de estudo"], ["basico", "Curso Básico"], ["medio", "Curso Médio"], ["avancado", "Curso Avançado"]];
  B.innerHTML = `<div class="wz-salas" role="tablist" aria-label="Salas de conversa">${SALAS.map(([k, n]) => `<button type="button" role="tab" data-sala="${k}" aria-selected="${COM.sala === k}">${n}</button>`).join("")}</div><div class="com-regras">Respeito e linguagem digna de um obreiro. <b>Nunca</b> envie senha, documentos ou Pix aqui: a Direção nunca pede pagamento pela conversa. Mensagens da Direção têm o selo <span class="com-selo">✓ DIREÇÃO</span>.</div>
    <div class="wz"><div class="wz-topo"><img src="brasao-redondo.webp" alt=""><div><b id="wzSala"></b><span>Alunos e Direção da escola</span></div></div>
    <div class="com-lista wz-lista" id="comLista" aria-live="polite"></div>
    <form class="com-form wz-form" id="comForm"><label for="comTxt" class="sr-only">Mensagem</label><textarea id="comTxt" rows="1" maxlength="1000" placeholder="Escreva uma mensagem"></textarea><button class="wz-env" type="submit" aria-label="Enviar">➤</button></form></div><div class="msg hidden" id="mCom"></div>`;
  const lista = async () => {
    let L = [];
    try {
      L = await API.mensagens(COM.sala);
    } catch (e) {
      $("#comLista").innerHTML = `<p style="color:var(--muted)">${esc(e.message)}</p>`;
      return;
    }
    const el = $("#comLista");
    if (!el) return;
    const embaixo = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
    let dia = "";
    el.innerHTML = L.length ? L.map((m) => {
      var _a;
      const d = new Date(m.criado_em), dd = d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long" }), eu = m.user_id === S.user.id;
      const sep = dd !== dia ? (dia = dd, `<div class="wz-dia"><span>${esc(dd)}</span></div>`) : "";
      return sep + `<div class="com-msg wz-m ${eu ? "eu" : ""}">${eu ? "" : `<div class="com-nome">${esc(m.nome || "Aluno")} ${m.is_direcao ? '<span class="com-selo">✓ DIREÇÃO</span>' : ""}</div>`}<div class="com-txt">${esc(m.texto)}</div><div class="wz-h"><time>${d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</time>${((_a = S.profile) == null ? void 0 : _a.is_admin) ? ` <button type="button" class="com-del" data-cdel="${esc(m.id)}" aria-label="Apagar mensagem">apagar</button>` : ""}</div></div>`;
    }).join("") : '<p class="wz-vazio">Seja o primeiro a dizer a paz do Senhor!</p>';
    if (embaixo || !el.dataset.ok) {
      el.scrollTop = el.scrollHeight;
      el.dataset.ok = 1;
    }
    el.querySelectorAll("[data-cdel]").forEach((b) => b.onclick = () => confirmBox("Apagar esta mensagem da comunidade?", async () => {
      await API.apagarMensagem(b.dataset.cdel);
      lista();
    }));
  };
  const nm = SALAS.find((x) => x[0] === COM.sala);
  $("#wzSala").textContent = nm ? nm[1] : "Geral";
  B.querySelectorAll("[data-sala]").forEach((b) => b.onclick = () => {
    COM.sala = b.dataset.sala;
    try {
      localStorage.setItem("etu_sala", COM.sala);
    } catch (e) {
    }
    drawComunidade();
  });
  const ta = $("#comTxt");
  ta.addEventListener("input", () => {
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 130) + "px";
  });
  ta.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && innerWidth > 700) {
      e.preventDefault();
      $("#comForm").requestSubmit();
    }
  });
  await lista();
  COM.parar && COM.parar();
  COM.parar = API.ouvirMensagens(COM.sala, lista);
  clearInterval(COM.t);
  COM.t = setInterval(() => {
    if (location.hash === "#comunidade" && !document.hidden) lista();
  }, 15e3);
  $("#comForm").onsubmit = async (e) => {
    var _a;
    e.preventDefault();
    const t = $("#comTxt").value.trim(), m = $("#mCom");
    if (!t) return;
    if (/\b(senha|cpf|cart[aã]o de cr[eé]dito)\b/i.test(t) && !((_a = S.profile) == null ? void 0 : _a.is_admin)) return show(m, "Por segurança, não envie senhas, CPF ou dados de cartão na comunidade.", "err");
    try {
      await API.enviarMensagem(COM.sala, t);
      $("#comTxt").value = "";
      m.classList.add("hidden");
      lista();
    } catch (err) {
      show(m, err.message, "err");
    }
  };
}
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-instalar]")) {
    e.preventDefault();
    instalarApp();
  }
});
if ("serviceWorker" in navigator && EMBED_OK && /^https?:$/.test(location.protocol)) {
  addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {
  }));
}
setTimeout(drawVideoDiretor, 0);
function animoWhats(tel, texto) {
  let n = String(tel || "").replace(/\D/g, "");
  if (n.length === 10 || n.length === 11) n = "55" + n;
  return n.length >= 12 ? "https://wa.me/" + n + "?text=" + encodeURIComponent(texto) : "";
}
async function drawAnimo() {
  if (API.demo || typeof API.animoConfig !== "function") return;
  const pai = document.querySelector('[data-tabpanel="alunos"]');
  if (!pai) return;
  let box = document.getElementById("animoBox");
  if (!box) {
    box = document.createElement("div");
    box.className = "panel";
    box.id = "animoBox";
    pai.appendChild(box);
  }
  let cfg = null, lista = [];
  try {
    cfg = await API.animoConfig();
    lista = await API.animoParados();
  } catch (e) {
    box.innerHTML = '<h3>Mensagens de ânimo</h3><p style="color:var(--muted)">Para usar esta função, rode no Supabase o script 06_animo.sql.</p>';
    return;
  }
  if (!cfg) {
    box.innerHTML = "<h3>Mensagens de ânimo</h3><p>Configuração não encontrada.</p>";
    return;
  }
  const linhas = lista.map((a) => `<tr><td><b>${esc(a.nome || "")}</b><br><span style="font-size:14px;color:var(--muted)">${esc(a.curso_titulo || "")}</span></td>
    <td><b>${a.dias}</b> dias sem estudar<br><span style="font-size:14px;color:var(--muted)">${a.ultimo_animo ? "Último ânimo: " + fmtDate(String(a.ultimo_animo).slice(0, 10)) : "Ainda não recebeu ânimo"}</span></td>
    <td><div class="chips"><button class="btn btn-gold btn-sm" data-animo-env="${a.user_id}">Enviar agora</button>
    <button class="btn btn-navy btn-sm" data-animo-wa="${a.user_id}" ${a.telefone ? "" : 'disabled title="Aluno sem telefone"'}>WhatsApp</button></div></td></tr>`).join("");
  box.innerHTML = `<h3>Mensagens de ânimo aos alunos</h3>
   <p style="margin:0 0 12px;color:var(--muted);font-size:16px">Quem fica <b>${cfg.dias} dias</b> sem concluir aulas ou fazer provas recebe uma palavra de ânimo com um versículo diferente (${cfg.mensagens} mensagens no banco). Envios nos últimos 30 dias: <b>${cfg.enviadas_30d}</b>.</p>
   <div class="chips" style="align-items:center;margin-bottom:12px">
    <span class="pill ${cfg.ativo ? "ok" : "off"}">${cfg.ativo ? "ENVIO AUTOMÁTICO LIGADO" : "ENVIO AUTOMÁTICO PAUSADO"}</span>
    <button class="btn ${cfg.ativo ? "btn-red" : "btn-gold"} btn-sm" id="animoLiga">${cfg.ativo ? "Pausar envios automáticos" : "Retomar envios automáticos"}</button>
   </div>
   <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;margin-bottom:14px">
    <div><label for="animoDias">Dias sem estudar</label><input id="animoDias" type="number" min="2" max="60" value="${cfg.dias}" style="width:110px"></div>
    <div><label for="animoModo">Mensagens</label><select id="animoModo"><option value="banco" ${cfg.modo === "banco" ? "selected" : ""}>Banco de mensagens aprovadas</option><option value="ia" ${cfg.modo === "ia" ? "selected" : ""}>Agente com IA personaliza (usa o banco se a IA falhar)</option></select></div>
    <button class="btn btn-line btn-sm" id="animoSalva">Salvar</button>
   </div>
   <div class="tbl-wrap"><table><thead><tr><th>Aluno</th><th>Situação</th><th>Enviar</th></tr></thead><tbody>${linhas || '<tr><td colspan="3">Nenhum aluno parado no momento. Glória a Deus!</td></tr>'}</tbody></table></div>
   <div class="msg hidden" id="animoMsg"></div>`;
  const msg = (t, tipo) => {
    const m = $("#animoMsg");
    m.className = "msg " + (tipo || "ok");
    m.textContent = t;
  };
  $("#animoLiga").onclick = async () => {
    try {
      await API.animoSalvar(!cfg.ativo, null, null);
      drawAnimo();
    } catch (e) {
      msg(e.message, "err");
    }
  };
  $("#animoSalva").onclick = async () => {
    const d = parseInt($("#animoDias").value, 10);
    if (!(d >= 2 && d <= 60)) return msg("Escolha de 2 a 60 dias.", "err");
    try {
      await API.animoSalvar(null, d, $("#animoModo").value);
      msg("Configuração salva.");
      setTimeout(drawAnimo, 600);
    } catch (e) {
      msg(e.message, "err");
    }
  };
  $$("[data-animo-env]").forEach((b) => b.onclick = async () => {
    b.disabled = true;
    try {
      const r = await API.animoEnviar(b.dataset.animoEnv, ["aviso", "email", "push"]);
      msg(`Mensagem enviada: aviso no aplicativo${r.emails ? ", e-mail" : ""}${r.notificacoes ? ", notificação no celular" : ""}.`);
      setTimeout(drawAnimo, 800);
    } catch (e) {
      try {
        const p = await API.animoPreparar(b.dataset.animoEnv);
        await API.animoRegistrar(b.dataset.animoEnv, p.mensagem_id, p.texto, "aviso");
        msg("Aviso enviado no aplicativo. (E-mail e celular dependem da ativação no servidor.)");
        setTimeout(drawAnimo, 800);
      } catch (e2) {
        msg(e2.message, "err");
        b.disabled = false;
      }
    }
  });
  $$("[data-animo-wa]").forEach((b) => b.onclick = async () => {
    const a = lista.find((x) => x.user_id === b.dataset.animoWa);
    try {
      const p = await API.animoPreparar(a.user_id);
      const link = animoWhats(a.telefone, p.texto);
      if (!link) return msg("Telefone do aluno incompleto.", "err");
      modal(`<h3>Mensagem para ${esc(a.nome || "")}</h3><textarea id="animoTxt" rows="12" style="width:100%">${esc(p.texto)}</textarea><p style="font-size:15px;color:var(--muted)">Pode ajustar o texto antes de enviar.</p><div class="acts"><button class="btn btn-gold" id="animoAbrirWa">Abrir no WhatsApp</button><button class="btn" data-close>Cancelar</button></div>`);
      $("#animoAbrirWa").onclick = async () => {
        var _a;
        const t = $("#animoTxt").value;
        window.open(animoWhats(a.telefone, t), "_blank");
        try {
          await API.animoRegistrar(a.user_id, p.mensagem_id, t, "whatsapp");
        } catch (_) {
        }
        (_a = document.querySelector("[data-close]")) == null ? void 0 : _a.click();
        setTimeout(drawAnimo, 800);
      };
    } catch (e) {
      msg(e.message, "err");
    }
  });
}
function b64ParaBytes(b) {
  const p = "=".repeat((4 - b.length % 4) % 4);
  const s = atob((b + p).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from([...s].map((c) => c.charCodeAt(0)));
}
async function drawLembretes() {
  if (API.demo || typeof API.animoVapid !== "function" || !("serviceWorker" in navigator) || !("PushManager" in window)) return;
  const v = document.querySelector('[data-view="aluno"] .wrap[style]');
  if (!v) return;
  let box = document.getElementById("lembBox");
  if (!box) {
    box = document.createElement("div");
    box.className = "panel";
    box.id = "lembBox";
    box.style.marginTop = "28px";
    const ref = document.getElementById("perfilBox");
    ref ? ref.parentNode.insertBefore(box, ref) : v.appendChild(box);
  }
  const reg = await navigator.serviceWorker.getRegistration();
  const sub = reg ? await reg.pushManager.getSubscription() : null;
  if (Notification.permission === "granted" && sub) {
    box.innerHTML = '<h3>Lembretes no celular</h3><p style="margin:0;color:var(--muted)">Ativados. Você receberá palavras de ânimo da escola quando ficar alguns dias sem estudar.</p>';
    return;
  }
  if (Notification.permission === "denied") {
    box.innerHTML = '<h3>Lembretes no celular</h3><p style="margin:0;color:var(--muted)">As notificações estão bloqueadas neste aparelho. Para ativar, libere as notificações do site nas configurações do navegador.</p>';
    return;
  }
  box.innerHTML = '<h3>Lembretes no celular</h3><p style="margin:0 0 12px;color:var(--muted)">Receba uma palavra de ânimo com versículo quando ficar alguns dias sem estudar. Você pode desativar quando quiser.</p><button class="btn btn-gold btn-sm" id="lembAtiva">Ativar lembretes</button> <span id="lembMsg" style="font-size:15px"></span>';
  $("#lembAtiva").onclick = async () => {
    const m = $("#lembMsg");
    try {
      const chave = await API.animoVapid();
      if (!chave) {
        m.textContent = "Os lembretes ainda estão sendo preparados pela escola.";
        return;
      }
      if (await Notification.requestPermission() !== "granted") {
        m.textContent = "Permissão não concedida.";
        return;
      }
      const r = reg || await navigator.serviceWorker.register("./sw.js");
      await navigator.serviceWorker.ready;
      const s = await r.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ParaBytes(chave) });
      await API.pushSalvar(s);
      drawLembretes();
    } catch (e) {
      m.textContent = "Não foi possível ativar neste aparelho.";
    }
  };
}
const DIV_SITE = "escolateologicauniao.github.io";
const DIV_YT_PADRAO = "https://www.youtube.com/@PalavradeDeus_24";
const DIV_PERGUNTAS = [
  ["Qual versículo tem sustentado você nesta semana?", "Salmo 119.105", "Lâmpada para os meus pés é tua palavra e luz, para o meu caminho."],
  ["Que atributo de Deus mais tem tocado o seu coração ultimamente: o amor, a fidelidade, a santidade ou a misericórdia? Por quê?", "Lamentações 3.23", "Novas são cada manhã; grande é a tua fidelidade."],
  ["Qual personagem bíblico mais ensinou você sobre perseverança? Conte para o grupo.", "Hebreus 12.1", "Corramos, com paciência, a carreira que nos está proposta."],
  ["Se você tivesse de explicar a Trindade a uma criança, por qual versículo começaria?", "Mateus 28.19", "Batizando-os em nome do Pai, e do Filho, e do Espírito Santo."],
  ["Qual foi a maior lição que a Escola Dominical deixou para você este mês?", "Atos 17.11", "Examinando cada dia nas Escrituras se estas coisas eram assim."],
  ["Deixe aqui o seu pedido de oração. Vamos orar uns pelos outros.", "Tiago 5.16", "Orai uns pelos outros, para que sareis."]
];
let DIV = { links: {}, msgs: [], img: null, texto: "", brasao: null, selo: null };
function divCarregaImg(src) {
  return new Promise((r) => {
    const i = new Image();
    i.onload = () => r(i);
    i.onerror = () => r(null);
    i.src = src;
  });
}
function divQuebra(ctx, txt, larg) {
  const out = [];
  for (const par of String(txt).split("\n")) {
    let l = "";
    for (const w of par.split(" ")) {
      const t = l ? l + " " + w : w;
      if (ctx.measureText(t).width > larg && l) {
        out.push(l);
        l = w;
      } else l = t;
    }
    out.push(l);
  }
  return out;
}
async function divImagem(o) {
  if (!DIV.brasao) DIV.brasao = await divCarregaImg("./brasao-redondo.webp");
  if (!DIV.selo) DIV.selo = await divCarregaImg("./selo-fita.webp");
  const c = document.createElement("canvas");
  c.width = 1080;
  c.height = 1080;
  const x = c.getContext("2d");
  const g = x.createRadialGradient(540, 320, 60, 540, 540, 820);
  g.addColorStop(0, "#1d3263");
  g.addColorStop(0.6, "#0A192F");
  g.addColorStop(1, "#050d1c");
  x.fillStyle = g;
  x.fillRect(0, 0, 1080, 1080);
  x.strokeStyle = "#C9A24A";
  x.lineWidth = 3;
  x.strokeRect(24, 24, 1032, 1032);
  x.strokeStyle = "rgba(201,162,74,.45)";
  x.lineWidth = 1.5;
  x.strokeRect(36, 36, 1008, 1008);
  if (DIV.brasao) {
    x.save();
    x.shadowColor = "rgba(0,0,0,.55)";
    x.shadowBlur = 30;
    x.beginPath();
    x.arc(540, 175, 112, 0, Math.PI * 2);
    x.closePath();
    x.clip();
    x.drawImage(DIV.brasao, 428, 63, 224, 224);
    x.restore();
    x.strokeStyle = "rgba(201,162,74,.6)";
    x.lineWidth = 4;
    x.beginPath();
    x.arc(540, 175, 113, 0, Math.PI * 2);
    x.stroke();
  }
  x.textAlign = "center";
  x.fillStyle = "#E6CC86";
  x.font = "24px Georgia, serif";
  x.fillText((o.kicker || "ESCOLA TEOLÓGICA UNIÃO").split("").join(String.fromCharCode(8202)), 540, 345);
  x.font = "bold 64px Georgia, serif";
  const t1 = divQuebra(x, o.titulo || "", 900).slice(0, 3);
  let y = 430;
  t1.forEach((l, i) => {
    x.fillStyle = i === t1.length - 1 && t1.length > 1 ? "#D4AF37" : "#FFFFFF";
    x.fillText(l, 540, y);
    y += 74;
  });
  const lg = x.createLinearGradient(310, 0, 770, 0);
  lg.addColorStop(0, "rgba(212,175,55,0)");
  lg.addColorStop(0.5, "#D4AF37");
  lg.addColorStop(1, "rgba(212,175,55,0)");
  x.fillStyle = lg;
  x.fillRect(310, y - 20, 460, 2);
  x.fillStyle = "#EFE6D0";
  x.font = "32px Georgia, serif";
  y += 40;
  for (const l of divQuebra(x, o.sub || "", 800).slice(0, 4)) {
    x.fillText(l, 540, y);
    y += 44;
  }
  if (o.verso) {
    x.textAlign = "left";
    x.fillStyle = "#E6CC86";
    x.font = "italic 27px Georgia, serif";
    const vl = divQuebra(x, "“" + o.verso + "”", 690).slice(0, 4);
    let vy = 1e3 - 36 * vl.length - 30;
    for (const l of vl) {
      x.fillText(l, 90, vy);
      vy += 36;
    }
    x.fillStyle = "#C9A24A";
    x.font = "bold 22px Georgia, serif";
    x.fillText((o.ref || "").toUpperCase(), 90, vy + 6);
  }
  if (DIV.selo) {
    const w = 150, h = w * DIV.selo.height / DIV.selo.width;
    x.drawImage(DIV.selo, 1080 - 62 - w, 1080 - 50 - h, w, h);
  }
  return c;
}
function divRodape(longa) {
  const L = DIV.links || {};
  let r = "\n\n🔗 *Plataforma da escola:* " + DIV_SITE;
  if (L.grupo_whatsapp) r += "\n👥 *Grupo de estudos:* " + L.grupo_whatsapp;
  if (longa) r += "\n▶️ *Canal no YouTube:* " + (L.canal_youtube || DIV_YT_PADRAO);
  return r + "\n\n*Escola Teológica União*\nFormação Bíblica, Teológica e Ministerial";
}
function divMonta(tipo, longa, f) {
  const yt = DIV.links && DIV.links.canal_youtube || DIV_YT_PADRAO;
  if (tipo === "animo") {
    const m = DIV.msgs.length ? DIV.msgs[Math.floor(Math.random() * DIV.msgs.length)] : { referencia: "Gálatas 6.9", versiculo: "E não nos cansemos de fazer bem, porque a seu tempo ceifaremos, se não houvermos desfalecido.", texto: "Quem persevera no estudo da Palavra colhe firmeza na fé, preparo para ensinar e ousadia para pregar." };
    let t2 = `🙏 *PALAVRA DE ÂNIMO*

A paz do Senhor, amados!

“${m.versiculo}” (${m.referencia})

${m.texto}`;
    if (longa) t2 += `

📌 *Para refletir hoje:*
• O que Deus tem semeado em você nesta estação?
• Que passo de fidelidade você pode dar hoje?
• Por quem você vai orar ainda hoje?

Busque a presença de Deus: separe um tempo de oração e de leitura da Palavra. Quem permanece nEle dá muito fruto (João 15.5).`;
    return { texto: t2 + divRodape(longa), img: { kicker: "PALAVRA DE ÂNIMO", titulo: "Não desista. A colheita vem.", sub: "Uma palavra para fortalecer a sua fé hoje.", verso: m.versiculo, ref: m.referencia } };
  }
  if (tipo === "curso") {
    const c = curso(f.curso) || {};
    const breve = c.em_breve === true;
    const d = (S.discs || []).filter((x) => x.curso_id === c.id).map((x) => x.nome);
    let t2 = `📖 *${String(c.titulo || "").toUpperCase()}*
${breve ? "_Em breve na Escola Teológica União_" : "_Matrículas abertas na Escola Teológica União_"}

A paz do Senhor, amados!

${c.desc || c.descricao || ""}`;
    if (longa) {
      if (d.length) t2 += "\n\n📚 *O que você vai estudar:*\n" + d.slice(0, 10).map((n) => "• " + n).join("\n");
      t2 += "\n\n✅ Apostila completa em PDF\n✅ Aulas e avaliações\n✅ Certificado de Curso Livre de Teologia\n✅ Estudo no seu ritmo, pelo celular";
    }
    t2 += breve ? "\n\nAcompanhe a escola para ser avisado do lançamento." : "\n\nFaça a sua inscrição pela plataforma.";
    t2 += "\n\n“Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar, que maneja bem a palavra da verdade” (2 Timóteo 2.15)";
    return { texto: t2 + divRodape(longa), img: { kicker: breve ? "EM BREVE" : "MATRÍCULAS ABERTAS", titulo: c.titulo || "Curso Livre de Teologia", sub: "Curso Livre de Teologia — Formação Bíblica, Teológica e Ministerial", verso: "Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar.", ref: "2 Timóteo 2.15" } };
  }
  if (tipo === "documentos") {
    let t2 = `🎓 *CERTIFICADO E CARTEIRA DE ESTUDANTE*

A paz do Senhor, amados!

Na Escola Teológica União o seu esforço é reconhecido:

✅ *Certificado de conclusão*, ao concluir todas as aulas e avaliações do curso
✅ *Carteira de Estudante*, com foto e validade, para quem tem matrícula ativa
✅ *Código de verificação* em cada documento, para comprovar a autenticidade`;
    if (longa) t2 += `

📚 Os cursos vão do *Básico ao Avançado*, com apostilas completas, aulas e avaliações, e você estuda no seu ritmo, pelo celular ou pelo computador.

_Curso livre de Teologia: não equivale a curso de graduação ou pós-graduação._`;
    t2 += `

“Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar” (2 Timóteo 2.15)`;
    return { texto: t2 + divRodape(longa), img: { kicker: "CERTIFICADO E CARTEIRA", titulo: "Seu esforço reconhecido", sub: "Certificado de conclusão e Carteira de Estudante, com código de verificação.", verso: "Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar.", ref: "2 Timóteo 2.15" } };
  }
  if (tipo === "youtube") {
    let t2 = `▶️ *CONHEÇA O CANAL DA ESCOLA NO YOUTUBE*

A paz do Senhor, amados!

No nosso canal você acompanha o trabalho missionário e voluntário que realizamos na *África, em Moçambique*, levando a Palavra de Deus e o amor de Cristo onde há grande necessidade.`;
    t2 += longa ? `

📺 *Em breve, também no canal:*
• Aulas e videoaulas da Escola Teológica União
• Pregações e estudos bíblicos
• Ensinamentos de Teologia para o dia a dia da igreja

🙌 *Como você pode ajudar:*
1. Inscreva-se no canal e ative o sininho 🔔
2. Assista e compartilhe os vídeos com sua família e sua igreja
3. Convide amigos a se inscreverem

Cada inscrição e cada compartilhamento ajudam a Palavra de Deus a chegar mais longe.

“Ide por todo o mundo, pregai o evangelho a toda criatura” (Marcos 16.15)` : `

Em breve também teremos aulas, pregações e ensinamentos bíblicos. Inscreva-se e ajude a divulgar a Palavra de Deus!`;
    t2 += `

👉 *Quem quiser conhecer o canal, toque aqui:*
${yt}`;
    return { texto: t2 + divRodape(false), img: { kicker: "CANAL NO YOUTUBE", titulo: "Missões na África: a Palavra que alcança vidas", sub: "Trabalho missionário e voluntário em Moçambique. Em breve: aulas, pregações e estudos bíblicos.", verso: "Ide por todo o mundo, pregai o evangelho a toda criatura.", ref: "Marcos 16.15" } };
  }
  if (tipo === "grupo") {
    let t2 = `👥 *VENHA ESTUDAR A PALAVRA CONOSCO*

A paz do Senhor!

O grupo de estudos da Escola Teológica União é um lugar de comunhão, estudo bíblico e edificação: palavras de ânimo, estudos curtos, Escola Dominical, esboços de pregação e avisos dos cursos.`;
    t2 += longa ? "\n\n📌 *Regras do grupo:*\n• Respeito e linguagem cristã\n• Assuntos bíblicos e da escola\n• Sem propagandas ou correntes\n\n“Oh! Quão bom e quão suave é que os irmãos vivam em união!” (Salmo 133.1)" : "";
    t2 += "\n\n👉 *Toque para entrar:* " + (DIV.links && DIV.links.grupo_whatsapp || "(cadastre o link do grupo no painel)");
    return { texto: t2 + divRodape(longa), img: { kicker: "GRUPO DE ESTUDOS", titulo: "Venha estudar a Palavra conosco", sub: "Comunhão, estudo bíblico e edificação.", verso: "Oh! Quão bom e quão suave é que os irmãos vivam em união!", ref: "Salmo 133.1" } };
  }
  if (tipo === "pergunta") {
    const p = DIV_PERGUNTAS[Math.floor(Math.random() * DIV_PERGUNTAS.length)];
    const t2 = `💬 *PERGUNTA PARA O GRUPO*

A paz do Senhor, amados!

${p[0]}

Responda aqui embaixo e edifique os irmãos com a sua resposta. 👇

“${p[2]}” (${p[1]})`;
    return { texto: t2 + divRodape(longa), img: { kicker: "PERGUNTA PARA O GRUPO", titulo: "Participe da conversa!", sub: p[0], verso: p[2], ref: p[1] } };
  }
  const rot = { estudo: ["📖", "ESTUDO BÍBLICO", "Estudo bíblico"], ebd: ["🏫", "ESCOLA BÍBLICA DOMINICAL", "Escola Dominical"], esboco: ["🎤", "ESBOÇO DE PREGAÇÃO", "Esboço de pregação"], aviso: ["📢", "AVISO DA ESCOLA", "Aviso"] }[tipo] || ["📢", "AVISO", "Aviso"];
  let t = `${rot[0]} *${(f.titulo || rot[2]).toUpperCase()}*

A paz do Senhor, amados!

${f.corpo || ""}`;
  if (f.verso) t += `

“${f.verso}”${f.ref ? " (" + f.ref + ")" : ""}`;
  return { texto: t + divRodape(longa), img: { kicker: rot[1], titulo: f.titulo || rot[2], sub: (f.corpo || "").split("\n")[0].slice(0, 160), verso: f.verso, ref: f.ref } };
}
async function drawDivulgacao() {
  if (API.demo || typeof API.links !== "function") return;
  const tabs = document.querySelector(".tabs");
  if (!tabs) return;
  if (!document.querySelector('[data-tab="divulga"]')) {
    const b = document.createElement("button");
    b.dataset.tab = "divulga";
    b.setAttribute("role", "tab");
    b.textContent = "Divulgação";
    tabs.appendChild(b);
    const p2 = document.createElement("div");
    p2.dataset.tabpanel = "divulga";
    p2.className = "hidden";
    document.querySelector('[data-tabpanel="alunos"]').parentNode.appendChild(p2);
    $$(".tabs button").forEach((bb) => bb.onclick = () => {
      $$(".tabs button").forEach((x) => x.classList.toggle("on", x === bb));
      $$("[data-tabpanel]").forEach((pp) => pp.classList.toggle("hidden", pp.dataset.tabpanel !== bb.dataset.tab));
    });
  }
  try {
    DIV.links = await API.links();
  } catch (_) {
    DIV.links = {};
  }
  try {
    DIV.msgs = await API.mensagensAnimo();
  } catch (_) {
    DIV.msgs = [];
  }
  const p = document.querySelector('[data-tabpanel="divulga"]');
  const ops = CURSOS.map((c) => `<option value="${esc(c.id)}">${esc(c.titulo)}${c.em_breve ? " (em breve)" : ""}</option>`).join("");
  p.innerHTML = `<div class="panel"><h3>Gerador de postagens</h3>
   <p style="margin:0 0 12px;color:var(--muted);font-size:16px">Monte a imagem (brasão, título, versículo e selo) e o texto. Depois toque em <b>Compartilhar</b> e escolha o grupo no WhatsApp. Mensagens longas aparecem com “Ler mais”.</p>
   <div style="display:flex;gap:12px;flex-wrap:wrap">
    <div><label for="dvTipo">Tipo</label><select id="dvTipo"><option value="animo">Palavra de ânimo</option><option value="curso">Anúncio de curso / matrícula</option><option value="documentos">Certificado e carteira de estudante</option><option value="youtube">Canal do YouTube</option><option value="grupo">Convite para o grupo</option><option value="pergunta">Pergunta para o grupo</option><option value="estudo">Estudo bíblico curto</option><option value="ebd">Escola Dominical</option><option value="esboco">Esboço de pregação</option><option value="aviso">Aviso da escola</option></select></div>
    <div><label for="dvTam">Tamanho</label><select id="dvTam"><option value="curta">Curta</option><option value="longa">Longa (com “Ler mais”)</option></select></div>
    <div id="dvCursoBox"><label for="dvCurso">Curso</label><select id="dvCurso">${ops}</select></div>
   </div>
   <div id="dvLivre" class="hidden"><label for="dvTit">Título</label><input id="dvTit" placeholder="Ex.: O Deus que vê (Gênesis 16.13)">
    <label for="dvCorpo">Texto (tópicos curtos, um por linha)</label><textarea id="dvCorpo" rows="7"></textarea>
    <div style="display:flex;gap:12px;flex-wrap:wrap"><div style="flex:2;min-width:220px"><label for="dvVerso">Versículo (ARC)</label><input id="dvVerso"></div><div style="flex:1;min-width:140px"><label for="dvRef">Referência</label><input id="dvRef" placeholder="Gênesis 16.13"></div></div></div>
   <div class="chips" style="margin-top:14px"><button class="btn btn-gold btn-sm" id="dvGerar">Gerar postagem</button></div>
   <div id="dvRes" class="hidden" style="margin-top:16px">
    <img id="dvImg" alt="Imagem da postagem" style="width:100%;max-width:420px;border-radius:8px;display:block;box-shadow:0 6px 18px rgba(0,0,0,.25)">
    <label for="dvTexto" style="margin-top:12px">Texto (pode editar antes de enviar)</label><textarea id="dvTexto" rows="14"></textarea>
    <div class="chips" style="margin-top:10px"><button class="btn btn-gold btn-sm" id="dvShare">Compartilhar (WhatsApp)</button><button class="btn btn-navy btn-sm" id="dvCopia">Copiar texto</button><button class="btn btn-line btn-sm" id="dvBaixa">Baixar imagem</button></div>
    <div class="msg hidden" id="dvMsg"></div></div></div>
   <div class="panel"><h3>Links da escola</h3>
    <label for="dvGrupo">Link do grupo do WhatsApp</label><input id="dvGrupo" placeholder="https://chat.whatsapp.com/..." value="${esc(DIV.links.grupo_whatsapp || "")}">
    <label for="dvYt">Canal do YouTube</label><input id="dvYt" value="${esc(DIV.links.canal_youtube || DIV_YT_PADRAO)}">
    <div class="chips" style="margin-top:10px"><button class="btn btn-line btn-sm" id="dvSalvaLinks">Salvar links</button></div><div class="msg hidden" id="dvLinksMsg"></div></div>`;
  const ajusta = () => {
    const t = $("#dvTipo").value;
    $("#dvCursoBox").classList.toggle("hidden", t !== "curso");
    $("#dvLivre").classList.toggle("hidden", !["estudo", "ebd", "esboco", "aviso"].includes(t));
  };
  $("#dvTipo").onchange = ajusta;
  ajusta();
  const aviso = (id, t, tp) => {
    const m = $(id);
    m.className = "msg " + (tp || "ok");
    m.textContent = t;
  };
  $("#dvSalvaLinks").onclick = async () => {
    try {
      await API.linksSalvar($("#dvGrupo").value.trim(), $("#dvYt").value.trim());
      DIV.links = await API.links();
      aviso("#dvLinksMsg", "Links salvos.");
    } catch (e) {
      aviso("#dvLinksMsg", e.message, "err");
    }
  };
  $("#dvGerar").onclick = async () => {
    const r = divMonta($("#dvTipo").value, $("#dvTam").value === "longa", { curso: $("#dvCurso").value, titulo: $("#dvTit").value.trim(), corpo: $("#dvCorpo").value.trim(), verso: $("#dvVerso").value.trim(), ref: $("#dvRef").value.trim() });
    const cv = await divImagem(r.img);
    DIV.img = await new Promise((ok) => cv.toBlob(ok, "image/jpeg", 0.92));
    $("#dvImg").src = URL.createObjectURL(DIV.img);
    $("#dvTexto").value = r.texto;
    $("#dvRes").classList.remove("hidden");
    $("#dvRes").scrollIntoView({ behavior: "smooth" });
  };
  $("#dvCopia").onclick = async () => {
    try {
      await navigator.clipboard.writeText($("#dvTexto").value);
      aviso("#dvMsg", "Texto copiado. Cole no WhatsApp.");
    } catch (_) {
      $("#dvTexto").select();
      aviso("#dvMsg", "Selecione e copie o texto.", "err");
    }
  };
  $("#dvBaixa").onclick = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(DIV.img);
    a.download = "postagem-etu.jpg";
    a.click();
  };
  $("#dvShare").onclick = async () => {
    const txt = $("#dvTexto").value;
    const f = new File([DIV.img], "postagem-etu.jpg", { type: "image/jpeg" });
    try {
      if (navigator.canShare && navigator.canShare({ files: [f] })) {
        try {
          await navigator.clipboard.writeText(txt);
        } catch (_) {
        }
        await navigator.share({ files: [f], text: txt });
        aviso("#dvMsg", "Se o texto não aparecer junto da imagem no WhatsApp, toque e segure na legenda e escolha Colar: ele já está copiado.");
      } else {
        window.open("https://wa.me/?text=" + encodeURIComponent(txt), "_blank");
        aviso("#dvMsg", "Neste aparelho a imagem não pode ser compartilhada direto. Baixe a imagem e envie junto com o texto.", "err");
      }
    } catch (e) {
      if (e && e.name !== "AbortError") aviso("#dvMsg", "Não foi possível compartilhar. Use Copiar texto e Baixar imagem.", "err");
    }
  };
}
(function() {
  function monta() {
    var acc = document.getElementById("myAccount");
    if (!acc) return;
    var pn = acc.closest(".panel");
    if (!pn || pn.querySelector("#btnExcluirConta")) return;
    var d = document.createElement("div");
    d.style.marginTop = "18px";
    d.style.borderTop = "1px solid #E1D4B2";
    d.style.paddingTop = "14px";
    d.innerHTML = '<p style="margin:0 0 8px;font-size:15px;color:#5b6070">Se não quiser mais usar a plataforma, você pode pedir a exclusão da sua conta e dos seus dados. <a href="excluir-conta.html" target="_blank" rel="noopener">Saiba o que é apagado</a>.</p><button type="button" class="btn btn-line btn-sm" id="btnExcluirConta" style="color:#7A1E2C;border-color:#7A1E2C">Pedir exclusão da minha conta</button><div class="msg hidden" id="mExcluir" style="margin-top:10px"></div>';
    pn.appendChild(d);
    d.querySelector("#btnExcluirConta").onclick = function() {
      confirmBox("Pedir a exclusão da sua conta? Depois de concluída, você perde o acesso aos cursos, ao progresso, às notas e aos documentos. Esta ação não pode ser desfeita.", async function() {
        var m = d.querySelector("#mExcluir");
        try {
          await API.abrirAtendimento({ nome: S.profile && S.profile.nome || "Aluno", contato: S.user && S.user.email || "", mensagem: "PEDIDO DE EXCLUSÃO DE CONTA — o aluno pediu, pelo aplicativo, a exclusão da conta e dos dados pessoais. E-mail da conta: " + (S.user && S.user.email || "") + ".", conversa: [] });
          m.className = "msg ok";
          m.textContent = "Pedido enviado à Direção. Você receberá a confirmação pelo seu e-mail ou WhatsApp quando a exclusão for concluída.";
        } catch (e) {
          m.className = "msg err";
          m.textContent = "Não foi possível enviar agora. Tente de novo ou escreva para etu.escolateologicauniao215@gmail.com.";
        }
      });
    };
  }
  addEventListener("hashchange", function() {
    setTimeout(monta, 300);
  });
  addEventListener("load", function() {
    setTimeout(monta, 800);
  });
})();
window.etuAtivarNotif = async function(m, depois) {
  function diz(c, t) {
    if (m) {
      m.className = "msg " + c;
      m.textContent = t;
    }
  }
  try {
    if (!("Notification" in window)) {
      diz("err", "Este aparelho ou navegador não permite notificações. No iPhone, primeiro adicione a escola à Tela de Início pelo Safari.");
      return;
    }
    if (Notification.permission === "denied") {
      diz("err", "As notificações foram bloqueadas neste celular. Segure o dedo no ícone da ETU, toque em Informações do app, depois em Notificações, e ative.");
      return;
    }
    var p = await Notification.requestPermission();
    if (p === "granted") {
      diz("ok", "Notificações ativadas. Os avisos da escola vão aparecer no sininho e na tela do celular.");
      try {
        var r = await navigator.serviceWorker.ready;
        r.showNotification("Escola Teológica União", { body: "Notificações ativadas. A paz do Senhor!", icon: "./icone-192.png", badge: "./selo-notif.png", tag: "etu-teste" });
      } catch (e) {
      }
      try {
        var kN = "etu_avisos_notif";
        if (localStorage.getItem(kN) === null) localStorage.setItem(kN, "[]");
      } catch (e) {
      }
    } else diz("info", "Permissão não concedida. Quando quiser, toque de novo em Ativar notificações.");
  } catch (e) {
    diz("err", "Não foi possível ativar agora. Tente de novo.");
  }
  if (depois) depois();
};
(function() {
  var VERSAO = "Versão 61 · 28/11/2026";
  function estadoNotif() {
    if (!("Notification" in window)) return "não disponíveis neste aparelho";
    return Notification.permission === "granted" ? "ativadas ✓" : Notification.permission === "denied" ? "bloqueadas no celular" : "desativadas";
  }
  function monta() {
    var v = document.querySelector('[data-view="mais"] .wrap');
    if (!v || document.getElementById("etuApp")) return;
    var d = document.createElement("div");
    d.id = "etuApp";
    d.className = "panel";
    d.style.marginTop = "18px";
    d.style.color = "#1B2238";
    d.style.background = "#FFFDF6";
    d.innerHTML = '<h3 style="margin:0 0 6px">Aplicativo</h3><p style="margin:0 0 4px;color:#5b6070;font-size:15.5px">' + VERSAO + '</p><p style="margin:0 0 12px;font-size:15.5px;color:#1B2238">Notificações: <b id="etuNotEst" style="color:#7A1B2B"></b></p><div class="res"><button type="button" class="btn btn-gold btn-sm" id="etuAtualiza">Procurar atualização</button> <button type="button" class="btn btn-line btn-sm" id="etuNotAtiva">Ativar notificações</button></div><div class="msg hidden" id="etuAtMsg" style="margin-top:10px"></div><details style="margin-top:12px"><summary style="cursor:pointer;font-weight:600">Configurações recomendadas no celular</summary><ol style="margin:8px 0 0;padding-left:20px;font-size:15.5px;line-height:1.55"><li>Segure o dedo no ícone da ETU e toque em <b>Informações do app</b> (ou no <b>i</b>).</li><li><b>Notificações</b>: deixe <b>ativadas</b>, para receber os avisos da escola.</li><li><b>Gerenciar o app fora de uso</b>: deixe <b>desligado</b>, para o celular não apagar as permissões nem esconder o aplicativo.</li><li><b>Abrir por padrão</b>: permita abrir os links da escola no aplicativo.</li><li>Se o ícone continuar antigo, desinstale o aplicativo e instale de novo pelo Chrome, no site da escola. Nada se perde: seus cursos ficam guardados na sua conta.</li></ol></details>';
    v.appendChild(d);
    d.querySelector("#etuNotEst").textContent = estadoNotif();
    var bn = d.querySelector("#etuNotAtiva");
    if ("Notification" in window && Notification.permission === "granted") bn.style.display = "none";
    bn.onclick = function() {
      window.etuAtivarNotif(d.querySelector("#etuAtMsg"), function() {
        d.querySelector("#etuNotEst").textContent = estadoNotif();
        if (Notification.permission === "granted") bn.style.display = "none";
      });
    };
    d.querySelector("#etuAtualiza").onclick = async function() {
      var m = d.querySelector("#etuAtMsg");
      m.className = "msg info";
      m.textContent = "Procurando atualização…";
      try {
        if ("serviceWorker" in navigator) {
          var r = await navigator.serviceWorker.getRegistration();
          if (r) await r.update();
        }
        if (window.caches) {
          var ks = await caches.keys();
          await Promise.all(ks.map(function(k) {
            return caches.delete(k);
          }));
        }
        m.className = "msg ok";
        m.textContent = "Aplicativo atualizado. Abrindo a versão mais recente…";
        setTimeout(function() {
          location.reload();
        }, 900);
      } catch (e) {
        m.className = "msg err";
        m.textContent = "Não foi possível atualizar agora. Verifique a internet e tente de novo.";
      }
    };
  }
  addEventListener("hashchange", function() {
    if (location.hash === "#mais") setTimeout(monta, 200);
  });
  addEventListener("load", function() {
    setTimeout(monta, 600);
  });
  try {
    if ("serviceWorker" in navigator) {
      var tinha = !!navigator.serviceWorker.controller;
      navigator.serviceWorker.addEventListener("controllerchange", function() {
        if (!tinha) return;
        var t = document.createElement("div");
        t.textContent = "Aplicativo atualizado para a versão mais recente.";
        t.style.cssText = "position:fixed;left:50%;bottom:92px;transform:translateX(-50%);background:#0B1734;color:#F7EFD9;border:1px solid #C9A24A;padding:10px 16px;border-radius:10px;z-index:9999;font-size:15px;box-shadow:0 4px 14px rgba(0,0,0,.3)";
        document.body.appendChild(t);
        setTimeout(function() {
          t.remove();
        }, 5e3);
      });
    }
  } catch (e) {
  }
})();
(function() {
  var TEMAS = {
    azul: { n: "Azul-marinho", g: 1, c: ["#0F1E3D", "#16294F", "#1E3463"] },
    azulreal: { n: "Azul-royal", g: 1, c: ["#16307A", "#1D3C91", "#2548A8"] },
    petroleo: { n: "Petróleo", g: 1, c: ["#0E3B45", "#134A56", "#1A5B69"] },
    verde: { n: "Verde", g: 1, c: ["#0E3B2E", "#14493A", "#1B5A47"] },
    oliva: { n: "Oliva", g: 1, c: ["#3A3F1E", "#474D25", "#565E2D"] },
    grafite: { n: "Grafite", g: 1, c: ["#1C1E23", "#26292F", "#33373F"] },
    preto: { n: "Preto", g: 1, c: ["#0B0B0C", "#151517", "#202024"] },
    chocolate: { n: "Chocolate", g: 1, c: ["#3B2418", "#4A2E1F", "#5A3826"] },
    camurca: { n: "Camurça", g: 1, c: ["#4E3A28", "#604833", "#73583F"] },
    bordo: { n: "Bordô", g: 1, c: ["#4A0F1C", "#5E1626", "#74202F"] },
    roxo: { n: "Roxo", g: 1, c: ["#2E1A4A", "#3B2360", "#4A2D76"] },
    rosa: { n: "Rosa", g: 2, c: ["#6B1F45", "#82295A", "#99346C"] },
    rosaantigo: { n: "Rosa-antigo", g: 2, c: ["#6E3A4C", "#80465A", "#93526A"] },
    fucsia: { n: "Fúcsia", g: 2, c: ["#7A1458", "#8F1A68", "#A3207A"] },
    vinho: { n: "Vinho", g: 2, c: ["#5A1A3A", "#6E2248", "#842A57"] },
    ameixa: { n: "Ameixa", g: 2, c: ["#4A1F3D", "#5A2649", "#6B2E57"] },
    lavanda: { n: "Lavanda", g: 2, c: ["#4B3C78", "#57468A", "#63519C"] },
    coral: { n: "Coral", g: 2, c: ["#8A3324", "#9C3C2B", "#AE4633"] },
    laranja: { n: "Laranja", g: 2, c: ["#6E2A0C", "#863512", "#9C431A"] },
    terracota: { n: "Terracota", g: 2, c: ["#6B3020", "#7D3A27", "#8F452F"] },
    turquesa: { n: "Turquesa", g: 2, c: ["#0F4F52", "#145E62", "#1A6E72"] },
    indigo: { n: "Índigo", g: 3, c: ["#1F1F5C", "#29296F", "#333384"] },
    safira: { n: "Safira", g: 3, c: ["#0F2F66", "#153B7A", "#1C4890"] },
    esmeralda: { n: "Esmeralda", g: 3, c: ["#0B4436", "#0F5443", "#146551"] },
    musgo: { n: "Musgo", g: 3, c: ["#2E3A22", "#3A4A2B", "#475B35"] },
    ardosia: { n: "Ardósia", g: 3, c: ["#2A3440", "#34404E", "#404D5D"] },
    cobre: { n: "Cobre", g: 3, c: ["#5C2E14", "#6E381A", "#824322"] },
    cafe: { n: "Café", g: 3, c: ["#2B1D16", "#38261D", "#463026"] },
    berinjela: { n: "Berinjela", g: 3, c: ["#361B33", "#442240", "#532A4E"] }
  };
  var BRILHO = { suave: "brightness(.93)", normal: "none", intenso: "brightness(1.06) saturate(1.12)" };
  function ler(k, d) {
    try {
      return localStorage.getItem(k) || d;
    } catch (e) {
      return d;
    }
  }
  function grava(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch (e) {
    }
  }
  function aplicaTema() {
    var t = TEMAS[ler("etu_tema", "azul")] || TEMAS.azul, r = document.documentElement.style;
    r.filter = BRILHO[ler("etu_brilho", "normal")] || "none";
    r.setProperty("--navy", t.c[0]);
    r.setProperty("--navy2", t.c[1]);
    r.setProperty("--navy3", t.c[2]);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", t.c[0]);
  }
  var SEL = "header.top .brand img, img.crest, img.vs-crest, img[data-brasao]";
  function aplicaBrasao() {
    var med = ler("etu_brasao", "medalhao") === "medalhao";
    document.querySelectorAll(SEL).forEach(function(i) {
      if (i.closest("#etuAparencia")) return;
      if (!i.dataset.orig && i.getAttribute("src") && i.getAttribute("src") !== "brasao-redondo.webp") i.dataset.orig = i.getAttribute("src");
      var alvo = med ? "brasao-redondo.webp" : i.dataset.orig || i.getAttribute("src");
      if (alvo && i.getAttribute("src") !== alvo) i.setAttribute("src", alvo);
    });
  }
  window.etuAplicaAparencia = function() {
    aplicaTema();
    aplicaBrasao();
  };
  aplicaTema();
  var GRUPOS = { 1: "Clássicas", 2: "Tons femininos e vivos", 3: "Tons sóbrios e profundos" };
  function escudoSrc() {
    var i = document.querySelector("img.crest");
    return i && (i.dataset.orig || i.getAttribute("src")) || "brasao-redondo.webp";
  }
  function folha(titulo, html, montar) {
    var o = document.createElement("div");
    o.className = "ap-folha";
    o.setAttribute("role", "dialog");
    o.setAttribute("aria-modal", "true");
    o.setAttribute("aria-label", titulo);
    o.innerHTML = '<div class="ap-caixa"><div class="ap-topo"><b>' + titulo + '</b><button type="button" class="ap-x" aria-label="Fechar">✕</button></div><div class="ap-corpo">' + html + '</div><div class="ap-pe"><button type="button" class="btn btn-gold" data-ok>Pronto</button></div></div>';
    document.body.appendChild(o);
    var f = function() {
      o.remove();
      document.removeEventListener("keydown", k);
    }, k = function(e) {
      if (e.key === "Escape") f();
    };
    o.addEventListener("click", function(e) {
      if (e.target === o || e.target.closest(".ap-x,[data-ok]")) f();
    });
    document.addEventListener("keydown", k);
    montar(o);
    var b = o.querySelector(".ap-x");
    if (b) b.focus({ preventScroll: true });
  }
  function abreCores(cb) {
    var h = "";
    [1, 2, 3].forEach(function(g) {
      h += '<p class="ap-g">' + GRUPOS[g] + '</p><div class="ap-grade">' + Object.keys(TEMAS).filter(function(k) {
        return TEMAS[k].g === g;
      }).map(function(k) {
        var t = TEMAS[k];
        return '<button type="button" data-tema="' + k + '"><span style="background:linear-gradient(135deg,' + t.c[0] + "," + t.c[2] + ')"></span>' + t.n + "</button>";
      }).join("") + "</div>";
    });
    folha("Opções de cores", h, function(o) {
      function m() {
        var tm = ler("etu_tema", "azul");
        o.querySelectorAll("[data-tema]").forEach(function(b) {
          b.setAttribute("aria-pressed", b.dataset.tema === tm);
        });
      }
      o.querySelectorAll("[data-tema]").forEach(function(b) {
        b.onclick = function() {
          grava("etu_tema", b.dataset.tema);
          aplicaTema();
          m();
          cb && cb();
        };
      });
      m();
    });
  }
  function abreBrasao(cb) {
    folha("Estilo do brasão", '<div class="ap-brs"><button type="button" data-br="medalhao"><img src="brasao-redondo.webp" alt="">Medalhão</button><button type="button" data-br="escudo"><img src="' + escudoSrc() + '" alt="">Escudo</button></div>', function(o) {
      function m() {
        var br = ler("etu_brasao", "medalhao");
        o.querySelectorAll("[data-br]").forEach(function(b) {
          b.setAttribute("aria-pressed", b.dataset.br === br);
        });
      }
      o.querySelectorAll("[data-br]").forEach(function(b) {
        b.onclick = function() {
          grava("etu_brasao", b.dataset.br);
          aplicaBrasao();
          m();
          cb && cb();
        };
      });
      m();
    });
  }
  window.etuAp = { cores: abreCores, brasao: abreBrasao, folha, brilho: function(v) {
    grava("etu_brilho", v);
    aplicaTema();
  }, ler, grava, nomeTema: function() {
    return (TEMAS[ler("etu_tema", "azul")] || TEMAS.azul).n;
  } };
  function painel() {
    var v = document.querySelector('[data-view="mais"] .wrap');
    if (!v || document.getElementById("etuAparencia")) return;
    var d = document.createElement("div");
    d.id = "etuAparencia";
    d.className = "panel";
    d.style.cssText = "margin-top:18px;color:#1B2238;background:#FFFDF6";
    d.innerHTML = '<h3 style="margin:0 0 4px">Aparência do aplicativo</h3><p style="margin:0 0 14px;font-size:15.5px;color:#5b6070">Escolha a cor e o brasão do seu jeito. Vale só para este aparelho.</p><div class="ap-atual"><img id="apBr" alt=""><div><small>ESCOLHA ATUAL</small><b id="apNome"></b><span id="apNome2"></span></div><i id="apCor"></i></div><div class="ap-bts"><button type="button" class="btn btn-gold btn-sm" id="apBtCor"><i class="ap-roda"></i>Opções de cores</button><button type="button" class="btn btn-line btn-sm" id="apBtBr" style="color:#1B2238">Estilo do brasão</button></div><p style="margin:16px 0 8px;font-weight:600;color:#1B2238">Brilho da tela</p><div class="ap-seg"><button type="button" data-bri="suave">Suave</button><button type="button" data-bri="normal">Normal</button><button type="button" data-bri="intenso">Intenso</button></div><p style="margin:12px 0 0;font-size:14px;color:#5b6070">Certificados e carteirinhas mantêm sempre o padrão oficial da escola.</p>';
    v.appendChild(d);
    function marca() {
      var tm = ler("etu_tema", "azul"), t = TEMAS[tm] || TEMAS.azul, med = ler("etu_brasao", "medalhao") === "medalhao";
      d.querySelector("#apBr").src = med ? "brasao-redondo.webp" : escudoSrc();
      d.querySelector("#apNome").textContent = "Cor " + t.n;
      d.querySelector("#apNome2").textContent = "Brasão " + (med ? "Medalhão" : "Escudo");
      d.querySelector("#apCor").style.background = "linear-gradient(135deg," + t.c[0] + "," + t.c[2] + ")";
      var bri = ler("etu_brilho", "normal");
      d.querySelectorAll("[data-bri]").forEach(function(b) {
        b.setAttribute("aria-pressed", b.dataset.bri === bri);
      });
    }
    d.querySelector("#apBtCor").onclick = function() {
      abreCores(marca);
    };
    d.querySelector("#apBtBr").onclick = function() {
      abreBrasao(marca);
    };
    var __velho1 = function() {
      var h = "";
      [1, 2, 3].forEach(function(g) {
        h += '<p class="ap-g">' + GRUPOS[g] + '</p><div class="ap-grade">' + Object.keys(TEMAS).filter(function(k) {
          return TEMAS[k].g === g;
        }).map(function(k) {
          var t = TEMAS[k];
          return '<button type="button" data-tema="' + k + '"><span style="background:linear-gradient(135deg,' + t.c[0] + "," + t.c[2] + ')"></span>' + t.n + "</button>";
        }).join("") + "</div>";
      });
      folha("Opções de cores", h, function(o) {
        function m() {
          var tm = ler("etu_tema", "azul");
          o.querySelectorAll("[data-tema]").forEach(function(b) {
            b.setAttribute("aria-pressed", b.dataset.tema === tm);
          });
        }
        o.querySelectorAll("[data-tema]").forEach(function(b) {
          b.onclick = function() {
            grava("etu_tema", b.dataset.tema);
            aplicaTema();
            m();
            marca();
          };
        });
        m();
      });
    };
    var __velho2 = function() {
      folha("Estilo do brasão", '<div class="ap-brs"><button type="button" data-br="medalhao"><img src="brasao-redondo.webp" alt="">Medalhão</button><button type="button" data-br="escudo"><img src="' + escudoSrc() + '" alt="">Escudo</button></div>', function(o) {
        function m() {
          var br = ler("etu_brasao", "medalhao");
          o.querySelectorAll("[data-br]").forEach(function(b) {
            b.setAttribute("aria-pressed", b.dataset.br === br);
          });
        }
        o.querySelectorAll("[data-br]").forEach(function(b) {
          b.onclick = function() {
            grava("etu_brasao", b.dataset.br);
            aplicaBrasao();
            m();
            marca();
          };
        });
        m();
      });
    };
    d.querySelectorAll("[data-bri]").forEach(function(b) {
      b.onclick = function() {
        grava("etu_brilho", b.dataset.bri);
        aplicaTema();
        marca();
      };
    });
    marca();
    if (window.etuLicoesMonta) window.etuLicoesMonta(v);
    var app = document.getElementById("etuApp");
    if (app) v.appendChild(app);
  }
  function tudo() {
    aplicaBrasao();
    if (location.hash === "#mais") painel();
  }
  addEventListener("load", function() {
    setTimeout(tudo, 300);
    setTimeout(aplicaBrasao, 1500);
  });
  addEventListener("hashchange", function() {
    setTimeout(tudo, 250);
  });
  try {
    new MutationObserver(function() {
      clearTimeout(tudo.t);
      tudo.t = setTimeout(aplicaBrasao, 120);
    }).observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) {
  }
})();
function etuFechKey(m) {
  return "etu_fech_" + m;
}
function etuMesAnterior() {
  const d = /* @__PURE__ */ new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() - 1);
  return d.toISOString().slice(0, 7);
}
function etuFechStatus(m) {
  try {
    return JSON.parse(localStorage.getItem(etuFechKey(m)) || "{}");
  } catch (e) {
    return {};
  }
}
function etuFechGrava(m, o) {
  try {
    localStorage.setItem(etuFechKey(m), JSON.stringify(Object.assign(etuFechStatus(m), o)));
  } catch (e) {
  }
}
function etuDasPago(L, m) {
  const x = (L || []).find((l) => l.tipo === "saida" && (l.documento || "").trim() === "DAS " + m);
  if (x) return fmtDate(x.data);
  return etuFechStatus(m).das || "";
}
function etuDasn(anoRef) {
  const d = (window.etuDasnL || []).find((x) => +x.ano_ref === +anoRef);
  if (d) return d;
  const v = etuFechStatus(String(+anoRef + 1)).dasn;
  return v ? { ano_ref: +anoRef, enviada_em: null, legado: v } : null;
}
function etuDiasPara(iso) {
  const a = /* @__PURE__ */ new Date(today() + "T12:00:00"), b = /* @__PURE__ */ new Date((iso || today()) + "T12:00:00");
  return Math.round((b - a) / 864e5);
}
function etuPendencias(L) {
  L = L || window.etuCxL || [];
  const hoje = /* @__PURE__ */ new Date(), dia = hoje.getDate(), ant = etuMesAnterior(), nm = MESES[+ant.slice(5) - 1] + " de " + ant.slice(0, 4), out = [];
  if (!etuDasPago(L, ant)) out.push({ t: "Pagar e registrar o DAS do MEI de " + nm, p: dia <= 20 ? "vence no dia 20; faltam " + (20 - dia) + " dia(s)" : "atrasado: emita a guia nova, com juros, no aplicativo MEI" });
  const anoRef = hoje.getFullYear() - 1;
  if (!etuDasn(anoRef) && anoRef >= 2025) out.push({ t: "Enviar a Declaração Anual do MEI (DASN-SIMEI) do ano de " + anoRef, p: hoje.getMonth() <= 4 ? "prazo até 31 de maio" : "atrasada: o prazo era 31 de maio; envie já, a multa aumenta com o tempo" });
  (window.etuContas || []).filter((c) => c.status !== "pago").forEach((c) => {
    const d = etuDiasPara(c.vencimento);
    if (d < 0) out.push({ t: "Pagar " + (c.tipo || "boleto").toLowerCase() + ": " + c.descricao + " (" + brl(numBR(c.valor)) + ")", p: "venceu em " + fmtDate(c.vencimento) + ", há " + -d + " dia(s)" });
    else if (d <= 5) out.push({ t: "Pagar " + (c.tipo || "boleto").toLowerCase() + ": " + c.descricao + " (" + brl(numBR(c.valor)) + ")", p: d === 0 ? "vence hoje" : "vence em " + fmtDate(c.vencimento) + "; faltam " + d + " dia(s)" });
  });
  return out;
}
function etuFechamento(P, L) {
  window.etuCxL = L;
  const ant = etuMesAnterior(), nm = (k) => MESES[+k.slice(5) - 1] + " de " + k.slice(0, 4), st = etuFechStatus(ant), pend = etuPendencias(L), ano = String((/* @__PURE__ */ new Date()).getFullYear());
  const d = document.createElement("div");
  d.className = "cx-sec";
  d.id = "etuContador";
  d.style.cssText = "border:2px solid #C9A24A;border-radius:12px;padding:16px 18px;background:#FFFDF6;color:#1B2238;margin-bottom:18px";
  d.innerHTML = `<h4 style="margin:0 0 6px">Contador da Direção</h4>
   <p style="margin:0 0 10px;font-size:15.5px;color:#4a4f5e">Lembretes das obrigações do MEI e fechamento mensal do caixa. Os relatórios saem prontos para salvar em PDF (no celular: Compartilhar → Imprimir → Salvar como PDF).</p>
   ${pend.length ? `<div style="background:#FBEFEF;border:1px solid #E0B4B4;border-radius:10px;padding:10px 14px;margin-bottom:12px"><b style="color:#7A1B2B">Pendências agora</b><ul style="margin:6px 0 0;padding-left:20px">${pend.map((x) => `<li>${esc(x.t)} <i>(${esc(x.p)})</i></li>`).join("")}</ul></div>` : `<div style="background:#EAF5EC;border:1px solid #A7D3B1;border-radius:10px;padding:10px 14px;margin-bottom:12px"><b style="color:#1E5E33">Tudo em dia.</b> O relatório de ${esc(nm(ant))} está pronto e o DAS está registrado como pago.</div>`}
   <div style="display:grid;gap:10px">
    <div style="border:1px solid #E1D4B2;border-radius:10px;padding:12px 14px;background:#fff"><b>1. Relatório Mensal de ${esc(nm(ant))}</b> — <span class="pill on">Pronto automaticamente</span>
      <p style="margin:6px 0 8px;font-size:15px">A plataforma monta sozinha o Relatório Mensal das Receitas Brutas com as entradas do caixa. Receita de ${esc(nm(ant))}: <b>${brl(L.filter((l) => l.tipo === "entrada" && (l.data || "").startsWith(ant)).reduce((x, l) => x + numBR(l.valor), 0))}</b>${L.some((l) => l.tipo === "entrada" && (l.data || "").startsWith(ant)) ? "" : " (mês sem vendas: o relatório sai com R$ 0,00, e isso está correto)"}. Salve o PDF e guarde por 5 anos.</p>
      <div class="res"><button class="btn btn-gold btn-sm" type="button" id="fechGerar">Salvar o relatório em PDF</button></div></div>
    <div style="border:1px solid #E1D4B2;border-radius:10px;padding:12px 14px;background:#fff"><b>2. DAS do MEI de ${esc(nm(ant))}</b> — ${etuDasPago(L, ant) ? `<span class="pill on">Pago (${esc(etuDasPago(L, ant))})</span>` : `<span class="pill lock">${(/* @__PURE__ */ new Date()).getDate() > 20 ? "Atrasado" : "A pagar até o dia 20"}</span>`}
      ${etuDasPago(L, ant) ? '<p style="margin:6px 0 0;font-size:15px">Pagamento registrado no caixa. O comprovante deve ser guardado.</p>' : `<p style="margin:6px 0 8px;font-size:15px">O DAS é pago todo mês, mesmo sem vendas. Emita a guia no aplicativo MEI ou no Portal do Empreendedor${(/* @__PURE__ */ new Date()).getDate() > 20 ? " (como venceu, gere a guia nova: ela já vem com juros e multa)" : ""}. Depois de pagar, informe o valor abaixo: a plataforma lança a saída no caixa e dá baixa na pendência num toque só.</p>
      <div class="grid2"><div><label for="dasValor">Valor pago (R$)</label><input id="dasValor" inputmode="decimal" placeholder="0,00"></div><div><label for="dasData">Data do pagamento</label><input id="dasData" type="date" value="${today()}"></div></div>
      <label for="dasArq">Comprovante do pagamento (foto ou PDF)</label><input id="dasArq" type="file" accept="application/pdf,image/*">
      <div class="msg hidden" id="mDas"></div>
      <div class="res"><button class="btn btn-gold btn-sm" type="button" id="dasReg">Registrar pagamento do DAS</button><a class="btn btn-line btn-sm" href="https://www.gov.br/empresas-e-negocios/pt-br/empreendedor" target="_blank" rel="noopener">Abrir o Portal do Empreendedor</a></div>
      <p style="margin:8px 0 0;font-size:14px;color:#5b6070">Dica: no aplicativo MEI dá para cadastrar o débito automático do DAS.</p>`}</div>
    <div style="border:1px solid #E1D4B2;border-radius:10px;padding:12px 14px;background:#fff"><b>Quadro do ano de ${ano}</b>
      <div style="display:flex;flex-direction:column;gap:6px;margin-top:8px">
      ${[...Array((/* @__PURE__ */ new Date()).getMonth() + 1)].map((_, i) => {
    const k = ano + "-" + String(i + 1).padStart(2, "0"), rec = L.filter((l) => l.tipo === "entrada" && (l.data || "").startsWith(k)).reduce((x, l) => x + numBR(l.valor), 0), pg = etuDasPago(L, k), atual = i === (/* @__PURE__ */ new Date()).getMonth();
    return `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;border:1px solid #eee;border-radius:8px;padding:8px 10px;font-size:15px"><b style="flex:1 1 90px">${MESES[i]}</b><span style="flex:0 0 auto">${brl(rec)}</span><span style="flex:1 1 100%;display:flex;gap:8px;align-items:center;flex-wrap:wrap">${atual ? '<span style="color:#5b6070;font-size:14px">DAS vence no dia 20 do mês seguinte</span>' : pg ? '<span style="color:#1F6B45;font-weight:700">✓ DAS pago</span>' : `<button class="btn btn-line btn-sm" type="button" data-dasm="${k}">Registrar DAS</button>`}<button class="btn btn-line btn-sm" type="button" data-relm="${k}">Relatório PDF</button></span></div>`;
  }).join("")}
      </div><p style="margin:8px 0 0;font-size:14px;color:#5b6070">Os pagamentos do DAS ficam guardados no caixa da escola e aparecem em qualquer aparelho em que a Direção entrar.</p></div>
    <div style="border:1px solid #E1D4B2;border-radius:10px;padding:12px 14px;background:#fff" id="etuDasnCard"></div>
    <div style="border:1px solid #E1D4B2;border-radius:10px;padding:12px 14px;background:#fff"><b>4. Nota fiscal</b>
      <p style="margin:6px 0 0;font-size:15px">O MEI emite nota fiscal de serviço quando o pagador é empresa (CNPJ) ou quando o aluno pedir. Ao lançar uma entrada com nota, escreva no campo Documento o número começando por “NF” (ex.: NF 123); o relatório separa sozinho as receitas com e sem nota.</p></div>
    <div style="border:1px solid #E1D4B2;border-radius:10px;padding:12px 14px;background:#fff" id="etuArqComp"><b>5. Arquivo de comprovantes</b>
      <p style="margin:6px 0 8px;font-size:15px">Todos os comprovantes anexados aos lançamentos, guardados na plataforma e organizados por ano e mês. Para anexar: ao fazer um lançamento novo, escolha o arquivo no campo “Comprovante”; para um lançamento já feito, toque em “Anexar comprovante” na lista do mês. Guarde por 5 anos.</p>
      <div style="display:flex;gap:10px;align-items:end;flex-wrap:wrap"><div><label for="arqAno">Ano</label><select id="arqAno">${[...new Set([ano].concat(L.map((l) => (l.data || "").slice(0, 4)).filter(Boolean)))].sort().reverse().map((a) => `<option ${a === ano ? "selected" : ""}>${a}</option>`).join("")}</select></div></div>
      <div id="arqLista" style="margin-top:10px"></div></div>
    <div style="border:1px solid #E1D4B2;border-radius:10px;padding:12px 14px;background:#fff" id="etuContas"><b>6. Boletos e guias a pagar</b>
      <div id="ctBox" style="margin-top:8px"></div></div>
   </div>
   <p style="margin:12px 0 0;font-size:14px;color:#5b6070">Os pagamentos do DAS ficam registrados no caixa da escola; a marcação da declaração anual fica neste aparelho. Os prazos seguem as regras atuais do MEI; confirme sempre no Portal do Empreendedor ou com um contador.</p>`;
  P.insertBefore(d, P.children[2] || null);
  const ent = (arr) => arr.filter((l) => l.tipo === "entrada"), sum = (a) => a.reduce((x, l) => x + numBR(l.valor), 0), comNF = (l) => /^\s*NF/i.test(l.documento || "");
  function relMes(m) {
    const E = ent(L.filter((l) => (l.data || "").startsWith(m))), S2 = L.filter((l) => (l.data || "").startsWith(m) && l.tipo === "saida");
    const sem = sum(E.filter((l) => !comNF(l))), com = sum(E.filter(comNF));
    const w = window.open("", "_blank");
    if (!w) return false;
    w.document.write(`<html><head><title>Relatório Mensal ${nm(m)}</title><style>body{font-family:Georgia,serif;color:#1b2340;margin:28px;font-size:14px}h1{font-size:18px;margin:0}h2{font-size:15px;margin:22px 0 6px;border-bottom:1px solid #C9A24A}table{width:100%;border-collapse:collapse}td,th{border:1px solid #ccc;padding:6px 8px;text-align:left}.r{text-align:right}.tot{font-weight:bold;background:#f4efe2}</style></head><body>
     <h1>ESCOLA TEOLÓGICA UNIÃO</h1><div>CNPJ 59.037.548/0001-59 · Cristalina, Goiás · Microempreendedor Individual</div>
     <h2>Relatório Mensal das Receitas Brutas — período de apuração: ${nm(m)}</h2>
     <table><tr><th>Receita bruta mensal — prestação de serviços</th><th class="r">Valor</th></tr>
     <tr><td>Receita com dispensa de emissão de documento fiscal</td><td class="r">${brl(sem)}</td></tr>
     <tr><td>Receita com documento fiscal emitido</td><td class="r">${brl(com)}</td></tr>
     <tr class="tot"><td>Total das receitas de prestação de serviços</td><td class="r">${brl(sem + com)}</td></tr></table>
     <h2>Entradas do mês</h2><table><tr><th>Data</th><th>Categoria</th><th>Descrição</th><th>Documento</th><th class="r">Valor</th></tr>${E.sort((a, b) => a.data < b.data ? -1 : 1).map((l) => `<tr><td>${fmtDate(l.data)}</td><td>${esc(l.categoria || "")}</td><td>${esc(l.descricao || "")}</td><td>${esc(l.documento || "")}</td><td class="r">${brl(numBR(l.valor))}</td></tr>`).join("") || '<tr><td colspan="5">Sem entradas no mês.</td></tr>'}</table>
     <h2>Saídas do mês (controle interno)</h2><table><tr><th>Data</th><th>Categoria</th><th>Descrição</th><th class="r">Valor</th></tr>${S2.sort((a, b) => a.data < b.data ? -1 : 1).map((l) => `<tr><td>${fmtDate(l.data)}</td><td>${esc(l.categoria || "")}</td><td>${esc(l.descricao || "")}</td><td class="r">${brl(numBR(l.valor))}</td></tr>`).join("") || '<tr><td colspan="4">Sem saídas no mês.</td></tr>'}</table>
     <p style="margin-top:14px">Resultado do mês (entradas menos saídas): <b>${brl(sum(E) - sum(S2))}</b></p>
     <p style="margin-top:30px">Local e data: Cristalina, Goiás, ${dataExtenso(/* @__PURE__ */ new Date())}.</p>
     <p style="margin-top:40px">______________________________<br>Pr. Charlei de Jesus Lima Dias — Empresário / Diretor Geral</p>
     <p style="font-size:12px;color:#555;margin-top:20px">Guardar este relatório por 5 anos, com os comprovantes de recebimento e as notas fiscais emitidas e recebidas.</p></body></html>`);
    w.document.close();
    w.print();
    return true;
  }
  $("#fechGerar").onclick = () => {
    if (relMes(ant)) etuFechGrava(ant, { fechado: (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR") });
  };
  d.querySelectorAll("[data-relm]").forEach((b) => b.onclick = () => relMes(b.dataset.relm));
  async function regDas(m, valor, data, msg, arq) {
    const v = numBR(valor);
    if (!(v > 0)) {
      if (msg) show(msg, "Digite o valor pago, como está no comprovante.", "err");
      return;
    }
    try {
      let anexo = null;
      if (arq) {
        if (msg) show(msg, "Enviando o comprovante…", "ok");
        anexo = await etuEnviarComprovante(arq, (data || today()).slice(0, 7));
      }
      const reg = { tipo: "saida", data: data || today(), categoria: "Impostos e taxas", descricao: "DAS do MEI — competência " + nm(m), valor: v, forma: "Pix", documento: "DAS " + m };
      if (anexo) reg.anexo = anexo;
      await API.salvarLancamento(reg);
      etuFechGrava(m, { das: fmtDate(data || today()) });
      drawContab();
    } catch (e) {
      if (msg) show(msg, e.message, "err");
      else alert(e.message);
    }
  }
  const dr = $("#dasReg");
  if (dr) dr.onclick = () => {
    dr.disabled = true;
    regDas(ant, $("#dasValor").value, $("#dasData").value, $("#mDas"), $("#dasArq") && $("#dasArq").files[0]).finally(() => {
      dr.disabled = false;
    });
  };
  function arqLista() {
    const a = $("#arqAno").value, box = $("#arqLista");
    const C = L.filter((l) => l.anexo && (l.data || "").startsWith(a)).sort((x, y) => x.data < y.data ? 1 : -1);
    const sem = L.filter((l) => !l.anexo && l.tipo === "saida" && (l.data || "").startsWith(a)).length;
    let h = sem ? `<p style="margin:0 0 8px;font-size:14.5px;color:#7A1B2B">${sem} saída(s) de ${a} ainda sem comprovante anexado. Abra o mês na lista de lançamentos e toque em “Anexar comprovante”.</p>` : "";
    if (!C.length) {
      box.innerHTML = h + '<p style="margin:0;color:#5b6070">Nenhum comprovante anexado em ' + a + ".</p>";
      return;
    }
    const porMes = {};
    C.forEach((l) => {
      const k = l.data.slice(0, 7);
      (porMes[k] = porMes[k] || []).push(l);
    });
    h += Object.keys(porMes).sort().reverse().map((k) => `<details ${k === today().slice(0, 7) ? "open" : ""} style="border:1px solid #eee;border-radius:8px;padding:8px 10px;margin-bottom:6px"><summary style="cursor:pointer;font-weight:700">${MESES[+k.slice(5) - 1]} — ${porMes[k].length} comprovante(s)</summary>
      ${porMes[k].map((l) => `<div style="display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;border-top:1px solid #f0f0f0;padding:7px 0;font-size:15px"><span style="flex:1 1 180px">${fmtDate(l.data)} · <b>${l.tipo === "entrada" ? "Entrada" : "Saída"}</b> · ${esc(l.categoria || "")}<br><span style="color:#5b6070;font-size:14px">${esc(l.descricao || "")}</span></span><b>${brl(numBR(l.valor))}</b><button class="btn btn-navy btn-sm" type="button" data-arqver="${esc(l.anexo)}">Abrir</button></div>`).join("")}</details>`).join("");
    box.innerHTML = h;
    box.querySelectorAll("[data-arqver]").forEach((b) => b.onclick = () => etuAbrirComprovante(b.dataset.arqver));
  }
  $("#arqAno").onchange = arqLista;
  arqLista();
  etuContasDesenha(L, nm);
  d.querySelectorAll("[data-dasm]").forEach((b) => b.onclick = () => {
    const v = prompt("Valor pago do DAS de " + nm(b.dataset.dasm) + " (R$):");
    if (v === null) return;
    const dt = prompt("Data do pagamento (dia/mês/ano):", (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR"));
    if (dt === null) return;
    const q = dt.split("/");
    const iso = q.length === 3 ? q[2] + "-" + q[1].padStart(2, "0") + "-" + q[0].padStart(2, "0") : today();
    regDas(b.dataset.dasm, v, iso, null);
  });
  (function dasnCard() {
    const box = $("#etuDasnCard");
    if (!box) return;
    const hoje = /* @__PURE__ */ new Date(), ref = hoje.getFullYear() - 1, d2 = etuDasn(ref), hist = (window.etuDasnL || []).filter((x) => +x.ano_ref !== ref).sort((a, b) => b.ano_ref - a.ano_ref);
    const atras = !d2 && hoje.getMonth() > 4;
    box.innerHTML = `<b>3. Declaração anual do MEI (DASN-SIMEI) — ano de ${ref}</b> ${d2 ? `<span class="pill on">Em dia</span>` : atras ? '<span class="pill off">Atrasada</span>' : '<span class="pill lock">Até 31 de maio</span>'}
      ${d2 ? `<div style="background:#EAF5EC;border:1px solid #A7D3B1;border-radius:10px;padding:10px 14px;margin:8px 0"><b style="color:#1E5E33">✓ Declaração do ano de ${ref} enviada${d2.enviada_em ? " em " + fmtDate(d2.enviada_em) : d2.legado ? " em " + esc(d2.legado) : ""}.</b><div style="font-size:14.5px;margin-top:2px">Obrigação cumprida. A próxima será a do ano de ${ref + 1}, de 1º de janeiro a 31 de maio de ${ref + 2}.</div>
        <div class="res" style="margin-top:6px">${d2.recibo ? '<button class="btn btn-navy btn-sm" type="button" id="dasnVer">Ver recibo da declaração</button>' : '<button class="btn btn-line btn-sm" type="button" id="dasnAnexar">Anexar recibo da declaração</button>'}<button class="btn btn-line btn-sm" type="button" id="dasnDesf">Desfazer</button></div></div>` : `<p style="margin:6px 0 8px;font-size:15px">Uma vez por ano, de janeiro até 31 de maio, informe no Portal do Empreendedor o faturamento total do ano anterior. O botão “Gerar resumo” soma os 12 meses do caixa para facilitar. Depois de enviar, registre aqui com o recibo: o aviso some e o quadro fica verde.</p>
        <div class="grid2"><div><label for="dasnData">Data do envio</label><input id="dasnData" type="date" value="${today()}"></div><div><label for="dasnArq">Recibo da declaração (PDF ou foto)</label><input id="dasnArq" type="file" accept="application/pdf,image/*"></div></div>
        <div class="msg hidden" id="mDasn"></div><div class="res"><button class="btn btn-gold btn-sm" type="button" id="dasnReg">Registrar declaração enviada</button><a class="btn btn-line btn-sm" href="https://www.gov.br/empresas-e-negocios/pt-br/empreendedor" target="_blank" rel="noopener">Abrir o Portal do Empreendedor</a></div>`}
      <div class="res" style="margin-top:6px"><button class="btn btn-line btn-sm" type="button" id="fechAno">Gerar resumo do ano de ${ref}</button></div>
      ${hist.length ? `<div style="margin-top:8px;font-size:14.5px"><b>Declarações anteriores:</b> ${hist.map((h) => `${h.ano_ref} ✓${h.recibo ? ` <a href="#" data-dasnrec="${h.ano_ref}">recibo</a>` : ""}`).join(" · ")}</div>` : ""}
      ${CX.dasnErro ? `<p style="margin:6px 0 0;font-size:13.5px;color:#7A1B2B">Para guardar a declaração no banco de dados, rode o arquivo 12_declaracao_mei.sql no Supabase.</p>` : ""}`;
    const reg = $("#dasnReg");
    if (reg) reg.onclick = async () => {
      const m = $("#mDasn");
      reg.disabled = true;
      try {
        const f = $("#dasnArq").files && $("#dasnArq").files[0];
        let rec = null;
        if (f) {
          show(m, "Enviando o recibo…", "ok");
          rec = await etuEnviarComprovante(f, ($("#dasnData").value || today()).slice(0, 7));
        }
        await API.salvarDeclaracaoMei({ ano_ref: ref, enviada_em: $("#dasnData").value || today(), recibo: rec });
        drawContab();
      } catch (e) {
        reg.disabled = false;
        show(m, e.message, "err");
      }
    };
    const ver = $("#dasnVer");
    if (ver) ver.onclick = () => etuAbrirComprovante(d2.recibo);
    const an = $("#dasnAnexar");
    if (an) an.onclick = () => etuPedirArquivo(async (f) => {
      an.disabled = true;
      an.textContent = "Enviando…";
      try {
        const rec = await etuEnviarComprovante(f, today().slice(0, 7));
        await API.salvarDeclaracaoMei({ ano_ref: ref, enviada_em: d2.enviada_em || today(), recibo: rec });
        drawContab();
      } catch (e) {
        alert(e.message);
        an.disabled = false;
        an.textContent = "Anexar recibo da declaração";
      }
    });
    const des = $("#dasnDesf");
    if (des) des.onclick = () => confirmBox("Desfazer o registro da declaração de " + ref + "?", async () => {
      try {
        await API.apagarDeclaracaoMei(ref);
      } catch (e) {
      }
      etuFechGrava(String(ref + 1), { dasn: "" });
      drawContab();
    });
    box.querySelectorAll("[data-dasnrec]").forEach((a) => a.onclick = (e) => {
      e.preventDefault();
      const h = hist.find((x) => String(x.ano_ref) === a.dataset.dasnrec);
      if (h && h.recibo) etuAbrirComprovante(h.recibo);
    });
  })();
  $("#fechAno").onclick = () => {
    const a = String(+ano - 1);
    const E = ent(L.filter((l) => (l.data || "").startsWith(a)));
    const w = window.open("", "_blank");
    if (!w) return;
    const ms = [...Array(12)].map((_, i) => {
      const k = a + "-" + String(i + 1).padStart(2, "0");
      const x = E.filter((l) => l.data.startsWith(k));
      return [k, sum(x.filter((l) => !comNF(l))), sum(x.filter(comNF))];
    });
    const tS = ms.reduce((x, m) => x + m[1], 0), tC = ms.reduce((x, m) => x + m[2], 0);
    w.document.write(`<html><head><title>Resumo anual ${a}</title><style>body{font-family:Georgia,serif;color:#1b2340;margin:28px;font-size:14px}h1{font-size:18px;margin:0}table{width:100%;border-collapse:collapse;margin-top:14px}td,th{border:1px solid #ccc;padding:6px 8px}.r{text-align:right}.tot{font-weight:bold;background:#f4efe2}</style></head><body>
     <h1>ESCOLA TEOLÓGICA UNIÃO</h1><div>CNPJ 59.037.548/0001-59 · Resumo para a Declaração Anual do MEI (DASN-SIMEI) — ano ${a}</div>
     <table><tr><th>Mês</th><th class="r">Sem nota fiscal</th><th class="r">Com nota fiscal</th><th class="r">Total</th></tr>${ms.map((m) => `<tr><td>${MESES[+m[0].slice(5) - 1]}</td><td class="r">${brl(m[1])}</td><td class="r">${brl(m[2])}</td><td class="r">${brl(m[1] + m[2])}</td></tr>`).join("")}
     <tr class="tot"><td>Total do ano</td><td class="r">${brl(tS)}</td><td class="r">${brl(tC)}</td><td class="r">${brl(tS + tC)}</td></tr></table>
     <p style="margin-top:14px">Na declaração, informe o total do ano como receita bruta de <b>prestação de serviços</b>. Se houve funcionário registrado, informe também.</p></body></html>`);
    w.document.close();
    w.print();
  };
}
const CT = { verPagos: false, pagando: null };
function etuContasDesenha(L, nm) {
  const box = $("#ctBox");
  if (!box) return;
  if (window.etuContas === null) {
    box.innerHTML = `<p style="margin:0;font-size:15px;color:#7A1B2B">Esta parte ainda precisa ser ativada no banco de dados${CX.contasErro ? " (" + esc(CX.contasErro) + ")" : ""}. Rode o arquivo 11_contas_pagar.sql no Supabase.</p>`;
    return;
  }
  const C = window.etuContas || [], abertas = C.filter((c) => c.status !== "pago").sort((a, b) => a.vencimento < b.vencimento ? -1 : 1), pagas = C.filter((c) => c.status === "pago").sort((a, b) => (a.pago_em || "") < (b.pago_em || "") ? 1 : -1);
  const venc = abertas.filter((c) => etuDiasPara(c.vencimento) < 0), prox = abertas.filter((c) => {
    const d = etuDiasPara(c.vencimento);
    return d >= 0 && d <= 5;
  });
  const totAb = abertas.reduce((x, c) => x + numBR(c.valor), 0);
  const selo = (c) => {
    if (c.status === "pago") return `<span style="background:#E3F3E7;color:#1E5E33;border:1px solid #A7D3B1;border-radius:999px;padding:2px 10px;font-size:13.5px;font-weight:700">✓ Pago em ${fmtDate(c.pago_em)}</span>`;
    const d = etuDiasPara(c.vencimento);
    if (d < 0) return `<span style="background:#FBEFEF;color:#7A1B2B;border:1px solid #E0B4B4;border-radius:999px;padding:2px 10px;font-size:13.5px;font-weight:700">Vencido há ${-d} dia(s)</span>`;
    if (d === 0) return `<span style="background:#FBEFEF;color:#7A1B2B;border:1px solid #E0B4B4;border-radius:999px;padding:2px 10px;font-size:13.5px;font-weight:700">Vence hoje</span>`;
    if (d <= 5) return `<span style="background:#FFF4DC;color:#7A5410;border:1px solid #E6C98A;border-radius:999px;padding:2px 10px;font-size:13.5px;font-weight:700">Vence em ${d} dia(s)</span>`;
    return `<span style="background:#EEF2F8;color:#1B2B4B;border:1px solid #C9D3E3;border-radius:999px;padding:2px 10px;font-size:13.5px;font-weight:700">Em aberto · vence ${fmtDate(c.vencimento)}</span>`;
  };
  const cor = (c) => {
    if (c.status === "pago") return "#2E7D4F";
    const d = etuDiasPara(c.vencimento);
    return d <= 0 ? "#9B2A22" : d <= 5 ? "#C9A24A" : "#1B2B4B";
  };
  const item = (c) => `<div style="border:1px solid #E8E1CF;border-left:5px solid ${cor(c)};border-radius:10px;padding:10px 12px;margin-bottom:8px;background:${c.status === "pago" ? "#F6FBF7" : "#fff"}">
     <div style="display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center"><b style="flex:1 1 160px;font-size:15.5px">${esc(c.descricao)}</b><b style="font-size:16px">${brl(numBR(c.status === "pago" && c.valor_pago ? c.valor_pago : c.valor))}</b></div>
     <div style="font-size:14px;color:#5b6070;margin:3px 0 6px">${esc(c.tipo || "Boleto")}${c.competencia ? " · competência " + esc(nm(c.competencia)) : ""} · ${esc(c.categoria || "")} · vencimento ${fmtDate(c.vencimento)}</div>
     <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center">${selo(c)}
      ${c.boleto ? `<button class="btn btn-line btn-sm" type="button" data-ctbol="${esc(c.id)}">Ver ${c.tipo && c.tipo.startsWith("Guia") ? "guia" : "boleto"}</button>` : ""}
      ${c.codigo && c.status !== "pago" ? `<button class="btn btn-line btn-sm" type="button" data-ctcod="${esc(c.id)}">Copiar código</button>` : ""}
      ${c.status === "pago" ? c.comprovante ? `<button class="btn btn-navy btn-sm" type="button" data-ctcomp="${esc(c.id)}">Ver comprovante</button>` : "" : `<button class="btn btn-gold btn-sm" type="button" data-ctpag="${esc(c.id)}">Registrar pagamento</button><button class="btn btn-red btn-sm" type="button" data-ctdel="${esc(c.id)}">Apagar</button>`}</div>
     ${CT.pagando === String(c.id) ? `<div style="margin-top:10px;border-top:1px dashed #E1D4B2;padding-top:10px"><div class="grid2"><div><label for="ctPV">Valor pago (R$)</label><input id="ctPV" inputmode="decimal" value="${numBR(c.valor).toFixed(2).replace(".", ",")}"></div><div><label for="ctPD">Data do pagamento</label><input id="ctPD" type="date" value="${today()}"></div></div>
       <label for="ctPA">Comprovante do pagamento (foto ou PDF)</label><input id="ctPA" type="file" accept="application/pdf,image/*">
       <div class="msg hidden" id="mCtP"></div><div class="res"><button class="btn btn-gold btn-sm" type="button" id="ctPOk">Confirmar pagamento</button><button class="btn btn-line btn-sm" type="button" id="ctPNo">Cancelar</button></div></div>` : ""}</div>`;
  box.innerHTML = `${venc.length || prox.length ? `<div style="background:${venc.length ? "#FBEFEF" : "#FFF7E3"};border:1px solid ${venc.length ? "#E0B4B4" : "#E6C98A"};border-radius:10px;padding:10px 14px;margin-bottom:10px"><b style="color:${venc.length ? "#7A1B2B" : "#7A5410"}">${venc.length ? venc.length + " vencido(s)" : ""}${venc.length && prox.length ? " e " : ""}${prox.length ? prox.length + " vencendo em até 5 dias" : ""}</b><div style="font-size:14.5px;margin-top:2px">Pague e registre o pagamento com o comprovante: o aviso some e o lançamento entra no caixa.</div></div>` : abertas.length ? `<div style="background:#EEF2F8;border:1px solid #C9D3E3;border-radius:10px;padding:10px 14px;margin-bottom:10px"><b style="color:#1B2B4B">${abertas.length} conta(s) em aberto, nenhuma vencendo nos próximos 5 dias.</b> Total a pagar: ${brl(totAb)}.</div>` : `<div style="background:#EAF5EC;border:1px solid #A7D3B1;border-radius:10px;padding:10px 14px;margin-bottom:10px"><b style="color:#1E5E33">Tudo quitado.</b> Nenhum boleto ou guia em aberto.</div>`}
    <p style="margin:0 0 8px;font-size:15px">Cadastre aqui cada boleto, guia do DAS, guia da Receita ou conta da escola assim que chegar. A plataforma avisa o vencimento, guarda o boleto e, quando o senhor registrar o pagamento com o comprovante, lança a saída no caixa e marca como quitado.</p>
    <details ${abertas.length ? "" : "open"} style="border:1px solid #E1D4B2;border-radius:10px;padding:8px 12px;margin-bottom:10px;background:#FFFDF6"><summary style="cursor:pointer;font-weight:700">+ Cadastrar boleto ou guia</summary>
     <div class="grid2" style="margin-top:8px"><div><label for="ctTipo">Tipo</label><select id="ctTipo"><option>Boleto</option><option>Guia do DAS (MEI)</option><option>Guia da Receita</option><option>Conta (água, luz, internet)</option><option>Outro</option></select></div>
      <div><label for="ctCat">Categoria</label><select id="ctCat">${CX_CAT.saida.map((x) => `<option>${esc(x)}</option>`).join("")}</select></div></div>
     <label for="ctDesc">Descrição (a quem pagar e o motivo)</label><input id="ctDesc" placeholder="Ex.: Gráfica — impressão de apostilas">
     <div class="grid2"><div><label for="ctVal">Valor (R$)</label><input id="ctVal" inputmode="decimal" placeholder="0,00"></div><div><label for="ctVenc">Vencimento</label><input id="ctVenc" type="date" value="${today()}"></div></div>
     <div id="ctCompBox" style="display:none"><label for="ctComp">Mês de competência do DAS</label><input id="ctComp" type="month" value="${etuMesAnterior()}"></div>
     <label for="ctCod">Linha digitável ou código Pix copia e cola (opcional)</label><input id="ctCod" placeholder="Cole aqui o código do boleto">
     <label for="ctArq">Arquivo do boleto ou da guia (foto ou PDF)</label><input id="ctArq" type="file" accept="application/pdf,image/*">
     <div class="msg hidden" id="mCt"></div><div class="res"><button class="btn btn-gold btn-sm" type="button" id="ctAdd">Guardar boleto</button></div></details>
    ${abertas.length ? `<div style="font-weight:700;margin:6px 0">Em aberto</div>${abertas.map(item).join("")}` : ""}
    ${pagas.length ? `<div style="display:flex;justify-content:space-between;align-items:center;margin:10px 0 6px"><b>Pagos (${pagas.length})</b><button class="btn btn-line btn-sm" type="button" id="ctVerPagos">${CT.verPagos ? "Esconder" : "Mostrar"}</button></div>${CT.verPagos ? pagas.slice(0, 60).map(item).join("") : ""}` : ""}`;
  const acha = (id) => C.find((x) => String(x.id) === String(id));
  const tipo = $("#ctTipo");
  tipo.onchange = () => {
    const das = tipo.value.startsWith("Guia do DAS");
    $("#ctCompBox").style.display = das ? "block" : "none";
    if (das || tipo.value === "Guia da Receita") $("#ctCat").value = "Impostos e taxas";
    if (das && !$("#ctDesc").value) $("#ctDesc").value = "DAS do MEI";
  };
  $("#ctAdd").onclick = async () => {
    const m = $("#mCt"), v = numBR($("#ctVal").value), desc = $("#ctDesc").value.trim();
    if (!desc) return show(m, "Escreva a descrição.", "err");
    if (!(v > 0)) return show(m, "Digite o valor do boleto.", "err");
    if (!$("#ctVenc").value) return show(m, "Escolha o vencimento.", "err");
    const b = $("#ctAdd");
    b.disabled = true;
    try {
      const f = $("#ctArq").files && $("#ctArq").files[0];
      let arq = null;
      if (f) {
        show(m, "Enviando o arquivo…", "ok");
        arq = await etuEnviarComprovante(f, $("#ctVenc").value.slice(0, 7));
      }
      const das = tipo.value.startsWith("Guia do DAS");
      const c = { tipo: tipo.value, descricao: das && $("#ctComp").value ? "DAS do MEI — competência " + nm($("#ctComp").value) : desc, categoria: $("#ctCat").value, valor: v, vencimento: $("#ctVenc").value, codigo: $("#ctCod").value.trim() || null, boleto: arq, competencia: das ? $("#ctComp").value || null : null };
      await API.salvarContaPagar(c);
      drawContab();
    } catch (e) {
      b.disabled = false;
      show(m, e.message, "err");
    }
  };
  box.querySelectorAll("[data-ctbol]").forEach((b) => b.onclick = () => etuAbrirComprovante(acha(b.dataset.ctbol).boleto));
  box.querySelectorAll("[data-ctcomp]").forEach((b) => b.onclick = () => etuAbrirComprovante(acha(b.dataset.ctcomp).comprovante));
  box.querySelectorAll("[data-ctcod]").forEach((b) => b.onclick = async () => {
    const c = acha(b.dataset.ctcod);
    try {
      await navigator.clipboard.writeText(c.codigo);
      b.textContent = "Código copiado ✓";
    } catch (e) {
      prompt("Copie o código:", c.codigo);
    }
  });
  box.querySelectorAll("[data-ctdel]").forEach((b) => b.onclick = () => confirmBox("Apagar este boleto da lista? Use só se foi cadastrado por engano.", async () => {
    await API.apagarContaPagar(acha(b.dataset.ctdel).id);
    drawContab();
  }));
  box.querySelectorAll("[data-ctpag]").forEach((b) => b.onclick = () => {
    CT.pagando = b.dataset.ctpag;
    etuContasDesenha(L, nm);
    const el = $("#ctPV");
    if (el) el.scrollIntoView({ block: "center" });
  });
  const vp = $("#ctVerPagos");
  if (vp) vp.onclick = () => {
    CT.verPagos = !CT.verPagos;
    etuContasDesenha(L, nm);
  };
  const no = $("#ctPNo");
  if (no) no.onclick = () => {
    CT.pagando = null;
    etuContasDesenha(L, nm);
  };
  const ok = $("#ctPOk");
  if (ok) ok.onclick = async () => {
    const c = acha(CT.pagando), m = $("#mCtP"), v = numBR($("#ctPV").value), dt = $("#ctPD").value || today();
    if (!(v > 0)) return show(m, "Digite o valor pago.", "err");
    ok.disabled = true;
    try {
      const f = $("#ctPA").files && $("#ctPA").files[0];
      let comp = null;
      if (f) {
        show(m, "Enviando o comprovante…", "ok");
        comp = await etuEnviarComprovante(f, dt.slice(0, 7));
      }
      const reg = { tipo: "saida", data: dt, categoria: c.categoria || "Outras saídas", descricao: c.descricao, valor: v, forma: c.tipo && c.tipo.startsWith("Guia") ? "Guia" : "Boleto", documento: c.competencia ? "DAS " + c.competencia : (c.tipo || "Boleto") + " venc. " + fmtDate(c.vencimento) };
      if (comp) reg.anexo = comp;
      const r = await API.salvarLancamento(reg);
      await API.alterarContaPagar(c.id, { status: "pago", pago_em: dt, valor_pago: v, comprovante: comp, lancamento_id: r && r.id && !isNaN(+r.id) ? +r.id : null });
      if (c.competencia) etuFechGrava(c.competencia, { das: fmtDate(dt) });
      CT.pagando = null;
      drawContab();
    } catch (e) {
      ok.disabled = false;
      show(m, e.message, "err");
    }
  };
}
(function() {
  function avisa() {
    if (!(S.profile && S.profile.is_admin)) return;
    if (location.hash !== "#admin") return;
    if (!window.etuCxL) {
      API.lancamentos().then((L) => {
        window.etuCxL = L || [];
        avisa();
      }).catch(() => {
      });
      return;
    }
    if (window.etuDasnL === void 0) {
      window.etuDasnL = [];
      API.declaracoesMei().then((D) => {
        window.etuDasnL = D || [];
        avisa();
      }).catch(() => {
      });
      return;
    }
    if (window.etuContas === void 0) {
      window.etuContas = null;
      API.contasPagar().then((C) => {
        window.etuContas = C || [];
        avisa();
      }).catch(() => {
      });
      return;
    }
    const pend = etuPendencias(), v = document.querySelector('[data-view="admin"] .wrap');
    if (!v) return;
    let b = document.getElementById("etuAvisoCont");
    if (!pend.length) {
      if (b) b.remove();
      return;
    }
    if (!b) {
      b = document.createElement("div");
      b.id = "etuAvisoCont";
      b.style.cssText = "background:#FFF7E3;border:1px solid #C9A24A;border-left:5px solid #C9A24A;border-radius:10px;padding:12px 16px;margin:14px 0;color:#1B2238";
      v.insertBefore(b, v.firstChild);
    }
    b.innerHTML = "<b>Contador da Direção:</b> " + pend.length + " pendência(s) — " + pend.map((x) => esc(x.t)).join("; ") + '. <a href="#" id="etuIrCont">Abrir a Contabilidade</a>';
    const a = document.getElementById("etuIrCont");
    if (a) a.onclick = (e) => {
      e.preventDefault();
      const t = document.querySelector('.tabs button[data-tab="contab"]');
      if (t) t.click();
    };
    try {
      const k = "etu_cont_notif_" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      if ("Notification" in window && Notification.permission === "granted" && !localStorage.getItem(k)) {
        localStorage.setItem(k, "1");
        navigator.serviceWorker && navigator.serviceWorker.ready.then((r) => r.showNotification("Contador da Direção", { body: pend[0].t + " (" + pend[0].p + ")", icon: "./icone-192.png", badge: "./selo-notif.png", tag: "etu-contador" }));
      }
    } catch (e) {
    }
  }
  addEventListener("hashchange", () => setTimeout(avisa, 700));
  addEventListener("load", () => setTimeout(avisa, 2500));
})();
const ETU_OPS = "---OPÇÕES---";
function etuOpcoes(t) {
  const i = (t || "").indexOf(ETU_OPS);
  return i < 0 ? [] : t.slice(i + ETU_OPS.length).split("\n").map((x) => x.trim()).filter(Boolean);
}
function etuTextoSem(t) {
  const i = (t || "").indexOf(ETU_OPS);
  return (i < 0 ? t || "" : t.slice(0, i)).trim();
}
function etuAudio(url) {
  if (!url) return "";
  let m = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if (m) return `<iframe src="https://drive.google.com/file/d/${m[1]}/preview" title="Áudio" style="width:100%;height:110px;border:0;border-radius:8px" loading="lazy" allow="autoplay"></iframe>`;
  m = url.match(/open\.spotify\.com\/(episode|show)\/([\w]+)/);
  if (m) return `<iframe src="https://open.spotify.com/embed/${m[1]}/${m[2]}" title="Podcast" style="width:100%;height:152px;border:0;border-radius:12px" loading="lazy" allow="encrypted-media"></iframe>`;
  if (/\.(mp3|m4a|ogg|oga|wav|aac)(\?|$)/i.test(url)) return `<audio controls preload="none" style="width:100%" src="${esc(url)}"></audio>`;
  const v = toEmbed(url);
  if (v && v !== url) return `<div class="video"><iframe src="${esc(v)}" title="Áudio" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
  return "";
}
function etuLinkify(s) {
  return esc(s).replace(/https?:\/\/[^\s<]+/g, (u) => {
    const limpo = u.replace(/[.,;:!?)]+$/, "");
    const resto = u.slice(limpo.length);
    return `<a href="${limpo}" target="_blank" rel="noopener">${limpo}</a>${resto}`;
  });
}
function etuCard(m) {
  const tipo = m.tipo || "", txt = etuTextoSem(m.texto), url = m.video_url || "";
  const ePdf = /\.pdf(\?|#|$)/i.test(url), eImg = /\.(jpe?g|png|webp|gif)(\?|#|$)/i.test(url);
  let midia = "";
  if (tipo === "Áudio" || tipo === "Podcast") midia = EMBED_OK ? etuAudio(url) : "";
  else if (tipo !== "Enquete" && ePdf) midia = "";
  else if (tipo !== "Enquete" && eImg) midia = `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="Abrir a imagem em tamanho maior"><img src="${esc(url)}" alt="${esc(m.titulo)}" loading="lazy" style="display:block;width:100%;height:auto"></a>`;
  else if (tipo !== "Enquete") {
    const v = toEmbed(url);
    midia = v && EMBED_OK ? `<div class="video"><iframe src="${esc(v)}" title="${esc(m.titulo)}" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>` : "";
  }
  const enq = tipo === "Enquete" ? `<div class="enq" data-enq="${esc(String(m.id))}">${etuOpcoes(m.texto).map((o, i) => `<button type="button" class="enq-op" data-op="${i}"><span class="enq-t">${esc(o)}</span><span class="enq-bar"></span><span class="enq-p"></span></button>`).join("")}<p class="enq-msg"></p></div>` : "";
  const botaoPdf = ePdf ? `<div style="margin-top:12px"><a class="btn btn-gold btn-sm" href="${esc(url)}" target="_blank" rel="noopener">Abrir o estudo em PDF</a></div>` : "";
  const botaoVideo = url && !ePdf && !eImg && tipo !== "Áudio" && tipo !== "Podcast" && tipo !== "Enquete" ? `<a class="btn btn-line btn-sm" style="margin-top:10px" href="${esc(url)}" target="_blank" rel="noopener">Assistir em nova aba</a>` : "";
  return `<article class="mcard">${midia && tipo !== "Áudio" && tipo !== "Podcast" ? midia : ""}<div class="bd"><div class="mtag">${esc(tipo.toUpperCase())}</div><h3>${esc(m.titulo)}</h3>${txt ? `<p style="white-space:pre-line">${etuLinkify(txt)}</p>` : ""}${botaoPdf}${tipo === "Áudio" || tipo === "Podcast" ? `<div style="margin-top:10px">${midia || (url ? `<a class="btn btn-line btn-sm" href="${esc(url)}" target="_blank" rel="noopener">Ouvir</a>` : "")}</div>` : ""}${enq}${botaoVideo}</div></article>`;
}
async function etuLigaEnquetes(root) {
  const boxes = [...(root || document).querySelectorAll("[data-enq]")];
  if (!boxes.length) return;
  let meus = [];
  try {
    meus = await API.meusVotos();
  } catch (e) {
  }
  for (const b of boxes) {
    const id = b.dataset.enq, meu = meus.find((v) => String(v.mural_id) === id), msg = b.querySelector(".enq-msg");
    async function mostra() {
      let r = [];
      try {
        r = await API.resultado(isNaN(+id) ? id : +id);
      } catch (e) {
      }
      const tot = r.reduce((a, x) => a + Number(x.votos), 0);
      const mv = (await API.meusVotos().catch(() => [])).find((v) => String(v.mural_id) === id);
      b.querySelectorAll(".enq-op").forEach((o) => {
        const n = Number((r.find((x) => +x.opcao === +o.dataset.op) || {}).votos || 0), pc = tot ? Math.round(n * 100 / tot) : 0;
        o.querySelector(".enq-bar").style.width = pc + "%";
        o.querySelector(".enq-p").textContent = tot ? pc + "%" : "";
        o.classList.toggle("meu", !!mv && +mv.opcao === +o.dataset.op);
      });
      msg.textContent = mv ? `Seu voto foi registrado. ${tot} voto(s) no total. Você pode mudar o voto tocando em outra opção.` : "";
    }
    b.querySelectorAll(".enq-op").forEach((o) => o.onclick = async () => {
      if (!S.user) {
        msg.textContent = "Entre na sua conta de aluno para votar.";
        return;
      }
      try {
        await API.votar(isNaN(+id) ? id : +id, +o.dataset.op);
        await mostra();
      } catch (e) {
        msg.textContent = "Não foi possível votar agora: " + e.message;
      }
    });
    if (meu) mostra();
  }
}
function etuOuvir() {
  const l = S.mural.filter((m) => m.tipo === "Áudio" || m.tipo === "Podcast");
  $("#ouvirGrid").innerHTML = l.length ? l.map(etuCard).join("") : '<div class="panel" style="grid-column:1/-1;text-align:center"><p style="margin:0">Os primeiros estudos em áudio e episódios do podcast serão publicados em breve.</p></div>';
}
function etuEnquetes() {
  const l = S.mural.filter((m) => m.tipo === "Enquete");
  $("#enqGrid").innerHTML = l.length ? l.map(etuCard).join("") : '<div class="panel" style="grid-column:1/-1;text-align:center"><p style="margin:0">Nenhuma enquete aberta no momento.</p></div>';
  etuLigaEnquetes($("#enqGrid"));
}
function etuPerguntas() {
  const l = S.mural.filter((m) => m.tipo === "Pergunta e resposta");
  $("#pergLista").innerHTML = l.length ? l.map((m) => `<details class="perg"><summary>${esc(m.titulo)}</summary><div>${esc(etuTextoSem(m.texto)).replace(/\n/g, "<br>")}${m.video_url ? `<div style="margin-top:10px">${etuAudio(m.video_url) || `<a class="btn btn-line btn-sm" href="${esc(m.video_url)}" target="_blank" rel="noopener">Ver resposta em vídeo ou áudio</a>`}</div>` : ""}</div></details>`).join("") : '<p style="margin:0;text-align:center">As respostas às perguntas dos alunos serão publicadas aqui.</p>';
  const f = $("#pergEnviar");
  if (f && !f.dataset.ok) {
    f.dataset.ok = 1;
    f.onclick = async () => {
      const q = $("#pergTxt").value.trim(), m = $("#mPerg");
      if (q.length < 10) return show(m, "Escreva a sua pergunta com um pouco mais de detalhe.", "err");
      try {
        await API.abrirAtendimento({ nome: S.profile && S.profile.nome || $("#pergNome").value.trim() || "Visitante", contato: S.user && S.user.email || $("#pergCont").value.trim(), mensagem: "PERGUNTA TEOLÓGICA — " + q, conversa: [] });
        $("#pergTxt").value = "";
        show(m, "Pergunta enviada à Direção. As respostas escolhidas são publicadas nesta página, sem o nome de quem perguntou.", "ok");
      } catch (e) {
        show(m, "Não foi possível enviar agora: " + e.message, "err");
      }
    };
  }
  const vis = $("#pergVis");
  if (vis) vis.style.display = S.user ? "none" : "";
}
addEventListener("hashchange", () => {
  const h = location.hash.slice(1);
  setTimeout(() => {
    if (h === "ouvir") etuOuvir();
    if (h === "enquetes") etuEnquetes();
    if (h === "perguntas") etuPerguntas();
  }, 60);
});
addEventListener("load", () => setTimeout(() => {
  const h = location.hash.slice(1);
  if (h === "ouvir") etuOuvir();
  if (h === "enquetes") etuEnquetes();
  if (h === "perguntas") etuPerguntas();
}, 1500));
(function() {
  let t;
  addEventListener("scroll", () => {
    document.querySelectorAll(".wa-float,.ai-float").forEach((e) => e.classList.add("fab-oculto"));
    clearTimeout(t);
    t = setTimeout(() => document.querySelectorAll(".wa-float,.ai-float").forEach((e) => e.classList.remove("fab-oculto")), 1400);
  }, { passive: true });
})();
(function() {
  const V = "2026-11-25", K = "etu_diretrizes";
  function aceitou() {
    try {
      const r = JSON.parse(localStorage.getItem(K) || "null");
      return r && r.v === V;
    } catch (e) {
      return false;
    }
  }
  function abre() {
    if (aceitou() || document.getElementById("etuDiret")) return;
    const o = document.createElement("div");
    o.id = "etuDiret";
    o.setAttribute("role", "dialog");
    o.setAttribute("aria-modal", "true");
    o.setAttribute("aria-labelledby", "etuDiretT");
    o.style.cssText = "position:fixed;inset:0;z-index:9998;background:rgba(5,10,25,.72);display:flex;align-items:center;justify-content:center;padding:14px";
    o.innerHTML = `<div style="background:#FFFDF6;color:#1B2238;max-width:640px;width:100%;max-height:92vh;overflow:auto;border-radius:16px;border:2px solid #C9A24A;box-shadow:0 18px 50px rgba(0,0,0,.5)">
      <div style="background:var(--navy);color:#F7EFD9;text-align:center;padding:18px 18px 14px;border-bottom:3px solid #C9A24A;border-radius:14px 14px 0 0"><img src="brasao-redondo.webp" alt="" style="width:74px;height:74px"><h2 id="etuDiretT" style="margin:8px 0 2px;color:#F7EFD9;font-size:21px;letter-spacing:.08em">Diretrizes da Escola</h2><p style="margin:0;color:#E2C47A;font-style:italic">Leia antes de se matricular</p></div>
      <div style="padding:18px 20px">
       <ol style="margin:0;padding-left:20px;line-height:1.55;font-size:16.5px">
        <li><b>Curso livre:</b> formação bíblica, teológica e ministerial. Não é graduação nem pós-graduação e não depende do MEC.</li>
        <li><b>Amparo legal:</b> Constituição Federal (artigo 5º, incisos 6 e 9; artigos 205, 206 e 209) e Lei nº 9.394/1996, artigo 1º.</li>
        <li><b>Documentos:</b> carteira de estudante válida por 3 anos; certificado de cada etapa somente após todas as aulas e avaliações; todos verificáveis por código e QR Code.</li>
        <li><b>Desistência:</b> até 7 dias da contratação, devolução integral (Código de Defesa do Consumidor, artigo 49). Depois, vale o contrato.</li>
        <li><b>Conduta:</b> o material é protegido por direitos autorais; cópia, venda, fraude ou ofensa levam ao cancelamento do acesso.</li>
        <li><b>Dados pessoais:</b> usados só para o estudo e os documentos, conforme a Política de Privacidade.</li>
       </ol>
       <p style="margin:12px 0 6px;font-size:15.5px">Leia na íntegra: <a href="nota-oficial.html" target="_blank" rel="noopener">Nota Oficial</a> · <a href="termos.html" target="_blank" rel="noopener">Termos de Uso e Contrato</a> · <a href="privacidade.html" target="_blank" rel="noopener">Política de Privacidade</a></p>
       <label style="display:flex;gap:12px;align-items:flex-start;margin:14px 0 0;font-size:16.5px;cursor:pointer;color:#1B2238;font-family:inherit;letter-spacing:0;text-transform:none;font-weight:600"><input type="checkbox" id="etuDiretOk" style="width:24px;height:24px;margin-top:2px;flex:none;accent-color:#1D3C91">Li e concordo com as diretrizes, a Nota Oficial, os Termos de Uso e Contrato e a Política de Privacidade.</label>
       <div class="res" style="margin-top:16px"><button type="button" class="btn btn-gold" id="etuDiretSeg" disabled>Concordo e quero continuar</button><a class="btn btn-line" href="#inicio" id="etuDiretSai">Agora não</a></div>
      </div></div>`;
    document.body.appendChild(o);
    const ck = o.querySelector("#etuDiretOk"), bt = o.querySelector("#etuDiretSeg");
    ck.onchange = () => {
      bt.disabled = !ck.checked;
    };
    bt.onclick = () => {
      try {
        localStorage.setItem(K, JSON.stringify({ v: V, data: (/* @__PURE__ */ new Date()).toISOString() }));
      } catch (e) {
      }
      o.remove();
    };
    o.querySelector("#etuDiretSai").onclick = () => o.remove();
    o.firstElementChild.scrollTop = 0;
  }
  function confere() {
    if (window.ETU_LOJA) return;
    const h = location.hash.slice(1);
    if (h === "matricula" || h === "cadastro") setTimeout(abre, 250);
  }
  addEventListener("hashchange", confere);
  addEventListener("load", () => setTimeout(confere, 900));
})();
const ETU_VERSOS = [
  ["Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.", "João 3.16"],
  ["Lâmpada para os meus pés é tua palavra e luz, para o meu caminho.", "Salmos 119.105"],
  ["Não to mandei eu? Esforça-te e tem bom ânimo; não temas, nem te espantes, porque o SENHOR, teu Deus, é contigo, por onde quer que andares.", "Josué 1.9"],
  ["O SENHOR é o meu pastor; nada me faltará.", "Salmos 23.1"],
  ["Posso todas as coisas naquele que me fortalece.", "Filipenses 4.13"],
  ["E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados por seu decreto.", "Romanos 8.28"],
  ["Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar, que maneja bem a palavra da verdade.", "2 Timóteo 2.15"],
  ["Confia no SENHOR de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.", "Provérbios 3.5-6"],
  ["Mas os que esperam no SENHOR renovarão as suas forças e subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão.", "Isaías 40.31"],
  ["Mas buscai primeiro o Reino de Deus, e a sua justiça, e todas essas coisas vos serão acrescentadas.", "Mateus 6.33"],
  ["Clama a mim, e responder-te-ei e anunciar-te-ei coisas grandes e firmes, que não sabes.", "Jeremias 33.3"],
  ["Disse-lhe Jesus: Eu sou o caminho, e a verdade, e a vida. Ninguém vem ao Pai senão por mim.", "João 14.6"],
  ["Mas recebereis a virtude do Espírito Santo, que há de vir sobre vós; e ser-me-eis testemunhas tanto em Jerusalém como em toda a Judeia e Samaria e até aos confins da terra.", "Atos 1.8"],
  ["Ora, sem fé é impossível agradar-lhe, porque é necessário que aquele que se aproxima de Deus creia que ele existe e que é galardoador dos que o buscam.", "Hebreus 11.6"],
  ["Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.", "Salmos 46.1"],
  ["De sorte que a fé é pelo ouvir, e o ouvir pela palavra de Deus.", "Romanos 10.17"],
  ["Porque pela graça sois salvos, por meio da fé; e isso não vem de vós; é dom de Deus. Não vem das obras, para que ninguém se glorie.", "Efésios 2.8-9"],
  ["No princípio, era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.", "João 1.1"],
  ["As misericórdias do SENHOR são a causa de não sermos consumidos, porque as suas misericórdias não têm fim; novas são cada manhã; grande é a tua fidelidade.", "Lamentações 3.22-23"],
  ["Escondi a tua palavra no meu coração, para eu não pecar contra ti.", "Salmos 119.11"],
  ["Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça.", "1 João 1.9"],
  ["Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te esforço, e te ajudo, e te sustento com a destra da minha justiça.", "Isaías 41.10"],
  ["E conhecereis a verdade, e a verdade vos libertará.", "João 8.32"],
  ["Jesus Cristo é o mesmo ontem, e hoje, e eternamente.", "Hebreus 13.8"],
  ["E, se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente e o não lança em rosto; e ser-lhe-á dada.", "Tiago 1.5"],
  ["E, se eu for e vos preparar lugar, virei outra vez e vos levarei para mim mesmo, para que, onde eu estiver, estejais vós também.", "João 14.3"],
  ["Porque Esdras tinha preparado o seu coração para buscar a Lei do SENHOR, e para a cumprir, e para ensinar em Israel os seus estatutos e os seus direitos.", "Esdras 7.10"],
  ["Mas o fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança. Contra essas coisas não há lei.", "Gálatas 5.22-23"],
  ["Aquele que testifica estas coisas diz: Certamente, cedo venho. Amém! Ora, vem, Senhor Jesus!", "Apocalipse 22.20"]
];
const ETU_DESAFIO = {
  "Básico": [
    ["Quantos livros tem a Bíblia usada pelas igrejas evangélicas?", ["66", "73", "39", "27"], 0, 'São 39 livros no Antigo Testamento e 27 no Novo Testamento. Os livros a mais das Bíblias católicas (os deuterocanônicos) não faziam parte das Escrituras hebraicas que Jesus e os apóstolos chamavam de "a Lei e os Profetas" (Lucas 24.44).'],
    ["Em que cidade Jesus nasceu?", ["Nazaré", "Belém", "Jerusalém", "Cafarnaum"], 1, 'O profeta Miqueias anunciou que de Belém sairia aquele que seria Senhor em Israel (Miqueias 5.2), e Mateus registra o cumprimento: "tendo, pois, nascido Jesus em Belém de Judeia" (Mateus 2.1). Jesus cresceu em Nazaré, por isso foi chamado Nazareno.'],
    ["Quem foi lançado na cova dos leões por continuar orando ao seu Deus?", ["José", "Jeremias", "Daniel", "Elias"], 2, "Daniel continuou orando três vezes por dia, mesmo depois do decreto do rei Dario, e foi lançado na cova; Deus enviou o seu anjo e fechou a boca dos leões (Daniel 6.10, 16-22). A fidelidade na oração não depende de lei humana favorável."],
    ["O que aconteceu com os discípulos no dia de Pentecostes?", ["Receberam as tábuas da Lei", "Foram cheios do Espírito Santo e falaram em outras línguas", "Viram Jesus ser transfigurado", "Foram presos em Jerusalém"], 1, '"E todos foram cheios do Espírito Santo e começaram a falar em outras línguas, conforme o Espírito Santo lhes concedia que falassem" (Atos 2.4). Cumpriu-se a promessa de Jesus de que receberiam poder para testemunhar (Atos 1.8).'],
    ["Quantos apóstolos Jesus escolheu dentre os seus discípulos?", ["7", "10", "12", "70"], 2, '"E, quando já era dia, chamou a si os seus discípulos, e escolheu doze deles, a quem também deu o nome de apóstolos" (Lucas 6.13). Os setenta foram enviados depois, em outra missão (Lucas 10.1).'],
    ["Qual é o primeiro livro do Novo Testamento?", ["Atos", "Mateus", "Romanos", "João"], 1, 'Mateus abre o Novo Testamento com a genealogia de Jesus Cristo, "filho de Davi, filho de Abraão" (Mateus 1.1), ligando as promessas do Antigo Testamento ao seu cumprimento em Cristo.'],
    ["Quem construiu a arca por ordem de Deus?", ["Abraão", "Moisés", "Noé", "Enoque"], 2, 'Deus disse a Noé: "Faze para ti uma arca da madeira de gofer" (Gênesis 6.14). Hebreus 11.7 explica que Noé o fez pela fé, "temendo, aparelhou a arca para a salvação da sua família".'],
    ["O que significa o nome Emanuel?", ["Deus salva", "Deus conosco", "Príncipe da paz", "Filho do homem"], 1, 'Mateus cita Isaías 7.14 e explica: "e chamá-lo-ão pelo nome de Emanuel, que traduzido é: Deus conosco" (Mateus 1.23). O nome declara que o menino nascido da virgem é o próprio Deus presente no meio do seu povo.'],
    ["Quem escreveu a maior parte das cartas do Novo Testamento?", ["Pedro", "João", "Tiago", "Paulo"], 3, "Treze cartas, de Romanos a Filemom, trazem o nome de Paulo, chamado por Cristo para levar o evangelho aos gentios (Atos 9.15; Romanos 11.13)."],
    ["Qual foi a primeira ordem criadora de Deus registrada em Gênesis 1?", ["Haja luz", "Produza a terra erva verde", "Façamos o homem", "Haja expansão"], 0, '"E disse Deus: Haja luz. E houve luz" (Gênesis 1.3). Paulo usa esse mesmo texto para falar da conversão: o Deus que mandou a luz brilhar das trevas resplandeceu em nosso coração (2 Coríntios 4.6).'],
    ['Qual mandamento Jesus chamou de "o primeiro e grande mandamento"?', ["Não matarás", "Amarás o Senhor, teu Deus, de todo o teu coração", "Honra a teu pai e a tua mãe", "Guardarás o sábado"], 1, 'Jesus respondeu citando Deuteronômio 6.5: "Amarás o Senhor, teu Deus, de todo o teu coração, e de toda a tua alma, e de todo o teu pensamento. Este é o primeiro e grande mandamento" (Mateus 22.37-38).'],
    ["Onde Jesus foi batizado?", ["No mar da Galileia", "No rio Jordão", "No tanque de Siloé", "No rio Eufrates"], 1, '"Então, veio Jesus da Galileia ter com João, junto do Jordão, para ser batizado por ele" (Mateus 3.13). Ali o Pai falou do céu e o Espírito desceu como pomba: a Trindade revelada no mesmo momento (Mateus 3.16-17).']
  ],
  "Médio": [
    ["Na interpretação pré-tribulacionista, qual é a diferença entre o arrebatamento e a vinda de Cristo em glória?", ["São o mesmo evento, no mesmo dia", "No arrebatamento Cristo vem buscar a Igreja nos ares, antes da Grande Tribulação; na vinda em glória Ele desce à terra com os santos, depois dela", "O arrebatamento acontece no meio do Milênio", "A vinda em glória acontece antes do arrebatamento"], 1, 'Em 1 Tessalonicenses 4.16-17 o Senhor desce e os salvos são "arrebatados juntamente com eles nas nuvens, a encontrar o Senhor nos ares". Em Apocalipse 19.11-14 Cristo vem do céu montado no cavalo branco, seguido pelos exércitos do céu, e em Zacarias 14.4 os seus pés tocam o monte das Oliveiras. A ETU, na linha pré-tribulacionista, entende que a Igreja é guardada "da hora da tentação que há de vir sobre todo o mundo" (Apocalipse 3.10; 1 Tessalonicenses 1.10). Outras escolas (meso e pós-tribulacionistas) entendem a ordem de outro modo.'],
    ['A palavra "arrebatados", em 1 Tessalonicenses 4.17, traduz um verbo grego que significa:', ["ser purificado aos poucos", "ser tomado de repente, com força", "ser julgado", "ser esquecido"], 1, 'O verbo grego usado por Paulo indica tirar algo de um lugar de modo súbito e com força, como quem arrebata uma presa. É o mesmo verbo de Atos 8.39, quando "o Espírito do Senhor arrebatou a Filipe". A palavra "arrebatamento" vem do latim, que traduziu esse verbo; a doutrina, porém, está no texto, não no nome.'],
    ["Quantas semanas há na profecia de Daniel 9?", ["7", "40", "62", "70"], 3, '"Setenta semanas estão determinadas sobre o teu povo e sobre a tua santa cidade" (Daniel 9.24). Cada "semana" representa sete anos, num total de 490 anos: 7 + 62 semanas até o Messias (Daniel 9.25-26) e a última semana (Daniel 9.27), que a interpretação dispensacionalista situa no futuro, nos sete anos da Tribulação.'],
    ["O que é o Tribunal de Cristo?", ["O julgamento final dos incrédulos", "O julgamento das obras dos salvos, para recompensa", "O julgamento das nações no Antigo Testamento", "O julgamento dos anjos caídos"], 1, '"Porque todos devemos comparecer ante o tribunal de Cristo, para que cada um receba segundo o que tiver feito por meio do corpo, ou bem ou mal" (2 Coríntios 5.10). Ali as obras dos salvos são provadas pelo fogo (1 Coríntios 3.12-15). Os incrédulos serão julgados diante do grande trono branco (Apocalipse 20.11-15).'],
    ["Segundo a doutrina pentecostal clássica, qual é a evidência física inicial do batismo no Espírito Santo?", ["Chorar durante a oração", "Falar em outras línguas", "Ter uma visão", "Cair ao chão"], 1, 'Em Atos o padrão se repete: em Jerusalém falaram em outras línguas (Atos 2.4); na casa de Cornélio os judeus souberam que os gentios receberam o Espírito "porque os ouviam falar línguas" (Atos 10.45-46); em Éfeso "falavam línguas e profetizavam" (Atos 19.6). O propósito do batismo é o poder para testemunhar (Atos 1.8).'],
    ["Gálatas 5.22-23 trata de:", ["os dons espirituais", "o fruto do Espírito", "os ministérios da Igreja", "as obras da carne"], 1, 'O fruto é o caráter de Cristo formado no crente: "amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança" (Gálatas 5.22-23). Os dons são capacitações distribuídas "para o que for útil" (1 Coríntios 12.7-11). Dom sem fruto escandaliza; fruto sem dom fica sem poder.'],
    ["O que ensina a doutrina da Trindade?", ["Um só Deus que se mostra em três modos diferentes", "Três deuses que trabalham juntos", "Um só Deus, eternamente existente em três Pessoas: Pai, Filho e Espírito Santo", "O Pai é Deus; o Filho e o Espírito foram criados"], 2, 'A Escritura afirma um só Deus (Deuteronômio 6.4) e, ao mesmo tempo, distingue três Pessoas no único nome: "batizando-os em nome do Pai, e do Filho, e do Espírito Santo" (Mateus 28.19; 2 Coríntios 13.13). As outras alternativas descrevem erros antigos: o modalismo, o triteísmo e o arianismo.'],
    ["O que é a justificação?", ["Um processo gradual de melhora moral", "O ato pelo qual Deus declara justo o pecador que crê em Cristo", "A recompensa pelas boas obras", "O batismo nas águas"], 1, '"Sendo, pois, justificados pela fé, temos paz com Deus por nosso Senhor Jesus Cristo" (Romanos 5.1). Somos "justificados gratuitamente pela sua graça, pela redenção que há em Cristo Jesus" (Romanos 3.24). O crescimento gradual na vida cristã é a santificação.'],
    ["Quem foi Melquisedeque?", ["Um profeta do tempo dos reis", "Rei de Salém e sacerdote do Deus Altíssimo", "Um dos doze filhos de Jacó", "O sumo sacerdote no tempo de Jesus"], 1, "Ele saiu ao encontro de Abraão com pão e vinho e o abençoou (Gênesis 14.18-20). O Salmo 110.4 e Hebreus 7.1-3 o apresentam como figura do sacerdócio eterno de Cristo, superior ao sacerdócio levítico."],
    ["Em que ilha João recebeu a revelação do Apocalipse?", ["Creta", "Chipre", "Patmos", "Malta"], 2, '"Eu, João, que também sou vosso irmão e companheiro na aflição... estava na ilha chamada Patmos, por causa da palavra de Deus e pelo testemunho de Jesus Cristo" (Apocalipse 1.9). Ali, exilado, recebeu a visão do Cristo glorificado.']
  ],
  "Avançado": [
    ["No Antigo Testamento, a palavra hebraica Sheol designa principalmente:", ["o lago de fogo", "o lugar ou estado dos mortos", "o paraíso dos salvos apenas", "um ídolo dos cananeus"], 1, 'Jacó diz que desceria chorando "à sepultura" (Gênesis 37.35), e o Salmo 16.10 declara: "não deixarás a minha alma no inferno". Pedro cita esse salmo em Atos 2.27 usando a palavra grega correspondente, Hades. Por isso as traduções alternam entre "sepultura", "inferno" e "cova", conforme o contexto. Lucas 16.19-31 mostra a separação entre o justo e o ímpio depois da morte.'],
    ["Na teologia arminiana, adotada pela ETU, o que capacita o pecador a responder ao evangelho?", ["A força da vontade humana sem ajuda de Deus", "A graça preveniente, que alcança todos e torna possível a resposta de fé", "Uma eleição que exclui a maioria antes da criação", "O batismo infantil"], 1, '"Porque a graça de Deus se há manifestado, trazendo salvação a todos os homens" (Tito 2.11). Cristo atrai todos a si (João 12.32), e Deus "quer que todos os homens se salvem" (1 Timóteo 2.4; 2 Pedro 3.9). A graça vem primeiro; o homem, capacitado por ela, pode crer ou resistir (Atos 7.51).'],
    ["O Concílio de Niceia (ano 325) condenou qual ensino?", ["O pelagianismo", "O arianismo, que dizia que o Filho foi criado", "O gnosticismo", "O montanismo"], 1, 'Ário afirmava que o Filho teve começo. O concílio declarou que o Filho é da mesma substância do Pai, em harmonia com João 1.1 ("o Verbo era Deus") e Colossenses 1.16-17, onde todas as coisas foram criadas por Ele, e Ele "é antes de todas as coisas".'],
    ["O que o Concílio de Calcedônia (ano 451) definiu sobre Cristo?", ["Que Ele tinha só a natureza divina", "Que Ele é uma só Pessoa em duas naturezas, verdadeiro Deus e verdadeiro homem", "Que eram duas pessoas distintas", "Que a humanidade dele era aparente"], 1, 'A definição afirma as duas naturezas "sem confusão, sem mudança, sem divisão, sem separação". Ela resume o que a Escritura diz: "o Verbo se fez carne" (João 1.14) e "nele habita corporalmente toda a plenitude da divindade" (Colossenses 2.9).'],
    ['Em Filipenses 2.7, quando se diz que Cristo "aniquilou-se a si mesmo", o sentido correto é:', ["Ele deixou de ser Deus", "Sem deixar de ser Deus, tomou a forma de servo e se humilhou", "Ele apenas parecia humano", "Ele se tornou um anjo"], 1, 'O versículo anterior diz que Ele subsistia "em forma de Deus" (Filipenses 2.6). O esvaziamento não foi perda da divindade, mas acréscimo da humanidade e renúncia voluntária à glória: "tomando a forma de servo, fazendo-se semelhante aos homens" (2.7), "obediente até à morte" (2.8).'],
    ["O dispensacionalismo se distingue por:", ["ensinar que a Igreja substituiu Israel", "manter a distinção entre Israel e a Igreja no plano de Deus", "negar a volta de Cristo", "ensinar que o Milênio já passou"], 1, 'Paulo ensina que "o endurecimento veio em parte sobre Israel, até que a plenitude dos gentios haja entrado. E, assim, todo o Israel será salvo" (Romanos 11.25-26), e chama a Igreja de mistério antes não revelado (Efésios 3.5-6). A teologia da aliança, outra escola evangélica, entende essa relação de modo diferente.'],
    ['A "última semana" de Daniel 9.27 é entendida pelos dispensacionalistas como:', ["o ministério terreno de Jesus", "os sete anos futuros da Tribulação", "a destruição de Jerusalém no ano 70 apenas", "o período da Reforma"], 1, 'O texto fala de alguém que "firmará um concerto com muitos por uma semana" e, na metade dela, fará cessar o sacrifício. Jesus ligou essa profecia ao futuro ao falar da "abominação da desolação" (Mateus 24.15). Outros intérpretes aplicam a semana ao ministério de Cristo; a ETU segue a leitura futurista.'],
    ["Em 2 Pedro 2.4 aparece um verbo que só ocorre ali no Novo Testamento. A que ele se refere?", ["À prisão dos anjos que pecaram", "Ao lugar dos crentes depois da morte", "Ao túmulo de Jesus", "Ao Hades de Lucas 16"], 0, '"Porque, se Deus não perdoou aos anjos que pecaram, mas, havendo-os lançado no inferno, os entregou às cadeias da escuridão" (2 Pedro 2.4). O verbo grego vem de Tártaro, lugar de prisão de certos anjos até o juízo, como confirma Judas 6.'],
    ["Quem foi Atanásio?", ["Um imperador romano", "Bispo de Alexandria que defendeu a divindade do Filho contra o arianismo", "O autor do livro de Hebreus", "Um reformador do século 16"], 1, 'Atanásio viveu no século 4, participou de Niceia ainda jovem e foi exilado várias vezes por não ceder ao arianismo. Na obra "A Encarnação do Verbo" defende que só Deus encarnado poderia salvar a humanidade, como ensina João 1.14 e Hebreus 2.14-17.'],
    ["Onde acontecem as Bodas do Cordeiro em Apocalipse 19?", ["Na terra, depois do Milênio", "No céu, antes de Cristo descer em glória", "Em Jerusalém, durante a Tribulação", "No Éden restaurado"], 1, '"São chamados bem-aventurados aqueles que são chamados à ceia das bodas do Cordeiro" (Apocalipse 19.9). Logo depois, João vê o céu aberto e o cavaleiro do cavalo branco vindo com os exércitos do céu (Apocalipse 19.11-14). A ordem do texto coloca as bodas antes da descida em glória.']
  ],
  "Quem sou eu?": [
    ["Fui vendido pelos meus irmãos, mas Deus me fez governador do Egito. Quem sou eu?", ["Moisés", "José", "Daniel", "Neemias"], 1, 'José foi vendido por vinte moedas de prata (Gênesis 37.28) e mais tarde Faraó o pôs sobre toda a terra do Egito (Gênesis 41.41). Ele mesmo resumiu: "vós bem intentastes mal contra mim, porém Deus o tornou em bem" (Gênesis 50.20).'],
    ["Não passei pela morte: subi ao céu num redemoinho. Quem sou eu?", ["Enoque", "Eliseu", "Elias", "Moisés"], 2, '"Elias subiu ao céu num redemoinho" (2 Reis 2.11). Enoque também não viu a morte (Hebreus 11.5), mas foi trasladado sem menção de redemoinho; por isso a resposta é Elias.'],
    ["Sou o homem que mais viveu, segundo a Bíblia. Quem sou eu?", ["Adão", "Noé", "Matusalém", "Abraão"], 2, '"Foram todos os dias de Matusalém novecentos e sessenta e nove anos, e morreu" (Gênesis 5.27).'],
    ["Fui o primeiro mártir da Igreja e, morrendo, pedi perdão pelos que me apedrejavam. Quem sou eu?", ["Tiago", "Estêvão", "Filipe", "Barnabé"], 1, 'Estêvão orou: "Senhor, não lhes imputes este pecado" (Atos 7.59-60). Saulo, que mais tarde seria o apóstolo Paulo, consentia na sua morte (Atos 8.1).'],
    ["Eu era chefe dos publicanos e subi numa árvore para ver Jesus. Quem sou eu?", ["Mateus", "Zaqueu", "Nicodemos", "Bartimeu"], 1, 'Zaqueu, de pequena estatura, subiu a um sicômoro (Lucas 19.2-4). Jesus se hospedou em sua casa e declarou: "Hoje, veio a salvação a esta casa" (Lucas 19.9).'],
    ['Sou a rainha que arriscou a vida dizendo: "se perecer, pereci". Quem sou eu?', ["Ester", "Rute", "Débora", "Mical"], 0, 'Ester pediu que o povo jejuasse e disse: "irei ter com o rei, ainda que não é segundo a lei; e, perecendo, pereço" (Ester 4.16). Deus usou a sua coragem para livrar os judeus.'],
    ["Venci os midianitas com apenas trezentos homens. Quem sou eu?", ["Sansão", "Gideão", "Jefté", "Baraque"], 1, 'O SENHOR disse a Gideão: "Com estes trezentos homens... vos livrarei" (Juízes 7.7), para que Israel não se gloriasse da própria força.'],
    ["Neguei Jesus três vezes, mas fui restaurado e preguei no Pentecostes. Quem sou eu?", ["João", "Tomé", "Pedro", "André"], 2, "Pedro negou o Senhor antes do canto do galo (Lucas 22.61-62), foi restaurado junto ao mar (João 21.15-17) e, cheio do Espírito, pregou o sermão em que quase três mil pessoas se converteram (Atos 2.14, 41)."]
  ]
};
const ETU_LIVROS = [["Gênesis", 50], ["Êxodo", 40], ["Levítico", 27], ["Números", 36], ["Deuteronômio", 34], ["Josué", 24], ["Juízes", 21], ["Rute", 4], ["1 Samuel", 31], ["2 Samuel", 24], ["1 Reis", 22], ["2 Reis", 25], ["1 Crônicas", 29], ["2 Crônicas", 36], ["Esdras", 10], ["Neemias", 13], ["Ester", 10], ["Jó", 42], ["Salmos", 150], ["Provérbios", 31], ["Eclesiastes", 12], ["Cantares", 8], ["Isaías", 66], ["Jeremias", 52], ["Lamentações", 5], ["Ezequiel", 48], ["Daniel", 12], ["Oseias", 14], ["Joel", 3], ["Amós", 9], ["Obadias", 1], ["Jonas", 4], ["Miqueias", 7], ["Naum", 3], ["Habacuque", 3], ["Sofonias", 3], ["Ageu", 2], ["Zacarias", 14], ["Malaquias", 4], ["Mateus", 28], ["Marcos", 16], ["Lucas", 24], ["João", 21], ["Atos", 28], ["Romanos", 16], ["1 Coríntios", 16], ["2 Coríntios", 13], ["Gálatas", 6], ["Efésios", 6], ["Filipenses", 4], ["Colossenses", 4], ["1 Tessalonicenses", 5], ["2 Tessalonicenses", 3], ["1 Timóteo", 6], ["2 Timóteo", 4], ["Tito", 3], ["Filemom", 1], ["Hebreus", 13], ["Tiago", 5], ["1 Pedro", 5], ["2 Pedro", 3], ["1 João", 5], ["2 João", 1], ["3 João", 1], ["Judas", 1], ["Apocalipse", 22]];
const ETU_MEDALHAS = [
  ["primeira-aula", "Primeiro passo", "Concluiu a primeira aula"],
  ["curso", "Curso concluído", "Terminou todas as aulas de um curso"],
  ["constante", "Constância", "Abriu a plataforma 7 dias seguidos"],
  ["desafio", "Desafiante", "Completou o primeiro Desafio Bíblico"],
  ["gabarito", "Gabarito perfeito", "Acertou todas as perguntas de uma rodada"],
  ["avancado", "Obreiro aprovado", "Fez 8 ou mais acertos no nível Avançado"],
  ["leitor", "Leitor da Palavra", "Marcou 7 dias do plano de leitura"],
  ["biblia", "Bíblia toda", "Completou o plano de leitura anual"],
  ["intercessor", "Intercessor", 'Marcou "Estou orando" em 5 pedidos']
];
function etuLS(k, d) {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : d;
  } catch (e) {
    return d;
  }
}
function etuLSs(k, v) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch (e) {
  }
}
function etuHoje() {
  const d = /* @__PURE__ */ new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function etuDiaAno() {
  const d = /* @__PURE__ */ new Date(), i = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d - i) / 864e5);
}
let etuAC = null;
function etuSom(tipo) {
  if (etuLS("etu_som", true) === false) return;
  try {
    etuAC = etuAC || new (window.AudioContext || window.webkitAudioContext)();
    const ac = etuAC, t0 = ac.currentTime;
    const nota = (f, ini, dur, forma, vol) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = forma || "sine";
      o.frequency.value = f;
      g.gain.setValueAtTime(1e-4, t0 + ini);
      g.gain.exponentialRampToValueAtTime(vol || 0.25, t0 + ini + 0.02);
      g.gain.exponentialRampToValueAtTime(1e-4, t0 + ini + dur);
      o.connect(g);
      g.connect(ac.destination);
      o.start(t0 + ini);
      o.stop(t0 + ini + dur + 0.05);
    };
    if (tipo === "certo") {
      nota(659, 0, 0.18, "triangle");
      nota(880, 0.12, 0.18, "triangle");
      nota(1319, 0.24, 0.35, "triangle");
    } else if (tipo === "errado") {
      nota(220, 0, 0.22, "sawtooth", 0.12);
      nota(165, 0.18, 0.35, "sawtooth", 0.12);
      try {
        navigator.vibrate && navigator.vibrate(180);
      } catch (e) {
      }
    } else if (tipo === "vitoria") {
      [523, 659, 784, 1047, 784, 1047].forEach((f, i) => nota(f, i * 0.13, 0.28, "triangle", 0.22));
    } else if (tipo === "medalha") {
      [784, 988, 1175, 1568].forEach((f, i) => nota(f, i * 0.09, 0.4, "sine", 0.2));
    } else nota(600, 0, 0.08, "sine", 0.12);
  } catch (e) {
  }
}
function etuConfete() {
  const box = document.createElement("div");
  box.className = "confete";
  const cores = ["#C9A24A", "#E2C47A", "#7A1B2B", "#1F6B45", "#2B4C8C", "#ffffff"];
  for (let i = 0; i < 70; i++) {
    const s = document.createElement("i");
    s.style.left = Math.random() * 100 + "%";
    s.style.background = cores[i % cores.length];
    s.style.animationDelay = Math.random() * 0.6 + "s";
    s.style.animationDuration = 1.8 + Math.random() * 1.4 + "s";
    s.style.transform = "rotate(" + Math.random() * 360 + "deg)";
    box.appendChild(s);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 3600);
}
function etuAviso(txt) {
  const t = document.createElement("div");
  t.className = "etu-toast";
  t.innerHTML = txt;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add("on"), 30);
  setTimeout(() => {
    t.classList.remove("on");
    setTimeout(() => t.remove(), 400);
  }, 4200);
}
function etuGanha(id) {
  const g = etuLS("etu_medalhas", {});
  if (g[id]) return;
  g[id] = etuHoje();
  etuLSs("etu_medalhas", g);
  const m = ETU_MEDALHAS.find((x) => x[0] === id);
  if (!m) return;
  etuSom("medalha");
  etuAviso(`<b>🏅 Nova conquista: ${esc(m[1])}</b><span>${esc(m[2])}</span>`);
}
function etuConfereMedalhas() {
  try {
    if (S.prog && S.prog.length) etuGanha("primeira-aula");
    if (S.prog && typeof ativosCursos === "function") ativosCursos().forEach((c) => {
      const l = lessonsOf(c.id);
      if (l.length && l.every((a) => S.prog.includes(a.id))) etuGanha("curso");
    });
    const v = etuLS("etu_visitas", []);
    let seq = 1;
    for (let i = v.length - 1; i > 0; i--) {
      if ((new Date(v[i]) - new Date(v[i - 1])) / 864e5 === 1) seq++;
      else break;
    }
    if (seq >= 7) etuGanha("constante");
    const lidos = Object.keys(etuLS("etu_leitura", {})).length;
    if (lidos >= 7) etuGanha("leitor");
    if (lidos >= 365) etuGanha("biblia");
    if (etuLS("etu_orando", []).length >= 5) etuGanha("intercessor");
  } catch (e) {
  }
}
(function() {
  const v = etuLS("etu_visitas", []), h = etuHoje();
  if (v[v.length - 1] !== h) {
    v.push(h);
    etuLSs("etu_visitas", v.slice(-30));
  }
})();
function etuVivoHome() {
  const box = $("#vivoSec");
  if (!box) return;
  const v = ETU_VERSOS[etuDiaAno() % ETU_VERSOS.length], ult = etuLS("etu_ultima", null);
  const ev = etuEventos().filter((e) => e.quando >= new Date(Date.now() - 3 * 36e5)).slice(0, 1)[0];
  box.innerHTML = `<div class="wrap vivo-g">
    <article class="vivo-c verso"><small>VERSÍCULO DO DIA</small><p>“${esc(v[0])}”</p><b>${esc(v[1])} (ARC)</b><button type="button" class="btn btn-line btn-sm" id="versoShare">Compartilhar</button></article>
    <article class="vivo-c desafio"><small>DESAFIO BÍBLICO</small><b>Quanto você conhece da Palavra?</b><p>Perguntas dos níveis Básico, Médio e Avançado, charadas “Quem sou eu?” e a resposta certa explicada com o texto bíblico.</p><a class="btn btn-gold btn-sm" href="#desafio">Começar o desafio</a></article>
    ${!S.user ? `<article class="vivo-c"><small>PRIMEIRA VEZ AQUI?</small><b>Guia da plataforma, passo a passo</b><p>Aprenda a entrar, se matricular, estudar, fazer as provas e receber o certificado e a carteira de estudante.</p><a class="btn btn-navy btn-sm" href="#como-usar">Ver o guia</a></article>` : ""}
    <article class="vivo-c" style="border:2px solid #7A1B2B"><small style="color:#7A1B2B">COMUNICADO OFICIAL</small><b>Cuidado com perfis falsos</b><p>O Pr. Charlei não usa Facebook há muitos anos. Conheça os únicos canais oficiais da escola.</p><a class="btn btn-navy btn-sm" href="#oficial">Ler o comunicado</a></article>
    ${ult && S.user ? `<article class="vivo-c cont"><small>CONTINUAR DE ONDE PAROU</small><b>${esc(ult.t || "Sua última aula")}</b><p>${esc(ult.c || "")}</p><button type="button" class="btn btn-navy btn-sm" id="contUlt">Continuar</button></article>` : ""}
    ${ev ? `<article class="vivo-c agenda"><small>PRÓXIMO EVENTO</small><b>${esc(ev.titulo)}</b><p>${esc(ev.dataTxt)}</p><a class="btn btn-line btn-sm" href="#agenda">Ver a agenda</a></article>` : ""}
  </div>`;
  const sh = $("#versoShare");
  if (sh) sh.onclick = async () => {
    const t = `“${v[0]}” (${v[1]}, ARC)

Versículo do dia — Escola Teológica União
${CONFIG.LINK_PUBLICO || location.origin}`;
    try {
      if (navigator.share) await navigator.share({ text: t });
      else {
        await navigator.clipboard.writeText(t);
        etuAviso("<b>Versículo copiado.</b><span>Agora é só colar no WhatsApp.</span>");
      }
    } catch (e) {
    }
  };
  const cu = $("#contUlt");
  if (cu) cu.onclick = () => {
    S.pendAula = ult.a;
    S.pendDisc = ult.d || null;
    location.hash = "curso-" + ult.cid;
  };
}
function etuDesafioBanco(nivel) {
  const base = (ETU_DESAFIO[nivel] || []).map((q) => ({ p: q[0], o: q[1], c: q[2], e: q[3] }));
  const mur = (S.mural || []).filter((m) => m.tipo === "Desafio bíblico").map((m) => {
    const ls = etuOpcoes(m.texto), niv = (ls.find((x) => x.startsWith("#")) || "#Básico").slice(1).trim(), ops = ls.filter((x) => !x.startsWith("#"));
    const c = ops.findIndex((x) => x.startsWith("*"));
    return { nivel: niv, p: m.titulo, o: ops.map((x) => x.replace(/^\*\s*/, "")), c: c < 0 ? 0 : c, e: etuTextoSem(m.texto) };
  }).filter((q) => q.nivel === nivel && q.o.length >= 2);
  return mur.concat(base);
}
function ETU_DZ_CURADOS() {
  return Object.keys(ETU_DESAFIO).filter((k) => ETU_DESAFIO[k].length).reduce((t, k) => t.concat(etuDesafioBanco(k)), []);
}
function etuEmbaralha(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function etuDesafio() {
  const r = $("#desafioBox");
  if (!r) return;
  const rec = etuLS("etu_desafio_rec", {}), som = etuLS("etu_som", true);
  r.innerHTML = `<div class="dz-niveis">${Object.keys(ETU_DESAFIO).map((n) => {
    var _a;
    return `<button type="button" class="dz-nv" data-nv="${esc(n)}"><b>${esc(n)}</b><span>${esc((window.ETU_DESAFIO_DESC || {})[n] || "")} · ${n === "Perguntas sem fim" ? "perguntas que não acabam" : n === "Jornada pelos 66 livros" ? `você está em ${esc(((_a = (window.etuLivros || [])[Math.min(65, +etuLS("etu_jornada", 0) || 0)]) == null ? void 0 : _a.n) || "Gênesis")}` : etuDesafioBanco(n).length + " perguntas"}</span>${rec[n] !== void 0 ? `<i>Seu recorde: ${rec[n]}</i>` : ""}</button>`;
  }).join("")}</div>
    <p class="dz-som"><label><input type="checkbox" id="dzSom" ${som ? "checked" : ""}> Som ligado</label></p>`;
  $("#dzSom").onchange = (e) => etuLSs("etu_som", e.target.checked);
  r.querySelectorAll("[data-nv]").forEach((b) => b.onclick = () => {
    etuSom("clique");
    etuRodada(b.dataset.nv);
  });
}
function etuRodada(nivel) {
  const r = $("#desafioBox");
  let escolha = [], restam = 0, rotulo = "", titulo = nivel, aposFim = null;
  if (nivel === "Perguntas sem fim" && window.etuGeraSemFim) {
    const vk = "etu_dz_vistas_semfim", vistas = etuLS(vk, []);
    const curadas = etuEmbaralha(ETU_DZ_CURADOS().filter((q) => !vistas.includes(q.p))).slice(0, 10);
    escolha = etuEmbaralha(curadas.concat(window.etuGeraSemFim(30 - curadas.length, vistas))).slice(0, 30);
    etuLSs(vk, vistas.concat(escolha.map((q) => q.p)).slice(-900));
    restam = Infinity;
    rotulo = "Continuar: mais 30 perguntas novas";
  } else if (nivel === "Jornada pelos 66 livros" && window.etuGeraLivro) {
    const k = Math.min(65, Math.max(0, +etuLS("etu_jornada", 0) || 0)), lv = window.etuLivros[k];
    const extras = ETU_DZ_CURADOS().filter((q) => (q.p + " " + q.e).indexOf(lv.n) >= 0);
    escolha = window.etuGeraLivro(k).concat(etuEmbaralha(extras).slice(0, 5));
    titulo = "Livro " + (k + 1) + " de 66: " + lv.n;
    restam = Infinity;
    const prox = window.etuLivros[(k + 1) % 66];
    rotulo = k === 65 ? "Recomeçar a jornada em Gênesis" : "Avançar para " + prox.n;
    aposFim = () => etuLSs("etu_jornada", (k + 1) % 66);
  } else {
    const todas = etuDesafioBanco(nivel), vk = "etu_dz_vistas_" + nivel;
    let vistas = etuLS(vk, []);
    let novas = todas.filter((q) => !vistas.includes(q.p));
    if (novas.length < Math.min(30, todas.length)) {
      vistas = [];
      novas = todas.slice();
    }
    escolha = etuEmbaralha(novas).slice(0, 30);
    etuLSs(vk, vistas.concat(escolha.map((q) => q.p)).slice(-600));
    restam = todas.filter((q) => !vistas.concat(escolha.map((x) => x.p)).includes(q.p)).length;
  }
  const qs = escolha.map((q) => {
    const idx = etuEmbaralha(q.o.map((_, i2) => i2));
    return __spreadProps(__spreadValues({}, q), { o: idx.map((i2) => q.o[i2]), c: idx.indexOf(q.c) });
  });
  let i = 0, pts = 0;
  const desenha = () => {
    const q = qs[i];
    r.innerHTML = `<div class="dz-top"><span>${esc(titulo)}</span><span>Pergunta ${i + 1} de ${qs.length}</span><span>Acertos: ${pts}</span></div><div class="dz-barra"><i style="width:${i * 100 / qs.length}%"></i></div>
      <h3 class="dz-p">${esc(q.p)}</h3><div class="dz-ops">${q.o.map((o, k) => `<button type="button" class="dz-op" data-k="${k}"><span class="dz-l">${"ABCDEFGHIJ"[k]}</span>${esc(o)}</button>`).join("")}</div><div id="dzExp"></div>`;
    r.querySelectorAll(".dz-op").forEach((b) => b.onclick = () => {
      if (r.querySelector(".dz-op.trava")) return;
      const k = +b.dataset.k, ok = k === q.c;
      r.querySelectorAll(".dz-op").forEach((x) => {
        x.classList.add("trava");
        if (+x.dataset.k === q.c) x.classList.add("certo");
      });
      if (!ok) b.classList.add("errado");
      if (ok) {
        pts++;
        etuSom("certo");
      } else etuSom("errado");
      $("#dzExp").innerHTML = `<div class="dz-exp ${ok ? "ok" : "no"}"><b>${ok ? "Muito bem! Resposta certa." : "Não foi desta vez."}</b><p><strong>A resposta certa é: ${esc(q.o[q.c])}.</strong></p><p>${esc(q.e)}</p><button type="button" class="btn btn-gold" id="dzProx">${i + 1 < qs.length ? "Próxima pergunta" : "Ver o resultado"}</button></div>`;
      $("#dzProx").onclick = () => {
        i++;
        if (i < qs.length) {
          desenha();
          scrollTo({ top: Math.max(0, r.getBoundingClientRect().top + scrollY - 120), behavior: "smooth" });
        } else fim();
      };
      setTimeout(() => {
        const x = $("#dzExp");
        if (x) x.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 120);
    });
  };
  const fim = () => {
    const n = qs.length, pc = Math.round(pts * 100 / n), rec = etuLS("etu_desafio_rec", {});
    const novo = rec[nivel] === void 0 || pts > rec[nivel];
    if (novo) {
      rec[nivel] = pts;
      etuLSs("etu_desafio_rec", rec);
    }
    if (aposFim) aposFim();
    const info = restam === Infinity ? nivel === "Jornada pelos 66 livros" ? `<p style="margin:0 0 8px">${esc(titulo)} concluído. A jornada continua pelo próximo livro da Bíblia.</p>` : '<p style="margin:0 0 8px">As perguntas não acabam: cada rodada traz novas combinações de toda a Bíblia.</p>' : restam > 0 ? `<p style="margin:0 0 8px">Ainda há <b>${restam}</b> perguntas novas neste nível.</p>` : '<p style="margin:0 0 8px">Você respondeu todas as perguntas deste nível. Na próxima rodada, elas voltam embaralhadas.</p>';
    const msg = pc === 100 ? "Gabarito perfeito! Glória a Deus pelo seu estudo." : pc >= 70 ? "Excelente! Você tem estudado a Palavra com dedicação." : pc >= 40 ? "Bom caminho! Releia as explicações e tente de novo." : "Não desanime: cada explicação é uma aula. Tente outra vez.";
    r.innerHTML = `<div class="dz-fim"><div class="dz-nota">${pts}<small>/${n}</small></div><h3>${esc(msg)}</h3>${novo ? '<p class="dz-rec">Novo recorde neste nível!</p>' : ""}${info}<p>“Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar, que maneja bem a palavra da verdade” (2 Timóteo 2.15).</p>
      <div class="acts" style="justify-content:center"><button type="button" class="btn btn-gold" id="dzDe">${rotulo ? esc(rotulo) : restam > 0 ? `Continuar: ${esc(nivel)}, novas perguntas` : `Recomeçar: ${esc(nivel)}`}</button><button type="button" class="btn btn-line" id="dzNiv">Escolher outro nível</button><button type="button" class="btn btn-line" id="dzSh">Desafiar um amigo</button></div></div>`;
    if (pc >= 70) {
      etuSom("vitoria");
      etuConfete();
    } else etuSom("clique");
    etuGanha("desafio");
    if (pts === n) etuGanha("gabarito");
    if ((nivel === "Avançado" || nivel === "Doutorado") && pc >= 80) etuGanha("avancado");
    scrollTo({ top: Math.max(0, r.getBoundingClientRect().top + scrollY - 120), behavior: "smooth" });
    $("#dzDe").onclick = () => etuRodada(nivel);
    $("#dzNiv").onclick = etuDesafio;
    $("#dzSh").onclick = async () => {
      const t = `Fiz ${pts} de ${n} no Desafio Bíblico (${nivel}) da Escola Teológica União. Você consegue fazer mais?
${CONFIG.LINK_PUBLICO || location.origin}#desafio`;
      try {
        if (navigator.share) await navigator.share({ text: t });
        else {
          await navigator.clipboard.writeText(t);
          etuAviso("<b>Mensagem copiada.</b><span>Cole no WhatsApp para desafiar um amigo.</span>");
        }
      } catch (e) {
      }
    };
  };
  if (!qs.length) {
    r.innerHTML = "<p>Nenhuma pergunta neste nível ainda.</p>";
    return;
  }
  desenha();
  scrollTo({ top: Math.max(0, r.getBoundingClientRect().top + scrollY - 120), behavior: "smooth" });
}
const ETU_CAPS = (() => {
  const l = [];
  ETU_LIVROS.forEach(([b, n]) => {
    for (let c = 1; c <= n; c++) l.push([b, c]);
  });
  return l;
})();
function etuLeituraDia(d) {
  const a = Math.floor((d - 1) * ETU_CAPS.length / 365), b = Math.floor(d * ETU_CAPS.length / 365) - 1;
  const g = [];
  for (let i = a; i <= b; i++) {
    const [l, c] = ETU_CAPS[i];
    const u = g[g.length - 1];
    if (u && u.l === l) u.f = c;
    else g.push({ l, i: c, f: c });
  }
  return g.map((x) => x.i === x.f ? `${x.l} ${x.i}` : `${x.l} ${x.i}–${x.f}`).join("; ");
}
function etuLeitura() {
  const r = $("#leituraBox");
  if (!r) return;
  let ini = etuLS("etu_leitura_ini", null);
  if (!ini) {
    ini = etuHoje();
    etuLSs("etu_leitura_ini", ini);
  }
  const lidos = etuLS("etu_leitura", {}), hoje = Math.min(365, Math.max(1, Math.floor((new Date(etuHoje()) - new Date(ini)) / 864e5) + 1)), feitos = Object.keys(lidos).length;
  const linha = (d) => `<label class="lt-d ${lidos[d] ? "ok" : ""} ${d === hoje ? "hoje" : ""}"><input type="checkbox" data-ld="${d}" ${lidos[d] ? "checked" : ""}><span class="lt-n">Dia ${d}</span><span class="lt-t">${esc(etuLeituraDia(d))}</span></label>`;
  let semana = "";
  for (let d = Math.max(1, hoje - 2); d <= Math.min(365, hoje + 4); d++) semana += linha(d);
  r.innerHTML = `<div class="panel lt-hoje"><small>LEITURA DE HOJE · DIA ${hoje} DE 365</small><h3>${esc(etuLeituraDia(hoje))}</h3><div class="progress"><i style="width:${Math.round(feitos * 100 / 365)}%"></i></div><p class="meta">${feitos} de 365 dias lidos (${Math.round(feitos * 100 / 365)}%). O plano percorre a Bíblia inteira, de Gênesis a Apocalipse, em ordem.</p></div>
    <h3 style="margin:22px 0 8px">Esta semana</h3><div class="lt-lista">${semana}</div>
    <details class="perg" style="margin-top:18px"><summary>Ver o plano completo (365 dias)</summary><div class="lt-lista" id="ltTudo"></div></details>
    <p style="font-size:14.5px;color:var(--muted)">O plano começou em ${fmtDate(ini)} neste aparelho. <button type="button" class="btn btn-line btn-sm" id="ltZera">Recomeçar a partir de hoje</button></p>`;
  const liga = (root) => root.querySelectorAll("[data-ld]").forEach((c) => c.onchange = () => {
    const L = etuLS("etu_leitura", {});
    if (c.checked) {
      L[c.dataset.ld] = etuHoje();
      etuSom("certo");
    } else delete L[c.dataset.ld];
    etuLSs("etu_leitura", L);
    etuConfereMedalhas();
    etuLeitura();
  });
  liga(r);
  r.querySelector("details").ontoggle = (e) => {
    const t = $("#ltTudo");
    if (e.target.open && !t.innerHTML) {
      let h = "";
      for (let d = 1; d <= 365; d++) h += linha(d);
      t.innerHTML = h;
      liga(t);
    }
  };
  $("#ltZera").onclick = () => confirmBox("Recomeçar o plano de leitura a partir de hoje? As marcações feitas serão apagadas.", () => {
    etuLSs("etu_leitura_ini", etuHoje());
    etuLSs("etu_leitura", {});
    etuLeitura();
  });
}
function etuOracao() {
  const r = $("#oracaoLista");
  if (!r) return;
  const l = (S.mural || []).filter((m) => m.tipo === "Pedido de oração"), meus = etuLS("etu_orando", []);
  r.innerHTML = l.length ? l.map((m) => `<article class="mcard or-c"><div class="bd"><div class="mtag">PEDIDO DE ORAÇÃO</div><h3>${esc(m.titulo)}</h3>${m.texto ? `<p>${esc(etuTextoSem(m.texto))}</p>` : ""}<button type="button" class="btn ${meus.includes(String(m.id)) ? "btn-navy" : "btn-gold"} btn-sm" data-or="${esc(String(m.id))}">${meus.includes(String(m.id)) ? "✓ Estou orando" : "🙏 Estou orando"}</button><span class="or-n" data-orn="${esc(String(m.id))}"></span></div></article>`).join("") : '<div class="panel" style="grid-column:1/-1;text-align:center"><p style="margin:0">Os pedidos aprovados pela Direção aparecem aqui para que todos orem juntos.</p></div>';
  r.querySelectorAll("[data-or]").forEach(async (b) => {
    const id = b.dataset.or, n = r.querySelector(`[data-orn="${id}"]`);
    const conta = async () => {
      try {
        const x = await API.resultado(isNaN(+id) ? id : +id);
        const t = x.reduce((a, y) => a + Number(y.votos), 0);
        n.textContent = t ? ` ${t} irmão(s) orando` : "";
      } catch (e) {
      }
    };
    if (S.user) conta();
    b.onclick = async () => {
      const L = etuLS("etu_orando", []);
      if (!L.includes(id)) {
        L.push(id);
        etuLSs("etu_orando", L);
      }
      b.className = "btn btn-navy btn-sm";
      b.textContent = "✓ Estou orando";
      etuSom("certo");
      if (S.user) {
        try {
          await API.votar(isNaN(+id) ? id : +id, 0);
          conta();
        } catch (e) {
        }
      }
      etuConfereMedalhas();
    };
  });
  const f = $("#orEnviar");
  if (f && !f.dataset.ok) {
    f.dataset.ok = 1;
    f.onclick = async () => {
      const q = $("#orTxt").value.trim(), m = $("#mOr");
      if (q.length < 8) return show(m, "Escreva o seu pedido com um pouco mais de detalhe.", "err");
      const pub = $("#orPub").checked;
      try {
        await API.abrirAtendimento({ nome: S.profile && S.profile.nome || $("#orNome").value.trim() || "Visitante", contato: S.user && S.user.email || $("#orCont").value.trim(), mensagem: "PEDIDO DE ORAÇÃO" + (pub ? " (autoriza publicar sem o nome)" : " (somente para a Direção)") + " — " + q, conversa: [] });
        $("#orTxt").value = "";
        show(m, "Seu pedido chegou à Direção. Estamos orando com você.", "ok");
      } catch (e) {
        show(m, "Não foi possível enviar agora: " + e.message, "err");
      }
    };
  }
  const vis = $("#orVis");
  if (vis) vis.style.display = S.user ? "none" : "";
}
function etuEventos() {
  return (S.mural || []).filter((m) => m.tipo === "Evento").map((m) => {
    const d = (etuOpcoes(m.texto).find((x) => x.startsWith("@")) || "").slice(1);
    const q = d ? new Date(d) : null;
    return __spreadProps(__spreadValues({}, m), { quando: q, dataTxt: q && !isNaN(q) ? q.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" }) + " às " + q.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "Data a confirmar" });
  }).filter((e) => e.quando && !isNaN(e.quando)).sort((a, b) => a.quando - b.quando);
}
function etuAgenda() {
  const r = $("#agendaLista");
  if (!r) return;
  const ag = Date.now() - 3 * 36e5, l = etuEventos(), prox = l.filter((e) => e.quando >= ag), pas = l.filter((e) => e.quando < ag).reverse().slice(0, 6);
  const card = (e) => `<article class="ag-c ${e.quando < ag ? "pass" : ""}"><div class="ag-d"><b>${e.quando.getDate()}</b><span>${e.quando.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "").toUpperCase()}</span></div><div class="ag-t"><h3>${esc(e.titulo)}</h3><p class="meta">${esc(e.dataTxt)}</p>${etuTextoSem(e.texto) ? `<p>${esc(etuTextoSem(e.texto))}</p>` : ""}${e.video_url ? `<a class="btn btn-gold btn-sm" href="${esc(e.video_url)}" target="_blank" rel="noopener">${e.quando < ag ? "Assistir" : "Acessar o link"}</a>` : ""}</div></article>`;
  r.innerHTML = (prox.length ? prox.map(card).join("") : '<div class="panel" style="text-align:center"><p style="margin:0">Nenhum evento marcado no momento. Os próximos aparecerão aqui.</p></div>') + (pas.length ? `<h3 style="margin:26px 0 10px">Eventos realizados</h3>${pas.map(card).join("")}` : "");
}
(function() {
  function avisa() {
    try {
      const h = etuHoje(), vistos = etuLS("etu_ev_avisos", []);
      etuEventos().forEach((e) => {
        const d = e.quando;
        const dia = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
        if (dia === h && !vistos.includes(String(e.id))) {
          vistos.push(String(e.id));
          etuLSs("etu_ev_avisos", vistos);
          etuAviso(`<b>Hoje: ${esc(e.titulo)}</b><span>${esc(e.dataTxt)}</span>`);
          if ("Notification" in window && Notification.permission === "granted" && navigator.serviceWorker) navigator.serviceWorker.ready.then((r) => r.showNotification("Hoje na ETU: " + e.titulo, { body: e.dataTxt, icon: "./icone-192.png", badge: "./selo-notif.png", tag: "etu-ev-" + e.id }));
        }
      });
    } catch (e) {
    }
  }
  addEventListener("load", () => setTimeout(avisa, 4e3));
})();
function etuConcluintes() {
  const r = $("#concLista");
  if (!r) return;
  const l = (S.mural || []).filter((m) => m.tipo === "Concluinte");
  r.innerHTML = l.length ? l.map((m) => `<article class="cc-c"><div class="cc-s">🎓</div><h3>${esc(m.titulo)}</h3><p>${esc(etuTextoSem(m.texto) || "Concluiu o curso na Escola Teológica União")}</p><span>Parabéns!</span></article>`).join("") : '<div class="panel" style="grid-column:1/-1;text-align:center"><p style="margin:0">Os nomes dos alunos que concluírem os cursos, com a autorização deles, aparecerão aqui.</p></div>';
}
function etuConquistas() {
  etuConfereMedalhas();
  const r = $("#conqLista");
  if (!r) return;
  const g = etuLS("etu_medalhas", {}), n = Object.keys(g).length;
  r.innerHTML = `<p style="text-align:center;font-size:17px;margin:0 0 16px">Você conquistou <b>${n} de ${ETU_MEDALHAS.length}</b> medalhas.</p><div class="cq-g">${ETU_MEDALHAS.map((m) => `<div class="cq ${g[m[0]] ? "on" : ""}"><div class="cq-i">${g[m[0]] ? "🏅" : "🔒"}</div><b>${esc(m[1])}</b><span>${esc(m[2])}</span>${g[m[0]] ? `<i>${fmtDate(g[m[0]])}</i>` : ""}</div>`).join("")}</div><p style="font-size:14.5px;color:var(--muted);text-align:center;margin-top:14px">As medalhas ficam guardadas neste aparelho.</p>`;
}
function etuVivoRota() {
  const h = location.hash.slice(1) || "inicio";
  if (h === "inicio") etuVivoHome();
  if (h === "desafio") etuDesafio();
  if (h === "leitura") etuLeitura();
  if (h === "oracao") etuOracao();
  if (h === "agenda") etuAgenda();
  if (h === "concluintes") etuConcluintes();
  if (h === "conquistas") etuConquistas();
  etuConfereMedalhas();
}
addEventListener("hashchange", () => setTimeout(etuVivoRota, 80));
addEventListener("load", () => setTimeout(etuVivoRota, 1600));
(function() {
  try {
    if (sessionStorage.getItem("etu_abertura")) return;
    sessionStorage.setItem("etu_abertura", "1");
  } catch (e) {
  }
  if (/[#&](access_token|type=recovery)/.test(location.hash)) return;
  const v = ETU_VERSOS[etuDiaAno() % ETU_VERSOS.length];
  const d = document.createElement("div");
  d.className = "abertura";
  d.setAttribute("role", "dialog");
  d.setAttribute("aria-label", "Boas-vindas");
  d.innerHTML = `<div class="ab-moldura">
    <img class="ab-selo" src="selo-fita.webp" alt="Selo oficial da Escola Teológica União" width="150" height="150">
    <h1>Escola Teológica União</h1><p class="ab-lema">Formação Bíblica, Teológica e Ministerial</p>
    <div class="ab-orn"><span></span>✦<span></span></div>
    <blockquote>“${esc(v[0])}”<cite>${esc(v[1])}</cite></blockquote>
    <div class="ab-cred"><b>✓ Plataforma oficial verificada</b><span>Curso Livre de Teologia · Cristalina, Goiás</span><span>CNPJ ••.••7.548/0001-••</span></div>
    <button type="button" class="ab-entrar">Entrar na plataforma</button>
    <small class="ab-rod">Idealizador e Diretor Geral: Pr. Charlei de Jesus Lima Dias</small></div>`;
  const fecha = () => {
    d.classList.add("sai");
    setTimeout(() => d.remove(), 600);
  };
  d.querySelector(".ab-entrar").onclick = fecha;
  document.body.appendChild(d);
  setTimeout(fecha, 12e3);
})();
function etuNumMatricula(a) {
  const l = (S.alunos || []).filter((x) => !x.is_admin).slice().sort((x, y) => String(x.criado_em || "") < String(y.criado_em || "") ? -1 : 1);
  const ano = String(a.criado_em || today()).slice(0, 4), mesmos = l.filter((x) => String(x.criado_em || "").slice(0, 4) === ano);
  const n = mesmos.findIndex((x) => x.id === a.id) + 1;
  return "ETU-" + ano + "-" + String(n || 0).padStart(4, "0");
}
function etuSituacaoMens(m) {
  if (!m || m.status === "bloqueado") return "suspensa";
  if (m.status !== "ativo") return "outra";
  if (!m.expira_em) return "semvalidade";
  const h = today();
  if (m.expira_em < h) return vigente(m.expira_em) ? "atrasada" : "suspensa";
  if (m.expira_em <= addDias(h, 7)) return "vence";
  return "emdia";
}
async function etuPainelNumeros(alunos, pendPag) {
  const mes = today().slice(0, 7);
  let L = [];
  try {
    L = await API.lancamentos();
  } catch (e) {
  }
  window.etuCxL = L;
  try {
    window.etuContas = await API.contasPagar();
  } catch (e) {
    window.etuContas = window.etuContas || [];
  }
  try {
    window.etuDasnL = await API.declaracoesMei();
  } catch (e) {
    window.etuDasnL = window.etuDasnL || [];
  }
  let T = [];
  try {
    T = await API.tentativasTodas();
  } catch (e) {
  }
  const novos = alunos.filter((a) => String(a.criado_em || "").startsWith(mes)).length;
  const ativos = alunos.filter((a) => !a.bloqueado && a.matriculas.some(isActive)).length;
  const rec = L.filter((l) => l.tipo === "entrada" && (l.data || "").startsWith(mes)).reduce((x, l) => x + numBR(l.valor), 0);
  let atras = 0, vence = 0;
  alunos.forEach((a) => a.matriculas.forEach((m) => {
    const s2 = etuSituacaoMens(m);
    if (s2 === "atrasada" || s2 === "suspensa" && m.status === "ativo") atras++;
    if (s2 === "vence") vence++;
  }));
  const provas = T.filter((t) => String(t.criado_em || "").startsWith(mes)).length;
  let concl = 0;
  alunos.forEach((a) => {
    CURSOS.forEach((c) => {
      const l = lessonsOf(c.id);
      if (l.length && l.every((x) => (S.allProg || []).some((p) => p.user_id === a.id && p.aula_id === x.id))) concl++;
    });
  });
  const card = (v, t, sub, ir, alerta) => `<div ${ir ? `data-ir="${ir}"` : ""} style="${alerta ? "background:#7A1B2B;border-color:#E4C677" : ""}"><b>${v}</b><span>${t}</span>${sub ? `<small>${sub}</small>` : ""}</div>`;
  $("#stats").innerHTML = card(pendPag, "Pix a conferir", pendPag ? "toque para conferir" : "tudo conferido", "pagamentos", pendPag > 0) + card(ativos, "Alunos ativos", alunos.length + " inscritos no total") + card(novos, "Novos neste mês", "", null) + card(brl(rec), "Receita do mês", "toque para abrir o caixa", "contab") + card(atras, "Mensalidades atrasadas", vence + " vencem em 7 dias", "mens", atras > 0) + card(provas, "Provas feitas no mês", "") + card(concl, "Cursos concluídos", "soma de todos os alunos") + (() => {
    const pd = etuPendencias(L);
    return card(pd.length, "Pendências do MEI", pd.length ? pd.length === 1 ? esc(pd[0].t.replace(/ \(R\$[^)]*\)/, "")) : "toque para ver" : "tudo em dia ✓", "contab", pd.length > 0);
  })() + (() => {
    const ab = (window.etuContas || []).filter((c) => c.status !== "pago"), ve = ab.filter((c) => etuDiasPara(c.vencimento) <= 0).length;
    return card(ab.length, "Boletos e guias a pagar", ab.length ? ve ? ve + " vencido(s) ou vencendo hoje" : "próximo vence em " + fmtDate(ab.slice().sort((a, b) => a.vencimento < b.vencimento ? -1 : 1)[0].vencimento) : "tudo quitado ✓", "contab", ve > 0);
  })() + await (async () => {
    let n = 0;
    try {
      const lim = new Date(Date.now() - 30 * 864e5).toISOString();
      n = (await API.atendimentos()).filter((t) => String(t.criado_em || "") >= lim && /^(ALERTA DE SEGURANÇA|DENÚNCIA DE PERFIL FALSO)/.test(String(t.mensagem || ""))).length;
    } catch (e) {
    }
    return card(n, "Alertas de segurança", "últimos 30 dias · toque para ver", "atendimentos", n > 0);
  })();
  $$("#stats [data-ir]").forEach((d) => d.onclick = () => {
    const k = d.dataset.ir;
    if (k === "mens") {
      const p = $("#mensPanel");
      if (p) p.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const t = document.querySelector('.tabs button[data-tab="' + k + '"]');
    if (t) t.click();
  });
}
let etuMensFiltro = "atrasada";
function etuMensalidades() {
  const P = $("#mensPanel");
  if (!P) return;
  const alunos = (S.alunos || []).filter((a) => !a.is_admin);
  const L = [];
  alunos.forEach((a) => a.matriculas.forEach((m) => L.push({ a, m, s: etuSituacaoMens(m) })));
  const G = [["atrasada", "Atrasadas"], ["vence", "Vencem em 7 dias"], ["suspensa", "Suspensas"], ["emdia", "Em dia"], ["semvalidade", "Sem vencimento"]];
  const cont = (k) => L.filter((x) => x.s === k).length;
  const lista = L.filter((x) => x.s === etuMensFiltro).sort((x, y) => String(x.m.expira_em || "") < String(y.m.expira_em || "") ? -1 : 1);
  const msgPara = (x) => {
    var _a;
    const t = ((_a = curso(x.m.curso_id)) == null ? void 0 : _a.titulo) || "curso", n = (x.a.nome || "").split(" ")[0];
    if (x.s === "vence") return `A paz do Senhor, ${n}! Aqui é da Escola Teológica União. Passando para lembrar, com carinho, que a mensalidade do ${t} vence em ${fmtDate(x.m.expira_em)}. O Pix é ${CONFIG.PIX_CHAVE}; depois é só enviar o comprovante pela plataforma. Deus abençoe os seus estudos!`;
    if (x.s === "atrasada") return `A paz do Senhor, ${n}! Aqui é da Escola Teológica União. A mensalidade do ${t} venceu em ${fmtDate(x.m.expira_em)}, e o seu acesso continua liberado até ${fmtDate(addDias(x.m.expira_em, +CONFIG.TOLERANCIA_DIAS || 0))}. O Pix é ${CONFIG.PIX_CHAVE}. Se precisar combinar outra data, é só responder esta mensagem. Deus abençoe!`;
    if (x.s === "suspensa") return `A paz do Senhor, ${n}! Aqui é da Escola Teológica União. Sentimos a sua falta nos estudos do ${t}. O acesso está pausado por causa da mensalidade; assim que o Pix (${CONFIG.PIX_CHAVE}) for feito e o comprovante enviado, liberamos de novo. Se estiver passando por alguma dificuldade, fale conosco. Deus abençoe!`;
    return `A paz do Senhor, ${n}! Aqui é da Escola Teológica União. Como estão os seus estudos no ${t}? Estamos à disposição. Deus abençoe!`;
  };
  P.innerHTML = `<h3 style="margin-top:0">Controle de mensalidades</h3><p style="margin:0;color:var(--muted);font-size:15.5px">A situação de cada matrícula é calculada sozinha pela data de vencimento. Toque num grupo para ver os alunos.</p>
    <div class="mg">${G.map(([k, t]) => `<button type="button" data-mg="${k}" class="${etuMensFiltro === k ? "on" : ""}">${t}<b>${cont(k)}</b></button>`).join("")}</div>
    ${lista.length ? `<div class="tbl-wrap"><table><thead><tr><th>Aluno</th><th>Curso</th><th>Vencimento</th><th></th></tr></thead><tbody>${lista.map((x) => {
    var _a;
    const tel = String(x.a.telefone || "").replace(/\D/g, "");
    return `<tr><td><b>${esc(x.a.nome || "")}</b><br><span style="font-size:13.5px;color:var(--muted)">${esc(etuNumMatricula(x.a))}</span></td><td>${esc(((_a = curso(x.m.curso_id)) == null ? void 0 : _a.titulo) || x.m.curso_id)}</td><td>${x.m.expira_em ? fmtDate(x.m.expira_em) : "—"}</td><td><div class="chips">${tel ? `<a class="btn btn-gold btn-sm" target="_blank" rel="noopener" href="https://wa.me/${tel.length <= 11 ? "55" + tel : tel}?text=${encodeURIComponent(msgPara(x))}">Lembrar pelo WhatsApp</a>` : '<span style="font-size:14px;color:var(--muted)">sem telefone</span>'}<button class="btn btn-line btn-sm" type="button" data-mfi="${x.a.id}">Ficha</button><button class="btn btn-line btn-sm" type="button" data-mlib="${x.a.id}">Renovar</button></div></td></tr>`;
  }).join("")}</tbody></table></div>` : '<p style="margin:0;color:var(--muted)">Nenhum aluno neste grupo.</p>'}`;
  P.querySelectorAll("[data-mg]").forEach((b) => b.onclick = () => {
    etuMensFiltro = b.dataset.mg;
    etuMensalidades();
  });
  P.querySelectorAll("[data-mfi]").forEach((b) => b.onclick = () => dlgAcomp(S.alunos.find((a) => a.id === b.dataset.mfi)));
  P.querySelectorAll("[data-mlib]").forEach((b) => b.onclick = () => dlgAcesso(S.alunos.find((a) => a.id === b.dataset.mlib)));
}
const ETU_LEGENDAS = ["Curso Livre de Teologia", "Teologia Sistemática · Teologia Bíblica · Apologética", "Videoaulas, apostilas e avaliações", "“Procura apresentar-te a Deus aprovado” — 2 Timóteo 2.15", "Estude a Palavra de Deus onde você estiver", "Profundidade acadêmica e fidelidade às Escrituras"];
function etuMoeda(img, verso, legEl) {
  if (!img || img.dataset.moeda) return;
  img.dataset.moeda = "1";
  const w = document.createElement("span");
  w.className = "moeda";
  const inn = document.createElement("span");
  inn.className = "moeda-in";
  img.parentNode.insertBefore(w, img);
  w.appendChild(inn);
  inn.appendChild(img);
  img.classList.add("moeda-f");
  const b = document.createElement("span");
  b.className = "moeda-v";
  b.innerHTML = `<img src="${verso}" alt="" aria-hidden="true">`;
  inn.appendChild(b);
  const quieto = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  let i = 0, lado = false;
  if (legEl) {
    legEl.textContent = ETU_LEGENDAS[0];
    legEl.classList.add("moeda-leg");
  }
  if (quieto) return;
  setInterval(() => {
    if (!document.body.contains(w)) return;
    lado = !lado;
    inn.classList.toggle("vira", lado);
    if (legEl) {
      legEl.classList.add("sai");
      setTimeout(() => {
        i = (i + 1) % ETU_LEGENDAS.length;
        legEl.textContent = ETU_LEGENDAS[i];
        legEl.classList.remove("sai");
      }, 700);
    }
  }, 4800);
}
(function() {
  function liga() {
    const ab = document.querySelector(".abertura .ab-selo");
    if (ab && !ab.dataset.moeda) {
      const l = document.createElement("p");
      l.className = "ab-leg";
      const lema = document.querySelector(".abertura .ab-lema");
      if (lema) lema.after(l);
      etuMoeda(ab, "brasao-redondo.webp", l);
    }
    const h = document.querySelector("section.hero img.crest");
    if (h && !h.dataset.moeda) {
      const l = document.createElement("p");
      l.className = "hero-leg";
      etuMoeda(h, "selo-fita.webp", null);
      h.closest(".moeda").after(l);
      etuMoeda.legHero = l;
      let i = 0;
      l.textContent = ETU_LEGENDAS[0];
      l.classList.add("moeda-leg");
      if (!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) setInterval(() => {
        l.classList.add("sai");
        setTimeout(() => {
          i = (i + 1) % ETU_LEGENDAS.length;
          l.textContent = ETU_LEGENDAS[i];
          l.classList.remove("sai");
        }, 700);
      }, 4800);
    }
  }
  if (document.readyState !== "loading") setTimeout(liga, 50);
  else addEventListener("DOMContentLoaded", () => setTimeout(liga, 50));
  addEventListener("load", () => setTimeout(liga, 300));
})();
function etuNorm(t) {
  return String(t || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9@ ]/g, " ").replace(/\s+/g, " ").trim();
}
function etuNomeReservado(nome, email) {
  const n = etuNorm(nome), e = String(email || "").toLowerCase(), tk = n.split(" ");
  const charl = tk.some((t) => /^charle[iys]$/.test(t));
  if (charl && tk.includes("dias") && (tk.includes("lima") || tk.includes("jesus"))) return "nome do Diretor";
  if (/\b(pr|pastor|ap|apostolo|bispo|reverendo)\b ?charle[iys]\b/.test(n)) return "título com o nome do Diretor";
  if (/teologica uniao|escola teologica/.test(n)) return "nome da escola";
  if (/\b(diretor|diretora|direcao|diretoria|administrador|administracao|admin|suporte|secretaria|oficial)\b/.test(n)) return "título da Direção";
  if (/charleilimas98|escolateologicauniao|etu\.escola/.test(e)) return "e-mail da escola ou do Diretor";
  return "";
}
async function etuAlertaSeg(acao, nome, email, tel, motivo) {
  try {
    await API.abrirAtendimento({ nome: "ALERTA DE SEGURANÇA", contato: [email, tel].filter(Boolean).join(" · ") || "sem contato", mensagem: `ALERTA DE SEGURANÇA — ${acao} bloqueada (${motivo}). Nome digitado: "${String(nome || "").slice(0, 120)}". E-mail: ${email || "—"}. Data: ${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR")}.`, conversa: [] });
  } catch (e) {
  }
}
function etuOficial() {
  const f = $("#ofEnviar");
  if (!f || f.dataset.ok) return;
  f.dataset.ok = 1;
  f.onclick = async () => {
    const m = $("#mOf"), onde = $("#ofOnde").value, link = $("#ofLink").value.trim(), txt = $("#ofTxt").value.trim();
    if (!link && txt.length < 10) return show(m, "Informe o endereço do perfil ou descreva o que você viu.", "err");
    try {
      await API.abrirAtendimento({ nome: S.profile && S.profile.nome || $("#ofNome").value.trim() || "Visitante", contato: S.user && S.user.email || $("#ofCont").value.trim() || "sem contato", mensagem: `DENÚNCIA DE PERFIL FALSO — Onde: ${onde}. Endereço: ${link || "—"}. Relato: ${txt || "—"}`, conversa: [] });
      $("#ofLink").value = "";
      $("#ofTxt").value = "";
      show(m, "Obrigado! A Direção recebeu a sua denúncia e vai verificar. Não envie dinheiro nem dados a perfis suspeitos.", "ok");
    } catch (e) {
      show(m, "Não foi possível enviar agora: " + e.message, "err");
    }
  };
  const v = $("#ofVis");
  if (v) v.style.display = S.user ? "none" : "";
}
addEventListener("hashchange", () => {
  if (location.hash === "#oficial") setTimeout(etuOficial, 80);
});
addEventListener("load", () => {
  if (location.hash === "#oficial") setTimeout(etuOficial, 1200);
});
function etuComShare() {
  const b = $("#comShare");
  if (!b || b.dataset.ok) return;
  b.dataset.ok = 1;
  b.onclick = async () => {
    const t = `*COMUNICADO OFICIAL — Escola Teológica União*

Há muitos anos o Pr. Charlei de Jesus Lima Dias não utiliza o Facebook. Perfis antigos com o nome dele estão abandonados.

Os únicos meios oficiais de contato são:
• Plataforma: escolateologicauniao.github.io
• WhatsApp: (61) 99521-1432
• E-mail: etu.escolateologicauniao215@gmail.com

Ninguém está autorizado a pedir dinheiro, Pix, senhas ou códigos em nome do Pr. Charlei ou da escola. Qualquer outro perfil é falso.

“Sede prudentes como as serpentes e símplices como as pombas” (Mateus 10.16).

Leia o comunicado completo: ${CONFIG.LINK_PUBLICO || location.origin}#oficial`;
    try {
      if (navigator.share) await navigator.share({ text: t });
      else {
        await navigator.clipboard.writeText(t);
        etuAviso("<b>Comunicado copiado.</b><span>Agora é só colar no WhatsApp.</span>");
      }
    } catch (e) {
    }
  };
}
addEventListener("hashchange", () => {
  if (location.hash === "#oficial") setTimeout(etuComShare, 90);
});
addEventListener("load", () => {
  if (location.hash === "#oficial") setTimeout(etuComShare, 1300);
});
(function() {
  var ATIVO = true, CHAVE = "etu_testadores", WA2 = "5561995211432";
  if (!ATIVO) return;
  function estado() {
    try {
      return JSON.parse(localStorage.getItem(CHAVE) || "{}");
    } catch (_) {
      return {};
    }
  }
  function grava(o) {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(o));
    } catch (_) {
    }
  }
  function deveMostrar() {
    var s = estado();
    if (s.ok) return false;
    if (s.depois && Date.now() < s.depois) return false;
    var h = (location.hash || "").replace("#", "");
    if (h.indexOf("admin") === 0 || h === "direcao" || h.indexOf("validar") === 0 || h.indexOf("certificado-") === 0 || h.indexOf("carteira-") === 0) return false;
    return true;
  }
  function abre() {
    if (document.getElementById("etuTestadores")) return;
    if (document.querySelector(".modal") || document.getElementById("etuAvisoSeg") || document.getElementById("etu-aviso-samsung")) {
      setTimeout(abre, 8e3);
      return;
    }
    if (!deveMostrar()) return;
    var bras = (document.querySelector(".brand img") || {}).src || "icone-192.png";
    var msg = "A paz do Senhor! Quero ajudar a testar o aplicativo da Escola Teológica União na Google Play. Meu endereço Gmail é: ";
    var d = document.createElement("div");
    d.id = "etuTestadores";
    d.setAttribute("role", "dialog");
    d.setAttribute("aria-modal", "true");
    d.setAttribute("aria-labelledby", "etuTsT");
    d.style.cssText = "position:fixed;inset:0;z-index:9990;background:rgba(11,22,48,.72);display:flex;align-items:center;justify-content:center;padding:14px;overflow:auto";
    var li = 'style="margin:0 0 6px;line-height:1.4"';
    d.innerHTML = '<div style="background:#1B2238;color:#F5EEDC;border:2px solid #C9A24A;border-radius:16px;max-width:520px;width:100%;max-height:94vh;overflow:auto;box-shadow:0 18px 50px rgba(0,0,0,.5);font-family:Georgia,serif"><div style="padding:18px 20px 6px;text-align:center"><img src="' + bras + '" alt="" style="width:74px;height:74px;object-fit:contain"><div style="font-family:Cinzel,Georgia,serif;font-size:13px;letter-spacing:3px;color:#E3C77A;margin-top:6px">CONVITE ESPECIAL</div><h3 id="etuTsT" style="font-family:Cinzel,Georgia,serif;color:#fff;font-size:22px;line-height:1.2;margin:6px 0 8px">O aplicativo da ETU está chegando à Google Play</h3><p style="margin:0;font-size:16.5px;line-height:1.45">A Google exige que <b style="color:#E3C77A">12 pessoas</b> testem o aplicativo por <b style="color:#E3C77A">14 dias</b> antes de liberá-lo para todos. Você pode ajudar?</p></div><img src="dispositivos.webp" alt="A plataforma no computador, no tablet e no celular" style="display:block;width:100%;max-height:150px;object-fit:contain;margin:6px 0"><div style="padding:0 16px;display:grid;gap:10px"><div style="background:#F7F1E3;color:#1B2238;border-radius:10px;padding:12px 14px"><b style="color:#7A1F2B;font-family:Cinzel,Georgia,serif;font-size:14px;letter-spacing:1px">O QUE VOCÊ PRECISA</b><ol style="margin:8px 0 0;padding-left:20px;font-size:15.5px"><li ' + li + ">Um celular <b>Android</b> (iPhone não serve para este teste).</li><li " + li + ">Uma conta <b>Gmail</b>.</li><li " + li + ">Você mesmo instala o app no <b>seu próprio celular</b>, pelo link de convite que a escola envia.</li><li " + li + '>Deixe o app instalado por <b>14 dias seguidos</b> e abra-o <b>uma vez por dia</b>, por alguns minutos.</li></ol></div><div style="background:#F7F1E3;color:#1B2238;border-radius:10px;padding:12px 14px"><b style="color:#7A1F2B;font-family:Cinzel,Georgia,serif;font-size:14px;letter-spacing:1px">FIQUE TRANQUILO</b><ul style="margin:8px 0 0;padding-left:20px;font-size:15.5px"><li ' + li + ">Não tem custo nenhum.</li><li " + li + ">A escola <b>nunca</b> pede senha.</li><li " + li + ">Não pedimos CPF, documentos nem dados de banco.</li><li " + li + '>Só precisamos do <b>endereço</b> do seu Gmail (exemplo: <b>nome@gmail.com</b>), escrito numa mensagem de WhatsApp. Não é preciso mandar nenhum e-mail.</li></ul></div></div><div style="padding:12px 16px 0"><div style="background:#F7F1E3;color:#1B2238;border-radius:10px;padding:12px 14px"><b style="color:#7A1F2B;font-family:Cinzel,Georgia,serif;font-size:14px;letter-spacing:1px">CONHEÇA A ESCOLA</b><p style="margin:6px 0 8px;font-size:15px;line-height:1.4">Cursos livres Básico, Médio e Avançado, com apostilas, vídeo-aulas e provas corrigidas na hora. Ao concluir: certificado com código de verificação e carteirinha de estudante. Atendimento pelo assistente virtual da escola e pela Direção no WhatsApp.</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><img src="doc-cert-basico.webp" alt="Modelo do certificado da ETU" style="width:100%;border-radius:6px;border:1px solid #E1D4B2"><img src="doc-cart-frente.webp" alt="Modelo da carteirinha de estudante da ETU" style="width:100%;border-radius:6px;border:1px solid #E1D4B2"></div></div></div><div style="padding:14px 16px 18px;display:flex;flex-direction:column;gap:8px"><a id="etuTsWa" href="https://wa.me/' + WA2 + "?text=" + encodeURIComponent(msg) + '" target="_blank" rel="noopener" style="display:block;text-align:center;background:#C9A24A;color:#1B2238;font-weight:bold;font-size:17px;text-decoration:none;border-radius:10px;padding:13px 10px">Quero ajudar: mandar meu endereço Gmail pelo WhatsApp</a><div style="display:flex;gap:8px"><button type="button" id="etuTsJa" style="flex:1;font:inherit;font-size:15px;background:transparent;color:#F5EEDC;border:1px solid #C9A24A;border-radius:10px;padding:11px 6px;min-height:44px">Já enviei</button><button type="button" id="etuTsDep" style="flex:1;font:inherit;font-size:15px;background:transparent;color:#CFC6B0;border:1px solid #5b6587;border-radius:10px;padding:11px 6px;min-height:44px">Agora não</button></div><p style="margin:4px 0 0;font-size:13px;color:#CFC6B0;text-align:center">Escola Teológica União • Curso Livre de Teologia • Cristalina, Goiás</p></div></div>';
    function fecha() {
      d.remove();
      document.removeEventListener("keydown", esc2);
    }
    function esc2(e) {
      if (e.key === "Escape") {
        adia();
      }
    }
    function adia() {
      grava({ depois: Date.now() + 3 * 864e5 });
      fecha();
    }
    d.querySelector("#etuTsWa").addEventListener("click", function() {
      grava({ ok: 1, em: Date.now() });
      setTimeout(fecha, 300);
    });
    d.querySelector("#etuTsJa").onclick = function() {
      grava({ ok: 1, em: Date.now() });
      fecha();
    };
    d.querySelector("#etuTsDep").onclick = adia;
    d.addEventListener("click", function(e) {
      if (e.target === d) adia();
    });
    document.addEventListener("keydown", esc2);
    document.body.appendChild(d);
    try {
      d.querySelector("#etuTsWa").focus({ preventScroll: true });
    } catch (_) {
    }
  }
  function inicia() {
    setTimeout(abre, 4e3);
  }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", inicia);
  else inicia();
})();
window.etuVoz = (function() {
  var ok = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window, vozes = [], ativo = false, botaoAtual = null;
  var TIMBRES = { natural: { n: "Natural", p: 1, r: 0.9 }, grave: { n: "Grave", p: 0.6, r: 0.88 }, aguda: { n: "Aguda", p: 1.4, r: 1 }, calma: { n: "Calma e pausada", p: 0.9, r: 0.78 }, firme: { n: "Firme", p: 0.8, r: 1.02 } };
  function ler(k, d) {
    try {
      return localStorage.getItem(k) || d;
    } catch (e) {
      return d;
    }
  }
  function carrega() {
    if (!ok) return;
    var L = speechSynthesis.getVoices() || [];
    vozes = L.filter(function(v) {
      return /^pt/i.test(v.lang);
    }).sort(function(a, b) {
      return nota(b) - nota(a);
    });
  }
  function nota(v) {
    var n = v.name || "";
    return (/BR/i.test(v.lang) ? 10 : 0) + (/natural|neural|online|premium|enhanced|aprimorad|wavenet/i.test(n) ? 20 : 0) + (/google/i.test(n) ? 5 : 0) + (v.localService ? 0 : 2);
  }
  if (ok) {
    carrega();
    try {
      speechSynthesis.addEventListener("voiceschanged", carrega);
    } catch (e) {
      try {
        speechSynthesis.onvoiceschanged = carrega;
      } catch (_) {
      }
    }
  }
  function voz() {
    var u = ler("etu_voz_nome", "");
    return vozes.find(function(v) {
      return v.voiceURI === u || v.name === u;
    }) || vozes[0] || null;
  }
  function limpa(t) {
    var d = document.createElement("div");
    d.innerHTML = t;
    t = d.textContent || "";
    t = t.replace(/Lei 9\.394\/1996/g, "Lei nove mil trezentos e noventa e quatro, de mil novecentos e noventa e seis");
    t = t.replace(/(\d+)\.(\d+)-(\d+)/g, "capítulo $1, versículos $2 a $3").replace(/(\d+)\.(\d+)/g, "capítulo $1, versículo $2");
    t = t.replace(/[“”"]/g, "").replace(/\s*•\s*/g, ". ").replace(/×/g, " e ").replace(/\s+/g, " ").trim();
    return t;
  }
  function marcaBotao(b, on) {
    if (!b) return;
    b.setAttribute("aria-pressed", on);
    if (b.dataset.rot) b.textContent = on ? "⏹ Parar" : b.dataset.rot;
  }
  function falar(texto, fim) {
    if (!ok) {
      fim && fim();
      return;
    }
    speechSynthesis.cancel();
    var t = TIMBRES[ler("etu_voz_timbre", "natural")] || TIMBRES.natural, v = voz();
    var partes = limpa(texto).match(/[^.!?;:]+[.!?;:]*/g) || [], k = 0, feito = false, geracao = ++falar.g;
    function acaba() {
      if (feito) return;
      feito = true;
      window.etuDuck = 0;
      if (window.etuVolAplica) window.etuVolAplica();
      fim && fim();
    }
    function prox() {
      if (geracao !== falar.g) {
        return;
      }
      if (k >= partes.length) {
        acaba();
        return;
      }
      var tx = partes[k++].trim();
      if (!tx) {
        prox();
        return;
      }
      var u = new SpeechSynthesisUtterance(tx);
      u.lang = v && v.lang || "pt-BR";
      if (v) u.voice = v;
      u.rate = t.r;
      u.pitch = t.p;
      u.volume = 1;
      var pausa = /[.!?]$/.test(tx) ? 420 : /[;:]$/.test(tx) ? 260 : 120;
      u.onend = function() {
        setTimeout(prox, pausa);
      };
      u.onerror = function(e) {
        if (e && e.error === "interrupted") return;
        acaba();
      };
      try {
        speechSynthesis.speak(u);
      } catch (e) {
        acaba();
      }
    }
    window.etuDuck = 1;
    if (window.etuVolAplica) window.etuVolAplica();
    setTimeout(prox, 80);
  }
  falar.g = 0;
  return {
    disponivel: ok,
    TIMBRES,
    vozes: function() {
      carrega();
      return vozes.slice();
    },
    modo: function() {
      return ler("etu_som_modo", "musica");
    },
    ligado: function() {
      return ativo;
    },
    liga: function(v) {
      ativo = !!v;
      if (!ativo) {
        falar.g++;
        if (ok) speechSynthesis.cancel();
      }
      window.etuDuck = 0;
      if (window.etuVolAplica) window.etuVolAplica();
    },
    para: function() {
      falar.g++;
      if (ok) speechSynthesis.cancel();
      marcaBotao(botaoAtual, false);
      botaoAtual = null;
      window.etuDuck = 0;
      if (window.etuVolAplica) window.etuVolAplica();
    },
    fala: function(texto, fim) {
      if (!ativo) {
        fim && fim();
        return;
      }
      falar(texto, fim);
    },
    ouvir: function(texto, b) {
      if (botaoAtual && botaoAtual === b) {
        this.para();
        return;
      }
      this.para();
      botaoAtual = b;
      marcaBotao(b, true);
      falar(texto, function() {
        marcaBotao(b, false);
        if (botaoAtual === b) botaoAtual = null;
      });
    },
    teste: function() {
      falar("A paz do Senhor! Esta é a voz da Escola Teológica União. Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar.");
    }
  };
})();
document.addEventListener("click", function(e) {
  var b = e.target.closest && e.target.closest("[data-fala]");
  if (!b || !window.etuVoz) return;
  e.preventDefault();
  window.etuVoz.ouvir(b.dataset.fala, b);
});
(function() {
  const DISC = [{ "c": "BÁSICO", "n": 1, "t": "Introdução à Teologia", "s": "A palavra “teologia” vem do grego: Deus + palavra, estudo. É o estudo organizado do que Deus revelou sobre Si mesmo.", "q": "Todo cristão faz teologia, mesmo sem perceber?", "v": "Conheçamos e prossigamos em conhecer ao SENHOR.", "r": "Oseias 6.3", "k": "#C9A24A", "b": "#1B2A52" }, { "c": "BÁSICO", "n": 2, "t": "Bibliologia", "s": "Do grego: livro + estudo. É a doutrina das Sagradas Escrituras.", "q": "Como a Bíblia chegou até as nossas mãos?", "v": "Toda Escritura divinamente inspirada é proveitosa para ensinar, para redarguir, para corrigir, para instruir em justiça.", "r": "2 Timóteo 3.16", "k": "#D9A85B", "b": "#3B2A1A" }, { "c": "BÁSICO", "n": 3, "t": "Teologia Propriamente Dita", "s": "É a doutrina de Deus: o estudo de quem Deus é, como Ele se revela e como age.", "q": "Deus existe? Como responder a quem duvida?", "v": "É necessário que aquele que se aproxima de Deus creia que ele existe e que é galardoador dos que o buscam.", "r": "Hebreus 11.6", "k": "#5FC2B4", "b": "#0F3B3A" }, { "c": "BÁSICO", "n": 4, "t": "Cristologia", "s": "Do grego Christós, “Ungido”, + estudo. É a doutrina da pessoa e da obra de Jesus Cristo.", "q": "Jesus é Deus ou apenas um grande profeta?", "v": "No princípio, era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.", "r": "João 1.1", "k": "#E3B04B", "b": "#5A1220" }, { "c": "BÁSICO", "n": 5, "t": "Pneumatologia", "s": "Do grego pneuma: “espírito, sopro, vento”. É a doutrina do Espírito Santo.", "q": "O Espírito Santo é uma Pessoa ou uma força?", "v": "E todos foram cheios do Espírito Santo e começaram a falar em outras línguas, conforme o Espírito Santo lhes concedia que falassem.", "r": "Atos 2.4", "k": "#F2B84B", "b": "#7A2E0E" }, { "c": "BÁSICO", "n": 6, "t": "Angelologia", "s": "Do grego ángelos: “mensageiro”. É o estudo dos anjos, de Satanás e dos demônios.", "q": "Os anjos existem e o que eles fazem?", "v": "O anjo do SENHOR acampa-se ao redor dos que o temem, e os livra.", "r": "Salmos 34.7", "k": "#A9B8E0", "b": "#24304F" }, { "c": "BÁSICO", "n": 7, "t": "Antropologia Bíblica", "s": "Do grego ánthropos: “ser humano”. É o estudo do homem à luz da Bíblia.", "q": "O que significa ser criado à imagem de Deus?", "v": "E criou Deus o homem à sua imagem; à imagem de Deus o criou; macho e fêmea os criou.", "r": "Gênesis 1.27", "k": "#B7CF6A", "b": "#2F4A1E" }, { "c": "BÁSICO", "n": 8, "t": "Hamartiologia", "s": "Do grego hamartía: “pecado”, no sentido de “errar o alvo”. É a doutrina do pecado.", "q": "O que é pecado, de fato?", "v": "Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna, por Cristo Jesus, nosso Senhor.", "r": "Romanos 6.23", "k": "#D45B5B", "b": "#3A0F14" }, { "c": "BÁSICO", "n": 9, "t": "Soteriologia", "s": "Do grego sotería: “salvação, livramento”. É a doutrina da salvação.", "q": "Como alguém é salvo?", "v": "Porque pela graça sois salvos, por meio da fé; e isso não vem de vós; é dom de Deus.", "r": "Efésios 2.8", "k": "#6FB3E0", "b": "#123B5C" }, { "c": "BÁSICO", "n": 10, "t": "Eclesiologia", "s": "Do grego ekklesía: “assembleia, os chamados para fora”. É a doutrina da Igreja.", "q": "A Igreja é o prédio ou o povo?", "v": "Sobre esta pedra edificarei a minha igreja, e as portas do inferno não prevalecerão contra ela.", "r": "Mateus 16.18", "k": "#C9A0E0", "b": "#4A2A5C" }, { "c": "BÁSICO", "n": 11, "t": "Escatologia", "s": "Do grego éschatos: “último”. É a doutrina das últimas coisas.", "q": "O que é o arrebatamento da Igreja?", "v": "Seremos arrebatados juntamente com eles nas nuvens, a encontrar o Senhor nos ares, e assim estaremos sempre com o Senhor.", "r": "1 Tessalonicenses 4.17", "k": "#E8C46A", "b": "#1E1E3C" }, { "c": "MÉDIO", "n": 1, "t": "Hermenêutica Bíblica", "s": "Do grego hermeneúo: “interpretar, explicar”. É a ciência de interpretar a Bíblia corretamente.", "q": "Como interpretar a Bíblia sem torcer o texto?", "v": "E, começando por Moisés e por todos os profetas, explicava-lhes o que dele se achava em todas as Escrituras.", "r": "Lucas 24.27", "k": "#4FC0D9", "b": "#0E3A4A" }, { "c": "MÉDIO", "n": 2, "t": "Panorama do Antigo Testamento", "s": "Uma visão de conjunto dos 39 livros do Antigo Testamento.", "q": "Como os livros do Antigo Testamento estão organizados?", "v": "Convinha que se cumprisse tudo o que de mim estava escrito na Lei de Moisés, e nos Profetas, e nos Salmos.", "r": "Lucas 24.44", "k": "#E0B060", "b": "#4A3210" }, { "c": "MÉDIO", "n": 3, "t": "Panorama do Novo Testamento", "s": "Uma visão de conjunto dos 27 livros do Novo Testamento.", "q": "Por que temos quatro Evangelhos?", "v": "Estes, porém, foram escritos para que creiais que Jesus é o Cristo, o Filho de Deus, e para que, crendo, tenhais vida em seu nome.", "r": "João 20.31", "k": "#D59BE6", "b": "#3C1A44" }, { "c": "MÉDIO", "n": 4, "t": "Geografia Bíblica", "s": "O estudo das terras, cidades, rios e caminhos onde a história bíblica aconteceu.", "q": "Onde ficam Jerusalém, o Jordão e o Mar da Galileia?", "v": "Assim como estão os montes à roda de Jerusalém, assim o SENHOR está em volta do seu povo, desde agora e para sempre.", "r": "Salmos 125.2", "k": "#7FD1A0", "b": "#1F4A33" }, { "c": "MÉDIO", "n": 5, "t": "História de Israel", "s": "A trajetória do povo de Israel, de Abraão ao retorno do exílio.", "q": "Por que Deus escolheu Abraão?", "v": "Porque tudo que dantes foi escrito para nosso ensino foi escrito, para que, pela paciência e consolação das Escrituras, tenhamos esperança.", "r": "Romanos 15.4", "k": "#F0A060", "b": "#5A2A10" }, { "c": "MÉDIO", "n": 6, "t": "História da Igreja", "s": "A caminhada da Igreja de Cristo da era apostólica até os dias de hoje.", "q": "Como a Igreja sobreviveu às perseguições?", "v": "Jesus Cristo é o mesmo ontem, e hoje, e eternamente.", "r": "Hebreus 13.8", "k": "#D0B070", "b": "#2A2A2A" }, { "c": "MÉDIO", "n": 7, "t": "Homilética", "s": "Do grego homilía: “conversa, discurso”. É a arte de preparar e pregar sermões.", "q": "Como transformar um texto bíblico em sermão?", "v": "Que pregues a palavra, instes a tempo e fora de tempo, redarguas, repreendas, exortes, com toda a longanimidade e doutrina.", "r": "2 Timóteo 4.2", "k": "#F08AA8", "b": "#5C0F2E" }, { "c": "MÉDIO", "n": 8, "t": "Ética Cristã", "s": "Do grego éthos: “costume, caráter”. É o estudo da conduta cristã à luz da Bíblia.", "q": "Como decidir o que é certo quando a Bíblia não cita o assunto?", "v": "Ele te declarou, ó homem, o que é bom; e que é o que o SENHOR pede de ti, senão que pratiques a justiça, e ames a beneficência, e andes humildemente com o teu Deus?", "r": "Miqueias 6.8", "k": "#90B8D8", "b": "#203A50" }, { "c": "MÉDIO", "n": 9, "t": "Evangelismo e Missões", "s": "“Evangelho” vem do grego: “boa notícia”. Missão é o envio da Igreja ao mundo.", "q": "Todo crente é chamado a evangelizar?", "v": "Portanto, ide, ensinai todas as nações, batizando-as em nome do Pai, e do Filho, e do Espírito Santo.", "r": "Mateus 28.19", "k": "#6FE0A0", "b": "#0F4A2A" }, { "c": "MÉDIO", "n": 10, "t": "Educação Cristã", "s": "O ensino da Palavra de Deus na igreja e na família.", "q": "Como ensinar a Bíblia de forma clara e marcante?", "v": "E estas palavras que hoje te ordeno estarão no teu coração; e as intimarás a teus filhos.", "r": "Deuteronômio 6.6-7", "k": "#F0D060", "b": "#4A3A0F" }, { "c": "AVANÇADO", "n": 1, "t": "Exegese Bíblica", "s": "A palavra vem do grego e significa “explicação”: conduzir para fora do texto o sentido que o autor bíblico colocou nele.", "q": "Qual a diferença entre tirar do texto e colocar no texto?", "v": "E leram no livro, na Lei de Deus, e declarando e explicando o sentido, faziam que, lendo, se entendesse.", "r": "Neemias 8.8", "k": "#E8C46A", "b": "#0B2F4F" }, { "c": "AVANÇADO", "n": 2, "t": "Teologia Contemporânea", "s": "O estudo das correntes teológicas dos séculos 19, 20 e 21 e de como elas influenciam a Igreja hoje.", "q": "Por que surgem tantas teologias novas?", "v": "Tive por necessidade escrever-vos e exortar-vos a batalhar pela fé que uma vez foi dada aos santos.", "r": "Judas 3", "k": "#9FC0E8", "b": "#33333F" }, { "c": "AVANÇADO", "n": 3, "t": "Filosofia e Fé Cristã", "s": "Filosofia, no grego, significa “amor à sabedoria”. Aqui as grandes perguntas da vida são examinadas à luz da revelação de Deus.", "q": "Fé e razão são inimigas?", "v": "Tende cuidado para que ninguém vos faça presa sua, por meio de filosofias e vãs sutilezas, segundo a tradição dos homens, segundo os rudimentos do mundo e não segundo Cristo.", "r": "Colossenses 2.8", "k": "#E0D08A", "b": "#2E2A12" }, { "c": "AVANÇADO", "n": 4, "t": "Teologia do Antigo Testamento", "s": "O estudo dos grandes temas revelados no Antigo Testamento e de como eles caminham até Cristo.", "q": "O Deus do Antigo Testamento é o mesmo do Novo?", "v": "E porei inimizade entre ti e a mulher e entre a tua semente e a sua semente; esta te ferirá a cabeça, e tu lhe ferirás o calcanhar.", "r": "Gênesis 3.15", "k": "#E8A070", "b": "#4A2416" }, { "c": "AVANÇADO", "n": 5, "t": "Teologia do Novo Testamento", "s": "O estudo dos grandes temas do Novo Testamento: as promessas de Deus cumpridas em Cristo.", "q": "O que Jesus ensinou sobre o Reino de Deus?", "v": "Mas, vindo a plenitude dos tempos, Deus enviou seu Filho, nascido de mulher, nascido sob a lei.", "r": "Gálatas 4.4", "k": "#8FD0F0", "b": "#10354A" }, { "c": "AVANÇADO", "n": 6, "t": "Apologética Cristã", "s": "A palavra vem do grego e significa “defesa, resposta”. É a defesa bíblica e racional da fé cristã.", "q": "Como mostrar que Jesus ressuscitou?", "v": "Estai sempre preparados para responder com mansidão e temor a qualquer que vos pedir a razão da esperança que há em vós.", "r": "1 Pedro 3.15", "k": "#A8D878", "b": "#1A3A1A" }, { "c": "AVANÇADO", "n": 7, "t": "Seitas e Heresias", "s": "Heresia, no grego, significa “escolha, partido”: um ensino que se separa das verdades centrais da fé.", "q": "O que faz de um grupo uma seita?", "v": "Amados, não creiais em todo espírito, mas provai se os espíritos são de Deus, porque já muitos falsos profetas se têm levantado no mundo.", "r": "1 João 4.1", "k": "#F07A5A", "b": "#3A0A0A" }, { "c": "AVANÇADO", "n": 8, "t": "Teologia Pentecostal", "s": "O estudo bíblico e histórico da fé pentecostal: a promessa do Pai cumprida no derramamento do Espírito Santo.", "q": "O batismo no Espírito é diferente da conversão?", "v": "Porque a promessa vos diz respeito a vós, a vossos filhos e a todos os que estão longe: a tantos quantos Deus, nosso Senhor, chamar.", "r": "Atos 2.39", "k": "#FFB040", "b": "#6A1A0A" }, { "c": "AVANÇADO", "n": 9, "t": "Patrística", "s": "Do latim “pai”: o estudo dos escritos dos chamados Pais da Igreja, os líderes cristãos dos primeiros séculos.", "q": "O que criam os cristãos dos primeiros séculos?", "v": "E o que de mim, entre muitas testemunhas, ouviste, confia-o a homens fiéis, que sejam idôneos para também ensinarem os outros.", "r": "2 Timóteo 2.2", "k": "#D8B888", "b": "#3A2E1E" }, { "c": "AVANÇADO", "n": 10, "t": "Teologia Pastoral", "s": "O estudo do cuidado do rebanho de Deus, segundo o exemplo de Cristo, o Bom Pastor.", "q": "O que Deus espera de um pastor?", "v": "Apascentai o rebanho de Deus que está entre vós, tendo cuidado dele, não por força, mas voluntariamente; nem por torpe ganância, mas de ânimo pronto.", "r": "1 Pedro 5.2", "k": "#88D8B8", "b": "#133A33" }, { "c": "AVANÇADO", "n": 11, "t": "Liderança e Administração Eclesiástica", "s": "O estudo de como conduzir a obra de Deus com ordem, fidelidade e visão.", "q": "O que é liderar segundo Jesus?", "v": "Mas faça-se tudo decentemente e com ordem.", "r": "1 Coríntios 14.40", "k": "#E0B0F0", "b": "#2A1440" }];
  let i = 0, timer = null, pausado = false, audio = null;
  function monta() {
    if (document.getElementById("etuVitrine")) return true;
    const h2 = [...document.querySelectorAll('[data-view="inicio"] h2')].find((h) => /Do Básico ao Avançado/.test(h.textContent));
    const ref = h2 && h2.closest("section");
    if (!ref) return false;
    const sec = document.createElement("section");
    sec.className = "block";
    sec.id = "etuVitrine";
    sec.setAttribute("aria-label", "Disciplinas da Escola Teológica União");
    sec.innerHTML = `<style>
#etuVitrine .vt-k{text-align:center;font-family:Cinzel,Georgia,serif;letter-spacing:4px;font-size:13px;color:var(--gold-d,#8a6b1f);margin-bottom:6px}
#etuVitrine h2{text-align:center;margin:0 0 14px}
.vt-stage{position:relative;max-width:820px;width:calc(100% - 28px);box-sizing:border-box;margin:0 auto;border-radius:16px;padding:30px 30px 24px;color:#F7F1E3;min-height:340px;box-shadow:0 18px 40px rgba(10,16,40,.35);transition:background .9s ease;border:2px solid var(--vt,#C9A24A)}
.vt-in{transition:opacity .6s ease, transform .6s ease}.vt-in.sai{opacity:0;transform:translateY(10px)}
.vt-tag{font-family:Cinzel,Georgia,serif;letter-spacing:3px;font-size:13px;color:var(--vt,#C9A24A)}
.vt-t{font-family:Cinzel,Georgia,serif;font-weight:700;font-size:clamp(28px,5.4vw,44px);line-height:1.1;margin:8px 0 10px;color:#fff}
.vt-s{font-style:italic;font-size:19px;line-height:1.45;margin:0 0 14px}
.vt-q{font-size:20px;font-weight:600;margin:0 0 14px;color:var(--vt,#C9A24A)}
.vt-v{background:rgba(255,255,255,.08);border-left:4px solid var(--vt,#C9A24A);padding:10px 14px;border-radius:8px;font-size:18px;line-height:1.45;font-style:italic}
.vt-v b{display:block;font-style:normal;font-family:Cinzel,Georgia,serif;font-size:12px;letter-spacing:2px;margin-top:4px;color:var(--vt,#C9A24A)}
.vt-bar{height:3px;background:rgba(255,255,255,.15);border-radius:3px;margin-top:18px;overflow:hidden}.vt-bar i{display:block;height:100%;width:0;background:var(--vt,#C9A24A)}
.vt-ctl{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:14px}
.vt-ctl button{min-height:44px;min-width:44px;border-radius:24px;border:1.5px solid var(--gold,#C9A24A);background:#fff;color:#1B2238;font:inherit;font-size:16px;padding:6px 16px;cursor:pointer}
.vt-ctl button[aria-pressed="true"]{background:#1B2238;color:#E3C77A}
.vt-cont{text-align:center;font-size:15px;color:var(--muted,#666);margin-top:6px}
@media (prefers-reduced-motion:reduce){.vt-in{transition:none}.vt-stage{transition:none}}
</style>
<div class="vt-k">AS DISCIPLINAS DA ESCOLA</div><h2>O que você vai estudar</h2>
<div class="vt-stage" id="vtStage" aria-live="polite"><div class="vt-in" id="vtIn"></div><div class="vt-bar"><i id="vtBar"></i></div></div>
<div class="vt-ctl"><button type="button" id="vtAnt" aria-label="Disciplina anterior">◀</button><button type="button" id="vtPausa" aria-pressed="false">Pausar</button><button type="button" id="vtProx" aria-label="Próxima disciplina">▶</button><button type="button" id="vtMus" aria-pressed="false">♪ Música ambiente</button><button type="button" id="vtVoz" aria-pressed="false">🗣 Ouvir narração</button></div>
<div class="vt-cont" id="vtCont"></div>`;
    ref.parentNode.insertBefore(sec, ref);
    document.getElementById("vtAnt").onclick = () => {
      ir(i - 1);
    };
    document.getElementById("vtProx").onclick = () => {
      ir(i + 1);
    };
    document.getElementById("vtPausa").onclick = (e) => {
      pausado = !pausado;
      e.currentTarget.setAttribute("aria-pressed", pausado);
      e.currentTarget.textContent = pausado ? "Continuar" : "Pausar";
      agenda();
    };
    document.getElementById("vtMus").onclick = (e) => {
      const on = musica();
      e.currentTarget.setAttribute("aria-pressed", on);
      e.currentTarget.textContent = on ? "♪ Parar música" : "♪ Música ambiente";
    };
    const bv = document.getElementById("vtVoz");
    if (!window.etuVoz || !window.etuVoz.disponivel) bv.style.display = "none";
    bv.onclick = (e) => {
      const on = !window.etuVoz.ligado();
      window.etuVoz.liga(on);
      e.currentTarget.setAttribute("aria-pressed", on);
      e.currentTarget.textContent = on ? "🗣 Parar narração" : "🗣 Ouvir narração";
      if (on) {
        pausado = false;
        const p = document.getElementById("vtPausa");
        p.setAttribute("aria-pressed", false);
        p.textContent = "Pausar";
        fala();
      } else agenda();
    };
    render();
    agenda();
    return true;
  }
  function fala() {
    const d = DISC[i];
    clearTimeout(timer);
    window.etuVoz.fala(`Curso ${d.c.toLowerCase()} de teologia. Disciplina ${d.n}: ${d.t}. ${d.s} Você sabe? ${d.q} ${d.v} ${d.r}.`, () => {
      if (window.etuVoz.ligado() && !pausado && document.getElementById("etuVitrine")) timer = setTimeout(() => ir(i + 1), 1200);
    });
  }
  function render() {
    const d = DISC[i], st = document.getElementById("vtStage"), box = document.getElementById("vtIn");
    if (!st || !box) return;
    box.classList.add("sai");
    setTimeout(() => {
      st.style.setProperty("--vt", d.k);
      st.style.background = `radial-gradient(ellipse at 20% 0%, ${d.b} 0%, #0c1226 120%)`;
      box.innerHTML = `<div class="vt-tag">CURSO ${esc(d.c)} • DISCIPLINA ${d.n}</div><div class="vt-t">${esc(d.t)}</div><p class="vt-s">${esc(d.s)}</p><p class="vt-q">Você sabe? ${esc(d.q)}</p><div class="vt-v">“${esc(d.v)}”<b>${esc(d.r.toUpperCase())}</b></div>`;
      box.classList.remove("sai");
      const c = document.getElementById("vtCont");
      if (c) c.textContent = `${i + 1} de ${DISC.length} disciplinas • Curso livre de teologia`;
      const bar = document.getElementById("vtBar");
      if (bar) {
        bar.style.transition = "none";
        bar.style.width = "0";
        requestAnimationFrame(() => {
          if (!pausado && !reduz()) {
            bar.style.transition = "width 8s linear";
            bar.style.width = "100%";
          }
        });
      }
    }, document.getElementById("vtIn").innerHTML ? 450 : 0);
  }
  function reduz() {
    try {
      return matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (_) {
      return false;
    }
  }
  function ir(n) {
    i = (n + DISC.length) % DISC.length;
    render();
    agenda();
  }
  function agenda() {
    clearTimeout(timer);
    if (window.etuVoz && window.etuVoz.ligado()) {
      if (!pausado) fala();
      else window.etuVoz.para();
      return;
    }
    if (pausado || reduz() || document.hidden) return;
    timer = setTimeout(() => ir(i + 1), 8e3);
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearTimeout(timer);
      if (audio) audio.parar();
      if (window.etuVoz) window.etuVoz.para();
    } else agenda();
  });
  function musica() {
    if (audio) {
      audio.parar();
      audio = null;
      return false;
    }
    if (window.etuMusicaCria) {
      audio = window.etuMusicaCria();
      return !!audio;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    const ctx = new AC(), mestre = ctx.createGain();
    mestre.gain.value = 0;
    mestre.connect(ctx.destination);
    const filtro = ctx.createBiquadFilter();
    filtro.type = "lowpass";
    filtro.frequency.value = 1400;
    filtro.connect(mestre);
    const ACORDES = [[146.83, 220, 293.66, 369.99], [123.47, 185, 246.94, 293.66], [98, 196, 246.94, 293.66], [110, 164.81, 220, 277.18]];
    const SINOS = [587.33, 659.25, 739.99, 880, 739.99, 659.25];
    let passo = 0, vivo = true, prox = ctx.currentTime + 0.1;
    mestre.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 3);
    function nota(f, t, dur, tipo, vol) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = tipo;
      o.frequency.value = f;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + 1.6);
      g.gain.setValueAtTime(vol, t + dur - 2);
      g.gain.linearRampToValueAtTime(0, t + dur);
      o.connect(g);
      g.connect(filtro);
      o.start(t);
      o.stop(t + dur + 0.1);
    }
    function sino(f, t) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = f;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.035, t + 0.05);
      g.gain.exponentialRampToValueAtTime(1e-4, t + 2.6);
      o.connect(g);
      g.connect(filtro);
      o.start(t);
      o.stop(t + 2.7);
    }
    function ciclo() {
      if (!vivo) return;
      while (prox < ctx.currentTime + 6) {
        const a = ACORDES[passo % 4];
        a.forEach((f, k) => nota(f, prox, 6.5, k ? "sine" : "triangle", k ? 0.03 : 0.045));
        sino(SINOS[passo % SINOS.length], prox + 2.2);
        passo++;
        prox += 5;
      }
      setTimeout(ciclo, 1500);
    }
    ciclo();
    audio = { parar() {
      vivo = false;
      try {
        mestre.gain.cancelScheduledValues(ctx.currentTime);
        mestre.gain.setValueAtTime(mestre.gain.value, ctx.currentTime);
        mestre.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
        setTimeout(() => ctx.close(), 1400);
      } catch (_) {
      }
    } };
    return true;
  }
  function tenta(n) {
    if (monta()) return;
    if (n > 0) setTimeout(() => tenta(n - 1), 700);
  }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", () => tenta(10));
  else tenta(10);
})();
function etuFesta(titulo, texto) {
  try {
    etuSom("vitoria");
  } catch (_) {
  }
  try {
    etuConfete();
    setTimeout(etuConfete, 700);
  } catch (_) {
  }
  const d = document.createElement("div");
  d.setAttribute("role", "status");
  d.style.cssText = "position:fixed;left:50%;top:18%;transform:translateX(-50%);z-index:9995;background:#1B2238;color:#F7F1E3;border:2px solid #C9A24A;border-radius:16px;padding:18px 24px;max-width:92vw;width:440px;text-align:center;box-shadow:0 18px 40px rgba(0,0,0,.45);font-family:Georgia,serif";
  d.innerHTML = `<div style="font-family:Cinzel,Georgia,serif;font-size:24px;color:#E3C77A;margin-bottom:6px">${esc(titulo)}</div><div style="font-size:17px;line-height:1.45">${esc(texto)}</div>`;
  document.body.appendChild(d);
  setTimeout(() => {
    d.style.transition = "opacity .8s";
    d.style.opacity = "0";
    setTimeout(() => d.remove(), 900);
  }, 5200);
}
window.addEventListener("hashchange", () => {
  const m = (location.hash || "").match(/^#certificado-(.+)$/);
  if (!m || !S.user) return;
  const k = "etu_festa_cert_" + m[1];
  try {
    if (localStorage.getItem(k)) return;
    localStorage.setItem(k, "1");
  } catch (_) {
  }
  setTimeout(() => etuFesta("Parabéns! Curso concluído!", "“Combati o bom combate, acabei a carreira, guardei a fé” (2 Timóteo 4.7). Que Deus abençoe o seu ministério!"), 900);
});
const ETU_PALAVRAS = [
  { p: "Amor", l: "grego", o: "agápē", s: "o amor que se doa e busca o bem do outro, mesmo quando não há nada a receber em troca", v: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.", r: "João 3.16", a: "O amor de Deus não é sentimento passageiro: é decisão que se entrega. Amar como Ele ama é servir sem esperar aplauso." },
  { p: "Misericórdia", l: "hebraico", o: "hesed", s: "o amor leal de Deus, fiel à aliança, que não desiste do seu povo", v: "As misericórdias do SENHOR são a causa de não sermos consumidos, porque as suas misericórdias não têm fim.", r: "Lamentações 3.22", a: "Se você ainda está de pé, é porque a fidelidade de Deus não desistiu de você." },
  { p: "Graça", l: "grego", o: "cháris", s: "o favor imerecido: o presente que Deus dá a quem não merecia", v: "Porque pela graça sois salvos, por meio da fé; e isso não vem de vós; é dom de Deus.", r: "Efésios 2.8", a: "Ninguém conquista a salvação; recebe-a. A graça cura o orgulho e consola o cansado." },
  { p: "Aniquilou-se (esvaziou-se)", l: "grego", o: "kenóō", s: "esvaziar-se: Cristo não deixou de ser Deus, mas abriu mão da sua glória e assumiu a forma de servo", v: "Mas aniquilou-se a si mesmo, tomando a forma de servo, fazendo-se semelhante aos homens.", r: "Filipenses 2.7", a: "O Filho de Deus desceu para servir. Na Igreja, a grandeza se mede pelo serviço." },
  { p: "Consolador", l: "grego", o: "paráklētos", s: "aquele que é chamado para estar ao lado: o que ajuda, defende, conforta e ensina", v: "E eu rogarei ao Pai, e ele vos dará outro Consolador, para que fique convosco para sempre.", r: "João 14.16", a: "O Espírito Santo é uma Pessoa que caminha ao seu lado. Você não está sozinho." },
  { p: "Paz", l: "hebraico", o: "shalom", s: "muito mais que ausência de guerra: inteireza, bem-estar completo, vida em ordem diante de Deus", v: "O SENHOR sobre ti levante o seu rosto e te dê a paz.", r: "Números 6.26", a: "A paz bíblica começa na reconciliação com Deus e alcança a casa, a mente e os relacionamentos." },
  { p: "Arrependimento", l: "grego", o: "metánoia", s: "mudança de mente que produz mudança de direção e de vida", v: "Arrependei-vos, pois, e convertei-vos, para que sejam apagados os vossos pecados.", r: "Atos 3.19", a: "Arrepender-se não é só chorar: é dar meia-volta e andar na direção de Deus." },
  { p: "Fé", l: "grego", o: "pístis", s: "confiança firme, fidelidade, entrega a alguém digno de crédito", v: "Ora, a fé é o firme fundamento das coisas que se esperam e a prova das coisas que se não veem.", r: "Hebreus 11.1", a: "Fé não é pensamento positivo: é confiar em Quem prometeu, mesmo antes de ver." },
  { p: "Igreja", l: "grego", o: "ekklēsía", s: "assembleia: o povo chamado para fora do mundo e reunido por Deus", v: "Sobre esta pedra edificarei a minha igreja, e as portas do inferno não prevalecerão contra ela.", r: "Mateus 16.18", a: "A Igreja não é o prédio: somos nós, chamados por Cristo. Cuide do seu lugar no Corpo." },
  { p: "Glória", l: "hebraico", o: "kavod", s: "peso, importância, esplendor: a majestade de Deus que se manifesta", v: "Santo, Santo, Santo é o SENHOR dos Exércitos; toda a terra está cheia da sua glória.", r: "Isaías 6.3", a: "Quem percebe o peso da glória de Deus não trata as coisas santas com leveza." },
  { p: "Santo", l: "hebraico", o: "qadosh", s: "separado, posto à parte, consagrado: diferente de tudo o que é comum e impuro", v: "Santos sereis, porque eu, o SENHOR, vosso Deus, sou santo.", r: "Levítico 19.2", a: "Ser santo é pertencer a Deus em tudo: no falar, no vestir, no trabalhar e no pensar." },
  { p: "Verbo", l: "grego", o: "lógos", s: "palavra, razão, expressão: Cristo é a expressão perfeita de Deus", v: "No princípio, era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.", r: "João 1.1", a: "Quer saber como Deus é? Olhe para Jesus: Ele é a Palavra de Deus em pessoa." },
  { p: "Redenção", l: "grego", o: "apolýtrōsis", s: "libertação mediante o pagamento de um resgate, como a compra da liberdade de um escravo", v: "Em quem temos a redenção pelo seu sangue, a remissão das ofensas, segundo as riquezas da sua graça.", r: "Efésios 1.7", a: "Você foi comprado por alto preço: o sangue de Cristo. Viva como quem é livre." },
  { p: "Aleluia", l: "hebraico", o: "hallelu-Yah", s: "“louvai ao SENHOR”: um chamado para que todos louvem a Deus", v: "Tudo quanto tem fôlego louve ao SENHOR. Louvai ao SENHOR.", r: "Salmos 150.6", a: "Enquanto houver fôlego, há motivo para louvar." },
  { p: "Amém", l: "hebraico", o: "amen", s: "firme, verdadeiro, seguro: “assim é” e “assim seja”", v: "Porque todas quantas promessas há de Deus são nele sim; e por ele o Amém, para glória de Deus, por nós.", r: "2 Coríntios 1.20", a: "Em Cristo, as promessas de Deus são firmes. Diga “amém” com fé, e não por costume." },
  { p: "Espírito", l: "hebraico e grego", o: "rúach / pneûma", s: "vento, sopro, espírito: a mesma palavra descreve o vento e o Espírito de Deus", v: "O vento assopra onde quer, e ouves a sua voz, mas não sabes donde vem, nem para onde vai; assim é todo aquele que é nascido do Espírito.", r: "João 3.8", a: "Como o vento, o Espírito não se vê, mas se percebe pelos efeitos: vidas transformadas." },
  { p: "Batizar", l: "grego", o: "baptízō", s: "mergulhar, imergir, submergir", v: "Portanto, ide, ensinai todas as nações, batizando-as em nome do Pai, e do Filho, e do Espírito Santo.", r: "Mateus 28.19", a: "O batismo nas águas é o testemunho público de quem morreu para o pecado e ressurgiu para uma nova vida." },
  { p: "Evangelho", l: "grego", o: "euangélion", s: "boa notícia, boa nova: o anúncio da salvação em Cristo", v: "O tempo está cumprido, e o Reino de Deus está próximo. Arrependei-vos e crede no evangelho.", r: "Marcos 1.15", a: "Quem recebeu a melhor notícia do mundo não consegue guardá-la para si." },
  { p: "Ressurreição", l: "grego", o: "anástasis", s: "levantar-se, pôr-se de pé novamente", v: "Eu sou a ressurreição e a vida; quem crê em mim, ainda que esteja morto, viverá.", r: "João 11.25", a: "Em Cristo, a morte não tem a última palavra. Há esperança diante de todo túmulo." },
  { p: "Pecado", l: "grego", o: "hamartía", s: "errar o alvo: falhar o propósito para o qual Deus nos criou", v: "Porque todos pecaram e destituídos estão da glória de Deus.", r: "Romanos 3.23", a: "Todos erramos o alvo, mas em Cristo há perdão e um novo começo." }
];
const ETU_OFICINA = {
  texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
  ref: "João 3.16",
  tipos: [
    { n: "Temático", def: "O tema nasce do texto, mas as divisões vêm de vários textos da Bíblia que tratam do mesmo assunto.", tit: "O amor de Deus", div: [["Um amor eterno", "“Com amor eterno te amei” (Jeremias 31.3)."], ["Um amor sacrificial", "“Mas Deus prova o seu amor para conosco em que Cristo morreu por nós, sendo nós ainda pecadores” (Romanos 5.8)."], ["Um amor que transforma", "“Nós o amamos a ele porque ele nos amou primeiro” (1 João 4.19)."]], apl: "Quem conhece o amor de Deus aprende a amar: em casa, na igreja e com quem ainda não conhece a Cristo.", van: "Permite tratar um assunto com amplitude bíblica.", cui: "Cada texto citado precisa ser lido no seu próprio contexto." },
    { n: "Textual", def: "As divisões saem das palavras do próprio versículo (um texto curto), e cada parte é desenvolvida pelo pregador.", tit: "As quatro grandezas de João 3.16", div: [["A grandeza do Doador", "“Deus amou”: a iniciativa é de Deus."], ["A grandeza da dádiva", "“deu o seu Filho unigênito”: a palavra “unigênito”, no grego, significa único, sem igual."], ["A grandeza do alcance", "“todo aquele que nele crê”: ninguém está fora do convite."], ["A grandeza do propósito", "“não pereça, mas tenha a vida eterna”: livramento e vida."]], apl: "O amor de Deus alcança você hoje, e a resposta pedida é uma só: crer.", van: "O ouvinte memoriza o versículo junto com o sermão.", cui: "As divisões devem respeitar o sentido do texto, sem forçar palavras." },
    { n: "Expositivo", def: "O sermão explica uma passagem mais extensa no seu contexto: a ideia central e as divisões nascem do texto e são explicadas por ele.", tit: "Nascer de novo pela fé no Filho levantado (João 3.1-18)", div: [["A necessidade: nascer de novo (3.3-7)", "Nicodemos, mestre em Israel, veio de noite. Jesus mostrou que nem a religião nem o conhecimento salvam: é preciso nascer do alto."], ["A provisão: o Filho levantado (3.14-15)", "Como a serpente de metal no deserto (Números 21.8-9), quem olhava vivia. Cristo seria levantado na cruz para que quem crê tenha vida."], ["A resposta: crer para não perecer (3.16-18)", "O amor de Deus oferece; a fé recebe. Quem crê não é condenado."]], apl: "A pergunta de Jesus a Nicodemos chega a nós: você já nasceu de novo? Olhe para Cristo, levantado na cruz, e viva.", van: "Mostra ao ouvinte o que o texto realmente diz, no contexto do autor.", cui: "Exige estudo do contexto, das palavras e do argumento da passagem." }
  ]
};
function etuPalavraHoje() {
  const d = /* @__PURE__ */ new Date();
  const ini = new Date(d.getFullYear(), 0, 0);
  const dia = Math.floor((d - ini) / 864e5);
  return ETU_PALAVRAS[dia % ETU_PALAVRAS.length];
}
function etuOficinaAbrir() {
  const O = ETU_OFICINA;
  const aba = (t, i) => `<button type="button" role="tab" class="of-ab" data-of="${i}" aria-selected="${i === 0}" style="min-height:44px;padding:8px 14px;border-radius:22px;border:1.5px solid #C9A24A;background:${i === 0 ? "#1B2238" : "#fff"};color:${i === 0 ? "#E3C77A" : "#1B2238"};font:inherit;font-size:16px;cursor:pointer">${esc(t.n)}</button>`;
  const corpo = (t) => `<p style="margin:0 0 10px;font-style:italic">${esc(t.def)}</p><h4 style="margin:6px 0 8px;font-size:20px;color:#6E1A26">${esc(t.tit)}</h4><ol style="margin:0 0 10px;padding-left:22px">${t.div.map((d) => `<li style="margin-bottom:8px"><b>${esc(d[0])}</b><br>${esc(d[1])}</li>`).join("")}</ol><p style="margin:0 0 10px"><b>Aplicação:</b> ${esc(t.apl)}</p><p style="margin:0;font-size:15px;color:#555"><b>Vantagem:</b> ${esc(t.van)} <b>Cuidado:</b> ${esc(t.cui)}</p>`;
  const tabela = `<table style="width:100%;border-collapse:collapse;font-size:15px;margin-top:6px"><thead><tr><th style="text-align:left;border-bottom:2px solid #C9A24A;padding:6px">Tipo</th><th style="text-align:left;border-bottom:2px solid #C9A24A;padding:6px">De onde vêm as divisões</th></tr></thead><tbody>${O.tipos.map((t) => `<tr><td style="padding:6px;border-bottom:1px solid #eee"><b>${esc(t.n)}</b></td><td style="padding:6px;border-bottom:1px solid #eee">${esc(t.def)}</td></tr>`).join("")}</tbody></table>`;
  modal(`<h3>Oficina do Sermão</h3><p style="margin:0 0 6px">Um mesmo texto, três formas de pregar:</p><blockquote style="margin:0 0 12px;padding:10px 14px;border-left:4px solid #C9A24A;background:#F7F1E3;font-style:italic">“${esc(O.texto)}” <b style="font-style:normal">(${esc(O.ref)})</b></blockquote><div role="tablist" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">${O.tipos.map(aba).join("")}</div><div id="ofCorpo">${corpo(O.tipos[0])}</div><details style="margin-top:14px"><summary style="cursor:pointer;font-weight:700">Comparar os três tipos</summary>${tabela}</details><p style="margin:14px 0 0;font-size:15px">Aprenda a preparar e pregar sermões fiéis ao texto na disciplina <b>Homilética</b>, do Curso Médio de Teologia.</p><div class="acts"><button class="btn btn-gold" data-close>Fechar</button></div>`);
  document.querySelectorAll(".of-ab").forEach((b) => b.onclick = () => {
    const i = +b.dataset.of;
    document.querySelectorAll(".of-ab").forEach((x) => {
      const on = x === b;
      x.setAttribute("aria-selected", on);
      x.style.background = on ? "#1B2238" : "#fff";
      x.style.color = on ? "#E3C77A" : "#1B2238";
    });
    document.getElementById("ofCorpo").innerHTML = corpo(O.tipos[i]);
  });
}
(function() {
  function monta() {
    if (document.getElementById("etuPalavra")) return true;
    const ref = document.getElementById("etuVitrine");
    if (!ref) return false;
    const w = etuPalavraHoje();
    const sec = document.createElement("section");
    sec.className = "block";
    sec.id = "etuPalavra";
    sec.setAttribute("aria-label", "Para quem ama a Palavra");
    sec.innerHTML = `<div style="text-align:center;font-family:Cinzel,Georgia,serif;letter-spacing:4px;font-size:13px;color:#8a6b1f;margin-bottom:6px">PARA QUEM AMA A PALAVRA</div><h2 style="text-align:center;margin:0 0 16px">Estudo, pregação e profundidade</h2>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;max-width:880px;width:calc(100% - 28px);margin:0 auto">
 <article style="background:#fff;border:1.5px solid #C9A24A;border-radius:14px;padding:20px 22px">
  <div style="font-family:Cinzel,Georgia,serif;font-size:12px;letter-spacing:3px;color:#8a6b1f">A PALAVRA DO DIA NO ORIGINAL</div>
  <h3 style="margin:6px 0 6px;font-size:28px;color:#1B2238">${esc(w.p)}</h3>
  <p style="margin:0 0 8px">Esta palavra no ${esc(w.l)} significa <b>${esc(w.s)}</b>.</p>
  <p style="margin:0 0 10px;font-style:italic;border-left:4px solid #C9A24A;padding-left:10px">“${esc(w.v)}” <b style="font-style:normal">(${esc(w.r)})</b></p>
  <p style="margin:0 0 8px"><b>Para hoje:</b> ${esc(w.a)}</p>
  <button type="button" class="btn btn-line btn-sm" style="margin:0 0 8px" data-rot="🗣 Ouvir a palavra do dia" data-fala="${esc("A palavra do dia: " + w.p + ". Esta palavra no " + w.l + " significa " + w.s + ". " + w.v + " " + w.r + ". Para hoje: " + w.a)}">🗣 Ouvir a palavra do dia</button>
  <p style="margin:0;font-size:14px;color:#666">No original: ${esc(w.o)} • Uma palavra nova a cada dia.</p>
 </article>
 <article style="background:#1B2238;color:#F7F1E3;border:1.5px solid #C9A24A;border-radius:14px;padding:20px 22px;display:flex;flex-direction:column">
  <div style="font-family:Cinzel,Georgia,serif;font-size:12px;letter-spacing:3px;color:#E3C77A">OFICINA DO SERMÃO</div>
  <h3 style="margin:6px 0 8px;font-size:26px;color:#fff">Temático, textual ou expositivo?</h3>
  <p style="margin:0 0 14px">Veja o mesmo texto, João 3.16, preparado nos três tipos de sermão: título, divisões e aplicação, lado a lado.</p>
  <button type="button" id="etuOficinaBtn" class="btn btn-gold" style="margin-top:auto;align-self:flex-start">Abrir a Oficina do Sermão</button>
 </article>
</div>`;
    ref.parentNode.insertBefore(sec, ref);
    document.getElementById("etuOficinaBtn").onclick = etuOficinaAbrir;
    return true;
  }
  function tenta(n) {
    if (monta()) return;
    if (n > 0) setTimeout(() => tenta(n - 1), 800);
  }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", () => tenta(12));
  else tenta(12);
})();
(function() {
  var css = document.createElement("style");
  css.textContent = '.ap-atual{display:flex;align-items:center;gap:14px;background:#fff;border:1px solid #E1D4B2;border-radius:14px;padding:12px 14px}.ap-atual img{width:58px;height:58px;object-fit:contain;flex:none}.ap-atual div{flex:1;min-width:0}.ap-atual small{display:block;font-size:12px;letter-spacing:.1em;color:#8C6A1E;font-weight:700}.ap-atual b{display:block;font-size:18px;color:#1B2238}.ap-atual span{font-size:15px;color:#5b6070}.ap-atual i{width:42px;height:42px;border-radius:50%;flex:none;border:3px solid #C9A24A;box-shadow:0 2px 8px rgba(0,0,0,.2)}.ap-bts{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}.ap-roda{display:inline-block;width:16px;height:16px;border-radius:50%;margin-right:8px;vertical-align:-3px;background:conic-gradient(#1D3C91,#14493A,#5E1626,#82295A,#863512,#1D3C91);border:1px solid rgba(0,0,0,.2)}.ap-seg{display:inline-flex;border:1.5px solid #C9A24A;border-radius:10px;overflow:hidden}.ap-seg button{font:600 15px Georgia,serif;padding:9px 16px;min-height:42px;background:#fff;color:#1B2238;border:0;border-right:1px solid #E1D4B2;cursor:pointer}.ap-seg button:last-child{border-right:0}.ap-seg button[aria-pressed=true]{background:#E9CF7F}.ap-folha{position:fixed;inset:0;z-index:9998;background:rgba(5,10,25,.7);display:flex;align-items:flex-end;justify-content:center}.ap-caixa{background:#FFFDF6;color:#1B2238;width:100%;max-width:620px;max-height:86vh;display:flex;flex-direction:column;border-radius:18px 18px 0 0;border-top:3px solid #C9A24A;animation:apSobe .25s ease-out}@keyframes apSobe{from{transform:translateY(40px);opacity:0}to{transform:none;opacity:1}}@media(min-width:700px){.ap-folha{align-items:center}.ap-caixa{border-radius:18px;border:2px solid #C9A24A}}.ap-topo{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid #E1D4B2}.ap-topo b{font-family:Cinzel,Georgia,serif;font-size:19px;color:#1B2238}.ap-x{width:42px;height:42px;border-radius:50%;border:1px solid #E1D4B2;background:#fff;font-size:18px;cursor:pointer;color:#1B2238}.ap-corpo{overflow:auto;padding:6px 18px 10px}.ap-pe{padding:12px 18px;border-top:1px solid #E1D4B2;text-align:right}.ap-g{margin:14px 0 8px;font-weight:700;color:#8C6A1E;font-size:14px;letter-spacing:.06em;text-transform:uppercase}.ap-grade{display:grid;grid-template-columns:repeat(auto-fill,minmax(82px,1fr));gap:10px}.ap-grade button{display:flex;flex-direction:column;align-items:center;gap:6px;background:#fff;border:1.5px solid #E1D4B2;border-radius:12px;padding:10px 4px;font:600 13.5px Georgia,serif;color:#1B2238;cursor:pointer}.ap-grade span{width:40px;height:40px;border-radius:50%;box-shadow:inset 0 0 0 2px rgba(255,255,255,.25),0 2px 6px rgba(0,0,0,.25)}.ap-grade button[aria-pressed=true]{border-color:#C9A24A;box-shadow:0 0 0 2px #8C6A1E;background:#FFF6DC}.ap-brs{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding-top:12px}.ap-brs button{background:#fff;border:2px solid #E1D4B2;border-radius:14px;padding:14px;font:600 16px Georgia,serif;color:#1B2238;cursor:pointer}.ap-brs img{display:block;height:84px;max-width:100%;object-fit:contain;margin:0 auto 8px}.ap-brs button[aria-pressed=true]{border-color:#C9A24A;box-shadow:0 0 0 2px #8C6A1E;background:#FFF6DC}.lp{margin-top:18px;background:radial-gradient(ellipse at 30% 0%,var(--navy2,#16294F),var(--navy,#0F1E3D) 70%);color:#F7F1E3;border:1.5px solid #C9A24A;border-radius:16px;padding:18px 18px 14px;position:relative;overflow:hidden}.lp small{display:block;color:#E2C47A;letter-spacing:.14em;font-weight:700;font-size:12.5px}.lp h3{font-family:Cinzel,Georgia,serif;color:#fff;font-size:21px;margin:6px 0 8px}.lp blockquote{margin:0 0 10px;font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-size:20px;line-height:1.4;border-left:3px solid #C9A24A;padding-left:12px}.lp blockquote cite{display:block;font-style:normal;font-family:Cinzel,Georgia,serif;font-size:13px;color:#E2C47A;margin-top:4px}.lp p{margin:0 0 8px;font-size:16px;line-height:1.55}.lp p b{color:#E2C47A}.lp .lp-ct{display:flex;align-items:center;justify-content:space-between;margin-top:10px}.lp-dots{display:flex;gap:6px}.lp-dots i{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.3)}.lp-dots i.on{background:#E2C47A}.lp-ct button{background:transparent;border:1px solid rgba(226,196,122,.6);color:#F7F1E3;border-radius:20px;min-width:42px;min-height:38px;cursor:pointer;font:600 14px Georgia,serif;margin-left:6px}.lp-corpo{transition:opacity .5s}.lp-corpo.sai{opacity:0}.tc{display:flex;align-items:center;gap:14px;background:linear-gradient(120deg,var(--navy,#0F1E3D),var(--navy3,#1E3463));color:#fff;border:1.5px solid #C9A24A;border-radius:16px;padding:14px 16px;cursor:pointer;width:100%;text-align:left;font-family:Georgia,serif;box-shadow:0 6px 18px rgba(0,0,0,.18)}.tc .tc-play{width:54px;height:54px;flex:none;border-radius:50%;background:#C9A24A;color:#0F1B3D;display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:0 0 0 6px rgba(201,162,74,.25);animation:tcPulso 2.4s infinite}@keyframes tcPulso{50%{box-shadow:0 0 0 11px rgba(201,162,74,.08)}}@media(prefers-reduced-motion:reduce){.tc .tc-play{animation:none}}.tc small{display:block;color:#E2C47A;letter-spacing:.12em;font-weight:700;font-size:12px}.tc b{display:block;font-family:Cinzel,Georgia,serif;font-size:18px;line-height:1.3}.tc span{font-size:14.5px;color:#ddd5c0}.tr{position:fixed;inset:0;z-index:9996;background:radial-gradient(ellipse at 50% 0%,#1E3463,#0B1530 60%,#060B18);color:#F7F1E3;display:flex;flex-direction:column}.tr-top{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid rgba(201,162,74,.5)}.tr-top img{width:38px;height:38px}.tr-top b{flex:1;font-family:Cinzel,Georgia,serif;color:#E2C47A;font-size:16px;letter-spacing:.06em}.tr-top button{width:42px;height:42px;border-radius:50%;border:1px solid rgba(226,196,122,.7);background:transparent;color:#fff;font-size:18px;cursor:pointer}.tr-palco{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px 18px;text-align:center;transition:opacity .6s}.tr-palco.sai{opacity:0}.tr-img{max-height:44vh;max-width:min(92vw,620px);border-radius:14px;border:3px solid #C9A24A;box-shadow:0 14px 34px rgba(0,0,0,.5);background:#fff;object-fit:contain}.tr-img.sem{border:0;box-shadow:none;background:none;max-height:30vh}.tr-img.foto{width:min(52vw,230px);height:auto;aspect-ratio:1;object-fit:cover;border-radius:50%;border:4px solid #C9A24A;box-shadow:0 0 0 8px rgba(201,162,74,.18),0 14px 34px rgba(0,0,0,.5)}.tr-palco p i{display:block;margin-top:10px;font-family:"Cormorant Garamond",Georgia,serif;font-size:1.12em;color:#fff}.dirc{display:flex;gap:16px;align-items:center;background:#FFFDF6;color:#1B2238;border:1.5px solid #C9A24A;border-radius:18px;padding:16px;box-shadow:0 8px 22px rgba(0,0,0,.12);margin-bottom:14px}.dirc img{width:104px;height:104px;border-radius:50%;object-fit:cover;flex:none;border:3px solid #C9A24A;box-shadow:0 0 0 5px rgba(201,162,74,.18)}.dirc small{display:block;color:#8C6A1E;letter-spacing:.12em;font-weight:700;font-size:12px}.dirc q{display:block;font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-size:19px;line-height:1.4;margin:4px 0 6px;quotes:"“" "”"}.dirc b{font-family:Cinzel,Georgia,serif;font-size:14.5px;color:#1B2238}.dirc span{display:block;font-size:13.5px;color:#5b6070}@media(max-width:420px){.dirc{flex-direction:column;text-align:center}.dirc img{width:120px;height:120px}}.tr-img.cena{max-height:30vh}.tr-faixa{width:100%;max-width:900px;overflow:hidden;margin-top:10px;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}.tr-trilho{display:flex;width:max-content;animation:trRola 38s linear infinite}.tr-trilho img{height:15vh;max-height:150px;cursor:zoom-in;display:block;margin-right:7px;border-radius:6px}@keyframes trRola{to{transform:translateX(-50%)}}@media(prefers-reduced-motion:reduce){.tr-trilho{animation:none}}.tr-palco small{margin-top:14px;color:#E2C47A;letter-spacing:.16em;font-weight:700;font-size:12.5px}.tr-palco h2{font-family:Cinzel,Georgia,serif;color:#fff;font-size:clamp(21px,5.4vw,30px);margin:6px 0 8px;line-height:1.25}.tr-palco p{max-width:640px;margin:0 auto;font-size:clamp(16px,4.2vw,18.5px);line-height:1.55;color:#ece6d6}.tr-palco p b{color:#E2C47A}.tr-pe{padding:10px 14px calc(14px + env(safe-area-inset-bottom,0px))}.tr-barra{display:flex;gap:4px;margin-bottom:10px}.tr-barra i{flex:1;height:4px;border-radius:2px;background:rgba(255,255,255,.2);overflow:hidden}.tr-barra i.ja{background:#C9A24A}.tr-barra i.agora::after{content:"";display:block;height:100%;width:100%;background:#C9A24A;transform-origin:left;animation:trEnche var(--d,11s) linear forwards}.tr.parado .tr-barra i.agora::after{animation-play-state:paused}@keyframes trEnche{from{transform:scaleX(0)}to{transform:scaleX(1)}}.tr.narrando .tr-barra i.agora::after{animation:none;transform:scaleX(1);opacity:.55}.tr-ct button[aria-pressed=true]{background:#C9A24A;color:#0F1B3D}.tr-ct{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}.tr-ct button{min-height:44px;min-width:48px;border-radius:24px;border:1px solid rgba(226,196,122,.8);background:transparent;color:#fff;font:600 15px Georgia,serif;padding:0 16px;cursor:pointer}.tr-ct button.forte{background:#C9A24A;color:#0F1B3D;border-color:#C9A24A}';
  document.head.appendChild(css);
  var LICOES = [
    { t: "A fé que obedece", v: "Ora, sem fé é impossível agradar-lhe, porque é necessário que aquele que se aproxima de Deus creia que ele existe e que é galardoador dos que o buscam.", r: "Hebreus 11.6", e: "<b>Abraão</b> saiu da sua terra “sem saber para onde ia” (Hebreus 11.8), confiando apenas na palavra de Deus.", l: "A fé verdadeira obedece antes de entender tudo. Deus revela o caminho a quem dá o primeiro passo." },
    { t: "Oração que não para", v: "Orai sem cessar.", r: "1 Tessalonicenses 5.17", e: "<b>Daniel</b>, mesmo sabendo do decreto do rei, entrou em casa e orou três vezes por dia, como costumava fazer (Daniel 6.10).", l: "Quem ora todos os dias não é pego de surpresa pela prova: a força nasce no hábito com Deus." },
    { t: "O perdão que liberta", v: "Antes, sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo.", r: "Efésios 4.32", e: "<b>José</b>, vendido pelos irmãos, disse-lhes: “Vós bem intentastes mal contra mim, porém Deus o tornou em bem” (Gênesis 50.20).", l: "O perdão não apaga a dor, mas tira dela o poder de nos prender. Deus transforma feridas em propósito." },
    { t: "A batalha é do Senhor", v: "Eu vou a ti em nome do SENHOR dos Exércitos.", r: "1 Samuel 17.45", e: "<b>Davi</b>, ainda jovem, enfrentou Golias sem armadura, confiando no nome do Senhor.", l: "O tamanho do problema não decide a vitória. Quem decide é o Deus em cujo nome nós caminhamos." },
    { t: "Fiel no pouco", v: "Quem é fiel no mínimo também é fiel no muito.", r: "Lucas 16.10", e: "<b>Rute</b> permaneceu ao lado de Noemi e disse: “o teu povo é o meu povo, o teu Deus é o meu Deus” (Rute 1.16). Deus a colocou na linhagem do Messias.", l: "A fidelidade nas coisas simples prepara o caminho para as grandes obras de Deus." },
    { t: "Há volta para quem cai", v: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça.", r: "1 João 1.9", e: "<b>Pedro</b> negou o Senhor e chorou amargamente (Lucas 22.62); depois, Jesus o restaurou e lhe disse: “Apascenta as minhas ovelhas” (João 21.17).", l: "A queda não precisa ser o fim. Arrependimento sincero abre a porta da restauração." },
    { t: "Amor pela Palavra", v: "Lâmpada para os meus pés é tua palavra e luz, para o meu caminho.", r: "Salmos 119.105", e: "Os <b>bereanos</b> receberam a palavra de bom grado e examinavam cada dia nas Escrituras se as coisas eram assim (Atos 17.11).", l: "Estudar a Bíblia com seriedade não esfria a fé: ilumina o caminho e firma os pés." },
    { t: "Esperança que não morre", v: "Porque eu sei que o meu Redentor vive, e que por fim se levantará sobre a terra.", r: "Jó 19.25", e: "<b>Jó</b> perdeu bens, filhos e saúde, mas não perdeu a certeza do seu Redentor.", l: "Quando tudo ao redor cai, a esperança em Cristo permanece de pé." }
  ];
  window.etuLicoesMonta = function(v) {
    if (document.getElementById("etuLicoes")) return;
    var ap = document.getElementById("etuAparencia");
    var d = document.createElement("section");
    d.id = "etuLicoes";
    d.className = "lp";
    d.setAttribute("aria-label", "Lições da Palavra");
    d.innerHTML = '<small>UMA PALAVRA PARA A SUA VIDA</small><div class="lp-corpo"></div><div class="lp-ct"><div class="lp-dots">' + LICOES.map(function() {
      return "<i></i>";
    }).join("") + '</div><div><button type="button" data-lp="-1" aria-label="Anterior">◀</button><button type="button" data-lp="p" aria-label="Pausar">❚❚</button><button type="button" data-lp="1" aria-label="Próxima">▶</button><button type="button" data-lp="o" aria-label="Ouvir">🗣</button></div></div>';
    if (ap && ap.nextSibling) v.insertBefore(d, ap.nextSibling);
    else v.appendChild(d);
    var i = Math.floor(Date.now() / 864e5) % LICOES.length, tm = null, pausa = false, corpo = d.querySelector(".lp-corpo");
    function mostra(n) {
      i = (n + LICOES.length) % LICOES.length;
      var L = LICOES[i];
      corpo.classList.add("sai");
      setTimeout(function() {
        corpo.innerHTML = "<h3>" + L.t + "</h3><blockquote>“" + L.v + "”<cite>" + L.r.toUpperCase() + "</cite></blockquote><p>" + L.e + "</p><p><b>Para a nossa vida:</b> " + L.l + "</p>";
        corpo.classList.remove("sai");
        d.querySelectorAll(".lp-dots i").forEach(function(x, k) {
          x.className = k === i ? "on" : "";
        });
      }, corpo.innerHTML ? 350 : 0);
      agenda();
    }
    function agenda() {
      clearTimeout(tm);
      if (pausa || !document.body.contains(d)) return;
      tm = setTimeout(function() {
        if (!document.hidden) mostra(i + 1);
        else agenda();
      }, 12e3);
    }
    d.querySelectorAll("[data-lp]").forEach(function(b) {
      b.onclick = function() {
        var a = b.dataset.lp;
        if (a === "o") {
          var L = LICOES[i];
          pausa = true;
          clearTimeout(tm);
          window.etuVoz && window.etuVoz.ouvir(L.t + ". " + L.v + " " + L.r + ". " + L.e + " Para a nossa vida: " + L.l, b);
          return;
        }
        if (a === "p") {
          pausa = !pausa;
          b.textContent = pausa ? "▶ Continuar" : "❚❚";
          b.setAttribute("aria-label", pausa ? "Continuar" : "Pausar");
          agenda();
        } else mostra(i + +a);
      };
    });
    mostra(i);
  };
  function musica() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    var ctx = new AC(), mestre = ctx.createGain(), comp = ctx.createDynamicsCompressor();
    mestre.gain.value = 0;
    comp.threshold.value = -10;
    comp.knee.value = 6;
    comp.ratio.value = 4;
    mestre.connect(comp);
    comp.connect(ctx.destination);
    var filtro = ctx.createBiquadFilter();
    filtro.type = "lowpass";
    filtro.frequency.value = 1600;
    filtro.connect(mestre);
    var AC4 = [[130.81, 196, 261.63, 329.63], [110, 164.81, 220, 261.63], [87.31, 174.61, 220, 261.63], [98, 146.83, 196, 246.94]];
    var SIN = [523.25, 587.33, 659.25, 783.99, 659.25, 587.33], passo = 0, vivo = true, prox = ctx.currentTime + 0.1;
    function alvo() {
      var v = window.etuVolume ? window.etuVolume() : 0.7;
      return 2.4 * v * v * (window.etuDuck ? 0.3 : 1);
    }
    mestre.gain.linearRampToValueAtTime(alvo(), ctx.currentTime + 3);
    window.etuVolAplica = function() {
      try {
        mestre.gain.cancelScheduledValues(ctx.currentTime);
        mestre.gain.setTargetAtTime(alvo(), ctx.currentTime, 0.15);
      } catch (e) {
      }
    };
    function nota(f, t, dur, tipo, vol) {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = tipo;
      o.frequency.value = f;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + 1.8);
      g.gain.setValueAtTime(vol, t + dur - 2);
      g.gain.linearRampToValueAtTime(0, t + dur);
      o.connect(g);
      g.connect(filtro);
      o.start(t);
      o.stop(t + dur + 0.1);
    }
    function sino(f, t) {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = f;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.09, t + 0.05);
      g.gain.exponentialRampToValueAtTime(1e-4, t + 2.8);
      o.connect(g);
      g.connect(filtro);
      o.start(t);
      o.stop(t + 2.9);
    }
    function ciclo() {
      if (!vivo) return;
      while (prox < ctx.currentTime + 6) {
        var a = AC4[passo % 4];
        a.forEach(function(f, k) {
          nota(f, prox, 6.5, k ? "sine" : "triangle", k ? 0.085 : 0.12);
        });
        if (passo % 2 === 0) sino(SIN[passo / 2 % SIN.length], prox + 2.4);
        passo++;
        prox += 5.2;
      }
      setTimeout(ciclo, 1500);
    }
    ciclo();
    return { parar: function() {
      vivo = false;
      try {
        mestre.gain.cancelScheduledValues(ctx.currentTime);
        mestre.gain.setValueAtTime(mestre.gain.value, ctx.currentTime);
        mestre.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
        setTimeout(function() {
          ctx.close();
        }, 1200);
      } catch (e) {
      }
    } };
  }
  window.etuMusicaCria = musica;
  var SL = [
    { i: "brasao-redondo.webp", s: "BEM-VINDO", h: "Escola Teológica União", p: "Formação Bíblica, Teológica e Ministerial. Uma escola de <b>curso livre de teologia</b>, com sede em Cristalina, Goiás, para quem deseja conhecer a Palavra de Deus com profundidade e servir melhor no Reino.", sem: 1 },
    { i: "diretor.webp", s: "A DIREÇÃO", h: "Pr. Charlei de Jesus Lima Dias", p: "Idealizador e Diretor Geral da escola, prepara e acompanha o conteúdo de cada curso, numa linha <b>pentecostal clássica, trinitária</b> e fiel às Escrituras.<br><i>“Estudar as Escrituras com seriedade, à luz do Espírito Santo, é preparar a vida, fortalecer o ministério e servir melhor a Cristo.”</i>", foto: 1 },
    { i: "dispositivos.webp", s: "CURSO LIVRE DE TEOLOGIA", h: "O que é um curso livre", p: "É uma formação bíblica, teológica e ministerial aberta a todos, amparada pela liberdade de ensino da Constituição Federal e pela Lei 9.394/1996. Prepara para estudar, ensinar na igreja, na Escola Dominical e pregar a Palavra." },
    { i: "doc-cert-basico.webp", s: "CURSO LIVRE × CURSO DO MEC", h: "Entenda a diferença", p: "O curso livre <b>não é graduação</b> e não depende do MEC: forma para a vida cristã e o ministério, com certificado verificável. A graduação reconhecida pelo MEC dá <b>diploma de nível superior</b>. Quem precisa desse diploma para concurso ou docência deve procurar uma graduação." },
    { i: "guia-04.webp", s: "OS CURSOS", h: "Do Básico ao Avançado", p: "<b>Básico</b>: as grandes doutrinas da Bíblia. <b>Médio</b>: interpretar, ensinar e pregar. <b>Avançado</b>: aprofundamento para o ministério. Há também especializações, livros e estudos." },
    { i: "cena-basico.webp", f: "faixa-basico.webp", s: "CURSO BÁSICO DE TEOLOGIA", h: "11 disciplinas, 11 apostilas", p: "Da Introdução à Teologia à Escatologia: Bibliologia, Cristologia, Pneumatologia, Soteriologia e muito mais. Cada disciplina tem a sua apostila, com o significado do nome, o que se estuda e perguntas para refletir.", sem: 1, d: 15e3 },
    { i: "cena-medio.webp", f: "faixa-medio.webp", s: "CURSO MÉDIO DE TEOLOGIA", h: "10 disciplinas para ensinar e pregar", p: "Hermenêutica, Panoramas do Antigo e do Novo Testamento, Geografia Bíblica, História de Israel e da Igreja, Homilética, Ética Cristã, Evangelismo e Missões e Educação Cristã.", sem: 1, d: 15e3 },
    { i: "cena-avancado.webp", f: "faixa-avancado.webp", s: "CURSO AVANÇADO DE TEOLOGIA", h: "11 disciplinas para o ministério", p: "Exegese, Teologia Contemporânea, Filosofia e Fé Cristã, Teologia do Antigo e do Novo Testamento, Apologética, Seitas e Heresias, Teologia Pentecostal, Patrística, Teologia Pastoral e Liderança.", sem: 1, d: 15e3 },
    { i: "guia-01.webp", s: "COMO ACESSAR", h: "escolateologicauniao.github.io", p: "Abra o endereço oficial no <b>Chrome</b> (Android e computador) ou no <b>Safari</b> (iPhone). A plataforma funciona no celular, no tablet, no computador e na TV." },
    { i: "guia-02.webp", s: "NO SEU CELULAR", h: "Instale o aplicativo", p: "No Chrome, toque nos <b>três pontinhos</b> e em <b>Instalar aplicativo</b>. No iPhone, toque em <b>Compartilhar</b> e em <b>Adicionar à Tela de Início</b>. Sem baixar arquivo e sem pedir acesso a fotos ou contatos." },
    { i: "guia-06.webp", s: "PRIMEIROS PASSOS", h: "Conta e matrícula", p: "Crie a sua conta com nome, WhatsApp e e-mail. A matrícula é feita pelo Pix <b>somente na chave exibida na plataforma</b>, e o comprovante vai pelo WhatsApp oficial da escola." },
    { i: "guia-10.webp", s: "ESTUDE NO SEU RITMO", h: "Vídeo e apostila", p: "Cada aula traz vídeo e apostila na mesma tela, com letra maior ou menor e modo noturno. Você estuda quando e onde puder." },
    { i: "guia-11.webp", s: "PROVAS CORRIGIDAS NA HORA", h: "Aprenda com cada resposta", p: "O erro aparece em <b>vermelho</b>, a resposta certa em <b>verde</b>, e a nota sai na hora. A aprovação é com 70%, e você pode refazer quantas vezes precisar." },
    { i: "doc-cart-frente.webp", s: "DOCUMENTOS", h: "Certificado e carteirinha", p: "Ao concluir o curso, o aluno recebe <b>certificado com código de verificação</b>. O aluno com matrícula ativa recebe a <b>carteira de estudante</b>, válida por 3 anos. Qualquer pessoa pode validar os documentos na plataforma." },
    { i: "guia-13.webp", s: "PARA QUEM AMA A PALAVRA", h: "Palavra do dia e Oficina do Sermão", p: "Todo dia, uma palavra da Bíblia explicada no hebraico ou no grego. Na <b>Oficina do Sermão</b>, o mesmo texto organizado em sermão temático, textual e expositivo." },
    { i: "guia-16.webp", s: "APRENDA BRINCANDO", h: "Desafio Bíblico", p: "Perguntas em quatro níveis e charadas de “Quem sou eu?”, com a explicação bíblica de cada resposta. Encontre em <b>Menu → Desafio Bíblico</b>." },
    { i: "guia-19.webp", s: "DO SEU JEITO", h: "Cores, brasão e avisos", p: "Em <b>Menu → Aparência do aplicativo</b>, toque em <b>Opções de cores</b> ou <b>Estilo do brasão</b>. No sininho, ative as notificações para receber os avisos da escola." },
    { i: "guia-18.webp", s: "ESTAMOS COM VOCÊ", h: "Ajuda e segurança", p: "Toque em <b>Ajuda</b> ou no botão do <b>WhatsApp</b> para falar com a escola. A escola <b>nunca pede senha</b>, código por SMS ou Pix fora da chave exibida na plataforma." },
    { i: "brasao-redondo.webp", s: "2 TIMÓTEO 2.15", h: "Comece hoje a sua formação", p: "“Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar, que maneja bem a palavra da verdade.”", sem: 1, fim: 1 }
  ];
  var FALA = { "Escola Teológica União": "A paz do Senhor. Seja muito bem-vindo à Escola Teológica União. Uma escola de formação bíblica, teológica e ministerial, com sede em Cristalina, Goiás. Nos próximos minutos, você vai conhecer a escola, os cursos e a plataforma de estudo. Acomode-se, e vamos juntos.", "Pr. Charlei de Jesus Lima Dias": "A escola é dirigida pelo Pastor Charlei de Jesus Lima Dias, idealizador e Diretor Geral. Ele prepara e acompanha o conteúdo de cada curso, numa linha pentecostal clássica, trinitária, e fiel às Escrituras. Nas palavras dele: estudar as Escrituras com seriedade, à luz do Espírito Santo, é preparar a vida, fortalecer o ministério, e servir melhor a Cristo.", "O que é um curso livre": "A escola oferece cursos livres de teologia. São cursos abertos a todos, amparados pela liberdade de ensino da Constituição Federal e pela Lei de Diretrizes e Bases da Educação. Eles preparam você para estudar a Bíblia com profundidade, ensinar na igreja e na Escola Dominical, e pregar a Palavra com segurança.", "Entenda a diferença": "É importante entender a diferença. O curso livre não é graduação e não depende do MEC. Ele forma para a vida cristã e para o ministério, com certificado verificável. Já a graduação reconhecida pelo MEC concede diploma de nível superior. Por isso, quem precisa desse diploma para concurso ou para lecionar em faculdade deve procurar uma graduação.", "Do Básico ao Avançado": "A formação acontece em três níveis. No Básico, as grandes doutrinas da Bíblia. No Médio, a arte de interpretar, ensinar e pregar. No Avançado, o aprofundamento para o ministério. E, além dos níveis, há especializações, livros e estudos, porque o conhecimento de Deus não se esgota.", "11 disciplinas, 11 apostilas": "O Curso Básico tem onze disciplinas, cada uma com a sua apostila. Da Introdução à Teologia até a Escatologia, passando por Bibliologia, Cristologia, Pneumatologia e Soteriologia. Toque em qualquer capa para ver de perto.", "10 disciplinas para ensinar e pregar": "O Curso Médio tem dez disciplinas, para quem deseja ensinar e pregar. Hermenêutica, os Panoramas do Antigo e do Novo Testamento, Geografia Bíblica, História de Israel e da Igreja, Homilética, Ética Cristã, Evangelismo e Missões, e Educação Cristã.", "11 disciplinas para o ministério": "O Curso Avançado tem onze disciplinas, para o aprofundamento no ministério. Exegese, Teologia Contemporânea, Filosofia e Fé Cristã, Teologia do Antigo e do Novo Testamento, Apologética, Seitas e Heresias, Teologia Pentecostal, Patrística, Teologia Pastoral, e Liderança.", "escolateologicauniao.github.io": "Para acessar a plataforma, abra o endereço oficial da escola no navegador: escola teológica união, ponto github, ponto i o. No Android, use o Chrome. No iPhone, use o Safari. Ela funciona no celular, no tablet, no computador e até na televisão.", "Instale o aplicativo": "Você também pode instalar o aplicativo da escola. No Chrome, toque nos três pontinhos e em instalar aplicativo. No iPhone, toque em compartilhar e em adicionar à tela de início. Sem baixar arquivos, e sem pedir acesso às suas fotos ou contatos.", "Conta e matrícula": "Para começar, crie a sua conta com o seu nome, o seu WhatsApp e o seu e-mail. A matrícula é feita pelo Pix, somente na chave exibida na plataforma, e o comprovante é enviado pelo WhatsApp oficial da escola.", "Vídeo e apostila": "Cada aula traz o vídeo e a apostila na mesma tela. Você pode aumentar ou diminuir a letra, e usar o modo noturno. Estude no seu ritmo, quando e onde puder.", "Aprenda com cada resposta": "As provas são corrigidas na hora. Se você errar, a sua resposta aparece em vermelho, e a resposta certa aparece em verde. A aprovação é com setenta por cento, e você pode refazer quantas vezes precisar.", "Certificado e carteirinha": "Ao concluir o curso, você recebe o certificado com código de verificação. E o aluno com matrícula ativa recebe a carteira de estudante, válida por três anos. Qualquer pessoa pode conferir a autenticidade dos documentos na própria plataforma.", "Palavra do dia e Oficina do Sermão": "Para quem ama a Palavra, todos os dias há uma palavra da Bíblia explicada no hebraico ou no grego. E, na Oficina do Sermão, o mesmo texto bíblico aparece organizado em três formas de pregar: temático, textual e expositivo.", "Desafio Bíblico": "No Desafio Bíblico, você aprende brincando. São perguntas em quatro níveis, e charadas de quem sou eu, sempre com a explicação bíblica de cada resposta.", "Cores, brasão e avisos": "A plataforma fica do seu jeito. No botão A a, no alto da tela, você escolhe a cor, o brasão, o tamanho da letra, o brilho, o volume e a voz. E, no sininho, você ativa as notificações para receber os avisos da escola.", "Ajuda e segurança": "Sempre que precisar, toque em ajuda, ou no botão do WhatsApp, para falar com a escola. E lembre-se: a escola nunca pede a sua senha, nunca pede código por mensagem, e nunca pede Pix fora da chave exibida na plataforma.", "Comece hoje a sua formação": "Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar, que maneja bem a palavra da verdade. Segunda carta a Timóteo, capítulo dois, versículo quinze. Comece hoje a sua formação na Escola Teológica União. Que Deus abençoe a sua vida." };
  SL.forEach(function(x) {
    if (FALA[x.h]) x.fala = FALA[x.h];
  });
  var DUR = 11e3;
  window.etuTour = function() {
    if (document.getElementById("etuTour")) return;
    var o = document.createElement("div");
    o.id = "etuTour";
    o.className = "tr";
    o.setAttribute("role", "dialog");
    o.setAttribute("aria-modal", "true");
    o.setAttribute("aria-label", "Apresentação da Escola Teológica União");
    o.innerHTML = '<div class="tr-top"><img src="brasao-redondo.webp" alt=""><b>CONHEÇA A ESCOLA</b><button type="button" data-t="x" aria-label="Fechar a apresentação">✕</button></div><div class="tr-palco" aria-live="polite"></div><div class="tr-pe"><div class="tr-barra">' + SL.map(function() {
      return "<i></i>";
    }).join("") + '</div><div class="tr-ct"><button type="button" data-t="a" aria-label="Anterior">◀</button><button type="button" data-t="p" class="forte">❚❚ Pausar</button><button type="button" data-t="n" aria-label="Próximo">▶</button><button type="button" data-t="m">♪ Música</button><button type="button" data-t="nz" aria-pressed="false">🗣 Narração</button><button type="button" data-t="vm" aria-label="Diminuir o volume">🔉 −</button><button type="button" data-t="vp" aria-label="Aumentar o volume">🔊 +</button></div></div>';
    document.body.appendChild(o);
    document.documentElement.style.overflow = "hidden";
    var palco = o.querySelector(".tr-palco"), i = 0, tm = null, pausa = false, som = null;
    o.style.setProperty("--d", DUR / 1e3 + "s");
    function bt(t) {
      return o.querySelector('[data-t="' + t + '"]');
    }
    function mus(liga) {
      if (liga && !som) {
        som = musica();
      } else if (!liga && som) {
        som.parar();
        som = null;
      }
      bt("m").textContent = som ? "♪ Parar música" : "♪ Música";
      bt("m").setAttribute("aria-pressed", !!som);
    }
    function mostra(n) {
      if (n < 0) n = 0;
      if (n >= SL.length) {
        pausa = true;
        n = SL.length - 1;
      }
      i = n;
      var S2 = SL[i];
      palco.classList.add("sai");
      setTimeout(function() {
        palco.innerHTML = '<img class="tr-img' + (S2.sem ? " sem" : "") + (S2.f ? " cena" : "") + (S2.foto ? " foto" : "") + '" src="' + S2.i + '" alt="">' + (S2.f ? '<div class="tr-faixa" aria-hidden="true"><div class="tr-trilho"><img src="' + S2.f + '" alt=""><img src="' + S2.f + '" alt=""></div></div>' : "") + "<small>" + S2.s + "</small><h2>" + S2.h + "</h2><p>" + S2.p + "</p>" + (S2.fim ? '<div class="tr-ct" style="margin-top:16px"><a class="btn btn-gold" href="#cursos" data-t="ir">Conhecer os cursos</a><a class="btn btn-line" href="#como-usar" data-t="ir" style="color:#fff">Guia passo a passo</a></div>' : "");
        palco.classList.remove("sai");
        o.style.setProperty("--d", (S2.d || DUR) / 1e3 + "s");
        o.querySelectorAll(".tr-barra i").forEach(function(x, k) {
          x.className = k < i ? "ja" : k === i ? "agora" : "";
        });
        if (S2.fim) {
          pausa = true;
          o.classList.add("parado");
          bt("p").textContent = "↺ Recomeçar";
        }
        palco.querySelectorAll('[data-t="ir"]').forEach(function(a) {
          a.addEventListener("click", fecha);
        });
      }, palco.innerHTML ? 450 : 0);
      agenda();
    }
    function narra() {
      var S2 = SL[i];
      window.etuVoz.fala(S2.fala || S2.h + ". " + S2.p, function() {
        if (!pausa && window.etuVoz.ligado() && document.getElementById("etuTour")) tm = setTimeout(function() {
          mostra(i + 1);
        }, 900);
      });
    }
    function agenda() {
      clearTimeout(tm);
      if (pausa) {
        if (window.etuVoz) window.etuVoz.para();
        return;
      }
      if (window.etuVoz && window.etuVoz.ligado()) {
        setTimeout(narra, 500);
        return;
      }
      tm = setTimeout(function() {
        mostra(i + 1);
      }, SL[i].d || DUR);
    }
    function fecha() {
      clearTimeout(tm);
      mus(false);
      if (window.etuVoz) {
        window.etuVoz.liga(false);
      }
      o.remove();
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", tecla);
      document.removeEventListener("visibilitychange", vis);
    }
    function tecla(e) {
      if (e.key === "Escape") fecha();
      else if (e.key === "ArrowRight") mostra(i + 1);
      else if (e.key === "ArrowLeft") mostra(i - 1);
    }
    function vis() {
      if (document.hidden) {
        mus(false);
      }
    }
    bt("x").onclick = fecha;
    bt("a").onclick = function() {
      mostra(i - 1);
    };
    bt("n").onclick = function() {
      mostra(i + 1);
    };
    bt("m").onclick = function() {
      mus(!som);
    };
    if (!window.etuVoz || !window.etuVoz.disponivel) bt("nz").style.display = "none";
    bt("nz").onclick = function() {
      var on = !window.etuVoz.ligado();
      window.etuVoz.liga(on);
      bt("nz").setAttribute("aria-pressed", on);
      bt("nz").textContent = on ? "🗣 Parar narração" : "🗣 Narração";
      o.classList.toggle("narrando", on);
      if (on) {
        pausa = false;
        o.classList.remove("parado");
        bt("p").textContent = "❚❚ Pausar";
      }
      agenda();
    };
    bt("vm").onclick = function() {
      window.etuVolPasso(-10);
    };
    bt("vp").onclick = function() {
      window.etuVolPasso(10);
    };
    bt("p").onclick = function() {
      if (SL[i].fim) {
        pausa = false;
        o.classList.remove("parado");
        bt("p").textContent = "❚❚ Pausar";
        mostra(0);
        return;
      }
      pausa = !pausa;
      o.classList.toggle("parado", pausa);
      bt("p").textContent = pausa ? "▶ Continuar" : "❚❚ Pausar";
      if (!pausa) {
        mostra(i + 1);
      } else clearTimeout(tm);
    };
    document.addEventListener("keydown", tecla);
    document.addEventListener("visibilitychange", vis);
    var MD = window.etuVoz ? window.etuVoz.modo() : "musica";
    if (MD === "ambos" || MD === "musica") mus(true);
    if ((MD === "ambos" || MD === "voz") && window.etuVoz && window.etuVoz.disponivel) {
      window.etuVoz.liga(true);
      bt("nz").setAttribute("aria-pressed", true);
      bt("nz").textContent = "🗣 Parar narração";
      o.classList.add("narrando");
    }
    mostra(0);
    bt("x").focus({ preventScroll: true });
  };
  function cartao(id) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "tc";
    b.id = id;
    b.innerHTML = '<i class="tc-play" aria-hidden="true">▶</i><div><small>APRESENTAÇÃO DA ESCOLA</small><b>Conheça a Escola Teológica União</b><span>Tudo sobre a escola, os cursos e a plataforma, com música suave. Cerca de 3 minutos.</span></div>';
    b.onclick = window.etuTour;
    return b;
  }
  function monta() {
    var mv = document.querySelector('[data-view="mais"] .wrap'), nav = mv && mv.querySelector("nav.mais");
    if (mv && !document.getElementById("tcMenu")) {
      var c = cartao("tcMenu");
      c.style.marginBottom = "16px";
      mv.insertBefore(c, mv.firstChild);
    }
    var pal = document.getElementById("etuPalavra");
    if (pal && !document.getElementById("tcInicio")) {
      var w = document.createElement("div");
      w.className = "wrap";
      w.style.cssText = "max-width:820px;padding:18px 18px 0";
      var dc = document.createElement("div");
      dc.className = "dirc";
      dc.id = "dirInicio";
      dc.innerHTML = '<img src="diretor.webp" alt="Pr. Charlei de Jesus Lima Dias" width="104" height="104"><div><small>PALAVRA DO DIRETOR</small><q>Estudar as Escrituras com seriedade, à luz do Espírito Santo, é preparar a vida, fortalecer o ministério e servir melhor a Cristo.</q><b>Pr. Charlei de Jesus Lima Dias</b><span>Idealizador e Diretor Geral · 2 Timóteo 2.15</span></div>';
      w.appendChild(dc);
      w.appendChild(cartao("tcInicio"));
      pal.parentNode.insertBefore(w, pal);
    }
    var gp = document.querySelector('[data-view="como-usar"] .gp-moldura');
    if (gp && !document.getElementById("tcGuia")) {
      var g = cartao("tcGuia");
      g.style.marginTop = "16px";
      gp.appendChild(g);
    }
    if (location.hash === "#mais" && !document.getElementById("etuLicoes")) {
      var v = document.querySelector('[data-view="mais"] .wrap');
      if (v && document.getElementById("etuAparencia")) window.etuLicoesMonta(v);
    }
  }
  addEventListener("load", function() {
    setTimeout(monta, 900);
    setTimeout(monta, 2500);
  });
  addEventListener("hashchange", function() {
    setTimeout(monta, 400);
  });
})();
(function() {
  var css = document.createElement("style");
  css.textContent = ".wz-salas{display:flex;gap:8px;overflow-x:auto;padding:2px 0 12px}.wz-salas button{flex:none;min-height:42px;padding:0 16px;border-radius:22px;border:1.5px solid #C9A24A;background:#fff;color:#1B2238;font:600 15px Georgia,serif;cursor:pointer}.wz-salas button[aria-selected=true]{background:var(--navy,#0F1E3D);color:#F7EFD9}.wz{border:1px solid #D9CBA6;border-radius:16px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,.08)}.wz-topo{display:flex;align-items:center;gap:10px;background:var(--navy,#0F1E3D);color:#F7EFD9;padding:10px 14px}.wz-topo img{width:40px;height:40px}.wz-topo b{display:block;font-family:Cinzel,Georgia,serif;color:#E2C47A}.wz-topo span{font-size:13.5px;color:#d8d0bb}.wz-lista{border:0!important;border-radius:0!important;height:58vh!important;background:#EFE7D6 radial-gradient(circle at 20% 20%,rgba(201,162,74,.10) 0 2px,transparent 3px) 0 0/26px 26px!important;padding:12px 10px!important}.wz-m{position:relative;max-width:80%!important;border:0!important;border-radius:12px 12px 12px 4px!important;background:#fff!important;box-shadow:0 1px 2px rgba(0,0,0,.12);padding:7px 10px 4px!important;margin:6px 0!important}.wz-m.eu{margin-left:auto!important;background:#DCEFD2!important;border-radius:12px 12px 4px 12px!important}.wz-m .com-nome{font-weight:700;font-size:13.5px;color:#8C6A1E;margin-bottom:2px}.wz-m .com-txt{font-size:16px;line-height:1.45;white-space:pre-wrap;overflow-wrap:anywhere}.wz-h{text-align:right;font-size:11.5px;color:#6b6f7b;margin-top:2px}.wz-dia{text-align:center;margin:10px 0}.wz-dia span{background:#FFF7E3;border-radius:8px;padding:3px 10px;font-size:12.5px;color:#5b6070;box-shadow:0 1px 1px rgba(0,0,0,.08)}.wz-vazio{text-align:center;color:#5b6070;margin-top:30%}.wz-form{margin:0!important;background:#F4EEE1;padding:8px;align-items:flex-end}.wz-form textarea{border-radius:22px!important;padding:10px 14px!important;resize:none;min-height:44px;font-size:16px}.wz-env{width:48px;height:48px;border-radius:50%;border:0;background:#C9A24A;color:#0F1B3D;font-size:20px;cursor:pointer;flex:none}.zm{position:fixed;inset:0;z-index:9999;background:#050A14;touch-action:none;overflow:hidden}.zm img{position:absolute;left:50%;top:50%;max-width:96vw;max-height:84vh;transform-origin:center;user-select:none;-webkit-user-drag:none;will-change:transform}.zm-ct{position:absolute;left:0;right:0;bottom:calc(14px + env(safe-area-inset-bottom,0px));display:flex;justify-content:center;gap:10px}.zm-ct button,.zm-x{min-width:48px;height:48px;border-radius:24px;border:1px solid rgba(226,196,122,.8);background:rgba(15,27,61,.85);color:#fff;font:700 18px Georgia,serif;cursor:pointer;padding:0 14px}.zm-x{position:absolute;top:12px;right:12px}.zm-dica{position:absolute;top:18px;left:16px;right:76px;color:#E2C47A;font:15px Georgia,serif}[data-zoomavel]{cursor:zoom-in}.tr-trilho img{cursor:zoom-in}.aa-bt{font:700 16px Georgia,serif!important;letter-spacing:0!important;width:36px!important;margin-right:6px!important}.aa-bt+.sino{margin-left:0!important}.aa-l{margin:14px 0 8px;font-weight:700;color:#1B2238}.ap-seg[style*=wrap]{display:grid;grid-template-columns:1fr 1fr;width:100%}.ap-seg[style*=wrap] button{border-right:0;border-bottom:1px solid #E1D4B2}.ap-seg[style*=wrap] button:nth-child(odd){border-right:1px solid #E1D4B2}.aa-row{display:flex;align-items:center;gap:12px}.aa-row input[type=range]{flex:1;accent-color:#8C6A1E;height:30px}";
  document.head.appendChild(css);
  window.etuZoom = function(src, alt, foco) {
    var o = document.createElement("div");
    o.className = "zm";
    o.setAttribute("role", "dialog");
    o.setAttribute("aria-modal", "true");
    o.setAttribute("aria-label", "Imagem ampliada");
    o.innerHTML = '<div class="zm-dica">Use dois dedos para aproximar e arraste para ver os detalhes.</div><button type="button" class="zm-x" aria-label="Fechar">✕</button><img alt=""><div class="zm-ct"><button type="button" data-z="-" aria-label="Diminuir">−</button><button type="button" data-z="0">Tamanho normal</button><button type="button" data-z="+" aria-label="Aumentar">+</button></div>';
    var img = o.querySelector("img");
    img.src = src;
    img.alt = alt || "";
    document.body.appendChild(o);
    document.documentElement.style.overflow = "hidden";
    var sc = 1, x = 0, y = 0, pts = {}, ini = null, MAX = 6;
    function ap() {
      sc = Math.min(MAX, Math.max(1, sc));
      if (sc === 1) {
        x = 0;
        y = 0;
      }
      img.style.transform = "translate(calc(-50% + " + x + "px),calc(-50% + " + y + "px)) scale(" + sc + ")";
    }
    ap();
    if (foco !== void 0) {
      var vai = function() {
        var w = img.clientWidth, h = img.clientHeight;
        if (!h) return;
        MAX = Math.max(6, innerHeight * 0.8 / h * 3);
        sc = Math.min(MAX, innerHeight * 0.78 / h);
        x = -(foco * w - w / 2) * sc;
        ap();
      };
      if (img.complete) vai();
      else img.onload = vai;
    }
    function fecha() {
      o.remove();
      document.documentElement.style.overflow = document.getElementById("etuTour") ? "hidden" : "";
      document.removeEventListener("keydown", tec);
    }
    function tec(e) {
      if (e.key === "Escape") fecha();
      if (e.key === "+") {
        sc *= 1.3;
        ap();
      }
      if (e.key === "-") {
        sc /= 1.3;
        ap();
      }
    }
    document.addEventListener("keydown", tec);
    o.querySelector(".zm-x").onclick = fecha;
    o.querySelectorAll("[data-z]").forEach(function(b) {
      b.onclick = function() {
        var z = b.dataset.z;
        if (z === "+") sc *= 1.4;
        else if (z === "-") sc /= 1.4;
        else sc = 1;
        ap();
      };
    });
    o.addEventListener("wheel", function(e) {
      e.preventDefault();
      sc *= e.deltaY < 0 ? 1.15 : 1 / 1.15;
      ap();
    }, { passive: false });
    var ultimo = 0;
    img.addEventListener("pointerdown", function(e) {
      img.setPointerCapture(e.pointerId);
      pts[e.pointerId] = { x: e.clientX, y: e.clientY };
      var k = Object.keys(pts);
      if (k.length === 2) {
        var a = pts[k[0]], b = pts[k[1]];
        ini = { d: Math.hypot(a.x - b.x, a.y - b.y), sc };
      } else {
        ini = { px: e.clientX, py: e.clientY, x, y };
        var t = Date.now();
        if (t - ultimo < 300) {
          sc = sc > 1 ? 1 : 2.5;
          ap();
        }
        ultimo = t;
      }
    });
    img.addEventListener("pointermove", function(e) {
      if (!pts[e.pointerId]) return;
      pts[e.pointerId] = { x: e.clientX, y: e.clientY };
      var k = Object.keys(pts);
      if (k.length === 2 && ini && ini.d) {
        var a = pts[k[0]], b = pts[k[1]];
        sc = ini.sc * Math.hypot(a.x - b.x, a.y - b.y) / ini.d;
        ap();
      } else if (k.length === 1 && ini && ini.px !== void 0 && sc > 1) {
        x = ini.x + (e.clientX - ini.px);
        y = ini.y + (e.clientY - ini.py);
        ap();
      }
    });
    function solta(e) {
      delete pts[e.pointerId];
      ini = null;
    }
    img.addEventListener("pointerup", solta);
    img.addEventListener("pointercancel", solta);
    o.addEventListener("click", function(e) {
      if (e.target === o) fecha();
    });
    o.querySelector(".zm-x").focus({ preventScroll: true });
  };
  var SEL = ".tr-img,.tr-trilho img,.gp-foto img,.gm-doc img,.dirc img,.mural img,.card img,[data-zoomavel]";
  document.addEventListener("click", function(e) {
    var im = e.target.closest && e.target.closest(SEL);
    if (!im || im.tagName !== "IMG" || im.closest("a[href]") && !im.closest(".tr")) return;
    if (im.closest(".zm,button,.ap-folha,.ap-atual,header")) return;
    e.preventDefault();
    e.stopPropagation();
    var fr;
    if (im.closest(".tr-trilho")) {
      var r = im.getBoundingClientRect();
      fr = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    }
    window.etuZoom(im.currentSrc || im.src, im.alt, fr);
  }, true);
  function marca() {
    document.querySelectorAll(".gp-foto img,.gm-doc img,.dirc img").forEach(function(i) {
      i.setAttribute("data-zoomavel", "");
      i.title = "Toque para ampliar";
    });
  }
  addEventListener("load", function() {
    setTimeout(marca, 1500);
  });
  addEventListener("hashchange", function() {
    setTimeout(marca, 600);
  });
  function ler(k, d) {
    try {
      return localStorage.getItem(k) || d;
    } catch (e) {
      return d;
    }
  }
  function grava(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch (e) {
    }
  }
  function aplicaTam() {
    var z = parseFloat(ler("etu_tam", "1")) || 1;
    document.body && (document.body.style.zoom = z === 1 ? "" : String(z));
  }
  if (document.body) aplicaTam();
  else addEventListener("DOMContentLoaded", aplicaTam);
  window.etuVolume = function() {
    return (parseInt(ler("etu_vol", "70"), 10) || 0) / 100;
  };
  window.etuVolPasso = function(n) {
    var v = Math.max(0, Math.min(100, (parseInt(ler("etu_vol", "70"), 10) || 0) + n));
    grava("etu_vol", String(v));
    if (window.etuVolAplica) window.etuVolAplica();
    var t = document.getElementById("etuVolAviso");
    if (!t) {
      t = document.createElement("div");
      t.id = "etuVolAviso";
      t.setAttribute("role", "status");
      t.style.cssText = "position:fixed;left:50%;top:22%;transform:translateX(-50%);z-index:10000;background:rgba(15,27,61,.92);color:#F7EFD9;border:1px solid #C9A24A;border-radius:14px;padding:12px 22px;font:700 20px Georgia,serif;pointer-events:none";
      document.body.appendChild(t);
    }
    t.textContent = "Volume: " + v + "%";
    t.style.opacity = "1";
    clearTimeout(t.tm);
    t.tm = setTimeout(function() {
      t.style.transition = "opacity .5s";
      t.style.opacity = "0";
    }, 1200);
    var r = document.querySelector(".ap-folha input[type=range]");
    if (r) {
      r.value = v;
      var b = document.getElementById("aaVol");
      if (b) b.textContent = v + "%";
    }
  };
  window.etuAa = function() {
    if (!window.etuAp) return;
    var tam = ler("etu_tam", "1"), bri = ler("etu_brilho", "normal"), vol = ler("etu_vol", "70");
    var h = '<p class="aa-l">Tamanho do texto e da tela</p><div class="ap-seg" role="group">' + [["0.9", "A−"], ["1", "A"], ["1.15", "A+"], ["1.3", "A++"]].map(function(t) {
      return '<button type="button" data-tam="' + t[0] + '" aria-pressed="' + (tam === t[0]) + '">' + t[1] + "</button>";
    }).join("") + '</div><p class="aa-l">Brilho da tela</p><div class="ap-seg" role="group">' + [["suave", "Suave"], ["normal", "Normal"], ["intenso", "Intenso"]].map(function(t) {
      return '<button type="button" data-bri="' + t[0] + '" aria-pressed="' + (bri === t[0]) + '">' + t[1] + "</button>";
    }).join("") + '</div><p class="aa-l">Cor do aplicativo e brasão</p><div class="ap-bts" style="margin-top:0"><button type="button" class="btn btn-gold btn-sm" data-aa="cores"><i class="ap-roda"></i>Opções de cores</button><button type="button" class="btn btn-line btn-sm" data-aa="brasao" style="color:#1B2238">Estilo do brasão</button></div><p class="aa-l">Volume da música ambiente</p><div class="aa-row"><button type="button" class="btn btn-line btn-sm" data-vol="-10" aria-label="Diminuir o volume" style="color:#1B2238;min-width:48px">−</button><input type="range" min="0" max="100" step="5" value="' + vol + '" aria-label="Volume da música"><button type="button" class="btn btn-line btn-sm" data-vol="10" aria-label="Aumentar o volume" style="color:#1B2238;min-width:48px">+</button><b id="aaVol" style="min-width:44px;text-align:right">' + vol + '%</b></div><p class="aa-l">Som da apresentação</p><div class="ap-seg" role="group" style="flex-wrap:wrap">' + [["ambos", "Voz e música"], ["musica", "Só música"], ["voz", "Só voz"], ["mudo", "Mudo"]].map(function(t) {
      return '<button type="button" data-modo="' + t[0] + '" aria-pressed="' + (ler("etu_som_modo", "musica") === t[0]) + '">' + t[1] + "</button>";
    }).join("") + '</div><p class="aa-l">Tipo de voz</p><div class="ap-seg" role="group" style="flex-wrap:wrap">' + Object.keys(window.etuVoz ? window.etuVoz.TIMBRES : {}).map(function(k) {
      return '<button type="button" data-timbre="' + k + '" aria-pressed="' + (ler("etu_voz_timbre", "natural") === k) + '">' + window.etuVoz.TIMBRES[k].n + "</button>";
    }).join("") + '</div><div id="aaVozes"></div><div class="ap-bts"><button type="button" class="btn btn-gold btn-sm" data-aa="testar">🗣 Ouvir a voz escolhida</button></div><p style="margin:14px 0 0;font-size:14px;color:#5b6070">Para ver de perto uma imagem ou a capa de uma apostila, toque nela: abre o visor com zoom. Tudo fica guardado só neste aparelho.</p>';
    window.etuAp.folha("Leitura, brilho, cores, som e voz", h, function(o) {
      o.querySelectorAll("[data-tam]").forEach(function(b) {
        b.onclick = function() {
          grava("etu_tam", b.dataset.tam);
          aplicaTam();
          o.querySelectorAll("[data-tam]").forEach(function(x) {
            x.setAttribute("aria-pressed", x === b);
          });
        };
      });
      o.querySelectorAll("[data-bri]").forEach(function(b) {
        b.onclick = function() {
          window.etuAp.brilho(b.dataset.bri);
          o.querySelectorAll("[data-bri]").forEach(function(x) {
            x.setAttribute("aria-pressed", x === b);
          });
        };
      });
      o.querySelector("[data-aa=cores]").onclick = function() {
        o.remove();
        window.etuAp.cores();
      };
      o.querySelector("[data-aa=brasao]").onclick = function() {
        o.remove();
        window.etuAp.brasao();
      };
      o.querySelectorAll("[data-vol]").forEach(function(b) {
        b.onclick = function() {
          window.etuVolPasso(+b.dataset.vol);
        };
      });
      o.querySelectorAll("[data-modo]").forEach(function(b) {
        b.onclick = function() {
          grava("etu_som_modo", b.dataset.modo);
          o.querySelectorAll("[data-modo]").forEach(function(x) {
            x.setAttribute("aria-pressed", x === b);
          });
          if (b.dataset.modo === "mudo" && window.etuVoz) {
            window.etuVoz.para();
          }
        };
      });
      o.querySelectorAll("[data-timbre]").forEach(function(b) {
        b.onclick = function() {
          grava("etu_voz_timbre", b.dataset.timbre);
          o.querySelectorAll("[data-timbre]").forEach(function(x) {
            x.setAttribute("aria-pressed", x === b);
          });
          window.etuVoz && window.etuVoz.teste();
        };
      });
      var tv = o.querySelector("[data-aa=testar]");
      if (tv) tv.onclick = function() {
        window.etuVoz && window.etuVoz.teste();
      };
      var VZ = window.etuVoz ? window.etuVoz.vozes() : [];
      if (VZ.length > 1) {
        var atual = ler("etu_voz_nome", "");
        var box = o.querySelector("#aaVozes");
        box.innerHTML = '<p class="aa-l">Vozes do seu aparelho (' + VZ.length + ')</p><select id="aaVozSel" style="width:100%;min-height:44px;font-size:16px;border:1.5px solid #C9A24A;border-radius:10px;padding:6px 10px;background:#fff;color:#1B2238">' + VZ.map(function(v, k) {
          var nm = v.name.replace(/Microsoft |Google |Online \(Natural\)/g, "").trim();
          return '<option value="' + v.voiceURI.replace(/"/g, "&quot;") + '"' + (v.voiceURI === atual || !atual && k === 0 ? " selected" : "") + ">" + nm.replace(/</g, "&lt;") + " · " + v.lang + "</option>";
        }).join("") + "</select>";
        o.querySelector("#aaVozSel").onchange = function(e) {
          grava("etu_voz_nome", e.target.value);
          window.etuVoz.teste();
        };
      }
      if (!window.etuVoz || !window.etuVoz.disponivel) {
        o.querySelectorAll("[data-timbre],[data-aa=testar]").forEach(function(x) {
          x.disabled = true;
        });
      }
      var r = o.querySelector("input[type=range]");
      r.oninput = function() {
        grava("etu_vol", r.value);
        o.querySelector("#aaVol").textContent = r.value + "%";
        if (window.etuVolAplica) window.etuVolAplica();
      };
    });
  };
  function botao() {
    var sino = document.getElementById("sinoBt");
    if (!sino || document.getElementById("etuAaBt")) return;
    var b = document.createElement("button");
    b.type = "button";
    b.id = "etuAaBt";
    b.className = sino.className + " aa-bt";
    b.setAttribute("aria-label", "Leitura, brilho, cores e volume");
    b.title = "Leitura, brilho, cores e volume";
    b.textContent = "Aa";
    b.onclick = window.etuAa;
    sino.parentNode.insertBefore(b, sino);
  }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", function() {
    setTimeout(botao, 300);
  });
  else setTimeout(botao, 300);
  addEventListener("load", function() {
    setTimeout(botao, 800);
  });
})();
(function() {
  var N = { "Básico": [["Qual é o primeiro livro da Bíblia?", ["Êxodo", "Gênesis", "Salmos", "Mateus"], 1, "Gênesis significa “origem”. Ele começa com “No princípio, criou Deus os céus e a terra” (Gênesis 1.1) e narra a criação, a queda e o começo do plano da redenção."], ["Qual é o último livro da Bíblia?", ["Judas", "Malaquias", "Apocalipse", "Atos"], 2, "Apocalipse vem do grego e significa “revelação”: “Revelação de Jesus Cristo, a qual Deus lhe deu” (Apocalipse 1.1). Ele fecha as Escrituras com a vitória final de Cristo."], ["Quem construiu a arca, por ordem de Deus?", ["Abraão", "Moisés", "Noé", "Davi"], 2, "Deus ordenou a Noé: “Faze para ti uma arca” (Gênesis 6.14). Noé “achou graça aos olhos do SENHOR” (Gênesis 6.8) e obedeceu, e assim foi preservado no dilúvio."], ["Quem recebeu as tábuas da Lei no monte Sinai?", ["Arão", "Moisés", "Josué", "Samuel"], 1, "Deus entregou a Moisés “as duas tábuas do Testemunho, tábuas de pedra, escritas pelo dedo de Deus” (Êxodo 31.18)."], ["Quem derrotou o gigante Golias?", ["Saul", "Jônatas", "Davi", "Sansão"], 2, "Davi, ainda jovem, venceu Golias com uma funda e uma pedra, declarando: “eu vou a ti em nome do SENHOR dos Exércitos” (1 Samuel 17.45). A vitória veio da confiança em Deus."], ["Qual é o versículo conhecido como “o evangelho em miniatura”?", ["Gênesis 1.1", "Salmos 23.1", "João 3.16", "Romanos 8.28"], 2, "João 3.16 resume o evangelho: o amor de Deus, o dom do Filho, a fé como meio e a vida eterna como resultado."], ["Quem negou Jesus três vezes antes do galo cantar?", ["Judas", "Tomé", "Pedro", "João"], 2, "Jesus avisou Pedro, e assim aconteceu (Lucas 22.61-62). Depois da ressurreição, Jesus o restaurou, perguntando três vezes: “amas-me?” (João 21.15-17)."], ["Qual é a oração que Jesus ensinou aos discípulos?", ["O Credo", "O Pai-Nosso", "O Magnificat", "O Salmo 51"], 1, "Jesus ensinou: “Portanto, vós orareis assim: Pai nosso, que estás nos céus” (Mateus 6.9-13). É um modelo de oração: adoração, submissão, dependência, perdão e proteção."], ["Em quantos dias Deus criou os céus e a terra, segundo Gênesis 1?", ["Três", "Seis, e no sétimo descansou", "Sete dias de trabalho", "Quarenta"], 1, "Deus criou em seis dias e “abençoou Deus o dia sétimo e o santificou” (Gênesis 2.2-3). O descanso de Deus não é cansaço, mas obra concluída."], ["Quem foi engolido por um grande peixe?", ["Jonas", "Elias", "Pedro", "Paulo"], 0, "Jonas fugiu da ordem de pregar em Nínive, e “deparou o SENHOR um grande peixe, para que tragasse a Jonas” (Jonas 1.17). Jesus usou o episódio como sinal da sua morte e ressurreição (Mateus 12.40)."], ["Qual é o maior mandamento, segundo Jesus?", ["Não matarás", "Guardar o sábado", "Amar a Deus de todo o coração, alma e entendimento", "Dar o dízimo"], 2, "Jesus respondeu citando Deuteronômio 6.5: amar a Deus de todo o coração; e o segundo é semelhante: amar o próximo como a si mesmo (Mateus 22.37-39)."], ["Como se chamava a mãe de Jesus?", ["Marta", "Maria", "Isabel", "Ana"], 1, "O anjo Gabriel foi enviado “a uma virgem desposada com um varão cujo nome era José… e o nome da virgem era Maria” (Lucas 1.27)."], ["Quem batizou Jesus no rio Jordão?", ["Pedro", "João Batista", "André", "Elias"], 1, "João Batista batizou Jesus, e o Espírito desceu como pomba e a voz do Pai declarou: “Tu és o meu Filho amado” (Marcos 1.9-11). As três Pessoas da Trindade aparecem juntas."], ["Qual foi o primeiro milagre de Jesus, segundo o Evangelho de João?", ["A multiplicação dos pães", "A cura de um cego", "A água transformada em vinho em Caná", "Andar sobre as águas"], 2, "“Jesus principiou assim os seus sinais em Caná da Galileia e manifestou a sua glória” (João 2.11)."], ["O que significa a palavra “evangelho”?", ["Lei", "Boa notícia", "Profecia", "Igreja"], 1, "Esta palavra no grego significa “boa notícia”, “boas-novas”. É a notícia de que Cristo morreu pelos nossos pecados e ressuscitou (1 Coríntios 15.1-4)."], ["Quantos dias Jesus jejuou no deserto?", ["Sete", "Doze", "Quarenta", "Setenta"], 2, "Jesus jejuou quarenta dias e quarenta noites e venceu as tentações respondendo com a Escritura: “Está escrito” (Mateus 4.1-11)."], ["Quem foi o primeiro homem criado por Deus?", ["Abel", "Sete", "Adão", "Noé"], 2, "“E formou o SENHOR Deus o homem do pó da terra” (Gênesis 2.7). O nome Adão, no hebraico, liga-se à palavra “terra”, “solo”."], ["Qual é o fruto do Espírito, segundo Gálatas 5.22?", ["Riquezas e prosperidade", "Amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão e temperança", "Falar em línguas", "Visões e sonhos"], 1, "Gálatas 5.22-23 lista nove virtudes como um só fruto. O fruto mostra o caráter de Cristo sendo formado no crente; os dons capacitam para o serviço."], ["Quem foi o discípulo que traiu Jesus?", ["Judas Iscariotes", "Judas, filho de Tiago", "Tomé", "Mateus"], 0, "Judas Iscariotes entregou Jesus por trinta moedas de prata (Mateus 26.14-16). Havia outro apóstolo chamado Judas, filho de Tiago (Lucas 6.16), que não deve ser confundido com ele."], ["Onde Jesus foi crucificado?", ["No monte Sinai", "No Calvário, perto de Jerusalém", "Em Belém", "Em Nazaré"], 1, "Jesus foi crucificado no lugar chamado Caveira, em aramaico Gólgota (João 19.17); “Calvário” vem do latim e significa a mesma coisa (Lucas 23.33)."]], "Médio": [["Qual profeta anunciou que o Messias seria “ferido pelas nossas transgressões”?", ["Jeremias", "Isaías", "Ezequiel", "Amós"], 1, "Isaías 53.5: “ele foi ferido pelas nossas transgressões e moído pelas nossas iniquidades”. O Novo Testamento aplica o capítulo a Jesus (Atos 8.32-35)."], ["O que é a “justificação”?", ["Tornar-se perfeito sem pecado", "O ato de Deus que declara justo o pecador que crê em Cristo", "Fazer boas obras para merecer o céu", "O batismo nas águas"], 1, "“Sendo, pois, justificados pela fé, temos paz com Deus” (Romanos 5.1). É uma declaração judicial de Deus, baseada na obra de Cristo, recebida pela fé."], ["Qual destas é uma ordenança deixada por Jesus à Igreja?", ["A Ceia do Senhor", "A circuncisão", "Os sacrifícios de animais", "A peregrinação a Jerusalém"], 0, "Jesus ordenou: “fazei isto em memória de mim” (Lucas 22.19). A Igreja celebra a Ceia e o batismo nas águas (Mateus 28.19) como ordenanças."], ["Quem escreveu a maior parte das cartas do Novo Testamento?", ["Pedro", "João", "Paulo", "Tiago"], 2, "Treze cartas trazem o nome de Paulo, de Romanos a Filemom. Ele foi o apóstolo dos gentios (Romanos 11.13)."], ["O que é a “santificação”?", ["Um título dado a pessoas especiais", "O processo pelo qual o crente é separado para Deus e transformado à imagem de Cristo", "Uma cerimônia anual", "A salvação pelas obras"], 1, "“Porque esta é a vontade de Deus, a vossa santificação” (1 Tessalonicenses 4.3). Ela tem um aspecto posicional, já realizado em Cristo, e um progressivo, na vida diária (2 Coríntios 3.18)."], ["Qual livro do Antigo Testamento é citado por Pedro no dia de Pentecostes?", ["Joel", "Isaías", "Daniel", "Oseias"], 0, "Pedro declarou: “isto é o que foi dito pelo profeta Joel” (Atos 2.16), citando Joel 2.28-32 sobre o derramamento do Espírito."], ["Qual é a evidência física inicial do batismo no Espírito Santo, segundo a doutrina pentecostal clássica?", ["Chorar", "Falar em outras línguas", "Cair no chão", "Profetizar"], 1, "Em Atos, o falar em línguas acompanha o batismo no Espírito (Atos 2.4; 10.46; 19.6). A posição pentecostal clássica vê nisso a evidência física inicial; outras tradições cristãs entendem de forma diferente."], ["Quem foi o rei que pediu a Deus sabedoria para governar o povo?", ["Davi", "Salomão", "Ezequias", "Josias"], 1, "Salomão pediu “um coração entendido para julgar o teu povo” (1 Reis 3.9), e Deus lhe deu sabedoria, riquezas e glória."], ["O que significa “Emanuel”?", ["Deus é forte", "Deus conosco", "Salvador", "Príncipe da paz"], 1, "Isaías 7.14 anuncia o nome, e Mateus 1.23 o traduz: “que traduzido é: Deus conosco”."], ["Em Romanos 3.23, o que Paulo afirma sobre a humanidade?", ["Que alguns nascem sem pecado", "Que todos pecaram e destituídos estão da glória de Deus", "Que só os gentios pecaram", "Que o pecado é apenas uma doença"], 1, "“Porque todos pecaram e destituídos estão da glória de Deus” (Romanos 3.23). Por isso todos precisam da graça oferecida em Cristo (Romanos 3.24)."], ["Qual destes livros pertence aos chamados “livros poéticos”?", ["Josué", "Jó", "Ezequiel", "Rute"], 1, "Os poéticos são Jó, Salmos, Provérbios, Eclesiastes e Cantares. Josué e Rute são históricos; Ezequiel é profético."], ["O que é a “Grande Comissão”?", ["A eleição dos sete diáconos", "A ordem de Jesus para fazer discípulos de todas as nações", "O concílio de Jerusalém", "A construção do templo"], 1, "“Portanto, ide, ensinai todas as nações, batizando-as em nome do Pai, e do Filho, e do Espírito Santo” (Mateus 28.19-20)."], ["Qual foi o concílio narrado em Atos 15?", ["O de Niceia", "O de Jerusalém, sobre a circuncisão dos gentios", "O de Trento", "O de Éfeso"], 1, "Em Atos 15 os apóstolos e anciãos decidiram que os gentios são salvos pela graça, sem precisar ser circuncidados (Atos 15.11, 19)."], ["O que significa “Pentecostes”?", ["Festa das luzes", "Quinquagésimo, a festa 50 dias depois da Páscoa", "Dia do perdão", "Festa das trombetas"], 1, "Esta palavra no grego significa “quinquagésimo”. Era a Festa das Semanas (Levítico 23.15-16), e nela o Espírito foi derramado (Atos 2.1)."], ["O que a Bíblia chama de “o salário do pecado”?", ["A pobreza", "A morte", "A doença", "A tristeza"], 1, "“Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna, por Cristo Jesus, nosso Senhor” (Romanos 6.23)."], ["Quem foi o primeiro mártir cristão?", ["Tiago", "Estêvão", "Pedro", "Paulo"], 1, "Estêvão foi apedrejado depois do seu discurso e orou pelos que o matavam (Atos 7.59-60). Saulo, o futuro Paulo, consentia na sua morte (Atos 8.1)."], ["Qual destas afirmações descreve corretamente a Trindade?", ["Três deuses diferentes", "Um só Deus que aparece em três formas, uma de cada vez", "Um só Deus em três Pessoas distintas: Pai, Filho e Espírito Santo", "O Pai é Deus, e o Filho e o Espírito são criaturas"], 2, "A fé trinitária confessa um só Deus (Deuteronômio 6.4) em três Pessoas distintas e iguais (Mateus 28.19; 2 Coríntios 13.13). As outras opções descrevem erros: triteísmo, modalismo e arianismo."], ["Qual dom espiritual é citado em 1 Coríntios 12.10?", ["Discernimento de espíritos", "Administração financeira", "Liderança política", "Oratória"], 0, "1 Coríntios 12.8-10 lista nove dons, entre eles “o dom de discernir os espíritos”, “variedade de línguas” e “interpretação das línguas”."], ["Qual é o tema central da carta aos Hebreus?", ["A superioridade de Cristo e da nova aliança", "A organização das igrejas", "O fim do mundo", "A vida de Paulo"], 0, "Hebreus mostra Cristo superior aos anjos, a Moisés e ao sacerdócio levítico, e a nova aliança “estabelecida em melhores promessas” (Hebreus 8.6)."], ["Quem escreveu o livro de Atos dos Apóstolos?", ["Pedro", "Lucas", "João", "Marcos"], 1, "Atos continua o “primeiro tratado” dirigido a Teófilo (Atos 1.1; Lucas 1.3). Por isso a tradição cristã atribui os dois livros a Lucas, o médico amado (Colossenses 4.14)."]], "Avançado": [["O que é a “kenosis” de Cristo, a partir de Filipenses 2.7?", ["A perda da divindade", "O esvaziamento voluntário: assumir a forma de servo sem deixar de ser Deus", "A ascensão aos céus", "A tentação no deserto"], 1, "Filipenses 2.7: “aniquilou-se a si mesmo, tomando a forma de servo”. O Filho não deixou de ser Deus; ele assumiu a natureza humana e abriu mão do uso independente das suas prerrogativas."], ["Qual concílio afirmou que Cristo tem duas naturezas, divina e humana, numa só Pessoa?", ["Niceia (325)", "Constantinopla (381)", "Calcedônia (451)", "Trento (1545)"], 2, "O Concílio de Calcedônia, em 451, declarou Cristo verdadeiro Deus e verdadeiro homem, em duas naturezas, sem confusão, sem mudança, sem divisão e sem separação."], ["O que é a “graça preveniente”, na teologia arminiana?", ["A graça que salva sem fé", "A graça de Deus que antecede a fé e capacita o pecador a responder ao evangelho", "A graça dada só aos eleitos", "A graça recebida pelos sacramentos"], 1, "Na linha arminiana adotada pela escola, Deus, por graça, ilumina e capacita o pecador (João 1.9; 12.32; Tito 2.11), que pode crer ou resistir (Atos 7.51). A teologia reformada entende a eleição de outro modo."], ["O que a expressão “Sola Scriptura” afirma?", ["Que só o Antigo Testamento é inspirado", "Que a Escritura é a autoridade suprema e final em fé e prática", "Que não se deve ler livros de teologia", "Que a tradição é igual à Bíblia"], 1, "Foi um dos princípios da Reforma do século 16. Baseia-se em textos como 2 Timóteo 3.16-17: a Escritura é suficiente para tornar o homem de Deus “perfeitamente instruído para toda boa obra”."], ["O que significa “hermenêutica”?", ["O estudo dos anjos", "A ciência e a arte da interpretação", "A história da Igreja", "O estudo do pecado"], 1, "Esta palavra vem do grego e significa “interpretar”, “explicar”. Lucas 24.27 usa o verbo ao dizer que Jesus “explicava” o que dele se achava em todas as Escrituras."], ["Qual heresia negava que Jesus tivesse um corpo verdadeiro, dizendo que só “parecia” humano?", ["Arianismo", "Docetismo", "Pelagianismo", "Montanismo"], 1, "Docetismo vem do grego “parecer”. João já combatia esse erro: “todo espírito que não confessa que Jesus Cristo veio em carne não é de Deus” (1 João 4.3)."], ["O que é a “união hipostática”?", ["A união da Igreja com Israel", "A união das naturezas divina e humana na única Pessoa de Cristo", "A união dos crentes no culto", "A união entre fé e obras"], 1, "Hipóstase é termo grego para “pessoa”. Em Cristo há uma só Pessoa, o Verbo eterno, que assumiu a natureza humana (João 1.14; Colossenses 2.9)."], ["Em Hebreus, Cristo é sacerdote “segundo a ordem de”…", ["Arão", "Levi", "Melquisedeque", "Samuel"], 2, "Hebreus 7 aplica o Salmo 110.4 a Cristo: “Tu és sacerdote eternamente, segundo a ordem de Melquisedeque”. É um sacerdócio superior, eterno e não hereditário."], ["Qual destes é um atributo incomunicável de Deus, que não é compartilhado com as criaturas?", ["Amor", "Bondade", "Onipresença", "Justiça"], 2, "Atributos incomunicáveis pertencem só a Deus: onipresença (Salmo 139.7-10), eternidade, imutabilidade. Amor, bondade e justiça se refletem, em medida limitada, no ser humano."], ["O que é a “expiação substitutiva”?", ["Cristo morreu só como exemplo moral", "Cristo morreu em lugar do pecador, levando a culpa e a pena do pecado", "O pecador paga a própria culpa", "Os sacrifícios do templo continuam valendo"], 1, "“Aquele que não conheceu pecado, o fez pecado por nós” (2 Coríntios 5.21); “levando ele mesmo em seu corpo os nossos pecados sobre o madeiro” (1 Pedro 2.24)."], ["Qual é a posição clássica pentecostal sobre os dons espirituais hoje?", ["Cessaram com os apóstolos", "Continuam disponíveis à Igreja até a volta de Cristo", "Só existiram no Antigo Testamento", "Só os pastores os recebem"], 1, "O continuísmo se apoia em textos como 1 Coríntios 1.7 (esperar a manifestação de Cristo sem faltar dom) e Atos 2.39 (a promessa para os de longe). O cessacionismo, de outras escolas, entende que alguns dons cessaram."], ["O que significa “propiciação” em Romanos 3.25 e 1 João 2.2?", ["Um presente para agradar a Igreja", "O sacrifício que satisfaz a justiça de Deus e afasta a sua ira contra o pecado", "Uma oração especial", "A ressurreição de Cristo"], 1, "Cristo é “a propiciação pelos nossos pecados” (1 João 2.2): na cruz, a justiça de Deus foi satisfeita, e o pecador pode ser perdoado sem que Deus deixe de ser justo (Romanos 3.26)."], ["O que é a “inerrância” das Escrituras?", ["Que as traduções nunca têm erro", "Que a Escritura, nos manuscritos originais, não afirma nada falso", "Que toda interpretação é correta", "Que a Bíblia é um livro de ciência"], 1, "Baseia-se na natureza de Deus, que não mente (Tito 1.2), e na inspiração (2 Timóteo 3.16). Aplica-se aos autógrafos; as traduções são fiéis na medida em que reproduzem o original."], ["Qual destes livros é considerado “apocalíptico” no Antigo Testamento?", ["Rute", "Daniel", "Provérbios", "Neemias"], 1, "Daniel, com visões de impérios e do Reino de Deus (Daniel 2; 7; 9), é a grande obra apocalíptica do Antigo Testamento e dialoga diretamente com o Apocalipse."], ["Qual é a relação entre a Lei e a graça em Gálatas 3.24?", ["A Lei salva quem a cumpre", "A Lei serviu de aio, tutor, para nos conduzir a Cristo", "A graça anula a moral", "A Lei e a graça são inimigas"], 1, "“De maneira que a lei nos serviu de aio, para nos conduzir a Cristo, para que, pela fé, fôssemos justificados” (Gálatas 3.24). A Lei mostra o pecado; Cristo justifica."], ["O que é “teofania”?", ["Uma festa judaica", "Uma manifestação visível de Deus", "Um tipo de profecia", "Um livro apócrifo"], 1, "Exemplos: a sarça ardente (Êxodo 3.2-6) e o Anjo do SENHOR que fala como Deus (Gênesis 16.7-13). Muitos intérpretes veem nessas aparições manifestações do Filho antes da encarnação."], ["Qual é a ordem correta: o que vem antes na experiência da salvação, segundo a teologia arminiana?", ["A regeneração antes de qualquer resposta do homem", "O chamado e a graça preveniente, depois o arrependimento e a fé, e então a regeneração e a justificação", "A santificação antes da fé", "O batismo antes do arrependimento"], 1, "Na linha arminiana, a graça preveniente capacita o pecador a responder com arrependimento e fé (Atos 20.21), e então Deus regenera e justifica. A teologia reformada coloca a regeneração antes da fé."], ["O que significa “Logos”, em João 1.1?", ["Luz", "Palavra, razão, expressão", "Caminho", "Vida"], 1, "Esta palavra no grego significa “palavra”, “razão”, “expressão”. João declara que o Verbo era Deus e se fez carne (João 1.1, 14): Cristo é a expressão perfeita de Deus."], ["Qual destas obras foi escrita por João Calvino?", ["Confissões", "As Institutas da Religião Cristã", "Suma Teológica", "O Peregrino"], 1, "Calvino publicou as Institutas em 1536 e as ampliou até 1559. As Confissões são de Agostinho; a Suma, de Tomás de Aquino; O Peregrino, de John Bunyan."], ["O que é a “perseverança dos santos” na visão arminiana?", ["O salvo nunca pode cair", "O crente é guardado por Deus mediante a fé, mas pode apostatar se abandonar deliberadamente a Cristo", "Todos serão salvos no fim", "A salvação depende só das obras"], 1, "A posição arminiana se apoia em advertências como Hebreus 3.12-14 e 6.4-6 e em 1 Pedro 1.5 (guardados mediante a fé). A teologia reformada ensina que o verdadeiro salvo não se perde."]], "Doutorado": [["O que é a Septuaginta (LXX)?", ["Uma tradução latina da Bíblia", "A tradução grega do Antigo Testamento feita em Alexandria antes de Cristo", "Um conjunto de 70 profecias", "O texto hebraico dos massoretas"], 1, "Iniciada no século 3 antes de Cristo, em Alexandria, foi a Bíblia de muitos judeus de fala grega e é citada com frequência no Novo Testamento. O nome lembra a tradição dos setenta tradutores."], ["Quem foram os massoretas?", ["Monges que traduziram a Vulgata", "Escribas judeus que preservaram o texto hebraico e acrescentaram os sinais de vogais", "Os autores dos evangelhos", "Reformadores alemães"], 1, "Entre os séculos 6 e 10 depois de Cristo, eles copiaram com rigor o texto hebraico e inseriram sinais vocálicos e de acentuação. O Códice de Leningrado, de 1008, é o manuscrito completo mais antigo dessa tradição."], ["O que significa “hapax legomenon”?", ["Um livro apócrifo", "Uma palavra que aparece uma única vez em todo o texto", "Uma profecia cumprida duas vezes", "Um sinônimo hebraico"], 1, "É uma expressão grega que significa “dito uma só vez”. Exige cuidado: o sentido deve ser buscado no contexto, nas línguas irmãs e nas traduções antigas, nunca em especulação."], ["Qual heresia ensinava que o Filho é a primeira e mais elevada criatura, e não eterno?", ["Sabelianismo", "Arianismo", "Nestorianismo", "Docetismo"], 1, "Ário, presbítero de Alexandria, dizia que “houve um tempo em que o Filho não existia”. O Concílio de Niceia, em 325, afirmou que o Filho é da mesma substância do Pai."], ["O que significa o termo grego “homoousios”, usado em Niceia?", ["De substância semelhante", "Da mesma substância", "De vontade igual", "Da mesma família"], 1, "Niceia declarou o Filho “homoousios” com o Pai: da mesma essência. A variante “homoiousios”, de substância semelhante, defendida pelos semiarianos, foi rejeitada."], ["O que é a “pericórese”, na doutrina da Trindade?", ["A ordem de criação dos anjos", "A habitação mútua das três Pessoas divinas, uma na outra", "A encarnação do Filho", "A descida do Espírito no Pentecostes"], 1, "O termo grego descreve a comunhão íntima das Pessoas: “eu estou no Pai, e o Pai, em mim” (João 14.10-11). As Pessoas são distintas, mas nunca separadas."], ["Qual heresia afirmava que em Cristo há duas pessoas, uma divina e outra humana?", ["Nestorianismo", "Apolinarismo", "Eutiquianismo", "Arianismo"], 0, "Associado a Nestório, foi condenado no Concílio de Éfeso, em 431. A fé cristã confessa uma só Pessoa, o Verbo encarnado, com duas naturezas."], ["O que defendia o apolinarismo?", ["Que Jesus era só homem", "Que, em Cristo, o Verbo divino ocupava o lugar da mente humana, negando a sua humanidade completa", "Que o Espírito Santo é uma força", "Que Maria era divina"], 1, "Gregório de Nazianzo respondeu: “o que não foi assumido não foi curado”. Cristo precisava ser plenamente homem, com corpo e alma racional, para redimir o homem inteiro (Hebreus 2.14-17)."], ["O que é o “filioque”?", ["Um credo batista", "A expressão latina “e do Filho”, acrescentada no Ocidente ao Credo Niceno-Constantinopolitano sobre a procedência do Espírito", "Uma oração a Maria", "Um livro apócrifo"], 1, "O Ocidente passou a confessar que o Espírito procede do Pai “e do Filho” (compare João 15.26 e 16.7). A questão foi um dos fatores da separação entre Oriente e Ocidente, em 1054."], ["Qual verbo grego é usado em 1 Tessalonicenses 4.17 para “seremos arrebatados”?", ["Anístemi", "Harpázo", "Baptízo", "Kaléo"], 1, "Esta palavra no grego significa “arrebatar”, “tomar de súbito com força”. A tradução latina usou “rapiemur”, de onde vem o termo “rapture” em inglês."], ["O que é a “communicatio idiomatum”?", ["A comunicação entre igrejas", "A atribuição à única Pessoa de Cristo das propriedades das duas naturezas", "O dom de línguas", "A tradução da Bíblia para o latim"], 1, "Por isso a Escritura pode dizer que crucificaram “o Senhor da glória” (1 Coríntios 2.8) e que Deus resgatou a Igreja “com seu próprio sangue” (Atos 20.28)."], ["Qual foi o primeiro cânon do Novo Testamento proposto, com apenas Lucas e dez cartas de Paulo, por um herege do século 2?", ["O de Atanásio", "O de Marcião", "O Muratoriano", "O de Jerônimo"], 1, "Marcião, por volta de 140, rejeitou o Antigo Testamento e o Deus de Israel. A reação da Igreja ajudou a reconhecer com clareza o conjunto dos escritos apostólicos."], ["Qual documento de Atanásio, em 367, lista exatamente os 27 livros do Novo Testamento?", ["O Credo de Atanásio", "A 39ª Carta Festal", "A Vida de Antão", "Contra os Arianos"], 1, "Na 39ª Carta Festal, Atanásio, bispo de Alexandria, enumera os 27 livros como “fontes da salvação”. A Igreja não criou o cânon: reconheceu os livros que Deus inspirou."], ["O que é a hipótese documental, conhecida pelas siglas J, E, D e P?", ["Um método de memorização", "A teoria crítica que divide o Pentateuco em quatro fontes tardias", "A divisão dos Salmos em cinco livros", "A ordem dos profetas menores"], 1, "Popularizada por Julius Wellhausen no século 19, nega a autoria mosaica. A posição conservadora, adotada pela escola, mantém Moisés como autor substancial, com base em textos como Êxodo 24.4 e João 5.46."], ["Qual concílio condenou o monotelismo, a ideia de que Cristo tinha uma só vontade?", ["Niceia I", "Constantinopla III (680-681)", "Calcedônia", "Éfeso"], 1, "Constantinopla III afirmou duas vontades em Cristo, a divina e a humana, em perfeita harmonia: “não se faça a minha vontade, mas a tua” (Lucas 22.42)."], ["O que significa o aoristo grego, de modo geral?", ["Uma ação contínua no presente", "Uma ação vista como um todo, um fato, sem destacar a duração", "Uma ação apenas futura", "Um modo de ordem"], 1, "Cuidado com a falácia de dizer que o aoristo sempre significa ação única e definitiva. O contexto decide. Exemplo: “todos pecaram” (Romanos 3.23) apresenta o pecado como fato abrangente."], ["O que é o “Textus Receptus”?", ["O texto hebraico de Qumran", "O texto grego do Novo Testamento editado a partir de Erasmo (1516), base da Almeida Revista e Corrigida", "Uma versão em latim", "O Credo Apostólico"], 1, "A primeira edição de Erasmo saiu em 1516. Edições posteriores formaram o “texto recebido”, base de traduções da Reforma, como a King James e a tradição de Almeida."], ["Qual destas afirmações define corretamente o pelagianismo?", ["O homem nasce com natureza caída e precisa da graça", "O homem nasce sem corrupção herdada de Adão e pode, por si, não pecar", "A graça é irresistível", "Os anjos não pecam"], 1, "Pelágio negou o pecado original. Agostinho o combateu, e ele foi condenado no Concílio de Cartago, em 418. A Escritura ensina que em Adão todos foram constituídos pecadores (Romanos 5.12, 19)."], ["O que foi o Sínodo de Dort (1618-1619)?", ["O concílio que aprovou o cânon", "A assembleia reformada holandesa que rejeitou os remonstrantes, seguidores de Armínio", "O primeiro concílio pentecostal", "A Dieta que condenou Lutero"], 1, "Dort formulou os chamados “cinco pontos do calvinismo” em resposta aos cinco artigos remonstrantes de 1610. A escola segue a linha arminiana, respeitando os irmãos reformados."], ["O que é “analogia da fé” na hermenêutica?", ["Comparar a Bíblia com outras religiões", "Interpretar cada texto em harmonia com o ensino total da Escritura", "Usar alegorias livremente", "Seguir apenas a tradição"], 1, "A Escritura não se contradiz, porque tem um só Autor divino. Textos claros iluminam os difíceis, e nenhuma doutrina central se apoia num texto isolado e obscuro."], ["O que significa o termo grego “parousia”?", ["Revelação", "Presença, vinda, chegada", "Arrebatamento", "Juízo"], 1, "Usado para a vinda de Cristo (1 Tessalonicenses 4.15; Mateus 24.27). Na leitura dispensacionalista, a vinda tem duas fases: o arrebatamento da Igreja e a manifestação em glória."], ["Qual manuscrito descoberto em 1947, em Qumran, confirmou a fidelidade da transmissão do texto de Isaías?", ["Códice Sinaítico", "O Grande Rolo de Isaías (1QIsa)", "Papiro Rylands", "Códice Vaticano"], 1, "O rolo, de cerca de mil anos antes do Códice de Leningrado, mostrou notável concordância com o texto massorético, evidência da cuidadosa preservação das Escrituras."], ["O que é a “teologia federal” ou “da aliança”, em contraste com o dispensacionalismo?", ["Uma forma de governo civil", "O sistema que lê a Bíblia pela unidade das alianças, tendendo a ver a Igreja como o novo Israel", "Uma doutrina pentecostal", "A teologia dos anjos"], 1, "O dispensacionalismo, adotado pela escola, mantém a distinção entre Israel e Igreja e o cumprimento futuro das promessas nacionais a Israel (Romanos 11.25-29). A teologia da aliança pensa de outro modo."], ["Qual é o significado de “ordo salutis”?", ["A ordem dos livros da Bíblia", "A ordem lógica dos aspectos da aplicação da salvação: chamado, fé, justificação etc.", "A hierarquia da Igreja", "A ordem do culto"], 1, "Romanos 8.29-30 é texto clássico. Arminianos e reformados divergem sobretudo na relação entre regeneração e fé."]], "Escatologia": [["Na visão pré-tribulacionista, quando acontece o arrebatamento da Igreja?", ["No fim da Grande Tribulação", "No meio da Tribulação", "Antes da Tribulação de sete anos", "Depois do Milênio"], 2, "A posição pré-tribulacionista entende que a Igreja não está destinada à ira (1 Tessalonicenses 5.9) e será guardada “da hora da tentação que há de vir sobre todo o mundo” (Apocalipse 3.10). Mesotribulacionistas e pós-tribulacionistas pensam de outro modo."], ["Qual texto descreve o arrebatamento: “os mortos em Cristo ressuscitarão primeiro”?", ["Mateus 24.30", "1 Tessalonicenses 4.16-17", "Apocalipse 20.4", "Zacarias 14.4"], 1, "Paulo descreve a descida do Senhor, a ressurreição dos mortos em Cristo e o arrebatamento dos vivos “para o encontro do Senhor nos ares” (1 Tessalonicenses 4.16-17)."], ["Quanto tempo dura a Tribulação, na visão dispensacionalista?", ["Mil anos", "Três dias", "Sete anos, a septuagésima semana de Daniel", "Quarenta anos"], 2, "Daniel 9.27 fala de “uma semana” de sete anos, dividida ao meio. A segunda metade, de três anos e meio (Apocalipse 11.2-3; 13.5), é chamada Grande Tribulação (Mateus 24.21)."], ["O que é o Tribunal de Cristo (o “bema”)?", ["O julgamento dos ímpios", "A avaliação das obras dos crentes, para recompensa, não para condenação", "O julgamento das nações", "A condenação de Satanás"], 1, "“Todos devemos comparecer ante o tribunal de Cristo, para que cada um receba segundo o que tiver feito” (2 Coríntios 5.10). A salvação não está em jogo, mas os galardões (1 Coríntios 3.12-15)."], ["Quem são julgados no Grande Trono Branco?", ["A Igreja arrebatada", "Os mortos ímpios de todas as épocas, depois do Milênio", "Apenas Israel", "Os anjos fiéis"], 1, "Apocalipse 20.11-15: os mortos são julgados segundo as suas obras, e quem não foi achado no livro da vida é lançado no lago de fogo."], ["Quantas vezes a expressão “mil anos” aparece em Apocalipse 20.1-7?", ["Uma", "Três", "Seis", "Doze"], 2, "A repetição sustenta a leitura pré-milenista de um reino literal de Cristo na terra, depois da sua vinda (Apocalipse 20.2-7). Amilenistas leem o período de forma simbólica."], ["O que acontece com Satanás durante o Milênio?", ["Governa as nações", "É amarrado e lançado no abismo", "É perdoado", "Fica livre para enganar"], 1, "“Prendeu o dragão… e amarrou-o por mil anos” (Apocalipse 20.2-3). Depois é solto por pouco tempo e, por fim, lançado no lago de fogo (Apocalipse 20.7-10)."], ["Em qual monte os pés do Messias pousarão na sua vinda em glória, segundo Zacarias?", ["Sinai", "Carmelo", "Monte das Oliveiras", "Sião"], 2, "“E, naquele dia, estarão os seus pés sobre o monte das Oliveiras” (Zacarias 14.4). Compare Atos 1.11-12: ele voltará do modo como subiu, desse mesmo monte."], ["Como Paulo chama o Anticristo em 2 Tessalonicenses 2.3?", ["O falso profeta", "O homem do pecado, o filho da perdição", "A grande Babilônia", "O dragão"], 1, "“O homem do pecado, o filho da perdição” se oporá a Deus e se assentará no templo como Deus (2 Tessalonicenses 2.3-4). Apocalipse 13.1 o apresenta como a besta que sobe do mar."], ["Qual é o número da besta em Apocalipse 13.18?", ["144", "666", "777", "1260"], 1, "“O seu número é seiscentos e sessenta e seis” (Apocalipse 13.18). O texto pede sabedoria; a escola evita especulações e marcação de nomes ou datas."], ["Quem são os 144 mil de Apocalipse 7.4-8?", ["Todos os salvos da história", "Doze mil de cada tribo dos filhos de Israel, selados durante a Tribulação", "Os anjos", "Os apóstolos"], 1, "O texto nomeia as tribos. A leitura dispensacionalista entende israelitas literais, selados por Deus durante a Tribulação, distintos da grande multidão de todas as nações (Apocalipse 7.9)."], ["Onde se reunirão os exércitos para a batalha final antes do Milênio?", ["Babilônia", "Armagedom", "Roma", "Egito"], 1, "“E os congregaram no lugar que em hebreu se chama Armagedom” (Apocalipse 16.16). A batalha termina com a vinda de Cristo em glória (Apocalipse 19.19-21)."], ["O que Jeremias 30.7 chama de “o tempo de angústia para Jacó”?", ["O cativeiro no Egito", "A Tribulação futura, em que Israel será angustiado, mas salvo", "A destruição do primeiro templo", "O dilúvio"], 1, "“Ah! Porque aquele dia é tão grande… é tempo de angústia para Jacó; ele, porém, será salvo dela” (Jeremias 30.7). A escola entende que a Tribulação tem foco em Israel."], ["O que é a “abominação da desolação”?", ["A queda de Babilônia", "A profanação do lugar santo, anunciada por Daniel e citada por Jesus", "A crucificação", "A dispersão de Babel"], 1, "Jesus citou Daniel (Mateus 24.15; Daniel 9.27): no meio da semana, o Anticristo profanará o lugar santo, dando início à Grande Tribulação."], ["O que a doutrina da “iminência” afirma?", ["Que Cristo já voltou", "Que o arrebatamento pode acontecer a qualquer momento, sem sinais que precisem ocorrer antes", "Que a volta será em data conhecida", "Que Cristo não voltará"], 1, "A Igreja aguarda “a bem-aventurada esperança” (Tito 2.13) e é chamada a vigiar sempre (1 Tessalonicenses 5.6). Por isso não se marcam datas (Mateus 24.36)."], ["Na leitura dispensacionalista de 2 Tessalonicenses 2.7, quem é “aquele que agora resiste”?", ["O imperador romano", "O Espírito Santo atuando por meio da Igreja", "O arcanjo Miguel", "O governo civil"], 1, "Muitos dispensacionalistas entendem que o Espírito, presente na Igreja, detém a manifestação plena do iníquo até ser “tirado do meio”, no arrebatamento. Outras leituras existem, por isso o tema é tratado com humildade."], ["O que são as Bodas do Cordeiro?", ["Uma festa do Antigo Testamento", "A celebração da união de Cristo com a sua Igreja, no céu", "O casamento em Caná", "A Páscoa"], 1, "“Bem-aventurados aqueles que são chamados à ceia das bodas do Cordeiro” (Apocalipse 19.9). Na sequência dispensacionalista, acontecem no céu antes da vinda em glória."], ["O que caracteriza o pré-milenismo?", ["Cristo volta depois do Milênio", "Não há Milênio literal", "Cristo volta antes do Milênio e reina mil anos na terra", "O Milênio é a era da Igreja"], 2, "A ordem de Apocalipse 19 e 20 é: vinda em glória, prisão de Satanás, reino de mil anos. Pós-milenistas esperam o Milênio antes da volta; amilenistas o leem como símbolo."], ["Quem são as duas testemunhas de Apocalipse 11?", ["Pedro e Paulo", "Duas pessoas que profetizam 1.260 dias em Jerusalém, durante a Tribulação", "Dois anjos", "Os dois Testamentos"], 1, "O texto as descreve com poder semelhante ao de Moisés e de Elias (Apocalipse 11.3-6). A identidade exata é debatida; o texto afirma a sua missão, a morte, a ressurreição e a subida aos céus."], ["O que acontece depois do Milênio, segundo Apocalipse 21?", ["O mundo é destruído para sempre sem nada depois", "Novos céus e nova terra, e a Nova Jerusalém desce do céu", "A Igreja volta à terra para outro Milênio", "Satanás reina"], 1, "“E vi um novo céu e uma nova terra… E eu, João, vi a Santa Cidade, a nova Jerusalém” (Apocalipse 21.1-2). Deus habitará com o seu povo para sempre."], ["Qual é a “primeira ressurreição” em Apocalipse 20.5-6?", ["A ressurreição de Lázaro", "A ressurreição dos justos para a vida, que tem etapas antes do Milênio", "A ressurreição dos ímpios", "A conversão"], 1, "“Bem-aventurado e santo aquele que tem parte na primeira ressurreição” (Apocalipse 20.6). Inclui Cristo, as primícias, a Igreja no arrebatamento e os santos da Tribulação."], ["Qual promessa de Romanos 11.26 a escola entende como futura para Israel?", ["Israel será destruído", "Todo o Israel será salvo", "Israel deixou de existir no plano de Deus", "Israel se tornou a Igreja"], 1, "“E, assim, todo o Israel será salvo” (Romanos 11.26). A leitura dispensacionalista vê uma restauração nacional futura de Israel, que reconhecerá o seu Messias (Zacarias 12.10)."], ["Como se divide o livro de Apocalipse segundo 1.19?", ["Em sete selos", "Nas coisas que João viu, nas que são e nas que hão de acontecer depois destas", "Em antes e depois do dilúvio", "Em lei e graça"], 1, "Apocalipse 1.19 dá o roteiro: a visão de Cristo (capítulo 1), as sete igrejas (capítulos 2 e 3) e o que vem depois (capítulos 4 a 22). Por isso muitos dispensacionalistas leem 4.1 como a passagem para os eventos futuros."], ["Por que a escola não marca datas para a volta de Cristo?", ["Porque não crê na volta", "Porque Jesus disse que ninguém sabe o dia nem a hora", "Porque a volta já aconteceu", "Porque é proibido falar de profecia"], 1, "“Porém daquele dia e hora ninguém sabe” (Mateus 24.36). A atitude correta é vigiar, santificar-se e trabalhar (Mateus 24.42-46)."]], "História da Igreja": [["Quem escreveu, por volta do ano 96, uma carta da igreja de Roma aos Coríntios, uma das mais antigas fora do Novo Testamento?", ["Clemente de Roma", "Agostinho", "Orígenes", "Jerônimo"], 0, "A Primeira Carta de Clemente exorta os coríntios à paz e à ordem, ecoando a carta de Paulo. É testemunho precioso da Igreja do fim do século 1."], ["Qual bispo de Antioquia escreveu sete cartas a caminho do martírio em Roma, no início do século 2?", ["Policarpo", "Inácio de Antioquia", "Irineu", "Cipriano"], 1, "Inácio escreveu às igrejas defendendo a verdadeira humanidade e divindade de Cristo, contra os docetistas, e a unidade da Igreja."], ["Qual bispo de Esmirna, ligado pela tradição ao apóstolo João, foi martirizado em idade avançada?", ["Policarpo", "Atanásio", "Basílio", "Eusébio"], 0, "Segundo o Martírio de Policarpo, ele disse: “Há oitenta e seis anos eu o sirvo, e ele nunca me fez mal; como posso blasfemar o meu Rei que me salvou?”"], ["Quem escreveu “Contra as Heresias”, combatendo o gnosticismo, por volta do ano 180?", ["Tertuliano", "Irineu de Lyon", "Justino", "Clemente de Alexandria"], 1, "Irineu defendeu a unidade de Deus Criador e Redentor e a verdadeira encarnação de Cristo, apoiando-se na Escritura e na fé recebida dos apóstolos."], ["Qual apologista do século 2 escreveu Apologias ao imperador e morreu mártir em Roma?", ["Justino Mártir", "Ambrósio", "Gregório", "Atanásio"], 0, "Justino, filósofo convertido, defendeu a fé diante do Império e descreveu o culto cristão primitivo. Foi martirizado por volta de 165."], ["Qual teólogo do norte da África foi o primeiro a usar a palavra latina “Trinitas”?", ["Agostinho", "Tertuliano", "Cipriano", "Lactâncio"], 1, "Tertuliano, de Cartago, no fim do século 2 e início do 3, cunhou termos que a teologia ocidental usaria: Trinitas, persona, substantia."], ["Em que ano se reuniu o Concílio de Niceia, que condenou o arianismo?", ["70", "325", "451", "1054"], 1, "Convocado pelo imperador Constantino, o concílio afirmou a plena divindade do Filho, “gerado, não feito, da mesma substância do Pai”."], ["Quem foi o grande defensor da fé nicena, exilado cinco vezes, a ponto de se dizer “Atanásio contra o mundo”?", ["Ário", "Atanásio de Alexandria", "Eusébio", "Jerônimo"], 1, "Atanásio defendeu que só Deus pode salvar; por isso o Filho, que nos salva, é Deus verdadeiro. Escreveu “Sobre a Encarnação do Verbo”."], ["Qual concílio, em 381, afirmou a divindade do Espírito Santo e completou o Credo de Niceia?", ["Éfeso", "Constantinopla I", "Calcedônia", "Cartago"], 1, "O credo confessa o Espírito Santo, “Senhor e Vivificador”, que “com o Pai e o Filho é adorado e glorificado”."], ["Quem são os chamados “Pais Capadócios”?", ["Pedro, Tiago e João", "Basílio de Cesareia, Gregório de Nazianzo e Gregório de Nissa", "Lutero, Calvino e Zuínglio", "Agostinho, Ambrósio e Jerônimo"], 1, "No século 4, eles ajudaram a firmar a linguagem trinitária: uma só essência e três Pessoas, e defenderam a divindade do Espírito Santo."], ["Qual pregador de Antioquia e Constantinopla recebeu o apelido de “Boca de Ouro”?", ["João Crisóstomo", "Orígenes", "Ambrósio", "Leão Magno"], 0, "“Crisóstomo” significa “boca de ouro”. Ele pregou livros inteiros da Bíblia, versículo por versículo, com aplicação moral firme."], ["Quem traduziu a Bíblia para o latim na versão chamada Vulgata?", ["Agostinho", "Jerônimo", "Tertuliano", "Erasmo"], 1, "Jerônimo trabalhou no fim do século 4 e início do 5, em Belém, traduzindo o Antigo Testamento a partir do hebraico."], ["Quem escreveu “Confissões” e “A Cidade de Deus”?", ["Agostinho de Hipona", "Tomás de Aquino", "Anselmo", "Bernardo"], 0, "Nas Confissões, Agostinho narra a sua conversão: “Fizeste-nos para ti, e inquieto está o nosso coração enquanto não repousa em ti” (livro 1, capítulo 1)."], ["Quem é chamado “o pai da história da Igreja”, autor da “História Eclesiástica”?", ["Eusébio de Cesareia", "Lucas", "Flávio Josefo", "Beda"], 0, "Eusébio, no início do século 4, reuniu documentos e listas de bispos desde os apóstolos até a época de Constantino."], ["O que é a Didaquê?", ["Um evangelho apócrifo", "Um antigo manual cristão de ensino sobre vida moral, batismo, Ceia e jejum", "Um credo do século 16", "Uma carta de Paulo"], 1, "Escrita provavelmente no fim do século 1 ou início do 2, começa com o ensino dos “dois caminhos”: o da vida e o da morte."], ["Em que data Martinho Lutero divulgou as 95 Teses?", ["25 de dezembro de 1500", "31 de outubro de 1517", "24 de agosto de 1572", "1º de janeiro de 1600"], 1, "Em Wittenberg, Lutero contestou a venda de indulgências. O evento é lembrado como o início da Reforma Protestante."], ["Quem é chamado “a Estrela da Manhã da Reforma”, por traduzir a Bíblia para o inglês no século 14?", ["John Wycliffe", "William Tyndale", "John Knox", "Thomas Cranmer"], 0, "Wycliffe, em Oxford, defendeu a autoridade da Escritura e promoveu a primeira Bíblia completa em inglês, a partir do latim."], ["Qual reformador da Boêmia foi queimado no Concílio de Constança, em 1415?", ["Jan Hus", "Zuínglio", "Calvino", "Melanchthon"], 0, "Jan Hus pregou a autoridade da Bíblia e criticou abusos do clero. Seu martírio inspirou gerações de reformadores."], ["Quem traduziu o Novo Testamento do grego para o inglês e foi executado em 1536?", ["John Wycliffe", "William Tyndale", "John Wesley", "George Whitefield"], 1, "Tyndale desejava que até um menino que conduz o arado conhecesse a Escritura. Grande parte do seu texto passou para a versão King James."], ["Quem foi o teólogo holandês que deu nome ao arminianismo?", ["Jacó Armínio", "Erasmo", "Grotius", "Menno Simons"], 0, "Jacó Armínio, professor em Leiden, morreu em 1609. Seus seguidores, os remonstrantes, apresentaram cinco artigos em 1610. A escola segue a linha arminiana."], ["Quem foi o pregador inglês que, em 1738, disse ter sentido o coração “estranhamente aquecido” e fundou o metodismo?", ["John Wesley", "Charles Spurgeon", "John Bunyan", "Jonathan Edwards"], 0, "John Wesley, de linha arminiana, enfatizou a graça preveniente, a conversão e a santificação. O movimento influenciou o surgimento do pentecostalismo."], ["Quem fez a primeira tradução da Bíblia para o português, a partir das línguas originais?", ["João Ferreira de Almeida", "Padre Antônio Vieira", "Frei Caneca", "Erasmo"], 0, "Almeida publicou o Novo Testamento em 1681; a Bíblia completa foi concluída depois da sua morte. Sua tradução deu origem à Revista e Corrigida (ARC)."], ["Qual avivamento, iniciado em 1906 em Los Angeles e liderado por William Seymour, marcou o pentecostalismo moderno?", ["O Grande Despertamento", "O avivamento da Rua Azusa", "O avivamento de Gales", "O avivamento de Herrnhut"], 1, "Na Rua Azusa, milhares buscaram o batismo no Espírito Santo com o sinal de línguas. O movimento se espalhou rapidamente pelo mundo."], ["Quem foram os missionários suecos que fundaram as Assembleias de Deus no Brasil, em 1911, em Belém do Pará?", ["Daniel Berg e Gunnar Vingren", "Robert Kalley e Sarah Kalley", "Ashbel Simonton e José Manoel", "Louis Francescon e Giacomo Lombardi"], 0, "Berg e Vingren chegaram a Belém em 1910; a igreja foi organizada em 1911 e se tornou uma das maiores denominações pentecostais do mundo."], ["Quem é considerado o principal sistematizador do dispensacionalismo, no século 19?", ["John Nelson Darby", "Charles Finney", "Dwight Moody", "Billy Graham"], 0, "Darby, dos Irmãos de Plymouth, destacou a distinção entre Israel e Igreja e o arrebatamento antes da Tribulação. A Bíblia de Referência Scofield, de 1909, popularizou essa leitura."], ["Qual destes NÃO é um dos “cinco solas” da Reforma?", ["Sola Scriptura", "Sola Fide", "Sola Gratia", "Sola Traditio"], 3, "Os cinco solas são: somente a Escritura, somente a fé, somente a graça, somente Cristo e somente a Deus a glória. A tradição tem valor, mas está debaixo da Escritura."], ["Qual concílio, em 431, condenou o nestorianismo?", ["Niceia", "Éfeso", "Calcedônia", "Trento"], 1, "O Concílio de Éfeso afirmou a unidade da Pessoa de Cristo. Vinte anos depois, Calcedônia esclareceu as duas naturezas."], ["Em que ano ocorreu a separação entre a Igreja do Oriente e a do Ocidente, o Grande Cisma?", ["325", "1054", "1517", "1648"], 1, "Em 1054, Roma e Constantinopla se excomungaram mutuamente. Questões de autoridade e o “filioque” estavam entre as causas."]], "Nomes das doutrinas": [["Qual destas NÃO se refere ao estudo de Deus?", ["Teologia Propriamente Dita", "Paterologia", "Doutrina de Deus", "Hamartiologia"], 3, "Hamartiologia é a doutrina do pecado (do grego “hamartía”, errar o alvo). Teologia Propriamente Dita e Doutrina de Deus tratam de Deus; Paterologia trata da Pessoa do Pai."], ["O que é Pneumatologia?", ["O estudo dos pulmões", "A doutrina do Espírito Santo", "A doutrina dos anjos", "O estudo das profecias"], 1, "Esta palavra vem do grego “pneûma”: espírito, sopro, vento. Jesus usa a imagem em João 3.8."], ["O que é Soteriologia?", ["A doutrina da salvação", "A doutrina da Igreja", "A doutrina das últimas coisas", "A doutrina do pecado"], 0, "Esta palavra vem do grego “sotería”: salvação, livramento. “Não há salvação em nenhum outro” (Atos 4.12)."], ["Qual destas NÃO pertence às doutrinas sobre seres espirituais criados?", ["Angelologia", "Demonologia", "Satanologia", "Eclesiologia"], 3, "Eclesiologia é a doutrina da Igreja. As outras três tratam de anjos, demônios e Satanás."], ["O que é Eclesiologia?", ["A doutrina da Igreja", "O estudo de Eclesiastes", "A história de Israel", "A doutrina dos sacramentos apenas"], 0, "Esta palavra vem do grego “ekklesía”: os chamados para fora, a assembleia. “Edificarei a minha igreja” (Mateus 16.18)."], ["O que é Escatologia?", ["A doutrina das últimas coisas", "O estudo das escrituras antigas", "A doutrina do pecado", "A ciência das escolas"], 0, "Esta palavra vem do grego “éschatos”: último. Trata da morte, da volta de Cristo, da ressurreição, do juízo e do estado eterno."], ["O que é Bibliologia?", ["A doutrina das Escrituras", "O estudo das bibliotecas", "A doutrina de Deus", "A história da Igreja"], 0, "Trata da revelação, inspiração, inerrância, cânon e autoridade da Bíblia (2 Timóteo 3.16; 2 Pedro 1.21)."], ["Qual destes nomes NÃO é doutrina sobre Cristo?", ["Cristologia", "Encarnação", "Kenosis", "Pneumatologia"], 3, "Pneumatologia trata do Espírito Santo. Cristologia, encarnação e kenosis (Filipenses 2.7) dizem respeito à Pessoa e à obra de Cristo."], ["O que é Antropologia Bíblica?", ["A arqueologia", "A doutrina do ser humano segundo a Escritura", "O estudo das culturas modernas", "A doutrina dos anjos"], 1, "Trata da criação do homem à imagem de Deus (Gênesis 1.27), da sua constituição, da queda e da restauração em Cristo."], ["O que é Homilética?", ["A arte de preparar e pregar sermões", "O estudo dos hinos", "A doutrina dos milagres", "O estudo da família"], 0, "Esta palavra vem do grego “homilía”: conversa, discurso familiar. “Que pregues a palavra, instes a tempo e fora de tempo” (2 Timóteo 4.2)."], ["O que é Apologética?", ["Pedir desculpas pela fé", "A defesa racional e bíblica da fé cristã", "O estudo dos apóstolos", "A doutrina da salvação"], 1, "Esta palavra vem do grego “apología”: defesa, resposta. “Estai sempre preparados para responder” (1 Pedro 3.15)."], ["O que é Patrística?", ["O estudo dos patriarcas de Gênesis", "O estudo dos escritos dos Pais da Igreja dos primeiros séculos", "A doutrina do Pai", "A história do Brasil"], 1, "Vem do latim “pater”, pai. Estuda autores como Inácio, Irineu, Atanásio e Agostinho, sempre debaixo da autoridade da Escritura."], ["O que é Missiologia?", ["O estudo das missões e da evangelização", "O estudo das missas", "A doutrina dos anjos", "A história de Israel"], 0, "Estuda a missão de Deus e da Igreja: “sereis minhas testemunhas… até aos confins da terra” (Atos 1.8)."], ["O que é Exegese?", ["Ler a própria opinião no texto", "Extrair do texto o sentido que o autor colocou", "Um tipo de oração", "O estudo do Êxodo"], 1, "Esta palavra vem do grego e significa “conduzir para fora”. O erro oposto é a eisegese: colocar no texto ideias de fora."], ["Qual termo indica a doutrina do Pai, dentro do estudo de Deus?", ["Paterologia", "Patrística", "Patriarcado", "Pentateuco"], 0, "Paterologia trata da Pessoa e da obra de Deus Pai. Patrística é o estudo dos Pais da Igreja, assunto bem diferente."], ["O que é Hamartiologia?", ["A doutrina do pecado", "A doutrina da harmonia", "O estudo dos hinos", "A doutrina da Igreja"], 0, "Esta palavra vem do grego “hamartía”: errar o alvo. “Todos pecaram e destituídos estão da glória de Deus” (Romanos 3.23)."], ["Qual destes é sinônimo de “Escatologia” na linguagem popular?", ["Doutrina das últimas coisas", "Doutrina dos começos", "Doutrina da Igreja", "Doutrina dos anjos"], 0, "Também se fala em “estudo das coisas finais”. A escola a ensina na linha pré-milenista, dispensacionalista e pré-tribulacionista."], ["Qual destas palavras NÃO é ramo da teologia?", ["Teologia Sistemática", "Teologia Bíblica", "Teologia Histórica", "Teologia Astrológica"], 3, "A astrologia é condenada nas Escrituras (Isaías 47.13-14). As outras são áreas legítimas: a Sistemática organiza por temas, a Bíblica segue a revelação progressiva, e a Histórica estuda o desenvolvimento das doutrinas."]], "Textos difíceis": [["Gênesis 6.6 diz que Deus “se arrependeu”, e 1 Samuel 15.29 diz que Deus “não se arrepende”. Como harmonizar?", ["A Bíblia se contradiz", "Gênesis descreve, em linguagem humana, a reação santa de Deus ao pecado; 1 Samuel afirma que Deus não muda de caráter nem de propósito", "Deus mudou de natureza", "Os dois textos falam de pessoas diferentes"], 1, "É um antropopatismo: linguagem de sentimento humano aplicada a Deus. O mesmo capítulo usa as duas ideias (1 Samuel 15.11 e 15.29). Deus é imutável (Malaquias 3.6), mas responde de modo pessoal ao arrependimento ou à rebeldia humana (Jeremias 18.7-10)."], ["Deus endureceu o coração de Faraó. Então Faraó não teve culpa?", ["Não teve culpa", "Teve culpa: ele mesmo endureceu o coração antes, e Deus confirmou a sua escolha em juízo", "Foi Moisés quem endureceu", "O texto é lenda"], 1, "Êxodo registra que Faraó endureceu o próprio coração (Êxodo 8.15, 32) e que Deus o endureceu (Êxodo 9.12). O juízo de Deus entrega o rebelde à sua escolha (Romanos 1.24)."], ["Romanos 3.28 diz que somos justificados pela fé; Tiago 2.24, que pelas obras. Há contradição?", ["Sim, Paulo e Tiago discordam", "Não: Paulo trata de como somos aceitos diante de Deus; Tiago, da fé verdadeira que se prova pelas obras", "Tiago não é inspirado", "Ambos falam da Lei de Moisés"], 1, "Paulo combate a ideia de merecer a salvação; Tiago combate a fé morta, que não produz frutos (Tiago 2.17). Abraão é exemplo nos dois (Romanos 4.3; Tiago 2.21-23)."], ["Se “o Pai é maior do que eu” (João 14.28), Jesus é menor que Deus?", ["Sim, Jesus é inferior em natureza", "Não: fala da posição assumida na encarnação, não da essência; o mesmo Jesus diz “eu e o Pai somos um”", "Jesus era apenas profeta", "O versículo foi acrescentado"], 1, "Em essência, o Filho é igual ao Pai (João 10.30; Filipenses 2.6). Na missão, como homem e servo, submeteu-se ao Pai (Filipenses 2.7-8)."], ["Colossenses 1.15 chama Cristo de “primogênito de toda a criação”. Isso significa que ele foi criado?", ["Sim, ele é a primeira criatura", "Não: “primogênito” indica preeminência e herança, pois o versículo seguinte diz que por ele todas as coisas foram criadas", "Significa que nasceu antes de Adão", "É uma metáfora sem sentido"], 1, "Davi, filho mais novo, é chamado “primogênito” por posição (Salmo 89.27). Colossenses 1.16-17 mostra Cristo como Criador de tudo, e não como parte da criação."], ["Jesus disse que nem o Filho sabe o dia da sua volta (Marcos 13.32). Como, se ele é Deus?", ["Ele não é Deus", "Na condição humana assumida, ele se limitou voluntariamente no uso do conhecimento, sem deixar de ser Deus", "Ele mentiu", "O versículo é falso"], 1, "É parte do esvaziamento voluntário (Filipenses 2.7). Como homem, crescia em sabedoria (Lucas 2.52); como Deus, conhecia os pensamentos (João 2.24-25)."], ["João 1.18 diz que ninguém jamais viu a Deus, mas Êxodo 33.11 diz que Deus falava com Moisés “face a face”. Como entender?", ["É contradição", "“Face a face” indica intimidade de comunhão, e não a visão da essência de Deus, que o mesmo capítulo diz ser impossível", "Moisés viu a essência de Deus", "Os textos falam de deuses diferentes"], 1, "O próprio capítulo afirma: “não poderás ver a minha face, porquanto homem nenhum verá a minha face e viverá” (Êxodo 33.20). O Filho é quem revela o Pai (João 1.18)."], ["Gênesis 22.1 diz que Deus “tentou” Abraão, mas Tiago 1.13 diz que Deus a ninguém tenta. Como harmonizar?", ["É contradição", "Em Gênesis, “tentar” tem o sentido de provar a fé; Tiago fala de induzir ao mal, o que Deus nunca faz", "Abraão pecou", "Tiago está errado"], 1, "A palavra hebraica tem o sentido de testar, provar. Deus prova para aprovar (Tiago 1.12); o pecado nasce da própria concupiscência (Tiago 1.14)."], ["Em Lucas 14.26, Jesus diz que é preciso “aborrecer” pai e mãe. Ele manda odiar a família?", ["Sim, literalmente", "Não: é uma expressão hebraica de comparação, que significa amar menos; Mateus 10.37 esclarece", "Só para os apóstolos", "Era uma regra temporária"], 1, "“Quem ama o pai ou a mãe mais do que a mim não é digno de mim” (Mateus 10.37). Cristo deve ter o primeiro lugar; a mesma Bíblia manda honrar pai e mãe (Efésios 6.2)."], ["Hebreus 6.4-6 fala de quem “recaiu” e não pode ser renovado ao arrependimento. Qual é a leitura arminiana adotada pela escola?", ["O texto é hipotético e não pode acontecer", "Adverte que é possível um crente verdadeiro apostatar deliberadamente, rejeitando a Cristo", "Fala apenas de pessoas nunca convertidas", "Fala de quem perdeu um culto"], 1, "A escola, arminiana, lê o texto como advertência real contra a apostasia deliberada. Teólogos reformados o leem como hipotético ou como referência a falsos convertidos. Todos concordam que é um chamado à perseverança (Hebreus 6.11-12)."], ["Gênesis 1.26 diz “Façamos o homem à nossa imagem”. Como entender o plural?", ["Deus fala com os anjos, que também criaram", "É uma indicação, desde o início, da pluralidade de Pessoas na única Divindade, plenamente revelada no Novo Testamento", "Há vários deuses", "É erro de tradução"], 1, "O versículo seguinte volta ao singular: “E criou Deus o homem à sua imagem” (Gênesis 1.27). Unidade e pluralidade convivem. O Novo Testamento revela o Pai, o Filho e o Espírito atuando na criação (João 1.3; Gênesis 1.2)."], ["Jesus disse para dar a outra face (Mateus 5.39). Isso proíbe o cristão de buscar justiça?", ["Sim, o cristão não pode recorrer à lei", "Não: trata da vingança pessoal diante do insulto; o próprio Paulo usou os seus direitos de cidadão", "O versículo vale só para judeus", "Não tem aplicação hoje"], 1, "O tapa na face direita era insulto. Jesus proíbe a retaliação pessoal (Romanos 12.17-19), não a justiça. Paulo apelou para César (Atos 25.11) e questionou um açoite ilegal (Atos 22.25)."], ["1 Coríntios 15.29 fala de “batismo pelos mortos”. A escola pratica isso?", ["Sim, para salvar os mortos", "Não: é um texto obscuro, citado de passagem; nenhuma doutrina se constrói sobre um texto isolado e difícil", "Sim, uma vez por ano", "Só para parentes"], 1, "Paulo menciona uma prática para argumentar a favor da ressurreição, sem aprová-la. A Escritura ensina que, depois da morte, segue-se o juízo (Hebreus 9.27)."], ["Mateus 16.28 diz que alguns dos presentes não morreriam até verem o Filho do Homem vindo no seu Reino. Como entender?", ["Jesus errou a data da volta", "Os três evangelhos ligam a promessa à transfiguração, logo a seguir, uma prévia da glória do Reino", "João ainda está vivo", "Fala da destruição do mundo"], 1, "Mateus 17.1-2, Marcos 9.1-2 e Lucas 9.27-29 colocam a transfiguração logo em seguida. Pedro a recorda como visão da majestade de Cristo (2 Pedro 1.16-18)."], ["Por que o livro de Ester não menciona o nome de Deus?", ["Porque não é inspirado", "Para mostrar a providência de Deus agindo nos bastidores, mesmo quando ele parece oculto", "Porque foi escrito por um pagão", "Porque o nome foi apagado"], 1, "Coincidências cuidadosamente narradas, como a insônia do rei (Ester 6.1), revelam a mão invisível de Deus preservando o seu povo. Mordecai crê nisso (Ester 4.14)."], ["O voto de Jefté (Juízes 11) mostra que Deus aprova promessas impensadas?", ["Sim, Deus exige cumprir qualquer voto", "Não: o livro de Juízes descreve fatos de uma época de desordem, sem aprovar tudo o que narra", "Jefté não existiu", "O texto ensina sacrifícios humanos"], 1, "Narrar não é aprovar. A Lei proibia sacrifícios humanos (Deuteronômio 12.31), e Eclesiastes 5.2-5 adverte contra votos precipitados. Juízes repete: “cada um fazia o que parecia reto aos seus olhos” (Juízes 21.25)."]], "De Gênesis a Apocalipse": [["Em Gênesis 3.15, qual é a primeira promessa do Redentor?", ["A arca de Noé", "A semente da mulher que ferirá a cabeça da serpente", "A torre de Babel", "O arco-íris"], 1, "Chamado “protoevangelho”, o primeiro anúncio do evangelho: o descendente da mulher venceria a serpente. Cumpre-se em Cristo (Gálatas 4.4; 1 João 3.8)."], ["Em Êxodo 12, o que protegia as casas dos israelitas na noite da Páscoa?", ["Uma oração", "O sangue do cordeiro nas ombreiras das portas", "Uma fogueira", "O cajado de Moisés"], 1, "“Vendo eu sangue, passarei por cima de vós” (Êxodo 12.13). Paulo declara: “Cristo, nossa páscoa, foi sacrificado por nós” (1 Coríntios 5.7)."], ["Qual é o tema central de Levítico, resumido em “Sede santos, porque eu sou santo”?", ["A conquista de Canaã", "A santidade de Deus e do seu povo", "A história dos reis", "A volta do exílio"], 1, "Levítico 11.44 e 19.2. Pedro aplica a ordem à Igreja (1 Pedro 1.15-16)."], ["Em Números, por que Israel peregrinou quarenta anos no deserto?", ["Porque se perdeu no caminho", "Por causa da incredulidade diante do relatório dos espias", "Para fugir dos egípcios", "Por falta de água"], 1, "Eles não creram na promessa de Deus (Números 14.11, 33-34). Hebreus 3.19 resume: “não puderam entrar por causa da sua incredulidade”."], ["Qual é o “Shemá”, a grande confissão de Israel em Deuteronômio 6.4?", ["Lembra-te do dia do sábado", "Ouve, Israel, o SENHOR, nosso Deus, é o único SENHOR", "Não terás outros deuses", "Honra a teu pai"], 1, "Jesus o citou como o início do maior mandamento (Marcos 12.29-30). O nome vem da primeira palavra hebraica, “ouve”."], ["Qual cidade caiu quando o povo rodeou os muros por sete dias, em Josué 6?", ["Ai", "Jericó", "Gibeom", "Hebrom"], 1, "“Pela fé, caíram os muros de Jericó, sendo rodeados durante sete dias” (Hebreus 11.30)."], ["Qual ciclo se repete no livro de Juízes?", ["Prosperidade sem fim", "Pecado, opressão, clamor e livramento por meio de um juiz", "Conquista, exílio e retorno", "Construção e destruição do templo"], 1, "O padrão aparece em Juízes 2.11-19 e se repete com Otniel, Eúde, Débora, Gideão, Jefté e Sansão."], ["No livro de Rute, quem foi o remidor que resgatou Rute e a herança de Noemi?", ["Obede", "Boaz", "Elimeleque", "Davi"], 1, "Boaz, parente próximo (Rute 3.9; 4.9-10), é figura do Redentor que paga o preço. Rute entrou na linhagem de Davi e de Cristo (Mateus 1.5)."], ["Em 2 Samuel 7, que promessa Deus fez a Davi?", ["Uma vida longa", "Um trono e um reino estabelecidos para sempre por meio da sua descendência", "Riquezas", "A vitória sobre Golias"], 1, "A aliança davídica (2 Samuel 7.16) aponta para Cristo, o Filho de Davi, que reinará para sempre (Lucas 1.32-33)."], ["Qual profeta enfrentou os profetas de Baal no monte Carmelo?", ["Eliseu", "Elias", "Isaías", "Jeremias"], 1, "Elias orou e “caiu fogo do SENHOR” (1 Reis 18.38). O povo exclamou: “Só o SENHOR é Deus!” (1 Reis 18.39)."], ["Em que ano aproximado Jerusalém foi destruída pelos babilônios, em 2 Reis 25?", ["722 antes de Cristo", "586 antes de Cristo", "70 depois de Cristo", "1000 antes de Cristo"], 1, "Nabucodonosor destruiu a cidade e o templo por volta de 586 antes de Cristo. O Reino do Norte, Samaria, já havia caído diante da Assíria em 722 antes de Cristo."], ["Quantos dias levou a reconstrução dos muros de Jerusalém sob Neemias?", ["Sete", "Quarenta", "Cinquenta e dois", "Setenta"], 2, "“Acabou-se, pois, o muro… em cinquenta e dois dias” (Neemias 6.15). Oração, trabalho e vigilância caminharam juntos (Neemias 4.9)."], ["Qual é o tema do livro de Jó?", ["A história dos reis", "O sofrimento do justo e a soberania de Deus", "A volta do exílio", "O culto no templo"], 1, "Jó sofre sem saber por quê, mas termina confessando: “Com o ouvir dos meus ouvidos ouvi, mas agora te veem os meus olhos” (Jó 42.5)."], ["Qual é o “princípio da sabedoria”, segundo Provérbios?", ["A riqueza", "O temor do SENHOR", "A idade", "O estudo das leis"], 1, "“O temor do SENHOR é o princípio da sabedoria” (Provérbios 9.10; compare 1.7). Temor é reverência que conduz à obediência."], ["Que palavra resume Eclesiastes, ao avaliar a vida “debaixo do sol”?", ["Glória", "Vaidade", "Alegria", "Vitória"], 1, "“Vaidade de vaidades! É tudo vaidade” (Eclesiastes 1.2). A conclusão aponta para Deus: “Teme a Deus e guarda os seus mandamentos” (Eclesiastes 12.13)."], ["Qual profeta anunciou uma “nova aliança” escrita no coração?", ["Jeremias", "Naum", "Obadias", "Ageu"], 0, "“Porei a minha lei no seu interior e a escreverei no seu coração” (Jeremias 31.33). Hebreus 8 a aplica à obra de Cristo."], ["Em Ezequiel 37, o que significa o vale de ossos secos que reviveram?", ["A ressurreição dos animais", "A restauração futura de Israel pelo Espírito de Deus", "A criação do mundo", "A queda de Babilônia"], 1, "“Estes ossos são toda a casa de Israel” (Ezequiel 37.11). Deus promete trazê-los à terra e pôr neles o seu Espírito (Ezequiel 37.14)."], ["Em Daniel 2, o que representa a pedra que destrói a estátua?", ["Um rei babilônio", "O Reino de Deus que substituirá os reinos humanos", "O templo", "A Lei de Moisés"], 1, "“O Deus do céu levantará um reino que não será jamais destruído” (Daniel 2.44). A leitura pré-milenista o vê cumprido no reinado de Cristo."], ["Qual profeta recebeu ordem de casar com uma mulher infiel, como figura do amor de Deus por Israel?", ["Amós", "Oseias", "Miqueias", "Joel"], 1, "Oseias e Gômer ilustram o amor fiel de Deus por um povo infiel (Oseias 1.2; 3.1). “Curarei a sua perversão, eu voluntariamente os amarei” (Oseias 14.4)."], ["Qual profeta disse “o justo, pela sua fé, viverá”, frase citada por Paulo?", ["Habacuque", "Sofonias", "Zacarias", "Malaquias"], 0, "Habacuque 2.4 é citado em Romanos 1.17, Gálatas 3.11 e Hebreus 10.38. Foi texto decisivo para Lutero."], ["Qual é o último livro do Antigo Testamento, que promete o envio de Elias?", ["Zacarias", "Malaquias", "Ageu", "Neemias"], 1, "Malaquias 4.5. Jesus aplica a promessa, em parte, a João Batista (Mateus 11.14; 17.12)."], ["Com qual genealogia começa o Evangelho de Mateus?", ["De Adão", "De Jesus Cristo, filho de Davi, filho de Abraão", "De Moisés", "De Noé"], 1, "Mateus 1.1 apresenta Jesus como herdeiro das alianças com Abraão e Davi, mostrando aos judeus que ele é o Messias prometido."], ["Qual dos evangelhos é o mais curto e destaca Jesus como servo em ação?", ["Mateus", "Marcos", "Lucas", "João"], 1, "Marcos usa com frequência “logo”, “imediatamente”. O versículo-chave é 10.45: “o Filho do Homem também não veio para ser servido, mas para servir”."], ["Qual é o propósito declarado do Evangelho de João?", ["Contar a infância de Jesus", "Que creiais que Jesus é o Cristo, o Filho de Deus, e, crendo, tenhais vida", "Ensinar a Lei", "Narrar as viagens de Paulo"], 1, "João 20.31. Por isso o livro traz sinais escolhidos e os grandes “Eu sou” de Jesus."], ["Qual versículo de Atos resume o plano do livro: Jerusalém, Judeia, Samaria e confins da terra?", ["Atos 1.8", "Atos 2.42", "Atos 9.15", "Atos 28.31"], 0, "“Recebereis a virtude do Espírito Santo… e ser-me-eis testemunhas tanto em Jerusalém como em toda a Judeia e Samaria e até aos confins da terra” (Atos 1.8)."], ["Qual capítulo de 1 Coríntios é conhecido como o capítulo do amor?", ["12", "13", "14", "15"], 1, "1 Coríntios 13 está entre os capítulos sobre os dons (12 e 14): os dons sem amor nada aproveitam."], ["Qual capítulo de 1 Coríntios é o grande capítulo da ressurreição?", ["11", "13", "15", "16"], 2, "1 Coríntios 15 mostra que, se Cristo não ressuscitou, é vã a nossa fé (v. 17), e anuncia a transformação dos crentes num abrir e fechar de olhos (v. 51-52)."], ["Qual carta descreve a armadura de Deus?", ["Gálatas", "Efésios", "Filipenses", "Colossenses"], 1, "Efésios 6.10-18: cinto da verdade, couraça da justiça, calçado do evangelho, escudo da fé, capacete da salvação e espada do Espírito."], ["Qual carta de Paulo, escrita da prisão, é chamada “a carta da alegria”?", ["Filipenses", "Romanos", "Gálatas", "Tito"], 0, "“Regozijai-vos, sempre, no Senhor; outra vez digo: regozijai-vos” (Filipenses 4.4). A alegria não depende das circunstâncias."], ["Quem é Onésimo, na carta a Filemom?", ["Um apóstolo", "Um escravo fugitivo convertido, que Paulo envia de volta como irmão amado", "Um profeta", "Um governador"], 1, "Paulo pede a Filemom que o receba “não já como servo… mas como irmão amado” (Filemom 16). O evangelho transforma relações."], ["Qual capítulo de Hebreus é conhecido como a “galeria da fé”?", ["1", "6", "11", "13"], 2, "Hebreus 11 começa: “Ora, a fé é o firme fundamento das coisas que se esperam” e lembra Abel, Enoque, Noé, Abraão, Moisés e muitos outros."], ["Qual carta afirma que os homens santos de Deus falaram inspirados pelo Espírito Santo?", ["1 Pedro", "2 Pedro", "1 João", "Judas"], 1, "2 Pedro 1.21: “os homens santos de Deus falaram inspirados pelo Espírito Santo”. A Escritura não veio de interpretação particular (v. 20)."], ["Judas exorta os crentes a “batalhar pela fé” que foi entregue…", ["Aos reis", "Uma vez aos santos", "Aos filósofos", "Todo ano"], 1, "Judas 3: a fé foi entregue de uma vez por todas. Por isso a Igreja não inventa doutrinas novas: guarda e defende a verdade revelada."], ["Quantas igrejas recebem cartas em Apocalipse 2 e 3?", ["Três", "Cinco", "Sete", "Doze"], 2, "Éfeso, Esmirna, Pérgamo, Tiatira, Sardes, Filadélfia e Laodiceia (Apocalipse 1.11). Cada carta traz elogio, repreensão, chamado e promessa."], ["Qual livro do Antigo Testamento narra a volta do exílio e a reconstrução do templo com Zorobabel?", ["Esdras", "Ester", "Lamentações", "Jonas"], 0, "Esdras 1 a 6 narra o decreto de Ciro e a reconstrução do templo. Os profetas Ageu e Zacarias encorajaram a obra (Esdras 5.1)."], ["Qual é o livro que contém o Salmo do Bom Pastor?", ["Provérbios", "Salmos (Salmo 23)", "Isaías", "Cantares"], 1, "“O SENHOR é o meu pastor; nada me faltará” (Salmo 23.1). Jesus se apresenta como o Bom Pastor (João 10.11)."]], "Quem sou eu?": [["Fui sacerdote e juiz; ouvi Deus me chamar quando ainda era menino e disse: “Fala, porque o teu servo ouve”. Quem sou eu?", ["Eli", "Samuel", "Natã", "Gade"], 1, "1 Samuel 3.10. Samuel ungiu Saul e Davi."], ["Construí o primeiro templo em Jerusalém. Quem sou eu?", ["Davi", "Salomão", "Zorobabel", "Herodes"], 1, "Salomão edificou o templo (1 Reis 6). Davi juntou os materiais, mas Deus não permitiu que ele o construísse (1 Crônicas 22.8-10)."], ["Fui juíza e profetisa em Israel e julgava debaixo de uma palmeira. Quem sou eu?", ["Débora", "Ana", "Miriã", "Hulda"], 0, "Juízes 4.4-5. Débora conduziu Baraque à vitória sobre Sísera."], ["Fui cobrador de impostos, deixei a coletoria e segui Jesus. Escrevi um evangelho. Quem sou eu?", ["Zaqueu", "Mateus", "Lucas", "Marcos"], 1, "Mateus 9.9. Também chamado Levi (Marcos 2.14)."], ["Subi numa árvore para ver Jesus passar, e ele foi à minha casa. Quem sou eu?", ["Nicodemos", "Zaqueu", "Bartimeu", "Lázaro"], 1, "Lucas 19.1-10. Jesus disse: “Hoje, veio a salvação a esta casa”."], ["Fui ressuscitado por Jesus depois de quatro dias no sepulcro. Quem sou eu?", ["Lázaro", "O filho da viúva de Naim", "Eutico", "Jairo"], 0, "João 11. Jesus disse: “Eu sou a ressurreição e a vida” (João 11.25)."], ["Fui um fariseu que visitou Jesus de noite e ouvi que era necessário nascer de novo. Quem sou eu?", ["Gamaliel", "Nicodemos", "José de Arimateia", "Caifás"], 1, "João 3.1-8. Mais tarde, Nicodemos ajudou a sepultar Jesus (João 19.39)."], ["Fui eunuco etíope; um evangelista me explicou Isaías 53 e me batizou. Quem sou eu?", ["Cornélio", "O eunuco da rainha Candace", "Lídia", "Apolo"], 1, "Atos 8.26-39. O evangelista foi Filipe, que “começando nesta Escritura, lhe anunciou a Jesus”."], ["Fui vendedora de púrpura; o Senhor abriu o meu coração em Filipos. Quem sou eu?", ["Priscila", "Lídia", "Dorcas", "Febe"], 1, "Atos 16.14. Lídia foi a primeira convertida registrada na Europa."], ["Fui centurião romano; ao ouvir Pedro, o Espírito Santo desceu sobre a minha casa. Quem sou eu?", ["Cornélio", "Júlio", "Cláudio Lísias", "Sérgio Paulo"], 0, "Atos 10. Foi a abertura oficial do evangelho aos gentios, com o mesmo dom do Espírito (Atos 10.44-46)."], ["Fui o jovem que dormiu na janela durante a pregação de Paulo, caí e fui restaurado. Quem sou eu?", ["Timóteo", "Eutico", "Tíquico", "Onésimo"], 1, "Atos 20.9-12, em Trôade."], ["Fui profeta e pastor de Tecoa; não era profeta de profissão, mas Deus me chamou. Quem sou eu?", ["Amós", "Miqueias", "Jonas", "Obadias"], 0, "Amós 7.14-15. Pregou a justiça: “Corra, porém, o juízo como as águas” (Amós 5.24)."], ["Fui a mãe de Samuel e orei com tanto fervor que o sacerdote pensou que eu estava embriagada. Quem sou eu?", ["Ana", "Penina", "Raquel", "Sara"], 0, "1 Samuel 1.13-15. Ana consagrou o filho ao Senhor e louvou a Deus (1 Samuel 2.1-10)."], ["Fui o primeiro rei de Israel. Quem sou eu?", ["Davi", "Saul", "Salomão", "Jeroboão"], 1, "1 Samuel 10.1. Saul foi rejeitado por desobedecer: “o obedecer é melhor do que o sacrificar” (1 Samuel 15.22)."], ["Fui o sucessor de Moisés e conduzi Israel à terra prometida. Quem sou eu?", ["Calebe", "Arão", "Josué", "Gideão"], 2, "Josué 1.1-9. Deus lhe disse: “Esforça-te e tem bom ânimo”."]] };
  var ORDEM = ["Básico", "Médio", "Avançado", "Doutorado", "Escatologia", "História da Igreja", "Nomes das doutrinas", "Textos difíceis", "De Gênesis a Apocalipse", "Quem sou eu?"];
  var velho = {};
  Object.keys(ETU_DESAFIO).forEach(function(k) {
    velho[k] = ETU_DESAFIO[k];
    delete ETU_DESAFIO[k];
  });
  ORDEM.forEach(function(k) {
    ETU_DESAFIO[k] = (velho[k] || []).concat(N[k] || []);
  });
  Object.keys(velho).forEach(function(k) {
    if (!ETU_DESAFIO[k]) ETU_DESAFIO[k] = velho[k];
  });
  window.ETU_DESAFIO_DESC = { "Básico": "Para quem está começando", "Médio": "Doutrinas e vida cristã", "Avançado": "Teologia sistemática", "Doutorado": "Línguas, concílios e hermenêutica", "Escatologia": "Profecia na linha pré-tribulacionista", "História da Igreja": "Pais da Igreja, concílios e reformadores", "Nomes das doutrinas": "O que é cada área da teologia", "Textos difíceis": "Passagens que parecem se contradizer", "De Gênesis a Apocalipse": "Uma pergunta de cada livro", "Quem sou eu?": "Charadas sobre personagens bíblicos" };
})();
(function() {
  var D = { "L": [["Gênesis", "AT", "Pentateuco", 50, "Moisés", "as origens: criação, queda, dilúvio e os patriarcas", ["Gênesis 1.1", "No princípio, criou Deus os céus e a terra"]], ["Êxodo", "AT", "Pentateuco", 40, "Moisés", "a libertação do Egito e a aliança no Sinai", ["Êxodo 20.3", "Não terás outros deuses diante de mim"]], ["Levítico", "AT", "Pentateuco", 27, "Moisés", "a santidade, os sacrifícios e o sacerdócio", ["Levítico 19.2", "Santos sereis, porque eu, o SENHOR, vosso Deus, sou santo"]], ["Números", "AT", "Pentateuco", 36, "Moisés", "a peregrinação de quarenta anos no deserto", ["Números 6.24", "O SENHOR te abençoe e te guarde"]], ["Deuteronômio", "AT", "Pentateuco", 34, "Moisés", "a renovação da aliança antes da entrada em Canaã", ["Deuteronômio 6.4", "Ouve, Israel, o SENHOR, nosso Deus, é o único SENHOR"]], ["Josué", "AT", "Históricos", 24, "", "a conquista e a divisão da terra prometida", ["Josué 1.9", "Esforça-te e tem bom ânimo"]], ["Juízes", "AT", "Históricos", 21, "", "o ciclo de pecado, opressão, clamor e livramento", ["Juízes 21.25", "cada um fazia o que parecia reto aos seus olhos"]], ["Rute", "AT", "Históricos", 4, "", "a fidelidade de Rute e o resgate por Boaz, o remidor", ["Rute 1.16", "o teu povo é o meu povo, o teu Deus é o meu Deus"]], ["1 Samuel", "AT", "Históricos", 31, "", "a transição dos juízes para a monarquia: Samuel, Saul e Davi", ["1 Samuel 15.22", "o obedecer é melhor do que o sacrificar"]], ["2 Samuel", "AT", "Históricos", 24, "", "o reinado de Davi e a aliança davídica", ["2 Samuel 22.2", "O SENHOR é a minha rocha, e a minha cidadela, e o meu libertador"]], ["1 Reis", "AT", "Históricos", 22, "", "Salomão, o templo e a divisão do reino", ["1 Reis 18.39", "Só o SENHOR é Deus"]], ["2 Reis", "AT", "Históricos", 25, "", "a decadência dos dois reinos até o cativeiro", ["2 Reis 2.11", "Elias subiu ao céu num redemoinho"]], ["1 Crônicas", "AT", "Históricos", 29, "", "a linhagem de Davi e a preparação do templo", ["1 Crônicas 16.34", "Louvai ao SENHOR, porque ele é bom"]], ["2 Crônicas", "AT", "Históricos", 36, "", "a história de Judá vista a partir do templo", ["2 Crônicas 7.14", "se o meu povo, que se chama pelo meu nome, se humilhar"]], ["Esdras", "AT", "Históricos", 10, "", "a volta do exílio e a reconstrução do templo", ["Esdras 7.10", "Esdras tinha preparado o seu coração para buscar a Lei do SENHOR"]], ["Neemias", "AT", "Históricos", 13, "Neemias", "a reconstrução dos muros de Jerusalém", ["Neemias 8.10", "a alegria do SENHOR é a vossa força"]], ["Ester", "AT", "Históricos", 10, "", "a providência de Deus preservando os judeus na Pérsia", ["Ester 4.14", "para tal tempo como este chegaste a este reino"]], ["Jó", "AT", "Poéticos", 42, "", "o sofrimento do justo e a soberania de Deus", ["Jó 19.25", "eu sei que o meu Redentor vive"]], ["Salmos", "AT", "Poéticos", 150, "", "a oração e o louvor de Israel", ["Salmos 23.1", "O SENHOR é o meu pastor; nada me faltará"]], ["Provérbios", "AT", "Poéticos", 31, "Salomão", "a sabedoria prática para a vida diante de Deus", ["Provérbios 9.10", "O temor do SENHOR é o princípio da sabedoria"]], ["Eclesiastes", "AT", "Poéticos", 12, "", "a vaidade da vida sem Deus “debaixo do sol”", ["Eclesiastes 12.13", "Teme a Deus e guarda os seus mandamentos"]], ["Cantares", "AT", "Poéticos", 8, "Salomão", "o amor entre o esposo e a esposa", null], ["Isaías", "AT", "Profetas Maiores", 66, "Isaías", "a santidade de Deus, o juízo e o Servo sofredor", ["Isaías 53.5", "ele foi ferido pelas nossas transgressões"]], ["Jeremias", "AT", "Profetas Maiores", 52, "Jeremias", "o juízo sobre Judá e a promessa de uma nova aliança", ["Jeremias 33.3", "Clama a mim, e responder-te-ei"]], ["Lamentações", "AT", "Profetas Maiores", 5, "Jeremias", "o lamento pela destruição de Jerusalém", ["Lamentações 3.22", "As misericórdias do SENHOR são a causa de não sermos consumidos"]], ["Ezequiel", "AT", "Profetas Maiores", 48, "Ezequiel", "a glória de Deus, o juízo e a restauração de Israel", ["Ezequiel 36.26", "vos darei um coração novo"]], ["Daniel", "AT", "Profetas Maiores", 12, "Daniel", "a soberania de Deus sobre os impérios e o Reino eterno", ["Daniel 2.44", "o Deus do céu levantará um reino que não será jamais destruído"]], ["Oseias", "AT", "Profetas Menores", 14, "Oseias", "o amor fiel de Deus por um povo infiel", ["Oseias 6.3", "Conheçamos e prossigamos em conhecer ao SENHOR"]], ["Joel", "AT", "Profetas Menores", 3, "Joel", "o Dia do SENHOR e o derramamento do Espírito", ["Joel 2.28", "derramarei o meu Espírito sobre toda a carne"]], ["Amós", "AT", "Profetas Menores", 9, "Amós", "a justiça social e o juízo sobre Israel", ["Amós 5.24", "corra, porém, o juízo como as águas"]], ["Obadias", "AT", "Profetas Menores", 1, "Obadias", "o juízo sobre Edom", ["Obadias 15", "o dia do SENHOR está perto"]], ["Jonas", "AT", "Profetas Menores", 4, "Jonas", "a misericórdia de Deus para com as nações", ["Jonas 2.9", "Do SENHOR vem a salvação"]], ["Miqueias", "AT", "Profetas Menores", 7, "Miqueias", "o juízo, a justiça e o Messias nascido em Belém", ["Miqueias 6.8", "andes humildemente com o teu Deus"]], ["Naum", "AT", "Profetas Menores", 3, "Naum", "a queda de Nínive", ["Naum 1.7", "O SENHOR é bom, ele serve de fortaleza no dia da angústia"]], ["Habacuque", "AT", "Profetas Menores", 3, "Habacuque", "a fé que confia em Deus mesmo sem entender", ["Habacuque 2.4", "o justo, pela sua fé, viverá"]], ["Sofonias", "AT", "Profetas Menores", 3, "Sofonias", "o Dia do SENHOR e a alegria do remanescente", ["Sofonias 3.17", "O SENHOR, teu Deus, está no meio de ti, poderoso para te salvar"]], ["Ageu", "AT", "Profetas Menores", 2, "Ageu", "o chamado para reconstruir o templo", ["Ageu 2.9", "A glória desta última casa será maior do que a da primeira"]], ["Zacarias", "AT", "Profetas Menores", 14, "Zacarias", "as visões da restauração e a vinda do Rei", ["Zacarias 4.6", "Não por força, nem por violência, mas pelo meu Espírito"]], ["Malaquias", "AT", "Profetas Menores", 4, "Malaquias", "a fidelidade de Deus e o chamado ao arrependimento", ["Malaquias 3.6", "eu, o SENHOR, não mudo"]], ["Mateus", "NT", "Evangelhos", 28, "Mateus", "Jesus, o Rei e Messias prometido a Israel", ["Mateus 28.19", "ensinai todas as nações"]], ["Marcos", "NT", "Evangelhos", 16, "Marcos", "Jesus, o Servo em ação", ["Marcos 10.45", "o Filho do Homem também não veio para ser servido, mas para servir"]], ["Lucas", "NT", "Evangelhos", 24, "Lucas", "Jesus, o Filho do Homem que busca os perdidos", ["Lucas 19.10", "o Filho do Homem veio buscar e salvar o que se havia perdido"]], ["João", "NT", "Evangelhos", 21, "João", "Jesus, o Filho de Deus, para que creiamos e tenhamos vida", ["João 3.16", "Deus amou o mundo de tal maneira que deu o seu Filho unigênito"]], ["Atos", "NT", "Histórico do Novo Testamento", 28, "Lucas", "a expansão da Igreja pelo poder do Espírito Santo", ["Atos 1.8", "ser-me-eis testemunhas"]], ["Romanos", "NT", "Cartas de Paulo", 16, "Paulo", "a justiça de Deus revelada no evangelho", ["Romanos 1.16", "não me envergonho do evangelho de Cristo"]], ["1 Coríntios", "NT", "Cartas de Paulo", 16, "Paulo", "a correção de problemas na igreja: divisões, dons e ressurreição", ["1 Coríntios 15.55", "Onde está, ó morte, o teu aguilhão?"]], ["2 Coríntios", "NT", "Cartas de Paulo", 13, "Paulo", "o ministério do apóstolo, na fraqueza e no poder de Deus", ["2 Coríntios 5.17", "se alguém está em Cristo, nova criatura é"]], ["Gálatas", "NT", "Cartas de Paulo", 6, "Paulo", "a justificação pela fé e a liberdade cristã", ["Gálatas 2.20", "já estou crucificado com Cristo"]], ["Efésios", "NT", "Cartas de Paulo", 6, "Paulo", "a Igreja, corpo de Cristo, e a vida no Espírito", ["Efésios 2.8", "pela graça sois salvos, por meio da fé"]], ["Filipenses", "NT", "Cartas de Paulo", 4, "Paulo", "a alegria em Cristo em qualquer circunstância", ["Filipenses 4.13", "Posso todas as coisas naquele que me fortalece"]], ["Colossenses", "NT", "Cartas de Paulo", 4, "Paulo", "a supremacia e a suficiência de Cristo", ["Colossenses 3.2", "Pensai nas coisas que são de cima"]], ["1 Tessalonicenses", "NT", "Cartas de Paulo", 5, "Paulo", "a esperança da volta do Senhor e o arrebatamento", ["1 Tessalonicenses 5.17", "Orai sem cessar"]], ["2 Tessalonicenses", "NT", "Cartas de Paulo", 3, "Paulo", "o Dia do Senhor e o homem do pecado", ["2 Tessalonicenses 3.13", "não vos canseis de fazer bem"]], ["1 Timóteo", "NT", "Cartas de Paulo", 6, "Paulo", "a ordem na igreja e a sã doutrina", ["1 Timóteo 6.12", "Milita a boa milícia da fé"]], ["2 Timóteo", "NT", "Cartas de Paulo", 4, "Paulo", "a fidelidade à Palavra até o fim", ["2 Timóteo 4.7", "Combati o bom combate, acabei a carreira, guardei a fé"]], ["Tito", "NT", "Cartas de Paulo", 3, "Paulo", "a sã doutrina que produz boas obras", ["Tito 2.11", "a graça de Deus se há manifestado, trazendo salvação a todos os homens"]], ["Filemom", "NT", "Cartas de Paulo", 1, "Paulo", "o perdão e a reconciliação com Onésimo", ["Filemom 16", "como irmão amado"]], ["Hebreus", "NT", "Cartas Gerais", 13, "", "a superioridade de Cristo e da nova aliança", ["Hebreus 11.1", "a fé é o firme fundamento das coisas que se esperam"]], ["Tiago", "NT", "Cartas Gerais", 5, "Tiago", "a fé verdadeira que se prova pelas obras", ["Tiago 2.17", "a fé, se não tiver as obras, é morta em si mesma"]], ["1 Pedro", "NT", "Cartas Gerais", 5, "Pedro", "a esperança no meio do sofrimento", ["1 Pedro 5.7", "lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós"]], ["2 Pedro", "NT", "Cartas Gerais", 3, "Pedro", "a verdade contra os falsos mestres e a certeza da volta de Cristo", ["2 Pedro 3.9", "O Senhor não retarda a sua promessa"]], ["1 João", "NT", "Cartas Gerais", 5, "João", "a certeza da salvação e a comunhão com Deus", ["1 João 1.9", "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar"]], ["2 João", "NT", "Cartas Gerais", 1, "João", "andar na verdade e não receber falsos mestres", null], ["3 João", "NT", "Cartas Gerais", 1, "João", "a hospitalidade aos obreiros e a verdade", ["3 João 4", "Não tenho maior gozo do que este: o de ouvir que os meus filhos andam na verdade"]], ["Judas", "NT", "Cartas Gerais", 1, "Judas", "batalhar pela fé contra os falsos mestres", ["Judas 24", "àquele que é poderoso para vos guardar de tropeçar"]], ["Apocalipse", "NT", "Profético do Novo Testamento", 22, "João", "a revelação de Jesus Cristo e a consumação de todas as coisas", ["Apocalipse 22.20", "Certamente, cedo venho"]]], "N": [["Abraão", "pai de uma multidão", "Gênesis 17.5"], ["Isaque", "riso", "Gênesis 21.6"], ["Jacó", "aquele que segura o calcanhar, suplantador", "Gênesis 25.26"], ["Israel", "aquele que luta com Deus", "Gênesis 32.28"], ["Moisés", "tirado das águas", "Êxodo 2.10"], ["Eva", "vida, a mãe de todos os viventes", "Gênesis 3.20"], ["Ismael", "Deus ouve", "Gênesis 16.11"], ["Benjamim", "filho da mão direita", "Gênesis 35.18"], ["Judá", "louvor", "Gênesis 29.35"], ["Betel", "casa de Deus", "Gênesis 28.19"], ["Belém", "casa do pão", "Miqueias 5.2"], ["Peniel", "face de Deus", "Gênesis 32.30"], ["Ebenézer", "pedra de ajuda", "1 Samuel 7.12"], ["Icabode", "foi-se a glória", "1 Samuel 4.21"], ["Mara", "amarga", "Rute 1.20"], ["Emanuel", "Deus conosco", "Mateus 1.23"], ["Barnabé", "filho da consolação", "Atos 4.36"], ["Tomé, chamado Dídimo", "gêmeo", "João 11.16"], ["Cefas", "pedra", "João 1.42"], ["Gólgota", "lugar da caveira", "João 19.17"], ["Jeová-Jiré", "o SENHOR proverá", "Gênesis 22.14"], ["Jeová-Nissi", "o SENHOR é a minha bandeira", "Êxodo 17.15"], ["Jeová-Shalom", "o SENHOR é paz", "Juízes 6.24"], ["El Shaddai", "Deus Todo-Poderoso", "Gênesis 17.1"], ["Lo-Ami", "não meu povo", "Oseias 1.9"], ["Lo-Ruama", "não compadecida", "Oseias 1.6"], ["Messias", "Ungido, o mesmo que Cristo", "João 1.41"], ["Rabi", "Mestre", "João 1.38"], ["Aba", "Pai", "Romanos 8.15"], ["Maranata", "o Senhor vem", "1 Coríntios 16.22"], ["Talita cumi", "menina, levanta-te", "Marcos 5.41"], ["Efatá", "abre-te", "Marcos 7.34"]], "T": [["João 6.35", "o pão da vida"], ["João 8.12", "a luz do mundo"], ["João 10.9", "a porta"], ["João 10.11", "o bom Pastor"], ["João 11.25", "a ressurreição e a vida"], ["João 14.6", "o caminho, e a verdade, e a vida"], ["João 15.1", "a videira verdadeira"], ["João 1.29", "o Cordeiro de Deus, que tira o pecado do mundo"], ["Apocalipse 5.5", "o Leão da tribo de Judá"], ["Apocalipse 22.16", "a resplandecente Estrela da manhã"], ["Apocalipse 19.16", "Rei dos reis e Senhor dos senhores"], ["Apocalipse 1.8", "o Alfa e o Ômega"], ["1 Coríntios 15.45", "o último Adão"], ["1 Timóteo 2.5", "o único mediador entre Deus e os homens"], ["Hebreus 12.2", "o autor e consumador da fé"], ["Efésios 2.20", "a principal pedra da esquina"], ["1 Pedro 2.25", "o Pastor e Bispo das vossas almas"], ["Isaías 9.6", "Maravilhoso, Conselheiro, Deus Forte, Pai da Eternidade, Príncipe da Paz"], ["Malaquias 4.2", "o sol da justiça"], ["João 1.1", "o Verbo"]] };
  var LV = D.L.map(function(x, i) {
    return { i, n: x[0], t: x[1], g: x[2], c: x[3], a: x[4], tema: x[5], v: x[6] };
  });
  function r(n) {
    return Math.floor(Math.random() * n);
  }
  function emb(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = r(i + 1), t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }
  function monta(p, certa, erradas, e) {
    var er = erradas.filter(function(x, i, arr) {
      return x !== certa && arr.indexOf(x) === i;
    });
    if (er.length < 3) return null;
    var ops = emb([certa].concat(emb(er).slice(0, 3)));
    return { p, o: ops, c: ops.indexOf(certa), e };
  }
  function outros(lista, campo, valor) {
    var s = {};
    return lista.map(function(x) {
      return x[campo];
    }).filter(function(x) {
      if (!x || x === valor || s[x]) return false;
      s[x] = 1;
      return true;
    });
  }
  var TIPOS = {
    ordem: function(b) {
      if (b.i === 65) return null;
      var prox = LV[b.i + 1];
      return monta("Qual livro vem logo depois de " + b.n + "?", prox.n, emb(LV.filter(function(x) {
        return Math.abs(x.i - b.i) < 6 && x.i !== b.i + 1;
      }).map(function(x) {
        return x.n;
      })), "Depois de " + b.n + " vem " + prox.n + ". " + b.n + " é o livro " + (b.i + 1) + " da Bíblia, e " + prox.n + " é o " + (b.i + 2) + ".");
    },
    antes: function(b) {
      if (b.i === 0) return null;
      var ant = LV[b.i - 1];
      return monta("Qual livro vem logo antes de " + b.n + "?", ant.n, emb(LV.filter(function(x) {
        return Math.abs(x.i - b.i) < 6 && x.i !== b.i - 1 && x.i !== b.i;
      }).map(function(x) {
        return x.n;
      })), "Antes de " + b.n + " vem " + ant.n + ". Conhecer a ordem dos livros ajuda a achar qualquer texto com rapidez.");
    },
    qualcap: function(b) {
      if (LV.filter(function(x) {
        return x.c === b.c;
      }).length > 1) return null;
      return monta("Qual destes livros tem " + b.c + " capítulo" + (b.c > 1 ? "s" : "") + "?", b.n, emb(LV.filter(function(x) {
        return x.c !== b.c && Math.abs(x.c - b.c) < 15;
      }).map(function(x) {
        return x.n;
      })), b.n + " tem " + b.c + " capítulo" + (b.c > 1 ? "s" : "") + ". Tema: " + b.tema + ".");
    },
    capitulos: function(b) {
      var c = b.c, op = [c + 1, c - 1, c + 2, c + 3, c - 2, c + 5].filter(function(x) {
        return x > 0;
      }).map(String);
      return monta("Quantos capítulos tem o livro de " + b.n + "?", String(c), op, b.n + " tem " + c + " capítulo" + (c > 1 ? "s" : "") + ". A Bíblia inteira tem 1.189 capítulos.");
    },
    grupo: function(b) {
      return monta(b.n + " pertence a qual grupo de livros?", b.g, outros(LV, "g", b.g), b.n + " faz parte dos " + b.g + " do " + (b.t === "AT" ? "Antigo" : "Novo") + " Testamento. O tema do livro é " + b.tema + ".");
    },
    autor: function(b) {
      if (!b.a) return null;
      var trad = ["Mateus", "Marcos", "Lucas", "João", "Lamentações"].indexOf(b.n) >= 0;
      return monta("A quem " + (trad ? "a tradição cristã atribui" : "se atribui") + " o livro de " + b.n + "?", b.a, outros(LV, "a", b.a), (trad ? "A tradição cristã atribui " + b.n + " a " : "O livro é atribuído a ") + b.a + ". Tema: " + b.tema + ".");
    },
    tema: function(b) {
      return monta("Qual é o tema central de " + b.n + "?", b.tema, emb(outros(LV, "tema", b.tema)), "O tema de " + b.n + " é " + b.tema + ".");
    },
    versiculo: function(b) {
      if (!b.v) return null;
      return monta("Em qual livro está escrito: “" + b.v[1] + "”?", b.n, LV.filter(function(x) {
        return x.t === b.t && x.i !== b.i;
      }).map(function(x) {
        return x.n;
      }), "Está em " + b.v[0] + ". O livro de " + b.n + " trata de " + b.tema + ".");
    },
    testamento: function(b) {
      var mesmo = LV.filter(function(x) {
        return x.t !== b.t;
      }).map(function(x) {
        return x.n;
      });
      return monta("Qual destes livros está no " + (b.t === "AT" ? "Antigo" : "Novo") + " Testamento?", b.n, mesmo, b.n + " está no " + (b.t === "AT" ? "Antigo Testamento, que tem 39 livros" : "Novo Testamento, que tem 27 livros") + ".");
    }
  };
  function nome() {
    var x = D.N[r(D.N.length)];
    return monta("O que significa “" + x[0] + "”?", x[1], D.N.map(function(y) {
      return y[1];
    }), "“" + x[0] + "” significa " + x[1] + " (" + x[2] + "). Na Bíblia, os nomes carregam história e mensagem.");
  }
  function titulo() {
    var x = D.T[r(D.T.length)];
    return monta("Como Jesus é chamado em " + x[0] + "?", x[1], D.T.map(function(y) {
      return y[1];
    }), "Em " + x[0] + ", Jesus é " + x[1] + ". Cada título revela uma face da sua Pessoa e da sua obra.");
  }
  var NT = Object.keys(TIPOS);
  window.etuGeraLivro = function(i, qtd) {
    var b = LV[i], out = [], k = emb(NT);
    k.forEach(function(t) {
      var q = TIPOS[t](b);
      if (q) out.push(q);
    });
    return out.slice(0, qtd || out.length);
  };
  window.etuGeraSemFim = function(qtd, evita) {
    var out = [], vis = {}, tent = 0;
    (evita || []).forEach(function(p) {
      vis[p] = 1;
    });
    while (out.length < qtd && tent < qtd * 20) {
      tent++;
      var z = r(10), q;
      if (z < 2) q = nome();
      else if (z < 4) q = titulo();
      else {
        var b = LV[r(66)];
        q = TIPOS[NT[r(NT.length)]](b);
      }
      if (q && !vis[q.p]) {
        vis[q.p] = 1;
        out.push(q);
      }
    }
    return out;
  };
  window.etuLivros = LV;
})();
(function() {
  var v = {};
  Object.keys(ETU_DESAFIO).forEach(function(k) {
    v[k] = ETU_DESAFIO[k];
    delete ETU_DESAFIO[k];
  });
  ETU_DESAFIO["Jornada pelos 66 livros"] = [];
  ETU_DESAFIO["Perguntas sem fim"] = [];
  Object.keys(v).forEach(function(k) {
    ETU_DESAFIO[k] = v[k];
  });
  window.ETU_DESAFIO_DESC = Object.assign(window.ETU_DESAFIO_DESC || {}, { "Jornada pelos 66 livros": "De Gênesis a Apocalipse, livro por livro", "Perguntas sem fim": "Toda a Bíblia, misturada" });
})();
