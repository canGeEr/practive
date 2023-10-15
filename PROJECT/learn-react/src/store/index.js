import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const StoreContext = React.createContext(createInitialContextValue());

function createInitialContextValue() {
  return {
    data: {
      value: 0,
    },
    dispatch: () => undefined,
  };
}

function storeReducer(lastValue, { action, payload }) {
  switch (action) {
    case "add": {
      return { value: lastValue.value + payload };
    }
    case "sub": {
      return { value: lastValue.value - payload };
    }
    case "multi": {
      return { value: lastValue.value * payload };
    }
    case "div": {
      return { value: lastValue.value / payload };
    }
  }
  return lastValue;
}

const store = {
  data: createInitialContextValue().data,
  dispatch({ action, payload }) {
    const { data: lastData } = this;
    // 更新数据
    store.data = storeReducer(lastData, { action, payload });
    this.update();
  },
  update() {
    this.callbackList.forEach((callback) => callback());
  },
  callbackList: [],
  subscribe(callback) {
    this.callbackList.push(callback);

    return () => this.unSubscribe(callback);
  },
  unSubscribe(callback) {
    const targetIndex = this.callbackList.findIndex(
      (item) => item === callback
    );
    this.callbackList.splice(targetIndex, 1);
  },
};

const { Provider: StoreProvider } = StoreContext;

function useStoreContext() {
  return useContext(StoreContext);
}

function useSelector(selector) {
  const store = useStoreContext();
  // 数据源
  const storeData = store.data;
  // 异步数据源
  const storeDataRef = useRef();
  // 异步selector
  const selectorRef = useRef();
  // 强制更新
  const [, forceUpdate] = useState(false);

  const selectData = useMemo(() => {
    return selector(storeData);
  }, [storeData]);
  const selectDataRef = useRef();

  const dispatch = useMemo(() => {
    return store.dispatch.bind(store);
  }, []);

  useLayoutEffect(() => {
    storeDataRef.current = storeData;
    selectorRef.current = selector;
    selectDataRef.current = selectData;
  });

  // 向数据源订阅
  useEffect(() => {
    function shouldForceUpdate() {
      const newStoreData = store.data;
      const newSelectData = selectorRef.current(newStoreData);
      if (!Object.is(newSelectData, selectDataRef.current)) {
        // 更新组件
        forceUpdate((value) => !value);
      }
    }

    return store.subscribe(shouldForceUpdate);
  }, []);

  return [selectData, dispatch];
}

export {
  StoreProvider,
  useStoreContext,
  createInitialContextValue,
  storeReducer,
  store,
  useSelector,
};
