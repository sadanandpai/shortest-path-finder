var e=Object.defineProperty,t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,l=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,a=(e,a)=>{for(var c in a||(a={}))n.call(a,c)&&l(e,c,a[c]);if(t)for(var c of t(a))r.call(a,c)&&l(e,c,a[c]);return e},c=(e,t,n)=>new Promise(((r,l)=>{var a=e=>{try{i(n.next(e))}catch(t){l(t)}},c=e=>{try{i(n.throw(e))}catch(t){l(t)}},i=e=>e.done?r(e.value):Promise.resolve(e.value).then(a,c);i((n=n.apply(e,t)).next())}));import{M as i,n as o,R as s,I as u,a as m,b as d,C as p,B as x,G as y,F as f,c as E,u as g,r as h,t as w,d as v,D as b,A as C,e as k,S as T,H as j,T as S,f as M,g as O}from"./vendor.31ca2d48.js";i.setAppElement("#root");const R=o.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  row-gap: 20px;
  height: 100%;

  div {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }
`;function I({isOpen:e,setIsOpen:t}){return s.createElement(i,{isOpen:e,contentLabel:"Example Modal"},s.createElement(R,null,s.createElement("div",null,s.createElement(u,null),s.createElement("span",null," Entry")),s.createElement("div",null,s.createElement(m,null),s.createElement("span",null,"Exit")),s.createElement("div",null,s.createElement(d,null),s.createElement("span",null,"Wall")),s.createElement("div",null,s.createElement(p,null),s.createElement("span",null,"Clear")),s.createElement("div",null,s.createElement(x,null),s.createElement("span",null,"Search")),s.createElement("div",null,s.createElement(y,null),s.createElement("span",null,"Reset")),s.createElement("div",null,s.createElement(f,null),s.createElement("span",null,"Randomize")),s.createElement(E,{onClick:t,color:"primary",idleText:"Close"})))}const P=new Map([[0,"white"],[1,"red"],[2,"blue"],[3,"green"],[4,"lightgrey"],[5,"yellow"]]),A=Array.from(new Array(26),((e,t)=>String(t+5))),G=Array.from(new Array(21),((e,t)=>String(t+5))),F=o.div`
  width: 90%;
  margin: auto;
`,$=o.div`
  column-gap: 5%;
  display: none;

  @media (min-width: 768px) {
    display: flex;
  }
