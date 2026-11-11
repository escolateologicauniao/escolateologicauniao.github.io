/* =====================================================================
   CONFIGURAÇÃO — preencha com os dados do seu projeto Supabase.
   Enquanto estiver vazio, a plataforma funciona em MODO DEMONSTRAÇÃO.
   ===================================================================== */
const CONFIG = {
  SUPABASE_URL: '',        // ex.: https://xxxxxxxx.supabase.co
  SUPABASE_ANON_KEY: '',   // chave "anon public" do projeto
  LINK_PUBLICO: 'https://escolateologicauniao.github.io/', // endereço que os alunos e interessados recebem
  SITE_URL: '',            // endereço onde a plataforma ficará publicada (para o link de redefinição de senha)
  WHATSAPP: '(61) 99521-1432',                       // número exibido
  WHATSAPP_LINK: '5561995211432',                    // país + DDD + número, só dígitos
  EMAIL: 'etu.escolateologicauniao215@gmail.com',
  PIX_CHAVE: '(61) 99521-1432',                      // chave Pix exibida (telefone)
  PIX_COPIAR: '+5561995211432',                      // chave Pix copiada pelo botão
  NOTA_MINIMA: 70,
  TOLERANCIA_DIAS: 5,                                // dias de tolerância após o vencimento da mensalidade, antes do bloqueio automático
  AVISO_DIAS: 5,                                     // dias antes do vencimento em que o aluno começa a ser avisado
  LIBERACAO_PROVISORIA_DIAS: 0,                      // dias de acesso automático ao enviar o comprovante (igual ao banco de dados; 0 = desligado)
  ACESSO_CONFIRMADO_DIAS: 365,                       // validade padrão ao confirmar o pagamento                                   // % para aprovação na prova (igual ao banco de dados)
  AVISOS: [
    'Matrículas abertas — Curso Livre de Teologia: Básico, Médio e Avançado',
    'Não pare no meio do caminho: cada aula concluída é uma pedra no alicerce do seu ministério',
    'MATRÍCULA VIA PIX — chave (telefone): (61) 99521-1432 · Envie o comprovante pelo WhatsApp e o curso completo é liberado',
    'Curso completo com vídeo-aulas, apostilas em PDF, provas, certificado e carteira de estudante',
    '“Procura apresentar-te a Deus aprovado…” — 2 Timóteo 2.15',
    'Dúvidas? Fale com a direção pelo WhatsApp (61) 99521-1432'
  ]
};

const DISC_PADRAO = [{"curso_id": "basico", "ordem": 1, "nome": "Introdução à Teologia", "descricao": "Por que estudar teologia, o que é teologia, suas áreas e o lugar do estudo bíblico na vida da Igreja."}, {"curso_id": "basico", "ordem": 2, "nome": "Bibliologia", "descricao": "A doutrina das Escrituras: revelação, inspiração, inerrância, cânon e autoridade da Bíblia."}, {"curso_id": "basico", "ordem": 3, "nome": "Teologia Propriamente Dita", "descricao": "A doutrina de Deus: existência, nomes, atributos e a Santíssima Trindade."}, {"curso_id": "basico", "ordem": 4, "nome": "Cristologia", "descricao": "A pessoa e a obra de Jesus Cristo: divindade, humanidade, encarnação, morte, ressurreição e glória."}, {"curso_id": "basico", "ordem": 5, "nome": "Pneumatologia", "descricao": "A pessoa e a obra do Espírito Santo: divindade, batismo no Espírito, dons e fruto."}, {"curso_id": "basico", "ordem": 6, "nome": "Angelologia", "descricao": "Os anjos, Satanás e os demônios à luz das Escrituras."}, {"curso_id": "basico", "ordem": 7, "nome": "Antropologia Bíblica", "descricao": "O ser humano: criação, imagem de Deus, natureza e propósito."}, {"curso_id": "basico", "ordem": 8, "nome": "Hamartiologia", "descricao": "A doutrina do pecado: origem, natureza, consequências e a provisão divina."}, {"curso_id": "basico", "ordem": 9, "nome": "Soteriologia", "descricao": "A doutrina da salvação: graça, arrependimento, fé, justificação, regeneração e santificação."}, {"curso_id": "basico", "ordem": 10, "nome": "Eclesiologia", "descricao": "A Igreja de Cristo: natureza, missão, ministérios, ordenanças e governo."}, {"curso_id": "basico", "ordem": 11, "nome": "Escatologia", "descricao": "As últimas coisas: arrebatamento, tribulação, milênio, juízos e estado eterno."}, {"curso_id": "medio", "ordem": 1, "nome": "Hermenêutica Bíblica", "descricao": "Princípios e regras para interpretar a Bíblia com fidelidade ao contexto, à gramática e à história."}, {"curso_id": "medio", "ordem": 2, "nome": "Panorama do Antigo Testamento", "descricao": "Visão geral dos livros do Antigo Testamento: autor, época, propósito e mensagem."}, {"curso_id": "medio", "ordem": 3, "nome": "Panorama do Novo Testamento", "descricao": "Visão geral dos Evangelhos, de Atos, das Epístolas e do Apocalipse."}, {"curso_id": "medio", "ordem": 4, "nome": "Geografia Bíblica", "descricao": "As terras da Bíblia: regiões, cidades, rotas e o cenário dos acontecimentos bíblicos."}, {"curso_id": "medio", "ordem": 5, "nome": "História de Israel", "descricao": "De Abraão ao retorno do exílio: a formação e a trajetória do povo de Israel."}, {"curso_id": "medio", "ordem": 6, "nome": "História da Igreja", "descricao": "Da Igreja primitiva aos dias atuais: os pais da Igreja, a Reforma e os avivamentos."}, {"curso_id": "medio", "ordem": 7, "nome": "Homilética", "descricao": "A arte de preparar e pregar sermões fiéis ao texto bíblico."}, {"curso_id": "medio", "ordem": 8, "nome": "Ética Cristã", "descricao": "Os princípios bíblicos para a conduta do cristão na família, na igreja e na sociedade."}, {"curso_id": "medio", "ordem": 9, "nome": "Evangelismo e Missões", "descricao": "O mandamento da Grande Comissão e a prática da evangelização e das missões."}, {"curso_id": "medio", "ordem": 10, "nome": "Educação Cristã", "descricao": "O ensino da Palavra na igreja local: didática, Escola Bíblica Dominical e discipulado."}, {"curso_id": "avancado", "ordem": 1, "nome": "Exegese Bíblica", "descricao": "O estudo aprofundado do texto bíblico: contexto, estrutura, palavras-chave e sentido original."}, {"curso_id": "avancado", "ordem": 2, "nome": "Teologia Contemporânea", "descricao": "As principais correntes teológicas dos séculos 19 a 21 avaliadas à luz das Escrituras."}, {"curso_id": "avancado", "ordem": 3, "nome": "Filosofia e Fé Cristã", "descricao": "As grandes questões da filosofia — Deus, verdade, conhecimento e moral — respondidas pela cosmovisão bíblica."}, {"curso_id": "avancado", "ordem": 4, "nome": "Teologia do Antigo Testamento", "descricao": "Os grandes temas da revelação no Antigo Testamento e seu cumprimento em Cristo."}, {"curso_id": "avancado", "ordem": 5, "nome": "Teologia do Novo Testamento", "descricao": "Os grandes temas do ensino de Jesus e dos apóstolos."}, {"curso_id": "avancado", "ordem": 6, "nome": "Apologética Cristã", "descricao": "A defesa racional e bíblica da fé cristã diante das objeções e dos desafios atuais."}, {"curso_id": "avancado", "ordem": 7, "nome": "Seitas e Heresias", "descricao": "Análise bíblica dos principais desvios doutrinários e de como responder a eles."}, {"curso_id": "avancado", "ordem": 8, "nome": "Teologia Pentecostal", "descricao": "A doutrina e a história do movimento pentecostal: batismo no Espírito Santo e dons espirituais."}, {"curso_id": "avancado", "ordem": 9, "nome": "Patrística", "descricao": "Os pais da Igreja: vida, escritos e contribuição para a fé cristã."}, {"curso_id": "avancado", "ordem": 10, "nome": "Teologia Pastoral", "descricao": "O cuidado do rebanho: aconselhamento, visitação, ordenanças e vida do pastor."}, {"curso_id": "avancado", "ordem": 11, "nome": "Liderança e Administração Eclesiástica", "descricao": "Princípios bíblicos de liderança e a organização da igreja local."}];
const ESTUDOS_PADRAO = [{"id": "e1", "tipo": "Esboço de pregação", "titulo": "Revesti-vos de toda a armadura de Deus", "descricao": "Pregação expositiva em Efésios 6.11: a armadura de Deus para a batalha espiritual do cristão.", "pdf_url": "https://drive.google.com/file/d/17U3RZh8uea2tc3RgiJCdSMn3nU39vUzn/view", "ordem": 1, "ativo": true}, {"id": "e2", "tipo": "Esboço de pregação", "titulo": "Vem para o Meio", "descricao": "Pregação para a juventude.", "pdf_url": "https://drive.google.com/file/d/1Rz97k_jwmkBWcJfxvtPhwkKmOGbo6GDZ/view", "ordem": 2, "ativo": true}, {"id": "e3", "tipo": "Esboço de pregação", "titulo": "Que queres que te faça?", "descricao": "Pregação expositiva em Lucas 18.35-43: o encontro de Jesus com o cego de Jericó.", "pdf_url": "https://drive.google.com/file/d/1dEPCW0s9Pe4haqAJItSX6id63L4sx5vJ/view", "ordem": 3, "ativo": true}, {"id": "e4", "tipo": "Estudo", "titulo": "O Mundo Jaz no Maligno", "descricao": "Estudo bíblico — edição ampliada.", "pdf_url": "https://drive.google.com/file/d/1WD7oWKx0xAjnqoTAIUL26H4iS83vBmex/view", "ordem": 4, "ativo": true}, {"id": "e5", "tipo": "Estudo", "titulo": "Cidadãos do Céu", "descricao": "A Igreja de Cristo diante da política, das leis e dos reinos deste mundo.", "pdf_url": "https://drive.google.com/file/d/13_mh4H1ex84GLpUVMaaCPZXPl-6voO4v/view", "ordem": 5, "ativo": true}, {"id": "e6", "tipo": "Revista", "titulo": "A Esperança Cristã diante da Morte", "descricao": "O consolo e a esperança que as Escrituras oferecem diante da morte.", "pdf_url": "https://drive.google.com/file/d/1ZhibqqVF_bb-XsMWJ5KM2NRL4P9zoNEH/view", "ordem": 6, "ativo": true}, {"id": "e7", "tipo": "Escola Dominical", "titulo": "Manual do Professor — Lição 8", "descricao": "Manual de apoio ao professor da Escola Bíblica Dominical.", "pdf_url": "https://drive.google.com/file/d/1dedZJl9XbxgrLJz650rPUdCzYnhQQcGX/view", "ordem": 7, "ativo": true}];
let CURSOS = [
  {id:'basico', tipo:'formacao', ordem:1, nivel:1, cat:'Nível Básico', titulo:'Curso Básico de Teologia', desc:'Os fundamentos da fé cristã: por que estudar teologia, o que é teologia, as Escrituras e as grandes doutrinas da Bíblia.'},
  {id:'medio', tipo:'formacao', ordem:2, nivel:2, cat:'Nível Médio', titulo:'Curso Médio de Teologia', desc:'Aprofundamento nas doutrinas bíblicas, interpretação da Bíblia, história da Igreja e preparo para o ensino.'},
  {id:'avancado', tipo:'formacao', ordem:3, nivel:3, cat:'Nível Avançado', titulo:'Curso Avançado de Teologia', desc:'Teologia Sistemática, estudo do texto bíblico, defesa da fé e pregação para o ministério da Palavra.'},
  {id:'esp-apocalipse', tipo:'extra', ordem:10, nivel:0, cat:'Curso Extra', titulo:'Curso de Apocalipse', desc:'Estudo expositivo do livro de Apocalipse, capítulo por capítulo, na perspectiva pré-tribulacionista.', ativo:false},
  {id:'esp-escatologia', tipo:'extra', ordem:11, nivel:0, cat:'Curso Extra', titulo:'Curso de Escatologia Bíblica', desc:'As últimas coisas de Gênesis a Apocalipse: arrebatamento, tribulação, milênio e estado eterno.', ativo:false},
  {id:'esp-deus', tipo:'extra', ordem:12, nivel:0, cat:'Curso Extra', titulo:'Curso Doutrina de Deus', desc:'A existência, os atributos e a Trindade.', ativo:false}
];
const BRASAO = document.querySelector('.crest').src;
const ASSINATURA = 'data:image/webp;base64,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';
// No visualizador do Claude, páginas de outros sites (YouTube, Google Drive) não abrem dentro da página.
const EMBED_OK = !/claude\.ai|claudeusercontent|anthropic/.test(location.hostname + ' ' + document.referrer);

/* ---------- utilidades ---------- */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const today = () => new Date().toISOString().slice(0,10);
const fmtDate = d => d ? d.split('-').reverse().join('/') : '—';
const curso = id => CURSOS.find(c => c.id === id);
function star(n,color='#C9A24A',s=14){let o='';for(let i=0;i<n;i++)o+=`<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" fill="${color}"/></svg>`;return o}
function show(el,text,kind){el.className='msg '+kind;el.textContent=text;el.classList.remove('hidden')}
function toEmbed(url){
  if(!url) return '';
  let m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/);
  if(m) return `https://www.youtube.com/embed/${m[1]}?rel=0&modestbranding=1`;
  m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if(m) return `https://player.vimeo.com/video/${m[1]}`;
  m = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  if(m) return `https://drive.google.com/file/d/${m[1]}/preview`;
  return url;
}
function isStorage(u){ return /^storage:/.test(u||'') }
function pdfEmbed(url){
  if(!url) return '';
  const m = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
  return m ? `https://drive.google.com/file/d/${m[1]}/preview` : url;
}
function modal(html, onReady){
  const root=$('#modalRoot');
  root.innerHTML=`<div class="modal" role="dialog" aria-modal="true"><div class="box">${html}</div></div>`;
  const close=()=>root.innerHTML='';
  root.querySelector('.modal').addEventListener('click',e=>{if(e.target.classList.contains('modal'))close()});
  root.querySelectorAll('[data-close]').forEach(b=>b.onclick=close);
  onReady && onReady(root, close);
}
function confirmBox(text, onYes){
  modal(`<h3>Confirmar</h3><p>${esc(text)}</p><div class="acts"><button class="btn btn-line" data-close>Cancelar</button><button class="btn btn-red" id="yes">Confirmar</button></div>`,
    (r,close)=>{r.querySelector('#yes').onclick=async()=>{close();await onYes()}});
}

/* =====================================================================
   BACKEND REAL (Supabase): contas, e-mail de redefinição, matrículas
   ===================================================================== */
function SupaBackend(){
  const sb = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
  const site = CONFIG.SITE_URL || (location.origin + location.pathname);
  const err = r => { if(r.error) throw new Error(traduz(r.error.message)); return r.data };
  return {
    demo:false,
    async carteirinhas(){ return err(await sb.from('carteirinhas_pdf').select('*').eq('user_id',S.user.id)) || [] },
    async avisosPessoais(){ return err(await sb.from('notificacoes').select('*').eq('user_id',S.user.id).order('criado_em',{ascending:false}).limit(100)) || [] },
    async lerAvisos(ids){ if(ids.length) err(await sb.rpc('ler_notificacoes',{p_ids:ids})) },
    async publicarCarteirinha(uid,cid,file){
      if(!S.profile?.is_admin) throw new Error('Exclusivo da Direção.');
      await validarCarteirinhaPDF(file);
      const bytes=new Uint8Array(16); crypto.getRandomValues(bytes);
      const path=uid+'/'+cid+'/'+Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('')+'.pdf';
      err(await sb.storage.from('carteirinhas').upload(path,file,{contentType:'application/pdf',upsert:false}));
      // Se houver erro de rede após o envio, preservar o arquivo: a operação no servidor pode ter sido concluída.
      err(await sb.rpc('publicar_carteirinha',{p_aluno:uid,p_curso:cid,p_arquivo:path}));
    },
    async baixarCarteirinha(cid){
      const card=err(await sb.from('carteirinhas_pdf').select('arquivo').eq('user_id',S.user.id).eq('curso_id',cid).single());
      return err(await sb.storage.from('carteirinhas').createSignedUrl(card.arquivo,120,{download:'carteirinha-ETU.pdf'})).signedUrl;
    },
    async registrarDoc(tipo,cid){ const r=await sb.rpc('registrar_documento',{p_tipo:tipo,p_curso:cid}); if(r.error) return null; return r.data },
    async validarDoc(cod){ return err(await sb.rpc('validar_documento',{p_codigo:cod})) || [] },
    async nota(aid){ if(!S.user) return ''; const r=await sb.from('anotacoes').select('texto').eq('user_id',S.user.id).eq('aula_id',aid).maybeSingle(); return r.data?.texto||'' },
    async salvarNota(aid,t){ err(await sb.from('anotacoes').upsert({user_id:S.user.id,aula_id:aid,texto:t,atualizado_em:new Date().toISOString()})) },
    async canais(){ const r=await sb.from('canais_oficiais').select('*').order('id'); return (r.data&&r.data.length)?r.data:CANAIS_PADRAO },
    async salvarCanal(c){ err(await sb.from('canais_oficiais').insert(c)) },
    async apagarCanal(id){ err(await sb.from('canais_oficiais').delete().eq('id',id)) },
    async perguntarDirecao(msgs){ const {data,error}=await sb.functions.invoke('assistente',{body:{mensagens:msgs,modo:'direcao'}}); if(error) throw new Error('O assistente não respondeu agora. Tente novamente em instantes.'); if(data?.erro) throw new Error(data.erro); return data },
    async lancamentos(){ return err(await sb.from('lancamentos').select('*').order('data',{ascending:false}).limit(5000)) },
    async salvarLancamento(l){ err(await sb.from('lancamentos').insert(l)) },
    async apagarLancamento(id){ err(await sb.from('lancamentos').delete().eq('id',id)) },
    async perguntarContador(msgs,modo='contabil'){ const {data,error}=await sb.functions.invoke('assistente',{body:{mensagens:msgs,modo}}); if(error) throw new Error('O assistente não respondeu agora. Tente novamente em instantes.'); if(data?.erro) throw new Error(data.erro); return data },
    async atualizarConta(d){ const {data:{user}}=await sb.auth.getUser(); if(!user) throw new Error('Entre novamente.');
      const v=await sb.auth.signInWithPassword({email:user.email,password:d.atual}); if(v.error) throw new Error('A senha atual não confere.');
      const up={}; if(d.email && d.email.toLowerCase()!==user.email.toLowerCase()) up.email=d.email; if(d.pw) up.password=d.pw;
      if(Object.keys(up).length) err(await sb.auth.updateUser(up));
      if(d.nome||d.telefone!==undefined) err(await sb.rpc('atualizar_meu_perfil',{p_nome:d.nome||null,p_telefone:d.telefone??null}));
      return up.email ? 'Enviamos um e-mail de confirmação para o novo endereço; a troca vale depois que você confirmar.' : '' },
    async mensagens(sala){ return err(await sb.from('mensagens').select('id,sala,user_id,nome,is_direcao,texto,criado_em').eq('sala',sala).eq('apagada',false).order('criado_em',{ascending:false}).limit(80))?.reverse()||[] },
    async enviarMensagem(sala,texto){ err(await sb.from('mensagens').insert({sala,texto})) },
    async apagarMensagem(id){ err(await sb.from('mensagens').update({apagada:true}).eq('id',id)) },
    ouvirMensagens(sala,cb){ const ch=sb.channel('sala-'+sala).on('postgres_changes',{event:'*',schema:'public',table:'mensagens',filter:'sala=eq.'+sala},()=>cb()).subscribe(); return ()=>sb.removeChannel(ch) },
    async escolaConfig(){ const r=await sb.from('escola_config').select('*').eq('id',1).maybeSingle(); return r.data||null },
    async saveEscolaConfig(c){ err(await sb.from('escola_config').upsert({id:1,...c})) },
    async aiPublico(){ const r=await sb.rpc('assistente_publico'); if(r.error) return null; return (r.data&&r.data[0])||null },
    async aiConfig(){ return err(await sb.from('assistente_config').select('*').eq('id',1).maybeSingle()) },
    async saveAiConfig(c){ err(await sb.from('assistente_config').upsert({...c,id:1,atualizado_em:new Date().toISOString()})) },
    async aiLog(){ return err(await sb.from('assistente_log').select('*').order('criado_em',{ascending:false}).limit(60)) },
    async perguntar(msgs){ const {data,error}=await sb.functions.invoke('assistente',{body:{mensagens:msgs}}); if(error) throw new Error('O assistente não respondeu agora. Tente novamente em instantes ou toque em “Falar com a direção”.'); if(data?.erro) throw new Error(data.erro); return data },
    async abrirAtendimento(a){ err(await sb.rpc('abrir_atendimento',{p_nome:a.nome,p_contato:a.contato,p_mensagem:a.mensagem,p_conversa:a.conversa})) },
    async atendimentos(){ return err(await sb.from('atendimentos').select('*').order('criado_em',{ascending:false}).limit(200)) },
    async salvarAtendimento(id,c){ err(await sb.from('atendimentos').update(c).eq('id',id)) },
    async apagarAtendimento(id){ err(await sb.from('atendimentos').delete().eq('id',id)) },
    async apagarAiLog(){ err(await sb.from('assistente_log').delete().gt('id',0)) },
    onAuth(cb){ sb.auth.onAuthStateChange((ev, s) => cb(ev, s?.user || null)); },
    async session(){ const {data} = await sb.auth.getSession(); return data.session?.user || null },
    async signIn(email,pw){ err(await sb.auth.signInWithPassword({email,password:pw})) },
    async signUp(nome,tel,email,pw,interesse){ err(await sb.auth.signUp({email,password:pw,options:{data:{nome,telefone:tel,interesse},emailRedirectTo:site}})) },
    async signOut(){ await sb.auth.signOut() },
    async forgot(email){ err(await sb.auth.resetPasswordForEmail(email,{redirectTo:site})) },
    async newPassword(pw){ err(await sb.auth.updateUser({password:pw})) },
    async profile(uid){ return err(await sb.from('perfis').select('*').eq('id',uid).maybeSingle()) },
    async aulas(){ return err(await sb.from('aulas').select('*').order('disc_ordem').order('ordem')) },
    async cursos(){ return (err(await sb.from('cursos').select('*').order('ordem'))).map(c=>({...c, desc:c.descricao})) },
    async disciplinas(){ return err(await sb.from('disciplinas').select('*').order('ordem')) },
    async estudos(){ return err(await sb.from('estudos').select('*').order('ordem')) },
    async saveEstudo(e){ const row={tipo:e.tipo,titulo:e.titulo,descricao:e.descricao,pdf_url:e.pdf_url,ordem:e.ordem||0,ativo:e.ativo!==false};
      e.id ? err(await sb.from('estudos').update(row).eq('id',e.id)) : err(await sb.from('estudos').insert(row)) },
    async delEstudo(id){ err(await sb.from('estudos').delete().eq('id',id)) },
    async saveDisciplinas(cid,list){ err(await sb.from('disciplinas').delete().eq('curso_id',cid)); if(list.length) err(await sb.from('disciplinas').insert(list.map((d,i)=>({curso_id:cid,ordem:i+1,nome:d.nome,descricao:d.descricao||null})))) },
    async saveCurso(c,novo){ const row={titulo:c.titulo,cat:c.cat,tipo:c.tipo,nivel:c.nivel||0,descricao:c.desc,capa:c.capa||null,ordem:c.ordem||0,ativo:c.ativo!==false,oferece_certificado:c.oferece_certificado===true,em_breve:c.em_breve===true};
      novo ? err(await sb.from('cursos').insert({id:c.id,...row})) : err(await sb.from('cursos').update(row).eq('id',c.id)) },
    async conteudo(id){
      const r1 = await sb.from('aulas_conteudo').select('aula_id,video_url,audio_url').eq('aula_id',id).maybeSingle();
      const r2 = await sb.from('aulas_apostila').select('pdf_url').eq('aula_id',id).maybeSingle();
      if(!r1.data && !r2.data) return null;
      let pdf = r2.data?.pdf_url||'';
      if(isStorage(pdf)){ const [b,...p]=pdf.slice(8).split('/'); const sg=await sb.storage.from(b).createSignedUrl(p.join('/'),3600); pdf = sg.data?.signedUrl||'' }
      const assina=async u=>{ if(!isStorage(u)) return u||''; const [b,...p]=u.slice(8).split('/'); const sg=await sb.storage.from(b).createSignedUrl(p.join('/'),3600*4); return sg.data?.signedUrl||'' };
      return {aula_id:id, video_url:await assina(r1.data?.video_url), video_raw:r1.data?.video_url||'', audio_url:await assina(r1.data?.audio_url), audio_raw:r1.data?.audio_url||'', pdf_url:pdf} },
    async apostilaBruta(id){ const r=await sb.from('aulas_apostila').select('pdf_url').eq('aula_id',id).maybeSingle(); return r.data?.pdf_url||'' },
    async enviarArquivo(file, publico){
      const bucket = publico ? 'materiais' : 'apostilas';
      const nome = Date.now()+'-'+file.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\w.-]+/g,'_');
      err(await sb.storage.from(bucket).upload(nome, file, {contentType: file.type||'application/octet-stream', upsert:false}));
      return publico ? sb.storage.from(bucket).getPublicUrl(nome).data.publicUrl : 'storage:'+bucket+'/'+nome },
    async listarArquivos(){ const out=[]; for(const b of ['apostilas','materiais']){ const r=await sb.storage.from(b).list('',{limit:500,sortBy:{column:'created_at',order:'desc'}}); (r.data||[]).filter(f=>f.name&&!f.name.startsWith('.')).forEach(f=>out.push({bucket:b,nome:f.name,tam:f.metadata?.size||0})) } return out },
    async linkArquivo(b,n){ if(b==='materiais') return sb.storage.from(b).getPublicUrl(n).data.publicUrl; const r=await sb.storage.from(b).createSignedUrl(n,3600,{download:true}); return r.data?.signedUrl },
    async salvarFoto(dataUrl){ err(await sb.rpc('salvar_foto',{p_foto:dataUrl})) },
    async enviarComprovante(cid,valor,arquivo){ return err(await sb.rpc('enviar_comprovante',{p_curso:cid,p_valor:valor,p_arquivo:arquivo})) },
    async meusComprovantes(uid){ return err(await sb.from('comprovantes').select('id,curso_id,valor,status,criado_em,obs').eq('user_id',uid).order('criado_em',{ascending:false})) },
    async comprovantes(){ return err(await sb.from('comprovantes').select('id,user_id,curso_id,valor,status,criado_em,obs').order('criado_em',{ascending:false})) },
    async comprovanteArquivo(id){ return (err(await sb.from('comprovantes').select('arquivo').eq('id',id).single())).arquivo },
    async decidirComprovante(id,aprovar,expira,obs){ err(await sb.rpc('decidir_comprovante',{p_id:id,p_aprovar:aprovar,p_expira:expira||null,p_obs:obs||null})) },
    async minhasMatriculas(uid){ return err(await sb.from('matriculas').select('*').eq('user_id',uid)) },
    async progresso(uid){ return (err(await sb.from('progresso').select('aula_id').eq('user_id',uid))).map(r=>r.aula_id) },
    async marcar(uid,aid,feito){ feito ? err(await sb.from('progresso').upsert({user_id:uid,aula_id:aid})) : err(await sb.from('progresso').delete().eq('user_id',uid).eq('aula_id',aid)) },
    async alunos(){
      const ps = err(await sb.from('perfis').select('*').order('criado_em',{ascending:false}));
      const ms = err(await sb.from('matriculas').select('*'));
      return ps.map(p => ({...p, matriculas: ms.filter(m=>m.user_id===p.id)}));
    },
    async setMatricula(uid,cid,status,expira){ err(await sb.from('matriculas').upsert({user_id:uid,curso_id:cid,status,expira_em:expira||null},{onConflict:'user_id,curso_id'})) },
    async delMatricula(uid,cid){ err(await sb.from('matriculas').delete().eq('user_id',uid).eq('curso_id',cid)) },
    async setBloqueio(uid,bloq){ err(await sb.from('perfis').update({bloqueado:bloq}).eq('id',uid)) },
    async questoes(aid){ return err(await sb.rpc('questoes_aluno',{p_aula:aid})) || [] },
    async questoesAdmin(aid){ return err(await sb.rpc('questoes_admin',{p_aula:aid})) || [] },
    async saveQuestoes(aid,list){ err(await sb.from('questoes').delete().eq('aula_id',aid));
      if(list.length) err(await sb.from('questoes').insert(list.map((q,i)=>({aula_id:aid,ordem:i+1,enunciado:q.enunciado,alternativas:q.alternativas,correta:q.correta,explicacao:q.explicacao||null})))) },
    async corrigir(aid,resp){ return err(await sb.rpc('corrigir_prova',{p_aula:aid,p_resp:resp})) },
    async tentativas(uid){ return err(await sb.from('tentativas').select('aula_id,nota,aprovado,criado_em').eq('user_id',uid)) },
    async tentativasTodas(){ return err(await sb.from('tentativas').select('user_id,aula_id,nota,aprovado,criado_em')) },
    async todosProgressos(){ return err(await sb.from('progresso').select('user_id,aula_id')) },
    async mural(){ return err(await sb.from('mural').select('*').order('criado_em',{ascending:false})) },
    async saveMural(m){ const row={tipo:m.tipo,titulo:m.titulo,texto:m.texto,video_url:m.video_url};
      m.id ? err(await sb.from('mural').update(row).eq('id',m.id)) : err(await sb.from('mural').insert(row)) },
    async delMural(id){ err(await sb.from('mural').delete().eq('id',id)) },
    async saveAula(a,c){
      const row = {curso_id:a.curso_id,modulo:a.modulo,disc_ordem:a.disc_ordem||1,ordem:a.ordem,titulo:a.titulo,descricao:a.descricao,previa:a.previa,horas:a.horas||0,previa_texto:a.previa_texto||null,apostila_amostra:!!a.apostila_amostra};
      let id = a.id;
      if(id) err(await sb.from('aulas').update(row).eq('id',id));
      else id = err(await sb.from('aulas').insert(row).select('id').single()).id;
      err(await sb.from('aulas_conteudo').upsert({aula_id:id,video_url:c.video_url,audio_url:c.audio_url||null}));
      err(await sb.from('aulas_apostila').upsert({aula_id:id,pdf_url:c.pdf_url}));
      return id;
    },
    async delAula(id){ err(await sb.from('aulas').delete().eq('id',id)) }
  };
}
function traduz(m){
  const t = {
    'Invalid login credentials':'E-mail ou senha incorretos.',
    'Email not confirmed':'Confirme o seu e-mail pelo link que enviamos antes de entrar.',
    'User already registered':'Este e-mail já está cadastrado.',
    'Password should be at least 6 characters.':'A senha deve ter pelo menos 6 caracteres.'
  };
  return t[m] || m;
}

/* =====================================================================
   BACKEND DE DEMONSTRAÇÃO (somente neste navegador)
   ===================================================================== */
