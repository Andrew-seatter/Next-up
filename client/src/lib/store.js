import { atom, useAtom } from 'jotai'
// https://jotai.org/docs/core/store

const store = atom({
    activeJob: null,
    // specific job chosen to edit 
    editModalIsOpen: false
    //boolean that will tell us whether the modal is open or not
})

function useStore() {
    return useAtom(store)
}

function updateStore(setStore, key, value) {
    setStore(currentStore => {
        currentStore[key] = value
        return {...currentStore}
    })
}


export {
    useStore,
    updateStore
}