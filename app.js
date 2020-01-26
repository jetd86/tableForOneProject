

let users = [
    {
        "_id": "5d220b10e8265cc978e2586b",
        "isActive": true,
        "balance": 2853.33,
        "age": 20,
        "name": "Buckner Osborne",
        "gender": "male",
        "company": "EMPIRICA",
        "email": "bucknerosborne@empirica.com",
        "phone": "+1 (850) 411-2997",
        "registered": "2018-08-13T04:28:45 -03:00",
        "nestedField": {total: 300}
    },
    {
        "_id": "5d220b10144ef972f6c2b332",
        "isActive": true,
        "balance": 1464.63,
        "age": 38,
        "name": "Rosalie Smith",
        "gender": "female",
        "company": "KATAKANA",
        "email": "rosaliesmith@katakana.com",
        "phone": "+1 (943) 463-2496",
        "registered": "2016-12-09T05:15:34 -02:00",
        "nestedField": {total: 400}
    },
    {
        "_id": "5d220b1083a0494655cdecf6",
        "isActive": false,
        "balance": 2823.39,
        "age": 40,
        "name": "Estrada Davenport",
        "gender": "male",
        "company": "EBIDCO",
        "email": "estradadavenport@ebidco.com",
        "phone": "+1 (890) 461-2088",
        "registered": "2016-03-04T03:36:38 -02:00",
        "nestedField": {total: 200}
    },
    {
        "_id": "7d220b1083a0495455cd3438",
        "isActive": false,
        "balance": 1823.34,
        "age": 42,
        "name": "Gerald Blaviken",
        "gender": "male",
        "company": "Witcher",
        "email": "witcher@ebidco.com",
        "phone": "+1 (777) 461-2083",
        "registered": "2018-03-04T03:36:38 -02:00",
        "nestedField": {total: 500}
    }
];

const tableSchema = {
    index: '#',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    age: 'Age',
    balance: 'Balance',
};

let sortType = null;
let elementsTableSchemaCount = Object.keys(tableSchema).length;

function generateThead(tableSchema) {
        const thead = document.createElement('thead');
        const tr = generateTr(tableSchema, 'th');
        thead.appendChild(tr);
        return thead;
}


function generateTr(tableSchema, tagName = 'td') {
        const tr = document.createElement('tr');
        Object.values(tableSchema).forEach(val => {
             const td = document.createElement(tagName);
             td.textContent = val;
             tr.appendChild(td);
        });

        return tr;
}

//generate tbody
function generateTbody (tableSchema, items){
    const tbody = document.createElement('tbody');

    items.forEach((item, index)=>{
        item.index = index+1;
        const itemSchema = generateItemsSchema(tableSchema, item);
        const tr = generateTr(itemSchema, 'td');
        tbody.appendChild(tr);
    });
    return tbody;
}

function calcSumm() {
    let tr = document.createElement('tr');
    let td = document.createElement('th');
    let tbody = document.querySelector('tbody');

    let totalSumm = users.reduce((acc, element) =>
       acc + parseFloat(element.balance), 0);

    td.textContent = 'Total balance: ' + totalSumm;
    td.style.textAlign = 'right';
    td.setAttribute('colspan', elementsTableSchemaCount);
    tr.appendChild(td);
    return tr;
}

//принимает схему таблицу и item на основе которого
//мы можем выводить нужное количество данных из таблицы
function generateItemsSchema(tableSchema, item) {
        let itemSchema = Object.keys(tableSchema).reduce((acc,key) =>{
            if(key in item){
                acc[key] = item[key];
            }
            return acc;
        }, {});
     return itemSchema;
}


function generateTableTemplate() {
    const table = document.createElement('table');
    table.classList.add('table');
    return table;
}


/*sorting*/
//button
function sortButtonCreate() {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.textContent = 'Sort ';
    button.insertAdjacentHTML("beforeend", "<div id='arrows' class='arrow-left'></div>");
    button.type = 'button';

    return document.querySelector('.container').appendChild(button);
}

//array like object according to tableSchema
function UnSortedTableSchemaArray(tableSchema){
    let result = [];
    users.forEach((element, i) =>{
        let objectBySchema = Object.keys(tableSchema).reduce((acc, key) => {
            if(key in element){
                acc[key] = element[key];
            }
            return acc;
        },{});
        result[i] = objectBySchema;
    });
    return result;
}

function sortedObject (sortType){
     return UnSortedTableSchemaArray(tableSchema).sort((prev,next) => {
         switch(sortType){
           case 'desc': return prev.balance - next.balance; break;
           case 'asc':  return next.balance - prev.balance; break;
         }
     });
 }

sortButtonCreate().addEventListener('click', (e) => {
    const button = document.querySelector('button');
    const table = document.querySelector('table');

    document.querySelector('button div').remove();
    document.querySelector('tbody').remove();
     if(sortType !== 'desc'){
         sortType = 'desc';
         button.insertAdjacentHTML("beforeend", "<div id='arrows' class='arrow-bottom'></div>");
         table.appendChild(generateTbody(tableSchema, sortedObject(sortType)));
         document.querySelector('tbody').appendChild(calcSumm());
     } else if (sortType !== 'asc') {
         sortType = 'asc';
         button.insertAdjacentHTML("beforeend", "<div id='arrows' class='arrow-top'></div>");
         table.appendChild(generateTbody(tableSchema, sortedObject(sortType)));
         document.querySelector('tbody').appendChild(calcSumm());
     }

    return sortedObject(sortType);
});

function initTable(tableSchema, items) {
    const container = document.querySelector('.container');
    const table = generateTableTemplate();
    const header = generateThead(tableSchema);
    const tbody = generateTbody(tableSchema,items);

    table.appendChild(header);
    table.appendChild(tbody);
    container.appendChild(table);
    tbody.appendChild(calcSumm());
}
initTable(tableSchema,users);
