
const data = [
   {
      "no": 1,
      "fullName": "Farid",
      "position": "CMD",
      "age": 29,
      "match": 12,
      "goal": 12,
      "assist": 4,
      "yellowCard": 3,
      "doubleYellowCard": 0,
      "redCard": 2
   },
   {
      "no": 2,
      "fullName": "Emil",
      "position": "GK",
      "match": 34,
      "goal": 1,
      "assist": 17,
      "yellowCard": 8,
      "doubleYellowCard": 3,
      "redCard": 5
   },
   {
      "no": 3,
      "fullName": "Tom",
      "position": "ST",
      "match": 5,
      "goal": 1,
      "assist": 2,
      "yellowCard": 5,
      "doubleYellowCard": 1,
      "redCard": 4
   },
   {
      "no": 4,
      "fullName": "Jerry",
      "position": "DL",
      "match": 2,
      "goal": 0,
      "assist": 1,
      "yellowCard": 3,
      "doubleYellowCard": 4,
      "redCard": 5
   },
   {
      "no": 5,
      "fullName": "Alixandro",
      "position": "ST",
      "match": 5,
      "goal": 1,
      "assist": 2,
      "yellowCard": 5,
      "doubleYellowCard": 1,
      "redCard": 4
   },
   {
      "no": 6,
      "fullName": "Şəmi",
      "position": "ST",
      "match": 5,
      "goal": 1,
      "assist": 2,
      "yellowCard": 5,
      "doubleYellowCard": 1,
      "redCard": 4
   },
   {
      "no": 7,
      "fullName": "Şöşü",
      "position": "ST",
      "match": 5,
      "goal": 1,
      "assist": 2,
      "yellowCard": 5,
      "doubleYellowCard": 1,
      "redCard": 4
   },
   {
      "no": 8,
      "fullName": "Fəlakət",
      "position": "ST",
      "match": 5,
      "goal": 1,
      "assist": 2,
      "yellowCard": 5,
      "doubleYellowCard": 1,
      "redCard": 4
   },
   {
      "no": 9,
      "fullName": "Vilka Şirin",
      "position": "ST",
      "match": 5,
      "goal": 1,
      "assist": 2,
      "yellowCard": 5,
      "doubleYellowCard": 1,
      "redCard": 4
   },
   {
      "no": 10,
      "fullName": "Ağsaqqal",
      "position": "ST",
      "match": 5,
      "goal": 1,
      "assist": 2,
      "yellowCard": 5,
      "doubleYellowCard": 1,
      "redCard": 4
   },
   {
      "no": 11,
      "fullName": "Əzəmət",
      "position": "ST",
      "match": 5,
      "goal": 1,
      "assist": 2,
      "yellowCard": 5,
      "doubleYellowCard": 1,
      "redCard": 4
   },
];

let sliceData;
let filterType = 'asc';
let rowsPerPage = 3;
let pagination__list = document.querySelector('.pagination__list');
let pagination_items_count = Math.ceil(data.length / rowsPerPage);


// Create dnyamic pagination items
for (let i = 1; i <= pagination_items_count; i++) {

   let pagination_item = document.createElement('li');
   let node = document.createTextNode(i);
   pagination_item.appendChild(node);
   pagination_item.classList.add('pagination__item');
   pagination_item.addEventListener('click', pagination__item_handler);
   pagination__list.appendChild(pagination_item);

}
pagination__list.children[0].classList.add('pagination__item_isActive');



// Get index of clicked pagination item
function pagination__item_handler(e) {

   let clickedIndex = Array.from(document.querySelectorAll('.pagination__item')).indexOf(this);
   Array.from(pagination__list.children).forEach(child => child.classList.remove('pagination__item_isActive'));
   this.classList.add('pagination__item_isActive');
   divideData(data, rowsPerPage, clickedIndex);

}



// Slice data for rows per page
function divideData(items, rows_per_page, page) {

   let start = rows_per_page * page;
   let end = start + rows_per_page;
   let partOfData = data.slice(start, end);
   sliceData = partOfData;
   loadTableContent(partOfData);

}
divideData(data, rowsPerPage, 0);


let pagination_btns = Array.from(document.querySelectorAll('[data-pagination-direct]'));
pagination_btns.forEach(btn => btn.addEventListener('click', pagination_btn_handler));

function pagination_btn_handler() {

   let paginationDirect = this.dataset.paginationDirect;

   if (paginationDirect === 'prev') {
      for (let i = 0; i < pagination__list.children.length; i++) {
         if (pagination__list.children[i].classList.contains('pagination__item_isActive') && pagination__list.children[i].previousElementSibling) {
            pagination__list.children[i].classList.remove('pagination__item_isActive');
            pagination__list.children[i].previousElementSibling.classList.add('pagination__item_isActive');
            divideData(data, rowsPerPage, i - 1);
            break;
         }
      }
   }
   else {

      for (let i = 0; i < pagination__list.children.length; i++) {
         if (pagination__list.children[i].classList.contains('pagination__item_isActive') && pagination__list.children[i].nextElementSibling) {
            pagination__list.children[i].classList.remove('pagination__item_isActive');
            pagination__list.children[i].nextElementSibling.classList.add('pagination__item_isActive');
            divideData(data, rowsPerPage, i + 1);
            break;
         }
      }
   }

};


// Update Table Content
function loadTableContent(filteredData) {

   let table = filteredData.map(item => {
      return (
         `<tr>
            <td>${item.no}</td>
            <td>${item.fullName}</td>
            <td>${item.position}</td>
            <td>${item.match}</td>
            <td>${item.goal}</td>
            <td>${item.assist}</td>
            <td>${item.yellowCard}</td>
            <td>${item.doubleYellowCard}</td>
            <td>${item.redCard}</td>
          </tr>`
      );
   });
   document.querySelector('.bodyOfSortableTable').innerHTML = table.join('');

};




// Select Table Title and Add eventlistener
let filterTitles = document.querySelectorAll('[data-filter-value]');
filterTitles.forEach(title => title.addEventListener('click', filterColumn));


function filterColumn(e) {

   sort__array(sliceData, e.target.dataset.filterValue, filterType);
   let lastActiveElements = document.querySelectorAll('th[data-filter-value]');
   lastActiveElements.forEach(element => element.classList.remove('activeTitle'));
   e.target.classList.add('activeTitle');

};


// Sort Table Content
function sort__array(arr, filter, type) {

   if (type == 'asc') {

      for (let i = 0; i < arr.length; i++) {

         for (let j = arr.length - 1; j > i; j--) {

            if (arr[i][filter] > arr[j][filter]) {
               let max = arr[i];
               arr[i] = arr[j];
               arr[j] = max;
            }
         }
      }
      loadTableContent(arr);
      filterType = 'desc';
   }
   else {

      for (let i = 0; i < arr.length; i++) {

         for (let j = arr.length - 1; j > i; j--) {

            if (arr[i][filter] < arr[j][filter]) {
               let min = arr[j];
               arr[j] = arr[i];
               arr[i] = min;
            }
         }
      }
      loadTableContent(arr);
      filterType = 'asc';
   }
};















