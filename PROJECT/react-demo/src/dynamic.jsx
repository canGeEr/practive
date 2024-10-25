import React from "react";
const { lazy } = React;
const Lazy1 = lazy(() => import("./components/LazyComponent1"));
const Lazy2 = lazy(() => import("./components/LazyComponent2"));
const Lazy3 = lazy(() => import("./components/LazyComponent3"));
const Lazy4 = lazy(() => import("./components/LazyComponent4"));
const Lazy5 = lazy(() => import("./components/LazyComponent5"));
const Lazy6 = lazy(() => import("./components/LazyComponent6"));
const Lazy7 = lazy(() => import("./components/LazyComponent7"));
const Lazy8 = lazy(() => import("./components/LazyComponent8"));
const Lazy9 = lazy(() => import("./components/LazyComponent9"));
const Lazy10 = lazy(() => import("./components/LazyComponent10"));

export default function DynamicApp() {
  return (
    <div>
      DynamicApp
				<Lazy1 />
				<Lazy2 />
				<Lazy3 />
				<Lazy4 />
				<Lazy5 />
				<Lazy6 />
				<Lazy7 />
				<Lazy8 />
				<Lazy9 />
				<Lazy10 />
    </div>
  );
}