const PREVIA_B1 = `“Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar, que maneja bem a palavra da verdade.” (2 Timóteo 2.15)

Paulo escreve a Timóteo, jovem pastor em Éfeso, cercado de homens que se desviavam da verdade e pervertiam a fé de alguns (2 Timóteo 2.16-18). Diante disso, o apóstolo não manda Timóteo improvisar: manda-o manejar bem a Palavra. A expressão traduzida por “maneja bem” traz a ideia de cortar em linha reta, de traçar um caminho direito — ensinar a verdade sem torcê-la para nenhum lado.

Aplicação: estudar teologia não é luxo de poucos; é responsabilidade de quem foi chamado a servir. Quem ama a Deus deseja conhecê-lo como Ele se revelou, e quem ensina precisa ensinar com fidelidade. O púlpito não é lugar de achismo: é lugar de Palavra bem manejada.

Na aula completa você vai estudar por que todo cristão faz teologia, os perigos da ignorância bíblica, o exemplo dos bereanos (Atos 17.11) e o preparo para responder com mansidão a quem pede a razão da nossa esperança (1 Pedro 3.15).`;
function DemoBackend(){
  const KEY='etu_demo_v14'; let mem=null; const listeners=[];
  const uid=()=>Math.random().toString(36).slice(2,10);
  function seed(){
    const adm={id:'adm',email:'7094a824cd68673e@invalido',pw:'438fd2a50dfea1d8aa7f8dcc2ecc19e5',nome:'Pr. Charlei de Jesus Lima Dias',telefone:'',is_admin:true,bloqueado:false,criado_em:'2026-11-01'};
    const alu={id:'a1',email:'4364e8f11a399749@invalido',pw:'cb16f3d3474de27bbcd178ee95c46e1f',nome:'Aluno de Demonstração',telefone:'(00) 0 0000-0000',interesse:'basico',is_admin:false,bloqueado:false,criado_em:'2026-11-05'};
    const aulas=[
      {id:'b1',curso_id:'basico',modulo:'Introdução à Teologia',ordem:1,titulo:'Por que estudar teologia?',descricao:'A importância do estudo sério das Escrituras para todo cristão e para o obreiro.',previa:true},
      {id:'b2',curso_id:'basico',modulo:'Introdução à Teologia',ordem:2,titulo:'Mitos e verdades sobre o estudo da teologia',descricao:'Respostas bíblicas às objeções mais comuns contra o estudo teológico.',previa:false},
      {id:'b3',curso_id:'basico',modulo:'Introdução à Teologia',ordem:3,titulo:'O que é teologia',descricao:'O sentido da palavra, as áreas da teologia e o seu lugar na vida da Igreja.',previa:false},
      {id:'b4',curso_id:'basico',modulo:'Introdução à Teologia',ordem:4,titulo:'A Teologia Sistemática',descricao:'Como as doutrinas bíblicas são organizadas e estudadas.',previa:false}
    ];
    const conteudo=aulas.map(a=>({aula_id:a.id,video_url:'',pdf_url:'https://drive.google.com/file/d/1d-vKMNuG4fGW0ktu3URdR0oGnyxihmkr/view'}));
    aulas.forEach(a=>{a.horas=2;a.disc_ordem=1});
    aulas[0].previa_texto=PREVIA_B1; aulas[0].apostila_amostra=true;
    const questoes=[
      {id:'q1',aula_id:'b1',ordem:1,enunciado:'Segundo 2 Timóteo 2.15, como o obreiro deve manejar a palavra da verdade?',alternativas:['Com pressa, para alcançar mais pessoas','Bem, procurando apresentar-se a Deus aprovado','Apenas pela tradição recebida dos pais','Somente com base em experiências pessoais','Sem necessidade de estudo, apenas pela inspiração do momento'],correta:1},
      {id:'q2',aula_id:'b1',ordem:2,enunciado:'Qual atitude os bereanos tiveram diante da pregação de Paulo (Atos 17.11)?',alternativas:['Rejeitaram a mensagem sem ouvir','Aceitaram tudo sem examinar','Examinavam cada dia nas Escrituras se as coisas eram assim','Pediram sinais antes de crer','Consultaram os filósofos de Atenas'],correta:2},
      {id:'q3',aula_id:'b1',ordem:3,enunciado:'De acordo com 1 Pedro 3.15, o cristão deve estar sempre preparado para:',alternativas:['Discutir com ira contra os que discordam','Evitar qualquer pergunta sobre a fé','Responder com mansidão e temor a todo aquele que pedir a razão da sua esperança','Impor a fé pela força','Responder apenas aos líderes religiosos'],correta:2}
    ];
    const mural=[
      {id:'m1',tipo:'Aviso',titulo:'Matrículas abertas para o Curso Básico de Teologia',texto:'Inscreva-se, assista à aula grátis e matricule-se via Pix para liberar o curso completo.',video_url:'',criado_em:'2026-11-07'}
    ];
    return {estudos:ESTUDOS_PADRAO.map(e=>({...e})),disciplinas:DISC_PADRAO.map(d=>({...d})),cursos:CURSOS.map(c=>({...c,ativo:c.ativo!==false})),users:[adm,alu],session:null,aulas,conteudo,questoes,mural,tentativas:[],matriculas:[{user_id:'a1',curso_id:'basico',status:'ativo',expira_em:'2027-11-07'}],progresso:[]};
  }
  function load(){ if(mem) return mem; try{ mem=JSON.parse(localStorage.getItem(KEY)) }catch(e){} if(!mem) mem=seed(); return mem }
  function save(){ try{ localStorage.setItem(KEY,JSON.stringify(mem)) }catch(e){} }
  const db=load();
  const me=()=>db.users.find(u=>u.id===db.session);
  const pub=u=>u?{id:u.id,email:u.email}:null;
  const fire=(ev)=>listeners.forEach(f=>f(ev,pub(me())));
  return {
    demo:true,
    onAuth(cb){listeners.push(cb)},
    async session(){return pub(me())},
    async signIn(email,pw){const u=db.users.find(u=>u.email.toLowerCase()===email.toLowerCase());if(!u||u.pw!==pw)throw new Error('E-mail ou senha incorretos.');db.session=u.id;save();fire('SIGNED_IN')},
    async signUp(nome,tel,email,pw,interesse){if(db.users.some(u=>u.email.toLowerCase()===email.toLowerCase()))throw new Error('Este e-mail já está cadastrado.');const u={id:uid(),email,pw,nome,telefone:tel,interesse,is_admin:false,bloqueado:false,criado_em:today()};db.users.push(u);db.session=u.id;save();fire('SIGNED_IN')},
    async signOut(){db.session=null;save();fire('SIGNED_OUT')},
    async forgot(email){const u=db.users.find(u=>u.email.toLowerCase()===email.toLowerCase());db.recovery=u?u.id:null;save()},
    async newPassword(pw){const id=db.session||db.recovery;const u=db.users.find(u=>u.id===id);if(!u)throw new Error('Link de redefinição inválido ou expirado.');u.pw=pw;db.recovery=null;save()},
    simulateRecovery(){ if(db.recovery){ return true } return false },
    async profile(id){const u=db.users.find(u=>u.id===id);return u?{...u}:null},
    async aulas(){return db.aulas.slice().sort((a,b)=>(a.disc_ordem||1)-(b.disc_ordem||1)||a.ordem-b.ordem)},
    async cursos(){return (db.cursos||[]).map(c=>({...c}))},
    async disciplinas(){return (db.disciplinas||DISC_PADRAO).map(d=>({...d}))},
    async enviarArquivo(){ throw new Error('No modo demonstração os arquivos não são guardados. Com a plataforma ativada (Supabase), o PDF fica armazenado na própria plataforma.') },
    async listarArquivos(){ return [] },
    async linkArquivo(){ return '' },
    async estudos(){return (db.estudos||ESTUDOS_PADRAO).map(e=>({...e})).sort((a,b)=>a.ordem-b.ordem)},
    async saveEstudo(e){db.estudos=db.estudos||ESTUDOS_PADRAO.map(x=>({...x}));if(e.id)Object.assign(db.estudos.find(x=>x.id===e.id),e);else db.estudos.push({...e,id:uid()});save()},
    async delEstudo(id){db.estudos=(db.estudos||ESTUDOS_PADRAO.slice()).filter(x=>x.id!==id);save()},
    async saveDisciplinas(cid,list){db.disciplinas=(db.disciplinas||DISC_PADRAO.slice()).filter(d=>d.curso_id!==cid).concat(list.map((d,i)=>({curso_id:cid,ordem:i+1,nome:d.nome,descricao:d.descricao||''})));save()},
    async saveCurso(c,novo){db.cursos=db.cursos||[];if(novo){if(db.cursos.some(x=>x.id===c.id))throw new Error('Já existe um curso com esse nome.');db.cursos.push({...c})}else Object.assign(db.cursos.find(x=>x.id===c.id),c);save()},
    async conteudo(id){const a=db.aulas.find(x=>x.id===id);const u=me();const p=u&&db.users.find(x=>x.id===u.id);
      const ok=a&&(a.previa||(p&&p.is_admin)||(p&&!p.bloqueado&&db.matriculas.some(m=>m.user_id===p.id&&m.curso_id===a.curso_id&&m.status==='ativo'&&vigente(m.expira_em))));
      if(!ok) return null; const c=db.conteudo.find(c=>c.aula_id===id)||{aula_id:id};
      const full=(p&&p.is_admin)||(p&&!p.bloqueado&&db.matriculas.some(m=>m.user_id===p.id&&m.curso_id===a.curso_id&&m.status==='ativo'&&vigente(m.expira_em)));
      return {...c, pdf_url: (full||a.apostila_amostra)?c.pdf_url:''}},
    async enviarComprovante(cid,valor,arq){const u=me();if(!u)throw new Error('Entre na sua conta.');db.comprovantes=db.comprovantes||[];
      db.comprovantes.unshift({id:uid(),user_id:u.id,curso_id:cid,valor,arquivo:arq,status:'pendente',criado_em:new Date().toISOString()});
      let dias=0;const d=CONFIG.LIBERACAO_PROVISORIA_DIAS;const m=db.matriculas.find(x=>x.user_id===u.id&&x.curso_id===cid);
      const ativo=m&&m.status==='ativo'&&vigente(m.expira_em);
      if(d>0&&!ativo){const x=new Date();x.setDate(x.getDate()+d);const e=x.toISOString().slice(0,10);if(m){m.status='ativo';m.expira_em=e;m.provisoria=true}else db.matriculas.push({user_id:u.id,curso_id:cid,status:'ativo',expira_em:e,provisoria:true});dias=d}
      save();return {dias}},
    async meusComprovantes(id){return (db.comprovantes||[]).filter(c=>c.user_id===id).map(({arquivo,...c})=>c)},
    async comprovantes(){return (db.comprovantes||[]).map(({arquivo,...c})=>c)},
    async comprovanteArquivo(id){return (db.comprovantes||[]).find(c=>c.id===id)?.arquivo},
    async decidirComprovante(id,ok,exp,obs){const c=db.comprovantes.find(x=>x.id===id);c.status=ok?'aprovado':'recusado';c.obs=obs||null;
      const m=db.matriculas.find(x=>x.user_id===c.user_id&&x.curso_id===c.curso_id);
      if(ok){if(m){m.status='ativo';m.expira_em=exp||null;m.provisoria=false}else db.matriculas.push({user_id:c.user_id,curso_id:c.curso_id,status:'ativo',expira_em:exp||null})}
      else if(m&&m.provisoria){db.matriculas=db.matriculas.filter(x=>x!==m)}
      save()},
    async salvarFoto(d){const u=me();if(!u)throw new Error('Entre na sua conta.');db.users.find(x=>x.id===u.id).foto=d;save()},
    async minhasMatriculas(id){return db.matriculas.filter(m=>m.user_id===id)},
    async progresso(id){return db.progresso.filter(p=>p.user_id===id).map(p=>p.aula_id)},
    async marcar(u,a,f){db.progresso=db.progresso.filter(p=>!(p.user_id===u&&p.aula_id===a));if(f)db.progresso.push({user_id:u,aula_id:a});save()},
    async alunos(){return db.users.slice().reverse().map(u=>({...u,matriculas:db.matriculas.filter(m=>m.user_id===u.id)}))},
    async setMatricula(u,c,s,e){const m=db.matriculas.find(m=>m.user_id===u&&m.curso_id===c);if(m){m.status=s;m.expira_em=e||null}else db.matriculas.push({user_id:u,curso_id:c,status:s,expira_em:e||null});save()},
    async delMatricula(u,c){db.matriculas=db.matriculas.filter(m=>!(m.user_id===u&&m.curso_id===c));save()},
    async setBloqueio(u,b){db.users.find(x=>x.id===u).bloqueado=b;save()},
    async saveAula(a,c){let id=a.id;if(id){Object.assign(db.aulas.find(x=>x.id===id),a)}else{id=uid();db.aulas.push({...a,id})}
      const k=db.conteudo.find(x=>x.aula_id===id);if(k)Object.assign(k,c);else db.conteudo.push({aula_id:id,...c});save();return id},
    async questoes(aid){return db.questoes.filter(q=>q.aula_id===aid).sort((a,b)=>a.ordem-b.ordem).map(({correta,explicacao,...q})=>q)},
    async questoesAdmin(aid){return db.questoes.filter(q=>q.aula_id===aid).sort((a,b)=>a.ordem-b.ordem).map(q=>({...q}))},
    async saveQuestoes(aid,list){db.questoes=db.questoes.filter(q=>q.aula_id!==aid).concat(list.map((q,i)=>({id:uid(),aula_id:aid,ordem:i+1,enunciado:q.enunciado,alternativas:q.alternativas,correta:q.correta,explicacao:q.explicacao||''})));save()},
    async corrigir(aid,resp){const u=me();if(!u)throw new Error('Entre na sua conta para fazer a prova.');
      const au=db.aulas.find(x=>x.id===aid);const pf=db.users.find(x=>x.id===u.id);
      const full=au&&((pf.is_admin)||(!pf.bloqueado&&db.matriculas.some(m=>m.user_id===pf.id&&m.curso_id===au.curso_id&&m.status==='ativo'&&vigente(m.expira_em))));
      if(!full)throw new Error('A prova é liberada após a matrícula.');
      const qs=db.questoes.filter(q=>q.aula_id===aid);const resultado={};let ac=0;
      const gabarito={},explic={};qs.forEach(q=>{const ok=Number(resp[q.id])===q.correta;resultado[q.id]=ok;gabarito[q.id]=q.correta;explic[q.id]=q.explicacao||'';if(ok)ac++});
      const nota=qs.length?Math.round(ac*100/qs.length):0;const aprovado=nota>=CONFIG.NOTA_MINIMA;
      db.tentativas.push({user_id:u.id,aula_id:aid,nota,aprovado,criado_em:today()});
      if(aprovado&&!db.progresso.some(p=>p.user_id===u.id&&p.aula_id===aid))db.progresso.push({user_id:u.id,aula_id:aid});
      save();return {nota,aprovado,resultado,gabarito,explicacao:explic}},
    async tentativas(id){return db.tentativas.filter(t=>t.user_id===id)},
    async tentativasTodas(){return db.tentativas.slice()},
    async todosProgressos(){return db.progresso.slice()},
    async mural(){return db.mural.slice()},
    async registrarDoc(tipo,cid){ const L=JSON.parse(localStorage.getItem('etu_docs')||'[]'); const cod='ETU-'+(S.user.id||'').replace(/-/g,'').slice(0,6).toUpperCase()+'-'+cid.toUpperCase().slice(0,3);
      if(!L.some(x=>x.codigo===cod&&x.tipo===tipo)){ L.push({codigo:cod,tipo,nome:S.profile?.nome||'',curso:curso(cid)?.titulo||cid,emitido_em:today(),situacao:'válido'}); localStorage.setItem('etu_docs',JSON.stringify(L)) } return cod },
    async validarDoc(cod){ if(VITRINE) throw new Error('A validação de documentos funciona quando a plataforma estiver ligada ao banco de dados da escola. Enquanto isso, confirme pelo WhatsApp oficial.'); return JSON.parse(localStorage.getItem('etu_docs')||'[]').filter(x=>x.codigo===cod) },
    async nota(aid){ try{ return (JSON.parse(localStorage.getItem('etu_notas_'+(S.user?.id||'x'))||'{}'))[aid]||'' }catch(e){ return '' } },
    async salvarNota(aid,t){ const k='etu_notas_'+(S.user?.id||'x'); const o=JSON.parse(localStorage.getItem(k)||'{}'); o[aid]=t; localStorage.setItem(k,JSON.stringify(o)) },
    async canais(){ if(VITRINE) return CANAIS_PADRAO; try{ return JSON.parse(localStorage.getItem('etu_canais')||'null')||CANAIS_PADRAO }catch(e){ return CANAIS_PADRAO } },
    async salvarCanal(c){ const L=(await this.canais()).slice(); L.push({id:uid(),...c}); localStorage.setItem('etu_canais',JSON.stringify(L)) },
    async apagarCanal(id){ const L=(await this.canais()).filter(x=>String(x.id)!==String(id)); localStorage.setItem('etu_canais',JSON.stringify(L)) },
    async perguntarDirecao(){ return {resposta:'O Assistente da Direção responde com inteligência completa quando a plataforma estiver ligada ao banco de dados e à chave do assistente. Tudo já está preparado: falta apenas a ativação.'} },
    async lancamentos(){ try{return JSON.parse(localStorage.getItem('etu_caixa')||'[]')}catch(e){return []} },
    async salvarLancamento(l){ const L=await this.lancamentos(); L.unshift({id:uid(),criado_em:new Date().toISOString(),...l}); localStorage.setItem('etu_caixa',JSON.stringify(L)) },
    async apagarLancamento(id){ const L=(await this.lancamentos()).filter(x=>x.id!==id); localStorage.setItem('etu_caixa',JSON.stringify(L)) },
    async perguntarContador(){ return {resposta:'A assessoria virtual ainda aguarda a conexão com o banco de dados e a ativação do serviço de inteligência artificial. Sua pergunta não foi enviada a um modelo de IA. Os manuais e as opções podem ser preparados antes da ativação.'} },
    async atualizarConta(d){ const u=me(); if(!u) throw new Error('Entre novamente.'); if(u.pw!==d.atual) throw new Error('A senha atual não confere.');
      if(d.email && db.users.some(x=>x.id!==u.id && x.email.toLowerCase()===d.email.toLowerCase())) throw new Error('Este e-mail já é usado por outra conta. A conta da Direção precisa de um e-mail só dela.');
      if(d.email) u.email=d.email; if(d.pw) u.pw=d.pw; if(d.nome) u.nome=d.nome; if(d.telefone!==undefined&&d.telefone!==null) u.telefone=d.telefone; save(); return '' },
    async mensagens(sala){ try{ return JSON.parse(localStorage.getItem('etu_chat_'+sala)||'[]').filter(m=>!m.apagada) }catch(e){ return [] } },
    async enviarMensagem(sala,texto){ if(VITRINE) throw new Error('A comunidade abre quando a plataforma estiver ligada ao banco de dados da escola.'); const k='etu_chat_'+sala, L=JSON.parse(localStorage.getItem(k)||'[]'); L.push({id:uid(),sala,user_id:S.user?.id,nome:S.profile?.nome||'Aluno',is_direcao:!!S.profile?.is_admin,texto,criado_em:new Date().toISOString()}); localStorage.setItem(k,JSON.stringify(L.slice(-200))) },
    async apagarMensagem(id){ for(const k of Object.keys(localStorage).filter(k=>k.startsWith('etu_chat_'))){ const L=JSON.parse(localStorage.getItem(k)||'[]'); L.forEach(m=>{ if(m.id===id) m.apagada=true }); localStorage.setItem(k,JSON.stringify(L)) } },
    ouvirMensagens(){ return ()=>{} },
    async escolaConfig(){ try{return JSON.parse(localStorage.getItem('etu_escola')||'null')}catch(e){return null} },
    async saveEscolaConfig(c){ try{localStorage.setItem('etu_escola',JSON.stringify(c))}catch(e){} },
    async aiPublico(){ const c=demoAi(); return {ativo:c.ativo,nome:c.nome,publico:c.publico,foto:c.foto||''} },
    async aiConfig(){ return demoAi() },
    async saveAiConfig(c){ try{localStorage.setItem('etu_ai_cfg',JSON.stringify({...demoAi(),...c}))}catch(e){ throw new Error('Não foi possível guardar a configuração. Exporte os manuais e reduza o tamanho da foto.') } },
    async aiLog(){ return [] },
    async perguntar(msgs){ return {resposta:faqResposta(msgs[msgs.length-1].content,!VITRINE)} },
    async abrirAtendimento(a){ const L=demoAt(); L.unshift({...a,id:uid(),status:'aberto',criado_em:new Date().toISOString(),user_id:db.session}); try{localStorage.setItem('etu_atend',JSON.stringify(L))}catch(e){} },
    async atendimentos(){ return demoAt() },
    async apagarAtendimento(id){ try{localStorage.setItem('etu_atend',JSON.stringify(demoAt().filter(x=>x.id!==id)))}catch(e){} },
    async apagarAiLog(){},
    async salvarAtendimento(id,c){ const L=demoAt(); Object.assign(L.find(x=>x.id===id)||{},c); try{localStorage.setItem('etu_atend',JSON.stringify(L))}catch(e){} },
    async saveMural(m){if(m.id)Object.assign(db.mural.find(x=>x.id===m.id),m);else db.mural.unshift({...m,id:uid(),criado_em:today()});save()},
    async delMural(id){db.mural=db.mural.filter(m=>m.id!==id);save()},
    async delAula(id){db.questoes=db.questoes.filter(q=>q.aula_id!==id);db.aulas=db.aulas.filter(a=>a.id!==id);db.conteudo=db.conteudo.filter(c=>c.aula_id!==id);db.progresso=db.progresso.filter(p=>p.aula_id!==id);save()},
    reset(){mem=seed();Object.assign(db,mem);save()}
  };
}

/* =====================================================================
   APLICAÇÃO
   ===================================================================== */
Object.assign(CONFIG, window.ETU_CONFIG || {});
if(CONFIG.SUPABASE_URL && CONFIG.SUPABASE_ANON_KEY && !window.supabase) { document.body.insertAdjacentHTML('afterbegin','<p role="alert" class="msg err">Não foi possível carregar a conexão segura. Confira a internet e recarregue a página.</p>'); throw new Error('Conexão de autenticação indisponível'); }
const API = (CONFIG.SUPABASE_URL && CONFIG.SUPABASE_ANON_KEY) ? SupaBackend() : DemoBackend();
// Publicada na internet sem o banco de dados ativado: funciona como "vitrine" (cursos, aula grátis, Pix e WhatsApp),
// sem contas de demonstração. A área do aluno é ativada quando o CONFIG do Supabase é preenchido.
const VITRINE = API.demo && /^https?:$/.test(location.protocol) && EMBED_OK;
const S = { estudos:[], discs:[], user:null, profile:null, aulas:[], mats:[], prog:[], tent:[], mural:[], curso:null, aula:null, alunos:[] };
let recovering = false;

function addDias(d,n){ const x=new Date(d+'T12:00:00'); x.setDate(x.getDate()+n); return x.toISOString().slice(0,10) }
function vigente(e){ return !e || addDias(e, +CONFIG.TOLERANCIA_DIAS||0) >= today() }
function isActive(m){ return m && m.status==='ativo' && vigente(m.expira_em) }
function diasEntre(a,b){ return Math.round((new Date(b+'T12:00:00')-new Date(a+'T12:00:00'))/864e5) }
function avisoMensalidade(m,titulo){
  if(!m || m.status!=='ativo' || !m.expira_em || S.profile?.is_admin) return '';
  const hoje=today(), venc=m.expira_em, limite=addDias(venc,+CONFIG.TOLERANCIA_DIAS||0), wa=WA('A paz do Senhor! Sou '+(S.profile?.nome||'')+'. Segue o comprovante da mensalidade do '+titulo+'.');
  const botoes=`<div class="res" style="margin-top:10px"><a class="btn btn-gold btn-sm" href="#matricula">Enviar comprovante</a><a class="btn btn-line btn-sm" href="${wa}" target="_blank" rel="noopener">Falar com a direção</a></div>`;
  if(hoje<=venc){ const d=diasEntre(hoje,venc); if(d>(+CONFIG.AVISO_DIAS||0)) return '';
    return `<div class="aviso-pag lembrete"><b>Lembrete do seu compromisso — ${esc(titulo)}</b><p>A sua mensalidade vence ${d===0?'<b>hoje</b>':`em <b>${d} dia${d>1?'s':''}</b>`} (${fmtDate(venc)}). Faça o Pix para a chave ${esc(CONFIG.PIX_CHAVE)} e envie o comprovante para continuar estudando sem interrupção.</p>${botoes}</div>` }
  if(hoje<=limite){ const d=diasEntre(hoje,limite);
    return `<div class="aviso-pag atraso"><b>Mensalidade em aberto — ${esc(titulo)}</b><p>A mensalidade venceu em ${fmtDate(venc)}. Você está no prazo de tolerância: as aulas continuam liberadas até <b>${fmtDate(limite)}</b>${d?` (${d} dia${d>1?'s':''})`:' (último dia)'}. Depois dessa data o acesso será bloqueado automaticamente até a regularização.</p>${botoes}</div>` }
  return `<div class="aviso-pag bloq"><b>Acesso suspenso — ${esc(titulo)}</b><p>A mensalidade venceu em ${fmtDate(venc)} e o prazo de tolerância terminou em ${fmtDate(limite)}. Envie o comprovante: assim que a direção confirmar, as aulas voltam a ser liberadas, com todo o seu progresso guardado.</p>${botoes}</div>` }
function hasAccess(cid){ if(S.profile?.is_admin) return true; if(curso(cid)?.em_breve===true) return false; if(!S.profile || S.profile.bloqueado) return false; return isActive(S.mats.find(m=>m.curso_id===cid)) }

let escolaCfgOk=false;
async function refreshUser(){
  if(!escolaCfgOk){ escolaCfgOk=true; try{ const c=await API.escolaConfig(); if(c){ if(c.tolerancia_dias!=null) CONFIG.TOLERANCIA_DIAS=+c.tolerancia_dias; if(c.aviso_dias!=null) CONFIG.AVISO_DIAS=+c.aviso_dias; if(c.nota_minima!=null) CONFIG.NOTA_MINIMA=+c.nota_minima; if(c.video_destaque) CONFIG.VIDEO_DESTAQUE=c.video_destaque; if(c.video_titulo) CONFIG.VIDEO_TITULO=c.video_titulo; drawVideoDiretor() } }catch(e){} }
  S.user = await API.session();
  S.profile = S.user ? await API.profile(S.user.id) : null;
  S.mats = S.user ? await API.minhasMatriculas(S.user.id) : [];
  S.prog = S.user ? await API.progresso(S.user.id) : [];
  S.tent = S.user ? await API.tentativas(S.user.id) : [];
  await atualizarDocumentosPessoais();
  try{ const cs = await API.cursos(); if(cs && cs.length) CURSOS = cs }catch(e){}
  try{ S.discs = await API.disciplinas() }catch(e){ S.discs = DISC_PADRAO }
  try{ S.estudos = await API.estudos() }catch(e){ S.estudos = ESTUDOS_PADRAO }
  fillSelects();
  S.aulas = await API.aulas();
  try{ S.mural = await API.mural() }catch(e){ S.mural = [] }
  renderTicker();
  const inn = !!S.user, adm = !!S.profile?.is_admin;
  $$('.when-in').forEach(e=>e.classList.toggle('hidden',!inn));
  $$('.when-out').forEach(e=>e.classList.toggle('hidden',inn));
  $$('.when-admin').forEach(e=>e.classList.toggle('hidden',!adm));
}

/* ---------- roteamento ---------- */
const PRIVATE = ['aluno','admin','documento'];
async function route(){
  let h = location.hash.replace('#','');
  if(h.includes('access_token') || h.includes('type=recovery')) return; // retorno do e-mail de redefinição: tratado pelo Supabase
  if(!h) h='inicio';
  if(h==='sair'){ await API.signOut(); await refreshUser(); location.hash='inicio'; return }
  let view = h, cid = null;
  if(h.startsWith('validar-')){ S.codValidar=h.slice(8); location.hash='validar'; return }
  if(h==='compartilhar'){ location.hash='inicio'; setTimeout(()=>document.querySelector('.compartilhe')?.scrollIntoView({behavior:'smooth'}),500); return }
  if(h==='ajuda'){ location.hash='mais'; setTimeout(()=>aiAbrir(),500); return }
  if(h==='instalar'){ location.hash='mais'; setTimeout(instalarApp,300); return }
  if(h.startsWith('curso-')){ view='curso'; cid=h.slice(6) }
  let doc=null;
  if(h.startsWith('certificado-')){ view='documento'; doc='certificado'; cid=h.slice(12) }
  if(h.startsWith('carteira-')){ view='documento'; doc='carteira'; cid=h.slice(9) }
  if(VITRINE && view==='entrar'){ location.hash='matricula'; setTimeout(()=>alert('Esta versão ainda aguarda a ativação das contas. Fale com a direção para saber quando as matrículas estarão disponíveis.'),300); return }
  if(VITRINE && ['entrar','cadastro','esqueci','nova-senha','direcao','aluno','admin','documento'].includes(view)){ location.hash='matricula'; return }
  if(PRIVATE.includes(view) && !S.user){ location.hash='entrar'; return }
  if(view==='admin' && !S.profile?.is_admin){ location.hash='aluno'; return }
  if(view==='cadastro' && S.user){ location.hash = S.profile?.is_admin ? 'admin' : 'aluno'; return }
  if(view==='direcao' && S.user){ location.hash = S.profile?.is_admin ? 'admin' : 'aluno'; return }
  if(view==='entrar' && S.user){ location.hash = S.profile?.is_admin ? 'admin' : 'aluno'; return }
  $$('[data-view]').forEach(v=>v.classList.toggle('hidden', v.dataset.view!==view));
  if(!$$('[data-view]').some(v=>v.dataset.view===view)){ location.hash='inicio'; return }
  $$('nav.main a').forEach(a=>a.classList.toggle('on', a.dataset.nav===view || (view==='curso'&&a.dataset.nav==='aluno')));
  $('#mainNav').classList.remove('open');
  window.scrollTo(0,0);
  if(view==='inicio'){ renderMural(); renderHomeCursos() }
  if(view==='matricula') waEnroll();
  if(view==='cursos') renderCursos();
  if(view==='aluno') renderAluno();
  if(view==='curso'){ S.disc=S.pendDisc||null; S.aula=S.pendAula||null; S.pendDisc=S.pendAula=null; S.discCurso=cid; openCurso(cid); if(S.disc) setTimeout(()=>$('#coursePlayer').scrollIntoView({behavior:'smooth'}),150) }
  if(view==='videoaulas') renderVideoaulas();
  if(view==='estudos') renderEstudos();
  if(view==='verificar') drawVerificar();
  if(view==='validar') drawValidar();
  if(view==='idioma') drawIdioma();
  if(view==='comunidade') drawComunidade();
  if(view==='mais') $$('.mais .when-in').forEach(e=>e.style.display=S.user?'':'none');
  if(view==='aluno') drawPerfil();
  if(view==='busca'){ setTimeout(()=>$('#bsIn').focus(),100); buscar() }
  if(view==='inicio') drawPrateleiras();
  marcaTab(view);
  if(S._ultView!==view){ S._ultView=view; topo() }
  if(view==='depoimentos') renderDepoimentos();
  if(view==='documento') renderDoc(doc, cid);
  if(view==='previa') renderPrevia();
  if(view==='admin') renderAdmin();
  if(view==='nova-senha' && !S.user && !recovering && !(API.demo && API.simulateRecovery())){
    show($('#mNew'),'Abra esta página pelo link enviado ao seu e-mail.','info');
  }
}

/* ---------- cursos ---------- */
function ofereceCertificado(c){ return !!c && c.oferece_certificado!==false }
function courseCard(c, mode){
  const n = lessonsOf(c.id).length;
  const m = S.mats.find(x=>x.curso_id===c.id);
  const head = c.tipo==='extra' ? capaHTML(c) : `<div class="head"><div class="lvl">${esc((c.cat||'').toUpperCase())}</div><h3>${esc(c.titulo)}</h3><div class="stars">${star(c.nivel||0)}</div></div>`;
  const title = c.tipo==='extra' && c.capa ? `<h3 class="cz" style="font-size:17px;color:var(--navy)">${esc(c.titulo)}</h3>` : '';
  const certificado=ofereceCertificado(c)?'<p class="meta"><b>Com certificado após a conclusão</b></p>':'';
  if(c.em_breve===true) return `<article class="course">${head}<div class="body">${title}<span class="pill lock">EM BREVE</span><p>${esc(c.desc||'')}</p>${certificado}<p class="meta">Este curso está em preparação. Acompanhe os avisos da escola para saber quando começar.</p><a class="btn btn-line btn-sm" href="#curso-${esc(c.id)}">Conhecer o curso</a></div></article>`;
  if(mode==='aluno'){
    const ok = hasAccess(c.id);
    const done = lessonsOf(c.id).filter(a=>S.prog.includes(a.id)).length;
    const pct = n ? Math.round(done*100/n) : 0;
    const pill = ok ? (m?.expira_em && m.expira_em<today() && !S.profile?.is_admin ? `<span class="pill lock">MENSALIDADE VENCIDA · TOLERÂNCIA ATÉ ${fmtDate(addDias(m.expira_em,+CONFIG.TOLERANCIA_DIAS||0))}</span>` : `<span class="pill ok">ACESSO LIBERADO${m?.expira_em?' · ATÉ '+fmtDate(m.expira_em):''}</span>`) :
           m && m.status==='bloqueado' ? `<span class="pill off">ACESSO SUSPENSO</span>` :
           m && m.expira_em && m.expira_em < today() ? `<span class="pill off">ACESSO EXPIRADO</span>` : `<span class="pill lock">SOMENTE PRÉVIA</span>`;
    const acts = `<a class="btn btn-navy btn-sm" href="#curso-${c.id}">${ok?'Continuar estudando':'Ver disciplinas e aulas grátis'}</a>${ok?'':' <a class="btn btn-gold btn-sm" href="#matricula">Fazer matrícula</a>'}`;
    return `<article class="course">${head}<div class="body">${title}${pill}${certificado}${statsHTML(c.id)}<div class="progress" aria-label="Progresso ${pct}%"><i style="width:${pct}%"></i></div><div class="meta">${done} de ${n} aulas concluídas</div><div class="acts">${acts}</div></div></article>`;
  }
  let acts = `<a class="btn btn-navy btn-sm" href="#curso-${c.id}">${c.tipo==='extra'?'Ver as aulas':'Ver as disciplinas'}</a>`;
  if(!hasAccess(c.id)) acts += ` <a class="btn btn-gold btn-sm" href="#${S.user?'matricula':'cadastro'}">${S.user?'Matricular-se':'Inscrever-se'}</a>`;
  return `<article class="course">${head}
    <div class="body">${title}<p>${esc(c.desc||'')}</p>${certificado}${statsHTML(c.id)}<div class="meta">${n?'Conteúdo para matriculados: vídeo-aulas, apostilas e provas.':'Disciplinas e aulas em preparação.'}</div><div class="acts">${acts}</div></div></article>`;
}
function renderCursos(){
  $('#gridFormacao').innerHTML = ativosCursos().filter(c=>c.tipo!=='extra').map(c=>courseCard(c,'pub')).join('');
  const ex = ativosCursos().filter(c=>c.tipo==='extra');
  $('#extrasSec').classList.remove('hidden');
  $('#gridExtras').innerHTML = ex.map(c=>courseCard(c,'pub')).join('') || '<div class="panel"><h3>Novos cursos adicionais em breve</h3><p>Acompanhe aqui os próximos cursos da Escola Teológica União.</p></div>';
}
function renderHomeCursos(){ const el=$('#homeCursos'); if(el) el.innerHTML = ativosCursos().filter(c=>c.tipo!=='extra').map(c=>courseCard(c,'pub')).join('') }

/* ---------- área do aluno ---------- */
function renderAluno(){
  const p = S.profile || {};
  $('#helloName').textContent = 'Paz do Senhor, ' + (p.nome ? p.nome.split(' ')[0] : 'aluno') + '!';
  const ativos = CURSOS.filter(c=>hasAccess(c.id));
  let aviso = '';
  if(p.bloqueado) aviso = `<div class="msg err" style="margin:0 0 22px">O seu acesso está suspenso. Entre em contato com a direção da escola.</div>`;
  else if(!ativos.length && !p.is_admin) aviso = `<div class="pixbox" style="margin:0 0 24px"><h3>FALTA POUCO PARA LIBERAR O SEU CURSO</h3>
    <p style="margin:8px 0 0">Sua inscrição foi recebida e você já pode assistir às aulas grátis. Para ter acesso ao <b>curso completo</b> — vídeo-aulas, apostilas, provas, certificado e carteira de estudante — faça o pagamento da matrícula via Pix:</p>
    <div class="pixkey"><span>Chave Pix (telefone):</span><b>${esc(CONFIG.PIX_CHAVE)}</b></div>
    <p style="margin:0">Depois, envie o comprovante pelo WhatsApp. Assim que a direção confirmar o pagamento, o curso é liberado aqui na sua área.</p>
    <div class="res" style="margin-top:14px"><a class="btn btn-gold" href="#matricula">Fazer a matrícula</a><a class="btn btn-ghost" href="${WA('Olá! Sou '+(p.nome||'')+' ('+(S.user?.email||'')+'). Fiz o pagamento via Pix da matrícula. Segue o comprovante.')}" target="_blank" rel="noopener">Enviar comprovante</a></div></div>`;
  const avs = S.mats.map(m=>avisoMensalidade(m,curso(m.curso_id)?.titulo||m.curso_id)).join('');
  if(avs.includes('aviso-pag bloq') && !p.bloqueado) aviso = avs; else aviso += avs;
  $('#alunoAviso').innerHTML = aviso;
  const lista = p.is_admin ? ativosCursos() : ativosCursos().filter(c=>hasAccess(c.id) || S.mats.some(m=>m.curso_id===c.id) || c.id===p.interesse || S.aulas.some(a=>a.curso_id===c.id&&a.previa));
  $('#myCourses').innerHTML = lista.map(c=>courseCard(c,'aluno')).join('');
  $('#myAccount').innerHTML = `<b>${esc(p.nome||'')}</b><br>${esc(S.user?.email||'')}${p.telefone?'<br>'+esc(p.telefone):''}`;
  $('#myFoto').src = p.foto || BRASAO;
  const meus = CURSOS.filter(c=>S.mats.some(m=>m.curso_id===c.id));
  $('#myDocs').innerHTML = meus.map(c=>{
    const card=(S.carteirinhas||[]).find(x=>x.curso_id===c.id);
    const ok = hasAccess(c.id), l = lessonsOf(c.id), d = l.filter(x=>S.prog.includes(x.id)).length, fim = ok && l.length && d===l.length;
    return `<div class="doc"><h4>${esc(c.titulo)}</h4>
      <p>Carteirinha de estudante: ${card?'<b style="color:var(--ok)">PDF disponível</b>':'aguardando a preparação e o envio pela Direção'}</p>
      ${card?`<button class="btn btn-navy btn-sm" type="button" data-card-download="${esc(c.id)}">Baixar carteirinha em PDF</button>`:''}
      ${ofereceCertificado(c)?`<p style="margin-top:14px">Certificado: ${fim?'<b style="color:var(--ok)">curso concluído</b>':`${d} de ${l.length} aulas concluídas`}</p>
      ${fim?`<a class="btn btn-gold btn-sm" href="#certificado-${c.id}" data-baixar>Baixar certificado</a>`:`<button class="btn btn-line btn-sm" type="button" disabled>Certificado após concluir o curso</button>`}`:''}</div>`}).join('') || `<p style="margin:0">Os documentos aparecem aqui depois da matrícula.</p>`;
  $('#alunoAviso').insertAdjacentHTML('beforeend', meus.filter(c=>cursoConcluido(c.id)).map(certBar).join(''));
  renderMyPays();
  $('#waDepo').href = WA(`Olá! Sou ${p.nome||''}, aluno(a) da Escola Teológica União. Quero enviar o meu depoimento em vídeo e autorizo a publicação no mural da ETU.`);
}

