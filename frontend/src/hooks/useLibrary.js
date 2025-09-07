import { useApiRequest } from './useApiRequest';
import { libraryService } from '../services/libraryService';

export function useLibrary() {
  const { data: books, loading: loadingBooks, error: searchError, execute: executeSearch } = useApiRequest(libraryService.searchBooks);
  
  const { data: bookDetails, loading: loadingBook, error: bookError, execute: fetchBookDetails } = useApiRequest(libraryService.getBookDetails);
  
  const { data: issueDetails, loading: issuingBook, error: issueError, execute: executeIssueBook } = useApiRequest(libraryService.issueBook);
  
  const { data: returnDetails, loading: returningBook, error: returnError, execute: executeReturnBook } = useApiRequest(libraryService.returnBook);
  
  const { data: studentIssues, loading: loadingIssues, error: issuesError, execute: fetchStudentIssues } = useApiRequest(libraryService.getStudentIssues);
  
  const { data: overdueBooks, loading: loadingOverdue, error: overdueError, execute: fetchOverdueBooks } = useApiRequest(libraryService.getOverdueBooks);
  
  const { data: fineDetails, loading: calculatingFine, error: fineError, execute: calculateFine } = useApiRequest(libraryService.calculateFine);

  return {
    // Search books
    searchBooks: executeSearch,
    loadingBooks,
    searchError,
    books,

    // Book details
    fetchBookDetails,
    loadingBook,
    bookError,
    bookDetails,

    // Issue book
    issueBook: executeIssueBook,
    issuingBook,
    issueError,
    issueDetails,

    // Return book
    returnBook: executeReturnBook,
    returningBook,
    returnError,
    returnDetails,

    // Student issues
    fetchStudentIssues,
    loadingIssues,
    issuesError,
    studentIssues,

    // Overdue books
    fetchOverdueBooks,
    loadingOverdue,
    overdueError,
    overdueBooks,

    // Fine calculation
    calculateFine,
    calculatingFine,
    fineError,
    fineDetails
  };
}
