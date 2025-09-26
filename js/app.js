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

const listContainer = document.querySelector('.pokemon-list');
const detailContainer = document.querySelector('.pokemon-detail');
const detailCloseBtn = document.querySelector('#detail-close');
const resetBtn = document.querySelector('#reset');
const searchInput = document.querySelector('#search');
const themeToggle = document.querySelector('#theme-toggle');
const favoritesBtn = document.querySelector('#favorites-btn');
const favoritesContainer = document.querySelector('.favorites-panel');
const favoritesCloseBtn = document.querySelector('#favorites-close');
const scrollToTopBtn = document.querySelector('#scroll-to-top');
const generationSelect = document.querySelector('#generation-select');

// --- Inicialización ---
document.addEventListener('DOMContentLoaded', async () => {
  // Menú generaciones: Todas + combinaciones + individuales
  generationSelect.innerHTML = '';
  
  // Opción por defecto más clara
  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = 'Todas las generaciones (1-9)';
  generationSelect.appendChild(allOption);

  // Grupos populares
  const classicOption = document.createElement('option');
  classicOption.value = 'classic';
  classicOption.textContent = 'Generaciones Clásicas (1-4)';
  generationSelect.appendChild(classicOption);

  const modernOption = document.createElement('option');
  modernOption.value = 'modern';
  modernOption.textContent = 'Generaciones Modernas (5-9)';
  generationSelect.appendChild(modernOption);

  // Separador visual
  const separatorOption = document.createElement('option');
  separatorOption.disabled = true;
  separatorOption.textContent = '──────────────────';
  generationSelect.appendChild(separatorOption);

  // Generaciones individuales
  generations.forEach((gen, idx) => {
    const option = document.createElement('option');
    option.value = idx;
    option.textContent = gen.name;
    generationSelect.appendChild(option);
  });

  // Mostrar indicador de carga
  listContainer.innerHTML = '<div class="loading-message">🔄 Cargando Pokémon de 9 generaciones...<br><small>Esto puede tomar unos momentos - son 1025 Pokémon!</small></div>';
  
  await loadAllGenerations();
  renderFavorites();
  renderPokemonList(filteredPokemons);
});

// --- Fetch Pokémon ---
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
      height: data.height, // en decímetros (API)
      weight: data.weight, // en hectogramos (API)
      stats: data.stats.map(s => ({ name: s.stat.name, value: s.base_stat })),
      speciesUrl: data.species.url
    };
  } catch (error) {
    console.warn(`❌ Error cargando Pokémon ${idOrName}:`, error.message);
    // Retornar un objeto por defecto para no romper la aplicación
    return {
      id: parseInt(idOrName) || 0,
      name: `pokemon-${idOrName}`,
      sprite: 'https://via.placeholder.com/96x96/cccccc/666666?text=?',
      types: ['unknown'],
      height: 0,
      weight: 0,
      stats: [],
      speciesUrl: `${POKE_API}pokemon-species/${idOrName}/`
    };
  }
}

// --- Cargar generaciones progresivamente ---
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

// --- Render lista ---
function renderPokemonList(pokemons) {
  listContainer.innerHTML = '';
  pokemons.forEach(pokemon => {
    const item = document.createElement('div');
    item.classList.add('pokemon-card');
    if (selectedPokemon && selectedPokemon.id === pokemon.id) item.classList.add('pokemon-card--selected');
    item.innerHTML = `
      <span class="pokemon-card__number">#${pokemon.id}</span>
      <img src="${pokemon.sprite}" class="pokemon-card__image">
      <span class="pokemon-card__name">${capitalize(pokemon.name)}</span>
    `;
    item.addEventListener('click', () => showPokemonDetail(pokemon));
    listContainer.appendChild(item);
  });
}

