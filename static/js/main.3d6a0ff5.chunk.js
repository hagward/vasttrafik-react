(this["webpackJsonpvt-react"]=this["webpackJsonpvt-react"]||[]).push([[0],[,,,function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return o})),n.d(t,"d",(function(){return c})),n.d(t,"f",(function(){return s})),n.d(t,"e",(function(){return u}));var i=n(21);function r(e){return e?Array.isArray(e)?e:[e]:[]}function a(e){return e[0]}function o(e){return e[e.length-1]}function c(e,t,n){for(var i=[],r=0,a=0;r<e.length&&a<t.length;)i.push(n(e[r],t[a])<=0?e[r++]:t[a++]);for(;r<e.length;)i.push(e[r++]);for(;a<t.length;)i.push(t[a++]);return i}function s(e,t){var n,r=[],a=new Set,o=Object(i.a)(e);try{for(o.s();!(n=o.n()).done;){var c=n.value,s=t(c);a.has(s)||r.push(c),a.add(s)}}catch(u){o.e(u)}finally{o.f()}return r}function u(e){return e<10?"0"+e:""+e}},,,,,,function(e,t,n){e.exports={legs:"TripDetails_legs__3EAG4",leg:"TripDetails_leg__3RYui",direction:"TripDetails_direction__nETYo",track:"TripDetails_track__3u51Y",overview:"TripDetails_overview__3QAnu",location:"TripDetails_location__3weSf",time:"TripDetails_time__3LcKt",name:"TripDetails_name__3k2bV",notes:"TripDetails_notes__2gw9C"}},function(e,t,n){e.exports={overview:"TripOverview_overview___kW70",origin:"TripOverview_origin__1YlZ5",destination:"TripOverview_destination__guSIV",invalid:"TripOverview_invalid__1q6Bi",notesIcon:"TripOverview_notesIcon__1nrtU",legs:"TripOverview_legs__1MaC0",travelTime:"TripOverview_travelTime__18eQF",leg:"TripOverview_leg__15Ba1"}},function(e,t,n){"use strict";n.d(t,"b",(function(){return c})),n.d(t,"c",(function(){return s})),n.d(t,"d",(function(){return u}));var i=n(12),r={origin:{name:""},destination:{name:""},date:(new Date).toISOString(),now:!0},a=Object(i.b)({name:"search",initialState:r,reducers:{setDate:function(e,t){var n=t.payload,i=n.date,r=n.now;e.date=i,e.now=r},setLocation:function(e,t){var n=t.payload,i=n.name,r=n.location;e[i]=r},switchLocations:function(e){var t=e.origin;e.origin=e.destination,e.destination=t}}}),o=a.actions,c=o.setDate,s=o.setLocation,u=o.switchLocations;t.a=a.reducer},,,function(e,t,n){e.exports={locations:"SearchBar_locations__CSxHQ",datetime:"SearchBar_datetime__2SP0R",search:"SearchBar_search__22_iH",switchLocationsButton:"SearchBar_switchLocationsButton__1Gqfa",switchLocationsIcon:"SearchBar_switchLocationsIcon__1eBNU",searchButton:"SearchBar_searchButton__1GItM",spinnerIcon:"SearchBar_spinnerIcon__2MG7m",searching:"SearchBar_searching__8o1tj"}},,,,,,function(e,t,n){"use strict";n.d(t,"a",(function(){return f})),n.d(t,"c",(function(){return m}));var i=n(21),r=n(13),a=n.n(r),o=n(22),c=n(12),s=n(31),u=n(3),l=Object(c.b)({name:"trips",initialState:{trips:[],loading:!1,error:null},reducers:{clearTrips:function(e){e.trips=[],e.loading=!1,e.error=null},getTripsStart:function(e){e.loading=!0,e.error=null},getTripsSuccess:function(e,t){e.trips=t.payload,e.loading=!1,e.error=null},getTripsFailure:function(e,t){e.loading=!1,e.error=t.payload}}}),d=l.actions,f=d.clearTrips,p=d.getTripsStart,h=d.getTripsSuccess,j=d.getTripsFailure;t.b=l.reducer;var m=function(e,t,n){return function(){var i=Object(o.a)(a.a.mark((function i(r){var o,c;return a.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,r(p()),i.next=4,Object(s.a)(e,t,n);case 4:if(!(o=i.sent).TripList.error){i.next=7;break}throw new Error(o.TripList.error);case 7:c=v(o),r(h(c)),i.next=14;break;case 11:i.prev=11,i.t0=i.catch(0),r(j(i.t0));case 14:case"end":return i.stop()}}),i,null,[[0,11]])})));return function(e){return i.apply(this,arguments)}}()};function v(e){var t,n=Object(u.c)(e.TripList.Trip),r=Object(i.a)(n);try{for(r.s();!(t=r.n()).done;){var a=t.value;a.Leg=Object(u.c)(a.Leg);var o,c=Object(i.a)(a.Leg);try{for(c.s();!(o=c.n()).done;){var s=o.value;s.Origin.Notes&&(s.Origin.Notes.Note=Object(u.c)(s.Origin.Notes.Note)),s.Destination.Notes&&(s.Destination.Notes.Note=Object(u.c)(s.Destination.Notes.Note))}}catch(l){c.e(l)}finally{c.f()}}}catch(l){r.e(l)}finally{r.f()}return n}},,,,function(e,t,n){e.exports={wrapper:"LocationSearchInput_wrapper__2djFY",icon:"LocationSearchInput_icon__1yItC",input:"LocationSearchInput_input__2QYj6",cancelButton:"LocationSearchInput_cancelButton__392il"}},function(e,t,n){e.exports={app:"App_app__3fr4t",navbar:"App_navbar__1wWm4",logo:"App_logo__3ajY5",error:"App_error__2t8In"}},,,,,,function(e,t,n){"use strict";n.d(t,"b",(function(){return f})),n.d(t,"a",(function(){return h}));var i=n(13),r=n.n(i),a=n(22),o=n(8),c=n.n(o),s=n(27),u=n(28),l={key:"d9k7BQPB7_5nIsjU9d7Y0IkFIqUa",secret:"Ksgx8WdEnn9gjp9Sqln72WgbQdUa"},d=new(function(){function e(t,n){Object(s.a)(this,e),this.key=void 0,this.secret=void 0,this.token=void 0,this.key=t,this.secret=n,this.token={expiryDate:0,token:""}}return Object(u.a)(e,[{key:"getToken",value:function(){var e=this;return new Promise((function(t,n){var i=e.getStoredToken();Date.now()<i.expiryDate?t(i.token):e.signIn().then((function(e){return e.json()})).then((function(n){e.token={expiryDate:Date.now()+1e3*Number(n.expires_in),token:n.access_token},e.storeToken(),t(e.token.token)}))}))}},{key:"getStoredToken",value:function(){return{expiryDate:Number(localStorage.getItem("tokenExpiryDate")),token:localStorage.getItem("token")}}},{key:"signIn",value:function(){var e=new Headers({Authorization:"Basic "+btoa(this.key+":"+this.secret),"Content-Type":"application/x-www-form-urlencoded"});return fetch("https://api.vasttrafik.se:443/token",{body:"grant_type=client_credentials&scope="+this.scope(),headers:e,method:"POST"})}},{key:"scope",value:function(){var e=localStorage.getItem("scope");return e||(e=this.generateScope(),localStorage.setItem("scope",e)),e}},{key:"generateScope",value:function(){return Math.random().toString(36).slice(2)}},{key:"storeToken",value:function(){localStorage.setItem("token",this.token.token),localStorage.setItem("tokenExpiryDate",String(this.token.expiryDate))}}]),e}())(l.key,l.secret);function f(e){return p.apply(this,arguments)}function p(){return(p=Object(a.a)(r.a.mark((function e(t){var n,i,a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.getToken();case 2:return n=e.sent,i="https://api.vasttrafik.se/bin/rest.exe/v2/location.name?format=json&input="+encodeURIComponent(t),e.next=6,fetch(i,{headers:new Headers({Authorization:"Bearer "+n}),method:"GET"});case 6:return a=e.sent,e.abrupt("return",a.json());case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function h(e,t,n){return j.apply(this,arguments)}function j(){return(j=Object(a.a)(r.a.mark((function e(t,n,i){var a,o,s,u,l;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.getToken();case 2:return a=e.sent,o=c()(i).format("YYYY-MM-DD"),s=c()(i).format("HH:mm"),u="https://api.vasttrafik.se/bin/rest.exe/v2/trip?format=json"+m("origin",t)+m("dest",n)+"&date="+encodeURIComponent(o)+"&time="+encodeURIComponent(s),e.next=8,fetch(u,{headers:new Headers({Authorization:"Bearer "+a}),method:"GET"});case 8:return l=e.sent,e.abrupt("return",l.json());case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function m(e,t){return t.id?"&"+e+"Id="+encodeURIComponent(t.id):t.lat&&t.lon?"&"+e+"CoordName="+encodeURIComponent(t.name)+"&"+e+"CoordLat="+encodeURIComponent(t.lat)+"&"+e+"CoordLong="+encodeURIComponent(t.lon):""}},function(e,t,n){e.exports={wrapper:"DatetimeInput_wrapper__XqBGi",nowButton:"DatetimeInput_nowButton__23SMg",nowOverlay:"DatetimeInput_nowOverlay__1vweV"}},function(e,t,n){e.exports={wrapper:"Input_wrapper__2o0fD",input:"Input_input__24dvw",inputIcon:"Input_inputIcon__3Fr-L"}},function(e,t,n){e.exports={wrapper:"LocationInput_wrapper__22Kag",fakeInput:"LocationInput_fakeInput__2YPHy",static:"LocationInput_static__2Xnyu"}},function(e,t,n){e.exports={earlierLaterButtons:"SearchResult_earlierLaterButtons__2UOOe",earlierLaterButton:"SearchResult_earlierLaterButton__15iUV"}},,,,,,function(e,t,n){e.exports={location:"Location_location__18UtO",address:"Location_address__1BjE9"}},function(e,t,n){e.exports={search:"LocationSearch_search__nxx0-",results:"LocationSearch_results__ypv_A"}},,function(e,t,n){"use strict";(function(e){var i=n(30),r=n(12),a=n(45),o=window.localStorage.getItem("state"),c=Object(r.a)({reducer:a.a,middleware:[].concat(Object(i.a)(Object(r.c)()),[function(e){return function(t){return function(n){var i=t(n);return window.localStorage.setItem("state",JSON.stringify(e.getState())),i}}}]),preloadedState:o?JSON.parse(o):void 0});t.a=c}).call(this,n(36)(e))},function(e,t,n){"use strict";var i=n(7),r=n(11),a=n(20),o=Object(i.c)({search:r.a,trips:a.b});t.a=o},function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var i=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function r(e){if("serviceWorker"in navigator){if(new URL("/vasttrafik-react",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/vasttrafik-react","/service-worker.js");i?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var i=n.headers.get("content-type");404===n.status||null!=i&&-1===i.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):a(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):a(t,e)}))}}function a(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}},,function(e,t,n){e.exports={list:"LocationList_list__1GHD9"}},function(e,t,n){e.exports={item:"LocationListItem_item__LweBU"}},function(e,t,n){e.exports={list:"TripList_list__UIk8G"}},function(e,t,n){e.exports={item:"TripListItem_item__104lt"}},function(e,t,n){"use strict";n.r(t),function(e){var t=n(0),i=(n(1),n(16)),r=n.n(i),a=n(18),o=n(44),c=(n(62),n(46));!function(){var e=n(67).default;r.a.render(Object(t.jsx)(a.a,{store:o.a,children:Object(t.jsx)(e,{})}),document.getElementById("app-root"))}();c.a()}.call(this,n(36)(e))},,,,,,,,,,function(e,t,n){},,,,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var i=n(0),r=n(5),a=n(4),o=n(8),c=n.n(o),s=n(1),u=n.n(s),l=n(18),d=n(15),f=n.n(d),p=n(32),h=n.n(p),j=n(47),m=n(33),v=n.n(m),b=function(e){return Object(i.jsxs)("div",{className:v.a.wrapper,children:[Object(i.jsx)(a.a,{className:v.a.inputIcon,icon:e.icon}),Object(i.jsx)("input",Object(j.a)({className:v.a.input},e))]})},O=function(e){var t=e.date,n=e.now,a=e.onChange,o=e.onNowButtonClick,s=c()(t).format("YYYY-MM-DDTHH:mm:ss");return Object(i.jsxs)("div",{className:h.a.wrapper,children:[Object(i.jsx)(b,{icon:r.c,type:"datetime-local",value:s,onChange:function(e){var t=e.target;a(c()(t.value).toDate())}}),n?Object(i.jsx)("div",{className:h.a.nowOverlay,children:"Avg\xe5r nu"}):Object(i.jsx)("button",{className:h.a.nowButton,onClick:o,children:"Nu"})]})},g=n(29),_=n(6),x=n(41),w=n.n(x),k=function(e){var t=e.name.split(", "),n=Object(_.a)(t,2),r=n[0],a=n[1];return Object(i.jsxs)("div",{className:w.a.location,children:[Object(i.jsx)("div",{children:r}),a&&Object(i.jsx)("div",{className:w.a.address,children:a})]})},S=n(34),N=n.n(S),L=n(30),y=n(31);var I=n(27),C=n(28),T=function(){function e(t){Object(I.a)(this,e),this.items=void 0,this.limit=void 0,this.limit=t;var n=localStorage.getItem("mru");this.items=n?JSON.parse(n):[]}return Object(C.a)(e,[{key:"add",value:function(e){this.removeExistingItem(e),this.items.unshift(e),this.ensureLengthWithinLimit(),this.setMostRecentlyUsed()}},{key:"getMostRecentlyUsed",value:function(){return this.items}},{key:"setMostRecentlyUsed",value:function(){localStorage.setItem("mru",JSON.stringify(this.items))}},{key:"getFirstMatch",value:function(e){return this.items.find((function(t){return t.name.toLowerCase().startsWith(e.toLowerCase())}))}},{key:"removeExistingItem",value:function(e){var t=this.items.findIndex((function(t){return t.id===e.id}));t>-1&&this.items.splice(t,1)}},{key:"ensureLengthWithinLimit",value:function(){this.items.length>this.limit&&this.items.splice(this.limit,this.items.length-this.limit)}}]),e}(),D=n(3),B=n(48),E=n.n(B),U=n(49),R=n.n(U),A=function(e){var t=e.location,n=e.onClick;return Object(i.jsx)("li",{className:R.a.item,onClick:function(e){e.stopPropagation(),n(t)},children:Object(i.jsx)(k,{name:t.name})})},M=function(e){var t=e.locations,n=e.onSelect;return Object(i.jsx)("ul",{className:E.a.list,children:t.map((function(e){return Object(i.jsx)(A,{location:e,onClick:n},e.id||e.name)}))})},Y=n(42),W=n.n(Y),H=n(24),P=n.n(H),F=function(e){var t=e.value,n=e.onChange,o=e.onCancel;return Object(i.jsxs)("div",{className:P.a.wrapper,children:[Object(i.jsx)("div",{className:P.a.icon,children:Object(i.jsx)(a.a,{icon:r.f})}),Object(i.jsx)("input",{className:P.a.input,placeholder:"Station",ref:function(e){setTimeout((function(){e&&e.focus()}),0)},type:"text",value:t,onChange:n}),Object(i.jsx)("button",{className:P.a.cancelButton,onClick:o,children:"Avbryt"})]})},G=function(e){var t=e.onCancel,n=e.onSelect,r=new T(10),a=Object(s.useState)(r.getMostRecentlyUsed()),o=Object(_.a)(a,2),c=o[0],u=o[1],l=Object(s.useState)(""),d=Object(_.a)(l,2),f=d[0],p=d[1],h=Object(s.useState)(),j=Object(_.a)(h,2),m=j[0],v=j[1],b=function(e,t){var n=Object(s.useState)(e),i=Object(_.a)(n,2),r=i[0],a=i[1];return Object(s.useEffect)((function(){var n=setTimeout((function(){return a(e)}),t);return function(){return clearTimeout(n)}}),[e,t]),r}(f,250);function O(e){n(e),e.id&&r.add(e)}return Object(s.useEffect)((function(){b&&Object(y.b)(b).then((function(e){var t=Object(D.c)(e.LocationList.CoordLocation),n=Object(D.c)(e.LocationList.StopLocation),i=Object(D.d)(t,n,(function(e,t){return Number(e.idx)-Number(t.idx)}));u(i)}))}),[b]),Object(i.jsxs)("div",{className:W.a.search,children:[Object(i.jsx)(F,{value:f,onChange:function(e){var t=e.target.value;p(t),v(r.getFirstMatch(t)),t||u(r.getMostRecentlyUsed())},onCancel:function(e){e.stopPropagation(),t()}}),function(){if(!c.length&&!m)return null;var e=m?Object(D.f)([m].concat(Object(L.a)(c)),(function(e){return e.id||e.name})):c;return Object(i.jsx)("div",{className:W.a.results,children:Object(i.jsx)(M,{locations:e,onSelect:O})})}()]})},J=n(16),Q=n.n(J),q=(n(66),function(e){var t=e.children,n=document.createElement("div");return Object(s.useEffect)((function(){var e=document.getElementsByTagName("body")[0],t=document.getElementById("modal-root");return e.classList.add("noscroll"),n.classList.add("modal"),t.appendChild(n),function(){e.classList.remove("noscroll"),t.removeChild(n)}}),[n]),Q.a.createPortal(t,n)}),V=function(e){var t=e.disabled,n=e.selected,r=e.onSelect,a=Object(s.useState)(!1),o=Object(_.a)(a,2),c=o[0],u=o[1],l=n.name;function d(){u(!1)}function p(e){u(!1),r(e)}return Object(i.jsxs)("div",{className:N.a.wrapper,children:[c&&Object(i.jsx)(q,{children:Object(i.jsx)(G,{onCancel:d,onSelect:p})}),l&&Object(i.jsx)(k,{name:l}),Object(i.jsx)("input",{type:"text",className:f()(N.a.fakeInput,Object(g.a)({},N.a.static,!l)),onFocus:function(){u(!t)},placeholder:l?"":"H\xe5llplats"})]})},K=n(14),z=n.n(K),X=function(e){var t=e.origin,n=e.destination,o=e.date,c=e.now,s=e.searching,u=e.onDatetimeChange,l=e.onLocationChange,d=e.onLocationSwitch,p=e.onNowButtonClick,h=e.onSearch;return Object(i.jsxs)("div",{children:[Object(i.jsxs)("div",{className:z.a.locations,children:[Object(i.jsxs)("div",{className:z.a.inputs,children:[Object(i.jsx)(V,{disabled:s,selected:t,onSelect:function(e){l("origin",e)}}),Object(i.jsx)(V,{disabled:s,selected:n,onSelect:function(e){l("destination",e)}})]}),Object(i.jsx)("button",{className:z.a.switchLocationsButton,onClick:d,children:Object(i.jsx)(a.a,{className:z.a.switchLocationsIcon,icon:r.d,rotation:90})})]}),Object(i.jsx)("div",{className:z.a.datetime,children:Object(i.jsx)(O,{date:o,now:c,onChange:u,onNowButtonClick:p})}),Object(i.jsx)("button",{className:z.a.searchButton,onClick:function(){h()},disabled:s||!t.name||!n.name,children:s?Object(i.jsxs)("span",{children:["S\xf6ker...",Object(i.jsx)(a.a,{className:f()(z.a.spinnerIcon,"right-icon"),icon:r.g,spin:!0})]}):Object(i.jsx)("span",{children:"S\xf6k resa"})})]})},$=n(35),Z=n.n($),ee=n(50),te=n.n(ee),ne=n(9),ie=n.n(ne),re=function(e){var t=e.trip;function n(e){return Object(i.jsxs)("div",{className:ie.a.location,children:[Object(i.jsxs)("div",{className:ie.a.overview,children:[Object(i.jsx)("div",{className:ie.a.time,children:e.time}),Object(i.jsx)("div",{className:ie.a.name,children:e.name}),Object(i.jsx)("div",{className:ie.a.track,children:e.track&&"L\xe4ge "+e.track})]}),e.Notes&&Object(i.jsx)("ul",{className:ie.a.notes,children:e.Notes.Note.map((function(e,t){return Object(i.jsx)("li",{children:e.$},t)}))})]})}return Object(i.jsx)("ul",{className:ie.a.legs,children:t.Leg.filter((function(e){return"WALK"!==e.type})).map((function(e,t){return function(e,t){return Object(i.jsxs)("li",{className:ie.a.leg,children:[n(e.Origin),Object(i.jsxs)("div",{className:ie.a.direction,children:[e.name," mot ",e.direction]}),n(e.Destination)]},t)}(e,t)}))})},ae=n(51),oe=n.n(ae),ce=n(10),se=n.n(ce),ue=function(e){var t=e.trip,n=e.onClick,o=Object(D.a)(t.Leg).Origin,s=Object(D.b)(t.Leg).Destination;function u(e){var t,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return[Object(i.jsxs)("span",{children:[null!==(t=e.rtTime)&&void 0!==t?t:e.time,n&&Object(i.jsx)(a.a,{className:f()(se.a.notesIcon,"right-icon"),icon:r.e})]},0),e.rtTime&&e.time!==e.rtTime&&Object(i.jsx)("s",{className:f()(se.a.time,se.a.invalid),children:e.time},1)]}return Object(i.jsxs)("div",{className:se.a.overview,onClick:n,children:[Object(i.jsxs)("div",{className:se.a.origin,children:[Object(i.jsx)("div",{children:u(o,t.Leg.some((function(e){return e.Origin.Notes||e.Destination.Notes})))}),Object(i.jsx)("div",{className:se.a.legs,children:t.Leg.filter((function(e){return e.sname})).map((function(e,t){return function(e,t){return Object(i.jsx)("span",{className:se.a.leg,style:{backgroundColor:e.fgColor,borderColor:"#ffffff"===e.fgColor?"#EE1844":"transparent",color:e.bgColor},children:e.sname},t)}(e,t)}))})]}),Object(i.jsx)(a.a,{icon:r.a}),Object(i.jsxs)("div",{className:se.a.destination,children:[Object(i.jsx)("div",{children:u(s)}),Object(i.jsxs)("div",{className:se.a.travelTime,children:["Restid: ",function(e,t){var n=c()("".concat(e.rtDate||e.date," ").concat(e.rtTime||e.time)),i=c()("".concat(t.rtDate||t.date," ").concat(t.rtTime||t.time)),r=i.diff(n,"hour"),a=i.diff(n,"minute")%60;return Object(D.e)(r)+":"+Object(D.e)(a)}(o,s)]})]})]})},le=function(e){var t=e.trip,n=Object(s.useState)(!1),r=Object(_.a)(n,2),a=r[0],o=r[1];return Object(i.jsxs)("div",{className:oe.a.item,children:[Object(i.jsx)(ue,{trip:t,onClick:function(){o(!a)}}),a&&Object(i.jsx)(re,{trip:t})]})},de=function(e){var t=e.trips;return Object(i.jsx)("ul",{className:te.a.list,children:t.map((function(e,t){return Object(i.jsx)("li",{children:Object(i.jsx)(le,{trip:e})},t)}))})},fe=function(e){return Object(i.jsxs)("div",{children:[Object(i.jsx)(de,{trips:e.trips}),Object(i.jsxs)("div",{className:Z.a.earlierLaterButtons,children:[Object(i.jsx)("button",{className:Z.a.earlierLaterButton,onClick:e.onShowEarlier,children:"Tidigare"}),Object(i.jsx)("button",{className:Z.a.earlierLaterButton,onClick:e.onShowLater,children:"Senare"})]})]})},pe=n(11),he=n(20),je=n(25),me=n.n(je),ve=function(e){return Object(i.jsx)("div",{className:me.a.error,children:e.error})};t.default=function(){var e=Object(l.b)(),t=Object(l.c)((function(e){return{tripsLoading:e.trips.loading,tripsError:e.trips.error,trips:e.trips.trips}})),n=t.tripsLoading,o=t.tripsError,s=t.trips,d=Object(l.c)((function(e){return{searchOrigin:e.search.origin,searchDestination:e.search.destination,searchDate:new Date(e.search.date),searchNow:e.search.now}})),f=d.searchOrigin,p=d.searchDestination,h=d.searchDate,j=d.searchNow;function m(t){e(Object(pe.b)({date:t.toISOString(),now:!1}))}function v(t,n){e(Object(pe.c)({name:t,location:n}))}function b(){e(Object(pe.b)({date:(new Date).toISOString(),now:!0}))}function O(){e(Object(pe.d)())}function g(){var t=h;j&&(t=new Date,e(Object(pe.b)({date:t.toISOString(),now:!0}))),_(t)}function _(t){e(Object(he.c)(f,p,t))}function x(){k(-20)}function w(){k(20)}function k(t){var n=c()(h).add(t,"minute").toDate();e(Object(pe.b)({date:n.toISOString(),now:j})),_(n)}return Object(i.jsx)(u.a.StrictMode,{children:Object(i.jsxs)("div",{className:me.a.app,children:[Object(i.jsx)("nav",{className:me.a.navbar,children:Object(i.jsxs)("button",{onClick:function(){e(Object(he.a)())},children:[Object(i.jsx)(a.a,{className:me.a.logo,icon:r.b}),"Reaktiv V\xe4sttrafik"]})}),o?Object(i.jsx)(ve,{error:o}):s.length?Object(i.jsx)(fe,{trips:s,onShowEarlier:x,onShowLater:w}):Object(i.jsx)(X,{origin:f,destination:p,date:h,now:j,searching:n,onDatetimeChange:m,onLocationChange:v,onLocationSwitch:O,onNowButtonClick:b,onSearch:g})]})})}}],[[52,1,2]]]);
//# sourceMappingURL=main.3d6a0ff5.chunk.js.map