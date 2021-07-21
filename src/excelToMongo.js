const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/apphive';
const XLSX = require('xlsx')
const excel = XLSX.readFile(
    'src/InputExcelFile/excel.xlsx', { cellDates: true }
);


const hojasExcel = excel.SheetNames;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) {
        console.log('error al crear la bd ' + err)
        throw err;
    }
    const dbo = db.db('apphive');

    for (let i = 0; i < hojasExcel.length; i++) {
        nameSheet = hojasExcel[i]
        contentSheet = XLSX.utils.sheet_to_json(excel.Sheets[nameSheet]);
        //console.log(nameSheet)
        
            dbo.collection(nameSheet).insertMany(contentSheet, (err, res) => {
                if (err) {
                    console.log('error al insertar ' + err)
                    throw err;
                }
                console.log('Number of documents inserteed: ' + res.insertedCount);
                db.close();
            })
        }
    })
    return