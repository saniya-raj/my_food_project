function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "See more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "See less";
      moreText.style.display = "inline";
    }
  }

// here starts the backend code syntax for taking orders 
$(document).ready(function () {
    show_food();
});
function show_food() {
    $('#food-list').empty();
    $.ajax({
        type: "GET",
        url: "/food_project",
        data: {},
        success: function (response) {
            let rows = response['foods'];
            for (let i = 0; i < rows.length; i++) {
                let food = rows[i]['food'];
                let num = rows[i]['num'];
                let done = rows[i]['done'];
                let temp_html = '';
                if (done === 0) {
                    temp_html = `
<li>
    <h2 class="new_ele"> ${food}</h2>
    <button onclick="done_food(${num})" type="button" class="btn btn-outline-primary">Done!</button>
    <button onclick="delete_food(${num})" type="button" class="btn btn-outline-danger">Delete!</button>
</li>
                    `;
                } else {
                    temp_html = `
<li>
    <h2 class="done new_ele"> ${food}</h2>
    <button onclick="delete_food(${num})" type="button" class="btn btn-outline-danger">Delete!</button>
</li>
                    `;
                }
                $('#food-list').append(temp_html);
            }
        }
    });
}
function save_food() {
    let food = $('#food').val();
    $.ajax({
        type: "POST",
        url: "/food_project",
        data: {food_give: food},
        success: function (response) {
            alert(response["msg"])
            window.location.reload();
        }
    });
}
function done_food(num) {
    $.ajax({
        type: "POST",
        url: "/food_project/done",
        data: { num_give: num },
        success: function (response) {
            alert(response["msg"]);
            window.location.reload();
        }
    });
}
function delete_food(num) {
    $.ajax({
        type: "POST",
        url: "/delete",
        data: { num_give: num },
        success: function (response) {
            alert(response["msg"]);
            window.location.reload();
        }
    });
}
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

