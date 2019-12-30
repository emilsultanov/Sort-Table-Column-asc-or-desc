
const data = [
   {
      "no": 17,
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
      "no": 58,
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
      "no": 18,
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
      "no": 27,
      "fullName": "Jerry",
      "position": "DL",
      "match": 2,
      "goal": 0,
      "assist": 1,
      "yellowCard": 3,
      "doubleYellowCard": 4,
      "redCard": 5
   }
];




function loadTableContent(filteredData) {
   let table = filteredData.map((item) => {
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
}
loadTableContent(data);


let filterTitles = document.querySelectorAll('[data-filter-value]');
filterTitles.forEach((title) => {
   title.addEventListener('click', filterColumn);
});

let filterType = 'asc';
function filterColumn(e) {
   sort__array(data, e.target.dataset.filterValue, filterType);
   let lastActiveElements = document.querySelectorAll('th[data-filter-value]');
   lastActiveElements.forEach((element) => {
      element.classList.remove('activeTitle');
   });
   e.target.classList.add('activeTitle');
};

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







