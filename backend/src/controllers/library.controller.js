import { libraryService } from '../services/library.service.js';

// Book Management
export async function addBook(req, res) {
  try {
    const result = await libraryService(req).addBook(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateBook(req, res) {
  try {
    const { id } = req.params;
    const result = await libraryService(req).updateBook(id, req.body);
    if (!result) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function searchBooks(req, res) {
  try {
    const { query, category } = req.query;
    const result = await libraryService(req).searchBooks(query, category);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getBookDetails(req, res) {
  try {
    const { id } = req.params;
    const result = await libraryService(req).getBookDetails(id);
    if (!result) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Book Issue Management
export async function issueBook(req, res) {
  try {
    const result = await libraryService(req).issueBook(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function returnBook(req, res) {
  try {
    const { issueId } = req.params;
    const result = await libraryService(req).returnBook(issueId);
    if (!result) {
      return res.status(404).json({ error: "Issue record not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getStudentIssues(req, res) {
  try {
    const { studentId } = req.params;
    const result = await libraryService(req).getStudentIssues(studentId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getOverdueBooks(req, res) {
  try {
    const result = await libraryService(req).getOverdueBooks();
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function calculateFine(req, res) {
  try {
    const { issueId } = req.params;
    const result = await libraryService(req).calculateFine(issueId);
    if (!result) {
      return res.status(404).json({ error: "Issue record not found" });
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