`,L=o.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  justify-content: center;

  @media (min-width: 768px) {
    display: none;
  }
`,B=o.label`
  display: flex;
  align-items: center;
  flex-grow: 1;
  column-gap: 10px;

  & > div {
    flex: 1;
  }
`,z=e=>{const l=e,{value:c,dragging:i,index:o}=l,u=((e,l)=>{var a={};for(var c in e)n.call(e,c)&&l.indexOf(c)<0&&(a[c]=e[c]);if(null!=e&&t)for(var c of t(e))l.indexOf(c)<0&&r.call(e,c)&&(a[c]=e[c]);return a})(l,["value","dragging","index"]);return s.createElement(T,{prefixCls:"rc-slider-tooltip",overlay:c,visible:i,placement:"top",key:o},s.createElement(j,a({value:c},u)))};function N({rows:e,cols:t,resetGrid:n,setRows:r,setCols:l}){const[a,c]=s.useState(!1),[i,o]=g();return h.exports.useEffect((()=>{27*t>i-25&&(l(Math.floor((i-25)/27)),w.warning("Max screen dimension set",{toastId:1})),27*e>o-145&&(r(Math.floor((o-145)/27)),w.warning("Max screen dimension set",{toastId:1})),n()}),[e,t,i,o]),s.createElement(F,null,s.createElement($,null,s.createElement(B,null,"Rows",s.createElement(v,{min:5,max:35,value:e,onChange:r,handle:z})),s.createElement(B,null,"Columns",s.createElement(v,{min:5,max:70,value:t,onChange:l,handle:z}))),s.createElement(L,null,s.createElement(B,null,"Rows",s.createElement(b,{options:A,value:String(e),onChange:e=>r(+e.value),name:"rows"})),s.createElement(B,null,"Columns",s.createElement(b,{options:G,value:String(t),onChange:e=>l(+e.value)})),s.createElement(C,{onClick:()=>c(!0),className:k`
            color: blue;
            min-width: 1em;
          `}),s.createElement(I,{isOpen:a,setIsOpen:c})))}const D=o.div`
  border: 0.5px solid black;
  background-color: ${e=>P.get(e.clickType)};
  transition: background-color 0.5s;

  &:hover{
    box-shadow: 0 1px 10px 0 rgba(0,0,0,0.25);
  }
`;function W({i:e,j:t,clickType:n}){return s.createElement(D,{className:"box","data-i":e,"data-j":t,clickType:n})}const H=o.div`
  margin: auto;
  display: inline-grid;
  grid-template-rows: repeat(${e=>e.rows}, ${25}px);
  grid-template-columns: repeat(${e=>e.cols}, ${25}px);
  grid-column-gap: ${2}px;
  grid-row-gap: ${2}px;
`;function U({grid:e,setGridCell:t,clickType:n,isInProgress:r}){const l=h.exports.useRef(!1);function a(e){l.current&&e.target.classList.contains("box")&&t(+e.target.dataset.i,+e.target.dataset.j)}return s.createElement(H,{onMouseDown:function(e){r.current||(0!==n&&1!==n||(l.current=!0,a(e)),t(+e.target.dataset.i,+e.target.dataset.j))},onMouseUp:function(){l.current=!1},onMouseOver:a,onMouseLeave:function(){l.current=!1},rows:e.length,cols:e[0].length},e.map(((e,t)=>e.map(((e,n)=>s.createElement(W,{key:t+":"+n,i:t,j:n,clickType:e}))))))}function q(e){return Math.floor(Math.random()*e)}function J(e){return new Promise((t=>setTimeout(t,e)))}function K(e,t,n){return Array.from(new Array(e),(()=>new Array(t).fill(n)))}const Q=new Map([[1,"red"],[2,"blue"],[3,"green"]]),V=o.div`
  margin: 10px 0;
`,X=o.div`
  width: 90%;
  margin: auto;
  display: none;

  .web-icons {
    display: flex;
    justify-content: center;
    flex-direction: column;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: center;

    button {
      padding: 6px 12px;
    }
  }
`,Y=o.div`
  display: flex;
  justify-content: center;

  & > span {
    min-width: 0;
  }

  @media (min-width: 768px) {
    display: none;
  }
`,Z=o.div`
  & > span {
    min-width: 0;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    flex: 1 1 0px;
  }
`;function _({rows:e,cols:t,entry:n,exit:r,setGrid:l,startBFS:a,clickType:c,setClickType:i,isInProgress:o,resetGrid:g}){function h(){o.current=!1;const[a,c,i]=function(e,t){const n=K(e,t,0);n.forEach((e=>{e.forEach(((t,n)=>{Math.random()<.25&&(e[n]=1)}))}));const r={x:q(e),y:q(t)},l={x:-1,y:-1};do{l.x=q(e),l.y=q(t)}while(l.x===r.x&&l.y===r.y);return n[r.x][r.y]=2,n[l.x][l.y]=3,[n,r,l]}(e,t);n.current=c,r.current=i,l(a)}const w=o.current,v=function({text:e,type:t}){return s.createElement(E,{onClick:()=>i(t),color:Q.get(t),disabled:o.current,idleText:e,outline:c!==t})};return s.createElement(V,null,s.createElement(X,null,s.createElement(Z,null,s.createElement(v,{text:"Entry",type:2}),s.createElement(v,{text:"Exit",type:3}),s.createElement(v,{text:"Wall",type:1}),s.createElement(v,{text:"Clear",type:0})),s.createElement(Z,null,s.createElement(E,{onClick:a,disabled:w,idleText:"Search Path"})),s.createElement(Z,null,s.createElement(E,{onClick:g,idleText:"Reset",outline:!0}),s.createElement(E,{onClick:h,idleText:"Random Maze",outline:!0}))),s.createElement(Y,null,s.createElement(Z,null,s.createElement(v,{text:s.createElement(u,null),type:2}),s.createElement(v,{text:s.createElement(m,null),type:3}),s.createElement(v,{text:s.createElement(d,null),type:1}),s.createElement(v,{text:s.createElement(p,null),type:0})),s.createElement(Z,null,s.createElement(E,{onClick:a,disabled:w,idleText:s.createElement(x,null)})),s.createElement(Z,null,s.createElement(E,{onClick:g,idleText:s.createElement(y,null),outline:!0}),s.createElement(E,{onClick:h,idleText:s.createElement(f,null),outline:!0}))))}function ee(e,t,n,r,l){const a=[...e];a[n][r]=l,t(a)}function te(e,t,n,r,l){const a=[...e];n.forEach((e=>{e.x===l.x&&e.y===l.y||(a[e.x][e.y]=r)})),t(a)}function ne(e,t,n,r,l){return c(this,null,(function*(){const a=e.length,i=e[0].length,o=K(a,i,!1),s=K(a,i,-1),u=[n];o[n.x][n.y]=!0;const m=function(e,t,n,r){const l=e.length,a=e[0].length;return function(c,i,o,s){o>=0&&s>=0&&o<l&&s<a&&(n[o][s]||1===e[o][s]||(r.push({x:o,y:s}),t[o][s]={x:c,y:i},n[o][s]=!0))}}(e,s,o,u);let d=!1;e:for(;u.length;){const a=u.length,c=[];for(let e=0;e<a;e++){const e=u.shift();if(e.x===r.x&&e.y===r.y){d=!0;break e}if(!l.current)break e;m(e.x,e.y,e.x+1,e.y),m(e.x,e.y,e.x-1,e.y),m(e.x,e.y,e.x,e.y+1),m(e.x,e.y,e.x,e.y-1),c.push({x:e.x,y:e.y})}te(e,t,c,4,n),yield J(200)}if(d&&l.current){w.success("Path found!!! 😃");const a=yield function(e,t,n,r,l,a){return c(this,null,(function*(){let c=t.x,i=t.y;[c,i]=[n[c][i].x,n[c][i].y];let o=0;if(e.x===c&&e.y===i)return o;do{ee(r,l,c,i,5),yield J(100),[c,i]=[n[c][i].x,n[c][i].y],o+=1}while(a.current&&(e.x!==c||e.y!==i));return o}))}(n,r,s,e,t,l);l.current&&w("Shortest path length is "+(a+1))}else l.current&&w.warning("No path found!!! 😟")}))}const re=o.h2`
  margin-top: 5px;
  text-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
`,le=o.main`
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`,ae=o(S)`
  opacity: 0;
  @media (min-width: 768px) {
    opacity: 1;
  }
`,ce=o(S)`
  opacity: 1;
  @media (min-width: 768px) {
    opacity: 0;
  }
`;function ie(e,t=-1,n=-1){e.current.x=t,e.current.y=n}function oe(e,t,n){return e.current.x===t&&e.current.y===n}function se(){const[e,t]=h.exports.useState(20),[n,r]=h.exports.useState(55),[l,i]=h.exports.useState(K(e,n)),[o,u]=h.exports.useState(1),m=h.exports.useRef(!1),d=h.exports.useRef({x:-1,y:-1}),p=h.exports.useRef({x:-1,y:-1}),x={rows:e,cols:n,grid:l,clickType:o,setRows:t,setCols:r,setGrid:i,setClickType:u,isInProgress:m,entry:d,exit:p,resetGrid:function(){i(K(e,n)),ie(d),ie(p),m.current=!1},startBFS:function(){return c(this,null,(function*(){if(d.current.x<0||p.current.x<0)return w.error("Entry & Exit are mandatory",{toastId:0}),!1;m.current=!0,yield ne(l,i,d.current,p.current,m)}))},setGridCell:function(e,t,n=o){const r=[...l];r[e][t]=n,(0===n||1===n)&&(oe(d,e,t)?ie(d):oe(p,e,t)&&ie(p));2===n&&(-1!==d.current.x&&(r[d.current.x][d.current.y]=0),ie(d,e,t));3===n&&(-1!==p.current.x&&(r[p.current.x][p.current.y]=0),ie(p,e,t));i(r)}};return s.createElement(s.Fragment,null,s.createElement(re,null,"Shortest Path Finder",s.createElement("a",{href:"https://github.com/sadanandpai/shortest-path-finder"},s.createElement(M,null))),s.createElement(N,a({},x)),s.createElement(le,null,s.createElement(_,a({},x)),s.createElement(U,a({},x)),s.createElement(ae,{autoClose:3e3,pauseOnFocusLoss:!1,toastId:3}),s.createElement(ce,{position:"bottom-center",pauseOnFocusLoss:!1,autoClose:3e3,newestOnTop:!0})))}O.render(s.createElement(s.StrictMode,null,s.createElement(se,null)),document.getElementById("root"));
