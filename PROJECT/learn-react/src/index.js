import { createRoot } from "../packages/react-dom/client";
import * as React from '../packages/react'
// import * as React from 'react'
import App from "./App";
// import { createRoot } from 'react-dom/client'

const appEle = document.getElementById("app");

const root = createRoot(appEle);

const appReactElement = <App />

root.render(appReactElement);
