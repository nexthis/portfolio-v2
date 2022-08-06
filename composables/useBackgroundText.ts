


export const useBackgroundText = (value: string = null) => {
    const state = useState('backgroundText', () => value)
    if(value){
        state.value = value
    }
    return state
}