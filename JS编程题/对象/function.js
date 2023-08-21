function getThis() {
  const that = this;
  return () => {
    console.log(this === that, this);
  };
}

const a = {
  getThis,
};

a.getThis()();
