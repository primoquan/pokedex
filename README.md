# 🎮 Pokedex - Parcial 1 Desarrollo Web

Una aplicación web moderna que consume la PokeAPI para mostrar información detallada de Pokémon con interfaz responsive y funcionalidades avanzadas.

## 🔗 Demo en Vivo

**👉 [Ver la aplicación funcionando](https://primoquan.github.io/pokedex/)**

Prueba todas las funcionalidades directamente en tu navegador.

## 📋 Tabla de Contenidos

1. [Demo en Vivo](#-demo-en-vivo)
2. [Características](#-características)
3. [Tecnologías](#️-tecnologías)
4. [Estructura del Proyecto](#-estructura-del-proyecto)
5. [HTML - Estructura Semántica](#-html---estructura-semántica)
6. [CSS - Metodología BEM](#-css---metodología-bem)
7. [JavaScript - Funcionalidad](#-javascript---funcionalidad)
8. [Consumo de API](#-consumo-de-api)
9. [Renderizado Dinámico](#-renderizado-dinámico)
10. [Sistema de Favoritos](#-sistema-de-favoritos)
11. [Sistema de Carga Progresiva](#-sistema-de-carga-progresiva)
12. [Responsividad](#-responsividad)
13. [Cómo Usar](#-cómo-usar)

---

## ✨ Características

- 🔍 **1025 Pokémon** de las 9 generaciones completas (1-9)
- 🎨 **Metodología BEM** implementada correctamente
- 📱 **Totalmente responsive** (mobile-first)
- 💖 **Sistema de favoritos** con persistencia
- 🌙 **Temas día/noche** intercambiables
- ⚡ **Carga progresiva** por generaciones
- 🔄 **Filtros avanzados** por generación
- 📊 **Información completa** (tipos con iconos SVG, stats, altura, peso, evoluciones, ubicaciones)
- 🎮 **Interfaz estilo Pokémon** con animaciones

---

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos con metodología BEM
- **JavaScript ES6+** - Funcionalidad moderna
- **PokeAPI** - Datos de Pokémon
- **LocalStorage** - Persistencia de favoritos
- **CSS Grid/Flexbox** - Layout responsive
- **Fetch API** - Consumo de servicios web

---

## 📁 Estructura del Proyecto

```
📦 pokedex/
├── 📄 index.html          # Estructura HTML principal
├── 📄 README.md           # Documentación del proyecto
├── 🖼️ favicon.ico         # Icono de la página
├── 📁 css/
│   └── 📄 style.css       # Estilos con metodología BEM
├── 📁 js/
│   └── 📄 app.js          # Lógica de la aplicación
└── 📁 images/
    ├── 🖼️ pokedex.svg     # Icono del título
    └── 🖼️ pokeball.svg    # Icono de favoritos
```

---

## 🏗️ HTML - Estructura Semántica

### Características del HTML

El archivo `index.html` utiliza HTML5 semántico y sigue las mejores prácticas:

#### 1. **Head Optimizado**
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pokédex</title>
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" href="css/style.css">
</head>
```

**Explicación:**
- `viewport` para responsividad móvil
- `favicon` personalizado temático
- CSS externo para separación de responsabilidades

#### 2. **Header con Navegación**
```html
<header class="header">
  <div class="header__title header__title--pokemon-font">
    <img src="images/pokedex.svg" alt="Pokédx" class="header__icon">
    POKEDEX creado por Luis Quan
  </div>
  <div class="header__actions">
    <select id="generation-select" class="header__select"></select>
    <input type="text" id="search" class="header__input">
    <button id="theme-toggle" class="header__button header__button--theme">🌙</button>
    <button id="reset" class="header__button header__button--reset">Reset</button>
    <button id="favorites-btn" class="header__button header__button--favorites">
      <img src="images/pokeball.svg" class="header__icon header__icon--pokeball">
    </button>
  </div>
</header>
```

**Explicación:**
- **Clases BEM**: `bloque__elemento--modificador`
- **Semántica**: `<header>` para la cabecera de navegación
- **Accesibilidad**: `alt` en imágenes, IDs para JavaScript

#### 3. **Main Content**
```html
<main class="main">
  <div class="pokemon-list"></div>
  <div class="pokemon-detail">
    <button class="pokemon-detail__close" id="detail-close">✕</button>
  </div>
</main>
```

**Explicación:**
- **`<main>`**: Contenido principal de la página
- **Contenedores dinámicos**: Se llenan via JavaScript
- **Botón modal**: Para cerrar en dispositivos móviles

#### 4. **Aside y Elementos Flotantes**
```html
<aside class="favorites-panel">
  <button class="favorites-panel__close" id="favorites-close">✕</button>
</aside>

<button class="scroll-to-top" id="scroll-to-top">↑</button>
```

**Explicación:**
- **`<aside>`**: Contenido complementario (favoritos)
- **Elementos flotantes**: Botones de utilidad fuera del flujo

---

## 🎨 CSS - Metodología BEM

### ¿Qué es BEM?

**BEM** (Block Element Modifier) es una metodología de nomenclatura CSS que hace el código:
- **Modular**: Componentes independientes
- **Reutilizable**: Fácil de mantener
- **Escalable**: Crece sin conflictos

### Estructura BEM Implementada

#### 1. **Bloques (Componentes Principales)**
```css
.header { /* Cabecera de la aplicación */ }
.pokemon-list { /* Lista de Pokémon */ }
.pokemon-card { /* Tarjeta individual de Pokémon */ }
.pokemon-detail { /* Panel de información detallada */ }
.evolution-chain { /* Cadena de evoluciones */ }
.favorites-panel { /* Panel lateral de favoritos */ }
.scroll-to-top { /* Botón flotante */ }
```

#### 2. **Elementos (Partes de los Bloques)**
```css
.header__title { /* Título dentro del header */ }
.header__actions { /* Contenedor de botones */ }
.header__button { /* Botón individual */ }
.header__icon { /* Icono dentro del header */ }

.pokemon-card__name { /* Nombre del Pokémon */ }
.pokemon-card__image { /* Imagen del Pokémon */ }
.pokemon-card__number { /* Número del Pokémon */ }

.pokemon-detail__header { /* Cabecera del detalle */ }
.pokemon-detail__stats { /* Estadísticas */ }
.pokemon-detail__evolution { /* Sección de evoluciones */ }
```

#### 3. **Modificadores (Variaciones)**
```css
.header__title--pokemon-font { /* Título con fuente especial */ }
.header__button--theme { /* Botón de cambio de tema */ }
.header__button--favorites { /* Botón de favoritos */ }
.header__icon--pokeball { /* Icono de pokébola */ }

.pokemon-card--selected { /* Tarjeta seleccionada */ }
.pokemon-detail--open { /* Modal abierto en móviles */ }
.favorites-panel--open { /* Panel de favoritos visible */ }
.scroll-to-top--visible { /* Botón scroll visible */ }
```

### Ejemplo de Nomenclatura BEM

**❌ CSS Tradicional (Problemático):**
```css
.card { }
.card.selected { }
.card .name { }
.card .image { }
```

**✅ CSS con BEM (Correcto):**
```css
.pokemon-card { }
.pokemon-card--selected { }
.pokemon-card__name { }
.pokemon-card__image { }
```

### Temas y Responsive

#### 1. **Sistema de Temas**
```css
/* Tema claro */
body.light .pokemon-card {
  background: rgba(255, 255, 255, 0.95);
  color: #222;
}

/* Tema oscuro */
body.dark .pokemon-card {
  background: rgba(30, 30, 30, 0.95);
  color: #f9f9f9;
}
```

#### 2. **Responsive Design**
```css
/* Desktop por defecto */
.pokemon-list {
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
}

/* Móviles */
@media (max-width: 768px) {
  .pokemon-list {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
  
  .pokemon-detail {
    position: fixed !important;
    top: 0 !important;
    /* Modal fullscreen */
  }
}
```

---

## ⚡ JavaScript - Funcionalidad

### Arquitectura del Código

El archivo `app.js` está organizado en secciones funcionales:

#### 1. **Configuración y Variables Globales**
```javascript
const POKE_API = 'https://pokeapi.co/api/v2/';
const generations = [
  { name: 'Generación 1', start: 1, end: 151 },       // Kanto (Red/Blue/Yellow)
  { name: 'Generación 2', start: 152, end: 251 },     // Johto (Gold/Silver/Crystal)
  { name: 'Generación 3', start: 252, end: 386 },     // Hoenn (Ruby/Sapphire/Emerald)
  { name: 'Generación 4', start: 387, end: 493 },     // Sinnoh (Diamond/Pearl/Platinum)
  { name: 'Generación 5', start: 494, end: 649 },     // Unova (Black/White)
  { name: 'Generación 6', start: 650, end: 721 },     // Kalos (X/Y)
  { name: 'Generación 7', start: 722, end: 809 },     // Alola (Sun/Moon)
  { name: 'Generación 8', start: 810, end: 905 },     // Galar (Sword/Shield)
  { name: 'Generación 9', start: 906, end: 1025 }     // Paldea (Scarlet/Violet)
];

let allPokemons = [], filteredPokemons = [], selectedPokemon = null;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
```

**Explicación:**
- **Constantes**: URL de la API y configuración de generaciones
- **Arrays globales**: Almacenan los datos de Pokémon
- **LocalStorage**: Recupera favoritos guardados

#### 2. **Selectors DOM**
```javascript
const listContainer = document.querySelector('.pokemon-list');
const detailContainer = document.querySelector('.pokemon-detail');
const favoritesContainer = document.querySelector('.favorites-panel');
// ... más selectores
```

**Explicación:**
- **Caching de elementos**: Mejor performance
- **Nomenclatura BEM**: Selectores coherentes

#### 3. **Funciones Principales**

##### **Inicialización**
```javascript
document.addEventListener('DOMContentLoaded', async () => {
  // Configurar UI
  // Cargar Pokémon
  // Renderizar favoritos
});
```

##### **Fetch de Pokémon**
```javascript
async function fetchPokemon(idOrName) {
  try {
    const res = await fetch(`${POKE_API}pokemon/${idOrName}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const data = await res.json();
    return {
      id: data.id,
      name: data.name,
      sprite: data.sprites.front_default,
      types: data.types.map(t => t.type.name),
      stats: data.stats.map(s => ({ name: s.stat.name, value: s.base_stat })),
      speciesUrl: data.species.url
    };
  } catch (error) {
    console.warn(`❌ Error cargando Pokémon ${idOrName}:`, error.message);
    // Objeto de fallback
  }
}
```

##### **Renderizado de Lista**
```javascript
function renderPokemonList(pokemons) {
  listContainer.innerHTML = '';
  pokemons.forEach(pokemon => {
    const item = document.createElement('div');
    item.classList.add('pokemon-card');
    if (selectedPokemon && selectedPokemon.id === pokemon.id) {
      item.classList.add('pokemon-card--selected');
    }
    
    item.innerHTML = `
      <span class="pokemon-card__number">#${pokemon.id}</span>
      <img src="${pokemon.sprite}" class="pokemon-card__image">
      <span class="pokemon-card__name">${capitalize(pokemon.name)}</span>
    `;
    
    item.addEventListener('click', () => showPokemonDetail(pokemon));
    listContainer.appendChild(item);
  });
}
```

##### **Búsqueda Avanzada**
```javascript
searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase().trim();
  
  if (!term) {
    filteredPokemons = [...allPokemons];
  } else {
    // Buscar por nombre o por ID
    filteredPokemons = allPokemons.filter(p => {
      const matchesName = p.name.toLowerCase().includes(term);
      const matchesId = p.id.toString().includes(term);
      return matchesName || matchesId;
    });
  }
  
  renderPokemonList(filteredPokemons);
});
```

**Explicación:**
- **DOM manipulation**: Creación dinámica de elementos
- **Clases BEM**: Aplicación consistente
- **Event listeners**: Interactividad
- **Búsqueda dual**: Por nombre ("pikachu") o ID ("25")

---

## 🌐 Consumo de API

### ¿Qué es PokeAPI?

**PokeAPI** es una API REST gratuita que proporciona datos completos sobre Pokémon.

### Endpoints Utilizados

#### 1. **Información Básica del Pokémon**
```javascript
// GET https://pokeapi.co/api/v2/pokemon/{id}
const pokemon = await fetch(`${POKE_API}pokemon/25`); // Pikachu
```

**Datos obtenidos:**
- ID y nombre
- Sprite (imagen)
- Tipos
- Estadísticas base
- URL de especies

#### 2. **Información de Especies**
```javascript
// GET https://pokeapi.co/api/v2/pokemon-species/{id}
const species = await fetch(pokemon.speciesUrl);
```

**Datos obtenidos:**
- Cadena de evolución
- Información adicional de especies

#### 3. **Cadena de Evolución**
```javascript
// GET https://pokeapi.co/api/v2/evolution-chain/{id}
const evolution = await fetch(speciesData.evolution_chain.url);
```

**Datos obtenidos:**
- Pokémon en la cadena evolutiva
- Condiciones de evolución

#### 4. **Ubicaciones**
```javascript
// GET https://pokeapi.co/api/v2/pokemon/{id}/encounters
const locations = await fetch(`${POKE_API}pokemon/${id}/encounters`);
```

**Datos obtenidos:**
- Lugares donde se puede encontrar el Pokémon

### Estrategia de Carga

#### 1. **Carga por Lotes**
```javascript
async function loadAllGenerations() {
  allPokemons = [];
  console.log('🔄 Cargando Pokémon de 9 generaciones...');
  
  for (const [index, gen] of generations.entries()) {
    console.log(`📦 Cargando ${gen.name} (${gen.start}-${gen.end})...`);
    
    // Actualizar mensaje de carga con progreso
    const progress = Math.round(((index + 1) / generations.length) * 100);
    listContainer.innerHTML = `<div class="loading-message">🔄 Cargando ${gen.name}...<br><small>Pokémon ${gen.start}-${gen.end} | ${allPokemons.length} cargados | ${progress}% completado</small></div>`;
    
    // Cargar en lotes más pequeños para mejor UX con 9 generaciones
    const batchSize = 50;
    const promises = [];
    
    for (let i = gen.start; i <= gen.end; i += batchSize) {
      const batch = [];
      const end = Math.min(i + batchSize - 1, gen.end);
      
      for (let j = i; j <= end; j++) {
        batch.push(fetchPokemon(j));
      }
      
      promises.push(Promise.all(batch));
    }
    
    const batches = await Promise.all(promises);
    const genPokemons = batches.flat();
    
    allPokemons.push(...genPokemons);
    filteredPokemons = [...allPokemons];
    renderPokemonList(filteredPokemons); // renderiza progresivamente
    
    console.log(`✅ ${gen.name} cargada (${allPokemons.length} Pokémon total)`);
  }
  
  console.log(`🎉 ¡Todas las generaciones cargadas! Total: ${allPokemons.length} Pokémon`);
}
```

**Beneficios:**
- **Performance**: Carga paralela en lotes de 50
- **UX**: Renderizado progresivo con indicador de progreso
- **Estabilidad**: Manejo de errores por lote
- **Información**: Logs detallados del progreso de carga

#### 2. **Manejo de Errores**
```javascript
try {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
} catch (error) {
  console.warn('Error:', error);
  return fallbackData;
}
```

---

## 🔄 Renderizado Dinámico

### Concepto

El **renderizado dinámico** significa que el contenido HTML se genera en tiempo real basado en datos de la API.

### Implementación

#### 1. **Lista de Pokémon**

**Template Dinámico:**
```javascript
item.innerHTML = `
  <span class="pokemon-card__number">#${pokemon.id}</span>
  <img src="${pokemon.sprite}" class="pokemon-card__image">
  <span class="pokemon-card__name">${capitalize(pokemon.name)}</span>
`;
```

**Características:**
- **Template literals**: Interpolación de variables
- **Clases BEM**: Estructura coherente
- **Datos de API**: Información real de Pokémon

#### 2. **Detalle de Pokémon**

**Template Complejo:**
```javascript
detailContainer.innerHTML = `
  <div class="pokemon-detail__header">
    <div class="pokemon-detail__info">
      <span class="pokemon-detail__number">#${pokemon.id}</span>
      <h2 class="pokemon-detail__name">${capitalize(pokemon.name)}</h2>
      <div class="pokemon-detail__type-list">${typesWithIconsHtml}</div>
    </div>
    <button onclick="toggleFavorite(${pokemon.id})" class="pokemon-detail__favorite-btn">
      ${favorites.includes(pokemon.id) ? '💖' : '♡'}
    </button>
  </div>
  <img src="${pokemon.sprite}" class="pokemon-detail__image">
  <div class="pokemon-detail__stats">
    <h3>Estadísticas</h3>
    ${statsWithPhysicalInfo}
  </div>
  <div class="pokemon-detail__evolution">
    <h3>Evolución</h3>
    ${evolutionHtml}
  </div>
  <div class="pokemon-detail__locations">
    <h3>Ubicaciones</h3>
    ${await getLocations(pokemon.id)}
  </div>
`;
```

#### 3. **Evoluciones Dinámicas**

**Cadena de Evolución:**
```javascript
async function buildEvolutionHtml(evoChain) {
  let html = '<div class="evolution-chain">';
  
  for (let i = 0; i < evoChain.length; i++) {
    const p = await fetchPokemon(evoChain[i].name);
    
    html += `
      <div class="evolution-chain__step" onclick="showPokemonDetail(${p.id})">
        <img src="${p.sprite}" class="evolution-chain__image">
        <span class="evolution-chain__name">${capitalize(p.name)}</span>
      </div>
    `;
    
    if (i < evoChain.length - 1) {
      html += '<span class="evolution-chain__arrow">→</span>';
    }
  }
  
  html += '</div>';
  return html;
}
```

### Beneficios del Renderizado Dinámico

1. **Flexibilidad**: Adapta contenido según datos
2. **Performance**: Solo carga lo necesario
3. **Mantenibilidad**: Un template para múltiples datos
4. **Interactividad**: Responde a acciones del usuario

#### 4. **Información Detallada con Iconos**

**Tipos con Iconos SVG Modernos:**
```javascript
const getTypeIconUrl = (type) => {
  // Mapeo de tipos a iconos SVG modernos
  const typeIcons = {
    'fire': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/fire.svg',
    'water': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/water.svg',
    'grass': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/grass.svg',
    // ... todos los 18 tipos
  };
  return typeIcons[type] || '';
};

const typesHtml = pokemon.types.map(type => 
  `<span class="pokemon-detail__type pokemon-detail__type--${type}">
     <img src="${getTypeIconUrl(type)}" 
          alt="${type}" class="pokemon-detail__type-icon">
     ${capitalize(type)}
   </span>`
).join('');
```

**Estadísticas Completas:**
```javascript
const physicalStats = `
  <div class="pokemon-detail__stat">Altura: ${heightInMeters} m</div>
  <div class="pokemon-detail__stat">Peso: ${weightInKg} kg</div>
`;
const allStatsHtml = physicalStats + statsHtml;
```

**Características:**
- **Iconos SVG modernos**: Vectoriales de alta calidad que escalan perfectamente
- **18 tipos completos**: Todos los tipos Pokémon con iconos oficiales
- **Información física**: Altura y peso integrados en estadísticas
- **Conversión de unidades**: Decímetros a metros, hectogramos a kilogramos
- **Layout optimizado**: Tipos debajo del nombre del Pokémon

---

## 💖 Sistema de Favoritos

### Persistencia con LocalStorage

#### 1. **¿Qué es LocalStorage?**

LocalStorage permite guardar datos en el navegador que persisten entre sesiones.

#### 2. **Implementación**

**Inicialización:**
```javascript
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
```

**Agregar/Quitar Favorito:**
```javascript
function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }
  
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderFavorites();
  showPokemonDetail(selectedPokemon);
}
```

**Renderizar Favoritos:**
```javascript
function renderFavorites() {
  const closeBtn = favoritesContainer.querySelector('.favorites-panel__close');
  favoritesContainer.innerHTML = '';
  if (closeBtn) favoritesContainer.appendChild(closeBtn);
  
  favorites.forEach(async id => {
    let p = allPokemons.find(pk => pk.id === id);
    if (!p) {
      p = await fetchPokemon(id);
    }
    
    const div = document.createElement('div');
    div.classList.add('favorites-panel__item');
    div.innerHTML = `
      <span class="favorites-panel__name" 
            onclick="showPokemonDetail(${p.id}); closeFavoritesOnMobile();">
        ${capitalize(p.name)}
      </span>
      <button onclick="toggleFavorite(${p.id})" 
              class="favorites-panel__button">❌</button>
    `;
    favoritesContainer.appendChild(div);
  });
}
```

#### 3. **Panel de Favoritos**

**Desktop:**
- Panel lateral deslizante
- Aparece desde la derecha
- Mantiene el layout principal

**Móvil:**
- Modal fullscreen
- Aparece desde abajo
- Botón de cierre visible

### Características del Sistema

1. **Persistencia**: Los favoritos se guardan automáticamente
2. **Sincronización**: Se actualizan en tiempo real
3. **Interfaz**: Iconos visuales (pokébola llena/vacía)
4. **Navegación**: Click en favorito abre su información
5. **Responsive**: Adaptado para móvil y desktop
6. **Acceso Universal**: Los favoritos funcionan con cualquier Pokémon

---

## ⏳ Sistema de Carga Progresiva

### Diseño para Gran Volumen de Datos

La aplicación maneja **1025 Pokémon** de 9 generaciones con un sistema de carga optimizado:

#### 1. **Indicadores de Progreso**

**Mensaje de Carga Inicial:**
```html
<div class="loading-message">
  🔄 Cargando Pokémon de 9 generaciones...
  <small>Esto puede tomar unos momentos - son 1025 Pokémon!</small>
</div>
```

**Progreso por Generación:**
```html
<div class="loading-message">
  🔄 Cargando Generación 5...
  <small>Pokémon 494-649 | 493 cargados | 56% completado</small>
</div>
```

#### 2. **Renderizado Progresivo**

- **Tiempo real**: Los Pokémon aparecen conforme se cargan
- **Por generación**: Se actualiza la lista al completar cada generación
- **No bloquea**: La interfaz permanece interactiva durante la carga

#### 3. **Optimizaciones de UX**

**Lotes adaptativos:**
- **Lote pequeño**: 50 Pokémon por lote para mejor respuesta
- **Paralelo**: Múltiples lotes por generación
- **Secuencial**: Una generación a la vez para orden correcto

**Feedback visual:**
- **Emojis**: 🔄 (cargando), 📦 (generación), ✅ (completado)
- **Contadores**: Pokémon cargados y porcentaje de progreso
- **Console logs**: Información detallada para desarrolladores

#### 4. **Estrategia de Memoria**

```javascript
// Optimización de memoria durante la carga
for (const [index, gen] of generations.entries()) {
  const batches = await Promise.all(promises);
  const genPokemons = batches.flat();
  
  allPokemons.push(...genPokemons);
  filteredPokemons = [...allPokemons];
  renderPokemonList(filteredPokemons); // Renderizado inmediato
}
```

**Beneficios:**
- **Memoria eficiente**: Se libera memoria de cada lote
- **Respuesta inmediata**: El usuario ve resultados mientras carga
- **Tolerancia a errores**: Fallos individuales no detienen la carga

---

## 📱 Responsividad

### Enfoque Mobile-First

La aplicación utiliza un enfoque **mobile-first** con breakpoint en **768px**.

#### 1. **Layout Adaptativo**

**Desktop (>768px):**
```css
.main {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Lista | Detalle */
  gap: 1rem;
  padding: 1rem;
}
```

**Móvil (≤768px):**
```css
@media (max-width: 768px) {
  .main {
    grid-template-columns: 1fr; /* Solo lista */
    gap: 0.5rem;
    padding: 0.5rem;
  }
}
```

#### 2. **Modales para Móviles**

**Información de Pokémon:**
```css
@media (max-width: 768px) {
  .pokemon-detail {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    transform: translate3d(0, 100vh, 0) !important;
    z-index: 1001 !important;
  }
  
  .pokemon-detail--open {
    transform: translate3d(0, 0, 0) !important;
  }
}
```

**Panel de Favoritos:**
```css
@media (max-width: 768px) {
  .favorites-panel {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    width: 100%; height: 100%;
    transform: translateY(100%);
  }
  
  .favorites-panel--open {
    transform: translateY(0);
  }
}
```

#### 3. **Elementos Adaptativos**

**Botones del Header:**
```css
/* Desktop */
.header__button {
  padding: 0.5rem 0.8rem;
  font-size: 12px;
  min-height: 36px;
}

/* Móvil */
@media (max-width: 768px) {
  .header__button {
    padding: 0.4rem 0.6rem;
    font-size: 11px;
    min-height: 32px;
  }
}
```

**Cards de Pokémon:**
```css
/* Desktop */
.pokemon-card {
  height: 140px;
  padding: 1rem;
}

.pokemon-card__image {
  width: 90px;
  height: 90px;
}

/* Móvil */
@media (max-width: 768px) {
  .pokemon-card {
    height: 120px;
    padding: 0.8rem;
  }
  
  .pokemon-card__image {
    width: 70px;
    height: 70px;
  }
}
```

#### 4. **JavaScript Responsive**

**Detección de Dispositivo:**
```javascript
// Modal para móviles, scroll para desktop
if (window.innerWidth <= 768) {
  detailContainer.classList.add('pokemon-detail--open');
} else {
  detailContainer.scrollIntoView({ behavior: 'smooth' });
}
```

**Manejo de Resize:**
```javascript
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    // Cerrar modales móviles en desktop
    detailContainer.classList.remove('pokemon-detail--open');
    favoritesContainer.classList.remove('favorites-panel--open');
  }
});
```

#### 5. **Touch Optimizations**

**Tamaños Mínimos:**
- Botones: 44px × 44px (recomendación Apple)
- Áreas tocables: Padding generoso
- Scroll suave: `-webkit-overflow-scrolling: touch`

**Gestos Naturales:**
- Toque para abrir
- Deslizar para cerrar
- Scroll vertical fluido

---

## 🚀 Cómo Usar

### Instalación

#### **Opción 1: Ver Demo Online (Recomendado)**
👉 **[Abrir la aplicación](https://primoquan.github.io/pokedex/)** - Sin instalación necesaria

#### **Opción 2: Instalación Local**
1. **Clonar o descargar** el proyecto
2. **Abrir** `index.html` en un navegador
3. **Servir localmente** (recomendado):
   ```bash
   python3 -m http.server 8000
   # Abrir http://localhost:8000
   ```

### Funcionalidades

#### 1. **Navegación Básica**
- **Carga inicial**: Los Pokémon se cargan progresivamente
- **Explorar lista**: Scroll por las tarjetas de Pokémon
- **Ver detalle**: Click en cualquier Pokémon

#### 2. **Filtros y Búsqueda**
- **Generaciones**: Dropdown con opciones:
  - Todas las generaciones (1-9)
  - Generaciones Clásicas (1-4)
  - Generaciones Modernas (5-9)
  - Generaciones individuales
- **Búsqueda**: Input de texto para buscar por nombre o ID
- **Reset**: Botón para limpiar filtros

#### 3. **Sistema de Favoritos**
- **Agregar**: Click en la pokébola (❤️) en el detalle
- **Ver favoritos**: Click en el botón 💖 del header
- **Navegar**: Click en cualquier favorito
- **Quitar**: Click en ❌ en el panel de favoritos

#### 4. **Temas**
- **Cambiar tema**: Click en 🌙 (día) o ☀️ (noche)
- **Auto-persistencia**: El tema se recuerda

#### 5. **Navegación**
- **Evoluciones**: Click en cualquier evolución
- **Scroll al inicio**: Botón ⬆️ (aparece tras scroll)
- **Cerrar modales**: Botón ✕ o toque fuera (móvil)

### Responsive Usage

#### **Desktop:**
- Layout de dos columnas
- Panel lateral para información
- Favoritos en panel deslizante

#### **Móvil:**
- Lista completa
- Modales fullscreen para información
- Favoritos en modal completo

---

## 🎯 Cumplimiento de Requisitos

### ✅ **Estructura HTML y CSS BEM**
- **HTML semántico** con elementos apropiados
- **Metodología BEM** implementada correctamente
- **Clases coherentes** en todo el proyecto

### ✅ **Consumo de la API**
- **Fetch API** para llamadas asíncronas
- **Múltiples endpoints** de PokeAPI
- **Manejo de errores** robusto

### ✅ **Renderizado Dinámico**
- **Lista de Pokémon** generada dinámicamente
- **Detalle completo** con template literals
- **Evoluciones interactivas** navegables

### ✅ **Favoritos y Persistencia**
- **LocalStorage** para persistencia
- **Sistema completo** de agregar/quitar
- **Interfaz intuitiva** con iconos

### ✅ **Responsividad**
- **Mobile-first** design
- **Modales adaptativos** para móviles
- **Layout flexible** para desktop

---

## 📝 Conclusión

Este proyecto demuestra:

1. **Metodología profesional** con BEM
2. **Consumo efectivo** de APIs REST
3. **Renderizado dinámico** moderno
4. **Persistencia de datos** con LocalStorage
5. **Diseño responsive** mobile-first
6. **Código limpio** y mantenible

La aplicación es completamente funcional, responsive y sigue las mejores prácticas de desarrollo web moderno.

---

## 🌐 Enlaces Importantes

- **🚀 Demo en Vivo**: [https://primoquan.github.io/pokedex/](https://primoquan.github.io/pokedex/)
- **📁 Repositorio**: Código fuente del proyecto
- **📖 Documentación**: Este README completo

---

**🎮 ¡Disfruta explorando el mundo Pokémon!**

*Prueba la aplicación online o descarga el código para explorar la implementación.*