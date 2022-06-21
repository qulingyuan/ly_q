function bubbleSort(arr) {
  if (arr.length <= 1) return;
  for (let i = 0; i < arr.length; i++) {
    let flag = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        flag = true;
      }
    }
    if (!flag) break;
  }
}
const arrTest = [4, 5, 6, 3, 2, 1];
bubbleSort(arrTest);
console.log(arrTest);

function insertionSort(arr) {
  if (arr.length <= 1) return;
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] > arr[i]) {
        let temp = arr[0];
        arr[0] = arr[1];
        arr[1] = temp;
      }
    }
  }
}