/* ---------- player ---------- */
function lessonsOf(cid){ return S.aulas.filter(a=>a.curso_id===cid).sort((x,y)=>(x.disc_ordem||1)-(y.disc_ordem||1)||x.ordem-y.ordem) }
function discsOf(cid){
  const map=new Map();
  S.discs.filter(d=>d.curso_id===cid).sort((a,b)=>a.ordem-b.ordem).forEach(d=>map.set(d.ordem,{n:d.ordem,nome:d.nome,desc:d.descricao||'',aulas:[]}));
  lessonsOf(cid).forEach(a=>{const n=a.disc_ordem||1; if(!map.has(n)) map.set(n,{n,nome:a.modulo,desc:'',aulas:[]}); map.get(n).aulas.push(a)});
  return [...map.values()].sort((a,b)=>a.n-b.n);
}
function totais(cid){ const l=lessonsOf(cid); return {disc:discsOf(cid).length, aulas:l.length, horas:l.reduce((t,a)=>t+(+a.horas||0),0)} }
const fmtH = h => h ? String(+h.toFixed(1)).replace('.',',')+' h' : '—';
function ativosCursos(){ return CURSOS.filter(c=>c.ativo!==false).sort((a,b)=>(a.ordem||0)-(b.ordem||0)) }
function fillSelects(){
  const opt = l => l.map(c=>`<option value="${c.id}">${esc(c.titulo)}</option>`).join('');
  const keep = id => { const el=$(id); return el ? el.value : '' };
  // Inscrição e matrícula: os três níveis de formação; cursos extras só aparecem quando já têm aulas
  const matriculaveis = () => { const f=ativosCursos().filter(c=>c.tipo!=='extra' && !c.em_breve), x=ativosCursos().filter(c=>c.tipo==='extra' && !c.em_breve && lessonsOf(c.id).length);
    return `<optgroup label="Formação em Teologia">${opt(f)}</optgroup>${x.length?`<optgroup label="Cursos Extras">${opt(x)}</optgroup>`:''}` };
  ['#sCurso','#mCursoSel'].forEach(id=>{ const el=$(id); if(!el) return; const v=el.value; el.innerHTML=matriculaveis(); if(v && [...el.options].some(o=>o.value===v)) el.value=v });
  const ad=$('#aCursoSel'); if(ad){ const v=ad.value; ad.innerHTML=opt(CURSOS); if(v) ad.value=v }
}
function capaHTML(c, h=150){
  if(c.capa) return `<div style="height:${h}px;background:#0F1E3D url('${c.capa}') center/cover no-repeat;border-bottom:2px solid var(--gold)"></div>`;
  return `<div style="height:${h}px;background:radial-gradient(120% 120% at 30% 20%,#1E3463,#0F1E3D 70%);border-bottom:2px solid var(--gold);display:flex;align-items:center;gap:14px;padding:0 20px;overflow:hidden">
    <img src="${BRASAO}" alt="" style="height:${Math.round(h*.62)}px;flex:0 0 auto"><div><div class="cz" style="color:var(--gold2);font-size:11px;letter-spacing:.2em">CURSO EXTRA</div><div class="cz" style="color:#F7F1E3;font-size:17px;line-height:1.25;margin-top:4px">${esc(c.titulo)}</div></div></div>`;
}
function statsHTML(cid, dark){
  const t = totais(cid);
  const box = (n,l)=>`<div style="flex:1;text-align:center;padding:8px 4px;border:1px solid ${dark?'rgba(201,162,74,.5)':'#E1D4B2'};border-radius:8px;background:${dark?'rgba(255,255,255,.05)':'#fffaf0'}"><b class="cz" style="display:block;font-size:20px;color:${dark?'var(--gold2)':'var(--navy)'}">${n}</b><span style="font-size:13px;color:${dark?'#D9D0B8':'var(--muted)'}">${l}</span></div>`;
  return `<div style="display:flex;gap:8px">${box(t.disc||'—','disciplina'+(t.disc===1?'':'s'))}${box(t.aulas||'—','aula'+(t.aulas===1?'':'s'))}${box(t.horas?String(+t.horas.toFixed(1)).replace('.',','):'—','horas')}</div>`;
}
function sideHTML(list, cid, current, previewOnly){
  let html = `<h4>${previewOnly?'AULAS DE PRÉVIA':'CONTEÚDO DO CURSO'}</h4>`, mod=null;
  const ok = hasAccess(cid);
  list.forEach(a=>{
    const mk=(a.disc_ordem||1)+'|'+a.modulo;
    if(mk!==mod){ mod=mk; html += `<div class="mod">Disciplina ${a.disc_ordem||1} — ${esc(a.modulo)}</div>` }
    const open = a.previa || ok;
    const done = S.prog.includes(a.id);
    const ic = done ? '<svg class="ic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F6B45" stroke-width="2.4" aria-label="concluída"><path d="M4 12l5 5L20 6"/></svg>' :
      open ? '<svg class="ic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A8842F" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M10 8l6 4-6 4z" fill="#A8842F"/></svg>' :
      '<svg class="ic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a8f9c" stroke-width="2" aria-label="bloqueada"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
    html += `<button class="les ${current===a.id?'on':''}" data-aula="${a.id}">${ic}<span>${a.ordem}. ${esc(a.titulo)}${a.previa&&!ok?' <span class="pill ok" style="font-size:9px;padding:2px 6px">PRÉVIA</span>':''}</span></button>`;
  });
  if(!list.length) html += `<p style="padding:14px 16px;margin:0;color:var(--muted)">As aulas deste curso estão em preparação.</p>`;
  return html;
}
function driveDownload(url){ const m=(url||'').match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/); return m?`https://drive.google.com/uc?export=download&id=${m[1]}`:url }
function bestOf(aid){ const t=S.tent.filter(x=>x.aula_id===aid); if(!t.length) return null; return t.reduce((m,x)=>x.nota>m.nota?x:m) }
const LETRAS=['A','B','C','D','E'];
let FS=0;
function setFont(d){ FS=Math.max(0,Math.min(2,FS+d)); document.documentElement.classList.remove('fs1','fs2'); if(FS) document.documentElement.classList.add('fs'+FS); try{localStorage.setItem('etu_fs',FS)}catch(e){} }
function toggleNight(){ document.body.classList.toggle('night'); try{localStorage.setItem('etu_night',document.body.classList.contains('night')?'1':'')}catch(e){} }
try{ FS=+(localStorage.getItem('etu_fs')||0); if(FS) document.documentElement.classList.add('fs'+FS); if(localStorage.getItem('etu_night')) document.body.classList.add('night') }catch(e){}
function previaHTML(a){
  if(!a.previa_texto) return '';
  const parts = a.previa_texto.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
  const first = parts.shift();
  return `<div class="previa-box"><div class="k">${a.previa?'PRÉVIA GRATUITA':'LEITURA DA AULA'}</div><p class="verse">${esc(first)}</p>${parts.map(p=>`<p>${esc(p)}</p>`).join('')}</div>`;
}
function lockHTML(){
  return `<div class="lockbox"><h4>CURSO COMPLETO PARA ALUNOS MATRICULADOS</h4>
    <ul><li>Aula completa e apostila em PDF para ler e baixar</li><li>Prova da aula com resultado na hora</li><li>Progresso, carga horária e certificado ao concluir o curso</li><li>Carteira de estudante de curso livre</li></ul>
    <p style="margin:12px 0 0">Matrícula via Pix — chave (telefone): <b style="color:#fff">${esc(CONFIG.PIX_CHAVE)}</b></p>
    <div class="res" style="margin-top:12px"><a class="btn btn-gold btn-sm" href="#${S.user?'matricula':'cadastro'}">${S.user?'Fazer a matrícula':'Inscrever-se'}</a><a class="btn btn-ghost btn-sm" href="#matricula">Como funciona</a></div></div>`;
}
function videoBox(v, title, raw){
  if(!v) return `<div class="video"><div class="ph"><img src="${BRASAO}" alt=""><span class="cz">Vídeo em breve</span></div></div>`;
  if(/\.(mp4|webm|m4v|mov)(\?|$)|\/storage\/v1\/object\//i.test(v)) return `<div class="video"><video controls preload="metadata" playsinline controlslist="nodownload" src="${esc(v)}" style="width:100%;height:100%;background:#000"></video></div>`;
  if(!EMBED_OK) return `<div class="video"><div class="ph"><img src="${BRASAO}" alt=""><span>O vídeo é exibido aqui na plataforma publicada.</span><a class="btn btn-gold btn-sm" href="${esc(raw)}" target="_blank" rel="noopener">Assistir ao vídeo</a></div></div>`;
  return `<div class="video"><iframe src="${esc(v)}" title="${esc(title)}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
}
async function stageHTML(a, cid){
  if(!a) return {html:`<div class="video"><div class="ph"><img src="${BRASAO}" alt=""><span class="cz">Aulas em preparação</span></div></div>`};
  const full = hasAccess(cid);
  const readbar = `<div class="readbar" aria-label="Ajustes de leitura">Leitura: <button type="button" data-fs="-1" aria-label="Diminuir texto">A−</button><button type="button" data-fs="1" aria-label="Aumentar texto">A+</button><button type="button" data-night style="min-width:120px">${document.body.classList.contains('night')?'Modo claro':'Modo noturno'}</button></div>`;
  if(!full && !a.previa){
    return {html: readbar + `<div class="video"><div class="ph"><img src="${BRASAO}" alt=""><span class="cz" style="color:#E2C47A">AULA EXCLUSIVA PARA MATRICULADOS</span></div></div>
      <h3>${esc(a.titulo)}</h3><p class="desc">${esc(a.descricao||'')}</p>${lockHTML()}`};
  }
  const c = await API.conteudo(a.id) || {};
  if(!full){
    const amostra = c.pdf_url ? `<div class="previa-box" style="border-left-color:var(--ok)"><div class="k">APOSTILA DE AMOSTRA — GRÁTIS</div>
      <p style="margin-top:8px">Leia gratuitamente a apostila desta disciplina e conheça o padrão de ensino da Escola Teológica União.</p>
      <div class="res" style="margin-top:12px"><button type="button" class="btn btn-gold btn-sm" data-ler="${esc(c.pdf_url)}" data-tit="Apostila de amostra">Ler a apostila de amostra</button></div></div>
      ${EMBED_OK?`<div class="pdfbox"><iframe src="${esc(pdfEmbed(c.pdf_url))}" title="Apostila de amostra"></iframe></div>`:''}` : '';
    return {html: readbar + videoBox(toEmbed(c.video_url), a.titulo, c.video_url) +
      `<h3>${esc(a.titulo)}</h3><p class="desc">${esc(a.descricao||'')}</p>${previaHTML(a)}${amostra}${lockHTML()}`};
  }
  let qs = []; try{ qs = await API.questoes(a.id) }catch(e){}
  const pdf = pdfEmbed(c.pdf_url);
  const done = S.prog.includes(a.id);
  const best = bestOf(a.id);
  let quiz = '';
  if(qs.length){
    quiz = `<form class="quiz" id="quizForm" novalidate><h4>PROVA DA AULA</h4>
      <p class="info">${qs.length} quest${qs.length>1?'ões':'ão'} · nota mínima para aprovação: ${CONFIG.NOTA_MINIMA}% · você pode refazer quantas vezes precisar.${best?` Sua melhor nota: <b>${best.nota}%</b>${best.aprovado?' — aprovado.':'.'}`:''}</p>
      ${qs.map((q,i)=>`<fieldset class="q" data-q="${q.id}" style="border:0;padding:0;margin:18px 0 0"><legend class="en">${i+1}. ${esc(q.enunciado)}</legend>
        ${(q.alternativas||[]).map((t,j)=>`<label class="opt" style="font-family:inherit;letter-spacing:0;color:inherit;font-weight:400;font-size:16.5px;margin:8px 0 0"><input type="radio" name="q_${q.id}" value="${j}"><span class="lt">${LETRAS[j]}</span><span>${esc(t)}</span></label>`).join('')}
        <div class="fb"></div></fieldset>`).join('')}
      <div class="res" style="margin-top:18px"><button class="btn btn-navy" type="submit">Enviar respostas</button></div>
      <div id="quizScore"></div></form>`;
  }
  const html = readbar + videoBox(toEmbed(c.video_url), a.titulo, c.video_url) + `
    <h3>${esc(a.titulo)}</h3><p class="desc">${esc(a.descricao||'')}${a.horas?` <span class="pill lock" style="margin-left:6px">${a.horas} H</span>`:''}${done?' <span class="pill ok" style="margin-left:6px">AULA CONCLUÍDA</span>':''}</p>
    <div class="ferr" role="group" aria-label="Recursos da aula">
      ${c.pdf_url?`<a href="${esc(c.pdf_url)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M6 3h9l4 4v14H6zM9 12h7M9 16h7M9 8h3"/></svg>Apostila</a>`:`<button type="button" disabled style="opacity:.5"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M6 3h9l4 4v14H6z"/></svg>Apostila</button>`}
      <button type="button" data-audio ${c.audio_url?'':'disabled style="opacity:.5"'}><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v6H4zM17 14h3v6h-3z"/></svg>${c.audio_url?'Áudio':'Áudio em breve'}</button>
      <button type="button" data-lista><svg viewBox="0 0 24 24" aria-hidden="true"><path stroke="currentColor" stroke-width="2" d="M4 6h12M4 12h12M4 18h8M18 15l4 3-4 3z"/></svg>Aulas</button>
      <button type="button" data-notas><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M4 20h4L19 9l-4-4L4 16zM14 6l4 4"/></svg>Anotações</button>
    </div>
    <div id="audioBox" class="hidden" style="margin-top:12px">${c.audio_url?(/drive\.google\.com/.test(c.audio_url)?`<iframe src="${esc(pdfEmbed(c.audio_url))}" title="Áudio da aula" style="width:100%;height:90px;border:1px solid #E1D4B2;border-radius:8px"></iframe>`:`<audio controls preload="none" style="width:100%" src="${esc(c.audio_url)}"></audio>`):''}</div>
    ${previaHTML(a)}
    <div class="notas" id="notasBox"><h4>MINHAS ANOTAÇÕES DESTA AULA</h4><textarea id="notaTxt" rows="5" placeholder="Escreva aqui o que aprendeu, versículos e ideias para a pregação."></textarea>
      <div class="res" style="margin-top:8px"><button class="btn btn-navy btn-sm" type="button" id="notaSalvar">Salvar anotação</button><span id="notaOk" style="align-self:center;color:var(--ok);font-size:15px"></span></div></div>
    <div class="res" style="margin-top:16px">
      ${c.pdf_url?`<button type="button" class="btn btn-gold btn-sm" data-ler="${esc(c.pdf_url)}" data-tit="Apostila da aula">Ler a apostila</button><a class="btn btn-line btn-sm" href="${esc(driveDownload(c.pdf_url))}" target="_blank" rel="noopener">Baixar a apostila (PDF)</a>`:'<span class="pill lock">APOSTILA EM PREPARAÇÃO</span>'}
      ${c.video_url?`<a class="btn btn-line btn-sm" href="${esc(c.video_url)}" target="_blank" rel="noopener">Vídeo em tela cheia</a>`:''}
      ${!qs.length?`<button class="btn ${done?'btn-line':'btn-navy'} btn-sm" id="btnDone" type="button">${done?'Desmarcar conclusão':'Marcar aula como concluída'}</button>`:''}
    </div>
    ${pdf && EMBED_OK?`<div class="pdfbox"><iframe src="${esc(pdf)}" title="Apostila da aula"></iframe></div><p style="font-size:15px;color:var(--muted);margin:8px 0 0">Use os botões do leitor para aproximar o texto. Se a apostila não aparecer, toque em “Ler a apostila”.</p>`:''}
    ${quiz}`;
  return {html, qs};
}
async function mountPlayer(container, cid, list, previewOnly, onChange){
  let cur = S.aula && list.some(a=>a.id===S.aula) ? S.aula : (list.find(a=>(a.previa||hasAccess(cid)) && !S.prog.includes(a.id)) || list.find(a=>a.previa||hasAccess(cid)) || list[0])?.id;
  async function draw(){
    const a = list.find(x=>x.id===cur);
    const st = await stageHTML(a,cid);
    container.innerHTML = `<aside class="side">${sideHTML(list,cid,cur,previewOnly)}</aside><div class="stage">${st.html}</div>`;
    container.querySelectorAll('[data-aula]').forEach(b=>b.onclick=()=>{cur=b.dataset.aula;S.aula=cur;draw();container.scrollIntoView({behavior:'smooth'})});
    container.querySelectorAll('[data-fs]').forEach(b=>b.onclick=()=>setFont(+b.dataset.fs));
    const nb = container.querySelector('[data-night]'); if(nb) nb.onclick=()=>{ toggleNight(); nb.textContent=document.body.classList.contains('night')?'Modo claro':'Modo noturno' };
    const ab=container.querySelector('[data-audio]'); if(ab&&!ab.disabled) ab.onclick=()=>{ const b=container.querySelector('#audioBox'); b.classList.toggle('hidden'); ab.classList.toggle('on') };
    const lb=container.querySelector('[data-lista]'); if(lb) lb.onclick=()=>container.querySelector('.side')?.scrollIntoView({behavior:'smooth'});
    const nbx=container.querySelector('[data-notas]'); if(nbx) nbx.onclick=()=>{ container.querySelector('#notasBox')?.scrollIntoView({behavior:'smooth',block:'center'}); container.querySelector('#notaTxt')?.focus() };
    const nt=container.querySelector('#notaTxt'); if(nt){ API.nota(cur).then(t=>{ nt.value=t||'' }).catch(()=>{});
      container.querySelector('#notaSalvar').onclick=async()=>{ try{ await API.salvarNota(cur,nt.value); const o=container.querySelector('#notaOk'); o.textContent='Anotação salva ✓'; setTimeout(()=>o.textContent='',2500) }catch(e){ container.querySelector('#notaOk').textContent=e.message } } }
    const d = container.querySelector('#btnDone');
    if(d) d.onclick = async()=>{ const f=!S.prog.includes(cur); await API.marcar(S.user.id,cur,f); S.prog=await API.progresso(S.user.id); onChange&&onChange(); draw() };
    const f = container.querySelector('#quizForm');
    if(f && S.user) f.onsubmit = async e=>{
      e.preventDefault();
      const resp = {}; let falta = 0;
      st.qs.forEach(q=>{ const r=f.querySelector(`input[name="q_${q.id}"]:checked`); if(r) resp[q.id]=+r.value; else falta++ });
      const box = f.querySelector('#quizScore');
      if(falta){ box.innerHTML = `<div class="score no">Responda todas as questões antes de enviar (faltam ${falta}).</div>`; return }
      try{
        const r = await API.corrigir(cur, resp);
        st.qs.forEach(q=>{
          const fs=f.querySelector(`[data-q="${q.id}"]`), ok=r.resultado[q.id];
          fs.querySelectorAll('.opt').forEach(o=>o.classList.remove('right','wrong'));
          const chosen=fs.querySelector(`input[value="${resp[q.id]}"]`).closest('.opt');
          chosen.classList.add(ok?'right':'wrong');
          const fb=fs.querySelector('.fb'); fb.className='fb '+(ok?'r':'w'); const gc=r.gabarito?.[q.id]; if(!ok&&gc!=null){ const c2=fs.querySelector(`input[value="${gc}"]`)?.closest('.opt'); c2&&c2.classList.add('right') } fb.innerHTML = (ok?'<b>✓ Correto.</b>':'<b>✕ Incorreto.</b>'+(gc!=null?` A resposta certa é a alternativa <b>${LETRAS[gc]}</b>.`:''))+(r.explicacao?.[q.id]?`<span style="display:block;margin-top:6px;color:var(--ink);font-weight:400">${esc(r.explicacao[q.id])}</span>`:'');
        });
        S.tent = await API.tentativas(S.user.id); S.prog = await API.progresso(S.user.id);
        box.innerHTML = r.aprovado
          ? `<div class="score ok"><b>Aprovado com ${r.nota}%.</b> Esta aula foi registrada como concluída. Siga para a próxima aula.</div><div class="res"><button class="btn btn-gold btn-sm" type="button" id="nextLes">Ir para a próxima aula</button></div>`
          : `<div class="score no"><b>Nota: ${r.nota}%.</b> A nota mínima é ${CONFIG.NOTA_MINIMA}%. Revise o vídeo e a apostila e refaça a prova — não desista!</div><div class="res"><button class="btn btn-navy btn-sm" type="button" id="retry">Refazer a prova</button></div>`;
        f.querySelectorAll('input[type=radio]').forEach(i=>i.disabled=true);
        f.querySelector('button[type=submit]').classList.add('hidden');
        const rt=box.querySelector('#retry'); if(rt) rt.onclick=()=>draw();
        const nx=box.querySelector('#nextLes'); if(nx) nx.onclick=()=>{ const i=list.findIndex(x=>x.id===cur); const n=list.slice(i+1).find(x=>x.previa||hasAccess(cid)); if(n){cur=n.id;S.aula=cur} draw(); container.scrollIntoView({behavior:'smooth'}) };
        onChange && onChange();
        box.scrollIntoView({behavior:'smooth',block:'center'});
      }catch(er){ box.innerHTML = `<div class="score no">${esc(er.message)}</div>` }
    };
  }
  await draw();
}
function courseTop(cid){
  const c = curso(cid), list = lessonsOf(cid);
  const n = list.length, done = list.filter(a=>S.prog.includes(a.id)).length;
  const horas = list.reduce((t,a)=>t+(+a.horas||0),0);
  const hd = list.filter(a=>S.prog.includes(a.id)).reduce((t,a)=>t+(+a.horas||0),0);
  const pct = n ? Math.round(done*100/n) : 0;
  const fim = n && done===n && hasAccess(cid);
  $('#courseTop').innerHTML = `<div class="course-top">
    <div><b class="cz" style="color:var(--navy);font-size:14px">SEU PROGRESSO: ${pct}%</b><br><span style="font-size:16px;color:var(--muted)">${done} de ${n} aulas concluídas${horas?` · ${hd} de ${horas} horas cumpridas`:''}</span></div>
    <div style="text-align:right;font-size:16px"><b>Carga horária:</b> ${horas?horas+' horas':'a definir'}</div>
    <div class="progress"><i style="width:${pct}%"></i></div>
    ${fim?`<div class="done-banner"><b>Parabéns! Você concluiu todas as aulas do ${esc(c.titulo)}.</b> ${ofereceCertificado(c)?`O seu certificado já está disponível. <a href="#certificado-${cid}" data-baixar>Baixar o certificado</a>`:''}</div>`:''}
  </div>`;
}
function openCurso(cid){
  const c = curso(cid); if(!c){ location.hash='cursos'; return }
  $('#pTitle').textContent = c.titulo;
  if(c.em_breve && !S.profile?.is_admin){
    $('#pSub').textContent='Em breve · Curso Livre de Teologia';
    $('#courseHead').innerHTML=`<div class="panel" style="margin-top:24px"><span class="pill lock">EM BREVE</span><p>${esc(c.desc||'')}</p>${ofereceCertificado(c)?'<p><b>Com certificado após a conclusão das aulas e provas.</b></p>':''}<p>As aulas e matrículas serão liberadas pela Direção.</p></div>`;
    $('#courseTop').innerHTML='';$('#grade').innerHTML=discsOf(cid).map(d=>`<div class="panel"><b>${esc(d.nome)}</b><p>${esc(d.desc||'')}</p></div>`).join('');
    $('#coursePlayer').innerHTML='';$('#coursePlayer').style.display='none';return;
  }

  const m = S.mats.find(x=>x.curso_id===cid);
  $('#pSub').textContent = hasAccess(cid) ? (S.profile?.is_admin ? 'Visualização da Direção' : 'Acesso liberado' + (m?.expira_em?' até '+fmtDate(m.expira_em):'')) : (c.cat || 'Curso livre de teologia');
  const avM = avisoMensalidade(m, c.titulo);
  $('#courseHead').innerHTML = (avM?`<div style="margin-top:22px">${avM}</div>`:'')+`<div class="panel" style="margin:24px 0 0;display:grid;grid-template-columns:1.3fr 1fr;gap:20px;align-items:center" id="chBox">
    <div>${c.tipo==='extra'&&c.capa?`<img src="${c.capa}" alt="" style="width:100%;max-height:200px;object-fit:cover;border-radius:8px;border:1px solid var(--gold);margin-bottom:10px">`:''}<p style="margin:0">${esc(c.desc||'')}</p>
    ${hasAccess(cid)?'':`<div class="res" style="margin-top:12px"><a class="btn btn-gold btn-sm" href="#${S.user?'matricula':'cadastro'}">${S.user?'Fazer a matrícula':'Inscrever-se'}</a><a class="btn btn-line btn-sm" href="#matricula">Como funciona a matrícula</a></div>`}</div>
    <div>${statsHTML(cid)}</div></div>${acoesCurso(cid)}${S.user&&cursoConcluido(cid)?certBar(c):''}`;
  ligaAcoesCurso(cid);
  if(S.user && hasAccess(cid)) courseTop(cid); else $('#courseTop').innerHTML='';
  const ds = discsOf(cid);
  const key = d => d.n+'|'+d.nome;
  if(S.discCurso!==cid){ S.disc=null; S.discCurso=cid }
  const atual = ds.find(d=>key(d)===S.disc);
  if(!atual){
    $('#grade').innerHTML = `<div class="panel" style="margin-top:22px"><h3>${c.tipo==='extra'?'Conteúdo do curso':'Disciplinas do curso'}</h3>
      <p style="margin:0 0 6px;color:var(--muted);font-size:16px">${ds.length} disciplina${ds.length===1?'':'s'}, na ordem do curso. Toque em uma disciplina para ver as aulas.</p>
      ${ds.length ? ds.map(d=>{const h=d.aulas.reduce((t,a)=>t+(+a.horas||0),0);const dn=d.aulas.filter(a=>S.prog.includes(a.id)).length;const gr=d.aulas.some(a=>a.previa);
        if(!d.aulas.length) return `<div class="disc-row" style="opacity:.85">
          <span class="cz" style="width:44px;height:44px;border-radius:50%;background:#E9E1CC;color:var(--navy);display:flex;align-items:center;justify-content:center;border:2px solid var(--gold);font-weight:700">${d.n}</span>
          <span><span class="cz" style="display:block;font-size:11px;letter-spacing:.16em;color:var(--goldd)">DISCIPLINA ${d.n}</span><b style="font-size:18px;color:var(--navy)">${esc(d.nome)}</b>
            ${d.desc?`<span style="display:block;font-size:15px;color:var(--muted)">${esc(d.desc)}</span>`:''}</span>
          <span class="pill lock">EM PREPARAÇÃO</span></div>`;
        return `<button type="button" class="disc-row" data-disc="${esc(key(d))}" style="all:unset;box-sizing:border-box;cursor:pointer;width:100%;display:grid">
          <span class="cz" style="width:44px;height:44px;border-radius:50%;background:var(--navy);color:var(--gold2);display:flex;align-items:center;justify-content:center;border:2px solid var(--gold);font-weight:700">${d.n}</span>
          <span><span class="cz" style="display:block;font-size:11px;letter-spacing:.16em;color:var(--goldd)">DISCIPLINA ${d.n}${gr?' · <span style="color:var(--ok)">COM AULA GRÁTIS</span>':''}</span><b style="font-size:18px;color:var(--navy)">${esc(d.nome)}</b>
            ${d.desc?`<span style="display:block;font-size:15px;color:var(--muted)">${esc(d.desc)}</span>`:''}
            <span style="display:block;font-size:15px;color:var(--ink);margin-top:2px">${d.aulas.length} aula${d.aulas.length>1?'s':''} · ${fmtH(h)}${S.user&&hasAccess(cid)?` · ${dn} concluída${dn===1?'':'s'}`:''}</span></span>
          <span class="btn btn-gold btn-sm">Ver aulas</span></button>`}).join('')
        : `<p style="margin:0">As disciplinas deste curso estão em preparação.</p>`}</div>`;
    $('#coursePlayer').innerHTML = '';
    $('#coursePlayer').style.display = 'none';
    $$('[data-disc]').forEach(b=>b.onclick=()=>{ S.disc=b.dataset.disc; S.aula=null; openCurso(cid); $('#grade').scrollIntoView({behavior:'smooth'}) });
    return;
  }
  const h = atual.aulas.reduce((t,a)=>t+(+a.horas||0),0);
  $('#grade').innerHTML = `<div class="panel" style="margin-top:22px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between">
    <div><span class="cz" style="font-size:11px;letter-spacing:.16em;color:var(--goldd)">DISCIPLINA ${atual.n}</span><h3 style="margin:2px 0 0;font-size:20px">${esc(atual.nome)}</h3>
    <span style="font-size:15px;color:var(--muted)">${atual.aulas.length} aula${atual.aulas.length>1?'s':''} · ${fmtH(h)}</span></div>
    <button type="button" class="btn btn-line btn-sm" id="voltarDisc">← Todas as disciplinas</button></div>`;
  $('#voltarDisc').onclick = ()=>{ S.disc=null; openCurso(cid); window.scrollTo({top:0,behavior:'smooth'}) };
  $('#coursePlayer').style.display = '';
  mountPlayer($('#coursePlayer'), cid, atual.aulas, false, ()=>courseTop(cid));
}
function renderPrevia(){
  const list = S.aulas.filter(a=>a.previa);
  if(!list.length){ $('#previewPlayer').innerHTML = `<div class="stage" style="grid-column:1/-1"><p style="margin:0">As aulas de prévia serão publicadas em breve.</p></div>`; return }
  mountPlayer($('#previewPlayer'), list[0].curso_id, list, true);
}

/* ---------- painel do diretor ---------- */
async function renderAdmin(){
  S.alunos = await API.alunos();
  try{ S.allProg = await API.todosProgressos() }catch(e){ S.allProg = [] }
  try{ S.mural = await API.mural() }catch(e){}
  drawMural(); drawEstudosAdm(); drawArquivos();
  await drawPag();
  const alunos = S.alunos.filter(a=>!a.is_admin);
  const ativos = alunos.filter(a=>!a.bloqueado && a.matriculas.some(isActive)).length;
  const pend = alunos.filter(a=>!a.matriculas.length).length;
  let pendPag = 0; try{ pendPag = (await API.comprovantes()).filter(c=>c.status==='pendente').length }catch(e){}
  $('#stats').innerHTML = `<div style="${pendPag?'background:#7A1B2B;border-color:#E4C677':''}"><b>${pendPag}</b><span>Pagamentos a conferir</span></div><div><b>${alunos.length}</b><span>Alunos inscritos</span></div><div><b>${ativos}</b><span>Com acesso liberado</span></div><div><b>${pend}</b><span>Sem matrícula</span></div>`;
  drawAlunos();
  fillSelects(); drawCursosAdm();
  drawAulas();
  drawConfig();
  drawAiAdm(); drawAtend(); drawContab(); drawSec();
}
function drawAlunos(){
  const q = ($('#busca').value||'').toLowerCase();
  const rows = S.alunos.filter(a=>!a.is_admin).filter(a=>[a.nome,a.email,a.telefone].join(' ').toLowerCase().includes(q));
  $('#tbAlunos').innerHTML = rows.map(a=>{
    const chips = a.matriculas.map(m=>{const c=curso(m.curso_id);const cls=isActive(m)?'ok':m.status==='bloqueado'?'off':'lock';
      return `<span class="pill ${cls}" title="${m.expira_em?'Validade: '+fmtDate(m.expira_em):'Sem validade'}">${esc(c?c.titulo.replace('Curso ','').replace(' de Teologia',''):m.curso_id)}${m.expira_em?' · '+fmtDate(m.expira_em):''}</span>`}).join('') || '<span class="pill lock">AGUARDANDO</span>';
    return `<tr><td><b>${esc(a.nome)}</b>${a.bloqueado?' <span class="pill off">SUSPENSO</span>':''}<br><span style="font-size:14px;color:var(--muted)">Inscrito em ${fmtDate((a.criado_em||'').slice(0,10))}${a.interesse?' · Interesse: '+esc(curso(a.interesse)?.titulo||a.interesse):''}</span></td>
      <td>${esc(a.email||'')}<br>${esc(a.telefone||'')}</td><td><div class="chips">${chips}</div></td>
      <td style="min-width:120px">${a.matriculas.map(m=>{const l=lessonsOf(m.curso_id);const d=l.filter(x=>(S.allProg||[]).some(p=>p.user_id===a.id&&p.aula_id===x.id)).length;return l.length?`<div style="font-size:14px">${esc((curso(m.curso_id)?.titulo||'').replace('Curso ','').replace(' de Teologia',''))}: ${Math.round(d*100/l.length)}%</div>`:''}).join('')||'—'}</td>
      <td><div class="chips"><button class="btn btn-gold btn-sm" data-acomp="${a.id}">Acompanhamento</button><button class="btn btn-navy btn-sm" data-lib="${a.id}">Liberar / editar acesso</button>
      <button class="btn btn-line btn-sm" data-card-admin="${a.id}">Enviar carteirinha PDF</button>
      <button class="btn btn-line btn-sm" data-reset="${a.id}">Enviar nova senha</button>
      <button class="btn btn-red btn-sm" data-bloq="${a.id}">${a.bloqueado?'Reativar':'Suspender'}</button></div></td></tr>`;
  }).join('') || `<tr><td colspan="5">Nenhum aluno encontrado.</td></tr>`;
  $$('[data-card-admin]').forEach(b=>b.onclick=()=>dlgCarteirinha(S.alunos.find(a=>a.id===b.dataset.cardAdmin)));
  $$('[data-lib]').forEach(b=>b.onclick=()=>dlgAcesso(S.alunos.find(a=>a.id===b.dataset.lib)));
  $$('[data-acomp]').forEach(b=>b.onclick=()=>dlgAcomp(S.alunos.find(a=>a.id===b.dataset.acomp)));
  $$('[data-reset]').forEach(b=>b.onclick=async()=>{const a=S.alunos.find(x=>x.id===b.dataset.reset);
    try{await API.forgot(a.email);modal(`<h3>Link enviado</h3><p>${API.demo?'No modo demonstração nenhum e-mail é enviado. Com a plataforma ativada, ':''}${esc(a.nome)} recebe em <b>${esc(a.email)}</b> um link para criar uma nova senha.</p><div class="acts"><button class="btn btn-gold" data-close>Fechar</button></div>`)}
    catch(e){modal(`<h3>Não foi possível enviar</h3><p>${esc(e.message)}</p><div class="acts"><button class="btn btn-gold" data-close>Fechar</button></div>`)}});
  $$('[data-bloq]').forEach(b=>b.onclick=()=>{const a=S.alunos.find(x=>x.id===b.dataset.bloq);
    confirmBox(a.bloqueado?`Reativar o acesso de ${a.nome}?`:`Suspender todo o acesso de ${a.nome}? O aluno continuará vendo apenas as aulas de prévia.`, async()=>{await API.setBloqueio(a.id,!a.bloqueado);renderAdmin()})});
}
async function dlgAcomp(a){
  let tent=[]; try{ tent = await API.tentativasTodas() }catch(e){}
  tent = tent.filter(t=>t.user_id===a.id);
  const prog = (S.allProg||[]).filter(p=>p.user_id===a.id).map(p=>p.aula_id);
  const cursosAluno = CURSOS.filter(c=>a.matriculas.some(m=>m.curso_id===c.id) || lessonsOf(c.id).some(l=>prog.includes(l.id)||tent.some(t=>t.aula_id===l.id)));
  const blocos = cursosAluno.map(c=>{
    const l = lessonsOf(c.id); const d = l.filter(x=>prog.includes(x.id)).length;
    const hT = l.reduce((t,x)=>t+(+x.horas||0),0), hD = l.filter(x=>prog.includes(x.id)).reduce((t,x)=>t+(+x.horas||0),0);
    const m = a.matriculas.find(x=>x.curso_id===c.id);
    const linhas = l.map(x=>{ const ts=tent.filter(t=>t.aula_id===x.id); const best=ts.length?Math.max(...ts.map(t=>t.nota)):null;
      return `<tr><td>${x.ordem}. ${esc(x.titulo)}</td><td>${prog.includes(x.id)?'<span class="pill ok">CONCLUÍDA</span>':'<span class="pill lock">PENDENTE</span>'}</td>
        <td>${best===null?'—':`<b style="color:${best>=CONFIG.NOTA_MINIMA?'#1F6B45':'#A3202F'}">${best}%</b>`}</td><td>${ts.length||'—'}</td></tr>`}).join('');
    return `<div class="panel" style="padding:14px;margin:12px 0"><b class="cz" style="font-size:13px;color:var(--navy)">${esc(c.titulo)}</b>
      <div style="font-size:15px;color:var(--muted);margin:4px 0 8px">${m?(isActive(m)?'Acesso liberado':'Acesso '+(m.status==='bloqueado'?'suspenso':'expirado'))+(m.expira_em?' · até '+fmtDate(m.expira_em):''):'Sem matrícula'} · ${d} de ${l.length} aulas · ${hD} de ${hT} horas</div>
      <div class="progress"><i style="width:${l.length?Math.round(d*100/l.length):0}%"></i></div>
      <div class="tbl-wrap" style="margin-top:10px"><table><thead><tr><th>Aula</th><th>Situação</th><th>Melhor nota</th><th>Tentativas</th></tr></thead><tbody>${linhas||'<tr><td colspan="4">Sem aulas.</td></tr>'}</tbody></table></div>
      ${l.length && d===l.length?`<div class="done-banner" style="margin-top:10px">Curso concluído. A carteirinha é preparada e enviada separadamente pela Direção.</div>`:''}</div>`}).join('');
  modal(`<h3>Acompanhamento de ${esc(a.nome)}</h3><p style="margin:6px 0 0;font-size:16px">${esc(a.email||'')}${a.telefone?' · '+esc(a.telefone):''}</p>
    ${blocos || '<p class="msg info">Este aluno ainda não iniciou nenhum curso.</p>'}
    <div class="acts">${a.telefone?`<a class="btn btn-line" href="https://wa.me/55${esc((a.telefone||'').replace(/\D/g,'').replace(/^55/,''))}" target="_blank" rel="noopener">WhatsApp do aluno</a>`:''}<button class="btn btn-gold" data-close>Fechar</button></div>`,
    r=>{ r.querySelector('.box').style.maxWidth='760px' });
}
function dlgAcesso(a){
  const plus = d=>{const x=new Date();x.setDate(x.getDate()+d);return x.toISOString().slice(0,10)};
  const rows = CURSOS.map(c=>{const m=a.matriculas.find(x=>x.curso_id===c.id);
    return `<div class="panel" style="padding:14px;margin:10px 0"><b class="cz" style="font-size:13px;color:var(--navy)">${esc(c.titulo)}</b>
      <div class="grid2"><div><label for="st-${c.id}">Situação</label><select id="st-${c.id}">
        <option value="">Sem acesso</option><option value="ativo" ${m?.status==='ativo'?'selected':''}>Liberado</option><option value="bloqueado" ${m?.status==='bloqueado'?'selected':''}>Suspenso</option></select></div>
      <div><label for="ex-${c.id}">Acesso até</label><input type="date" id="ex-${c.id}" value="${m?.expira_em||''}"></div></div>
      <div class="chips" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-d="7" data-c="${c.id}">Prévia 7 dias</button><button type="button" class="btn btn-line btn-sm" data-d="30" data-c="${c.id}">30 dias</button><button type="button" class="btn btn-line btn-sm" data-d="365" data-c="${c.id}">1 ano</button></div></div>`}).join('');
  modal(`<h3>Acesso de ${esc(a.nome)}</h3><p style="margin:6px 0 0;color:var(--muted);font-size:16px">Libere cursos inteiros, defina a validade ou conceda uma prévia por poucos dias.</p>${rows}
    <div class="acts"><button class="btn btn-line" data-close>Cancelar</button><button class="btn btn-gold" id="salvarAc">Salvar</button></div>`,(r,close)=>{
    r.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{r.querySelector('#st-'+b.dataset.c).value='ativo';r.querySelector('#ex-'+b.dataset.c).value=plus(+b.dataset.d)});
    r.querySelector('#salvarAc').onclick=async()=>{
      for(const c of CURSOS){const st=r.querySelector('#st-'+c.id).value, ex=r.querySelector('#ex-'+c.id).value;const had=a.matriculas.some(m=>m.curso_id===c.id);
        if(st) await API.setMatricula(a.id,c.id,st,ex); else if(had) await API.delMatricula(a.id,c.id)}
      close(); renderAdmin();
    };
  });
}
function drawAulas(){
  const cid = $('#aCursoSel').value;
  const list = lessonsOf(cid);
  $('#tbAulas').innerHTML = list.map(a=>`<tr><td>${a.disc_ordem||1}. ${esc(a.modulo)}</td><td>${a.ordem}</td><td><b>${esc(a.titulo)}</b></td><td>${a.horas||'—'}</td><td data-v="${a.id}">…</td><td data-p="${a.id}">…</td><td>${a.previa?'<span class="pill ok">SIM</span>':'—'}</td>
    <td><div class="chips"><button class="btn btn-line btn-sm" data-ed="${a.id}">Editar</button><button class="btn btn-red btn-sm" data-del="${a.id}">Excluir</button></div></td></tr>`).join('') || `<tr><td colspan="8">Nenhuma aula cadastrada neste curso.</td></tr>`;
  list.forEach(async a=>{const c=await API.conteudo(a.id)||{};const v=$(`[data-v="${a.id}"]`),p=$(`[data-p="${a.id}"]`);if(v)v.textContent=c.video_url?'✓':'—';if(p)p.textContent=c.pdf_url?'✓':'—'});
  $$('[data-ed]').forEach(b=>b.onclick=()=>dlgAula(S.aulas.find(a=>a.id===b.dataset.ed)));
  $$('[data-del]').forEach(b=>b.onclick=()=>{const a=S.aulas.find(x=>x.id===b.dataset.del);confirmBox(`Excluir a aula “${a.titulo}”?`,async()=>{await API.delAula(a.id);S.aulas=await API.aulas();renderAdmin()})});
}
async function dlgAula(a){
  const cid = a?.curso_id || $('#aCursoSel').value;
  const c = a ? (await API.conteudo(a.id) || {}) : {};
  if(a && API.apostilaBruta){ try{ c.pdf_raw = await API.apostilaBruta(a.id) }catch(e){} }
  let qs = a ? await API.questoesAdmin(a.id) : [];
  qs = qs.map(q=>({enunciado:q.enunciado, alternativas:[...(q.alternativas||[]),'','','','',''].slice(0,5), correta:q.correta??0, explicacao:q.explicacao||''}));
  const mods = [...new Set(lessonsOf(cid).map(x=>x.modulo))];
  modal(`<h3>${a?'Editar aula':'Nova aula'}</h3>
    <label for="fCur">Curso</label><select id="fCur">${CURSOS.map(x=>`<option value="${x.id}" ${x.id===cid?'selected':''}>${esc(x.titulo)}</option>`).join('')}</select>
    <div class="grid2" style="grid-template-columns:2fr 1fr"><div><label for="fMod">Disciplina</label><input id="fMod" list="modsList" value="${esc(a?.modulo||mods[0]||'')}" placeholder="Ex.: Introdução à Teologia"><datalist id="modsList">${[...new Set([...S.discs.filter(d=>d.curso_id===cid).map(d=>d.nome),...mods])].map(m=>`<option value="${esc(m)}">`).join('')}</datalist></div>
    <div><label for="fDisc">Nº da disciplina</label><input id="fDisc" type="number" min="1" value="${a?.disc_ordem||1}"></div></div>
    <div class="grid3"><div><label for="fOrd">Nº da aula</label><input id="fOrd" type="number" min="1" value="${a?.ordem||lessonsOf(cid).length+1}"></div>
    <div><label for="fHor">Carga horária (h)</label><input id="fHor" type="number" min="0" step="0.5" value="${a?.horas||''}"></div>
    <div class="check" style="margin-top:42px"><input type="checkbox" id="fPrev" ${a?.previa?'checked':''}><label for="fPrev" style="margin:0;font-family:inherit;font-size:16px;letter-spacing:0;color:var(--ink);font-weight:400">Aula grátis</label></div></div>
    <label for="fTit">Título da aula</label><input id="fTit" value="${esc(a?.titulo||'')}">
    <label for="fDes">Descrição</label><textarea id="fDes" rows="3">${esc(a?.descricao||'')}</textarea>
    <label for="fPrevTxt">Texto bíblico e aplicação da prévia (1º parágrafo: o versículo; deixe uma linha em branco entre os parágrafos)</label><textarea id="fPrevTxt" rows="6">${esc(a?.previa_texto||'')}</textarea>
    <label for="fVid">Link do vídeo (YouTube “não listado”, Vimeo ou Google Drive)</label><input id="fVid" value="${esc(c.video_raw||c.video_url||'')}" placeholder="https://youtu.be/...">${uploadField('fVid',false,'video')}
    <label for="fAud">Link do áudio da aula (opcional — MP3 ou Google Drive)</label><input id="fAud" value="${esc(c.audio_raw||c.audio_url||'')}" placeholder="https://drive.google.com/...">${uploadField('fAud',false,'audio')}
    <div class="check"><input type="checkbox" id="fAmo" ${a?.apostila_amostra?'checked':''}><label for="fAmo" style="margin:0;font-family:inherit;font-size:16px;letter-spacing:0;color:var(--ink);font-weight:400">Apostila de amostra grátis (qualquer visitante pode ler a apostila desta aula)</label></div>
    <label for="fPdf">Link da apostila em PDF (Google Drive com “Qualquer pessoa com o link”)</label><input id="fPdf" value="${esc(c.pdf_raw||c.pdf_url||'')}" placeholder="https://drive.google.com/file/d/...">${uploadField('fPdf',false)}
    <h3 style="margin-top:22px">Prova da aula</h3>
    <p style="margin:4px 0 0;font-size:15px;color:var(--muted)">Questões com alternativas de A a E. Marque a alternativa correta. Nota mínima: ${CONFIG.NOTA_MINIMA}%.</p>
    <div id="qList"></div>
    <button type="button" class="btn btn-line btn-sm" id="addQ" style="margin-top:12px">Adicionar questão</button>
    <div class="msg hidden" id="mAula"></div>
    <div class="acts"><button class="btn btn-line" data-close>Cancelar</button><button class="btn btn-gold" id="salvarAula">Salvar aula</button></div>`,(r,close)=>{
    const qList = r.querySelector('#qList');
    function readQs(){ return [...qList.querySelectorAll('.qedit')].map(el=>({
      enunciado: el.querySelector('.qen').value.trim(),
      alternativas: [...el.querySelectorAll('.qalt')].map(i=>i.value.trim()),
      correta: +el.querySelector('.qok').value, explicacao: (el.querySelector('.qex')?.value||'').trim() })) }
    function drawQs(){
      qList.innerHTML = qs.map((q,i)=>`<div class="qedit"><b class="cz" style="font-size:12px;color:var(--navy)">QUESTÃO ${i+1}</b>
        <textarea class="qen" rows="2" placeholder="Enunciado da questão" aria-label="Enunciado da questão ${i+1}" style="margin-top:6px">${esc(q.enunciado)}</textarea>
        ${q.alternativas.map((t,j)=>`<div class="alt"><b>${LETRAS[j]}</b><input class="qalt" value="${esc(t)}" aria-label="Alternativa ${LETRAS[j]}"></div>`).join('')}
        <div class="grid2" style="align-items:end"><div><label>Alternativa correta</label><select class="qok">${LETRAS.map((L,j)=>`<option value="${j}" ${q.correta===j?'selected':''}>${L}</option>`).join('')}</select></div>
        <div><button type="button" class="btn btn-red btn-sm" data-rmq="${i}" style="margin-top:10px">Remover questão</button></div></div>
        <label>Explicação da resposta (aparece para o aluno depois que ele enviar a prova)</label><textarea class="qex" rows="2">${esc(q.explicacao||'')}</textarea></div>`).join('');
      qList.querySelectorAll('[data-rmq]').forEach(b=>b.onclick=()=>{ qs=readQs(); qs.splice(+b.dataset.rmq,1); drawQs() });
    }
    drawQs();
    r.querySelector('#fDisc').oninput=()=>{ const n=+r.querySelector('#fDisc').value; const d=S.discs.find(x=>x.curso_id===r.querySelector('#fCur').value&&x.ordem===n); if(d) r.querySelector('#fMod').value=d.nome };
    r.querySelector('#fMod').onchange=()=>{ const x=lessonsOf(r.querySelector('#fCur').value).find(l=>l.modulo===r.querySelector('#fMod').value.trim()); if(x) r.querySelector('#fDisc').value=x.disc_ordem||1 };
    bindUploads(r);
    r.querySelector('#addQ').onclick=()=>{ qs=readQs(); qs.push({enunciado:'',alternativas:['','','','',''],correta:0}); drawQs() };
    r.querySelector('#salvarAula').onclick=async()=>{
      const m=r.querySelector('#mAula');
      const t=r.querySelector('#fTit').value.trim(); if(!t){show(m,'Informe o título da aula.','err');return}
      const lista=readQs();
      const bad=lista.findIndex(q=>!q.enunciado||q.alternativas.some(x=>!x));
      if(bad>=0){show(m,`Complete o enunciado e as cinco alternativas da questão ${bad+1}.`,'err');return}
      try{
        const cur=r.querySelector('#fCur').value;
        const id = await API.saveAula({id:a?.id,curso_id:cur,modulo:r.querySelector('#fMod').value.trim()||'Disciplina',disc_ordem:+r.querySelector('#fDisc').value||1,ordem:+r.querySelector('#fOrd').value||1,horas:+r.querySelector('#fHor').value||0,titulo:t,descricao:r.querySelector('#fDes').value.trim(),previa_texto:r.querySelector('#fPrevTxt').value.trim(),previa:r.querySelector('#fPrev').checked,apostila_amostra:r.querySelector('#fAmo').checked},
          {video_url:r.querySelector('#fVid').value.trim(),audio_url:r.querySelector('#fAud').value.trim(),pdf_url:r.querySelector('#fPdf').value.trim()});
        await API.saveQuestoes(id||a?.id, lista);
        S.aulas=await API.aulas(); close(); await renderAdmin(); $('#aCursoSel').value=cur; drawAulas();
      }catch(e){show(m,e.message,'err')}
    };
  });
}
function drawCursosAdm(){
  const el=$('#tbCursos'); if(!el) return;
  el.innerHTML = CURSOS.slice().sort((a,b)=>(a.ordem||0)-(b.ordem||0)).map(c=>{const t=totais(c.id);
    return `<tr><td><b>${esc(c.titulo)}</b><br><span style="font-size:14px;color:var(--muted)">${esc(c.cat||'')}</span></td><td>${c.tipo==='extra'?'Curso extra':'Formação'}</td><td>${t.disc}</td><td>${t.aulas}</td><td>${fmtH(t.horas)}</td>
      <td>${c.ativo===false?'<span class="pill off">OCULTO</span>':c.em_breve?'<span class="pill lock">EM BREVE</span>':'<span class="pill ok">VISÍVEL</span>'}</td><td><button class="btn btn-line btn-sm" data-edc="${c.id}">Editar</button></td></tr>`}).join('');
  $$('[data-edc]').forEach(b=>b.onclick=()=>dlgCurso(CURSOS.find(c=>c.id===b.dataset.edc)));
}
function slug(t){ return 'x-'+t.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40) }
function dlgCurso(c){
  const novo=!c; let capa=c?.capa||'';
  modal(`<h3>${novo?'Novo curso extra':'Editar curso'}</h3>
    <label for="kTit">Título do curso</label><input id="kTit" value="${esc(c?.titulo||'')}" placeholder="Ex.: Curso de Hermenêutica Bíblica">
    <label for="kCat">Rótulo</label><input id="kCat" value="${esc(c?.cat||'Curso Extra')}">
    <label for="kDesc">Descrição (aparece no cartão e na página do curso)</label><textarea id="kDesc" rows="3">${esc(c?.desc||'')}</textarea>
    <label for="kDisc">Disciplinas do curso (uma por linha, na ordem; se quiser, escreva a descrição depois de “ — ”)</label>
    <textarea id="kDisc" rows="8" placeholder="Introdução à Teologia — Por que estudar teologia…&#10;Bibliologia — A doutrina das Escrituras…">${esc(discsOf(c?.id||'').filter(d=>S.discs.some(x=>x.curso_id===c?.id&&x.ordem===d.n)).map(d=>d.nome+(d.desc?' — '+d.desc:'')).join('\n'))}</textarea>
    <div class="grid2"><div><label for="kOrd">Ordem de exibição</label><input id="kOrd" type="number" value="${c?.ordem??20}"></div>
    <div class="check" style="margin-top:42px"><input type="checkbox" id="kAtivo" ${c?.ativo===false?'':'checked'}><label for="kAtivo" style="margin:0;font-family:inherit;font-size:16px;letter-spacing:0;color:var(--ink);font-weight:400">Visível na plataforma</label></div></div>
    <div class="check"><input type="checkbox" id="kCert" ${novo?'':ofereceCertificado(c)?'checked':''}><label for="kCert">Oferece certificado após concluir as aulas e provas</label></div>
    <div class="check"><input type="checkbox" id="kBreve" ${novo||c?.em_breve?'checked':''}><label for="kBreve">Em breve — anunciar sem liberar aulas ou matrícula</label></div>
    ${(c?.tipo||'extra')==='extra'?`<label for="kCapa">Capa do curso (imagem horizontal)</label><input type="file" id="kCapa" accept="image/*">
    <div id="kPrev" style="margin-top:10px;border-radius:8px;overflow:hidden;border:1px solid #E1D4B2"></div>
    <button type="button" class="btn btn-line btn-sm" id="kSemCapa" style="margin-top:8px">Usar capa padrão da ETU</button>`:''}
    <div class="msg hidden" id="mK"></div>
    <div class="acts"><button class="btn btn-line" data-close>Cancelar</button><button class="btn btn-gold" id="kSalvar">Salvar curso</button></div>`,(r,close)=>{
    const prev=()=>{ const p=r.querySelector('#kPrev'); if(p) p.innerHTML = capaHTML({titulo:r.querySelector('#kTit').value||'Título do curso',capa},140) };
    prev(); r.querySelector('#kTit').oninput=prev;
    const fi=r.querySelector('#kCapa'); if(fi) fi.onchange=async()=>{ const f=fi.files[0]; if(!f) return;
      const img=await new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=URL.createObjectURL(f)});
      const W=960,H=540,cv=document.createElement('canvas');cv.width=W;cv.height=H;const k=Math.max(W/img.width,H/img.height),w=img.width*k,h=img.height*k;
      cv.getContext('2d').drawImage(img,(W-w)/2,(H-h)/2,w,h); capa=cv.toDataURL('image/jpeg',0.8); prev() };
    const sc=r.querySelector('#kSemCapa'); if(sc) sc.onclick=()=>{capa='';prev()};
    r.querySelector('#kSalvar').onclick=async()=>{ const t=r.querySelector('#kTit').value.trim(); if(!t) return show(r.querySelector('#mK'),'Informe o título do curso.','err');
      const obj={id:c?.id||slug(t),tipo:c?.tipo||'extra',nivel:c?.nivel||0,titulo:t,cat:r.querySelector('#kCat').value.trim()||'Curso Extra',desc:r.querySelector('#kDesc').value.trim(),ordem:+r.querySelector('#kOrd').value||0,ativo:r.querySelector('#kAtivo').checked,oferece_certificado:r.querySelector('#kCert').checked,em_breve:r.querySelector('#kBreve').checked,capa};
      const linhas = r.querySelector('#kDisc').value.split('\n').map(x=>x.trim()).filter(Boolean).map(x=>{const p=x.split(/\s+[—-]\s+/);return {nome:p[0].trim(),descricao:(p.slice(1).join(' — ')||'').trim()}});
      try{ await API.saveCurso(obj,novo); await API.saveDisciplinas(obj.id, linhas); CURSOS = await API.cursos(); S.discs = await API.disciplinas(); fillSelects(); renderTicker(); close(); drawCursosAdm(); }catch(e){ show(r.querySelector('#mK'),e.message,'err') } };
  });
}
async function drawArquivos(){
  const el=$('#tbArq'); if(!el) return;
  const rows=[];
  for(const a of S.aulas){ let c={}; try{ c=await API.conteudo(a.id)||{} }catch(e){} if(c.pdf_url) rows.push({t:`Apostila — ${a.titulo}`,o:`${curso(a.curso_id)?.titulo||''} · ${a.modulo}`,ac:a.apostila_amostra?'Amostra grátis (só leitura)':'Somente matriculados',u:c.pdf_url}) }
  S.estudos.forEach(e=>{ if(e.pdf_url) rows.push({t:e.titulo,o:'Biblioteca gratuita · '+e.tipo,ac:'Grátis (ler e baixar)',u:e.pdf_url}) });
  el.innerHTML = rows.map(r=>`<tr><td><b>${esc(r.t)}</b></td><td>${esc(r.o)}</td><td>${esc(r.ac)}</td><td><div class="chips"><a class="btn btn-line btn-sm" href="${esc(r.u)}" target="_blank" rel="noopener">Abrir</a>${/drive\.google/.test(r.u)?`<a class="btn btn-line btn-sm" href="${esc(driveDownload(r.u))}" target="_blank" rel="noopener">Baixar</a>`:''}</div></td></tr>`).join('') || '<tr><td colspan="4">Nenhum arquivo ainda.</td></tr>';
}
function drawEstudosAdm(){
  const el=$('#tbEstudos'); if(!el) return;
  el.innerHTML = S.estudos.map(e=>`<tr><td><span class="pill lock">${esc((e.tipo||'').toUpperCase())}</span></td><td><b>${esc(e.titulo)}</b><br><span style="font-size:14px;color:var(--muted)">${esc(e.descricao||'')}</span></td>
    <td>${e.ativo===false?'<span class="pill off">OCULTO</span>':'<span class="pill ok">VISÍVEL</span>'}</td>
    <td><div class="chips"><button class="btn btn-line btn-sm" data-ee="${e.id}">Editar</button><button class="btn btn-red btn-sm" data-ed2="${e.id}">Excluir</button></div></td></tr>`).join('') || '<tr><td colspan="4">Nenhum estudo cadastrado.</td></tr>';
  $$('[data-ee]').forEach(b=>b.onclick=()=>dlgEstudo(S.estudos.find(x=>x.id===b.dataset.ee)));
  $$('[data-ed2]').forEach(b=>b.onclick=()=>{const e=S.estudos.find(x=>x.id===b.dataset.ed2);confirmBox(`Excluir “${e.titulo}”?`,async()=>{await API.delEstudo(e.id);S.estudos=await API.estudos();drawEstudosAdm()})});
}
function dlgEstudo(e){
  const tipos=['Esboço de pregação','Estudo','Revista','Escola Dominical','Apostila'];
  modal(`<h3>${e?'Editar estudo':'Novo estudo'}</h3>
    <label for="esTipo">Tipo</label><select id="esTipo">${tipos.map(t=>`<option ${e?.tipo===t?'selected':''}>${t}</option>`).join('')}</select>
    <label for="esTit">Título</label><input id="esTit" value="${esc(e?.titulo||'')}">
    <label for="esDesc">Descrição curta</label><textarea id="esDesc" rows="2">${esc(e?.descricao||'')}</textarea>
    <label for="esPdf">Link do PDF (Google Drive, “Qualquer pessoa com o link”)</label><input id="esPdf" value="${esc(e?.pdf_url||'')}" placeholder="https://drive.google.com/file/d/...">${uploadField('esPdf',true)}
    <div class="grid2"><div><label for="esOrd">Ordem</label><input id="esOrd" type="number" value="${e?.ordem??S.estudos.length+1}"></div>
    <div class="check" style="margin-top:42px"><input type="checkbox" id="esAt" ${e?.ativo===false?'':'checked'}><label for="esAt" style="margin:0;font-family:inherit;font-size:16px;letter-spacing:0;color:var(--ink);font-weight:400">Visível</label></div></div>
    <div class="msg hidden" id="mEs"></div>
    <div class="acts"><button class="btn btn-line" data-close>Cancelar</button><button class="btn btn-gold" id="esOk">Salvar</button></div>`,(r,close)=>{
    bindUploads(r);
    r.querySelector('#esOk').onclick=async()=>{ const t=r.querySelector('#esTit').value.trim(); if(!t) return show(r.querySelector('#mEs'),'Informe o título.','err');
      try{ await API.saveEstudo({id:e?.id,tipo:r.querySelector('#esTipo').value,titulo:t,descricao:r.querySelector('#esDesc').value.trim(),pdf_url:r.querySelector('#esPdf').value.trim(),ordem:+r.querySelector('#esOrd').value||0,ativo:r.querySelector('#esAt').checked});
        S.estudos=await API.estudos(); close(); drawEstudosAdm() }catch(er){ show(r.querySelector('#mEs'),er.message,'err') } };
  });
}
function drawMural(){
  $('#tbMural').innerHTML = S.mural.map(m=>`<tr><td><span class="pill lock">${esc((m.tipo||'').toUpperCase())}</span></td><td><b>${esc(m.titulo)}</b><br><span style="font-size:14px;color:var(--muted)">${esc(m.texto||'')}</span></td><td>${m.video_url?'✓':'—'}</td>
    <td><div class="chips"><button class="btn btn-line btn-sm" data-med="${m.id}">Editar</button><button class="btn btn-red btn-sm" data-mdel="${m.id}">Excluir</button></div></td></tr>`).join('') || `<tr><td colspan="4">Nenhum item no mural.</td></tr>`;
  $$('[data-med]').forEach(b=>b.onclick=()=>dlgMural(S.mural.find(x=>x.id===b.dataset.med)));
  $$('[data-mdel]').forEach(b=>b.onclick=()=>{const m=S.mural.find(x=>x.id===b.dataset.mdel);confirmBox(`Excluir “${m.titulo}” do mural?`,async()=>{await API.delMural(m.id);S.mural=await API.mural();drawMural();renderTicker()})});
}
function dlgMural(m){
  const tipos=['Aviso','Anúncio','Depoimento','Lançamento'];
  modal(`<h3>${m?'Editar item do mural':'Novo item do mural'}</h3>
    <label for="muTipo">Tipo</label><select id="muTipo">${tipos.map(t=>`<option ${m?.tipo===t?'selected':''}>${t}</option>`).join('')}</select>
    <label for="muTit">Título</label><input id="muTit" value="${esc(m?.titulo||'')}">
    <label for="muTxt">Texto</label><textarea id="muTxt" rows="3">${esc(m?.texto||'')}</textarea>
    <label for="muVid">Link do vídeo (opcional — YouTube, Vimeo ou Google Drive)</label><input id="muVid" value="${esc(m?.video_url||'')}" placeholder="https://youtu.be/...">
    <div class="msg hidden" id="mMu"></div>
    <div class="acts"><button class="btn btn-line" data-close>Cancelar</button><button class="btn btn-gold" id="salvarMu">Salvar</button></div>`,(r,close)=>{
    r.querySelector('#salvarMu').onclick=async()=>{
      const t=r.querySelector('#muTit').value.trim(); if(!t){show(r.querySelector('#mMu'),'Informe o título.','err');return}
      try{ await API.saveMural({id:m?.id,tipo:r.querySelector('#muTipo').value,titulo:t,texto:r.querySelector('#muTxt').value.trim(),video_url:r.querySelector('#muVid').value.trim()});
        close(); S.mural=await API.mural(); drawMural(); renderTicker() }catch(e){show(r.querySelector('#mMu'),e.message,'err')}
    };
  });
}
function drawMensalidadeCfg(){
  const box=document.createElement('div'); box.className='panel'; box.style.marginTop='18px';
  box.innerHTML=`<h3>Mensalidades e provas: aviso, tolerância e nota mínima</h3>
    <p style="margin:0 0 10px;color:var(--muted);font-size:16px">O aluno começa a receber o lembrete do seu compromisso alguns dias antes do vencimento. Se o pagamento não for identificado, ele ainda estuda durante o prazo de tolerância, sempre vendo o aviso. Terminado esse prazo, as aulas e apostilas daquele curso são bloqueadas automaticamente, e voltam assim que a direção confirmar o pagamento.</p>
    <div class="grid2"><div><label for="cfAviso">Avisar quantos dias antes do vencimento</label><input id="cfAviso" type="number" min="0" max="30" value="${CONFIG.AVISO_DIAS}"></div>
    <div><label for="cfTol">Dias de tolerância depois do vencimento</label><input id="cfTol" type="number" min="0" max="60" value="${CONFIG.TOLERANCIA_DIAS}"></div></div>
    <label for="cfNota">Nota mínima para aprovação nas provas (%)</label><input id="cfNota" type="number" min="0" max="100" value="${CONFIG.NOTA_MINIMA}">
    <div class="msg hidden" id="mCfg"></div><div class="res"><button class="btn btn-gold" id="cfSalvar" type="button">Salvar</button></div>`;
  $('#configPanel').after(box);
  box.querySelector('#cfSalvar').onclick=async()=>{ const a=Math.max(0,+box.querySelector('#cfAviso').value||0), t=Math.max(0,+box.querySelector('#cfTol').value||0);
    const nm=Math.min(100,Math.max(0,+box.querySelector('#cfNota').value||70));
    try{ await API.saveEscolaConfig({aviso_dias:a,tolerancia_dias:t,nota_minima:nm}); CONFIG.AVISO_DIAS=a; CONFIG.TOLERANCIA_DIAS=t; CONFIG.NOTA_MINIMA=nm; show(box.querySelector('#mCfg'),'Configuração salva.','ok') }catch(e){ show(box.querySelector('#mCfg'),e.message,'err') } };
}
function drawConfig(){
  document.querySelectorAll('#configPanel ~ .panel').forEach(x=>x.remove());
  setTimeout(drawMensalidadeCfg,0); setTimeout(drawContaDir,0); setTimeout(drawVideoCfg,0); setTimeout(drawCanaisAdm,0);
  $('#configPanel').innerHTML = API.demo ?
    `<h3>Modo demonstração</h3><p>A plataforma está funcionando apenas neste navegador, para você conhecer e testar. Para receber alunos de verdade — com contas próprias, e-mail de “esqueci a senha” e acesso pelo celular de cada um — preencha o bloco <b>CONFIG</b> no início do código com os dados do seu projeto Supabase, como explicado no guia de ativação.</p>
     <div class="res"><button class="btn btn-red btn-sm" id="resetDemo">Apagar dados de teste</button></div>` :
    `<h3>Plataforma ativa</h3><p>Conectada ao banco de dados da escola. Novos alunos se inscrevem pela página de inscrição e aparecem na aba “Alunos”, aguardando a liberação do acesso.</p>
     <p>Para tornar outra pessoa administradora, marque a coluna <b>is_admin</b> do perfil dela no painel do Supabase.</p>`;
  const r=$('#resetDemo'); if(r) r.onclick=()=>confirmBox('Apagar todos os dados de teste e voltar ao início?',async()=>{API.reset();await API.signOut();await refreshUser();location.hash='inicio'});
}





(function(){ const u=CONFIG.LINK_PUBLICO, msg='Conheça a Escola Teológica União — Curso Livre de Teologia: formação bíblica, teológica e ministerial. Acesse: '+u;
  $('#cpUrl').textContent=u; $('#cpZap').href='https://wa.me/?text='+encodeURIComponent(msg);
  $('#cpCopiar').onclick=async()=>{ try{ await navigator.clipboard.writeText(u) }catch(e){ const t=document.createElement('textarea'); t.value=u; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove() } $('#cpCopiar').textContent='Link copiado ✓'; setTimeout(()=>$('#cpCopiar').textContent='Copiar o link',2500) };
  if(navigator.share) $('#cpShare').onclick=()=>navigator.share({title:'Escola Teológica União',text:msg,url:u}).catch(()=>{}); else $('#cpShare').style.display='none';
})();


function certBar(c){ if(!ofereceCertificado(c) || c.em_breve) return ''; return `<div class="cert-bar" role="status"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="6" fill="none" stroke="#fff" stroke-width="2"/><path d="M9 14l-2 8 5-3 5 3-2-8" fill="none" stroke="#fff" stroke-width="2"/><path d="M9.5 9l1.8 1.8L14.8 7.3" fill="none" stroke="#fff" stroke-width="2"/></svg>
  <b>Certificado disponível<small>${esc(c.titulo)} concluído</small></b><a href="#certificado-${esc(c.id)}" data-baixar>Baixar certificado</a></div>` }
function cursoConcluido(cid){ const l=lessonsOf(cid); return hasAccess(cid) && l.length && l.every(a=>S.prog.includes(a.id)) }
document.addEventListener('click',e=>{ if(e.target.closest('[data-baixar]')) S.autoPrint=true });
/* ---------- menu, perfil, validação e idioma ---------- */
function drawValidar(){ const ir=async()=>{ const c=$('#vdIn').value.trim().toUpperCase(), r=$('#vdRes'); if(!c){ r.innerHTML=''; return }
    try{ const L=await API.validarDoc(c);
      r.innerHTML=L.length? L.map(d=>`<div class="vf ${d.situacao==='válido'?'ok':'ind'}"><b class="t">Documento localizado no registro da Escola Teológica União</b>${d.tipo==='certificado'?'Certificado':'Carteira de estudante'} de <b>${esc(d.nome)}</b> — ${esc(d.curso)}.<br>Emitido em ${fmtDate(String(d.emitido_em).slice(0,10))}.${d.situacao&&d.situacao!=='válido'?`<br><b>Situação: ${esc(d.situacao)}</b>`:''}</div>`).join('')
        : `<div class="vf no"><b class="t">✕ Código não encontrado</b>Este código não corresponde a nenhum documento emitido pela Escola Teológica União. Confira se foi digitado corretamente. Se persistir, o documento pode ser falso: avise a Direção pelo WhatsApp oficial.</div>`
    }catch(e){ r.innerHTML=`<div class="vf ind"><b class="t">Validação indisponível no momento</b>${esc(e.message)}</div>` } };
  $('#vdBt').onclick=ir; $('#vdIn').onkeydown=e=>{ if(e.key==='Enter') ir() };
  if(S.codValidar){ $('#vdIn').value=S.codValidar; S.codValidar=null; ir() } }
function drawIdioma(){ const base=CONFIG.LINK_PUBLICO.replace(/^https?:\/\//,'').replace(/\/$/,''), host=base.split('/')[0].replace(/-/g,'--').replace(/\./g,'-');
  $$('[data-lang]').forEach(a=>a.href=`https://${host}.translate.goog/?_x_tr_sl=pt&_x_tr_tl=${a.dataset.lang}&_x_tr_hl=pt-BR`) }
function drawPerfil(){ const B=$('#perfilBox'); if(!B||!S.user) return; const p=S.profile||{};
  B.innerHTML=`<h3>Meu perfil</h3>
   <p style="margin:0 0 10px;color:var(--muted);font-size:16px">Mantenha seus dados atualizados: é por eles que a escola fala com você sobre matrícula, mensalidade e documentos.</p>
   <div class="grid2"><div><label for="pfNome">Nome completo (sai no certificado e na carteirinha)</label><input id="pfNome" value="${esc(p.nome||'')}"></div>
   <div><label for="pfTel">WhatsApp com DDD</label><input id="pfTel" value="${esc(p.telefone||'')}" inputmode="tel"></div></div>
   <label for="pfEmail">E-mail de acesso</label><input id="pfEmail" type="email" value="${esc(p.email||S.user.email||'')}">
   <details style="margin-top:12px"><summary style="cursor:pointer;font-weight:700;color:var(--navy)">Trocar minha senha</summary>
    <div class="grid2"><div><label for="pfNova">Nova senha (mínimo de 8 caracteres)</label><input id="pfNova" type="password" autocomplete="new-password"></div><div><label for="pfConf">Repita a nova senha</label><input id="pfConf" type="password" autocomplete="new-password"></div></div></details>
   <label for="pfAtual">Senha atual (para confirmar qualquer mudança)</label><input id="pfAtual" type="password" autocomplete="current-password">
   <div class="msg hidden" id="mPf"></div><div class="res"><button class="btn btn-gold" id="pfSalvar" type="button">Salvar meu perfil</button></div>`;
  ligaOlho(B);
  $('#pfSalvar').onclick=async()=>{ const m=$('#mPf'), nova=$('#pfNova').value, conf=$('#pfConf').value, atual=$('#pfAtual').value, email=$('#pfEmail').value.trim(), nome=$('#pfNome').value.trim(), tel=$('#pfTel').value.trim();
    if(!atual) return show(m,'Digite a sua senha atual para confirmar.','err');
    if(nome.length<3) return show(m,'Digite o seu nome completo.','err');
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return show(m,'Digite um e-mail válido.','err');
    if(nova && (nova.length<8 || nova!==conf)) return show(m, nova.length<8?'A nova senha precisa ter pelo menos 8 caracteres.':'As duas senhas novas não são iguais.','err');
    try{ const aviso=await API.atualizarConta({nome,telefone:tel,email,pw:nova||null,atual}); await refreshUser(); drawPerfil(); show($('#mPf'),'Perfil atualizado.'+(aviso?' '+aviso:''),'ok') }catch(e){ show(m,e.message,'err') } };
}

/* ---------- experiência de aplicativo ---------- */
const favKey=()=>'etu_fav_'+(S.user?.id||'x');
function favs(){ try{ return JSON.parse(localStorage.getItem(favKey())||'[]') }catch(e){ return [] } }
function togFav(cid){ const f=favs(); const i=f.indexOf(cid); if(i>=0) f.splice(i,1); else f.push(cid); try{ localStorage.setItem(favKey(),JSON.stringify(f)) }catch(e){} return i<0 }
function proxAula(cid){ return lessonsOf(cid).find(a=>!S.prog.includes(a.id)) }
function acoesCurso(cid){
  const pode=S.user&&hasAccess(cid), px=pode&&proxAula(cid), fav=favs().includes(cid);
  return `<div class="acoes-curso">${pode&&lessonsOf(cid).length?`<button class="btn btn-gold btn-sm" type="button" id="acCont">${px?(S.prog.length?'Continuar de onde parei':'Começar o curso'):'Rever as aulas'}</button>`:''}
    ${S.user?`<button class="btn btn-line btn-sm" type="button" id="acFav" aria-pressed="${fav}">${fav?'★ Nos favoritos':'☆ Favoritar'}</button>`:''}
    <button class="btn btn-line btn-sm" type="button" id="acShare">Compartilhar</button></div>`;
}
function ligaAcoesCurso(cid){
  const c=curso(cid);
  const ct=$('#acCont'); if(ct) ct.onclick=()=>{ const a=proxAula(cid)||lessonsOf(cid)[0]; if(!a) return; const d=discsOf(cid).find(x=>x.aulas.some(y=>y.id===a.id)); S.disc=d.n+'|'+d.nome; S.aula=a.id; openCurso(cid); setTimeout(()=>$('#coursePlayer').scrollIntoView({behavior:'smooth'}),200) };
  const fv=$('#acFav'); if(fv) fv.onclick=()=>{ const on=togFav(cid); fv.textContent=on?'★ Nos favoritos':'☆ Favoritar'; fv.setAttribute('aria-pressed',on) };
  $('#acShare').onclick=async()=>{ const u=CONFIG.LINK_PUBLICO+'#curso-'+cid, t=`${c.titulo} — Escola Teológica União, Curso Livre de Teologia`;
    if(navigator.share){ navigator.share({title:t,text:t,url:u}).catch(()=>{}) } else { try{ await navigator.clipboard.writeText(u); $('#acShare').textContent='Link copiado ✓' }catch(e){} } };
}
function cartaoCurso(c){ const l=lessonsOf(c.id), d=l.filter(a=>S.prog.includes(a.id)).length, p=l.length?Math.round(d*100/l.length):0;
  return `<a class="cartao" href="#curso-${esc(c.id)}"><div class="tp"><small>${esc((c.cat||'CURSO').toUpperCase())}</small><b>${esc(c.titulo)}</b></div><div class="barra"><i style="width:${p}%"></i></div><div class="bt">${d} de ${l.length} aulas · ${p}%</div></a>` }
function drawPrateleiras(){
  const cont=ativosCursos().filter(c=>S.user&&hasAccess(c.id)&&lessonsOf(c.id).length&&lessonsOf(c.id).some(a=>!S.prog.includes(a.id)));
  const fv=ativosCursos().filter(c=>favs().includes(c.id));
  const pc=$('#pratCont'), pf=$('#pratFav');
  if(pc){ pc.classList.toggle('hidden',!(S.user&&cont.length)); $('#trCont').innerHTML=cont.map(cartaoCurso).join('') }
  if(pf){ pf.classList.toggle('hidden',!(S.user&&fv.length)); $('#trFav').innerHTML=fv.map(cartaoCurso).join('') }
}
(function(){ const sl=[...document.querySelectorAll('#banner .sl')]; const dots=$('#bDots'); if(!sl.length) return; let i=0, t;
  dots.innerHTML=sl.map((_,k)=>`<button type="button" aria-label="Anúncio ${k+1}" class="${k?'':'on'}"></button>`).join('');
  const ir=k=>{ sl[i].classList.remove('on'); dots.children[i].classList.remove('on'); i=(k+sl.length)%sl.length; sl[i].classList.add('on'); dots.children[i].classList.add('on') };
  const auto=()=>{ clearInterval(t); t=setInterval(()=>ir(i+1),6000) };
  [...dots.children].forEach((b,k)=>b.onclick=()=>{ ir(k); auto() }); auto();
})();
function marcaTab(view){ const m={inicio:'inicio',cursos:'cursos',curso:'cursos',busca:'busca',aluno:'conta',entrar:'conta',admin:'conta'}[view];
  $('#tbMenu')?.classList.toggle('on',['mais','validar','idioma','termos','sobre'].includes(view));
  $$('#tabbar [data-tb]').forEach(a=>a.classList.toggle('on',a.dataset.tb===m));
  const c=$('#tbConta'); if(c){ const adm=S.profile?.is_admin; c.href=S.user?(adm?'#admin':'#aluno'):(VITRINE?'#matricula':'#entrar'); $('#tbContaT').textContent=S.user?(adm?'Direção':'Minha Área'):(VITRINE?'Matrícula':'Aluno') } }
$('#tbMenu').onclick=()=>{ location.hash='mais' };
function buscar(){ const q=($('#bsIn').value||'').trim().toLowerCase(), R=$('#bsRes'); if(!R) return;
  if(q.length<2){ R.innerHTML='<p style="color:var(--muted);margin-top:14px">Digite pelo menos duas letras.</p>'; return }
  const sem=t=>String(t||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase(), qq=sem(q);
  const hl=t=>{ const s=String(t||''); const k=sem(s).indexOf(qq); return k<0?esc(s):esc(s.slice(0,k))+'<mark>'+esc(s.slice(k,k+q.length))+'</mark>'+esc(s.slice(k+q.length)) };
  const out=[];
  ativosCursos().forEach(c=>{ if(sem(c.titulo+' '+(c.desc||'')+' '+(c.cat||'')).includes(qq)) out.push(`<a href="#curso-${esc(c.id)}"><small>CURSO</small><b>${hl(c.titulo)}</b><span>${hl((c.desc||'').slice(0,160))}</span></a>`);
    discsOf(c.id).forEach(d=>{ if(sem(d.nome+' '+d.desc).includes(qq)) out.push(`<a href="#curso-${esc(c.id)}" data-bdisc="${esc(c.id)}|${esc(d.n+'|'+d.nome)}"><small>DISCIPLINA · ${esc(c.titulo)}</small><b>${hl(d.nome)}</b><span>${d.aulas.length} aula${d.aulas.length===1?'':'s'}</span></a>`);
      d.aulas.forEach(a=>{ if(sem(a.titulo+' '+(a.descricao||'')).includes(qq)) out.push(`<a href="#curso-${esc(c.id)}" data-baula="${esc(c.id)}|${esc(d.n+'|'+d.nome)}|${esc(a.id)}"><small>AULA · ${esc(d.nome)}</small><b>${hl(a.titulo)}</b><span>${hl((a.descricao||'').slice(0,140))}</span></a>`) }) }) });
  (S.estudos||[]).filter(e=>e.ativo!==false).forEach(e=>{ if(sem(e.titulo+' '+(e.descricao||'')+' '+e.tipo).includes(qq)) out.push(`<a href="${esc(e.pdf_url)}" target="_blank" rel="noopener"><small>GRÁTIS · ${esc((e.tipo||'').toUpperCase())}</small><b>${hl(e.titulo)}</b><span>${hl(e.descricao||'')}</span></a>`) });
  [['O Método de ensino','#metodo'],['Aula grátis','#previa'],['Matrícula e Pix','#matricula'],['Verificar contato oficial','#verificar'],['Contato e WhatsApp','#contato'],['Depoimentos','#depoimentos'],['Vídeo-aulas','#videoaulas']].forEach(([t,h])=>{ if(sem(t).includes(qq)) out.push(`<a href="${h}"><small>PÁGINA</small><b>${hl(t)}</b></a>`) });
  R.innerHTML=out.length?`<p style="color:var(--muted);margin:14px 0 4px">${out.length} resultado${out.length===1?'':'s'}</p>`+out.join(''):'<p style="color:var(--muted);margin-top:14px">Nada encontrado. Tente outra palavra ou fale com a escola pelo WhatsApp.</p>';
  R.querySelectorAll('[data-bdisc]').forEach(a=>a.onclick=()=>{ const [,...k]=a.dataset.bdisc.split('|'); S.pendDisc=k.join('|') });
  R.querySelectorAll('[data-baula]').forEach(a=>a.onclick=()=>{ const p=a.dataset.baula.split('|'); S.pendDisc=p[1]+'|'+p[2]; S.pendAula=p[3] });
}
$('#bsIn').oninput=buscar;
const sinoKey=()=> 'etu_avisos_vistos_'+(S.user?.id||'visitante');
function avisos(){ return (S.mural||[]).filter(m=>(m.tipo||'').toLowerCase()==='aviso') }
function drawSino(){ let v=[]; try{ v=JSON.parse(localStorage.getItem(sinoKey())||'[]') }catch(e){}
  const n=avisos().filter(a=>!v.includes(String(a.id))).length+(S.notificacoes||[]).filter(a=>!a.lida_em).length;
  const b=$('#sinoN'); b.textContent=n; b.classList.toggle('hidden',!n) }
$('#sinoBt').onclick=async()=>{ const L=avisos(), pessoais=S.notificacoes||[], uid=S.user?.id;
  try{ localStorage.setItem(sinoKey(),JSON.stringify(L.map(a=>String(a.id)))) }catch(e){}
  modal(`<h3>Avisos da escola</h3>${pessoais.map(a=>`<div style="padding:10px 0;border-bottom:1px solid #EFE6D0"><b>${esc(a.titulo)}</b><p>${esc(a.mensagem)}</p><button class="btn btn-gold btn-sm" data-card-download="${esc(a.curso_id)}">Baixar carteirinha PDF</button></div>`).join('')}${L.map(a=>`<div style="padding:10px 0;border-bottom:1px solid #EFE6D0"><b>${esc(a.titulo)}</b><p>${esc(a.texto||'')}</p></div>`).join('')}${!L.length&&!pessoais.length?'<p>Nenhum aviso no momento.</p>':''}<div class="acts"><button class="btn btn-gold" data-close>Fechar</button></div>`);
  try{ if(!API.demo && uid){ await API.lerAvisos(pessoais.filter(a=>!a.lida_em).map(a=>a.id)); if(S.user?.id===uid) await atualizarDocumentosPessoais() } }catch(e){ /* Manter não lidos para tentar novamente. */ }
  drawSino();
};
setTimeout(drawSino,1500);


function topo(){ const r=document.documentElement, v=r.style.scrollBehavior; r.style.scrollBehavior='auto'; window.scrollTo(0,0); setTimeout(()=>{ window.scrollTo(0,0); r.style.scrollBehavior=v },80) }
/* ---------- navegação interna robusta (barra inferior, rodapé e menus) ---------- */
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="#"]'); if(!a||e.defaultPrevented||a.target==='_blank') return;
  const h=a.getAttribute('href'); if(!h||h==='#') return;
  e.preventDefault();
  if(h===location.hash || (h==='#inicio'&&!location.hash)){ route(); topo(); return }
  try{ location.hash=h }catch(_){ try{ history.pushState(null,'',h) }catch(__){} route() }
  setTimeout(()=>{ if(location.hash!==h){ try{ history.pushState(null,'',h) }catch(_){} route() } },120);
});