// --- Mostrar detalle ---
async function showPokemonDetail(pokemonOrId) {
  let pokemon;
  if (typeof pokemonOrId === 'number') {
    // Buscar primero en allPokemons, si no se encuentra, hacer fetch
    pokemon = allPokemons.find(p => p.id === pokemonOrId);
    if (!pokemon) {
      try {
        pokemon = await fetchPokemon(pokemonOrId);
      } catch (error) {
        console.error('Error fetching pokemon:', error);
        detailContainer.innerHTML = '<p>No se pudo cargar este Pokémon</p>';
        return;
      }
    }
  } else {
    pokemon = pokemonOrId;
  }
  if (!pokemon) return;
  selectedPokemon = pokemon;
  
  // En móvil, cerrar modal anterior si está abierto
  if (window.innerWidth <= 768) {
    detailContainer.classList.remove('pokemon-detail--open');
  }
  
  renderPokemonList(filteredPokemons);

  try {
    const speciesRes = await fetch(pokemon.speciesUrl);
    const speciesData = await speciesRes.json();

    let evolutionHtml = '';
    try {
      if (speciesData.evolution_chain) {
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();
        const evoChain = parseEvolutionChain(evoData.chain);
        evolutionHtml = await buildEvolutionHtml(evoChain);
      } else evolutionHtml = '<p>No tiene evoluciones</p>';
    } catch (e) { evolutionHtml = '<p>No tiene evoluciones</p>'; }

    // Crear HTML para tipos con iconos modernos
    const getTypeIconUrl = (type) => {
      // Mapeo de tipos a iconos desde una fuente confiable
      const typeIcons = {
        'normal': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/normal.svg',
        'fire': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/fire.svg',
        'water': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/water.svg',
        'electric': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/electric.svg',
        'grass': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/grass.svg',
        'ice': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/ice.svg',
        'fighting': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/fighting.svg',
        'poison': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/poison.svg',
        'ground': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/ground.svg',
        'flying': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/flying.svg',
        'psychic': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/psychic.svg',
        'bug': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/bug.svg',
        'rock': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/rock.svg',
        'ghost': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/ghost.svg',
        'dragon': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/dragon.svg',
        'dark': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/dark.svg',
        'steel': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/steel.svg',
        'fairy': 'https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons/icons/fairy.svg'
      };
      return typeIcons[type] || '';
    };
    
    const typesHtml = pokemon.types.map(type => 
      `<span class="pokemon-detail__type pokemon-detail__type--${type}">
         <img src="${getTypeIconUrl(type)}" 
              alt="${type}" class="pokemon-detail__type-icon" 
              onerror="this.style.display='none'">
         ${capitalize(type)}
       </span>`
    ).join('');
    
    // Convertir unidades (API devuelve en decímetros y hectogramos)
    const heightInMeters = (pokemon.height / 10).toFixed(1);
    const weightInKg = (pokemon.weight / 10).toFixed(1);
    
    const statsHtml = pokemon.stats.map(s => `<div class="pokemon-detail__stat">${s.name}: ${s.value}</div>`).join('');

    // Preservar el botón de cerrar si existe
    const closeBtn = detailContainer.querySelector('.pokemon-detail__close');
    
    // Agregar altura y peso a las estadísticas
    const physicalStats = `
      <div class="pokemon-detail__stat">Altura: ${heightInMeters} m</div>
      <div class="pokemon-detail__stat">Peso: ${weightInKg} kg</div>
    `;
    const allStatsHtml = physicalStats + statsHtml;
    
    detailContainer.innerHTML = `
      <div class="pokemon-detail__header">
        <div class="pokemon-detail__info">
          <span class="pokemon-detail__number">#${pokemon.id}</span>
          <h2 class="pokemon-detail__name">${capitalize(pokemon.name)}</h2>
          <div class="pokemon-detail__type-list">${typesHtml}</div>
        </div>
        <button onclick="toggleFavorite(${pokemon.id})" class="pokemon-detail__favorite-btn">
          ${favorites.includes(pokemon.id) ? 
            '<img src="images/pokeball.svg" alt="Quitar de favoritos" class="pokemon-detail__icon pokemon-detail__icon--filled">' : 
            '<img src="images/pokeball.svg" alt="Agregar a favoritos" class="pokemon-detail__icon">'}
        </button>
      </div>
      <img src="${pokemon.sprite}" class="pokemon-detail__image">
      <div class="pokemon-detail__stats"><h3>Estadísticas</h3>${allStatsHtml}</div>
      <div class="pokemon-detail__evolution"><h3>Evolución</h3>${evolutionHtml}</div>
      <div class="pokemon-detail__locations"><h3>Ubicaciones</h3>${await getLocations(pokemon.id)}</div>
    `;
    
    // Restaurar el botón de cerrar
    if (closeBtn) detailContainer.appendChild(closeBtn);

    // En móvil, mostrar como modal
    if (window.innerWidth <= 768) {
      // Pequeño delay para asegurar que el contenido se ha renderizado
      setTimeout(() => {
        detailContainer.classList.add('pokemon-detail--open');
      }, 100);
    } else {
      detailContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

  } catch (err) {
    console.error('Error mostrando Pokémon:', err);
    detailContainer.innerHTML = '<p>No se pudo cargar este Pokémon</p>';
  }
}

// --- Parse cadena de evolución ---
function parseEvolutionChain(chain) {
  const evoArray = [];
  function traverse(node) {
    evoArray.push({ name: node.species.name, url: node.species.url });
    if (node.evolves_to.length) node.evolves_to.forEach(traverse);
  }
  traverse(chain);
  return evoArray;
}

// --- Construir HTML evoluciones ---
async function buildEvolutionHtml(evoChain) {
  let html = '<div class="evolution-chain">';
  for (let i = 0; i < evoChain.length; i++) {
    const p = allPokemons.find(pk => pk.name === evoChain[i].name) || await fetchPokemon(evoChain[i].name);
    html += `<div class="evolution-chain__step" onclick="showPokemonDetail(${p.id})">
      <img src="${p.sprite}" alt="${p.name}" class="evolution-chain__image">
      <span class="evolution-chain__name">${capitalize(p.name)}</span>
    </div>`;
    if (i < evoChain.length - 1) html += '<span class="evolution-chain__arrow">→</span>';
  }
  html += '</div>';
  return html;
}

// --- Ubicaciones ---
async function getLocations(id) {
  try {
    const res = await fetch(`${POKE_API}pokemon/${id}/encounters`);
    const data = await res.json();
    if (data.length) return '<ul>' + data.map(l => `<li>${l.location_area.name.replace('-', ' ')}</li>`).join('') + '</ul>';
    return '<p>No encontrado en rutas</p>';
  } catch (e) { return '<p>No encontrado en rutas</p>'; }
}

// --- Filtro por generación ---
generationSelect.addEventListener('change', () => {
  const selectedGen = generationSelect.value;
  
  if (selectedGen === 'all') {
    filteredPokemons = [...allPokemons];
  } else if (selectedGen === 'classic') {
    // Generaciones clásicas 1-4 (IDs 1-493)
    filteredPokemons = allPokemons.filter(p => p.id >= 1 && p.id <= 493);
  } else if (selectedGen === 'modern') {
    // Generaciones modernas 5-9 (IDs 494-1025)
    filteredPokemons = allPokemons.filter(p => p.id >= 494 && p.id <= 1025);
  } else {
    const gen = generations[selectedGen];
    filteredPokemons = allPokemons.filter(p => p.id >= gen.start && p.id <= gen.end);
  }
  
  renderPokemonList(filteredPokemons);
});

// --- Buscar Pokémon ---
searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase().trim();
  
  if (!term) {
    // Si no hay término de búsqueda, mostrar todos los Pokémon
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

// --- Reset ---
resetBtn.addEventListener('click', () => {
  selectedPokemon = null;
  filteredPokemons = [...allPokemons];
  generationSelect.value = 'all';
  searchInput.value = '';
  renderPokemonList(filteredPokemons);
  detailContainer.innerHTML = '<button class="pokemon-detail__close" id="detail-close">✕</button>';
  detailContainer.classList.remove('pokemon-detail--open');
  console.log(`🔄 Reset completado - Mostrando todos los ${allPokemons.length} Pokémon`);
});

// --- Tema ---
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  document.body.classList.toggle('dark');
  
  // Cambiar emoji del botón según el tema
  if (document.body.classList.contains('light')) {
    themeToggle.textContent = '🌙';
  } else {
    themeToggle.textContent = '☀️';
  }
});

