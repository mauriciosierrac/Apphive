
const XLSX = require('xlsx')
const excel = XLSX.readFile(
    'src/InputExcelFile/excel.xlsx', { cellDates: true }
);


const hojasExcel = excel.SheetNames;
let datosMain = XLSX.utils.sheet_to_json(excel.Sheets[hojasExcel[0]]);


let resObj = {}
datosMain.forEach(storage => {
    const storageId = storage.id;
    resObj[storageId] = {};
    delete storage.id
    Object.assign(resObj[storageId], storage)
})



for (let i = 1; i < hojasExcel.length; i++) {
    let sheet = XLSX.utils.sheet_to_json(excel.Sheets[hojasExcel[i]])
    for (const id in resObj) {
        const fil = sheet.filter(element => element.mainId === id)
        if (fil.length != 0) {
            resObj[id][hojasExcel[i]] = {}
            fil.forEach(row => {
                const rowId = row.id
                resObj[id][hojasExcel[i]][rowId] = {}
                delete row.mainId
                delete row.id
                Object.assign(resObj[id][hojasExcel[i]][rowId], row)
            })
        }

    }

}
const data = JSON.stringify(resObj)
console.log(data)