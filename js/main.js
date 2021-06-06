
const CSSPromise = {}

function loadSRC(src) {
  if (src.endsWith('.js')) {
    return import(src);
  }


  if (src.endsWith('.css')) {
    if (!(CSSPromise['src'])) {
      const link = document.createElement('link');
      link.href = src;
      link.rel = 'stylesheet';
      document.head.append(link)
      CSSPromise['src'] = new Promise(resolve => {
        link.addEventListener('load', () => {
          resolve();
        })
      })

    }
    return CSSPromise['src'];
  }
  return fetch(src).then(result => result.json())
}

const container = document.getElementById('app')


const searchParams = new URLSearchParams(location.search);
let searchID = searchParams.get('epsiodeId')

switch (+searchID) {
  case 1:
    searchID = 4;
    break;
  case 2:
    searchID = 5;
    break;

  case 3:
    searchID = 6;
    break;

  case 4:
    searchID = 1;
    break;

  case 5:
    searchID = 2;
    break;

  case 6:
    searchID = 3;
    break;
  default:
    break;
}

export function renderData(module, apiURL, CSS) {
  Promise.all([module, apiURL, CSS].map(el => loadSRC(el))).then(([modulePage, data]) => {
    container.innerHTML = '';
    return modulePage.render(data);
  }).then(list => (container.append(list)))

}

window.addEventListener('popstate', (e) => {
  e.preventDefault()

  if (e.state) {
    renderData('/js/chosen-episode.js',
      `https://swapi.dev/api/films/${e.state.episodeId}`,
      'https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css')
  } else {
    renderData('/js/episodes-list.js',
      `https://swapi.dev/api/films`,
      'https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css')
  }

})


if (searchID) {
  renderData('/js/chosen-episode.js',
    `https://swapi.dev/api/films/${searchID}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css')
} else {
  renderData('/js/episodes-list.js',
    `https://swapi.dev/api/films`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css')
}