// --- Favoritos ---
favoritesBtn.addEventListener('click', () => { 
  favoritesContainer.classList.toggle('favorites-panel--open'); 
});

// Cerrar panel de favoritos (especialmente útil en móviles)
favoritesCloseBtn.addEventListener('click', () => {
  favoritesContainer.classList.remove('favorites-panel--open');
});

// Cerrar al hacer clic fuera del panel en móviles
favoritesContainer.addEventListener('click', (e) => {
  if (e.target === favoritesContainer) {
    favoritesContainer.classList.remove('favorites-panel--open');
  }
});

function toggleFavorite(id) {
  if (favorites.includes(id)) favorites = favorites.filter(f => f !== id);
  else favorites.push(id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderFavorites();
  showPokemonDetail(selectedPokemon);
}

function renderFavorites() {
  // Limpiar contenido pero mantener el botón de cerrar
  const closeBtn = favoritesContainer.querySelector('.favorites-panel__close');
  favoritesContainer.innerHTML = '';
  if (closeBtn) favoritesContainer.appendChild(closeBtn);
  
  favorites.forEach(async id => {
    let p = allPokemons.find(pk => pk.id === id);
    // Si no se encuentra en allPokemons, hacer fetch (por si es un favorito de otra generación)
    if (!p) {
      try {
        p = await fetchPokemon(id);
      } catch (error) {
        console.error('Error loading favorite pokemon:', error);
        return;
      }
    }
    const div = document.createElement('div');
    div.classList.add('favorites-panel__item');
    div.innerHTML = `
      <span class="favorites-panel__name" onclick="showPokemonDetail(${p.id}); closeFavoritesOnMobile();" style="cursor:pointer">${capitalize(p.name)}</span>
      <button onclick="toggleFavorite(${p.id})" class="favorites-panel__button">❌</button>`;
    favoritesContainer.appendChild(div);
  });
}

// --- Helpers ---
function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

// Cerrar favoritos en móvil al seleccionar Pokémon
function closeFavoritesOnMobile() {
  if (window.innerWidth <= 768) {
    favoritesContainer.classList.remove('favorites-panel--open');
  }
}

// --- Botón cerrar detalle en móvil ---
document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('pokemon-detail__close')) {
    detailContainer.classList.remove('pokemon-detail--open');
  }
});

// Cerrar detalle al hacer clic fuera en móviles
detailContainer.addEventListener('click', (e) => {
  if (e.target === detailContainer && window.innerWidth <= 768) {
    detailContainer.classList.remove('pokemon-detail--open');
  }
});

// --- Scroll to top functionality ---
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('scroll-to-top--visible');
  } else {
    scrollToTopBtn.classList.remove('scroll-to-top--visible');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Manejar resize de ventana
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    // En desktop, cerrar modales móviles
    detailContainer.classList.remove('pokemon-detail--open');
    favoritesContainer.classList.remove('favorites-panel--open');
  }
});
