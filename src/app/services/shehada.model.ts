export interface Shehada{
    owner:string,
    money:number,
    profit:number,
    startDate:Date,
    endDate:Date,
    type:'1'|'3',
    daysOfProfits:string[],
    profitDates:string[],
    id?:string
}

