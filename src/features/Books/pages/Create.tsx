import { useState } from "react";
import { ApiService } from "services";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBook({ isOpen, onClose }: Props) {
  const [form, setForm] = useState({
    bookTitle: "",
    authorName: "",
    publisherName: "",
    bookPrice: "",
    bookCategory: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //Submit Form
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      setLoading(true);

      await ApiService.post("books", {
        ...form,
        bookPrice: Number(form.bookPrice),
        bookCategory: Number(form.bookCategory),
      });

      onClose(); // close modal
    } catch (error) {
      console.error("Error adding book:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="bg-white p-6 rounded-lg w-[500px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Book</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="bookTitle"
            placeholder="Book Title"
            value={form.bookTitle}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="authorName"
            placeholder="Author Name"
            value={form.authorName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="publisherName"
            placeholder="Publisher"
            value={form.publisherName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="number"
            name="bookPrice"
            placeholder="Price"
            value={form.bookPrice}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="number"
            name="bookCategory"
            placeholder="Category ID"
            value={form.bookCategory}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#1e2939] text-white rounded"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
