const arr = [{id: 1}, {id: 2},{id: 1},{id: 3},{id: 4}]
//remvove duplicate element
//expected output: arr = [{id: 1}, {id: 2},{id: 3},{id: 4}]

arr.forEach((a,b)=>{
    const c= arr.find(i=>i.id===a.id)
    if(c!==b){
        arr.splice(1,b);
    }
})









const arr1 = [{id: 1, value: 2}, {id: 2, value: 3}, {id: 5, value: 4}, {id: 2, value: 3}]

arr1.forEach((item, index) => {
  const idx = arr1.findIndex(i => i.id === item.id)
  console.log('idx', idx)
  if(idx !== index){
    console.log("This is dupplicate", item)
  }
})