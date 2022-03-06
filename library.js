// Write your code here!
//User name stored in an array
var users = ["UserA","UserB","UserC","UserD"];

class BookClub{
    constructor(id,title,author,lender,borrower){
        this.id = id;
        this.title = title;
        this.author = author;
        this.lender = lender;
        this.borrower = borrower;
    }
}

let Book1 = new BookClub("1","Book1","Author1","UserC","UserB")
let Book2 = new BookClub("2","Book2","Author2","UserC","-")
let Book3 = new BookClub("3","Book3","Author3","UserD","UserC")
let Book4 = new BookClub("4","Book4","Author4","UserA","-")
let Book5 = new BookClub("5","Book5","Author5","UserA","-")
let Book6 = new BookClub("6","Book6","Author6","UserB","UserA")


let library = [Book1,Book2,Book3,Book4,Book5,Book6];
let book_count = library.length+1;
let cur_user =""

const isUserLoggedIn =()=>{
    if(cur_user === ""){
        return false;
    }
    else{
        return true;
    }
}

const borrow_book = (i) =>{
    library[i-1].borrower = cur_user;
    newBooksDetails();
}

function return_book(i){
    library[i-1].borrower = "-";
    newBooksDetails();
}
const book_row =(book) =>{
    let action ="-";
    if(cur_user === book.borrower && isUserLoggedIn()){
        action = `<button onclick=return_book(${book.id})>Return</button>`;
    }
    else if(cur_user === book.lender){
        action = "-";
    }
    else if(book.borrower ==="-" && isUserLoggedIn())
    {
        action = `<button onclick="borrow_book(${book.id})">Borrow</button>`;
    }
    return '<tr>'+
                '<td>'+ book.id +'</td>'+
                '<td>'+ book.title +'</td>'+
                '<td>'+ book.author +'</td>'+
                '<td>'+ book.lender +'</td>'+
                '<td>'+ book.borrower +'</td>'+
                '<td>'+ action +'</td>'+
            '</tr>';
}
//All data from local storage is fetched and displayed in a table using this method. 
function newBooksDetails () {
    const booksList = document.getElementById('info-table-body');
    booksList.innerHTML = '';
    library.map((book)=>{
        booksList.innerHTML += book_row(book);     
    })
    
    newInputRow();
}

const insert_new_book =() =>{

    const new_book_title = document.getElementById('new-book-title').value;
    const new_book_author = document.getElementById('new-book-author').value;
    const new_book_lender = cur_user;
    const new_book_borrower = "-";
    const new_book_id = book_count;
    
    if(new_book_title.length <=0 || new_book_author <=0){
        alert("FILL ALL DETAILS!");
    }
    else{
        let new_book = new BookClub(new_book_id,new_book_title,new_book_author,new_book_lender,new_book_borrower);
        library.push(new_book);
        book_count++;

        newBooksDetails();
    }
    
}

const newInputRow=() =>{  
    const inputRow = document.getElementById('info-table-body-new-book');
    if(isUserLoggedIn()){
        inputRow.innerHTML  =   '<tr>'+
                                    '<td id="new-book-id">'+book_count+'</td>'+
                                    '<td>'+'<input id="new-book-title" placeholder="Title">'+'</td>'+
                                    '<td>'+'<input id="new-book-author" placeholder="Author">'+'</td>'+
                                    '<td id="lender">'+cur_user+'</td>'+
                                    '<td id="borrower">'+`-`+'</td>'+
                                    '<td id="button-action-new-book">'+'<button onclick="insert_new_book()">Add Book</button>'+'</td>'+
                                '</tr>';
    }
}
//The username for logging in is displayed using this function. 
function changeLoggedInUser(){
    let logged_in_username = document.getElementById("logged-in-user-name-current");
    let user_name = document.getElementById("logged-user").value;

    cur_user = user_name;
    if(users.includes(user_name)){
        logged_in_username.innerHTML = "Logged in user : " + user_name;
        newBooksDetails();
    }
    else{
        alert("USER NOT FOUND!!");
    }
}
