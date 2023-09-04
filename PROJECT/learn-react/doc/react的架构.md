## React 架构

## React15

CPU 瓶颈，js 单个任务执行时间过长

```javascript
const n = 10 ** 7;
for (let i = 0; i < n; i++) {
  console.log(i);
}
```

主线程卡死，界面无法 render 进行更新，因此推出了任务分片

```javascript
const n = 10 ** 7;

function deal(n) {
  for (let i = 0; i < 50; i++) {
    console.log(i);
  }
  if(n - 50 > 0) {
    setTimeout(() => {
      deal(n-50)
    } n)
  }
}

deal(n)
```

老的架构

- Reconciler（协调器），前后的 DOM 树进行对比，找出需要更新的 DOM 节点（递归）=> 丢给 Renderer
- Renderer（渲染器）=> 具体当前平台如何更新 DOM 的实现

## React16

添加了 Scheduler 调度器，调度任务的优先级，搞任务优先进入 Reconciler

- setState 更新触发 Scheduler（微任务中遍历当前的任务队列数组）
- 任务可以被中断，完成所有中断任务之后，调用一次 Reconciler

任务在执行的过程中为什么不会被其他任务打断，打断是怎么打断的，打断之后怎么恢复

queue 实现了等待所有节点完成之后才渲染的条件

## Fiber 架构原理

双缓存，current Fiber | workInProgress Fiber

// 对于每个子节点都满足这样的关系
currentFiber.alternate === workInProgressFiber
workInProgressFiber.alternate === currentFiber

rootFiber

App.current => 某棵树的 rootFiber
然后完成 Renderer 对 App.current 递归进行渲染

FiberRootNode.current => rootFiber

Fiber 节点调用 beginWork 方法，根据 Fiber 节点创建对应的子节点，并将两个 Fiber 节点连接起来，=> child、return 指针（兄弟之间还有 silber），
没有子节点了就会谁来，调用 cgompleteWork 方法，处理 Fiber 节点 =》 兄弟节点开始

后序遍历，创建所有的子 Fiber

## beginWork

current、workInProcess，
可以通过 current === null，那么区分组件是 mount 和 update

- 如果 current 存在，在满足一定条件的时候可以复用 current，克隆 current => workInProcess 实现快速创建
- 如果 current 不存在，根据 fiber.tag 创建不同的类型子 Fiber 节点

具体怎么创建的子节点呢？reconcileChildren

- mount 节点创建新的 Fiber 节点
- 对于 update 节点，对比新旧机电 Diff 算法，将比较的结果生成新的 Fiber 节点
  workInProgress.child => mountChildFibers | reconcileChildFibers

最终会返回 Fiber 节点，作为 beiginWork 的返回值，和下一次 performUnitOfWork 的参数

## effectTag

render 完成之后是在内存进行的，完成之后需要通知 Renderer 需要执行那些 DOM 操作？
DOM 怎么来的，每个 Fiber 保存什么更新操作，怎么标记，标记完成之后 Renderer 怎么处理的 Render，

mount 时，支队 rootFiber 复制一次 Placement effectTag，那么只对全部节点插入一次
update 的时候，对每个节点标记 EffectTag

## completeWork

- update 的时候，更新所有的值
- 为 Fiber 节点生成对应的 DOM 节点，将子孙的 DOM 节点插入刚生成的 DOM 节点
- updateComponent 处理 props

## 总结

注意一个 Fiber 就是一个节点，原生的节点有原生的 HostComponent，组件节点有组件 Component

Efflist 是一个链表队列，保存了所有需要更新的 Fiber

## commit 阶段
