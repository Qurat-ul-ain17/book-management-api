"use client";

import { useState, useEffect } from "react";

export default function Books() {
    const [books, setBooks] = useState([]);
    const [form, setForm] = useState({ id: "", title: "", author: "" });

    // Fetch books from the API
    useEffect(() => {
        fetch("/api/books")
            .then((res) => res.json())
            .then((data) => setBooks(data));
    }, []);

    // Handle Add or Update
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = form.id ? "PUT" : "POST";
        const response = await fetch("/api/books", {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const data = await response.json();

        // Update UI
        setBooks((prev) =>
            form.id ? prev.map((book) => (book.id === form.id ? data.book : book)) : [...prev, data.book]
        );
        setForm({ id: "", title: "", author: "" });
    };

    // Handle Delete
    const handleDelete = async (id: string) => {
        await fetch("/api/books", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        setBooks((prev) => prev.filter((book) => book.id !== id));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-lime-400 p-6">
        <div className="w-full max-w-3xl  bg-lime-300  p-8 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Book Management</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6 ">
                <input
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="p-2 border border-gray-300 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="p-2 border border-gray-300 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
                <button type="submit" className="p-2 px-4 bg-lime-900 text-white rounded-md shadow-xl hover:bg-lime-400 hover:text-black">
                    {form.id ? "Update" : "Add"} Book
                </button>
            </form>
            <ul className="space-y-2">
                {books.map((book) => (
                    <li key={book.id} className="flex justify-between items-center p-4 border border-lime-500 rounded-lg shadow-sm hover:bg-gray-50 hover:text-black transition duration-1000">
                        <span>
                            <strong>{book.title}</strong> by {book.author}
                        </span>
                        <div>
                            <button
                                onClick={() => setForm(book)}
                                className="w-32 bg-lim  text-white hover:text-black mr-4"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(book.id)}
                                className="w-32 bg-lime-800 text-white mr-4"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
}