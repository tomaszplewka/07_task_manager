//
// Variables
//
const tableHead = document.querySelector('#table-head');
const tableBody = document.querySelector('#table-body');
//
const monthModeWrapper = document.querySelector('.month-mode-wrapper');
const monthModeMonth = document.querySelector('#month-mode-month');
const monthModeYear = document.querySelector('#month-mode-year');
const lMonthArrow = document.querySelector('#l-month-arrow');
const rMonthArrow = document.querySelector('#r-month-arrow');
const monthModeView = document.querySelector('#month-mode-btn');
//
const weekModeWrapper = document.querySelector('.week-mode-wrapper');
const weekModeContent = document.querySelector('#week-mode-content');
const lWeekArrow = document.querySelector('#l-week-arrow');
const rWeekArrow = document.querySelector('#r-week-arrow');
const weekModeView = document.querySelector('#week-mode-btn');
//
const dayModeWrapper = document.querySelector('.day-mode-wrapper');
const dayModeContent = document.querySelector('#day-mode-content');
const lDayArrow = document.querySelector('#l-day-arrow');
const rDayArrow = document.querySelector('#r-day-arrow');
const dayModeView = document.querySelector('#day-mode-btn');
//
const modeBtns = document.querySelector('#mode-btns');
//
const searchIconPrimary = document.querySelector('#search-icon-primary');
const searchFormWrapper = document.querySelector('#search-form-wrapper');
const searchForm = document.querySelector('.search-form input');
//
const addIconPrimary = document.querySelector('#add-icon-primary');
const addFormWrapper = document.querySelector('#add-form-wrapper');
const addForm = document.querySelector('.add');
//
const pickDate = document.querySelector('#pick-date');
const pickDateFormWrapper = document.querySelector('#pick-date-form-wrapper');
const dateToasts = document.querySelector('.date-toasts');
const pickDateTodayBtn = document.querySelector('#pick-date-today-btn');
const pickDatePickMode = document.querySelector('#pick-date-pick-mode');
//
const welcomeHeader = document.querySelector('#welcome-header');
const leadTodayDate = document.querySelector('#lead-today-date');
const leadTaskNum = document.querySelector('#lead-task-number');
//
const today = new Date();
let currToday = today;
let accountName = '';
let accountTasks = [];
let currFirstDayOfWeek = dateFns.startOfWeek(today);
const mainOptionsBtn = document.querySelector('#main-options-btn');
const months = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
};
const tableHeadMonthMode = tableHead.innerHTML;
const moreOptionsBtn = document.querySelector('#more-options-btn');
const userNavbar = document.querySelector('#user-btn');
//
let arrayTasks = [];
const currWeek = document.querySelector('.current-week');
const currDay = document.querySelector('.current-day');
//
const mainDropMenu = document.querySelector('#main-drop-menu');
const root = document.documentElement;
const themeBtns = document.querySelectorAll('.theme');
//
//
// Utility Functions
//
//
const setTheme = (main, secondary, td, currWeekHover, rowHover, currDay, badge, bg, text) => {
    //
    root.style.setProperty('--theme1-main-color', main);
    root.style.setProperty('--theme1-secondary-color', secondary);
    root.style.setProperty('--theme1-td-color', td);
    root.style.setProperty('--theme1-currweek-hover-color', currWeekHover);
    root.style.setProperty('--theme1-row-hover-color', rowHover);
    root.style.setProperty('--theme1-currday-color', currDay);
    root.style.setProperty('--theme1-badge-color', badge);
    root.style.setProperty('--theme1-bg-color', bg);
    root.style.setProperty('--theme1-text-color', text);
    //
};
//
const loadAccounts = () => {
    let accountNum = 0;
    let accountsArray = [];
    Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('user_')) {
            let accountKey = key.substring(5);
            accountsArray.push(accountKey);
            accountNum++;
        }
    });
    return [accountNum, accountsArray];
};
//
const renderLoginAccounts = (accountNum, accountsArray, loginAccountsList) => {
    if (accountNum) {
        accountsArray.forEach((account) => {
            const li = document.createElement('li');
            li.className =
                'list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2';
            li.id = account;
            //
            const userBtn = document.createElement('i');
            userBtn.className = 'fas fa-user show';
            li.appendChild(userBtn);
            //
            const userRemoveBtn = document.createElement('i');
            userRemoveBtn.className = 'fas fa-user-times hide';
            li.appendChild(userRemoveBtn);
            //
            li.appendChild(document.createTextNode(account));
            //
            const loginBtn = document.createElement('i');
            loginBtn.className = 'fas fa-chevron-right show';
            li.appendChild(loginBtn);
            //
            const loginDeleteBtn = document.createElement('i');
            loginDeleteBtn.className = 'fas fa-times hide';
            li.appendChild(loginDeleteBtn);
            //
            loginAccountsList.appendChild(li);
        });
        //
    } else {
        const li = document.createElement('li');
        li.className = 'list-group-item py-2';
        li.textContent = `No accounts in the database`;
        loginAccountsList.appendChild(li);
    }
    //
    return loginAccountsList;
};
//
const renderListElements = (listStart, listEnd) => {
    Array.from(listStart.children).forEach((li) => {
        Array.from(li.children).forEach((i) => {
            if (i.classList.contains('show')) {
                i.classList.remove('show');
                i.classList.add('hide');
            } else {
                i.classList.remove('hide');
                i.classList.add('show');
            }
        });
        listEnd.appendChild(li);
    });
    //
    return listEnd;
};
//
// DnD Functions
let dragSrcEl = null;
//
const handleDragStart = (e) => {
    //
    e.target.style.opacity = '0.1';
    dragSrcEl = e.target;
    //
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
    //
};
//
const handleDragOver = (e) => {
    //
    if (e.preventDefault) {
        e.preventDefault();
    }
    //
    e.dataTransfer.dropEffect = 'move';
    //
    return false;
    //
};
//
const handleDragEnter = (e) => {
    //
    e.target.classList.add('over');
    //
};
//
const handleDragLeave = (e) => {
    //
    e.target.classList.remove('over');
    //
};
//
const handleDrop = (e) => {
    //
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    //
    if (dragSrcEl != e.target) {
        //
        dragSrcEl.innerHTML = e.target.innerHTML;
        e.target.innerHTML = e.dataTransfer.getData('text/html');
        //
    }
    //
    return false;
    //
};
//
const handleDragEnd = (accountName) => {
    //
    let taskList = [];
    //
    [].forEach.call(document.querySelectorAll('.tasks li'), (li) => {
        //
        li.classList.remove('over');
        li.style.opacity = '1';
        taskList.push(li.textContent);
        //
    });
    //
    accountTasks.some((curr) => {
        //
        if (Object.keys(curr)[0] === dateFns.format(currToday, 'MMM-DD-YYYY')) {
            curr[Object.keys(curr)[0]] = taskList;
            localStorage.setItem(accountName, JSON.stringify(accountTasks));
            //
            return true;
        }
        //
    });
};
//
const generateDayTemplate = (task, accountName) => {
    //
    let list = document.querySelector('.tasks');
    //
    let li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    //
    let divText = document.createElement('div');
    divText.className = 'lead';
    divText.appendChild(document.createTextNode(task));
    //
    li.appendChild(divText);
    //
    let divIcon = document.createElement('div');
    divIcon.className = 'd-flex justify-content-between align-items-center';
    //
    let editIcon = document.createElement('i');
    editIcon.className = 'fas fa-edit mr-1 edit';
    divIcon.appendChild(editIcon);
    //
    let ongoingEditIcon = document.createElement('i');
    ongoingEditIcon.className = 'fas fa-keyboard mr-2 fa-2x ongoing-edit text-danger hide';
    divIcon.appendChild(ongoingEditIcon);
    //
    let deleteIcon = document.createElement('i');
    deleteIcon.className = 'far fa-trash-alt delete';
    divIcon.appendChild(deleteIcon);
    //
    li.appendChild(divIcon);
    //
    li.draggable = true;
    li.addEventListener('dragstart', handleDragStart, false);
    li.addEventListener('dragenter', handleDragEnter, false);
    li.addEventListener('dragover', handleDragOver, false);
    li.addEventListener('dragleave', handleDragLeave, false);
    li.addEventListener('drop', handleDrop, false);
    li.addEventListener(
        'dragend',
        () => {
            handleDragEnd(accountName);
        },
        false
    );
    //
    list.appendChild(li);
    //
};
//
const addBadge = (year, month, day, td) => {
    //
    accountTasks.forEach((accountTask) => {
        //
        if (Object.keys(accountTask)[0] === dateFns.format(new Date(year, month, day), 'MMM-D-YYYY')) {
            //
            let span = document.createElement('span');
            td.classList.add('task-marker-td');
            span.className = 'badge badge-pill task-marker';
            span.textContent = accountTask[Object.keys(accountTask)[0]].length;
            td.appendChild(span);
            //
        }
    });
    //
    return td;
    //
};
//
const filterTodos = (term) => {
    //
    const list = document.querySelector('.tasks');
    //
    Array.from(list.children)
        .filter((task) => !task.textContent.toLowerCase().includes(term))
        .forEach((task) => task.classList.add('filtered'));
    //
    Array.from(list.children)
        .filter((task) => task.textContent.toLowerCase().includes(term))
        .forEach((task) => task.classList.remove('filtered'));
    //
};
//
const addToast = (date, selector) => {
    //
    dateToasts.innerHTML += `
        <div class="toast" id="${selector}" role="status" aria-live="polite" aria-atomic="true" data-autohide="false">
            <div class="toast-header">
                <span>${date}</span>
                <button type="button" class="ml-auto mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span class="x" aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    `;
    //
};
//
// render day mode
const renderDayModeCalendar = (accountName) => {
    // adjust week mode display
    monthModeWrapper.setAttribute('style', 'display: none !important');
    weekModeWrapper.setAttribute('style', 'display: none !important');
    dayModeWrapper.setAttribute('style', 'display: flex !important');
    lMonthArrow.parentElement.style.display = 'none';
    rMonthArrow.parentElement.style.display = 'none';
    lWeekArrow.parentElement.style.display = 'none';
    rWeekArrow.parentElement.style.display = 'none';
    lDayArrow.parentElement.style.display = 'flex';
    rDayArrow.parentElement.style.display = 'flex';
    //
    dayModeContent.textContent = `
        ${dateFns.format(currToday, 'D MMMM YYYY, dddd')}
    `;
    // reset table body & header
    tableBody.innerHTML = '';
    tableHead.innerHTML = '';
    //
    let ul = document.createElement('ul');
    ul.className = 'list-group tasks mx-auto text-light p-3 w-100';
    tableBody.append(ul);
    tableBody.setAttribute('class', 'day-mode');
    //
    let todayDate = dateFns.format(currToday, 'MMM-D-YYYY');
    //
    accountTasks.forEach((dayTasks) => {
        if (Object.keys(dayTasks)[0] === todayDate) {
            //
            let dailyTasks = dayTasks[Object.keys(dayTasks)[0]];
            dailyTasks.forEach((task) => {
                //
                generateDayTemplate(task, accountName);
                //
            });
        }
    });
    //
    if (todayDate === dateFns.format(new Date(), 'MMM-D-YYYY')) {
        lDayArrow.disabled = true;
    } else {
        lDayArrow.disabled = false;
    }
    // enable searching in day mode
    searchIconPrimary.disabled = false;
    // show main options
    mainOptionsBtn.classList.add('main-options-btn-open');
    //
};
//
// render week mode
const generateWeekTemplate = (firstDayCurrWeek, firstDayNextWeek, week) => {
    //
    weekModeContent.textContent = `${dateFns.getDate(firstDayCurrWeek)} ${dateFns.format(
        firstDayCurrWeek,
        'MMMM YYYY'
    )} - ${dateFns.getDate(dateFns.subDays(firstDayNextWeek, 1))} ${dateFns.format(
        dateFns.subDays(firstDayNextWeek, 1),
        'MMMM YYYY'
    )}`;
    // reset table body & header
    tableBody.innerHTML = '';
    tableHead.innerHTML = '';
    //
    let row = document.createElement('tr');
    //
    week.forEach((curr) => {
        //
        let td = document.createElement('td');
        td.innerHTML = `
        ${dateFns.format(curr, 'ddd')}
        <br>
        ${dateFns.format(curr, 'D MMM')}
        `;
        //
        if (dateFns.isToday(curr)) {
            //
            td.classList.add('current-day');
            row.classList.add('current-week');
            //
        }
        //
        if (
            curr.getMonth() === today.getMonth() &&
            curr.getFullYear() === today.getFullYear() &&
            curr.getDate() < today.getDate()
        ) {
            //
            td.classList.add('invalid-day');
            //
        } else {
            //
            td.classList.add('valid-day');
            //
        }
        //
        td = addBadge(curr.getFullYear(), curr.getMonth(), curr.getDate(), td);
        // append td after each iteration
        row.append(td);
        //
    });
    // append row after each iteration
    tableBody.append(row);
    tableBody.setAttribute('class', 'week-mode');
    //
    if (row.classList.contains('current-week')) {
        lWeekArrow.disabled = true;
    } else {
        lWeekArrow.disabled = false;
    }
    //
};
//
const renderCurrWeekModeCalendar = () => {
    // adjust week mode display
    monthModeWrapper.setAttribute('style', 'display: none !important');
    weekModeWrapper.setAttribute('style', 'display: flex !important');
    dayModeWrapper.setAttribute('style', 'display: none !important');
    lMonthArrow.parentElement.style.display = 'none';
    rMonthArrow.parentElement.style.display = 'none';
    lWeekArrow.parentElement.style.display = 'flex';
    rWeekArrow.parentElement.style.display = 'flex';
    lDayArrow.parentElement.style.display = 'none';
    rDayArrow.parentElement.style.display = 'none';
    // set up local & update global variables
    let firstDayCurrWeek = dateFns.startOfWeek(today);
    let firstDayNextWeek = dateFns.addWeeks(firstDayCurrWeek, 1);
    let week = dateFns.eachDay(firstDayCurrWeek, dateFns.subDays(firstDayNextWeek, 1));
    //
    generateWeekTemplate(firstDayCurrWeek, firstDayNextWeek, week);
    // disable searching in month mode
    searchIconPrimary.disabled = true;
    //
};
//
const renderPrevWeekModeCalendar = () => {
    // set up local & update global variables
    let firstDayCurrWeek = currFirstDayOfWeek;
    let firstDayPrevWeek = dateFns.subWeeks(firstDayCurrWeek, 1);
    currFirstDayOfWeek = firstDayPrevWeek;
    let week = dateFns.eachDay(firstDayPrevWeek, dateFns.subDays(firstDayCurrWeek, 1));
    //
    generateWeekTemplate(firstDayPrevWeek, firstDayCurrWeek, week);
    //
};
//
const renderNextWeekModeCalendar = () => {
    // set up local & update global variables
    let firstDayCurrWeek = currFirstDayOfWeek;
    let firstDayNextWeek = dateFns.addWeeks(firstDayCurrWeek, 1);
    let firstDayInTwoWeeks = dateFns.addWeeks(firstDayNextWeek, 1);
    currFirstDayOfWeek = firstDayNextWeek;
    let week = dateFns.eachDay(firstDayNextWeek, dateFns.subDays(dateFns.addWeeks(firstDayNextWeek, 1), 1));
    //
    generateWeekTemplate(firstDayNextWeek, firstDayInTwoWeeks, week);
    //
};
//
// render month mode
const renderMonthModeCalendar = (year, month) => {
    // adjust month mode display
    monthModeWrapper.setAttribute('style', 'display: flex !important');
    weekModeWrapper.setAttribute('style', 'display: none !important');
    dayModeWrapper.setAttribute('style', 'display: none !important');
    lMonthArrow.parentElement.style.display = 'flex';
    rMonthArrow.parentElement.style.display = 'flex';
    lWeekArrow.parentElement.style.display = 'none';
    rWeekArrow.parentElement.style.display = 'none';
    lDayArrow.parentElement.style.display = 'none';
    rDayArrow.parentElement.style.display = 'none';
    // set up local variables
    let startOfCurrMonth = new Date(year, month).getDay();
    let numOfDayCurrMonth = 32 - new Date(year, month, 32).getDate();
    let numOfDayPrevMonth = 32 - new Date(year, month - 1, 32).getDate();
    if (numOfDayPrevMonth === -1) {
        numOfDayPrevMonth = 1;
    }
    let renderDaysNumCurrMonth = 1;
    let renderDaysNumPrevMonth = numOfDayPrevMonth - startOfCurrMonth + 1;
    let renderDaysNumNextMonth = 1;
    let flag = 0;
    //
    monthModeMonth.options[month].selected = true;
    monthModeYear.textContent = year;
    //
    if (month === 0) {
        //
        lMonthArrow.lastElementChild.textContent = months[11];
        rMonthArrow.firstElementChild.textContent = months[month + 1];
        //
    } else if (month === 11) {
        //
        lMonthArrow.lastElementChild.textContent = months[month - 1];
        rMonthArrow.firstElementChild.textContent = months[0];
        //
    } else {
        //
        lMonthArrow.lastElementChild.textContent = months[month - 1];
        rMonthArrow.firstElementChild.textContent = months[month + 1];
        //
    }
    if (Number(monthModeYear.textContent) === today.getFullYear()) {
        //
        Array.from(monthModeMonth.options).filter((curr) => curr.index < today.getMonth()).forEach((curr) => {
            curr.classList.add('hide');
        });
        //
    } else {
        //
        Array.from(monthModeMonth.options).forEach((curr) => {
            curr.classList.remove('hide');
        });
        //
    }
    //
    let i = 0;
    while (flag >= 0) {
        //
        let row = document.createElement('tr');
        //
        for (let j = 0; j < 7; j++) {
            //
            if (i === 0 && j < startOfCurrMonth) {
                //
                let td = document.createElement('td');
                td.classList.add('disabled');
                td.textContent = renderDaysNumPrevMonth;
                row.append(td);
                renderDaysNumPrevMonth++;
                //
            } else if (renderDaysNumCurrMonth > numOfDayCurrMonth) {
                //
                flag--;
                //
                if (j === 0) {
                    break;
                }
                //
                let td = document.createElement('td');
                td.classList.add('disabled');
                td.textContent = renderDaysNumNextMonth;
                row.append(td);
                renderDaysNumNextMonth++;
                //
            } else {
                //
                let td = document.createElement('td');
                td.textContent = renderDaysNumCurrMonth;
                //
                if (
                    //
                    renderDaysNumCurrMonth === today.getDate() &&
                    year === today.getFullYear() &&
                    month === today.getMonth()
                    //
                ) {
                    //
                    td.classList.add('current-day');
                    row.classList.add('current-week');
                    //
                }
                //
                if (
                    month === today.getMonth() &&
                    year === today.getFullYear() &&
                    renderDaysNumCurrMonth < today.getDate()
                ) {
                    //
                    td.classList.add('invalid-day');
                    //
                } else {
                    //
                    td.classList.add('valid-day');
                    //
                }
                //
                td = addBadge(year, month, renderDaysNumCurrMonth, td);
                // append td after each iteration
                row.append(td);
                renderDaysNumCurrMonth++;
                //
            }
        }
        // append row after each iteration
        tableBody.append(row);
        tableBody.setAttribute('class', 'month-mode');
        i++;
        //
    }
    //
    if (monthModeMonth.selectedIndex === today.getMonth()) {
        //
        lMonthArrow.disabled = true;
        //
    } else {
        //
        lMonthArrow.disabled = false;
        //
    }
    // disable searching in month mode
    searchIconPrimary.disabled = true;
    //
    pickDatePickMode.classList.remove('btn-outline-danger');
    pickDatePickMode.classList.add('btn-outline-light');
    //
};
//
// checkLocalStorage
let arrayPrevTasks = [];
const alertMsgWrapper = document.querySelector('.alert-message-wrapper');
const body = document.querySelector('body');
const listPastTasks = document.querySelector('.past-tasks');
const alertAppendBtn = document.querySelector('#alert-append-btn');
const alertCompleteBtn = document.querySelector('#alert-complete-btn');
const alertDisposeBtn = document.querySelector('#alert-dispose-btn');
const notifications = document.querySelector('#notifications');
const navNotifications = document.querySelector('.nav-notifications');
//
const getKeyByValue = (object, value) => {
    //
    return Object.keys(object).find((key) => object[key] === value);
    //
};
//
const checkLocalStorage = () => {
    //
    if (!arrayPrevTasks.length) {
        //
        accountTasks.forEach((dayTask) => {
            //
            let currDay = Object.keys(dayTask)[0];
            let day = Number(currDay.split('-')[1]);
            let month = getKeyByValue(months, currDay.split('-')[0]);
            let year = Number(currDay.split('-')[2]);
            let currNow = new Date(year, month, day);
            let now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            //
            if (currNow.getTime() < now.getTime()) {
                //
                arrayPrevTasks.push(currNow.getTime());
                //
            }
        });
        //
        arrayPrevTasks.sort((a, b) => a - b);
        //
    }
    //
    if (arrayPrevTasks.length) {
        //
        arrayPrevTasks.forEach((curr) => {
            //
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center py-2';
            li.textContent = `${dateFns.format(new Date(curr), 'MMM-D-YYYY')}`;
            listPastTasks.appendChild(li);
            //
        });
        //
        alertMsgWrapper.style.display = 'flex';
        body.style.overflow = 'hidden';
        //
        notifications.lastElementChild.textContent = 1;
        navNotifications.textContent = 1;
        //
        document.addEventListener('click', (e) => {
            //
            if (e.target.classList.contains('alert-message-wrapper')) {
                //
                alertMsgWrapper.style.display = 'none';
                body.style.overflow = 'auto';
                listPastTasks.innerHTML = '';
                //
            }
            //
        });
        //
        const alertCloseBtn = document.querySelector('.alert-close-btn');
        //
        alertCloseBtn.addEventListener('click', () => {
            //
            alertMsgWrapper.style.display = 'none';
            body.style.overflow = 'auto';
            listPastTasks.innerHTML = '';
            //
        });
    }
    //
};
//
//
//
//
document.addEventListener('DOMContentLoaded', () => {
    //
    // Welcome Screen
    let [accountNum, accountsArray] = loadAccounts();
    //
    let loginAccountsList = document.querySelector('.login-accounts');
    const loginMain = document.querySelector('.login-main-div');
    //
    loginAccountsList = renderLoginAccounts(accountNum, accountsArray, loginAccountsList);
    //
    // LogIn
    const loginConfirm = document.querySelector('.login-confirm');
    const loginConfirmAccount = document.querySelector('.login-confirm-account');
    const loginBtn = document.querySelector('#login-confirm-login-btn');
    const loginBackBtn = document.querySelector('#login-confirm-back-btn');
    const loginLoader = document.querySelector('#login-loader');
    const loginWrapper = document.querySelector('.login-wrapper');
    let accountName = '';
    //
    loginAccountsList.addEventListener('click', (e) => {
        accountsArray.some((account) => {
            if (document.getElementById(account).contains(e.target)) {
                //
                loginMain.classList.add('move-x-left');
                loginConfirm.classList.add('move-x-zero');
                loginConfirm.style.width = loginMain.offsetWidth + 'px';
                //
                const li = document.createElement('li');
                li.className =
                    'list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2';
                li.id = account;
                li.innerHTML = document.getElementById(account).innerHTML;
                loginConfirmAccount.appendChild(li);
                //
                accountName = 'user_' + account;
                welcomeHeader.textContent = account;
                accountTasks = JSON.parse(localStorage.getItem(accountName));
                //
                return true;
                //
            }
        });
    });
    //
    loginBtn.addEventListener('click', (e) => {
        //
        // implement password check etc...
        //
        loginConfirm.classList.add('dissapear');
        loginConfirmAccount.innerHTML = '';
        loginLoader.style.width = '520px';
        loginLoader.style.height = loginConfirm.offsetHeight + 'px';
        loginLoader.style.display = 'flex';
        //
        setTimeout(() => {
            //
            loginWrapper.classList.add('roll-up');
            loginLoader.style.display = 'none';
            leadTodayDate.textContent = dateFns.format(today, 'Do of MMMM YYYY');
            //
            leadTaskNum.textContent = 0;
            //
            accountTasks.forEach((dayTasks, index) => {
                //
                if (Object.keys(dayTasks)[0] === dateFns.format(today, 'MMM-DD-YYYY')) {
                    //
                    leadTaskNum.textContent = dayTasks[Object.keys(dayTasks)[0]].length;
                    //
                }
                //
                if (Object.keys(dayTasks)[0] === 'options') {
                    //
                    switch (accountTasks[index].options.theme) {
                        //
                        case 'theme-1':
                            //
                            setTheme(
                                '#343a40',
                                '#6c757d',
                                '#454d55',
                                '#dee2e6',
                                '#dee2e6',
                                '#000000',
                                '#007bff',
                                '#000000',
                                '#ffffff'
                            );
                            //
                            document
                                .querySelector('#' + accountTasks[index].options.theme)
                                .classList.add('theme-active');
                            //
                            break;
                        //
                        case 'theme-2':
                            //
                            setTheme(
                                '#666a86',
                                '#788aa3',
                                '#ffc800',
                                '#b2c9ab',
                                '#b2c9ab',
                                '#788aa3',
                                '#ff8427',
                                '#92b6b1',
                                '#e8ddb5'
                            );
                            //
                            document
                                .querySelector('#' + accountTasks[index].options.theme)
                                .classList.add('theme-active');
                            //
                            break;
                        //
                        case 'theme-3':
                            //
                            setTheme(
                                '#507dbc',
                                '#a1c6ea',
                                '#bbd1ea',
                                '#ffa62b',
                                '#ffa62b',
                                '#a1c6ea',
                                '#dae3e5',
                                '#be6e46',
                                '#04080f'
                            );
                            //
                            document
                                .querySelector('#' + accountTasks[index].options.theme)
                                .classList.add('theme-active');
                            //
                            break;
                        //
                        case 'theme-4':
                            //
                            setTheme(
                                '#291528',
                                '#9e829c',
                                '#3a3e3b',
                                '#9e829c',
                                '#9e829c',
                                '#93b7be',
                                '#000000',
                                '#93b7be',
                                '#f1fffa'
                            );
                            //
                            document
                                .querySelector('#' + accountTasks[index].options.theme)
                                .classList.add('theme-active');
                            //
                            break;
                        //
                        case 'theme-5':
                            //
                            setTheme(
                                '#f7a9a8',
                                '#ef798a',
                                '#087ca7',
                                '#05b2dc',
                                '#988b8e',
                                '#05b2dc',
                                '#e5c3d1',
                                '#988b8e',
                                '#613f75'
                            );
                            //
                            document
                                .querySelector('#' + accountTasks[index].options.theme)
                                .classList.add('theme-active');
                            //
                            break;
                        //
                        case 'theme-6':
                            //
                            setTheme(
                                '#3d315b',
                                '#444b6e',
                                '#708b75',
                                '#eee5e5',
                                '#9ab87a',
                                '#ddcecd',
                                '#444b6e',
                                '#ddcecd',
                                '#f8f991'
                            );
                            //
                            document
                                .querySelector('#' + accountTasks[index].options.theme)
                                .classList.add('theme-active');
                            //
                            break;
                        //
                    }
                    //
                }
                //
            });
            //
            body.style.overflow = 'auto';
            //
            renderDayModeCalendar(accountName);
            checkLocalStorage();
        }, 1500);
        //
    });
    //
    loginBackBtn.addEventListener('click', () => {
        //
        loginConfirm.classList.remove('move-x-zero');
        loginMain.classList.remove('move-x-left');
        loginConfirmAccount.innerHTML = '';
        //
    });
    //
    // Add Account
    const addBtn = document.querySelector('#login-add-btn');
    const loginAddMode = document.querySelector('.login-add-mode');
    const loginAddBackBtn = document.querySelector('#login-add-back-btn');
    const loginAddCreateBtn = document.querySelector('#login-add-create-btn');
    const addAccountForm = document.querySelector('#add-account-form');
    const usernamePattern = /^[a-zA-Z]+([\w]+)?$/;
    const loginAddConfirm = document.querySelector('.login-add-confirm-message');
    const confirmUsername = document.querySelector('#confirm-username');
    const username = document.querySelector('#username');
    //
    addBtn.addEventListener('click', () => {
        //
        loginMain.classList.add('move-y-up');
        loginAddMode.classList.add('move-y-zero');
        //
    });
    //
    loginAddBackBtn.addEventListener('click', () => {
        //
        loginMain.classList.remove('move-y-up');
        loginAddMode.classList.remove('move-y-zero');
        username.classList.remove('valid');
        username.classList.remove('invalid');
        addAccountForm.reset();
        //
    });
    //
    username.addEventListener('keyup', () => {
        //
        if (
            usernamePattern.test(addAccountForm.username.value) &&
            !Object.keys(localStorage).includes('user_' + addAccountForm.username.value)
        ) {
            //
            username.classList.remove('invalid');
            username.classList.add('valid');
            loginAddCreateBtn.disabled = false;
            //
        } else {
            //
            username.classList.remove('valid');
            username.classList.add('invalid');
            loginAddCreateBtn.disabled = true;
            //
        }
    });
    //
    addAccountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        //
        if (username.classList.contains('valid')) {
            //
            localStorage.setItem(
                'user_' + addAccountForm.username.value,
                JSON.stringify([{ options: { theme: 'theme-1' } }])
            );
            //
            loginAddCreateBtn.disabled = true;
            username.classList.remove('valid');
            username.classList.remove('invalid');
            username.disabled = true;
            confirmUsername.textContent = addAccountForm.username.value;
            addAccountForm.reset();
            //
            loginAddMode.classList.remove('move-y-zero');
            loginAddMode.classList.add('move-y-up');
            loginAddConfirm.classList.add('move-y-zero');
            //
            setTimeout(() => {
                //
                [accountNum, accountsArray] = loadAccounts();
                //
                loginAddMode.classList.remove('move-y-up');
                loginAddConfirm.classList.remove('move-y-zero');
                loginMain.classList.remove('move-y-up');
                loginAccountsList.innerHTML = '';
                username.disabled = false;
                //
                renderLoginAccounts(accountNum, accountsArray, loginAccountsList);
                //
            }, 1500);
        }
    });
    //
    // Remove Account
    const removeBtn = document.querySelector('#login-remove-btn');
    const loginRemove = document.querySelector('.login-remove-choose');
    let loginRemoveAccount = document.querySelector('.login-remove-accounts');
    const loginRemoveBackBtn = document.querySelector('#login-back-btn');
    const loginRemoveConfirm = document.querySelector('.login-remove-confirm');
    const loginRemoveConfirmAccount = document.querySelector('.login-remove-confirm-account');
    const loginRemoveBackConfirmBtn = document.querySelector('#login-remove-back-confirm-btn');
    const loginRemoveConfirmBtn = document.querySelector('#login-remove-confirm-btn');
    const loginRemoveConfirmMsg = document.querySelector('.login-remove-confirm-message');
    const confirmRemoveUsername = document.querySelector('#confirm-remove-username');
    let accountToRemove = '';
    //
    removeBtn.addEventListener('click', () => {
        //
        loginRemoveAccount.innerHTML = '';
        //
        loginMain.classList.add('move-y-up');
        loginRemove.classList.add('move-y-zero');
        loginRemove.style.width = loginMain.offsetWidth + 'px';
        //
        loginRemoveAccount = renderListElements(loginAccountsList, loginRemoveAccount);
        //
    });
    //
    loginRemoveAccount.addEventListener('click', (e) => {
        //
        accountsArray.some((account) => {
            if (document.getElementById(account).contains(e.target)) {
                //
                loginRemove.classList.remove('move-y-zero');
                loginRemove.classList.add('move-y-up');
                loginRemoveConfirm.classList.add('move-y-zero');
                loginRemoveConfirm.style.width = loginMain.offsetWidth + 'px';
                //
                const li = document.createElement('li');
                li.className =
                    'list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2';
                li.id = account;
                li.innerHTML = document.getElementById(account).innerHTML;
                loginRemoveConfirmAccount.appendChild(li);
                //
                accountToRemove = account;
                //
                return true;
            }
        });
        //
    });
    //
    loginRemoveBackBtn.addEventListener('click', () => {
        //
        loginMain.classList.remove('move-y-up');
        loginRemove.classList.remove('move-y-zero');
        //
        loginAccountsList = renderListElements(loginRemoveAccount, loginAccountsList);
    });
    //
    loginRemoveConfirmBtn.addEventListener('click', () => {
        //
        loginRemoveConfirm.classList.remove('move-y-zero');
        loginRemoveConfirm.classList.add('move-y-up');
        loginRemoveConfirmMsg.classList.add('move-y-zero');
        loginRemoveConfirmMsg.style.width = loginMain.offsetWidth + 'px';
        //
        localStorage.removeItem('user_' + accountToRemove);
        //
        confirmRemoveUsername.textContent = accountToRemove;
        //
        setTimeout(() => {
            //
            [accountNum, accountsArray] = loadAccounts();
            //
            loginRemoveConfirm.classList.remove('move-y-up');
            loginRemoveConfirmMsg.classList.remove('move-y-zero');
            loginRemove.classList.remove('move-y-up');
            loginMain.classList.remove('move-y-up');
            //
            loginRemoveConfirmAccount.innerHTML = '';
            //
            renderLoginAccounts(accountNum, accountsArray, loginAccountsList);
            //
        }, 1500);
    });
    //
    loginRemoveBackConfirmBtn.addEventListener('click', () => {
        //
        loginRemove.classList.add('move-y-zero');
        loginRemove.classList.remove('move-y-up');
        loginRemoveConfirm.classList.remove('move-y-zero');
        loginRemoveConfirmAccount.innerHTML = '';
        //
    });
    //
    // LogOut
    const logOut = document.querySelector('#log-out');
    //
    logOut.addEventListener('click', () => {
        //
        setTheme('#343a40', '#6c757d', '#454d55', '#dee2e6', '#dee2e6', '#000000', '#007bff', '#000000', '#ffffff');
        //
        Array.from(themeBtns).some((themeBtn) => {
            //
            if (themeBtn.classList.contains('theme-active')) {
                //
                themeBtn.classList.remove('theme-active');
                //
                return true;
                //
            }
            //
        });
        //
        loginWrapper.classList.remove('roll-up');
        setTimeout(() => {
            loginLoader.style.display = 'flex';
        }, 400);
        //
        setTimeout(() => {
            //
            loginConfirm.classList.remove('dissapear');
            loginConfirm.classList.remove('move-x-zero');
            loginMain.classList.remove('move-x-left');
            loginLoader.style.display = 'none';
            //
        }, 1500);
    });
    //
    // checkLocalStorage Event Listeners
    alertAppendBtn.addEventListener('click', () => {
        //
        let arrayAllPrevTasks = [];
        //
        arrayPrevTasks.forEach((curr) => {
            //
            let currKey = dateFns.format(new Date(curr), 'MMM-D-YYYY');
            //
            accountTasks.forEach((dayTask, index) => {
                if (Object.keys(dayTask)[0] === currKey) {
                    //
                    arrayAllPrevTasks = arrayAllPrevTasks.concat(dayTask[Object.keys(dayTask)[0]]);
                    //
                    accountTasks.splice(index, 1);
                    localStorage.setItem(accountName, JSON.stringify(accountTasks));
                    //
                }
            });
            //
        });
        //
        const appendTasks = accountTasks.some((dayTask) => {
            //
            if (Object.keys(dayTask)[0] === dateFns.format(today, 'MMM-D-YYYY')) {
                //
                dayTask[Object.keys(dayTask)[0]] = dayTask[Object.keys(dayTask)[0]].concat(arrayAllPrevTasks);
                localStorage.setItem(accountName, JSON.stringify(accountTasks));
                //
                leadTaskNum.textContent = dayTask[Object.keys(dayTask)[0]].length;
                //
                renderDayModeCalendar(accountName);
                //
                return true;
                //
            }
            //
        });
        //
        if (!appendTasks) {
            //
            let dayObj = {};
            dayObj[dateFns.format(today, 'MMM-D-YYYY')] = arrayAllPrevTasks;
            accountTasks.push(dayObj);
            //
            localStorage.setItem(accountName, JSON.stringify(accountTasks));
            //
            renderDayModeCalendar(accountName);
            //
        }
        //
        arrayPrevTasks = [];
        listPastTasks.innerHTML = '';
        //
        if (notifications.lastElementChild.textContent.length) {
            notifications.lastElementChild.textContent = '';
            navNotifications.textContent = '';
        }
        //
        alertMsgWrapper.style.display = 'none';
        body.style.overflow = 'auto';
        //
    });
    //
    alertCompleteBtn.addEventListener('click', () => {
        //
        console.log('Not yet implemented');
        //
        // arrayPrevTasks = [];
        // listPastTasks.innerHTML = '';
        //
        // if (notifications.lastElementChild.textContent.length) {
        // 	notifications.lastElementChild.textContent = '';
        // 	navNotifications.textContent = '';
        // }
        //
        alertMsgWrapper.style.display = 'none';
        body.style.overflow = 'auto';
        //
    });
    //
    alertDisposeBtn.addEventListener('click', () => {
        //
        let arrayAllPrevTasks = [];
        //
        arrayPrevTasks.forEach((curr) => {
            //
            let currKey = dateFns.format(new Date(curr), 'MMM-D-YYYY');
            arrayAllPrevTasks.push(currKey);
            //
        });
        //
        accountTasks.forEach((dayTask, index) => {
            //
            if (arrayAllPrevTasks.includes(Object.keys(dayTask)[0])) {
                //
                accountTasks.splice(index, 1);
                localStorage.setItem(accountName, JSON.stringify(accountTasks));
                //
            }
            //
        });
        //
        arrayPrevTasks = [];
        listPastTasks.innerHTML = '';
        //
        if (notifications.lastElementChild.textContent.length) {
            notifications.lastElementChild.textContent = '';
            navNotifications.textContent = '';
        }
        //
        alertMsgWrapper.style.display = 'none';
        body.style.overflow = 'auto';
        //
    });
    //
    notifications.addEventListener('click', () => {
        //
        if (notifications.lastElementChild.textContent.length) {
            //
            alertMsgWrapper.style.display = 'flex';
            body.style.overflow = 'hidden';
            //
        }
        //
    });
    //
    // Event listeners related to day mode
    dayModeView.addEventListener('click', () => {
        //
        currToday = new Date();
        renderDayModeCalendar(accountName);
        //
    });
    //
    lDayArrow.addEventListener('click', () => {
        //
        let newToday = currToday;
        let prevToday = dateFns.subDays(newToday, 1);
        currToday = prevToday;
        renderDayModeCalendar(accountName);
        //
    });
    //
    rDayArrow.addEventListener('click', () => {
        //
        let newToday = currToday;
        let nextToday = dateFns.addDays(newToday, 1);
        currToday = nextToday;
        renderDayModeCalendar(accountName);
        //
    });
    //
    // Event listeners related to week mode
    weekModeView.addEventListener('click', () => {
        //
        renderCurrWeekModeCalendar();
        currFirstDayOfWeek = dateFns.startOfWeek(today);
        searchFormWrapper.classList.remove('search-form-open');
        //
    });
    //
    lWeekArrow.addEventListener('click', () => {
        //
        renderPrevWeekModeCalendar();
        //
    });
    //
    rWeekArrow.addEventListener('click', () => {
        //
        renderNextWeekModeCalendar();
        //
    });
    //
    // Event listeners related to month mode
    monthModeView.addEventListener('click', () => {
        //
        tableBody.innerHTML = '';
        tableHead.innerHTML = tableHeadMonthMode;
        renderMonthModeCalendar(today.getFullYear(), today.getMonth());
        searchFormWrapper.classList.remove('search-form-open');
        //
    });
    //
    monthModeMonth.addEventListener('change', (e) => {
        //
        tableBody.innerHTML = '';
        renderMonthModeCalendar(Number(monthModeYear.textContent), e.target.selectedIndex);
        //
    });
    //
    lMonthArrow.addEventListener('click', () => {
        //
        tableBody.innerHTML = '';
        let year = Number(monthModeYear.textContent);
        let month = monthModeMonth.selectedIndex - 1;
        if (month === -1) {
            month = 11;
            year--;
        }
        renderMonthModeCalendar(year, month);
        //
    });
    //
    rMonthArrow.addEventListener('click', () => {
        //
        tableBody.innerHTML = '';
        let year = Number(monthModeYear.textContent);
        let month = monthModeMonth.selectedIndex + 1;
        if (month === 12) {
            month = 0;
            year++;
        }
        renderMonthModeCalendar(year, month);
        //
    });
    //
    // Event listeners - searching tasks
    searchIconPrimary.addEventListener('click', () => {
        //
        searchFormWrapper.classList.toggle('search-form-open');
        if (searchFormWrapper.classList.contains('search-form-open')) {
            //
            document.querySelector('.search-form input').focus();
            document.querySelector('.search-form input').select();
            //
        }
        //
    });
    //
    searchForm.addEventListener('keyup', () => {
        //
        const term = searchForm.value.trim().toLowerCase();
        filterTodos(term);
        //
    });
    //
    // Event listeners - adding a task
    //
    addIconPrimary.addEventListener('click', () => {
        //
        addFormWrapper.classList.toggle('add-form-open');
        pickDateFormWrapper.classList.remove('pick-date-form-open');
        //
        if (addFormWrapper.classList.contains('add-form-open')) {
            //
            document.querySelector('.add input').focus();
            document.querySelector('.add input').select();
            //
        }
        //
        dateToasts.innerHTML = '';
        //
    });
    //
    pickDate.addEventListener('click', () => {
        //
        pickDateFormWrapper.classList.toggle('pick-date-form-open');
        dateToasts.innerHTML = '';
        //
    });
    //
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        //
        const task = addForm.add.value.trim();
        //
        if (task.length && !tableBody.classList.contains('pick-date-mode')) {
            //
            let flag = 0;
            accountTasks.forEach((accountTask) => {
                //
                if (Object.keys(accountTask)[0] === dateFns.format(currToday, 'MMM-D-YYYY')) {
                    //
                    accountTask[Object.keys(accountTask)[0]].push(task);
                    flag++;
                    //
                    if (Object.keys(accountTask)[0] === dateFns.format(today, 'MMM-D-YYYY')) {
                        //
                        leadTaskNum.textContent = accountTask[Object.keys(accountTask)[0]].length;
                        //
                    }
                }
            });
            //
            if (!flag) {
                //
                let accountTaskObj = {};
                accountTaskObj[dateFns.format(currToday, 'MMM-D-YYYY')] = [];
                accountTaskObj[dateFns.format(currToday, 'MMM-D-YYYY')].push(task);
                accountTasks.push(accountTaskObj);
                //
                if (dateFns.format(currToday, 'MMM-D-YYYY') === dateFns.format(today, 'MMM-D-YYYY')) {
                    //
                    leadTaskNum.textContent = accountTaskObj[dateFns.format(currToday, 'MMM-D-YYYY')].length;
                    //
                }
            }
            //
            localStorage.setItem(accountName, JSON.stringify(accountTasks));
            //
            addFormWrapper.classList.toggle('add-form-open');
            pickDateFormWrapper.classList.remove('pick-date-form-open');
            //
            addForm.reset();
            //
            renderDayModeCalendar(accountName);
            //
        } else if (task.length && tableBody.classList.contains('pick-date-mode')) {
            //
            if (!dateToasts.children.length) {
                //
                let selector = dateFns.format(new Date(), 'MMM-D-YYYY');
                addToast(dateFns.format(new Date(), 'D MMM YY'), selector);
                //
            }
            //
            Array.from(dateToasts.children).forEach((dateToast) => {
                //
                let flag = 0;
                accountTasks.forEach((accountTask) => {
                    if (Object.keys(accountTask)[0] === dateToast.id) {
                        accountTask[Object.keys(accountTask)[0]].push(task);
                        flag++;
                        //
                        if (Object.keys(accountTask)[0] === dateFns.format(today, 'MMM-D-YYYY')) {
                            leadTaskNum.textContent = accountTask[Object.keys(accountTask)[0]].length;
                        }
                    }
                    //
                });
                //
                if (!flag) {
                    //
                    let accountTaskObj = {};
                    accountTaskObj[dateToast.id] = [];
                    accountTaskObj[dateToast.id].push(task);
                    accountTasks.push(accountTaskObj);
                    //
                    if (accountTaskObj[dateToast.id] === dateFns.format(today, 'MMM-D-YYYY')) {
                        //
                        leadTaskNum.textContent = accountTaskObj[dateToast.id].length;
                        //
                    }
                }
                //
                localStorage.setItem(accountName, JSON.stringify(accountTasks));
                //
            });
            //
            tableBody.classList.remove('pick-date-mode');
            addIconPrimary.disabled = false;
            moreOptionsBtn.disabled = false;
            dayModeView.disabled = false;
            weekModeView.disabled = false;
            pickDate.disabled = false;
            dateToasts.innerHTML = '';
            pickDatePickMode.classList.add('btn-outline-light');
            pickDatePickMode.classList.remove('btn-outline-danger');
            addFormWrapper.classList.toggle('add-form-open');
            pickDateFormWrapper.classList.remove('pick-date-form-open');
            addForm.reset();
            //
            tableBody.innerHTML = '';
            tableHead.innerHTML = tableHeadMonthMode;
            renderMonthModeCalendar(today.getFullYear(), today.getMonth());
            //
        } else if (!task.length) {
            //
            // alert message etc.
            // const addFormInput = document.querySelector('.add input');
            // addFormInput.style.backgroundColor = 'red';
            //
        }
    });
    //
    // Event listeners - pick mode & date toasts
    pickDatePickMode.addEventListener('click', () => {
        //
        if (tableBody.classList.contains('pick-date-mode')) {
            //
            tableBody.classList.remove('pick-date-mode');
            addIconPrimary.disabled = false;
            moreOptionsBtn.disabled = false;
            dayModeView.disabled = false;
            weekModeView.disabled = false;
            pickDate.disabled = false;
            pickDatePickMode.classList.add('btn-outline-light');
            pickDatePickMode.classList.remove('btn-outline-danger');
            //
            renderDayModeCalendar(accountName);
            //
        } else {
            //
            tableBody.innerHTML = '';
            tableHead.innerHTML = tableHeadMonthMode;
            //
            if (tableBody.classList.contains('month-mode')) {
                //
                renderMonthModeCalendar(Number(monthModeYear.textContent), monthModeMonth.selectedIndex);
                //
            } else {
                //
                renderMonthModeCalendar(today.getFullYear(), today.getMonth());
                //
            }
            //
            tableBody.classList.add('pick-date-mode');
            addIconPrimary.disabled = true;
            moreOptionsBtn.disabled = true;
            dayModeView.disabled = true;
            weekModeView.disabled = true;
            pickDate.disabled = true;
            pickDatePickMode.classList.remove('btn-outline-light');
            pickDatePickMode.classList.add('btn-outline-danger');
            //
        }
        //
    });
    //
    pickDateTodayBtn.addEventListener('click', () => {
        //
        let selector = dateFns.format(new Date(), 'MMM-D-YYYY');
        //
        if (Array.from(dateToasts.children).filter((todayToast) => todayToast.id === selector).length) {
        } else {
            //
            addToast(dateFns.format(new Date(), 'D MMM YY'), selector);
            $('.toast').toast('show');
            //
        }
    });
    //
    dateToasts.addEventListener('click', (e) => {
        //
        if (e.target.classList.contains('x')) {
            //
            e.target.parentElement.parentElement.parentElement.remove();
            //
        }
        //
    });
    //
    // Event listeners - deleting, editing, pick a date in pick mode, etc.
    let startTask = '';
    //
    tableBody.addEventListener('click', (e) => {
        //
        if (!tableBody.classList.contains('pick-date-mode') && e.target instanceof HTMLTableCellElement) {
            //
            if (tableBody.classList.contains('month-mode')) {
                //
                if (!e.target.classList.contains('disabled') && !e.target.classList.contains('invalid-day')) {
                    //
                    let day = Number(e.target.childNodes[0].nodeValue);
                    let month = monthModeMonth.selectedIndex;
                    let year = Number(monthModeYear.textContent);
                    currToday = new Date(year, month, day);
                    renderDayModeCalendar(accountName);
                    //
                }
            }
        }
        //
        if (tableBody.classList.contains('pick-date-mode') && e.target.classList.contains('valid-day')) {
            //
            let day = Number(e.target.childNodes[0].nodeValue);
            let month = monthModeMonth.selectedIndex;
            let year = Number(monthModeYear.textContent);
            let selector = dateFns.format(new Date(year, month, day), 'MMM-D-YYYY');
            //
            if (Array.from(dateToasts.children).length >= 7) {
                //
                alert('Max. 7 days');
                //
                // something more exciting???
                //
            } else {
                //
                if (Array.from(dateToasts.children).filter((todayToast) => todayToast.id === selector).length) {
                } else {
                    //
                    addToast(dateFns.format(new Date(year, month, day), 'D MMM YY'), selector);
                    $('.toast').toast('show');
                    //
                }
                //
            }
            //
        }
        //
        if (e.target.classList.contains('delete')) {
            //
            e.target.parentElement.parentElement.remove();
            //
            accountTasks.some((accountTask, index) => {
                //
                let flag = 0;
                //
                if (Object.keys(accountTask)[0] === dateFns.format(currToday, 'MMM-D-YYYY')) {
                    //
                    for (let i = 0; i < accountTask[Object.keys(accountTask)[0]].length; i++) {
                        //
                        if (
                            accountTask[Object.keys(accountTask)[0]][i] ===
                            e.target.parentElement.parentElement.textContent
                        ) {
                            //
                            accountTask[Object.keys(accountTask)[0]].splice(i, 1);
                            //
                            if (accountTask[Object.keys(accountTask)[0]].length) {
                                //
                                localStorage.setItem(accountName, JSON.stringify(accountTasks));
                                //
                            } else {
                                //
                                accountTasks.splice(index, 1);
                                localStorage.setItem(accountName, JSON.stringify(accountTasks));
                                //
                            }
                            //
                            flag++;
                            //
                            if (flag) {
                                //
                                if (Object.keys(accountTask)[0] === dateFns.format(today, 'MMM-D-YYYY')) {
                                    //
                                    leadTaskNum.textContent = accountTask[Object.keys(accountTask)[0]].length;
                                    //
                                }
                                //
                                return true;
                                //
                            }
                            //
                        }
                        //
                    }
                    //
                }
                //
            });
            //
        }
        //
        if (e.target.classList.contains('edit')) {
            //
            startTask = e.target.parentElement.parentElement.firstElementChild.textContent;
            e.target.parentElement.parentElement.firstElementChild.setAttribute('contenteditable', 'true');
            //
            const lis = document.querySelectorAll('.tasks li');
            //
            lis.forEach((curr) => {
                curr.draggable = false;
            });
            //
            const el = e.target.parentElement.parentElement.firstElementChild;
            let range = document.createRange();
            let sel = window.getSelection();
            range.setStart(el.childNodes[0], e.target.parentElement.parentElement.firstElementChild.textContent.length);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            el.focus();
            //
            e.target.classList.add('hide');
            e.target.nextElementSibling.classList.remove('hide');
            //
            searchIconPrimary.disabled = true;
            addIconPrimary.disabled = true;
            moreOptionsBtn.disabled = true;
            rDayArrow.disabled = true;
            dayModeView.disabled = true;
            weekModeView.disabled = true;
            monthModeView.disabled = true;
            userNavbar.disabled = true;
            //
            el.parentElement.classList.add('editable');
            //
        }
        //
        if (e.target.classList.contains('ongoing-edit')) {
            //
            if (e.target.parentElement.parentElement.firstElementChild.textContent === '') {
                //
                e.target.parentElement.parentElement.firstElementChild.textContent = startTask;
                //
            }
            //
            e.target.parentElement.parentElement.firstElementChild.setAttribute('contenteditable', 'false');
            //
            const lis = document.querySelectorAll('.tasks li');
            let taskList = [];
            //
            lis.forEach((curr) => {
                //
                curr.draggable = true;
                taskList.push(curr.textContent);
                //
            });
            //
            e.target.previousElementSibling.classList.remove('hide');
            e.target.classList.add('hide');
            //
            searchIconPrimary.disabled = false;
            addIconPrimary.disabled = false;
            moreOptionsBtn.disabled = false;
            rDayArrow.disabled = false;
            dayModeView.disabled = false;
            weekModeView.disabled = false;
            monthModeView.disabled = false;
            userNavbar.disabled = false;
            //
            e.target.parentElement.parentElement.classList.remove('editable');
            //
            accountTasks.some((curr) => {
                //
                if (Object.keys(curr)[0] === dateFns.format(currToday, 'MMM-DD-YYYY')) {
                    //
                    curr[Object.keys(curr)[0]] = taskList;
                    localStorage.setItem(accountName, JSON.stringify(accountTasks));
                    //
                    return true;
                    //
                }
                //
            });
            //
        }
        //
    });
    //
    // Event listener - changing theme
    mainDropMenu.addEventListener('click', (e) => {
        //
        Array.from(themeBtns).some((themeBtn) => {
            //
            if (themeBtn.classList.contains('theme-active')) {
                //
                themeBtn.classList.remove('theme-active');
                //
                return true;
                //
            }
            //
        });
        //
        const targetId = e.target.id;
        //
        switch (targetId) {
            //
            case 'theme-1':
                //
                setTheme(
                    '#343a40',
                    '#6c757d',
                    '#454d55',
                    '#dee2e6',
                    '#dee2e6',
                    '#000000',
                    '#007bff',
                    '#000000',
                    '#ffffff'
                );
                //
                e.target.classList.add('theme-active');
                //
                accountTasks.forEach((dayTasks, index) => {
                    //
                    if (Object.keys(dayTasks)[0] === 'options') {
                        //
                        accountTasks[index].options.theme = targetId;
                        localStorage.setItem(accountName, JSON.stringify(accountTasks));
                        //
                    }
                    //
                });
                //
                break;
            //
            case 'theme-2':
                //
                setTheme(
                    '#666a86',
                    '#788aa3',
                    '#ffc800',
                    '#b2c9ab',
                    '#b2c9ab',
                    '#788aa3',
                    '#ff8427',
                    '#92b6b1',
                    '#e8ddb5'
                );
                //
                e.target.classList.add('theme-active');
                //
                accountTasks.forEach((dayTasks, index) => {
                    //
                    if (Object.keys(dayTasks)[0] === 'options') {
                        //
                        accountTasks[index].options.theme = targetId;
                        localStorage.setItem(accountName, JSON.stringify(accountTasks));
                        //
                    }
                    //
                });
                //
                break;
            //
            case 'theme-3':
                //
                setTheme(
                    '#507dbc',
                    '#a1c6ea',
                    '#bbd1ea',
                    '#ffa62b',
                    '#ffa62b',
                    '#a1c6ea',
                    '#dae3e5',
                    '#be6e46',
                    '#04080f'
                );
                //
                e.target.classList.add('theme-active');
                //
                accountTasks.forEach((dayTasks, index) => {
                    //
                    if (Object.keys(dayTasks)[0] === 'options') {
                        //
                        accountTasks[index].options.theme = targetId;
                        localStorage.setItem(accountName, JSON.stringify(accountTasks));
                        //
                    }
                    //
                });
                //
                break;
            //
            case 'theme-4':
                //
                setTheme(
                    '#291528',
                    '#9e829c',
                    '#3a3e3b',
                    '#9e829c',
                    '#9e829c',
                    '#93b7be',
                    '#000000',
                    '#93b7be',
                    '#f1fffa'
                );
                //
                e.target.classList.add('theme-active');
                //
                accountTasks.forEach((dayTasks, index) => {
                    //
                    if (Object.keys(dayTasks)[0] === 'options') {
                        //
                        accountTasks[index].options.theme = targetId;
                        localStorage.setItem(accountName, JSON.stringify(accountTasks));
                        //
                    }
                    //
                });
                //
                break;
            //
            case 'theme-5':
                //
                setTheme(
                    '#f7a9a8',
                    '#ef798a',
                    '#087ca7',
                    '#05b2dc',
                    '#988b8e',
                    '#05b2dc',
                    '#e5c3d1',
                    '#988b8e',
                    '#613f75'
                );
                //
                e.target.classList.add('theme-active');
                //
                accountTasks.forEach((dayTasks, index) => {
                    //
                    if (Object.keys(dayTasks)[0] === 'options') {
                        //
                        accountTasks[index].options.theme = targetId;
                        localStorage.setItem(accountName, JSON.stringify(accountTasks));
                        //
                    }
                    //
                });
                //
                break;
            //
            case 'theme-6':
                //
                setTheme(
                    '#3d315b',
                    '#444b6e',
                    '#708b75',
                    '#eee5e5',
                    '#9ab87a',
                    '#ddcecd',
                    '#444b6e',
                    '#ddcecd',
                    '#f8f991'
                );
                //
                e.target.classList.add('theme-active');
                //
                accountTasks.forEach((dayTasks, index) => {
                    //
                    if (Object.keys(dayTasks)[0] === 'options') {
                        //
                        accountTasks[index].options.theme = targetId;
                        localStorage.setItem(accountName, JSON.stringify(accountTasks));
                        //
                    }
                    //
                });
                //
                break;
            //
        }
        //
    });
    //
});
//