(function(){ const t=document.querySelector('.ticker'); if(!t||t.querySelector('.ticker-pausa')) return; const b=document.createElement('button'); b.type='button'; b.className='ticker-pausa'; b.textContent='Pausar'; b.setAttribute('aria-label','Pausar a faixa de avisos');
  b.onclick=()=>{ const p=t.classList.toggle('pausado'); b.textContent=p?'Continuar':'Pausar'; b.setAttribute('aria-label',p?'Continuar a faixa de avisos':'Pausar a faixa de avisos') }; t.appendChild(b) })();
/* ---------- verificação de canais oficiais ---------- */
const CANAIS_PADRAO=[
 {id:'p1',tipo:'WhatsApp e telefone',valor:'(61) 99521-1432',descricao:'Atendimento, matrícula e comprovantes'},
 {id:'p2',tipo:'Chave Pix',valor:'(61) 99521-1432',descricao:'Única chave Pix da escola (telefone)'},
 {id:'p3',tipo:'E-mail',valor:'etu.escolateologicauniao215@gmail.com',descricao:'E-mail oficial da Direção'},
 {id:'p4',tipo:'Site',valor:'escolateologicauniao.github.io',descricao:'Plataforma oficial da escola'},
 {id:'p5',tipo:'CNPJ',valor:'59.037.548/0001-59',descricao:'Escola Teológica União, Cristalina, Goiás'}];
