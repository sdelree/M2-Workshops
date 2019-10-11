let inMemoryWorkshop = [];


function getWorkshopList() {
  return new Promise((resolve, ) => {
    resolve(inMemoryWorkshop);
  });
}

function getWorkshopByName(name) {
  return new Promise((resolve, reject) => {
    if (!name) {
      reject(new Error('name parameter is required'));
    }
    resolve(inMemoryWorkshop.find((workshop) => workshop.name === name));
  });
}

function addWorkshop(name, description) {
  return new Promise((resolve, reject) => {
    if (!name) {
      reject(new Error('Workshop name required'));
    }
    if (!description) {
      reject(new Error('Workshop description required'));
    }
    inMemoryWorkshop.push({
      name,
      description
    });
    resolve();
  });
}

function removeWorkshopByName(name) {
  return new Promise((resolve, reject) => {
    reject(new Error('Not implemented'));
  });
}

function updateWorkshop(originalName, {name, description}) {
  return new Promise((resolve, reject) => {
    if (!originalName) {
      reject(new Error('Workshop name required'));
    }
    inMemoryWorkshop = inMemoryWorkshop.map(
        (workshop) => workshop.name === originalName ? {
          name: name || workshop.name,
          description: description || workshop.description
        } : workshop
    );
    resolve();
  });
}

module.exports = {
  getWorkshopList,
  getWorkshopByName,
  addWorkshop,
  removeWorkshopByName,
  updateWorkshop
};
