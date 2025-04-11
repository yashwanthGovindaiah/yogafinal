/*====1)StatusCode==========*/
const Status = Object.freeze({
    SUCCESS_CODE: 200,
    CREATED_CODE: 201,
    NOT_FOUND_CODE: 404,
    EXCEEDED_CODE: 409,
    PARTIAL_CONTENT_CODE: 406,
    UNAUTHORIZED_ACCESS_CODE: 401,
    ALREADY_USING_CODE: 208,
    ALREADY_EXIST_CODE: 409,
});



/*====StatusCode END==========*/

/*  === 2) Toast Message === */
const MessageType = Object.freeze({
    NORMAL: 1,
    SUCCESS: 2,
    FAILED: 3,
    WARNING: 4
});

function showToast(message, messageType, duration = 2000) {
    var toastCont;
    if (MessageType.FAILED == messageType) {
        document.querySelector('.failed-toast-body').textContent = message;
        toastCont = document.getElementById('failedToast');

    }
    else {
        document.querySelector('.normal-toast-body').textContent = message;
        toastCont = document.getElementById('normalToast');
    }

    var toast = new bootstrap.Toast(toastCont);
    toast.show();
    setTimeout(function () {
        toast.hide();
    }, duration);
}
/*  === Toast Message End === */

/*=====Selected Option*/
// Check empty val
function isEmpty(val) {
    return (!val || val.length == 0);
}

// empty array
Array.prototype.clear = function () {
    while (this.length > 0) {
        this.pop();
    }
};

/**
 * Summary. (Choose option by passing a value)
* @param {string} value Value to be selected.
* @returns {boolean} Return if given value is selected or not.
*/
HTMLSelectElement.prototype.selectOption = function (value) {
    var isSelected = false;
    for (var index = 0; index < this.options.length; index++) {
        var option = this.options[index];
        if (option.value == value) {
            this.selectedIndex = index;
            isSelected = true;
            break;
        }
    }
    if (!isSelected && this.options.length > 0) {
        this.selectedIndex = 0;
    }
    return isSelected;
};


/**
 * Summary. (Get selected option value)
* @returns {boolean} Return selected option value.
*/
HTMLSelectElement.prototype.selectedValue = function () {
    var selectedVal = '';
    if (this.selectedOptions.length > 0)
        selectedVal = this.selectedOptions[0].value;
    return selectedVal;
};



HTMLSelectElement.prototype.loadData = function (val = {
    array: [], optionLabel: "Choose", valueKey: "", textKey: "", selectedValue: ''
}) {
    if (!val.optionLabel)
        val.optionLabel = 'Choose';
    if (!val.valueKey)
        val.valueKey = '';
    if (!val.textKey)
        val.textKey = '';
    if (!val.selectedValue)
        val.selectedValue = '';

    var options = `<option>${val.optionLabel}</option>`;
    var selectedIndex = 0;
    if (val.array != null) {

        for (var index = 0; index < val.array.length; index++) {
            var data = val.array[index];
            options += `<option value="${data[val.valueKey]}">${data[val.textKey]}</option>`;
            if (data[val.valueKey] == val.selectedValue) {
                selectedIndex = index + 1;
            }
        }
    }

    this.innerHTML = options;
    this.selectedIndex = selectedIndex;
}

HTMLTableElement.prototype.processTableRowEmpty = function (message = "Records not found") {
    var trArray = this.querySelectorAll('tbody > tr');
    if (trArray.length > 0) {
        var emptyRow = this.querySelector('.empty-row');
        if (emptyRow)
            emptyRow.remove();
    }
    else {
        var cellCount = this.tHead.rows[0].cells.length;
        this.querySelector('tbody').insertAdjacentHTML('beforeend', `<tr class="empty-row">
                            <td class="text-center" colspan="${cellCount}">${message}</td>
                        </tr>`);
    }
}

HTMLFormElement.prototype.submitForm = function () {
    var btn = document.createElement('button');
    btn.type = 'submit';
    btn.style.display = 'none';

    this.insertAdjacentElement('beforeend', btn);
    btn.click();
}
/*===Selected Option End*/




/*============current Date ============*/

const DateFormat = {
    YYYYMMDD_HHMMSS: 1,
    YYYYMMDD: 2
}
function getCurrentDate(dateFormat = DateFormat.YYYYMMDD, substractDays = 0, addDays = 0) {
    var today = new Date();
    if (substractDays > 0) {
        today.setDate(today.getDate() - substractDays);
    }
    if (addDays > 0) {
        today.setDate(today.getDate() + addDays);
    }
    var year = processDateTimeDigits(today.getFullYear());
    var month = processDateTimeDigits(today.getMonth() + 1);
    var day = processDateTimeDigits(today.getDate());
    var hour = processDateTimeDigits(today.getHours());
    var minutes = processDateTimeDigits(today.getMinutes());
    var seconds = processDateTimeDigits(today.getSeconds());

    switch (dateFormat) {
        case DateFormat.YYYYMMDD_HHMMSS:
            return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
        case DateFormat.YYYYMMDD:
            return year + "-" + month + "-" + day;
        default:
            return day + "-" + month + "-" + year + " " + hour + ":" + minutes + ":" + seconds;
    }
}

function processDateTimeDigits(value) {
    return (value.toString().length < 2 ? '0' : '') + value;
}

/*============current End ============*/

HTMLFormElement.prototype.vaidate = function () {
    if (this.checkValidity()) {
        return true;
    }

    this.classList.add('was-validated');

    const invalidInputs = Array.from(this.querySelectorAll(':invalid, .is-invalid'));    // set up so you can use any custom invalid classes you're adding to your elements, as well
    invalidInputs.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);                      // sort inputs by offset from top of viewport (handles issues with multi-column layouts, where the first element in the markup isn't necessarily the highest on the page)
    invalidInputs[0].scrollIntoView({ block: 'center', behavior: 'smooth' });                                         // scroll first (top) input into center of view, using smooth animation
    return false;
}


class TimerCountDown {
    #duration;
    #callback;
    #startCallback;
    #cancelledCallback;
    #data = { interval: null };

    constructor(options = {
        duration: 1, callback: function (time, minute, second) { }, startCallback: function () { }, cancelledCallback: function () { },
    }) {
        if (options.duration && options.callback) {
            this.#duration = options.duration;
            this.#callback = options.callback;
            this.#startCallback = options.startCallback;
            this.#cancelledCallback = options.cancelledCallback;
        }
    }

    start() {
        this.#startCallback();
        var duration = this.#duration;
        var timer = duration, minutes, seconds;
        var _self = this;
        this.#data.interval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            _self.#callback(minutes + ":" + seconds, minutes, seconds);

            if (--timer < 0) {
                _self.#stop();
                timer = duration;
            }
        }, 1000);
    }
    #stop() {
        clearTimeout(this.#data.interval);
    }
    stop() {
        clearTimeout(this.#data.interval);
        this.#cancelledCallback();
    }

    getDurationInTime() {
        var duration = this.#duration;
        // Hours, minutes and seconds
        const hrs = ~~(duration / 3600);
        const mins = ~~((duration % 3600) / 60);
        const secs = ~~duration % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        let ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;

        return ret;
    }
}

