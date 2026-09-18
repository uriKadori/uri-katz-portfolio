// Original procedural models: a miniature, hand-crafted woodland diorama.
export function createAssets(T) {
  const materials = new Map(), geometries = new Map();
  const mat = (color, smooth=false) => {
    const key=`${color}/${smooth}`;
    if(!materials.has(key))materials.set(key,new T.MeshStandardMaterial({color,roughness:.82,flatShading:!smooth}));
    return materials.get(key);
  };
  function shape(geometry,color,p,x=0,y=0,z=0,smooth=false){const m=new T.Mesh(geometry,mat(color,smooth));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;p.add(m);return m;}
  const ico = new T.IcosahedronGeometry(1,1);
  function pebble(p,color,x,y,z,sx,sy,sz){const m=shape(ico,color,p,x,y,z,true);m.scale.set(sx,sy,sz);return m;}
  function beam(p,color,x,y,z,w,h,d,r=.04){
    const key=[w,h,d,r].join('/');
    if(!geometries.has(key)){
      const s=new T.Shape(),a=-w/2,b=-h/2;
      s.moveTo(a+r,b);s.lineTo(a+w-r,b);s.quadraticCurveTo(a+w,b,a+w,b+r);s.lineTo(a+w,b+h-r);s.quadraticCurveTo(a+w,b+h,a+w-r,b+h);s.lineTo(a+r,b+h);s.quadraticCurveTo(a,b+h,a,b+h-r);s.lineTo(a,b+r);s.quadraticCurveTo(a,b,a+r,b);
      const g=new T.ExtrudeGeometry(s,{depth:d-2*r,bevelEnabled:true,bevelThickness:r,bevelSize:r*.45,bevelSegments:2,steps:1,curveSegments:3});g.translate(0,0,-d/2+r);g.computeVertexNormals();geometries.set(key,g);
    }
    return shape(geometries.get(key),color,p,x,y,z,true);
  }
  function rod(p,color,a,b,r=.05){const dir=new T.Vector3(...b).sub(new T.Vector3(...a));const m=shape(new T.CylinderGeometry(r*.8,r,dir.length(),7),color,p);m.position.copy(new T.Vector3(...a).addScaledVector(dir,.5));m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),dir.normalize());return m;}
  const random=n=>{const v=Math.sin(n*93.27+13.4)*43758.54;return v-Math.floor(v);};
  function pine(p,x,z,size,snow=false){
    const g=new T.Group();g.position.set(x,0,z);g.scale.setScalar(size);p.add(g);
    rod(g,0x70543b,[0,0,0],[.08,2.8,0],.13);
    for(let i=0;i<5;i++){
      const canopy=shape(new T.ConeGeometry(.83-i*.13,1.15,9),[0x315b4e,0x3d6d57,0x4f8062,0x64916a,0x7ba277][i],g,.035*i,.9+i*.43,0);
      canopy.rotation.y=i*.65;
      if(snow){const cap=shape(new T.ConeGeometry((.83-i*.13)*.8,.75,9),0xe5eef0,g,.035*i,1.13+i*.43,0);cap.rotation.y=i*.65;}
    }
    for(let i=0;i<4;i++)rod(g,0x76563b,[0,.1,0],[Math.cos(i*1.57)*.3,.03,Math.sin(i*1.57)*.3],.07);
  }
  function broadleaf(p,x,z,size,autumn=false){
    const g=new T.Group();g.position.set(x,0,z);g.scale.setScalar(size);p.add(g);
    rod(g,0x75513c,[0,0,0],[.12,1.7,0],.14);
    for(let i=0;i<5;i++){
      const a=i*2.4,dx=Math.cos(a)*.55,dz=Math.sin(a)*.5;
      rod(g,0x75513c,[.05,.8,0],[dx,1.7,dz],.06);
      pebble(g,(autumn?[0xb56b38,0xcc8744,0xe4a856]:[0x497455,0x638a58,0x86a66a])[i%3],dx,1.8+random(i)*.6,dz,.66,.75,.62);
    }
  }
  function island(p,cx,index,color){
    const snowy=index===1,autumn=index===3,space=index===5;
    const n=18, positions=[],colors=[];
    const ring=(radius,y)=>Array.from({length:n},(_,j)=>{const a=j/n*Math.PI*2,r=radius*(.88+random(j+index*19)*.2);return [cx+Math.cos(a)*r,y,Math.sin(a)*r*.78];});
    const rings=[ring(2.45,-.06),ring(2.5,-.28),ring(2.04,-.78),ring(1.6,-1.3),ring(.6,-1.9)];
    const layers=[snowy?0xdce8e8:color,0x79654e,0x68736b,0x505e59];
    function triangle(a,b,c,color){const col=new T.Color(color);positions.push(...a,...b,...c);for(let k=0;k<3;k++)colors.push(col.r,col.g,col.b);}
    for(let j=0;j<n;j++)triangle([cx,-.04,0],rings[0][(j+1)%n],rings[0][j],snowy?0xe6eded:color);
    for(let layer=0;layer<4;layer++)for(let j=0;j<n;j++){
      const c=new T.Color(layers[layer]).multiplyScalar(.82+random(j+layer*31)*.3);
      const k=(j+1)%n;triangle(rings[layer][j],rings[layer][k],rings[layer+1][j],c);triangle(rings[layer][k],rings[layer+1][k],rings[layer+1][j],c);
    }
    for(let j=0;j<n;j++)triangle(rings[4][j],rings[4][(j+1)%n],[cx+.25,-2.35,0],0x4a5754);
    const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.setAttribute('color',new T.Float32BufferAttribute(colors,3));geometry.computeVertexNormals();
    const terrain=new T.Mesh(geometry,new T.MeshStandardMaterial({vertexColors:true,roughness:1,flatShading:true,side:T.DoubleSide}));terrain.castShadow=true;terrain.receiveShadow=true;p.add(terrain);
    const side=Math.sign(cx);
    if(autumn)broadleaf(p,cx+side*1.7,-.8,.85,true);else pine(p,cx+side*1.7,-.8,.9,snowy);
    pine(p,cx-side*.5,-1,.48,snowy);
    for(let j=0;j<6;j++){const stone=beam(p,snowy?0xbecdd0:0xc2bba0,side*(.38+j*.32),.035,.95,.37,.08,.63,.035);stone.rotation.y=Math.sin(j)*.12;}
    for(let j=0;j<25;j++){
      const angle=j*2.399,r=1.3+random(j+index)*.65,x=cx+Math.cos(angle)*r,z=Math.sin(angle)*r*.72;
      if(z>.65&&Math.abs(x)<2.5)continue;
      if(j%5===0){pebble(p,snowy?0xb9cbd0:0x899387,x,.04,z,.2,.14,.17);continue;}
      if(!snowy)for(let k=0;k<3;k++){const blade=shape(new T.ConeGeometry(.035,.18+random(j+k)*.15,3),autumn?0xa89656:0x62845a,p,x+k*.045,.1,z);blade.rotation.z=(k-1)*.3;blade.castShadow=false;}
      if(j%4===0&&!snowy){rod(p,0xe3d6b8,[x,.03,z],[x,.22,z],.033);const cap=shape(new T.SphereGeometry(.11,8,5,0,Math.PI*2,0,Math.PI/2),autumn?0xc77a49:0xc9916c,p,x,.23,z);cap.scale.y=.55;}
    }
    // Clinging moss, hanging roots, and small mineral outcrops break up the silhouette.
    for(let j=0;j<6;j++){
      const a=j*.93,x=cx+Math.cos(a)*2.13,z=Math.sin(a)*1.66;
      if(!snowy){const curve=new T.CatmullRomCurve3([new T.Vector3(x,-.18,z),new T.Vector3(x*.98,-.55,z),new T.Vector3(x+.12,-1-random(j)*.35,z-.1)]);shape(new T.TubeGeometry(curve,8,.025,4,false),0x626949,p);for(let k=0;k<3;k++)pebble(p,0x708462,x+.05,-.28-k*.2,z,.1,.055,.12);}
      if(j%2===0){const crystal=shape(new T.ConeGeometry(.12,.5,5),space?0x93b7d9:0x9ba999,p,cx+Math.cos(a)*1.7,.2,Math.sin(a)*1.1);crystal.rotation.z=.25;}
    }
  }
  function ladder(p,height){
    for(const x of [-.4,.4]){
      beam(p,0x98734e,x,height/2,.91,.14,height,.16,.025);
      for(let y=.5;y<height;y+=1.2){beam(p,0x5e5746,x,y,.91,.17,.09,.19,.02);rod(p,0xb89969,[x-.03,y-.1,1.005],[x+.025,y+.12,1.005],.013);}
    }
    for(let j=1;j<=14;j++){
      const y=j*height/14;beam(p,0xc3a075,0,y,.96,.94,.115,.2,.035);
      for(const x of [-.4,.4])pebble(p,0x544936,x,y,1.077,.024,.024,.012);
    }
  }
  function lantern(p,x,z){
    rod(p,0x62543e,[x,0,z],[x,1.18,z],.048);rod(p,0x62543e,[x,1.18,z],[x-.2,1.18,z],.04);
    const bulb=beam(p,0xffcc77,x-.2,.86,z,.24,.32,.24,.025);bulb.material=new T.MeshStandardMaterial({color:0xffdc9d,emissive:0xffa63e,emissiveIntensity:1.4,roughness:.4});
    for(const dx of [-.13,.13])for(const dz of [-.13,.13])rod(p,0x514b3b,[x-.2+dx,.66,z+dz],[x-.2+dx,1.05,z+dz],.02);
    shape(new T.ConeGeometry(.24,.17,4),0x546054,p,x-.2,1.1,z).rotation.y=Math.PI/4;
    beam(p,0x514b3b,x-.2,.66,z,.32,.055,.32,.02);
  }
  function fox(parent){
    const root=new T.Group();parent.add(root);root.scale.setScalar(1.15);
    const body=new T.Group();root.add(body);const orange=0xd77836,cream=0xffe8c3,dark=0x372d2b;
    pebble(body,orange,0,.62,0,.29,.46,.24);
    pebble(body,cream,0,.64,.19,.21,.32,.09);
    const head=new T.Group();head.position.set(0,1.17,.035);body.add(head);
    pebble(head,orange,0,0,0,.4,.34,.3);
    for(const side of [-1,1]){
      const ear=shape(new T.ConeGeometry(.18,.46,4),orange,head,side*.25,.32,-.025);ear.rotation.z=-side*.2;ear.rotation.y=Math.PI/4;
      const inner=shape(new T.ConeGeometry(.095,.29,3),0x573c35,head,side*.25,.35,.068);inner.rotation.z=-side*.2;
      const cheek=pebble(head,cream,side*.19,-.09,.16,.23,.16,.18);cheek.rotation.z=side*.25;
      pebble(head,dark,side*.17,.04,.272,.052,.067,.028);
      pebble(head,0xffffff,side*.17-.012,.064,.296,.014,.018,.009);
      const brow=pebble(head,0x8e472a,side*.18,.145,.245,.077,.024,.022);brow.rotation.z=side*.15;
    }
    pebble(head,cream,0,-.105,.31,.16,.1,.2);pebble(head,dark,0,-.075,.48,.066,.046,.043);
    rod(head,0x725045,[0,-.12,.476],[0,-.16,.44],.01);
    // A little teal scarf makes the fox readable against orange and green scenery.
    const scarf=shape(new T.TorusGeometry(.205,.065,6,16),0x357d7c,body,0,.91,0);scarf.rotation.x=Math.PI/2;
    const ribbon=beam(body,0x357d7c,.21,.74,.19,.12,.32,.055,.015);ribbon.rotation.z=.3;
    const paws=[];
    const down=new T.Vector3(0,1,0);
    for(const side of [-1,1])for(const upper of [false,true]){
      const shoulder=new T.Vector3(side*(upper?.27:.17),upper?.82:.34,0);
      const first=pebble(body,orange,0,0,0,.09,1,.09);
      const second=pebble(body,upper?orange:0xa65730,0,0,0,.08,1,.08);
      const joint=pebble(body,orange,0,0,0,.095,.095,.095);
      const paw=pebble(body,dark,0,0,0,.1,.08,upper?.105:.14);
      const rest=new T.Vector3(shoulder.x,upper?.49:.04,.07);
      const length=upper?.34:.30;
      function segment(part,a,b){const delta=b.clone().sub(a);part.position.copy(a).add(b).multiplyScalar(.5);part.scale.y=delta.length()*.55;part.quaternion.setFromUnitVectors(down,delta.normalize());}
      function pose(target,grip=0){
        const reach=(upper?.21:.18)*(1-grip)+length*grip;
        const direction=target.clone().sub(shoulder),distance=Math.min(direction.length(),reach*2-.001);direction.normalize();
        const endpoint=shoulder.clone().addScaledVector(direction,distance);
        const bend=new T.Vector3(side*.5,0,upper?-.9:.9);bend.addScaledVector(direction,-bend.dot(direction)).normalize();
        const elbow=shoulder.clone().addScaledVector(direction,distance*.5).addScaledVector(bend,Math.sqrt(reach*reach-distance*distance*.25));
        segment(first,shoulder,elbow);segment(second,elbow,endpoint);joint.position.copy(elbow);paw.position.copy(endpoint);paw.rotation.x=-grip*.35;
      }
      pose(rest);paws.push({side,upper,rest,pose,tip:paw});
    }
    const tail=new T.Group();tail.position.set(.14,.36,-.13);body.add(tail);tail.rotation.z=-.85;
    const curve=new T.CatmullRomCurve3([new T.Vector3(0,0,0),new T.Vector3(.05,.3,-.15),new T.Vector3(.03,.7,-.2),new T.Vector3(-.12,1.1,-.12)]);
    const rings=18,segments=10,positions=[],cols=[],idx=[];
    for(let i=0;i<=rings;i++){const t=i/rings,c=curve.getPoint(t),r=.035+Math.sin(Math.PI*t)*.235,col=new T.Color(t>.69?cream:orange);for(let j=0;j<=segments;j++){const a=j/segments*Math.PI*2;positions.push(c.x+Math.cos(a)*r,c.y,c.z+Math.sin(a)*r);cols.push(col.r,col.g,col.b);if(i<rings&&j<segments){const n=i*(segments+1)+j;idx.push(n,n+1,n+segments+1,n+1,n+segments+2,n+segments+1);}}}
    const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.setAttribute('color',new T.Float32BufferAttribute(cols,3));geo.setIndex(idx);geo.computeVertexNormals();const fur=new T.Mesh(geo,new T.MeshStandardMaterial({vertexColors:true,roughness:.9}));fur.castShadow=true;tail.add(fur);
    return {root,body,head,tail,paws,ribbon};
  }
  return {island,ladder,lantern,fox};
}
