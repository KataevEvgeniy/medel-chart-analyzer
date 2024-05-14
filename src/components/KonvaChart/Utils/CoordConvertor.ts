

export const priceToCoords = (price:number,priceStep:number):number =>{
    let y = price * priceStep

    return y
}

export const coordsToPrice = (y:number,priceStep:number):number =>{
    let price = y / priceStep
    return price
}