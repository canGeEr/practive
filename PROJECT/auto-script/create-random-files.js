const path = require("path");
const fs = require("fs/promises");
const targetProjectPath = process.cwd();
const targetProjectComponentPath = path.resolve(
  targetProjectPath,
  "./src/components"
);

function createLazyComponentFiles(count = 100) {
  new Array(count).fill(0).forEach((_, index) => {
    const item = index + 1;
    fs.writeFile(
      path.resolve(targetProjectComponentPath, `./LazyComponent${item}.jsx`),
      `import React from "react";
import { Button } from 'antd'

export default function LazyComponent${item}() {
  return <div id="lazy-component-${item}">LazyComponent${item}<Button /></div>;
}
`
    );
  });
  return count;
}

function createDynamicFile(count) {
    const arr = new Array(count).fill(0)
  fs.writeFile(
    path.resolve(targetProjectComponentPath, `../dynamic.jsx`),
    `import React from "react";
const { lazy } = React;
${arr.map((_, index) => {
    const item = index + 1;
    return `const Lazy${item} = lazy(() => import("./components/LazyComponent${item}"));`
}).join('\n')}

export default function DynamicApp() {
  return (
    <div>
      DynamicApp
${arr.map((_, index) => {
        const item = index + 1;
        return `\t\t\t\t<Lazy${item} />`
    }).join('\n')}
    </div>
  );
}
`
  );
}

createDynamicFile(createLazyComponentFiles(10));
