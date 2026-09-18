// Swept-height collection also handles fast travel and reduced-motion jumps.
export function crossesCoin(from, to, height) {
  return height >= Math.min(from, to) && height <= Math.max(from, to);
}

export function createCoinTrail(T, scene, islandCount, step, reduced) {
  const hud = document.getElementById('coin-quest');
  const count = document.getElementById('coin-count');
  const fill = document.getElementById('coin-fill');
  const message = document.getElementById('coin-message');
  const replay = document.getElementById('coin-replay');
  const gold = new T.MeshStandardMaterial({color:0xffcb45, metalness:.65, roughness:.28, emissive:0xb56808, emissiveIntensity:.3});
  const rim = new T.MeshStandardMaterial({color:0xffef9d, metalness:.5, roughness:.25});
  const discGeometry = new T.CylinderGeometry(.23,.23,.085,24);
  const rimGeometry = new T.TorusGeometry(.185,.022,6,24);
  const coins = [];
  let collected = 0, previousHeight = 0, returning = false;
  const total = (islandCount - 1) * 3;
  document.getElementById('coin-total').textContent = `/ ${total}`;

  for (let island=0; island<islandCount-1; island++) {
    for (let rung=1; rung<=3; rung++) {
      const height = island*step + rung*step/4;
      const root = new T.Group();
      root.position.set(0,height+.9,1.8);
      const disc = new T.Mesh(discGeometry,gold);
      disc.rotation.x = Math.PI/2;
      root.add(disc);
      for (const side of [-1,1]) {
        const edge = new T.Mesh(rimGeometry,rim);
        edge.position.z = side*.049;
        root.add(edge);
        const stamp = new T.Mesh(new T.OctahedronGeometry(.095),rim);
        stamp.scale.z = .22;
        stamp.position.z = side*.05;
        root.add(stamp);
      }
      // Use the fox's foreground pass so the island boards cannot cover coins.
      root.traverse(object => object.layers.set(1));
      scene.add(root);
      coins.push({root,height,collected:false});
    }
  }

  // Reusable particles: no geometry or materials allocated during animation.
  const particleGeometry = new T.OctahedronGeometry(.055);
  const particles = Array.from({length:60}, () => {
    const material = new T.MeshBasicMaterial({color:0xffd76b,transparent:true});
    const mesh = new T.Mesh(particleGeometry,material);
    mesh.layers.set(1); mesh.visible=false; scene.add(mesh);
    return {mesh,velocity:new T.Vector3(),life:0,duration:1};
  });
  let nextParticle=0;
  function burst(position, victory=false) {
    if(reduced.matches) return;
    for(let i=0;i<(victory?48:10);i++) {
      const p=particles[nextParticle++ % particles.length];
      const angle=i*2.39996;
      p.duration=p.life=victory?1.9:.65;
      p.mesh.position.copy(position);
      p.velocity.set(Math.cos(angle)*(victory?2.4:1),1.2+(i%5)*.3,Math.sin(angle)*(victory?2:1));
      p.mesh.material.color.setHex(victory && i%3===0 ? 0xf88750 : 0xffd76b);
      p.mesh.visible=true;
    }
  }
  function paintScore() {
    count.textContent=String(collected);
    fill.style.width=`${total ? collected/total*100 : 0}%`;
    hud.classList.toggle('complete',collected===total);
  }
  hud.hidden=false;
  paintScore();

  return {
    restart() {
      returning=true;
      collected=0;
      coins.forEach(coin=>{coin.collected=false;coin.root.visible=false;});
      particles.forEach(p=>{p.life=0;p.mesh.visible=false;});
      replay.hidden=true;
      message.textContent='Back to the first island…';
      paintScore();
    },
    update(height,dt,time) {
      if(returning && Math.abs(height)<.002) {
        returning=false;
        previousHeight=0;
        message.textContent='A fresh trail. Collect them all!';
      }
      let pickups=0;
      for (const coin of coins) {
        if(!returning && !coin.collected && crossesCoin(previousHeight,height,coin.height)) {
          coin.collected=true;
          collected++;
          pickups++;
          burst(coin.root.position);
        }
        coin.root.visible=!returning && !coin.collected && Math.abs(coin.height-height)<12;
        if(coin.root.visible) {
          coin.root.rotation.y=reduced.matches?.6:time*.002+coin.height;
          coin.root.position.y=coin.height+.9+(reduced.matches?0:Math.sin(time*.003+coin.height)*.07);
        }
      }
      previousHeight=height;
      if(pickups) {
        paintScore();
        message.textContent=collected===total ? 'Trail complete! You found every coin.' : `${collected} collected · ${total-collected} to find`;
        if(collected===total) {
          replay.hidden=false;
          burst(new T.Vector3(0,height+1.5,1.8),true);
        }
      }
      for(const p of particles) {
        if(p.life<=0) continue;
        p.life=Math.max(0,p.life-dt);
        p.mesh.visible=p.life>0 && !reduced.matches;
        p.velocity.y-=dt*2.8;
        p.mesh.position.addScaledVector(p.velocity,dt);
        p.mesh.material.opacity=p.life/p.duration;
        p.mesh.scale.setScalar(.5+p.life/p.duration);
      }
    }
  };
}
