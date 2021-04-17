import store from "../index";

export const increment = () => {
  return {
    type: "INCREMENT",
  };
};
export const decrement = () => {
  return {
    type: "DECREMENT",
  };
};

export const viewlist = () => {
  return {
    type: "LISTVIEW",
  };
};
export const viewgrid = () => {
  return {
    type: "GRIDVIEW",
  };
};

export const dataLoad = (data) => {
  const state = store.getState();
  const root = {
    name: "root",
    type: "folder",
    children: [{ ...data[0] }],
    counter: 0,
  };

  state.active = {
    name: "root",
    type: "folder",
    children: [...data],
    counter: 0,
  };
  // breadcrumb
  addCrumb(state.active.name);
  return {
    type: "LOADDATA",
    payload: state.active,
  };
};

const getForwarData = (name, counter, nodeData) => {
  if (nodeData.name == name && nodeData.counter == counter) {
    if (nodeData.hasOwnProperty("children") && nodeData.type == "folder") {
      return nodeData;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const goforward = (name) => {
  const state = store.getState();
  const data = state.data;

  state.active = breadthFirst(
    data,
    getForwarData.bind(this, name, state.active.counter + 1)
  );

  // breadcrumb
  addCrumb(name);

  return {
    type: "GOFORWARD",
    payload: { ...data },
  };
};

const getBackwardData = (name, counter, nodeData) => {
  if (nodeData.name == name && nodeData.counter == counter) {
    return nodeData;
  } else {
    return false;
  }
};

export const goBackward = () => {
  const state = store.getState();
  let data = state.data;

  if (state.crumb > 1) state.crumb.pop();

  if (state.active.hasOwnProperty("parent"))
    state.active = breadthFirst(
      data,
      getBackwardData.bind(this, state.active.parent, state.active.counter - 1)
    );

  if (state.crumb.length > 1) state.crumb.pop();
  return {
    type: "GOBACKWARD",
    payload: { ...data },
  };
};

export const goBackCustom = (payload) => {
  const state = store.getState();
  let data = state.data;

  state.active = breadthFirst(
    data,
    getBackwardData.bind(this, payload.name, payload.idx)
  );

  state.crumb = state.crumb.slice(0, payload.idx + 1);

  return {
    type: "REMOVECRUMB",
    payload: ["root"],
  };
};

export const addCrumb = (payload) => {
  const state = store.getState();
  var temp = state.crumb.push(payload);

  return {
    type: "ADDCRUMB",
    payload: state.crumb,
  };
};

export const removeCrumb = (payload) => {
  const state = store.getState();

  if (state.crumb.length > 1) state.crumb.pop();

  return {
    type: "REMOVECRUMB",
    payload: state.crumb,
  };
};

export const newFolder = (name) => {
  const state = store.getState();
  let data = state.data;

  if (name.trim() != "") {
    var filteredData = state.active.children.filter(function (d) {
      return d.name == name;
    });

    if (filteredData.length == 0) {
      state.active.children.push({
        type: "folder",
        name: name,
        children: [],
        parent: state.active.name,
      });
    } else {
      alert("Item with similar name already exists!");
    }
  } else {
    alert("Folder needs a valid name!");
  }

  return {
    type: "NEWFOLDER",
    payload: { ...data },
  };
};

export const deleteFolder = (payload) => {
  const state = store.getState();
  let data = state.data;
  var filteredData = state.active.children.filter(function (d) {
    return d.name == payload.name && d.counter == payload.counter;
  });

  var itemIndex = 0;
  for (var i = 0; i < state.active.children.length; i++) {
    if (
      state.active.children[i].name == payload.name &&
      state.active.children[i].counter == payload.counter
    ) {
      itemIndex = i;
      break;
    }
  }

  if (filteredData.length) {
    state.active.children.splice(itemIndex, 1);
  }

  return {
    type: "DELETEITEM",
    payload: { ...data },
  };
};

const breadthFirst = (startingNode, callback) => {
  let queue = [startingNode];

  while (queue.length) {
    const node = queue.shift();

    if (callback) {
      let obj = callback(node);
      if (obj != false) return obj;
    }

    if (node.hasOwnProperty("children")) {
      for (var i = 0; i < node.children.length; i++) {
        node.children[i].parent = node.name;
        node.children[i].counter = node.counter + 1;
      }
      queue.push(...node.children);
    }
  }
};
