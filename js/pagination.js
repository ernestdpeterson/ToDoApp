/* eslint-env jquery */
/* globals todoService pagination todoApp */

var el = document.getElementById('pagination');

var pagination = {
    currentPage: 1,
    pageLength: 10,
    totalRecords: 50,
    render: function() {
        this.totalRecords = todoService.getTodosCount();
        let pages = Math.ceil(this.totalRecords / this.pageLength);
        this.pages = pages;
        let buttons = '';
        buttons += `
            <button
                class='pagination-btn next'
                type='button'
                onclick='pagination.next(this)'
            >
            Next
            </button>
        `;

        for (var i = 1; i <= pages; i++) {
            buttons += this.getButton(i);
        }

        buttons += `
            <button
                class='pagination-btn prev'
                type='button'
                onclick='pagination.prev(this)'
            >
            Prev
            </button>
        `;
        el.innerHTML = buttons;
    },
    getButton: function(text) {
        let classNames = 'pagination-btn';
        if (this.currentPage == text) {
            classNames += ' current-page';
        }
        let html = `
            <button id='btn-${text}' 
            class='${classNames}'
            type='button'
            onclick='pagination.gotoPage(this, ${text})'
            >${text}</button>
        `;
        return html;
    },
    next: function(thisButn) {
        if(this.currentPage > this.pages - 1) return;
        this.currentPage = this.currentPage + 1;
        let currentPageBtn = document.getElementById(`btn-${this.currentPage}`);
        this.gotoPage(currentPageBtn, this.currentPage);

    },
    prev: function(thisButn) {
        if(this.currentPage == 1) return;
        this.currentPage = this.currentPage - 1;
        let currentPageBtn = document.getElementById(`btn-${this.currentPage}`);
        this.gotoPage(currentPageBtn, this.currentPage);

    },
    gotoPage: function(butn, pageNo) {
        this.currentPage = pageNo;
        let paginationButtons = document.querySelectorAll('.pagination-btn');
        for (let itter = 0; itter < paginationButtons.length; itter++) {
            paginationButtons[itter].classList.remove('current-page');
        }
        butn.classList.add('current-page');
        let pageData = todoService.getPageData(pageNo, this.pageLength);
        todoApp.render(pageData);
    },
    gotoLastPage: function() {
        this.currentPage = this.pages;
        let currentPageBtn = document.getElementById(`btn-${this.currentPage}`);
        this.gotoPage(currentPageBtn, this.currentPage);
    }
};

pagination.render();

$('#theFooter').append('More Stuff In The Text Of A ');