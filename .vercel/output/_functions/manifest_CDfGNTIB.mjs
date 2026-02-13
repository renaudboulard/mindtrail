import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_DRRAQrBC.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Ca8aWcK7.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/renaud/Documents/workspace/mindtrailweb/","cacheDir":"file:///Users/renaud/Documents/workspace/mindtrailweb/node_modules/.astro/","outDir":"file:///Users/renaud/Documents/workspace/mindtrailweb/dist/","srcDir":"file:///Users/renaud/Documents/workspace/mindtrailweb/src/","publicDir":"file:///Users/renaud/Documents/workspace/mindtrailweb/public/","buildClientDir":"file:///Users/renaud/Documents/workspace/mindtrailweb/dist/client/","buildServerDir":"file:///Users/renaud/Documents/workspace/mindtrailweb/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/access.vHL8V6uU.css"}],"routeData":{"route":"/access","isIndex":false,"type":"page","pattern":"^\\/access\\/?$","segments":[[{"content":"access","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/access.astro","pathname":"/access","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/get-audio-url","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/get-audio-url\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"get-audio-url","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/get-audio-url.ts","pathname":"/api/get-audio-url","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/verify-purchase","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/verify-purchase\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"verify-purchase","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/verify-purchase.ts","pathname":"/api/verify-purchase","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/access.vHL8V6uU.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/renaud/Documents/workspace/mindtrailweb/src/pages/access.astro",{"propagation":"none","containsHead":true}],["/Users/renaud/Documents/workspace/mindtrailweb/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/access@_@astro":"pages/access.astro.mjs","\u0000@astro-page:src/pages/api/get-audio-url@_@ts":"pages/api/get-audio-url.astro.mjs","\u0000@astro-page:src/pages/api/verify-purchase@_@ts":"pages/api/verify-purchase.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CDfGNTIB.mjs","/Users/renaud/Documents/workspace/mindtrailweb/node_modules/astro/dist/assets/services/noop.js":"chunks/noop_Cue__CUw.mjs","/Users/renaud/Documents/workspace/mindtrailweb/src/components/SessionPlayer":"_astro/SessionPlayer.Dtp89ThE.js","/Users/renaud/Documents/workspace/mindtrailweb/src/components/TrainingProgramme":"_astro/TrainingProgramme.BL3f_BWi.js","/Users/renaud/Documents/workspace/mindtrailweb/src/components/AudioDemoPlayer":"_astro/AudioDemoPlayer.DKLz1ZJU.js","@astrojs/react/client.js":"_astro/client.Dc9Vh3na.js","/Users/renaud/Documents/workspace/mindtrailweb/src/pages/access.astro?astro&type=script&index=0&lang.ts":"_astro/access.astro_astro_type_script_index_0_lang._TCgcqbo.js","/Users/renaud/Documents/workspace/mindtrailweb/src/components/PricingCard.astro?astro&type=script&index=0&lang.ts":"_astro/PricingCard.astro_astro_type_script_index_0_lang.Cs_vuvzz.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/renaud/Documents/workspace/mindtrailweb/src/pages/access.astro?astro&type=script&index=0&lang.ts","const a=document.getElementById(\"verify-section\"),s=document.getElementById(\"content-section\"),c=document.getElementById(\"verify-form\"),r=document.getElementById(\"email-input\"),e=document.getElementById(\"verify-error\"),l=document.getElementById(\"user-email\"),m=document.getElementById(\"logout-btn\"),o=localStorage.getItem(\"mindtrail_email\");o&&d(o);c.addEventListener(\"submit\",async t=>{t.preventDefault(),e.classList.add(\"hidden\");const n=r.value.trim();try{const i=await(await fetch(\"/api/verify-purchase\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({email:n})})).json();i.verified?(localStorage.setItem(\"mindtrail_email\",n),d(n)):(e.textContent=i.error||\"No purchase found for this email. Please check the email you used at checkout.\",e.classList.remove(\"hidden\"))}catch{e.textContent=\"Something went wrong. Please try again.\",e.classList.remove(\"hidden\")}});m.addEventListener(\"click\",()=>{localStorage.removeItem(\"mindtrail_email\"),a.classList.remove(\"hidden\"),s.classList.add(\"hidden\")});function d(t){a.classList.add(\"hidden\"),s.classList.remove(\"hidden\"),l.textContent=t,window.dispatchEvent(new CustomEvent(\"mindtrail:auth\",{detail:{email:t}}))}"],["/Users/renaud/Documents/workspace/mindtrailweb/src/components/PricingCard.astro?astro&type=script&index=0&lang.ts","document.getElementById(\"checkout-button\")?.addEventListener(\"click\",()=>{{window.location.href=\"/access\";return}});"]],"assets":["/_astro/access.vHL8V6uU.css","/favicon.ico","/favicon.svg","/_astro/AudioDemoPlayer.DKLz1ZJU.js","/_astro/SessionPlayer.Dtp89ThE.js","/_astro/TrainingProgramme.BL3f_BWi.js","/_astro/client.Dc9Vh3na.js","/_astro/index.DiEladB3.js","/_astro/jsx-runtime.D_zvdyIk.js","/images/hero-trail.jpg"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"b0ecB5WR8C36ui/xHABvYYbvoYikplrChki2ZgfpbTM="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
