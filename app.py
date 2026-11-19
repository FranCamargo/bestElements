"""
CoE de Dados · Agente
=====================

Como rodar:
    streamlit run app.py

"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date, datetime
from html import escape
from textwrap import dedent
from uuid import uuid4

import streamlit as st
from streamlit import config as _st_config

# =============================================================================
# 0. TEMA (substitui o .streamlit/config.toml)
# =============================================================================
THEME_OPTIONS = {
    "theme.base": "dark",
    "theme.primaryColor": "#A64BDB",              # roxo claro: visível no escuro
    "theme.backgroundColor": "#0F0A14",           # fundo da área principal
    "theme.secondaryBackgroundColor": "#1C1424",  # inputs, código, expanders
    "theme.textColor": "#F4EEF8",                 # texto principal
    "theme.borderColor": "#2C2136",               # bordas suaves
    "theme.baseRadius": "0.75rem",
    # Fontes do Google Fonts ("Nome:URL"): Inter no texto, JetBrains Mono no código.
    "theme.font": "Inter:https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap, sans-serif",
    "theme.codeFont": "JetBrains Mono:https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap, monospace",
    "theme.codeBackgroundColor": "#140D1A",
    # Barra lateral em roxo profundo com texto branco.
    "theme.sidebar.backgroundColor": "#22003A",
    "theme.sidebar.secondaryBackgroundColor": "#33104F",
    "theme.sidebar.textColor": "#FFFFFF",
    "theme.sidebar.borderColor": "#3A1556",
    "client.toolbarMode": "minimal",   # esconde o menu de desenvolvedor
    "browser.gatherUsageStats": False,
}


def apply_theme() -> None:
    """Aplica THEME_OPTIONS; se algo mudou, reexecuta para o navegador receber o tema."""
    changed = False
    for key, value in THEME_OPTIONS.items():
        if _st_config.get_option(key) != value:
            _st_config.set_option(key, value)
            changed = True
    if changed:
        st.rerun()


apply_theme()

# =============================================================================
# 1. CONFIGURAÇÃO DA PÁGINA
# -----------------------------------------------------------------------------
# Precisa ser o PRIMEIRO comando do Streamlit no script.
# =============================================================================
st.set_page_config(
    page_title="CoE de Dados | Agente",
    page_icon="✦",
    layout="wide",
    # "auto": aberta no desktop, recolhida no celular (não cobre o conteúdo).
    initial_sidebar_state="auto",
)


# =============================================================================
# 2. CONSTANTES
# -----------------------------------------------------------------------------
APP_NAME = "CoE de Dados"
APP_TAGLINE = "Agente inteligente"

_LOGO_MARK = (
    '<rect x="0" y="4" width="40" height="40" rx="11" fill="#FFFFFF"/>'
    '<path d="M20 13 C21 19.5 24.5 23 31 24 C24.5 25 21 28.5 20 35 '
    'C19 28.5 15.5 25 9 24 C15.5 23 19 19.5 20 13 Z" fill="#660099"/>'
)
# Só o ícone (sidebar fechada).
LOGO_ICON = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">'
    + _LOGO_MARK
    + '<circle cx="38" cy="6" r="4.5" fill="#EB3C7D" stroke="#0F0A14" stroke-width="2"/>'
    "</svg>"
)
# Ícone + nome + subtítulo (sidebar aberta).
_LOGO_FONT = "Inter, 'Segoe UI', Helvetica, Arial, sans-serif"
LOGO_FULL = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="210" height="44" viewBox="0 0 210 44">'
    + _LOGO_MARK
    + '<circle cx="38" cy="6" r="4.5" fill="#EB3C7D" stroke="#2A0042" stroke-width="2"/>'
    f'<text x="54" y="23" font-family="{_LOGO_FONT}" font-size="16" '
    f'font-weight="700" fill="#FFFFFF">{APP_NAME}</text>'
    f'<text x="54" y="39" font-family="{_LOGO_FONT}" font-size="11.5" '
    f'font-weight="500" fill="#FFFFFF" fill-opacity="0.55">{APP_TAGLINE}</text>'
    "</svg>"
)
NEW_CHAT_TITLE = "Nova conversa"

WELCOME_TITLE = "Olá! Como posso ajudar?"
WELCOME_SUBTITLE = (
    "Descreva uma tarefa ou anexe um arquivo para começar. "
    "Eu gero modelos, diagramas e documentação para o seu projeto de dados."
)
WELCOME_MESSAGE = "Olá! Como posso ajudar?\n\nDescreva uma tarefa ou anexe um arquivo para começar."

# Texto usado quando o usuário envia só arquivos, sem escrever nada.
DEFAULT_PROMPT_WITH_FILES = "Analise os arquivos anexados."

# Limites de caracteres para títulos (cabeçalho e histórico da sidebar).
TITLE_MAX_CHARS = 48
HISTORY_TITLE_MAX_CHARS = 26

# Extensões aceitas no campo de mensagem (anexos).
ACCEPTED_FILE_TYPES = [
    "csv", "docx", "json", "md", "pdf", "png", "jpg",
    "jpeg", "txt", "xlsx", "yaml", "yml",
]

# Sugestões da tela inicial: (ícone, título do card, texto enviado ao agente).
SUGGESTIONS = [
    (":material/menu_book:", "Diretrizes", "Quais são as diretrizes do CoE de Dados?"),
    (":material/schema:", "Modelagem", "Gere um modelo de dados"),
    (":material/account_tree:", "Diagramas", "Crie um diagrama a partir de um arquivo"),
]

# Avatares das mensagens (ícones Material nativos do Streamlit).
AVATARS = {
    "user": ":material/person:",
    "assistant": ":material/auto_awesome:",
}

# Nome exibido acima de cada mensagem.
AUTHORS = {"user": "Você", "assistant": "Agente CoE"}


# =============================================================================
# 3. ESTILOS (CSS)
# -----------------------------------------------------------------------------
# O tema base vem da seção 0 (THEME_OPTIONS); aqui fica o acabamento fino.

CSS = """
<style>
/* (as fontes Inter e JetBrains Mono são carregadas pelo tema, seção 0) */
/* ---------- 3.1 Tokens de design (tema escuro, paleta inspirada na Vivo) ---------- */
:root {
  /* roxos */
  --purple: #660099;            /* roxo principal: preenchimentos (botões, balões) */
  --purple-hover: #7A1FAD;
  --accent: #C77DFF;            /* roxo claro: textos e ícones sobre fundo escuro */
  --purple-soft: rgba(156, 77, 204, .14);   /* fundos suaves (selos, ícones) */
  --purple-soft-2: rgba(156, 77, 204, .24); /* hover dos fundos suaves */
  --purple-border: rgba(199, 125, 255, .38);/* borda em destaque no hover/foco */
  /* acento (usado com moderação) */
  --pink: #EB3C7D;
  /* neutros escuros */
  --bg: #0F0A14;
  --surface: #17101E;
  --surface-2: #1F1628;
  --border: #2C2136;
  --border-strong: #3D2E4A;
  --text: #F4EEF8;
  --text-2: #CFC2DA;
  --muted: #9686A5;
  /* sidebar */
  --sidebar-top: #2A0042;
  --sidebar-bottom: #14001F;
  /* forma e movimento */
  --radius-sm: 8px;
  --radius: 12px;
  --radius-lg: 16px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, .35);
  --shadow: 0 2px 4px rgba(0, 0, 0, .3), 0 8px 24px rgba(0, 0, 0, .3);
  --shadow-lg: 0 4px 8px rgba(0, 0, 0, .3), 0 18px 44px rgba(0, 0, 0, .45);
  --ease: cubic-bezier(.2, .7, .2, 1);
}
/* ---------- 3.2 Base da aplicação ---------- */
.stApp {
  color: var(--text);
  /* brilho roxo bem sutil no topo, para dar profundidade */
  background:
    radial-gradient(1000px 520px at 70% -12%, rgba(102, 0, 153, .22), transparent 62%),
    var(--bg);
}
/* barra superior do Streamlit: vidro fosco, para o conteúdo não "brigar"
   com o botão de abrir a sidebar ao rolar a página */
