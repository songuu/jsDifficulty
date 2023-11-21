interface DataModel {
  name: string;
  age: number;
  address: string;
}

let store: DataModel = {
  name: "",
  age: 0,
  address: "",
};

function updateStore(store: DataModel, payload: Partial<DataModel>): DataModel {
  return {
    ...store,
    ...payload,
  };
}

store = updateStore(store, {
  name: "lpp",
  age: 18,
});

// * 使用Partial作为参数可选