function normCanal(v){ v=String(v||'').trim().toLowerCase();
  if(/@/.test(v)) return {k:'mail',v:v.replace(/^mailto:/,'').replace(/\s/g,'')};
  if(/[a-z]/.test(v)&&/\./.test(v)) return {k:'site',v:v.replace(/^https?:\/\//,'').replace(/^www\./,'').split(/[/?#]/)[0]};
  let d=v.replace(/\D/g,''); if(d.length>=12&&d.startsWith('55')&&d.length<=13) d=d.slice(2); return {k:'num',v:d} }
function canalBate(c,entrada){ const a=normCanal(c.valor), b=normCanal(entrada); if(!b.v) return false; if(a.k!==b.k) return false;
  if(a.k==='site') return b.v===a.v;
  if(a.k==='num'){ const x=a.v.length===11&&a.v[2]==='9'?[a.v,a.v.slice(0,2)+a.v.slice(3)]:[a.v]; return x.includes(b.v) }
  return a.v===b.v }
async function drawVerificar(){ const L=await API.canais();
  $('#vfLista').innerHTML=L.map(c=>`<div class="vf-l"><span>${esc(c.tipo)}</span><b>${esc(c.valor)}</b><span style="flex-basis:100%">${esc(c.descricao||'')}</span></div>`).join('');
  const ir=()=>{ const t=$('#vfIn').value.trim(), r=$('#vfRes'); if(!t){ r.innerHTML=''; return }
    const n=normCanal(t); if(!n.v || (n.k==='num'&&n.v.length<8)){ r.innerHTML=`<div class="vf ind"><b class="t">Não foi possível conferir</b>Digite o número completo com DDD, o e-mail inteiro ou o endereço do site.</div>`; return }
    const ok=L.find(c=>canalBate(c,t));
    r.innerHTML= ok ? `<div class="vf ok"><b class="t">✓ Canal oficial da Escola Teológica União</b>${esc(ok.tipo)}: <b>${esc(ok.valor)}</b>${ok.descricao?' — '+esc(ok.descricao):''}.<br>Mesmo assim, nunca informe a sua senha a ninguém.</div>`
      : `<div class="vf no"><b class="t">✕ Este contato NÃO pertence à Escola Teológica União</b>Não é a Direção nem a escola. Não pague, não envie documentos, fotos ou códigos e não clique em links recebidos dele.<div class="res" style="margin-top:10px"><a class="btn btn-red btn-sm" target="_blank" rel="noopener" href="https://wa.me/${CONFIG.WHATSAPP_LINK}?text=${encodeURIComponent('A paz do Senhor. Recebi contato em nome da Escola Teológica União que NÃO é oficial: '+t)}">Avisar a Direção pelo WhatsApp oficial</a></div></div>` };
  $('#vfBt').onclick=ir; $('#vfIn').onkeydown=e=>{ if(e.key==='Enter') ir() } }
async function drawCanaisAdm(){
  const box=document.createElement('div'); box.className='panel'; box.style.marginTop='18px'; const L=await API.canais();
  box.innerHTML=`<h3>Canais oficiais (proteção contra golpes)</h3>
   <p style="margin:0 0 10px;color:var(--muted);font-size:16px">Na página “Verificar Contato”, qualquer pessoa digita um número, e-mail, chave Pix ou site. Se estiver nesta lista, aparece em <b style="color:#1F5B3A">verde</b>: canal oficial. Se não estiver, aparece em <b style="color:#7A1B2B">vermelho</b>: não é a escola. Cadastre aqui somente o que é realmente da ETU.</p>
   ${L.map(c=>`<div class="vf-l"><span>${esc(c.tipo)}</span><b>${esc(c.valor)}</b><button class="btn btn-red btn-sm" data-delcn="${esc(c.id)}" type="button">Remover</button></div>`).join('')}
   <div class="grid3" style="margin-top:12px"><div><label for="cnTipo">Tipo</label><select id="cnTipo"><option>WhatsApp e telefone</option><option>Chave Pix</option><option>E-mail</option><option>Site</option><option>Rede social</option><option>CNPJ</option></select></div>
   <div><label for="cnValor">Número, e-mail ou endereço</label><input id="cnValor"></div><div><label for="cnDesc">Para que serve</label><input id="cnDesc"></div></div>
   <div class="msg hidden" id="mCn"></div><div class="res"><button class="btn btn-gold" id="cnAdd" type="button">Adicionar canal oficial</button></div>
   ${VITRINE||API.demo?'<p style="margin:8px 0 0;font-size:14.5px;color:var(--muted)">Enquanto a plataforma não estiver ligada ao banco de dados, o site público mostra a lista padrão da escola.</p>':''}`;
  [...document.querySelectorAll('#configPanel ~ .panel')].pop().after(box);
  box.querySelector('#cnAdd').onclick=async()=>{ const v=box.querySelector('#cnValor').value.trim(); if(!v) return show(box.querySelector('#mCn'),'Digite o contato.','err');
    try{ await API.salvarCanal({tipo:box.querySelector('#cnTipo').value,valor:v,descricao:box.querySelector('#cnDesc').value.trim()}); drawConfig() }catch(e){ show(box.querySelector('#mCn'),e.message,'err') } };
  box.querySelectorAll('[data-delcn]').forEach(b=>b.onclick=()=>confirmBox('Remover este canal da lista oficial?',async()=>{ await API.apagarCanal(isNaN(+b.dataset.delcn)?b.dataset.delcn:+b.dataset.delcn); drawConfig() }));
}
/* ---------- assistente da direção ---------- */
const SEC={hist:[]};
function drawSec(){ const P=$('#secPanel'); if(!P) return;
  P.innerHTML=`<h3>Assistente da Direção</h3>
   <p style="margin:0 0 10px;color:var(--muted);font-size:16px">Um auxiliar só do diretor, separado do atendimento aos alunos: pesquisa bíblica e teológica na linha da ETU, revisão e edição de textos, apostilas e pregações, planejamento de aulas e provas, gestão da escola, finanças e segurança. Ele distingue o que a Bíblia afirma do que é interpretação, não inventa fontes e diz com franqueza quando algo não está certo.</p>
   <div class="ad-chat" id="secChat">${SEC.hist.length?SEC.hist.map(m=>`<div class="${m.role==='user'?'q':'a'}">${esc(m.content)}</div>`).join(''):'<p style="margin:0;color:var(--muted)">Escreva o que precisa. Exemplos: “Revise este parágrafo no padrão da ETU”; “Quais textos de Gênesis a Apocalipse tratam da santidade?”; “Monte 10 questões de A a E sobre os atributos de Deus”.</p>'}</div>
   <label for="secIn" style="margin-top:12px">Sua mensagem</label><textarea id="secIn" rows="5"></textarea>
   <div class="res"><button class="btn btn-gold" id="secBt" type="button">Enviar</button><button class="btn btn-line" id="secNovo" type="button">Nova conversa</button><button class="btn btn-line" id="secCopiar" type="button">Copiar última resposta</button></div>`;
  const ch=$('#secChat'); ch.scrollTop=ch.scrollHeight;
  $('#secNovo').onclick=()=>{ SEC.hist=[]; drawSec() };
  $('#secCopiar').onclick=async()=>{ const a=[...SEC.hist].reverse().find(m=>m.role==='assistant'); if(a){ try{ await navigator.clipboard.writeText(a.content); $('#secCopiar').textContent='Copiado ✓' }catch(e){} } };
  $('#secBt').onclick=async()=>{ const t=$('#secIn').value.trim(); if(!t) return; SEC.hist.push({role:'user',content:t}); drawSec(); $('#secChat').insertAdjacentHTML('beforeend','<div class="a" id="secEsp">Pensando…</div>');
    try{ const d=await API.perguntarDirecao(SEC.hist.slice(-16)); SEC.hist.push({role:'assistant',content:d.resposta}) }catch(e){ SEC.hist.push({role:'assistant',content:e.message}) } drawSec() };
}

/* ---------- conta da direção ---------- */
function forcaSenha(p){ let n=0; if(p.length>=10)n++; if(p.length>=14)n++; if(/[A-Z]/.test(p)&&/[a-z]/.test(p))n++; if(/\d/.test(p))n++; if(/[^A-Za-z0-9]/.test(p))n++; return n }
function drawContaDir(){
  const p=S.profile||{}; const box=document.createElement('div'); box.className='panel'; box.style.marginTop='18px';
  box.innerHTML=`<h3>Minha conta da Direção</h3>
    <p style="margin:0 0 10px;color:var(--muted);font-size:16px">Esta conta é só da Direção e não tem relação com nenhuma conta de aluno. Use um e-mail que nenhum aluno use e uma senha forte, que só o senhor conheça. Para qualquer mudança, a senha atual é pedida de novo.</p>
    <div class="grid2"><div><label for="cdNome">Nome</label><input id="cdNome" value="${esc(p.nome||'')}"></div>
    <div><label for="cdEmail">E-mail de acesso da Direção</label><input id="cdEmail" type="email" value="${esc(p.email||'')}"></div></div>
    <div class="grid2"><div><label for="cdNova">Nova senha (deixe em branco para manter)</label><input id="cdNova" type="password" autocomplete="new-password"><div class="forca"><i id="cdForca"></i></div><span id="cdDica" style="font-size:13.5px;color:var(--muted)">Mínimo de 10 caracteres, com letra maiúscula, minúscula, número e símbolo.</span></div>
    <div><label for="cdConf">Repita a nova senha</label><input id="cdConf" type="password" autocomplete="new-password"></div></div>
    <label for="cdAtual">Senha atual (obrigatória para salvar)</label><input id="cdAtual" type="password" autocomplete="current-password">
    <div class="msg hidden" id="mCd"></div><div class="res"><button class="btn btn-gold" id="cdSalvar" type="button">Salvar minha conta</button></div>`;
  (document.querySelectorAll('#configPanel ~ .panel').length? [...document.querySelectorAll('#configPanel ~ .panel')].pop() : $('#configPanel')).after(box);
  ligaOlho(box);
  const nv=box.querySelector('#cdNova'); nv.oninput=()=>{ const f=forcaSenha(nv.value); const i=box.querySelector('#cdForca'); i.style.width=(f*20)+'%'; i.style.background=f>=5?'#1F5B3A':f>=3?'#B8902F':'#7A1B2B'; box.querySelector('#cdDica').textContent=!nv.value?'Mínimo de 10 caracteres, com letra maiúscula, minúscula, número e símbolo.':f>=5?'Senha forte.':f>=3?'Senha média: acrescente o que falta.':'Senha fraca.' };
  box.querySelector('#cdSalvar').onclick=async()=>{ const m=box.querySelector('#mCd'); const nova=nv.value, conf=box.querySelector('#cdConf').value, atual=box.querySelector('#cdAtual').value;
    const email=box.querySelector('#cdEmail').value.trim(), nome=box.querySelector('#cdNome').value.trim();
    if(!atual) return show(m,'Digite a senha atual para confirmar que é o senhor.','err');
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return show(m,'Digite um e-mail válido.','err');
    if(nova){ if(forcaSenha(nova)<5) return show(m,'A nova senha precisa ter pelo menos 10 caracteres, com letra maiúscula, minúscula, número e símbolo.','err'); if(nova!==conf) return show(m,'As duas senhas novas não são iguais.','err'); if(nova===atual) return show(m,'A nova senha precisa ser diferente da atual.','err') }
    try{ const aviso=await API.atualizarConta({nome,email,pw:nova||null,atual}); await refreshUser(); ['#cdNova','#cdConf','#cdAtual'].forEach(q=>box.querySelector(q).value=''); show(m,'Conta da Direção atualizada.'+(aviso?' '+aviso:'')+(nova?' Guarde a nova senha em lugar seguro.':''),'ok') }catch(e){ show(m,e.message,'err') } };
}
/* ---------- contabilidade ---------- */
const CX_CAT={entrada:['Mensalidades','Matrículas','Venda de apostilas e livros','Ofertas e doações','Outras entradas'],
  saida:['Material, gráfica e impressão','Internet, site e plataforma','Divulgação','Impostos e taxas','Contador e serviços','Aluguel, água, luz e telefone','Transporte','Professores e colaboradores','Equipamentos','Outras saídas']};
const brl=v=>(+v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const numBR=v=>{ if(typeof v==='number') return v; const t=String(v||'').replace(/[^\d,.-]/g,''); return +(t.includes(',')?t.replace(/\./g,'').replace(',','.'):t)||0 };
const CX={mes:today().slice(0,7)};
async function drawContab(){
  const P=$('#contabPanel'); if(!P) return;
  let L=[]; try{ L=await API.lancamentos() }catch(e){ P.innerHTML=`<div class="msg err">Não foi possível abrir o caixa: ${esc(e.message)}. Se a plataforma já estiver ativada, rode de novo o arquivo de banco de dados atualizado.</div>`; return }
  let C=[]; try{ C=(await API.comprovantes()).filter(c=>c.status==='aprovado') }catch(e){}
  const mes=CX.mes, ano=mes.slice(0,4);
  const doMes=L.filter(l=>(l.data||'').startsWith(mes)), doAno=L.filter(l=>(l.data||'').startsWith(ano));
  const soma=(arr,t)=>arr.filter(l=>l.tipo===t).reduce((a,l)=>a+numBR(l.valor),0);
  const ent=soma(doMes,'entrada'), sai=soma(doMes,'saida'), entA=soma(doAno,'entrada'), saiA=soma(doAno,'saida');
  const refs=new Set(L.map(l=>l.ref).filter(Boolean));
  const naoLanc=C.filter(c=>!refs.has('comp:'+c.id));
  const alunos=(S.alunos||[]).filter(a=>!a.is_admin);
  const hoje=today(), em7=addDias(hoje,7);
  const venc=[]; alunos.forEach(a=>(a.matriculas||[]).forEach(m=>{ if(m.status==='ativo' && m.expira_em){ if(m.expira_em<hoje) venc.push({a,m,s:'vencida'}); else if(m.expira_em<=em7) venc.push({a,m,s:'vence'}) } }));
  const porCat={}; doMes.forEach(l=>{ const k=(l.tipo==='entrada'?'Entrada · ':'Saída · ')+l.categoria; porCat[k]=(porCat[k]||0)+numBR(l.valor) });
  const meses=[...Array(12)].map((_,i)=>{ const k=ano+'-'+String(i+1).padStart(2,'0'); const x=L.filter(l=>(l.data||'').startsWith(k)); return [k,soma(x,'entrada'),soma(x,'saida')] });
  const nomeMes=k=>MESES[+k.slice(5,7)-1]+' de '+k.slice(0,4);
  P.innerHTML=`<h3>Contabilidade e finanças da escola</h3>
   <p style="margin:0 0 6px;color:var(--muted);font-size:16px">O caixa da Escola Teológica União: tudo o que entra e sai, organizado por mês e por categoria, com recibos, relatórios e a planilha para entregar ao contador. Somente a Direção vê esta área.</p>
   <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:end"><div><label for="cxMes">Mês</label><input id="cxMes" type="month" value="${mes}"></div>
    <button class="btn btn-line btn-sm" id="cxCsv" type="button">Baixar planilha do ano</button><button class="btn btn-line btn-sm" id="cxImp" type="button">Imprimir relatório do mês</button></div>
   <div class="cx-cards"><div class="pos"><b>${brl(ent)}</b><span>Entradas em ${esc(nomeMes(mes))}</span></div><div class="neg"><b>${brl(sai)}</b><span>Saídas no mês</span></div>
    <div class="${ent-sai<0?'neg':'pos'}"><b>${brl(ent-sai)}</b><span>Resultado do mês</span></div><div class="${entA-saiA<0?'neg':'pos'}"><b>${brl(entA-saiA)}</b><span>Resultado de ${ano}</span></div></div>
   ${naoLanc.length?`<div class="cx-sec"><h4>Pagamentos confirmados na plataforma ainda fora do caixa</h4><div class="tbl-wrap"><table><thead><tr><th>Aluno</th><th>Curso</th><th>Valor</th><th>Data</th><th></th></tr></thead><tbody>${naoLanc.map(c=>{ const a=alunos.find(x=>x.id===c.user_id)||{}; return `<tr><td>${esc(a.nome||'Aluno')}</td><td>${esc(curso(c.curso_id)?.titulo||c.curso_id)}</td><td>${c.valor?brl(numBR(c.valor)):'—'}</td><td>${fmtDate((c.criado_em||'').slice(0,10))}</td><td><button class="btn btn-navy btn-sm" data-lancar="${esc(c.id)}" type="button">Lançar no caixa</button></td></tr>`}).join('')}</tbody></table></div></div>`:''}
   <div class="cx-sec"><h4>Novo lançamento</h4>
    <div class="grid3"><div><label for="cxTipo">Tipo</label><select id="cxTipo"><option value="entrada">Entrada (dinheiro que entrou)</option><option value="saida">Saída (dinheiro que saiu)</option></select></div>
     <div><label for="cxData">Data</label><input id="cxData" type="date" value="${mes===hoje.slice(0,7)?hoje:mes+'-01'}"></div>
     <div><label for="cxValor">Valor (R$)</label><input id="cxValor" inputmode="decimal" placeholder="0,00"></div></div>
    <div class="grid3"><div><label for="cxCat">Categoria</label><select id="cxCat"></select></div>
     <div><label for="cxForma">Forma</label><select id="cxForma"><option>Pix</option><option>Dinheiro</option><option>Transferência</option><option>Cartão</option><option>Boleto</option></select></div>
     <div><label for="cxDoc">Documento (nº do recibo, nota ou comprovante)</label><input id="cxDoc"></div></div>
    <label for="cxDesc">Descrição (de quem recebeu ou a quem pagou, e o motivo)</label><input id="cxDesc">
    <div class="msg hidden" id="mCx"></div><div class="res"><button class="btn btn-gold" id="cxAdd" type="button">Registrar no caixa</button></div></div>
   <div class="cx-sec"><h4>Lançamentos de ${esc(nomeMes(mes))}</h4>${doMes.length?`<div class="tbl-wrap"><table><thead><tr><th>Data</th><th>Tipo</th><th>Categoria e descrição</th><th>Valor</th><th></th></tr></thead><tbody>${doMes.slice().sort((a,b)=>a.data<b.data?-1:1).map(l=>`<tr><td>${fmtDate(l.data)}</td><td><span class="pill ${l.tipo==='entrada'?'ok':'off'}">${l.tipo==='entrada'?'Entrada':'Saída'}</span></td><td><b>${esc(l.categoria)}</b><br><span style="font-size:14px;color:var(--muted)">${esc(l.descricao||'')}${l.forma?' · '+esc(l.forma):''}${l.documento?' · doc. '+esc(l.documento):''}</span></td><td>${brl(numBR(l.valor))}</td><td style="white-space:nowrap">${l.tipo==='entrada'?`<button class="btn btn-line btn-sm" data-recibo="${esc(l.id)}" type="button">Recibo</button> `:''}<button class="btn btn-red btn-sm" data-dellc="${esc(l.id)}" type="button">Apagar</button></td></tr>`).join('')}</tbody></table></div>`:'<p style="margin:0;color:var(--muted)">Nenhum lançamento neste mês.</p>'}</div>
   ${Object.keys(porCat).length?`<div class="cx-sec"><h4>Resumo por categoria</h4><div class="tbl-wrap"><table><tbody>${Object.entries(porCat).sort().map(([k,v])=>`<tr><td>${esc(k)}</td><td style="text-align:right">${brl(v)}</td></tr>`).join('')}</tbody></table></div></div>`:''}
   <div class="cx-sec"><h4>O ano de ${ano}, mês a mês</h4><div class="tbl-wrap"><table><thead><tr><th>Mês</th><th>Entradas</th><th>Saídas</th><th>Resultado</th></tr></thead><tbody>${meses.map(([k,e,s])=>`<tr><td>${esc(MESES[+k.slice(5)-1])}</td><td>${brl(e)}</td><td>${brl(s)}</td><td style="color:${e-s<0?'#7A1B2B':'inherit'}">${brl(e-s)}</td></tr>`).join('')}<tr><td><b>Total</b></td><td><b>${brl(entA)}</b></td><td><b>${brl(saiA)}</b></td><td><b>${brl(entA-saiA)}</b></td></tr></tbody></table></div></div>
   <div class="cx-sec"><h4>Mensalidades vencidas e a vencer (próximos 7 dias)</h4>${venc.length?`<div class="tbl-wrap"><table><thead><tr><th>Aluno</th><th>Curso</th><th>Vencimento</th><th>Situação</th><th></th></tr></thead><tbody>${venc.sort((x,y)=>x.m.expira_em<y.m.expira_em?-1:1).map(v=>{ const tel=String(v.a.telefone||'').replace(/\D/g,''); const msg=`A paz do Senhor, ${v.a.nome||''}. Aqui é da Escola Teológica União. Lembramos que a mensalidade do ${curso(v.m.curso_id)?.titulo||'curso'} ${v.s==='vencida'?'venceu em':'vence em'} ${fmtDate(v.m.expira_em)}. O Pix é ${CONFIG.PIX_CHAVE}. Deus abençoe.`;
     return `<tr><td>${esc(v.a.nome||'')}</td><td>${esc(curso(v.m.curso_id)?.titulo||v.m.curso_id)}</td><td>${fmtDate(v.m.expira_em)}</td><td><span class="pill ${v.s==='vencida'?'off':'lock'}">${v.s==='vencida'?'Vencida':'Vence em breve'}</span></td><td>${tel?`<a class="btn btn-line btn-sm" target="_blank" rel="noopener" href="https://wa.me/${tel.length<=11?'55'+tel:tel}?text=${encodeURIComponent(msg)}">Lembrar pelo WhatsApp</a>`:''}</td></tr>`}).join('')}</tbody></table></div>`:'<p style="margin:0;color:var(--muted)">Nenhuma mensalidade vencida ou vencendo nos próximos 7 dias.</p>'}</div>
   <div class="cx-sec"><h4>Assessoria virtual da Direção</h4>
    <p style="margin:0 0 8px;color:var(--muted);font-size:15.5px">Dúvidas sobre organização do caixa, impostos, obrigações, contratos, recibos e direitos do aluno. As respostas orientam o diretor; decisões fiscais e jurídicas devem ser confirmadas com o contador ou o advogado da escola.</p>
    <label for="cxModo">Área de apoio</label><select id="cxModo"><option value="contabil">Contábil e financeiro</option><option value="juridico">Jurídico e burocrático</option><option value="direcao">Administrativo e plataforma</option></select>
    <p style="font-size:15px">Assistente de inteligência artificial, exclusivo da direção. Consulta os manuais aprovados; não consulta legislação atualizada na internet nesta versão. Minutas e decisões fiscais ou jurídicas precisam de revisão profissional.</p>
    <label for="cxPerg">Sua pergunta</label><textarea id="cxPerg" maxlength="6000" rows="3" placeholder="Ex.: Que documentos preciso guardar das mensalidades recebidas?"></textarea>
    <div class="res"><button class="btn btn-navy" id="cxPergBt" type="button">Perguntar</button></div><div id="cxResp" role="status" aria-live="polite" style="white-space:pre-wrap;margin-top:10px"></div></div>
   <div class="cx-sec guia"><h4>Guia do diretor: finanças, impostos e deveres da escola</h4>${GUIA_DIRETOR}</div>`;
  const cat=$('#cxCat'), tp=$('#cxTipo'); const fc=()=>cat.innerHTML=CX_CAT[tp.value].map(c=>`<option>${esc(c)}</option>`).join(''); tp.onchange=fc; fc();
  $('#cxMes').onchange=e=>{ CX.mes=e.target.value||today().slice(0,7); drawContab() };
  $('#cxAdd').onclick=async()=>{ const m=$('#mCx'); const v=numBR($('#cxValor').value); if(!(v>0)) return show(m,'Digite o valor.','err'); if(!$('#cxData').value) return show(m,'Escolha a data.','err');
    try{ await API.salvarLancamento({tipo:tp.value,data:$('#cxData').value,categoria:cat.value,descricao:$('#cxDesc').value.trim(),valor:v,forma:$('#cxForma').value,documento:$('#cxDoc').value.trim()}); CX.mes=$('#cxData').value.slice(0,7); drawContab() }catch(e){ show(m,e.message,'err') } };
  $$('#contabPanel [data-lancar]').forEach(b=>b.onclick=async()=>{ const c=C.find(x=>String(x.id)===b.dataset.lancar); const a=alunos.find(x=>x.id===c.user_id)||{};
    await API.salvarLancamento({tipo:'entrada',data:(c.criado_em||today()).slice(0,10),categoria:'Mensalidades',descricao:`${a.nome||'Aluno'} — ${curso(c.curso_id)?.titulo||''}`,valor:numBR(c.valor),forma:'Pix',documento:'Comprovante na plataforma',ref:'comp:'+c.id}); drawContab() });
  $$('#contabPanel [data-dellc]').forEach(b=>b.onclick=()=>confirmBox('Apagar este lançamento do caixa?',async()=>{ await API.apagarLancamento(isNaN(+b.dataset.dellc)?b.dataset.dellc:+b.dataset.dellc); drawContab() }));
  $$('#contabPanel [data-recibo]').forEach(b=>b.onclick=()=>recibo(L.find(x=>String(x.id)===b.dataset.recibo)));
  $('#cxCsv').onclick=()=>{ const lin=[['Data','Tipo','Categoria','Descrição','Forma','Documento','Valor']].concat(doAno.slice().sort((a,b)=>a.data<b.data?-1:1).map(l=>[fmtDate(l.data),l.tipo==='entrada'?'Entrada':'Saída',l.categoria,l.descricao||'',l.forma||'',l.documento||'',numBR(l.valor).toFixed(2).replace('.',',')]));
    const csv='﻿'+lin.map(r=>r.map(x=>'"'+String(x).replace(/"/g,'""')+'"').join(';')).join('\r\n'); const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})); a.download=`caixa-ETU-${ano}.csv`; a.click() };
  $('#cxImp').onclick=()=>{ const w=window.open('','_blank'); if(!w) return; w.document.write(`<html><head><title>Relatório financeiro — ${nomeMes(mes)}</title><style>body{font-family:Georgia,serif;color:#1b2340;margin:30px}h1{font-size:20px;margin:0}table{width:100%;border-collapse:collapse;margin-top:14px;font-size:13px}td,th{border:1px solid #ccc;padding:6px;text-align:left}th{background:#f3eedf}.r{text-align:right}</style></head><body>
     <h1>Escola Teológica União</h1><div>CNPJ 59.037.548/0001-59 · Cristalina, Goiás</div><h2 style="font-size:16px">Relatório financeiro — ${esc(nomeMes(mes))}</h2>
     <p>Entradas: <b>${brl(ent)}</b> · Saídas: <b>${brl(sai)}</b> · Resultado: <b>${brl(ent-sai)}</b></p>
     <table><tr><th>Data</th><th>Tipo</th><th>Categoria</th><th>Descrição</th><th>Doc.</th><th class="r">Valor</th></tr>${doMes.slice().sort((a,b)=>a.data<b.data?-1:1).map(l=>`<tr><td>${fmtDate(l.data)}</td><td>${l.tipo==='entrada'?'Entrada':'Saída'}</td><td>${esc(l.categoria)}</td><td>${esc(l.descricao||'')}</td><td>${esc(l.documento||'')}</td><td class="r">${brl(numBR(l.valor))}</td></tr>`).join('')}</table>
     <p style="margin-top:40px">______________________________<br>Pr. Charlei de Jesus Lima Dias — Diretor Geral</p></body></html>`); w.document.close(); w.print() };
  $('#cxPergBt').onclick=async()=>{
    if(!S.profile?.is_admin)return;
    const q=$('#cxPerg').value.trim();if(!q)return;
    const botao=$('#cxPergBt'),r=$('#cxResp');botao.disabled=true;r.textContent='Consultando…';
    try{const d=await API.perguntarContador([{role:'user',content:q}],$('#cxModo').value);
      if(!S.profile?.is_admin)return;
      r.textContent=d.resposta+(d.fontes?.length?'\n\nManuais consultados: '+[...new Set(d.fontes)].join('; '):'');
    }catch(e){r.textContent=e.message}finally{botao.disabled=false}
  };
}
function recibo(l){ if(!l) return; const w=window.open('','_blank'); if(!w) return; const n=l.documento||('R-'+String(l.id).slice(-6).toUpperCase());
  w.document.write(`<html><head><title>Recibo ${esc(n)}</title><style>body{font-family:Georgia,serif;color:#1b2340;max-width:680px;margin:40px auto;border:2px solid #C9A24A;padding:30px}h1{text-align:center;letter-spacing:.2em;font-size:22px;margin:0}.c{text-align:center}.v{font-size:22px;font-weight:bold}</style></head><body>
   <div class="c"><b>ESCOLA TEOLÓGICA UNIÃO</b><br>CNPJ 59.037.548/0001-59 · Cristalina, Goiás<br>Curso Livre de Teologia</div><hr>
   <h1>RECIBO</h1><p class="c">Nº ${esc(n)} &nbsp;·&nbsp; <span class="v">${brl(numBR(l.valor))}</span></p>
   <p>Recebemos de <b>${esc((l.descricao||'').split(' — ')[0]||'__________________')}</b> a importância de <b>${brl(numBR(l.valor))}</b>, referente a <b>${esc(l.categoria)}${(l.descricao||'').includes(' — ')?' — '+esc(l.descricao.split(' — ').slice(1).join(' — ')):''}</b>, paga por ${esc(l.forma||'Pix')} em ${fmtDate(l.data)}.</p>
   <p>Para clareza, firmamos o presente recibo.</p><p style="text-align:right">Cristalina, Goiás, ${dataExtenso(new Date(l.data+'T12:00:00'))}.</p>
   <p style="margin-top:50px;text-align:center">______________________________<br>Pr. Charlei de Jesus Lima Dias<br>Diretor Geral</p></body></html>`); w.document.close(); w.print() }
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

/* ---------- documentos ---------- */
const MESES=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
function dataExtenso(d=new Date()){ return `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}` }
function sealHTML(size){ return `<img src="${document.querySelector('#seloImg').src}" alt="" style="width:${size+10}px;display:block">`; return `<div style="position:relative;width:${size}px;height:${size+30}px"><div style="position:absolute;inset:-3px -3px auto -3px;height:${size+6}px;border-radius:50%;background:radial-gradient(circle,#F3DC8C 0%,#C9A24A 60%,#9C7424 100%)"></div><img src="${document.querySelector('.hero .seal img').src}" alt="" style="position:relative;width:${size}px;border-radius:50%;display:block"><svg style="position:absolute;left:50%;transform:translateX(-50%);top:${size-20}px" width="40" height="44" viewBox="0 0 44 48" aria-hidden="true"><path d="M6 0 L20 0 L16 38 L10 31 L2 40 Z" fill="#C9A24A"/><path d="M24 0 L38 0 L42 40 L34 31 L28 38 Z" fill="#B8902F"/></svg></div>` }
async function renderDoc(tipo, cid){
  const c = curso(cid), p = S.profile || {};
  const box = $('#docBox'); $('#mPrint').classList.add('hidden');
  if(!c){ location.hash='aluno'; return }
  if(tipo==='carteira'){
    $('#docTitle').textContent='Carteirinha de estudante'; $('#btnPrint').classList.add('hidden');
    const pronta=(S.carteirinhas||[]).some(x=>x.curso_id===cid);
    box.innerHTML=pronta?`<p>Sua carteirinha foi enviada pela Direção.</p><button type="button" class="btn btn-gold" data-card-download="${esc(cid)}">Baixar carteirinha em PDF</button>`:'<p class="msg info">Aguarde a preparação e o envio do PDF pela Direção. Você receberá um aviso aqui na plataforma.</p>'; return;
  }
  const l = lessonsOf(cid), d = l.filter(x=>S.prog.includes(x.id)).length;
  const horas = l.reduce((t,x)=>t+(+x.horas||0),0);
  const m = S.mats.find(x=>x.curso_id===cid);
  if(!hasAccess(cid) || (tipo==='certificado' && (!ofereceCertificado(c) || c.em_breve || !(l.length && d===l.length)))){
    $('#docTitle').textContent='Documento indisponível';
    box.innerHTML = `<div class="msg err">${tipo==='certificado'?'O certificado só está disponível em cursos que oferecem esse documento, após a conclusão de todas as aulas e provas, com a matrícula ativa.':'A carteira de estudante é liberada somente para alunos com matrícula ativa.'}</div>`;
    $('#btnPrint').classList.add('hidden'); return;
  }
  $('#btnPrint').classList.remove('hidden');
  const imprimirAoFinal=!!S.autoPrint; S.autoPrint=false;
  let reg; try { reg=await API.registrarDoc(tipo,cid); if(!reg) throw new Error('Não foi possível registrar o documento.'); } catch(e) { box.innerHTML='<p class="msg err">'+esc(e.message)+'</p>'; $('#btnPrint').classList.add('hidden'); return; }
  if(tipo==='certificado'){
    $('#docTitle').textContent = 'Certificado — ' + c.titulo;
    box.innerHTML = `<div class="docview" style="aspect-ratio:1.414/1;position:relative;background:#FBF7EC;padding:26px;display:flex;flex-direction:column;justify-content:center">
      <div style="position:absolute;inset:14px;border:3px solid #C9A24A"></div><div style="position:absolute;inset:22px;border:1px solid #0F1E3D"></div>
      <img src="${BRASAO}" alt="" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:46%;opacity:.06">
      <div style="position:absolute;right:44px;top:40px">${sealHTML(76)}</div>
      <div style="position:relative;text-align:center;padding:0 70px">
        <img src="${BRASAO}" alt="Brasão" style="width:96px">
        <div class="cz" style="font-size:24px;letter-spacing:.2em;color:#0F1E3D;margin-top:4px">ESCOLA TEOLÓGICA UNIÃO</div>
        <div style="font-style:italic;color:#7A5A14;font-size:16px">Formação Bíblica, Teológica e Ministerial</div>
        <div class="cz gold-text" style="font-size:52px;letter-spacing:.22em;margin-top:14px;line-height:1.15;padding-top:4px">CERTIFICADO</div>
        <p style="font-size:19px;line-height:1.7;color:#1B2238;margin:14px auto 0;max-width:780px">Certificamos que <b class="cz" style="font-size:22px;letter-spacing:.06em">${esc(p.nome||'')}</b> concluiu o <b>${esc(c.titulo)}</b>, curso livre de formação bíblica, teológica e ministerial${horas?`, com carga horária de <b>${horas} horas</b>`:''}, cumprindo todas as aulas e avaliações exigidas pela Escola Teológica União.</p>
        <p style="font-size:17px;color:#1B2238;margin:12px 0 0">Cristalina, Goiás, ${dataExtenso()}.</p>
        <div style="display:flex;justify-content:center;margin-top:8px"><div style="text-align:center;width:330px"><img src="${ASSINATURA}" alt="Assinatura do Diretor" style="width:210px;margin-bottom:-8px"><div style="border-top:1px solid #1B2238;padding-top:4px;font-size:14px" class="cz">PR. CHARLEI DE JESUS LIMA DIAS</div><div style="font-size:14px;font-style:italic">Idealizador e Diretor Geral</div></div></div>
        <p style="font-size:12.5px;color:#4a4f5e;margin:12px 0 0">Registro ${reg} · CNPJ 59.037.548/0001-59 · Curso livre; não equivale a curso de graduação ou pós-graduação.</p>
      </div></div>`;
  } else {
    const val = m?.expira_em ? fmtDate(m.expira_em) : (()=>{const x=new Date();x.setFullYear(x.getFullYear()+1);return x.toLocaleDateString('pt-BR')})();
    const foto = p.foto ? `<img src="${p.foto}" alt="Foto" style="width:100%;height:100%;object-fit:cover">` : `<span class="cz" style="font-size:12px;color:#6B5B36">FOTO 3×4</span>`;
    const lbl = t=>`<div class="cz" style="font-size:10.5px;letter-spacing:.14em;color:#C9A24A;font-weight:700">${t}</div>`;
    const val2 = t=>`<div style="font-size:18px;color:#F7F1E3;border-bottom:1px solid rgba(247,241,227,.45);padding-bottom:3px;margin-bottom:9px">${t}</div>`;
    $('#docTitle').textContent = 'Carteira de Estudante — ' + c.titulo;
    box.innerHTML = `<div style="display:flex;flex-wrap:wrap;gap:24px;justify-content:center;margin-top:20px">
      <div style="width:640px;max-width:100%;aspect-ratio:85.6/54;position:relative;border-radius:22px;overflow:hidden;background:radial-gradient(120% 90% at 50% 40%,#16294F,#0F1E3D 70%);box-shadow:0 10px 30px rgba(0,0,0,.25)">
        <div style="position:absolute;inset:9px;border:2px solid #C9A24A;border-radius:16px"></div>
        <div style="position:absolute;right:18px;top:14px">${sealHTML(44)}</div>
        <div style="display:flex;align-items:center;gap:12px;padding:20px 26px 0">
          <img src="${BRASAO}" alt="" style="width:62px"><div><div class="cz" style="color:#F7F1E3;font-size:17px;letter-spacing:.14em;line-height:1.1">ESCOLA TEOLÓGICA</div><div class="cz gold-text" style="font-size:28px;letter-spacing:.2em;line-height:1.15">UNIÃO</div><div class="cz" style="color:#C9A24A;font-size:10px;letter-spacing:.2em">CARTEIRA DE ESTUDANTE · CURSO LIVRE</div></div></div>
        <div style="display:flex;gap:18px;padding:12px 26px 0">
          <div style="width:104px;height:138px;flex:0 0 104px;border:2px solid #C9A24A;border-radius:6px;background:#F1EAD8;display:flex;align-items:center;justify-content:center;overflow:hidden">${foto}</div>
          <div style="flex:1;min-width:0">${lbl('NOME DO ALUNO')}${val2('<b class="cz" style="font-size:15px;letter-spacing:.06em">'+esc((p.nome||'').toUpperCase())+'</b>')}
            ${lbl('CURSO')}${val2(esc(c.titulo))}
            ${lbl('NÍVEL')}${val2(esc(c.cat))}
            <div style="display:flex;gap:14px"><div style="flex:1">${lbl('EMISSÃO')}${val2(new Date().toLocaleDateString('pt-BR'))}</div><div style="flex:1">${lbl('VALIDADE')}${val2(val)}</div></div></div></div>
        <div style="position:absolute;left:12px;right:12px;bottom:12px;height:34px;background:#7A1B2B;border-top:2px solid #C9A24A;border-radius:0 0 12px 12px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;color:#F7F1E3;font-size:12px"><span class="cz" style="letter-spacing:.14em">${esc(c.cat.toUpperCase())}</span><span style="font-style:italic">Não substitui documento oficial de identidade</span></div>
      </div>
      <div style="width:640px;max-width:100%;aspect-ratio:85.6/54;position:relative;border-radius:22px;overflow:hidden;background:#F8F3E6;box-shadow:0 10px 30px rgba(0,0,0,.25);color:#1B2238">
        <div style="position:absolute;inset:9px;border:2px solid #A8842F;border-radius:16px"></div>
        <div style="padding:30px 30px 0;text-align:center"><div class="cz" style="font-size:17px;letter-spacing:.16em;color:#0F1E3D">ESCOLA TEOLÓGICA UNIÃO</div><div style="font-size:12.5px;font-style:italic;color:#7A5A14">Formação Bíblica, Teológica e Ministerial</div>
          <p style="font-size:14.5px;line-height:1.45;text-align:justify;margin:10px 0 0">Certificamos que <b>${esc(p.nome||'')}</b> é aluno(a) regularmente matriculado(a) no ${esc(c.titulo)}, curso livre de formação bíblica, teológica e ministerial da Escola Teológica União, Cristalina, Goiás.</p>
          <p style="font-size:12px;line-height:1.4;text-align:justify;margin:8px 0 0;border:1px solid #A8842F;padding:6px 10px;border-radius:4px">Documento de uso pessoal e intransferível. <b>Não substitui documento oficial de identidade</b> e não equivale a curso de graduação ou pós-graduação.</p>
          <p style="font-size:12.5px;font-style:italic;margin:10px 0 0">“Procura apresentar-te a Deus aprovado…” — 2 Timóteo 2.15</p>
          <div style="display:flex;gap:24px;margin-top:6px"><div style="flex:1;text-align:center"><div style="height:44px;border-bottom:1px solid #1B2238"></div><div class="cz" style="font-size:9.5px;margin-top:3px">ASSINATURA DO ALUNO</div></div>
          <div style="flex:1;text-align:center"><div style="height:44px;border-bottom:1px solid #1B2238;position:relative"><img src="${ASSINATURA}" alt="Assinatura do Diretor" style="position:absolute;left:50%;bottom:2px;transform:translateX(-50%);width:140px"></div><div class="cz" style="font-size:9.5px;margin-top:3px">PR. CHARLEI DE JESUS LIMA DIAS</div><div style="font-size:10px;font-style:italic">Idealizador e Diretor Geral</div></div></div></div>
        <div style="position:absolute;left:12px;right:12px;bottom:12px;height:28px;background:#0F1E3D;border-top:2px solid #C9A24A;border-radius:0 0 12px 12px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;color:#C9A24A;font-size:10.5px" class="cz"><span>CNPJ 59.037.548/0001-59</span><span>${reg}</span></div>
      </div></div>`;
  }
  { const cod=reg; const urlV=CONFIG.LINK_PUBLICO+'#validar-'+cod; box.insertAdjacentHTML('beforeend',`<div style="display:flex;gap:14px;align-items:center;justify-content:center;margin:14px 0 0;flex-wrap:wrap">${qrSVG(urlV,92)}<p style="font-size:14px;color:#4a4f5e;margin:0;max-width:420px">Código de autenticidade: <b>${esc(cod)}</b><br>Aponte a câmera para o QR Code ou confira em ${esc(CONFIG.LINK_PUBLICO)}#validar</p></div>`); }
  if(imprimirAoFinal)setTimeout(()=>$('#btnPrint').click(),300);
}
$('#btnPrint').onclick = ()=>{ try{ window.print() }catch(e){} setTimeout(()=>show($('#mPrint'),'Se a janela de impressão não abriu, abra a plataforma no navegador do celular ou do computador e toque novamente. Na impressão, escolha “Salvar como PDF”.','info'),800) };
$('#fotoIn').onchange = async e=>{
  const f = e.target.files[0]; const m=$('#mFoto'); if(!f) return;
  try{
    const img = await new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=URL.createObjectURL(f)});
    const W=300,H=400, cv=document.createElement('canvas'); cv.width=W; cv.height=H;
    const r=Math.max(W/img.width,H/img.height), w=img.width*r, h=img.height*r;
    cv.getContext('2d').drawImage(img,(W-w)/2,(H-h)/2,w,h);
    const data = cv.toDataURL('image/jpeg',0.85);
    await API.salvarFoto(data); S.profile = await API.profile(S.user.id); $('#myFoto').src = data;
    show(m,'Foto salva. Ela aparecerá na sua carteira de estudante.','ok');
  }catch(er){ show(m,'Não foi possível salvar a foto: '+(er.message||'arquivo inválido'),'err') }
};

/* ---------- envio de arquivos (direção) ---------- */
function uploadField(inputId, publico, tipo='pdf'){
  const T={pdf:['application/pdf','Escolher PDF do aparelho ou do Drive','ou cole um link do Google Drive acima'],
    video:['video/*','Escolher vídeo do aparelho','ou cole o link do YouTube, Vimeo ou Google Drive acima (recomendado para vídeos longos)'],
    audio:['audio/*','Escolher áudio do aparelho','ou cole um link do Google Drive acima']}[tipo];
  return `<div class="res" style="margin-top:6px;align-items:center"><label class="btn btn-line btn-sm" style="margin:0;font-family:'Cinzel',serif;letter-spacing:.06em;color:var(--navy)">${T[1]}
    <input type="file" accept="${T[0]}" data-up="${inputId}" data-pub="${publico?1:0}" style="display:none"></label><span class="upmsg" style="font-size:14px;color:var(--muted)">${T[2]}</span></div>`;
}
function bindUploads(root){
  root.querySelectorAll('[data-up]').forEach(inp=>inp.onchange=async()=>{
    const f=inp.files[0]; if(!f) return; const msg=inp.closest('.res').querySelector('.upmsg');
    if(f.size>50*1024*1024){ msg.innerHTML='<span style="color:var(--crimson)">Arquivo maior que 50 MB. Para vídeos longos, publique no YouTube como “não listado” e cole o link acima.</span>'; inp.value=''; return }
    msg.textContent='Enviando “'+f.name+'”… aguarde.';
    try{ const url=await API.enviarArquivo(f, inp.dataset.pub==='1'); root.querySelector('#'+inp.dataset.up).value=url; msg.innerHTML='<b style="color:var(--ok)">Arquivo enviado e guardado na plataforma.</b>' }
    catch(e){ msg.innerHTML='<span style="color:var(--crimson)">'+esc(e.message)+'</span>' }
  });
}

/* ---------- estudos adicionais ---------- */
let E_TIPO = '';
function renderEstudos(){
  const l = S.estudos.filter(e=>e.ativo!==false);
  const tipos = [...new Set(l.map(e=>e.tipo))];
  $('#eTabs').innerHTML = tipos.length>1 ? ['',...tipos].map(t=>`<button type="button" class="${t===E_TIPO?'on':''}" data-et="${esc(t)}">${t?esc({'Esboço de pregação':'Esboços de pregação','Escola Dominical':'Escola Dominical'}[t]||t+'s'):'Todos'}</button>`).join('') : '';
  $$('[data-et]').forEach(b=>b.onclick=()=>{E_TIPO=b.dataset.et;renderEstudos()});
  const v = l.filter(e=>!E_TIPO||e.tipo===E_TIPO);
  $('#eLista').innerHTML = v.length ? v.map(e=>`<article class="ecard"><div class="capa"><img src="${BRASAO}" alt=""><span>${esc((e.tipo||'').toUpperCase())}</span></div>
    <div class="bd"><span class="pill ok" style="align-self:flex-start">GRÁTIS</span><h3>${esc(e.titulo)}</h3><p>${esc(e.descricao||'')}</p>
    <div class="res" style="margin-top:6px">${e.pdf_url?`<button type="button" class="btn btn-gold btn-sm" data-ler="${esc(e.pdf_url)}" data-tit="${esc(e.titulo)}">Ler</button><a class="btn btn-line btn-sm" href="${esc(driveDownload(e.pdf_url))}" target="_blank" rel="noopener">Baixar PDF</a>`:''}</div></div></article>`).join('')
    : '<div class="panel"><p style="margin:0">Novos estudos em breve.</p></div>';
}

/* ---------- vídeo-aulas ---------- */
let V_CURSO = null;
function renderVideoaulas(){
  const cursos = ativosCursos().filter(c=>lessonsOf(c.id).length);
  if(!cursos.length){ $('#vTabs').innerHTML=''; $('#vLista').innerHTML='<div class="panel"><p style="margin:0">As vídeo-aulas estão em preparação.</p></div>'; return }
  if(!V_CURSO || !cursos.some(c=>c.id===V_CURSO)) V_CURSO = cursos[0].id;
  $('#vTabs').innerHTML = cursos.map(c=>`<button type="button" role="tab" class="${c.id===V_CURSO?'on':''}" data-vc="${c.id}">${esc(c.titulo.replace(' de Teologia',''))}</button>`).join('');
  $$('[data-vc]').forEach(b=>b.onclick=()=>{ V_CURSO=b.dataset.vc; renderVideoaulas() });
  const ok = hasAccess(V_CURSO);
  const play = `<span class="play"><svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="#0F1E3D"/></svg></span>`;
  const lock = `<span class="play" style="background:rgba(247,241,227,.9)"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F1E3D" stroke-width="2" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg></span>`;
  $('#vLista').innerHTML = discsOf(V_CURSO).filter(d=>d.aulas.length).map(d=>`
    <h3 class="cz" style="font-size:15px;color:var(--navy);margin-top:6px"><span style="color:var(--goldd);font-size:12px;letter-spacing:.16em">DISCIPLINA ${d.n}</span><br>${esc(d.nome)}</h3>
    <div class="vgrid">${d.aulas.map(a=>{const livre=a.previa||ok;const done=S.prog.includes(a.id);
      return `<button type="button" class="vcard" data-va="${a.id}" aria-label="Assistir: ${esc(a.titulo)}">
        <span class="vthumb"><img class="br" src="${BRASAO}" alt=""><span class="num">AULA ${a.ordem}</span>
          <span class="tag">${done?'<span class="pill ok">CONCLUÍDA</span>':a.previa&&!ok?'<span class="pill ok">GRÁTIS</span>':livre?'':'<span class="pill lock">MATRICULADOS</span>'}</span>${livre?play:lock}</span>
        <span class="vbody"><span class="t" style="display:block">${esc(a.titulo)}</span><span class="m" style="display:block">${esc(d.nome)}${a.horas?' · '+fmtH(+a.horas):''}</span></span></button>`}).join('')}</div>`).join('');
  $$('[data-va]').forEach(b=>b.onclick=()=>{ const a=S.aulas.find(x=>x.id===b.dataset.va); S.pendDisc=(a.disc_ordem||1)+'|'+(discsOf(a.curso_id).find(d=>d.n===(a.disc_ordem||1))?.nome||a.modulo); S.pendAula=a.id; location.hash='curso-'+a.curso_id });
}

/* ---------- pagamentos ---------- */
const STATUS_PAG = {pendente:['lock','EM CONFERÊNCIA'],aprovado:['ok','CONFIRMADO'],recusado:['off','RECUSADO']};
function fmtDH(iso){ try{ const d=new Date(iso); return d.toLocaleDateString('pt-BR')+' '+d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}) }catch(e){ return iso } }
async function lerArquivo(f){
  if(f.type==='application/pdf'){
    if(f.size>2.5*1024*1024) throw new Error('O PDF é muito grande (máximo 2,5 MB). Envie uma foto ou print do comprovante.');
    return await new Promise((ok,no)=>{const r=new FileReader();r.onload=()=>ok(r.result);r.onerror=no;r.readAsDataURL(f)});
  }
  const img = await new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=()=>no(new Error('Arquivo de imagem inválido.'));i.src=URL.createObjectURL(f)});
  const k = Math.min(1, 1400/Math.max(img.width,img.height)); const cv=document.createElement('canvas');
  cv.width=Math.round(img.width*k); cv.height=Math.round(img.height*k); cv.getContext('2d').drawImage(img,0,0,cv.width,cv.height);
  return cv.toDataURL('image/jpeg',0.8);
}
$('#fComp').onsubmit = async e=>{ e.preventDefault(); const m=$('#mComp'); const f=$('#cArq').files[0]; const cid=$('#mCursoSel').value;
  if(!S.user) return show(m,'Entre na sua conta para enviar o comprovante.','err');
  if(!f) return show(m,'Escolha a foto ou o PDF do comprovante.','err');
  const btn=e.target.querySelector('button[type=submit]'); btn.disabled=true; btn.textContent='Enviando…';
  try{
    const arq = await lerArquivo(f);
    const r = await API.enviarComprovante(cid, $('#cValor').value.trim(), arq);
    await refreshUser();
    const dias = r?.dias || 0;
    m.className='msg ok'; m.innerHTML = dias ? `Comprovante recebido! O <b>${esc(curso(cid).titulo)}</b> foi liberado provisoriamente por ${dias} dias enquanto a direção confere o pagamento. <a href="#curso-${cid}">Começar a estudar</a>` : `Comprovante recebido! A direção vai conferir o pagamento. Acompanhe em “Minha Área › Meus pagamentos”.`;
    m.classList.remove('hidden'); e.target.reset();
  }catch(er){ show(m, er.message||'Não foi possível enviar.','err') }
  btn.disabled=false; btn.textContent='Enviar comprovante';
};
async function renderMyPays(){
  let l=[]; try{ l = await API.meusComprovantes(S.user.id) }catch(e){}
  $('#myPays').innerHTML = l.length ? l.map(c=>{const st=STATUS_PAG[c.status]||['lock',c.status];
    return `<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;padding:10px 0;border-bottom:1px solid #EFE6D0"><span><b>${esc(curso(c.curso_id)?.titulo||c.curso_id)}</b><br><span style="font-size:15px;color:var(--muted)">Enviado em ${fmtDH(c.criado_em)}${c.valor?' · R$ '+esc(c.valor):''}${c.obs?' · '+esc(c.obs):''}</span></span><span class="pill ${st[0]}" style="align-self:center">${st[1]}</span></div>`}).join('')
    : `<p style="margin:0">Nenhum comprovante enviado. Depois de pagar via Pix (chave ${esc(CONFIG.PIX_CHAVE)}), envie o comprovante pela página de matrícula.</p>`;
}
async function drawPag(){
  let l=[]; try{ l = await API.comprovantes() }catch(e){}
  S.pags = l;
  const pend = l.filter(c=>c.status==='pendente').length;
  $('#tabPag').textContent = pend ? `Pagamentos (${pend})` : 'Pagamentos';
  $$('[data-nav="admin"]').forEach(a=>a.textContent = pend ? `Painel da Direção (${pend})` : 'Painel da Direção');
  const f = $('#pagFiltro').value;
  const rows = l.filter(c=>!f || c.status===f);
  $('#tbPag').innerHTML = rows.map(c=>{const a=S.alunos.find(x=>x.id===c.user_id)||{};const st=STATUS_PAG[c.status]||['lock',c.status];
    return `<tr><td><b>${esc(a.nome||'')}</b><br><span style="font-size:14px;color:var(--muted)">${esc(a.email||'')}</span></td><td>${esc(curso(c.curso_id)?.titulo||c.curso_id)}</td><td>${c.valor?'R$ '+esc(c.valor):'—'}</td><td>${fmtDH(c.criado_em)}</td><td><span class="pill ${st[0]}">${st[1]}</span></td>
      <td><div class="chips"><button class="btn btn-line btn-sm" data-vcomp="${c.id}">Ver comprovante</button>${c.status==='pendente'?`<button class="btn btn-gold btn-sm" data-okcomp="${c.id}">Confirmar</button><button class="btn btn-red btn-sm" data-nocomp="${c.id}">Recusar</button>`:''}</div></td></tr>`}).join('') || `<tr><td colspan="6">Nenhum comprovante ${f==='pendente'?'pendente':'encontrado'}.</td></tr>`;
  $$('[data-vcomp]').forEach(b=>b.onclick=async()=>{ const arq = await API.comprovanteArquivo(b.dataset.vcomp);
    if(!arq) return;
    if(arq.startsWith('data:application/pdf')){ const blob = await (await fetch(arq)).blob(); const url = URL.createObjectURL(blob);
      modal(`<h3>Comprovante (PDF)</h3><p><a class="btn btn-gold" href="${url}" target="_blank" rel="noopener">Abrir o PDF</a></p><div class="acts"><button class="btn btn-line" data-close>Fechar</button></div>`) }
    else modal(`<h3>Comprovante</h3><img src="${arq}" alt="Comprovante de pagamento" style="width:100%;border:1px solid #E1D4B2;border-radius:8px;margin-top:10px"><div class="acts"><button class="btn btn-line" data-close>Fechar</button></div>`,r=>{r.querySelector('.box').style.maxWidth='640px'});
  });
  $$('[data-okcomp]').forEach(b=>b.onclick=()=>{ const c=l.find(x=>x.id===b.dataset.okcomp); const x=new Date(); x.setDate(x.getDate()+CONFIG.ACESSO_CONFIRMADO_DIAS);
    modal(`<h3>Confirmar pagamento</h3><p>Confira no extrato do seu banco se o valor caiu. Ao confirmar, o <b>${esc(curso(c.curso_id)?.titulo||'')}</b> fica liberado até a data abaixo.</p>
      <label for="cfExp">Acesso até (próximo vencimento)</label><input type="date" id="cfExp" value="${x.toISOString().slice(0,10)}">
      <div class="chips" style="margin-top:8px"><button type="button" class="btn btn-line btn-sm" data-mes="1">Mensalidade: +1 mês</button><button type="button" class="btn btn-line btn-sm" data-mes="3">+3 meses</button><button type="button" class="btn btn-line btn-sm" data-mes="6">+6 meses</button><button type="button" class="btn btn-line btn-sm" data-mes="12">Anual: +12 meses</button></div>
      <p style="font-size:14px;color:var(--muted);margin:8px 0 0">Os meses contam a partir do vencimento atual do aluno (ou de hoje, se não houver). Após o vencimento, o aluno tem ${CONFIG.TOLERANCIA_DIAS} dias de tolerância e depois é bloqueado automaticamente.</p>
      <div class="acts"><button class="btn btn-line" data-close>Cancelar</button><button class="btn btn-gold" id="cfOk">Confirmar e liberar</button></div>`,(r,close)=>{
      const al=S.alunos.find(a=>a.id===c.user_id); const mm=al?.matriculas?.find(z=>z.curso_id===c.curso_id&&!z.provisoria);
      r.querySelectorAll('[data-mes]').forEach(bt=>bt.onclick=()=>{ const base=(mm?.expira_em&&mm.expira_em>today())?mm.expira_em:today(); const d=new Date(base+'T12:00:00'); d.setMonth(d.getMonth()+(+bt.dataset.mes)); r.querySelector('#cfExp').value=d.toISOString().slice(0,10) });
      r.querySelector('#cfOk').onclick=async()=>{ await API.decidirComprovante(c.id,true,r.querySelector('#cfExp').value,null); close(); await renderAdmin(); $('[data-tab=pagamentos]').click() } }) });
  $$('[data-nocomp]').forEach(b=>b.onclick=()=>{ const c=l.find(x=>x.id===b.dataset.nocomp);
    modal(`<h3>Recusar comprovante</h3><p>O acesso provisório deste curso será retirado. Informe o motivo para o aluno.</p>
      <label for="rcObs">Motivo</label><input id="rcObs" value="Pagamento não identificado. Fale com a direção pelo WhatsApp.">
      <div class="acts"><button class="btn btn-line" data-close>Cancelar</button><button class="btn btn-red" id="rcOk">Recusar</button></div>`,(r,close)=>{
      r.querySelector('#rcOk').onclick=async()=>{ await API.decidirComprovante(c.id,false,null,r.querySelector('#rcObs').value.trim()); close(); await renderAdmin(); $('[data-tab=pagamentos]').click() } }) });
}
$('#pagFiltro').onchange = drawPag;

/* ---------- formulários ---------- */
$('#fLogin').onsubmit = async e=>{ e.preventDefault(); const m=$('#mLogin');
  try{ await API.signIn($('#lEmail').value.trim(), $('#lPass').value); await refreshUser();
    if(S.profile?.is_admin){ await API.signOut(); await refreshUser(); return show(m,'Esta conta pertence à Direção e não entra pela Área do Aluno. A Direção tem acesso próprio e separado.','err') }
    if(S.profile?.bloqueado) show(m,'Seu acesso está suspenso. Fale com a direção.','err');
    location.hash = S.profile?.is_admin ? 'admin' : 'aluno';
  }catch(er){ show(m, er.message,'err') } };
function dirTrava(){ try{ return JSON.parse(localStorage.getItem('etu_dir_trava')||'{"n":0,"ate":0}') }catch(e){ return {n:0,ate:0} } }
$('#fDir').onsubmit = async e=>{ e.preventDefault(); const m=$('#mDir');
  const tv=dirTrava(); if(tv.ate>Date.now()) return show(m,`Acesso bloqueado por excesso de tentativas. Tente novamente em ${Math.ceil((tv.ate-Date.now())/60000)} minuto(s).`,'err');
  const falha=()=>{ const t=dirTrava(); t.n=(t.n||0)+1; if(t.n>=5){ t.ate=Date.now()+15*60000; t.n=0 } try{localStorage.setItem('etu_dir_trava',JSON.stringify(t))}catch(e){} };
  try{ await API.signIn($('#dEmail').value.trim(), $('#dPass').value); await refreshUser();
    if(!S.profile?.is_admin){ falha(); await API.signOut(); await refreshUser(); return show(m,'Acesso negado. Esta área é exclusiva da direção da escola.','err') }
    try{localStorage.removeItem('etu_dir_trava')}catch(e){}
    location.hash='admin';
  }catch(er){ falha(); show(m, er.message,'err') } };
/* saída automática da direção após 30 minutos sem uso */
let ociosoT=null; function marcaUso(){ clearTimeout(ociosoT); if(S.profile?.is_admin) ociosoT=setTimeout(async()=>{ if(S.profile?.is_admin){ await API.signOut(); await refreshUser(); location.hash='direcao'; setTimeout(()=>show($('#mDir'),'Por segurança, a sessão da direção foi encerrada após 30 minutos sem uso. Entre novamente.','err'),300) } },30*60000) }
['click','keydown','touchstart'].forEach(ev=>document.addEventListener(ev,marcaUso,{passive:true}));
$('#fSign').onsubmit = async e=>{ e.preventDefault(); const m=$('#mSign');
  const nome=$('#sNome').value.trim(), email=$('#sEmail').value.trim(), pw=$('#sPass').value;
  if(!nome||!email) return show(m,'Preencha o nome e o e-mail.','err');
  if(pw.length<6) return show(m,'A senha deve ter pelo menos 6 caracteres.','err');
  if(!$('#sAceite').checked) return show(m,'Confirme a ciência sobre o curso livre.','err');
  try{ await API.signUp(nome,$('#sTel').value.trim(),email,pw,$('#sCurso').value); await refreshUser();
    if(S.user) location.hash='aluno'; else show(m,'Conta criada! Enviamos um e-mail de confirmação. Abra o link e depois entre na plataforma.','ok');
  }catch(er){ show(m, er.message,'err') } };
$('#fForgot').onsubmit = async e=>{ e.preventDefault(); const m=$('#mForgot'); const email=$('#fEmail').value.trim();
  if(!email) return show(m,'Informe o seu e-mail.','err');
  try{ await API.forgot(email);
    if(API.demo){ m.className='msg info'; m.innerHTML='No modo demonstração nenhum e-mail é enviado. <a href="#nova-senha">Clique aqui para simular o link recebido.</a>'; m.classList.remove('hidden') }
    else show(m,'Se este e-mail estiver cadastrado, você receberá em instantes um link para criar uma nova senha. Verifique também a caixa de spam.','ok');
  }catch(er){ show(m, er.message,'err') } };
$('#fNew').onsubmit = async e=>{ e.preventDefault(); const m=$('#mNew'); const a=$('#nPass').value, b=$('#nPass2').value;
  if(a.length<6) return show(m,'A senha deve ter pelo menos 6 caracteres.','err');
  if(a!==b) return show(m,'As senhas não são iguais.','err');
  try{ await API.newPassword(a); recovering=false; show(m,'Senha alterada com sucesso! Você já pode entrar com a nova senha.','ok'); await refreshUser(); }
  catch(er){ show(m, er.message,'err') } };

/* ---------- inicialização ---------- */
fillSelects();
$('#menuBtn').onclick = ()=>{ const n=$('#mainNav'); n.classList.toggle('open'); $('#menuBtn').setAttribute('aria-expanded', n.classList.contains('open')) };
$$('.tabs button').forEach(b=>b.onclick=()=>{ $$('.tabs button').forEach(x=>x.classList.toggle('on',x===b)); $$('[data-tabpanel]').forEach(p=>p.classList.toggle('hidden',p.dataset.tabpanel!==b.dataset.tab)) });
$('#busca').oninput = drawAlunos;
$('#aCursoSel').onchange = drawAulas;
$('#btnNovaAula').onclick = ()=>dlgAula(null);
$('#btnNovoMural').onclick = ()=>dlgMural(null);
$('#btnNovoCurso').onclick = ()=>dlgCurso(null);
$('#btnNovoEstudo').onclick = ()=>dlgEstudo(null);
$('#ano').textContent = new Date().getFullYear();
const WA = (msg)=>`https://wa.me/${CONFIG.WHATSAPP_LINK}${msg?'?text='+encodeURIComponent(msg):''}`;
$('#contato').innerHTML = `WhatsApp: <a href="${WA('Olá! Gostaria de informações sobre a Escola Teológica União.')}" target="_blank" rel="noopener">${esc(CONFIG.WHATSAPP)}</a><br>E-mail: <a href="mailto:${esc(CONFIG.EMAIL)}">${esc(CONFIG.EMAIL)}</a><br>Pix (telefone): ${esc(CONFIG.PIX_CHAVE)}`;
$$('.waLink').forEach(a=>a.href=WA('Olá! Gostaria de informações sobre a Escola Teológica União.'));
$$('.waShow').forEach(e=>e.textContent=CONFIG.WHATSAPP);
$$('.emailShow').forEach(e=>e.textContent=CONFIG.EMAIL);
$$('.emailLink').forEach(a=>a.href='mailto:'+CONFIG.EMAIL);
$$('.pixShow').forEach(e=>e.textContent=CONFIG.PIX_CHAVE);

function waEnroll(){ const c=curso($('#mCursoSel').value); const p=S.profile;
  $('#waEnroll').href = WA(`Olá! Sou ${p?.nome||'[seu nome completo]'}${S.user?' (e-mail da conta: '+S.user.email+')':''}. Fiz o pagamento via Pix e quero me matricular no ${c.titulo}. Segue o comprovante.`) }
$('#mCursoSel').onchange = waEnroll;
$('#copyPix').onclick = async()=>{ const m=$('#pixMsg'); try{ await navigator.clipboard.writeText(CONFIG.PIX_COPIAR); show(m,'Chave Pix copiada. Cole no aplicativo do seu banco.','ok') }catch(e){ show(m,'Não foi possível copiar automaticamente. Chave: '+CONFIG.PIX_COPIAR,'info') } };
function renderTicker(){ const avisos = [...CONFIG.AVISOS, ...ativosCursos().filter(c=>c.em_breve).map(c=>'Em breve: '+c.titulo+(ofereceCertificado(c)?' — com certificado após a conclusão':'')), ...S.mural.filter(m=>m.tipo==='Aviso').map(m=>m.titulo)];
  const html = avisos.map(a=>`<span class="it">${esc(a)}</span>`).join(''); $('#tickerTrack').innerHTML = html + html; }
function renderDepoimentos(){
  const l=S.mural.filter(m=>m.tipo==='Depoimento');
  $('#depGrid').innerHTML = l.length ? l.map(m=>{const v=toEmbed(m.video_url);
    return `<article class="mcard">${v&&EMBED_OK?`<div class="video"><iframe src="${esc(v)}" title="${esc(m.titulo)}" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`:''}
      <div class="bd"><div class="mtag">DEPOIMENTO</div><h3>${esc(m.titulo)}</h3><p>${esc(m.texto||'')}</p>${m.video_url?`<a class="btn btn-line btn-sm" style="margin-top:10px" href="${esc(m.video_url)}" target="_blank" rel="noopener">Assistir ao vídeo</a>`:''}</div></article>`}).join('')
    : `<div class="panel" style="grid-column:1/-1;text-align:center"><p style="margin:0">Os primeiros depoimentos em vídeo serão publicados em breve.</p></div>`;
  $('#waDepo2').href = WA('Olá! Sou aluno(a) da Escola Teológica União e quero enviar o meu depoimento em vídeo. Autorizo a publicação na plataforma.');
}
function renderMural(){
  const items = S.mural;
  $('#muralSec').classList.toggle('hidden', !items.length);
  $('#muralGrid').innerHTML = items.map(m=>{ const v=toEmbed(m.video_url);
    return `<article class="mcard">${v&&EMBED_OK?`<div class="video"><iframe src="${esc(v)}" title="${esc(m.titulo)}" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`:''}
      <div class="bd"><div class="mtag">${esc((m.tipo||'').toUpperCase())}</div><h3>${esc(m.titulo)}</h3><p>${esc(m.texto||'')}</p>
      ${m.video_url?`<a class="btn btn-line btn-sm" style="margin-top:10px" href="${esc(m.video_url)}" target="_blank" rel="noopener">Assistir em nova aba</a>`:''}</div></article>`}).join(''); }
/* ---------- mostrar senha ---------- */
function olho(abre){return abre?'<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/></svg>':'<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M3 3l18 18M10.6 5.1A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.1M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7a10 10 0 0 0 4.4-1"/></svg>'}
function ligaOlho(root=document){ root.querySelectorAll('input[type=password]').forEach(inp=>{ if(inp.parentNode.classList.contains('pw')) return;
  const w=document.createElement('span'); w.className='pw'; inp.parentNode.insertBefore(w,inp); w.appendChild(inp);
  const b=document.createElement('button'); b.type='button'; b.className='pw-eye'; b.setAttribute('aria-controls',inp.id); b.setAttribute('aria-pressed','false');
  const draw=()=>{const vis=inp.type==='text'; b.innerHTML=olho(!vis)+(vis?'Ocultar':'Mostrar'); b.setAttribute('aria-label',vis?'Ocultar a senha':'Mostrar a senha'); b.setAttribute('aria-pressed',String(vis))};
  b.onclick=()=>{inp.type=inp.type==='password'?'text':'password'; draw(); inp.focus()}; draw(); w.appendChild(b);
  inp.form&&inp.form.addEventListener('submit',()=>{inp.type='password';draw()});
}) }
ligaOlho();
/* ---------- atalhos do painel ---------- */

(function(){ const u=CONFIG.LINK_PUBLICO; const msg='Conheça a Escola Teológica União — Curso Livre de Teologia. Acesse a plataforma: '+u;
  $('#lpUrl').textContent=u; $('#lpZap').href='https://wa.me/?text='+encodeURIComponent(msg);
  $('#lpCopiar').onclick=async()=>{ try{ await navigator.clipboard.writeText(u) }catch(e){ const t=document.createElement('textarea'); t.value=u; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove() } $('#lpCopiar').textContent='Link copiado ✓'; setTimeout(()=>$('#lpCopiar').textContent='Copiar link',2500) };
  if(navigator.share) $('#lpShare').onclick=()=>navigator.share({title:'Escola Teológica União',text:msg,url:u}).catch(()=>{}); else $('#lpShare').style.display='none';
})();
$$('#qaAdmin [data-qa]').forEach(b=>b.onclick=()=>{ const t=$(`[data-tab="${b.dataset.qa}"]`); if(t) t.click(); const bt=b.dataset.qaBtn&&document.getElementById(b.dataset.qaBtn); const tb=$('.tabs'); tb&&tb.scrollIntoView({behavior:'smooth',block:'start'}); if(bt) setTimeout(()=>bt.click(),250) });
/* ---------- Assistente ETU ---------- */
const AI_PERFIL_PADRAO=`Você é o Assistente ETU, atendente virtual da Escola Teológica União (ETU), escola de cursos livres de formação bíblica, teológica e ministerial, com sede em Cristalina, Goiás. Idealizador e Diretor Geral: Pr. Charlei de Jesus Lima Dias.

Como atender:
- Responda sempre em português do Brasil, com cordialidade, clareza e respeito, como um secretário e professor cristão.
- Ajude os alunos a usar a plataforma: entrar, recuperar a senha, encontrar aulas, apostilas e vídeos, fazer as provas, acompanhar o progresso, enviar o comprovante de pagamento.
- Ajude nos estudos: explique termos teológicos, contextos bíblicos e doutrinas, sempre com a Bíblia e na linha da escola — trinitária, pentecostal clássica, arminiana, dispensacionalista e pré-tribulacionista —, apresentando com respeito as outras posições quando houver debate entre cristãos.
- Converse com naturalidade: responda saudações, agradeça, faça perguntas para entender a dúvida do aluno.
- Nas questões bíblicas e teológicas, responda com o preparo de um doutor em teologia: contexto histórico e literário, sentido das palavras no original explicado em português, teologia bíblica e sistemática, história da Igreja e apologética, sempre com as referências bíblicas e com aplicação para a vida e o ministério.
- Também ajude a direção: redação de avisos, organização de aulas, perguntas de prova, esboços e revisões, na linha editorial da escola.
- Quando o assunto exigir a direção (pagamento, liberação de curso, certificado, reclamação, caso pessoal delicado) ou quando o aluno pedir atendimento humano, explique que vai encaminhar e oriente o aluno a tocar em “Falar com a direção (atendimento humano)”.
- Em perguntas de prova, ensine o caminho para a resposta, mas não entregue o gabarito.
- Cursos: Curso Básico, Curso Médio e Curso Avançado de Teologia (cursos livres; não equivalem a graduação reconhecida pelo MEC). Matrícula via Pix, chave (61) 99521-1432; o comprovante é enviado na própria plataforma ou pelo WhatsApp (61) 99521-1432. E-mail: etu.escolateologicauniao215@gmail.com.`;
const AI_LIMITES_PADRAO=`- Nunca peça nem informe senhas; para trocar a senha, oriente o aluno a usar “Esqueci a senha”.
- Não confirme pagamentos, não libere cursos, não emita certificados e não prometa prazos: isso é decidido pela direção. Encaminhe ao WhatsApp da escola.
- Não fale em nome do diretor nem invente regras, preços, datas ou documentos que não estejam nestas instruções.
- Não invente versículos, citações, autores nem fatos históricos; quando não souber, diga que não sabe.
- Em assuntos pessoais graves (saúde, crise emocional, conflitos familiares), acolha com respeito e oriente a procurar o pastor, a família e, se necessário, ajuda profissional.
- Não trate de política partidária nem de assuntos alheios à escola e aos estudos bíblicos.`;
function demoAt(){ try{return JSON.parse(localStorage.getItem('etu_atend')||'[]')}catch(e){return []} }
function demoAi(){ let c={}; try{c=JSON.parse(localStorage.getItem('etu_ai_cfg')||'{}')}catch(e){} return {ativo:true,nome:'Assistente ETU',publico:'alunos',limite_diario:30,modelo:'claude-sonnet-5-5',instrucoes:AI_PERFIL_PADRAO,limites:AI_LIMITES_PADRAO,...c} }
const FAQ=[
 [/(senha|cpf|rg|documento|endere[çc]o|telefone|e-?mail|dados|nota|pagamento|matr[ií]cula) (d[oae]s?|de) (outr|meu (filho|irm[ãa]o|amigo|esposa|marido)|fulan|alun[oa]s?\b)|dados (pessoais )?de outr|(qual|me (passa|d[êe]|informe)) (a )?(senha|cpf|documento)/i,()=>`Por segurança, o assistente nunca informa senhas, documentos, notas, pagamentos nem qualquer dado pessoal, nem de você nem de outra pessoa. Cada aluno vê os próprios dados só depois de entrar com a sua senha na Área do Aluno. Se precisar de algo assim, toque em “Falar com a direção”: a direção confirma a identidade antes de qualquer informação.`],
 [/^\s*(bom dia|boa tarde|boa noite|ol[áa]|oi|paz do senhor|a paz do senhor|gra[çc]a e paz|e a[íi])\b/i,()=>{const h=new Date().getHours();return `${h<12?'Bom dia':h<18?'Boa tarde':'Boa noite'}! A paz do Senhor. Seja bem-vindo à Escola Teológica União. Em que posso ajudar hoje? Pode perguntar sobre os cursos, a matrícula, o acesso à plataforma ou pedir para falar com a direção.`}],
 [/obrigad|valeu|deus te aben[çc]oe|grato|grata/i,()=>`Amém! Nós é que agradecemos. Que o Senhor abençoe os seus estudos. Se precisar de algo mais, é só escrever.`],
 [/humano|pessoa|atendente|diretor|dire[çc][ãa]o|pastor charlei|falar com algu[ée]m/i,()=>`Claro. Toque no botão “Falar com a direção (atendimento humano)”, logo abaixo, deixe o seu nome, o seu contato e a sua mensagem: o pedido chega ao painel da direção e o senhor(a) recebe a resposta pelo WhatsApp ou e-mail informado.`],
 [/^(?!.*(matr[ií]cul|pix|pag|comprovante|certificad)).*(curso|n[íi]vel|b[áa]sico|m[ée]dio|avan[çc]ado|disciplin)/i,()=>`A escola oferece o Curso Básico, o Curso Médio e o Curso Avançado de Teologia, cursos livres de formação bíblica, teológica e ministerial. Na página “Cursos”, toque em “Ver disciplinas” para conhecer a grade de cada nível. Há também uma aula grátis para experimentar.`],
 [/matr[ií]cul|inscri|valor|pre[çc]o|pagar|pagamento|pix/i,()=>`Para se matricular, abra a página “Matrícula”, escolha o curso (Básico, Médio ou Avançado) e faça o Pix para a chave (telefone) ${CONFIG.PIX_CHAVE}. Depois envie o comprovante pela plataforma ou pelo WhatsApp ${CONFIG.WHATSAPP}. A direção confere e libera o curso completo.`],
 [/senha|esqueci|n[ãa]o consigo entrar|login|acessar/i,()=>`Na tela “Área do Aluno”, toque em “Esqueci a senha”, informe o seu e-mail e siga o link que chegar na sua caixa de entrada (confira também o spam). Para ver o que está digitando, toque em “Mostrar”, ao lado do campo da senha.`],
 [/comprovante/i,()=>`Depois de fazer o Pix, entre na sua área, abra o curso e use “Enviar comprovante”. Se preferir, envie pelo WhatsApp ${CONFIG.WHATSAPP}.`],
 [/certificad|carteir/i,()=>`O certificado é liberado quando o aluno conclui todas as aulas e provas do curso. A carteirinha é preparada pela Direção. Quando o PDF estiver disponível, você receberá um aviso na plataforma e poderá baixá-lo na sua área.`],
 [/prova|nota|quest/i,()=>`Cada aula tem uma prova com alternativas de A a E. A nota mínima é ${CONFIG.NOTA_MINIMA}%. Se não alcançar, revise a aula e faça novamente: a alternativa certa aparece em verde e a errada em vermelho.`],
 [/apostila|pdf|v[íi]deo|aula/i,()=>`As aulas, os vídeos e as apostilas ficam dentro de cada curso, na sua área de aluno. Há também uma aula grátis e a Biblioteca Grátis, com estudos e esboços abertos a todos.`],
 [/mec|reconhecid|gradua/i,()=>`Os cursos da Escola Teológica União são cursos livres de formação bíblica, teológica e ministerial; não equivalem a graduação ou pós-graduação reconhecidas pelo MEC.`]];
function faqResposta(t,demo){ for(const [re,f] of FAQ) if(re.test(t)) return f();
  return demo?`Ainda estou aprendendo a responder perguntas abertas: por enquanto atendo às perguntas frequentes (cursos, matrícula, senha, comprovante, provas, apostilas e certificado). Para esta pergunta, toque em “Falar com a direção (atendimento humano)” e a sua mensagem chega direto à direção da escola.`:`Não encontrei essa resposta nas perguntas frequentes. Toque em “Falar com a direção (atendimento humano)” e a sua mensagem chega direto à direção da escola.` }
const AI={hist:[],cfg:null,busy:false};
function aiAdd(t,quem){ const d=document.createElement('div'); d.className='ai-m '+quem; d.textContent=t; $('#aiMsgs').appendChild(d); $('#aiMsgs').scrollTop=1e9; return d }
function aiAjusta(){ if(innerWidth>700||!window.visualViewport) { $('#aiBox').style.height=''; $('#aiBox').style.top=''; return } const v=visualViewport; $('#aiBox').style.height=v.height+'px'; $('#aiBox').style.top=v.offsetTop+'px'; $('#aiMsgs').scrollTop=1e9 }
if(window.visualViewport){ visualViewport.addEventListener('resize',aiAjusta); visualViewport.addEventListener('scroll',aiAjusta) }
async function aiAbrir(){ $('#aiBox').classList.remove('hidden'); document.body.classList.add('ai-aberto'); aiAjusta(); $('#aiOpen').setAttribute('aria-expanded','true');
  if(!AI.cfg){ try{AI.cfg=await API.aiPublico()}catch(e){AI.cfg=null} if(AI.cfg?.nome) $('#aiNome').textContent=AI.cfg.nome }
  etuAvatar(AI.cfg?.foto||'');
  if(!$('#aiMsgs').children.length){ aiAdd(`A paz do Senhor! Sou o ${AI.cfg?.nome||'Assistente ETU'}. Posso ajudar com a plataforma (entrar, senha, aulas, provas, matrícula) e com dúvidas de estudo bíblico. Como posso ajudar?`,'bot');
    $('#aiSug').innerHTML=['Como faço a matrícula?','Esqueci a minha senha','Como envio o comprovante?','Quando recebo o certificado?'].map(x=>`<button type="button">${x}</button>`).join('');
    $$('#aiSug button').forEach(b=>b.onclick=()=>{ $('#aiTxt').value=b.textContent; aiEnviar() }) }
  $('#aiTxt').focus() }
async function aiEnviar(){ const t=$('#aiTxt').value.trim(); if(!t||AI.busy) return; $('#aiTxt').value=''; $('#aiSug').innerHTML=''; aiAdd(t,'eu'); AI.hist.push({role:'user',content:t});
  const w=aiAdd('Escrevendo…','bot'); AI.busy=true;
  try{ let r;
    const usaIA = !API.demo && AI.cfg && AI.cfg.ativo && !!S.user;
    if(usaIA){ const d=await API.perguntar(AI.hist.slice(-12)); r=d.resposta; if(d.encaminhado) setTimeout(()=>aiAdd('Seu pedido foi registrado no painel da direção. A resposta chegará pelo contato do seu cadastro.','bot'),300) }
    else if(!API.demo && AI.cfg && AI.cfg.ativo && !S.user) r=faqResposta(t,false)+'\n\nPara dúvidas de estudo bíblico, entre na Área do Aluno: o assistente completo atende os alunos matriculados.';
    else r=API.demo?(await API.perguntar(AI.hist)).resposta:faqResposta(t,false);
    w.textContent=r; AI.hist.push({role:'assistant',content:r});
  }catch(e){ w.textContent=e.message } AI.busy=false; $('#aiMsgs').scrollTop=1e9 }
$('#aiOpen').onclick=()=>$('#aiBox').classList.contains('hidden')?aiAbrir():($('#aiBox').classList.add('hidden'),document.body.classList.remove('ai-aberto'),$('#aiOpen').setAttribute('aria-expanded','false'));
$('#aiClose').onclick=()=>{$('#aiBox').classList.add('hidden');document.body.classList.remove('ai-aberto');$('#aiOpen').setAttribute('aria-expanded','false');$('#aiOpen').focus()};
$('#aiEnviar').onclick=aiEnviar;
$('#aiLimpar').onclick=()=>confirmBox('Apagar toda esta conversa da tela? Ela não poderá ser recuperada neste aparelho.',()=>{ AI.hist=[]; $('#aiMsgs').innerHTML=''; $('#aiSug').innerHTML=''; aiAbrir() });
$('#aiHumano').onclick=()=>{ if($('#aiMsgs .ai-form')) return;
  const d=document.createElement('div'); d.className='ai-m bot ai-form'; d.style.whiteSpace='normal';
  d.innerHTML=`<b>Atendimento humano</b><br>Vou encaminhar a sua mensagem à direção da escola. Preencha abaixo:
    <label for="hNome">Seu nome</label><input id="hNome" value="${esc(S.profile?.nome||'')}">
    <label for="hCont">WhatsApp ou e-mail para resposta</label><input id="hCont" value="${esc(S.profile?.telefone||S.user?.email||'')}">
    <label for="hMsg">Sua mensagem</label><textarea id="hMsg" rows="3">${esc([...AI.hist].reverse().find(m=>m.role==='user')?.content||'')}</textarea>
    <div style="display:flex;gap:6px;margin-top:8px"><button class="btn btn-gold btn-sm" id="hEnv" type="button">Encaminhar à direção</button></div>`;
  $('#aiMsgs').appendChild(d); $('#aiMsgs').scrollTop=1e9; d.querySelector('#hNome').focus();
  d.querySelector('#hEnv').onclick=async()=>{ const a={nome:d.querySelector('#hNome').value.trim(),contato:d.querySelector('#hCont').value.trim(),mensagem:d.querySelector('#hMsg').value.trim(),conversa:AI.hist.slice(-20)};
    if(!a.nome||!a.contato||!a.mensagem){ aiAdd('Preencha o nome, o contato e a mensagem, por favor.','bot'); return }
    try{ await API.abrirAtendimento(a); d.remove(); aiAdd('Encaminhar à direção: '+a.mensagem,'eu');
      const w=aiAdd('','bot'); w.style.whiteSpace='normal';
      w.innerHTML=`Pronto, ${esc(a.nome.split(' ')[0])}! Sua mensagem foi encaminhada à direção da Escola Teológica União, que responderá pelo contato informado (${esc(a.contato)}). Se for urgente, você também pode chamar agora no WhatsApp:<br><a class="btn btn-line btn-sm" style="margin-top:8px" target="_blank" rel="noopener" href="https://wa.me/${CONFIG.WHATSAPP_LINK}?text=${encodeURIComponent('A paz do Senhor! Sou '+a.nome+'. '+a.mensagem)}">Abrir o WhatsApp da escola</a>`;
    }catch(e){ aiAdd(e.message,'bot') } };
};
async function drawAtend(){
  let L=[]; try{ L=await API.atendimentos() }catch(e){}
  const ab=L.filter(x=>x.status!=='resolvido').length;
  $('#tabAtend').textContent = ab?`Atendimentos (${ab})`:'Atendimentos';
  $('#atPanel').innerHTML=`<h3>Atendimentos encaminhados à direção</h3>
    <p style="margin:0 0 10px;color:var(--muted);font-size:16px">Quando o aluno toca em “Falar com a direção”, ou quando o assistente percebe que o assunto precisa da direção, o pedido aparece aqui com a conversa. Responda pelo WhatsApp e marque como resolvido. Se a sua resposta servir para outros alunos, use “Ensinar ao assistente”: ela entra na base de conhecimento dele.</p>
    ${L.length?L.map(x=>`<div class="panel" style="margin:12px 0;padding:16px;${x.status==='resolvido'?'opacity:.7':''}">
      <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><b>${esc(x.nome||'Sem nome')}</b><span class="pill ${x.status==='resolvido'?'ok':'lock'}">${x.status==='resolvido'?'RESOLVIDO':'AGUARDANDO A DIREÇÃO'}</span></div>
      <div style="font-size:14px;color:var(--muted)">${esc(x.contato||'')} • ${fmtDate((x.criado_em||'').slice(0,10))}</div>
      <div style="margin-top:6px">${x.user_id?'<span class="pill ok">CONTA VERIFICADA (ALUNO CONECTADO)</span>':'<span class="pill off">NÃO VERIFICADO — VISITANTE SEM LOGIN</span>'}</div>
      ${x.user_id?'':'<p style="font-size:14px;color:var(--crimson);margin:6px 0 0">Atenção: este pedido veio de alguém sem login. Antes de passar qualquer informação pessoal, de matrícula ou de pagamento, confirme a identidade pelo telefone ou e-mail do cadastro do aluno, e nunca envie senhas ou documentos.</p>'}
      <p style="margin:8px 0">${esc(x.mensagem||'')}</p>
      ${(x.conversa||[]).length?`<details><summary style="cursor:pointer;color:var(--navy)">Ver a conversa com o assistente</summary>${(x.conversa||[]).map(m=>`<p style="margin:6px 0;font-size:14.5px"><b>${m.role==='user'?'Aluno':'Assistente'}:</b> ${esc(m.content)}</p>`).join('')}</details>`:''}
      <label for="r${x.id}">Resposta da direção (fica registrada)</label><textarea id="r${x.id}" rows="3">${esc(x.resposta||'')}</textarea>
      <div class="res">${/\d{8,}/.test((x.contato||'').replace(/\D/g,''))?`<a class="btn btn-navy btn-sm" target="_blank" rel="noopener" data-wa="${x.id}" href="#">Responder pelo WhatsApp</a>`:''}${/@/.test(x.contato||'')?`<a class="btn btn-navy btn-sm" data-mail="${x.id}" href="#">Responder por e-mail</a>`:''}
        <button class="btn btn-gold btn-sm" data-res="${x.id}" type="button">${x.status==='resolvido'?'Salvar resposta':'Marcar como resolvido'}</button>
        <button class="btn btn-line btn-sm" data-ens="${x.id}" type="button">Ensinar ao assistente</button>
        <button class="btn btn-red btn-sm" data-delat="${x.id}" type="button">Apagar</button></div></div>`).join(''):'<p>Nenhum atendimento encaminhado até agora.</p>'}
    <div class="msg hidden" id="mAt"></div>`;
  const resp=id=>($('#r'+id)?.value||'').trim();
  $$('#atPanel [data-wa]').forEach(a=>{ const x=L.find(y=>String(y.id)===a.dataset.wa); a.onclick=e=>{ let n=(x.contato||'').replace(/\D/g,''); if(n.length<=11) n='55'+n; a.href=`https://wa.me/${n}?text=${encodeURIComponent('A paz do Senhor, '+(x.nome||'')+'! Aqui é da Escola Teológica União. '+resp(x.id))}` } });
  $$('#atPanel [data-mail]').forEach(a=>{ const x=L.find(y=>String(y.id)===a.dataset.mail); a.onclick=()=>{ a.href=`mailto:${x.contato}?subject=${encodeURIComponent('Escola Teológica União — resposta ao seu atendimento')}&body=${encodeURIComponent(resp(x.id))}` } });
  $$('#atPanel [data-res]').forEach(b=>b.onclick=async()=>{ await API.salvarAtendimento(isNaN(+b.dataset.res)?b.dataset.res:+b.dataset.res,{status:'resolvido',resposta:resp(b.dataset.res)}); drawAtend() });
  $$('#atPanel [data-delat]').forEach(b=>b.onclick=()=>confirmBox('Apagar este atendimento e a conversa registrada?',async()=>{ try{ await API.apagarAtendimento(isNaN(+b.dataset.delat)?b.dataset.delat:+b.dataset.delat); drawAtend() }catch(e){ show($('#mAt'),e.message,'err') } }));
  $$('#atPanel [data-ens]').forEach(b=>b.onclick=async()=>{ const x=L.find(y=>String(y.id)===b.dataset.ens); const r=resp(x.id); if(!r) return show($('#mAt'),'Escreva a resposta antes de ensinar ao assistente.','err');
    try{ const c={...demoAi(),...((await API.aiConfig())||{})}; const novo=(c.conhecimento?c.conhecimento+'\n\n':'')+`Pergunta: ${x.mensagem}\nResposta da direção: ${r}`; await API.saveAiConfig({...c,conhecimento:novo}); show($('#mAt'),'Resposta acrescentada à base de conhecimento do assistente.','ok') }catch(e){ show($('#mAt'),e.message,'err') } });
}
$('#aiTxt').addEventListener('focus',()=>{ if(innerWidth<=700) $('#aiSug').innerHTML=''; setTimeout(aiAjusta,300) });
$('#aiTxt').addEventListener('input',()=>{ const t=$('#aiTxt'); t.style.height='auto'; t.style.height=Math.min(t.scrollHeight,110)+'px' });
$('#aiTxt').addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();aiEnviar()} });
async function drawAiAdm(){
  let c; try{ c=await API.aiConfig() }catch(e){ c=null } c={...demoAi(),...(c||{})};
  if(!c.instrucoes) c.instrucoes=AI_PERFIL_PADRAO; if(!c.limites) c.limites=AI_LIMITES_PADRAO;
  ETU_MANUAIS=Array.isArray(c.manuais)?structuredClone(c.manuais):[]; ETU_FOTO=c.foto||''; ETU_MANUAL_EDIT=null;
  $('#aiPanel').innerHTML=`<h3>Assistente ETU — atendimento automático</h3>
    <p style="margin:0 0 10px;color:var(--muted);font-size:16px">O assistente aparece no botão <b>AJUDA</b>, no canto da tela. Ele orienta os alunos no uso da plataforma e tira dúvidas de estudo bíblico seguindo o perfil e os limites que a direção definir aqui. Pagamentos, liberação de cursos e certificados continuam sempre com a direção.</p>
    ${API.demo?'<p class="msg" style="display:block">Modo demonstração: o assistente responde só às perguntas frequentes. A inteligência completa funciona quando a plataforma estiver ligada ao banco de dados e à chave do assistente, como explicado no guia de ativação.</p>':''}
    <div class="check"><input type="checkbox" id="aiAtivo" ${c.ativo?'checked':''}><label for="aiAtivo" style="margin:0;font-family:inherit;font-size:16px;letter-spacing:0;color:var(--ink);font-weight:400">Assistente ligado</label></div>
    <div class="grid3"><div><label for="aiNomeIn">Nome do assistente</label><input id="aiNomeIn" value="${esc(c.nome)}"></div>
    <div><label for="aiPub">Quem pode usar a inteligência completa</label><select id="aiPub"><option value="alunos" ${c.publico==='alunos'?'selected':''}>Somente alunos com conta</option><option value="todos" ${c.publico==='todos'?'selected':''}>Alunos; visitantes usam perguntas frequentes</option></select></div>
    <div><label for="aiLim">Mensagens por pessoa por dia</label><input id="aiLim" type="number" min="1" max="200" value="${+c.limite_diario||30}"></div></div>
    <label for="aiMod">Modelo</label><select id="aiMod"><option value="claude-sonnet-5-5" ${c.modelo!=='claude-haiku-5-5'?'selected':''}>Mais completo (recomendado para teologia)</option><option value="claude-haiku-5-5" ${c.modelo==='claude-haiku-5-5'?'selected':''}>Mais rápido e econômico</option></select>
    <label for="aiIns">Perfil do assistente (quem ele é e como deve atender)</label><textarea id="aiIns" rows="12">${esc(c.instrucoes)}</textarea>
    <label for="aiLmt">Limites impostos pela direção (o que ele nunca deve fazer)</label><textarea id="aiLmt" rows="8">${esc(c.limites)}</textarea>
    <label for="aiCon">Base comum para os alunos (somente informações que podem ser compartilhadas; use os manuais abaixo para conteúdo reservado)</label><textarea id="aiCon" rows="10" placeholder="Ex.: Pergunta: Posso fazer o Curso Médio sem o Básico?&#10;Resposta da direção: ...">${esc(c.conhecimento||'')}</textarea>
    <div class="msg hidden" id="mAi"></div>
    <div class="res"><button class="btn btn-gold" id="aiSalvar" type="button">Salvar o assistente</button><button class="btn btn-line" id="aiPadrao" type="button">Restaurar o texto padrão</button><button class="btn btn-line" id="aiTestar" type="button">Testar agora</button></div>
    <div id="etuPerfilManual"></div><h3 style="margin-top:26px">Últimas perguntas recebidas</h3><div id="aiLogBox" style="font-size:15px;color:var(--muted)">Carregando…</div>
    <div class="res"><button class="btn btn-red btn-sm" id="aiApagarLog" type="button">Apagar todo o histórico de perguntas</button></div>
    <h3 style="margin-top:26px">Regras de segurança permanentes</h3>
    <p style="margin:0;font-size:15px">Estas regras ficam travadas no sistema e não podem ser mudadas por nenhuma mensagem: o assistente nunca pede nem informa senhas; nunca informa documentos, notas, pagamentos, telefones, e-mails ou qualquer dado de outra pessoa; só conhece o nome de quem está conectado; nunca confirma se alguém é ou não aluno; e encaminha à direção tudo o que exigir confirmação de identidade.</p>`;
  etuDrawManual();
  $('#aiApagarLog').onclick=()=>confirmBox('Apagar todo o histórico de perguntas do assistente?',async()=>{ try{ await API.apagarAiLog(); drawAiAdm() }catch(e){ show($('#mAi'),e.message,'err') } });
  $('#aiPadrao').onclick=()=>{ $('#aiIns').value=AI_PERFIL_PADRAO; $('#aiLmt').value=AI_LIMITES_PADRAO };
  $('#aiTestar').onclick=()=>aiAbrir();
  $('#aiSalvar').onclick=async()=>{ if($('#etuManualTexto')?.value.trim()||$('#etuManualTitulo')?.value.trim())return show($('#mAi'),'Conclua a edição: toque em Adicionar à lista ou Atualizar manual antes de salvar.','err'); try{ await API.saveAiConfig({foto:ETU_FOTO,manuais:ETU_MANUAIS,ativo:$('#aiAtivo').checked,nome:$('#aiNomeIn').value.trim()||'Assistente ETU',publico:$('#aiPub').value,limite_diario:+$('#aiLim').value||30,modelo:$('#aiMod').value,instrucoes:$('#aiIns').value.trim(),limites:$('#aiLmt').value.trim(),conhecimento:$('#aiCon').value.trim()});
    AI.cfg=null; show($('#mAi'),'Assistente salvo. As próximas conversas já seguem estas instruções.','ok') }catch(e){ show($('#mAi'),e.message,'err') } };
  try{ const L=await API.aiLog(); $('#aiLogBox').innerHTML=L.length?`<div class="tbl-wrap"><table><thead><tr><th>Quando</th><th>Quem</th><th>Pergunta</th></tr></thead><tbody>${L.map(l=>`<tr><td>${fmtDate((l.criado_em||'').slice(0,10))}</td><td>${esc(l.nome||'Visitante')}</td><td>${esc((l.pergunta||'').slice(0,220))}</td></tr>`).join('')}</tbody></table></div>`:'Nenhuma pergunta registrada ainda.' }catch(e){ $('#aiLogBox').textContent='Histórico indisponível.' }
}
/* ---------- vitrine de obras ---------- */
document.querySelectorAll('img[data-brasao]').forEach(i=>i.src=BRASAO);
$$('.obras-nav').forEach(b=>b.onclick=()=>$('#obras').scrollBy({left:(b.classList.contains('prox')?1:-1)*270,behavior:'smooth'}));
if(EMBED_OK){ const st2=document.createElement('style'); st2.textContent='.so-direcao{display:none!important}'; document.head.appendChild(st2) }
if(API.demo && !VITRINE) $('#demoBar').classList.remove('hidden');
if(VITRINE){
  document.body.classList.add('vitrine');
  const st=document.createElement('style'); st.textContent='.vitrine .when-in,.vitrine .when-admin,.vitrine #fComp{display:none!important}.vitrine .vit-only{display:block!important}.vitrine .no-vit{display:none!important}';
  document.head.appendChild(st);
}
// Complementos ETU — preserva as páginas e os controles existentes.
let ETU_MANUAIS=[], ETU_FOTO='', ETU_MANUAL_EDIT=null;
function etuAvatar(foto){
  const nome=document.querySelector('#aiNome'); if(!nome) return;
  let img=document.querySelector('#etuAgentAvatar');
  if(!img){img=document.createElement('img');img.id='etuAgentAvatar';img.className='etu-agent-avatar';img.alt='Assistente da ETU';nome.before(img)}
  const permitido=/^data:image\/(png|jpeg|webp);base64,[a-zA-Z0-9+/=]+$/.test(foto);
  img.hidden=!permitido; if(permitido)img.src=foto;else img.removeAttribute('src');
}
function etuDownload(nome,conteudo,tipo='application/json'){
  const url=URL.createObjectURL(new Blob([conteudo],{type:tipo}));const a=document.createElement('a');a.href=url;a.download=nome;a.click();setTimeout(()=>URL.revokeObjectURL(url),3000);
}
function etuManualId(){const b=crypto.getRandomValues(new Uint8Array(16));return Array.from(b,x=>x.toString(16).padStart(2,'0')).join('')}
function etuDrawManual(){
  const box=document.querySelector('#etuPerfilManual');if(!box)return;
  box.innerHTML=`<h3 style="margin-top:26px">Foto e manuais do assistente</h3>
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
  const msg=(t,erro=false)=>{const e=document.querySelector('#etuManualMsg');e.textContent=t;e.className='msg '+(erro?'err':'ok')};
  const foto=document.querySelector('#etuFotoPreview');if(/^data:image\/(png|jpeg|webp);base64,/.test(ETU_FOTO))foto.src=ETU_FOTO;else foto.hidden=true;
  document.querySelector('#etuFotoRemover').onclick=()=>{ETU_FOTO='';foto.hidden=true;foto.removeAttribute('src');msg('Foto retirada da edição. Salve o assistente para confirmar.')};
  document.querySelector('#etuFotoInput').onchange=async e=>{
    const f=e.target.files[0];if(!f)return;
    if(!['image/png','image/jpeg','image/webp'].includes(f.type)||f.size>2*1024*1024)return msg('Selecione PNG, JPG ou WebP de até 2 MB.',true);
    try{const bitmap=await createImageBitmap(f);const canvas=document.createElement('canvas');canvas.width=canvas.height=192;const ctx=canvas.getContext('2d');const side=Math.min(bitmap.width,bitmap.height);ctx.drawImage(bitmap,(bitmap.width-side)/2,(bitmap.height-side)/2,side,side,0,0,192,192);bitmap.close();ETU_FOTO=canvas.toDataURL('image/jpeg',.85);foto.src=ETU_FOTO;foto.hidden=false;msg('Foto preparada. Salve o assistente para confirmar.')}catch(err){msg('Não foi possível abrir esta imagem.',true)}
  };
  document.querySelector('#etuManualFile').onchange=async e=>{
    const f=e.target.files[0];if(!f)return;if(document.querySelector('#etuManualTexto').value.trim())return msg('Conclua a edição atual antes de importar outro manual.',true);if(f.size>5*1024*1024)return msg('O limite de importação é 5 MB.',true);
    try{msg('Lendo o arquivo…');let texto='';
      if(/\.pdf$/i.test(f.name)){
        const pdfjs=await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs');
        pdfjs.GlobalWorkerOptions.workerSrc='https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';
        const doc=await pdfjs.getDocument({data:new Uint8Array(await f.arrayBuffer()),isEvalSupported:false}).promise;
        try{for(let p=1;p<=doc.numPages;p++){const page=await doc.getPage(p);const content=await page.getTextContent();texto+='\n\n[Página '+p+']\n'+content.items.map(x=>x.str+(x.hasEOL?'\n':' ')).join('');if(texto.length>100000)throw new Error('Manual muito extenso. Divida-o em partes de até 100 mil caracteres.')}}finally{await doc.destroy()}
        if(texto.replace(/\[Página \d+\]/g,'').trim().length<20)throw new Error('Este PDF não possui texto legível para importação. Cole uma versão em texto.');
      }else if(/\.(txt|md)$/i.test(f.name)){texto=await f.text()}else throw new Error('Escolha um arquivo TXT, MD ou PDF.');
      if(texto.length>100000)throw new Error('Divida o manual em partes de até 100 mil caracteres.');
      document.querySelector('#etuManualTitulo').value=f.name.replace(/\.[^.]+$/,'');document.querySelector('#etuManualTexto').value=texto.trim();document.querySelector('#etuManualAprovado').checked=false;msg('Arquivo importado. Revise o texto e escolha quem poderá consultá-lo.');
    }catch(err){msg(err.message||'Não foi possível importar. Cole o texto no campo abaixo.',true)}
  };
  document.querySelector('#etuManualAdd').onclick=()=>{
    const titulo=document.querySelector('#etuManualTitulo').value.trim(),texto=document.querySelector('#etuManualTexto').value.trim();
    if(!titulo||!texto)return msg('Preencha o título e o texto.',true);
    if(ETU_MANUAL_EDIT===null&&ETU_MANUAIS.length>=40)return msg('Limite de 40 manuais por configuração. Divida o acervo em outra etapa.',true);
    if(ETU_MANUAIS.filter(m=>m.id!==ETU_MANUAL_EDIT).reduce((n,m)=>n+(m.texto||'').length,0)+texto.length>500000)return msg('O limite desta base é 500 mil caracteres. Exporte e revise os materiais.',true);
    const novo={id:ETU_MANUAL_EDIT||etuManualId(),titulo,texto,escopo:document.querySelector('#etuManualEscopo').value,aprovado:document.querySelector('#etuManualAprovado').checked,atualizado_em:new Date().toISOString()}; const i=ETU_MANUAIS.findIndex(m=>m.id===ETU_MANUAL_EDIT);if(i<0)ETU_MANUAIS.push(novo);else ETU_MANUAIS[i]=novo; ETU_MANUAL_EDIT=null;document.querySelector('#etuManualAdd').textContent='Adicionar à lista';
    document.querySelector('#etuManualTitulo').value='';document.querySelector('#etuManualTexto').value='';document.querySelector('#etuManualAprovado').checked=false;etuManualList();msg('Manual acrescentado à lista. Salve o assistente para confirmar.');
  };
  document.querySelector('#etuManualExport').onclick=()=>etuDownload('ETU_Manuais_Assistente.json',JSON.stringify({versao:1,exportado_em:new Date().toISOString(),manuais:ETU_MANUAIS},null,2));
  etuManualList();
}
function etuManualList(){
  const el=document.querySelector('#etuManualLista');if(!el)return;
  el.innerHTML=ETU_MANUAIS.length?ETU_MANUAIS.map((m,i)=>`<article class="etu-manual-card"><b>${esc(m.titulo)}</b><p>${m.escopo==='alunos'?'Alunos e direção':'Somente direção'} · ${m.aprovado?'Aprovado':'Rascunho'} · ${(m.texto||'').length} caracteres</p><details><summary>Conferir conteúdo</summary><p>${esc(m.texto||'')}</p></details><div class="res"><button class="btn btn-line btn-sm" type="button" data-manual-toggle="${i}">${m.aprovado?'Suspender uso':'Aprovar uso'}</button><button class="btn btn-line btn-sm" type="button" data-manual-edit="${i}">Editar</button><button class="btn btn-red btn-sm" type="button" data-manual-remove="${i}">Remover</button></div></article>`).join(''):'<p>Nenhum manual acrescentado. Os campos de perfil, limites e base de conhecimento anteriores continuam disponíveis.</p>';
  el.querySelectorAll('[data-manual-toggle]').forEach(b=>b.onclick=()=>{ETU_MANUAIS[+b.dataset.manualToggle].aprovado=!ETU_MANUAIS[+b.dataset.manualToggle].aprovado;etuManualList()});
  el.querySelectorAll('[data-manual-remove]').forEach(b=>b.onclick=()=>confirmBox('Remover este manual da lista em edição?',()=>{ETU_MANUAIS.splice(+b.dataset.manualRemove,1);etuManualList()}));
  el.querySelectorAll('[data-manual-edit]').forEach(b=>b.onclick=()=>{const m=ETU_MANUAIS[+b.dataset.manualEdit];if(document.querySelector('#etuManualTexto').value.trim()){alert('Adicione ou limpe o texto em edição antes de abrir outro manual.');return}document.querySelector('#etuManualTitulo').value=m.titulo;document.querySelector('#etuManualTexto').value=m.texto;document.querySelector('#etuManualEscopo').value=m.escopo;document.querySelector('#etuManualAprovado').checked=false;ETU_MANUAL_EDIT=m.id;document.querySelector('#etuManualAdd').textContent='Atualizar manual';document.querySelector('#etuManualTitulo').focus()});
}

async function validarCarteirinhaPDF(file){
  if(!file || file.size<5 || file.size>10*1024*1024) throw new Error('Escolha um PDF de até 10 MB.');
  if(!/\.pdf$/i.test(file.name) || (file.type && file.type!=='application/pdf')) throw new Error('A carteirinha precisa estar em PDF.');
  const cabecalho=new TextDecoder().decode(await file.slice(0,5).arrayBuffer());
  if(cabecalho!=='%PDF-') throw new Error('O arquivo selecionado não possui um cabeçalho PDF válido.');
}
async function atualizarDocumentosPessoais(){
  const uid=S.user?.id;
  S.carteirinhas=[]; S.notificacoes=[];
  if(!uid || API.demo) return;
  try{ const [cards,notifs]=await Promise.all([API.carteirinhas(),API.avisosPessoais()]);
    if(S.user?.id===uid){ S.carteirinhas=cards; S.notificacoes=notifs }
  }catch(e){ /* Falha de consulta não libera nenhum documento. */ }
}
async function dlgCarteirinha(a){
  if(!a || !S.profile?.is_admin) return;
  const mats=a.matriculas||[];
  modal(`<h3>Enviar carteirinha em PDF</h3><p><b>Aluno: ${esc(a.nome)}</b><br>${esc(a.email)}</p>
    ${mats.length?`<label for="cardCurso">Matrícula vinculada</label><select id="cardCurso">${mats.map(m=>`<option value="${esc(m.curso_id)}">${esc(curso(m.curso_id)?.titulo||m.curso_id)}</option>`).join('')}</select>
    <label for="cardPDF">Carteirinha pronta (PDF, até 10 MB)</label><input id="cardPDF" type="file" accept="application/pdf,.pdf">
    <p>Confira o nome e os dados no PDF. Ao enviar, o arquivo será disponibilizado somente para este aluno e a Direção. Um novo envio substitui a versão disponível.</p>
    <div id="cardMsg" class="msg hidden" role="status"></div><div class="acts"><button class="btn btn-gold" id="cardEnviar">Enviar e avisar o aluno</button><button class="btn btn-line" data-close>Fechar</button></div>`:'<p>Cadastre a matrícula do aluno antes de enviar a carteirinha.</p><button class="btn btn-line" data-close>Fechar</button>'}`,r=>{
    const b=r.querySelector('#cardEnviar'); if(!b) return;
    b.onclick=async()=>{ b.disabled=true; const msg=r.querySelector('#cardMsg');
      try{ if(API.demo) throw new Error('O envio real estará disponível após ligar o banco de dados da escola.');
        await API.publicarCarteirinha(a.id,r.querySelector('#cardCurso').value,r.querySelector('#cardPDF').files[0]);
        r.querySelector('#cardPDF').value=''; show(msg,'Carteirinha enviada. O aviso está disponível na conta do aluno.','ok');
      }catch(e){show(msg,e.message,'err')}finally{b.disabled=false}
    };
  });
}
document.addEventListener('click',async e=>{
  const b=e.target.closest('[data-card-download]'); if(!b)return;
  b.disabled=true;
  try{ if(API.demo || !S.user) throw new Error('Entre na sua conta na plataforma ativada para baixar.');
    const uid=S.user.id, link=await API.baixarCarteirinha(b.dataset.cardDownload);
    if(S.user?.id!==uid) return;
    const a=document.createElement('a'); a.href=link; a.download='carteirinha-ETU.pdf'; a.rel='noopener'; document.body.append(a);a.click();a.remove();
  }catch(err){modal(`<h3>Não foi possível baixar</h3><p>${esc(err.message)}</p><button class="btn btn-line" data-close>Fechar</button>`)}finally{b.disabled=false}
});
let cardPollEmCurso=false;
setInterval(async()=>{
  if(cardPollEmCurso || document.hidden || !S.user || API.demo)return;
  cardPollEmCurso=true;
  try{const antes=JSON.stringify(S.carteirinhas);await atualizarDocumentosPessoais();drawSino();
    if(location.hash==='#aluno' && antes!==JSON.stringify(S.carteirinhas))renderAluno();
  }finally{cardPollEmCurso=false}
},60000);
API.onAuth(async (ev)=>{ if(ev==='PASSWORD_RECOVERY'){ recovering=true; await refreshUser(); location.hash='nova-senha'; route(); } });
window.addEventListener('hashchange', ()=>{ if(!$('#aiBox').classList.contains('hidden') && innerWidth<=700){ $('#aiBox').classList.add('hidden'); document.body.classList.remove('ai-aberto') } route() });
(async()=>{ try{ await refreshUser() }catch(e){ console.error(e) } route() })();

/* ---------- leitor de apostilas dentro da plataforma ---------- */
function abrirLeitor(url,titulo){
  const drive=/drive\.google\.com/.test(url);
  if(!drive && /Android|iPhone|iPad/i.test(navigator.userAgent)){ window.open(url,'_blank','noopener'); return }
  const L=document.createElement('div'); L.className='leitor'; L.setAttribute('role','dialog'); L.setAttribute('aria-label','Leitura: '+titulo);
  L.innerHTML=`<div class="leitor-top"><img src="${BRASAO}" alt=""><b>${esc(titulo||'Leitura')}</b><button type="button" class="btn btn-gold btn-sm" data-fechar>Fechar</button></div>
    <iframe src="${esc(drive?pdfEmbed(url):url)}" title="${esc(titulo||'Leitura')}" allow="autoplay"></iframe>`;
  document.body.appendChild(L); document.body.classList.add('leitor-aberto');
  const fechar=()=>{ L.remove(); document.body.classList.remove('leitor-aberto'); removeEventListener('keydown',esc_) }; const esc_=e=>{ if(e.key==='Escape') fechar() };
  L.querySelector('[data-fechar]').onclick=fechar; addEventListener('keydown',esc_); L.querySelector('[data-fechar]').focus();
}
document.addEventListener('click',e=>{ const b=e.target.closest('[data-ler]'); if(b){ e.preventDefault(); abrirLeitor(b.dataset.ler,b.dataset.tit) } });

/* ---------- mensagem em vídeo do Diretor ---------- */
function drawVideoDiretor(){ const B=$('#videoDiretor'); if(!B) return; const v=CONFIG.VIDEO_DESTAQUE;
  if(!v){ B.classList.add('hidden'); return }
  B.classList.remove('hidden');
  B.innerHTML=`<div class="wrap" style="max-width:900px"><div class="cz" style="color:var(--gold2);letter-spacing:.2em;font-size:13px;text-align:center">MENSAGEM DO DIRETOR</div>
    <h2 style="text-align:center;color:#F3EBD6;margin:6px 0 16px">${esc(CONFIG.VIDEO_TITULO||'Conheça a Escola Teológica União')}</h2>
    ${/\/shorts\//.test(v)?`<div class="video-vertical">${videoBox(toEmbed(v),CONFIG.VIDEO_TITULO||'Mensagem do Diretor',v)}</div>`:videoBox(toEmbed(v),CONFIG.VIDEO_TITULO||'Mensagem do Diretor',v)}
    <p style="text-align:center;color:#E9E1CC;margin:16px auto 14px;max-width:640px">Pr. Charlei de Jesus Lima Dias, Idealizador e Diretor Geral, apresenta a escola. Se Deus tem falado ao seu coração sobre estudar a Palavra, dê o próximo passo.</p>
    <div class="res" style="justify-content:center"><a class="btn btn-gold" href="#matricula">Quero me matricular</a><a class="btn btn-line" style="color:#F3EBD6;border-color:var(--gold)" href="#cursos">Ver os cursos</a></div></div>` }
async function drawVideoCfg(){
  const box=document.createElement('div'); box.className='panel'; box.style.marginTop='18px';
  box.innerHTML=`<h3>Vídeo de apresentação na página inicial</h3>
   <p style="margin:0 0 10px;color:var(--muted);font-size:16px">Grave um vídeo seu apresentando a escola, publique no YouTube como “não listado” (ou no Google Drive) e cole o link aqui. Ele aparece logo abaixo do banner, com os botões “Quero me matricular” e “Ver os cursos”. Deixe em branco para esconder.</p>
   <label for="vdLink">Link do vídeo</label><input id="vdLink" value="${esc(CONFIG.VIDEO_DESTAQUE||'')}" placeholder="https://youtu.be/...">
   <label for="vdTit">Título</label><input id="vdTit" value="${esc(CONFIG.VIDEO_TITULO||'')}" placeholder="Conheça a Escola Teológica União">
   <div class="msg hidden" id="mVd"></div><div class="res"><button class="btn btn-gold" id="vdSalvar" type="button">Salvar vídeo</button></div>`;
  ([...document.querySelectorAll('#configPanel ~ .panel')].pop()||$('#configPanel')).after(box);
  box.querySelector('#vdSalvar').onclick=async()=>{ const l=box.querySelector('#vdLink').value.trim(), t=box.querySelector('#vdTit').value.trim();
    try{ await API.saveEscolaConfig({video_destaque:l||null,video_titulo:t||null}); CONFIG.VIDEO_DESTAQUE=l; CONFIG.VIDEO_TITULO=t; drawVideoDiretor(); show(box.querySelector('#mVd'),l?'Vídeo publicado na página inicial.':'Vídeo retirado da página inicial.','ok') }catch(e){ show(box.querySelector('#mVd'),e.message,'err') } };
}

/* ---------- comunidade (conversa entre alunos e Direção) ---------- */
const COM={sala:'geral', parar:null, t:null};
function podeComunidade(){ return S.user && (S.profile?.is_admin || (!S.profile?.bloqueado && (S.mats||[]).some(isActive))) }
async function drawComunidade(){
  const B=$('#comBox'); if(!B) return;
  if(!S.user){ B.innerHTML=`<div class="panel" style="margin:0"><p style="margin:0">A comunidade é o espaço de conversa dos alunos matriculados com a Direção. <a href="#matricula">Faça sua matrícula</a> ou <a href="#entrar">entre na sua conta</a>.</p></div>`; return }
  if(!podeComunidade()){ B.innerHTML=`<div class="panel" style="margin:0"><p style="margin:0">A comunidade fica disponível para alunos com matrícula ativa. Se o seu pagamento já foi feito, aguarde a confirmação da Direção.</p></div>`; return }
  B.innerHTML=`<div class="com-regras">Respeito e linguagem digna de um obreiro. <b>Nunca</b> envie senha, documentos ou Pix aqui: a Direção nunca pede pagamento pela conversa. Mensagens da Direção têm o selo <span class="com-selo">✓ DIREÇÃO</span>.</div>
    <div class="com-lista" id="comLista" aria-live="polite"></div>
    <form class="com-form" id="comForm"><label for="comTxt" class="sr-only">Mensagem</label><textarea id="comTxt" rows="2" maxlength="1000" placeholder="Escreva sua mensagem…"></textarea><button class="btn btn-gold" type="submit">Enviar</button></form><div class="msg hidden" id="mCom"></div>`;
  const lista=async()=>{ let L=[]; try{ L=await API.mensagens(COM.sala) }catch(e){ $('#comLista').innerHTML=`<p style="color:var(--muted)">${esc(e.message)}</p>`; return }
    const el=$('#comLista'); if(!el) return; const embaixo=el.scrollHeight-el.scrollTop-el.clientHeight<60;
    el.innerHTML=L.length?L.map(m=>`<div class="com-msg ${m.user_id===S.user.id?'eu':''}"><div class="com-nome">${esc(m.nome||'Aluno')} ${m.is_direcao?'<span class="com-selo">✓ DIREÇÃO</span>':''} <time>${new Date(m.criado_em).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})}</time>${S.profile?.is_admin?` <button type="button" class="com-del" data-cdel="${esc(m.id)}" aria-label="Apagar mensagem">apagar</button>`:''}</div><div class="com-txt">${esc(m.texto)}</div></div>`).join(''):'<p style="color:var(--muted);text-align:center">Seja o primeiro a dizer a paz do Senhor!</p>';
    if(embaixo||!el.dataset.ok){ el.scrollTop=el.scrollHeight; el.dataset.ok=1 }
    el.querySelectorAll('[data-cdel]').forEach(b=>b.onclick=()=>confirmBox('Apagar esta mensagem da comunidade?',async()=>{ await API.apagarMensagem(b.dataset.cdel); lista() })) };
  await lista();
  COM.parar&&COM.parar(); COM.parar=API.ouvirMensagens(COM.sala,lista); clearInterval(COM.t); COM.t=setInterval(()=>{ if(location.hash==='#comunidade'&&!document.hidden) lista() },15000);
  $('#comForm').onsubmit=async e=>{ e.preventDefault(); const t=$('#comTxt').value.trim(), m=$('#mCom'); if(!t) return;
    if(/\b(senha|cpf|cart[aã]o de cr[eé]dito)\b/i.test(t)&&!S.profile?.is_admin) return show(m,'Por segurança, não envie senhas, CPF ou dados de cartão na comunidade.','err');
    try{ await API.enviarMensagem(COM.sala,t); $('#comTxt').value=''; m.classList.add('hidden'); lista() }catch(err){ show(m,err.message,'err') } };
}

/* ---------- aplicativo instalável ---------- */
let pedidoInstalar=null;
addEventListener('beforeinstallprompt',e=>{ e.preventDefault(); pedidoInstalar=e; $$('[data-instalar]').forEach(b=>b.classList.remove('hidden')) });
function instalarApp(){ if(pedidoInstalar){ pedidoInstalar.prompt(); pedidoInstalar.userChoice.finally(()=>pedidoInstalar=null); return }
  modal(`<h3>Instalar o aplicativo da escola</h3><p><b>No Android (Chrome):</b> toque nos três pontinhos do navegador e em <b>Instalar aplicativo</b> ou <b>Adicionar à tela inicial</b>.</p><p><b>No iPhone (Safari):</b> toque no botão de compartilhar e em <b>Adicionar à Tela de Início</b>.</p><p>O ícone da Escola Teológica União aparece na tela do celular e abre como aplicativo.</p><div class="acts"><button class="btn btn-gold" data-close>Entendi</button></div>`) }
document.addEventListener('click',e=>{ if(e.target.closest('[data-instalar]')){ e.preventDefault(); instalarApp() } });
if('serviceWorker' in navigator && EMBED_OK && /^https?:$/.test(location.protocol)){ addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{})) }
setTimeout(drawVideoDiretor,0);