[data-testid="stHeader"] { background: rgba(15, 10, 20, .72); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
[data-testid="stMain"] .block-container { max-width: 940px; padding: 2rem 2rem 9rem; }
[data-testid="stMarkdownContainer"] p { line-height: 1.65; color: var(--text-2); }
[data-testid="stMarkdownContainer"] strong { color: var(--text); }
code { color: var(--accent) !important; }
::selection { background: rgba(156, 77, 204, .4); }
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 8px; }
/* ---------- 3.3 Botões da área principal ---------- */
/* primário: roxo sólido */
[data-testid="stBaseButton-primary"] {
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: var(--radius-sm);
  background: var(--purple);
  color: #fff !important;
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(102, 0, 153, .35);
  transition: background .15s, box-shadow .15s, transform .15s var(--ease);
}
[data-testid="stBaseButton-primary"]:hover { background: var(--purple-hover); border-color: rgba(255, 255, 255, .18); box-shadow: 0 8px 24px rgba(102, 0, 153, .45); }
/* secundário: card escuro com borda */
[data-testid="stBaseButton-secondary"] {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--text-2);
  box-shadow: var(--shadow-sm);
  transition: border-color .15s, box-shadow .2s var(--ease), transform .2s var(--ease), color .15s, background .15s;
}
[data-testid="stBaseButton-secondary"]:hover {
  border-color: var(--purple-border);
  background: var(--surface-2);
  color: var(--text);
  box-shadow: var(--shadow);
  transform: translateY(-1px);
}
/* terciário: só ícone/texto, sem borda */
[data-testid="stBaseButton-tertiary"] { color: var(--muted); border-radius: var(--radius-sm); transition: color .15s, background .15s; }
[data-testid="stBaseButton-tertiary"]:hover { color: var(--accent); background: var(--purple-soft); }
/* ---------- 3.4 Sidebar (roxo profundo, texto branco) ---------- */
/* Largura fixa e mais estreita (padrão do Streamlit: 300px).
   Ao fechar, o próprio Streamlit zera a largura máxima, então isto
   só vale com a sidebar aberta. */
[data-testid="stSidebar"] {
  width: 248px !important;
  background: linear-gradient(180deg, var(--sidebar-top) 0%, var(--sidebar-bottom) 100%);
  border-right: 1px solid rgba(255, 255, 255, .06);
}
/* espaçamento interno: o Streamlit soma 20px + 16px de cada lado,
   o que espreme o conteúdo; aqui fica só 1rem */
[data-testid="stSidebarContent"] { padding-left: 0; padding-right: 0; }
[data-testid="stSidebarUserContent"] { padding-left: 1rem; padding-right: 1rem; }
[data-testid="stSidebar"] [data-testid="stSidebarHeader"] { padding: 1.1rem 1rem 1rem 1rem; }
/* logo completo (sidebar aberta): ocupa o espaço ao lado do botão « */
[data-testid="stSidebarHeader"] > div:first-child { flex: 1 1 auto; min-width: 0; }
[data-testid="stSidebarLogo"] { height: 40px !important; width: auto !important; max-width: none !important; }
/* ---------- 3.4.1 Logo com a sidebar fechada ---------- */
/* Com a sidebar fechada o Streamlit mostra, no topo, [ícone do logo] [botão »].
   Aqui o botão » vira uma camada invisível POR CIMA do ícone:
   clicar no logo = clicar em "abrir sidebar". */
