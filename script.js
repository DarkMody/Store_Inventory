let name = document.getElementById("name");
let money = document.getElementById("money");
let child = money.children;
let total = document.getElementById("total");
let cnt = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let save = "";
let id = 1;
// To See if I can put the total value or not //
function totalCheck() {
  let sum = 0;
  for (let i = 0; i < child.length - 2; i++) {
    if (child[i].value == "") {
      total.style.backgroundColor = "black";
      total.value = "";
      return;
    } else {
      sum += parseFloat(child[i].value);
    }
  }
  let dis = document.getElementById("discount").value;
  sum -= dis == "" ? 0 : parseFloat(dis);
  total.value = Math.max(sum, 0);
  total.style.backgroundColor = "var(--secondColor)";
}
for (let i = 0; i < child.length - 1; i++) {
  child[i].addEventListener("input", totalCheck);
}

// Create Button Function //
create.onclick = () => {
  if (name.value == "") {
    alert("Enter Name Plz");
  } else if (total.value == "") {
    alert("Enter the prices plz");
  } else if (category.value == "") {
    alert("Enter category plz");
  } else {
    if (cnt.value == "") {
      addTable();
    } else {
      for (let i = 0; i < parseInt(cnt.value); i++) {
        addTable();
      }
    }
    updateLocalStorage();
    // Clear All //
    name.value = "";
    cnt.value = "";
    category.value = "";
    for (let i = 0; i < child.length; i++) {
      child[i].value = "";
      child[i].style.backgroundColor = "black";
    }
    document.getElementById("delete-all").innerHTML = `Delete All (${id - 1})`;
  }
};

// Add The New Data to Table //
function addTable() {
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  td.innerHTML = id++;
  tr.appendChild(td);
  let na = document.createElement("td");
  na.innerHTML = name.value;
  tr.appendChild(na);
  for (let i = 0; i < child.length; i++) {
    let num = document.createElement("td");
    num.innerHTML = child[i].value;
    tr.appendChild(num);
  }
  let cat = document.createElement("td");
  cat.innerHTML = category.value;
  tr.appendChild(cat);
  let del = document.createElement("button");
  del.innerHTML = "Delete";
  del.classList.add("delete");
  let tdDel = document.createElement("td");
  tdDel.appendChild(del);
  tr.appendChild(tdDel);
  let updt = document.createElement("button");
  updt.innerHTML = "Update";
  updt.classList.add("update");
  let tdUpd = document.createElement("td");
  tdUpd.appendChild(updt);
  tr.appendChild(tdUpd);
  document.getElementsByTagName("tbody")[0].appendChild(tr);
  deletion();
  updating();
}

// Delete All //
document.getElementById("delete-all").onclick = () => {
  document.getElementsByTagName("tbody")[0].innerHTML = "";
  document.getElementById("delete-all").innerHTML = "Delete All";
  id = 1;
  document.getElementById("search").value = "";
  updateLocalStorage();
};

// Delete Single Element //
function deletion() {
  Array.from(document.getElementsByClassName("delete")).forEach((ele) => {
    ele.onclick = () => {
      ele.parentElement.parentElement.remove();
      document.getElementById("delete-all").innerHTML =
        id > 2 ? `Delete All (${id - 2})` : `Delete All`;
      id = 1;
      Array.from(document.getElementsByTagName("tbody")[0].children).forEach(
        (ch) => {
          ch.children[0].innerHTML = id++;
        },
      );
      updateLocalStorage();
    };
  });
}

// Search Type //
let searchType = document.getElementById("search-type").children;
let search = document.getElementById("search");
Array.from(searchType).forEach((ele) => {
  ele.addEventListener("click", () => {
    for (let i = 0; i < searchType.length; i++) {
      searchType[i].className = "";
    }
    ele.className = "active";
    search.placeholder = ele.innerHTML;
    search.value = "";
    Array.from(document.getElementsByTagName("tbody")[0].children).forEach(
      (ele) => {
        ele.style.display = "table-row";
      },
    );
  });
});

// Search Algorithm //
search.addEventListener("input", () => {
  let tr = document.getElementsByTagName("tbody")[0].children;
  for (let i = 0; i < tr.length; i++) {
    tr[i].style.display = "table-row";
    let str = tr[i].children[7].innerHTML;
    if (
      document.getElementsByClassName("active")[0].innerHTML.includes("Name")
    ) {
      str = tr[i].children[1].innerHTML;
    }
    str = str.toLowerCase();
    if (!str.includes(search.value.toLowerCase())) tr[i].style.display = "none";
  }
});

// Update Value //
function updating() {
  Array.from(document.getElementsByClassName("update")).forEach((ele) => {
    ele.onclick = () => {
      Array.from(document.getElementsByClassName("update")).forEach((el) => {
        el.parentElement.parentElement.style.backgroundColor = "transparent";
      });
      document.getElementById("create").style.display = "none";
      document.getElementById("upd").style.display = "block";
      cnt.style.visibility = "hidden";
      let p = ele.parentElement.parentElement;
      p.style.backgroundColor = "orange";
      save = p;
      name.value = p.children[1].innerHTML;
      for (let i = 0; i < child.length; i++) {
        child[i].value = parseFloat(p.children[i + 2].innerHTML);
      }
      child[child.length - 1].style.backgroundColor = "var(--secondColor)";
      category.value = p.children[7].innerHTML;
    };
  });
  document.getElementById("upd").onclick = () => {
    if (name.value == "") {
      alert("Enter Name Plz");
    } else if (total.value == "") {
      alert("Enter the prices plz");
    } else if (category.value == "") {
      alert("Enter category plz");
    } else {
      save.children[1].innerHTML = name.value;
      save.children[7].innerHTML = category.value;
      // Reset All //
      save.style.backgroundColor = "transparent";
      name.value = "";
      cnt.value = "";
      category.value = "";
      for (let i = 0; i < child.length; i++) {
        save.children[i + 2].innerHTML = child[i].value;
        child[i].value = "";
        child[i].style.backgroundColor = "black";
      }
      document.getElementById("create").style.display = "block";
      document.getElementById("upd").style.display = "none";
      cnt.style.visibility = "visible";
      updateLocalStorage();
    }
  };
}

// Local Storage For Saving Data //
function updateLocalStorage() {
  localStorage.clear();
  Array.from(document.getElementsByTagName("tbody")[0].children).forEach(
    (ele) => {
      localStorage.setItem(ele.children[0].innerHTML, ele.outerHTML);
    },
  );
  // window.localStorage.setItem("data", JSON.stringify(arr));
}
// Use the Date in localStorage //
for (let i = 1; ; i++) {
  if (localStorage.getItem(i.toString()) !== null) {
    let saved = localStorage.getItem(i.toString());
    document
      .getElementsByTagName("tbody")[0]
      .insertAdjacentHTML("beforeend", saved);
  } else {
    id = i;
    deletion();
    updating();
    document.getElementById("delete-all").innerHTML = `Delete All (${id - 1})`;
    break;
  }
}
