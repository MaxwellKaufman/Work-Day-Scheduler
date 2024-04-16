$(function () {
  function generateTimeBlocks() {
    const container = $("#time-blocks-container");
    const currentHour = dayjs().hour();
    for (let hour = 9; hour <= 17; hour++) {
      const timeBlockHTML = `
        <div id="hour-${hour}" class="row time-block ${
        hour < currentHour
          ? "past"
          : hour === currentHour
          ? "present"
          : "future"
      }">
          <div class="col-2 col-md-1 hour text-center py-3">${
            hour > 12 ? hour - 12 + "PM" : hour + "AM"
          }</div>
          <textarea class="col-8 col-md-10 description" rows="3"></textarea>
          <button class="btn saveBtn col-2 col-md-1" aria-label="save">
            <i class="fas fa-save" aria-hidden="true"></i>
          </button>
        </div>
      `;
      container.append(timeBlockHTML);
      const storedData = localStorage.getItem(`hour-${hour}`);
      if (storedData) {
        $(`#hour-${hour} .description`).val(storedData);
      }
    }
  }

  // Call the function to generate time blocks
  generateTimeBlocks();
});
function updateTime() {
  const now = dayjs();
  $("#currentDay").text(now.format("dddd, MMMM D"));
}

function updateColor() {
  const now = dayjs();
  const Hour = now.hour();
  $(".time-block").each(function () {
    const trueTime = $(this).data("time");
    $(this).toggleClass("past", trueTime < Hour);
    $(this).toggleClass("present", trueTime === Hour);
    $(this).toggleClass("future", trueTime > Hour);
  });
}

function getLocalStorage() {
  $(".time-block").each(function () {
    const id = $(this).attr("id");
    const text = localStorage.getItem(id);
    $(this).children(".description").val(text);
  });
}

function saveToLocalStorage() {
  const time = $(this).parent().attr("id");
  const text = $(this).siblings(".description").val();
  localStorage.setItem(time, text);
}

function pageStart() {
  updateTime();
  updateColor();
  getLocalStorage();
}

$(".saveBtn").on("click", saveToLocalStorage);
$(".saveBtn").on("click", function () {
  const time = $(this).parent().attr("id");
  const text = $(this).siblings(".description").val();
  localStorage.setItem(time, text);
});

pageStart();
setInterval(updateColor, 600000);