[data-testid="stHeaderLogo"] {
  width: 40px; height: 40px;
  transition: transform .2s var(--ease), filter .2s;
}
/* grupo [logo + botão] vira referência de posição */
div:has(> div > [data-testid="stExpandSidebarButton"]) { position: relative; }
/* o invólucro do botão cobre todo o grupo (logo incluído) */
div:has(> [data-testid="stExpandSidebarButton"]) { position: absolute; inset: 0; margin: 0; }
[data-testid="stExpandSidebarButton"] { width: 100%; height: 100%; opacity: 0; cursor: pointer; }
/* hover / foco pelo teclado: o logo cresce e ganha brilho roxo */
div:has(> div > [data-testid="stExpandSidebarButton"]:hover) [data-testid="stHeaderLogo"],
div:has(> div > [data-testid="stExpandSidebarButton"]:focus-visible) [data-testid="stHeaderLogo"] {
  transform: scale(1.07);
  filter: drop-shadow(0 0 10px rgba(166, 75, 219, .65));
}
/* botão "Nova conversa" na sidebar: roxo vivo com leve brilho */
[data-testid="stSidebar"] [data-testid="stBaseButton-primary"] {
  background: linear-gradient(135deg, #8A2BC2 0%, var(--purple) 100%);
  border-color: rgba(255, 255, 255, .14);
  box-shadow: 0 8px 22px rgba(0, 0, 0, .35);
}
[data-testid="stSidebar"] [data-testid="stBaseButton-primary"]:hover { filter: brightness(1.12); }
.sidebar-heading {
  margin: 1.8rem 0 .2rem .5rem;
  font-size: .68rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase;
  color: rgba(255, 255, 255, .45);
}
.history-group { margin: 1rem 0 .3rem .5rem; font-size: .72rem; font-weight: 500; color: rgba(255, 255, 255, .4); }
.sidebar-empty {
  margin-top: .7rem; padding: 1.1rem 1rem;
  border: 1px dashed rgba(255, 255, 255, .16); border-radius: var(--radius);
  font-size: .8rem; line-height: 1.5; color: rgba(255, 255, 255, .5); text-align: center;
}
/* ---------- 3.5 Histórico de conversas (linhas da sidebar) ---------- */
/* Visual limpo: só o ícone de balão + o título, sem fundo, borda ou sombra.
   A conversa aberta se destaca apenas pela cor (texto branco, ícone roxo). */
[class*="st-key-history-row-"] { flex-wrap: nowrap !important; padding: 0; background: none; border: none; box-shadow: none; }
/* linhas mais próximas entre si (o padrão do Streamlit é 1rem entre elementos) */
[data-testid="stVerticalBlock"]:has(> [class*="st-key-history-row-"]),
[data-testid="stVerticalBlock"]:has(> * > [class*="st-key-history-row-"]) { gap: .1rem; }
/* título ocupa o espaço livre e pode encolher; a lixeira fica na mesma linha */
[class*="st-key-history-row-"] > [class*="st-key-select-"] { flex: 1 1 auto; min-width: 0; }
[class*="st-key-history-row-"] > [class*="st-key-delete-"] { flex: 0 0 auto; }
[class*="st-key-history-row-"] [data-testid="stBaseButton-tertiary"],
[class*="st-key-history-row-"] [data-testid="stBaseButton-tertiary"]:hover,
[class*="st-key-history-row-"] [data-testid="stBaseButton-tertiary"]:focus {
  border: none; background: transparent; box-shadow: none; outline: none;
}
[class*="st-key-history-row-"] [data-testid="stBaseButton-tertiary"] {
  justify-content: flex-start; min-height: 2rem; padding: .25rem .4rem;
  color: rgba(255, 255, 255, .62); text-align: left;
  transition: color .15s;
}
[class*="st-key-history-row-"] [data-testid="stBaseButton-tertiary"]:hover { color: #fff; }
/* conversa aberta: texto branco e ícone de balão em roxo claro */
[class*="st-key-history-row-active-"] [class*="st-key-select-"] button { color: #fff; font-weight: 500; }
[class*="st-key-history-row-active-"] [class*="st-key-select-"] [data-testid="stIconMaterial"] { color: var(--accent); }
/* lixeira só aparece ao passar o mouse na linha */
[class*="st-key-history-row-"] [class*="st-key-delete-"] { opacity: 0; transition: opacity .15s; }
[class*="st-key-history-row-"]:hover [class*="st-key-delete-"] { opacity: 1; }
[class*="st-key-delete-"] button:hover { color: #FF9EC0 !important; }
/* ---------- 3.6 Cabeçalho da página ---------- */
.breadcrumb { display: flex; align-items: center; gap: .45rem; font-size: .8rem; color: var(--muted); }
.breadcrumb b { font-weight: 600; color: var(--accent); }
.breadcrumb span { color: var(--border-strong); }
.page-title { margin: .45rem 0 .55rem; font-size: clamp(1.45rem, 2.4vw, 1.85rem); font-weight: 700; line-height: 1.2; letter-spacing: -.025em; color: var(--text); }
.header-divider { height: 1px; margin: .6rem 0 .4rem; background: var(--border); }
/* botões-ícone do cabeçalho: quadrados escuros com borda */
.st-key-header-actions [data-testid="stBaseButton-tertiary"] {
  width: 38px; height: 38px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-2);
}
.st-key-header-actions [data-testid="stBaseButton-tertiary"]:hover { border-color: var(--purple-border); color: var(--accent); background: var(--surface-2); }
/* ---------- 3.7 Tela inicial (hero + sugestões) ---------- */
.hero { padding: 3.2rem 1rem 1rem; text-align: center; }
.hero-badge {
  display: inline-flex; align-items: center; gap: .45rem;
  margin-bottom: 1.25rem; padding: .32rem .85rem;
  border: 1px solid var(--purple-border); border-radius: 999px;
  background: var(--purple-soft);
  font-size: .76rem; font-weight: 600; color: var(--accent);
}
.hero-title { font-size: clamp(1.9rem, 3.6vw, 2.7rem); font-weight: 700; line-height: 1.12; letter-spacing: -.035em; color: var(--text); }
/* destaque em degradê roxo → rosa em parte do título */
.hero-title em {
  font-style: normal;
  background: linear-gradient(90deg, #B45CF0 0%, #D04AB0 55%, var(--pink) 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.hero-subtitle { max-width: 520px; margin: .85rem auto 0; font-size: 1rem; line-height: 1.6; color: var(--muted); }
.section-label { margin: 2.2rem 0 .35rem; font-size: .7rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); text-align: center; }
/* botões de sugestão viram cards: ícone em cima; título + texto embaixo.
   Estrutura interna do botão: button > div > span > [ícone, rótulo] */
.st-key-suggestions [data-testid="stBaseButton-secondary"] {
  height: 100%; min-height: 128px; padding: 1.1rem 1.15rem;
  justify-content: flex-start; align-items: stretch; text-align: left;
}
.st-key-suggestions [data-testid="stBaseButton-secondary"] > div,
.st-key-suggestions [data-testid="stBaseButton-secondary"] > div > span {
  display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start;
  gap: .85rem; width: 100%;
}
.st-key-suggestions [data-testid="stBaseButton-secondary"] [data-testid="stMarkdownContainer"] { width: 100%; }
.st-key-suggestions [data-testid="stBaseButton-secondary"] [data-testid="stMarkdownContainer"] p {
  margin: 0; white-space: normal; text-align: left;
  font-size: .86rem; line-height: 1.5; color: var(--muted);
}
.st-key-suggestions [data-testid="stBaseButton-secondary"] [data-testid="stMarkdownContainer"] strong {
  display: block; margin-bottom: .2rem; font-size: .95rem; font-weight: 600; color: var(--text);
}
/* "azulejo" do ícone: o 1º span do rótulo é o invólucro do ícone */
.st-key-suggestions [data-testid="stBaseButton-secondary"] > div > span > span:first-child {
  display: grid; place-items: center; flex-shrink: 0;
  width: 40px; height: 40px; margin: 0; border-radius: 11px;
  border: 1px solid var(--purple-border);
  background: var(--purple-soft);
  transition: background .2s, transform .2s var(--ease);
}
.st-key-suggestions [data-testid="stBaseButton-secondary"] [data-testid="stIconMaterial"] { color: var(--accent); font-size: 1.3rem; }
.st-key-suggestions [data-testid="stBaseButton-secondary"]:hover > div > span > span:first-child { background: var(--purple-soft-2); transform: scale(1.06); }
/* colunas das sugestões com a mesma altura */
.st-key-suggestions [data-testid="stColumn"] > div,
.st-key-suggestions [data-testid="stElementContainer"],
.st-key-suggestions [data-testid="stButton"] { height: 100%; }
/* ---------- 3.8 Mensagens do chat ---------- */
/* Como os avatares são ícones, o Streamlit usa o mesmo testid
   (stChatMessageAvatarCustom) para usuário e agente. Para diferenciar,
   cada mensagem leva uma classe marcadora: .is-user ou .is-assistant. */
[data-testid="stChatMessage"] { gap: .8rem; padding: .6rem 0; background: transparent; }
[data-testid="stChatMessageContent"] [data-testid="stVerticalBlock"] { gap: .55rem; }
[data-testid="stChatMessageAvatarCustom"] { width: 2.1rem; height: 2.1rem; border-radius: 50%; }
[data-testid="stChatMessage"]:has(.is-assistant) [data-testid="stChatMessageAvatarCustom"] {
  background: linear-gradient(135deg, #8A2BC2 0%, var(--purple) 100%);
  box-shadow: 0 4px 14px rgba(102, 0, 153, .45);
}
[data-testid="stChatMessage"]:has(.is-assistant) [data-testid="stChatMessageAvatarCustom"] [data-testid="stIconMaterial"] { color: #fff; }
[data-testid="stChatMessage"]:has(.is-user) [data-testid="stChatMessageAvatarCustom"] { border: 1px solid var(--border-strong); background: var(--surface-2); }
[data-testid="stChatMessage"]:has(.is-user) [data-testid="stChatMessageAvatarCustom"] [data-testid="stIconMaterial"] { color: var(--accent); }
/* mensagens do usuário: alinhadas à direita, em balão roxo */
[data-testid="stChatMessage"]:has(.is-user) { flex-direction: row-reverse; }
[data-testid="stChatMessage"]:has(.is-user) [data-testid="stChatMessageContent"] {
  flex: 0 1 auto; max-width: min(78%, 620px);
  margin-left: auto !important; margin-right: 0 !important;  /* encosta o balão no avatar */
  padding: .9rem 1.3rem;  /* respiro do texto até a borda: topo/base | lados */
  border-radius: 18px 4px 18px 18px;
  background: linear-gradient(135deg, #7A1FAD 0%, var(--purple) 100%);
  box-shadow: 0 8px 22px rgba(102, 0, 153, .3);
}
[data-testid="stChatMessage"]:has(.is-user) [data-testid="stChatMessageContent"] [data-testid="stVerticalBlock"] { gap: .25rem; }
[data-testid="stChatMessage"]:has(.is-user) p { color: #fff; }
/* O Streamlit aplica margin-bottom: -1rem em todo bloco de texto; dentro do
   balão isso "come" o padding de baixo e desalinha o texto. Aqui é zerado. */
[data-testid="stChatMessage"]:has(.is-user) [data-testid="stMarkdownContainer"] { margin-bottom: 0; }
.user-text { margin-top: .2rem;font-size: 1rem; line-height: 1.55; color: #fff; white-space: pre-wrap; word-break: break-word; }
.is-user + .attachments, .user-text + .attachments { margin-top: .55rem; }
[data-testid="stChatMessage"]:has(.is-user) .message-meta { justify-content: flex-end; }
[data-testid="stChatMessage"]:has(.is-user) .message-meta,
[data-testid="stChatMessage"]:has(.is-user) .message-meta b { color: rgba(255, 255, 255, .72); }
[data-testid="stChatMessage"]:has(.is-user) .attachment-chip {
  border-color: rgba(255, 255, 255, .22); background: rgba(255, 255, 255, .1); color: #fff;
}
/* resposta do agente: leve recuo do texto para alinhar com o nome */
.message-meta { display: flex; align-items: center; gap: .4rem; min-height: 2.1rem; font-size: .76rem; color: var(--muted); }
[data-testid="stChatMessage"]:has(.is-user) .message-meta { min-height: 0; }
.message-meta b { font-weight: 600; color: var(--text); }
.attachments { display: flex; flex-wrap: wrap; gap: .4rem; }
.attachment-chip {
  display: inline-flex; align-items: center; gap: .35rem;
  padding: .25rem .6rem;
  border: 1px solid var(--border); border-radius: var(--radius-sm);
  background: var(--purple-soft);
  font-size: .75rem; color: var(--text-2);
}
/* ---------- 3.9 Cards de artefatos ---------- */
/* rótulo "Artefatos gerados": o Streamlit aplica margin-bottom: -1rem nos
   blocos de texto, o que colava o rótulo nos cards; zerado aqui */
[data-testid="stMarkdownContainer"]:has(> .artifacts-label) { margin-bottom: 0; }
.artifacts-label { margin: .6rem 0 .4rem; font-size: .7rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
[class*="st-key-artifact-card-"] {
  height: 100%; min-height: 148px;
  padding: .95rem 1rem 1.1rem;
  border: 1px solid var(--border); border-radius: var(--radius);
  background: linear-gradient(160deg, var(--surface-2) 0%, var(--surface) 100%);
  box-shadow: var(--shadow-sm);
  transition: border-color .2s, box-shadow .2s var(--ease), transform .2s var(--ease);
}
[class*="st-key-artifact-card-"]:hover { border-color: var(--purple-border); box-shadow: var(--shadow-lg); transform: translateY(-2px); }
.artifact-format {
  display: inline-block; padding: .22rem .55rem;
  border-radius: 6px; background: var(--purple-soft);
  font-size: .64rem; font-weight: 700; letter-spacing: .08em; color: var(--accent);
}
.artifact-name { margin: .05rem 0 .3rem; font-size: .98rem; font-weight: 600; color: var(--text); }
.artifact-detail { font-size: .8rem; line-height: 1.5; color: var(--muted); }
[class*="st-key-download-"] { display: flex; justify-content: flex-end; }
/* ---------- 3.10 Campo de mensagem (fixo no rodapé) ---------- */
[data-testid="stBottom"] > div { background: linear-gradient(to top, var(--bg) 70%, rgba(15, 10, 20, 0)); }
[data-testid="stChatInput"] {
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: var(--shadow-lg);
  transition: border-color .15s, box-shadow .15s;
}
[data-testid="stChatInput"]:focus-within { border-color: var(--purple-border); box-shadow: 0 0 0 3px rgba(156, 77, 204, .18), var(--shadow-lg); }
[data-testid="stChatInput"] textarea { color: var(--text); }
[data-testid="stChatInput"] textarea::placeholder { color: var(--muted); }
/* botão de enviar: roxo sólido quando há texto */
[data-testid="stChatInputSubmitButton"] { border-radius: 10px; background: var(--purple); color: #fff; }
[data-testid="stChatInputSubmitButton"]:hover { background: var(--purple-hover); }
[data-testid="stChatInputSubmitButton"]:disabled { background: var(--surface-2); color: var(--muted); }
/* botão de anexar */
[data-testid="stChatInputFileUploadButton"] button { border-radius: 10px !important; color: var(--accent) !important; }
[data-testid="stChatInputFileUploadButton"] button:hover { background: var(--purple-soft) !important; }
/* anexos antes de enviar ("chips" de arquivo dentro do campo).
   Estrutura: stFileChip > [ícone] [nome + tamanho] [botão remover] */
[data-testid="stFileChips"] { padding-top: .2rem; }
[data-testid="stFileChip"] {
  display: flex; align-items: center; gap: .65rem;
  padding: .45rem .5rem .45rem .45rem;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: var(--surface-2);
  transition: border-color .15s;
}
[data-testid="stFileChip"]:hover { border-color: var(--purple-border); }
/* ícone do tipo de arquivo: quadradinho roxo suave (antes era branco) */
[data-testid="stFileChip"] > div:first-child {
  display: grid; place-items: center; flex-shrink: 0;
  width: 34px; height: 34px;
  border: 1px solid var(--purple-border); border-radius: 9px;
  background: var(--purple-soft);
  color: var(--accent);
}
[data-testid="stFileChip"] > div:first-child svg { color: var(--accent); fill: currentColor; width: 18px; height: 18px; }
/* nome e tamanho */
[data-testid="stFileChipName"] { font-size: .82rem; font-weight: 500; color: var(--text); }
[data-testid="stFileChip"] > div:nth-child(2) > div:last-child { font-size: .7rem; color: var(--muted); }
/* botão remover: na mesma linha, discreto, rosa no hover */
[data-testid="stFileChipDeleteBtn"] { position: static; display: flex; align-items: center; align-self: center; margin: 0 0 0 .15rem; }
[data-testid="stFileChipDeleteBtn"] button {
  display: grid; place-items: center;
  width: 22px; height: 22px; padding: 0;
  border-radius: 50%;
  color: var(--muted); background: transparent;
  transition: color .15s, background .15s;
}
[data-testid="stFileChipDeleteBtn"] button svg { width: 16px; height: 16px; }
[data-testid="stFileChipDeleteBtn"] button:hover { color: #FF9EC0; background: rgba(235, 60, 125, .14); }
/* ---------- 3.11 Botões só com ícone ---------- */
/* Botões criados com rótulo " " deixam um bloco de texto vazio que
   empurra o ícone para o lado; aqui ele é escondido e o ícone centralizado. */
button [data-testid="stMarkdownContainer"]:empty { display: none; }
.st-key-header-actions button,
[class*="st-key-delete-"] button,
[class*="st-key-download-"] button { justify-content: center; padding: 0; }
[class*="st-key-delete-"] button { width: 30px; height: 30px; min-height: 30px; }
[class*="st-key-download-"] button {
  width: 32px; height: 32px; min-height: 32px;
  border: 1px solid var(--border); border-radius: var(--radius-sm);
  color: var(--text-2);
}
[class*="st-key-download-"] button:hover { border-color: var(--purple-border); color: var(--accent); background: var(--purple-soft); }
/* ---------- 3.12 Responsivo ---------- */
/* tablets e telas médias */
@media (max-width: 992px) {
  [data-testid="stMain"] .block-container { padding: 1.5rem 1.4rem 8rem; }
}
/* celulares */
@media (max-width: 640px) {
  [data-testid="stMain"] .block-container { padding: 1rem 1rem 7.5rem; }
  .hero { padding: 1.6rem .25rem .5rem; }
  .hero-badge { margin-bottom: 1rem; font-size: .7rem; }
  .hero-subtitle { font-size: .92rem; }
  .section-label { margin-top: 1.6rem; }
  /* no celular as sugestões ficam em lista: ícone à esquerda, texto à direita */
  .st-key-suggestions [data-testid="stBaseButton-secondary"] { min-height: 0; padding: .85rem 1rem; }
  .st-key-suggestions [data-testid="stBaseButton-secondary"] > div > span { flex-direction: row; align-items: center; gap: .85rem; }
  .st-key-suggestions [data-testid="stHorizontalBlock"] { gap: .6rem; }
  .page-title { font-size: 1.3rem; }
  [data-testid="stChatMessage"]:has(.is-user) [data-testid="stChatMessageContent"] { max-width: 86%; }
  [data-testid="stChatMessageAvatarCustom"] { width: 1.8rem; height: 1.8rem; }
  .message-meta { min-height: 1.8rem; }
  [class*="st-key-artifact-card-"] { min-height: 0; }
  [class*="st-key-artifact-card-"]:hover { transform: none; }
  /* lixeira sempre visível no toque (não existe hover no celular) */
  [class*="st-key-history-row-"] [class*="st-key-delete-"] { opacity: 1; }
}
/* respeita quem prefere menos animação */
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}
</style>
"""


# =============================================================================
# 4. UTILITÁRIOS
# =============================================================================
def now_iso() -> str:
    """Data/hora atual em ISO (usada para ordenar as conversas)."""
    return datetime.now().isoformat(timespec="seconds")


def now_hhmm() -> str:
    """Hora atual no formato HH:MM (exibida nas mensagens)."""
    return datetime.now().strftime("%H:%M")


def truncate(text: str, limit: int) -> str:
    """Corta o texto no limite e adiciona reticências, se necessário."""
    return text if len(text) <= limit else text[:limit].rstrip() + "…"


def html(markup: str) -> None:
    """Atalho para renderizar HTML próprio via st.markdown."""
    st.markdown(markup, unsafe_allow_html=True)


# =============================================================================
# 5. ESTADO DA SESSÃO
# =============================================================================
def create_conversation() -> str:
    """Cria uma conversa vazia, torna-a ativa e devolve o id."""
    conversation_id = str(uuid4())
    st.session_state.conversations[conversation_id] = {
        "title": NEW_CHAT_TITLE,
        "messages": [],
        "updated_at": now_iso(),
    }
    st.session_state.active_conversation = conversation_id
    return conversation_id


def initialize_state() -> None:
    """Garante que o estado exista e que haja sempre uma conversa ativa válida."""
    st.session_state.setdefault("conversations", {})
    active_id = st.session_state.get("active_conversation")
    if active_id not in st.session_state.conversations:
        create_conversation()


def get_active_conversation() -> dict:
    """Retorna o dicionário da conversa atualmente aberta."""
    return st.session_state.conversations[st.session_state.active_conversation]


def has_user_messages(conversation: dict) -> bool:
    """True se o usuário já enviou algo (só essas aparecem no histórico)."""
    return any(message["role"] == "user" for message in conversation["messages"])


def sorted_conversations() -> list[tuple[str, dict]]:
    """Conversas com mensagens do usuário, da mais recente para a mais antiga."""
    return sorted(
        (
            (conversation_id, conversation)
            for conversation_id, conversation in st.session_state.conversations.items()
            if has_user_messages(conversation)
        ),
        key=lambda item: item[1]["updated_at"],
        reverse=True,
    )


# =============================================================================
# 6. AÇÕES / CALLBACKS
# -----------------------------------------------------------------------------
# Usamos on_click=<função> nos botões: o Streamlit executa a função ANTES de
# redesenhar a página, então a tela já aparece atualizada — sem precisar de
# st.rerun() manual e sem "piscadas".
# =============================================================================
def add_user_message(text: str, files: list) -> None:
    """Registra a mensagem do usuário e a resposta simulada do agente."""
    conversation = get_active_conversation()
    cleaned_text = text.strip() or DEFAULT_PROMPT_WITH_FILES

    # Na primeira mensagem, guarda também a saudação para ela continuar
    # visível no topo do histórico da conversa.
    if not conversation["messages"]:
        conversation["messages"].append(
            {"role": "assistant", "content": WELCOME_MESSAGE, "welcome": True}
        )

    # Mensagem do usuário.
    conversation["messages"].append(
        {
            "role": "user",
            "content": cleaned_text,
            "attachments": [file.name for file in files],
            "time": now_hhmm(),
        }
    )

    # A primeira mensagem vira o título da conversa.
    if conversation["title"] == NEW_CHAT_TITLE:
        conversation["title"] = truncate(cleaned_text, TITLE_MAX_CHARS)

    # Resposta simulada do agente (protótipo: texto fixo + artefatos prontos).
    conversation["messages"].append(
        {
            "role": "assistant",
            "content": (
                "Pronto! Analisei sua solicitação e preparei os artefatos abaixo. "
                "Clique no ícone de download para baixar cada arquivo."
            ),
            "artifacts": sample_artifacts(),
            "time": now_hhmm(),
        }
    )
    conversation["updated_at"] = now_iso()


def start_new_conversation() -> None:
    """Abre uma conversa nova — reaproveita a atual se ela ainda estiver vazia."""
    if get_active_conversation()["messages"]:
        create_conversation()


def select_conversation(conversation_id: str) -> None:
    """Torna a conversa clicada no histórico a conversa ativa."""
    st.session_state.active_conversation = conversation_id


def delete_conversation(conversation_id: str) -> None:
    """Exclui uma conversa e escolhe outra para ficar ativa, se preciso."""
    st.session_state.conversations.pop(conversation_id, None)

    if st.session_state.active_conversation in st.session_state.conversations:
        return  # a conversa ativa não foi afetada

    # A ativa foi excluída: abre a mais recente restante ou cria uma nova.
    remaining = sorted_conversations()
    if remaining:
        st.session_state.active_conversation = remaining[0][0]
    else:
        create_conversation()


def clear_active_conversation() -> None:
    """Apaga as mensagens da conversa aberta e restaura o título padrão."""
    conversation = get_active_conversation()
    conversation["title"] = NEW_CHAT_TITLE
    conversation["messages"].clear()
    conversation["updated_at"] = now_iso()


def handle_chat_input() -> None:
    """Desenha o campo de mensagem e processa o envio.

    Chamado no INÍCIO do script de propósito: no nível principal, o
    st.chat_input fica sempre fixo no rodapé, independentemente de onde é
    chamado. Processando a mensagem antes de desenhar o resto, a conversa e
    o histórico já aparecem atualizados — sem st.rerun().
    """
    submitted = st.chat_input(
        "Pergunte algo ou descreva uma tarefa…",
        key="chat-input",
        accept_file="multiple",
        file_type=ACCEPTED_FILE_TYPES,
    )
    if submitted is not None:
        add_user_message(submitted.text, submitted.files)


# =============================================================================
# 7. ARTEFATOS SIMULADOS
# =============================================================================
@dataclass(frozen=True)
class Artifact:
    """Um arquivo gerado pelo agente e oferecido para download."""

    name: str         # nome exibido no card
    description: str  # texto curto abaixo do nome
    filename: str     # nome do arquivo baixado
    content: str      # conteúdo do arquivo

    @property
    def extension(self) -> str:
        """Extensão em maiúsculas (ex.: 'YAML'), usada no selo do card."""
        return self.filename.rsplit(".", 1)[-1].upper()


def sample_artifacts() -> list[Artifact]:
    """Artefatos fixos exibidos em toda resposta do protótipo."""
    return [
        Artifact(
            name="Diagrama Draw.io",
            description="Diagrama editável do fluxo, pronto para abrir no diagrams.net.",
            filename="modelo.drawio",
            content=dedent(
                """\
                <mxfile host="app.diagrams.net">
                  <diagram name="Fluxo">
                    <mxGraphModel><root>
                      <mxCell id="0"/><mxCell id="1" parent="0"/>
                      <mxCell id="2" value="Fonte de dados" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F6EEFB;strokeColor=#660099;" vertex="1" parent="1"><mxGeometry x="40" y="80" width="140" height="60" as="geometry"/></mxCell>
                      <mxCell id="3" value="Agente" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EBDDF5;strokeColor=#660099;" vertex="1" parent="1"><mxGeometry x="240" y="80" width="120" height="60" as="geometry"/></mxCell>
                      <mxCell id="4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;endArrow=block;" edge="1" parent="1" source="2" target="3"><mxGeometry relative="1" as="geometry"/></mxCell>
                    </root></mxGraphModel>
                  </diagram>
                </mxfile>
                """
            ),
        ),
        Artifact(
            name="Fluxo Mermaid",
            description="Versão textual do fluxo, fácil de versionar e revisar.",
            filename="modelo.mmd",
            content=dedent(
                """\
                flowchart LR
                  A[Fonte de dados] --> B[Agente]
                  B --> C[Validação]
                  C --> D[Artefatos]
                """
            ),
        ),
        Artifact(
            name="Contrato YAML",
            description="Contrato intermediário com componentes e fluxos.",
            filename="modelo.yaml",
            content=dedent(
                """\
                name: arquitetura-de-dados
                description: Fluxo da fonte de dados até a validação.
                components:
                  - id: data-source
                    type: source
                  - id: agent
                    type: processor
                  - id: validation
                    type: validator
                flows:
                  - from: data-source
                    to: agent
                  - from: agent
                    to: validation
                """
            ),
        ),
    ]


# =============================================================================
# 8. COMPONENTES VISUAIS
# =============================================================================

# ---------- 8.1 Sidebar -------------------------------------------------------
def history_group_label(moment: datetime) -> str:
    """Agrupa o histórico por período: Hoje, Ontem, Últimos 7 dias, Mais antigas."""
    days_ago = (date.today() - moment.date()).days
    if days_ago <= 0:
        return "Hoje"
    if days_ago == 1:
        return "Ontem"
    if days_ago < 7:
        return "Últimos 7 dias"
    return "Mais antigas"


def render_history_row(conversation_id: str, conversation: dict, updated: datetime) -> None:
    """Uma linha do histórico: botão com o título + lixeira (visível no hover)."""
    is_active = conversation_id == st.session_state.active_conversation
    # A key do container vira classe CSS (.st-key-...), usada para destacar
    # a linha ativa e para mostrar a lixeira apenas no hover.
    row_key = "history-row-active" if is_active else "history-row"

    # Container horizontal (em vez de st.columns): no celular, colunas
    # empilham uma embaixo da outra; o container horizontal não.
    with st.container(
        key=f"{row_key}-{conversation_id}",
        horizontal=True,
        vertical_alignment="center",
        gap="small",
    ):
        # Título da conversa (ocupa todo o espaço disponível).
        st.button(
            truncate(conversation["title"], HISTORY_TITLE_MAX_CHARS),
            key=f"select-{conversation_id}",
            icon=":material/chat_bubble_outline:",
            type="tertiary",
            width="stretch",
            # Tooltip com o título completo e o horário da última atividade.
            help=f"{conversation['title']}  \n{updated:%d/%m · %H:%M}",
            on_click=select_conversation,
            args=(conversation_id,),
        )

        # Lixeira (só o tamanho do ícone).
        st.button(
            " ",
            key=f"delete-{conversation_id}",
            icon=":material/delete_outline:",
            type="tertiary",
            width="content",
            help="Excluir conversa",
            on_click=delete_conversation,
            args=(conversation_id,),
        )


def render_history() -> None:
    """Lista de conversas anteriores, agrupadas por período."""
    conversations = sorted_conversations()

    if not conversations:
        html(
            '<div class="sidebar-empty">'
            "Nenhuma conversa ainda.<br>Suas conversas aparecerão aqui."
            "</div>"
        )
        return

    current_group = None
    for conversation_id, conversation in conversations:
        updated = datetime.fromisoformat(conversation["updated_at"])

        # Escreve o rótulo do grupo só quando ele muda (lista já está ordenada).
        group = history_group_label(updated)
        if group != current_group:
            html(f'<div class="history-group">{group}</div>')
            current_group = group

        render_history_row(conversation_id, conversation, updated)


def render_sidebar() -> None:
    """Barra lateral: marca, botão de nova conversa e histórico."""
    # Logo nativo do Streamlit:
    #   • sidebar aberta  → logo completo no topo da sidebar
    #   • sidebar fechada → só o ícone, fixo no canto superior esquerdo
    # O CSS (seção 3.4) coloca o botão de "abrir sidebar" por cima do ícone,
    # então clicar no logo abre a sidebar.
    st.logo(LOGO_FULL, icon_image=LOGO_ICON, size="large")

    with st.sidebar:
        st.button(
            "Nova conversa",
            icon=":material/add:",
            type="primary",
            width="stretch",
            on_click=start_new_conversation,
        )

        html('<div class="sidebar-heading">Histórico</div>')
        render_history()


# ---------- 8.2 Cabeçalho -----------------------------------------------------
def render_header(conversation: dict) -> None:
    """Topo da área principal: navegação, título, resumo e botões de ação."""
    messages = conversation["messages"]
    has_messages = bool(messages)

    # Linha superior: navegação à esquerda, ações à direita.
    # Container horizontal (e não st.columns) para não empilhar no celular.
    with st.container(
        horizontal=True, horizontal_alignment="distribute", vertical_alignment="center"
    ):
        # "Migalha de pão" indicando onde o usuário está.
        html(
            f'<div class="breadcrumb"><b>{APP_NAME}</b><span>/</span>'
            f'{"Conversa" if has_messages else "Início"}</div>'
        )

        # Grupo de botões-ícone, só com a largura necessária.
        with st.container(
            key="header-actions", horizontal=True, width="content", gap="small"
        ):
            if st.button(" ", key="index-chat", icon=":material/layers:",
                         type="tertiary", help="Indexar arquivos"):
                st.toast("A indexação de arquivos estará disponível em breve.",
                         icon=":material/info:")

            st.button(
                " ",
                key="clear-chat",
                icon=":material/delete_sweep:",
                type="tertiary",
                help="Limpar conversa",
                disabled=not has_messages,
                on_click=clear_active_conversation,
            )

    # O título só aparece quando há conversa
    # (na tela inicial o "hero" já faz o papel de título).
    if has_messages:
        html(
            f'<div class="page-title">{escape(conversation["title"])}</div>'
            '<div class="header-divider"></div>'
        )


# ---------- 8.3 Tela inicial (conversa vazia) ---------------------------------
def render_empty_state() -> None:
    """Saudação em destaque + cards de sugestão para começar rápido."""
    html(
        '<div class="hero">'
        f'<div class="hero-badge">✦ {APP_NAME} · {APP_TAGLINE}</div>'
        '<div class="hero-title">Olá! Como posso <em>ajudar?</em></div>'
        f'<div class="hero-subtitle">{WELCOME_SUBTITLE}</div>'
        "</div>"
        '<div class="section-label">Comece por uma sugestão</div>'
    )

    # key="suggestions" permite estilizar esses botões como cards no CSS.
    with st.container(key="suggestions"):
        columns = st.columns(len(SUGGESTIONS))
        for index, (column, (icon, title, prompt)) in enumerate(zip(columns, SUGGESTIONS)):
            with column:
                st.button(
                    # Rótulo em Markdown: título em negrito + texto da sugestão.
                    # O CSS (3.7) transforma o negrito em uma linha de título.
                    f"**{title}** {prompt}",
                    key=f"suggestion-{index}",
                    icon=icon,
                    width="stretch",
                    on_click=add_user_message,
                    args=(prompt, []),
                )


# ---------- 8.4 Mensagens -----------------------------------------------------
def message_meta_html(role: str, time: str | None = None) -> str:
    """HTML da linha pequena acima da mensagem: autor · horário.

    A classe is-user / is-assistant serve de "marcador" para o CSS saber
    quem enviou a mensagem (balão roxo à direita para o usuário).
    """
    time_part = f"<span>·</span><span>{escape(time)}</span>" if time else ""
    return f'<div class="message-meta is-{role}"><b>{AUTHORS[role]}</b>{time_part}</div>'


def render_attachments(names: list[str]) -> None:
    """Exibe os anexos da mensagem como 'chips'."""
    chips = "".join(f'<span class="attachment-chip">📎 {escape(name)}</span>' for name in names)
    html(f'<div class="attachments">{chips}</div>')


def render_artifacts(artifacts: list[Artifact], message_index: int) -> None:
    """Cards de artefatos, cada um com seu botão de download."""
    html('<div class="artifacts-label">Artefatos gerados</div>')

    columns = st.columns(len(artifacts))
    for index, (column, artifact) in enumerate(zip(columns, artifacts)):
        # Key única por mensagem + posição → evita conflito entre mensagens.
        card_key = f"{message_index}-{index}"

        with column, st.container(key=f"artifact-card-{card_key}"):
            # Linha superior: selo da extensão (esq.) e botão de download (dir.).
            # "distribute" empurra os dois itens para as pontas.
            with st.container(
                horizontal=True, horizontal_alignment="distribute", vertical_alignment="center"
            ):
                html(f'<span class="artifact-format">{escape(artifact.extension)}</span>')
                st.download_button(
                    " ",
                    data=artifact.content,
                    file_name=artifact.filename,
                    mime="text/plain",
                    key=f"download-{card_key}",
                    help=f"Baixar {artifact.filename}",
                    icon=":material/download:",
                    type="tertiary",
                    on_click="ignore",  # baixa sem recarregar a página
                )

            # Nome e descrição do artefato.
            html(
                f'<div class="artifact-name">{escape(artifact.name)}</div>'
                f'<div class="artifact-detail">{escape(artifact.description)}</div>'
            )


def render_messages(conversation: dict) -> None:
    """Percorre as mensagens da conversa e desenha cada uma."""
    for index, message in enumerate(conversation["messages"]):
        role = message["role"]

        with st.chat_message(role, avatar=AVATARS[role]):
            meta = message_meta_html(role, message.get("time"))

            if role == "user":
                # Mensagem do usuário: autor + texto num único bloco HTML,
                # para o balão ficar compacto (texto escapado por segurança).
                html(f'{meta}<div class="user-text">{escape(message["content"])}</div>')
            else:
                # Resposta do agente: texto em Markdown (aceita negrito, listas…).
                html(meta)
                st.markdown(message["content"])

            if message.get("attachments"):
                render_attachments(message["attachments"])

            if message.get("artifacts"):
                render_artifacts(message["artifacts"], index)


# =============================================================================
# 9. MAIN — monta a página na ordem certa
# =============================================================================
def main() -> None:
    html(CSS)               # 1) aplica o visual
    initialize_state()      # 2) garante o estado da sessão
    handle_chat_input()     # 3) processa uma mensagem nova (antes de desenhar)
    render_sidebar()        # 4) barra lateral

    conversation = get_active_conversation()
    render_header(conversation)  # 5) cabeçalho

    # 6) corpo: tela inicial OU histórico de mensagens
    if conversation["messages"]:
        render_messages(conversation)
    else:
        render_empty_state()


if __name__ == "__main__":
    main()
