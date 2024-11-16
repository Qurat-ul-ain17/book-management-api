import { NextResponse } from "next/server";

let books = [
    { id: "1", title: "Just As I Am", author: "Charlotte Elliott" },
    { id: "2", title: "Viscount Who Loved Me", author: "Julia Quinn" },
    { id: "3", title: "Untamed", author: "Glennon Doyle" },
    { id: "4", title: "The Midnight Library", author: "Matt Haig" },
    { id: "5", title: "The Vanishing Half", author: "Brit Bennett" },
];

export async function GET() {
    return NextResponse.json(books);
}

export async function POST(request: Request) {
    const newBook = await request.json();
    books.push(newBook);
    return NextResponse.json({ message: "Book added!", book: newBook });
}

export async function PUT(request: Request) {
    const updatedBook = await request.json();
    books = books.map(book => book.id === updatedBook.id ? updatedBook : book);
    return NextResponse.json({ message: "Book updated!", book: updatedBook });
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    books = books.filter(book => book.id !== id);
    return NextResponse.json({ message: "Book deleted!" });
}