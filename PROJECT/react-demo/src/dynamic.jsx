import React from "react";
const { lazy } = React;
const LazyQ = lazy(() => import("./components/lazyComponent1"));

export default function DynamicApp() {
  return <div>DynamicApp <LazyQ /></div>;
}
