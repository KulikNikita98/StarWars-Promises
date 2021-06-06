export function render(data) {
  const container = document.createElement('div');
  container.classList.add('container', 'd-flex', 'justify-content-between', 'py-4', 'flex-wrap')

  for (const episode of data.results) {
    const episodeCard = document.createElement('div');
    const image = document.createElement('img');
    const episodeBody = document.createElement('div');
    const title = document.createElement('h5');
    const desc = document.createElement('p');
    const director = document.createElement('small')
    const info = document.createElement('small')
    const btnLink = document.createElement('a');

    episodeCard.classList.add('card')
    episodeCard.style.width = '30%';
    image.classList.add('card-img-top')
    episodeBody.classList.add('card-body')
    title.classList.add('card-title')
    desc.classList.add('card-text');
    director.classList.add('card-text', 'mb-2');
    director.style.display = 'block';
    info.classList.add('card-text', 'mb-2');
    info.style.display = 'block';
    btnLink.classList.add('btn', 'btn-primary')

    if (episode.episode_id > 3) {
      episodeCard.classList.add('mb-3')
    }

    switch (episode.episode_id) {
      case 1:
        image.src = '/img/first_episode.webp';
        break;
      case 2:
        image.src = '/img/second_episode.webp';
        break;
      case 3:
        image.src = '/img/third_episode.webp';
        break;
      case 4:
        image.src = '/img/fourth_episode.webp';
        break;
      case 5:
        image.src = '/img/fifth_episode.webp';
        break;
      case 6:
        image.src = '/img/sixth_episode.webp';
        break;

      default:
        break;
    }



    image.alt = episode.title;
    title.textContent = `Эпизод ${episode.episode_id}: ${episode.title}`;
    desc.textContent = episode.opening_crawl;
    director.textContent = `Режиссер: ${episode.director}`;
    info.textContent = `Дата выхода: ${episode.release_date} `;
    btnLink.textContent = 'Подробнее об эпизоде';
    btnLink.href = `?epsiodeId=${episode.episode_id}`;
    const state = {
      episodeId: episode.episode_id,
    }
    btnLink.addEventListener('click', (e) => {
      e.preventDefault()
      history.pushState(state, '', `?epsiodeId=${episode.episode_id}`)
      const container = document.getElementById('app')
      Promise.all([import('/js/chosen-episode.js'),
      fetch(episode.url).then(res => res.json())
      ]).then(([modulePage, data]) => {
        container.innerHTML = '';
        return (modulePage.render(data))
      }).then(res => container.append(res))

    })


    episodeCard.append(image);
    episodeCard.append(episodeBody);
    episodeBody.append(title);
    episodeBody.append(desc);
    episodeBody.append(director);
    episodeBody.append(info);
    episodeBody.append(btnLink);

    container.append(episodeCard);
  }
  return container;
}



