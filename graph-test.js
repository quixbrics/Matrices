// The bug this exists for: nodes were created and driven by fxSet(), but never
// connected. Every previous test passed because the stub's connect() recorded
// nothing. This stub records every edge, then walks the graph.
const {JSDOM}=require('jsdom'); const fs=require('fs');
const EDGES=[], NAMES=new Map(); let DEST=null;
let NOW=0, id=0;
const param=()=>({value:0,setValueAtTime(){return this},exponentialRampToValueAtTime(){return this},
  linearRampToValueAtTime(){return this},setTargetAtTime(){return this},cancelScheduledValues(){return this}});
function node(kind){
  const n={__id:++id,__kind:kind,
    connect(t){ if(t&&t.__id) EDGES.push([n,t]); return t; },
    disconnect(){}, start(){}, stop(){},
    gain:param(),frequency:param(),Q:param(),detune:param(),pan:param(),delayTime:param(),
    threshold:param(),knee:param(),ratio:param(),attack:param(),release:param(),playbackRate:param(),
    type:'',curve:null,buffer:null,loop:false,loopStart:0,loopEnd:0,normalize:true,
    fftSize:1024,frequencyBinCount:512,onended:null,
    getByteFrequencyData(a){a.fill(0)},getFloatTimeDomainData(a){a.fill(0)}};
  return n;
}
const dom=new JSDOM(fs.readFileSync('/home/claude/pl/index.html','utf8'),
  {runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/?pack='+(process.argv[2]||'lattice')});
const w=dom.window;
w.AudioContext=function(){return{
  get currentTime(){return NOW}, sampleRate:48000, state:'running',
  resume:()=>Promise.resolve(), destination:(DEST=node('destination')),
  createGain:()=>node('gain'), createOscillator:()=>node('osc'),
  createBiquadFilter:()=>node('biquad'), createWaveShaper:()=>node('shaper'),
  createDynamicsCompressor:()=>node('comp'), createAnalyser:()=>node('analyser'),
  createStereoPanner:()=>node('panner'), createBufferSource:()=>node('bufsrc'),
  createDelay:()=>node('delay'), createConvolver:()=>node('convolver'),
  audioWorklet:{addModule:()=>Promise.resolve()},
  createBuffer:(c,n)=>({getChannelData:()=>new Float32Array(n),length:n,duration:n/48000,
    numberOfChannels:c,sampleRate:48000})}};
w.URL.createObjectURL=()=>'blob:x';
w.HTMLMediaElement.prototype.play=()=>Promise.resolve();
w.addEventListener('load',()=>{
  const api=w.__api, AE=w.__AE;
  api.boot();
  Object.keys(AE).forEach(k=>{ if(AE[k]&&AE[k].__id) NAMES.set(AE[k].__id,k); });
  const name=n=>NAMES.get(n.__id)||(n.__kind+'#'+n.__id);
  const out=new Map();
  EDGES.forEach(([a,b])=>{ if(!out.has(a.__id)) out.set(a.__id,[]); out.get(a.__id).push(b); });
  // does signal reach master/destination from this node?
  function reaches(start,targetId,seen=new Set()){
    if(!start||seen.has(start.__id)) return false;
    seen.add(start.__id);
    if(start.__id===targetId) return true;
    return (out.get(start.__id)||[]).some(n=>reaches(n,targetId,seen));
  }
  const fail=[];
  const ok=(c,m)=>{ if(!c) fail.push(m); };
  const master=AE.master;
  NAMES.set(DEST.__id,'destination');
  // every node the FX code drives must actually be in the signal path
  ['rev','rev2','revNear','revFar','revDamp','revSend','dly','dlySend',
   'filter','crush','crushDry','crushWet','crushMix','gate','fxOut','bus','limiter']
    .forEach(k=>{
      const n=AE[k];
      ok(n,'AE.'+k+' does not exist');
      /* the real test is whether audio gets OUT, not whether it reaches any
         particular midpoint - the limiter and analyser sit past master */
      if(n) ok(reaches(n,DEST.__id),'AE.'+k+' is orphaned: no path to the output');
    });
  // and the send must feed BOTH convolvers, not just one
  ok(reaches(AE.revSend,AE.rev.__id),'revSend does not feed the near convolver');
  ok(reaches(AE.revSend,AE.rev2.__id),'revSend does not feed the far convolver');
  ok(reaches(AE.rev,AE.revNear.__id),'near convolver does not pass through its crossfade gain');
  ok(reaches(AE.rev2,AE.revFar.__id),'far convolver does not pass through its crossfade gain');
  ok(reaches(AE.revNear,AE.revDamp.__id),'near path bypasses the damping filter');
  ok(reaches(AE.revFar,AE.revDamp.__id),'far path bypasses the damping filter');
  ok(reaches(AE.bus,master.__id),'the voice bus does not reach master');
  ok(reaches(master,DEST.__id),'master does not reach the output');
  console.log('edges recorded:',EDGES.length);
  if(fail.length){ fail.forEach(f=>console.log('  FAIL '+f)); process.exit(1); }
  console.log('GRAPH OK ('+(process.argv[2]||'lattice')+')');
  process.exit(0);
});
