//PC-1 instructions
function add(){
  sign=((a0>>17)&1)+((m0>>17)&1);
  a1=a1+m1;
  a0=a0+m0+((a1>>18)&1);
  a1=a1&0x3ffff;
  sign=(sign+((a0>>17)&1))>>1;
  a0=a0&0x3ffff;}
function sub(){
  sign=(1-((a0>>17)&1))+((m0>>17)&1);
  a1=a1-m1;
  a0=a0-m0-((a1>>18)&1);
  a1=a1&0x3ffff;
  sign=(sign+((a0>>17)&1))>>1;
  a0=a0&0x3ffff;}
function rshift(){
  r1=(r1>>1)+((r0&1)<<17);
  r0=(r0>>1)+((a1&1)<<17);
  a1=(a1>>1)+((a0&1)<<17);
  a0=(a0>>1)+(sign<<17);}
function mul(){
  var x;
  x=a0;a0=r0&0x3ffff;r0=m0&0x3ffff;m0=x&0x3ffff;
  x=a1;a1=r1&0x3ffff;r1=m1&0x3ffff;m1=x&0x3ffff;sign=0;
  if(ls==1){x=35;}else{x=17;r1=r0;r0=0;}
  for(i=0;i<x;i++){if((r1&1)==1){add();}
   rshift();}
  if((r1&1)==1){sub();}
  r1=(r1>>1)+((r0&1)<<17);
  r0=(r0>>1);}
function lshift(){
  sign=a0>>17;
  a0=((a0<<1)+(a1>>17))&0x3ffff;
  a1=((a1<<1)+(r0>>17))&0x3ffff;
  r0=((r0<<1)+(r1>>17))&0x3ffff;
  r1=(r1<<1)&0x3ffff;}
function overflow(){println("overflow scc=" + scc);over=1;running=0;}
function div(){
  var x;
  over=0;
  a0=a0&0x3ffff;r0=r0&0x3ffff;m0=m0&0x3ffff;
  a1=a1&0x3ffff;r1=r1&0x3ffff;m1=m1&0x3ffff;
  r0=((r0<<1)+((r1>>17)&1))&0x3ffff;r1=(r1<<1)&0x3ffff;
  if((a0>>17)+(m0>>17)==1)
  {add();if((a0>>17)+(m0>>17)==1){overflow();}}
  else
  {sub();if(((a0>>17)+(m0>>17))%2==0){overflow();}}
  if(over==0){  
   for(i=0;i<35;i++){
    if((a0>>17)+(m0>>17)==1){lshift();add();}
    else{lshift();sub();r1=r1+1;}}
    if((a0>>17)+(m0>>17)==1){
     add();r0=((r0<<1)+((r1>>17)&1))&0x3ffff;r1=(r1<<1)&0x3ffff;}
    else{r0=(r0<<1)+((r1>>17)&1);r1=((r1<<1)+1)&0x3ffff;}
  x=a0;a0=r0;r0=x;x=a1;a1=r1;r1=x;}}
function jump(){scc=ad;}
function bxor(){a0=a0^m0;a1=a1^m1;}
function band(){a0=a0&m0;a1=a1&m1;}
function p(){a0=0;a1=0;add();}
function n(){a0=0;a1=0;sub();}
function a(){add();}
function s(){sub();}
function b(){bxor();}
function c(){band();}
function v(){r0=0;r1=0;mul();}
function w(){mul();}
function d(){div();}
function q(){a0=r0;a1=r1;r0=m0;r1=m1;}
function zl(){if((a0==0)&&(a1==0)){jump();}}
function z(){if((a0&0x7ff)==0){jump();}}
function jl(){jump();}
function k(){if(((a0>>17)&1)==1){jump();}}
function kl(){if(((a0>>17)&1)==0){jump();}}
function t(){mem[ad&0x1ff]=a0;}
function tl(){ad=ad&0xfffe;mem[ad&0x1ff]=a0;mem[(ad+1)&0x1ff]=a1;}
function xx(){mem[ad&0x1ff]=(mem[ad&0x1ff]&0x3f800)+(a0&0x7ff);}
function l(){
 if(ad<1024){for(i=0;i<ad;i++)
 {a0=((a0<<1)+(a1>>17))&0x3ffff;a1=(a1<<1)&0x3ffff;}}
  else{for(i=0;i<(2048-ad);i++)
 {a1=((a1>>1)+(a0<<17))&0x3ffff;a0=a0>>1;}}}
function ll(){
 if(ad<1024){for(i=0;i<ad;i++)
 {a0=((a0<<1)+(a1>>17))&0x3ffff;a1=((a1&0x1ffff)<<1)+((r0&0x10000)>>16);
  r0=(r0&0x20000)+((r0&0xffff)<<1)+((r1&0x20000)>>17);
  r1=(r1<<1)&0x3ffff;}}
 else{for(i=0;i<(2048-ad);i++)
  {r1=(r1>>1)+((r0&1)<<17);r0=(r0&0x20000)+((r0&0x1ffff)>>1)+((a1&1)<<16);
   a1=(a1>>1)+((a0&1)<<17);a0=a0>>1;}}}
function r(){
 if(ad<1024){for(i=0;i<ad;i++)
  {a1=((a1>>1)+(a0<<17))&0x3ffff;a0=(a0>>1)+(a0&0x20000);}}
 else{for(i=0;i<(2048-ad);i++)
  {a0=((a0<<1)+(a1>>17))&0x3ffff;a1=(a1<<1)&0x3ffff;}}}
function rl(){
 if(ad<1024) {for(i=0;i<ad;i++)
  {r1=(r1>>1)+((r0&1)<<17);r0=(r0&0x20000)+((r0&0x1ffff)>>1)+((a1&1)<<16);
   a1=(a1>>1)+((a0&1)<<17);a0=(a0&0x20000)+((a0>>1)&0x1ffff);}}
 else{for(i=0;i<(2048-ad);i++)
  {a0=((a0<<1)+(a1>>17))&0x3ffff;a1=((a1&0x1ffff)<<1)+((r0&0x10000)>>16);
   r0=(r0&0x20000)+((r0&0xffff)<<1)+((r1&0x20000)>>17);
   r1=(r1<<1)&0x3ffff;}}}
function o(){
 var ch=a0>>12;
 if(ch==31)printcase=0;
 else if(ch==27)printcase=1;
 else {if(printcase==0){tty(ita[ch]);}
 if(printcase==1){tty(itb[ch]);}
 disppage();}}
function ii(){
  var c=readtape();
  if(c==-1){printtime();running=0;}
  else{a0=c<<12;a1=0;}}
//end PC-1 instructions

