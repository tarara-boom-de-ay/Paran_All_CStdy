// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, getDocs, getDoc, setDoc, doc, deleteDoc, onSnapshot,orderBy,updateDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeS2bGupdBmAUB6ECSwwySQICjU1HLgkE",
  authDomain: "paranfinal.firebaseapp.com",
  projectId: "paranfinal",
  storageBucket: "paranfinal.appspot.com",
  messagingSenderId: "539502701633",
  appId: "1:539502701633:web:a16d3f3510205bdb05aac0",
  measurementId: "G-21RW4W5PTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(app);

const addDataForm = document.getElementById("addDataForm");
let successfulSubmission = false;

// CREATE FUNCTION
addDataForm.addEventListener("submit", async function(e) {
  e.preventDefault();

  var sb = document.getElementById("server_brand").value;
  var ip = document.getElementById("ip_add").value;
  var p = document.getElementById("purpose").value;
  var os = document.getElementById("os").value;
  var sc = document.getElementById("storagecap").value;

  const subserv = collection(db, "servers")
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")} ${String(currentDate.getHours()).padStart(2, "0")}:${String(currentDate.getMinutes()).padStart(2, "0")}`;
  try {
    const newServerRef = await addDoc(subserv, {
      server_brand: sb,
      ip_address: ip,
      purpose: p,
      operating_system: os,
      storage_capacity: sc,
      timestamp: formattedDate
    });
    console.log('Created a new collection: ', newServerRef.id);
    // After successful submission, clear the form fields
    // if (successfulSubmission) {
    //   document.getElementById("server_brand").value = "";
    //   document.getElementById("ip_add").value = "";
    //   document.getElementById("purpose").value = "";
    //   document.getElementById("os").value = "";
    //   document.getElementById("storagecap").value = "";
    // }
    // Fetch the latest data and update the DataTable
    const querySnapshot = await getDocs(queryDesc);
    updateDataTable(querySnapshot);

    Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      title: 'Your Report has been submitted',
    }).then(() => {
      successfulSubmission = true;
      document.getElementById("server_brand").value = "";
      document.getElementById("ip_add").value = "";
      document.getElementById("purpose").value = "";
      document.getElementById("os").value = "";
      document.getElementById("storagecap").value = "";
      var modalElement = document.querySelector('#add_server');
      var modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
    });
  } catch (error) {
    console.log(error);
    Swal.fire(
      'Problem Encountered',
      'There is something wrong, Please try again',
      'error'
    );
  }
  
});
// CREATE FUNCTION END

const table = document.getElementById("tableaddservers");
// get data from firestore
const serverscol = collection(db, "servers");
const queryDesc = query(serverscol, orderBy("timestamp", "desc"));
const tbody = document.getElementById("tbl_visual");

function updateDataTable(querySnapshot) {
  let tableRows = "";

  querySnapshot.forEach((queryDoc) => {
    tableRows += `
        <td>${queryDoc.data().server_brand}</td>
        <td>${queryDoc.data().ip_address}</td>
        <td>${queryDoc.data().purpose}</td>
        <td>${queryDoc.data().operating_system}</td>
        <td>${queryDoc.data().storage_capacity}</td>
        <td>
          <button type="button" class="btn btn-warning btn-sm edit" id="updateBtn"><ion-icon name="create-sharp"></ion-icon></button>

          <button type="button" class="btn btn-danger btn-sm delete" id="deleteBtn" data-id="${queryDoc.id}-delete"><ion-icon name="trash-sharp"></ion-icon></button>
        </td>
      </tr>
    `;

  });

  tbody.innerHTML = tableRows;

  // Add event listeners for delete buttons
  const delBtn = document.querySelectorAll('#deleteBtn');
  delBtn.forEach((button) => {
    button.addEventListener('click', () => {
      const documentId = button.getAttribute('data-id').split('-')[0];
      deleteDocument(documentId, button);
    });
  });

  // Add event listeners for edit buttons
  const updateBtn = document.querySelectorAll('#updateBtn');
  updateBtn.forEach((button) => {
    button.addEventListener('click', () => {
      const row = button.closest('tr');
      const rowData = row.cells;
  
      // Retrieve the data from the row
      const rserv = rowData[0].innerText;
      const rip = rowData[1].innerText;
      const rpurp = rowData[2].innerText;
      const ros = rowData[3].innerText;
      const rsc = rowData[4].innerText;
      const documentId = button.nextElementSibling.getAttribute('data-id').split('-')[0];

      // Populate the modal fields with the retrieved data
      document.getElementById('edt_server_brand').value = rserv;
      document.getElementById('edt_ip_add').value = rip;
      document.getElementById('edt_os').value = ros;
      document.getElementById('edt_storagecap').value = rsc;

      // Set the selected option in the Event dropdown
      const pDropdown = document.getElementById('edt_purpose');
      Array.from(pDropdown.options).forEach((option) => {
        if (option.value === rpurp) {
          option.selected = true;
        }
      });
  
      // Store the documentId in a data attribute on the form
      document.getElementById('addDataForm').dataset.id = documentId;
  
      // Show the modal
      const modalInstance = new bootstrap.Modal(document.getElementById('edit_server'), {});
      modalInstance.show();
    });
  });

    // realtme dtb
if (!$.fn.DataTable.isDataTable('#tableaddservers')) {
  $('#tableaddservers').DataTable();
} else {
  $('#tableaddservers').DataTable().clear().rows.add($(tbody).find('tr')).draw();
}

}//end sa function updateDataTable

