(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{85:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return o})),t.d(n,"metadata",(function(){return s})),t.d(n,"toc",(function(){return c})),t.d(n,"default",(function(){return l}));var r=t(3),a=t(7),i=(t(0),t(89)),o={id:"open_channel",title:"Opening a Channel with LDK"},s={unversionedId:"open_channel",id:"open_channel",isDocsHomePage:!1,title:"Opening a Channel with LDK",description:"Prerequisites",source:"@site/docs/open_channel.md",slug:"/open_channel",permalink:"/docs/open_channel",editUrl:"https://github.com/lightningdevkit/lightningdevkit.org/tree/main/docs/open_channel.md",version:"current",sidebar:"someSidebar",previous:{title:"Building a Node: Checklist",permalink:"/docs/build_node"},next:{title:"Key Management",permalink:"/docs/key_mgmt"}},c=[{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Overview",id:"overview",children:[]}],u={toc:c};function l(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},u,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"prerequisites"},"Prerequisites"),Object(i.b)("p",null,'See "Build a Node: Checklist" for preparing LDK to open a channel. This guide\nis a follow-up.'),Object(i.b)("h2",{id:"overview"},"Overview"),Object(i.b)("p",null,"This guide is more of a walkthrough of a code snippet that shows the steps to\nopen a channel with LDK."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-java"}),"// <insert code to connect to peer via NioPeerHandler.connect(byte[] their_node_id, SocketAddress remote)>\n\n// Create the initial channel and make sure the result is successful.\n[]byte peer_node_pubkey = <peer node pubkey bytes>;\nResult_NoneAPIErrorZ create_channel_result = channel_manager.create_channel(\n    peer_node_pubkey, 10000, 1000, 42, null);\nassert create_channel_result instanceof Result_NoneAPIErrorZ.Result_NoneAPIErrorZ_OK;\n\n// Ensure this generates a FundingGenerationReady event and that its fields are \n// sane.\nnio_peer_handler.check_events();\nEvent[] events = channel_manager_events.get_and_clear_pending_events();\nassert events.length == 1;\nassert events[0] instanceof Event.FundingGenerationReady;\nassert ((Event.FundingGenerationReady) events[0]).channel_value_satoshis == 10000;\nassert ((Event.FundingGenerationReady) events[0]).user_channel_id == 42;\nbyte[] funding_spk = ((Event.FundingGenerationReady) events[0]).output_script;\nassert funding_spk.length == 34 && funding_spk[0] == 0 && funding_spk[1] == 32; // P2WSH\n\n// Generate the funding transaction for the channel based on the channel amount\nNetworkParameters bitcoinj_net = NetworkParameters.fromID(NetworkParameters.ID_MAINNET);\nTransaction funding_tx = new Transaction(bitcoinj_net);\nfunding_tx.addInput(new TransactionInput(bitcoinj_net, funding, new byte[0]));\nfunding_tx.getInputs().get(0).setWitness(new TransactionWitness(2)); // Make sure we don't complain about lack of witness\nfunding_tx.getInput(0).getWitness().setPush(0, new byte[]{0x1});\nfunding_tx.addOutput(Coin.SATOSHI.multiply(10000), new Script(funding_spk));\n\n// Give the funding transaction back to the channel manager.\nbyte[] chan_id = ((Event.FundingGenerationReady) events[0]).temporary_channel_id;\nchannel_manager.funding_transaction_generated(chan_id, OutPoint.constructor_new(\n    funding_tx.getTxId().getReversedBytes(), (short) 0));\n\n// Ensure that the funding transaction is then broadcasted.\nnio_peer_handler.check_events();\nevents = channel_manager_events.get_and_clear_pending_events();\nassert events.length == 1;\nassert events[0] instanceof Event.FundingBroadcastSafe;\nassert ((Event.FundingBroadcastSafe) events[0]).user_channel_id == 42;\n\n// Wait until a few blocks are mined, and then the channel is now open\n")))}l.isMDXComponent=!0},89:function(e,n,t){"use strict";t.d(n,"a",(function(){return d})),t.d(n,"b",(function(){return f}));var r=t(0),a=t.n(r);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var u=a.a.createContext({}),l=function(e){var n=a.a.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},d=function(e){var n=l(e.components);return a.a.createElement(u.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},h=a.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=l(t),h=r,f=d["".concat(o,".").concat(h)]||d[h]||p[h]||i;return t?a.a.createElement(f,s(s({ref:n},u),{},{components:t})):a.a.createElement(f,s({ref:n},u))}));function f(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,o=new Array(i);o[0]=h;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var u=2;u<i;u++)o[u]=t[u];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,t)}h.displayName="MDXCreateElement"}}]);