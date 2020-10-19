const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection)

      for (let idx = 0; idx < newCollection.length; idx++)
        callback(newCollection[idx])

      return collection
    },

    map: function(collection, callback) {
      const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection)
      const arr = []
      for (let idx = 0; idx < newCollection.length; idx++){
        let result = callback(newCollection[idx])
        arr.push(result)
      }

      return arr
    },

    reduce: function(collection, callback, acc) {
      let newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection)

      if(!acc){
        acc = newCollection[0]
        newCollection = newCollection.slice(1)
      }

      for (let idx = 0; idx < newCollection.length; idx++){
        acc = callback(acc, newCollection[idx], newCollection)
      }

      return acc
    },

    find: function(collection, callback) {
      let newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection)
      for (let idx = 0; idx < newCollection.length; idx++){
        if(callback(newCollection[idx])) return newCollection[idx]
      }

      return undefined
    },

    filter: function(collection, callback) {
      let newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection)
      let arr = []
      for (let idx = 0; idx < newCollection.length; idx++){
        if(callback(newCollection[idx])) arr.push(newCollection[idx])
      }

      return arr
    },

    size: function(collection) {
      let newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection)
      return newCollection.length
    },

    first: function(collection, stop=false) {
      return (stop) ? collection.slice(0, stop) : collection[0]
    },

    last: function(collection, start=false) {
      return (start) ? collection.slice(-1 * start) : collection.slice(-1)[0]
    },

    compact: function(collection) {
      const badBad = new Set([false, null, 0, "", undefined, NaN])
      return collection.filter(el => !badBad.has(el))
    },

    sortBy: function(collection, callback) {
      const newArr = [...collection]
      return newArr.sort(function(a,b){
        return callback(a) - callback(b)
      })
    },

    flatten: function(collection, shallow, newArr=[]) {
      if (!Array.isArray(collection)) return newArr.push(collection)
      if (shallow) {
        for (let val of collection)
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
        for (let val of collection) {
          this.flatten(val, false, newArr)
        }
      }
      return newArr
    },

    uniq: function(collection, sorted=false, iteratee=false){
      if (sorted) {
          return fi.uniqSorted(collection, iteratee)
        } else if (!iteratee) {
          return Array.from(new Set(collection))
        } else {
          const modifiedVals = new Set()
          const uniqVals = new Set()
          for (let val of collection) {
            const moddedVal = iteratee(val)
            if (!modifiedVals.has(moddedVal)) {
              modifiedVals.add(moddedVal)
              uniqVals.add(val)
            }
          }
          return Array.from(uniqVals)
        }
    },

    keys: function(obj){
      const keys = []
      for (let key in obj){
        keys.push(key)
      }
      return keys
    },

    values: function(obj){
      const values = []
      for (let key in obj){
        values.push(obj[key])
      }
      return values
    },

    functions: function(obj){
      const functionNames = []

      for (let key in obj) {
        if (typeof obj[key] === "function"){
          functionNames.push(key)
        }
      }

      return functionNames.sort()
    }

  }
})()

fi.libraryMethod()