onSnapshot(queryDesc, (querySnapshot) => {
  updateDataTable(querySnapshot);
});

  // <----- DELETE FUNCTION ----->
// Function to delete a document from Firestore
const deleteDocument = async (documentId, button) => {
  const result = await Swal.fire({
    title: "Are you sure you want to delete?",
    text: "You cannot retrieve this file",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "No, Cancel",
  });

  if (result.isConfirmed) {
    try {
      await deleteDoc(doc(db, "servers", documentId));
      
      // Remove the row from the DataTable
      const table = $('#tableaddservers').DataTable();
      table.row(button.closest('tr')).remove().draw();
      
      Swal.fire({
        position: 'bottom-end',
        title: "Deleted!",
        text: "The record has been deleted.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error deleting document: ", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while deleting the document",
        icon: "error",
      });
    }
  }
};

// // UPDATE FUNCTION
document.getElementById('editBtn').addEventListener('click', async (event) => {
  event.preventDefault();

  try {
    const server_brand = document.getElementById('edt_server_brand').value;
    const ip_address = document.getElementById('edt_ip_add').value;
    const purpose = document.getElementById('edt_purpose').value;
    const operating_system = document.getElementById('edt_os').value;
    const storage_capacity = document.getElementById('edt_storagecap').value;
    const documentId = document.getElementById('addDataForm').dataset.id;

    // Update the document in Firestore
    await updateDoc(doc(db, "servers", documentId), {
      server_brand: server_brand,
      ip_address: ip_address,
      purpose: purpose,
      operating_system: operating_system,
      storage_capacity: storage_capacity,
    });

    // Update the table row in the DOM
    const row = document.querySelector(`button[data-id="${documentId}-delete"]`).closest('tr');
    row.cells[0].innerText = server_brand;
    row.cells[1].innerText = ip_address;
    row.cells[2].innerText = purpose;
    row.cells[3].innerText = operating_system;
    row.cells[4].innerText = storage_capacity;

    // Hide the modal after the update
    const modalInstance = bootstrap.Modal.getInstance(document.getElementById('edit_server'));
    modalInstance.hide();

    // Display success alert
    Swal.fire({
      position: 'bottom-end',
      icon: "success",
      title: "Success",
      text: "Report updated successfully"
    });

  } catch (error) {
    console.error(error);
  }
}//end of update function
);
// First, you define and initialize your query
const nservers = collection(db, "servers");
const nqueryDesc = query(nservers, orderBy("timestamp", "desc"));

// Then, you get the documents from Firestore using your query
onSnapshot(nservers, (snapshot) => {
    const count = snapshot.size;
    console.log(`Number of documents in collection: ${count}`);
    document.getElementById('scount').textContent = `${count}`;
});

onSnapshot(nservers, (snapshot) => {
  let brands = {};
  snapshot.docs.forEach((doc) => {
      let purpose = doc.data().purpose;
      brands[purpose] = (brands[purpose] || 0) + 1;
  });

  let mostRepetitiveBrand = Object.keys(brands).reduce((a, b) => brands[a] > brands[b] ? a : b);
  document.getElementById('tchoice').textContent = `${mostRepetitiveBrand}`;
});

onSnapshot(nservers, (snapshot) => {
  let sum = 0;
  snapshot.docs.forEach((doc) => {
      let storage_capacity = parseInt(doc.data().storage_capacity, 10); // if storage_capacity is stored as a string
      // let storage_capacity = doc.data().storage_capacity; // if storage_capacity is stored as a number
      sum += storage_capacity;
  });

  console.log(`The sum of storage_capacity is: ${sum}`);
  document.getElementById('scap').textContent = `${sum} TB`;
});

export async function getPurposeData() {
  let chart; // Initialize chart variable outside

  onSnapshot(nservers, async (snapshot) => {
      let data = {};
  
      snapshot.docs.forEach((doc) => {
          let purpose = doc.data().purpose;
          if (data[purpose]) {
              data[purpose] += 1;
          } else {
              data[purpose] = 1;
          }
      });
  
      let chartData = Object.keys(data).map(key => {
          return { name: key, y: data[key] };
      });
  
      // Destroy the existing chart
      if (chart) {
          chart.destroy();
      }
  
      // Recreate the chart
      chart = Highcharts.chart('container', {
          // rest of your chart configuration...
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
            },
            title: {
            text: 'Server Distribution Visualization',
            align: 'left'
            },
            tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
            point: {
                valueSuffix: '%'
            }
            },
            plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                enabled: false
                },
                showInLegend: true
            }
            },
            series: [{
            name: 'Purpose',
            colorByPoint: true,
            data: chartData
            }]
      });
  });
}
