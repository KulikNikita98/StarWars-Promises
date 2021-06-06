

  export function  renderLists(data, name) {

    return new Promise(resolve => {
      const wrapper = document.createElement('div')
      wrapper.style.width = '45%';
      const title = document.createElement('h2');
      title.textContent = name;
      const list  = document.createElement('ul');
      list.classList.add('list-group');
      wrapper.append(title);
      wrapper.append(list);
      for (const element of data) {
        fetch(element).then(res => res.json()).then( el=> {
          const item = document.createElement('li')
          item.classList.add('list-group-item')
          item.textContent = el.name
          list.append(item)
          resolve(wrapper)
           })
      }

      })
  }

export async  function render(data) {

  const container = document.createElement('div')

  container.classList.add('container','py-4', 'd-flex', 'flex-column')

  const backToEpisodes = document.createElement('a');
  const title = document.createElement('h1');
  const descr = document.createElement('p')
  const wrapper = document.createElement('div');

  wrapper.classList.add('d-flex', 'justify-content-between', 'flex-wrap');


  const planetWrapper = await  renderLists(data.planets, 'Планеты')
  const specieWrapper =  await renderLists(data.species, 'Расы')
  const starshiptWrapper= await renderLists(data.starships, 'Звёздные корабли')


  title.textContent =`Эпизод: ${data.episode_id}, ${data.title}`;
  title.classList.add('mb-5')


  descr.textContent = data.opening_crawl;
  descr.classList.add('mb-3')
  descr.style.maxWidth = '80%';



  backToEpisodes.classList.add('btn', 'btn-dark', 'mb-2');
  backToEpisodes.style.maxWidth = '20%';
  backToEpisodes.href = '/index.html';
  backToEpisodes.textContent = 'Ко всем эпизодам';

  backToEpisodes.addEventListener('click', function(e) {
    e.preventDefault()
    history.pushState(null, '', `${this.href}`)
    const container = document.getElementById('app')
    Promise.all([import('/js/episodes-list.js'),
    fetch('https://swapi.dev/api/films').then(res => res.json())
    ]).then(([modulePage, data]) => {
      container.innerHTML = '';
      return (modulePage.render(data))
    }).then(res => container.append(res))


  })



  wrapper.append(planetWrapper);
  wrapper.append(specieWrapper);
  wrapper.append(starshiptWrapper);

  container.append(backToEpisodes)
  container.append(title)
  container.append(descr)
  container.append(wrapper)

  return container;


}



