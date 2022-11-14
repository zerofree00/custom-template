// type MapValue<K, T> = Iterable<readonly [K, T]>
const bus:Map<string, Array<any>> = new Map()
const $emit = function (name:string, val:any = '') {
  const arr = bus.get(name) || []
  arr.forEach(e => {
    e(val)
  })
}

const $on = function (name:string, fn:(val:any)=>{}) {
  if (bus.has(name)) {
    bus.get(name)!.push(fn)
  } else {
    bus.set(name, [fn])
  }
}

export {
  $on,
  $emit
}
