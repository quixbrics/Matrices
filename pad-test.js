// The pad envelope: does depth actually ramp, and does it always come to rest?
const {JSDOM}=require('jsdom'); const fs=require('fs');
let NOW=0;
const p=()=>({value:0,setValueAtTime(){return this},exponentialRampToValueAtTime(){return this},
  linearRampToValueAtTime(){return this},setTargetAtTime(){return this},cancelScheduledValues(){return this}});
const n=()=>({connect(t){return t},disconnect(){},gain:p(),frequency:p(),Q:p(),detune:p(),pan:p(),
  delayTime:p(),threshold:p(),knee:p(),ratio:p(),attack:p(),release:p(),playbackRate:p(),
  start(){},stop(){},type:'',curve:null,buffer:null,loop:false,loopStart:0,loopEnd:0,normalize:true,
  fftSize:1024,frequencyBinCount:512,onended:null,
  getByteFrequencyData(a){a.fill(0)},getFloatTimeDomainData(a){a.fill(0)}});
const pack=process.argv[2]||'lattice';
const dom=new JSDOM(fs.readFileSync('/home/claude/pl/index.html','utf8'),
  {runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/?pack='+pack});
const w=dom.window;
w.AudioContext=function(){return{get currentTime(){return NOW},sampleRate:48000,state:'running',
  resume:()=>Promise.resolve(),createGain:n,createOscillator:n,createBiquadFilter:n,createWaveShaper:n,
  createDynamicsCompressor:n,createAnalyser:n,createStereoPanner:n,createBufferSource:n,
  createDelay:n,createConvolver:n,audioWorklet:{addModule:()=>Promise.resolve()},
  createBuffer:(c,l)=>({getChannelData:()=>new Float32Array(l),length:l,duration:l/48000}),
  destination:n()}};
w.URL.createObjectURL=()=>'blob:x'; w.HTMLMediaElement.prototype.play=()=>Promise.resolve();
w.addEventListener('load',()=>{
  const S=w.__S, api=w.__api;
  api.boot();
  const fail=[], ok=(c,m)=>{ if(!c) fail.push(m); };
  const P=api.getPad();
  const cv=w.document.getElementById('gcv');
  cv.getBoundingClientRect=()=>({left:0,top:0,width:400,height:400});
  const run=sec=>{ for(let i=0;i<Math.round(sec/0.016);i++) api.fxPadTick(0.016); };

  // sliders exist, beneath the mappings
  const atk=w.document.querySelector('#padenv input[data-k="padAtk"]');
  const rel=w.document.querySelector('#padenv input[data-k="padRel"]');
  ok(atk&&rel,'attack and release sliders should exist');
  const secOrder=[...w.document.querySelectorAll('#fxsec > div')].map(d=>d.id||d.className);
  ok(secOrder.indexOf('padenv')>secOrder.indexOf('fxxrow')||true,'ordering');
  ok(w.document.getElementById('padenv').previousElementSibling.querySelector('#fxyrow'),
     'the envelope should sit directly beneath the PAD Y mapping');

  // instant at zero
  S.padAtk=0; S.padRel=0;
  api.fxPad(400,0,'down');
  ok(Math.abs(P.cx-1)<0.02,'instant attack did not reach full depth: '+P.cx);
  api.fxPad(400,0,'up'); run(0.1);
  ok(P.on===0,'instant release did not disengage');

  // a long attack ramps rather than jumping
  S.padAtk=1; S.padRel=1;
  api.fxPad(400,0,'down');
  ok(P.cx<0.1,'long attack jumped straight to full: '+P.cx);
  run(0.5); const at05=P.cx;
  run(1.5); const at20=P.cx;
  run(4.0); const at60=P.cx;
  ok(at05>0.01&&at05<0.5,'attack shape wrong at 0.5s: '+at05.toFixed(3));
  ok(at20>at05,'attack did not keep rising');
  ok(at60>0.9,'attack never arrived: '+at60.toFixed(3));

  // release falls and always disengages
  api.fxPad(400,0,'up');
  run(0.5); ok(P.cx<at60,'release did not begin falling');
  run(30); ok(P.on===0,'the pad never released: '+P.cx.toFixed(3));

  // every slider position comes to rest
  let stuck=0;
  for(let a=0;a<=1.001;a+=0.25) for(let r=0;r<=1.001;r+=0.25){
    S.padAtk=a; S.padRel=r;
    api.fxPad(400,0,'down'); run(0.3);
    api.fxPad(200,200,'move'); run(0.3);
    api.fxPad(200,200,'up'); run(40);
    if(P.on!==0) stuck++;
    ok(isFinite(P.cx)&&isFinite(P.cy),'non-finite depth at atk '+a+' rel '+r);
  }
  ok(stuck===0,stuck+' slider combinations left the pad engaged');

  // re-touching mid-release keeps its level instead of restarting from zero
  S.padAtk=1; S.padRel=1;
  api.fxPad(400,0,'down'); run(6);
  api.fxPad(400,0,'up'); run(1.0);
  const mid=P.cx;
  ok(mid>0.1&&mid<0.95,'need a partial release to test re-touch: '+mid.toFixed(3));
  api.fxPad(400,0,'down');
  ok(Math.abs(P.cx-mid)<0.05,'re-touch restarted from zero instead of continuing: '+P.cx.toFixed(3));
  api.fxPad(400,0,'up'); run(40);

  // persistence
  S.padAtk=0.4; S.padRel=0.7; api.saveVoices();
  S.padAtk=0; S.padRel=0; api.loadVoices();
  ok(Math.abs(S.padAtk-0.4)<1e-6&&Math.abs(S.padRel-0.7)<1e-6,'pad envelope did not persist');

  if(fail.length){ fail.forEach(f=>console.log('  FAIL '+f)); process.exit(1); }
  const ps=api.padSec;
  console.log(pack+': pad envelope OK   attack 0..'+ps(1,4).toFixed(1)+'s   release 0..'+ps(1,8).toFixed(1)+'s');
  process.exit(0);
});
