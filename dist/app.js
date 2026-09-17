const projects = [
  { title: 'My Helix Jump', platform: 'ANDROID / WEBGL', image: 'helix.jpg', description: 'My take on Helix Jump. Play in your browser or download the Android version.', links: [['Play in browser', 'https://simmer.io/@UriKatz/helixjump'], ['Download APK', 'https://drive.google.com/file/d/1dmj0knLUICKdGBRSvc4o52jV3TPIow0x/view?usp=sharing']] },
  { title: 'AR Space Battle', platform: 'ANDROID', image: 'space.png', description: 'Fire lasers and missiles at spaceships and planets all around you in augmented reality.', links: [['Download APK', 'https://drive.google.com/open?id=1qYa-cn10iKSALZ82jSWiPa-n61RrPZBZ']] },
  { title: 'The Village', platform: 'WINDOWS', image: 'village.jpg', description: 'A 3D action role-playing game.', links: [['Download for Windows', 'https://drive.google.com/file/d/1BpZJZmhI_1CZYpSwXCHlP8g4F3UwacyJ/view?usp=sharing']] },
  { title: 'FoxFox', platform: 'ANDROID', image: 'foxfox.jpg', description: 'Collect cherries and diamonds, avoid enemies, and chase a high score. Features Google Play leaderboards and achievements.', links: [['Google Play', 'https://play.google.com/store/apps/details?id=com.UMangoGames.FoxFox']] },
  { title: 'Bouncing Babies', platform: 'ANDROID / WEBGL', image: 'babies.png', description: 'Guide a two-person firefighting team to catch babies escaping a burning building and bounce them safely into an ambulance.', links: [['Play in browser', 'https://simmer.io/@UriKatz/bouncing-babies'], ['Download APK', 'https://drive.google.com/file/d/1t-R5iyqOfjdiioeRbQX_clnM60J4RIWC/view?usp=sharing']] },
  { title: 'Knight', platform: 'ANDROID', image: 'knight.jpg', description: 'Battle giant monsters and collect diamonds as a knight. Built with Unity Ads integration.', links: [['Google Play', 'https://play.google.com/store/apps/details?id=com.UMangoGames.Knight']] },
  { title: 'Online Ping Pong', platform: 'ANDROID', image: 'pingpong.png', description: 'A multiplayer ping pong game for Android, built using UNet and HLAPI.', links: [['Download APK', 'https://drive.google.com/open?id=1II6Zpuk2ZfrcHj13V68rOhwHLsArkmrJ']] }
];
const artworks = [
 ['Bicycle','bicycle.jpg'],['Tank','tank.jpg'],['Teddy bear','bear.jpg'],['Concept car','car.jpg'],['Coffee study','coffee.jpg'],['Compact car','mini.jpeg'],['Character sculpture','sculpture.gif'],['Pod racer','racer.jpg','racer.mp4'],['Glass animation','glass.jpg','glass.mp4'],['Fox animation','fox-animation.jpg','fox-animation.mp4'],['Fox','fox.jpg'],['Stone material','stones.jpg']
];
document.querySelector('#projects').innerHTML = projects.map((p,i) => `<article class="project"><div class="project-picture"><img src="assets/${p.image}" alt="${p.title} gameplay" loading="lazy"></div><div class="project-meta"><h3>${p.title}</h3><span class="platform">${p.platform}</span></div><p>${p.description}</p><div class="project-links">${p.links.map(([label,url])=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`).join('')}</div></article>`).join('');
document.querySelector('#artworks').innerHTML = artworks.map(([title,image,video],i)=>`<button class="art-card" data-art="${i}" aria-label="${video?'Play':'View'} ${title}"><span class="art-picture"><img src="assets/${image}" alt="${title}, 3D artwork by Uri Katz" loading="lazy">${video?'<span class="play" aria-hidden="true">▶</span>':''}</span><span class="art-caption">${title}<span aria-hidden="true">${video?'PLAY ↗':'↗'}</span></span></button>`).join('');
const viewer = document.querySelector('#viewer');
document.querySelector('#artworks').addEventListener('click', event => {
 const card = event.target.closest('[data-art]'); if(!card) return;
 const [title,image,video] = artworks[Number(card.dataset.art)];
 const media = document.createElement(video?'video':'img');
 media.src = `assets/${video||image}`;
 if(video){media.controls=true;media.playsInline=true;media.poster=`assets/${image}`;}else{media.alt=`${title}, 3D artwork by Uri Katz`;}
 document.querySelector('#viewer-content').replaceChildren(media);
 document.querySelector('#viewer-caption').textContent=title;
 viewer.showModal();
});
document.querySelector('.close-viewer').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',event=>{if(event.target===viewer){const r=viewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)viewer.close();}});
viewer.addEventListener('close',()=>document.querySelector('#viewer-content').replaceChildren());
document.querySelector('#year').textContent = new Date().getFullYear();
